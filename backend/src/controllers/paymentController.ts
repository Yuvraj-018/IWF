import { Request, Response } from "express";
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
} from "../services/razorpayService.js";
import { RAZORPAY_CONFIG } from "../config/razorpay.js";
import { Donation } from "../models/Donation.js";
import { Member, MemberCategory } from "../models/Member.js";
import { Patient } from "../models/Patient.js";
import { Verification } from "../models/Verification.js";
import { sendReceiptEmail, sendMembershipCardEmail } from "../services/emailService.js";
import {
  generateReceiptNumber,
  generateMemberNumber,
} from "../utils/idGenerator.js";

export async function createOrderController(req: Request, res: Response): Promise<void> {
  try {
    const { amount, receipt, notes } = req.body;

    if (!amount) {
      res.status(400).json({
        success: false,
        message: "Amount is required (in Rupees or minimum 1)",
      });
      return;
    }

    const order = await createRazorpayOrder({
      amountRupees: Number(amount),
      receipt,
      notes,
    });

    res.status(200).json({
      success: true,
      order_id: order.order_id,
      amount: order.amount,
      currency: order.currency,
      key_id: RAZORPAY_CONFIG.key_id,
    });
  } catch (error: any) {
    console.error("createOrderController error:", error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to create Razorpay order",
    });
  }
}

export async function verifyPaymentController(req: Request, res: Response): Promise<void> {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationData,
      memberData,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({
        success: false,
        message: "Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature",
      });
      return;
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      res.status(400).json({
        success: false,
        message: "Payment signature verification failed. Untrusted payment.",
      });
      return;
    }

    let createdReceiptNo: string | undefined;
    let savedEntity: any = null;

    // Handle Donation persistence upon verified payment
    if (donationData) {
      const count = await Donation.countDocuments();
      createdReceiptNo = generateReceiptNumber(count + 1);

      const donation = new Donation({
        receiptNo: createdReceiptNo,
        donorName: donationData.donorName,
        donorType: donationData.donorType || "Individual",
        email: donationData.email,
        phone: donationData.phone,
        countryCode: donationData.countryCode || "+91",
        address: donationData.address || `${donationData.city}, ${donationData.state}`,
        city: donationData.city,
        state: donationData.state,
        pincode: donationData.pincode,
        financialType: donationData.financialType || "General Donation",
        frequency: donationData.frequency || "One Time",
        amount: Number(donationData.amount),
        taxExemption: Boolean(donationData.taxExemption),
        pan: donationData.pan ? donationData.pan.toUpperCase() : undefined,
        patientSlug: donationData.patientSlug,
        paymentMode: "Online",
        paymentStatus: "Success",
        transactionId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        websiteConsent: donationData.websiteConsent,
        recurringPledge: donationData.recurringPledge,
        pledgeMonths: donationData.pledgeMonths,
        notes: `Razorpay Order: ${razorpay_order_id}`,
      });

      savedEntity = await donation.save();

      // If tied to an urgent patient, increment raised funds
      if (donationData.patientSlug) {
        await Patient.findOneAndUpdate(
          { slug: donationData.patientSlug },
          { $inc: { raisedAmount: Number(donationData.amount), donorsCount: 1 } }
        );
      }

      // Add to Document Verification Centre
      await Verification.create({
        documentNo: createdReceiptNo,
        documentType: "donation_receipt",
        title: `80G Donation Receipt - ${donationData.financialType || "General"}`,
        issuedTo: donationData.donorName,
        issueDate: new Date(),
        status: "Verified",
        details: {
          receiptNo: createdReceiptNo,
          amount: Number(donationData.amount),
          pan: donationData.pan,
          transactionId: razorpay_payment_id,
          orderId: razorpay_order_id,
        },
      });

      // Dispatch 80G Donation Receipt email
      if (donation.email) {
        sendReceiptEmail(donation.email, {
          donorName: donation.donorName,
          receiptNo: createdReceiptNo,
          amount: donation.amount,
          cause: donation.financialType,
          paymentMode: donation.paymentMode,
          pan: donation.pan,
          transactionId: donation.transactionId,
        }).catch((e) => console.warn("Donation receipt email failed:", e));
      }
    }

    // Handle Member registration or renewal upon verified payment
    if (memberData) {
      const catKey = (memberData.category as MemberCategory) || "Blue";
      const catCode = catKey.slice(0, 2).toUpperCase();
      const periodMultiplier = Number(memberData.membershipPeriod) === 2 ? 2 : 1;

      const count = await Donation.countDocuments();
      createdReceiptNo = generateReceiptNumber(count + 1);

      if (memberData.isRenewal && memberData.memberNo) {
        // ── RENEWAL FLOW VIA RAZORPAY ──
        const existing = await Member.findOne({
          memberNo: { $regex: new RegExp(`^${memberData.memberNo.trim()}$`, "i") },
        });

        if (existing) {
          const now = new Date();
          const baseDate = existing.validTill > now ? existing.validTill : now;
          const newValidTill = new Date(baseDate);
          newValidTill.setFullYear(newValidTill.getFullYear() + periodMultiplier);

          existing.validTill = newValidTill;
          existing.status = "Active";
          existing.receiptNo = createdReceiptNo;
          existing.paymentMode = "Razorpay / Online";
          existing.transactionId = razorpay_payment_id;
          await existing.save();
          savedEntity = existing;

          // Update Verification Record
          await Verification.findOneAndUpdate(
            { documentNo: existing.memberNo },
            {
              validTill: newValidTill,
              status: "Verified",
              $set: { "details.receiptNo": createdReceiptNo },
            },
            { upsert: true }
          );

          if (existing.email) {
            sendMembershipCardEmail(existing.email, {
              name: existing.name,
              memberNo: existing.memberNo,
              category: existing.category,
              validTill: newValidTill.toISOString().split("T")[0],
              annualFee: existing.annualFee,
              receiptNo: createdReceiptNo,
            }).catch((e) => console.warn("Renewal email notification failed:", e));
          }
        }
      } else {
        // ── NEW MEMBER REGISTRATION VIA RAZORPAY ──
        const memberCount = await Member.countDocuments({ category: catKey });
        const memberNo = generateMemberNumber(catCode, memberCount + 1);

        const validFrom = new Date();
        const validTill = new Date();
        validTill.setFullYear(validTill.getFullYear() + periodMultiplier);

        const member = new Member({
          memberNo,
          name: (memberData.fullName || memberData.name || "").trim(),
          fatherName: memberData.fatherName,
          category: catKey,
          annualFee: Number(memberData.amount || memberData.annualFee || 2500),
          membershipPeriod: periodMultiplier,
          email: (memberData.email || "").trim(),
          phone: (memberData.mobile || memberData.phone || "").trim(),
          countryCode: memberData.countryCode || "+91",
          state: memberData.state || "Bihar",
          district: memberData.district || "Darbhanga",
          address: memberData.address,
          pincode: memberData.pincode,
          consentDisplay: memberData.consentDisplay,
          status: "Active",
          validFrom,
          validTill,
          receiptNo: createdReceiptNo,
          paymentMode: "Razorpay / Online",
          transactionId: razorpay_payment_id,
        });

        savedEntity = await member.save();

        // Add to Document Verification Centre
        await Verification.create({
          documentNo: memberNo,
          documentType: "membership_certificate",
          title: `Official Membership Certificate - ${catKey}`,
          issuedTo: member.name,
          issueDate: validFrom,
          validTill,
          status: "Verified",
          details: {
            memberNo,
            category: catKey,
            district: member.district,
            state: member.state,
            transactionId: razorpay_payment_id,
            orderId: razorpay_order_id,
          },
        });

        // Dispatch Membership card welcome email
        if (member.email) {
          sendMembershipCardEmail(member.email, {
            name: member.name,
            memberNo: member.memberNo,
            category: member.category,
            validTill: validTill.toISOString().split("T")[0],
            annualFee: member.annualFee,
            receiptNo: createdReceiptNo,
          }).catch((e) => console.warn("Member card email failed:", e));
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      receiptNo: createdReceiptNo,
      entity: savedEntity,
    });
  } catch (error: any) {
    console.error("verifyPaymentController error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process payment verification",
    });
  }
}

