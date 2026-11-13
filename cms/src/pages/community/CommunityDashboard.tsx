import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { financeApi } from "../../services/financeApi";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Heart,
  UserCheck,
  Briefcase,
  UserPlus,
  HeartHandshake,
  FileText,
  Settings,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  Database,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// 6-Month Community Growth data (Members, Donors, Volunteers, Partners)
const communityGrowthData = [
  { month: "Nov", members: 400, donors: 120, volunteers: 60, partners: 18 },
  { month: "Dec", members: 550, donors: 180, volunteers: 85, partners: 24 },
  { month: "Jan", members: 720, donors: 230, volunteers: 110, partners: 30 },
  { month: "Feb", members: 910, donors: 280, volunteers: 140, partners: 36 },
  { month: "Mar", members: 1080, donors: 320, volunteers: 165, partners: 42 },
  { month: "Apr", members: 1248, donors: 352, volunteers: 186, partners: 48 },
];

export default function CommunityDashboard() {
  const navigate = useNavigate();
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
      } catch (err) {
        console.error("CommunityDashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-4 max-w-[1650px] mx-auto pb-12 font-sans select-none">
      {/* ═════════════════════════════════════════════════════════════
          1. HERO BANNER: ISLAH Community
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
              ISLAH Community
            </h1>
            <p className="text-xs font-semibold text-slate-700">
              People • Partnerships • Collective Impact
            </p>
            <p className="text-xs text-slate-600 italic font-serif pt-0.5">
              Our community is the heart of ISLAH. Together we build stronger, healthier and more empowered communities.
            </p>
          </div>
        </div>

        {/* Right Photo Artwork */}
        <div className="relative z-10 flex items-center gap-4 shrink-0 self-end md:self-center pr-2">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-xs border-2 border-white/80 shrink-0">
            <img
              src="/hero_seedling.png"
              alt="Community"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. TOP KPI CARDS (4 CARDS)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Card 1: Total Members */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/50 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Total Members</span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{dbStats?.totalMembers ? dbStats.totalMembers.toLocaleString() : "12"}</h3>
              <span className="text-xs font-bold text-emerald-600">↑ 8%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Active individuals &amp; organisations</p>
          </div>
        </div>

        {/* Card 2: Total Donors */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/50 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-[#f97316]" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Total Donors</span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{financeData?.kpis?.activeDonors?.count || 3}</h3>
              <span className="text-xs font-bold text-emerald-600">↑ 12%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Individuals &amp; organisations</p>
          </div>
        </div>

        {/* Card 3: Total Volunteers & Mentors */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 border border-purple-200/50 flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Total Volunteers &amp; Mentors</span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{dbStats?.pendingVolunteers ? dbStats.pendingVolunteers : (dbStats?.settings?.impact_stats?.volunteersCount || "500+")}</h3>
              <span className="text-xs font-bold text-emerald-600">↑ 15%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Active in programmes</p>
          </div>
        </div>

        {/* Card 4: Partners & Sponsors */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 border border-orange-200/50 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Partners &amp; Sponsors</span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{dbStats?.settings?.impact_stats?.partnersCount || "100+"}</h3>
              <span className="text-xs font-bold text-emerald-600">↑ 6%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Collaborations &amp; support</p>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. MIDDLE SECTION: 4 COMMUNITY DIRECTORIES + QUICK ACTIONS + ACTIVITY
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Side: 4 Large Directory Cards (9 cols on lg) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">ISLAH Community Directories</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explore our members, donors, partners, volunteers and mentors
                </p>
              </div>
              <Link to="/membership" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-0.5">
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Directory 1: Member Directory */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-[#f97316]/50 text-center flex flex-col justify-between space-y-3 shadow-2xs group transition">
                <div className="w-10 h-10 rounded-full bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center mx-auto shadow-xs transition">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071527]">Member Directory</h4>
                  <p className="text-2xl font-black text-[#071527] mt-1">{dbStats?.totalMembers ? dbStats.totalMembers.toLocaleString() : "12"}</p>
                  <p className="text-[10px] text-slate-500">Total Members</p>
                </div>
                <Link
                  to="/community/members"
                  className="w-full py-2 bg-[#071527] hover:bg-[#f97316] text-white text-xs font-bold rounded-lg transition"
                >
                  Explore Members →
                </Link>
              </div>

              {/* Directory 2: Donor Directory */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-[#f97316]/50 text-center flex flex-col justify-between space-y-3 shadow-2xs group transition">
                <div className="w-10 h-10 rounded-full bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center mx-auto shadow-xs transition">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071527]">Donor Directory</h4>
                  <p className="text-2xl font-black text-[#071527] mt-1">{financeData?.kpis?.activeDonors?.count || 3}</p>
                  <p className="text-[10px] text-slate-500">Total Donors</p>
                </div>
                <Link
                  to="/community/donors"
                  className="w-full py-2 bg-[#071527] hover:bg-[#f97316] text-white text-xs font-bold rounded-lg transition"
                >
                  Explore Donors →
                </Link>
              </div>

              {/* Directory 3: Partner & Sponsor Directory */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-[#f97316]/50 text-center flex flex-col justify-between space-y-3 shadow-2xs group transition">
                <div className="w-10 h-10 rounded-full bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center mx-auto shadow-xs transition">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071527]">Partner &amp; Sponsor</h4>
                  <p className="text-2xl font-black text-[#071527] mt-1">{dbStats?.settings?.impact_stats?.partnersCount || "100+"}</p>
                  <p className="text-[10px] text-slate-500">Total Partners &amp; Sponsors</p>
                </div>
                <Link
                  to="/community/partners"
                  className="w-full py-2 bg-[#071527] hover:bg-[#f97316] text-white text-xs font-bold rounded-lg transition"
                >
                  Explore Partners →
                </Link>
              </div>

              {/* Directory 4: Volunteer & Mentor Directory */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-[#f97316]/50 text-center flex flex-col justify-between space-y-3 shadow-2xs group transition">
                <div className="w-10 h-10 rounded-full bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center mx-auto shadow-xs transition">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071527]">Volunteer &amp; Mentor</h4>
                  <p className="text-2xl font-black text-[#071527] mt-1">{dbStats?.pendingVolunteers ? dbStats.pendingVolunteers : (dbStats?.settings?.impact_stats?.volunteersCount || "500+")}</p>
                  <p className="text-[10px] text-slate-500">Total Volunteers &amp; Mentors</p>
                </div>
                <Link
                  to="/community/volunteers"
                  className="w-full py-2 bg-[#071527] hover:bg-[#f97316] text-white text-xs font-bold rounded-lg transition"
                >
                  Explore Volunteers →
                </Link>
              </div>
            </div>
          </div>

          {/* LOWER SPLIT: Community Overview Chart + Top Contributors + Upcoming Events */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Community Overview Chart (5 cols) */}
            <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Community Overview</h4>
                  <p className="text-[10px] text-slate-400">Last 6 Months</p>
                </div>
                <Link to="/membership" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c]">View All →</Link>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-600 py-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600" />Members</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600" />Donors</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-600" />Volunteers</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" />Partners</span>
              </div>

              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={communityGrowthData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#071527", borderColor: "#1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "11px" }} />
                    <Line type="monotone" dataKey="members" stroke="#9333ea" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="donors" stroke="#2563eb" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="volunteers" stroke="#0d9488" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="partners" stroke="#f97316" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Contributors (4 cols) */}
            <div className="md:col-span-4 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900">Top Contributors</h4>
                <Link to="/finance/reports" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c]">View All →</Link>
              </div>

              <div className="space-y-2.5 my-auto py-1">
                {[
                  { name: "Global Good Foundation", role: "Partner", amt: "₹ 5,00,000", badge: "bg-amber-100 text-amber-800" },
                  { name: "Ayesha Khan", role: "Donor", amt: "₹ 1,50,000", badge: "bg-slate-100 text-slate-700" },
                  { name: "Sunrise Foundation", role: "Partner", amt: "₹ 1,00,000", badge: "bg-amber-50 text-amber-700" },
                  { name: "Raza Ahmed", role: "Volunteer Support", amt: "₹ 75,000", badge: "bg-slate-50 text-slate-600" },
                  { name: "Fatima Rizvi", role: "Recurring Donor", amt: "₹ 50,000", badge: "bg-slate-50 text-slate-600" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold ${item.badge}`}>
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.role}</p>
                      </div>
                    </div>
                    <span className="font-black text-slate-900">{item.amt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events (3 cols) */}
            <div className="md:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900">Upcoming Events</h4>
                <Link to="/news" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c]">View All →</Link>
              </div>

              <div className="space-y-2 my-auto py-1">
                {[
                  { date: "05 May", title: "Community Health Camp", tag: "Medical", color: "bg-blue-50 text-blue-700 border-blue-200" },
                  { date: "12 May", title: "Education Support Workshop", tag: "Education", color: "bg-orange-50 text-teal-700 border-teal-200" },
                  { date: "18 May", title: "Volunteer Training Session", tag: "Training", color: "bg-amber-50 text-amber-700 border-amber-200" },
                  { date: "25 May", title: "Fundraising Dinner", tag: "Fundraising", color: "bg-purple-50 text-purple-700 border-purple-200" },
                ].map((ev, idx) => (
                  <div key={idx} className="p-1.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800 text-[11px] truncate">{ev.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{ev.date}</p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${ev.color}`}>
                      {ev.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Column (3 cols on lg): Quick Actions + Recent Activity + Promo Card */}
        <div className="lg:col-span-3 space-y-4">
          {/* Quick Actions (2x3 Grid) */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-3">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/membership"
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add Member</span>
              </Link>

              <Link
                to="/finance"
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add Donor</span>
              </Link>

              <Link
                to="/volunteers"
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add Volunteer</span>
              </Link>

              <Link
                to="/partners"
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <HeartHandshake className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Add Partner</span>
              </Link>

              <Link
                to="/applications"
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">View Apps</span>
              </Link>

              <Link
                to="/community/members"
                className="p-2.5 rounded-xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200 hover:border-[#f97316] text-left transition cursor-pointer flex flex-col items-start gap-1.5 group shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <Settings className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#071527] group-hover:text-[#ea580c] transition leading-tight">Directories</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              <Link to="/applications" className="text-xs font-bold text-[#f97316] hover:text-[#ea580c]">View All →</Link>
            </div>

            <div className="space-y-3">
              {[
                { title: "New member application received", sub: "Ayesha Khan", time: "2 hours ago", color: "bg-orange-50 text-[#f97316]" },
                { title: "New donor registered", sub: "Global Good Foundation", time: "4 hours ago", color: "bg-blue-50 text-blue-600" },
                { title: "Volunteer approved", sub: "Raza Ahmed", time: "5 hours ago", color: "bg-purple-50 text-purple-600" },
                { title: "Partner enquiry received", sub: "Sunrise Foundation", time: "7 hours ago", color: "bg-orange-50 text-orange-600" },
                { title: "Profile updated", sub: "Fatima Rizvi (Member)", time: "8 hours ago", color: "bg-emerald-50 text-emerald-600" },
              ].map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${act.color}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{act.title}</p>
                    <p className="text-[11px] text-slate-600 truncate">{act.sub}</p>
                    <p className="text-[10px] text-slate-400">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* More People. More Possibilities Promo Card */}
          <div className="rounded-xl bg-gradient-to-br from-[#0c2647] to-[#06182e] border border-[#163c6c] text-white p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h4 className="text-xs font-black text-white">More People. More Possibilities.</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Together we create lasting change in communities across rural India.
            </p>
            <Link
              to="/get-involved"
              className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 mt-2"
            >
              <span>Support Our Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          4. BOTTOM STATUS BAR
          ═════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-4">
          <span>Total Community Records: <strong className="text-slate-800 font-black">1,574</strong></span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Last Backup: <strong className="text-slate-800">28 Apr 2025, 02:00 AM</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Operational</span>
          </span>
          <Link to="/contact" className="hover:text-slate-800 font-semibold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help &amp; Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

