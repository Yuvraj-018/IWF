import { Router } from "express";
import {
  createManualDonation,
  getDonationByReceiptNo,
  listDonations,
  downloadReceiptPdf,
  resendReceiptEmail,
} from "../controllers/donationController.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const donationRouter = Router();

// Public donations are created only by /api/payments/verify after Razorpay confirms
// the payment. The old public POST "/" recorded "Success" donations with no payment
// and has been removed.
donationRouter.get("/:receiptNo", getDonationByReceiptNo);
// The receipt PDF carries donor PII (PAN, address), so it is staff-only. Donors get
// it by email and from the membership/donor portal.
donationRouter.get(
  "/:receiptNo/pdf",
  authenticate,
  requirePermission("finance.receipt:view"),
  downloadReceiptPdf
);

// Protected Admin Finance Operations
donationRouter.post(
  "/manual",
  authenticate,
  requirePermission("finance.donation:create"),
  createManualDonation
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
