import { Request, Response } from "express";
import { Donation } from "../models/Donation.js";
import { Patient } from "../models/Patient.js";
import { Verification } from "../models/Verification.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import {
  generateReceiptNumber,
  getNextReceiptNumber,
  getNextReceiptNo,
  getNextTransactionNo,
  getCurrentFinancialYear,
} from "../utils/idGenerator.js";
import { verifyToken } from "../utils/authUtils.js";
import { sendReceiptEmail, sendAdminInboundNotificationEmail } from "../services/emailService.js";
import { syncToCommunityDirectory } from "../services/directorySyncService.js";
import { generateReceiptPdfBuffer } from "../services/receiptPdfService.js";
import { projectDonor } from "../utils/piiFilter.js";
import { getActor, logAudit } from "../services/auditService.js";

function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "***";
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `*@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

function maskPhone(phone: string): string {
  if (!phone || phone.length < 4) return "****";
  return `******${phone.slice(-4)}`;
}

function maskPan(pan?: string): string {
  if (!pan || pan.length < 5) return "*****";
  return `${pan.slice(0, 5)}****${pan.slice(-1)}`;
}

export async function createDonation(req: Request, res: Response): Promise<void> {
  try {
    const {
      donorName,
      donorType,
      email,
      phone,
      countryCode,
      address,
      city,
      state,
      pincode,
      financialType,
      frequency,
      amount,
      taxExemption,
      pan,
      patientSlug,
      paymentMode,
    } = req.body;

    const trimmedName = typeof donorName === "string" ? donorName.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim().replace(/[\s-]/g, "") : "";

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !amount || !financialType) {
      res.status(400).json({ success: false, message: "Missing required donation fields" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      res.status(400).json({ success: false, message: "A valid email address is required" });
      return;
    }

    const phoneRegex = /^[0-9+]{8,15}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      res.status(400).json({ success: false, message: "A valid contact phone number is required" });
      return;
    }

    if (taxExemption && (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan))) {
      res.status(400).json({ success: false, message: "A valid 10-character PAN is required for 80G tax exemption" });
      return;
    }

    const receiptNo = await getNextReceiptNumber();
    const certificateNo = receiptNo.replace(/RCPT|REC/i, "CERT");
    const isPublicConsent = req.body.websiteConsent === "Yes" || Boolean(req.body.isPublicConsent);

    const donation = new Donation({
      receiptNo,
      certificateNo,
      donorName: trimmedName,
      donorType: donorType || "Individual",
      email: trimmedEmail,
      phone: trimmedPhone,
      countryCode: countryCode || "+91",
      address: address || (city ? `${city}, ${state || ""} - ${pincode || ""}`.trim() : "Online Supporter"),
      city: city || "Not Specified",
      state: state || "Not Specified",
      pincode: pincode || "000000",
      financialType,
      frequency: frequency || "One Time",
      amount: Number(amount),
      taxExemption: Boolean(taxExemption),
      pan: pan ? pan.toUpperCase() : undefined,
      donorPhotoUrl: req.body.donorPhotoUrl,
      patientSlug,
      paymentMode: paymentMode || "Online",
      paymentStatus: "Success", // In sandbox/mock or after gateway capture
      websiteConsent: req.body.websiteConsent || "Yes",
      isPublicConsent,
    });

    await donation.save();

    // Automatically post to append-only LedgerEntry
    try {
      const fy = getCurrentFinancialYear();
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const ledgerEntryNo = await getNextTransactionNo();
      const amountInPaise = Math.round(Number(amount) * 100);
      await LedgerEntry.create({
        entryNo: ledgerEntryNo,
        effectiveDate: now,
        postedAt: now,
        fy,
        month,
        direction: "credit",
        amountPaise: amountInPaise,
        type: "donation",
        head: financialType || "General Donation",
        sourceType: "donation",
        sourceId: donation._id,
        workAreaId: req.body.workAreaId || "HLT",
        fundType: req.body.fundType || "general",
        paymentMethod: paymentMode || "Online",
        idempotencyKey: `don_rcpt_${receiptNo}`,
        createdBy: "donation_controller",
      });
    } catch (ledgerErr) {
      console.warn("Ledger entry recording warning in createDonation:", ledgerErr);
    }

    // If donation was for an urgent patient, increment raisedAmount and donorsCount
    if (patientSlug) {
      await Patient.findOneAndUpdate(
        { slug: patientSlug },
        { $inc: { raisedAmount: Number(amount), donorsCount: 1 } }
      );
    }

    // Auto-create document verification record for this receipt
    await Verification.findOneAndUpdate(
      { documentNo: receiptNo },
      {
        documentNo: receiptNo,
        documentType: "donation_receipt",
        title: `80G Donation Receipt - ${financialType}`,
        issuedTo: donorName,
        issueDate: new Date(),
        status: "Verified",
        details: {
          amount: Number(amount),
          pan: pan ? pan.toUpperCase() : undefined,
          financialType,
          receiptNo,
          certificateNo,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Auto-create document verification record for Donor Certificate
    await Verification.findOneAndUpdate(
      { documentNo: certificateNo },
      {
        documentNo: certificateNo,
        documentType: "programme_certificate",
        title: `Donor Appreciation Certificate - ${financialType}`,
        issuedTo: donorName,
        issueDate: new Date(),
        status: "Verified",
        details: {
          amount: Number(amount),
          financialType,
          receiptNo,
          certificateNo,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Synchronize into community directory spotlight
    syncToCommunityDirectory({
      id: `dir-donor-${receiptNo}`,
      name: donorName,
      role: `${financialType} Supporter`,
      type: "donor",
      location: [city, state].filter(Boolean).join(", ") || "India",
      avatar: req.body.donorPhotoUrl || "",
      category: financialType,
      bio: `Supported ISLAH ${financialType} initiative.`,
      isPublicConsent,
      receiptNo,
      certificateNo,
    }).catch((e) => console.warn("Donor directory sync warning:", e));

    // Dispatch Official 80G Donation Receipt Email with PDF Attachment (Async, Non-blocking)
    if (trimmedEmail) {
      sendReceiptEmail(trimmedEmail, {
        donorName: trimmedName,
        donorType: donorType || "Individual",
        email: trimmedEmail,
        phone: trimmedPhone,
        address: donation.address,
        city: donation.city,
        state: donation.state,
        pincode: donation.pincode,
        receiptNo,
        amount: Number(amount),
        cause: financialType,
        paymentMode: donation.paymentMode,
        pan: donation.pan,
        taxExemption: donation.taxExemption,
        transactionId: donation.transactionId,
        createdAt: donation.createdAt,
      }).catch((e) => console.warn("Donation receipt email dispatch failed:", e));

      // Admin Alert
      sendAdminInboundNotificationEmail(`New Donation: ₹${Number(amount).toLocaleString("en-IN")} from ${trimmedName}`, {
        category: "Donation",
        title: `Donation Received - Receipt #${receiptNo}`,
        items: [
          { label: "Donor Name", value: trimmedName },
          { label: "Amount", value: `₹${Number(amount).toLocaleString("en-IN")}` },
          { label: "Cause / Purpose", value: financialType },
          { label: "Payment Mode", value: donation.paymentMode },
          { label: "80G Tax Exemption", value: donation.pan ? `Claimed (PAN: ${donation.pan})` : "General Contribution" },
          { label: "Receipt No", value: receiptNo },
        ],
      }).catch((e) => console.warn("Admin donation alert failed:", e));
    }

    res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      receipt: donation,
    });
  } catch (error) {
    console.error("createDonation error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getDonationByReceiptNo(req: Request, res: Response): Promise<void> {
  try {
    const { receiptNo } = req.params;
    const donation = await Donation.findOne({ receiptNo });

    if (!donation) {
      res.status(404).json({ success: false, message: "Donation receipt not found" });
      return;
    }

    const authHeader = req.headers.authorization;
    const isAdmin = authHeader ? verifyToken(authHeader).valid : false;

    if (isAdmin) {
      res.json({ success: true, receipt: donation, isFullAdminAccess: true });
      return;
    }

    // Mask sensitive PII for unauthenticated public lookups
    const maskedReceipt = {
      receiptNo: donation.receiptNo,
      donorName: donation.donorName,
      donorType: donation.donorType,
      email: maskEmail(donation.email),
      phone: maskPhone(donation.phone),
      countryCode: donation.countryCode,
      city: donation.city,
      state: donation.state,
      financialType: donation.financialType,
      amount: donation.amount,
      taxExemption: donation.taxExemption,
      pan: donation.pan ? maskPan(donation.pan) : undefined,
      paymentMode: donation.paymentMode,
      paymentStatus: donation.paymentStatus,
      createdAt: donation.createdAt,
    };

    res.json({ success: true, receipt: maskedReceipt, isFullAdminAccess: false });
  } catch (error) {
    console.error("getDonationByReceiptNo error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function listDonations(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 20);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.taxExemption === "true") {
      filter.taxExemption = true;
    } else if (req.query.taxExemption === "false") {
      filter.taxExemption = false;
    }

    if (req.query.paymentStatus && req.query.paymentStatus !== "all") {
      filter.paymentStatus = req.query.paymentStatus;
    }

    if (req.query.paymentMode && req.query.paymentMode !== "all") {
      filter.paymentMode = { $regex: new RegExp(`^${String(req.query.paymentMode)}$`, "i") };
    }

    if (req.query.workAreaId && req.query.workAreaId !== "all") {
      filter.workAreaId = String(req.query.workAreaId).toUpperCase();
    }

    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) {
        const fromDate = new Date(req.query.from as string);
        fromDate.setHours(0, 0, 0, 0);
        filter.createdAt.$gte = fromDate;
      }
      if (req.query.to) {
        const toDate = new Date(req.query.to as string);
        toDate.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = toDate;
      }
    } else if (req.query.fy && req.query.fy !== "all") {
      const parts = String(req.query.fy).split("-");
      const startYear = parseInt(parts[0], 10);
      if (!isNaN(startYear)) {
        filter.createdAt = {
          $gte: new Date(startYear, 3, 1, 0, 0, 0, 0),
          $lte: new Date(startYear + 1, 2, 31, 23, 59, 59, 999),
        };
      }
    }

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { donorName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { pan: { $regex: q, $options: "i" } },
        { receiptNo: { $regex: q, $options: "i" } },
        { transactionId: { $regex: q, $options: "i" } },
        { razorpayPaymentId: { $regex: q, $options: "i" } },
        { razorpayOrderId: { $regex: q, $options: "i" } },
      ];
    }

    const [donations, total, stats] = await Promise.all([
      Donation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Donation.countDocuments(filter),
      Donation.aggregate([
        { $match: filter },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
            successCount: {
              $sum: { $cond: [{ $eq: ["$paymentStatus", "Success"] }, 1, 0] },
            },
            pendingCount: {
              $sum: { $cond: [{ $eq: ["$paymentStatus", "Pending"] }, 1, 0] },
            },
            failedCount: {
              $sum: { $cond: [{ $eq: ["$paymentStatus", "Failed"] }, 1, 0] },
            },
          },
        },
      ]),
    ]);

    const statSummary = stats[0] || {
      totalAmount: 0,
      successCount: 0,
      pendingCount: 0,
      failedCount: 0,
    };

    const user = (req as any).adminUser;
    const canViewPii = user?.permissionsSet?.has("*") || user?.permissionsSet?.has("finance.donation:view_pii");
    const projectedDonations = donations.map((d: any) => projectDonor(d, canViewPii));

    res.json({
      success: true,
      data: projectedDonations,
      stats: statSummary,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) || 1 },
    });
  } catch (error) {
    console.error("listDonations error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * Downloads official 80G Donation Receipt PDF on demand
 */
export async function downloadReceiptPdf(req: Request, res: Response): Promise<void> {
  try {
    const { receiptNo } = req.params;
    const donation = await Donation.findOne({ receiptNo });

    if (!donation) {
      res.status(404).json({ success: false, message: "Donation receipt not found" });
      return;
    }

    const pdfBuffer = await generateReceiptPdfBuffer({
      receiptNo: donation.receiptNo,
      donorName: donation.donorName,
      donorType: donation.donorType,
      email: donation.email,
      phone: donation.phone,
      address: donation.address,
      city: donation.city,
      state: donation.state,
      pincode: donation.pincode,
      amount: donation.amount,
      financialType: donation.financialType,
      frequency: donation.frequency,
      paymentMode: donation.paymentMode,
      transactionId: donation.transactionId,
      pan: donation.pan,
      taxExemption: donation.taxExemption,
      createdAt: donation.createdAt,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="ISLAH_Receipt_${donation.receiptNo}.pdf"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);
    res.status(200).send(pdfBuffer);
  } catch (error: any) {
    console.error("downloadReceiptPdf error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate receipt PDF",
      error: error.message,
    });
  }
}

/**
 * Re-sends official 80G receipt email to donor
 */
export async function resendReceiptEmail(req: Request, res: Response): Promise<void> {
  try {
    const { receiptNo } = req.params;
    const donation = await Donation.findOne({ receiptNo });

    if (!donation) {
      res.status(404).json({ success: false, message: "Donation receipt not found" });
      return;
    }

    if (!donation.email) {
      res.status(400).json({ success: false, message: "No email address on record for this donation" });
      return;
    }

    await sendReceiptEmail(donation.email, {
      donorName: donation.donorName,
      donorType: donation.donorType || "Individual",
      email: donation.email,
      phone: donation.phone,
      address: donation.address,
      city: donation.city,
      state: donation.state,
      pincode: donation.pincode,
      receiptNo: donation.receiptNo,
      amount: donation.amount,
      cause: donation.financialType,
      paymentMode: donation.paymentMode,
      pan: donation.pan,
      taxExemption: donation.taxExemption,
      transactionId: donation.transactionId,
      createdAt: donation.createdAt,
    });

    res.json({
      success: true,
      message: `Receipt #${donation.receiptNo} sent successfully to ${donation.email}`,
    });
  } catch (error: any) {
    console.error("resendReceiptEmail error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send receipt email",
      error: error.message,
    });
  }
}

/**
 * Dedicated Manual Offline Donation Endpoint (POST /api/finance/donations/manual)
 */
export async function createManualDonation(req: Request, res: Response): Promise<void> {
  try {
    const {
      donorName,
      donorType = "Individual",
      email = "offline-donor@islahwelfare.org",
      phone = "9999999999",
      countryCode = "+91",
      address,
      city,
      state,
      pincode,
      amount,
      paymentMode = "Cash",
      paymentReference,
      workAreaId = "HLT",
      initiativeId,
      financialType = "General Donation",
      taxExemption = true,
      pan,
      notes,
    } = req.body;

    if (!donorName || !amount) {
      res.status(400).json({ success: false, message: "Donor name and donation amount are required" });
      return;
    }

    if (taxExemption && pan) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(pan.toUpperCase())) {
        res.status(400).json({ success: false, message: "Invalid PAN format. Must be 10 characters (e.g. ABCDE1234F)" });
        return;
      }
    }

    const currentYear = new Date().getFullYear();
    const receiptNo = await getNextReceiptNo(currentYear);
    const certificateNo = `CERT-${currentYear}-${receiptNo.replace(/\D/g, "").slice(-5)}`;
    const transactionId = paymentReference || `MAN-${Date.now()}`;
    const amountNum = Number(amount);
    const amountPaise = Math.round(amountNum * 100);

    const donation = new Donation({
      receiptNo,
      certificateNo,
      transactionId,
      donorName: donorName.trim(),
      donorType,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      countryCode,
      address,
      city,
      state,
      pincode,
      financialType,
      amount: amountNum,
      amountPaise,
      grossPaise: amountPaise,
      feePaise: 0,
      netPaise: amountPaise,
      workAreaId: workAreaId.toUpperCase(),
      initiativeId,
      taxExemption: Boolean(taxExemption),
      pan: pan ? pan.toUpperCase() : undefined,
      paymentMode,
      paymentStatus: "Success",
      websiteConsent: "Yes",
      isPublicConsent: true,
      notes,
    });

    await donation.save();

    const actor = getActor(req);

    await logAudit({
      req,
      action: "finance.donation:create",
      resourceType: "donation",
      resourceId: donation._id.toString(),
      after: { receiptNo, donorName, amount: amountNum, financialType },
      reason: `Manual donation recorded by ${actor.name || actor.email}`,
    });

    // Dual-entry Ledger append
    try {
      const fy = getCurrentFinancialYear();
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const txnNo = await getNextTransactionNo(currentYear);

      await LedgerEntry.create({
        entryNo: txnNo,
        effectiveDate: now,
        postedAt: now,
        fy,
        month,
        direction: "credit",
        amountPaise,
        type: "manual_income",
        head: financialType,
        sourceType: "income",
        sourceId: donation._id,
        workAreaId: workAreaId.toUpperCase(),
        initiativeId,
        fundType: "general",
        paymentMethod: paymentMode,
        idempotencyKey: `man_don_${receiptNo}`,
        createdBy: actor.name || actor.email,
      });
    } catch (ledgerErr) {
      console.warn("Manual donation ledger post warning:", ledgerErr);
    }

    // Auto-create document verification record for 80G receipt
    await Verification.findOneAndUpdate(
      { documentNo: receiptNo },
      {
        documentNo: receiptNo,
        documentType: "donation_receipt",
        title: `80G Donation Receipt - ${financialType}`,
        issuedTo: donorName.trim(),
        issueDate: new Date(),
        status: "Verified",
        details: {
          amount: amountNum,
          financialType,
          receiptNo,
          pan: pan ? pan.toUpperCase() : undefined,
          paymentMode,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Auto-create document verification record for donor certificate
    await Verification.findOneAndUpdate(
      { documentNo: certificateNo },
      {
        documentNo: certificateNo,
        documentType: "programme_certificate",
        title: `Donor Appreciation Certificate - ${financialType}`,
        issuedTo: donorName.trim(),
        issueDate: new Date(),
        status: "Verified",
        details: {
          amount: amountNum,
          financialType,
          receiptNo,
          certificateNo,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Asynchronously dispatch official 80G receipt email if valid email provided
    if (email && email.includes("@") && !email.includes("offline-donor")) {
      sendReceiptEmail(email.trim().toLowerCase(), {
        donorName: donorName.trim(),
        donorType,
        email: email.trim().toLowerCase(),
        phone,
        address,
        city,
        state,
        pincode,
        receiptNo,
        amount: amountNum,
        cause: financialType,
        paymentMode,
        pan: pan ? pan.toUpperCase() : undefined,
        taxExemption: Boolean(taxExemption),
        transactionId,
        createdAt: donation.createdAt,
      }).catch((e) => console.warn("Manual donation receipt email error:", e));
    }

    res.status(201).json({
      success: true,
      message: `Offline donation recorded successfully with Receipt #${receiptNo}`,
      data: donation,
    });
  } catch (error: any) {
    console.error("createManualDonation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record manual donation",
      error: error.message,
    });
  }
}

/**
 * List Receipts & Acknowledgements (GET /api/finance/receipts)
 */
export async function listReceipts(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 20);
    const skip = (page - 1) * limit;

    const filter: any = {
      receiptNo: { $exists: true, $ne: null },
    };

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { receiptNo: { $regex: q, $options: "i" } },
        { certificateNo: { $regex: q, $options: "i" } },
        { donorName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { pan: { $regex: q, $options: "i" } },
      ];
    }

    if (req.query.taxExemption === "true") {
      filter.taxExemption = true;
    }

    const [donations, total] = await Promise.all([
      Donation.find(filter)
        .select("receiptNo certificateNo donorName email phone amount financialType taxExemption pan paymentMode paymentStatus createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Donation.countDocuments(filter),
    ]);

    const formatted = donations.map((d) => ({
      receiptNo: d.receiptNo,
      certificateNo: d.certificateNo || `CERT-${d.receiptNo}`,
      donorName: d.donorName,
      email: d.email,
      phone: d.phone,
      issueDate: new Date(d.createdAt).toISOString().split("T")[0],
      amount: d.amount,
      cause: d.financialType,
      taxExemption: d.taxExemption,
      pan: d.pan,
      deliveryStatus: d.email && d.email.includes("@") && !d.email.includes("offline") ? "Sent" : "Queued",
      verificationStatus: "Verified",
    }));

    res.json({
      success: true,
      data: formatted,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) || 1 },
    });
  } catch (error: any) {
    console.error("listReceipts error:", error);
    res.status(500).json({ success: false, message: "Failed to list receipts", error: error.message });
  }
}
