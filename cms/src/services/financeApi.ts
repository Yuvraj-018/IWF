// IWF/cms/src/services/financeApi.ts
// Typed API client for Financial Reporting & Accounting Engine

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getHeaders(isFormData = false): HeadersInit {
  const token = localStorage.getItem("islah_admin_token");
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export interface OverviewQueryParams {
  from?: string;
  to?: string;
  interval?: "daily" | "weekly" | "monthly";
}

export interface FinancialDashboardOverviewData {
  period: {
    from: string;
    to: string;
    interval: string;
  };
  kpis: {
    totalDonations: { amount: number; amountPaise: number; formatted: string };
    totalDonationsDelta: number;
    onlineDonations: { amount: number; amountPaise: number; formatted: string };
    onlineDonationsShare: number;
    onlineDonationsDelta: number;
    offlineDonations: { amount: number; amountPaise: number; formatted: string };
    offlineDonationsShare: number;
    offlineDonationsDelta: number;
    pendingPayments: { amount: number; amountPaise: number; formatted: string; count: number; delta: number };
    receiptsIssued: { count: number; deliveryRate: number; delta: number };
  };
  donationTrends: {
    data: Array<{
      label: string;
      total: number;
      online: number;
      offline: number;
      corporate: number;
      other: number;
    }>;
    summary: {
      total: number;
      growthPercentage: number;
      breakdown: {
        online: number;
        offline: number;
        corporate: number;
        other: number;
      };
    };
  };
  donationsByCategory: {
    total: number;
    categories: Array<{
      code: string;
      name: string;
      amount: number;
      percentage: number;
      color: string;
    }>;
  };
  recentTransactions: Array<{
    id: string;
    receiptNo?: string;
    date: string;
    donorName: string;
    amount: number;
    formattedAmount: string;
    paymentMethod: string;
    status: string;
  }>;
  expenseSummary: {
    totalExpenses: number;
    formattedTotal: string;
    categories: Array<{
      head: string;
      amount: number;
      percentage: number;
      color: string;
    }>;
  };
  monthlyFinancialSummary: {
    income: number;
    formattedIncome: string;
    incomeDelta: number;
    expenses: number;
    formattedExpenses: string;
    expenseDelta: number;
    netBalance: number;
    formattedNetBalance: string;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    subtitle: string;
    timeAgo: string;
    icon: string;
    color: string;
  }>;
}

export interface TransactionItem {
  _id: string;
  receiptNo: string;
  certificateNo?: string;
  transactionId?: string;
  donorName: string;
  donorType?: string;
  email: string;
  phone: string;
  countryCode?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  amount: number;
  amountPaise?: number;
  paymentMode: string;
  paymentStatus: "Success" | "Pending" | "Failed" | "Refunded";
  financialType: string;
  workAreaId: string;
  initiativeId?: string;
  taxExemption: boolean;
  pan?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  notes?: string;
  createdAt: string;
}

export interface TransactionFilterParams {
  search?: string;
  paymentMode?: string;
  paymentStatus?: string;
  workAreaId?: string;
  taxExemption?: string;
  fy?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface ReceiptItem {
  receiptNo: string;
  certificateNo: string;
  donorName: string;
  email: string;
  phone?: string;
  issueDate: string;
  amount: number;
  cause: string;
  taxExemption: boolean;
  pan?: string;
  deliveryStatus: "Sent" | "Queued" | "Failed";
  verificationStatus: "Verified" | "Pending";
}

export interface ExpenseItem {
  _id: string;
  expenseNo: string;
  date: string;
  amount: number;
  amountPaise: number;
  head: string;
  workAreaId: string;
  initiativeId?: string;
  payee: {
    name: string;
    pan?: string;
    gstin?: string;
    bankDetails?: string;
  };
  invoiceRef?: string;
  description: string;
  evidenceUrls: string[];
  status: "submitted" | "approved" | "returned" | "rejected" | "cancelled";
  payment: {
    status: "unpaid" | "paid";
    date?: string;
    method?: string;
    reference?: string;
  };
  approval: {
    status: string;
    reviewedBy?: string;
    reviewedAt?: string;
    comments?: string;
  };
  createdBy: string;
  createdAt: string;
}

export interface BudgetOverview {
  success: boolean;
  fy: string;
  summary: {
    totalAllocated: number;
    totalSpent: number;
    totalRemaining: number;
    overallUtilization: number;
  };
  sectorBudgets: Array<{
    code: string;
    name: string;
    allocated: number;
    spent: number;
    remaining: number;
    utilization: number;
    status: string;
  }>;
}

export const financeApi = {
  /**
   * Fetch overview metrics, charts and feeds
   */
  async getFinancialDashboardOverview(params: OverviewQueryParams = {}): Promise<{
    success: boolean;
    data: FinancialDashboardOverviewData;
    message?: string;
  }> {
    const query = new URLSearchParams();
    if (params.from) query.set("from", params.from);
    if (params.to) query.set("to", params.to);
    if (params.interval) query.set("interval", params.interval);

    const res = await fetch(`${API_BASE_URL}/finance/dashboard/overview?${query.toString()}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to fetch overview: status ${res.status}`);
    }

    return res.json();
  },

  /**
   * Fetch Transactions List with advanced filtering & pagination
   */
  async getTransactions(params: TransactionFilterParams = {}): Promise<{
    success: boolean;
    data: TransactionItem[];
    stats?: {
      totalAmount: number;
      successCount: number;
      pendingCount: number;
      failedCount: number;
    };
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.paymentMode && params.paymentMode !== "all") query.set("paymentMode", params.paymentMode);
    if (params.paymentStatus && params.paymentStatus !== "all") query.set("paymentStatus", params.paymentStatus);
    if (params.workAreaId && params.workAreaId !== "all") query.set("workAreaId", params.workAreaId);
    if (params.taxExemption && params.taxExemption !== "all") query.set("taxExemption", params.taxExemption);
    if (params.fy && params.fy !== "all") query.set("fy", params.fy);
    if (params.from) query.set("from", params.from);
    if (params.to) query.set("to", params.to);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE_URL}/finance/donations?${query.toString()}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to fetch transactions: status ${res.status}`);
    }

    return res.json();
  },

  /**
   * Alias for getTransactions to query donations register
   */
  async getDonations(params: TransactionFilterParams = {}) {
    return this.getTransactions(params);
  },

  /**
   * Fetch Receipts & Acknowledgements Register
   */
  async getReceipts(params: { search?: string; taxExemption?: string; page?: number; limit?: number } = {}): Promise<{
    success: boolean;
    data: ReceiptItem[];
    pagination: { total: number; page: number; limit: number; pages: number };
  }> {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.taxExemption && params.taxExemption !== "all") query.set("taxExemption", params.taxExemption);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE_URL}/finance/receipts?${query.toString()}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch receipts register");
    }

    return res.json();
  },

  /**
   * Download official 80G Receipt PDF directly in browser
   */
  async downloadReceiptPdf(receiptNo: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/finance/receipts/${receiptNo}/pdf`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Failed to download PDF for Receipt #${receiptNo}`);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ISLAH_80G_Receipt_${receiptNo}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  /**
   * Re-send official 80G receipt email to donor
   */
  async resendReceiptEmail(receiptNo: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/finance/receipts/${receiptNo}/resend`, {
      method: "POST",
      headers: getHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to re-send receipt email");
    }
    return data;
  },

  /**
   * Record manual offline donation (Dual-entry ledger + Atomic Counter)
   */
  async recordManualDonation(payload: {
    donorName: string;
    donorType?: string;
    email?: string;
    phone?: string;
    pan?: string;
    amount: number;
    paymentMode: string;
    paymentReference?: string;
    financialType?: string;
    workAreaId?: string;
    initiativeId?: string;
    taxExemption?: boolean;
    notes?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/finance/donations/manual`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to record manual donation");
    }
    return data;
  },

  /**
   * Expense Management: List Expenses with tab stages
   */
  async getExpenses(params: {
    stage?: string;
    status?: string;
    head?: string;
    workAreaId?: string;
    fy?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    success: boolean;
    data: ExpenseItem[];
    stats: {
      totalAmount: number;
      pendingCount: number;
      pendingAmount: number;
      unpaidCount: number;
      unpaidAmount: number;
      paidAmount: number;
    };
    pagination: { total: number; page: number; limit: number; pages: number };
  }> {
    const query = new URLSearchParams();
    if (params.stage && params.stage !== "all") query.set("stage", params.stage);
    if (params.status && params.status !== "all") query.set("status", params.status);
    if (params.head && params.head !== "all") query.set("head", params.head);
    if (params.workAreaId && params.workAreaId !== "all") query.set("workAreaId", params.workAreaId);
    if (params.fy && params.fy !== "all") query.set("fy", params.fy);
    if (params.search) query.set("search", params.search);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE_URL}/finance/expenses?${query.toString()}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch expenses");
    }

    return res.json();
  },

  /**
   * Record an expense voucher
   */
  async addExpense(payload: {
    date: string;
    amount: number;
    head: string;
    workAreaId: string;
    initiativeId?: string;
    payeeName: string;
    payeePan?: string;
    payeeGstin?: string;
    payeeBankDetails?: string;
    invoiceRef?: string;
    description: string;
    paymentMethod?: string;
    evidenceUrls?: string[];
  }) {
    const res = await fetch(`${API_BASE_URL}/finance/expenses`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to record expense");
    }
    return data;
  },

  /**
   * Review Expense: Approve, Return for corrections, or Reject
   */
  async reviewExpense(id: string, payload: { action: "approve" | "return" | "reject"; comments?: string }) {
    const res = await fetch(`${API_BASE_URL}/finance/expenses/${id}/review`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to review expense");
    }
    return data;
  },

  /**
   * Record Bank Payout for Approved Expense
   */
  async recordExpensePayment(id: string, payload: {
    paymentDate: string;
    paymentMethod?: string;
    reference: string;
    bankAccountId?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/finance/expenses/${id}/pay`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to record expense payment");
    }
    return data;
  },

  /**
   * Reverse / Cancel Expense
   */
  async reverseExpense(id: string, reason?: string) {
    const res = await fetch(`${API_BASE_URL}/finance/expenses/${id}/reverse`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ reason }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to reverse expense");
    }
    return data;
  },

  /**
   * Budget Management: Get FY Budgets
   */
  async getBudgets(fy?: string): Promise<BudgetOverview> {
    const query = fy ? `?fy=${fy}` : "";
    const res = await fetch(`${API_BASE_URL}/finance/budgets${query}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch budget allocations");
    }

    return res.json();
  },

  /**
   * Budget Management: Update / Configure Budget
   */
  async setBudget(payload: { fy: string; workAreaId: string; allocatedAmount: number; initiativeId?: string }) {
    const res = await fetch(`${API_BASE_URL}/finance/budgets`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update budget");
    }
    return data;
  },

  /**
   * Bank Accounts
   */
  async getBankAccounts(): Promise<{ success: boolean; data: any[] }> {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/accounts`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Failed to load bank accounts");
    }
    return res.json();
  },

  /**
   * Bank Statements
   */
  async getBankStatements(): Promise<{ success: boolean; data: any[] }> {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/statements`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Failed to load statements");
    }
    return res.json();
  },

  /**
   * Upload Statement CSV
   */
  async uploadBankStatement(payload: { csvContent: string; bankAccountId?: string }) {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/upload`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to upload bank statement");
    }
    return data;
  },

  /**
   * Get Statement Lines with analytics summary
   */
  async getStatementLines(params: {
    statementId?: string;
    matchStatus?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params.statementId) searchParams.set("statementId", params.statementId);
    if (params.matchStatus) searchParams.set("matchStatus", params.matchStatus);
    if (params.search) searchParams.set("search", params.search);
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/lines?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Failed to load statement lines");
    }
    return res.json();
  },

  /**
   * Trigger Auto-Matching
   */
  async triggerAutoMatch(statementId?: string) {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/auto-match`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ statementId }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to run auto-match");
    }
    return data;
  },

  /**
   * Confirm Match
   */
  async confirmStatementMatch(payload: { lineId: string; ledgerEntryId: string }) {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/match`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to confirm match");
    }
    return data;
  },

  /**
   * Unmatch Line
   */
  async unmatchStatementLine(lineId: string) {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/unmatch`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ lineId }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to unmatch line");
    }
    return data;
  },

  /**
   * Get Candidate Ledger Matches for a Line
   */
  async getLineCandidates(lineId: string) {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/lines/${lineId}/candidates`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Failed to load candidate matches");
    }
    return res.json();
  },

  /**
   * Record Unmatched Credit as Direct Income
   */
  async recordDirectIncome(payload: {
    lineId: string;
    donorName: string;
    donorType?: string;
    email?: string;
    phone?: string;
    pan?: string;
    workAreaId?: string;
    financialType?: string;
    taxExemption?: boolean;
  }) {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/direct-income`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to record direct income");
    }
    return data;
  },

  /**
   * Ignore Statement Line
   */
  async ignoreStatementLine(payload: { lineId: string; reason?: string }) {
    const res = await fetch(`${API_BASE_URL}/finance/reconciliation/ignore`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to ignore statement line");
    }
    return data;
  },

  /**
   * List Refunds
   */
  async getRefunds(params?: {
    status?: string;
    search?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set("status", params.status);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.from) searchParams.set("from", params.from);
    if (params?.to) searchParams.set("to", params.to);
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE_URL}/finance/refunds?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Failed to load refunds");
    }
    return res.json();
  },

  /**
   * Process Refund
   */
  async processRefund(payload: {
    donationId: string;
    amount?: number;
    amountPaise?: number;
    reason: string;
    notes?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/finance/refunds`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to process refund");
    }
    return data;
  },

  /**
   * Get Refund by ID
   */
  async getRefund(id: string) {
    const res = await fetch(`${API_BASE_URL}/finance/refunds/${id}`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Failed to load refund details");
    }
    return res.json();
  },

  /**
   * Financial Reports Suite
   */
  async getIncomeBySourceReport(params: { fy?: string; from?: string; to?: string } = {}) {
    const searchParams = new URLSearchParams();
    if (params.fy) searchParams.set("fy", params.fy);
    if (params.from) searchParams.set("from", params.from);
    if (params.to) searchParams.set("to", params.to);

    const res = await fetch(`${API_BASE_URL}/finance/reports/income-source?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load income by source report");
    return res.json();
  },

  async getExpenditureBySectorReport(params: { workAreaId?: string; from?: string; to?: string } = {}) {
    const searchParams = new URLSearchParams();
    if (params.workAreaId) searchParams.set("workAreaId", params.workAreaId);
    if (params.from) searchParams.set("from", params.from);
    if (params.to) searchParams.set("to", params.to);

    const res = await fetch(`${API_BASE_URL}/finance/reports/expenditure-sector?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load expenditure report");
    return res.json();
  },

  async getIncomeVsExpenditureReport(params: { fy?: string; from?: string; to?: string } = {}) {
    const searchParams = new URLSearchParams();
    if (params.fy) searchParams.set("fy", params.fy);
    if (params.from) searchParams.set("from", params.from);
    if (params.to) searchParams.set("to", params.to);

    const res = await fetch(`${API_BASE_URL}/finance/reports/income-vs-expenditure?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load income vs expenditure statement");
    return res.json();
  },

  async getBudgetVarianceReport(fy: string = "2025-26") {
    const res = await fetch(`${API_BASE_URL}/finance/reports/budget-variance?fy=${fy}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load budget variance report");
    return res.json();
  },

  async getTax80GRegisterReport(params: { from?: string; to?: string } = {}) {
    const searchParams = new URLSearchParams();
    if (params.from) searchParams.set("from", params.from);
    if (params.to) searchParams.set("to", params.to);

    const res = await fetch(`${API_BASE_URL}/finance/reports/80g-register?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load 80G tax exemption register");
    return res.json();
  },

  /**
   * Export Report (Downloads CSV or PDF blob)
   */
  async exportReport(params: {
    reportType: string;
    format: "csv" | "pdf";
    fy?: string;
    from?: string;
    to?: string;
    workAreaId?: string;
  }): Promise<Blob> {
    const searchParams = new URLSearchParams();
    searchParams.set("reportType", params.reportType);
    searchParams.set("format", params.format);
    if (params.fy) searchParams.set("fy", params.fy);
    if (params.from) searchParams.set("from", params.from);
    if (params.to) searchParams.set("to", params.to);
    if (params.workAreaId) searchParams.set("workAreaId", params.workAreaId);

    const res = await fetch(`${API_BASE_URL}/finance/reports/export?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to export report");
    return res.blob();
  },

  /**
   * Public Transparency Snapshot Operations
   */
  async publishTransparencySnapshot(payload: { fy: string; title?: string; notes?: string }) {
    const res = await fetch(`${API_BASE_URL}/finance/transparency/publish`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to publish snapshot");
    return data;
  },

  async getTransparencySnapshots() {
    const res = await fetch(`${API_BASE_URL}/finance/transparency/snapshots`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load snapshots");
    return res.json();
  },

  async toggleSnapshotPublish(id: string) {
    const res = await fetch(`${API_BASE_URL}/finance/transparency/snapshots/${id}/toggle`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to toggle snapshot");
    return data;
  },
};
