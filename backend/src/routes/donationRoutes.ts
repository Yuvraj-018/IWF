import { Router } from "express";
import {
  createDonation,
  getDonationByReceiptNo,
  listDonations,
  downloadReceiptPdf,
  resendReceiptEmail,
} from "../controllers/donationController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const donationRouter = Router();

// Public Donation Submission & Receipt Queries (Preserved Exactly)
donationRouter.post("/", formSubmissionLimiter, honeypotCheck, createDonation);
donationRouter.get("/:receiptNo", getDonationByReceiptNo);
donationRouter.get("/:receiptNo/pdf", downloadReceiptPdf);

// Protected Admin Finance Operations
donationRouter.post(
  "/manual",
  authenticate,
  requirePermission("finance.donation:create"),
  createDonation
);
donationRouter.get(
  "/",
  authenticate,
  requirePermission("finance.donation:view"),
  listDonations
);
donationRouter.post(
  "/:receiptNo/resend",
  authenticate,
  requirePermission("finance.receipt:edit"),
  resendReceiptEmail
);
