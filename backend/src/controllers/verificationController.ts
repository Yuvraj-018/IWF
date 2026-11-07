import { Request, Response } from "express";
import { Verification } from "../models/Verification.js";
import { Donation } from "../models/Donation.js";
import { Member } from "../models/Member.js";

const STATUTORY_DOCS: Record<string, { type: string; title: string; issuedTo: string; details: any }> = {
  "26/2015": {
    type: "institutional_document",
    title: "Indian Trust Act Registration Certificate",
    issuedTo: "Islah Welfare Foundation (ISLAH)",
    details: { regNo: "26/2015", date: "2015-05-18", jurisdiction: "Bihar / New Delhi" },
  },
  "AABTI2820H": {
    type: "institutional_document",
    title: "Permanent Account Number (PAN)",
    issuedTo: "Islah Welfare Foundation",
    details: { pan: "AABTI2820H", category: "Trust", jurisdiction: "Income Tax Department" },
  },
  "AABTI2820HE2026": {
    type: "institutional_document",
    title: "Income Tax Section 12A / 12AB Registration Order",
    issuedTo: "Islah Welfare Foundation",
    details: { orderNo: "AABTI2820HE2026", validFrom: "2026-04-01" },
  },
  "AABTI2820HF2026": {
    type: "institutional_document",
    title: "Income Tax Section 80G Approval Certificate",
    issuedTo: "Islah Welfare Foundation",
    details: { orderNo: "AABTI2820HF2026", validFrom: "2026-04-01" },
  },
  "CSR00010141": {
    type: "institutional_document",
    title: "Ministry of Corporate Affairs CSR-1 Registration",
    issuedTo: "Islah Welfare Foundation",
    details: { csrNo: "CSR00010141", ministry: "Ministry of Corporate Affairs, Govt. of India" },
  },
  "BR/2016/0101449": {
    type: "institutional_document",
    title: "NITI Aayog NGO Darpan Registration",
    issuedTo: "Islah Welfare Foundation",
    details: { darpanId: "BR/2016/0101449", portal: "NGO Darpan, Govt. of India" },
  },
};

export async function verifyDocument(req: Request, res: Response): Promise<void> {
  try {
    const rawNo = req.params.documentNo;
    const documentNo = Array.isArray(rawNo) ? rawNo[0] : rawNo;

    if (!documentNo || !documentNo.trim()) {
      res.status(400).json({ success: false, message: "Document number is required" });
      return;
    }

    const cleanNo = documentNo.trim();
    const cleanUpper = cleanNo.toUpperCase();

    // 1. Direct match in Verification collection
    const doc = await Verification.findOne({
      documentNo: { $regex: new RegExp(`^${cleanNo}$`, "i") },
    });

    if (doc) {
      res.json({
        success: true,
        verified: doc.status === "Verified",
        data: {
          documentNo: doc.documentNo,
          documentType: doc.documentType,
          title: doc.title,
          issuedTo: doc.issuedTo,
          issuer: doc.issuer,
          issueDate: doc.issueDate.toISOString().split("T")[0],
          validTill: doc.validTill ? doc.validTill.toISOString().split("T")[0] : null,
          status: doc.status,
          details: doc.details,
        },
      });
      return;
    }

    // 2. Check Donations collection by receiptNo, certificateNo, or transaction ID
    const donation = await Donation.findOne({
      $or: [
        { receiptNo: { $regex: new RegExp(`^${cleanNo}$`, "i") } },
        { certificateNo: { $regex: new RegExp(`^${cleanNo}$`, "i") } },
        { transactionId: cleanNo },
      ],
    });

    if (donation) {
      const isCertQuery = Boolean(
        cleanUpper.startsWith("CERT") ||
        (donation.certificateNo && donation.certificateNo.toLowerCase() === cleanNo.toLowerCase())
      );

      res.json({
        success: true,
        verified: donation.paymentStatus === "Success",
        data: {
          documentNo: isCertQuery ? (donation.certificateNo || cleanNo) : donation.receiptNo,
          documentType: isCertQuery ? "programme_certificate" : "donation_receipt",
          title: isCertQuery
            ? `Donor Appreciation Certificate - ${donation.financialType || "General"}`
            : `Official 80G Donation Receipt - ₹${donation.amount}`,
          issuedTo: donation.donorName,
          issuer: "Islah Welfare Foundation (ISLAH)",
          issueDate: donation.createdAt.toISOString().split("T")[0],
          validTill: null,
          status: donation.paymentStatus === "Success" ? "Verified" : donation.paymentStatus,
          details: {
            amount: donation.amount,
            cause: donation.financialType,
            paymentMode: donation.paymentMode,
            pan: donation.pan || "N/A",
            transactionId: donation.transactionId || "N/A",
            receiptNo: donation.receiptNo,
            certificateNo: donation.certificateNo || "N/A",
          },
        },
      });
      return;
    }

    // 3. Check Members collection by memberNo
    const member = await Member.findOne({
      memberNo: { $regex: new RegExp(`^${cleanNo}$`, "i") },
    });

    if (member) {
      res.json({
        success: true,
        verified: member.status === "Active",
        data: {
          documentNo: member.memberNo,
          documentType: "membership_certificate",
          title: `Official ${member.category} Membership Certificate`,
          issuedTo: member.name,
          issuer: "Islah Welfare Foundation (ISLAH)",
          issueDate: member.validFrom.toISOString().split("T")[0],
          validTill: member.validTill.toISOString().split("T")[0],
          status: member.status,
          details: {
            category: member.category,
            district: member.district,
            state: member.state,
            receiptNo: member.receiptNo,
          },
        },
      });
      return;
    }

    // 4. Check known Statutory documents
    const statutoryMatch = Object.entries(STATUTORY_DOCS).find(([key]) =>
      cleanUpper.includes(key) || key.includes(cleanUpper)
    );

    if (statutoryMatch) {
      const [matchedKey, meta] = statutoryMatch;
      res.json({
        success: true,
        verified: true,
        data: {
          documentNo: matchedKey,
          documentType: meta.type,
          title: meta.title,
          issuedTo: meta.issuedTo,
          issuer: "Government Statutory Authority / Islah Welfare Foundation",
          issueDate: "2015-05-18",
          validTill: null,
          status: "Verified",
          details: meta.details,
        },
      });
      return;
    }

    // Not found
    res.status(404).json({
      success: false,
      verified: false,
      message: `No document matching '${cleanNo}' was found in the official ISLAH registry.`,
    });
  } catch (error) {
    console.error("verifyDocument error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
