import { Router } from "express";
import {
  submitApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";

export const applicationRouter = Router();

applicationRouter.post("/", formSubmissionLimiter, honeypotCheck, submitApplication);
applicationRouter.get("/", listApplications);
applicationRouter.patch("/:id/status", updateApplicationStatus);
