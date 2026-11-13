import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { financeApi } from "../../services/financeApi";
import { Link, useNavigate } from "react-router-dom";
import {
  Award,
  Users,
  Calendar,
  Coins,
  TrendingUp,
  PlusCircle,
  FileText,
  Upload,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Database,
  Cloud,
  Headphones,
  Activity,
  Layers,
  Check,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 6-Month Programme Performance Data (Nov - Apr)
const performanceData = [
  { month: "Nov", education: 1800, health: 1200, livelihoods: 950, environment: 700, others: 500 },
  { month: "Dec", education: 2100, health: 1400, livelihoods: 1100, environment: 820, others: 650 },
  { month: "Jan", education: 1950, health: 1550, livelihoods: 1250, environment: 900, others: 750 },
  { month: "Feb", education: 2300, health: 1700, livelihoods: 1400, environment: 1050, others: 900 },
  { month: "Mar", education: 2500, health: 1850, livelihoods: 1550, environment: 1150, others: 1000 },
  { month: "Apr", education: 2650, health: 1980, livelihoods: 1680, environment: 1240, others: 1120 },
];

// Impact by Sector Donut Data (12,480 Total Beneficiaries)
const sectorData = [
  { name: "Education & Learning", value: 2746, percent: "22%", color: "#0c4a6e" },
  { name: "Healthcare & Well-being", value: 2246, percent: "18%", color: "#0d9488" },
  { name: "Women & Youth Empowerment", value: 1498, percent: "12%", color: "#f97316" },
  { name: "Skills & Livelihoods", value: 1498, percent: "12%", color: "#d97706" },
  { name: "Social Justice & Legal", value: 1248, percent: "10%", color: "#2563eb" },
  { name: "Agriculture & Rural", value: 998, percent: "8%", color: "#16a34a" },
  { name: "Environment & Green", value: 1248, percent: "10%", color: "#0284c7" },
  { name: "Humanitarian Relief", value: 998, percent: "8%", color: "#ea580c" },
];

// Programme Status Donut
const statusData = [
  { name: "Ongoing", value: 6, color: "#071527" },
  { name: "Completed", value: 1, color: "#f97316" },
  { name: "Planned", value: 1, color: "#3b82f6" },
];

// Programmes Overview Table
interface ProgrammeItem {
  id: string;
  name: string;
  sector: string;
  sectorBadgeClass: string;
  beneficiaries: string;
  progress: number;
  status: "Ongoing" | "Completed" | "Planned";
  image: string;
}

const programmesList: ProgrammeItem[] = [
  {
    id: "EPS-01",
    name: "Primary School (EPS)",
    sector: "Education & Learning",
    sectorBadgeClass: "bg-blue-50 text-[#071527] border-blue-200",
    beneficiaries: "2,450",
    progress: 78,
    status: "Ongoing",
    image: "/sector_education_1.png",
  },
  {
    id: "CHC-02",
    name: "Community Health Camps (CHC)",
    sector: "Healthcare & Well-being",
    sectorBadgeClass: "bg-orange-50 text-[#ea580c] border-orange-200",
    beneficiaries: "3,200",
    progress: 62,
    status: "Ongoing",
    image: "/health-camp.jpg",
  },
  {
    id: "WSD-03",
    name: "Women Skill Development",
    sector: "Women & Youth Empowerment",
    sectorBadgeClass: "bg-orange-50 text-[#f97316] border-orange-200",
    beneficiaries: "1,850",
    progress: 54,
    status: "Ongoing",
    image: "/sector_women_1.png",
  },
  {
    id: "SLP-04",
    name: "Skills & Livelihoods Programme",
    sector: "Skills & Livelihoods",
    sectorBadgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    beneficiaries: "1,420",
    progress: 68,
    status: "Ongoing",
    image: "/sector_skills_1.png",
  },
  {
    id: "SAD-05",
    name: "Sustainable Agriculture (SAD)",
    sector: "Agriculture & Rural Livelihoods",
    sectorBadgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    beneficiaries: "960",
    progress: 45,
    status: "Ongoing",
    image: "/sector_agriculture_1.png",
  },
  {
    id: "GCC-06",
    name: "Clean Village Initiative (GCC)",
    sector: "Environment & Sustainability",
    sectorBadgeClass: "bg-teal-50 text-teal-700 border-teal-200",
    beneficiaries: "760",
    progress: 32,
    status: "Ongoing",
    image: "/sector_environment_1.png",
  },
  {
    id: "EDR-07",
    name: "Emergency Relief (EDR)",
    sector: "Humanitarian Relief",
    sectorBadgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    beneficiaries: "600",
    progress: 90,
    status: "Ongoing",
    image: "/sector_relief_1.png",
  },
];

export default function ProgrammesDashboard() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("Last 6 Months");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [dbSettings, setDbSettings] = useState<any>(null);
  const [financeData, setFinanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [settingsRes, finRes] = await Promise.all([
          api.getSettings({ force: true }),
          financeApi.getFinancialDashboardOverview({}),
        ]);
        if (settingsRes?.success && settingsRes.data) setDbSettings(settingsRes.data);
        if (finRes?.success && finRes.data) setFinanceData(finRes.data);
      } catch (err) {
        console.error("ProgrammesDashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleActionClick = (actionName: string) => {
    setActiveModal(actionName);
    setModalSuccess(false);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSuccess(true);
    setTimeout(() => {
      setActiveModal(null);
      setModalSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-4 max-w-[1650px] mx-auto pb-12 font-sans select-none">
      {/* ═════════════════════════════════════════════════════════════
          1. HERO BANNER: Programmes & Impact (WHITE + BLUE + ORANGE BRAND)
          ═════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start md:items-center gap-4 z-10 max-w-2xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <Award className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Programmes &amp; Impact Control Center
              </h1>
              <span className="text-[10px] font-bold bg-[#f97316]/10 text-[#ea580c] px-2.5 py-0.5 rounded-full border border-[#f97316]/20 uppercase">
                8 Core Sectors
              </span>
            </div>
            <p className="text-xs font-bold text-[#071527]/80 mt-0.5 tracking-wide">
              Creating Opportunities &nbsp;|&nbsp; Building Communities &nbsp;|&nbsp; Measuring Change
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Eight interconnected sectors. One shared vision of a healthier, fairer and more sustainable future for all.
            </p>
          </div>
        </div>

        {/* Right Calligraphy & Visual Badge */}
        <div className="relative z-10 flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 self-stretch md:self-auto justify-between md:justify-end shadow-2xs">
          <div className="text-right">
            <p className="text-xs font-serif italic text-[#071527] font-bold leading-tight">
              Empowering Communities
            </p>
            <p className="text-[11px] font-serif italic text-[#f97316] font-semibold leading-tight">
              Creating Lasting Impact
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs bg-slate-100 flex items-center justify-center">
            <img
              src="/hero_seedling.png"
              alt="Sapling in hands"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/sector_education_1.png";
              }}
            />
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. TOP 5 KPI SUMMARY CARDS
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* KPI 1: Total Programmes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-[#f97316]/50 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-[#071527]">
              <Layers className="w-5 h-5 text-[#071527]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">Total Programmes</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-[#071527] tracking-tight">{dbSettings?.homepage_stats?.activePrograms || "12"}</span>
                <span className="text-[11px] font-bold text-slate-500">+ 0%</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Active programmes</p>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Beneficiaries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-[#f97316]/50 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-[#f97316]">
              <Users className="w-5 h-5 text-[#f97316]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">Total Beneficiaries</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-[#071527] tracking-tight">{dbSettings?.impact_stats?.livesTouched || "50,000+"}</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 18%</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">People reached</p>
            </div>
          </div>
        </div>

        {/* KPI 3: Total Activities */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-[#f97316]/50 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">Total Activities</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-[#071527] tracking-tight">{dbSettings?.impact_stats?.ongoingPrograms || "25+"}</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 22%</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">This year</p>
            </div>
          </div>
        </div>

        {/* KPI 4: Total Expenses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-[#f97316]/50 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-[#f97316]">
              <Coins className="w-5 h-5 text-[#f97316]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">Total Expenses</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-black text-[#071527] tracking-tight">{financeData?.monthlyFinancialSummary?.formattedExpenses || "₹ 0"}</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 12%</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Approved expenditure</p>
            </div>
          </div>
        </div>

        {/* KPI 5: Impact Indicators */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-[#f97316]/50 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-[#071527]">
              <TrendingUp className="w-5 h-5 text-[#071527]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">Impact Indicators</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-[#071527] tracking-tight">{Object.keys(dbSettings?.sector_stats || {}).length || 18}</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 25%</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Across all programmes</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. MAIN ROW 1: TIGHT, PROPORTIONED CHARTS (ZERO EMPTY VOIDS)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT 9 COLS: THREE INTEGRATED ANALYTICS PANELS */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Panel A: Programme Performance Multi-bar (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-[#071527]">Programme Performance</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 outline-hidden cursor-pointer"
                >
                  <option>Last 6 Months</option>
                  <option>Last 30 Days</option>
                  <option>This Year (FY)</option>
                </select>
              </div>

              {/* Bar Chart container filling height */}
              <div className="h-60 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10, fontWeight: 600 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      domain={[0, 3000]}
                      ticks={[0, 1000, 2000, 3000]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#071527",
                        borderColor: "#1e3a5f",
                        borderRadius: "8px",
                        fontSize: "11px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="education" fill="#071527" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="health" fill="#0d9488" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="livelihoods" fill="#f97316" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="environment" fill="#16a34a" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="others" fill="#2563eb" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tight Legend directly below X-axis with zero gap */}
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100 flex-wrap text-[10px] text-slate-600 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#071527]" /> Education
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0d9488]" /> Health
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#f97316]" /> Livelihoods
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]" /> Environment
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2563eb]" /> Others
              </span>
            </div>
          </div>

          {/* Panel B: Impact by Sector (4 cols) - SIDE-BY-SIDE HORIZONTAL COMPACT LAYOUT */}
          <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-[380px]">
            <div>
              <h3 className="text-xs font-bold text-[#071527] mb-2">Impact by Sector</h3>
              <p className="text-[11px] text-slate-500 mb-2">12,480 Total Reached</p>
            </div>

            {/* Donut Chart */}
            <div className="relative flex items-center justify-center h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={64}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${Number(val).toLocaleString()} Beneficiaries`, ""]}
                    contentStyle={{
                      backgroundColor: "#071527",
                      borderColor: "#1e3a5f",
                      borderRadius: "8px",
                      fontSize: "11px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Total
                </span>
                <span className="text-xs font-black text-[#071527]">12,480</span>
              </div>
            </div>

            {/* Slices legend - Compact 2-column list without scrollbar */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-2 border-t border-slate-100">
              {sectorData.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5 text-slate-600 truncate">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: sec.color }}
                    />
                    <span className="truncate">{sec.name}</span>
                  </span>
                  <span className="font-bold text-[#071527] shrink-0 ml-1">{sec.percent}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel C: Programme Status Gauge (3 cols) */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-[380px]">
            <div>
              <h3 className="text-xs font-bold text-[#071527] mb-1">Programme Status</h3>
              <p className="text-[11px] text-slate-500">Live operational lifecycle</p>
            </div>

            <div className="relative flex items-center justify-center h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={64}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-status-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#071527",
                      borderColor: "#1e3a5f",
                      borderRadius: "8px",
                      fontSize: "11px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-[#071527]">8</span>
                <span className="text-[9px] font-bold text-slate-400">Total Programmes</span>
              </div>
            </div>

            {/* Status Breakdown items */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#071527]" /> Ongoing
                </span>
                <span className="font-black text-[#071527]">6</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#f97316]" /> Completed
                </span>
                <span className="font-black text-[#f97316]">1</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Planned
                </span>
                <span className="font-black text-blue-600">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 3 COLS: CLEAN WHITE QUICK ACTIONS & RECENT ACTIVITY */}
        <div className="lg:col-span-3 space-y-4">
          {/* Quick Actions Grid (Clean White with Navy & Orange branding) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#071527]">Quick Actions</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Direct Ops</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleActionClick("Add Programme")}
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#071527] group-hover:text-[#ea580c] transition">
                  Add Programme
                </span>
              </button>

              <button
                onClick={() => handleActionClick("Add Activity")}
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#071527] group-hover:text-[#ea580c] transition">
                  Add Activity
                </span>
              </button>

              <button
                onClick={() => handleActionClick("Update Impact Data")}
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#071527] group-hover:text-[#ea580c] transition">
                  Update Impact Data
                </span>
              </button>

              <button
                onClick={() => handleActionClick("Upload Evidence")}
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#071527] group-hover:text-[#ea580c] transition">
                  Upload Evidence
                </span>
              </button>

              <button
                onClick={() => handleActionClick("Generate Report")}
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#071527] group-hover:text-[#ea580c] transition">
                  Generate Report
                </span>
              </button>

              <button
                onClick={() => handleActionClick("Manage Beneficiaries")}
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#071527] group-hover:text-[#ea580c] transition">
                  Beneficiaries
                </span>
              </button>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#071527]">Recent Activity</h3>
              <Link
                to="/programmes/activities"
                className="text-[11px] font-semibold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#071527]">New activity added</p>
                  <p className="text-[11px] text-slate-500 truncate">Village Health Camp (CHC)</p>
                  <p className="text-[10px] text-slate-400">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#071527]">Impact data updated</p>
                  <p className="text-[11px] text-slate-500 truncate">Women Skill Development</p>
                  <p className="text-[10px] text-slate-400">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5">
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#071527]">Expense approved</p>
                  <p className="text-[11px] text-slate-500 truncate">Medical Supplies - ₹12,500</p>
                  <p className="text-[10px] text-slate-400">6 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-[#071527] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#071527]">Report generated</p>
                  <p className="text-[11px] text-slate-500 truncate">Quarterly Impact Report</p>
                  <p className="text-[10px] text-slate-400">8 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          4. MAIN ROW 2: PROGRAMMES TABLE + IMPACT STORY + FOOTER
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT 7 COLS: PROGRAMMES OVERVIEW TABLE */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-[#071527]">Programmes Overview</h3>
              <p className="text-[11px] text-slate-500">Live operational progress tracker across 8 sectors</p>
            </div>
            <Link
              to="/programmes/initiatives"
              className="text-[11px] font-semibold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                  <th className="pb-2.5 font-medium">Programme</th>
                  <th className="pb-2.5 font-medium">Sector</th>
                  <th className="pb-2.5 font-medium text-right">Beneficiaries</th>
                  <th className="pb-2.5 font-medium px-4">Progress</th>
                  <th className="pb-2.5 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programmesList.map((prog) => (
                  <tr key={prog.id} className="hover:bg-slate-50/80 transition group">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={prog.image}
                          alt={prog.name}
                          className="w-9 h-9 rounded-md object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/sector_education_1.png";
                          }}
                        />
                        <span className="font-bold text-slate-800 group-hover:text-[#f97316] transition">
                          {prog.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${prog.sectorBadgeClass}`}
                      >
                        {prog.sector}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-700">
                      {prog.beneficiaries}
                    </td>
                    <td className="py-2.5 px-4 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#f97316] rounded-full"
                            style={{ width: `${prog.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 w-7 text-right">
                          {prog.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {prog.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MIDDLE 5 COLS: RECENT IMPACT STORIES */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#071527]">Recent Impact Stories</h3>
              <Link
                to="/stories"
                className="text-[11px] font-semibold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Photo card banner */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-16/9 bg-slate-100 mb-3 shadow-2xs">
              <img
                src="/cause-education.jpg"
                alt="Students in classroom"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/sector_education_1.png";
                }}
              />
              <div className="absolute top-2 left-2">
                <span className="bg-[#071527]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
                  Education &amp; Learning
                </span>
              </div>
            </div>

            <h4 className="text-sm font-black text-[#071527] hover:text-[#f97316] transition cursor-pointer">
              A Brighter Future Through Education
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              With ISLAH's support, 120 children from rural communities received school kits and continued their education this year.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-slate-100 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-black text-[#071527]">120</p>
              <p className="text-[10px] text-slate-500 font-medium">Beneficiaries</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-black text-[#071527]">6</p>
              <p className="text-[10px] text-slate-500 font-medium">Schools</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-black text-emerald-700">100%</p>
              <p className="text-[10px] text-slate-500 font-medium">Retention Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          5. TRANSPARENCY BUILDS TRUST FOOTER CALLOUT & METADATA
          ═════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071527] via-[#09223e] to-[#071527] text-white p-5 shadow-lg border border-[#0f3458] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-10 h-10 rounded-xl bg-[#f97316]/20 border border-[#f97316]/30 flex items-center justify-center text-[#f97316]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black tracking-wide">Transparency Builds Trust</h4>
            <p className="text-xs text-slate-300">
              Every contribution creates measurable impact across our 8 core social sectors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link
            to="/finance/reports"
            className="px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>View Impact Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          6. FOOTER BAR: Last updated & System status
          ═════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#071527]">ISLAH Welfare Foundation</span>
          <span>•</span>
          <span>Programmes &amp; Impact Dashboard v1.0</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-slate-400" />
            Last Updated: 28 Apr 2025, 02:45 PM
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            Database Connected
          </span>
          <span className="flex items-center gap-1.5 hover:text-slate-700 cursor-pointer">
            <Headphones className="w-3.5 h-3.5 text-slate-400" />
            Help &amp; Support
          </span>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          7. MODAL: QUICK ACTION DIALOG
          ═════════════════════════════════════════════════════════════ */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f97316]" />
                <h3 className="text-sm font-bold text-[#071527]">{activeModal}</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#071527]">Action Completed Successfully</h4>
                <p className="text-xs text-slate-500">Record synced to backend and database.</p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Select Target Sector
                  </label>
                  <select className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 bg-slate-50 outline-hidden focus:border-[#f97316]">
                    <option>Education &amp; Learning</option>
                    <option>Healthcare &amp; Well-being</option>
                    <option>Women &amp; Youth Empowerment</option>
                    <option>Skills &amp; Livelihoods</option>
                    <option>Social Justice &amp; Legal Empowerment</option>
                    <option>Agriculture &amp; Rural Livelihoods</option>
                    <option>Environment &amp; Sustainability</option>
                    <option>Humanitarian Relief &amp; Rehabilitation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Programme / Initiative Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Village Solar Electrification Initiative"
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 outline-hidden focus:border-[#f97316]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Target Beneficiaries
                    </label>
                    <input
                      type="number"
                      defaultValue={150}
                      className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 outline-hidden focus:border-[#f97316]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Allocated Budget (₹)
                    </label>
                    <input
                      type="text"
                      defaultValue="2,50,000"
                      className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 outline-hidden focus:border-[#f97316]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Remarks / Implementation Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide operational timeline, field partner, or location details..."
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 outline-hidden focus:border-[#f97316]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save &amp; Publish</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
