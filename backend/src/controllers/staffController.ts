import { Response } from "express";
import crypto from "crypto";
import { Admin, IAdmin } from "../models/Admin.js";
import { Role } from "../models/Role.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { logAudit, getActor } from "../services/auditService.js";
import { hashPassword } from "../utils/authUtils.js";
import { checkConflictingRoles } from "../services/separationOfDuties.js";

/**
 * Validates that actor cannot grant permissions they do not possess
 */
async function validateNoPrivilegeEscalation(
  actorUser: any,
  requestedRoles: string[],
  directGrant: string[] = []
): Promise<{ allowed: boolean; unheldPermissions: string[] }> {
  if (actorUser.roles?.includes("super_admin")) {
    return { allowed: true, unheldPermissions: [] };
  }

  const actorPerms: Set<string> = actorUser.permissionsSet || new Set(actorUser.permissions || []);
  const unheld = new Set<string>();

  // Check roles
  const roles = await Role.find({ key: { $in: requestedRoles } });
  for (const r of roles) {
    for (const p of r.permissions) {
      if (p !== "*" && !actorPerms.has(p)) {
        unheld.add(p);
      }
    }
  }

  // Check direct grants
  for (const g of directGrant) {
    if (g !== "*" && !actorPerms.has(g)) {
      unheld.add(g);
    }
  }

  if (unheld.size > 0) {
    return { allowed: false, unheldPermissions: Array.from(unheld) };
  }

  return { allowed: true, unheldPermissions: [] };
}

/**
 * 1. List Staff Accounts with filter and pagination
 */
export async function listStaff(req: RbacRequest, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: String(req.query.search), $options: "i" } },
        { email: { $regex: String(req.query.search), $options: "i" } },
      ];
    }

    if (req.query.role && req.query.role !== "all") {
      filter.roles = String(req.query.role);
    }

    if (req.query.status === "active") {
      filter.isActive = true;
    } else if (req.query.status === "inactive") {
      filter.isActive = false;
    }

    const [staff, total] = await Promise.all([
      Admin.find(filter)
        .select("-passwordHash")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Admin.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: staff,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error("listStaff error:", error);
    res.status(500).json({ success: false, message: "Failed to list staff accounts", error: error.message });
  }
}

/**
 * 2. Get Staff Account Details
 */
export async function getStaffById(req: RbacRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const staff = await Admin.findById(id).select("-passwordHash").lean();

    if (!staff) {
      res.status(404).json({ success: false, message: "Staff account not found" });
      return;
    }

    res.json({ success: true, data: staff });
  } catch (error: any) {
    console.error("getStaffById error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve staff details", error: error.message });
  }
}

/**
 * 3. Invite New Staff Member
 */
export async function inviteStaff(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { name, email, roles = [], scope = { workAreas: [], offices: [] }, initialPassword } = req.body;

    if (!name || !email) {
      res.status(400).json({ success: false, message: "Name and email are required." });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const existing = await Admin.findOne({ email: cleanEmail });
    if (existing) {
      res.status(400).json({ success: false, message: "A staff account with this email already exists." });
      return;
    }

    // Escalation guard: cannot grant unheld permissions
    const escalationCheck = await validateNoPrivilegeEscalation(actor, roles);
    if (!escalationCheck.allowed) {
      res.status(403).json({
        success: false,
        message: "Escalation guard violation: You cannot grant roles containing permissions you do not hold.",
        unheldPermissions: escalationCheck.unheldPermissions,
      });
      return;
    }

    // Separation of duties conflict warning
    const conflictCheck = checkConflictingRoles(roles);

    // Generate single-use invite token with 48h expiration
    const inviteToken = crypto.randomBytes(32).toString("hex");
    const inviteExpires = new Date(Date.now() + 48 * 3600 * 1000);

    // If an initial temporary password was provided, hash it and flag mustChangePassword
    const password = initialPassword || crypto.randomBytes(8).toString("hex") + "!A1";
    const passwordHash = hashPassword(password);

    const newStaff = await Admin.create({
      name: String(name).trim(),
      email: cleanEmail,
      passwordHash,
      roles: roles.length ? roles : ["content_editor"],
      role: roles.includes("super_admin") ? "superadmin" : "editor",
      scope: {
        workAreas: scope.workAreas || [],
        offices: scope.offices || [],
      },
      directPermissions: { grant: [], deny: [] },
      tokenVersion: 0,
      failedLoginAttempts: 0,
      mustChangePassword: true,
      inviteToken,
      inviteExpires,
      isActive: true,
    });

    await logAudit({
      req,
      action: "system.staff:create",
      resourceType: "admin",
      resourceId: newStaff._id.toString(),
      severity: "info",
      after: { email: cleanEmail, name, roles, scope },
      reason: `Staff invited by ${actor?.name} (${actor?.email})`,
    });

    res.status(201).json({
      success: true,
      message: "Staff member invited successfully.",
      data: {
        id: newStaff._id,
        name: newStaff.name,
        email: newStaff.email,
        roles: newStaff.roles,
        inviteToken,
        inviteExpires,
        temporaryPassword: initialPassword ? password : null,
      },
      warnings: conflictCheck.warnings,
    });
  } catch (error: any) {
    console.error("inviteStaff error:", error);
    res.status(500).json({ success: false, message: "Failed to invite staff member", error: error.message });
  }
}

