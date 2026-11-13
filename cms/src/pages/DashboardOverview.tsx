import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Users,
  UserCheck,
  ClipboardList,
  FileText,
  Landmark,
  Coins,
  Wallet,
  Scale,
  PlusCircle,
  UserPlus,
  CheckSquare,
  FolderPlus,
  Receipt,
  Send,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
  Info,
  Calendar,
  Sparkles,
  Award,
  Globe,
  Briefcase,
  FileCheck2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { api } from "../services/api";
import { financeApi } from "../services/financeApi";

// Vector Sparkline curve matching the KPI card design
function Sparkline({ color = "#0d9488" }: { color?: string }) {
  return (
    <svg className="w-16 h-7 overflow-visible" viewBox="0 0 60 20" fill="none">
      <path
        d="M 2 16 Q 16 6, 30 13 T 58 4"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DashboardOverview() {
  const navigate = useNavigate();

  // Live Database stats & live finance data
  const [dbStats, setDbStats] = useState<any>(null);
  const [financeData, setFinanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [stats, fin] = await Promise.all([
          api.getDashboardStats({ force: true }),
          financeApi.getFinancialDashboardOverview({}),
        ]);
        if (stats) setDbStats(stats);
        if (fin?.success && fin.data) setFinanceData(fin.data);
      } catch (e) {
        console.error("Dashboard overview load error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 1. Live 6-Month Donation Trends from DB
  const donationOverviewData = financeData?.donationTrends?.data?.map((d: any) => ({
    month: d.label,
    donations: d.total || 0,
    expenses: 0,
  })) || [
    { month: "Jun", donations: 0, expenses: 0 },
    { month: "Jul", donations: 0, expenses: 0 },
    { month: "Aug", donations: 0, expenses: 0 },
    { month: "Sep", donations: 0, expenses: 0 },
    { month: "Oct", donations: 0, expenses: 0 },
    { month: "Nov", donations: financeData?.kpis?.totalDonations?.amount || 0, expenses: 0 },
  ];

  // 2. Live Donations by Category from DB
  const rawCategories = financeData?.donationsByCategory?.categories || [];
  const categoryData = rawCategories.length > 0
    ? rawCategories.filter((c: any) => c.amount > 0)
    : [
        { name: "General Fund", percentage: 100, amount: 0, color: "#10b981" },
      ];
  const totalCategoryAmount = financeData?.donationsByCategory?.total ?? (financeData?.kpis?.totalDonations?.amount ?? (dbStats?.totalDonations ?? 0));

  // 3. Live Financial Trend from DB
  const financialTrendData = financeData?.donationTrends?.data?.map((d: any) => ({
    month: d.label,
    income: d.total || 0,
    expenses: 0,
  })) || [
    { month: "Jun", income: 0, expenses: 0 },
    { month: "Jul", income: 0, expenses: 0 },
    { month: "Aug", income: 0, expenses: 0 },
    { month: "Sep", income: 0, expenses: 0 },
    { month: "Oct", income: 0, expenses: 0 },
    { month: "Nov", income: financeData?.kpis?.totalDonations?.amount || 0, expenses: 0 },
  ];

  return (
    <div className="space-y-4 max-w-[1650px] mx-auto pb-12 font-sans select-none">
      {/* ═════════════════════════════════════════════════════════════
          1. HERO BANNER: Welcome to ISLAH Control Center
          ═════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#eff9f6] via-[#e6f4fb] to-[#dcf0f8] border border-[#cce6f5] p-5 md:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Side: Logo + Title + Taglines */}
        <div className="flex items-start md:items-center gap-4 z-10 max-w-2xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/90 border border-emerald-500/20 shadow-xs flex items-center justify-center p-2 shrink-0">
            <img
              src="/islah_logo.png"
              alt="ISLAH"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
              Welcome to ISLAH Control Center
            </h1>
            <p className="text-xs font-semibold text-slate-600">
              Empowering Communities • Creating Opportunities • Building a Better Tomorrow
            </p>
            <p className="text-xs text-slate-700 italic font-serif pt-0.5">
              &ldquo;Together we build stronger communities, create opportunities and bring lasting change.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Side: Plant Artwork + Cursive "Small Actions Big Impact" */}
        <div className="relative z-10 flex items-center gap-4 shrink-0 self-end md:self-center pr-2">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src="/hero_seedling.png"
              alt="Nurturing Growth"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="text-right font-serif">
            <p className="text-xl md:text-2xl italic font-black text-[#004724] tracking-tight leading-tight">
              Small Actions
            </p>
            <p className="text-xl md:text-2xl italic font-black text-[#004724] tracking-tight leading-tight">
              Big Impact
            </p>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. TOP KPI CARDS (6-CARD GRID)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Card 1: Total Donations */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#f97316] border border-orange-200/50 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-[#f97316]" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Total Donations</span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{financeData?.kpis?.totalDonations?.formatted || (dbStats?.totalDonations != null ? "₹ " + Number(dbStats.totalDonations).toLocaleString("en-IN") : "₹ 0")}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-emerald-600">↑ 12%</span>
              <Sparkline color="#f97316" />
            </div>
          </div>
        </div>

        {/* Card 2: Active Members */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/50 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Active Members</span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{dbStats?.totalMembers ? dbStats.totalMembers.toLocaleString("en-IN") : "12"}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-emerald-600">↑ 8%</span>
              <Sparkline color="#2563eb" />
            </div>
          </div>
        </div>

        {/* Card 3: Active Volunteers */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 border border-purple-200/50 flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Active Volunteers</span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{dbStats?.pendingVolunteers ? dbStats.pendingVolunteers : (dbStats?.settings?.impact_stats?.volunteersCount || "500+")}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-emerald-600">↑ 15%</span>
              <Sparkline color="#9333ea" />
            </div>
          </div>
        </div>

        {/* Card 4: Ongoing Programmes */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Ongoing Programmes</span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{dbStats?.settings?.homepage_stats?.activePrograms || "12"}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] font-medium text-slate-400">3 completed</span>
              <Sparkline color="#0284c7" />
            </div>
          </div>
        </div>

        {/* Card 5: Pending Approvals */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200/50 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Pending Approvals</span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{dbStats?.totalApplications ?? 0}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] font-bold text-rose-600">Requires attention</span>
              <Sparkline color="#f97316" />
            </div>
          </div>
        </div>

        {/* Card 6: Available Balance */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-200/50 flex items-center justify-center shrink-0">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Available Balance</span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{financeData?.monthlyFinancialSummary?.formattedNetBalance || (financeData?.kpis?.totalDonations?.formatted || (dbStats?.totalDonations != null ? "₹ " + Number(dbStats.totalDonations).toLocaleString("en-IN") : "₹ 0"))}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] font-medium text-emerald-600">Reconciled</span>
              <Sparkline color="#06b6d4" />
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. MIDDLE ROW 1: (4 COLUMNS: 3 CHARTS + QUICK ACTIONS)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Col 1: Donation Overview (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-bold text-slate-900">Donation Overview</h3>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 text-xs text-slate-600 bg-slate-50 cursor-pointer">
              <span>Last 6 Months</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span>Donations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Expenses</span>
            </div>
          </div>

          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donationOverviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val / 100000}L`}
                />
                <Tooltip
                  formatter={(value: any) => [`₹ ${Number(value).toLocaleString("en-IN")}`, ""]}
                  contentStyle={{ backgroundColor: "#071527", borderColor: "#1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
                />
                <Area type="monotone" dataKey="donations" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDonations)" />
                <Area type="monotone" dataKey="expenses" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Col 2: Financial Summary (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900 pb-2">Financial Summary</h3>

          <div className="grid grid-cols-3 gap-2 text-center my-auto">
            {/* Total Income */}
            <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 flex flex-col items-center justify-center">
              <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center mb-1.5 shadow-2xs">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Total Income</span>
              <p className="text-xs font-black text-slate-900 mt-0.5">{financeData?.monthlyFinancialSummary?.formattedIncome || (financeData?.kpis?.totalDonations?.formatted || (dbStats?.totalDonations != null ? "₹ " + Number(dbStats.totalDonations).toLocaleString("en-IN") : "₹ 0"))}</p>
              <span className="text-[10px] font-bold text-emerald-600 mt-0.5">↑ 12%</span>
            </div>

            {/* Total Expenses */}
            <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-100 flex flex-col items-center justify-center">
              <div className="w-7 h-7 rounded-md bg-rose-600 text-white flex items-center justify-center mb-1.5 shadow-2xs">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Total Expenses</span>
              <p className="text-xs font-black text-slate-900 mt-0.5">{financeData?.monthlyFinancialSummary?.formattedExpenses || "₹ 0"}</p>
              <span className="text-[10px] font-bold text-rose-600 mt-0.5">↑ 8%</span>
            </div>

            {/* Net Balance */}
            <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 flex flex-col items-center justify-center">
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center mb-1.5 shadow-2xs">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Net Balance</span>
              <p className="text-xs font-black text-slate-900 mt-0.5">{financeData?.monthlyFinancialSummary?.formattedNetBalance || (financeData?.kpis?.totalDonations?.formatted || (dbStats?.totalDonations != null ? "₹ " + Number(dbStats.totalDonations).toLocaleString("en-IN") : "₹ 0"))}</p>
              <span className="text-[10px] font-bold text-blue-600 mt-0.5">Surplus</span>
            </div>
          </div>

          <div className="mt-3 bg-blue-50/70 border border-blue-200/60 rounded-md p-2 flex items-center gap-1.5 text-[11px] text-blue-800 font-medium">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Figures are for current financial year (2026-27)</span>
          </div>
        </div>

        {/* Col 3: Donations by Category (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900 pb-2">Donations by Category</h3>

          <div className="grid grid-cols-12 gap-2 items-center my-auto">
            {/* Donut Chart (6 cols) */}
            <div className="col-span-6 relative h-[140px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="percentage"
                    nameKey="name"
                    innerRadius={38}
                    outerRadius={58}
                    paddingAngle={2}
                    stroke="#ffffff"
                    strokeWidth={2}
                  >
                    {categoryData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-xs font-black text-slate-900 leading-tight">₹ {Number(totalCategoryAmount).toLocaleString("en-IN")}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Total</span>
              </div>
            </div>

            {/* Legend List (6 cols) */}
            <div className="col-span-6 space-y-1 text-xs text-slate-600">
              {categoryData.map((cat: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="truncate text-slate-700">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 ml-1">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 4: Quick Actions (2 cols on lg) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
            <Link to="/finance" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 my-auto">
            {/* Add Donation */}
            <Link
              to="/finance"
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add Donation</span>
            </Link>

            {/* Add Member */}
            <Link
              to="/membership"
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <UserPlus className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add Member</span>
            </Link>

            {/* Review Applications */}
            <Link
              to="/applications"
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <CheckSquare className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Review Apps</span>
            </Link>

            {/* Create Programme */}
            <Link
              to="/programmes"
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <FolderPlus className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Create Prog</span>
            </Link>

            {/* Record Expense */}
            <Link
              to="/finance/expenses"
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Receipt className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Record Expense</span>
            </Link>

            {/* Publish Update */}
            <Link
              to="/news"
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Send className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Publish Update</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          4. MIDDLE ROW 2: (4 COLUMNS: PENDING, PROGRAMMES, TREND, ACTIVITY)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Col 1: Pending Approvals (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Pending Approvals</h3>
            <Link to="/applications" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5 my-2">
            {/* Item 1: Membership Applications */}
            <Link to="/applications" className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Membership Applications</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                8
              </span>
            </Link>

            {/* Item 2: Volunteer Applications */}
            <Link to="/volunteers/applications" className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Volunteer Applications</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                5
              </span>
            </Link>

            {/* Item 3: Partner & Sponsor Enquiries */}
            <Link to="/partners/enquiries" className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Partner &amp; Sponsor Enquiries</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                4
              </span>
            </Link>

            {/* Item 4: Content for Publication */}
            <Link to="/news" className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Content for Publication</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                6
              </span>
            </Link>

            {/* Item 5: Expense Approvals */}
            <Link to="/finance/expenses" className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Expense Approvals</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                3
              </span>
            </Link>
          </div>
        </div>

        {/* Col 2: Programmes & Impact (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Programmes &amp; Impact</h3>
            <Link to="/programmes" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5 my-2">
            {/* 1. Education & Learning */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Education &amp; Learning</span>
                <span className="font-bold text-slate-900">78%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full" style={{ width: "78%" }} />
              </div>
            </div>

            {/* 2. Healthcare & Well-being */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Healthcare &amp; Well-being</span>
                <span className="font-bold text-slate-900">62%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "62%" }} />
              </div>
            </div>

            {/* 3. Women & Youth Empowerment */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Women &amp; Youth Empowerment</span>
                <span className="font-bold text-slate-900">54%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: "54%" }} />
              </div>
            </div>

            {/* 4. Skills, Livelihoods & Entrepreneurship */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Skills, Livelihoods &amp; Entrepreneurship</span>
                <span className="font-bold text-slate-900">71%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: "71%" }} />
              </div>
            </div>

            {/* 5. Social Justice & Legal Empowerment */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Social Justice &amp; Legal Empowerment</span>
                <span className="font-bold text-slate-900">68%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: "68%" }} />
              </div>
            </div>

            {/* 6. Environment & Sustainable Development */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Environment &amp; Sustainable Development</span>
                <span className="font-bold text-slate-900">37%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-lime-600 h-full rounded-full" style={{ width: "37%" }} />
              </div>
            </div>

            {/* 7. Humanitarian Relief & Rehabilitation */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Humanitarian Relief &amp; Rehabilitation</span>
                <span className="font-bold text-slate-900">63%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: "63%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Financial Trend (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-bold text-slate-900">Financial Trend</h3>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-slate-200 text-xs text-slate-600 bg-slate-50 cursor-pointer">
              <span>This Year</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-600" />
              <span>Income</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#071527]" />
              <span>Expenses</span>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val / 100000}L`}
                />
                <Tooltip
                  formatter={(value: any) => [`₹ ${Number(value).toLocaleString("en-IN")}`, ""]}
                  contentStyle={{ backgroundColor: "#071527", borderColor: "#1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
                />
                <Bar dataKey="income" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#071527" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Col 4: Recent Activity Timeline (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
            <Link to="/finance" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3.5 my-2">
            {/* Act 1 */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-3 h-3 fill-[#f97316]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-tight">Donation received</p>
                <p className="text-[11px] text-slate-600 truncate">₹25,000 from Sarah Johnson</p>
                <p className="text-[10px] text-slate-400">2 hours ago</p>
              </div>
            </div>

            {/* Act 2 */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-tight">Membership application</p>
                <p className="text-[11px] text-slate-600 truncate">Pending approval - Ahmed Raza</p>
                <p className="text-[10px] text-slate-400">3 hours ago</p>
              </div>
            </div>

            {/* Act 3 */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-tight">Programme updated</p>
                <p className="text-[11px] text-slate-600 truncate">Education for All - Phase 2</p>
                <p className="text-[10px] text-slate-400">4 hours ago</p>
              </div>
            </div>

            {/* Act 4 */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                <UserCheck className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-tight">New volunteer registered</p>
                <p className="text-[11px] text-slate-600 truncate">Ayesha Fatima</p>
                <p className="text-[10px] text-slate-400">6 hours ago</p>
              </div>
            </div>

            {/* Act 5 */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Receipt className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-tight">Expense approved</p>
                <p className="text-[11px] text-slate-600 truncate">Office Supplies - ₹12,000</p>
                <p className="text-[10px] text-slate-400">7 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          5. BOTTOM ROW: RECENT DONATIONS & LIVE ANNOUNCEMENTS
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Col 1: Recent Verified Donations (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Verified Donations</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Live incoming transactions from payment gateway &amp; direct deposits</p>
            </div>
            <Link to="/finance/transactions" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto my-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Donor Name</th>
                  <th className="py-2.5">Amount</th>
                  <th className="py-2.5">Method</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {financeData?.recentTransactions && financeData.recentTransactions.length > 0 ? (
                  financeData.recentTransactions.slice(0, 6).map((tx: any) => (
                    <tr key={tx.id || tx.receiptNo} className="hover:bg-slate-50/70 transition">
                      <td className="py-2.5 text-slate-500 font-medium">{tx.date}</td>
                      <td className="py-2.5 font-bold text-slate-800">{tx.donorName}</td>
                      <td className="py-2.5 font-black text-slate-900 font-mono">{tx.formattedAmount || `₹${Number(tx.amount).toLocaleString('en-IN')}`}</td>
                      <td className="py-2.5 text-slate-600">{tx.paymentMethod}</td>
                      <td className="py-2.5 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          tx.status === "Success" || tx.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                      No recent donations recorded in database
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 2: Recent News & Events (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Events &amp; News</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Published bulletins &amp; activities</p>
            </div>
            <Link to="/news" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5 my-auto pt-2">
            {dbStats?.recentNews && dbStats.recentNews.length > 0 ? (
              dbStats.recentNews.slice(0, 4).map((item: any, idx: number) => (
                <div key={item._id || idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f97316] flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {item.category || "General"} • {item.date ? new Date(item.date).toLocaleDateString("en-IN") : "Recent"}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 ml-2">
                    Published
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-600">No events or news published</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Publish articles in the Website &amp; CMS manager.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
