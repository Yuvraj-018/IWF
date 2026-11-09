import dotenv from "dotenv";
import path from "path";
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "IWF/backend/.env") });
import mongoose from "mongoose";
import http from "http";
import app from "../app.js";
import { connectDB } from "../config/db.js";
import { BankAccount } from "../models/BankAccount.js";
import { BankStatement, BankStatementLine } from "../models/BankStatement.js";
import { Donation } from "../models/Donation.js";
import { Expense } from "../models/Expense.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { Refund } from "../models/Refund.js";
import { Verification } from "../models/Verification.js";
import { signToken } from "../utils/authUtils.js";
import {
  parseCSVLine,
  parseFlexibleDate,
  parseAmountToPaise,
  extractReference,
  parseAndSaveBankStatement,
  runAutoMatching,
  confirmLineMatch,
  unmatchLine,
  recordDirectIncomeFromLine,
  findCandidatesForLine,
} from "../services/reconciliationService.js";

dotenv.config();

async function runPhase7Tests() {
  console.log("================================================================================");
  console.log("🧪 RUNNING COMPREHENSIVE AUTOMATED VERIFICATION: PHASE 7");
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

  console.log("Connecting to MongoDB Atlas...");
  await connectDB();

  // Create test HTTP server on port 5088
  const server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(5088, "127.0.0.1", () => {
      console.log("Test HTTP server listening on http://127.0.0.1:5088");
      resolve();
    });
  });

  const baseUrl = "http://127.0.0.1:5088/api";
  const adminToken = signToken({ id: "admin_test_7", name: "Super Admin", role: "superadmin" });
  const authHeaders = {
    Authorization: `Bearer ${adminToken}`,
    "Content-Type": "application/json",
  };

  try {
    // -------------------------------------------------------------
    // Unit 1: Statement Parsing & Currency Normalization Utilities
    // -------------------------------------------------------------
    console.log("\n--- SECTION 1: STATEMENT PARSER & DATA UTILITIES ---");

    const parsedCols = parseCSVLine('"01/04/2025","UPI/123/Donation","₹ 1,50,000.00",""');
    assert(parsedCols.length === 4, "parseCSVLine parses quoted columns correctly");
    assert(parsedCols[2] === "₹ 1,50,000.00", "parseCSVLine preserves inner commas inside quotes");

    const paise1 = parseAmountToPaise("1,50,000.00");
    assert(paise1 === 15000000, "parseAmountToPaise correctly converts '1,50,000.00' to 15,000,000 paise");

    const paise2 = parseAmountToPaise("₹ 25,450.50");
    assert(paise2 === 2545050, "parseAmountToPaise handles currency symbol and fractional paise");

    const ref1 = extractReference("UPI/P2A/512948291039/ISLAH DONATION");
    assert(ref1 === "512948291039", "extractReference extracts UPI reference correctly");

    const parsedDate = parseFlexibleDate("28/04/2025");
    assert(parsedDate.getUTCDate() === 28 && parsedDate.getUTCMonth() === 3, "parseFlexibleDate handles DD/MM/YYYY");

    // -------------------------------------------------------------
    // Unit 2: Bank Statement Ingestion via Model & Service
    // -------------------------------------------------------------
    console.log("\n--- SECTION 2: STATEMENT IMPORT & PERSISTENCE ---");

    // Ensure at least one primary BankAccount exists
    let bankAccount = await BankAccount.findOne({ isPrimary: true });
    if (!bankAccount) {
      bankAccount = await BankAccount.create({
        bankName: "State Bank of India",
        accountNumberMasked: "******1092",
        ifsc: "SBIN0001234",
        type: "current",
        isPrimary: true,
      });
    }
    assert(!!bankAccount, "Primary bank account exists for statement matching");

    const sampleCsv = `Txn Date,Description,Ref No,Debit,Credit,Balance
2025-04-01,Razorpay Settlement Batch UTR-RZP-9921,UTR-RZP-9921,,125000.00,1125000.00
2025-04-02,NEFT Payout to Medical Supplies Vendor,NEFT-MED-4412,15000.00,,1110000.00
2025-04-03,Direct Deposit CDM Cash Branch,CDM-99882,,25000.00,1135000.00
2025-04-04,Bank Maintenance & SMS Charges,CHG-001,236.00,,1134764.00`;

    const { statement, lines } = await parseAndSaveBankStatement({
      csvContent: sampleCsv,
      bankAccountId: bankAccount._id as any,
      uploadedBy: "test_engineer",
    });

    assert(!!statement._id, "BankStatement document saved successfully");
    assert(lines.length === 4, "BankStatement parsed exactly 4 transaction lines");
    assert(lines[0].creditPaise === 12500000, "Credit line 1 stored with correct 12,500,000 paise");
    assert(lines[1].debitPaise === 1500000, "Debit line 2 stored with correct 1,500,000 paise");
    assert(lines[0].matchStatus === "unmatched", "New statement lines default to 'unmatched' status");

    // -------------------------------------------------------------
    // Unit 3: Auto-Matching Engine Execution
    // -------------------------------------------------------------
    console.log("\n--- SECTION 3: AUTO-MATCHING ENGINE ---");

    // Seed a matching Ledger Entry for Line 0 (Credit: 125,000)
    const ledgerCredit = await LedgerEntry.create({
      entryNo: `TXN-MATCH-CREDIT-${Date.now()}`,
      effectiveDate: new Date("2025-04-01"),
      postedAt: new Date(),
      fy: "2025-26",
      month: "2025-04",
      direction: "credit",
      amountPaise: 12500000,
      type: "donation",
      head: "Healthcare Donation - Ref UTR-RZP-9921",
      sourceType: "donation",
      sourceId: new mongoose.Types.ObjectId(),
      fundType: "general",
      idempotencyKey: `auto_match_UTR-RZP-9921_${Date.now()}`,
      createdBy: "test_runner",
    });

    // Seed a matching Expense & Ledger Entry for Line 1 (Debit: 15,000)
    const testExpense = await Expense.create({
      expenseNo: `EXP-TEST-MATCH-${Date.now()}`,
      date: new Date("2025-04-02"),
      amountPaise: 1500000,
      head: "Medical Support",
      workAreaId: "HLT",
      description: "Procurement of emergency medicines for health camp",
      payee: { name: "Medical Supplies Vendor" },
      status: "approved",
      payment: {
        status: "paid",
        date: new Date("2025-04-02"),
        method: "Bank Transfer",
        reference: "NEFT-MED-4412",
      },
      createdBy: "staff_creator",
    });

    const ledgerDebit = await LedgerEntry.create({
      entryNo: `TXN-MATCH-DEBIT-${Date.now()}`,
      effectiveDate: new Date("2025-04-02"),
      postedAt: new Date(),
      fy: "2025-26",
      month: "2025-04",
      direction: "debit",
      amountPaise: 1500000,
      type: "expense",
      head: "Medical Support",
      sourceType: "expense",
      sourceId: testExpense._id,
      fundType: "general",
      idempotencyKey: `auto_match_test_deb_${Date.now()}`,
      createdBy: "test_runner",
    });

    // Run auto-matcher
    const matchStats = await runAutoMatching(statement._id.toString());
    assert(matchStats.matchedCount >= 2, `Auto-matcher successfully matched both credit and debit lines (matched: ${matchStats.matchedCount})`);

    const updatedCreditLine = await BankStatementLine.findById(lines[0]._id);
    assert(updatedCreditLine?.matchStatus === "matched", "Statement credit line status is 'matched'");

    const updatedLedgerCredit = await LedgerEntry.findById(ledgerCredit._id);
    assert(updatedLedgerCredit?.reconciliation.status === "reconciled", "Ledger credit entry is 'reconciled'");

    // -------------------------------------------------------------
    // Unit 4: Manual Match Confirmation, Candidate Lookup & Unmatch
    // -------------------------------------------------------------
    console.log("\n--- SECTION 4: CANDIDATE LOOKUP, MANUAL MATCH & UNMATCH ---");

    // Line 2 (Credit: 25,000) is unmatched
    const candidates = await findCandidatesForLine(lines[2]._id.toString());
    assert(Array.isArray(candidates), "findCandidatesForLine returns candidate array");

    // Test unmatch on Line 0
    await unmatchLine({ lineId: lines[0]._id as any, adminUser: "test_auditor" });
    const unmathcedLine = await BankStatementLine.findById(lines[0]._id);
    assert(unmathcedLine?.matchStatus === "unmatched", "unmatchLine sets statement line back to 'unmatched'");

    const revertedLedger = await LedgerEntry.findById(ledgerCredit._id);
    assert(revertedLedger?.reconciliation.status === "unreconciled", "unmatchLine reverts ledger reconciliation status");

    // Re-confirm match manually
    await confirmLineMatch({
      lineId: lines[0]._id as any,
      ledgerEntryId: ledgerCredit._id as any,
      adminUser: "manual_reviewer",
    });
    const reconfirmedLine = await BankStatementLine.findById(lines[0]._id);
    assert(reconfirmedLine?.matchStatus === "matched", "confirmLineMatch manually links line to ledger entry");

    // -------------------------------------------------------------
    // Unit 5: Direct Income Conversion from Unmatched Statement Line
    // -------------------------------------------------------------
    console.log("\n--- SECTION 5: DIRECT INCOME FROM UNMATCHED CREDIT ---");

    // Line 2 is credit ₹25,000
    const directIncomeRes = await recordDirectIncomeFromLine({
      lineId: lines[2]._id as any,
      donorName: "Dr. Farhan Siddiqui",
      email: "farhan@example.com",
      phone: "9876543210",
      workAreaId: "EDU",
      financialType: "Education Endowment Fund",
      adminUser: "superadmin_direct",
    });

    assert(!!directIncomeRes.donation._id, "Direct income created verified Donation record");
    assert(directIncomeRes.donation.receiptNo.startsWith("REC-"), "Donation has atomic REC- receipt number");
    assert(directIncomeRes.line.matchStatus === "matched", "Statement line marked 'matched' upon direct income creation");
    assert(directIncomeRes.ledgerEntry.reconciliation.status === "reconciled", "Ledger entry created in pre-reconciled state");

    // Verify 80G verification document was created
    const directVerification = await Verification.findOne({ documentNo: directIncomeRes.donation.receiptNo });
    assert(directVerification?.status === "Verified", "80G Verification document generated and Verified");

    // -------------------------------------------------------------
    // Unit 6: Refund Workflow (Partial, Full, Ledger Reversal & Revocation)
    // -------------------------------------------------------------
    console.log("\n--- SECTION 6: REFUND MANAGEMENT & LEDGER REVERSALS ---");

    // Create a donation of ₹10,000 to test refund flows
    const testDonation = await Donation.create({
      receiptNo: `REC-2025-REF-${Date.now().toString().slice(-5)}`,
      donorName: "Pooja Sharma",
      email: "pooja@example.com",
      phone: "9988776655",
      financialType: "Medical Emergency Relief",
      amount: 10000,
      amountPaise: 1000000,
      grossPaise: 1000000,
      netPaise: 1000000,
      workAreaId: "HLT",
      paymentMode: "Online",
      paymentStatus: "Success",
      razorpayPaymentId: `pay_test_${Date.now()}`,
    });

    // Create verification document for this donation
    await Verification.create({
      documentNo: testDonation.receiptNo,
      documentType: "donation_receipt",
      title: "80G Donation Receipt - Medical Emergency Relief",
      issuedTo: "Pooja Sharma",
      issueDate: new Date(),
      status: "Verified",
    });

    // 6A. Process Partial Refund of ₹4,000 via HTTP POST /api/finance/refunds
    const partialRefundRes = await fetch(`${baseUrl}/finance/refunds`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        donationId: testDonation._id,
        amount: 4000,
        reason: "Donor requested partial reduction due to duplicate payment",
      }),
    });
    const partialRefundData: any = await partialRefundRes.json();

    assert(partialRefundRes.status === 201, "POST /api/finance/refunds returns HTTP 201 for partial refund");
    assert(partialRefundData.refund.refundNo.startsWith("REF-"), "Refund has atomic REF- reference number");
    assert(partialRefundData.donation.paymentStatus === "Partially Refunded", "Donation status transitioned to 'Partially Refunded'");

    // Check ledger reversal debit was created
    const partialLedgerDebit = await LedgerEntry.findOne({
      sourceType: "refund",
      sourceId: partialRefundData.refund._id,
    });
    assert(!!partialLedgerDebit, "LedgerEntry debit reversal posted for partial refund");
    assert(partialLedgerDebit?.direction === "debit", "LedgerEntry direction is 'debit'");
    assert(partialLedgerDebit?.amountPaise === 400000, "LedgerEntry amountPaise matches partial refund (400,000)");

    // 6B. Test Over-Refund Rejection (Attempt to refund ₹7,000 when only ₹6,000 remains)
    const overRefundRes = await fetch(`${baseUrl}/finance/refunds`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        donationId: testDonation._id,
        amount: 7000,
        reason: "Excessive refund attempt",
      }),
    });
    assert(overRefundRes.status === 400, "Over-refund attempt properly rejected with HTTP 400");

    // 6C. Complete Remaining Full Refund of ₹6,000
    const fullRefundRes = await fetch(`${baseUrl}/finance/refunds`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        donationId: testDonation._id,
        amount: 6000,
        reason: "Complete remainder of donation refunded",
      }),
    });
    const fullRefundData: any = await fullRefundRes.json();

    assert(fullRefundRes.status === 201, "Remaining refund returns HTTP 201");
    assert(fullRefundData.donation.paymentStatus === "Refunded", "Donation status transitioned to 'Refunded'");

    // Verify 80G Receipt Verification document was marked as Revoked
    const revokedVerification = await Verification.findOne({ documentNo: testDonation.receiptNo });
    assert(revokedVerification?.status === "Revoked", "80G Verification document revoked upon full refund");

    // -------------------------------------------------------------
    // Unit 7: HTTP API Endpoints for Reconciliation & Refunds
    // -------------------------------------------------------------
    console.log("\n--- SECTION 7: HTTP API ROUTE ENDPOINTS ---");

    // GET /api/finance/reconciliation/accounts
    const accsRes = await fetch(`${baseUrl}/finance/reconciliation/accounts`, { headers: authHeaders });
    const accsData: any = await accsRes.json();
    assert(accsRes.status === 200 && accsData.data.length > 0, "GET /api/finance/reconciliation/accounts returns accounts");

    // GET /api/finance/reconciliation/lines
    const linesRes = await fetch(`${baseUrl}/finance/reconciliation/lines?statementId=${statement._id}`, {
      headers: authHeaders,
    });
    const linesData: any = await linesRes.json();
    assert(linesRes.status === 200, "GET /api/finance/reconciliation/lines returns HTTP 200");
    assert(linesData.summary.totalCreditsRupees > 0, "Lines response includes calculated financial totals");

    // GET /api/finance/refunds
    const refundsRes = await fetch(`${baseUrl}/finance/refunds`, { headers: authHeaders });
    const refundsData: any = await refundsRes.json();
    assert(refundsRes.status === 200, "GET /api/finance/refunds returns HTTP 200");
    assert(refundsData.summary.refundCount >= 2, "Refunds response includes aggregate summary metrics");

    console.log("\n================================================================================");
    console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY! PHASE 7 IS FULLY VERIFIED!`);
    console.log("================================================================================");
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

runPhase7Tests().catch((err) => {
  console.error("FATAL ERROR in Phase 7 verification:", err);
  process.exit(1);
});
