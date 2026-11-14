import { Request, Response } from "express";
import { Types } from "mongoose";
import { BankAccount } from "../models/BankAccount.js";
import { BankStatement, BankStatementLine } from "../models/BankStatement.js";
import {
  parseAndSaveBankStatement,
  runAutoMatching,
  confirmLineMatch,
  unmatchLine,
  recordDirectIncomeFromLine,
  findCandidatesForLine,
} from "../services/reconciliationService.js";
import { getActor, logAudit } from "../services/auditService.js";

/**
 * 1. List Bank Accounts for selector
 */
export async function listBankAccounts(req: Request, res: Response): Promise<void> {
  try {
    const accounts = await BankAccount.find().sort({ isPrimary: -1, bankName: 1 });
    res.json({ success: true, data: accounts });
  } catch (error: any) {
    console.error("listBankAccounts error:", error);
    res.status(500).json({ success: false, message: "Failed to load bank accounts", error: error.message });
  }
}

/**
 * 2. Upload and Parse Bank Statement CSV
 * Accepts `csvContent` in body or file upload text
 */
export async function uploadBankStatement(req: Request, res: Response): Promise<void> {
  try {
    const actor = getActor(req);
    const uploadedBy = actor.name || actor.email || "finance_entry";

    let csvContent = req.body.csvContent;
    let bankAccountId = req.body.bankAccountId;
    let fileUrl = req.body.fileUrl;

    // Handle file from multer if present
    if (req.file) {
      csvContent = req.file.buffer.toString("utf-8");
      fileUrl = `/uploads/statements/${req.file.originalname}`;
    }

    if (!csvContent || typeof csvContent !== "string") {
      res.status(400).json({ success: false, message: "CSV content or file is required." });
      return;
    }

    // Default to primary bank account if not specified
    if (!bankAccountId) {
      const primary = await BankAccount.findOne({ isPrimary: true }) || await BankAccount.findOne();
      if (!primary) {
        // Create default SBI primary account if database is fresh
        const newPrimary = await BankAccount.create({
          bankName: "State Bank of India",
          accountNumberMasked: "******1092",
          ifsc: "SBIN0001234",
          branch: "Main Branch",
          type: "current",
          openingBalancePaise: 50000000,
          currentBalancePaise: 50000000,
          isPrimary: true,
        });
        bankAccountId = newPrimary._id;
      } else {
        bankAccountId = primary._id;
      }
    }

    const { statement, lines } = await parseAndSaveBankStatement({
      csvContent,
      bankAccountId,
      uploadedBy,
      fileUrl,
    });

    // Automatically trigger initial auto-matching on upload
    const matchStats = await runAutoMatching(statement._id.toString());

    res.status(201).json({
      success: true,
      message: `Bank statement imported successfully with ${lines.length} transaction lines.`,
      statement,
      matchStats,
    });
  } catch (error: any) {
    console.error("uploadBankStatement error:", error);
    res.status(500).json({ success: false, message: "Failed to upload bank statement", error: error.message });
  }
}

/**
 * 3. List Statements
 */
export async function listStatements(req: Request, res: Response): Promise<void> {
  try {
    const statements = await BankStatement.find()
      .populate("bankAccountId")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: statements });
  } catch (error: any) {
    console.error("listStatements error:", error);
    res.status(500).json({ success: false, message: "Failed to list statements", error: error.message });
  }
}

/**
 * 4. List Statement Lines with Multi-filtering and Analytics Summary
 */
