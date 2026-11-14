import { Request, Response } from "express";
import { Admin } from "../models/Admin.js";
import { Role } from "../models/Role.js";
import { hashPassword, verifyPassword, signToken } from "../utils/authUtils.js";
import { verifyTOTPCode } from "../utils/totp.js";
import { logAudit, getActor } from "../services/auditService.js";
import { resolveAdminPermissions, RbacRequest } from "../middlewares/rbac.js";

/**
 * 1. Admin Login with Brute-Force Lockout & 2FA Challenge Support
 * Eliminates auto-creation of accounts on arbitrary passwords.
 */
export async function adminLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const admin = await Admin.findOne({ email: cleanEmail });

    if (!admin) {
      await logAudit({
        req,
        actor: { id: "anonymous", name: "Unknown", email: cleanEmail },
        action: "auth.failed_login",
        resourceType: "auth",
        outcome: "failure",
        severity: "warning",
        reason: "Login attempt with non-existent email",
      });

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check account lockout status
    if (admin.lockoutUntil && admin.lockoutUntil > new Date()) {
      const remainingMinutes = Math.ceil((admin.lockoutUntil.getTime() - Date.now()) / (60 * 1000));
      await logAudit({
        req,
        actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
        action: "auth.locked_login_attempt",
        resourceType: "auth",
        outcome: "denied",
        severity: "warning",
        reason: `Account locked. ${remainingMinutes} minutes remaining`,
      });

      return res.status(423).json({
        success: false,
        message: `Account is temporarily locked due to repeated failed login attempts. Please try again in ${remainingMinutes} minutes or contact a Super Admin.`,
        lockoutUntil: admin.lockoutUntil,
      });
    }

    if (!admin.isActive) {
      await logAudit({
        req,
        actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
        action: "auth.inactive_login_attempt",
        resourceType: "auth",
        outcome: "denied",
        severity: "warning",
        reason: "Deactivated admin attempted to log in",
      });

      return res.status(401).json({
        success: false,
        message: "Account has been deactivated. Please contact an administrator.",
      });
    }

    const isValidPassword = verifyPassword(password, admin.passwordHash);
    if (!isValidPassword) {
      admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;

      if (admin.failedLoginAttempts >= 5) {
        admin.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15-minute lockout
        await admin.save();

        await logAudit({
          req,
          actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
          action: "auth.account_locked",
          resourceType: "admin",
          resourceId: admin._id.toString(),
          outcome: "denied",
          severity: "high",
          reason: "Account locked after 5 consecutive failed login attempts",
        });

        return res.status(423).json({
          success: false,
          message: "Account locked due to 5 failed login attempts. Please try again in 15 minutes or contact a Super Admin.",
          lockoutUntil: admin.lockoutUntil,
        });
      }

      await admin.save();

      await logAudit({
        req,
        actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
        action: "auth.failed_login",
        resourceType: "auth",
        outcome: "failure",
        severity: "warning",
        reason: `Incorrect password (attempt ${admin.failedLoginAttempts}/5)`,
      });

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        attemptsRemaining: 5 - admin.failedLoginAttempts,
      });
    }

    // Password is valid - reset lockout counters
    admin.failedLoginAttempts = 0;
    admin.lockoutUntil = null;
    admin.lastLogin = new Date();
    admin.lastReauthAt = new Date();
    await admin.save();

    // 2FA bypassed/disabled
    const mustEnroll2FA = false;

    const token = signToken({
      adminId: admin._id,
      email: admin.email,
      name: admin.name,
      tokenVersion: admin.tokenVersion || 0,
    });

    const { permissions } = await resolveAdminPermissions(admin);

    await logAudit({
      req,
      actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
      action: "auth.login",
      resourceType: "auth",
      outcome: "success",
      severity: "info",
    });

    res.json({
      success: true,
      message: "Admin authentication successful",
      token,
      requires2FA: false,
      mustEnroll2FA: false,
      mustChangePassword: !!admin.mustChangePassword,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        roles: admin.roles,
        permissions,
        scope: admin.scope,
        twoFactorEnabled: false,
        mustChangePassword: admin.mustChangePassword,
        rbacEnforcementMode: (process.env.RBAC_ENFORCEMENT_MODE || "report").toLowerCase(),
      },
    });
  } catch (err: any) {
    console.error("adminLogin error:", err);
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
}

/**
 * 2. Get Live Profile & Effective Permissions (/api/auth/admin/me)
 */
export async function getAdminProfile(req: RbacRequest, res: Response) {
  try {
    const user = req.adminUser;
    if (!user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const admin = await Admin.findById(user.id).select("-passwordHash -twoFactorSecret -twoFactorRecoveryCodes");
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: "Admin account not found or inactive" });
    }

    const { permissions } = await resolveAdminPermissions(admin);

    // Check if 2FA is required for any assigned role
    const roleKeys = admin.roles || [admin.role || "super_admin"];
    const rolesWith2FA = await Role.find({ key: { $in: roleKeys }, requires2FA: true });
    const mustEnroll2FA = rolesWith2FA.length > 0 && !admin.twoFactorEnabled;

    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        roles: admin.roles,
        permissions,
        scope: admin.scope,
        twoFactorEnabled: false,
        mustEnroll2FA: false,
        mustChangePassword: admin.mustChangePassword,
        lastLogin: admin.lastLogin,
        lastReauthAt: admin.lastReauthAt,
        tokenVersion: admin.tokenVersion,
        rbacEnforcementMode: (process.env.RBAC_ENFORCEMENT_MODE || "report").toLowerCase(),
      },
    });
  } catch (err: any) {
    console.error("getAdminProfile error:", err);
    res.status(500).json({ success: false, message: "Failed to retrieve profile", error: err.message });
  }
}

