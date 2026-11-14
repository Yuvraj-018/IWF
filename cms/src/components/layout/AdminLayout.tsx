import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getClientUrl } from "../../services/config";
import { api } from "../../services/api";
import { ReauthModal } from "../common/ReauthModal";
import {
  LayoutDashboard,
  Globe,
  Coins,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Mail,
  Maximize2,
  ExternalLink,
  LogOut,
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
  Settings,
  UserCheck,
  CheckCircle2,
  Inbox,
  Clock,
  Check,
  X,
  AlertTriangle,
  KeyRound,
  User as UserIcon,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, can } = useAuth();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);

  // Live alerts & inquiries state
  const [notifications, setNotifications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("islah_read_notifications");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [readMessageIds, setReadMessageIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("islah_read_messages");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Helpers to identify active pending alerts vs resolved/archived records
  const isPendingAlert = (a: any) => {
    const s = (a.status || "").toLowerCase().trim();
    return s === "pending" || s === "under review" || s === "submitted" || !a.status;
  };

  const isUnreadMessage = (m: any) => {
    const s = (m.status || "").toLowerCase().trim();
    return s === "unread" || s === "new" || !m.status;
  };

  // Click-outside references
  const notificationsRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Load real applications & contact inquiries from backend with auto-sync
  useEffect(() => {
    let isMounted = true;
    async function fetchHeaderData() {
      try {
        const [appsRes, contactsRes] = await Promise.all([
          api.listApplications(undefined, { force: true }),
          api.listContacts({ limit: 10 }, { force: true }),
        ]);

        if (isMounted) {
          if (appsRes?.success && Array.isArray(appsRes.data)) {
            setNotifications(appsRes.data);
          }
          if (contactsRes?.success && Array.isArray(contactsRes.data)) {
            setMessages(contactsRes.data);
          }
        }
      } catch (err) {
        console.error("Failed to load header alerts:", err);
      }
    }

    fetchHeaderData();
    const interval = setInterval(fetchHeaderData, 20000); // 20s live sync
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Compute live dynamic counts
  const activePendingAlerts = notifications.filter(isPendingAlert);
  const unreadAlertsCount = activePendingAlerts.filter((n) => !readNotificationIds.has(n._id)).length;

  const unreadMessagesList = messages.filter((m) => isUnreadMessage(m) && !readMessageIds.has(m._id));
  const unreadMessagesCount = unreadMessagesList.length;

  const handleMarkAllAlertsRead = () => {
    const next = new Set(readNotificationIds);
    notifications.forEach((n) => next.add(n._id));
    setReadNotificationIds(next);
    try {
      localStorage.setItem("islah_read_notifications", JSON.stringify(Array.from(next)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotificationClick = (id: string) => {
    setReadNotificationIds((prev) => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem("islah_read_notifications", JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
    setNotificationsOpen(false);
  };

  const handleMarkAllMessagesRead = () => {
    const next = new Set(readMessageIds);
    messages.forEach((m) => {
      next.add(m._id);
      if (isUnreadMessage(m)) {
        api.updateContactStatus(m._id, "Read").catch(() => {});
      }
    });
    setReadMessageIds(next);
    try {
      localStorage.setItem("islah_read_messages", JSON.stringify(Array.from(next)));
    } catch (e) {}
  };

  const handleMessageClick = (msg: any) => {
    setReadMessageIds((prev) => {
      const next = new Set(prev).add(msg._id);
      try {
        localStorage.setItem("islah_read_messages", JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
    if (isUnreadMessage(msg)) {
      api.updateContactStatus(msg._id, "Read").catch(() => {});
    }
    setMessagesOpen(false);
  };

  // Handle click outside to auto-close popovers
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setMessagesOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Accordion state for expandable navigation items
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    finance: false,
    membership: false,
    volunteers: false,
    partners: false,
    community: false,
    programmes: false,
    governance: false,
    communications: false,
    systemHealth: false,
    staff: false,
  });

  const pathname = location.pathname;

  // Auto-expand active category
  useEffect(() => {
    if (pathname.startsWith("/finance")) {
      setExpanded((p) => ({ ...p, finance: true }));
    } else if (pathname.startsWith("/membership")) {
      setExpanded((p) => ({ ...p, membership: true }));
    } else if (pathname.startsWith("/volunteers")) {
      setExpanded((p) => ({ ...p, volunteers: true }));
    } else if (pathname.startsWith("/partners")) {
      setExpanded((p) => ({ ...p, partners: true }));
    } else if (pathname.startsWith("/community")) {
      setExpanded((p) => ({ ...p, community: true }));
    } else if (pathname.startsWith("/programmes")) {
      setExpanded((p) => ({ ...p, programmes: true }));
    } else if (pathname.startsWith("/governance")) {
      setExpanded((p) => ({ ...p, governance: true }));
    } else if (pathname.startsWith("/communications")) {
      setExpanded((p) => ({ ...p, communications: true }));
    } else if (pathname.startsWith("/system-health")) {
      setExpanded((p) => ({ ...p, systemHealth: true }));
    } else if (pathname.startsWith("/staff")) {
      setExpanded((p) => ({ ...p, staff: true }));
    }
  }, [pathname]);

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ─────────────────────────────────────────────────────────
     PERMISSION-DRIVEN NAVIGATION CONFIGURATION
     Filterable by user permissions; empty sections automatically hidden
     ───────────────────────────────────────────────────────── */
  const rawNavSections = [
    {
      key: "finance",
      label: "Donations & Finance",
      icon: Coins,
      prefix: "/finance",
      subItems: [
        { label: "Donation Management", path: "/finance", permission: "finance.donation:view" },
        { label: "Expenses & Budget", path: "/finance/expenses", permission: "finance.expense:view" },
        { label: "Bank Reconciliation", path: "/finance/reconciliation", permission: "finance.reconcile:view" },
        { label: "Financial Reports", path: "/finance/reports", permission: "finance.report:view" },
        { label: "Donation Receipts", path: "/finance/receipts", permission: "finance.receipt:view" },
        { label: "Refunds", path: "/finance/refunds", permission: "finance.refund:view" },
        { label: "Budgets", path: "/finance/budgets", permission: "finance.budget:view" },
      ],
    },
    {
      key: "membership",
      label: "Membership",
      icon: Users,
      prefix: "/membership",
      subItems: [
        { label: "Membership Overview", path: "/membership", permission: "membership.member:view" },
        { label: "Membership Applications", path: "/membership/applications", permission: "membership.application:view" },
        { label: "Member Records", path: "/membership/records", permission: "membership.member:view" },
        { label: "Membership Categories", path: "/membership/categories", permission: "membership.member:view" },
        { label: "Membership Cards", path: "/membership/cards", permission: "membership.member:view" },
        { label: "Renewals & Expiry", path: "/membership/renewals", permission: "membership.member:view" },
      ],
    },
    {
      key: "volunteers",
      label: "Volunteers & Mentors",
      icon: HeartHandshake,
      prefix: "/volunteers",
      subItems: [
        { label: "Overview", path: "/volunteers", permission: "membership.application:view" },
        { label: "Volunteer Applications", path: "/volunteers/applications", permission: "membership.application:view" },
        { label: "Mentor Applications", path: "/volunteers/mentor-applications", permission: "membership.application:view" },
        { label: "Volunteer Directory", path: "/volunteers/directory", permission: "membership.application:view" },
        { label: "Mentor Directory", path: "/volunteers/mentors", permission: "membership.application:view" },
        { label: "Assignments & Activities", path: "/volunteers/activities", permission: "membership.application:view" },
      ],
    },
    {
      key: "partners",
      label: "Partners & Sponsors",
      icon: Briefcase,
      prefix: "/partners",
      subItems: [
        { label: "Overview", path: "/partners", permission: "membership.application:view" },
        { label: "Partner Enquiries", path: "/partners/enquiries", permission: "membership.application:view" },
        { label: "Sponsor Enquiries", path: "/partners/sponsors-enquiries", permission: "membership.application:view" },
        { label: "Partner Directory", path: "/partners/directory", permission: "membership.application:view" },
        { label: "Sponsor Directory", path: "/partners/sponsors-directory", permission: "membership.application:view" },
        { label: "Agreements & Collaborations", path: "/partners/agreements", permission: "membership.application:view" },
      ],
    },
    {
      key: "community",
      label: "ISLAH Community",
      icon: Globe,
      prefix: "/community",
      subItems: [
        { label: "Community Overview", path: "/community", permission: "community.directory:view" },
        { label: "Member Directory", path: "/community/members", permission: "community.directory:view" },
        { label: "Donor Directory", path: "/community/donors", permission: "community.directory:view" },
        { label: "Partner & Sponsor Directory", path: "/community/partners", permission: "community.directory:view" },
        { label: "Volunteer & Mentor Directory", path: "/community/volunteers", permission: "community.directory:view" },
      ],
    },
    {
      key: "programmes",
      label: "Programmes & Impact",
      icon: Award,
      prefix: "/programmes",
      subItems: [
        { label: "Sector Overview", path: "/programmes", permission: "programme.overview:view" },
        { label: "Initiatives", path: "/programmes/initiatives", permission: "programme.initiative:view" },
        { label: "Activities", path: "/programmes/activities", permission: "programme.activity:view" },
        { label: "Beneficiary Management", path: "/programmes/beneficiaries", permission: "programme.beneficiary:view" },
        { label: "Impact Reports", path: "/programmes/reports", permission: "programme.impact:view" },
      ],
    },
    {
      key: "governance",
      label: "Governance & Reports",
      icon: Shield,
      prefix: "/governance",
      subItems: [
        { label: "Legal & Registration", path: "/governance/legal", permission: "governance.document:view" },
        { label: "Governance Records", path: "/governance/records", permission: "governance.document:view" },
        { label: "Annual Reports", path: "/governance/annual-reports", permission: "governance.report:view" },
        { label: "Financial Reports", path: "/governance/financial-reports", permission: "finance.report:view" },
        { label: "Transparency & Disclosures", path: "/governance/transparency", permission: "governance.disclosure:view" },
      ],
    },
    {
      key: "communications",
      label: "Communications",
      icon: MessageSquare,
      prefix: "/communications",
      subItems: [
        { label: "Notifications", path: "/communications/notifications", permission: "comms.notice:view" },
        { label: "Email Management", path: "/communications/email", permission: "comms.email:view" },
        { label: "Announcements", path: "/communications/announcements", permission: "comms.notice:view" },
        { label: "Campaign Communications", path: "/communications/campaigns", permission: "comms.campaign:view" },
      ],
    },
    {
      key: "systemHealth",
      label: "System Health",
      icon: Activity,
      prefix: "/system-health",
      subItems: [
        { label: "Database Status", path: "/system-health/database", permission: "system.health:view" },
        { label: "API Status", path: "/system-health/api", permission: "system.health:view" },
        { label: "Payment Gateway", path: "/system-health/payment-gateway", permission: "system.health:view" },
        { label: "Email Service", path: "/system-health/email", permission: "system.health:view" },
        { label: "Backup & Recovery", path: "/system-health/backup", permission: "system.health:view" },
        { label: "Error Logs", path: "/system-health/logs", permission: "system.health:view" },
      ],
    },
    {
      key: "staff",
      label: "Staff & Governance",
      icon: UserCheck,
      prefix: "/staff",
      subItems: [
        { label: "User Accounts", path: "/staff/accounts", permission: "system.staff:view" },
        { label: "Roles & Permissions", path: "/staff/roles", permission: "system.role:view" },
        { label: "Staff Directory", path: "/staff/directory", permission: "system.staff:view" },
        { label: "Activity Logs", path: "/staff/logs", permission: "system.audit:view" },
      ],
    },
  ];

  // Filter sections and sub-items based on user permissions
  const navSections = rawNavSections
    .map((sec) => ({
      ...sec,
      subItems: sec.subItems.filter((sub) => can(sub.permission)),
    }))
    .filter((sec) => sec.subItems.length > 0);

  const canViewCms =
    can("cms.dashboard:view") ||
    can("cms.page:view") ||
    can("cms.news:view") ||
    can("cms.media:view");

  const canViewSettings = can("cms.settings:view") || can("cms.settings:edit");

  const renderNavLinks = (isExpanded: boolean, onNavigate?: () => void) => (
    <>
      {/* 1. Dashboard */}
      <Link
        to="/dashboard"
        onClick={onNavigate}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-semibold transition ${
          pathname === "/" || pathname === "/dashboard"
            ? "bg-[#0d2a4d] text-white font-bold border-l-4 border-[#f97316] shadow-2xs"
            : "text-slate-300 hover:text-white hover:bg-[#0c2444]"
        }`}
      >
        <LayoutDashboard
          className={`w-4 h-4 shrink-0 ${
            pathname === "/" || pathname === "/dashboard" ? "text-[#f97316]" : "text-slate-400"
          }`}
        />
        {isExpanded && <span className="tracking-wide">Dashboard</span>}
      </Link>

      {/* 2. Website & CMS (Gated by permission) */}
      {canViewCms && (
        <Link
          to="/cms"
          onClick={onNavigate}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-semibold transition ${
            pathname.startsWith("/cms")
              ? "bg-[#0d2a4d] text-white font-bold border-l-4 border-[#f97316] shadow-2xs"
              : "text-slate-300 hover:text-white hover:bg-[#0c2444]"
          }`}
        >
          <Globe
            className={`w-4 h-4 shrink-0 ${
              pathname.startsWith("/cms") ? "text-[#f97316]" : "text-slate-400"
            }`}
          />
          {isExpanded && <span className="tracking-wide">Website &amp; CMS</span>}
        </Link>
      )}

      {/* Expandable Sections Filtered by RBAC */}
      {navSections.map((sec) => {
        const Icon = sec.icon;
        const isSectionActive = pathname.startsWith(sec.prefix);
        const isOpen = expanded[sec.key];

        return (
          <div key={sec.key}>
            <button
              onClick={() => toggleSection(sec.key)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                isSectionActive
                  ? "bg-[#0d2a4d] text-white font-bold border-l-4 border-[#f97316] shadow-2xs"
                  : isOpen
                  ? "text-white bg-[#0a203b]"
                  : "text-slate-300 hover:text-white hover:bg-[#0c2444]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 ${isSectionActive ? "text-[#f97316]" : "text-slate-400"}`}
                />
                {isExpanded && <span className="tracking-wide">{sec.label}</span>}
              </div>
              {isExpanded && (
                isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#f97316]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )
              )}
            </button>

            {isExpanded && isOpen && (
              <div className="mt-1 ml-4 pl-2 border-l border-[#13345e] space-y-0.5 py-1">
                {sec.subItems.map((sub, idx) => {
                  const isActive = pathname === sub.path;
                  return (
                    <Link
                      key={idx}
                      to={sub.path}
                      onClick={onNavigate}
                      className={`block px-3 py-1.5 rounded-md text-[11px] font-medium transition ${
                        isActive
                          ? "bg-[#0e315b] text-white font-bold border-l-2 border-[#f97316]"
                          : "text-slate-300 hover:text-white hover:bg-[#0c2444]"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Settings (Gated by permission) */}
      {canViewSettings && (
        <Link
          to="/settings"
          onClick={onNavigate}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-semibold transition ${
            pathname === "/settings"
              ? "bg-[#0d2a4d] text-white font-bold border-l-4 border-[#f97316] shadow-2xs"
              : "text-slate-300 hover:text-white hover:bg-[#0c2444]"
          }`}
        >
          <Settings
            className={`w-4 h-4 shrink-0 ${
              pathname === "/settings" ? "text-[#f97316]" : "text-slate-400"
            }`}
          />
          {isExpanded && <span className="tracking-wide">Settings</span>}
        </Link>
      )}
    </>
  );

  return (
    <div className="h-screen bg-[#f8fafc] flex text-slate-900 font-sans overflow-hidden">
      {/* ── DESKTOP SIDEBAR (HIDDEN ON MOBILE, VISIBLE ON LG+) ── */}
      <aside
        className={`hidden lg:flex ${
          sidebarOpen ? "w-68" : "w-20"
        } sticky top-0 h-screen transition-all duration-200 bg-[#071527] border-r border-[#0f2744] flex-col shrink-0 text-white shadow-xl z-20 overflow-hidden`}
      >
        {/* Desktop Header */}
        <div className="p-4 border-b border-[#0f2744] flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-3 overflow-hidden group">
            <img
              src="/islah_logo.png"
              alt="ISLAH Logo"
              className="h-10 w-auto object-contain shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
            {sidebarOpen && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-black text-white tracking-wider uppercase">ISLAH</h2>
                  <span className="text-[9px] font-bold bg-[#f97316]/20 text-[#f97316] px-1.5 py-0.5 rounded border border-[#f97316]/30 uppercase">
                    Admin
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium truncate">Welfare Foundation</p>
                <p className="text-[9px] text-[#f97316] font-semibold italic truncate">Together for a Better Tomorrow</p>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation List with Dynamic Independent Scrollbar */}
        <nav className="p-2 space-y-0.5 flex-1 overflow-y-auto overflow-x-hidden sidebar-scrollbar">
          {renderNavLinks(sidebarOpen)}
        </nav>
      </aside>

      {/* ── MOBILE BACKDROP OVERLAY ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* ── MOBILE DRAWER SIDEBAR (SLIDES OUT ON TOGGLE) ── */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] h-full bg-[#071527] border-r border-[#0f2744] flex flex-col text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-[#0f2744] flex items-center justify-between shrink-0">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 overflow-hidden">
            <img
              src="/islah_logo.png"
              alt="ISLAH Logo"
              className="h-9 w-auto object-contain shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-black text-white tracking-wider uppercase">ISLAH</h2>
                <span className="text-[9px] font-bold bg-[#f97316]/20 text-[#f97316] px-1.5 py-0.5 rounded border border-[#f97316]/30 uppercase">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium truncate">Welfare Foundation</p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            title="Close Menu"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        <nav className="p-2 space-y-0.5 flex-1 overflow-y-auto overflow-x-hidden sidebar-scrollbar">
          {renderNavLinks(true, () => setMobileOpen(false))}
        </nav>
      </aside>

      {/* ── MAIN CONTENT CANVAS ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* ── TOP HEADER (SEARCH + NOTIFICATIONS + ADMIN PILL) ── */}
        <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shadow-2xs z-40 sticky top-0 shrink-0">
          {/* Global Search Bar + Mobile Hamburger Button */}
          <div className="flex items-center gap-2 flex-1 max-w-md mr-2 sm:mr-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#f97316] hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0 border border-slate-200"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search anything... (e.g. donors, members, reports)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#071527]/20 focus:border-[#071527] transition"
              />
            </div>
          </div>

          {/* Right Header Badges and Actions */}
          <div className="flex items-center gap-4">
            {/* View Live Public Site */}
            <a
              href={getClientUrl()}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#071527] px-3 py-1.5 rounded-md hover:bg-slate-100 transition"
              title="Open Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Live Website</span>
            </a>

            {/* Notification Bell with Live Dynamic Count */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setMessagesOpen(false);
                  setUserDropdownOpen(false);
                }}
                className={`p-2 rounded-full transition relative cursor-pointer ${
                  notificationsOpen ? "bg-slate-100 text-[#071527]" : "text-slate-600 hover:text-[#071527] hover:bg-slate-100"
                }`}
                title="Notifications & Approvals"
              >
                <Bell className="w-4 h-4" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div
                  style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 99999 }}
                  className="cms-popover absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200 py-0 z-[99999] overflow-hidden"
                >
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#f97316]" />
                      <span className="font-extrabold text-xs text-slate-800">Pending Approvals &amp; Alerts</span>
                      {unreadAlertsCount > 0 ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                          {unreadAlertsCount}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                          0
                        </span>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={handleMarkAllAlertsRead}
                        className="text-[10px] text-slate-500 hover:text-[#f97316] font-semibold cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 bg-white">
                    {activePendingAlerts.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs bg-white">
                        <CheckCircle2 className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-80" />
                        <p className="font-bold text-slate-700">All caught up!</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">No pending applications or critical alerts requiring action.</p>
                      </div>
                    ) : (
                      activePendingAlerts.slice(0, 6).map((item) => {
                        const isRead = readNotificationIds.has(item._id);
                        return (
                          <Link
                            key={item._id}
                            to="/membership/applications"
                            onClick={() => handleNotificationClick(item._id)}
                            style={{ backgroundColor: isRead ? "#ffffff" : "#fffaf5" }}
                            className="p-3.5 hover:bg-slate-50 transition flex items-start gap-3 block text-left"
                          >
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5">
                              <FileCheck2 className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <p className={`text-xs truncate ${isRead ? "text-slate-600 font-semibold" : "text-slate-900 font-bold"}`}>
                                  {item.type ? item.type.toUpperCase() : "APPLICATION"}: {item.fullName || "New Applicant"}
                                </p>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200/50 shrink-0">
                                  {item.status || "Pending"}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                {item.email || item.phone || "Awaiting administrative review"}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Recent"}
                              </p>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      to="/membership/applications"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] transition block py-1"
                    >
                      View All Applications &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Messages Mail with Live Dynamic Count */}
            <div className="relative" ref={messagesRef}>
              <button
                onClick={() => {
                  setMessagesOpen(!messagesOpen);
                  setNotificationsOpen(false);
                  setUserDropdownOpen(false);
                }}
                className={`p-2 rounded-full transition relative cursor-pointer ${
                  messagesOpen ? "bg-slate-100 text-[#071527]" : "text-slate-600 hover:text-[#071527] hover:bg-slate-100"
                }`}
                title="Inbound Messages & Enquiries"
              >
                <Mail className="w-4 h-4" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-[#f97316] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              {messagesOpen && (
                <div
                  style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 99999 }}
                  className="cms-popover absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200 py-0 z-[99999] overflow-hidden"
                >
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#f97316]" />
                      <span className="font-extrabold text-xs text-slate-800">Inbound Enquiries &amp; Messages</span>
                      {unreadMessagesCount > 0 ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-[#f97316]">
                          {unreadMessagesCount} unread
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                          0 unread
                        </span>
                      )}
                    </div>
                    {messages.length > 0 && (
                      <button
                        onClick={handleMarkAllMessagesRead}
                        className="text-[10px] text-slate-500 hover:text-[#f97316] font-semibold cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 bg-white">
                    {messages.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-xs bg-white">
                        <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-bold text-slate-700">No inbound messages</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Public inquiries from the contact form will appear here in real time.</p>
                      </div>
                    ) : (
                      messages.slice(0, 6).map((item) => {
                        const isUnread = isUnreadMessage(item) && !readMessageIds.has(item._id);
                        return (
                          <Link
                            key={item._id}
                            to="/communications"
                            onClick={() => handleMessageClick(item)}
                            style={{ backgroundColor: isUnread ? "#fffaf5" : "#ffffff" }}
                            className="p-3.5 hover:bg-slate-50 transition flex items-start gap-3 block text-left"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                              isUnread ? "bg-orange-100 text-[#f97316] border-orange-200" : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}>
                              {item.name ? item.name.slice(0, 2).toUpperCase() : "IN"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <p className={`text-xs truncate ${isUnread ? "font-extrabold text-slate-900" : "font-semibold text-slate-700"}`}>
                                  {item.name || "Anonymous Inquirer"}
                                </p>
                                {isUnread ? (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-100 text-[#f97316] font-bold shrink-0">
                                    New
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-slate-400 shrink-0 font-medium">
                                    {item.status || "Read"}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] font-semibold text-slate-700 truncate mt-0.5">
                                {item.subject || "General Enquiry"}
                              </p>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {item.message || "No message body"}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recent"}
                              </p>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      to="/communications"
                      onClick={() => setMessagesOpen(false)}
                      className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] transition block py-1"
                    >
                      View All Inquiries &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-600 hover:text-[#071527] hover:bg-slate-100 rounded-full transition cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* User Profile Pill & Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setNotificationsOpen(false);
                  setMessagesOpen(false);
                }}
                className="flex items-center gap-2.5 p-1.5 pl-2 hover:bg-slate-100 rounded-lg transition cursor-pointer border border-transparent hover:border-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center font-black text-xs border border-[#163c6c] shadow-2xs">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium capitalize">
                    {user?.roles?.[0]?.replace(/_/g, " ") || user?.role || "Staff"}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div
                  style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 99999 }}
                  className="cms-popover absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200 py-1.5 z-[99999] text-xs"
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-800">{user?.name || "Administrator"}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email || "admin@iwfindia.org"}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {user?.roles?.map((r) => (
                        <span key={r} className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 font-semibold text-slate-700">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-orange-500" />
                    <span>Security &amp; Account</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>System Settings</span>
                  </Link>
                  <Link
                    to="/finance/reports"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    <Receipt className="w-3.5 h-3.5 text-slate-400" />
                    <span>Audited Reports</span>
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3.5 py-2 text-red-600 hover:bg-red-50 font-bold border-t border-slate-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── WORKSPACE VIEWPORT ── */}
        <main className="cms-canvas flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8fafc]">
          {/* Super Admin Advisory Notice for Report Mode */}
          {user?.roles?.includes("super_admin") && user?.rbacEnforcementMode !== "enforce" && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-800">
              <div className="flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Advisory:</strong> RBAC engine is currently operating in <strong>REPORT MODE</strong>. Policy violations are monitored in audit logs rather than rejected.
                </span>
              </div>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                Report Mode
              </span>
            </div>
          )}

          {children}
        </main>
      </div>

      {/* Global High-Risk Re-Authentication Challenge Modal */}
      <ReauthModal />
    </div>
  );
}
