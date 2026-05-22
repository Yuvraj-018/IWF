import { useState, useRef, useCallback } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin,
  Briefcase, Leaf, ChevronDown, X, Menu, Globe, Building2, Scale,
  Heart, ShieldCheck, UserCheck, Lock, MapPin, BarChart2, Award,
  Info,
} from "lucide-react";

// ─── Mega Nav Data ────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  "Home",
  "About Us",
  "What We Do",
  "Programs",
  "Impact",
  "Media & Updates",
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
      "Members & Supporters",
      "Our Partners & Donors",
      "Membership Policy",
    ],
  },
  "What We Do": {
    cols: 3,
    items: [
      "Education",
      "Health Care",
      "Skills Development",
      "Women Empowerment",
      "Entrepreneur Development",
      "Relief & Rehabilitation",
      "Model Village",
      "Environment & Sustainability",
      "Agriculture & Rural Livelihood",
    ],
  },
  "Programs": {
    cols: 1,
    items: ["View All Programs →"],
  },
  "Impact": {
    cols: 2,
    items: [
      "Our Impact",
      "Outcomes",
      "Where We Work",
      "Success Stories",
      "Annual Reports",
      "Impact Statistics Dashboard",
    ],
  },
  "Media & Updates": {
    cols: 2,
    items: [
      "News & Events",
      "Latest Updates",
      "Newsletters",
      "Publications",
      "Press Release",
      "Gallery",
    ],
  },
  "Get Involved": {
    cols: 2,
    items: [
      "Volunteer With Us",
      "Partner With Us",
      "Sponsor a Programme",
      "Become a Mentor",
      "Careers & Opportunities",
      "Donate & Support",
    ],
  },
};

// ─── NotificationTicker ────────────────────────────────────────────────────────

export function NotificationTicker() {
  const marqueeText =
    "Notification for change in Reg. • Islah Welfare Foundation • Registration Address updated to Bathiya, Darbhanga, Bihar • Join our mission today! • ";
  const duplicatedText = Array(4).fill(marqueeText).join(" ");

  return (
    <div className="bg-brand-orange text-white text-[11px] font-semibold py-1.5 overflow-hidden flex items-center relative select-none border-b border-brand-orange-dark shadow-sm">
      <div className="bg-red-600 text-[9px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider shadow z-10 shrink-0 ml-4 mr-3 animate-pulse">
        NEW
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        <div className="inline-block whitespace-nowrap animate-marquee">
          <span>{duplicatedText}</span>
        </div>
      </div>
    </div>
  );
}

// ─── UtilityBar ───────────────────────────────────────────────────────────────