/**
 * 4. Update Staff Roles & Scope
 */
export async function updateStaff(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { id } = req.params;
    const { name, roles, scope, directPermissions } = req.body;

    const targetStaff = await Admin.findById(id);
    if (!targetStaff) {
      res.status(404).json({ success: false, message: "Staff account not found." });
      return;
    }

    // Escalation Guard 1: Cannot edit own roles or scope
    if (actor && actor.id === targetStaff._id.toString()) {
      if (roles !== undefined || scope !== undefined || directPermissions !== undefined) {
        res.status(403).json({
          success: false,
          message: "Escalation guard: You cannot modify your own roles, scope, or direct permissions.",
        });
        return;
      }
    }

    // Escalation Guard 2: Cannot grant unheld permissions
    if (roles || directPermissions) {
      const targetRoles = roles || targetStaff.roles;
      const targetGrants = directPermissions?.grant || targetStaff.directPermissions?.grant || [];
      const escalationCheck = await validateNoPrivilegeEscalation(actor, targetRoles, targetGrants);
      if (!escalationCheck.allowed) {
        res.status(403).json({
          success: false,
          message: "Escalation guard violation: You cannot grant roles or permissions you do not hold.",
          unheldPermissions: escalationCheck.unheldPermissions,
        });
        return;
      }
    }

    // Escalation Guard 3: Cannot remove super_admin from last active super admin
    if (roles && targetStaff.roles.includes("super_admin") && !roles.includes("super_admin")) {
      const activeSuperAdmins = await Admin.countDocuments({
        roles: "super_admin",
        isActive: true,
      });
      if (activeSuperAdmins <= 1) {
        res.status(400).json({
          success: false,
          message: "Protection rule violation: Cannot remove Super Admin role from the last active Super Admin account.",
        });
        return;
      }
    }

    const beforeState = {
      name: targetStaff.name,
      roles: targetStaff.roles,
      scope: targetStaff.scope,
      directPermissions: targetStaff.directPermissions,
    };

    if (name) targetStaff.name = String(name).trim();
    if (roles) {
      targetStaff.roles = roles;
      targetStaff.role = roles.includes("super_admin") ? "superadmin" : "editor";
    }
    if (scope) {
      targetStaff.scope = {
        workAreas: scope.workAreas || [],
        offices: scope.offices || [],
      };
    }
    if (directPermissions) {
      targetStaff.directPermissions = {
        grant: directPermissions.grant || [],
        deny: directPermissions.deny || [],
      };
    }

    // Bumping tokenVersion immediately invalidates all active sessions of this staff member
    targetStaff.tokenVersion = (targetStaff.tokenVersion || 0) + 1;
    await targetStaff.save();

    await logAudit({
      req,
      action: "system.staff:edit",
      resourceType: "admin",
      resourceId: targetStaff._id.toString(),
      severity: "high",
      before: beforeState,
      after: {
        name: targetStaff.name,
        roles: targetStaff.roles,
        scope: targetStaff.scope,
        directPermissions: targetStaff.directPermissions,
      },
      reason: `Staff roles or scope updated by ${actor?.name}. Token version bumped to invalidate active sessions.`,
    });

    const conflictCheck = checkConflictingRoles(targetStaff.roles);

    res.json({
      success: true,
      message: "Staff account updated successfully. Active sessions have been invalidated.",
      data: {
        id: targetStaff._id,
        name: targetStaff.name,
        email: targetStaff.email,
        roles: targetStaff.roles,
        scope: targetStaff.scope,
      },
      warnings: conflictCheck.warnings,
    });
  } catch (error: any) {
    console.error("updateStaff error:", error);
    res.status(500).json({ success: false, message: "Failed to update staff account", error: error.message });
  }
}

/**
 * 5. Resend Staff Invite
 */
export async function resendInvite(req: RbacRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const staff = await Admin.findById(id);

    if (!staff) {
      res.status(404).json({ success: false, message: "Staff account not found." });
      return;
    }

    staff.inviteToken = crypto.randomBytes(32).toString("hex");
    staff.inviteExpires = new Date(Date.now() + 48 * 3600 * 1000);
    await staff.save();

    await logAudit({
      req,
      action: "system.staff:resend_invite",
      resourceType: "admin",
      resourceId: staff._id.toString(),
      severity: "info",
    });

    res.json({
      success: true,
      message: "Invitation link refreshed.",
      inviteToken: staff.inviteToken,
      inviteExpires: staff.inviteExpires,
    });
  } catch (error: any) {
    console.error("resendInvite error:", error);
    res.status(500).json({ success: false, message: "Failed to refresh invite", error: error.message });
  }
}

