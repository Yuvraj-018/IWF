import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { getClientUrl } from "../../services/config";
import {
  LayoutDashboard,
  Newspaper,
  Image as ImageIcon,
  HeartPulse,
  Users,
  FileText,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Activity,
  Award,
  Briefcase,
  BookOpen,
  Sparkles,
} from "lucide-react";

export type NavTab =
  | "overview"
  | "news"
  | "media"
  | "patients"
  | "members"
  | "careers"
  | "publications"
  | "stories"
  | "applications"
  | "leadership"
  | "settings";

interface AdminLayoutProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  children: ReactNode;
}

export default function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: "overview" as NavTab, label: "Overview", icon: LayoutDashboard },
    { id: "news" as NavTab, label: "News & Events", icon: Newspaper },
    { id: "media" as NavTab, label: "Media & Banners", icon: ImageIcon },
    { id: "patients" as NavTab, label: "Critical Patients", icon: HeartPulse },
    { id: "members" as NavTab, label: "Community & Directory", icon: Users },
    { id: "careers" as NavTab, label: "Careers & Jobs", icon: Briefcase },
    { id: "publications" as NavTab, label: "Publications & Reports", icon: BookOpen },
    { id: "stories" as NavTab, label: "Success Stories", icon: Sparkles },
    { id: "leadership" as NavTab, label: "Leadership & Board", icon: Award },
    { id: "applications" as NavTab, label: "Applications & Forms", icon: FileText },
    { id: "settings" as NavTab, label: "Site Stats, Social & Docs", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 font-sans">
      {/* Sidebar - Official ISLAH Deep Navy */}
      <aside className="w-64 bg-[#071527] border-r border-[#0d223f] flex flex-col shrink-0 text-white shadow-xl">
        <div className="p-5 border-b border-[#0d223f] flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-sm shadow-orange-500/10">
            <ShieldCheck className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-wide flex items-center gap-1.5">
              <span>ISLAH CMS</span>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">Welfare Foundation Control</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Public site link & User profile strip */}
        <div className="p-4 border-t border-[#0d223f] space-y-3 bg-[#051120]">
          <a
            href={getClientUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#07172c] hover:bg-orange-500/15 text-[11px] font-semibold text-slate-200 border border-[#122e54] hover:border-orange-500/40 hover:text-orange-300 transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-xs font-black text-orange-400 shrink-0">
                {user?.name?.slice(0, 2).toUpperCase() || "AD"}
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate">{user?.name || "Admin"}</p>
                <p className="text-[10px] text-orange-400 font-mono">{user?.role || "superadmin"}</p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/90 px-8 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-4.5 bg-orange-500 rounded-full" />
            <h1 className="text-base font-black text-[#071527] capitalize tracking-tight">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "news" && "News, Dispatches & Events Manager"}
              {activeTab === "media" && "Dynamic Media & Banners CMS"}
              {activeTab === "patients" && "Critical Healthcare Patients"}
              {activeTab === "members" && "Members Directory & Ledger"}
              {activeTab === "leadership" && "Leadership & Governance Board"}
              {activeTab === "applications" && "Inbound Applications & Resumes"}
              {activeTab === "settings" && "Site Stats, Social & Statutory Reports"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Live</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content View */}
        <main className="cms-canvas flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          {children}
        </main>
      </div>
    </div>
  );
}

