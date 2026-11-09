import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import app from "../app.js";
import { connectDB } from "../config/db.js";
import { Donation } from "../models/Donation.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { Verification } from "../models/Verification.js";
import { signToken } from "../utils/authUtils.js";

dotenv.config();

async function runPhase5Tests() {
  console.log("================================================================================");
  console.log("🧪 RUNNING COMPREHENSIVE AUTOMATED VERIFICATION: PHASE 5");
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

  // Create test HTTP server on port 5088
  const server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(5088, "127.0.0.1", () => {
      console.log("Test HTTP server listening on http://127.0.0.1:5088");
      resolve();
    });
  });

  const baseUrl = "http://127.0.0.1:5088/api";
  const adminToken = signToken({ id: "admin-super-id", role: "superadmin" });
  const authHeaders = {
    Authorization: `Bearer ${adminToken}`,
    "Content-Type": "application/json",
  };

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // TEST 1: Record Offline Manual Donation via POST /api/finance/donations/manual
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 1: RECORD MANUAL OFFLINE DONATION & ATOMIC ALLOCATION");
    const testDonationPayload = {
      donorName: "Dr. Farhan Siddiqui",
      donorType: "Individual",
      email: "dr.farhan@example.org",
      phone: "9876501234",
      amount: 75000,
      paymentMode: "Bank Transfer",
      paymentReference: "UTR-TEST-778899",
      workAreaId: "HLT",
      financialType: "Emergency Dialysis Sponsorship",
      taxExemption: true,
      pan: "ABCDF1234E",
      notes: "Offline donation received via direct NEFT",
    };

    const recordRes = await fetch(`${baseUrl}/finance/donations/manual`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(testDonationPayload),
    });

    const recordJson: any = await recordRes.json();
    assert(recordRes.status === 201 && recordJson.success === true, "POST /api/finance/donations/manual returns HTTP 201 Success");

    const createdDonation = recordJson.data;
    assert(Boolean(createdDonation.receiptNo), `Receipt number allocated: ${createdDonation?.receiptNo}`);
    assert(/^REC-\d{4}-\d{5}$/.test(createdDonation.receiptNo), `Receipt number format matches REC-YYYY-XXXXX (${createdDonation.receiptNo})`);
    assert(Boolean(createdDonation.certificateNo), `Certificate number allocated: ${createdDonation?.certificateNo}`);
    assert(createdDonation.amount === 75000, "Donation amount matches ₹ 75,000");
    assert(createdDonation.paymentStatus === "Success", "Payment status is marked as 'Success'");

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 2: Dual-Entry Ledger Entry Post Verification
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 2: DUAL-ENTRY LEDGER POST VERIFICATION");
    const ledgerEntry = await LedgerEntry.findOne({
      sourceId: createdDonation._id,
      direction: "credit",
    });

    assert(Boolean(ledgerEntry), "Matching credit LedgerEntry created for the donation");
    assert(ledgerEntry?.amountPaise === 7500000, `Ledger entry stores integer paise correctly (${ledgerEntry?.amountPaise} paise)`);
    assert(ledgerEntry?.workAreaId === "HLT", "Ledger entry records allocated workAreaId 'HLT'");
    assert(ledgerEntry?.type === "manual_income", "Ledger entry typed as 'manual_income'");

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 3: Document Verification Record
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 3: 80G RECEIPT VERIFICATION RECORD");
    const verification = await Verification.findOne({ documentNo: createdDonation.receiptNo });
    assert(Boolean(verification), `Verification record exists for documentNo '${createdDonation.receiptNo}'`);
    assert(verification?.status === "Verified", "Verification status is 'Verified'");
    assert(verification?.documentType === "donation_receipt", "Document type is 'donation_receipt'");

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 4: Query Transactions via GET /api/finance/donations with Multi-Filters
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 4: TRANSACTIONS LISTING & FILTER ENGINE");
    const queryRes = await fetch(`${baseUrl}/finance/donations?search=Farhan&workAreaId=HLT`, {
      headers: authHeaders,
    });
    const queryJson: any = await queryRes.json();

    assert(queryRes.status === 200 && queryJson.success === true, "GET /api/finance/donations returns HTTP 200");
    assert(Array.isArray(queryJson.data), "Response data is an array of transactions");
    assert(
      queryJson.data.some((d: any) => d.receiptNo === createdDonation.receiptNo),
      "Created manual transaction appears in filtered search results"
    );

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 5: Download Official 80G PDF Receipt (Binary PDF Stream)
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 5: OFFICIAL 80G RECEIPT PDF STREAM GENERATION");
    const pdfRes = await fetch(`${baseUrl}/finance/receipts/${createdDonation.receiptNo}/pdf`);
    assert(pdfRes.status === 200, `GET /api/finance/receipts/:receiptNo/pdf returns HTTP 200`);

    const contentType = pdfRes.headers.get("content-type");
    assert(contentType?.includes("application/pdf") === true, `Content-Type is 'application/pdf' (${contentType})`);

    const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());
    assert(pdfBuffer.length > 1000, `PDF buffer received with valid size (${pdfBuffer.length} bytes)`);
    assert(pdfBuffer.slice(0, 4).toString() === "%PDF", "Buffer begins with valid %PDF magic bytes");

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 6: Receipts & Acknowledgements Register Endpoint
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n📦 TEST 6: RECEIPTS REGISTER ENDPOINT");
    const receiptsRes = await fetch(`${baseUrl}/finance/receipts?search=${createdDonation.receiptNo}`, {
      headers: authHeaders,
    });
    const receiptsJson: any = await receiptsRes.json();

    assert(receiptsRes.status === 200 && receiptsJson.success === true, "GET /api/finance/receipts returns HTTP 200");
    assert(
      receiptsJson.data.some((r: any) => r.receiptNo === createdDonation.receiptNo),
      "Receipts register includes the issued receipt record"
    );

    console.log("\n================================================================================");
    console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED CLEANLY FOR PHASE 5!`);
    console.log("================================================================================");
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

runPhase5Tests().catch((err) => {
  console.error("Phase 5 Test Suite execution failed:", err);
  process.exit(1);
});
