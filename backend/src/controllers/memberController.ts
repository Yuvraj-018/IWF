import { Request, Response } from "express";
import { Member, MemberCategory } from "../models/Member.js";
import { Verification } from "../models/Verification.js";
import { generateMemberNumber, generateReceiptNumber } from "../utils/idGenerator.js";
import { Donation } from "../models/Donation.js";
import { sendMembershipCardEmail } from "../services/emailService.js";
import { generateAndSendOtp, verifyOtp } from "../services/otpService.js";

const CATEGORY_FEE_MAP: Record<MemberCategory, number> = {
  Community: 2500,
  Contributing: 4000,
  Patron: 6000,
  Blue: 2500,
  Yellow: 1000,
  Green: 500,
};

const CATEGORY_CODE_MAP: Record<MemberCategory, string> = {
  Community: "CM",
  Contributing: "CT",
  Patron: "PT",
  Blue: "BL",
  Yellow: "YL",
  Green: "GR",
};

export async function registerMember(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      fullName,
      fatherName,
      category,
      email,
      phone,
      mobile,
      countryCode,
      state,
      district,
      address,
      pincode,
      membershipPeriod,
      paymentMode,
      transactionId,
      paymentDate,
      consentDisplay,
      photoUrl,
      metadata,
    } = req.body;

    const memberName = (fullName || name || "").trim();
    const memberPhone = (mobile || phone || "").trim();

    if (!memberName || !category || !email || !memberPhone || !state || !district) {
      res.status(400).json({ success: false, message: "Missing required membership fields" });
      return;
    }

    const catKey = category as MemberCategory;
    const baseFee = CATEGORY_FEE_MAP[catKey] || 2500;
    const periodMultiplier = Number(membershipPeriod) === 2 ? 2 : 1;
    const annualFee = baseFee * periodMultiplier;
    const catCode = CATEGORY_CODE_MAP[catKey] || "MEM";

    const count = await Member.countDocuments({ category });
    const memberNo = generateMemberNumber(catCode, count + 1);

    const donationCount = await Donation.countDocuments();
    const receiptNo = generateReceiptNumber(donationCount + 1);

    const validFrom = new Date();
    const validTill = new Date();
    validTill.setFullYear(validTill.getFullYear() + periodMultiplier);

    const member = new Member({
      memberNo,
      name: memberName,
      fatherName,
      category,
      annualFee,
      membershipPeriod: periodMultiplier,
      email: email.trim(),
      phone: memberPhone,
      countryCode: countryCode || "+91",
      state,
      district,
      address,
      pincode,
      paymentMode: paymentMode || "UPI",
      transactionId,
      paymentDate,
      consentDisplay,
      photoUrl,
      status: "Active",
      validFrom,
      validTill,
      receiptNo,
      metadata: metadata || {},
    });

    await member.save();

    // Auto-create document verification for Membership Card
    await Verification.create({
      documentNo: memberNo,
      documentType: "membership_certificate",
      title: `Official Membership Certificate - ${category}`,
      issuedTo: memberName,
      issueDate: validFrom,
      validTill: validTill,
      status: "Verified",
      details: {
        memberNo,
        category,
        district,
        state,
        receiptNo,
      },
    });

    // Dispatch welcome / membership card email
    if (member.email) {
      sendMembershipCardEmail(member.email, {
        name: member.name,
        memberNo: member.memberNo,
        category: member.category,
        validTill: member.validTill.toISOString().split("T")[0],
        annualFee: member.annualFee,
        receiptNo: member.receiptNo,
      }).catch((e) => console.warn("Membership email failed:", e));
    }

    res.status(201).json({
      success: true,
      message: "Membership created successfully",
      member,
    });
  } catch (error) {
    console.error("registerMember error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function checkMemberStatus(req: Request, res: Response): Promise<void> {
  try {
    const { memberNo } = req.params;
    const member = await Member.findOne({
      memberNo: { $regex: new RegExp(`^${memberNo}$`, "i") },
    });

    if (!member) {
      res.status(404).json({ success: false, message: "Membership ID not found" });
      return;
    }

    const now = new Date();
    const isExpired = member.validTill < now;
    const effectiveStatus = isExpired ? "Expired" : member.status;

    res.json({
      success: true,
      member: {
        id: member.memberNo,
        name: member.name,
        category: member.category,
        state: member.state,
        district: member.district,
        status: effectiveStatus,
        validTill: member.validTill.toISOString().split("T")[0],
        joined: member.validFrom.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("checkMemberStatus error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * List Members for Public Directory
 * Only sends Active members who agreed to public display, sorted by highest contribution first.
 */
export async function listMembers(req: Request, res: Response): Promise<void> {
  try {
    const { category, state, status, search } = req.query;
    const query: Record<string, any> = {};

    // Filter Active by default unless explicitly searching status
    if (status) {
      query.status = status;
    } else {
      query.status = "Active";
      query.validTill = { $gte: new Date() };
    }

    // Protect member privacy: only show members who agreed to directory listing
    query.consentDisplay = { $ne: "no" };

    if (category && category !== "All") query.category = category;
    if (state && state !== "All") query.state = state;
    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: "i" } },
        { memberNo: { $regex: search as string, $options: "i" } },
        { district: { $regex: search as string, $options: "i" } },
      ];
    }

    // Sort by highest contribution / tier first, then by registration date
    const members = await Member.find(query)
      .sort({ annualFee: -1, createdAt: -1 })
      .limit(200);

    const safeMembers = members.map((m) => ({
      id: m.memberNo,
      name: m.name,
      category: m.category,
      district: m.district,
      state: m.state,
      status: m.status,
      annualFee: m.annualFee,
      validTill: m.validTill.toISOString().split("T")[0],
      joined: m.validFrom.toISOString().split("T")[0],
      phone: m.phone ? `${m.phone.slice(0, 3)}****${m.phone.slice(-3)}` : "Private",
    }));

    res.json({ success: true, count: safeMembers.length, data: safeMembers });
  } catch (error) {
    console.error("listMembers error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * Send OTP for Member Status lookup or Renewal (Console output in Dev mode)
 */
export async function sendMemberOtp(req: Request, res: Response): Promise<void> {
  try {
    const { identifier } = req.body;
    if (!identifier || !identifier.trim()) {
      res.status(400).json({ success: false, message: "Membership ID or phone number is required" });
      return;
    }

    const cleanId = identifier.trim();

    // Look up member to find associated email for dual delivery
    const member = await Member.findOne({
      $or: [
        { memberNo: { $regex: new RegExp(`^${cleanId}$`, "i") } },
        { phone: cleanId },
        { email: cleanId.toLowerCase() },
      ],
    });

    const result = await generateAndSendOtp(cleanId, member?.email);

    res.json({
      success: true,
      message: result.message,
      devHint: result.devHint,
      maskedPhone: member?.phone ? `${member.phone.slice(0, 2)}******${member.phone.slice(-2)}` : cleanId,
    });
  } catch (error) {
    console.error("sendMemberOtp error:", error);
    res.status(500).json({ success: false, message: "Failed to send verification code" });
  }
}

/**
 * Verify OTP entered by user
 */
export async function verifyMemberOtp(req: Request, res: Response): Promise<void> {
  try {
    const { identifier, code } = req.body;
    if (!identifier || !code) {
      res.status(400).json({ success: false, message: "Identifier and OTP code are required" });
      return;
    }

    const verification = verifyOtp(identifier, code);
    if (!verification.success) {
      res.status(400).json(verification);
      return;
    }

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("verifyMemberOtp error:", error);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
}

/**
 * Renew Membership
 */
export async function renewMember(req: Request, res: Response): Promise<void> {
  try {
    const { memberNo, membershipPeriod = 1, paymentMode = "UPI", transactionId } = req.body;

    if (!memberNo) {
      res.status(400).json({ success: false, message: "Member ID is required for renewal" });
      return;
    }

    const member = await Member.findOne({
      memberNo: { $regex: new RegExp(`^${memberNo.trim()}$`, "i") },
    });

    if (!member) {
      res.status(404).json({ success: false, message: "Member not found" });
      return;
    }

    const periodMultiplier = Number(membershipPeriod) === 2 ? 2 : 1;
    const now = new Date();
    // If currently active, extend from current validTill; if expired, extend from now
    const baseDate = member.validTill > now ? member.validTill : now;
    const newValidTill = new Date(baseDate);
    newValidTill.setFullYear(newValidTill.getFullYear() + periodMultiplier);

    const donationCount = await Donation.countDocuments();
    const renewalReceiptNo = generateReceiptNumber(donationCount + 1);

    member.validTill = newValidTill;
    member.status = "Active";
    member.receiptNo = renewalReceiptNo;
    member.paymentMode = paymentMode;
    if (transactionId) member.transactionId = transactionId;
    await member.save();

    // Update Verification Record
    await Verification.findOneAndUpdate(
      { documentNo: member.memberNo },
      {
        validTill: newValidTill,
        status: "Verified",
        $set: { "details.receiptNo": renewalReceiptNo },
      },
      { upsert: true }
    );

    // Send confirmation email
    if (member.email) {
      sendMembershipCardEmail(member.email, {
        name: member.name,
        memberNo: member.memberNo,
        category: member.category,
        validTill: newValidTill.toISOString().split("T")[0],
        annualFee: member.annualFee,
        receiptNo: renewalReceiptNo,
      }).catch((e) => console.warn("Renewal email notification failed:", e));
    }

    res.json({
      success: true,
      message: `Membership successfully renewed until ${newValidTill.toISOString().split("T")[0]}`,
      member: {
        id: member.memberNo,
        name: member.name,
        category: member.category,
        state: member.state,
        district: member.district,
        status: member.status,
        validTill: newValidTill.toISOString().split("T")[0],
        receiptNo: renewalReceiptNo,
      },
    });
  } catch (error) {
    console.error("renewMember error:", error);
    res.status(500).json({ success: false, message: "Internal server error during renewal" });
  }
}
