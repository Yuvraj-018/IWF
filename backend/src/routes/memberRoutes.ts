import { Router } from "express";
import {
  registerMember,
  checkMemberStatus,
  listMembers,
  sendMemberOtp,
  verifyMemberOtp,
  renewMember,
} from "../controllers/memberController.js";
import { otpRateLimiter, formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";

export const memberRouter = Router();

memberRouter.post("/", formSubmissionLimiter, honeypotCheck, registerMember);
memberRouter.get("/", listMembers);
memberRouter.get("/status/:memberNo", checkMemberStatus);
memberRouter.post("/send-otp", otpRateLimiter, sendMemberOtp);
memberRouter.post("/verify-otp", verifyMemberOtp);
memberRouter.post("/renew", renewMember);
