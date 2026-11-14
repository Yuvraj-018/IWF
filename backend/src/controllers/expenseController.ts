import { Request, Response } from "express";
import { Expense, ExpenseStatus } from "../models/Expense.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { Budget } from "../models/Budget.js";
import {
  getNextExpenseNo,
  getNextTransactionNo,
  getCurrentFinancialYear,
} from "../utils/idGenerator.js";
import { getActor, logAudit } from "../services/auditService.js";
import { checkSeparationOfDuties } from "../services/separationOfDuties.js";
import { applyScopeFilter } from "../utils/piiFilter.js";
import { RbacRequest } from "../middlewares/rbac.js";

/**
 * 1. Submit an Expense Voucher
 * Status begins as "submitted"
 */
export async function createExpense(req: Request, res: Response): Promise<void> {
  try {
    const {
      date,
      amount,
      head,
      workAreaId,
      initiativeId,
      payeeName,
      payeePan,
      payeeGstin,
      payeeBankDetails,
      invoiceRef,
      description,
      evidenceUrls = [],
      paymentMethod = "Bank Transfer",
      autoApprove = false,
    } = req.body;

    if (!amount || !head || !workAreaId || !payeeName || !description) {
      res.status(400).json({ success: false, message: "Missing required expense voucher fields" });
      return;
    }

    const expenseDate = date ? new Date(date) : new Date();
    const amountPaise = Math.round(Number(amount) * 100);
    const expenseYear = expenseDate.getFullYear();
    const expenseNo = await getNextExpenseNo(expenseYear);
    const actor = getActor(req);
    const createdBy = actor.name || actor.email || "finance_staff";

    // Non-negotiable Separation of Duties: Superadmin CANNOT auto-approve their own expenses
    const isApproved = false;

    const expense = new Expense({
      expenseNo,
      date: expenseDate,
      amountPaise,
      head,
      workAreaId: workAreaId.toUpperCase(),
      initiativeId,
      payee: {
        name: payeeName,
        pan: payeePan,
        gstin: payeeGstin,
        bankDetails: payeeBankDetails,
      },
      invoiceRef,
      description,
      evidenceUrls: Array.isArray(evidenceUrls) ? evidenceUrls : [evidenceUrls].filter(Boolean),
      status: isApproved ? "approved" : "submitted",
      payment: {
        status: "unpaid",
        method: paymentMethod,
      },
      approval: {
        status: isApproved ? "approved" : "pending",
        reviewedBy: isApproved ? createdBy : undefined,
        reviewedAt: isApproved ? new Date() : undefined,
        comments: isApproved ? "Auto-approved at voucher creation" : undefined,
      },
      createdBy,
    });

    await expense.save();

    await logAudit({
      req,
      action: "finance.expense:create",
      resourceType: "expense",
      resourceId: expense._id.toString(),
      after: { expenseNo, amount: Number(amount), head, workAreaId },
      reason: `Expense voucher ${expenseNo} created by ${createdBy}`,
    });

    res.status(201).json({
      success: true,
      message: `Expense voucher ${expenseNo} submitted successfully`,
      data: expense,
    });
  } catch (error: any) {
    console.error("createExpense error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create expense voucher",
      error: error.message,
    });
  }
}

/**
 * 2. List Expenses with advanced filtering & tab stages
 */
