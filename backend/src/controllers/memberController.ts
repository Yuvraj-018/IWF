import { Request, Response } from "express";
import { Member, MemberCategory } from "../models/Member.js";
import { Verification } from "../models/Verification.js";
import {
  generateMemberNumber,
  generateReceiptNumber,
  getNextReceiptNumber,
  getNextMemberNumber,
} from "../utils/idGenerator.js";
import { calculateMembershipExpiry, calculateMembershipRenewalExpiry } from "../utils/dateUtils.js";
import { Donation } from "../models/Donation.js";
import { Application } from "../models/Application.js";
import { sendMembershipCardEmail } from "../services/emailService.js";
import { generateAndSendOtp, verifyOtp } from "../services/otpService.js";
import { invalidateCache } from "../middlewares/cache.js";
import { syncToCommunityDirectory } from "../services/directorySyncService.js";
import { projectMember, maskPhone, maskEmail } from "../utils/piiFilter.js";
import { getActor, logAudit } from "../services/auditService.js";

const CATEGORY_FEE_MAP: Record<MemberCategory, number> = {
  Community: 2500,
  Contributing: 4000,
  Patron: 6000,
  Blue: 2500,
  Yellow: 1000,
  Green: 500,
  Orange: 9600,
};

const CATEGORY_CODE_MAP: Record<MemberCategory, string> = {
  Community: "CM",
  Contributing: "CT",
  Patron: "PT",
  Blue: "BL",
  Yellow: "YL",
  Green: "GR",
  Orange: "OR",
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
    const memberPhone = (mobile || phone || "").trim().replace(/[\s-]/g, "");
    const memberEmail = (email || "").trim().toLowerCase();

    if (!memberName || memberName.length < 2) {
      res.status(400).json({ success: false, message: "Valid full name is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!memberEmail || !emailRegex.test(memberEmail)) {
      res.status(400).json({ success: false, message: "Valid email address is required" });
      return;
    }

    const phoneRegex = /^[0-9+]{8,15}$/;
    if (!memberPhone || !phoneRegex.test(memberPhone)) {
      res.status(400).json({ success: false, message: "Valid 10-digit mobile number is required" });
      return;
    }

    if (!category || !state || !district) {
      res.status(400).json({ success: false, message: "Category, state, and district are mandatory" });
      return;
    }

    const catKey = category as MemberCategory;
    const baseFee = CATEGORY_FEE_MAP[catKey] || 2500;
    const periodMultiplier = Math.max(1, Math.min(10, Number(membershipPeriod) || 1));
    const annualFee = baseFee * periodMultiplier;
    const catCode = CATEGORY_CODE_MAP[catKey] || "MEM";

    const memberNo = await getNextMemberNumber(catCode);
    const receiptNo = await getNextReceiptNumber();
    const memberCertNo = `CERT-${memberNo}`;
    const isPublicConsent =
      consentDisplay === "public" ||
      consentDisplay === "yes" ||
      Boolean(req.body.isPublicConsent);

    const validFrom = new Date();
    const validTill = calculateMembershipExpiry(validFrom, periodMultiplier);

    const member = new Member({
      memberNo,
      name: memberName,
      fatherName,
      category,
      annualFee,
      membershipPeriod: periodMultiplier,
      email: memberEmail,
      phone: memberPhone,
      countryCode: countryCode || "+91",
      state,
      district,
      address,
      pincode,
      paymentMode: paymentMode || "UPI",
      transactionId,
      paymentDate,
      consentDisplay: consentDisplay || "public",
      isPublicConsent,
      photoUrl,
      status: "Active",
      validFrom,
      validTill,
      receiptNo,
      certificateNo: memberCertNo,
      metadata: metadata || {},
    });

    await member.save();

    // Auto-create document verification for Membership Card
    await Verification.findOneAndUpdate(
      { documentNo: memberNo },
      {
        documentNo: memberNo,
        documentType: "membership_certificate",
        title: `Official Membership Certificate - ${category}`,
        issuedTo: memberName,
        issueDate: validFrom,
        validTill: validTill,
        status: "Verified",
        details: {
          memberNo,
          certificateNo: memberCertNo,
          category,
          district,
          state,
          receiptNo,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Auto-create secondary certificate verification record
    await Verification.findOneAndUpdate(
      { documentNo: memberCertNo },
      {
        documentNo: memberCertNo,
        documentType: "membership_certificate",
        title: `Official Membership Certificate - ${category}`,
        issuedTo: memberName,
        issueDate: validFrom,
        validTill: validTill,
        status: "Verified",
        details: {
          memberNo,
          certificateNo: memberCertNo,
          category,
          district,
          state,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Auto-create Receipt verification record
    await Verification.findOneAndUpdate(
      { documentNo: receiptNo },
      {
        documentNo: receiptNo,
        documentType: "donation_receipt",
        title: `Membership Fee Receipt - ${category}`,
        issuedTo: memberName,
        issueDate: validFrom,
        status: "Verified",
        details: {
          receiptNo,
          memberNo,
          amount: annualFee,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Synchronize into community directory spotlight
    const displayName = consentDisplay === "anonymous" ? "Anonymous Supporter" : memberName;
    syncToCommunityDirectory({
      id: `dir-mem-${memberNo}`,
      name: displayName,
      role: `${catKey} Member`,
      type: "member",
      location: `${district}, ${state}`,
      avatar: photoUrl || "",
      category: `${catKey} Card`,
      bio: `ISLAH Community Member (${catKey} Tier)`,
      isPublicConsent,
      memberNo,
      receiptNo,
      certificateNo: memberCertNo,
    }).catch((e) => console.warn("Member directory sync warning:", e));

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

    invalidateCache("members");

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
    const rawMemberNo = String(req.params.memberNo || "");
    const clean = rawMemberNo.trim();
    const cleanDigits = clean.replace(/[\s+-]/g, "");

    const member = await Member.findOne({
      $or: [
        { memberNo: { $regex: new RegExp(`^${clean}$`, "i") } },
        { phone: { $regex: cleanDigits.length >= 8 ? cleanDigits.slice(-10) : `^${clean}$`, $options: "i" } },
        { email: { $regex: new RegExp(`^${clean}$`, "i") } },
      ],
    });

    if (!member) {
      res.status(404).json({ success: false, message: "Membership ID or Phone not found" });
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
        address: member.address || "",
        pincode: member.pincode || "",
        phone: member.phone,
        email: member.email,
        status: effectiveStatus,
        validFrom: member.validFrom.toISOString().split("T")[0],
        validTill: member.validTill.toISOString().split("T")[0],
        joined: member.validFrom.toISOString().split("T")[0],
        receiptNo: member.receiptNo,
        certificateNo: member.certificateNo || `CERT-${member.memberNo}`,
        consentDisplay: member.consentDisplay || "public",
        isPublicConsent: member.isPublicConsent !== false,
      },
    });
  } catch (error) {
    console.error("checkMemberStatus error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * Unified Supporter & Member Profile Hub (No OTP Required)
 * Gathers complete membership, donation history, and verification tokens.
 */
export async function getMemberProfile(req: Request, res: Response): Promise<void> {
  try {
    const rawIdentifier = String(req.params.identifier || "");
    if (!rawIdentifier || !rawIdentifier.trim()) {
      res.status(400).json({ success: false, message: "Member ID, phone, or email is required" });
      return;
    }

    const clean = rawIdentifier.trim();
    const cleanDigits = clean.replace(/[\s+-]/g, "");

    // 1. Find Member by memberNo, phone, or email
    const member = await Member.findOne({
      $or: [
        { memberNo: { $regex: new RegExp(`^${clean}$`, "i") } },
        { email: { $regex: new RegExp(`^${clean}$`, "i") } },
        { phone: { $regex: cleanDigits.length >= 8 ? cleanDigits.slice(-10) : `^${clean}$`, $options: "i" } },
        { receiptNo: { $regex: new RegExp(`^${clean}$`, "i") } },
      ],
    });

    const candidateEmail = member?.email || (clean.includes("@") ? clean.toLowerCase() : "");
    const candidatePhone = member?.phone || (cleanDigits.length >= 8 ? cleanDigits.slice(-10) : "");

    // 2. Fetch all linked donations
    const donationFilters: any[] = [];
    if (candidateEmail) donationFilters.push({ email: candidateEmail });
    if (candidatePhone) donationFilters.push({ phone: { $regex: candidatePhone } });
    if (member?.receiptNo) donationFilters.push({ receiptNo: member.receiptNo });

    const donations = donationFilters.length > 0
      ? await Donation.find({ $or: donationFilters }).sort({ createdAt: -1 })
      : [];

    // 3. Fetch all linked verifications
    const verificationFilters: any[] = [];
    if (member?.memberNo) {
      verificationFilters.push({ documentNo: member.memberNo });
      verificationFilters.push({ documentNo: `CERT-${member.memberNo}` });
    }
    donations.forEach((d) => {
      verificationFilters.push({ documentNo: d.receiptNo });
      if (d.certificateNo) verificationFilters.push({ documentNo: d.certificateNo });
    });

    const verifications = verificationFilters.length > 0
      ? await Verification.find({ $or: verificationFilters }).sort({ issueDate: -1 })
      : [];

    // 4. Fetch any applications (volunteer, career, etc.)
    const appFilters: any[] = [];
    if (candidateEmail) appFilters.push({ email: candidateEmail });
    if (candidatePhone) appFilters.push({ phone: { $regex: candidatePhone } });

    const applications = appFilters.length > 0
      ? await Application.find({ $or: appFilters }).sort({ createdAt: -1 })
      : [];

    if (!member && donations.length === 0 && applications.length === 0) {
      res.status(404).json({ success: false, message: "No membership or supporter record found for this identifier" });
      return;
    }

    const now = new Date();
    const isExpired = member ? member.validTill < now : false;

    res.json({
      success: true,
      data: {
        member: member
          ? {
            id: member.memberNo,
            memberNo: member.memberNo,
            name: member.name,
            fatherName: member.fatherName,
            category: member.category,
            annualFee: member.annualFee,
            status: isExpired ? "Expired" : member.status,
            validFrom: member.validFrom.toISOString().split("T")[0],
            validTill: member.validTill.toISOString().split("T")[0],
            joined: member.validFrom.toISOString().split("T")[0],
            phone: member.phone,
            email: member.email,
            state: member.state,
            district: member.district,
            address: member.address || "",
            pincode: member.pincode || "",
            receiptNo: member.receiptNo,
            certificateNo: member.certificateNo || `CERT-${member.memberNo}`,
            consentDisplay: member.consentDisplay || "public",
            isPublicConsent: member.isPublicConsent !== false,
            photoUrl: member.photoUrl,
          }
          : null,
        donations: donations.map((d) => ({
          receiptNo: d.receiptNo,
          certificateNo: d.certificateNo || d.receiptNo.replace(/RCPT|REC/i, "CERT"),
          donorName: d.donorName,
          amount: d.amount,
          financialType: d.financialType,
          paymentMode: d.paymentMode,
          paymentStatus: d.paymentStatus,
          transactionId: d.transactionId,
          taxExemption: d.taxExemption,
          pan: d.pan,
          createdAt: d.createdAt,
        })),
        verifications: verifications.map((v) => ({
          documentNo: v.documentNo,
          documentType: v.documentType,
          title: v.title,
          issuedTo: v.issuedTo,
          issueDate: v.issueDate.toISOString().split("T")[0],
          validTill: v.validTill ? v.validTill.toISOString().split("T")[0] : null,
          status: v.status,
        })),
        applications: applications.map((a) => ({
          applicationId: a.applicationId || a._id.toString(),
          type: a.type,
          status: a.status,
          createdAt: a.createdAt,
        })),
        stats: {
          totalDonated: donations.reduce((sum, d) => sum + (d.paymentStatus === "Success" ? d.amount : 0), 0),
          donationsCount: donations.length,
          hasActiveMembership: Boolean(member && !isExpired),
        },
      },
    });
  } catch (error) {
    console.error("getMemberProfile error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * List Members for Public Directory & Admin Ledger
 * - Unauthenticated: Sends Active members who agreed to public display, sorted by highest contribution first with masked phone numbers.
 * - Authenticated Admin: Returns complete member ledger with full contact details for CMS management.
 */
export async function listMembers(req: Request, res: Response): Promise<void> {
  try {
    const { category, state, status, search } = req.query;
    const query: Record<string, any> = {};
    const isAdmin = Boolean(req.headers.authorization);

    if (!isAdmin) {
      // Filter Active by default for public directory
      if (status) {
        query.status = status;
      } else {
        query.status = "Active";
        query.validTill = { $gte: new Date() };
      }
      // Protect member privacy: only show members who agreed to directory listing
      query.isPublicConsent = { $ne: false };
      query.consentDisplay = { $nin: ["private", "no"] };
    } else {
      // Admin filter
      if (status && status !== "All") query.status = status;
    }

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
      .limit(isAdmin ? 500 : 200);

    const user = (req as any).adminUser;
    const canViewPii = isAdmin && (user?.permissionsSet?.has("*") || user?.permissionsSet?.has("membership.member:view_pii"));

    const safeMembers = members.map((m) => {
      const isAnon = m.consentDisplay === "anonymous";
      return {
        _id: m._id,
        id: m.memberNo,
        memberNo: m.memberNo,
        name: !isAdmin && isAnon ? "Anonymous Supporter" : m.name,
        category: m.category,
        district: m.district,
        state: m.state,
        status: m.status,
        annualFee: m.annualFee,
        validTill: m.validTill.toISOString().split("T")[0],
        joined: m.validFrom.toISOString().split("T")[0],
        phone: canViewPii ? m.phone : (m.phone ? maskPhone(m.phone) : "Private"),
        email: canViewPii ? m.email : (isAdmin ? maskEmail(m.email) : undefined),
        receiptNo: m.receiptNo,
        certificateNo: m.certificateNo,
        consentDisplay: m.consentDisplay || "public",
        isPublicConsent: m.isPublicConsent !== false,
      };
    });

    res.json({ success: true, count: safeMembers.length, data: safeMembers });
  } catch (error) {
    console.error("listMembers error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * Toggle Member Public Directory Visibility (Admin Only)
 */
export async function toggleMemberVisibility(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const member = await Member.findOne({
      $or: [{ memberNo: id }, { _id: id }],
    });

    if (!member) {
      res.status(404).json({ success: false, message: "Member not found" });
      return;
    }

    const nextConsent = member.isPublicConsent === false ? true : false;
    member.isPublicConsent = nextConsent;
    if (nextConsent) {
      if (member.consentDisplay === "private" || member.consentDisplay === "no") {
        member.consentDisplay = "public";
      }
    }
    await member.save();

    // Synchronize toggle with community directory spotlight
    const displayName = member.consentDisplay === "anonymous" ? "Anonymous Supporter" : member.name;
    await syncToCommunityDirectory({
      id: `dir-mem-${member.memberNo}`,
      name: displayName,
      role: `${member.category} Member`,
      type: "member",
      location: `${member.district}, ${member.state}`,
      avatar: member.photoUrl || "",
      category: `${member.category} Card`,
      bio: `ISLAH Community Member (${member.category} Tier)`,
      isPublicConsent: nextConsent,
      memberNo: member.memberNo,
      receiptNo: member.receiptNo,
      certificateNo: member.certificateNo,
    });

    invalidateCache("members");
    invalidateCache("settings");

    res.json({
      success: true,
      message: `Member visibility updated to ${nextConsent ? "Public" : "Hidden"}`,
      isPublicConsent: nextConsent,
      member,
    });
  } catch (error) {
    console.error("toggleMemberVisibility error:", error);
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
    const {
      memberNo,
      membershipPeriod = 1,
      paymentMode = "UPI",
      transactionId,
      category,
      contactUpdates,
    } = req.body;

    if (!memberNo) {
      res.status(400).json({ success: false, message: "Member ID is required for renewal" });
      return;
    }

    const cleanMemberNo = String(memberNo).trim();
    const member = await Member.findOne({
      memberNo: { $regex: new RegExp(`^${cleanMemberNo}$`, "i") },
    });

    if (!member) {
      res.status(404).json({ success: false, message: "Member not found" });
      return;
    }

    const periodMultiplier = Number(membershipPeriod) >= 1 ? Number(membershipPeriod) : 1;
    const newValidTill = calculateMembershipRenewalExpiry(member.validTill, periodMultiplier);

    const renewalReceiptNo = await getNextReceiptNumber();

    member.validTill = newValidTill;
    member.status = "Active";
    member.receiptNo = renewalReceiptNo;
    member.paymentMode = paymentMode;
    if (transactionId) member.transactionId = transactionId;

    if (category && typeof category === "string") {
      member.category = category as any;
    }

    if (contactUpdates && typeof contactUpdates === "object") {
      if (contactUpdates.name) member.name = String(contactUpdates.name).trim();
      if (contactUpdates.phone) member.phone = String(contactUpdates.phone).trim();
      if (contactUpdates.email) member.email = String(contactUpdates.email).trim().toLowerCase();
      if (contactUpdates.address) member.address = String(contactUpdates.address).trim();
      if (contactUpdates.district) member.district = String(contactUpdates.district).trim();
      if (contactUpdates.state) member.state = String(contactUpdates.state).trim();
      if (contactUpdates.pincode) member.pincode = String(contactUpdates.pincode).trim();
    }

    await member.save();

    // Auto-sync directory
    syncToCommunityDirectory({
      id: `dir-mem-${member.memberNo}`,
      name: member.consentDisplay === "anonymous" ? "Anonymous Supporter" : member.name,
      role: `${member.category} Member`,
      type: "member",
      location: [member.district, member.state].filter(Boolean).join(", ") || "Darbhanga, Bihar",
      avatar: member.photoUrl || "",
      category: `${member.category} Card`,
      bio: `ISLAH Community Member (${member.category} Tier)`,
      isPublicConsent: member.isPublicConsent !== false,
      memberNo: member.memberNo,
      receiptNo: renewalReceiptNo,
      certificateNo: member.certificateNo || `CERT-${member.memberNo}`,
    }).catch((err) =>
      console.warn("Directory sync warning during renewal:", err)
    );

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

    invalidateCache("members");

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
