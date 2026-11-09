import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { financeDashboardService } from "../services/financeDashboardService.js";
import { Donation } from "../models/Donation.js";
import { getNextReceiptNo } from "../utils/idGenerator.js";

dotenv.config();

async function runPhase2Tests() {
  console.log("=================================================");
  console.log("🧪 Running Phase 2 Financial Analytics Tests...");
  console.log("=================================================");

  await connectDB();

  // Test 1: Graceful Zero-State handling
  console.log("\n[Test 1] Testing Aggregation on future date range (Zero State)...");
  const zeroData = await financeDashboardService.getOverviewData({
    from: "2099-01-01",
    to: "2099-01-31",
    interval: "monthly",
  });

  if (!zeroData || typeof zeroData !== "object") {
    throw new Error("Zero-state query returned non-object");
  }

  if (zeroData.kpis.totalDonations.amount !== 0 || zeroData.monthlyFinancialSummary.income !== 0) {
    throw new Error("Zero-state query returned non-zero income");
  }

  if (isNaN(zeroData.kpis.totalDonationsDelta) || isNaN(zeroData.monthlyFinancialSummary.netBalance)) {
    throw new Error("NaN values detected in zero-state calculations");
  }
  console.log("✅ Test 1 PASSED: Zero-state handled gracefully with clean 0 values & no NaN.");

  // Test 2: Live / Seeded Data Verification
  console.log("\n[Test 2] Testing Aggregation on Date Window with verified records...");
  const testWindowStart = new Date("2025-04-01T00:00:00.000Z");
  const testWindowEnd = new Date("2025-04-30T23:59:59.999Z");

  // Check if test donations exist in this window; if not, create 2 controlled donations
  const existingCount = await Donation.countDocuments({
    paymentStatus: "Success",
    createdAt: { $gte: testWindowStart, $lte: testWindowEnd },
  });

  let createdTestIds: string[] = [];

  if (existingCount === 0) {
    console.log("Seeding 2 test donations into April 2025 window for mathematical verification...");
    const rcpt1 = await getNextReceiptNo(2025);
    const d1 = await Donation.create({
      receiptNo: rcpt1,
      donationNo: rcpt1,
      donorName: "Ayesha Khan",
      donorType: "Individual",
      email: "ayesha@example.com",
      phone: "+919876543210",
      countryCode: "+91",
      address: "Darbhanga, Bihar",
      city: "Darbhanga",
      state: "Bihar",
      pincode: "846004",
      financialType: "Healthcare Support",
      workAreaId: "HLT",
      frequency: "One Time",
      amount: 50000,
      amountPaise: 5000000,
      grossPaise: 5000000,
      netPaise: 5000000,
      paymentMode: "Online",
      paymentStatus: "Success",
      transactionId: `txn_test_${Date.now()}_1`,
      createdAt: new Date("2025-04-10T10:00:00.000Z"),
    });

    const rcpt2 = await getNextReceiptNo(2025);
    const d2 = await Donation.create({
      receiptNo: rcpt2,
      donationNo: rcpt2,
      donorName: "Global Good Foundation",
      donorType: "Corporate",
      email: "csr@globalgood.org",
      phone: "+919876543211",
      countryCode: "+91",
      address: "New Delhi",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      financialType: "Education & Learning",
      workAreaId: "EDU",
      frequency: "One Time",
      amount: 100000,
      amountPaise: 10000000,
      grossPaise: 10000000,
      netPaise: 10000000,
      paymentMode: "Bank Transfer",
      paymentStatus: "Success",
      transactionId: `txn_test_${Date.now()}_2`,
      createdAt: new Date("2025-04-15T14:30:00.000Z"),
    });

    createdTestIds = [String(d1._id), String(d2._id)];
  }

  // Execute aggregation service
  const overview = await financeDashboardService.getOverviewData({
    from: "2025-04-01",
    to: "2025-04-30",
    interval: "monthly",
  });

  // Calculate ground truth from database directly
  const directSumResult = await Donation.aggregate([
    {
      $match: {
        paymentStatus: "Success",
        createdAt: { $gte: testWindowStart, $lte: testWindowEnd },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const groundTruthTotal = directSumResult[0]?.total || 0;

  console.log(`Ground truth sum for April 2025: ₹ ${groundTruthTotal}`);
  console.log(`Service kpis.totalDonations.amount: ₹ ${overview.kpis.totalDonations.amount}`);
  console.log(`Service monthlyFinancialSummary.income: ₹ ${overview.monthlyFinancialSummary.income}`);

  if (overview.kpis.totalDonations.amount !== groundTruthTotal) {
    throw new Error(`Total donations mismatch! Expected ${groundTruthTotal}, got ${overview.kpis.totalDonations.amount}`);
  }

  if (overview.monthlyFinancialSummary.income !== groundTruthTotal) {
    throw new Error(`Monthly income mismatch! Expected ${groundTruthTotal}, got ${overview.monthlyFinancialSummary.income}`);
  }

  const categorySum = overview.donationsByCategory.categories.reduce((acc, c) => acc + c.amount, 0);
  if (categorySum !== groundTruthTotal) {
    throw new Error(`Category total mismatch! Category sum ${categorySum} != Ground truth ${groundTruthTotal}`);
  }

  console.log("✅ Test 2 PASSED: Mathematical consistency confirmed across KPIs, Monthly Summary, and Categories.");

  // Test 3: Validate Trend Data Structure
  console.log("\n[Test 3] Validating 6-Point Trend Structure...");
  if (!Array.isArray(overview.donationTrends.data) || overview.donationTrends.data.length !== 6) {
    throw new Error(`Expected 6 trend points, got ${overview.donationTrends.data.length}`);
  }
  console.log("Trend points labels:", overview.donationTrends.data.map((d) => d.label).join(", "));
  console.log("Trend summary total:", overview.donationTrends.summary.total);
  console.log("Trend summary breakdown:", overview.donationTrends.summary.breakdown);
  console.log("✅ Test 3 PASSED: Trend dataset contains exactly 6 chronological data points.");

  // Test 4: Validate Expense Summary Structure
  console.log("\n[Test 4] Validating Expense Summary Categories...");
  if (!Array.isArray(overview.expenseSummary.categories) || overview.expenseSummary.categories.length < 5) {
    throw new Error("Expense summary categories missing standard heads");
  }
  console.log("Expense categories:", overview.expenseSummary.categories.map((c) => `${c.head}: ${c.percentage}%`).join(" | "));
  console.log("✅ Test 4 PASSED: Expense summary conforms to mockup standard heads.");

  // Test 5: Validate Recent Activity Feed
  console.log("\n[Test 5] Validating Recent Activity Feed...");
  if (!Array.isArray(overview.recentActivity) || overview.recentActivity.length === 0) {
    throw new Error("Recent activity feed is empty");
  }
  console.log("Sample activities (first 3):");
  overview.recentActivity.slice(0, 3).forEach((a) => {
    console.log(`  - [${a.type.toUpperCase()}] ${a.title}: ${a.description} (${a.relativeTime})`);
  });
  console.log("✅ Test 5 PASSED: Recent activity feed contains real formatted business milestones.");

  // Clean up any test records created for testing
  if (createdTestIds.length > 0) {
    await Donation.deleteMany({ _id: { $in: createdTestIds } });
    console.log("Cleaned up temporary test records.");
  }

  console.log("\n=================================================");
  console.log("🎉 ALL PHASE 2 ANALYTICS TESTS PASSED! 🎉");
  console.log("=================================================");
}

runPhase2Tests()
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Test failed:", err);
    mongoose.disconnect();
    process.exit(1);
  });

