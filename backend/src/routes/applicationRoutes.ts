import { Router } from "express";
import {
  submitApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";
import { verifyTurnstile } from "../middlewares/turnstile.js";

export const applicationRouter = Router();

applicationRouter.post("/", formSubmissionLimiter, honeypotCheck, verifyTurnstile, submitApplication);
applicationRouter.get("/", listApplications);
applicationRouter.patch("/:id/status", updateApplicationStatus);
