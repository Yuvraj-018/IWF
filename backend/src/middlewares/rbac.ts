import { Request, Response, NextFunction } from "express";
import { Admin, IAdmin } from "../models/Admin.js";
import { Role } from "../models/Role.js";
import { verifyToken } from "../utils/authUtils.js";
import { ALL_PERMISSION_KEYS } from "../config/permissions.js";
import { logAudit, getActor } from "../services/auditService.js";

export type RbacEnforcementMode = "off" | "report" | "enforce";

export function getRbacEnforcementMode(): RbacEnforcementMode {
  const mode = (process.env.RBAC_ENFORCEMENT_MODE || "report").toLowerCase();
  if (mode === "off" || mode === "enforce") return mode;
  return "report"; // Default mode for safe deployment
}

export interface AdminUserContext {
  id: string;
  email: string;
  name: string;
  role?: string;
  roles: string[];
  permissions: string[];
  permissionsSet: Set<string>;
  scope: {
    workAreas: string[];
    offices: string[];
  };
  tokenVersion: number;
  twoFactorEnabled: boolean;
  lastReauthAt?: Date | null;
}

export interface RbacRequest extends Request {
  adminUser?: AdminUserContext;
  user?: AdminUserContext;
}

/**
 * Resolves live effective permissions for an Admin:
 * effective = union(role.permissions) + directPermissions.grant - directPermissions.deny (deny wins)
 */
export async function resolveAdminPermissions(admin: IAdmin): Promise<{
  permissions: string[];
  permissionsSet: Set<string>;
}> {
  const roleKeys = admin.roles || (admin.role ? [admin.role === "superadmin" ? "super_admin" : admin.role] : []);
  const isSuperAdmin = roleKeys.includes("super_admin");

  if (isSuperAdmin) {
    // Superadmin has all permissions by default, but direct explicit deny still applies if specified
    const grants = new Set<string>(ALL_PERMISSION_KEYS);
    grants.add("*");

    if (admin.directPermissions?.deny?.length) {
      for (const denied of admin.directPermissions.deny) {
        grants.delete(denied);
      }
    }
    const permissions = Array.from(grants);
    return { permissions, permissionsSet: grants };
  }

  // Load roles from database
  const roles = await Role.find({ key: { $in: roleKeys } });
  const permissionsSet = new Set<string>();

  for (const role of roles) {
    for (const perm of role.permissions) {
      if (perm === "*") {
        ALL_PERMISSION_KEYS.forEach((p) => permissionsSet.add(p));
        permissionsSet.add("*");
      } else {
        permissionsSet.add(perm);
      }
    }
  }

  // Apply per-user explicit grants
  if (admin.directPermissions?.grant?.length) {
    for (const grant of admin.directPermissions.grant) {
      if (grant === "*") {
        ALL_PERMISSION_KEYS.forEach((p) => permissionsSet.add(p));
        permissionsSet.add("*");
      } else {
        permissionsSet.add(grant);
      }
    }
  }

  // Apply per-user explicit denies (deny wins!)
  if (admin.directPermissions?.deny?.length) {
    for (const denied of admin.directPermissions.deny) {
      permissionsSet.delete(denied);
    }
  }

  const permissions = Array.from(permissionsSet);
  return { permissions, permissionsSet };
}

/**
 * Authenticates JWT token, verifies live account status and tokenVersion,
 * and attaches fully resolved AdminUserContext to req.adminUser & req.user.
 */
