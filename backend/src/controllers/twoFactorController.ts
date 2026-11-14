import { Request, Response } from "express";
import { Admin } from "../models/Admin.js";
import { Role } from "../models/Role.js";
import { verifyToken, signToken, verifyPassword } from "../utils/authUtils.js";
import {
  generateBase32Secret,
  verifyTOTPCode,
  getOtpAuthUri,
  generateRecoveryCodes,
  verifyAndConsumeRecoveryCode,
} from "../utils/totp.js";
import { logAudit, getActor } from "../services/auditService.js";
import { RbacRequest, resolveAdminPermissions } from "../middlewares/rbac.js";

/**
 * 1. Initialize 2FA Setup
 * Generates Base32 secret and OTPAuth URI for authenticator apps.
 */
export async function setup2FA(req: RbacRequest, res: Response): Promise<void> {
  try {
    const user = req.adminUser;
    if (!user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    const admin = await Admin.findById(user.id);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    const secret = generateBase32Secret();
    const otpAuthUri = getOtpAuthUri(admin.email, secret);

    // Store temporarily pending verification
    admin.twoFactorSecret = secret;
    await admin.save();

    res.json({
      success: true,
      secret,
      otpAuthUri,
      message: "Scan the QR code or enter the secret in your authenticator app, then verify with a 6-digit code.",
    });
  } catch (error: any) {
    console.error("setup2FA error:", error);
    res.status(500).json({ success: false, message: "Failed to initialize 2FA", error: error.message });
  }
}

/**
 * 2. Verify and Activate 2FA
 * Confirms the user can generate valid TOTP codes before permanently activating 2FA.
 */
export async function verifyAndActivate2FA(req: RbacRequest, res: Response): Promise<void> {
  try {
    const user = req.adminUser;
    const { token } = req.body;

    if (!user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    if (!token) {
      res.status(400).json({ success: false, message: "6-digit verification code is required." });
      return;
    }

    const admin = await Admin.findById(user.id);
    if (!admin || !admin.twoFactorSecret) {
      res.status(400).json({ success: false, message: "2FA setup has not been initiated." });
      return;
    }

    const isValid = verifyTOTPCode(admin.twoFactorSecret, token);
    if (!isValid) {
      res.status(400).json({ success: false, message: "Invalid verification code. Please check your authenticator app." });
      return;
    }

    // Generate emergency backup recovery codes
    const { plainCodes, hashedCodes } = generateRecoveryCodes(8);

    admin.twoFactorEnabled = true;
    admin.twoFactorRecoveryCodes = hashedCodes;
    admin.lastReauthAt = new Date();
    await admin.save();

    await logAudit({
      req,
      action: "auth.2fa_enabled",
      resourceType: "admin",
      resourceId: admin._id.toString(),
      severity: "high",
      reason: "User successfully activated Two-Factor Authentication",
    });

    res.json({
      success: true,
      message: "Two-Factor Authentication activated successfully. Save your recovery codes safely.",
      recoveryCodes: plainCodes,
    });
  } catch (error: any) {
    console.error("verifyAndActivate2FA error:", error);
    res.status(500).json({ success: false, message: "Failed to activate 2FA", error: error.message });
  }
}

/**
 * 3. Validate 2FA During Login
 * Completes login when 2FA is required, using either TOTP code or recovery code.
 */
export async function validate2FALogin(req: Request, res: Response): Promise<void> {
  try {
    const { twoFactorToken, code, isRecoveryCode } = req.body;

    if (!twoFactorToken || !code) {
      res.status(400).json({ success: false, message: "Missing 2FA session token or code." });
      return;
    }

    const { valid, payload } = verifyToken(twoFactorToken);
    if (!valid || !payload?.adminId || !payload?.pending2FA) {
      res.status(401).json({ success: false, message: "2FA session expired. Please start login again." });
      return;
    }

    const admin = await Admin.findById(payload.adminId);
    if (!admin || !admin.isActive) {
      res.status(401).json({ success: false, message: "Admin account not found or inactive." });
      return;
    }

    let authSuccess = false;
    let usedRecoveryCode = false;

    if (isRecoveryCode) {
      const result = verifyAndConsumeRecoveryCode(code, admin.twoFactorRecoveryCodes || []);
      if (result.valid) {
        admin.twoFactorRecoveryCodes = result.remainingHashedCodes;
        authSuccess = true;
        usedRecoveryCode = true;
      }
    } else {
      if (admin.twoFactorSecret) {
        authSuccess = verifyTOTPCode(admin.twoFactorSecret, code);
      }
    }

    if (!authSuccess) {
      await logAudit({
        req,
        actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
        action: "auth.2fa_failed",
        resourceType: "admin",
        resourceId: admin._id.toString(),
        outcome: "failure",
        severity: "warning",
        reason: "Invalid 2FA code or recovery code",
      });

      res.status(401).json({ success: false, message: "Invalid 2FA code. Please try again." });
      return;
    }

    admin.lastLogin = new Date();
    admin.lastReauthAt = new Date();
    admin.failedLoginAttempts = 0;
    admin.lockoutUntil = null;
    await admin.save();

    const fullToken = signToken({
      adminId: admin._id,
      email: admin.email,
      name: admin.name,
      tokenVersion: admin.tokenVersion || 0,
    });

    const { permissions } = await resolveAdminPermissions(admin);

    await logAudit({
      req,
      actor: { id: admin._id.toString(), name: admin.name, email: admin.email },
      action: usedRecoveryCode ? "auth.2fa_recovery_login" : "auth.2fa_login_success",
      resourceType: "admin",
      resourceId: admin._id.toString(),
      outcome: "success",
      severity: usedRecoveryCode ? "warning" : "info",
    });

    res.json({
      success: true,
      message: "Two-Factor authentication verified successfully",
      token: fullToken,
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
        twoFactorEnabled: admin.twoFactorEnabled,
        mustChangePassword: admin.mustChangePassword,
      },
    });
  } catch (error: any) {
    console.error("validate2FALogin error:", error);
    res.status(500).json({ success: false, message: "Failed to validate 2FA login", error: error.message });
  }
}

/**
 * 4. Super Admin Reset 2FA for a Staff Member
 */
export async function resetStaff2FA(req: RbacRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const actor = getActor(req);

    const admin = await Admin.findById(id);
    if (!admin) {
      res.status(404).json({ success: false, message: "Staff member not found." });
      return;
    }

    admin.twoFactorEnabled = false;
    admin.twoFactorSecret = null;
    admin.twoFactorRecoveryCodes = [];
    admin.tokenVersion = (admin.tokenVersion || 0) + 1; // Force sign out
    await admin.save();

    await logAudit({
      req,
      action: "auth.2fa_reset",
      resourceType: "admin",
      resourceId: admin._id.toString(),
      severity: "high",
      reason: `2FA reset by admin ${actor.name} (${actor.email})`,
    });

    res.json({
      success: true,
      message: `2FA has been reset for ${admin.name}. Their active sessions have been signed out.`,
    });
  } catch (error: any) {
    console.error("resetStaff2FA error:", error);
    res.status(500).json({ success: false, message: "Failed to reset 2FA", error: error.message });
  }
}

