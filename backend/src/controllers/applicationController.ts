import { Request, Response } from "express";
import { Application } from "../models/Application.js";
import {
  sendInboundApplicationAcknowledgementEmail,
  sendAdminInboundNotificationEmail,
  sendApplicationStatusUpdateEmail,
} from "../services/emailService.js";

export async function submitApplication(req: Request, res: Response): Promise<void> {
  try {
    const {
      type,
      fullName,
      email,
      phone,
      countryCode,
      city,
      state,
      organization,
      selectedSectors,
      subclassifications,
      message,
      formData,
    } = req.body;

    const allowedTypes = ["volunteer", "mentor", "partner", "sponsor", "career"];
    const normalizedType = typeof type === "string" ? type.toLowerCase().trim() : "";

    if (!normalizedType || !allowedTypes.includes(normalizedType)) {
      res.status(400).json({
        success: false,
        message: `Invalid application type. Must be one of: ${allowedTypes.join(", ")}`,
      });
      return;
    }

    const trimmedName = typeof fullName === "string" ? fullName.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim().replace(/[\s-]/g, "") : "";

    if (!trimmedName || trimmedName.length < 2) {
      res.status(400).json({ success: false, message: "Valid full name (at least 2 characters) is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      res.status(400).json({ success: false, message: "Please provide a valid email address" });
      return;
    }

    const phoneRegex = /^[0-9+]{8,15}$/;
    if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
      res.status(400).json({ success: false, message: "Please provide a valid contact phone number" });
      return;
    }

    const count = await Application.countDocuments({ type: normalizedType as any });
    const formattedAppId =
      req.body.applicationId ||
      `ISLAH-${normalizedType.toUpperCase().slice(0, 3)}-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

    const appFormData = formData ? { ...formData } : {};
    const extractedResumeUrl =
      req.body.resumeUrl ||
      appFormData.resume?.url ||
      appFormData.cvFileUrl ||
      appFormData.documents?.resume?.url ||
      "";
    const extractedResumeName =
      appFormData.cvFileName ||
      appFormData.resume?.name ||
      appFormData.documents?.resume?.name ||
      "Applicant_Resume.pdf";

    if (extractedResumeUrl && !appFormData.cvFileUrl) {
      appFormData.cvFileUrl = extractedResumeUrl;
    }
    if (extractedResumeName && !appFormData.cvFileName) {
      appFormData.cvFileName = extractedResumeName;
    }

    const application = new Application({
      applicationId: formattedAppId,
      type: normalizedType as any,
      fullName: trimmedName,
      email: trimmedEmail.toLowerCase(),
      phone: trimmedPhone,
      countryCode: countryCode || "+91",
      city,
      state,
      organization,
      selectedSectors: selectedSectors || [],
      subclassifications: subclassifications || [],
      resumeUrl: extractedResumeUrl || undefined,
      message,
      formData: appFormData,
    });

    await application.save();

    // ── Dispatch Applicant Acknowledgement & Admin Alert (Async, Non-blocking) ──
    if (trimmedEmail) {
      sendInboundApplicationAcknowledgementEmail(trimmedEmail, {
        applicationId: formattedAppId,
        type: normalizedType,
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        organization,
        selectedSectors,
        message,
        resumeFileName: extractedResumeName,
      }).catch((e) => console.warn("Application email dispatch failed:", e));

      sendAdminInboundNotificationEmail(`New ${normalizedType.toUpperCase()} Application: ${trimmedName}`, {
        category: normalizedType === "career" ? "Career" : normalizedType === "partner" ? "CSR / Partner" : "Volunteer",
        title: `Inbound Submission: ${formattedAppId}`,
        items: [
          { label: "Applicant Name", value: trimmedName },
          { label: "Category", value: normalizedType.toUpperCase() },
          { label: "Email", value: trimmedEmail },
          { label: "Phone", value: `${countryCode || "+91"} ${trimmedPhone}` },
          ...(organization ? [{ label: "Organization", value: organization }] : []),
          { label: "Reference ID", value: formattedAppId },
        ],
      }).catch((e) => console.warn("Admin application alert failed:", e));
    }

    res.status(201).json({
      success: true,
      message: `Your ${type} application has been submitted successfully. Our team will review and get in touch with you.`,
      applicationId: formattedAppId,
      id: application._id,
    });
  } catch (error) {
    console.error("submitApplication error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function listApplications(req: Request, res: Response): Promise<void> {
  try {
    const { type, status } = req.query;
    const query: Record<string, any> = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error("listApplications error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateApplicationStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    const validStatuses = [
      "Pending",
      "Under Review",
      "Shortlisted",
      "Approved",
      "Contacted",
      "Rejected",
      "Archived",
    ];

    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
      return;
    }

    const application = await Application.findByIdAndUpdate(
      id,
      {
        status,
        ...(reviewNotes ? { "formData.reviewNotes": reviewNotes } : {}),
      },
      { returnDocument: 'after' }
    );

    if (!application) {
      res.status(404).json({ success: false, message: "Application not found" });
      return;
    }

    // ── Dispatch Status Update Email to Applicant (Skip if Archived) ──
    if (status !== "Archived" && application.email) {
      sendApplicationStatusUpdateEmail(application.email, {
        applicationId: application.applicationId || application._id.toString(),
        type: application.type,
        fullName: application.fullName,
        newStatus: status,
        reviewNotes: reviewNotes || (application.formData as any)?.reviewNotes,
      }).catch((e) => console.warn("Application status update email failed:", e));
    }

    res.json({
      success: true,
      message: `Application status updated to ${status}`,
      application,
    });
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

