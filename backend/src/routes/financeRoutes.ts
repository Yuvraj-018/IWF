import { Router } from "express";
import { getDashboardOverview } from "../controllers/financeDashboardController.js";
import {
  createExpense,
  listExpenses,
  reviewExpense,
  recordPayment,
  reverseExpense,
  getBudgets,
  setBudget,
} from "../controllers/expenseController.js";
import {
  listDonations,
  createManualDonation,
  downloadReceiptPdf,
  resendReceiptEmail,
  listReceipts,
} from "../controllers/donationController.js";
import {
  listBankAccounts,
  uploadBankStatement,
  listStatements,
  listStatementLines,
  triggerAutoMatch,
  confirmMatch,
  unmatch,
  getCandidates,
  recordDirectIncome,
  ignoreStatementLine,
} from "../controllers/reconciliationController.js";
import {
  createRefund,
  listRefunds,
  getRefundById,
} from "../controllers/refundController.js";
import {
  getIncomeBySource,
  getExpenditureBySector,
  getIncomeVsExpenditure,
  getBudgetVariance,
  getTax80GRegisterReport,
  exportFinancialReport,
} from "../controllers/reportController.js";
import {
  publishSnapshot,
  listSnapshots,
  toggleSnapshotPublish,
  getPublicFinancialSummary,
} from "../controllers/transparencyController.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const financeRouter = Router();

/**
 * Overview Dashboard
 */
financeRouter.get("/dashboard/overview", getDashboardOverview);

/**
 * Transactions & Donations Register
 */
financeRouter.get("/donations", requireAdminAuth, listDonations);
financeRouter.post("/donations/manual", requireAdminAuth, createManualDonation);

/**
 * Receipts & Acknowledgements
 */
financeRouter.get("/receipts", requireAdminAuth, listReceipts);
financeRouter.get("/receipts/:receiptNo/pdf", downloadReceiptPdf);
financeRouter.post("/receipts/:receiptNo/resend", requireAdminAuth, resendReceiptEmail);

/**
 * Expense Management & Approval Workflow
 */
financeRouter.get("/expenses", requireAdminAuth, listExpenses);
financeRouter.post("/expenses", requireAdminAuth, createExpense);
financeRouter.post("/expenses/:id/review", requireAdminAuth, reviewExpense);
financeRouter.post("/expenses/:id/pay", requireAdminAuth, recordPayment);
financeRouter.post("/expenses/:id/reverse", requireAdminAuth, reverseExpense);

/**
 * Budget Management
 */
financeRouter.get("/budgets", requireAdminAuth, getBudgets);
financeRouter.post("/budgets", requireAdminAuth, setBudget);

/**
 * Bank Reconciliation Engine
 */
financeRouter.get("/reconciliation/accounts", requireAdminAuth, listBankAccounts);
financeRouter.get("/reconciliation/statements", requireAdminAuth, listStatements);
financeRouter.post("/reconciliation/upload", requireAdminAuth, uploadBankStatement);
financeRouter.get("/reconciliation/lines", requireAdminAuth, listStatementLines);
financeRouter.post("/reconciliation/auto-match", requireAdminAuth, triggerAutoMatch);
financeRouter.post("/reconciliation/match", requireAdminAuth, confirmMatch);
financeRouter.post("/reconciliation/unmatch", requireAdminAuth, unmatch);
financeRouter.get("/reconciliation/lines/:lineId/candidates", requireAdminAuth, getCandidates);
financeRouter.post("/reconciliation/direct-income", requireAdminAuth, recordDirectIncome);
financeRouter.post("/reconciliation/ignore", requireAdminAuth, ignoreStatementLine);

/**
 * Refunds & Reversals Workflow
 */
financeRouter.get("/refunds", requireAdminAuth, listRefunds);
financeRouter.post("/refunds", requireAdminAuth, createRefund);
financeRouter.get("/refunds/:id", requireAdminAuth, getRefundById);

/**
 * Statutory Financial Reports Suite
 */
financeRouter.get("/reports/income-source", requireAdminAuth, getIncomeBySource);
financeRouter.get("/reports/expenditure-sector", requireAdminAuth, getExpenditureBySector);
financeRouter.get("/reports/income-vs-expenditure", requireAdminAuth, getIncomeVsExpenditure);
financeRouter.get("/reports/budget-variance", requireAdminAuth, getBudgetVariance);
financeRouter.get("/reports/80g-register", requireAdminAuth, getTax80GRegisterReport);
financeRouter.get("/reports/export", requireAdminAuth, exportFinancialReport);

/**
 * Public Transparency Snapshot Publisher
 */
financeRouter.post("/transparency/publish", requireAdminAuth, publishSnapshot);
financeRouter.get("/transparency/snapshots", requireAdminAuth, listSnapshots);
financeRouter.post("/transparency/snapshots/:id/toggle", requireAdminAuth, toggleSnapshotPublish);

/**
 * Unauthenticated Public Financial Transparency Summary
 */
financeRouter.get("/public/transparency/financial-summary", getPublicFinancialSummary);


