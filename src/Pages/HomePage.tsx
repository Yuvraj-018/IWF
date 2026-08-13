import { useState, useRef, useCallback, useEffect } from "react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import {
  Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin,
  GraduationCap, HeartPulse, Users, Sprout, Wrench, Leaf,
  BookOpen, Stethoscope, Hand, MapPin,
  ArrowRight, ArrowLeft, Award, ShieldCheck, Heart, HandHeart, Briefcase,
  Info, BarChart2, Newspaper, UserCheck, MessageCircle, Target,
  ChevronDown, ChevronLeft, ChevronRight, X, Menu, Globe, Building2, Scale, FileText, Send, Lock, Shield,
  TrendingUp, Home, Activity, Star, Zap, Leaf as LeafIcon,
  Megaphone, BookMarked, Wind, Sparkles
} from "lucide-react";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";
import slide3 from "@/assets/hero-carousel/hero-slide-3.jpg";
import slide4 from "@/assets/hero-carousel/hero-slide-4.jpg";
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
import { RoleFormModal, type RoleType } from "@/components/forms/RoleFormModal";
import { PatientCard } from "@/components/healthcare/PatientCard";
import { URGENT_PATIENTS } from "@/content/patients";
import newLogo from "@/assets/new logo.png";
import { CONTACT_DETAILS } from "@/content/siteContent";

