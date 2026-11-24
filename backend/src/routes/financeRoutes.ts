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
import {
  getAccountsOverview,
  listBankAccountRegister,
  getBankAccountDetail,
  revealBankAccountNumber,
  createBankAccount,
  updateBankAccount,
  listCashAccounts,
  getCashAccountDetail,
  createCashAccount,
  updateCashAccount,
  listTransfers,
  createTransfer,
  approveTransfer,
  rejectTransfer,
  createSettlement,
  listSettlements,
  listJournals,
  listChartOfAccounts,
  getTrialBalance,
} from "../controllers/accountsController.js";
import { authenticate, requirePermission, requireReauth } from "../middlewares/rbac.js";

export const financeRouter = Router();

/**
 * Overview Dashboard (Fixes Finding 4: Previously unauthenticated)
 */
financeRouter.get(
  "/dashboard/overview",
  authenticate,
  requirePermission("finance.dashboard:view"),
  getDashboardOverview
);

/**
 * Transactions & Donations Register
 */
financeRouter.get(
  "/donations",
  authenticate,
  requirePermission("finance.donation:view"),
  listDonations
);
financeRouter.post(
  "/donations/manual",
  authenticate,
  requirePermission("finance.donation:create"),
  createManualDonation
);

/**
 * Receipts & Acknowledgements
 */
financeRouter.get(
  "/receipts",
  authenticate,
  requirePermission("finance.receipt:view"),
  listReceipts
);
// Public receipt download for donors
financeRouter.get(
  "/receipts/:receiptNo/pdf",
  authenticate,
  requirePermission("finance.receipt:view"),
  downloadReceiptPdf
);
financeRouter.post(
  "/receipts/:receiptNo/resend",
  authenticate,
  requirePermission("finance.receipt:edit"),
  resendReceiptEmail
);

/**
 * Expense Management & Approval Workflow
 */
financeRouter.get(
  "/expenses",
  authenticate,
  requirePermission("finance.expense:view"),
  listExpenses
);
financeRouter.post(
  "/expenses",
  authenticate,
  requirePermission("finance.expense:create"),
  createExpense
);
financeRouter.post(
  "/expenses/:id/review",
  authenticate,
  requirePermission("finance.expense:approve"),
  reviewExpense
);
financeRouter.post(
  "/expenses/:id/pay",
  authenticate,
  requirePermission("finance.expense:pay"),
  recordPayment
);
financeRouter.post(
  "/expenses/:id/reverse",
  authenticate,
  requirePermission("finance.expense:reverse"),
  requireReauth(15),
  reverseExpense
);

/**
 * Budget Management
 */
financeRouter.get(
  "/budgets",
  authenticate,
  requirePermission("finance.budget:view"),
  getBudgets
);
financeRouter.post(
  "/budgets",
  authenticate,
  requirePermission("finance.budget:edit"),
  setBudget
);

/**
 * Bank Reconciliation Engine
 */
financeRouter.get(
  "/reconciliation/accounts",
  authenticate,
  requirePermission("finance.reconciliation:view"),
  listBankAccounts
);
financeRouter.get(
  "/reconciliation/statements",
  authenticate,
  requirePermission("finance.reconciliation:view"),
  listStatements
);
financeRouter.post(
  "/reconciliation/upload",
  authenticate,
  requirePermission("finance.reconciliation:create"),
  uploadBankStatement
);
financeRouter.get(
  "/reconciliation/lines",
  authenticate,
  requirePermission("finance.reconciliation:view"),
  listStatementLines
);
financeRouter.post(
  "/reconciliation/auto-match",
  authenticate,
  requirePermission("finance.reconciliation:reconcile"),
  triggerAutoMatch
);
financeRouter.post(
  "/reconciliation/match",
  authenticate,
  requirePermission("finance.reconciliation:reconcile"),
  confirmMatch
);
financeRouter.post(
  "/reconciliation/unmatch",
  authenticate,
  requirePermission("finance.reconciliation:unmatch"),
  unmatch
);
financeRouter.get(
  "/reconciliation/lines/:lineId/candidates",
  authenticate,
  requirePermission("finance.reconciliation:view"),
  getCandidates
);
financeRouter.post(
  "/reconciliation/direct-income",
  authenticate,
  requirePermission("finance.reconciliation:reconcile"),
  recordDirectIncome
);
financeRouter.post(
  "/reconciliation/ignore",
  authenticate,
  requirePermission("finance.reconciliation:ignore"),
  ignoreStatementLine
);

/**
 * Refunds & Reversals Workflow
 */
