import { useEffect, useState } from "react";
import { api } from "../services/api";
import {
  Users,
  HeartHandshake,
  HeartPulse,
  FileText,
  Newspaper,
  TrendingUp,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { type NavTab } from "../components/layout/AdminLayout";

export default function DashboardOverview({ onNavigate }: { onNavigate: (tab: NavTab) => void }) {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalDonations: 0,
    totalApplications: 0,
    totalPatients: 0,
    totalNews: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    api.getDashboardStats().then((res) => {
      setStats(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const kpis = [
    {
      title: "Active Card Members",
      value: stats.totalMembers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      tab: "members" as NavTab,
    },
    {
      title: "80G Verified Donations",
      value: stats.totalDonations,
      icon: HeartHandshake,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      tab: "overview" as NavTab,
    },
    {
      title: "Critical Patient Cases",
      value: stats.totalPatients,
      icon: HeartPulse,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
      tab: "patients" as NavTab,
    },
    {
      title: "Inbound Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      tab: "applications" as NavTab,
    },
    {
      title: "Live News & Events",
      value: stats.totalNews,
      icon: Newspaper,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      tab: "news" as NavTab,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">System Pulse &amp; Metrics</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time statistics across MongoDB database collections</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              onClick={() => onNavigate(kpi.tab)}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between group shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400">{kpi.title}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-white group-hover:text-emerald-400 transition">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-500" /> : kpi.value}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Live in database</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="text-sm font-extrabold text-white mb-4">Quick Management Shortcuts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate("news")}
            className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-left transition cursor-pointer"
          >
            <Newspaper className="w-5 h-5 text-purple-400 mb-2" />
            <h4 className="text-xs font-bold text-white">Publish News / Press Release</h4>
            <p className="text-[11px] text-slate-400 mt-1">Post official announcements and field camp updates.</p>
          </button>

          <button
            onClick={() => onNavigate("media")}
            className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-left transition cursor-pointer"
          >
            <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold text-white">Update Homepage Banners</h4>
            <p className="text-[11px] text-slate-400 mt-1">Swap hero carousel slides or sector photos.</p>
          </button>

          <button
            onClick={() => onNavigate("patients")}
            className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-left transition cursor-pointer"
          >
            <HeartPulse className="w-5 h-5 text-rose-400 mb-2" />
            <h4 className="text-xs font-bold text-white">Add Emergency Medical Appeal</h4>
            <p className="text-[11px] text-slate-400 mt-1">Launch emergency funding for a critical surgery.</p>
          </button>
        </div>
      </div>
    </div>
  );
}

