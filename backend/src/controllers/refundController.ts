import { Request, Response } from "express";
import { Refund } from "../models/Refund.js";
import { Donation } from "../models/Donation.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { Verification } from "../models/Verification.js";
import { getNextRefundNo, getNextTransactionNo, getCurrentFinancialYear } from "../utils/idGenerator.js";
import { refundRazorpayPayment } from "../services/razorpayService.js";

/**
 * 1. Process Donation Refund (Full or Partial)
 */
export async function createRefund(req: Request, res: Response): Promise<void> {
  try {
    const { donationId, amount, amountPaise, reason, notes } = req.body;

    if (!donationId) {
      res.status(400).json({ success: false, message: "donationId is required." });
      return;
    }
    if (!reason || !reason.trim()) {
      res.status(400).json({ success: false, message: "A mandatory justification reason must be provided for audit compliance." });
      return;
    }

    const donation = await Donation.findById(donationId);
    if (!donation) {
      res.status(404).json({ success: false, message: "Donation record not found." });
      return;
    }

    if (donation.paymentStatus === "Failed") {
      res.status(400).json({ success: false, message: "Cannot refund a donation that has failed payment status." });
      return;
    }

    const donPaise = donation.amountPaise || Math.round((donation.amount || 0) * 100);

    // Sum existing processed or approved refunds for this donation
    const existingRefunds = await Refund.find({
      donationId: donation._id,
      status: { $in: ["processed", "approved", "requested"] },
    });
    const alreadyRefundedPaise = existingRefunds.reduce((sum, r) => sum + r.amountPaise, 0);
    const remainingPaise = donPaise - alreadyRefundedPaise;

    if (remainingPaise <= 0) {
      res.status(400).json({
        success: false,
        message: "This donation has already been fully refunded.",
      });
      return;
    }

    // Determine target refund paise
    let targetPaise = 0;
    if (amountPaise !== undefined && amountPaise !== null) {
      targetPaise = Number(amountPaise);
    } else if (amount !== undefined && amount !== null) {
      targetPaise = Math.round(Number(amount) * 100);
    } else {
      // Default to remaining full amount
      targetPaise = remainingPaise;
    }

    if (targetPaise <= 0) {
      res.status(400).json({ success: false, message: "Refund amount must be greater than zero." });
      return;
    }

    if (targetPaise > remainingPaise) {
      res.status(400).json({
        success: false,
        message: `Requested refund of ₹${(targetPaise / 100).toLocaleString("en-IN")} exceeds refundable balance of ₹${(remainingPaise / 100).toLocaleString("en-IN")}.`,
      });
      return;
    }

    const user = (req as any).adminUser || (req as any).user;
    const adminUser = user?.name || user?.id || "superadmin";

    // 1. Online Gateway Refund (if paid via Razorpay)
    let razorpayRefundId: string | undefined = undefined;
    if (donation.razorpayPaymentId) {
      const gatewayRes = await refundRazorpayPayment({
        paymentId: donation.razorpayPaymentId,
        amountPaise: targetPaise,
        notes: {
          receiptNo: donation.receiptNo,
          reason: reason.trim(),
        },
      });
      razorpayRefundId = gatewayRes.id;
    }

    // 2. Generate Atomic Refund Number: REF-YYYY-XXXXX
    const currentYear = new Date().getFullYear();
    const refundNo = await getNextRefundNo(currentYear);

    // 3. Create Refund Record
    const refund = await Refund.create({
      refundNo,
      donationId: donation._id,
      razorpayRefundId,
      amountPaise: targetPaise,
      reason: reason.trim(),
      status: "processed",
      requestedBy: adminUser,
      approvedBy: adminUser,
    });

    // 4. Update Donation paymentStatus
    const isFullRefund = alreadyRefundedPaise + targetPaise >= donPaise;
    donation.paymentStatus = isFullRefund ? "Refunded" : "Partially Refunded";
    await donation.save();

    // 5. Dual-entry Ledger Post: Reversal Debit
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
        direction: "debit",
        amountPaise: targetPaise,
        type: "refund",
        head: `Refund - ${donation.financialType || "Donation"}`,
        sourceType: "refund",
        sourceId: refund._id,
        workAreaId: donation.workAreaId || "GEN",
        initiativeId: donation.initiativeId,
        fundType: "general",
        paymentMethod: donation.paymentMode,
        idempotencyKey: `rfnd_debit_${refund.refundNo}`,
        createdBy: adminUser,
      });
    } catch (ledgerErr) {
      console.warn("Refund ledger entry creation warning:", ledgerErr);
    }

    // 6. Update 80G Certificate Verification status if fully refunded
    if (isFullRefund) {
      await Verification.findOneAndUpdate(
        { documentNo: donation.receiptNo },
        {
          status: "Revoked",
          "details.revokedAt": new Date(),
          "details.revocationReason": `Full refund processed under ${refundNo}: ${reason.trim()}`,
        }
      );
      if (donation.certificateNo) {
        await Verification.findOneAndUpdate(
          { documentNo: donation.certificateNo },
          {
            status: "Revoked",
            "details.revokedAt": new Date(),
            "details.revocationReason": `Full refund processed under ${refundNo}: ${reason.trim()}`,
          }
        );
      }
    }

    res.status(201).json({
      success: true,
      message: `Refund ${refundNo} of ₹${(targetPaise / 100).toLocaleString("en-IN")} successfully processed.`,
      refund,
      donation: {
        id: donation._id,
        receiptNo: donation.receiptNo,
        paymentStatus: donation.paymentStatus,
        refundableRemainingRupees: (remainingPaise - targetPaise) / 100,
      },
    });
  } catch (error: any) {
    console.error("createRefund error:", error);
    res.status(500).json({ success: false, message: "Failed to process refund", error: error.message });
  }
}