financeRouter.get(
  "/refunds",
  authenticate,
  requirePermission("finance.refund:view"),
  listRefunds
);
financeRouter.post(
  "/refunds",
  authenticate,
  requirePermission("finance.refund:create"),
  createRefund
);
financeRouter.get(
  "/refunds/:id",
  authenticate,
  requirePermission("finance.refund:view"),
  getRefundById
);

/**
 * Statutory Financial Reports Suite
 */
financeRouter.get(
  "/reports/income-source",
  authenticate,
  requirePermission("finance.report:view"),
  getIncomeBySource
);
financeRouter.get(
  "/reports/expenditure-sector",
  authenticate,
  requirePermission("finance.report:view"),
  getExpenditureBySector
);
financeRouter.get(
  "/reports/income-vs-expenditure",
  authenticate,
  requirePermission("finance.report:view"),
  getIncomeVsExpenditure
);
financeRouter.get(
  "/reports/budget-variance",
  authenticate,
  requirePermission("finance.report:view"),
  getBudgetVariance
);
financeRouter.get(
  "/reports/80g-register",
  authenticate,
  requirePermission("finance.report:view"),
  getTax80GRegisterReport
);
financeRouter.get(
  "/reports/export",
  authenticate,
  requirePermission("finance.report:export"),
  exportFinancialReport
);

/**
 * Public Transparency Snapshot Publisher
 */
financeRouter.post(
  "/transparency/publish",
  authenticate,
  requirePermission("finance.transparency:publish"),
  requireReauth(15),
  publishSnapshot
);
financeRouter.get(
  "/transparency/snapshots",
  authenticate,
  requirePermission("finance.transparency:view"),
  listSnapshots
);
financeRouter.post(
  "/transparency/snapshots/:id/toggle",
  authenticate,
  requirePermission("finance.transparency:toggle"),
  toggleSnapshotPublish
);

/**
 * Centralised accounts (double-entry): overview, bank & cash registers,
 * transfers, gateway settlements, journals, chart of accounts, trial balance.
 */
financeRouter.get("/accounts/overview", authenticate, requirePermission("finance.dashboard:view"), getAccountsOverview);

financeRouter.get("/accounts/bank", authenticate, requirePermission("finance.bank_account:view"), listBankAccountRegister);
financeRouter.post("/accounts/bank", authenticate, requirePermission("finance.bank_account:edit"), createBankAccount);
financeRouter.get("/accounts/bank/:id", authenticate, requirePermission("finance.bank_account:view"), getBankAccountDetail);
financeRouter.patch("/accounts/bank/:id", authenticate, requirePermission("finance.bank_account:edit"), updateBankAccount);
financeRouter.get(
  "/accounts/bank/:id/account-number",
  authenticate,
  requirePermission("finance.bank_account:view_pii"),
  revealBankAccountNumber
);

financeRouter.get("/accounts/cash", authenticate, requirePermission("finance.cash_account:view"), listCashAccounts);
financeRouter.post("/accounts/cash", authenticate, requirePermission("finance.cash_account:edit"), createCashAccount);
financeRouter.get("/accounts/cash/:id", authenticate, requirePermission("finance.cash_account:view"), getCashAccountDetail);
financeRouter.patch("/accounts/cash/:id", authenticate, requirePermission("finance.cash_account:edit"), updateCashAccount);

financeRouter.get("/accounts/transfers", authenticate, requirePermission("finance.transfer:view"), listTransfers);
financeRouter.post("/accounts/transfers", authenticate, requirePermission("finance.transfer:create"), createTransfer);
financeRouter.post(
  "/accounts/transfers/:id/approve",
  authenticate,
  requirePermission("finance.transfer:approve"),
  approveTransfer
);
financeRouter.post(
  "/accounts/transfers/:id/reject",
  authenticate,
  requirePermission("finance.transfer:approve"),
  rejectTransfer
);

financeRouter.get("/accounts/settlements", authenticate, requirePermission("finance.journal:view"), listSettlements);
financeRouter.post("/accounts/settlements", authenticate, requirePermission("finance.settlement:create"), createSettlement);

financeRouter.get("/accounts/journals", authenticate, requirePermission("finance.journal:view"), listJournals);
financeRouter.get("/accounts/chart", authenticate, requirePermission("finance.journal:view"), listChartOfAccounts);
financeRouter.get("/accounts/trial-balance", authenticate, requirePermission("finance.journal:view"), getTrialBalance);

/**
 * Unauthenticated Public Financial Transparency Summary
 */
financeRouter.get("/public/transparency/financial-summary", getPublicFinancialSummary);
