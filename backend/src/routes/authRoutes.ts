import { Router } from "express";
import {
  adminLogin,
  getAdminProfile,
  adminLogout,
  acceptInvite,
  changePassword,
  reauthenticate,
} from "../controllers/authController.js";
import { createRateLimiter } from "../middlewares/rateLimiter.js";
import { createTurnstileMiddleware } from "../middlewares/turnstile.js";
import { authenticate } from "../middlewares/rbac.js";

export const authRouter = Router();

// Strict brute-force shield for admin login (max 10 attempts per 15 minutes)
const adminAuthLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please wait 15 minutes before trying again.",
});

// Login and invitation acceptance
authRouter.post(
  "/admin/login",
  adminAuthLimiter,
  createTurnstileMiddleware({ action: "cms_login" }),
  adminLogin
);

authRouter.post("/admin/accept-invite", adminAuthLimiter, acceptInvite);

// Protected session endpoints
authRouter.get("/admin/me", authenticate, getAdminProfile);
authRouter.post("/admin/logout", authenticate, adminLogout);
authRouter.post("/admin/change-password", authenticate, changePassword);
authRouter.post("/admin/reauth", authenticate, reauthenticate);

