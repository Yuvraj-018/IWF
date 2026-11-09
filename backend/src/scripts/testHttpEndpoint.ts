import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import app from "../app.js";
import { connectDB } from "../config/db.js";

dotenv.config();

async function runHttpTest() {
  console.log("Connecting to MongoDB...");
  await connectDB();

  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(5099, "127.0.0.1", () => {
      console.log("Test HTTP server listening on http://127.0.0.1:5099");
      resolve();
    });
  });

  try {
    const url = "http://127.0.0.1:5099/api/finance/dashboard/overview?from=2025-04-01&to=2025-04-30";
    console.log(`Fetching GET ${url} ...`);
    const res = await fetch(url);
    const json: any = await res.json();

    console.log("HTTP Status:", res.status);
    console.log("Success Flag:", json.success);
    console.log("Data Keys:", Object.keys(json.data));
    console.log("KPI Total Donations:", json.data.kpis.totalDonations);
    console.log("KPI Online Donations Share:", `${json.data.kpis.onlineDonationsShare}%`);
    console.log("Trend Data Points:", json.data.donationTrends.data.length);
    console.log("Categories Count:", json.data.donationsByCategory.categories.length);
    console.log("Recent Transactions:", json.data.recentTransactions.length);
    console.log("Recent Activity Items:", json.data.recentActivity.length);
    console.log("Expense Summary Heads:", json.data.expenseSummary.categories.length);
    console.log("Monthly Financial Summary:", json.data.monthlyFinancialSummary);

    if (res.status === 200 && json.success === true && json.data.kpis) {
      console.log("\n✅ HTTP ENDPOINT VERIFICATION TEST PASSED!");
    } else {
      throw new Error(`Endpoint failed validation: status ${res.status}`);
    }
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

runHttpTest()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("HTTP Test Error:", err);
    process.exit(1);
  });