export async function listStatementLines(req: Request, res: Response): Promise<void> {
  try {
    const { statementId, matchStatus, search, page = "1", limit = "50" } = req.query;

    const query: any = {};
    if (statementId) query.statementId = statementId;
    if (matchStatus && matchStatus !== "all") query.matchStatus = matchStatus;

    if (search) {
      const searchRegex = new RegExp(String(search).trim(), "i");
      query.$or = [{ narration: searchRegex }, { reference: searchRegex }, { notes: searchRegex }];
    }

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(String(limit), 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [lines, total] = await Promise.all([
      BankStatementLine.find(query)
        .populate("matchedLedgerEntryId")
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      BankStatementLine.countDocuments(query),
    ]);

    // Compute Summary Stats for the active view / statement
    const statsQuery: Record<string, any> = {};
    if (statementId) {
      statsQuery.statementId = typeof statementId === "string" ? new Types.ObjectId(statementId) : statementId;
    }

    const [allLines, statsAgg] = await Promise.all([
      BankStatementLine.find(statsQuery).select("creditPaise debitPaise matchStatus").lean(),
      BankStatementLine.aggregate([
        { $match: statsQuery },
        {
          $group: {
            _id: null,
            totalCreditsPaise: { $sum: "$creditPaise" },
            totalDebitsPaise: { $sum: "$debitPaise" },
            matchedCreditsPaise: {
              $sum: { $cond: [{ $eq: ["$matchStatus", "matched"] }, "$creditPaise", 0] },
            },
            matchedDebitsPaise: {
              $sum: { $cond: [{ $eq: ["$matchStatus", "matched"] }, "$debitPaise", 0] },
            },
            unmatchedCreditsPaise: {
              $sum: { $cond: [{ $eq: ["$matchStatus", "unmatched"] }, "$creditPaise", 0] },
            },
            unmatchedDebitsPaise: {
              $sum: { $cond: [{ $eq: ["$matchStatus", "unmatched"] }, "$debitPaise", 0] },
            },
          },
        },
      ]),
    ]);

    const statusCounts = {
      all: allLines.length,
      unmatched: allLines.filter((l: any) => l.matchStatus === "unmatched").length,
      suggested: allLines.filter((l: any) => l.matchStatus === "suggested").length,
      matched: allLines.filter((l: any) => l.matchStatus === "matched").length,
      ignored: allLines.filter((l: any) => l.matchStatus === "ignored").length,
    };

    const agg = statsAgg[0] || {
      totalCreditsPaise: 0,
      totalDebitsPaise: 0,
      matchedCreditsPaise: 0,
      matchedDebitsPaise: 0,
      unmatchedCreditsPaise: 0,
      unmatchedDebitsPaise: 0,
    };

    res.json({
      success: true,
      data: lines,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
      summary: {
        counts: statusCounts,
        totalCreditsPaise: agg.totalCreditsPaise,
        totalCreditsRupees: agg.totalCreditsPaise / 100,
        totalDebitsPaise: agg.totalDebitsPaise,
        totalDebitsRupees: agg.totalDebitsPaise / 100,
        reconciledPaise: agg.matchedCreditsPaise + agg.matchedDebitsPaise,
        reconciledRupees: (agg.matchedCreditsPaise + agg.matchedDebitsPaise) / 100,
        discrepancyPaise: agg.unmatchedCreditsPaise + agg.unmatchedDebitsPaise,
        discrepancyRupees: (agg.unmatchedCreditsPaise + agg.unmatchedDebitsPaise) / 100,
      },
    });
  } catch (error: any) {
    console.error("listStatementLines error:", error);
    res.status(500).json({ success: false, message: "Failed to list statement lines", error: error.message });
  }
}

/**
 * 5. Run Auto-Match Engine
 */
export async function triggerAutoMatch(req: Request, res: Response): Promise<void> {
  try {
    const { statementId } = req.body;
    const result = await runAutoMatching(statementId);

    res.json({
      success: true,
      message: `Auto-matching complete: ${result.matchedCount} lines matched, ${result.suggestedCount} suggested.`,
      result,
    });
  } catch (error: any) {
    console.error("triggerAutoMatch error:", error);
    res.status(500).json({ success: false, message: "Failed to run auto-match", error: error.message });
  }
}

/**
 * 6. Confirm Line Match / Link to Ledger Entry
 */
export async function confirmMatch(req: Request, res: Response): Promise<void> {
  try {
    const { lineId, ledgerEntryId } = req.body;
    if (!lineId || !ledgerEntryId) {
      res.status(400).json({ success: false, message: "lineId and ledgerEntryId are required" });
      return;
    }

    const actor = getActor(req);
    const adminUser = actor.name || actor.email || "finance_approver";

    const updatedLine = await confirmLineMatch({
      lineId,
      ledgerEntryId,
      adminUser,
    });

    await logAudit({
      req,
      action: "finance.reconciliation:reconcile",
      resourceType: "reconciliation_line",
      resourceId: String(lineId),
      after: { ledgerEntryId },
      reason: `Reconciliation confirmed by ${adminUser}`,
    });

    res.json({
      success: true,
      message: "Bank statement line and ledger entry reconciled successfully",
      line: updatedLine,
    });
  } catch (error: any) {
    console.error("confirmMatch error:", error);
    res.status(500).json({ success: false, message: "Failed to confirm match", error: error.message });
  }
}

/**
 * 7. Unmatch Line
 */
export async function unmatch(req: Request, res: Response): Promise<void> {
  try {
    const { lineId } = req.body;
    if (!lineId) {
      res.status(400).json({ success: false, message: "lineId is required" });
      return;
    }

    const user = (req as any).adminUser || (req as any).user;
    const adminUser = user?.name || user?.id || "superadmin";

    const updatedLine = await unmatchLine({ lineId, adminUser });

    res.json({
      success: true,
      message: "Statement line reverted to unmatched state",
      line: updatedLine,
    });
  } catch (error: any) {
    console.error("unmatch error:", error);
    res.status(500).json({ success: false, message: "Failed to unmatch line", error: error.message });
  }
}

/**
 * 8. Get Candidates for Line
 */
export async function getCandidates(req: Request, res: Response): Promise<void> {
  try {
    const { lineId } = req.params;
    const candidates = await findCandidatesForLine(String(lineId));
    res.json({ success: true, candidates });
  } catch (error: any) {
    console.error("getCandidates error:", error);
    res.status(500).json({ success: false, message: "Failed to find candidates", error: error.message });
  }
}

/**
 * 9. Convert Unmatched Credit to Direct Verified Income
 */
export async function recordDirectIncome(req: Request, res: Response): Promise<void> {
  try {
    const {
      lineId,
      donorName,
      donorType = "Individual",
      email = "direct-deposit@islahwelfare.org",
      phone = "9999999999",
      pan,
      workAreaId = "HLT",
      financialType = "Direct Bank Transfer Donation",
      taxExemption = true,
    } = req.body;

    if (!lineId || !donorName) {
      res.status(400).json({ success: false, message: "lineId and donorName are required" });
      return;
    }

    const actor = getActor(req);
    const adminUser = actor.name || actor.email || "finance_approver";

    const result = await recordDirectIncomeFromLine({
      lineId,
      donorName,
      donorType,
      email,
      phone,
      pan,
      workAreaId,
      financialType,
      taxExemption,
      adminUser,
    });

    await logAudit({
      req,
      action: "finance.reconciliation:reconcile",
      resourceType: "reconciliation_direct_income",
      resourceId: String(lineId),
      after: { receiptNo: result.donation.receiptNo, amount: result.donation.amount },
      reason: `Direct bank income recorded and reconciled by ${adminUser}`,
    });

    res.status(201).json({
      success: true,
      message: `Direct bank income recorded and reconciled under Receipt #${result.donation.receiptNo}`,
      donation: result.donation,
      line: result.line,
    });
  } catch (error: any) {
    console.error("recordDirectIncome error:", error);
    res.status(500).json({ success: false, message: "Failed to record direct income", error: error.message });
  }
}

/**
 * 10. Ignore Line (for bank charges / contra items)
 */
export async function ignoreStatementLine(req: Request, res: Response): Promise<void> {
  try {
    const { lineId, reason } = req.body;
    const line = await BankStatementLine.findById(lineId);
    if (!line) {
      res.status(404).json({ success: false, message: "Bank statement line not found" });
      return;
    }

    line.matchStatus = "ignored";
    line.notes = reason || "Ignored by user (bank charges / adjustment)";
    await line.save();

    res.json({
      success: true,
      message: "Statement line marked as ignored",
      line,
    });
  } catch (error: any) {
    console.error("ignoreStatementLine error:", error);
    res.status(500).json({ success: false, message: "Failed to ignore statement line", error: error.message });
  }
}
