import { Router } from "express";
import {
  submitContact,
  listContacts,
  updateContactStatus,
} from "../controllers/contactController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";
import { createTurnstileMiddleware } from "../middlewares/turnstile.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const contactRouter = Router();

// Public Contact Form Submission (Preserved Exactly)
contactRouter.post(
  "/",
  formSubmissionLimiter,
  honeypotCheck,
  createTurnstileMiddleware({ action: "contact" }),
  submitContact
);

// Protected Admin Operations
contactRouter.get("/", authenticate, requirePermission("cms.contact:view"), listContacts);
contactRouter.patch("/:id/status", authenticate, requirePermission("cms.contact:edit"), updateContactStatus);