export async function listExpenses(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 20);
    const skip = (page - 1) * limit;

    let filter: any = {};

    // Tab stage filter
    const stage = req.query.stage as string;
    if (stage === "pending") {
      filter.status = "submitted";
    } else if (stage === "approved") {
      filter.status = "approved";
      filter["payment.status"] = "unpaid";
    } else if (stage === "paid") {
      filter["payment.status"] = "paid";
    } else if (stage === "reconciled") {
      filter.status = "approved";
      filter["payment.status"] = "paid";
      filter.isReconciled = true;
    } else if (req.query.status && req.query.status !== "all") {
      filter.status = req.query.status;
    }

    if (req.query.head && req.query.head !== "all") {
      filter.head = req.query.head;
    }

    if (req.query.workAreaId && req.query.workAreaId !== "all") {
      filter.workAreaId = String(req.query.workAreaId).toUpperCase();
    }

    if (req.query.fy && req.query.fy !== "all") {
      const parts = String(req.query.fy).split("-");
      const startYear = parseInt(parts[0], 10);
      if (!isNaN(startYear)) {
        filter.date = {
          $gte: new Date(startYear, 3, 1, 0, 0, 0, 0),
          $lte: new Date(startYear + 1, 2, 31, 23, 59, 59, 999),
        };
      }
    }

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { expenseNo: { $regex: q, $options: "i" } },
        { "payee.name": { $regex: q, $options: "i" } },
        { "payee.pan": { $regex: q, $options: "i" } },
        { invoiceRef: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { head: { $regex: q, $options: "i" } },
      ];
    }

    const user = (req as RbacRequest).adminUser;
    filter = applyScopeFilter(filter, user, "workAreaId");

    const [expenses, total, stats] = await Promise.all([
      Expense.find(filter).sort({ date: -1 }).skip(skip).limit(limit).lean(),
      Expense.countDocuments(filter),
      Expense.aggregate([
        {
          $group: {
            _id: null,
            totalPaise: { $sum: "$amountPaise" },
            pendingCount: {
              $sum: { $cond: [{ $eq: ["$status", "submitted"] }, 1, 0] },
            },
            pendingPaise: {
              $sum: { $cond: [{ $eq: ["$status", "submitted"] }, "$amountPaise", 0] },
            },
            approvedUnpaidCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$status", "approved"] },
                      { $eq: ["$payment.status", "unpaid"] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            approvedUnpaidPaise: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$status", "approved"] },
                      { $eq: ["$payment.status", "unpaid"] },
                    ],
                  },
                  "$amountPaise",
                  0,
                ],
              },
            },
            paidPaise: {
              $sum: { $cond: [{ $eq: ["$payment.status", "paid"] }, "$amountPaise", 0] },
            },
          },
        },
      ]),
    ]);

    const statSummary = stats[0] || {
      totalPaise: 0,
      pendingCount: 0,
      pendingPaise: 0,
      approvedUnpaidCount: 0,
      approvedUnpaidPaise: 0,
      paidPaise: 0,
    };

    res.json({
      success: true,
      data: expenses.map((e) => ({
        ...e,
        amount: Math.round(e.amountPaise / 100),
      })),
      stats: {
        totalAmount: Math.round(statSummary.totalPaise / 100),
        pendingCount: statSummary.pendingCount,
        pendingAmount: Math.round(statSummary.pendingPaise / 100),
        unpaidCount: statSummary.approvedUnpaidCount,
        unpaidAmount: Math.round(statSummary.approvedUnpaidPaise / 100),
        paidAmount: Math.round(statSummary.paidPaise / 100),
      },
      pagination: { total, page, limit, pages: Math.ceil(total / limit) || 1 },
    });
  } catch (error: any) {
    console.error("listExpenses error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
}

/**
 * 3. Review Expense (Approve, Return, or Reject)
 * Enforces separation of duties: creator cannot approve own voucher.
 */
export async function reviewExpense(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { action, comments } = req.body; // action: "approve" | "return" | "reject"

    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404).json({ success: false, message: "Expense voucher not found" });
      return;
    }

    const actor = getActor(req);
    const reviewer = actor.name || actor.email;

    // Separation of Duties Check: Creator cannot approve or reject their own expense (NO superadmin bypass)
    const sodCheck = checkSeparationOfDuties(
      action === "approve" ? "approve" : "reject",
      actor,
      expense,
      req.body.breakGlassReason
    );
    if (!sodCheck.allowed) {
      res.status(403).json({
        success: false,
        message: sodCheck.reason,
      });
      return;
    }

    if (action === "approve") {
      expense.status = "approved";
      expense.approval = {
        status: "approved",
        reviewedBy: reviewer,
        reviewedAt: new Date(),
        comments: comments || "Approved for disbursement",
      };
    } else if (action === "return") {
      expense.status = "returned";
      expense.approval = {
        status: "returned",
        reviewedBy: reviewer,
        reviewedAt: new Date(),
        comments: comments || "Returned for corrections or invoice re-upload",
      };
    } else if (action === "reject") {
      expense.status = "rejected";
      expense.approval = {
        status: "rejected",
        reviewedBy: reviewer,
        reviewedAt: new Date(),
        comments: comments || "Rejected by finance approver",
      };
    } else {
      res.status(400).json({ success: false, message: "Invalid review action" });
      return;
    }

    await expense.save();

    await logAudit({
      req,
      action: action === "approve" ? "finance.expense:approve" : "finance.expense:reject",
      resourceType: "expense",
      resourceId: expense._id.toString(),
      severity: action === "approve" ? "info" : "warning",
      reason: comments || `Voucher ${action}d by ${reviewer}`,
    });

    res.json({
      success: true,
      message: `Expense voucher ${expense.expenseNo} marked as ${expense.status}`,
      data: expense,
    });
  } catch (error: any) {
    console.error("reviewExpense error:", error);
    res.status(500).json({ success: false, message: "Failed to review expense", error: error.message });
  }
}

