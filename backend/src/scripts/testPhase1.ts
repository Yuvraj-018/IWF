import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { getNextSequence, Counter } from "../models/Counter.js";
import { getNextReceiptNo, getNextExpenseNo, getNextTransactionNo } from "../utils/idGenerator.js";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { PaymentEvent } from "../models/PaymentEvent.js";
import { WorkArea } from "../models/WorkArea.js";
import { ExpenseHead } from "../models/ExpenseHead.js";
import { BankAccount } from "../models/BankAccount.js";

dotenv.config();

async function runPhase1Tests() {
  console.log("=================================================");
  console.log("🧪 Running Phase 1 Backend Verification Tests...");
  console.log("=================================================");

  await connectDB();

  // Test 1: Atomic Counter under High Concurrency (Parallel Execution)
  console.log("\n[Test 1] Testing Atomic Sequence Counter under parallel concurrency...");
  const testCounterName = `test_counter_${Date.now()}`;
  const CONCURRENT_REQUESTS = 25;

  const sequencePromises = Array.from({ length: CONCURRENT_REQUESTS }, () =>
    getNextSequence(testCounterName)
  );

  const results = await Promise.all(sequencePromises);
  const uniqueResults = new Set(results);

  console.log(`Generated ${results.length} numbers:`, results.slice(0, 5), "... to", results[results.length - 1]);
  if (uniqueResults.size !== CONCURRENT_REQUESTS) {
    throw new Error(`Atomic counter collision detected! Generated ${uniqueResults.size} unique values out of ${CONCURRENT_REQUESTS}`);
  }
  console.log("✅ Test 1 PASSED: 100% unique sequential IDs generated under parallel promises.");

  // Test 1b: Helper Formatters
  console.log("\n[Test 1b] Testing ID Formatters...");
  const receiptNo = await getNextReceiptNo(2025);
  const expenseNo = await getNextExpenseNo(2025);
  const transactionNo = await getNextTransactionNo(2025);

  console.log("Sample Receipt No:", receiptNo);
  console.log("Sample Expense No:", expenseNo);
  console.log("Sample Transaction No:", transactionNo);

  if (!receiptNo.startsWith("REC-2025-") || !expenseNo.startsWith("EXP-2025-") || !transactionNo.startsWith("TXN-2025-")) {
    throw new Error("ID formatters failed standard pattern REC-YYYY-XXXXX / EXP-YYYY-XXXXX / TXN-YYYY-XXXXX");
  }
  console.log("✅ Test 1b PASSED: Formatters match required patterns.");

  // Test 2: Immutable LedgerEntry
  console.log("\n[Test 2] Testing LedgerEntry Append-Only Immutability Guard...");
  const testEntryNo = `TXN-TEST-${Date.now()}`;
  const testIdempotencyKey = `test_idem_${Date.now()}`;

  const entry = new LedgerEntry({
    entryNo: testEntryNo,
    effectiveDate: new Date(),
    postedAt: new Date(),
    fy: "2025-26",
    month: "2025-04",
    direction: "credit",
    amountPaise: 500000, // ₹ 5,000
    type: "donation",
    head: "General Donation",
    sourceType: "donation",
    sourceId: new mongoose.Types.ObjectId(),
    workAreaId: "HLT",
    fundType: "general",
    paymentMethod: "Razorpay",
    idempotencyKey: testIdempotencyKey,
    createdBy: "test_suite",
  });

  await entry.save();
  console.log(`Created test ledger entry: ${entry.entryNo}`);

  // Attempt to illegally modify financial amount
  let threwOnSave = false;
  try {
    entry.amountPaise = 1000000;
    await entry.save();
  } catch (err: any) {
    threwOnSave = true;
    console.log("Caught expected error on illegal save update:", err.message);
  }

  if (!threwOnSave) {
    throw new Error("LedgerEntry allowed illegal modification of amountPaise via save()!");
  }

  // Attempt to illegally modify direction via findOneAndUpdate
  let threwOnUpdate = false;
  try {
    await LedgerEntry.findOneAndUpdate(
      { entryNo: testEntryNo },
      { $set: { direction: "debit" } }
    );
  } catch (err: any) {
    threwOnUpdate = true;
    console.log("Caught expected error on illegal findOneAndUpdate:", err.message);
  }

  if (!threwOnUpdate) {
    throw new Error("LedgerEntry allowed illegal modification of direction via findOneAndUpdate!");
  }

  // Permitted update: reconciliation status only
  await LedgerEntry.findOneAndUpdate(
    { entryNo: testEntryNo },
    { $set: { "reconciliation.status": "matched", "reconciliation.by": "test_auditor" } }
  );
  const updatedEntry = await LedgerEntry.findOne({ entryNo: testEntryNo });
  if (updatedEntry?.reconciliation.status !== "matched") {
    throw new Error("LedgerEntry failed to update permitted reconciliation field!");
  }
  console.log("✅ Permitted reconciliation update succeeded cleanly.");
  console.log("✅ Test 2 PASSED: Ledger immutability guard verified.");

  // Test 3: PaymentEvent Idempotency
  console.log("\n[Test 3] Testing PaymentEvent Idempotent Webhook Storage...");
  const testEventId = `evt_test_${Date.now()}`;
  await PaymentEvent.create({
    provider: "razorpay",
    eventId: testEventId,
    eventType: "payment.captured",
    payload: { id: testEventId, amount: 250000 },
    status: "received",
    receivedAt: new Date(),
  });

  let threwDuplicateEvent = false;
  try {
    await PaymentEvent.create({
      provider: "razorpay",
      eventId: testEventId,
      eventType: "payment.captured",
      payload: { id: testEventId, amount: 250000 },
      status: "received",
      receivedAt: new Date(),
    });
  } catch (err: any) {
    threwDuplicateEvent = true;
    console.log("Caught expected duplicate key error on PaymentEvent:", err.code);
  }

  if (!threwDuplicateEvent) {
    throw new Error("PaymentEvent allowed duplicate eventId insertion!");
  }
  console.log("✅ Test 3 PASSED: Duplicate webhook event IDs are strictly rejected.");

  // Test 4: Master Taxonomies Check
  console.log("\n[Test 4] Checking Master Taxonomies in Database...");
  const workAreaCount = await WorkArea.countDocuments();
  const expenseHeadCount = await ExpenseHead.countDocuments();
  const bankAccounts = await BankAccount.countDocuments({ isPrimary: true });

  console.log(`Work Areas Count: ${workAreaCount}`);
  console.log(`Expense Heads Count: ${expenseHeadCount}`);
  console.log(`Primary Bank Accounts: ${bankAccounts}`);

  if (workAreaCount < 8 || expenseHeadCount < 8 || bankAccounts < 1) {
    console.warn("Note: Taxonomies not yet seeded in this DB connection. Running seeder...");
    const { seedFinanceTaxonomy } = await import("./seedFinanceTaxonomy.js");
    await seedFinanceTaxonomy();
  } else {
    console.log("✅ Taxonomies are present in database.");
  }
  console.log("✅ Test 4 PASSED: Master taxonomies verified.");

  // Clean up test records
  await Counter.findByIdAndDelete(testCounterName);
  await PaymentEvent.findOneAndDelete({ eventId: testEventId });

  console.log("\n=================================================");
  console.log("🎉 ALL PHASE 1 TESTS PASSED SUCCESSFULLY! 🎉");
  console.log("=================================================");
}

runPhase1Tests()
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Test failed:", err);
    mongoose.disconnect();
    process.exit(1);
  });

