import { Router } from "express";
import {
  createDonation,
  getDonationByReceiptNo,
  listDonations,
  downloadReceiptPdf,
  resendReceiptEmail,
} from "../controllers/donationController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";

export const donationRouter = Router();

donationRouter.post("/", formSubmissionLimiter, honeypotCheck, createDonation);
donationRouter.post("/manual", requireAdminAuth, createDonation);
donationRouter.get("/", requireAdminAuth, listDonations);
donationRouter.get("/:receiptNo", getDonationByReceiptNo);
donationRouter.get("/:receiptNo/pdf", downloadReceiptPdf);
donationRouter.post("/:receiptNo/resend", requireAdminAuth, resendReceiptEmail);
