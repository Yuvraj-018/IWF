import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
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
} from "lucide-react";

export type NavTab = "overview" | "news" | "media" | "patients" | "members" | "applications";

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
    { id: "members" as NavTab, label: "Members Directory", icon: Users },
    { id: "applications" as NavTab, label: "Applications & Resumes", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] flex text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-wide">ISLAH CMS</h2>
            <p className="text-[10px] text-slate-400 font-mono">Control Center v1.0</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Public site link & User profile strip */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 border border-slate-800/80 transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-emerald-400 shrink-0">
                {user?.name?.slice(0, 2).toUpperCase() || "AD"}
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate">{user?.name || "Admin"}</p>
                <p className="text-[10px] text-emerald-400 font-mono">{user?.role || "superadmin"}</p>
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
        <header className="h-16 bg-slate-900/60 border-b border-slate-800 px-8 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-white capitalize">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "news" && "News, Dispatches & Events Manager"}
              {activeTab === "media" && "Dynamic Media & Banners CMS"}
              {activeTab === "patients" && "Critical Healthcare Patients"}
              {activeTab === "members" && "Members Directory & Ledger"}
              {activeTab === "applications" && "Inbound Applications & Resumes"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Live</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content View */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

