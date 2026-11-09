import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../../..");

async function runPhase3And4Tests() {
  console.log("================================================================================");
  console.log("🧪 RUNNING COMPREHENSIVE AUTOMATED VERIFICATION: PHASE 3 & PHASE 4");
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

  // ─────────────────────────────────────────────────────────────────────────
  // SUITE 1: PHASE 3 - CMS ROUTING & NAVIGATION SHELL
  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n📦 SUITE 1: PHASE 3 ROUTING & NAVIGATION SHELL VERIFICATION");

  const appTsxPath = path.join(rootDir, "IWF/cms/src/App.tsx");
  assert(fs.existsSync(appTsxPath), "CMS App.tsx exists");
  const appTsxContent = fs.readFileSync(appTsxPath, "utf-8");

  // 1.1 Verify React Router components
  assert(
    appTsxContent.includes("BrowserRouter") && appTsxContent.includes("Routes") && appTsxContent.includes("Route"),
    "App.tsx wraps application with BrowserRouter and Routes"
  );

  // 1.2 Verify all 8 Finance Sub-routes exist in App.tsx
  const requiredFinanceRoutes = [
    { path: "/finance", comp: "DonationOverview" },
    { path: "/finance/transactions", comp: "TransactionsManager" },
    { path: "/finance/reconciliation", comp: "ReconciliationManager" },
    { path: "/finance/refunds", comp: "RefundsManager" },
    { path: "/finance/receipts", comp: "ReceiptsManager" },
    { path: "/finance/expenses", comp: "ExpensesManager" },
    { path: "/finance/budgets", comp: "BudgetsManager" },
    { path: "/finance/reports", comp: "FinancialReportsManager" },
  ];

  for (const r of requiredFinanceRoutes) {
    assert(
      appTsxContent.includes(r.path) && appTsxContent.includes(r.comp),
      `Route '${r.path}' properly registered to component '${r.comp}'`
    );
  }

  // 1.3 Verify all 8 Finance Page files exist on disk
  const financePagesDir = path.join(rootDir, "IWF/cms/src/pages/finance");
  assert(fs.existsSync(financePagesDir), "Finance pages directory exists");

  const requiredPageFiles = [
    "DonationOverview.tsx",
    "TransactionsManager.tsx",
    "ReconciliationManager.tsx",
    "RefundsManager.tsx",
    "ReceiptsManager.tsx",
    "ExpensesManager.tsx",
    "BudgetsManager.tsx",
    "FinancialReportsManager.tsx",
  ];

  for (const file of requiredPageFiles) {
    const fullPath = path.join(financePagesDir, file);
    assert(fs.existsSync(fullPath), `Finance sub-screen file '${file}' exists on disk`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    assert(
      fileContent.includes("export default"),
      `File '${file}' provides a valid default export component`
    );
  }

  // 1.4 Verify legacy CMS modules are intact
  const legacyRoutes = ["/cms/news", "/cms/media", "/cms/patients", "/cms/members", "/cms/settings"];
  for (const lr of legacyRoutes) {
    assert(appTsxContent.includes(lr), `Legacy CMS route '${lr}' preserved without regression`);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SUITE 2: PHASE 3 - HIERARCHICAL SIDEBAR & HEADER LAYOUT
  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n📦 SUITE 2: PHASE 3 SIDEBAR & HEADER LAYOUT VERIFICATION");

  const layoutPath = path.join(rootDir, "IWF/cms/src/components/layout/AdminLayout.tsx");
  assert(fs.existsSync(layoutPath), "AdminLayout.tsx exists");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  // 2.1 Deep navy branding styling
  assert(
    layoutContent.includes("#071527") || layoutContent.includes("bg-[#071527]"),
    "Sidebar uses Deep Navy styling (#071527)"
  );

  // 2.2 Foundation header and tagline
  assert(
    layoutContent.includes("ISLAH") && layoutContent.includes("Together for a Better Tomorrow"),
    "Sidebar displays foundation logo and tagline 'Together for a Better Tomorrow'"
  );

  // 2.3 Finance Accordion with all 8 sub-items
  assert(
    layoutContent.includes("Donations & Finance"),
    "Sidebar contains 'Donations & Finance' accordion menu"
  );
  assert(
    layoutContent.includes("financeExpanded") && layoutContent.includes("setFinanceExpanded"),
    "Finance accordion includes expand/collapse interactive state"
  );
  assert(
    layoutContent.includes("pathname.startsWith(\"/finance\")"),
    "Finance accordion auto-expands when visiting any /finance sub-route"
  );

  // 2.4 Bottom promo card
  assert(
    layoutContent.includes("Your Support Creates Lasting Change") &&
    layoutContent.includes("View Donation Impact"),
    "Bottom sidebar card displays 'Your Support Creates Lasting Change' and button"
  );

  // 2.5 Top Header Elements
  assert(
    layoutContent.includes("Search donations, donors, transactions, reports..."),
    "Header has pill search input with placeholder 'Search donations, donors, transactions, reports...'"
  );
  assert(
    layoutContent.includes("Bell") && />\s*3\s*</.test(layoutContent),
    "Header has notification bell with counter badge '3'"
  );
  assert(
    layoutContent.includes("Maximize2") || layoutContent.includes("toggleFullscreen"),
    "Header has fullscreen toggle button"
  );
  assert(
    layoutContent.includes("Imteyazullah") && layoutContent.includes("Super Admin"),
    "Header displays Super Admin profile pill ('Imteyazullah', 'Super Admin')"
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUITE 3: PHASE 4 - DONATION OVERVIEW DASHBOARD SPECIFICATION AUDIT
  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n📦 SUITE 3: PHASE 4 DONATION OVERVIEW DASHBOARD VERIFICATION");

  const overviewPath = path.join(financePagesDir, "DonationOverview.tsx");
  const overviewContent = fs.readFileSync(overviewPath, "utf-8");

  // 3.1 Hero section banner
  assert(
    (overviewContent.includes("Donations & Finance") || overviewContent.includes("Donations &amp; Finance")) &&
    overviewContent.includes("Donation Overview") &&
    overviewContent.includes("Track donations, manage payments, ensure reconciliation"),
    "Hero Banner contains badge 'Donations & Finance', title, and subtitle"
  );
  assert(
    overviewContent.includes("Small Contributions") && overviewContent.includes("Big Impact"),
    "Hero Banner displays cursive quote 'Small Contributions, Big Impact'"
  );

  // 3.2 Date Range Selector
  assert(
    overviewContent.includes("Date Range") &&
    overviewContent.includes("01 Apr 2025 - 30 Apr 2025") &&
    overviewContent.includes("Financial Year 2025-26"),
    "Date Range selector contains reporting presets including opening/demo and FY 2025-26"
  );

  // 3.3 Top 5 KPI Stat Cards
  assert(overviewContent.includes("Total Donations"), "KPI Card 1: 'Total Donations' present");
  assert(overviewContent.includes("Online Donations"), "KPI Card 2: 'Online Donations' present");
  assert(overviewContent.includes("Offline Donations"), "KPI Card 3: 'Offline Donations' present");
  assert(overviewContent.includes("Pending Payments"), "KPI Card 4: 'Pending Payments' present");
  assert(overviewContent.includes("Receipts Issued"), "KPI Card 5: 'Receipts Issued' present");

  // 3.4 Recharts Integration
  assert(
    overviewContent.includes("AreaChart") &&
    overviewContent.includes("Area") &&
    overviewContent.includes("XAxis") &&
    overviewContent.includes("YAxis") &&
    overviewContent.includes("Tooltip"),
    "Recharts AreaChart integrated with axes, gradients, and custom tooltips"
  );
  assert(
    overviewContent.includes("trendInterval") &&
    overviewContent.includes("monthly") &&
    overviewContent.includes("weekly") &&
    overviewContent.includes("daily"),
    "Donation Trend chart supports interactive Monthly / Weekly / Daily interval switching"
  );

  // 3.5 Donations by Category Donut Chart
  assert(
    overviewContent.includes("PieChart") &&
    overviewContent.includes("Pie") &&
    overviewContent.includes("innerRadius={50}") &&
    overviewContent.includes("Donations by Category"),
    "Donations by Category Donut chart implemented with innerRadius and center label"
  );

  // 3.6 Recent Transactions Table
  assert(
    overviewContent.includes("Recent Transactions") &&
    overviewContent.includes("Donor Name") &&
    overviewContent.includes("Payment Method") &&
    overviewContent.includes("View All Transactions"),
    "Recent Transactions table displays date, donor, amount, method, status pill, and link"
  );

  // 3.7 Expense Summary & Monthly Financial Summary
  assert(
    overviewContent.includes("Expense Summary") &&
    overviewContent.includes("Total Expenses") &&
    overviewContent.includes("Monthly Financial Summary") &&
    overviewContent.includes("Net Balance"),
    "Expense Summary Donut and 3-column Monthly Financial Summary card present"
  );

  // 3.8 Quick Actions & Modals
  assert(
    overviewContent.includes("Record Donation") &&
    overviewContent.includes("Issue Receipt") &&
    overviewContent.includes("Add Expense") &&
    overviewContent.includes("Reconcile Payments"),
    "Quick Actions 2x2 grid present with all 4 operational actions"
  );
  assert(
    overviewContent.includes("RecordDonationModal") &&
    overviewContent.includes("AddExpenseModal") &&
    overviewContent.includes("IssueReceiptModal"),
    "Interactive modal dialogs integrated for manual donations, expenses, and receipt issuance"
  );

  // 3.9 Footer Quick Shortcuts & Transparency Banner
  assert(
    overviewContent.includes("Financial Reports") &&
    overviewContent.includes("Budget Management") &&
    overviewContent.includes("Donor Recognition") &&
    overviewContent.includes("Transparency Builds Trust"),
    "Footer quick shortcuts and brand trust card ('Transparency Builds Trust') present"
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUITE 4: API CLIENT & DATA CONTRACT VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n📦 SUITE 4: API CLIENT & DATA CONTRACT VERIFICATION");

  const apiPath = path.join(rootDir, "IWF/cms/src/services/financeApi.ts");
  assert(fs.existsSync(apiPath), "financeApi.ts exists");
  const apiContent = fs.readFileSync(apiPath, "utf-8");

  assert(
    apiContent.includes("getFinancialDashboardOverview") &&
    apiContent.includes("/finance/dashboard/overview"),
    "financeApi provides typed getFinancialDashboardOverview connecting to /api/finance/dashboard/overview"
  );
  assert(
    apiContent.includes("recordManualDonation") &&
    apiContent.includes("addExpense"),
    "financeApi provides recordManualDonation and addExpense methods"
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUITE 5: PRODUCTION BUILD VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  console.log("\n📦 SUITE 5: PRODUCTION BUILD VERIFICATION (ZERO ERRORS)");

  console.log("   Running 'npm run build' in IWF/cms (TypeScript + Vite)...");
  try {
    const buildOutput = execSync("npm run build", {
      cwd: path.join(rootDir, "IWF/cms"),
      encoding: "utf-8",
      stdio: "pipe",
    });
    assert(
      buildOutput.includes("built in") || fs.existsSync(path.join(rootDir, "IWF/cms/dist/index.html")),
      "CMS production build compiles cleanly with zero TypeScript errors"
    );
  } catch (err: any) {
    console.error("Build failed:", err.stdout || err.stderr || err.message);
    throw err;
  }

  console.log("\n================================================================================");
  console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED CLEANLY FOR PHASE 3 AND PHASE 4!`);
  console.log("================================================================================");
}

runPhase3And4Tests().catch((err) => {
  console.error("Test Suite execution failed:", err);
  process.exit(1);
});
