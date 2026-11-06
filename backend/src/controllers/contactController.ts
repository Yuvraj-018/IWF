import { Request, Response } from "express";
import { Contact } from "../models/Contact.js";

export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      email,
      phone,
      countryCode,
      subject,
      message,
      source,
      enquiryType,
      cityDistrict,
      state,
      pinCode,
      preferredContactMethod,
      regionalOfficeTarget,
      referenceNumber,
      metadata,
    } = req.body;

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim().replace(/[\s-]/g, "") : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 2) {
      res.status(400).json({ success: false, message: "Valid name (at least 2 characters) is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      res.status(400).json({ success: false, message: "Please provide a valid email address" });
      return;
    }

    const phoneRegex = /^[0-9+]{8,15}$/;
    if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
      res.status(400).json({ success: false, message: "Please provide a valid contact number (8-15 digits)" });
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      res.status(400).json({ success: false, message: "Message must be at least 5 characters long" });
      return;
    }

    const contact = new Contact({
      name: trimmedName,
      email: trimmedEmail.toLowerCase(),
      phone: trimmedPhone,
      countryCode: countryCode || "+91",
      subject: subject || enquiryType || "General Enquiry",
      message: trimmedMessage,
      enquiryType,
      cityDistrict,
      state,
      pinCode,
      preferredContactMethod,
      regionalOfficeTarget,
      referenceNumber,
      source: source || "Contact Page",
      metadata: metadata || {},
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. Our team will get back to you shortly.",
      contactId: contact._id,
      referenceNumber: contact.referenceNumber,
    });
  } catch (error) {
    console.error("submitContact error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
