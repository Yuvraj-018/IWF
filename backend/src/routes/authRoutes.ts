import { Router } from "express";
import {
  adminLogin,
  getAdminProfile,
  adminLogout,
  acceptInvite,
  changePassword,
  reauthenticate,
} from "../controllers/authController.js";
import {
  setup2FA,
  verifyAndActivate2FA,
  validate2FALogin,
  resetStaff2FA,
  disable2FA,
} from "../controllers/twoFactorController.js";
import { createRateLimiter } from "../middlewares/rateLimiter.js";
import { createTurnstileMiddleware } from "../middlewares/turnstile.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const authRouter = Router();

// Strict brute-force shield for admin login (max 10 attempts per 15 minutes)
const adminAuthLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please wait 15 minutes before trying again.",
});

// Login, invitation acceptance, and 2FA validation
authRouter.post(
  "/admin/login",
  adminAuthLimiter,
  createTurnstileMiddleware({ action: "cms_login" }),
  adminLogin
);

authRouter.post("/admin/accept-invite", adminAuthLimiter, acceptInvite);
authRouter.post("/admin/2fa/validate-login", adminAuthLimiter, validate2FALogin);

// Protected session endpoints
authRouter.get("/admin/me", authenticate, getAdminProfile);
authRouter.post("/admin/logout", authenticate, adminLogout);
authRouter.post("/admin/change-password", authenticate, changePassword);
authRouter.post("/admin/reauth", authenticate, reauthenticate);

// 2FA Management
authRouter.post("/admin/2fa/setup", authenticate, setup2FA);
authRouter.post("/admin/2fa/verify", authenticate, verifyAndActivate2FA);
authRouter.post("/admin/2fa/disable", authenticate, disable2FA);
authRouter.post("/admin/staff/:id/2fa/reset", authenticate, requirePermission("system.staff:edit"), resetStaff2FA);
