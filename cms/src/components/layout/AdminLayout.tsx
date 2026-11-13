import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getClientUrl } from "../../services/config";
import { api } from "../../services/api";
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
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  /* ─────────────────────────────────────────────────────────
     NAVIGATION CONFIGURATION EXACTLY PER ISLAH_SUPER_ADMIN_DASHBOARD DOC (SECTION 3)
     ───────────────────────────────────────────────────────── */
  const navSections = [
    {
      key: "finance",
      label: "Donations & Finance",
      icon: Coins,
      prefix: "/finance",
      subItems: [
        { label: "Donation Management", path: "/finance" },
        { label: "Expenses & Budget", path: "/finance/expenses" },
        { label: "Bank Reconciliation", path: "/finance/reconciliation" },
        { label: "Financial Reports", path: "/finance/reports" },
        { label: "Donation Receipts", path: "/finance/receipts" },
      ],
    },
    {
      key: "membership",
      label: "Membership",
      icon: Users,
      prefix: "/membership",
      subItems: [
        { label: "Membership Overview", path: "/membership" },
        { label: "Membership Applications", path: "/membership/applications" },
        { label: "Member Records", path: "/membership/records" },
        { label: "Membership Categories", path: "/membership/categories" },
        { label: "Membership Cards", path: "/membership/cards" },
        { label: "Renewals & Expiry", path: "/membership/renewals" },
      ],
    },
    {
      key: "volunteers",
      label: "Volunteers & Mentors",
      icon: HeartHandshake,
      prefix: "/volunteers",
      subItems: [
        { label: "Overview", path: "/volunteers" },
        { label: "Volunteer Applications", path: "/volunteers/applications" },
        { label: "Mentor Applications", path: "/volunteers/mentor-applications" },
        { label: "Volunteer Directory", path: "/volunteers/directory" },
        { label: "Mentor Directory", path: "/volunteers/mentors" },
        { label: "Assignments & Activities", path: "/volunteers/activities" },
      ],
    },
    {
      key: "partners",
      label: "Partners & Sponsors",
      icon: Briefcase,
      prefix: "/partners",
      subItems: [
        { label: "Overview", path: "/partners" },
        { label: "Partner Enquiries", path: "/partners/enquiries" },
        { label: "Sponsor Enquiries", path: "/partners/sponsors-enquiries" },
        { label: "Partner Directory", path: "/partners/directory" },
        { label: "Sponsor Directory", path: "/partners/sponsors-directory" },
        { label: "Agreements & Collaborations", path: "/partners/agreements" },
      ],
    },
    {
      key: "community",
      label: "ISLAH Community",
      icon: Globe,
      prefix: "/community",
      subItems: [
        { label: "Community Overview", path: "/community" },
        { label: "Member Directory", path: "/community/members" },
        { label: "Donor Directory", path: "/community/donors" },
        { label: "Partner & Sponsor Directory", path: "/community/partners" },
        { label: "Volunteer & Mentor Directory", path: "/community/volunteers" },
      ],
    },
    {
      key: "programmes",
      label: "Programmes & Impact",
      icon: Award,
      prefix: "/programmes",
      subItems: [
        { label: "Sector Overview", path: "/programmes" },
        { label: "Initiatives", path: "/programmes/initiatives" },
        { label: "Activities", path: "/programmes/activities" },
        { label: "Beneficiary Management", path: "/programmes/beneficiaries" },
        { label: "Programme Budgets", path: "/programmes/budgets" },
        { label: "Impact Reports", path: "/programmes/reports" },
      ],
    },
    {
      key: "governance",
      label: "Governance & Reports",
      icon: Shield,
      prefix: "/governance",
      subItems: [
        { label: "Legal & Registration Documents", path: "/governance/legal" },
        { label: "Governance Records", path: "/governance/records" },
        { label: "Annual Reports", path: "/governance/annual-reports" },
        { label: "Financial Reports", path: "/governance/financial-reports" },
        { label: "Transparency & Disclosures", path: "/governance/transparency" },
      ],
    },
    {
      key: "communications",
      label: "Communications",
      icon: MessageSquare,
      prefix: "/communications",
      subItems: [
        { label: "Notifications", path: "/communications/notifications" },
        { label: "Email Management", path: "/communications/email" },
        { label: "Announcements", path: "/communications/announcements" },
        { label: "Campaign Communications", path: "/communications/campaigns" },
      ],
    },
    {
      key: "systemHealth",
      label: "System Health",
      icon: Activity,
      prefix: "/system-health",
      subItems: [
        { label: "Database Status", path: "/system-health/database" },
        { label: "API Status", path: "/system-health/api" },
        { label: "Payment Gateway", path: "/system-health/payment-gateway" },
        { label: "Email Service", path: "/system-health/email" },
        { label: "Backup & Recovery", path: "/system-health/backup" },
        { label: "Error Logs", path: "/system-health/logs" },
      ],
    },
    {
      key: "staff",
      label: "Staff & Roles",
      icon: UserCheck,
      prefix: "/staff",
      subItems: [
        { label: "Staff Directory", path: "/staff/directory" },
        { label: "User Accounts", path: "/staff/accounts" },
        { label: "Roles & Permissions", path: "/staff/roles" },
        { label: "Activity Logs", path: "/staff/logs" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 font-sans">
      {/* ── SIDEBAR (OFFICIAL WEBSITE DEEP NAVY #071527) ── */}
      <aside
        className={`${
          sidebarOpen ? "w-68" : "w-20"
        } transition-all duration-200 bg-[#071527] border-r border-[#0f2744] flex flex-col shrink-0 text-white shadow-xl z-20`}
      >
        {/* Header Branding with Official ISLAH Logo */}
        <div className="p-4 border-b border-[#0f2744] flex items-center justify-between">
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

        {/* Navigation List - Exact Section 3 Structure */}
        <nav className="p-2 space-y-0.5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          {/* 1. Dashboard */}
          <Link
            to="/dashboard"
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
            {sidebarOpen && <span className="tracking-wide">Dashboard</span>}
          </Link>

          {/* 2. Website & CMS (Direct single link - no bloated duplicate submenus) */}
          <Link
            to="/cms"
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
            {sidebarOpen && <span className="tracking-wide">Website &amp; CMS</span>}
          </Link>

          {/* 3 to 12: Expandable Sections Per Section 3 */}
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
                    {sidebarOpen && <span className="tracking-wide">{sec.label}</span>}
                  </div>
                  {sidebarOpen && (
                    isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#f97316]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )
                  )}
                </button>

                {sidebarOpen && isOpen && (
                  <div className="mt-1 ml-4 pl-2 border-l border-[#13345e] space-y-0.5 py-1">
                    {sec.subItems.map((sub, idx) => {
                      const isActive = pathname === sub.path;
                      return (
                        <Link
                          key={idx}
                          to={sub.path}
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

          {/* 13. Settings (Direct clean link to Settings page) */}
          <Link
            to="/settings"
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
            {sidebarOpen && <span className="tracking-wide">Settings</span>}
          </Link>
        </nav>
      </aside>

      {/* ── MAIN CONTENT CANVAS ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── TOP HEADER (SEARCH + NOTIFICATIONS + ADMIN PILL) ── */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-2xs z-50 sticky top-0">
          {/* Global Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything... (e.g. donors, members, programmes, reports)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#071527]/20 focus:border-[#071527] transition"
            />
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
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
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
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
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
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
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
                  {user?.name?.slice(0, 2).toUpperCase() || "IM"}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {user?.name || "Imteyazullah"}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">Super Admin</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div
                  style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 99999 }}
                  className="cms-popover absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200 py-1.5 z-[99999] text-xs"
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-800">{user?.name || "Imteyazullah"}</p>
                    <p className="text-[11px] text-slate-500">{user?.email || "admin@islah.org"}</p>
                  </div>
                  <Link
                    to="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    System Settings
                  </Link>
                  <Link
                    to="/finance/reports"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    Audited Reports
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
          {children}
        </main>
      </div>
    </div>
  );
}