/**
 * 4. Record Payment for Approved Expense
 * Marks payment status as "paid", creates Ledger debit, and updates budget spentPaise.
 */
export async function recordPayment(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const {
      paymentDate,
      paymentMethod = "Bank Transfer",
      reference, // UTR or Cheque number
      bankAccountId,
    } = req.body;

    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404).json({ success: false, message: "Expense voucher not found" });
      return;
    }

    if (expense.status !== "approved") {
      res.status(400).json({
        success: false,
        message: `Cannot record payment for expense in '${expense.status}' status. Voucher must be approved first.`,
      });
      return;
    }

    const actor = getActor(req);

    // Separation of Duties Check: Creator cannot disburse/record payment for their own expense
    const sodCheck = checkSeparationOfDuties("pay", actor, expense, req.body.breakGlassReason);
    if (!sodCheck.allowed) {
      res.status(403).json({
        success: false,
        message: sodCheck.reason,
      });
      return;
    }

    const payDate = paymentDate ? new Date(paymentDate) : new Date();

    expense.payment = {
      status: "paid",
      date: payDate,
      method: paymentMethod,
      reference: reference || `UTR-${Date.now()}`,
      bankAccountId,
    };

    await expense.save();

    await logAudit({
      req,
      action: "finance.expense:pay",
      resourceType: "expense",
      resourceId: expense._id.toString(),
      reason: `Payment disbursed by ${actor.name} (${actor.email})`,
    });

    // Dual-entry Ledger Post: Debit expense
    try {
      const fy = getCurrentFinancialYear();
      const month = `${payDate.getFullYear()}-${String(payDate.getMonth() + 1).padStart(2, "0")}`;
      const txnNo = await getNextTransactionNo(payDate.getFullYear());

      await LedgerEntry.create({
        entryNo: txnNo,
        effectiveDate: payDate,
        postedAt: new Date(),
        fy,
        month,
        direction: "debit",
        amountPaise: expense.amountPaise,
        type: "expense",
        head: expense.head,
        sourceType: "expense",
        sourceId: expense._id,
        workAreaId: expense.workAreaId,
        initiativeId: expense.initiativeId,
        fundType: "general",
        paymentMethod,
        idempotencyKey: `pay_exp_${expense.expenseNo}`,
        createdBy: actor.name || actor.email,
      });
    } catch (ledgerErr) {
      console.warn("Ledger creation warning for recorded payment:", ledgerErr);
    }

    // Budget Utilization Update: Increment spentPaise on active FY budget
    try {
      const fy = getCurrentFinancialYear();
      await Budget.findOneAndUpdate(
        { fy, workAreaId: expense.workAreaId },
        { $inc: { spentPaise: expense.amountPaise } }
      );
    } catch (budgetErr) {
      console.warn("Budget spentPaise update warning:", budgetErr);
    }

    res.json({
      success: true,
      message: `Payment of ₹${Math.round(expense.amountPaise / 100).toLocaleString("en-IN")} recorded successfully for ${expense.expenseNo}`,
      data: expense,
    });
  } catch (error: any) {
    console.error("recordPayment error:", error);
    res.status(500).json({ success: false, message: "Failed to record payment", error: error.message });
  }
}