/**
 * 2. List Refunds with Search, Status Filters & KPI Summary
 */
export async function listRefunds(req: Request, res: Response): Promise<void> {
  try {
    const { status, search, from, to, page = "1", limit = "20" } = req.query;

    const query: any = {};
    if (status && status !== "all") query.status = status;

    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(String(from));
      if (to) query.createdAt.$lte = new Date(String(to));
    }

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(String(limit), 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Search requires matching refundNo or looking up donations by receiptNo / donorName
    if (search) {
      const searchRegex = new RegExp(String(search).trim(), "i");
      const matchedDonations = await Donation.find({
        $or: [{ receiptNo: searchRegex }, { donorName: searchRegex }, { email: searchRegex }],
      }).select("_id");

      const donationIds = matchedDonations.map((d) => d._id);
      query.$or = [
        { refundNo: searchRegex },
        { reason: searchRegex },
        { donationId: { $in: donationIds } },
      ];
    }

    const [refunds, total] = await Promise.all([
      Refund.find(query)
        .populate("donationId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Refund.countDocuments(query),
    ]);

    // Aggregate summary statistics
    const allRefunds = await Refund.find().select("amountPaise status");
    const totalVolumePaise = allRefunds.reduce((sum, r) => sum + (r.amountPaise || 0), 0);
    const processedCount = allRefunds.filter((r) => r.status === "processed").length;
    const requestedCount = allRefunds.filter((r) => r.status === "requested").length;

    res.json({
      success: true,
      data: refunds,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
      summary: {
        totalRefundedPaise: totalVolumePaise,
        totalRefundedRupees: totalVolumePaise / 100,
        refundCount: allRefunds.length,
        processedCount,
        requestedCount,
      },
    });
  } catch (error: any) {
    console.error("listRefunds error:", error);
    res.status(500).json({ success: false, message: "Failed to list refunds", error: error.message });
  }
}

/**
 * 3. Get Single Refund Details
 */
export async function getRefundById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const refund = await Refund.findById(id).populate("donationId");

    if (!refund) {
      res.status(404).json({ success: false, message: "Refund record not found" });
      return;
    }

    res.json({ success: true, data: refund });
  } catch (error: any) {
    console.error("getRefundById error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch refund details", error: error.message });
  }
}

