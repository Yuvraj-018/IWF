import { Request, Response } from "express";
import { Donation } from "../models/Donation.js";
import { Patient } from "../models/Patient.js";
import { Verification } from "../models/Verification.js";
import { generateReceiptNumber } from "../utils/idGenerator.js";
import { verifyToken } from "../utils/authUtils.js";
import { sendReceiptEmail, sendAdminInboundNotificationEmail } from "../services/emailService.js";
import { syncToCommunityDirectory } from "../services/directorySyncService.js";

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

    const count = await Donation.countDocuments();
    const receiptNo = generateReceiptNumber(count + 1);
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

    // If donation was for an urgent patient, increment raisedAmount and donorsCount
    if (patientSlug) {
      await Patient.findOneAndUpdate(
        { slug: patientSlug },
        { $inc: { raisedAmount: Number(amount), donorsCount: 1 } }
      );
    }

    // Auto-create document verification record for this receipt
    await Verification.create({
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
    });

    // Auto-create document verification record for Donor Certificate
    await Verification.create({
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
    });

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

    if (req.query.paymentStatus) {
      filter.paymentStatus = req.query.paymentStatus;
    }

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { donorName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { pan: { $regex: q, $options: "i" } },
        { receiptNo: { $regex: q, $options: "i" } },
      ];
    }

    const [donations, total] = await Promise.all([
      Donation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Donation.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: donations,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) || 1 },
    });
  } catch (error) {
    console.error("listDonations error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
