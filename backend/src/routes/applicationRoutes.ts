import { Router } from "express";
import {
  submitApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";
import { createTurnstileMiddleware } from "../middlewares/turnstile.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const applicationRouter = Router();

// Public Application Submission (Preserved Exactly)
applicationRouter.post(
  "/",
  formSubmissionLimiter,
  honeypotCheck,
  createTurnstileMiddleware({ action: "application" }),
  submitApplication
);

// Protected Admin Application Operations
applicationRouter.get(
  "/",
  authenticate,
  requirePermission("membership.application:view"),
  listApplications
);

applicationRouter.patch(
  "/:id/status",
  authenticate,
  requirePermission("membership.application:review"),
  updateApplicationStatus
);
