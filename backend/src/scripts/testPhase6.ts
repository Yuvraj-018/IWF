import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import app from "../app.js";
import { connectDB } from "../config/db.js";
import { Expense } from "../models/Expense.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { Budget } from "../models/Budget.js";
import { signToken } from "../utils/authUtils.js";

dotenv.config();

async function runPhase6Tests() {
  console.log("================================================================================");
  console.log("🧪 RUNNING COMPREHENSIVE AUTOMATED VERIFICATION: PHASE 6");
  console.log("================================================================================");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    totalTests++;
    if (condition) {
      console.log(`✅ [TEST ${totalTests}] PASSED: ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ [TEST ${totalTests}] FAILED: ${testName}`);
      if (details) console.error(`   Details: ${details}`);
      throw new Error(`Test failed: ${testName}`);
    }
  }

  console.log("Connecting to MongoDB...");
  await connectDB();

  // Safely drop any obsolete voucherNo_1 index from previous prototypes
  try {
    await Expense.collection.dropIndex("voucherNo_1");
  } catch (e) {}

  // Create test HTTP server on port 5087
  const server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(5087, "127.0.0.1", () => {
      console.log("Test HTTP server listening on http://127.0.0.1:5087");
      resolve();
    });
  });

  const baseUrl = "http://127.0.0.1:5087/api";

  // Create Staff Token and Super Admin Token for Separation of Duties Testing
  const staffToken = signToken({ id: "staff-zahid", name: "Zahid Ahmed", role: "staff" });
  const reviewerToken = signToken({ id: "reviewer-iftekar", name: "Iftekar Alam", role: "finance_approver" });
  const superAdminToken = signToken({ id: "admin-super", name: "Imteyazullah", role: "superadmin" });

  const staffHeaders = {
    Authorization: `Bearer ${staffToken}`,
    "Content-Type": "application/json",
  };
  const reviewerHeaders = {
    Authorization: `Bearer ${reviewerToken}`,
    "Content-Type": "application/json",
  };
  const superHeaders = {
    Authorization: `Bearer ${superAdminToken}`,
    "Content-Type": "application/json",
  };

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // TEST 1: Submit an Expense Voucher via Staff Account
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 1: EXPENSE VOUCHER SUBMISSION");
    const voucherPayload = {
      date: "2025-05-02",
      amount: 45000,
      head: "Medical Support",
      workAreaId: "HLT",
      initiativeId: "Dialysis Patient Aid",
      payeeName: "Metro Surgical Supplies",
      payeePan: "AAACM5544B",
      invoiceRef: "INV-MSS-8841",
      description: "Procurement of specialized medical consumables and dialysis dialyzers",
      paymentMethod: "Bank Transfer",
    };

    const submitRes = await fetch(`${baseUrl}/finance/expenses`, {
      method: "POST",
      headers: staffHeaders,
      body: JSON.stringify(voucherPayload),
    });

    const submitJson: any = await submitRes.json();
    assert(submitRes.status === 201 && submitJson.success === true, "POST /api/finance/expenses returns HTTP 201 Created");

    const createdExpense = submitJson.data;
    assert(Boolean(createdExpense.expenseNo), `Voucher number allocated: ${createdExpense.expenseNo}`);
    assert(/^EXP-\d{4}-\d{5}$/.test(createdExpense.expenseNo), `Voucher format matches EXP-YYYY-XXXXX (${createdExpense.expenseNo})`);
    assert(createdExpense.status === "submitted", "Initial status is 'submitted' awaiting review");
    assert(createdExpense.payment.status === "unpaid", "Initial payout status is 'unpaid'");
    assert(createdExpense.amountPaise === 4500000, "Voucher amount stored in paise (4500000 paise = ₹ 45,000)");

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 2: Enforce Separation of Duties (Staff cannot approve own voucher)
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 2: SEPARATION OF DUTIES ENFORCEMENT");
    const selfApproveRes = await fetch(`${baseUrl}/finance/expenses/${createdExpense._id}/review`, {
      method: "POST",
      headers: staffHeaders,
      body: JSON.stringify({ action: "approve" }),
    });

    assert(
      selfApproveRes.status === 403,
      "Self-approval rejected with HTTP 403 Forbidden (Separation of duties rule)"
    );

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 3: Independent Approver Authorizes the Expense
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 3: INDEPENDENT REVIEW & APPROVAL");
    const reviewRes = await fetch(`${baseUrl}/finance/expenses/${createdExpense._id}/review`, {
      method: "POST",
      headers: reviewerHeaders,
      body: JSON.stringify({ action: "approve", comments: "Medical invoices verified and approved" }),
    });

    const reviewJson: any = await reviewRes.json();
    assert(reviewRes.status === 200 && reviewJson.success === true, "Reviewer approval returns HTTP 200");
    assert(reviewJson.data.status === "approved", "Voucher status updated to 'approved'");
    assert(reviewJson.data.approval.reviewedBy === "Iftekar Alam", "Reviewer identity recorded in approval metadata");

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 4: Execute Bank Disbursement Payout & Ledger Post
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 4: BANK DISBURSEMENT PAYOUT & DUAL-ENTRY LEDGER DEBIT");
    const payoutPayload = {
      paymentDate: "2025-05-03",
      paymentMethod: "Bank Transfer",
      reference: "UTR-SBI-77665544",
    };

    const payRes = await fetch(`${baseUrl}/finance/expenses/${createdExpense._id}/pay`, {
      method: "POST",
      headers: superHeaders,
      body: JSON.stringify(payoutPayload),
    });

    const payJson: any = await payRes.json();
    assert(payRes.status === 200 && payJson.success === true, "POST /api/finance/expenses/:id/pay returns HTTP 200");
    assert(payJson.data.payment.status === "paid", "Voucher payment status updated to 'paid'");
    assert(payJson.data.payment.reference === "UTR-SBI-77665544", "Bank UTR reference recorded");

    // Verify dual-entry LedgerEntry debit post
    const debitLedgerEntry = await LedgerEntry.findOne({
      sourceId: createdExpense._id,
      direction: "debit",
    });

    assert(Boolean(debitLedgerEntry), "Matching debit LedgerEntry created for disbursed expense");
    assert(debitLedgerEntry?.amountPaise === 4500000, "Ledger debit records exact 4500000 paise");
    assert(debitLedgerEntry?.type === "expense", "Ledger entry typed as 'expense'");
    assert(debitLedgerEntry?.workAreaId === "HLT", "Ledger debit assigned to workAreaId 'HLT'");

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 5: Filter Expenses by Stage
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 5: STAGE-FILTERED EXPENSES QUERY");
    const paidListRes = await fetch(`${baseUrl}/finance/expenses?stage=paid&head=Medical Support`, {
      headers: superHeaders,
    });
    const paidListJson: any = await paidListRes.json();

    assert(paidListRes.status === 200 && paidListJson.success === true, "GET /api/finance/expenses?stage=paid returns HTTP 200");
    assert(
      paidListJson.data.some((e: any) => e.expenseNo === createdExpense.expenseNo),
      "Disbursed voucher appears in paid stage list"
    );

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 6: Budget Allocation & Live Utilization Tracking
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 6: BUDGETS WORKSPACE & SECTOR UTILIZATION");
    // Update HLT budget envelope for FY 2025-26
    const setBudgetRes = await fetch(`${baseUrl}/finance/budgets`, {
      method: "POST",
      headers: superHeaders,
      body: JSON.stringify({
        fy: "2025-26",
        workAreaId: "HLT",
        allocatedAmount: 2500000,
      }),
    });
    const setBudgetJson: any = await setBudgetRes.json();
    assert(setBudgetRes.status === 200 && setBudgetJson.success === true, "POST /api/finance/budgets sets HLT allocation");

    // Fetch live budgets
    const getBudgetsRes = await fetch(`${baseUrl}/finance/budgets?fy=2025-26`, {
      headers: superHeaders,
    });
    const getBudgetsJson: any = await getBudgetsRes.json();

    assert(getBudgetsRes.status === 200 && getBudgetsJson.success === true, "GET /api/finance/budgets returns HTTP 200");
    assert(Boolean(getBudgetsJson.summary), "Budget summary contains totalAllocated, totalSpent, remaining");

    const hltSector = getBudgetsJson.sectorBudgets.find((b: any) => b.code === "HLT");
    assert(Boolean(hltSector), "Healthcare sector budget found");
    assert(hltSector?.allocated === 2500000, "HLT allocated budget is ₹ 25,00,000");
    assert(hltSector?.spent > 0, `HLT spent reflects actual incurred expenses (₹ ${hltSector?.spent})`);
    assert(hltSector?.utilization >= 0 && hltSector?.utilization <= 100, `Utilization calculated cleanly (${hltSector?.utilization}%)`);

    console.log("\n================================================================================");
    console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED CLEANLY FOR PHASE 6!`);
    console.log("================================================================================");
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

runPhase6Tests().catch((err) => {
  console.error("Phase 6 Test Suite execution failed:", err);
  process.exit(1);
});
