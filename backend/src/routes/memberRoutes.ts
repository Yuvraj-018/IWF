import { Router } from "express";
import {
  registerMember,
  checkMemberStatus,
  getMemberProfile,
  listMembers,
  sendMemberOtp,
  verifyMemberOtp,
  renewMember,
  toggleMemberVisibility,
} from "../controllers/memberController.js";
import { otpRateLimiter, formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";
import { cacheResponse } from "../middlewares/cache.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const memberRouter = Router();

memberRouter.post("/", formSubmissionLimiter, honeypotCheck, registerMember);
memberRouter.get("/", cacheResponse(120, "members"), listMembers);
memberRouter.put("/:id/visibility", requireAdminAuth, toggleMemberVisibility);
memberRouter.get("/profile/:identifier", getMemberProfile);
memberRouter.get("/status/:memberNo", checkMemberStatus);
memberRouter.post("/send-otp", otpRateLimiter, sendMemberOtp);
memberRouter.post("/verify-otp", verifyMemberOtp);
memberRouter.post("/renew", renewMember);
