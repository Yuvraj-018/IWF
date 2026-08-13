import { useCallback, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  Award,
  BarChart2,
  Briefcase,
  Building2,
  ChevronDown,
  Facebook,
  Globe,
  Heart,
  Home,
  Instagram,
  Leaf,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Twitter,
  UserCheck,
  X,
  Youtube,
} from "lucide-react";
import { CONTACT_DETAILS } from "@/content/siteContent";
import type { RoleType } from "@/components/forms/RoleFormModal";

export { RoleFormModal } from "@/components/forms/RoleFormModal";
import { TranslateButton } from "@/components/TranslateButton";
import newLogo from "@/assets/new logo.png";

export const NAV_ITEMS = [
  "Home",
  "About Us",
  "What We Do",
  "Programs",
  "Impact",
  "Media",
  "Membership",
  "Get Involved",
  "Contact Us",
];

export interface MegaSection {
  cols: number;
  items: string[];
}

export const MEGA_DATA: Record<string, MegaSection> = {
  "About Us": {
    cols: 3,
    items: [
      "Overview",
      "Our Objective & Vision",
      "Vision 2047",
      "Leadership & Management",
      "Governance & Transparency",
      "Legal Status & Registration",
      "Members & Donors",
      "Our Partners & Donors",
    ],
  },
  "What We Do": {
    cols: 4,
    items: [
      "Education",
      "Health Care",
      "Skills Development",
      "Women Empowerment",
      "Entrepreneur Development",
      "Relief & Rehabilitation",
      "Environment & Sustainability",
      "Agriculture & Rural Livelihood",
    ],
  },
  Programs: {
    cols: 1,
    items: ["View All Programs"],
  },
  Impact: {
    cols: 3,
    items: [
      "Our Impact",
      "Outcomes",
      "Where We Work",
      "Success Stories",
      "Annual Reports",
      "Impact Statistics Dashboard",
    ],
  },
  Media: {
    cols: 3,
    items: ["News & Events", "Latest Updates", "Newsletters", "Publications", "Press Release", "Gallery"],
  },
  "Get Involved": {
    cols: 3,
    items: [
      "Volunteer With Us",
      "Partner With Us",
      "Become a Member",
      "Sponsor a Programme",
      "Become a Mentor",
      "Careers & Opportunities",
      "Donate & Support",
    ],
  },
};

function getTopNavHref(item: string) {
  if (item === "Home") return "/";
  if (item === "About Us") return "/about";
  if (item === "What We Do") return "/programs";
  if (item === "Programs") return "/programs";
  if (item === "Impact") return "/#impact-stats";
  if (item === "Media") return "/news-and-events";
  if (item === "Membership") return "/membership";
  if (item === "Get Involved") return "/#get-involved";
  if (item === "Contact Us") return "/contact";
  return "#";
}

function getMegaHref(menu: string, item: string) {
  // About Us
  if (menu === "About Us" && item === "Overview") return "/about";
  if (menu === "About Us" && item === "Our Objective & Vision") return "/about/objective-and-vision";
  if (menu === "About Us" && item === "Vision 2047") return "/about/vision-2047";
  if (menu === "About Us" && item === "Leadership & Management") return "/about/leadership";
  if (menu === "About Us" && item === "Governance & Transparency") return "/about/governance";
  if (menu === "About Us" && item === "Legal Status & Registration") return "/about/legal-status";
  if (menu === "About Us" && (item === "Members & Donors" || item === "Members & Supporters")) return "/members-and-donors";
  if (menu === "About Us" && item === "Membership Policy") return "/membership#status";
  if (menu === "About Us" && (item === "Our Partners & Donors" || item === "Partners & Donors")) return "/about/partners";
  // What We Do
  if (menu === "What We Do" && item === "Education") return "/programs/education";
  if (menu === "What We Do" && item === "Health Care") return "/programs/healthcare";
  if (menu === "What We Do" && item === "Skills Development") return "/programs/skills-development";
  if (menu === "What We Do" && item === "Women Empowerment") return "/programs/women-empowerment";
  if (menu === "What We Do" && item === "Entrepreneur Development") return "/programs/entrepreneur-development";
  if (menu === "What We Do" && item === "Relief & Rehabilitation") return "/programs/relief-and-rehabilitation";
  if (menu === "What We Do" && item === "Environment & Sustainability") return "/programs/environment";
  if (menu === "What We Do" && item === "Agriculture & Rural Livelihood") return "/programs/agriculture";
  // Programs
  if (menu === "Programs" && item === "View All Programs") return "/programs";
  // Media & Updates
  if (menu === "Media" && item === "News & Events") return "/news-and-events";
  if (menu === "Media" && item === "Latest Updates") return "/news-and-events";
  if (menu === "Media" && item === "Gallery") return "/gallery";
  if (menu === "Media" && item === "Publications") return "/news-and-events";
  if (menu === "Media" && item === "Press Releases") return "/news-and-events";
  if (menu === "Media" && item === "Annual Reports") return "/news-and-events";
  if (menu === "Media" && item === "Success Stories") return "/news-and-events";
  if (menu === "Media" && item === "Newsletters") return "/news-and-events";
  // Get Involved
  if (menu === "Get Involved" && item === "Careers & Opportunities") return "#careers";
  if (menu === "Get Involved" && item === "Donate & Support") return "/donate";
  if (menu === "Get Involved" && item === "Volunteer With Us") return "/#get-involved";
  if (menu === "Get Involved" && item === "Partner With Us") return "/about/partners";
  if (menu === "Get Involved" && item === "Sponsor a Programme") return "/#get-involved";
  if (menu === "Get Involved" && item === "Become a Mentor") return "/#get-involved";
  if (menu === "Get Involved" && item === "Become a Member") return "/members-and-donors";
  // Contact
  if (item === "Contact Us") return "/contact";
  return "#";
}


