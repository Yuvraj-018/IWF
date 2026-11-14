import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Receipt,
  Search,
  Filter,
  PlusCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  FileText,
  Building2,
  Calendar,
  CreditCard,
  User,
  ArrowRight,
  Check,
  Loader2,
  RotateCcw,
  UploadCloud,
  FileCheck2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { financeApi, ExpenseItem } from "../../services/financeApi";
import { useAuth } from "../../context/AuthContext";
import { PiiField } from "../../components/common/PiiField";

function formatINR(val: number): string {
  if (isNaN(val) || val === 0) return "₹ 0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

const WORK_AREA_NAMES: Record<string, string> = {
  EDU: "Education & Learning",
  HLT: "Healthcare & Well-being",
  SLE: "Livelihoods & Enterprise",
  WYE: "Women & Youth Empowerment",
  SJL: "Social Justice & Legal",
  AGR: "Agriculture & Food",
  ENV: "Environment & Climate",
  HRR: "Humanitarian Relief",
};

export default function ExpensesManager() {
  const { user: currentUser, can } = useAuth();
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmount: 0,
    pendingCount: 0,
    pendingAmount: 0,
    unpaidCount: 0,
    unpaidAmount: 0,
    paidAmount: 0,
  });

  // Filter & tab states
  const [activeStage, setActiveStage] = useState<"all" | "pending" | "approved" | "paid" | "reconciled">("all");
  const [search, setSearch] = useState("");
  const [head, setHead] = useState("all");
  const [workAreaId, setWorkAreaId] = useState("all");
  const [fy, setFy] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  // Modal & Drawer states
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);
  const [payingExpense, setPayingExpense] = useState<ExpenseItem | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await financeApi.getExpenses({
        stage: activeStage !== "all" ? activeStage : undefined,
        head: head !== "all" ? head : undefined,
        workAreaId: workAreaId !== "all" ? workAreaId : undefined,
        fy: fy !== "all" ? fy : undefined,
        search: search.trim() || undefined,
        page,
        limit,
      });

      if (res.success) {
        setExpenses(res.data);
        if (res.stats) {
          setStats(res.stats);
        }
        setPagination(res.pagination);
      }
    } catch (err: any) {
      console.error("Failed to fetch expenses:", err.message);
      toast.error(err.message || "Failed to fetch expenses");
      setExpenses([]);
      setPagination({ total: 0, pages: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [activeStage, head, workAreaId, fy, search, page, limit]);

  // Review handler
  const handleReview = async (id: string, action: "approve" | "return" | "reject", comments?: string) => {
    try {
      await financeApi.reviewExpense(id, { action, comments });
      toast.success(`Expense voucher ${action === "approve" ? "approved" : action === "return" ? "returned" : "rejected"}`);
      setSelectedExpense(null);
      fetchExpenses();
    } catch (err: any) {
      toast.error(err.message || "Failed to update review status");
    }
  };

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 font-sans select-none">
      {/* ── TOP HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <Link to="/finance" className="hover:text-emerald-700 transition">
              Donations &amp; Finance
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">Expenses &amp; Disbursements</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-6 h-6 text-purple-600" />
            <span>Expenses &amp; Disbursements</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit expense vouchers, enforce multi-stage review separation of duties, and track bank disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/finance/budgets"
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>View Budget Utilisation</span>
          </Link>
          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Expense Voucher</span>
          </button>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Total Spend (FY)</p>
          <h3 className="text-xl font-black text-slate-900 mt-1">{formatINR(stats.totalAmount)}</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Approved &amp; incurred bills</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Pending Review</p>
          <h3 className="text-xl font-black text-blue-600 mt-1">{stats.pendingCount} vouchers</h3>
          <p className="text-[10px] text-blue-800 font-medium mt-0.5">{formatINR(stats.pendingAmount)} volume</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Approved (Unpaid Commitments)</p>
          <h3 className="text-xl font-black text-amber-600 mt-1">{stats.unpaidCount} vouchers</h3>
          <p className="text-[10px] text-amber-800 font-medium mt-0.5">{formatINR(stats.unpaidAmount)} awaiting payout</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Paid &amp; Ledgered</p>
          <h3 className="text-xl font-black text-emerald-700 mt-1">{formatINR(stats.paidAmount)}</h3>
          <p className="text-[10px] text-emerald-800 font-medium mt-0.5">Debited to SBI Account</p>
        </div>
      </div>

      {/* ── STAGE TABS ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        {[
          { id: "all", label: "All Expenses" },
          { id: "pending", label: "Pending Review", badge: stats.pendingCount },
          { id: "approved", label: "Approved (Unpaid)", badge: stats.unpaidCount },
          { id: "paid", label: "Paid & Disbursed" },
          { id: "reconciled", label: "Reconciled with Bank" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveStage(tab.id as any);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeStage === tab.id
                ? "bg-purple-50 text-purple-900 border border-purple-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── FILTER & SEARCH ── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Payee, PAN, Voucher #, Bill Ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
        </div>

        <div>
          <select
            value={head}
            onChange={(e) => setHead(e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          >
            <option value="all">All Expense Heads</option>
            <option value="Medical Support">Medical Support</option>
            <option value="Programme Activities">Programme Activities</option>
            <option value="Administration">Administration</option>
            <option value="Travel & Logistics">Travel &amp; Logistics</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <select
            value={workAreaId}
            onChange={(e) => setWorkAreaId(e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          >
            <option value="all">All Master Sectors</option>
            <option value="HLT">Healthcare (HLT)</option>
            <option value="EDU">Education (EDU)</option>
            <option value="SLE">Livelihoods (SLE)</option>
            <option value="WYE">Women &amp; Youth (WYE)</option>
            <option value="ENV">Environment (ENV)</option>
            <option value="SJL">Social Justice (SJL)</option>
            <option value="AGR">Agriculture (AGR)</option>
            <option value="HRR">Humanitarian Relief (HRR)</option>
          </select>
        </div>

        <div>
          <select
            value={fy}
            onChange={(e) => setFy(e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          >
            <option value="all">All Fiscal Years</option>
            <option value="2026-27">FY 2026-27 (Current)</option>
            <option value="2025-26">FY 2025-26</option>
            <option value="2024-25">FY 2024-25</option>
          </select>
        </div>
      </div>

      {/* ── EXPENSES DATA TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Voucher #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payee / Vendor</th>
                <th className="py-3 px-4">Expense Head</th>
                <th className="py-3 px-4">Work Area</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-center">Review Status</th>
                <th className="py-3 px-4 text-center">Payout</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-600 mb-2" />
                    <p className="text-xs font-semibold">Loading expense register...</p>
                  </td>
                </tr>
              ) : expenses.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-7 h-7 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-bold text-slate-700">No vouchers in this stage</p>
                    <p className="text-xs text-slate-400 mt-0.5">Click 'Add Expense Voucher' to submit a new bill.</p>
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr
                    key={exp._id}
                    className="hover:bg-slate-50/80 transition cursor-pointer"
                    onClick={() => setSelectedExpense(exp)}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 text-[11px]">
                      {exp.expenseNo}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                      {new Date(exp.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{exp.payee.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {exp.payee.pan ? `PAN: ${exp.payee.pan}` : exp.invoiceRef ? `Ref: ${exp.invoiceRef}` : "Verified Payee"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{exp.head}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-[10px]">
                        {exp.workAreaId}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-slate-900 text-xs">
                      {formatINR(exp.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          exp.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : exp.status === "submitted"
                            ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                            : exp.status === "returned"
                            ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                            : "bg-rose-50 text-rose-700 border border-rose-200/60"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          exp.payment.status === "paid"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : "bg-amber-50 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {exp.payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {exp.status === "submitted" && (
                          <button
                            onClick={() => setSelectedExpense(exp)}
                            className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold transition cursor-pointer"
                          >
                            Review
                          </button>
                        )}
                        {exp.status === "approved" && exp.payment.status === "unpaid" && (
                          <button
                            onClick={() => setPayingExpense(exp)}
                            className="px-2 py-1 rounded-lg bg-[#f97316] hover:bg-[#ea580c] text-white text-[10px] font-bold transition cursor-pointer"
                          >
                            Pay
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedExpense(exp)}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Page <span className="font-bold text-slate-900">{page}</span> of{" "}
            <span className="font-bold text-slate-900">{pagination.pages}</span> ({pagination.total} vouchers)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(Math.min(pagination.pages, page + 1))}
              disabled={page >= pagination.pages}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── EXPENSE REVIEW DRAWER ── */}
      {selectedExpense && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl p-6 overflow-y-auto border-l border-slate-200 space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Expense Voucher Audit
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{selectedExpense.expenseNo}</h3>
              </div>
              <button
                onClick={() => setSelectedExpense(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount & Status Card */}
            <div className="rounded-2xl p-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-500/20 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Expense Amount</p>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">{formatINR(selectedExpense.amount)}</h2>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedExpense.head}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    selectedExpense.status === "approved"
                      ? "bg-emerald-600 text-white"
                      : selectedExpense.status === "submitted"
                      ? "bg-blue-600 text-white"
                      : "bg-rose-600 text-white"
                  }`}
                >
                  {selectedExpense.status}
                </span>
                <p className="text-[10px] text-slate-500 font-mono mt-1">Payout: {selectedExpense.payment.status}</p>
              </div>
            </div>

            {/* Payee & Invoice Info */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payee &amp; Invoice</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Payee Name</p>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedExpense.payee.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Payee PAN / GSTIN</p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedExpense.payee.pan || selectedExpense.payee.gstin || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Invoice Number</p>
                  <p className="font-mono text-slate-800 mt-0.5">{selectedExpense.invoiceRef || "Direct Reimbursement"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Work Area Allocation</p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {WORK_AREA_NAMES[selectedExpense.workAreaId] || selectedExpense.workAreaId}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Description / Justification</p>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedExpense.description}</p>
              </div>
            </div>

            {/* Review Workflow Controls */}
            {selectedExpense.status === "submitted" && (
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-blue-950">Reviewer Actions (Separation of Duties)</span>
                </div>
                <p className="text-[11px] text-blue-800">
                  Creator: <span className="font-bold">{selectedExpense.createdBy}</span>. Only an independent reviewer or superadmin can authorize disbursement.
                </p>

                {(() => {
                  const isCreator = Boolean(
                    currentUser &&
                    (currentUser.id === (selectedExpense as any).creatorId ||
                     currentUser.email?.toLowerCase() === (selectedExpense.createdBy || "").toLowerCase() ||
                     currentUser.name?.toLowerCase() === (selectedExpense.createdBy || "").toLowerCase())
                  );

                  if (isCreator) {
                    return (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Separation of Duties:</strong> You created this record, so another person must act on it.
                        </span>
                      </div>
                    );
                  }

                  const canApprove = can("finance.expense:approve");

                  return (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleReview(selectedExpense._id, "approve")}
                        disabled={!canApprove}
                        className="flex-1 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        title={!canApprove ? "Requires permission: finance.expense:approve" : undefined}
                      >
                        Approve Voucher
                      </button>
                      <button
                        onClick={() => handleReview(selectedExpense._id, "return", "Missing legible invoice copy")}
                        disabled={!canApprove}
                        className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Return for Edit
                      </button>
                      <button
                        onClick={() => handleReview(selectedExpense._id, "reject", "Expense out of policy")}
                        disabled={!canApprove}
                        className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Approved & Unpaid -> Trigger Record Payment */}
            {selectedExpense.status === "approved" && selectedExpense.payment.status === "unpaid" && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
                <p className="text-xs font-bold text-emerald-950">Voucher Approved &amp; Ready for Payout</p>
                <p className="text-[11px] text-emerald-800">
                  Authorised by {selectedExpense.approval?.reviewedBy || "Super Admin"}. Proceed to execute bank payout.
                </p>

                {(() => {
                  const isCreator = Boolean(
                    currentUser &&
                    (currentUser.id === (selectedExpense as any).creatorId ||
                     currentUser.email?.toLowerCase() === (selectedExpense.createdBy || "").toLowerCase() ||
                     currentUser.name?.toLowerCase() === (selectedExpense.createdBy || "").toLowerCase())
                  );

                  if (isCreator) {
                    return (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>You created this record, so another person must execute disbursement.</span>
                      </div>
                    );
                  }

                  const canPay = can("finance.expense:pay");

                  return (
                    <button
                      onClick={() => {
                        setPayingExpense(selectedExpense);
                        setSelectedExpense(null);
                      }}
                      disabled={!canPay}
                      className="w-full mt-2 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      title={!canPay ? "Requires permission: finance.expense:pay" : undefined}
                    >
                      Record Bank Disbursement
                    </button>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── RECORD PAYMENT MODAL ── */}
      {payingExpense && (
        <RecordPaymentModal
          expense={payingExpense}
          onClose={() => setPayingExpense(null)}
          onSuccess={() => {
            setPayingExpense(null);
            fetchExpenses();
          }}
        />
      )}

      {/* ── ADD EXPENSE VOUCHER MODAL ── */}
      {isAddExpenseOpen && (
        <AddExpenseVoucherModal
          onClose={() => setIsAddExpenseOpen(false)}
          onSuccess={() => {
            setIsAddExpenseOpen(false);
            fetchExpenses();
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RECORD PAYMENT MODAL
// ─────────────────────────────────────────────────────────────
function RecordPaymentModal({
  expense,
  onClose,
  onSuccess,
}: {
  expense: ExpenseItem;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "Bank Transfer",
    reference: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reference) {
      toast.error("Please provide Bank UTR or Cheque reference");
      return;
    }

    setSubmitting(true);
    try {
      await financeApi.recordExpensePayment(expense._id, {
        paymentDate: formData.paymentDate,
        paymentMethod: formData.paymentMethod,
        reference: formData.reference,
      });

      toast.success(`Disbursement of ${formatINR(expense.amount)} recorded! Ledger debited.`);
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to record payment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Record Bank Disbursement</h3>
            <p className="text-[11px] text-slate-500">Voucher #{expense.expenseNo} • {formatINR(expense.amount)}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="text-[11px] font-bold text-slate-700">Disbursing Account</label>
            <input
              type="text"
              readOnly
              value="SBI Current Account (*****1092) - Main Foundation Fund"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Payment Date *</label>
              <input
                type="date"
                required
                value={formData.paymentDate}
                onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                <option value="Cheque">Cheque</option>
                <option value="UPI">Direct UPI</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700">Bank UTR / Cheque Reference *</label>
            <input
              type="text"
              required
              placeholder="e.g. UTR-SBI-882299"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Post Disbursement to Ledger</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADD EXPENSE VOUCHER MODAL
// ─────────────────────────────────────────────────────────────
function AddExpenseVoucherModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    head: "Medical Support",
    workAreaId: "HLT",
    initiativeId: "",
    payeeName: "",
    payeePan: "",
    invoiceRef: "",
    description: "",
    paymentMethod: "Bank Transfer",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.payeeName || !formData.description) {
      toast.error("Please fill in payee name, amount, and description");
      return;
    }

    setSubmitting(true);
    try {
      await financeApi.addExpense({
        date: formData.date,
        amount: Number(formData.amount),
        head: formData.head,
        workAreaId: formData.workAreaId,
        initiativeId: formData.initiativeId || undefined,
        payeeName: formData.payeeName,
        payeePan: formData.payeePan || undefined,
        invoiceRef: formData.invoiceRef || undefined,
        description: formData.description,
        paymentMethod: formData.paymentMethod,
      });

      toast.success("Expense voucher submitted for review!");
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit expense voucher");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Expense Voucher</h3>
              <p className="text-[11px] text-slate-500">Dual-entry voucher submission with multi-tier approval</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Invoice / Bill Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Amount (₹) *</label>
              <input
                type="number"
                required
                min={1}
                placeholder="25000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Expense Head *</label>
              <select
                value={formData.head}
                onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Medical Support">Medical Support</option>
                <option value="Programme Activities">Programme Activities</option>
                <option value="Administration">Administration</option>
                <option value="Travel & Logistics">Travel &amp; Logistics</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Work Area Allocation *</label>
              <select
                value={formData.workAreaId}
                onChange={(e) => setFormData({ ...formData, workAreaId: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="HLT">Healthcare (HLT)</option>
                <option value="EDU">Education (EDU)</option>
                <option value="SLE">Livelihoods (SLE)</option>
                <option value="WYE">Women &amp; Youth (WYE)</option>
                <option value="ENV">Environment (ENV)</option>
                <option value="SJL">Social Justice (SJL)</option>
                <option value="AGR">Agriculture (AGR)</option>
                <option value="HRR">Humanitarian Relief (HRR)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Payee / Vendor Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Apollo MedPlus"
                value={formData.payeeName}
                onChange={(e) => setFormData({ ...formData, payeeName: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Payee PAN (optional)</label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                value={formData.payeePan}
                onChange={(e) => setFormData({ ...formData, payeePan: e.target.value.toUpperCase() })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Invoice / Bill Reference</label>
              <input
                type="text"
                placeholder="INV-2025-091"
                value={formData.invoiceRef}
                onChange={(e) => setFormData({ ...formData, invoiceRef: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Specific Initiative / Case</label>
              <input
                type="text"
                placeholder="e.g. Emergency Patient Fund"
                value={formData.initiativeId}
                onChange={(e) => setFormData({ ...formData, initiativeId: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700">Description / Justification *</label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Purchase of critical medical supplies and patient support medications"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Submit Voucher for Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
