import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  CreditCard,
  Users,
  Clock,
  FileCheck2,
  Calendar,
  PlusCircle,
  Receipt,
  FileText,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Loader2,
  Sprout,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  FileSpreadsheet,
  PieChart as PieIcon,
  Building2,
  Download,
  Search,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import {
  financeApi,
  FinancialDashboardOverviewData,
} from "../../services/financeApi";

// Formatting helper for currency in INR
function formatINR(val: number): string {
  if (isNaN(val) || val === 0) return "₹ 0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

// Custom Tooltip for Donation Trend
function TrendTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700 space-y-1">
        <p className="font-bold text-emerald-400">{label}</p>
        <p className="font-semibold text-slate-100">Total: {formatINR(data.total)}</p>
        <div className="text-[10px] text-slate-300 space-y-0.5 pt-1 border-t border-slate-800">
          <p>Online: {formatINR(data.online)}</p>
          <p>Offline: {formatINR(data.offline)}</p>
        </div>
      </div>
    );
  }
  return null;
}

// Clean zero-state baseline for financial overview
const emptyDashboardData: FinancialDashboardOverviewData = {
  period: {
    from: "",
    to: "",
    interval: "monthly",
  },
  kpis: {
    totalDonations: { amount: 0, amountPaise: 0, formatted: "₹ 0" },
    totalDonationsDelta: 0,
    onlineDonations: { amount: 0, amountPaise: 0, formatted: "₹ 0" },
    onlineDonationsShare: 0,
    onlineDonationsDelta: 0,
    offlineDonations: { amount: 0, amountPaise: 0, formatted: "₹ 0" },
    offlineDonationsShare: 0,
    offlineDonationsDelta: 0,
    pendingPayments: { amount: 0, amountPaise: 0, formatted: "₹ 0", count: 0, delta: 0 },
    receiptsIssued: { count: 0, deliveryRate: 0, delta: 0 },
  },
  donationTrends: {
    data: [],
    summary: {
      total: 0,
      growthPercentage: 0,
      breakdown: {
        online: 0,
        offline: 0,
        corporate: 0,
        other: 0,
      },
    },
  },
  donationsByCategory: {
    total: 0,
    categories: [],
  },
  recentTransactions: [],
  expenseSummary: {
    totalExpenses: 0,
    formattedTotal: "₹ 0",
    categories: [],
  },
  monthlyFinancialSummary: {
    income: 0,
    formattedIncome: "₹ 0",
    incomeDelta: 0,
    expenses: 0,
    formattedExpenses: "₹ 0",
    expenseDelta: 0,
    netBalance: 0,
    formattedNetBalance: "₹ 0",
  },
  recentActivity: [],
};

