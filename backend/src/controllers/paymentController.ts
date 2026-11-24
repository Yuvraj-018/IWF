import { Request, Response } from "express";
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
  verifyWebhookSignature,
} from "../services/razorpayService.js";
import { RAZORPAY_CONFIG, razorpayInstance } from "../config/razorpay.js";
import { Donation } from "../models/Donation.js";
import { Member, MemberCategory } from "../models/Member.js";
import { Patient } from "../models/Patient.js";
import { Verification } from "../models/Verification.js";
import { PaymentEvent } from "../models/PaymentEvent.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { sendReceiptEmail, sendMembershipCardEmail } from "../services/emailService.js";
import { syncToCommunityDirectory } from "../services/directorySyncService.js";
import {
  generateReceiptNumber,
  generateMemberNumber,
  getNextReceiptNumber,
  getNextDonationReference,
  getNextMemberNumber,
  getNextReceiptNo,
  getNextTransactionNo,
  getCurrentFinancialYear,
} from "../utils/idGenerator.js";
import {
  calculateMembershipExpiry,
  calculateMembershipRenewalExpiry,
} from "../utils/dateUtils.js";
import { escapeRegex } from "../utils/escapeRegex.js";
import { postDonation, postMembershipFee, safePost } from "../services/accountingService.js";

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

    // The amount arrives from the browser, so check it against the order ISLAH created on the server.
    const claimed = donationData || memberData;
    if (claimed) {
      const order: any = await razorpayInstance.orders.fetch(razorpay_order_id);
      const orderRupees = Number(order?.amount) / 100;
      if (claimed.amount === undefined || claimed.amount === null || claimed.amount === "") {
        claimed.amount = orderRupees;
      } else if (!Number.isFinite(Number(claimed.amount)) || Math.abs(Number(claimed.amount) - orderRupees) > 0.01) {
        res.status(400).json({
          success: false,
          message: "Payment amount does not match the order. Please contact ISLAH with your payment ID.",
        });
        return;
      }
    }

    let createdReceiptNo: string | undefined;
    let createdDonationRef: string | undefined;
    let savedEntity: any = null;

    // Handle Donation persistence upon verified payment
    if (donationData) {
      // Razorpay's webhook may already have recorded this payment, or the browser may be retrying:
      // complete that record instead of creating a second one.
      const existingDonation = await Donation.findOne({ transactionId: razorpay_payment_id });
      const firstFormSubmission = !existingDonation || !existingDonation.metadata?.source;
      createdReceiptNo = existingDonation?.receiptNo || (await getNextReceiptNumber());
      createdDonationRef =
        existingDonation?.donationNo && existingDonation.donationNo.startsWith("ISLAH-DON")
          ? existingDonation.donationNo
          : await getNextDonationReference();
      const createdCertificateNo =
        existingDonation?.certificateNo || createdReceiptNo.replace(/RCPT|REC/i, "CERT");
      // Structured answers from the Donation & Community Support Form (recognition, programme, etc.)
      const formMeta: Record<string, any> =
        donationData.metadata && typeof donationData.metadata === "object" && !Array.isArray(donationData.metadata)
          ? donationData.metadata
          : {};
      const isPublicConsent = donationData.websiteConsent === "Yes" || Boolean(donationData.isPublicConsent);

      const donationFields = {
        receiptNo: createdReceiptNo,
        certificateNo: createdCertificateNo,
        donationNo: createdDonationRef,
        donorName: (donationData.donorName || "Anonymous Donor").trim(),
        donorType: donationData.donorType || "Individual",
        email: (donationData.email || "").trim().toLowerCase(),
        phone: (donationData.phone || "").trim(),
        countryCode: donationData.countryCode || "+91",
        address: donationData.address || (donationData.city ? `${donationData.city}, ${donationData.state || ""}`.trim() : "Online Supporter"),
        city: donationData.city || "Not Specified",
        state: donationData.state || "Not Specified",
        pincode: donationData.pincode || "000000",
        financialType: donationData.financialType || "General Donation",
        frequency: donationData.frequency || "One Time",
        amount: Number(donationData.amount),
        taxExemption: Boolean(donationData.taxExemption),
        pan: donationData.pan ? donationData.pan.toUpperCase() : undefined,
        panFileUrl: donationData.panFileUrl,
        donorPhotoUrl: donationData.donorPhotoUrl,
        patientSlug: donationData.patientSlug,
        paymentMode: "Online",
        paymentStatus: "Success",
        transactionId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        websiteConsent: donationData.websiteConsent,
        isPublicConsent,
        recurringPledge: donationData.recurringPledge,
        pledgeMonths: donationData.pledgeMonths,
        reminder: donationData.reminder || "None",
        workAreaId: donationData.workAreaId,
        notes: `Razorpay Order: ${razorpay_order_id}`,
        metadata: formMeta,
      };
      const donation = existingDonation ?? new Donation(donationFields);
      if (existingDonation) existingDonation.set(donationFields);

      savedEntity = await donation.save();

      // If tied to a patient, increment raised funds (the webhook already did this for its own record)
      if (donationData.patientSlug && !existingDonation) {
        await Patient.findOneAndUpdate(
          { slug: donationData.patientSlug },
          { $inc: { raisedAmount: Number(donationData.amount), donorsCount: 1 } }
        );
      }

      // Add Receipt to Document Verification Centre
      await Verification.findOneAndUpdate(
        { documentNo: createdReceiptNo },
        {
          documentNo: createdReceiptNo,
          documentType: "donation_receipt",
          title: `${donationData.taxExemption ? "Donation Receipt (Tax Documentation Requested)" : "Donation Receipt"} - ${donationData.financialType || "General"}`,
          issuedTo: donationData.donorName,
          issueDate: new Date(),
          status: "Verified",
          details: {
            receiptNo: createdReceiptNo,
            certificateNo: createdCertificateNo,
            amount: Number(donationData.amount),
            pan: donationData.pan,
            transactionId: razorpay_payment_id,
            orderId: razorpay_order_id,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // Add Certificate to Document Verification Centre
      await Verification.findOneAndUpdate(
        { documentNo: createdCertificateNo },
        {
          documentNo: createdCertificateNo,
          documentType: "programme_certificate",
          title: `Donor Appreciation Certificate - ${donationData.financialType || "General"}`,
          issuedTo: donationData.donorName,
          issueDate: new Date(),
          status: "Verified",
          details: {
            receiptNo: createdReceiptNo,
            certificateNo: createdCertificateNo,
            amount: Number(donationData.amount),
            transactionId: razorpay_payment_id,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // Automatically post to append-only LedgerEntry
      try {
        const fy = getCurrentFinancialYear();
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const ledgerEntryNo = await getNextTransactionNo();
        const amountInPaise = Math.round(Number(donationData.amount) * 100);
        await LedgerEntry.findOneAndUpdate(
          { idempotencyKey: `rzp_pay_${razorpay_payment_id}` },
          {
            $setOnInsert: {
              entryNo: ledgerEntryNo,
              effectiveDate: now,
              postedAt: now,
              fy,
              month,
              direction: "credit",
              amountPaise: amountInPaise,
              type: "donation",
              head: donationData.financialType || "General Donation",
              sourceType: "donation",
              sourceId: savedEntity._id,
              workAreaId: donationData.workAreaId || "HLT",
              fundType: donationData.fundType || "general",
              paymentMethod: "Razorpay / Online",
              idempotencyKey: `rzp_pay_${razorpay_payment_id}`,
              createdBy: "payment_verification",
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (ledgerErr) {
        console.warn("Ledger entry recording warning:", ledgerErr);
      }
      // Double-entry: Dr Razorpay clearing, Cr donation income (idempotent per donation).
      await safePost(`donation ${createdReceiptNo}`, () => postDonation(savedEntity));

      // Synchronize with Community Directory Spotlight
      syncToCommunityDirectory({
        id: `dir-donor-${createdReceiptNo}`,
        name: (typeof formMeta.displayName === "string" && formMeta.displayName.trim()) || donationData.donorName,
        role: `${donationData.financialType || "General"} Supporter`,
        type: "donor",
        location: [donationData.city, donationData.state].filter(Boolean).join(", ") || "India",
        avatar: donationData.donorPhotoUrl || "",
        category: donationData.financialType || "Recognised Supporter",
        bio: `Supported ISLAH ${donationData.financialType || "community"} initiative.`,
        isPublicConsent,
        receiptNo: createdReceiptNo,
        certificateNo: createdCertificateNo,
      }).catch((e) => console.warn("Donor directory sync warning:", e));

      // Dispatch 80G Donation Receipt email with PDF Attachment
      if (donation.email && firstFormSubmission) {
        sendReceiptEmail(donation.email, {
          donorName: donation.donorName,
          donorType: donation.donorType,
          email: donation.email,
          phone: donation.phone,
          address: donation.address,
          city: donation.city,
          state: donation.state,
          pincode: donation.pincode,
          receiptNo: createdReceiptNo,
          amount: donation.amount,
          cause: donation.financialType,
          paymentMode: donation.paymentMode,
          pan: donation.pan,
          taxExemption: donation.taxExemption,
          transactionId: donation.transactionId,
          createdAt: donation.createdAt,
          donationRef: createdDonationRef,
          certificateNo: createdCertificateNo,
          frequency: donation.frequency,
          purpose: typeof formMeta.purpose === "string" ? formMeta.purpose : undefined,
        }).catch((e) => console.warn("Donation receipt email failed:", e));
      }
    }

    // A browser retry of the same payment must not create a second member or extend validity twice.
    const memberAlreadyRecorded = memberData ? await Member.findOne({ transactionId: razorpay_payment_id }) : null;
    if (memberData && memberAlreadyRecorded) {
      savedEntity = memberAlreadyRecorded;
      createdReceiptNo = memberAlreadyRecorded.receiptNo;
    } else if (memberData) {
      const catKey = (memberData.category as MemberCategory) || "Blue";
      const CATEGORY_CODE_MAP: Record<string, string> = {
        Blue: "BL",
        Yellow: "YL",
        Green: "GR",
        Orange: "OR",
        Community: "COM",
        Contributing: "CON",
        Patron: "PAT",
      };
      const catCode = CATEGORY_CODE_MAP[catKey] || catKey.slice(0, 2).toUpperCase();
      const periodMultiplier = Math.max(1, Math.min(10, Number(memberData.membershipPeriod) || 1));

      createdReceiptNo = await getNextReceiptNumber();

      if (memberData.isRenewal && memberData.memberNo) {
        // ── RENEWAL FLOW VIA RAZORPAY ──
        const existing = await Member.findOne({
          memberNo: { $regex: new RegExp(`^${escapeRegex(memberData.memberNo.trim())}$`, "i") },
        });

        if (existing) {
          const newValidTill = calculateMembershipRenewalExpiry(existing.validTill, periodMultiplier);

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
        const memberNo = await getNextMemberNumber(catCode);
        const memberCertNo = `CERT-${memberNo}`;
        const isPublicConsent =
          memberData.consentDisplay === "public" ||
          memberData.consentDisplay === "yes" ||
          Boolean(memberData.isPublicConsent);

        const validFrom = new Date();
        const validTill = calculateMembershipExpiry(validFrom, periodMultiplier);

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
          consentDisplay: memberData.consentDisplay || "public",
          isPublicConsent,
          status: "Active",
          validFrom,
          validTill,
          receiptNo: createdReceiptNo,
          certificateNo: memberCertNo,
          photoUrl: memberData.photoUrl,
          metadata: memberData.metadata || {},
          paymentMode: "Razorpay / Online",
          transactionId: razorpay_payment_id,
        });

        savedEntity = await member.save();

        // Add Membership Certificate to Document Verification Centre
        await Verification.findOneAndUpdate(
          { documentNo: memberNo },
          {
            documentNo: memberNo,
            documentType: "membership_certificate",
            title: `Official Membership Certificate - ${catKey}`,
            issuedTo: member.name,
            issueDate: validFrom,
            validTill,
            status: "Verified",
            details: {
              memberNo,
              certificateNo: memberCertNo,
              category: catKey,
              district: member.district,
              state: member.state,
              transactionId: razorpay_payment_id,
              orderId: razorpay_order_id,
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Also register secondary certificate token for verification lookup
        await Verification.findOneAndUpdate(
          { documentNo: memberCertNo },
          {
            documentNo: memberCertNo,
            documentType: "membership_certificate",
            title: `Official Membership Certificate - ${catKey}`,
            issuedTo: member.name,
            issueDate: validFrom,
            validTill,
            status: "Verified",
            details: {
              memberNo,
              certificateNo: memberCertNo,
              category: catKey,
              district: member.district,
              state: member.state,
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Add Membership Receipt to Document Verification Centre
        await Verification.findOneAndUpdate(
          { documentNo: createdReceiptNo },
          {
            documentNo: createdReceiptNo,
            documentType: "donation_receipt",
            title: `Membership Fee Receipt - ${catKey}`,
            issuedTo: member.name,
            issueDate: validFrom,
            status: "Verified",
            details: {
              receiptNo: createdReceiptNo,
              memberNo,
              amount: member.annualFee,
              transactionId: razorpay_payment_id,
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Synchronize with Community Directory Spotlight
        const displayName =
          memberData.consentDisplay === "anonymous" ? "Anonymous Supporter" : member.name;
        syncToCommunityDirectory({
          id: `dir-mem-${memberNo}`,
          name: displayName,
          role: `${catKey} Member`,
          type: "member",
          location: [member.district, member.state].filter(Boolean).join(", ") || "Darbhanga, Bihar",
          avatar: member.photoUrl || "",
          category: `${catKey} Card`,
          bio: `ISLAH Community Member (${catKey} Tier)`,
          isPublicConsent,
          memberNo,
          receiptNo: createdReceiptNo,
          certificateNo: memberCertNo,
        }).catch((e) => console.warn("Member directory sync warning:", e));

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

    // Double-entry: Dr Razorpay clearing, Cr membership fees. Posted even if the member
    // record could not be found, because the money has been received either way.
    if (memberData) {
      await safePost(`membership ${razorpay_payment_id}`, () =>
        postMembershipFee({
          paymentId: razorpay_payment_id,
          amountRupees: Number(memberData.amount),
          memberNo: savedEntity?.memberNo || memberData.memberNo || "unmatched",
          memberName: savedEntity?.name || memberData.fullName || memberData.name || "Member",
          organisation: (savedEntity?.category || memberData.category) === "Orange",
          isRenewal: Boolean(memberData.isRenewal),
          receiptNo: createdReceiptNo,
        })
      );
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      receiptNo: createdReceiptNo,
      donationRef: createdDonationRef,
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

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(typeof req.body === "string" ? req.body : JSON.stringify(req.body), "utf8");

    const isValid = verifyWebhookSignature({ body: rawBody, signature });
    if (!isValid) {
      res.status(400).json({ success: false, message: "Invalid webhook signature" });
      return;
    }

    const bodyJson = Buffer.isBuffer(req.body)
      ? JSON.parse(req.body.toString("utf8"))
      : req.body;

    const event = bodyJson.event;
    const payload = bodyJson.payload;
    const eventIdHeader = req.headers["x-razorpay-event-id"] as string;
    const eventId =
      eventIdHeader ||
      bodyJson.id ||
      (payload?.payment?.entity?.id ? `evt_${payload.payment.entity.id}` : undefined);

    // Idempotency check via PaymentEvent
    if (eventId) {
      const existingEvent = await PaymentEvent.findOne({ eventId });
      if (existingEvent && (existingEvent.status === "processed" || existingEvent.status === "ignored")) {
        res.status(200).json({ status: "ok", message: "Event already processed" });
        return;
      }
      if (!existingEvent) {
        await PaymentEvent.create({
          provider: "razorpay",
          eventId,
          eventType: event || "unknown",
          payload: bodyJson,
          status: "received",
          receivedAt: new Date(),
        });
      }
    }

    // Idempotent processing of payment.captured
    if (event === "payment.captured") {
      const payment = payload?.payment?.entity;
      if (payment) {
        const paymentId = payment.id;
        let donation = await Donation.findOne({ transactionId: paymentId });
        const notes = payment.notes || {};
        // Membership fees are recorded by the membership flow, never as donations.
        const isMembershipPayment =
          notes.purpose === "membership" ||
          notes.isMembership === "true" ||
          notes.isRenewal === "true" ||
          Boolean(notes.memberNo) ||
          Boolean(notes.category && notes.years);
        if (!donation && !isMembershipPayment) {
          const receiptNo = await getNextReceiptNo();
          const amountInPaise = Number(payment.amount);
          const amountInRupees = amountInPaise / 100;
          const feeInPaise = Number(payment.fee || 0);
          const taxInPaise = Number(payment.tax || 0);
          const netInPaise = amountInPaise - feeInPaise - taxInPaise;

          donation = new Donation({
            receiptNo,
            donationNo: receiptNo,
            donorName: notes.donorName || "Supporter",
            donorType: notes.donorType || "Individual",
            email: payment.email || notes.email || "support@iwfindia.org",
            phone: payment.contact || notes.phone || "N/A",
            countryCode: notes.countryCode || "+91",
            address: notes.address || "Online Supporter",
            city: notes.city || "Not Specified",
            state: notes.state || "Not Specified",
            pincode: notes.pincode || "",
            financialType: notes.financialType || "General Donation",
            frequency: ["Monthly", "Yearly"].includes(notes.frequency) ? notes.frequency : "One Time",
            amount: amountInRupees,
            amountPaise: amountInPaise,
            grossPaise: amountInPaise,
            feePaise: feeInPaise,
            taxOnFeePaise: taxInPaise,
            netPaise: netInPaise,
            workAreaId: notes.workAreaId || "HLT",
            initiativeId: notes.initiativeId,
            source: "online",
            taxExemption: Boolean(notes.pan),
            pan: notes.pan ? String(notes.pan).toUpperCase() : undefined,
            paymentMode: "Online",
            paymentStatus: "Success",
            transactionId: paymentId,
            razorpayOrderId: payment.order_id,
            razorpayPaymentId: paymentId,
            patientSlug: notes.patientSlug,
            reminder: notes.reminder || "None",
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

          // Post to immutable LedgerEntry
          try {
            const fy = getCurrentFinancialYear();
            const now = new Date();
            const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
            const ledgerEntryNo = await getNextTransactionNo();
            await LedgerEntry.create({
              entryNo: ledgerEntryNo,
              effectiveDate: now,
              postedAt: now,
              fy,
              month,
              direction: "credit",
              amountPaise: amountInPaise,
              type: "donation",
              head: notes.financialType || "General Donation",
              sourceType: "donation",
              sourceId: donation._id,
              workAreaId: notes.workAreaId || "HLT",
              fundType: notes.fundType || "general",
              paymentMethod: "Razorpay / Online",
              idempotencyKey: `rzp_pay_${paymentId}`,
              createdBy: "razorpay_webhook",
            });
          } catch (ledgerErr) {
            console.warn("Ledger entry recording warning from webhook:", ledgerErr);
          }
          const webhookDonation = donation;
          await safePost(`webhook donation ${receiptNo}`, () => postDonation(webhookDonation));
        } else if (isMembershipPayment) {
          // The membership record is created by /verify; the fee is booked here too (same
          // idempotency key) so it is never missed if the browser closed before /verify ran.
          await safePost(`webhook membership ${paymentId}`, () =>
            postMembershipFee({
              paymentId,
              amountRupees: Number(payment.amount) / 100,
              memberNo: notes.memberNo || "pending",
              memberName: notes.fullName || notes.name || payment.email || "Member",
              organisation: notes.category === "Orange",
              isRenewal: notes.isRenewal === "true",
              date: payment.created_at ? new Date(Number(payment.created_at) * 1000) : new Date(),
            })
          );
        }
      }
    }

    if (eventId) {
      await PaymentEvent.findOneAndUpdate(
        { eventId },
        { status: "processed", processedAt: new Date() }
      );
    }

    res.status(200).json({ status: "ok" });
  } catch (error: any) {
    console.error("handleWebhookController error:", error);
    res.status(500).json({ success: false, message: "Webhook processing error" });
  }
}
