import { Router } from "express";
import {
  submitApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";
import { createTurnstileMiddleware } from "../middlewares/turnstile.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const applicationRouter = Router();

applicationRouter.post(
  "/",
  formSubmissionLimiter,
  honeypotCheck,
  createTurnstileMiddleware({ action: "application" }),
  submitApplication
);
applicationRouter.get("/", requireAdminAuth, listApplications);
applicationRouter.patch("/:id/status", requireAdminAuth, updateApplicationStatus);