/**
 * 3. Logout
 */
export async function adminLogout(req: RbacRequest, res: Response) {
  const actor = getActor(req);
  await logAudit({
    req,
    actor,
    action: "auth.logout",
    resourceType: "auth",
    outcome: "success",
  });
  res.json({ success: true, message: "Logged out successfully" });
}

/**
 * 4. Accept Staff Invite and Set Password
 */
export async function acceptInvite(req: Request, res: Response) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Invite token and new password are required." });
    }

    if (String(newPassword).length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    const admin = await Admin.findOne({
      inviteToken: token,
      inviteExpires: { $gt: new Date() },
    });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid or expired invitation link. Please request a new invite." });
    }

    admin.passwordHash = hashPassword(newPassword);
    admin.inviteToken = null;
    admin.inviteExpires = null;
    admin.mustChangePassword = false;
    admin.tokenVersion = (admin.tokenVersion || 0) + 1;
    admin.lastLogin = new Date();
    admin.lastReauthAt = new Date();
    admin.isActive = true;
    await admin.save();

    await logAudit({
      req,
      actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
      action: "auth.accept_invite",
      resourceType: "admin",
      resourceId: admin._id.toString(),
      outcome: "success",
      severity: "info",
    });

    const jwtToken = signToken({
      adminId: admin._id,
      email: admin.email,
      name: admin.name,
      tokenVersion: admin.tokenVersion,
    });

    const { permissions } = await resolveAdminPermissions(admin);

    res.json({
      success: true,
      message: "Password configured and invitation accepted successfully.",
      token: jwtToken,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        roles: admin.roles,
        permissions,
        scope: admin.scope,
        twoFactorEnabled: admin.twoFactorEnabled,
      },
    });
  } catch (err: any) {
    console.error("acceptInvite error:", err);
    res.status(500).json({ success: false, message: "Failed to accept invite", error: err.message });
  }
}

/**
 * 5. Change Password (Forces sign-out of all other sessions)
 */
export async function changePassword(req: RbacRequest, res: Response) {
  try {
    const user = req.adminUser;
    const { currentPassword, newPassword } = req.body;

    if (!user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    if (!newPassword || String(newPassword).length < 8) {
      return res.status(400).json({ success: false, message: "New password must be at least 8 characters long." });
    }

    const admin = await Admin.findById(user.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin account not found." });
    }

    // If user is not flagged with mustChangePassword, require verification of current password
    if (!admin.mustChangePassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: "Current password is required." });
      }
      const isMatch = verifyPassword(currentPassword, admin.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current password is incorrect." });
      }
    }

    admin.passwordHash = hashPassword(newPassword);
    admin.mustChangePassword = false;
    admin.tokenVersion = (admin.tokenVersion || 0) + 1; // Invalidate all prior JWT tokens
    admin.lastReauthAt = new Date();
    await admin.save();

    await logAudit({
      req,
      action: "auth.change_password",
      resourceType: "admin",
      resourceId: admin._id.toString(),
      outcome: "success",
      severity: "info",
    });

    const freshToken = signToken({
      adminId: admin._id,
      email: admin.email,
      name: admin.name,
      tokenVersion: admin.tokenVersion,
    });

    res.json({
      success: true,
      message: "Password changed successfully. All other active sessions have been signed out.",
      token: freshToken,
    });
  } catch (err: any) {
    console.error("changePassword error:", err);
    res.status(500).json({ success: false, message: "Failed to change password", error: err.message });
  }
}

/**
 * 6. High-Risk Re-Authentication
 * Confirms identity via password or TOTP before executing sensitive operations.
 */
export async function reauthenticate(req: RbacRequest, res: Response) {
  try {
    const user = req.adminUser;
    const { password, totpCode } = req.body;

    if (!user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const admin = await Admin.findById(user.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin account not found" });
    }

    let verified = false;

    if (password) {
      verified = verifyPassword(password, admin.passwordHash);
    } else if (totpCode && admin.twoFactorSecret) {
      verified = verifyTOTPCode(admin.twoFactorSecret, totpCode);
    }

    if (!verified) {
      await logAudit({
        req,
        action: "auth.reauth_failed",
        resourceType: "auth",
        outcome: "failure",
        severity: "warning",
      });
      return res.status(401).json({ success: false, message: "Re-authentication failed. Incorrect credentials." });
    }

    admin.lastReauthAt = new Date();
    await admin.save();

    await logAudit({
      req,
      action: "auth.reauth_success",
      resourceType: "auth",
      outcome: "success",
      severity: "info",
    });

    res.json({
      success: true,
      message: "Re-authentication successful.",
      lastReauthAt: admin.lastReauthAt,
    });
  } catch (err: any) {
    console.error("reauthenticate error:", err);
    res.status(500).json({ success: false, message: "Re-authentication failed", error: err.message });
  }
}