/**
 * 5. Reverse / Cancel Expense
 */
export async function reverseExpense(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404).json({ success: false, message: "Expense voucher not found" });
      return;
    }

    const actor = getActor(req);

    // Separation of Duties Check: Creator cannot reverse their own expense
    const sodCheck = checkSeparationOfDuties("reverse", actor, expense, req.body.breakGlassReason);
    if (!sodCheck.allowed) {
      res.status(403).json({
        success: false,
        message: sodCheck.reason,
      });
      return;
    }

    const wasPaid = expense.payment?.status === "paid";
    expense.status = "cancelled";
    expense.approval = {
      status: "cancelled",
      reviewedBy: actor.name || actor.email,
      reviewedAt: new Date(),
      comments: reason || "Expense cancelled and reversed",
    };

    await expense.save();

    await logAudit({
      req,
      action: "finance.expense:reverse",
      resourceType: "expense",
      resourceId: expense._id.toString(),
      severity: "high",
      reason: reason || `Expense cancelled and reversed by ${actor.name}`,
    });

    // If it was already paid and ledgered, post an offsetting credit reversal
    if (wasPaid) {
      try {
        const fy = getCurrentFinancialYear();
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const txnNo = await getNextTransactionNo(now.getFullYear());

        await LedgerEntry.create({
          entryNo: txnNo,
          effectiveDate: now,
          postedAt: now,
          fy,
          month,
          direction: "credit",
          amountPaise: expense.amountPaise,
          type: "reversal",
          head: `Reversal of ${expense.head} (${expense.expenseNo})`,
          sourceType: "expense",
          sourceId: expense._id,
          workAreaId: expense.workAreaId,
          fundType: "general",
          idempotencyKey: `rev_exp_${expense.expenseNo}`,
          createdBy: actor.name || actor.email,
        });

        // Decrement spentPaise in Budget
        await Budget.findOneAndUpdate(
          { fy, workAreaId: expense.workAreaId },
          { $inc: { spentPaise: -expense.amountPaise } }
        );
      } catch (revErr) {
        console.warn("Reversal ledger entry post warning:", revErr);
      }
    }

    res.json({
      success: true,
      message: `Expense ${expense.expenseNo} cancelled successfully`,
      data: expense,
    });
  } catch (error: any) {
    console.error("reverseExpense error:", error);
    res.status(500).json({ success: false, message: "Failed to reverse expense", error: error.message });
  }
}

/**
 * 6. Get Budgets vs Actual Spend for FY
 */
