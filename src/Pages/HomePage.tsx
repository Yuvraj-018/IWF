import { useState, useRef, useCallback } from "react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import {
  Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin,
  GraduationCap, HeartPulse, Users, Sprout, Wrench, Leaf,
  BookOpen, Stethoscope, Hand, MapPin,
  ArrowRight, Award, ShieldCheck, Heart, HandHeart, Briefcase,
  Info, BarChart2, Newspaper, UserCheck, MessageCircle, Target,
  ChevronDown, X, Menu, Globe, Building2, Scale, FileText, Send, Lock, Shield
} from "lucide-react";
import hero from '@/assets/hero.png';
import causeEdu from "@/assets/cause-education.jpg";
import causeMed from "@/assets/cause-medical.png";
import causeWomen from "@/assets/cause-women.jpg";
import thEnv from "@/assets/thematic-environment.jpg";
import thEnt from "@/assets/thematic-entrepreneur.jpg";
import thWom from "@/assets/thematic-women.jpg";
import thAgr from "@/assets/thematic-agriculture.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import footerBg from "@/assets/footer-bg.jpg";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

// ─── Mega Nav Data ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  "Home",
  "About Us",
  "What We Do",
  "Programs",
  "Impact",
  "Media & Updates",
  "Get Involved",
  "Contact Us",
];

interface MegaSection {
  cols: number;
  items: string[];
}

