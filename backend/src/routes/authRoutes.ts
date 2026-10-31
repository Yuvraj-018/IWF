import { Router } from "express";
import { adminLogin, getAdminProfile, adminLogout } from "../controllers/authController.js";
import { createRateLimiter } from "../middlewares/rateLimiter.js";

export const authRouter = Router();

// Strict brute-force shield for admin login (max 10 attempts per 15 minutes)
const adminAuthLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please wait 15 minutes before trying again.",
});

authRouter.post("/admin/login", adminAuthLimiter, adminLogin);
authRouter.get("/admin/me", getAdminProfile);
authRouter.post("/admin/logout", adminLogout);