export default function DonationOverview() {
  const navigate = useNavigate();

  // Dynamic Current Financial Year Calculation (Apr 1 - Mar 31)
  const now = new Date();
  const currentYear = now.getFullYear();
  const fyStartYear = now.getMonth() >= 3 ? currentYear : currentYear - 1;
  const currentFyLabel = `FY ${fyStartYear}-${String(fyStartYear + 1).slice(2)}`;
  const currentFyStart = `${fyStartYear}-04-01`;
  const currentFyEnd = `${fyStartYear + 1}-03-31`;

  // State
  const [dashboardData, setDashboardData] = useState<FinancialDashboardOverviewData>(emptyDashboardData);
  const [loading, setLoading] = useState(false);
  const [trendInterval, setTrendInterval] = useState<"monthly" | "weekly" | "daily">("monthly");

  // Date Range state defaulting to current financial year
  const [datePreset, setDatePreset] = useState(`Financial Year ${fyStartYear}-${String(fyStartYear + 1).slice(2)} (Current)`);
  const [fromDate, setFromDate] = useState(currentFyStart);
  const [toDate, setToDate] = useState(currentFyEnd);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Quick Action Modal states
  const [isRecordDonationOpen, setIsRecordDonationOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isIssueReceiptOpen, setIsIssueReceiptOpen] = useState(false);

  // Load Data directly from backend
  const loadDashboard = async (from = fromDate, to = toDate, interval = trendInterval) => {
    setLoading(true);
    try {
      const res = await financeApi.getFinancialDashboardOverview({ from, to, interval });
      if (res.success && res.data) {
        setDashboardData(res.data);
      }
    } catch (err: any) {
      console.error("Financial dashboard load error:", err);
      toast.error(err.message || "Failed to load live financial dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard(fromDate, toDate, trendInterval);
  }, [fromDate, toDate, trendInterval]);

  // Handle Preset Select
  const handleSelectPreset = (preset: string, start: string, end: string) => {
    setDatePreset(preset);
    setFromDate(start);
    setToDate(end);
    setShowDateDropdown(false);
  };

  const kpis = dashboardData.kpis;
  const trends = dashboardData.donationTrends;
  const categories = dashboardData.donationsByCategory;
  const transactions = dashboardData.recentTransactions;
  const expenses = dashboardData.expenseSummary;
  const monthly = dashboardData.monthlyFinancialSummary;
  const activities = dashboardData.recentActivity;

  return (
    <div className="space-y-5 max-w-[1550px] mx-auto pb-12 font-sans select-none">
      {/* ── TOP HERO BANNER & DATE RANGE PICKER (ROW 1) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* HERO BANNER (Left 9 columns on xl) */}
        <div className="xl:col-span-9 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#f0fbf8] via-[#e6f7f2] to-[#d8f3eb] border border-emerald-200/70 p-6 md:p-7 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-800 text-[11px] font-bold tracking-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Donations &amp; Finance</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Donation Overview
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              Track donations, manage payments, ensure reconciliation and maintain financial transparency.
            </p>
          </div>

          {/* Right Artwork: Seedling with cursive quote */}
          <div className="relative z-10 flex items-center gap-4 shrink-0 pr-2">
            <div className="relative flex items-center gap-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-xs border-2 border-white/80 bg-white/40 shrink-0">
                <img
                  src="/hero_seedling.png"
                  alt="Nurturing Growth"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback to Sprout graphic if image not accessible
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div className="text-left font-serif">
                <p className="text-sm md:text-base italic font-semibold text-emerald-900 tracking-tight leading-tight">
                  Small Contributions
                </p>
                <p className="text-base md:text-lg italic font-extrabold text-[#071527] tracking-tight leading-tight">
                  Big Impact
                </p>
              </div>
            </div>
          </div>

          {/* Soft background glow & botanical decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 right-32 w-36 h-36 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* DATE RANGE CARD (Right 3 columns on xl) */}
        <div className="xl:col-span-3 relative bg-white rounded-2xl p-4 md:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Date Range
          </p>
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-xs font-bold text-slate-800 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{datePreset}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {/* Dropdown Options */}
            {showDateDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                  Select Reporting Window
                </div>
                <button
                  onClick={() => handleSelectPreset("Financial Year 2026-27", "2026-04-01", "2027-03-31")}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition cursor-pointer flex items-center justify-between"
                >
                  <span>Financial Year 2026-27</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    Current
                  </span>
                </button>
                <button
                  onClick={() => handleSelectPreset("Financial Year 2025-26", "2025-04-01", "2026-03-31")}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition cursor-pointer"
                >
                  Financial Year 2025-26
                </button>
                <button
                  onClick={() => {
                    const now = new Date();
                    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
                    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
                    handleSelectPreset("This Month", start, end);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition cursor-pointer"
                >
                  This Month
                </button>
                <button
                  onClick={() => {
                    const now = new Date();
                    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split("T")[0];
                    const end = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0];
                    handleSelectPreset("Last Month", start, end);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition cursor-pointer"
                >
                  Last Month
                </button>
                <button
                  onClick={() => handleSelectPreset("All Records", "2020-01-01", "2030-12-31")}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition cursor-pointer"
                >
                  All Time
                </button>
                <div className="pt-2 border-t border-slate-100 mt-1 px-3">
                  <p className="text-[10px] text-slate-400 font-medium">Custom Range</p>
                  <div className="grid grid-cols-2 gap-2 mt-1 mb-1">
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="text-[11px] p-1 border border-slate-200 rounded-lg"
                    />
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="text-[11px] p-1 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setDatePreset(`${fromDate} to ${toDate}`);
                      setShowDateDropdown(false);
                    }}
                    className="w-full mt-1.5 py-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Apply Custom
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN DASHBOARD GRID (ROW 2) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* ══════════════════════════════════════════════════════════
            LEFT & CENTER COLUMN (9 Columns on xl)
            ══════════════════════════════════════════════════════════ */}
        <div className="xl:col-span-9 space-y-5">
          {/* 1. TOP 5 KPI STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {/* CARD 1: Total Donations */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Heart className="w-4.5 h-4.5 text-emerald-600 fill-emerald-600/20" />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{kpis.totalDonationsDelta}%</span>
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-500 font-medium">Total Donations</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5 tracking-tight">
                  {kpis.totalDonations.formatted}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">vs. last month</p>
              </div>
            </div>

            {/* CARD 2: Online Donations */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CreditCard className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{kpis.onlineDonationsDelta}%</span>
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-500 font-medium">Online Donations</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5 tracking-tight">
                  {kpis.onlineDonations.formatted}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{kpis.onlineDonationsShare}% of total</p>
              </div>
            </div>

            {/* CARD 3: Offline Donations */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users className="w-4.5 h-4.5 text-purple-600" />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{kpis.offlineDonationsDelta}%</span>
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-500 font-medium">Offline Donations</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5 tracking-tight">
                  {kpis.offlineDonations.formatted}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{kpis.offlineDonationsShare}% of total</p>
              </div>
            </div>

            {/* CARD 4: Pending Payments */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  <TrendingDown className="w-3 h-3" />
                  <span>{kpis.pendingPayments.delta}%</span>
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-500 font-medium">Pending Payments</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5 tracking-tight">
                  {kpis.pendingPayments.formatted}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{kpis.pendingPayments.count} transactions</p>
              </div>
            </div>

            {/* CARD 5: Receipts Issued */}
            <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <FileCheck2 className="w-4.5 h-4.5 text-teal-600" />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{kpis.receiptsIssued.delta}%</span>
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-500 font-medium">Receipts Issued</p>
                <h3 className="text-xl font-black text-slate-900 mt-0.5 tracking-tight">
                  {Number(kpis.receiptsIssued.count).toLocaleString("en-IN")}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{kpis.receiptsIssued.deliveryRate}% delivery rate</p>
              </div>
            </div>
          </div>

          {/* 2. MAIN CHARTS ROW (Donation Trend 60% + Donations by Category 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* DONATION TREND CHART CARD (Lg 7 columns) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Donation Trend</h3>
                  <p className="text-[11px] text-slate-400">Last 6 Months</p>
                </div>
                {/* Interval Selector */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {(["monthly", "weekly", "daily"] as const).map((int) => (
                    <button
                      key={int}
                      onClick={() => setTrendInterval(int)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition cursor-pointer ${
                        trendInterval === int
                          ? "bg-white text-emerald-700 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {int}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart + Embedded Summary Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-3">
                {/* Curve Chart (8 cols on md) */}
                <div className="md:col-span-8 h-[210px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trends.data}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 9, fill: "#94a3b8" }}
                        tickFormatter={(val) => {
                          if (val === 0) return "₹ 0";
                          if (val >= 100000) return `₹ ${Math.round(val / 100000)}L`;
                          return `₹ ${val / 1000}k`;
                        }}
                      />
                      <Tooltip content={<TrendTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#trendGradient)"
                        dot={{ r: 3.5, fill: "#10b981", stroke: "#ffffff", strokeWidth: 1.5 }}
                        activeDot={{ r: 5, fill: "#059669", stroke: "#ffffff", strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Right Summary Sidebar (4 cols on md) */}
                <div className="md:col-span-4 pl-0 md:pl-3 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Total Donations
                    </p>
                    <h4 className="text-xl font-black text-slate-900 mt-0.5">
                      {formatINR(trends.summary.total)}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span>+{trends.summary.growthPercentage}% from last month</span>
                    </span>
                  </div>

                  {/* Percentage Breakdown with Colored Dots */}
                  <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>Online</span>
                      </div>
                      <span className="font-bold text-slate-800">{trends.summary.breakdown.online}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-700" />
                        <span>Offline</span>
                      </div>
                      <span className="font-bold text-slate-800">{trends.summary.breakdown.offline}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>Corporate/Partner</span>
                      </div>
                      <span className="font-bold text-slate-800">{trends.summary.breakdown.corporate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span>Other</span>
                      </div>
                      <span className="font-bold text-slate-800">{trends.summary.breakdown.other}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DONATIONS BY CATEGORY DONUT CARD (Lg 5 columns) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Donations by Category</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-2">
                {/* Donut Chart with Center Total (6 cols on sm) */}
                <div className="sm:col-span-6 relative h-[190px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categories.categories}
                        dataKey="amount"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        stroke="#ffffff"
                        strokeWidth={2}
                      >
                        {categories.categories.map((entry, index) => (
                          <Cell key={`cat-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text inside Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[13px] font-black text-slate-900 tracking-tight leading-none">
                      {formatINR(categories.total)}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                      Total
                    </span>
                  </div>
                </div>

                {/* Legend List (6 cols on sm) */}
                <div className="sm:col-span-6 space-y-1.5 text-xs text-slate-600 pl-2">
                  {categories.categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="truncate text-[11px] font-medium text-slate-700">
                          {cat.name}
                        </span>
                      </div>
                      <span className="font-bold text-[11px] text-slate-900 ml-2">
                        {cat.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. LOWER SECTION (Recent Transactions 55% + Expense Summary 45%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* RECENT TRANSACTIONS TABLE (Lg 7 columns) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
                  <Link
                    to="/finance/transactions"
                    className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-2.5 font-bold">Date</th>
                        <th className="py-2.5 font-bold">Donor Name</th>
                        <th className="py-2.5 font-bold">Amount</th>
                        <th className="py-2.5 font-bold">Payment Method</th>
                        <th className="py-2.5 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                            No donations recorded in this period.
                          </td>
                        </tr>
                      ) : (
                        transactions.slice(0, 5).map((tx, idx) => (
                        <tr key={tx.id || idx} className="hover:bg-slate-50/70 transition">
                          <td className="py-2.5 text-[11px] text-slate-500 font-medium whitespace-nowrap">
                            {tx.date}
                          </td>
                          <td className="py-2.5 font-semibold text-slate-800 text-[11px]">
                            {tx.donorName}
                          </td>
                          <td className="py-2.5 font-bold text-slate-900 text-[11px]">
                            {tx.formattedAmount || formatINR(tx.amount)}
                          </td>
                          <td className="py-2.5 text-[11px] text-slate-600">
                            <span className="inline-flex items-center gap-1.5">
                              {tx.paymentMethod.toLowerCase().includes("upi") ? (
                                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                              ) : tx.paymentMethod.toLowerCase().includes("razor") ? (
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                              )}
                              <span>{tx.paymentMethod}</span>
                            </span>
                          </td>
                          <td className="py-2.5 text-right">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                tx.status === "Success"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                  : "bg-amber-50 text-amber-700 border border-amber-200/50"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  </table>
                </div>
              </div>

              {/* Table Bottom Link */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <Link
                  to="/finance/transactions"
                  className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] inline-flex items-center gap-1"
                >
                  <span>View All Transactions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* EXPENSE SUMMARY & MONTHLY FINANCIAL SUMMARY (Lg 5 columns) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
              {/* Expense Donut Section */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Expense Summary</h3>
                  <Link
                    to="/finance/expenses"
                    className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-2">
                  {/* Expense Donut (6 cols on sm) */}
                  <div className="sm:col-span-6 relative h-[140px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenses.categories}
                          dataKey="amount"
                          nameKey="head"
                          innerRadius={38}
                          outerRadius={58}
                          paddingAngle={3}
                          stroke="#ffffff"
                          strokeWidth={2}
                        >
                          {expenses.categories.map((entry, index) => (
                            <Cell key={`exp-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                      <span className="text-xs font-black text-slate-900 tracking-tight leading-none">
                        {expenses.formattedTotal}
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                        Total Expenses
                      </span>
                    </div>
                  </div>

                  {/* Expense Legend (6 cols on sm) */}
                  <div className="sm:col-span-6 space-y-1 text-xs text-slate-600">
                    {expenses.categories.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="truncate text-[10px] font-medium text-slate-700">
                            {item.head}
                          </span>
                        </div>
                        <span className="font-bold text-[10px] text-slate-900 ml-1">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Financial Summary 3-Column Card */}
              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Monthly Financial Summary
                </p>
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Income</p>
                    <p className="text-xs font-black text-slate-900 mt-0.5">
                      {monthly.formattedIncome}
                    </p>
                    <span className="text-[9px] font-bold text-emerald-600 inline-flex items-center">
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                      +{monthly.incomeDelta}%
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Expenses</p>
                    <p className="text-xs font-black text-slate-900 mt-0.5">
                      {monthly.formattedExpenses}
                    </p>
                    <span className="text-[9px] font-bold text-emerald-600 inline-flex items-center">
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                      +{monthly.expenseDelta}%
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Net Balance</p>
                    <p className="text-xs font-black text-slate-600 mt-0.5">
                      {monthly.formattedNetBalance}
                    </p>
                    <span className="text-[9px] font-semibold text-slate-400">Surplus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. FOOTER QUICK SHORTCUTS & BRAND TRUST CARD */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 pt-2">
            {/* Shortcut 1: Financial Reports */}
            <Link
              to="/finance/reports"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-xs transition group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-700 flex items-center justify-center transition mb-2">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-900">Financial Reports</p>
              <p className="text-[10px] text-slate-400 mt-0.5">View detailed reports</p>
            </Link>

            {/* Shortcut 2: Reconciliation */}
            <Link
              to="/finance/reconciliation"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-xs transition group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-700 flex items-center justify-center transition mb-2">
                <Building2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-900">Reconciliation</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Bank &amp; payment reconciliation</p>
            </Link>

            {/* Shortcut 3: Budget Management */}
            <Link
              to="/finance/budgets"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-xs transition group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-700 flex items-center justify-center transition mb-2">
                <PieIcon className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-900">Budget Management</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Track budget vs actual</p>
            </Link>

            {/* Shortcut 4: Donor Recognition */}
            <Link
              to="/finance/receipts"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-xs transition group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-700 flex items-center justify-center transition mb-2">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-900">Donor Recognition</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Manage donor acknowledgements</p>
            </Link>

            {/* Brand Trust Card */}
            <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-slate-50 to-orange-50/30 rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#071527] text-[#f97316] flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#071527]">Transparency Builds Trust</p>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-tight">
                  Every contribution makes a difference.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            RIGHT SIDEBAR COLUMN (3 Columns on xl)
            Quick Actions Panel + Recent Activity Feed
            ══════════════════════════════════════════════════════════ */}
        <div className="xl:col-span-3 space-y-5">
          {/* 1. QUICK ACTIONS CARD (2x2 Grid) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Action 1: Record Donation */}
              <button
                onClick={() => setIsRecordDonationOpen(true)}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white hover:bg-orange-50/40 text-[#071527] border border-slate-200 hover:border-[#f97316] transition cursor-pointer group text-center space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                  <Heart className="w-4.5 h-4.5 fill-white" />
                </div>
                <span className="text-[11px] font-bold leading-tight">Record Donation</span>
              </button>

              {/* Action 2: Issue Receipt */}
              <button
                onClick={() => setIsIssueReceiptOpen(true)}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#eff6ff] hover:bg-[#dbeafe] text-blue-900 border border-blue-200/50 transition cursor-pointer group text-center space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold leading-tight">Issue Receipt</span>
              </button>

              {/* Action 3: Add Expense */}
              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#f5f3ff] hover:bg-[#ede9fe] text-purple-900 border border-purple-200/50 transition cursor-pointer group text-center space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                  <Receipt className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold leading-tight">Add Expense</span>
              </button>

              {/* Action 4: Reconcile Payments */}
              <button
                onClick={() => navigate("/finance/reconciliation")}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#fffbeb] hover:bg-[#fef3c7] text-amber-900 border border-amber-200/50 transition cursor-pointer group text-center space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                  <RefreshCw className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold leading-tight">Reconcile Payments</span>
              </button>
            </div>
          </div>

          {/* 2. RECENT ACTIVITY FEED */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              <Link
                to="/finance/transactions"
                className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Timeline List */}
            <div className="space-y-3.5">
              {activities.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No recent activities recorded.
                </div>
              ) : (
                activities.map((act) => {
                // Color map
                const iconBg =
                  act.color === "emerald"
                    ? "bg-emerald-50 text-emerald-600"
                    : act.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : act.color === "purple"
                    ? "bg-purple-50 text-purple-600"
                    : act.color === "amber"
                    ? "bg-amber-50 text-amber-600"
                    : act.color === "teal"
                    ? "bg-teal-50 text-teal-600"
                    : "bg-rose-50 text-rose-600";

                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
                    >
                      {act.icon === "heart" ? (
                        <Heart className="w-4 h-4 fill-emerald-600/30" />
                      ) : act.icon === "card" ? (
                        <CreditCard className="w-4 h-4" />
                      ) : act.icon === "receipt" ? (
                        <FileCheck2 className="w-4 h-4" />
                      ) : act.icon === "expense" ? (
                        <Receipt className="w-4 h-4" />
                      ) : act.icon === "sync" ? (
                        <RefreshCw className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                        {act.subtitle}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{act.timeAgo}</p>
                    </div>
                  </div>
                );
              }))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          INTERACTIVE QUICK ACTION MODALS
          ══════════════════════════════════════════════════════════ */}

      {/* MODAL 1: RECORD DONATION */}
      {isRecordDonationOpen && (
        <RecordDonationModal
          onClose={() => setIsRecordDonationOpen(false)}
          onSuccess={() => {
            setIsRecordDonationOpen(false);
            loadDashboard();
          }}
        />
      )}

      {/* MODAL 2: ADD EXPENSE */}
      {isAddExpenseOpen && (
        <AddExpenseModal
          onClose={() => setIsAddExpenseOpen(false)}
          onSuccess={() => {
            setIsAddExpenseOpen(false);
            loadDashboard();
          }}
        />
      )}

      {/* MODAL 3: ISSUE RECEIPT */}
      {isIssueReceiptOpen && (
        <IssueReceiptModal onClose={() => setIsIssueReceiptOpen(false)} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RECORD DONATION MODAL COMPONENT
// ─────────────────────────────────────────────────────────────
function RecordDonationModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    pan: "",
    amount: "",
    paymentMode: "UPI",
    financialType: "General Donation",
    workAreaId: "HLT",
    taxExemption: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.donorName || !formData.amount) {
      toast.error("Please fill in donor name and amount");
      return;
    }

    setSubmitting(true);
    try {
      await financeApi.recordManualDonation({
        donorName: formData.donorName,
        email: formData.email || "donor@example.org",
        phone: formData.phone || "9876543210",
        pan: formData.pan || undefined,
        amount: Number(formData.amount),
        paymentMode: formData.paymentMode,
        financialType: formData.financialType,
        workAreaId: formData.workAreaId,
      });

      toast.success("Donation recorded and ledger entry posted successfully!");
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to record donation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 fill-teal-600/30" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Offline Donation</h3>
              <p className="text-[11px] text-slate-500">Atomic 80G receipt + append-only ledger entry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Donor Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ayesha Khan"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Amount (₹) *</label>
              <input
                type="number"
                required
                min={1}
                placeholder="e.g. 50000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Donor Email</label>
              <input
                type="email"
                placeholder="ayesha@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Phone Number</label>
              <input
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Payment Mode</label>
              <select
                value={formData.paymentMode}
                onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="UPI">Direct UPI</option>
                <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online Gateway</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Work Area / Cause</label>
              <select
                value={formData.workAreaId}
                onChange={(e) => setFormData({ ...formData, workAreaId: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
              <label className="text-[11px] font-bold text-slate-700">Donor PAN (for 80G)</label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Category Tag</label>
              <input
                type="text"
                value={formData.financialType}
                onChange={(e) => setFormData({ ...formData, financialType: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
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
              <span>Save &amp; Generate Receipt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADD EXPENSE MODAL COMPONENT
// ─────────────────────────────────────────────────────────────
function AddExpenseModal({
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
    payeeName: "",
    payeePan: "",
    invoiceRef: "",
    description: "",
    paymentMethod: "Bank Transfer",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.payeeName || !formData.description) {
      toast.error("Please fill in required expense fields");
      return;
    }

    setSubmitting(true);
    try {
      await financeApi.addExpense({
        date: formData.date,
        amount: Number(formData.amount),
        head: formData.head,
        workAreaId: formData.workAreaId,
        payeeName: formData.payeeName,
        payeePan: formData.payeePan || undefined,
        invoiceRef: formData.invoiceRef || undefined,
        description: formData.description,
        paymentMethod: formData.paymentMethod,
      });

      toast.success("Expense voucher recorded and posted to ledger!");
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to record expense");
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
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Expense Voucher</h3>
              <p className="text-[11px] text-slate-500">Dual-entry ledger debited to SBI primary account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700">Expense Date *</label>
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
                placeholder="e.g. 12500"
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
              <label className="text-[11px] font-bold text-slate-700">Work Area Allocation</label>
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
                placeholder="e.g. MedPlus Pharmacy"
                value={formData.payeeName}
                onChange={(e) => setFormData({ ...formData, payeeName: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700">Invoice / Bill Ref</label>
              <input
                type="text"
                placeholder="INV-2025-089"
                value={formData.invoiceRef}
                onChange={(e) => setFormData({ ...formData, invoiceRef: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700">Description / Purpose *</label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Emergency medical supplies and oxygen cylinders"
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
              <span>Post Expense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ISSUE RECEIPT MODAL COMPONENT
// ─────────────────────────────────────────────────────────────
function IssueReceiptModal({ onClose }: { onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">80G Receipt Issuance</h3>
              <p className="text-[11px] text-slate-500">Search transactions to generate or re-send</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Donor Name, Email, or Receipt #"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-800">Quick Receipt Actions</p>
            <p className="text-[11px] text-slate-500">
              Receipts are issued automatically upon confirmed payment capture. You can also view and download batch 80G certificates in the Receipts Register.
            </p>
            <Link
              to="/finance/receipts"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 mt-1"
            >
              <span>Go to Receipts Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