export function NotificationTicker() {
  const items = [
    { text: "Notification for change in Registration", href: "/about/legal-status" },
    { text: "Islah Welfare Foundation — Official Website", href: "/" },
    { text: "Registration address updated to Bathiya, Darbhanga, Bihar", href: "/about" },
    { text: "Join our mission — volunteer, donate or partner with us", href: "/#get-involved" },
    { text: "Free Health Camp — Bathiya, Darbhanga | June 25", href: "/news-and-events" },
    { text: "Annual Scholarship Distribution — Muzaffarpur | July 15", href: "/news-and-events" },
  ];
  const loopItems = [...items, ...items];

  return (
    <div className="bg-gradient-to-r from-[#0f1b2d] via-[#1c558c] to-[#2b88d8] text-white py-2 overflow-hidden flex items-center relative select-none border-b border-white/10 shadow-sm group">
      <div className="bg-red-600 text-[10px] uppercase px-2 py-0.5 rounded font-black tracking-wider shadow z-10 shrink-0 ml-4 mr-4 animate-pulse">
        NEW
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {loopItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="inline-flex items-center gap-3 hover:underline underline-offset-2 text-white"
            >
              <span className="text-sm font-semibold italic tracking-wide px-3 text-white">{item.text}</span>
              <span className="text-white/60 text-base px-1">◆</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

interface UtilityBarProps {
  lang?: "en" | "hi";
  setLang?: (l: "en" | "hi") => void;
}

export function UtilityBar({ lang = "en", setLang }: UtilityBarProps) {
  return null;
}

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const openMenu = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(MEGA_DATA[name] ? name : null);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const hasDropdown = activeMenu && MEGA_DATA[activeMenu];

  const isRouteActive = (item: string) =>
    (item === "Home" && pathname === "/") ||
    (item === "About Us" && pathname.startsWith("/about")) ||
    (item === "Membership" && pathname.startsWith("/membership")) ||
    ((item === "What We Do" || item === "Programs") && pathname.startsWith("/programs"));

  const getHeaderHref = (item: string) => {
    if (item === "What We Do" && pathname === "/") return "#focus-areas";
    return getTopNavHref(item);
  };

  const handleHeaderClick = (item: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (item !== "What We Do" || pathname !== "/") return;
    event.preventDefault();
    setActiveMenu(null);
    document.getElementById("focus-areas")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* White Branding Logo Banner (Scrolls away) */}
      <div className="bg-white py-4 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-center">
          <a href="/" className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group text-center md:text-left" aria-label="IWF Home">
            <img src={newLogo} alt="IWF Logo" className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105 shrink-0" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl md:text-3xl font-extrabold text-[#0b1f3b] tracking-wide font-sans leading-tight text-center md:text-left">
                ISLAH WELFARE FOUNDATION
              </span>
              <span className="text-xs md:text-sm font-semibold italic text-brand-orange mt-1.5 leading-none text-center md:text-left">
                Planting Seeds of Hope and Change
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 font-medium mt-1.5 leading-none text-center md:text-left">
                Bathiya, Darbhanga, Bihar – 847423, India
              </span>
            </div>
          </a>
        </div>
      </div>
      {/* Dark Themed Menu Navbar (Sticky) */}
      <header className="bg-[#071527] text-white sticky top-0 z-50 shadow-md transition-all duration-200 py-1 relative">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* Left Group: Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const hasMega = !!MEGA_DATA[item];
              const isActive = activeMenu === item;
              const label = item === "Home" ? (
                <span className="flex items-center gap-1.5 font-bold">
                  <Home className="w-4 h-4 text-[#f97316]" /> IWF
                </span>
              ) : (
                item
              );

              return (
                <div
                  key={item}
                  onMouseEnter={() => hasMega && openMenu(item)}
                  onMouseLeave={hasMega ? scheduleClose : undefined}
                >
                  <a
                    href={getHeaderHref(item)}
                    className={`relative flex items-center gap-1.5 font-semibold text-sm transition-all px-4 py-3 rounded-md group ${
                      isRouteActive(item) ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={(event) => {
                      handleHeaderClick(item, event);
                      if (!hasMega) {
                        setActiveMenu(null);
                      }
                    }}
                  >
                    {label}
                    {hasMega && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isActive ? "rotate-180 text-white" : "text-white/60"
                        }`}
                      />
                    )}
                    {/* Sliding underline */}
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200 ease-out" />
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Right Group: Donate Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0 py-1.5 ml-auto lg:ml-0">
            <a
              href="/donate"
              className="bg-[#f97316] hover:bg-orange-600 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-md shadow-md transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
            >
              DONATE NOW
            </a>
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Full-Width Mega Menu Dropdown Window */}
        {activeMenu && MEGA_DATA[activeMenu] && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 w-full bg-white border-b-2 border-brand-orange shadow-2xl text-slate-800 z-50 animate-in fade-in slide-in-from-top-1 duration-150 py-6 px-4 md:px-8"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#0b1f3b]">
                    {activeMenu}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Quick Links</span>
              </div>
              <div
                className="grid gap-6 md:gap-8"
                style={{ gridTemplateColumns: `repeat(${MEGA_DATA[activeMenu].cols}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: MEGA_DATA[activeMenu].cols }).map((_, colIndex) => {
                  const subItems = MEGA_DATA[activeMenu].items;
                  const colsCount = MEGA_DATA[activeMenu].cols;
                  const itemsPerCol = Math.ceil(subItems.length / colsCount);
                  const colItems = subItems.slice(colIndex * itemsPerCol, (colIndex + 1) * itemsPerCol);
                  return (
                    <div key={colIndex} className="flex flex-col gap-3">
                      {colItems.map((subItem, subIdx) => (
                        <a
                          key={subItem}
                          href={getMegaHref(activeMenu, subItem)}
                          className="flex items-center gap-2 text-slate-900 font-bold hover:text-brand-orange text-sm md:text-base hover:translate-x-1.5 transition-all duration-200 group"
                          style={{
                            transitionDelay: `${(colIndex * 3 + subIdx) * 15}ms`,
                          }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="text-brand-orange text-sm font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                          {subItem}
                        </a>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#0b1f3b] text-white">
            <div className="flex items-center gap-2.5">
              <Leaf className="w-6 h-6 text-brand-green fill-brand-green/20" />
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-white text-base">IWF</span>
                <span className="font-semibold text-[8px] text-white/70 tracking-wider">ISLAH WELFARE FOUNDATION</span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 text-white/80 hover:text-white transition-colors rounded cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 py-2 overflow-y-auto" aria-label="Mobile navigation items">
            {NAV_ITEMS.map((item) => {
              const hasMega = !!MEGA_DATA[item];
              const isExpanded = mobileExpanded === item;
              return (
                <div key={item} className="border-b border-slate-100 last:border-0">
                  <div className="flex items-center">
                    <a
                      href={getHeaderHref(item)}
                      className="flex-1 px-5 py-3.5 text-sm font-semibold text-slate-800 hover:text-brand-green transition-colors"
                      onClick={(event) => {
                        handleHeaderClick(item, event);
                        if (event.defaultPrevented) {
                          setMobileOpen(false);
                          return;
                        }
                        if (!hasMega) setMobileOpen(false);
                        else setMobileExpanded(isExpanded ? null : item);
                      }}
                    >
                      {item === "Home" ? (
                        <span className="flex items-center gap-1.5 font-bold">
                          <Home className="w-4 h-4 text-[#f97316]" /> IWF
                        </span>
                      ) : (
                        item
                      )}
                    </a>
                    {hasMega && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item)}
                        className="px-4 py-3.5 text-slate-400 hover:text-brand-green transition-colors cursor-pointer"
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand-green" : ""}`} />
                      </button>
                    )}
                  </div>
                  {hasMega && isExpanded && (
                    <div className="bg-slate-50 border-l-4 border-brand-green ml-4 mr-2 rounded-sm mb-1.5 py-1">
                      {MEGA_DATA[item].items.map((sub) => (
                        <a
                          key={sub}
                          href={getMegaHref(item, sub)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-brand-green hover:bg-white transition-all"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-brand-orange text-xs">→</span>
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-100 shrink-0">
            <a
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block text-center w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors uppercase tracking-wide text-sm"
            >
              DONATE NOW
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
  const quickLinks = [
    ["About Us", "/about"],
    ["Education", "/programs/education"],
    ["Healthcare", "/programs/healthcare"],
    ["Skills Development", "/programs/skills-development"],
    ["Women Empowerment", "/programs/women-empowerment"],
    ["Get In Touch", "/contact"],
    ["Donate", "/donate"],
    ["Membership", "/membership"],
    ["News & Events", "/news-and-events"],
  ];

  return (
    <footer className="w-full">
      <div className="bg-[#0b1f3b] text-white py-14 px-4 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-1.5 shrink-0">
                <img src={newLogo} alt="IWF Logo" className="h-10 w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-widest text-white leading-none">IWF</span>
                <span className="font-medium text-[11px] tracking-wide text-white/70 mt-0.5">Islah Welfare Foundation</span>
              </div>
            </div>
            <div className="text-brand-orange font-medium text-sm">Care | Empower | Uplift</div>
            <p className="text-white text-sm leading-relaxed">
              Islah Welfare Foundation empowers underprivileged communities through education, healthcare, women empowerment, skill development and social welfare initiatives.
            </p>
            <div>
              <span className="block text-xs font-bold tracking-widest text-white uppercase mb-2">Follow Us</span>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, color: "bg-[#1877f2] hover:bg-[#166fe5]", href: "https://facebook.com", label: "Facebook" },
                  { Icon: Instagram, color: "bg-gradient-to-tr from-[#f9cb2f] via-[#e5195f] to-[#8134af] hover:opacity-90", href: "https://instagram.com", label: "Instagram" },
                  { Icon: Youtube, color: "bg-[#ff0000] hover:bg-[#e60000]", href: "https://youtube.com", label: "YouTube" },
                  { Icon: Linkedin, color: "bg-[#0077b5] hover:bg-[#00669c]", href: "https://linkedin.com", label: "LinkedIn" },
                  { Icon: Twitter, color: "bg-[#1da1f2] hover:bg-[#0d95e8]", href: "https://twitter.com", label: "Twitter" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-7 h-7 rounded-full ${s.color} flex items-center justify-center text-white transition-all duration-200 shadow-sm`} aria-label={s.label}>
                    <s.Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Leaf className="w-4 h-4 text-brand-orange" /> Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="inline-flex items-center text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200">
                    <span className="text-brand-orange text-xs mr-2">-&gt;</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Building2 className="w-4 h-4 text-brand-orange" /> Get Involved
            </h4>
            <ul className="space-y-2.5">
              {[
                ["Volunteer With Us", "volunteer"],
                ["Partner With Us", "partner"],
                ["Sponsor a Programme", "sponsor"],
                ["Become a Mentor", "mentor"],
                ["Careers & Opportunities", "employee"],
              ].map(([label, type]) => (
                <li key={label}>
                  <button
                    onClick={() => onOpenModal(type as RoleType)}
                    className="inline-flex items-center text-left text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-brand-orange text-xs mr-2">-&gt;</span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Scale className="w-4 h-4 text-brand-orange" /> Legal & Policies
            </h4>
            <ul className="space-y-2.5">
              {[
                ["All Policies & Governance", "/policies"],
                ["Privacy Policy", "/privacy-policy"],
                ["Refund Policy", "/refund-policy"],
                ["Terms & Conditions", "/terms-and-conditions"],
                ["Grievance Redressal Policy", "/grievance-policy"],
                ["Child Protection Policy", "/child-protection-policy"],
                ["Code of Conduct", "/code-of-conduct"],
                ["Financial Transparency", "/financial-transparency-policy"],
                ["Legal Status & Registration", "/about/legal-status"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="inline-flex items-center text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200">
                    <span className="text-brand-orange text-xs mr-2">-&gt;</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Phone className="w-4 h-4 text-brand-orange" /> Contact Us
            </h4>
            <div className="space-y-3 text-white text-sm">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
                <span>{CONTACT_DETAILS.address}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{CONTACT_DETAILS.phone}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{CONTACT_DETAILS.email}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Globe className="w-4 h-4 text-brand-orange shrink-0" />
                <span>www.islahwelfarefoundation.org</span>
              </div>
            </div>
            <a
              href="/donate"
              className="w-full mt-5 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Heart className="w-4 h-4 fill-white" /> DONATE NOW
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#091f12] py-4 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white">
          <div>(c) 2026 Islah Welfare Foundation. All Rights Reserved.</div>
          <div className="flex flex-wrap gap-3">
            <a href="/policies" className="hover:text-brand-orange transition-colors">All Policies</a>
            <span>|</span>
            <a href="/privacy-policy" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/refund-policy" className="hover:text-brand-orange transition-colors">Refund Policy</a>
            <span>|</span>
            <a href="/terms-and-conditions" className="hover:text-brand-orange transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