export async function getBudgets(req: Request, res: Response): Promise<void> {
  try {
    const fy = (req.query.fy as string) || getCurrentFinancialYear();

    const masterWorkAreas = [
      { code: "HLT", name: "Healthcare & Well-being", defaultBudget: 2500000 },
      { code: "EDU", name: "Education & Learning", defaultBudget: 3000000 },
      { code: "SLE", name: "Livelihoods & Enterprise", defaultBudget: 1500000 },
      { code: "WYE", name: "Women & Youth Empowerment", defaultBudget: 1200000 },
      { code: "ENV", name: "Environment & Climate", defaultBudget: 800000 },
      { code: "SJL", name: "Social Justice & Legal", defaultBudget: 600000 },
      { code: "AGR", name: "Agriculture & Food Security", defaultBudget: 1000000 },
      { code: "HRR", name: "Humanitarian Relief", defaultBudget: 1400000 },
    ];

    const dbBudgets = await Budget.find({ fy }).lean();

    // Actual incurred expenses per sector in this FY
    const parts = fy.split("-");
    const startYear = parseInt(parts[0], 10) || 2025;
    const startDate = new Date(startYear, 3, 1, 0, 0, 0, 0);
    const endDate = new Date(startYear + 1, 2, 31, 23, 59, 59, 999);

    const actualSpend = await Expense.aggregate([
      {
        $match: {
          $or: [{ status: "approved" }, { "payment.status": "paid" }],
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$workAreaId",
          totalPaise: { $sum: "$amountPaise" },
        },
      },
    ]);

    const spendMap: Record<string, number> = {};
    for (const item of actualSpend) {
      if (item._id) {
        spendMap[item._id.toUpperCase()] = Math.round(item.totalPaise / 100);
      }
    }

    let totalAllocated = 0;
    let totalSpent = 0;

    const sectorBudgets = masterWorkAreas.map((area) => {
      const match = dbBudgets.find((b) => b.workAreaId.toUpperCase() === area.code);
      const allocated = match ? Math.round(match.allocatedPaise / 100) : area.defaultBudget;
      const spent = spendMap[area.code] || (match ? Math.round(match.spentPaise / 100) : 0);
      const remaining = Math.max(0, allocated - spent);
      const utilization = allocated > 0 ? Math.min(100, Math.round((spent / allocated) * 100)) : 0;

      totalAllocated += allocated;
      totalSpent += spent;

      return {
        code: area.code,
        name: area.name,
        allocated,
        spent,
        remaining,
        utilization,
        status: match?.status || "approved",
      };
    });

    const totalRemaining = Math.max(0, totalAllocated - totalSpent);
    const overallUtilization = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

    res.json({
      success: true,
      fy,
      summary: {
        totalAllocated,
        totalSpent,
        totalRemaining,
        overallUtilization,
      },
      sectorBudgets,
    });
  } catch (error: any) {
    console.error("getBudgets error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch budgets", error: error.message });
  }
}

/**
 * 7. Configure / Update Budget for a Work Area
 */
export async function setBudget(req: Request, res: Response): Promise<void> {
  try {
    const { fy, workAreaId, allocatedAmount, initiativeId } = req.body;

    if (!fy || !workAreaId || allocatedAmount === undefined) {
      res.status(400).json({ success: false, message: "FY, workAreaId, and allocatedAmount are required" });
      return;
    }

    const allocatedPaise = Math.round(Number(allocatedAmount) * 100);
    const actor = getActor(req);

    const budget = await Budget.findOneAndUpdate(
      { fy, workAreaId: workAreaId.toUpperCase(), initiativeId: initiativeId || null },
      {
        fy,
        workAreaId: workAreaId.toUpperCase(),
        initiativeId: initiativeId || undefined,
        allocatedPaise,
        status: "approved",
        approvedBy: actor.name || actor.email,
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    await logAudit({
      req,
      action: "finance.budget:edit",
      resourceType: "budget",
      resourceId: `${workAreaId}_${fy}`,
      severity: "info",
      after: { fy, workAreaId, allocatedAmount: Number(allocatedAmount) },
      reason: `Budget updated by ${actor.name}`,
    });

    res.json({
      success: true,
      message: `Budget updated successfully for ${workAreaId} (FY ${fy})`,
      data: budget,
    });
  } catch (error: any) {
    console.error("setBudget error:", error);
    res.status(500).json({ success: false, message: "Failed to update budget", error: error.message });
  }
}