const MEGA_DATA: Record<string, MegaSection> = {
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
    items: [
      "View All Programs →",
    ],
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

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide uppercase">
        {children}
      </h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

// ─── Page Sections ────────────────────────────────────────────────────────────

function NotificationTicker() {
  const marqueeText = "Notification for change in Reg. • Islah Welfare Foundation • Registration Address updated to Bathiya, Darbhanga, Bihar • Join our mission today! • ";
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

function UtilityBar() {
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

function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Backdrop overlay visibility
  const hasDropdown = activeMenu && MEGA_DATA[activeMenu];

  return (
    <>
      {/* Dimming Page Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-250 ease-out pointer-events-none ${hasDropdown ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
        onClick={() => setActiveMenu(null)}
      />

      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Left Group: Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <Leaf className="w-6 h-6 text-[#0d2b1a] shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-[#0d2b1a] text-xl tracking-wide">IWF</span>
              <span className="font-semibold text-[8px] text-gray-500 tracking-wider">ISLAH WELFARE FOUNDATION</span>
            </div>
          </a>

          {/* Center Group: Nav Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const hasMega = !!MEGA_DATA[item];
              const isActive = activeMenu === item;
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
                    className="relative flex items-center gap-1 text-gray-700 hover:text-[#0d2b1a] font-medium text-sm transition-colors py-1 group"
                    onClick={() => !hasMega && setActiveMenu(null)}
                  >
                    {item}
                    {hasMega && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? "rotate-180 text-[#0d2b1a]" : "text-gray-400"
                          }`}
                      />
                    )}
                    {/* Orange sliding underline */}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200 ease-out" />
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Right Group: Donate Button & Mobile Hamburger */}
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

          {/* Mega Panel Dropdown */}
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
              {/* Left columns group */}
              <div className="flex-1">
                {/* Column Section Heading */}
                <div className="text-brand-orange uppercase text-xs tracking-widest font-bold mb-4">
                  {activeMenu}
                </div>

                {/* Columns grid */}
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
                              style={{
                                transitionDelay: `${globalIndex * 30}ms`,
                              }}
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

              {/* Right Accent Column (Optional feature card for About Us, What We Do, Get Involved) */}
              {(activeMenu === "About Us" || activeMenu === "What We Do" || activeMenu === "Get Involved") && (
                <div className="w-72 shrink-0 border-l border-gray-100 pl-8 flex flex-col justify-between">
                  <div className="bg-[#f9fdf9] border border-green-100/50 rounded-lg p-5 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-[#0d2b1a] text-sm leading-snug">
                      Planting Seeds of Hope and Change
                    </div>
                    <div className="text-xs text-gray-600 leading-normal">
                      10,000+ lives impacted since 2019. Join us in bringing sustainable growth.
                    </div>
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

      {/* Mobile Drawer Slide-in Panel */}
      {mobileOpen && (
        <>
          {/* Backdrop for Mobile Drawer */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Left slide drawer */}
          <div
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl overflow-y-auto mobile-drawer lg:hidden flex flex-col"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {/* Header */}
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

            {/* Nav List */}
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
                          if (!hasMega) {
                            setMobileOpen(false);
                          } else {
                            setMobileExpanded(isExpanded ? null : item);
                          }
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

                    {/* Accordion Sub-items */}
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

            {/* Footer / Donate Button */}
            <div className="p-4 border-t border-slate-100 shrink-0">
              <button
                onClick={() => {
                  setMobileOpen(false);
                }}
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

function HeroSection() {
  return (
    <section className="relative">
      <div className="relative min-h-[600px] lg:min-h-[680px] overflow-hidden flex items-center">
        {/* Background Image */}
        <img
          src={hero}
          alt="Empowering kids in rural India"
          width={1600}
          height={900}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Modern dark/green gradient overlay for rich premium feel and high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full z-10">
          <div className="max-w-3xl text-white">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wide uppercase text-white/95">
                "Planting Seeds of Hope and Change" — Islah Welfare Foundation (Reg.)
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6">
              Welcome to <span className="text-brand-orange">Islah Welfare Foundation</span>
            </h1>

            {/* Body Paragraph */}
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6 font-normal">
              Islah Welfare Foundation is an effort to lay a positive foundation of change in the field of education for the underprivileged kids. We believe that happiness for a lifetime can only be achieved by helping and enriching the next generation. Some of us give our time, some money, and some give skills, but ultimately, we strongly feel everyone has something to give to these kids in need. Most importantly, working for ISLAH does not translate to sacrificing personal lives or needs.
            </p>

            {/* Styled Mother Teresa Quote Block */}
            <blockquote className="border-l-4 border-brand-orange bg-white/5 backdrop-blur-sm p-4 rounded-r-lg my-6 max-w-2xl">
              <p className="text-sm md:text-base italic text-slate-100 font-medium">
                “We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.”
              </p>
              <cite className="block text-xs md:text-sm font-semibold text-brand-orange mt-2 not-italic">
                — Mother Teresa
              </cite>
            </blockquote>

            {/* Join CTA Paragraph */}
            <p className="text-base md:text-lg font-semibold text-slate-100 mb-8 tracking-wide">
              IWF‘s doors are always open. If you feel you can fill the gap of a missing drop, <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange/60">come join us….</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm">
                DONATE NOW
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm backdrop-blur-sm">
                GET INVOLVED
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-brand-green text-white rounded-md shadow-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {[
            { icon: Users, n: "5,000+", l: "Lives Impacted" },
            { icon: HeartPulse, n: "100+", l: "Health Camps" },
            { icon: GraduationCap, n: "2,000+", l: "Students Supported" },
            { icon: Leaf, n: "10,000+", l: "Beneficiaries" },
          ].map(({ icon: Icon, n, l }) => (
            <div key={l} className="p-5 flex items-center gap-3 justify-center">
              <Icon className="w-9 h-9 opacity-90" />
              <div>
                <div className="text-2xl font-extrabold">{n}</div>
                <div className="text-xs opacity-90">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCauses() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>Featured Causes</SectionTitle></ScrollReveal>
        <ScrollReveal stagger={0.1}>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: causeEdu, icon: BookOpen, title: "Child Education", desc: "Through our 'Shiksha Na Ruke' campaign, we fund school fees, learning materials, and scholarships to keep every child in school and out of child labour.", raised: "1,65,240", pct: 75 },
            { img: causeMed, icon: Stethoscope, title: "Medical Help", desc: "Our 'Health Cannot Wait' initiative funds free health camps, medicines, emergency treatment, and health awareness drives in underserved rural communities.", raised: "2,12,880", pct: 48 },
            { img: causeWomen, icon: Users, title: "Women Empowerment", desc: "The 'She Can Fly' & 'Swabhiman' campaigns train women in vocational skills, promote Self-Help Groups, and build financial independence for lasting change.", raised: "1,48,720", pct: 60 },
          ].map((c) => (
            <CardContainer key={c.title} className="inter-var w-full">
              <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-col justify-between">
                <div>
                  <CardItem translateZ="50" className="text-xl font-bold text-[#0d2b1a] mb-1">
                    {c.title}
                  </CardItem>
                  <CardItem translateZ="60" as="p" className="text-slate-600 text-sm max-w-sm mt-2 mb-4">
                    {c.desc}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4 h-44 relative">
                    <img src={c.img} alt={c.title} className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-brand-green" />
                    </div>
                  </CardItem>
                </div>
                <div>
                  <div className="mt-6">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>₹ {c.raised} Raised</span>
                      <span>{c.pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-green" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal text-slate-500 hover:text-black cursor-pointer">
                      Read More →
                    </CardItem>
                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-orange-600 cursor-pointer">
                      Donate Now
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>What We Do</SectionTitle></ScrollReveal>
        <ScrollReveal stagger={0.07}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: GraduationCap, l: "Education", s: "Learning Centres & Scholarships", route: "#" },
            { icon: HeartPulse, l: "Healthcare", s: "Free camps, care & awareness", route: "/programs/healthcare" },
            { icon: Users, l: "Women Empowerment", s: "SHGs, skills & financial literacy", route: "#" },
            { icon: Sprout, l: "Rural Development", s: "Infrastructure & livelihoods", route: "#" },
            { icon: Wrench, l: "Skill Development", s: "Vocational & entrepreneurship", route: "#" },
            { icon: Leaf, l: "Environment", s: "Plantation & sustainability", route: "#" },
          ].map(({ icon: Icon, l, s, route }) => (
            <a key={l} href={route} className="bg-white rounded-md p-5 text-center shadow-sm border border-slate-100 hover:shadow-md transition block">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-brand-green" />
              </div>
              <div className="text-xs font-semibold text-slate-700">{l}</div>
              <div className="text-[10px] text-slate-500 mt-1">{s}</div>
            </a>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProgramsAndThematic() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
        <div>
          <SectionTitle>Our Programs</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: BookOpen, title: "Education Support", desc: "We run Community Learning Centres and 'Shiksha Na Ruke' scholarships to keep underprivileged children in school, providing materials and academic support.", route: "#" },
              { icon: HeartPulse, title: "Healthcare Camps", desc: "Through 'Health Cannot Wait', we organise free medical check-up camps, distribute medicines, and spread awareness on health, hygiene, and nutrition.", route: "/programs/healthcare" },
              { icon: Users, title: "Women Empowerment", desc: "We form Self-Help Groups (SHGs), provide vocational training, promote financial literacy, and support leadership development for rural women.", route: "#" },
              { icon: Sprout, title: "Rural Development", desc: "We work on sanitation, safe housing, clean water access, and community infrastructure under our 'Model Village' initiative for self-reliant communities.", route: "#" },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-md p-5 border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-md bg-brand-orange/15 flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-slate-600 mb-2">{p.desc}</p>
                <a href={p.route} className="text-xs font-semibold text-brand-green inline-flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Major Thematic Areas</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            {[
              { img: thEnv, l: "Environment Conservation" },
              { img: thEnt, l: "Entrepreneurship & Skills" },
              { img: thWom, l: "Women Empowerment" },
              { img: thAgr, l: "Agriculture Support" },
            ].map((t) => (
              <div key={t.l} className="relative h-40 rounded-md overflow-hidden group">
                <img src={t.img} alt={t.l} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white font-semibold text-sm">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsAndGallery() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
        <div>
          <SectionTitle>Events &amp; Notices</SectionTitle>
          <div className="space-y-3">
            {[
              { d: "25", m: "MAY", title: "Free Health Camp — Bathiya, Darbhanga", desc: "Free check-up camp under our 'Health Cannot Wait' initiative. Open to all community members. Medicines and consultations provided free of charge." },
              { d: "05", m: "JUN", title: "World Environment Day Plantation Drive", desc: "Tree plantation & sustainability awareness drive in local villages — part of IWF's Environment & Rural Livelihood programme. Join us to plant saplings." },
              { d: "15", m: "JUL", title: "Shiksha Na Ruke — Scholarship Distribution", desc: "IWF distributes scholarships to bright students under the 'Shiksha Na Ruke' campaign. Supporting eligible students for a better, educated tomorrow." },
            ].map((e) => (
              <div key={e.title} className="bg-white rounded-md p-4 flex gap-4 items-center border border-slate-100 shadow-sm">
                <div className="text-center bg-brand-green/10 rounded px-3 py-2 w-16">
                  <div className="text-xs font-bold text-brand-green">{e.m}</div>
                  <div className="text-xl font-extrabold text-brand-green-dark">{e.d}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{e.title}</h4>
                  <p className="text-xs text-slate-600">{e.desc}</p>
                </div>
                <a href="#" className="text-xs font-semibold text-brand-green whitespace-nowrap">View Details →</a>
              </div>
            ))}
            <button className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm py-2.5 rounded transition">VIEW ALL EVENTS</button>
          </div>
        </div>

        <div>
          <SectionTitle>Gallery</SectionTitle>
          <div className="grid grid-cols-3 gap-3">
            {[g1, g2, g3, g4, g5, g6].map((src, i) => (
              <div key={i} className="aspect-square rounded-md overflow-hidden">
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" width={600} height={600} className="w-full h-full object-cover hover:scale-110 transition" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GetInvolved({ onOpenModal }: { onOpenModal: (type: 'volunteer' | 'partner' | 'sponsor' | 'mentor' | 'employee') => void }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>Get Involved</SectionTitle></ScrollReveal>
        <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto mb-6">
          Islah Welfare Foundation's doors are always open. If you feel you can fill the gap of a missing drop. Our doors are always open to all, like individuals, Corporates, and institutions. Come and join us …
        </p>
        <div className="bg-white border border-slate-100 shadow-sm rounded-md p-6 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
          {[
            { icon: Hand, l: "Volunteer", s: "Give your time & skills", type: "volunteer" as const },
            { icon: HandHeart, l: "Partner", s: "CSR & collaborations", type: "partner" as const },
            { icon: Heart, l: "Sponsor", s: "Fund a programme", type: "sponsor" as const },
            { icon: Users, l: "Mentor", s: "Guide the next generation", type: "mentor" as const },
            { icon: Briefcase, l: "Employee", s: "Build a career with purpose", type: "employee" as const },
          ].map((item) => (
            <div
              key={item.l}
              onClick={() => onOpenModal(item.type)}
              className="text-center p-3 rounded-lg hover:bg-slate-50 transition cursor-pointer group"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <item.icon className="w-5 h-5 text-brand-green" />
              </div>
              <div className="text-sm font-bold group-hover:text-brand-green transition-colors">{item.l}</div>
              <div className="text-[11px] text-slate-500">{item.s}</div>
            </div>
          ))}
          <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded transition shadow-md w-full">
            DONATE NOW
          </button>
        </div>
      </div>
    </section>
  );
}

function ExploreIWF() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>Explore IWF</SectionTitle></ScrollReveal>
        <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto mb-10">Discover the full breadth of our work — from governance and programs to impact and opportunities to join us.</p>
        <ScrollReveal stagger={0.08}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Info, page: "About Us", summary: "IWF is a public charitable trust dedicated to the socio-economic development of India's most vulnerable communities. Guided by 'Vision 2047', we are building an equitable, self-reliant India where every individual has access to education, healthcare, and a dignified livelihood.", route: "/about" },
            { icon: Target, page: "Programs", summary: "IWF runs structured programmes across Education, Healthcare, Women Empowerment, Skill Development, Rural Development, Environment & Sustainability, Entrepreneurship, and Relief & Rehabilitation.", route: "/programs/healthcare" },
            { icon: BarChart2, page: "Impact", summary: "IWF has touched 5,000+ lives, conducted 100+ health camps, and supported 2,000+ students across rural India. We document every outcome through success stories, annual reports, and a live impact statistics dashboard.", route: "#" },
            { icon: Newspaper, page: "Media & Updates", summary: "Stay informed with the latest news, events, newsletters, press releases, and publications from IWF's field teams. Our gallery captures real moments of transformation from the communities we serve.", route: "#" },
            { icon: UserCheck, page: "Get Involved", summary: "Whether as a Volunteer, Partner, Sponsor, Mentor, or Employee — IWF welcomes everyone who wants to contribute. Our doors are open to individuals, corporates, and institutions.", route: "#" },
            { icon: MessageCircle, page: "Contact Us", summary: "Reach IWF at our registered office in Bathiya, Darbhanga (Bihar) or connect with us in Patna, Delhi, or Meerut. Write to info@iwfindia.org or call +91 9801812625.", route: "#" },
          ].map((item) => (
            <div key={item.page} className="bg-white rounded-md p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-md bg-brand-orange/15 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-brand-green-dark">{item.page}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.summary}</p>
              <a href={item.route} className="text-xs font-semibold text-brand-green inline-flex items-center gap-1 hover:opacity-80 transition">Learn More <ArrowRight className="w-3 h-3" /></a>
            </div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer({ onOpenModal }: { onOpenModal: (type: 'volunteer' | 'partner' | 'sponsor' | 'mentor' | 'employee') => void }) {
  return (
    <footer className="w-full">
      {/* Zone A — Main Footer */}
      <div className="bg-[#0d2b1a] text-white py-14 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1 — Organization Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-brand-green fill-brand-green/20" />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-wide text-white leading-none">ISLAH</span>
                <span className="font-light text-[10px] tracking-widest text-white/80 mt-0.5">WELFARE FOUNDATION</span>
              </div>
            </div>
            <div className="text-brand-orange font-medium text-sm">
              Care | Empower | Uplift
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Islah Welfare Foundation is committed to empowering underprivileged communities through education, skill development, healthcare and social welfare initiatives for a better tomorrow.
            </p>
            <hr className="border-white/20" />
            <div>
              <span className="block text-xs font-bold tracking-widest text-white/60 uppercase mb-2">FOLLOW US</span>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Youtube, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center text-white transition-all duration-200"
                  >
                    <social.Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Info className="w-4 h-4 text-brand-orange" />
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {[
                "About Us",
                "What We Do",
                "Our Programs",
                "Impact Stories",
                "Media Center",
                "Careers",
                "Get In Touch"
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex items-center text-white/75 text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-brand-orange text-xs mr-2">►</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Management */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Building2 className="w-4 h-4 text-brand-orange" />
              MANAGEMENT
            </h4>
            <ul className="space-y-2.5">
              {[
                "Board of Trustees",
                "Executive Body",
                "Advisory Board",
                "Policies & Documents",
                "Annual Reports"
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex items-center text-white/75 text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-brand-orange text-xs mr-2">►</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Scale className="w-4 h-4 text-brand-orange" />
              LEGAL
            </h4>
            <ul className="space-y-2.5">
              {[
                "Certificates",
                "FCRA",
                "12A & 80G",
                "Privacy Policy",
                "Terms & Conditions",
                "Refund Policy"
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex items-center text-white/75 text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-brand-orange text-xs mr-2">►</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact Us */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Phone className="w-4 h-4 text-brand-orange" />
              CONTACT US
            </h4>
            <div className="space-y-3 text-white/80 text-sm">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
                <span>Bathiya, Via- Putai Manigachhi, Darbhanga, Bihar – 847423, India</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>+91 9801812625</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span>info@iwfindia.org</span>
              </div>
              <div className="flex gap-2 items-center">
                <Globe className="w-4 h-4 text-brand-orange shrink-0" />
                <span>www.islahwelfarefoundation.org</span>
              </div>
            </div>
            <button
              onClick={() => onOpenModal('sponsor')}
              className="w-full mt-5 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" /> DONATE NOW
            </button>
            <div className="text-xs italic text-white/50 text-center mt-2">
              "Your support can change lives"
            </div>
          </div>

        </div>
      </div>

      {/* Zone B — Trust Sub-Strip */}
      <div className="bg-[#f9f9f6] text-slate-800 py-10 px-4 md:px-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

          {/* Left — Stay Connected */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#0d2b1a] text-white flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-[#0d2b1a] text-base leading-tight">STAY CONNECTED</h5>
              <p className="text-gray-600 text-sm mt-1">
                Subscribe to our newsletter and stay updated with our latest activities and impact.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center mt-3 shadow-sm rounded-md overflow-hidden border border-gray-200">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none border-0"
                />
                <button
                  type="submit"
                  className="bg-[#0d2b1a] hover:bg-brand-green text-white text-xs font-semibold px-5 py-2.5 transition-colors uppercase shrink-0 cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

          {/* Center — We Are A Trusted Organization */}
          <div className="text-center">
            <h5 className="font-bold text-[#0d2b1a] text-xs uppercase tracking-wide mb-6">
              WE ARE A TRUSTED ORGANIZATION
            </h5>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Registered Trust", Icon: () => <Award className="w-5 h-5 text-[#0d2b1a]" /> },
                { label: "12A & 80G Certified", Icon: () => <span className="text-[9px] font-black tracking-tighter text-[#0d2b1a]">12A 80G</span> },
                { label: "Impact Driven", Icon: () => <BarChart2 className="w-5 h-5 text-[#0d2b1a]" /> },
                { label: "Secure & Transparent", Icon: () => <Lock className="w-5 h-5 text-[#0d2b1a]" /> }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0d2b1a] bg-white flex items-center justify-center">
                    <badge.Icon />
                  </div>
                  <span className="text-[#0d2b1a] font-semibold text-[9px] text-center mt-2 leading-tight">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Quote Block */}
          <div className="border-l border-gray-200 pl-6 flex flex-col justify-center">
            <span className="text-[#0d2b1a] text-5xl font-serif leading-none block h-5">“</span>
            <p className="text-[#0d2b1a] font-medium text-sm italic leading-relaxed mt-2">
              Alone we can do so little, together we can do so much.
            </p>
            <span className="text-xs font-semibold text-[#0d2b1a] mt-2 block">
              – Helen Keller
            </span>
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
            { title: "Compassion", desc: "We care for people and the communities we serve.", Icon: Heart }
          ].map((val, i) => (
            <div key={i} className="flex items-start gap-3">
              <val.Icon className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
              <div>
                <h6 className="font-bold text-white text-sm">{val.title}</h6>
                <p className="text-white/65 text-xs mt-0.5">{val.desc}</p>
              </div>
            </div>
          ))}
          {/* 5th Cell (Rightmost) */}
          <div className="relative p-4 rounded bg-black/10 border border-white/5 flex items-center justify-end">
            <div className="text-right">
              <p className="text-white/80 font-serif italic text-sm">
                "Together, we build a better tomorrow"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone D — Copyright Bar */}
      <div className="bg-[#091f12] py-4 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © 2026 Islah Welfare Foundation. All Rights Reserved.
          </div>
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

// ─── Modal form Component ───────────────────────────────────────────────────

interface RoleFormModalProps {
  type: 'volunteer' | 'partner' | 'sponsor' | 'mentor' | 'employee' | null;
  onClose: () => void;
}

function RoleFormModal({ type, onClose }: RoleFormModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-green text-white sticky top-0 z-10">
          <h3 className="text-lg font-bold tracking-wide uppercase">{getTitle()}</h3>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white transition-colors" aria-label="Close form">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-brand-green" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Thank You for Your Submission!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We have received your application. Our team will review the details and get back to you within 3-5 business days.
              </p>
              <button onClick={onClose} className="mt-6 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-2.5 rounded transition">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === "volunteer" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">First Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Age *</label>
                      <input required type="number" min="1" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Gender *</label>
                      <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Marital Status</label>
                      <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email *</label>
                      <input required type="email" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Number *</label>
                      <input required type="tel" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Address *</label>
                    <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">City *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">State *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Pin Code *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Academic Qualification (Highest) *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="e.g. Graduate, HSC" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Exp (Years)</label>
                        <input type="number" min="0" defaultValue="0" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Exp (Months)</label>
                        <input type="number" min="0" max="11" defaultValue="0" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Message (if any)</label>
                    <textarea rows={3} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none resize-none" placeholder="Why do you want to volunteer with us?"></textarea>
                  </div>
                </>
              )}

              {type === "partner" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Organization Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Organization Type *</label>
                      <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                        <option value="">Select</option>
                        <option value="Corporate/CSR">Corporate & CSR Foundation</option>
                        <option value="NGO">NGO & Non-Profit Organization</option>
                        <option value="Educational">Educational Institution</option>
                        <option value="Social Enterprise">Social Enterprise & Development Agency</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Designation *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email ID *</label>
                      <input required type="email" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Number *</label>
                      <input required type="tel" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Address *</label>
                    <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Partnership Proposal / Message *</label>
                    <textarea required rows={4} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none resize-none" placeholder="Describe how your organization would like to partner with IWF..."></textarea>
                  </div>
                </>
              )}

              {type === "sponsor" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Sponsor Name / Org Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Sponsor Category *</label>
                      <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                        <option value="">Select</option>
                        <option value="Individual">Individual Sponsor</option>
                        <option value="Corporate">Corporate / Business House</option>
                        <option value="Startup">Startup & Emerging Brand</option>
                        <option value="CSR Foundation">CSR Foundation</option>
                        <option value="Educational">Educational Institution</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Programme to Sponsor *</label>
                      <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                        <option value="">Select</option>
                        <option value="Education Support">Education Support Programs</option>
                        <option value="Healthcare Camps">Healthcare Initiatives & Camps</option>
                        <option value="Women Empowerment">Women Empowerment Initiatives</option>
                        <option value="Rural Development">Community & Rural Development</option>
                        <option value="Skill Livelihood">Skill Development & Livelihood</option>
                        <option value="Environment">Environmental & Sustainability Drives</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email ID *</label>
                      <input required type="email" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Number *</label>
                      <input required type="tel" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Sponsorship Details / Custom Request</label>
                    <textarea rows={4} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none resize-none" placeholder="Provide any details regarding your sponsorship amount or target region..."></textarea>
                  </div>
                </>
              )}

              {type === "mentor" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Current Profession *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="e.g. Teacher, Engineer, Entrepreneur" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Area of Expertise *</label>
                      <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                        <option value="">Select</option>
                        <option value="Academic">Academic Guidance</option>
                        <option value="Career Counselling">Career Counselling</option>
                        <option value="Skill Development">Skill Development</option>
                        <option value="Entrepreneurship">Entrepreneurship Development</option>
                        <option value="Technology">Technology & Digital Skills</option>
                        <option value="Other">Other Expertise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mentorship Mode *</label>
                      <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none bg-white">
                        <option value="">Select</option>
                        <option value="Online">Online Sessions</option>
                        <option value="Offline">Offline Workshops</option>
                        <option value="Both">Both Modes</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email ID *</label>
                      <input required type="email" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Number *</label>
                      <input required type="tel" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Brief Bio / Mentorship Plan *</label>
                    <textarea required rows={4} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none resize-none" placeholder="Share a brief overview of your background and how you would like to guide youth..."></textarea>
                  </div>
                </>
              )}

              {type === "employee" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Post Applied For *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="e.g. Program Manager, Field Officer" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Number *</label>
                      <input required type="tel" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email ID *</label>
                      <input required type="email" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Highest Qualification *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Total Experience *</label>
                      <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="e.g. 3 Years, Fresh Graduate" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Resume *</label>
                    <input required type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-green/10 file:text-brand-green hover:file:bg-brand-green/20" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input required type="checkbox" id="confirmDetails" className="w-4 h-4 text-brand-green focus:ring-brand-green border-slate-300 rounded" />
                    <label htmlFor="confirmDetails" className="text-xs text-slate-600 cursor-pointer">I confirm that all details provided are correct and valid *</label>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-2 rounded transition-colors text-sm shadow-md">
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<'volunteer' | 'partner' | 'sponsor' | 'mentor' | 'employee' | null>(null);

  const handleOpenModal = (type: 'volunteer' | 'partner' | 'sponsor' | 'mentor' | 'employee') => {
    setActiveModal(type);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <HeroSection />
      <FeaturedCauses />
      <WhatWeDo />
      <ProgramsAndThematic />
      <EventsAndGallery />
      <GetInvolved onOpenModal={handleOpenModal} />
      <ExploreIWF />
      <Footer onOpenModal={handleOpenModal} />

      {/* Unified Role Forms Modal */}
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