/**
 * 5. Authenticated User Disable 2FA
 * Requires password verification. Blocked if any assigned role strictly mandates 2FA.
 */
export async function disable2FA(req: RbacRequest, res: Response): Promise<void> {
  try {
    const user = req.adminUser;
    const { password } = req.body;

    if (!user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    if (!password) {
      res.status(400).json({ success: false, message: "Password confirmation is required to disable 2FA." });
      return;
    }

    const admin = await Admin.findById(user.id);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin account not found" });
      return;
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, admin.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid password. 2FA was not disabled." });
      return;
    }

    // Check if any held role strictly mandates 2FA
    const roleKeys = admin.roles || [admin.role || "super_admin"];
    const mandatoryRoles = await Role.find({ key: { $in: roleKeys }, requires2FA: true });
    if (mandatoryRoles.length > 0) {
      res.status(403).json({
        success: false,
        message: `Cannot disable 2FA: Two-Factor Authentication is mandatory for your assigned role(s): [${mandatoryRoles.map((r) => r.name).join(", ")}].`,
      });
      return;
    }

    admin.twoFactorEnabled = false;
    admin.twoFactorSecret = null;
    admin.twoFactorRecoveryCodes = [];
    admin.tokenVersion = (admin.tokenVersion || 0) + 1; // Invalidate other sessions
    await admin.save();

    await logAudit({
      req,
      action: "auth.2fa_disabled",
      resourceType: "admin",
      resourceId: admin._id.toString(),
      severity: "high",
      reason: `2FA disabled by user ${admin.name}`,
    });

    const freshToken = signToken({
      adminId: admin._id,
      email: admin.email,
      name: admin.name,
      tokenVersion: admin.tokenVersion,
    });

    res.json({
      success: true,
      message: "Two-Factor Authentication disabled successfully.",
      token: freshToken,
    });
  } catch (error: any) {
    console.error("disable2FA error:", error);
    res.status(500).json({ success: false, message: "Failed to disable 2FA", error: error.message });
  }
}


