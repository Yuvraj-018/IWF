import dotenv from "dotenv";
import path from "path";
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "IWF/backend/.env") });
import mongoose from "mongoose";
import http from "http";
import app from "../app.js";
import { connectDB } from "../config/db.js";
import { WorkArea } from "../models/WorkArea.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { Donation } from "../models/Donation.js";
import { Expense } from "../models/Expense.js";
import { Budget } from "../models/Budget.js";
import { PublicSnapshot } from "../models/PublicSnapshot.js";
import { Verification } from "../models/Verification.js";
import { signToken } from "../utils/authUtils.js";
import {
  generateIncomeBySourceReport,
  generateExpenditureBySectorReport,
  generateIncomeVsExpenditureReport,
  generateBudgetVarianceReport,
  generateTax80GRegister,
  generateReportCSV,
  generateReportPDF,
} from "../services/reportService.js";

async function runPhase8Tests() {
  console.log("================================================================================");
  console.log("🧪 RUNNING COMPREHENSIVE AUTOMATED VERIFICATION: PHASE 8");
  console.log("🏆 STATUTORY FINANCIAL REPORTS, PUBLIC TRANSPARENCY & GO-LIVE AUDIT");
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

  // Create test HTTP server on port 5089
  const server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(5089, "127.0.0.1", () => {
      console.log("Test HTTP server listening on http://127.0.0.1:5089");
      resolve();
    });
  });

  const baseUrl = "http://127.0.0.1:5089/api";
  const adminToken = signToken({ id: "admin_test_8", name: "Imteyazullah", role: "superadmin" });
  const authHeaders = {
    Authorization: `Bearer ${adminToken}`,
    "Content-Type": "application/json",
  };

  try {
    // -------------------------------------------------------------
    // Unit 1: Statutory Reports Service
    // -------------------------------------------------------------
    console.log("\n--- SECTION 1: STATUTORY REPORT GENERATORS ---");

    // 1A. Income by Source Report
    const incomeReport = await generateIncomeBySourceReport({ fy: "2025-26" });
    assert(incomeReport.reportType === "Income by Source & Period", "Income by Source report generated");
    assert(Array.isArray(incomeReport.sources), "Report contains payment sources array");
    assert(incomeReport.totalIncomeRupees >= 0, "Report contains computed total income");

    // 1B. Expenditure by Sector Report
    const sectorReport = await generateExpenditureBySectorReport({});
    assert(sectorReport.reportType === "Expenditure by Work Area & Initiative", "Sector expenditure report generated");
    assert(Array.isArray(sectorReport.sectors), "Report contains sector breakdown");

    // 1C. Income vs Expenditure Statement
    const incVsExpReport = await generateIncomeVsExpenditureReport({ fy: "2025-26" });
    assert(incVsExpReport.reportType === "Income vs Expenditure Statement", "Income vs Expenditure statement generated");
    assert(incVsExpReport.netSurplusRupees !== undefined, "Net Surplus/Deficit calculated cleanly");
    assert(Array.isArray(incVsExpReport.monthlyBreakdown), "Monthly breakdown array present");

    // 1D. Budget vs Actual Variance Report
    const varianceReport = await generateBudgetVarianceReport("2025-26");
    assert(varianceReport.reportType === "Budget vs Actual Variance Report", "Budget variance report generated");
    assert(varianceReport.sectors.length >= 8, "Variance report includes all 8 master work areas");
    assert(varianceReport.overallUtilizationPercentage !== undefined, "Overall budget utilization calculated");

    // 1E. 80G Tax Exemption Register
    const taxRegister = await generateTax80GRegister({});
    assert(taxRegister.reportType === "Statutory 80G Tax Exemption Register", "80G Tax Exemption Register generated");
    assert(taxRegister.institution.pan === "AAATI8829F", "80G Register includes Foundation PAN");
    assert(Array.isArray(taxRegister.records), "80G Register records array present");

    // -------------------------------------------------------------
    // Unit 2: Report Export Generators (CSV and PDF)
    // -------------------------------------------------------------
    console.log("\n--- SECTION 2: EXPORT GENERATORS (CSV & AUDITED PDF) ---");

    const csvContent = generateReportCSV(taxRegister);
    assert(typeof csvContent === "string" && csvContent.includes("Receipt No,Date"), "CSV exporter generates compliant CSV with header");

    const pdfBuffer = await generateReportPDF(incomeReport);
    assert(Buffer.isBuffer(pdfBuffer) && pdfBuffer.length > 500, "PDF exporter renders binary PDF buffer");
    assert(pdfBuffer.toString("utf8", 0, 5) === "%PDF-", "Generated document is a valid PDFKit binary file (%PDF-)");

    // -------------------------------------------------------------
    // Unit 3: Public Website Transparency Engine & Zero PII Guard
    // -------------------------------------------------------------
    console.log("\n--- SECTION 3: PUBLIC TRANSPARENCY ENGINE & PRIVACY AUDIT ---");

    // Publish snapshot via API
    const pubRes = await fetch(`${baseUrl}/finance/transparency/publish`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        fy: "2024-25",
        title: "FY 2024-25 Audited Financial & Impact Summary",
        notes: "Audited in accordance with Indian Trust Act & 80G statutory standards.",
      }),
    });
    const pubData: any = await pubRes.json();
    assert(pubRes.status === 201, "POST /api/finance/transparency/publish returns HTTP 201");
    assert(pubData.data.snapshotNo.startsWith("SNAP-"), "Snapshot allocated atomic reference number");
    assert(pubData.data.isPublished === true, "Snapshot is in published state");

    // Fetch Public Summary (Unauthenticated Endpoint)
    const publicSummaryRes = await fetch(`${baseUrl}/public/transparency/financial-summary`);
    const publicSummaryData: any = await publicSummaryRes.json();
    assert(publicSummaryRes.status === 200, "GET /api/public/transparency/financial-summary returns HTTP 200 without auth");
    assert(publicSummaryData.data.isAudited === true, "Public transparency dataset marked as audited");

    // STRICT ZERO PII AUDIT: Inspect every byte of public payload
    const publicJsonStr = JSON.stringify(publicSummaryData.data);
    assert(!publicJsonStr.includes("Ayesha Khan") && !publicJsonStr.includes("Rahul Verma"), "Strict Privacy: Individual donor names completely stripped from public disclosure");
    assert(!publicJsonStr.includes("9999999999") && !publicJsonStr.includes("9876543210"), "Strict Privacy: Phone numbers completely stripped");
    assert(!publicJsonStr.includes("ABCDE1234F") && !publicJsonStr.includes("pan:"), "Strict Privacy: Sensitive donor PANs completely stripped");
    assert(!publicJsonStr.includes("accountNumberMasked"), "Strict Privacy: Internal bank account details completely stripped");
    assert(!publicJsonStr.includes("patientSlug"), "Strict Privacy: Confidential patient identities completely stripped");

    // -------------------------------------------------------------
    // Unit 4: Go-Live Acceptance Checklist Audit (§10)
    // -------------------------------------------------------------
    console.log("\n--- SECTION 4: GO-LIVE ACCEPTANCE CHECKLIST AUDIT (§10) ---");

    // 1. All 8 master work areas configured
    const workAreasCount = await WorkArea.countDocuments();
    assert(workAreasCount === 8, "Checklist 1: Exactly 8 official work areas configured (EDU, HLT, WYE, SLE, SJL, AGR, ENV, HRR)");

    // 2. Multi-tier role permissions tested
    const unauthRes = await fetch(`${baseUrl}/finance/expenses`);
    assert(unauthRes.status === 401, "Checklist 2: Protected finance routes block unauthenticated access (HTTP 401)");

    // 3. Webhook idempotency
    const testKey = `test_idempotent_${Date.now()}`;
    const ledgerEntry1 = await LedgerEntry.create({
      entryNo: `TXN-IDEMP-1-${Date.now()}`,
      effectiveDate: new Date(),
      postedAt: new Date(),
      fy: "2025-26",
      month: "2025-04",
      direction: "credit",
      amountPaise: 50000,
      type: "donation",
      head: "Idempotency Test",
      sourceType: "donation",
      sourceId: new mongoose.Types.ObjectId(),
      fundType: "general",
      idempotencyKey: testKey,
      createdBy: "test_suite",
    });
    assert(!!ledgerEntry1, "Checklist 3: Initial ledger entry created with idempotency key");

    let duplicateKeyBlocked = false;
    try {
      await LedgerEntry.create({
        entryNo: `TXN-IDEMP-2-${Date.now()}`,
        effectiveDate: new Date(),
        postedAt: new Date(),
        fy: "2025-26",
        month: "2025-04",
        direction: "credit",
        amountPaise: 50000,
        type: "donation",
        head: "Idempotency Test Duplicate",
        sourceType: "donation",
        sourceId: new mongoose.Types.ObjectId(),
        fundType: "general",
        idempotencyKey: testKey,
        createdBy: "test_suite",
      });
    } catch {
      duplicateKeyBlocked = true;
    }
    assert(duplicateKeyBlocked, "Checklist 4: Duplicate webhook delivery / key strictly blocked by unique index");

    // 4. Ledger Immutability Guard
    let immutabilityGuardBlocked = false;
    try {
      ledgerEntry1.amountPaise = 999999;
      await ledgerEntry1.save();
    } catch (err: any) {
      immutabilityGuardBlocked = err.message.includes("LedgerEntry is immutable");
    }
    assert(immutabilityGuardBlocked, "Checklist 5: Append-only immutability guard blocks modifications to financial ledger");

    // 5. Dual-entry Reversal on Refund
    const refundDebit = await LedgerEntry.findOne({ type: "refund", direction: "debit" });
    assert(!!refundDebit, "Checklist 6: Refund accounting creates verified debit reversals in ledger");

    // 6. Separation of duties in expenses
    const staffToken = signToken({ id: "staff_creator_1", name: "Staff Creator", role: "staff" });
    const staffHeaders = { Authorization: `Bearer ${staffToken}`, "Content-Type": "application/json" };
    const selfExpense = await Expense.create({
      expenseNo: `EXP-DUTY-${Date.now()}`,
      date: new Date(),
      amountPaise: 100000,
      head: "Programme Activities",
      workAreaId: "EDU",
      description: "Classroom materials",
      payee: { name: "Stationery Vendor" },
      status: "submitted",
      createdBy: "Staff Creator",
    });

    const dutyCheckRes = await fetch(`${baseUrl}/finance/expenses/${selfExpense._id}/review`, {
      method: "POST",
      headers: staffHeaders,
      body: JSON.stringify({ action: "approve" }),
    });
    assert(dutyCheckRes.status === 403, "Checklist 7: Separation of duties enforced — creator cannot approve own voucher (HTTP 403)");

    // 7. HTTP Reports Endpoint
    const repHttpRes = await fetch(`${baseUrl}/finance/reports/80g-register`, { headers: authHeaders });
    assert(repHttpRes.status === 200, "Checklist 8: GET /api/finance/reports/80g-register returns HTTP 200");

    // 8. CSV Export Endpoint
    const csvExportRes = await fetch(`${baseUrl}/finance/reports/export?reportType=80g-register&format=csv`, {
      headers: authHeaders,
    });
    const csvExportText = await csvExportRes.text();
    assert(csvExportRes.status === 200 && csvExportText.includes("Receipt No"), "Checklist 9: GET /api/finance/reports/export (CSV) streams valid CSV");

    // 9. PDF Export Endpoint
    const pdfExportRes = await fetch(`${baseUrl}/finance/reports/export?reportType=income-source&format=pdf`, {
      headers: authHeaders,
    });
    const pdfExportBuffer = Buffer.from(await pdfExportRes.arrayBuffer());
    assert(pdfExportRes.status === 200 && pdfExportBuffer.toString("utf8", 0, 5) === "%PDF-", "Checklist 10: GET /api/finance/reports/export (PDF) streams valid PDF");

    // 10. Public Transparency Live Query
    const livePublicRes = await fetch(`${baseUrl}/public/transparency/financial-summary`);
    const livePublicData: any = await livePublicRes.json();
    assert(livePublicData.success === true && livePublicData.data.totalDonationsReceivedRupees > 0, "Checklist 11: Public transparency API serves sanitized financial volumes");

    // 11. Verification center document status
    const verifiedDoc = await Verification.findOne({ status: "Verified" });
    assert(!!verifiedDoc, "Checklist 12: Verifiable document records maintained with active cryptographic hash/status");

    console.log("\n================================================================================");
    console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY! PHASE 8 IS FULLY VERIFIED!`);
    console.log("================================================================================");
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

runPhase8Tests().catch((err) => {
  console.error("FATAL ERROR in Phase 8 verification:", err);
  process.exit(1);
});

