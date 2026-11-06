import { Router } from "express";
import {
  submitContact,
  listContacts,
  updateContactStatus,
} from "../controllers/contactController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";
import { createTurnstileMiddleware } from "../middlewares/turnstile.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const contactRouter = Router();

contactRouter.post(
  "/",
  formSubmissionLimiter,
  honeypotCheck,
  createTurnstileMiddleware({ action: "contact" }),
  submitContact
);

contactRouter.get("/", requireAdminAuth, listContacts);
contactRouter.patch("/:id/status", requireAdminAuth, updateContactStatus);
