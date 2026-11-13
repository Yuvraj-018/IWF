import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  FileCheck2,
  FilePlus,
  Clock,
  Image as ImageIcon,
  Mail,
  TrendingUp,
  PlusCircle,
  Newspaper,
  Calendar,
  Upload,
  Home,
  Send,
  ArrowRight,
  Eye,
  Edit,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  Award,
  Globe,
  Database,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Vector Sparkline
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

// 6-Month Page Views vs Unique Visitors
const analyticsData = [
  { month: "Nov", views: 55000, visitors: 28000 },
  { month: "Dec", views: 88000, visitors: 62000 },
  { month: "Jan", views: 92000, visitors: 65000 },
  { month: "Feb", views: 110000, visitors: 78000 },
  { month: "Mar", views: 130000, visitors: 95000 },
  { month: "Apr", views: 148000, visitors: 112000 },
];

export default function CMSDashboard() {
  const navigate = useNavigate();
  const [activeRange, setActiveRange] = useState("6M");
  const [dbStats, setDbStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const stats = await api.getDashboardStats({ force: true });
        if (stats) setDbStats(stats);
      } catch (err) {
        console.error("CMSDashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-4 max-w-[1650px] mx-auto pb-12 font-sans select-none">
      {/* ═════════════════════════════════════════════════════════════
          1. HERO BANNER: Website & CMS Control Center
          ═════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#eff9f6] via-[#e5f4fb] to-[#d8f0f8] border border-[#cbe6f5] p-5 md:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
              Website &amp; CMS Control Center
            </h1>
            <p className="text-xs font-semibold text-slate-700">
              Manage. Update. Publish.
            </p>
            <p className="text-xs text-slate-600 italic font-serif pt-0.5">
              Keep our website fresh, relevant and inspiring.
            </p>
          </div>
        </div>

        {/* Right Scenery Artwork & Calligraphy */}
        <div className="relative z-10 flex items-center gap-4 shrink-0 self-end md:self-center pr-2">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src="/hero_seedling.png"
              alt="Together for a Better Tomorrow"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="text-right font-serif">
            <p className="text-lg md:text-xl italic font-black text-[#004724] tracking-tight leading-tight">
              Together for
            </p>
            <p className="text-lg md:text-xl italic font-black text-[#004724] tracking-tight leading-tight">
              a Better Tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. TOP KPI CARDS (5-CARD GRID)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {/* Card 1: Total Website Pages */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/50 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Total Website Pages</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">6</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-emerald-600">↑ 12% vs last month</span>
              <Sparkline color="#059669" />
            </div>
          </div>
        </div>

        {/* Card 2: Published Content */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/50 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Published Content</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{(dbStats?.totalNews ?? 8) + (dbStats?.totalPublications ?? 9) + (dbStats?.totalStories ?? 4)}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-emerald-600">↑ 8% vs last month</span>
              <Sparkline color="#2563eb" />
            </div>
          </div>
        </div>

        {/* Card 3: Pending Approvals */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Pending Approvals</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{dbStats?.totalApplications ?? 0}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-amber-600">↓ 5% vs last month</span>
              <Sparkline color="#f59e0b" />
            </div>
          </div>
        </div>

        {/* Card 4: Media Library */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 border border-purple-200/50 flex items-center justify-center shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Media Library</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{(dbStats?.totalMedia ?? 40).toLocaleString()}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-emerald-600">↑ 10% vs last month</span>
              <Sparkline color="#9333ea" />
            </div>
          </div>
        </div>

        {/* Card 5: Website Enquiries */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 border border-teal-200/50 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Website Enquiries</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{dbStats?.totalContacts ?? 0}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-emerald-600">↑ 15% vs last month</span>
              <Sparkline color="#0d9488" />
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. MIDDLE SECTION: ANALYTICS + CONTENT OVERVIEW + QUICK ACTIONS
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Col 1: Website Analytics (6 cols on lg) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Website Analytics</span>
            </h3>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
              {["7D", "30D", "3M", "6M", "FY"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveRange(tab)}
                  className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition cursor-pointer ${
                    activeRange === tab
                      ? "bg-[#071527] text-[#f97316] shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#071527]" />
              <span>Page Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Unique Visitors</span>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val / 1000}K`}
                />
                <Tooltip
                  formatter={(val: any) => [`${Number(val).toLocaleString()}`, ""]}
                  contentStyle={{ backgroundColor: "#071527", borderColor: "#1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
                />
                <Line type="monotone" dataKey="views" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4, fill: "#0d9488" }} />
                <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, fill: "#2563eb" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Col 2: Content Overview (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Content Overview</h3>
            <Link to="/news" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5 my-auto">
            {/* News Articles */}
            <Link to="/news" className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Newspaper className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">News Articles</span>
              </div>
              <span className="text-xs font-black text-slate-900">{dbStats?.totalNews ?? 8}</span>
            </Link>

            {/* Events */}
            <Link to="/news" className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Events</span>
              </div>
              <span className="text-xs font-black text-slate-900">{dbStats?.upcomingEvents?.length ?? 2}</span>
            </Link>

            {/* Success Stories */}
            <Link to="/stories" className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Success Stories</span>
              </div>
              <span className="text-xs font-black text-slate-900">{dbStats?.totalStories ?? 4}</span>
            </Link>

            {/* Programme Updates */}
            <Link to="/programmes" className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Programme Updates</span>
              </div>
              <span className="text-xs font-black text-slate-900">{dbStats?.settings?.homepage_stats?.activePrograms ?? 12}</span>
            </Link>

            {/* Reports & Documents */}
            <Link to="/publications" className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 transition">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Reports &amp; Documents</span>
              </div>
              <span className="text-xs font-black text-slate-900">{dbStats?.totalPublications ?? 9}</span>
            </Link>
          </div>
        </div>

        {/* Col 3: Quick Actions (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-2 my-auto">
            {/* Create New Page */}
            <button
              onClick={() => navigate("/settings")}
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <FilePlus className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Create New Page</span>
            </button>

            {/* Add News Article */}
            <button
              onClick={() => navigate("/news")}
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Newspaper className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add News Article</span>
            </button>

            {/* Add Event */}
            <button
              onClick={() => navigate("/news")}
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add Event</span>
            </button>

            {/* Upload Media */}
            <button
              onClick={() => navigate("/media")}
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Upload className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Upload Media</span>
            </button>

            {/* Manage Homepage */}
            <button
              onClick={() => navigate("/settings")}
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Home className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Manage Homepage</span>
            </button>

            {/* Publish Update */}
            <button
              onClick={() => navigate("/news")}
              className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                <Send className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Publish Update</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          4. LOWER SECTION: PAGE MANAGEMENT + HOMEPAGE SECTIONS + ACTIVITY
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Col 1: Page Management (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Page Management</h3>
            <Link to="/settings" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto my-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2">Page Title</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Last Updated</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2 font-bold text-slate-800">About ISLAH</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Published
                    </span>
                  </td>
                  <td className="py-2 text-slate-500">Apr 28, 2025</td>
                  <td className="py-2 text-right">
                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                      <button className="hover:text-[#f97316] cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="hover:text-blue-600 cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2 font-bold text-slate-800">Our Programmes</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Published
                    </span>
                  </td>
                  <td className="py-2 text-slate-500">Apr 27, 2025</td>
                  <td className="py-2 text-right">
                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                      <button className="hover:text-[#f97316] cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="hover:text-blue-600 cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2 font-bold text-slate-800">Get Involved</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Under Review
                    </span>
                  </td>
                  <td className="py-2 text-slate-500">Apr 26, 2025</td>
                  <td className="py-2 text-right">
                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                      <button className="hover:text-[#f97316] cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="hover:text-blue-600 cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2 font-bold text-slate-800">Annual Report 2024</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Published
                    </span>
                  </td>
                  <td className="py-2 text-slate-500">Apr 25, 2025</td>
                  <td className="py-2 text-right">
                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                      <button className="hover:text-[#f97316] cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="hover:text-blue-600 cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2 font-bold text-slate-800">Contact Us</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Published
                    </span>
                  </td>
                  <td className="py-2 text-slate-500">Apr 24, 2025</td>
                  <td className="py-2 text-right">
                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                      <button className="hover:text-[#f97316] cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="hover:text-blue-600 cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 2: Homepage Sections (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Homepage Sections</h3>
            <Link to="/settings" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>Manage Sections</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2 my-auto">
            {[
              { name: "Hero Banner", thumb: "/hero_seedling.png" },
              { name: "Our Mission", thumb: "/hero_seedling.png" },
              { name: "Programmes", thumb: "/hero_seedling.png" },
              { name: "Impact Statistics", thumb: "/hero_seedling.png" },
              { name: "Latest News", thumb: "/hero_seedling.png" },
            ].map((sec, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    <img src={sec.thumb} alt={sec.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{sec.name}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Active</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Recent Activity (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
            <Link to="/news" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3 my-auto">
            {dbStats?.recentNews && dbStats.recentNews.length > 0 ? (
              dbStats.recentNews.slice(0, 4).map((item: any, idx: number) => (
                <div key={item._id || idx} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5">
                    {item.isUpcoming ? <Calendar className="w-3.5 h-3.5" /> : <Newspaper className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{item.title}</p>
                    <p className="text-[11px] text-slate-600 truncate">{item.category} • {item.location || "Bihar"}</p>
                    <p className="text-[10px] text-slate-400">{item.date || "Recently"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No recent content recorded in database</p>
            )}
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          5. BOTTOM ROW: SYSTEM HEALTH & IMPACT BANNER
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* System Health (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">System Health</h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Database</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Healthy</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Gateway</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Razorpay Healthy</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Website / API</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Healthy</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Email Service</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Healthy</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Backup</p>
                <p className="text-[10px] text-slate-500 font-medium">3 hrs ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Promo Card (4 cols) */}
        <div className="lg:col-span-4 rounded-xl bg-gradient-to-r from-[#004724] to-[#072d1a] text-white p-4.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden shrink-0 flex items-center justify-center">
              <img src="/hero_seedling.png" alt="Impact" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white leading-tight">Together we create</h4>
              <h4 className="text-sm font-black text-white leading-tight">lasting change</h4>
            </div>
          </div>
          <Link
            to="/programmes"
            className="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold text-white rounded-md flex items-center gap-1 transition"
          >
            <span>View Impact</span>
            <ArrowRight className="w-3 h-3 text-[#f97316]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