export function UtilityBar() {
  return (
    <div className="bg-brand-green text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-5">
          <a href="tel:+919801812625" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Phone className="w-3.5 h-3.5" /> +91-9801812625
          </a>
          <a href="mailto:info@iwfindia.org" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Mail className="w-3.5 h-3.5" /> info@iwfindia.org
          </a>
          <a href="#careers" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-semibold">
            <Briefcase className="w-3.5 h-3.5" /> Careers
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2 opacity-80">Follow Us:</span>
          {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors">
              <Icon className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAboutActive = pathname.startsWith("/about");

  const openMenu = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(MEGA_DATA[name] ? name : null);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const hasDropdown = activeMenu && MEGA_DATA[activeMenu];

  return (
    <>
      {/* Dimming backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-250 ease-out pointer-events-none ${
          hasDropdown ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        onClick={() => setActiveMenu(null)}
      />

      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <Leaf className="w-6 h-6 text-[#0d2b1a] shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-[#0d2b1a] text-xl tracking-wide">IWF</span>
              <span className="font-semibold text-[8px] text-gray-500 tracking-wider">ISLAH WELFARE FOUNDATION</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const hasMega = !!MEGA_DATA[item];
              const isDropdownOpen = activeMenu === item;
              const isRouteActive =
                (item === "About Us" && isAboutActive) ||
                (item === "Home" && pathname === "/");
              return (
                <div
                  key={item}
                  className="relative py-2"
                  onMouseEnter={() => hasMega && openMenu(item)}
                  onMouseLeave={hasMega ? scheduleClose : undefined}
                >
                  <a
                    href={
                      item === "Home"
                        ? "/"
                        : item === "About Us"
                        ? "/about"
                        : item === "Programs"
                        ? "/programs/healthcare"
                        : "#"
                    }
                    className={`relative flex items-center gap-1 font-medium text-sm transition-colors py-1 group ${
                      isRouteActive ? "text-brand-green font-semibold" : "text-gray-700 hover:text-[#0d2b1a]"
                    }`}
                    onClick={() => !hasMega && setActiveMenu(null)}
                  >
                    {item}
                    {hasMega && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-[#0d2b1a]" : "text-gray-400"
                        }`}
                      />
                    )}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200 ease-out" />
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Right: Donate + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-md shadow-md transition-colors uppercase tracking-wide cursor-pointer">
              DONATE NOW
            </button>
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-[#0d2b1a] transition-colors cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mega dropdown */}
          {activeMenu && MEGA_DATA[activeMenu] && (
            <div
              className="absolute left-0 right-0 top-full bg-white shadow-2xl z-50 border-t-2 border-brand-orange py-8 px-16 flex gap-10"
              style={{
                clipPath: activeMenu ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                transition: "clip-path 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="flex-1">
                <div className="text-brand-orange uppercase text-xs tracking-widest font-bold mb-4">{activeMenu}</div>
                <div
                  className="grid gap-8"
                  style={{ gridTemplateColumns: `repeat(${MEGA_DATA[activeMenu].cols}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: MEGA_DATA[activeMenu].cols }).map((_, colIndex) => {
                    const items = MEGA_DATA[activeMenu].items;
                    const colsCount = MEGA_DATA[activeMenu].cols;
                    const itemsPerCol = Math.ceil(items.length / colsCount);
                    const colItems = items.slice(colIndex * itemsPerCol, (colIndex + 1) * itemsPerCol);
                    return (
                      <div key={colIndex} className="flex flex-col gap-3">
                        {colItems.map((subItem, itemIndex) => {
                          const globalIndex = colIndex * itemsPerCol + itemIndex;
                          return (
                            <a
                              key={subItem}
                              href={
                                activeMenu === "About Us" && subItem === "Overview"
                                  ? "/about"
                                  : activeMenu === "What We Do" && subItem === "Health Care"
                                  ? "/programs/healthcare"
                                  : activeMenu === "Programs" && subItem === "View All Programs →"
                                  ? "/programs/healthcare"
                                  : "#"
                              }
                              className="flex items-center gap-2 text-gray-700 hover:text-[#0d2b1a] text-sm hover:translate-x-1 transition-all duration-200"
                              style={{ transitionDelay: `${globalIndex * 30}ms` }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <span className="text-brand-orange text-sm font-semibold">→</span>
                              {subItem}
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {(activeMenu === "About Us" || activeMenu === "What We Do" || activeMenu === "Get Involved") && (
                <div className="w-72 shrink-0 border-l border-gray-100 pl-8 flex flex-col justify-between">
                  <div className="bg-[#f9fdf9] border border-green-100/50 rounded-lg p-5 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-[#0d2b1a] text-sm leading-snug">Planting Seeds of Hope and Change</div>
                    <div className="text-xs text-gray-600 leading-normal">10,000+ lives impacted since 2019. Join us in bringing sustainable growth.</div>
                    <a
                      href="#"
                      className="text-brand-orange text-xs font-bold hover:underline inline-flex items-center gap-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl overflow-y-auto mobile-drawer lg:hidden flex flex-col"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 bg-[#0d2b1a] shrink-0 text-white">
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

            <nav className="flex-1 py-2" aria-label="Mobile navigation items">
              {NAV_ITEMS.map((item) => {
                const hasMega = !!MEGA_DATA[item];
                const isExpanded = mobileExpanded === item;
                return (
                  <div key={item} className="border-b border-slate-100 last:border-0">
                    <div className="flex items-center">
                      <a
                        href={
                          item === "Home"
                            ? "/"
                            : item === "About Us"
                            ? "/about"
                            : item === "Programs"
                            ? "/programs/healthcare"
                            : "#"
                        }
                        className="flex-1 px-5 py-3.5 text-sm font-semibold text-slate-800 hover:text-brand-green transition-colors"
                        onClick={() => {
                          if (!hasMega) setMobileOpen(false);
                          else setMobileExpanded(isExpanded ? null : item);
                        }}
                      >
                        {item}
                      </a>
                      {hasMega && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item)}
                          className="px-4 py-3.5 text-slate-400 hover:text-brand-green transition-colors cursor-pointer"
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand-green" : ""}`}
                          />
                        </button>
                      )}
                    </div>
                    {hasMega && isExpanded && (
                      <div className="bg-slate-50 border-l-4 border-brand-green ml-4 mr-2 rounded-sm mb-1.5 py-1">
                        {MEGA_DATA[item].items.map((sub) => (
                          <a
                            key={sub}
                            href={
                              item === "About Us" && sub === "Overview"
                                ? "/about"
                                : item === "What We Do" && sub === "Health Care"
                                ? "/programs/healthcare"
                                : item === "Programs" && sub === "View All Programs →"
                                ? "/programs/healthcare"
                                : "#"
                            }
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
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors uppercase tracking-wide text-sm cursor-pointer"
              >
                DONATE NOW
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer({ onOpenModal }: { onOpenModal: (type: "volunteer" | "partner" | "sponsor" | "mentor" | "employee") => void }) {
  return (
    <footer className="w-full">
      {/* Zone A — Main Footer */}
      <div className="bg-[#0d2b1a] text-white py-14 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 — Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-brand-green fill-brand-green/20" />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-wide text-white leading-none">ISLAH</span>
                <span className="font-light text-[10px] tracking-widest text-white/80 mt-0.5">WELFARE FOUNDATION</span>
              </div>
            </div>
            <div className="text-brand-orange font-medium text-sm">Care | Empower | Uplift</div>
            <p className="text-white/70 text-sm leading-relaxed">
              Islah Welfare Foundation is committed to empowering underprivileged communities through education, skill development, healthcare and social welfare initiatives for a better tomorrow.
            </p>
            <hr className="border-white/20" />
            <div>
              <span className="block text-xs font-bold tracking-widest text-white/60 uppercase mb-2">FOLLOW US</span>
              <div className="flex gap-2">
                {[Facebook, Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-7 h-7 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center text-white transition-all duration-200">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Info className="w-4 h-4 text-brand-orange" /> QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {["About Us", "What We Do", "Our Programs", "Impact Stories", "Media Center", "Careers", "Get In Touch"].map((link) => (
                <li key={link}>
                  <a href="#" className="inline-flex items-center text-white/75 text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200">
                    <span className="text-brand-orange text-xs mr-2">►</span>{link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Management */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Building2 className="w-4 h-4 text-brand-orange" /> MANAGEMENT
            </h4>
            <ul className="space-y-2.5">
              {["Board of Trustees", "Executive Body", "Advisory Board", "Policies & Documents", "Annual Reports"].map((link) => (
                <li key={link}>
                  <a href="#" className="inline-flex items-center text-white/75 text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200">
                    <span className="text-brand-orange text-xs mr-2">►</span>{link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Scale className="w-4 h-4 text-brand-orange" /> LEGAL
            </h4>
            <ul className="space-y-2.5">
              {["Certificates", "FCRA", "12A & 80G", "Privacy Policy", "Terms & Conditions", "Refund Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="inline-flex items-center text-white/75 text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200">
                    <span className="text-brand-orange text-xs mr-2">►</span>{link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Phone className="w-4 h-4 text-brand-orange" /> CONTACT US
            </h4>
            <div className="space-y-3 text-white/80 text-sm">
              <div className="flex gap-2 items-start"><MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" /><span>Bathiya, Via- Putai Manigachhi, Darbhanga, Bihar – 847423, India</span></div>
              <div className="flex gap-2 items-center"><Phone className="w-4 h-4 text-brand-orange shrink-0" /><span>+91 9801812625</span></div>
              <div className="flex gap-2 items-center"><Mail className="w-4 h-4 text-brand-orange shrink-0" /><span>info@iwfindia.org</span></div>
              <div className="flex gap-2 items-center"><Globe className="w-4 h-4 text-brand-orange shrink-0" /><span>www.islahwelfarefoundation.org</span></div>
            </div>
            <button
              onClick={() => onOpenModal("sponsor")}
              className="w-full mt-5 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" /> DONATE NOW
            </button>
            <div className="text-xs italic text-white/50 text-center mt-2">"Your support can change lives"</div>
          </div>
        </div>
      </div>

      {/* Zone B — Trust Sub-Strip */}
      <div className="bg-[#f9f9f6] text-slate-800 py-10 px-4 md:px-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#0d2b1a] text-white flex items-center justify-center shrink-0"><Mail className="w-6 h-6 text-white" /></div>
            <div className="flex-1">
              <h5 className="font-bold text-[#0d2b1a] text-base leading-tight">STAY CONNECTED</h5>
              <p className="text-gray-600 text-sm mt-1">Subscribe to our newsletter and stay updated with our latest activities and impact.</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center mt-3 shadow-sm rounded-md overflow-hidden border border-gray-200">
                <input type="email" placeholder="Enter your email" required className="flex-1 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none border-0" />
                <button type="submit" className="bg-[#0d2b1a] hover:bg-brand-green text-white text-xs font-semibold px-5 py-2.5 transition-colors uppercase shrink-0 cursor-pointer">SUBSCRIBE</button>
              </form>
            </div>
          </div>
          <div className="text-center">
            <h5 className="font-bold text-[#0d2b1a] text-xs uppercase tracking-wide mb-6">WE ARE A TRUSTED ORGANIZATION</h5>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Registered Trust", Icon: () => <Award className="w-5 h-5 text-[#0d2b1a]" /> },
                { label: "12A & 80G Certified", Icon: () => <span className="text-[9px] font-black tracking-tighter text-[#0d2b1a]">12A 80G</span> },
                { label: "Impact Driven", Icon: () => <BarChart2 className="w-5 h-5 text-[#0d2b1a]" /> },
                { label: "Secure & Transparent", Icon: () => <Lock className="w-5 h-5 text-[#0d2b1a]" /> },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0d2b1a] bg-white flex items-center justify-center"><badge.Icon /></div>
                  <span className="text-[#0d2b1a] font-semibold text-[9px] text-center mt-2 leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-l border-gray-200 pl-6 flex flex-col justify-center">
            <span className="text-[#0d2b1a] text-5xl font-serif leading-none block h-5">"</span>
            <p className="text-[#0d2b1a] font-medium text-sm italic leading-relaxed mt-2">Alone we can do so little, together we can do so much.</p>
            <span className="text-xs font-semibold text-[#0d2b1a] mt-2 block">– Helen Keller</span>
          </div>
        </div>
      </div>

      {/* Zone C — Values Strip */}
      <div className="bg-[#0d2b1a] text-white py-6 px-4 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
          {[
            { title: "Transparency", desc: "We are open and honest in all our actions.", Icon: ShieldCheck },
            { title: "Accountability", desc: "We take responsibility for our commitments.", Icon: UserCheck },
            { title: "Integrity", desc: "We operate with strong moral principles.", Icon: Scale },
            { title: "Compassion", desc: "We care for people and the communities we serve.", Icon: Heart },
          ].map((val, i) => (
            <div key={i} className="flex items-start gap-3">
              <val.Icon className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
              <div>
                <h6 className="font-bold text-white text-sm">{val.title}</h6>
                <p className="text-white/65 text-xs mt-0.5">{val.desc}</p>
              </div>
            </div>
          ))}
          <div className="relative p-4 rounded bg-black/10 border border-white/5 flex items-center justify-end">
            <p className="text-white/80 font-serif italic text-sm text-right">"Together, we build a better tomorrow"</p>
          </div>
        </div>
      </div>

      {/* Zone D — Copyright */}
      <div className="bg-[#091f12] py-4 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <div>© 2026 Islah Welfare Foundation. All Rights Reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-brand-orange transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── RoleFormModal ────────────────────────────────────────────────────────────

export interface RoleFormModalProps {
  type: "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null;
  onClose: () => void;
}

export function RoleFormModal({ type, onClose }: RoleFormModalProps) {
  const [submitted, setSubmitted] = useState(false);
  if (!type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getTitle = () => {
    switch (type) {
      case "volunteer": return "Apply to Volunteer";
      case "partner": return "Become a Partner";
      case "sponsor": return "Become a Sponsor";
      case "mentor": return "Become a Mentor";
      case "employee": return "Apply for Employment";
      default: return "Online Form";
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-brand-green text-white sticky top-0 z-10">
          <h3 className="text-lg font-bold tracking-wide uppercase">{getTitle()}</h3>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white transition-colors" aria-label="Close form">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-brand-green" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Thank You for Your Submission!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">We have received your application. Our team will review the details and get back to you within 3-5 business days.</p>
              <button onClick={onClose} className="mt-6 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-2.5 rounded transition">Close Window</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common fields for all roles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email *</label>
                  <input required type="email" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Number *</label>
                  <input required type="tel" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">City *</label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                </div>
              </div>
              {type === "partner" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Organization Name *</label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                </div>
              )}
              {type === "sponsor" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Programme to Sponsor *</label>
                  <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                    <option value="">Select</option>
                    <option>Education Support Programs</option>
                    <option>Healthcare Initiatives & Camps</option>
                    <option>Women Empowerment Initiatives</option>
                    <option>Community & Rural Development</option>
                    <option>Skill Development & Livelihood</option>
                  </select>
                </div>
              )}
              {type === "mentor" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Area of Expertise *</label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="e.g. Education, Healthcare, Technology" />
                </div>
              )}
              {type === "employee" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Post Applied For *</label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="e.g. Program Manager, Field Officer" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Message (optional)</label>
                <textarea rows={3} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none resize-none" placeholder="Tell us more about yourself or your interest…" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-2 rounded transition-colors text-sm shadow-md">Submit Application</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
