import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getClientUrl } from "../../services/config";
import {
  LayoutDashboard,
  Globe,
  Coins,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Maximize2,
  ExternalLink,
  LogOut,
  Sprout,
  Menu,
  HeartHandshake,
  Users,
  Briefcase,
  Award,
  Activity,
  MessageSquare,
  Shield,
  Layers,
  ArrowRight,
  Receipt,
  FileCheck2,
  RotateCcw,
  RefreshCw,
  PieChart,
  FileSpreadsheet,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [financeExpanded, setFinanceExpanded] = useState(true);
  const [cmsExpanded, setCmsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = location.pathname;

  // Auto-expand sections matching the active path
  useEffect(() => {
    if (pathname.startsWith("/finance")) {
      setFinanceExpanded(true);
    }
    if (
      pathname.startsWith("/cms") ||
      ["/news", "/media", "/patients", "/members", "/careers", "/publications", "/stories", "/leadership", "/applications", "/settings"].includes(pathname)
    ) {
      setCmsExpanded(true);
    }
  }, [pathname]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const financeSubItems = [
    { label: "Donation Overview", path: "/finance", icon: Coins },
    { label: "Transactions", path: "/finance/transactions", icon: Layers },
    { label: "Reconciliation", path: "/finance/reconciliation", icon: RefreshCw },
    { label: "Refunds", path: "/finance/refunds", icon: RotateCcw },
    { label: "Receipts & Acknowledgements", path: "/finance/receipts", icon: FileCheck2 },
    { label: "Expenses", path: "/finance/expenses", icon: Receipt },
    { label: "Budgets", path: "/finance/budgets", icon: PieChart },
    { label: "Financial Reports", path: "/finance/reports", icon: FileSpreadsheet },
  ];

  const cmsSubItems = [
    { label: "News & Events", path: "/cms/news" },
    { label: "Media & Banners", path: "/cms/media" },
    { label: "Critical Patients", path: "/cms/patients" },
    { label: "Members Directory", path: "/cms/members" },
    { label: "Careers & Jobs", path: "/cms/careers" },
    { label: "Publications & Reports", path: "/cms/publications" },
    { label: "Success Stories", path: "/cms/stories" },
    { label: "Leadership Board", path: "/cms/leadership" },
    { label: "Applications & Forms", path: "/cms/applications" },
    { label: "Site Settings & SEO", path: "/cms/settings" },
  ];

  const otherModules = [
    { label: "Membership", path: "/membership", icon: Users },
    { label: "Volunteers & Mentors", path: "/volunteers", icon: HeartHandshake },
    { label: "Partners & Sponsors", path: "/partners", icon: Briefcase },
    { label: "Programmes & Impact", path: "/programmes", icon: Award },
    { label: "ISLAH Community", path: "/community", icon: Globe },
    { label: "Governance & Reports", path: "/governance", icon: Shield },
    { label: "Communications", path: "/communications", icon: MessageSquare },
    { label: "System Health", path: "/system-health", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 font-sans">
      {/* ── SIDEBAR (DEEP NAVY) ── */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-[#071527] border-r border-[#0d223f] flex flex-col shrink-0 text-white shadow-xl z-20`}
      >
        {/* Header Branding */}
        <div className="p-4 border-b border-[#0d223f] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm shadow-emerald-500/10">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            {sidebarOpen && (
              <div className="truncate">
                <h2 className="text-xs font-black text-white tracking-wide uppercase">ISLAH</h2>
                <p className="text-[10px] text-slate-400 truncate font-medium">Welfare Foundation</p>
                <p className="text-[9px] text-emerald-400/80 italic truncate">Together for a Better Tomorrow</p>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Accordion List */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {/* 1. Dashboard */}
          <Link
            to="/dashboard"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
              pathname === "/" || pathname === "/dashboard"
                ? "bg-white/10 text-white font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          {/* 2. Website & CMS Accordion */}
          <div>
            <button
              onClick={() => setCmsExpanded(!cmsExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                cmsExpanded || pathname.startsWith("/cms")
                  ? "text-white bg-white/5"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span>Website &amp; CMS</span>}
              </div>
              {sidebarOpen && (
                cmsExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sidebarOpen && cmsExpanded && (
              <div className="mt-1 ml-4 pl-3 border-l border-[#132c4d] space-y-1 py-1">
                {cmsSubItems.map((sub, idx) => {
                  const isActive = pathname === sub.path || pathname === sub.path.replace("/cms", "");
                  return (
                    <Link
                      key={idx}
                      to={sub.path}
                      className={`block px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-300 font-bold"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Donations & Finance Accordion (ACTIVE & EXPANDED) */}
          <div>
            <button
              onClick={() => setFinanceExpanded(!financeExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                pathname.startsWith("/finance")
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Coins className={`w-4 h-4 ${pathname.startsWith("/finance") ? "text-emerald-400" : "text-slate-400"}`} />
                {sidebarOpen && <span>Donations &amp; Finance</span>}
              </div>
              {sidebarOpen && (
                financeExpanded ? <ChevronDown className="w-3.5 h-3.5 text-emerald-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sidebarOpen && financeExpanded && (
              <div className="mt-1 ml-4 pl-3 border-l border-emerald-500/30 space-y-1 py-1">
                {financeSubItems.map((sub, idx) => {
                  const isActive = pathname === sub.path;
                  return (
                    <Link
                      key={idx}
                      to={sub.path}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border-l-2 border-emerald-400"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{sub.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Other Platform Modules */}
          {otherModules.map((mod, idx) => {
            const Icon = mod.icon;
            const isActive = pathname.startsWith(mod.path);
            return (
              <Link
                key={idx}
                to={mod.path}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-white/10 text-white font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400" />
                  {sidebarOpen && <span>{mod.label}</span>}
                </div>
                {sidebarOpen && <ChevronRight className="w-3 h-3 text-slate-500" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Promo Card (As shown in mockup) */}
        {sidebarOpen && (
          <div className="p-3.5 m-3 rounded-2xl bg-gradient-to-br from-[#0c2647] to-[#06182e] border border-[#163c6c] text-white space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sprout className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-black text-white leading-tight">
                Your Support Creates Lasting Change
              </h4>
            </div>
            <p className="text-[10px] text-slate-300 leading-tight">
              Every contribution directly powers life-saving medical aid, education &amp; clean water.
            </p>
            <Link
              to="/finance"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 pt-1"
            >
              <span>View Donation Impact</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Public Site Link & User Profile Bar */}
        <div className="p-3 border-t border-[#0d223f] bg-[#051120] space-y-2">
          <a
            href={getClientUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#07172c] hover:bg-emerald-500/15 text-[11px] font-semibold text-slate-200 border border-[#122e54] hover:border-emerald-500/40 transition"
          >
            {sidebarOpen && <span>View Public Website</span>}
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-black text-emerald-400 shrink-0">
                {user?.name?.slice(0, 2).toUpperCase() || "IM"}
              </div>
              {sidebarOpen && (
                <div className="truncate text-left">
                  <p className="text-xs font-bold text-white truncate">{user?.name || "Imteyazullah"}</p>
                  <p className="text-[10px] text-emerald-400 font-mono">Super Admin</p>
                </div>
              )}
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

      {/* ── MAIN CONTENT CANVAS ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── TOP HEADER (SEARCH + NOTIFICATIONS + ADMIN PILL) ── */}
        <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between shadow-2xs z-10">
          {/* Global Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search donations, donors, transactions, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition"
            />
          </div>

          {/* Right Action Icons & Admin Profile */}
          <div className="flex items-center gap-3">
            {/* Bell Notification with Counter */}
            <button
              title="Notifications"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <Bell className="w-4.5 h-4.5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                3
              </span>
            </button>

            {/* Maximize Toggle */}
            <button
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <Maximize2 className="w-4.5 h-4.5 text-slate-600" />
            </button>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs font-black text-emerald-800">
                IM
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Imteyazullah</p>
                <p className="text-[10px] text-slate-500 font-medium">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8fafc]">
          {children}
        </main>
      </div>
    </div>
  );
}