export async function authenticate(req: RbacRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader =
      req.headers.authorization ||
      (req.query.token ? `Bearer ${req.query.token}` : undefined);

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Missing Authorization header. Admin login required.",
      });
      return;
    }

    const { valid, payload } = verifyToken(authHeader);
    if (!valid || !payload?.adminId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired admin authentication session.",
      });
      return;
    }

    const admin = await Admin.findById(payload.adminId);
    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Admin account not found.",
      });
      return;
    }

    if (!admin.isActive) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Admin account has been deactivated.",
      });
      return;
    }

    // Lockout check
    if (admin.lockoutUntil && admin.lockoutUntil > new Date()) {
      res.status(423).json({
        success: false,
        message: "Account locked due to repeated failed login attempts. Please contact a Super Admin.",
      });
      return;
    }

    // Token version check: immediate revocation on password change, deactivation, or role update
    if (payload.tokenVersion !== undefined && admin.tokenVersion !== undefined) {
      if (payload.tokenVersion !== admin.tokenVersion) {
        res.status(401).json({
          success: false,
          code: "TOKEN_REVOKED",
          message: "Session revoked due to account updates or password change. Please log in again.",
        });
        return;
      }
    }

    const { permissions, permissionsSet } = await resolveAdminPermissions(admin);

    const userContext: AdminUserContext = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
      roles: admin.roles?.length ? admin.roles : [admin.role || "super_admin"],
      permissions,
      permissionsSet,
      scope: admin.scope || { workAreas: [], offices: [] },
      tokenVersion: admin.tokenVersion || 0,
      twoFactorEnabled: !!admin.twoFactorEnabled,
      lastReauthAt: admin.lastReauthAt,
    };

    req.adminUser = userContext;
    req.user = userContext;

    next();
  } catch (err: any) {
    console.error("authenticate error:", err);
    res.status(500).json({ success: false, message: "Authentication validation failed", error: err.message });
  }
}

/**
 * Middleware factory requiring a specific permission key (e.g. "finance.expense:approve")
 * Honors RBAC_ENFORCEMENT_MODE: "off" | "report" | "enforce"
 */
export function requirePermission(permissionKey: string) {
  return async (req: RbacRequest, res: Response, next: NextFunction): Promise<void> => {
    const user = req.adminUser;
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Authentication required before permission evaluation.",
      });
      return;
    }

    const hasPermission =
      user.permissionsSet.has("*") || user.permissionsSet.has(permissionKey);

    if (hasPermission) {
      return next();
    }

    const mode = getRbacEnforcementMode();

    if (mode === "off") {
      return next();
    }

    if (mode === "report") {
      console.warn(
        `🚨 [RBAC REPORT MODE] Access would be DENIED: User ${user.email} (${user.id}) lacks permission "${permissionKey}" on ${req.method} ${req.originalUrl}`
      );
      // Asynchronously log the violation without blocking the request
      logAudit({
        req,
        action: "rbac.permission_denied",
        resourceType: "permission",
        resourceId: permissionKey,
        outcome: "denied",
        reason: `Report Mode: Actor lacks permission "${permissionKey}" on ${req.method} ${req.originalUrl}`,
        severity: "warning",
      });
      return next();
    }

    // mode === "enforce"
    console.error(
      `⛔ [RBAC ENFORCE MODE] Access DENIED: User ${user.email} lacks permission "${permissionKey}" on ${req.method} ${req.originalUrl}`
    );
    await logAudit({
      req,
      action: "rbac.permission_denied",
      resourceType: "permission",
      resourceId: permissionKey,
      outcome: "denied",
      reason: `Enforce Mode: Actor lacks permission "${permissionKey}" on ${req.method} ${req.originalUrl}`,
      severity: "high",
    });

    res.status(403).json({
      success: false,
      code: "FORBIDDEN",
      message: `Access denied. You do not have the required permission: [${permissionKey}].`,
      requiredPermission: permissionKey,
    });
  };
}

/**
 * Re-authentication guard for high-risk actions
 * Requires lastReauthAt within windowMinutes (default 15 minutes)
 */
export function requireReauth(windowMinutes = 15) {
  return (req: RbacRequest, res: Response, next: NextFunction): void => {
    const user = req.adminUser;
    if (!user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    if (!user.lastReauthAt) {
      res.status(403).json({
        success: false,
        code: "REAUTH_REQUIRED",
        message: "High-risk operation: Recent re-authentication is required. Please confirm your credentials.",
      });
      return;
    }

    const elapsedMs = Date.now() - new Date(user.lastReauthAt).getTime();
    if (elapsedMs > windowMinutes * 60 * 1000) {
      res.status(403).json({
        success: false,
        code: "REAUTH_REQUIRED",
        message: `High-risk operation: Your authentication session is older than ${windowMinutes} minutes. Please re-authenticate.`,
      });
      return;
    }

    next();
  };
}

export { getActor };
