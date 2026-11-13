import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { financeApi } from "../../services/financeApi";
import { Link } from "react-router-dom";
import {
  Users,
  Heart,
  UserCheck,
  HeartHandshake,
  FileText,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  PlusCircle,
  CreditCard,
  RefreshCw,
  Search,
  UserPlus,
} from "lucide-react";

export default function CommunityDashboard() {
  const [dbStats, setDbStats] = useState<any>(null);
  const [financeData, setFinanceData] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [recentMembers, setRecentMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [stats, fin, appsRes, membersRes] = await Promise.all([
          api.getDashboardStats({ force: true }),
          financeApi.getFinancialDashboardOverview({}),
          api.listApplications(undefined, { force: true }),
          api.listMembers(undefined, { force: true }),
        ]);
        if (stats) setDbStats(stats);
        if (fin?.success && fin.data) setFinanceData(fin.data);
        if (appsRes?.success && Array.isArray(appsRes.data)) {
          setApplications(appsRes.data);
        }
        if (membersRes?.success && Array.isArray(membersRes.data)) {
          setRecentMembers(membersRes.data);
        }
      } catch (err) {
        console.error("CommunityDashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-5 max-w-[1650px] mx-auto pb-12 font-sans select-none">
      {/* ═════════════════════════════════════════════════════════════
          1. HERO HEADER: ISLAH Community & Directory Control Center
          ═════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 md:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start md:items-center gap-4 z-10 max-w-2xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <Users className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Community &amp; Directory Operations
              </h1>
              <span className="text-[10px] font-bold bg-[#f97316]/10 text-[#ea580c] px-2.5 py-0.5 rounded-full border border-[#f97316]/20 uppercase">
                Central Registry
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">
              Members • Donors • Volunteers • Mentors • Partners
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl font-medium">
              Manage the foundation's official registries, review onboarding applications, issue membership cards, and oversee partner collaborations.
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold shadow-2xs transition"
          >
            <UserPlus className="w-4 h-4 text-emerald-600" />
            <span>Add Member</span>
          </Link>
          <Link
            to="/membership/applications"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl text-xs font-bold shadow-2xs transition shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Review Applications</span>
          </Link>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. 4 CORE DIRECTORY STAT CARDS (LIVE DATABASE NUMBERS)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Member Directory */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between hover:border-[#f97316]/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Directory #1</span>
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold text-slate-500">Total Registered Members</span>
            <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
              {dbStats?.totalMembers ? Number(dbStats.totalMembers).toLocaleString("en-IN") : "0"}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Individual &amp; Life Members</p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/community/members"
              className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
            >
              <span>Explore Members</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] text-slate-500 font-mono">
              {dbStats?.pendingMembership || 0} pending
            </span>
          </div>
        </div>

        {/* Card 2: Donor Directory */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between hover:border-[#f97316]/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-emerald-600" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Directory #2</span>
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold text-slate-500">Verified Donors</span>
            <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
              {financeData?.kpis?.activeDonors?.count ?? (dbStats?.totalDonations ? Number(dbStats.totalDonations).toLocaleString("en-IN") : "0")}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Online &amp; Offline Contributors</p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/community/donors"
              className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
            >
              <span>Explore Donors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] text-slate-500 font-mono">
              ₹ {Number(financeData?.kpis?.totalDonations?.amount || 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Card 3: Volunteer & Mentor Directory */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between hover:border-[#f97316]/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Directory #3</span>
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold text-slate-500">Volunteers &amp; Mentors</span>
            <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
              {dbStats?.settings?.impact_stats?.volunteersCount || (applications.filter((a) => a.type === "volunteer" || a.type === "mentor").length || "0")}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Active Ground Changemakers</p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/community/volunteers"
              className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
            >
              <span>Explore Volunteers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] text-slate-500 font-mono">
              {applications.filter((a) => a.type === "volunteer" && a.status === "Pending").length} pending
            </span>
          </div>
        </div>

        {/* Card 4: Partner & Sponsor Directory */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between hover:border-[#f97316]/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Directory #4</span>
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold text-slate-500">Partners &amp; Institutions</span>
            <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
              {dbStats?.settings?.impact_stats?.partnersCount || "0"}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">CSR &amp; Civil Collaborations</p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/community/partners"
              className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
            >
              <span>Explore Partners</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] text-slate-500 font-mono">
              Active Network
            </span>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. MAIN OPERATIONS WORKSPACE: RECENT APPLICATIONS + QUICK ACTIONS
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Live Inbound Community Applications (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-4.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Inbound Applications &amp; Registrations</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Live volunteer, mentor, membership and career requests</p>
            </div>
            <Link
              to="/membership/applications"
              className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1"
            >
              <span>View All Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {applications.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
                <p className="font-bold text-slate-700 text-sm">No applications on file</p>
                <p className="text-xs text-slate-500 mt-0.5">New applications submitted through the public website will appear here.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/60">
                    <th className="py-3 px-4">Applicant Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.slice(0, 8).map((app: any) => (
                    <tr key={app._id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {app.fullName || "New Applicant"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {app.type || "Membership"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {app.email || app.phone || "—"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-IN") : "Recent"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          app.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : app.status === "Archived"
                            ? "bg-slate-100 text-slate-600 border border-slate-200"
                            : app.status === "Rejected"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to="/membership/applications"
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-semibold transition"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right: Administrative Quick Actions & Shortcuts (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Administrative Operations</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Quick access to manage community rosters</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <Link
                to="/membership"
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#f97316] transition flex flex-col items-start gap-1 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ea580c] transition mt-1">Add Member</span>
                <span className="text-[10px] text-slate-400">Register new record</span>
              </Link>

              <Link
                to="/volunteers"
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#f97316] transition flex flex-col items-start gap-1 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ea580c] transition mt-1">Add Volunteer</span>
                <span className="text-[10px] text-slate-400">Onboard activist</span>
              </Link>

              <Link
                to="/partners"
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#f97316] transition flex flex-col items-start gap-1 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ea580c] transition mt-1">Add Partner</span>
                <span className="text-[10px] text-slate-400">Institutional MoU</span>
              </Link>

              <Link
                to="/membership/cards"
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#f97316] transition flex flex-col items-start gap-1 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ea580c] transition mt-1">Member Cards</span>
                <span className="text-[10px] text-slate-400">Issue official IDs</span>
              </Link>

              <Link
                to="/membership/renewals"
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#f97316] transition flex flex-col items-start gap-1 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ea580c] transition mt-1">Renewals</span>
                <span className="text-[10px] text-slate-400">Track expirations</span>
              </Link>

              <Link
                to="/community/donors"
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#f97316] transition flex flex-col items-start gap-1 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#071527] group-hover:bg-[#f97316] text-white flex items-center justify-center transition shadow-2xs">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ea580c] transition mt-1">Donors</span>
                <span className="text-[10px] text-slate-400">View contributions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