/**
 * 6. Reset Staff Credentials (Temporary Password)
 */
export async function resetStaffCredentials(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { id } = req.params;
    const staff = await Admin.findById(id);

    if (!staff) {
      res.status(404).json({ success: false, message: "Staff account not found." });
      return;
    }

    const tempPassword = crypto.randomBytes(6).toString("hex") + "!B2";
    staff.passwordHash = hashPassword(tempPassword);
    staff.mustChangePassword = true;
    staff.tokenVersion = (staff.tokenVersion || 0) + 1; // Immediate sign-out
    await staff.save();

    await logAudit({
      req,
      action: "system.staff:reset_password",
      resourceType: "admin",
      resourceId: staff._id.toString(),
      severity: "high",
      reason: `Password reset by ${actor?.name}. Token version bumped.`,
    });

    res.json({
      success: true,
      message: `Temporary password generated for ${staff.name}. The user will be required to change it upon first login.`,
      temporaryPassword: tempPassword,
    });
  } catch (error: any) {
    console.error("resetStaffCredentials error:", error);
    res.status(500).json({ success: false, message: "Failed to reset credentials", error: error.message });
  }
}

/**
 * 7. Deactivate Staff Account
 */
export async function deactivateStaff(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { id } = req.params;

    const staff = await Admin.findById(id);
    if (!staff) {
      res.status(404).json({ success: false, message: "Staff account not found." });
      return;
    }

    // Escalation Guard: Cannot deactivate self
    if (actor && actor.id === staff._id.toString()) {
      res.status(403).json({ success: false, message: "You cannot deactivate your own account." });
      return;
    }

    // Escalation Guard: Cannot deactivate last super admin
    if (staff.roles.includes("super_admin")) {
      const activeSuperAdmins = await Admin.countDocuments({
        roles: "super_admin",
        isActive: true,
      });
      if (activeSuperAdmins <= 1) {
        res.status(400).json({
          success: false,
          message: "Cannot deactivate the last remaining active Super Admin account.",
        });
        return;
      }
    }

    staff.isActive = false;
    staff.tokenVersion = (staff.tokenVersion || 0) + 1; // Terminate sessions
    await staff.save();

    await logAudit({
      req,
      action: "system.staff:deactivate",
      resourceType: "admin",
      resourceId: staff._id.toString(),
      severity: "high",
      reason: `Account deactivated by ${actor?.name}`,
    });

    res.json({
      success: true,
      message: `Staff account ${staff.name} (${staff.email}) has been deactivated and signed out.`,
    });
  } catch (error: any) {
    console.error("deactivateStaff error:", error);
    res.status(500).json({ success: false, message: "Failed to deactivate staff account", error: error.message });
  }
}

/**
 * 8. Reactivate Staff Account
 */
export async function reactivateStaff(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { id } = req.params;

    const staff = await Admin.findById(id);
    if (!staff) {
      res.status(404).json({ success: false, message: "Staff account not found." });
      return;
    }

    staff.isActive = true;
    staff.failedLoginAttempts = 0;
    staff.lockoutUntil = null;
    await staff.save();

    await logAudit({
      req,
      action: "system.staff:reactivate",
      resourceType: "admin",
      resourceId: staff._id.toString(),
      severity: "info",
      reason: `Account reactivated by ${actor?.name}`,
    });

    res.json({
      success: true,
      message: `Staff account ${staff.name} (${staff.email}) has been reactivated.`,
    });
  } catch (error: any) {
    console.error("reactivateStaff error:", error);
    res.status(500).json({ success: false, message: "Failed to reactivate staff account", error: error.message });
  }
}

/**
 * 9. Force Sign Out (Revoke active sessions)
 */
export async function forceSignOut(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { id } = req.params;

    const staff = await Admin.findById(id);
    if (!staff) {
      res.status(404).json({ success: false, message: "Staff account not found." });
      return;
    }

    staff.tokenVersion = (staff.tokenVersion || 0) + 1;
    await staff.save();

    await logAudit({
      req,
      action: "system.staff:force_signout",
      resourceType: "admin",
      resourceId: staff._id.toString(),
      severity: "info",
      reason: `Sessions revoked by ${actor?.name}`,
    });

    res.json({
      success: true,
      message: `All active sessions for ${staff.name} have been revoked.`,
    });
  } catch (error: any) {
    console.error("forceSignOut error:", error);
    res.status(500).json({ success: false, message: "Failed to revoke sessions", error: error.message });
  }
}