function HomeFooter({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
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
              <Scale className="w-4 h-4 text-brand-orange" /> Legal
            </h4>
            <ul className="space-y-2.5">
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["Refund Policy", "/refund-policy"],
                ["Terms & Conditions", "/terms-and-conditions"],
                ["Certificates", "/about/legal-status"],
                ["12A & 80G", "/about/legal-status"],
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
          <div>&copy; 2026 Islah Welfare Foundation. All Rights Reserved.</div>
          <div className="flex flex-wrap gap-3">
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

// ─── Mega Nav Data ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  "Home",
  "About Us",
  "What We Do",
  "Impact",
  "Media",
  "Membership",
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
  "Programs": {
    cols: 1,
    items: [
      "View All Programs →",
    ],
  },
  "Impact": {
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

// ─── Shared Components ────────────────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    urgentTitle: "Patients Needing Urgent Support",
    urgentTag: "Critical Life & Emergency Support",
    urgentSub: "Your support can help critically ill patients receive timely treatment and life-saving care when every second counts.",
    viewAllPatients: "View All Patients",
    whatWeDo: "What We Do",
    ourImpactTitle: "Numbers That Speak",
    ourImpactTag: "Our Impact",
    ourImpactSub: "Every number represents a life changed, a family supported, and a community uplifted.",
    featuredCauses: "Featured Causes",
    exploreIWF: "Explore IWF",
    exploreSub: "Discover the full breadth of our work — from governance and programs to impact and opportunities to join us.",
    eventsNotices: "Events & Notices",
    newsUpdates: "News & Updates",
    latest: "Latest",
    viewAll: "View All",
    getInvolved: "Get Involved",
    getInvolvedSub: "Islah Welfare Foundation's doors are always open. If you feel you can fill the gap of a missing drop. Our doors are always open to all, like individuals, Corporates, and institutions. Come and join us …",
    donateNow: "DONATE NOW",
    volunteer: "Volunteer",
    partner: "Partner",
    sponsor: "Sponsor",
    mentor: "Mentor",
    employee: "Employee",
    volunteerSub: "Give your time & skills",
    partnerSub: "CSR & collaborations",
    sponsorSub: "Fund a programme",
    mentorSub: "Guide the next generation",
    employeeSub: "Build a career with purpose",
    ourPrograms: "Our Programs",
    readMore: "Read More",
  },
  hi: {
    urgentTitle: "मदद की तत्काल आवश्यकता वाले मरीज",
    urgentTag: "क्रिटिकल लाइफ और आपातकालीन सहायता",
    urgentSub: "आपका सहयोग गंभीर रूप से बीमार मरीजों को समय पर इलाज और जीवन रक्षक देखभाल प्राप्त करने में मदद कर सकता है जब हर सेकंड मायने रखता है।",
    viewAllPatients: "सभी मरीज देखें",
    whatWeDo: "हम क्या करते हैं",
    ourImpactTitle: "आंकड़े जो बोलते हैं",
    ourImpactTag: "हमारा प्रभाव",
    ourImpactSub: "हर संख्या एक बदलते जीवन, एक समर्थित परिवार और एक उन्नत समुदाय का प्रतिनिधित्व करती है।",
    featuredCauses: "विशेष अभियान",
    exploreIWF: "आईडब्ल्यूएफ को जानें",
    exploreSub: "हमारे काम की पूरी जानकारी प्राप्त करें — शासन और कार्यक्रमों से लेकर प्रभाव और हमसे जुड़ने के अवसरों तक।",
    eventsNotices: "कार्यक्रम और सूचनाएं",
    newsUpdates: "समाचार और अपडेट",
    latest: "ताजा खबरें",
    viewAll: "सभी देखें",
    getInvolved: "हमसे जुड़ें",
    getInvolvedSub: "इसलाह वेलफेयर फाउंडेशन के दरवाजे हमेशा खुले हैं। यदि आपको लगता है कि आप कमी को पूरा कर सकते हैं, तो हमारा स्वागत है। सभी व्यक्ति, कॉर्पोरेट और संस्थान हमारे साथ आ सकते हैं…",
    donateNow: "अभी दान करें",
    volunteer: "स्वयंसेवक बनें",
    partner: "भागीदार बनें",
    sponsor: "प्रायोजक बनें",
    mentor: "मेंटर बनें",
    employee: "कर्मचारी बनें",
    volunteerSub: "अपना समय और कौशल दें",
    partnerSub: "सीएसआर और सहयोग",
    sponsorSub: "एक कार्यक्रम को प्रायोजित करें",
    mentorSub: "अगली पीढ़ी का मार्गदर्शन करें",
    employeeSub: "उद्देश्य के साथ करियर बनाएं",
    ourPrograms: "हमारे कार्यक्रम",
    readMore: "अधिक पढ़ें",
  }
};

const NAV_ITEMS_TRANSLATIONS = {
  en: ["Home", "About Us", "What We Do", "Impact", "Media", "Membership", "Get Involved", "Contact Us"],
  hi: ["होम", "हमारे बारे में", "हम क्या करते हैं", "प्रभाव", "मीडिया", "सदस्यता", "जुड़ें", "संपर्क करें"]
};

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

function SectionHeader({ tag, title, subtitle, center = true }: SectionHeaderProps) {
  return (
    <div className={`mb-6 ${center ? "text-center" : "text-left"}`}>
      <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-1.5">
        {tag}
      </p>
      <h2 className="text-2xl md:text-3xl font-black text-[#0b1f3b] uppercase tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-900 font-medium text-sm mt-3 leading-relaxed ${center ? "max-w-4xl mx-auto" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Page Sections ────────────────────────────────────────────────────────────

function NotificationTicker() {
  const items = [
    { text: "Notification for change in Registration", href: "/about/legal-status" },
    { text: "Islah Welfare Foundation — Official Website", href: "/" },
    { text: "Registration address updated to Bathiya, Darbhanga, Bihar", href: "/about" },
    { text: "Join our mission — volunteer, donate or partner with us", href: "/#get-involved" },
    { text: "Free Health Camp — Bathiya, Darbhanga | June 25", href: "/news-and-events" },
    { text: "Annual Scholarship Distribution — Muzaffarpur | July 15", href: "/news-and-events" },
  ];
  // Duplicate for seamless loop
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
  lang: "en" | "hi";
  setLang: (l: "en" | "hi") => void;
}

function UtilityBar({ lang, setLang }: UtilityBarProps) {
  return (
    <div className="bg-brand-green text-white py-3.5 border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

        {/* Left: Contact Info - Stacked Vertically */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-xs shrink-0 select-text w-full md:w-auto">
          <a href="tel:+919811861633" className="flex items-center gap-2 hover:text-white/80 transition-colors font-medium">
            <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>+91-9811861633</span>
          </a>
          <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 hover:text-white/80 transition-colors font-medium">
            <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>info@iwfindia.org</span>
          </a>
          <a href="#careers" className="flex items-center gap-2 hover:text-white/80 transition-colors font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>Careers</span>
          </a>
        </div>

        {/* Center: Big White Organization Name - Enormous and Dominant */}
        <div className="text-center flex-1 py-2 md:py-0 w-full md:w-auto">
          <span className="font-black text-lg md:text-3xl tracking-[0.25em] uppercase text-white block select-all drop-shadow-lg leading-tight font-sans">
            ISLAH WELFARE FOUNDATION
          </span>
        </div>

        {/* Right: Social & Translate - Stacked Vertically */}
        <div className="flex flex-col items-center md:items-end gap-2.5 shrink-0 w-full md:w-auto">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] opacity-80 font-medium hidden sm:inline">Follow Us:</span>
            {[
              { Icon: Facebook, color: "#1877F2", label: "Facebook", href: "https://facebook.com" },
              { Icon: Twitter, color: "#1DA1F2", label: "Twitter/X", href: "https://twitter.com" },
              { Icon: Instagram, color: "#E1306C", label: "Instagram", href: "https://instagram.com" },
              { Icon: Youtube, color: "#FF0000", label: "YouTube", href: "https://youtube.com" },
              { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn", href: "https://linkedin.com" },
            ].map(({ Icon, color, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: color }}
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface HeaderProps {
  lang: "en" | "hi";
}

function Header({ lang }: HeaderProps) {
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
      {/* Dark Themed Menu Navbar (Sticky) */}
      <header className="bg-[#071527] text-white sticky top-0 z-50 shadow-md transition-all duration-200 py-1 relative">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* Left Group: Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item, idx) => {
              const hasMega = !!MEGA_DATA[item];
              const isActive = activeMenu === item;
              const label = item === "Home" ? (
                <span className="flex items-center gap-1.5 font-bold">
                  <Home className="w-4 h-4 text-[#f97316]" /> IWF
                </span>
              ) : (
                NAV_ITEMS_TRANSLATIONS[lang][idx] || item
              );

              return (
                <div
                  key={item}
                  onMouseEnter={() => hasMega && openMenu(item)}
                  onMouseLeave={hasMega ? scheduleClose : undefined}
                >
                  <a
                    href={
                      item === "Home"
                        ? "/"
                        : item === "About Us"
                          ? "/about"
                          : item === "What We Do"
                            ? "#focus-areas"
                            : item === "Programs"
                              ? "/programs/healthcare"
                              : item === "Impact"
                                ? "/#impact-stats"
                                : item === "Media"
                                  ? "/news-and-events"
                                  : item === "Membership"
                                    ? "/membership"
                                    : item === "Get Involved"
                                      ? "/#get-involved"
                                      : item === "Contact Us"
                                        ? "/contact"
                                        : "#"
                    }
                    className="relative flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 font-semibold text-sm transition-all px-4 py-3 rounded-md group"
                    onClick={(event) => {
                      if (item === "What We Do") {
                        event.preventDefault();
                        setActiveMenu(null);
                        document.getElementById("focus-areas")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else if (!hasMega) {
                        setActiveMenu(null);
                      }
                    }}
                  >
                    {label}
                    {hasMega && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? "rotate-180 text-white" : "text-white/60"
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
            <a href="/donate" className="bg-[#f97316] hover:bg-orange-600 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-md shadow-md transition-all hover:scale-105 active:scale-95 uppercase tracking-wide">
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
                      {colItems.map((subItem, subIdx) => {
                        const href =
                          activeMenu === "About Us" && subItem === "Overview"
                            ? "/about"
                            : activeMenu === "About Us" && subItem === "Our Objective & Vision"
                              ? "/about/objective-and-vision"
                              : activeMenu === "About Us" && subItem === "Vision 2047"
                                ? "/about/vision-2047"
                                : activeMenu === "About Us" && subItem === "Leadership & Management"
                                  ? "/about/leadership"
                                  : activeMenu === "About Us" && subItem === "Governance & Transparency"
                                    ? "/about/governance"
                                    : activeMenu === "About Us" && subItem === "Legal Status & Registration"
                                      ? "/about/legal-status"
                                      : activeMenu === "About Us" && (subItem === "Members & Donors" || subItem === "Members & Supporters")
                                        ? "/membership"
                                        : activeMenu === "About Us" && subItem === "Our Partners & Donors"
                                          ? "/about/legal-status"
                                          : activeMenu === "About Us" && subItem === "Membership Policy"
                                            ? "/membership#status"
                                            : activeMenu === "What We Do" && subItem === "Health Care"
                                              ? "/programs/healthcare"
                                              : activeMenu === "What We Do" && subItem === "Education"
                                                ? "/programs/education"
                                                : activeMenu === "What We Do" && subItem === "Skills Development"
                                                  ? "/programs/skills-development"
                                                  : activeMenu === "What We Do" && subItem === "Women Empowerment"
                                                    ? "/programs/women-empowerment"
                                                    : activeMenu === "What We Do"
                                                      ? "/programs/healthcare"
                                                      : activeMenu === "Programs" && subItem === "View All Programs →"
                                                        ? "/programs/healthcare"
                                                        : activeMenu === "Impact"
                                                          ? "/#impact-stats"
                                                          : activeMenu === "Media" && subItem === "News & Events"
                                                            ? "/news-and-events"
                                                            : activeMenu === "Media" && subItem === "Latest Updates"
                                                              ? "/news-and-events"
                                                              : activeMenu === "Media" && subItem === "Gallery"
                                                                ? "/news-and-events"
                                                                : activeMenu === "Media" && subItem === "Press Release"
                                                                  ? "/news-and-events"
                                                                  : activeMenu === "Media"
                                                                    ? "/news-and-events"
                                                                    : activeMenu === "Get Involved" && subItem === "Donate & Support"
                                                                      ? "/donate"
                                                                      : activeMenu === "Get Involved"
                                                                        ? "/#get-involved"
                                                                        : "#";
                        return (
                          <a
                            key={subItem}
                            href={href}
                            className="flex items-center gap-2 text-slate-900 font-bold hover:text-brand-orange text-sm md:text-base hover:translate-x-1.5 transition-all duration-200 group"
                            style={{
                              transitionDelay: `${(colIndex * 3 + subIdx) * 15}ms`,
                            }}
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="text-brand-orange text-sm font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                            {subItem}
                          </a>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
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
            <div className="flex items-center justify-between p-4 bg-[#0b1f3b] shrink-0 text-white">
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
                              : item === "What We Do"
                                ? "#focus-areas"
                                : item === "Programs"
                                  ? "/programs/healthcare"
                                  : item === "Impact"
                                    ? "/#impact-stats"
                                    : item === "Media & Updates"
                                      ? "/news-and-events"
                                      : item === "Get Involved"
                                        ? "/#get-involved"
                                        : item === "Contact Us"
                                          ? "/contact"
                                          : "#"
                        }
                        className="flex-1 px-5 py-3.5 text-sm font-semibold text-slate-800 hover:text-brand-green transition-colors"
                        onClick={(event) => {
                          if (item === "What We Do") {
                            event.preventDefault();
                            setMobileOpen(false);
                            document.getElementById("focus-areas")?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          } else if (!hasMega) {
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
                                : item === "About Us" && sub === "Our Objective & Vision"
                                  ? "/about/objective-and-vision"
                                  : item === "About Us" && sub === "Vision 2047"
                                    ? "/about/vision-2047"
                                    : item === "About Us" && sub === "Leadership & Management"
                                      ? "/about/leadership"
                                      : item === "About Us" && sub === "Governance & Transparency"
                                        ? "/about/governance"
                                        : item === "About Us" && sub === "Legal Status & Registration"
                                          ? "/about/legal-status"
                                          : item === "About Us" && sub === "Members & Supporters"
                                            ? "/membership"
                                            : item === "About Us" && sub === "Our Partners & Donors"
                                              ? "/about/legal-status"
                                              : item === "About Us" && sub === "Membership Policy"
                                                ? "/membership#status"
                                                : item === "What We Do" && sub === "Health Care"
                                                  ? "/programs/healthcare"
                                                  : item === "What We Do" && sub === "Education"
                                                    ? "/programs/education"
                                                    : item === "What We Do" && sub === "Skills Development"
                                                      ? "/programs/skills-development"
                                                      : item === "What We Do" && sub === "Women Empowerment"
                                                        ? "/programs/women-empowerment"
                                                        : item === "What We Do"
                                                          ? "/programs/healthcare"
                                                          : item === "Programs" && sub === "View All Programs →"
                                                            ? "/programs/healthcare"
                                                            : item === "Impact"
                                                              ? "/#impact-stats"
                                                              : item === "Media & Updates" && sub === "News & Events"
                                                                ? "/news-and-events"
                                                                : item === "Media & Updates" && sub === "Gallery"
                                                                  ? "/news-and-events"
                                                                  : item === "Media & Updates" && sub === "Press Release"
                                                                    ? "/news-and-events"
                                                                    : item === "Media & Updates"
                                                                      ? "/news-and-events"
                                                                      : item === "Get Involved" && sub === "Donate & Support"
                                                                        ? "/donate"
                                                                        : item === "Get Involved"
                                                                          ? "/#get-involved"
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
              <a
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="block w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors uppercase tracking-wide text-sm text-center"
              >
                DONATE NOW
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function HeroSection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const notices = [
    { d: "25", m: "MAY", title: lang === "en" ? "Free Health Camp — Darbhanga" : "निःशुल्क स्वास्थ्य शिविर — दरभंगा" },
    { d: "05", m: "JUN", title: lang === "en" ? "Environment Day Plantation" : "पर्यावरण दिवस वृक्षारोपण अभियान" },
    { d: "15", m: "JUL", title: lang === "en" ? "Shiksha Na Ruke Distribution" : "शिक्षा न रुके छात्रवृत्ति वितरण" },
    { d: "10", m: "NOV", title: lang === "en" ? "Winter Relief Blanket Drive" : "शीतकालीन राहत कंबल वितरण अभियान" },
    { d: "12", m: "DEC", title: lang === "en" ? "Livelihood Toolkit Distribution" : "आजीविका टूलकिट वितरण कार्यक्रम" },
  ];

  const loopNotices = [...notices, ...notices.slice(0, 3)];
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [noticeTransition, setNoticeTransition] = useState(true);
  const noticeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tick = () => {
      setNoticeIndex((prev) => {
        const next = prev + 1;
        setNoticeTransition(true);
        return next;
      });
    };

    const run = () => {
      noticeTimeoutRef.current = setTimeout(() => {
        tick();
        run();
      }, 3500);
    };

    run();
    return () => {
      if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (noticeIndex === 5) {
      const snapTimer = setTimeout(() => {
        setNoticeTransition(false);
        setNoticeIndex(0);
      }, 500);
      return () => clearTimeout(snapTimer);
    }
  }, [noticeIndex]);




  return (
    <section id="welcome-hero" className="relative scroll-mt-20 bg-white py-6 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column (50%): Welcome text & copy */}
          <div className="flex flex-col justify-center text-left">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              Welcome to <span className="text-brand-orange">Islah Welfare Foundation</span>
            </h1>

            <p className="text-sm text-black leading-relaxed font-normal mb-4">
              Islah Welfare Foundation is an effort to lay a positive foundation of change in the field of education for the underprivileged kids. We believe that happiness for a lifetime can only be achieved by helping and enriching the next generation. Some of us give our time, some money, and some give skills, but ultimately, we strongly feel everyone has something to give to these kids in need. Most importantly, working for ISLAH does not translate to sacrificing personal lives or needs.
            </p>

            <blockquote className="border-l-4 border-brand-orange bg-sky-50/50 p-3 rounded-r-lg my-4 max-w-2xl">
              <p className="text-xs md:text-sm italic text-black font-semibold leading-relaxed">
                “We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.”
              </p>
              <cite className="block text-[10px] md:text-xs font-semibold text-brand-orange mt-1 not-italic">
                — Mother Teresa
              </cite>
            </blockquote>

            <p className="text-sm font-semibold text-black mb-4">
              IWF‘s doors are always open. If you feel you can fill the gap of a missing drop, <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange/60">come join us….</span>
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="/donate" className="bg-[#f97316] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded shadow transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-xs">
                DONATE NOW
              </a>
              <a href="#get-involved" className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-6 py-2.5 rounded shadow transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-xs">
                GET INVOLVED
              </a>
            </div>
          </div>

          {/* Right Column: Events & Notices — light card */}
          <div className="bg-white text-slate-800 p-3 rounded-2xl border border-slate-200 shadow-lg flex flex-col gap-2">

            {/* Header */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base md:text-lg font-extrabold text-[#0b1f3b] flex items-center gap-2">
                <span className="w-1.5 h-5 bg-brand-orange rounded-full"></span>
                {t.eventsNotices}
              </h2>
              <a href="/news-and-events" className="text-xs font-bold text-brand-orange hover:underline">
                View All →
              </a>
            </div>

            {/* Notice ticker */}
            <div className="overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-2 h-[312px]">
              <div
                className="space-y-2"
                style={{
                  transform: `translateY(-${noticeIndex * 62}px)`,
                  transition: noticeTransition ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                }}
              >
                {loopNotices.map((e, i) => (
                  <div key={i} className="h-[56px] bg-white hover:bg-orange-50 rounded-lg px-3 py-2 flex gap-3 items-center border border-slate-200 shadow-sm transition-colors duration-200 group">
                    {/* Date pill */}
                    <div className="text-center bg-[#0b1f3b] rounded-lg px-2 py-1 w-11 shrink-0">
                      <div className="text-[9px] font-bold text-white/80 uppercase leading-none">{e.m}</div>
                      <div className="text-base font-black text-white leading-none mt-0.5">{e.d}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-slate-900 truncate group-hover:text-brand-orange transition-colors">{e.title}</h4>
                    </div>
                    <a href="#" className="text-xs font-bold text-brand-orange hover:underline shrink-0">
                      {t.readMore} →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-8 relative z-20">
        <div className="bg-sky-50 border border-sky-100/80 text-[#0b1f3b] rounded-xl shadow-lg grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-sky-200/60">
          {[
            { icon: Users, n: "5,000+", l: "Lives Impacted" },
            { icon: HeartPulse, n: "100+", l: "Health Camps" },
            { icon: GraduationCap, n: "2,000+", l: "Students Supported" },
            { icon: Leaf, n: "10,000+", l: "Beneficiaries" },
          ].map(({ icon: Icon, n, l }) => (
            <div key={l} className="py-3 px-4 flex items-center gap-3 justify-center">
              <Icon className="w-8 h-8 text-brand-orange shrink-0" />
              <div>
                <div className="text-xl font-extrabold text-[#0b1f3b] leading-tight">{n}</div>
                <div className="text-xs font-semibold text-gray-600 mt-0.5 leading-tight">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface LanguageProp {
  lang: "en" | "hi";
}

function UrgentPatientsSection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const urgentInlineTitle = lang === "en"
    ? `Patients Needing Urgent Support — हर पल अनमोल है`
    : `मदद की तत्काल आवश्यकता वाले मरीज — हर पल अनमोल है`;
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3 border-b border-slate-100 pb-2">
            <div className="flex-1">
              <SectionHeader
                tag={t.urgentTag}
                title={urgentInlineTitle}
                center={false}
              />
            </div>
            <a
              href="/programs/healthcare/critical-life-support"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:text-slate-950 transition-colors shrink-0 mb-3"
            >
              {t.viewAllPatients} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-slate-600 text-sm max-w-4xl mb-4 leading-relaxed">
            {t.urgentSub}
          </p>
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {URGENT_PATIENTS.map((patient) => (
              <PatientCard key={patient.id} {...patient} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FeaturedCauses({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const causes = [
    { img: causeEdu, icon: BookOpen, title: lang === "en" ? "Child Education" : "बाल शिक्षा", desc: lang === "en" ? "Scholarships, school kits & learning centres keeping children in school." : "छात्रवृत्ति, स्कूल किट और लर्निंग सेंटर बच्चों को स्कूल से जोड़े रखने के लिए।", route: "/programs/education" },
    { img: causeMed, icon: Stethoscope, title: lang === "en" ? "Medical Help" : "चिकित्सा सहायता", desc: lang === "en" ? "Free health camps, essential medicines & emergency treatment." : "मुफ़्त स्वास्थ्य शिविर, आवश्यक दवाएं और आपातकालीन चिकित्सा सहायता।", route: "/programs/healthcare" },
    { img: causeWomen, icon: Users, title: lang === "en" ? "Women Empowerment" : "महिला सशक्तिकरण", desc: lang === "en" ? "Self-Help Groups, vocational skills & financial literacy programs." : "स्वयं सहायता समूह, व्यावसायिक कौशल और वित्तीय साक्षरता कार्यक्रम।", route: "/programs/women-empowerment" },
    { img: thAgr, icon: Sprout, title: lang === "en" ? "Rural Development" : "ग्रामीण विकास", desc: lang === "en" ? "Sanitation, clean water and housing for self-reliant villages." : "आत्मनिर्भर गांवों के लिए स्वच्छता, स्वच्छ पानी और आवास निर्माण।", route: "#" },
    { img: thEnt, icon: Wrench, title: lang === "en" ? "Skill Development" : "कौशल विकास", desc: lang === "en" ? "Vocational training and micro-entrepreneurship for village youth." : "ग्रामीण युवाओं के लिए व्यावसायिक प्रशिक्षण और सूक्ष्म-उद्यम विकास।", route: "/programs/skills-development" },
  ];

  return (
    <section className="py-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "Our Focus" : "मुख्य उद्देश्य"}
            title={t.featuredCauses}
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {causes.map((c) => (
              <div key={c.title} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden flex flex-col">
                <div className="relative h-36 w-full">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                    <c.icon className="w-4 h-4 text-brand-green" />
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-extrabold text-base text-slate-950 mb-1.5">{c.title}</h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed flex-1">{c.desc}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <a href={c.route} className="text-sm font-bold text-brand-green hover:text-brand-green-dark">{t.readMore}</a>
                    <a href="/donate" className="text-xs font-extrabold bg-[#f97316] hover:bg-orange-600 text-white px-3.5 py-1.5 rounded-lg transition-all">{t.donateNow}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const CHEERFUL_COLORS = [
  { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100/70" },
  { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100/70" },
  { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100/70" },
  { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100/70" },
  { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100/70" },
  { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100/70" },
];

function WhatWeDo({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const items = [
    { icon: GraduationCap, l: lang === "en" ? "Education" : "शिक्षा", s: lang === "en" ? "Learning & Scholarships" : "लर्निंग और छात्रवृत्ति", route: "/programs/education" },
    { icon: HeartPulse, l: lang === "en" ? "Healthcare" : "स्वास्थ्य सेवा", s: lang === "en" ? "Free camps & awareness" : "शिविर और जागरूकता", route: "/programs/healthcare" },
    { icon: Users, l: lang === "en" ? "Women Empowerment" : "महिला सशक्तिकरण", s: lang === "en" ? "SHGs & Skills" : "एसएचजी और कौशल", route: "/programs/women-empowerment" },
    { icon: Sprout, l: lang === "en" ? "Rural Development" : "ग्रामीण विकास", s: lang === "en" ? "Infrastructure" : "बुनियादी ढांचा", route: "#" },
    { icon: Wrench, l: lang === "en" ? "Skill Development" : "कौशल विकास", s: lang === "en" ? "Vocational Training" : "व्यावसायिक प्रशिक्षण", route: "/programs/skills-development" },
    { icon: Leaf, l: lang === "en" ? "Environment" : "पर्यावरण", s: lang === "en" ? "Plantation & Green Energy" : "वृक्षारोपण और ऊर्जा", route: "#" },
    { icon: Megaphone, l: lang === "en" ? "Relief & Rehabilitation" : "राहत एवं पुनर्वास", s: lang === "en" ? "Disaster & Emergency Aid" : "आपदा और आपातकाल", route: "#" },
    { icon: Wind, l: lang === "en" ? "Agriculture & Livelihood" : "कृषि एवं आजीविका", s: lang === "en" ? "Farming & Rural Income" : "खेती और ग्रामीण आय", route: "#" },
  ];

  return (
    <section id="focus-areas" className="py-6 bg-slate-50 scroll-mt-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "Focus Areas" : "मुख्य ध्यान"}
            title={t.whatWeDo}
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.07}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3.5">
            {items.map(({ icon: Icon, l, s, route }, i) => {
              const col = CHEERFUL_COLORS[i % 6];
              return (
                <a key={l} href={route} className={`bg-white rounded-xl py-3.5 px-3 min-h-[115px] flex flex-col items-center justify-center text-center shadow-sm border ${col.border} hover:shadow-md transition block group hover:-translate-y-0.5`}>
                  <div className={`w-9 h-9 mx-auto rounded-full ${col.bg} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-4 h-4 ${col.text}`} />
                  </div>
                  <div className="text-sm font-black text-slate-900 leading-tight mb-1">{l}</div>
                  <div className="text-xs font-semibold text-slate-600 leading-snug w-full">{s}</div>
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProgramsAndThematic({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const programs = [
    { icon: BookOpen, title: lang === "en" ? "Education Support" : "शिक्षा सहायता", desc: lang === "en" ? "We run Community Learning Centres and 'Shiksha Na Ruke' scholarships to support children." : "हम बच्चों के सहयोग के लिए सामुदायिक शिक्षा केंद्र और 'शिक्षा न रुके' छात्रवृत्ति चलाते हैं।", route: "/programs/education" },
    { icon: HeartPulse, title: lang === "en" ? "Healthcare Camps" : "स्वास्थ्य शिविर", desc: lang === "en" ? "Under 'Health Cannot Wait', we organize free camps, check-ups and hygiene drives." : "'हेल्थ कैन नॉट वेट' के तहत, हम मुफ्त चिकित्सा शिविर और स्वच्छता अभियान आयोजित करते हैं।", route: "/programs/healthcare" },
    { icon: Users, title: lang === "en" ? "Women Empowerment" : "महिला सशक्तिकरण", desc: lang === "en" ? "Forming Self-Help Groups (SHGs) and providing vocational and leadership training." : "स्वयं सहायता समूहों (SHGs) का गठन और व्यावसायिक एवं नेतृत्व प्रशिक्षण प्रदान करना।", route: "/programs/women-empowerment" },
    { icon: Sprout, title: lang === "en" ? "Rural Development" : "ग्रामीण विकास", desc: lang === "en" ? "Clean water access, sanitation, and public infrastructure in 'Model Villages'." : "'मॉडल गांवों' में स्वच्छ पेयजल पहुंच, स्वच्छता और सार्वजनिक बुनियादी ढांचा।", route: "#" },
  ];

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          tag={lang === "en" ? "Core Activities" : "मुख्य कार्यक्रम"}
          title={t.ourPrograms}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-md bg-brand-orange/15 flex items-center justify-center mb-3">
                <p.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-950 mb-1">{p.title}</h3>
              <p className="text-xs text-slate-900 font-semibold mb-3 leading-relaxed">{p.desc}</p>
              <a href={p.route} className="text-xs font-bold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1">
                {t.readMore} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



interface GetInvolvedProps {
  lang: "en" | "hi";
  onOpenModal: (type: RoleType) => void;
}

function GetInvolved({ lang, onOpenModal }: GetInvolvedProps) {
  const t = TRANSLATIONS[lang];
  return (
    <section id="get-involved" className="py-6 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "Join Hands" : "हाथ मिलाएं"}
            title={t.getInvolved}
            subtitle={t.getInvolvedSub}
          />
        </ScrollReveal>
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
          {[
            { icon: Hand, l: t.volunteer, s: t.volunteerSub, type: "volunteer" as const },
            { icon: HandHeart, l: t.partner, s: t.partnerSub, type: "partner" as const },
            { icon: Heart, l: t.sponsor, s: t.sponsorSub, type: "sponsor" as const },
            { icon: Users, l: t.mentor, s: t.mentorSub, type: "mentor" as const },
            { icon: Briefcase, l: t.employee, s: t.employeeSub, type: "employee" as const },
          ].map((item) => (
            <div
              key={item.l}
              onClick={() => onOpenModal(item.type)}
              className="text-center p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 cursor-pointer group"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <item.icon className="w-5 h-5 text-brand-green" />
              </div>
              <div className="text-sm font-extrabold text-slate-950 group-hover:text-brand-green transition-colors">{item.l}</div>
              <div className="text-[11px] text-slate-900 font-semibold mt-1 leading-snug">{item.s}</div>
            </div>
          ))}
          <a href="/donate" className="bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-md w-full text-center text-sm tracking-wider uppercase select-none">
            {t.donateNow}
          </a>
        </div>
      </div>
    </section>
  );
}

function ExploreIWF({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const items = [
    {
      icon: Info,
      page: lang === "en" ? "About Us" : "हमारे बारे में",
      summary: lang === "en"
        ? "We are a public charitable trust dedicated to building an equitable, self-reliant India. Guided by 'Vision 2047', we empower vulnerable communities through education and health."
        : "हम एक सार्वजनिक धर्मार्थ ट्रस्ट हैं जो एक न्यायसंगत, आत्मनिर्भर भारत के निर्माण के लिए समर्पित है। 'विज़न 2047' के तहत हम कमजोर समुदायों को सशक्त बनाते हैं।",
      route: "/about"
    },
    {
      icon: Target,
      page: lang === "en" ? "Programs" : "हमारे कार्यक्रम",
      summary: lang === "en"
        ? "We run structured development programs across key sectors, including primary education, rural healthcare, women empowerment, environment, and emergency relief."
        : "हम प्राथमिक शिक्षा, ग्रामीण स्वास्थ्य सेवा, महिला सशक्तिकरण, पर्यावरण संरक्षण और आपातकालीन राहत सहित प्रमुख क्षेत्रों में विकास कार्यक्रम चलाते हैं।",
      route: "/programs/healthcare"
    },
    {
      icon: BarChart2,
      page: lang === "en" ? "Impact" : "हमारा प्रभाव",
      summary: lang === "en"
        ? "With over 5,000 lives touched, 100 health camps conducted, and 2,000 students supported, we document and share all outcomes via our public impact dashboard."
        : "5,000+ जीवन को प्रभावित करने, 100+ स्वास्थ्य शिविर आयोजित करने और 2,000+ छात्रों की सहायता के साथ, हम सभी परिणामों को सार्वजनिक डैशबोर्ड पर साझा करते हैं।",
      route: "#"
    },
    {
      icon: Newspaper,
      page: lang === "en" ? "Media & Updates" : "मीडिया और अपडेट",
      summary: lang === "en"
        ? "Stay updated with our latest field activities, news, press releases, newsletters, and view our photo gallery capturing real moments of community transformation."
        : "हमारी नवीनतम गतिविधियों, समाचारों, प्रेस विज्ञप्तियों, समाचार पत्रों से अपडेट रहें और समुदाय परिवर्तन के वास्तविक क्षणों को कैद करने वाली हमारी फोटो गैलरी देखें।",
      route: "#"
    },
    {
      icon: UserCheck,
      page: lang === "en" ? "Get Involved" : "हमसे जुड़ें",
      summary: lang === "en"
        ? "We invite individuals, corporates, and institutions to join us. Make a lasting difference by volunteering, mentoring, partnering, or supporting a campaign."
        : "हम व्यक्तियों, कॉर्पोरेट और संस्थानों को हमारे साथ जुड़ने के लिए आमंत्रित करते हैं। स्वयंसेवा, सलाह देने या भागीदारी के माध्यम से एक स्थायी बदलाव लाएं।",
      route: "#"
    },
    {
      icon: MessageCircle,
      page: lang === "en" ? "Contact Us" : "संपर्क करें",
      summary: lang === "en"
        ? "Connect with our team at our offices in Bihar, Delhi, or Meerut. Write to us at info@iwfindia.org or call +91 9811861633 for direct inquiries."
        : "बिहार, दिल्ली या मेरठ में हमारे कार्यालयों में हमारी टीम से जुड़ें। सीधे पूछताछ के लिए हमें info@iwfindia.org पर लिखें या +91 9811861633 पर कॉल करें।",
      route: "#"
    },
  ];

  return (
    <section className="py-6 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "Discover IWF" : "आईडब्ल्यूएफ को जानें"}
            title={t.exploreIWF}
            subtitle={t.exploreSub}
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <div key={item.page} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="font-extrabold text-base text-[#0b1f3b] leading-snug">{item.page}</h3>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4">{item.summary}</p>
                </div>
                <div>
                  <a href={item.route} className="text-sm font-bold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1 hover:opacity-80 transition">
                    {t.readMore} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}



// ─── Impact Statistics Dashboard ─────────────────────────────────────────────

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const IMPACT_STATS = [
  { icon: Users, value: 5000, suffix: "+", label: "Lives Touched", color: "#15803d" },
  { icon: HeartPulse, value: 100, suffix: "+", label: "Health Camps", color: "#ea580c" },
  { icon: BookOpen, value: 2000, suffix: "+", label: "Students Supported", color: "#1D4ED8" },
  { icon: MapPin, value: 50, suffix: "+", label: "Villages Reached", color: "#D97706" },
  { icon: Activity, value: 12, suffix: "", label: "Active Programs", color: "#7C3AED" },
  { icon: Award, value: 8, suffix: "", label: "Years of Service", color: "#DB2777" },
];

const STAT_TRANSLATIONS = {
  en: {
    "Lives Touched": "Lives Touched",
    "Health Camps": "Health Camps",
    "Students Supported": "Students Supported",
    "Villages Reached": "Villages Reached",
    "Active Programs": "Active Programs",
    "Years of Service": "Years of Service"
  },
  hi: {
    "Lives Touched": "लाभार्थी",
    "Health Camps": "स्वास्थ्य शिविर",
    "Students Supported": "सहायता प्राप्त छात्र",
    "Villages Reached": "सक्रिय गाँव",
    "Active Programs": "सक्रिय कार्यक्रम",
    "Years of Service": "सेवा के वर्ष"
  }
};

function StatCard({ stat, visible, lang, index }: { stat: typeof IMPACT_STATS[0]; visible: boolean; lang: "en" | "hi"; index: number }) {
  const count = useCountUp(stat.value, 1800, visible);
  const Icon = stat.icon;
  const col = CHEERFUL_COLORS[index % 6];
  return (
    <ScrollReveal>
      <div className={`bg-white rounded-xl py-3.5 px-3 min-h-[115px] flex flex-col items-center justify-center text-center shadow-sm border ${col.border} hover:shadow-md transition block group hover:-translate-y-0.5`}>
        <div className={`w-9 h-9 mx-auto rounded-full ${col.bg} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform`}>
          <Icon className={`w-4 h-4 ${col.text}`} />
        </div>
        <div className={`text-xl font-extrabold ${col.text} leading-none mb-1`}>
          {count.toLocaleString("en-IN")}{stat.suffix}
        </div>
        <div className="text-xs font-bold text-slate-700 leading-snug w-full">
          {STAT_TRANSLATIONS[lang][stat.label as keyof typeof STAT_TRANSLATIONS["en"]] || stat.label}
        </div>
      </div>
    </ScrollReveal>
  );
}

function ImpactStats({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="impact-stats" className="py-4 bg-blue-50/60 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          tag={t.ourImpactTag}
          title={t.ourImpactTitle}
          subtitle={t.ourImpactSub}
        />

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {IMPACT_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} visible={visible} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Campaigns Section ────────────────────────────────────────────────────────

const CAMPAIGNS = [
  {
    emoji: "📚",
    name: "Shiksha Na Ruke",
    tagline: "Education Must Not Stop",
    desc: "Ensuring uninterrupted education for underprivileged children through scholarships, school kits, and community learning centres.",
    color: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    cta: "Support Education",
  },
  {
    emoji: "🏥",
    name: "Health Cannot Wait",
    tagline: "Free Medical Care for All",
    desc: "Emergency medical aid, free health camps, and ambulance services reaching the most remote corners of rural Bihar.",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    cta: "Support Health",
  },
  {
    emoji: "✈️",
    name: "She Can Fly",
    tagline: "Empowering Women, Changing Lives",
    desc: "Vocational training, Self-Help Groups, and livelihood programs giving women the tools to achieve financial independence.",
    color: "#DB2777",
    bg: "#FDF2F8",
    border: "#FBCFE8",
    cta: "Support Women",
  },
  {
    emoji: "🤝",
    name: "Swabhiman",
    tagline: "Dignity Through Self-Reliance",
    desc: "Skill development, micro-finance, and entrepreneurship training turning vulnerable communities into self-sufficient contributors.",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    cta: "Support Livelihoods",
  },
  {
    emoji: "🌱",
    name: "Tayyari Kal Ki",
    tagline: "Preparing for Tomorrow",
    desc: "Rural development, environmental sustainability, and community infrastructure building for a resilient, future-ready India.",
    color: "#15803d",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    cta: "Support Development",
  },
];

function CampaignsSection({ lang }: LanguageProp) {
  return (
    <section className="py-6 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "Our Campaigns" : "हमारे अभियान"}
            title={lang === "en" ? "Five Pillars of Change" : "परिवर्तन के पांच स्तंभ"}
            subtitle={lang === "en" ? "Each campaign targets a critical dimension of poverty and inequality — together they form IWF's blueprint for a better India." : "प्रत्येक अभियान गरीबी और असमानता के एक महत्वपूर्ण आयाम को लक्षित करता है — मिलकर वे एक बेहतर भारत के लिए आईडब्ल्यूएफ का खाका तैयार करते हैं"}
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAMPAIGNS.map((c, i) => (
              <div
                key={c.name}
                className="bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col justify-between h-full"
                style={{ borderColor: i === 0 ? "transparent" : "transparent" }}
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl shrink-0">{c.emoji}</div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base">{c.name}</h3>
                      <p className="text-xs font-semibold" style={{ color: c.color }}>{c.tagline}</p>
                    </div>
                  </div>
                  <div className="w-full h-1 rounded-full mb-4" style={{ backgroundColor: c.color, opacity: 0.2 }} />
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{c.desc}</p>
                </div>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all hover:scale-[1.02] self-start"
                  style={{ backgroundColor: c.bg, color: c.color, border: `1.5px solid ${c.border}` }}
                >
                  {c.cta} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-gradient-to-br from-brand-green to-[#0b1f3b] rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl shrink-0">🌟</span>
                  <h3 className="font-extrabold text-white text-base leading-none">Join the Movement</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">Volunteer, donate, or partner with IWF to amplify the impact of these campaigns across rural India.</p>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <a href="/donate" className="w-full text-center bg-[#f97316] hover:bg-orange-600 text-white font-bold text-sm py-2.5 rounded-lg transition shadow-md">
                  Donate Now
                </a>
                <a href="/membership" className="w-full text-center bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm py-2.5 rounded-lg transition">
                  Become a Member
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── News & Latest Updates ────────────────────────────────────────────────────

const LATEST_NEWS = [
  {
    tag: "Health Camp",
    tagColor: "#DC2626",
    date: "June 28, 2025",
    title: "Free Medical Camp Organized at Bathiya — 200+ Patients Treated",
    excerpt: "IWF's Healthcare team conducted a comprehensive free medical camp at Bathiya, Darbhanga, providing consultations, medicines, and diagnostic services to over 200 patients from surrounding villages.",
    img: "🏥",
  },
  {
    tag: "Education",
    tagColor: "#1D4ED8",
    date: "June 15, 2025",
    title: "Annual Scholarship Distribution Ceremony Held in Muzaffarpur",
    excerpt: "100 meritorious students from underprivileged families received scholarships under the Shiksha Na Ruke campaign, covering school fees, uniforms, and study materials for the academic year.",
    img: "🎓",
  },
  {
    tag: "Women Empowerment",
    tagColor: "#DB2777",
    date: "June 05, 2025",
    title: "New Self-Help Group Launched in Sitamarhi — 30 Women Enroll",
    excerpt: "Under the She Can Fly campaign, a new SHG was formed at Sitamarhi with 30 women enrolled in vocational training programs for tailoring, candle making, and food processing.",
    img: "🤝",
  },
  {
    tag: "Annual Report",
    tagColor: "#15803d",
    date: "May 20, 2025",
    title: "IWF Annual Report 2024–25 Published — Impact Across 50+ Villages",
    excerpt: "The Annual Report 2024–25 documents IWF's work across education, healthcare, and livelihood programmes, reaching 50+ villages and impacting 5,000+ beneficiaries over the year.",
    img: "📊",
  },
];

function GallerySection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const items = [
    { type: "video", src: g1, title: lang === "en" ? "VISION ACADEMIC CITY" : "विज़न एकेडमिक सिटी" },
    { type: "video", src: g2, title: lang === "en" ? "OPENING CEREMONY" : "उद्घाटन समारोह" },
    { type: "photo", src: g3, title: lang === "en" ? "HEALTH DIAGNOSTIC CAMP" : "स्वास्थ्य जाँच शिविर" },
    { type: "photo", src: g4, title: lang === "en" ? "ENVIRONMENT PLANTATION" : "पर्यावरण वृक्षारोपण" },
    { type: "photo", src: g5, title: lang === "en" ? "SHIKSHA NA RUKE CAMPAIGN" : "शिक्षा न रुके अभियान" },
    { type: "photo", src: g6, title: lang === "en" ? "VOCATIONAL TRAINING" : "व्यावसायिक प्रशिक्षण कार्यक्रम" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Responsive scroll bounds
  const [maxIndex, setMaxIndex] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMaxIndex(2);
      } else if (window.innerWidth >= 640) {
        setMaxIndex(4);
      } else {
        setMaxIndex(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft" && lightboxIndex !== null && lightboxIndex > 0) {
        setLightboxIndex(lightboxIndex - 1);
      } else if (e.key === "ArrowRight" && lightboxIndex !== null && lightboxIndex < items.length - 1) {
        setLightboxIndex(lightboxIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-6 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header Title with red/orange dashes and navigation arrows */}
        <div className="flex items-center justify-between mb-10 relative">

          {/* Centered Gallery Header in full width parent */}
          <div className="flex-1">
            <SectionHeader
              tag={lang === "en" ? "Visual Journey" : "दृश्य यात्रा"}
              title={lang === "en" ? "Gallery" : "गैलरी"}
            />
          </div>

          {/* Navigation controls */}
          <div className="absolute right-0 flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${currentIndex === 0
                ? "border-slate-200 text-slate-300 cursor-not-allowed"
                : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                }`}
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${currentIndex >= maxIndex
                ? "border-slate-200 text-slate-300 cursor-not-allowed"
                : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                }`}
              aria-label="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-4 w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / (maxIndex === 2 ? 4 : maxIndex === 4 ? 2 : 1))}%` }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="w-[calc(100%-16px)] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(25%-12px)] rounded-2xl overflow-hidden shadow-md border border-slate-100 group relative aspect-[4/3] bg-slate-900 cursor-pointer"
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Video Play Button Overlay */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white/40 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center pl-1 shadow-md">
                        <svg className="w-5 h-5 text-slate-900 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Title Overlay with gradient shadow */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
                  <h4 className="text-white font-extrabold text-xs tracking-wider uppercase group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All link below the carousel */}
        <div className="text-center mt-8">
          <a
            href="/news-and-events"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-green hover:text-brand-green-dark hover:underline transition-colors uppercase tracking-wider"
          >
            {lang === "en" ? "View All Media" : "सभी मीडिया देखें"} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-white hover:text-brand-orange transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-transform active:scale-95 z-[110]"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Arrow */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-orange transition-colors p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer z-[110] transition-transform active:scale-95 hidden sm:flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
              }}
              disabled={lightboxIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div 
              className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-4 px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[lightboxIndex].src}
                alt={items[lightboxIndex].title}
                className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
              />
              {/* Title / Description */}
              <div className="text-center bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                <h4 className="text-white text-sm font-extrabold tracking-wider uppercase">
                  {items[lightboxIndex].title}
                </h4>
                <p className="text-[10px] text-white/50 mt-0.5 uppercase tracking-wider font-semibold">
                  {items[lightboxIndex].type === "video" ? "Video Highlight" : "Photo Journey"}
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-orange transition-colors p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer z-[110] transition-transform active:scale-95 hidden sm:flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : prev));
              }}
              disabled={lightboxIndex === items.length - 1}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────



// ─── Hero Carousel Section Component ──────────────────────────────────────────

function HeroCarouselSection() {
  const slides = [
    { id: 1, img: slide1, alt: "Education for Every Child" },
    { id: 2, img: slide2, alt: "Building a Better India – Vision 2047" },
    { id: 3, img: slide3, alt: "Healthcare That Reaches the Last Mile" },
    { id: 4, img: slide4, alt: "Skills Today, Success Tomorrow" },
  ];

  const SLIDE_DURATION = 4000;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play interval: triggers every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // Smooth indicator progress: tracks elapsed time in current slide
  useEffect(() => {
    setProgress(0);
    if (isPaused) return;
    const startTime = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
    }, 40);
    return () => clearInterval(tick);
  }, [currentSlide, isPaused]);

  const goToSlide = (idx: number) => {
    if (isTransitioning || idx === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(idx);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  // Touch / swipe
  const touchStart = useRef<number>(0);
  const touchDelta = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };
  const handleTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      if (touchDelta.current < 0) nextSlide();
      else prevSlide();
    }
  };
  return (
    <section
      id="hero-carousel"
      className="relative w-full select-none scroll-mt-20 overflow-hidden bg-slate-950 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides — crossfade for ultra-smooth transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transform: index === currentSlide ? "scale(1)" : "scale(1.04)",
            transition: "opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.4s cubic-bezier(0.4,0,0.2,1)",
            zIndex: index === currentSlide ? 2 : 1,
          }}
        >
          <img
            src={slide.img}
            alt={slide.alt}
            className="w-full h-full object-cover"
            draggable={false}
            loading="eager"
          />
        </div>
      ))}

      {/* Spacer to hold height (first image defines aspect ratio) */}
      <img
        src={slides[0].img}
        alt=""
        className="w-full h-auto block invisible"
        aria-hidden="true"
      />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      {/* Gradient overlays for arrow hover areas */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/25 to-transparent z-[4] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/25 to-transparent z-[4] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer shadow-2xl"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer shadow-2xl"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Bottom Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[5] flex items-center gap-3 bg-black/35 px-5 py-2.5 rounded-full backdrop-blur-2xl border border-white/10 shadow-2xl">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="relative cursor-pointer"
          >
            <div
              className={`rounded-full transition-all duration-500 ${
                currentSlide === idx
                  ? "w-10 md:w-12 h-2 bg-white/20"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
            {currentSlide === idx && (
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-brand-orange"
                style={{
                  width: `${progress}%`,
                  transition: "width 50ms linear",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

function PreFooterHomeSections() {
  return (
    <>
      {/* Zone A — Stay Connected & Trusted Trust Strip */}
      <div className="bg-[#f9f9f6] text-slate-800 py-6 px-4 md:px-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="flex gap-4 items-start">
            <div className="w-11 h-11 rounded-full bg-[#0b1f3b] text-white flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-[#0b1f3b] text-base leading-tight">Stay Connected</h5>
              <p className="text-gray-600 text-sm mt-1">
                Subscribe to updates about IWF activities, campaigns and impact.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center mt-2.5 shadow-sm rounded-md overflow-hidden border border-gray-200">
                <input type="email" placeholder="Enter your email" required className="flex-1 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none border-0 min-w-0" />
                <button type="submit" className="bg-[#0b1f3b] hover:bg-brand-green text-white text-xs font-semibold px-4 py-2.5 transition-colors uppercase shrink-0 cursor-pointer">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="text-center">
            <h5 className="font-bold text-[#0b1f3b] text-sm uppercase tracking-wide mb-3">Trusted Organisation</h5>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Registered Trust", Icon: Award },
                { label: "12A & 80G", Icon: ShieldCheck },
                { label: "Impact Driven", Icon: BarChart2 },
                { label: "Transparent", Icon: Lock },
              ].map(({ label, Icon }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0b1f3b] bg-white flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0b1f3b]" />
                  </div>
                  <span className="text-[#0b1f3b] font-semibold text-[11px] text-center mt-1.5 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">
            <p className="text-[#0b1f3b] font-medium text-sm italic leading-relaxed">
              "Alone we can do so little, together we can do so much."
            </p>
            <span className="text-xs font-semibold text-[#0b1f3b] mt-2 block">— Helen Keller</span>
          </div>
        </div>
      </div>

      {/* Zone B — Transparency, Accountability, Integrity, Compassion (White Background) */}
      <div className="bg-white text-slate-800 py-5 px-4 md:px-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-center">
          {[
            { title: "Transparency", desc: "Open and honest in every action.", Icon: ShieldCheck },
            { title: "Accountability", desc: "Responsible for every commitment.", Icon: UserCheck },
            { title: "Integrity", desc: "Guided by strong ethical principles.", Icon: Scale },
            { title: "Compassion", desc: "Sensitive to the needs of others.", Icon: Heart },
          ].map(({ title, desc, Icon }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#f97316]" />
              </div>
              <div>
                <h6 className="font-extrabold text-slate-900 text-sm">{title}</h6>
                <p className="text-slate-500 font-medium text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-center">
            <p className="text-slate-700 font-serif italic text-sm leading-snug">
              "Together, we build a better tomorrow"
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const handleOpenModal = (type: RoleType) => {
    setActiveModal(type);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <Header lang={lang} />
      <HeroCarouselSection />
      <HeroSection lang={lang} />
      <UrgentPatientsSection lang={lang} />
      <WhatWeDo lang={lang} />
      <ImpactStats lang={lang} />
      <FeaturedCauses lang={lang} />
      <CampaignsSection lang={lang} />
      <ProgramsAndThematic lang={lang} />
      <ExploreIWF lang={lang} />
      <GetInvolved lang={lang} onOpenModal={handleOpenModal} />
      <PreFooterHomeSections />
      <GallerySection lang={lang} />
      <HomeFooter onOpenModal={handleOpenModal} />

      {/* Unified Role Forms Modal */}
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