export async function handleWebhookController(req: Request, res: Response): Promise<void> {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    if (!signature) {
      res.status(400).json({ success: false, message: "Missing x-razorpay-signature header" });
      return;
    }

    const { verifyWebhookSignature } = await import("../services/razorpayService.js");
    const isValid = verifyWebhookSignature({ body: req.body, signature });
    if (!isValid) {
      res.status(400).json({ success: false, message: "Invalid webhook signature" });
      return;
    }

    const event = req.body.event;
    const payload = req.body.payload;

    // Idempotent processing of payment.captured
    if (event === "payment.captured") {
      const payment = payload?.payment?.entity;
      if (payment) {
        const paymentId = payment.id;
        const existingDonation = await Donation.findOne({ transactionId: paymentId });
        if (!existingDonation) {
          const notes = payment.notes || {};
          const count = await Donation.countDocuments();
          const receiptNo = generateReceiptNumber(count + 1);
          const amountInRupees = payment.amount / 100;

          const donation = new Donation({
            receiptNo,
            donorName: notes.donorName || "Supporter",
            donorType: "Individual",
            email: payment.email || notes.email || "support@iwfindia.org",
            phone: payment.contact || notes.phone || "N/A",
            financialType: notes.financialType || "General Donation",
            frequency: "One Time",
            amount: amountInRupees,
            paymentMode: "Online",
            paymentStatus: "Success",
            transactionId: paymentId,
            patientSlug: notes.patientSlug,
            notes: `Webhook Captured. Order ID: ${payment.order_id}`,
          });

          await donation.save();

          if (notes.patientSlug) {
            await Patient.findOneAndUpdate(
              { slug: notes.patientSlug },
              { $inc: { raisedAmount: amountInRupees, donorsCount: 1 } }
            );
          }

          await Verification.create({
            documentNo: receiptNo,
            documentType: "donation_receipt",
            title: `80G Donation Receipt - ${notes.financialType || "General"}`,
            issuedTo: notes.donorName || "Supporter",
            issueDate: new Date(),
            status: "Verified",
            details: {
              receiptNo,
              amount: amountInRupees,
              transactionId: paymentId,
              orderId: payment.order_id,
            },
          });
        }
      }
    }

    res.status(200).json({ status: "ok" });
  } catch (error: any) {
    console.error("handleWebhookController error:", error);
    res.status(500).json({ success: false, message: "Webhook processing error" });
  }
}
