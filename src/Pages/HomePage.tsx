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
import { NotificationTicker, UtilityBar, Header, Footer } from "@/components/layout/SiteLayout";

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

interface LanguageProp {
  lang: "en" | "hi";
}

function HeroSection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const notices = [
    { d: "25", m: "MAY", title: lang === "en" ? "Free Health Camp — Darbhanga" : "निःशुल्क स्वास्थ्य शिविर — दरभंगा" },
    { d: "05", m: "JUN", title: lang === "en" ? "Environment Day Tree Plantation Drive" : "पर्यावरण दिवस वृक्षारोपण अभियान" },
    { d: "15", m: "JUL", title: lang === "en" ? "Shiksha Na Ruke Scholarship Distribution" : "शिक्षा न रुके छात्रवृत्ति वितरण" },
    { d: "20", m: "AUG", title: lang === "en" ? "Pari Ki Udaan Menstrual Hygiene Drive" : "परी की उड़ान स्वच्छता अभियान" },
    { d: "10", m: "NOV", title: lang === "en" ? "Winter Relief Blanket Distribution" : "शीतकालीन राहत कंबल वितरण अभियान" },
    { d: "12", m: "DEC", title: lang === "en" ? "Swabhimaan Livelihood Toolkit Drive" : "स्वाभिमान आजीविका टूलकिट वितरण" },
  ];

  const loopNotices = [...notices, ...notices.slice(0, 4)];
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
      }, 3200);
    };

    run();
    return () => {
      if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (noticeIndex === 6) {
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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
              Welcome to <span className="text-brand-orange">ISLAH</span>
            </h1>
            <p className="text-xs md:text-sm font-bold text-[#0b1f3b] mb-1">
              ISLAH (Integrated Social, Livelihood, Advancement & Humanitarian Action)
            </p>
            <p className="text-xs md:text-sm font-semibold text-brand-orange mb-3">
              Empowering People. Strengthening Communities. Building a Better Future.
            </p>

            <p className="text-sm text-black leading-relaxed font-normal mb-3">
              ISLAH is the public identity of Islah Welfare Foundation, a non-profit organisation committed to advancing the well-being, dignity, and resilience of rural and underserved communities. We believe that meaningful development cannot be achieved by addressing problems in isolation. Education without livelihood, healthcare without awareness, infrastructure without participation, or economic support without dignity cannot create lasting change.
            </p>

            <p className="text-sm text-black leading-relaxed font-normal mb-3">
              ISLAH therefore follows an integrated and community-centred approach, bringing together education, healthcare, livelihoods, agriculture, women and youth empowerment, environmental sustainability, humanitarian assistance, and community development.
            </p>

            <div className="bg-slate-50 border-l-4 border-[#0b1f3b] p-3 rounded-r-lg mb-3">
              <p className="text-xs md:text-sm font-bold text-slate-900">
                Our purpose is simple:
              </p>
              <p className="text-xs md:text-sm text-black font-medium mt-0.5 leading-relaxed">
                To create the conditions in which individuals can become empowered, families can become resilient, and communities can become self-reliant.
              </p>
            </div>

            <blockquote className="border-l-4 border-brand-orange bg-sky-50/50 p-3 rounded-r-lg my-3 max-w-2xl">
              <p className="text-xs md:text-sm italic text-black font-semibold leading-relaxed">
                “We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.”
              </p>
              <cite className="block text-[10px] md:text-xs font-semibold text-brand-orange mt-1 not-italic">
                -Mother Teresa
              </cite>
            </blockquote>

            <p className="text-sm font-semibold text-black mb-4">
              Our doors are always open. If you feel you can fill the gap of a missing drop,<br />
              <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange/60">come join us….</span>
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="/about" className="bg-[#0b1f3b] hover:bg-[#163a69] text-white font-bold px-6 py-2.5 rounded shadow transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-xs">
                KNOW MORE
              </a>
              <a href="#get-involved" className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-6 py-2.5 rounded shadow transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-xs">
                GET INVOLVED
              </a>
              <a href="/donate" className="bg-[#f97316] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded shadow transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-xs">
                DONATE NOW
              </a>
            </div>
          </div>

          {/* Right Column: Events & Notices + Big 2x2 Stats Grid beneath */}
          <div className="flex flex-col gap-4">
            {/* Header & Notice Ticker Card */}
            <div className="bg-white text-slate-800 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-base md:text-lg font-extrabold text-[#0b1f3b] flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-brand-orange rounded-full"></span>
                  {t.eventsNotices}
                </h2>
                <a href="/news-and-events" className="text-xs font-bold text-brand-orange hover:underline">
                  View All →
                </a>
              </div>

              {/* Notice ticker — tall container for 5-6 events */}
              <div className="overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-2.5 h-[280px]">
                <div
                  className="space-y-2.5"
                  style={{
                    transform: `translateY(-${noticeIndex * 66}px)`,
                    transition: noticeTransition ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                  }}
                >
                  {loopNotices.map((e, i) => (
                    <div key={i} className="h-[58px] bg-white hover:bg-orange-50 rounded-xl px-3 py-2 flex gap-3 items-center border border-slate-200 shadow-2xs transition-colors duration-200 group">
                      {/* Date pill */}
                      <div className="text-center bg-[#0b1f3b] rounded-lg px-2 py-1 w-11 shrink-0">
                        <div className="text-[9px] font-bold text-white/80 uppercase leading-none">{e.m}</div>
                        <div className="text-base font-black text-white leading-none mt-0.5">{e.d}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate group-hover:text-brand-orange transition-colors">{e.title}</h4>
                      </div>
                      <a href="/news-and-events" className="text-xs font-bold text-brand-orange hover:underline shrink-0">
                        {t.readMore} →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Big 2 x 2 Stats Grid (Square-like, filling width & space) */}
            <div className="bg-[#f0f7ff] border border-sky-200/80 rounded-2xl p-3.5 sm:p-4 grid grid-cols-2 gap-3.5 shadow-sm">
              {[
                { icon: Users, n: "5,000+", l: "Lives Impacted" },
                { icon: HeartPulse, n: "100+", l: "Health Camps" },
                { icon: GraduationCap, n: "2,000+", l: "Students Supported" },
                { icon: Leaf, n: "10,000+", l: "Beneficiaries" },
              ].map(({ icon: Icon, n, l }) => (
                <div key={l} className="bg-white/95 border border-sky-100/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition group min-h-[115px]">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight leading-none">{n}</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-600 leading-tight mt-1">{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



function UrgentPatientsSection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3 border-b border-slate-100 pb-2">
            <div className="flex-1">
              <SectionHeader
                tag={lang === "en" ? "MEDICAL EMERGENCY" : "चिकित्सा आपातकाल"}
                title={lang === "en" ? "CRITICAL MEDICAL & EMERGENCY SUPPORT" : "क्रिटिकल मेडिकल और आपातकालीन सहायता"}
                subtitle="Har Pal Anmol Hai"
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
    { img: causeEdu, icon: BookOpen, title: "Education", desc: lang === "en" ? "Scholarships, school kits & learning centres keeping children in school." : "छात्रवृत्ति, स्कूल किट और लर्निंग सेंटर बच्चों को स्कूल से जोड़े रखने के लिए।", route: "/programs/education" },
    { img: causeMed, icon: Stethoscope, title: "Health", desc: lang === "en" ? "Free health camps, essential medicines & emergency treatment." : "मुफ़्त स्वास्थ्य शिविर, आवश्यक दवाएं और आपातकालीन चिकित्सा सहायता।", route: "/programs/healthcare" },
    { img: causeWomen, icon: Users, title: "Women Empower", desc: lang === "en" ? "Self-Help Groups, vocational skills & financial literacy programs." : "स्वयं सहायता समूह, व्यावसायिक कौशल और वित्तीय साक्षरता कार्यक्रम।", route: "/programs/women-empowerment" },
    { img: thAgr, icon: Sprout, title: "Rural Livelihoods", desc: lang === "en" ? "Sanitation, clean water and agricultural empowerment for self-reliant villages." : "आत्मनिर्भर गांवों के लिए स्वच्छता, स्वच्छ पानी और कृषि सशक्तिकरण।", route: "/programs/agriculture" },
    { img: thEnt, icon: Megaphone, title: "Relief & Rehabilitation", desc: lang === "en" ? "Disaster response, emergency humanitarian aid, and rehabilitation assistance." : "आपदा प्रतिक्रिया, आपातकालीन मानवीय सहायता और पुनर्वास सहायता।", route: "/programs/relief-and-rehabilitation" },
  ];

  return (
    <section className="py-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "Our Focus" : "मुख्य उद्देश्य"}
            title={t.featuredCauses}
            subtitle={lang === "en" ? "Supporting change where it matters most." : "जहाँ सबसे ज्यादा ज़रूरत है, वहाँ बदलाव का समर्थन।"}
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
  const items = [
    { icon: GraduationCap, l: lang === "en" ? "Education" : "शिक्षा", s: lang === "en" ? "Learning & Scholarships" : "लर्निंग और छात्रवृत्ति", route: "/programs/education" },
    { icon: HeartPulse, l: lang === "en" ? "Healthcare" : "स्वास्थ्य सेवा", s: lang === "en" ? "Free camps & awareness" : "शिविर और जागरूकता", route: "/programs/healthcare" },
    { icon: Users, l: lang === "en" ? "Women Empowerment" : "महिला सशक्तिकरण", s: lang === "en" ? "SHGs & Skills" : "एसएचजी और कौशल", route: "/programs/women-empowerment" },
    { icon: Sprout, l: lang === "en" ? "Rural Development" : "ग्रामीण विकास", s: lang === "en" ? "Infrastructure & Sanitation" : "बुनियादी ढांचा और स्वच्छता", route: "#" },
    { icon: Wrench, l: lang === "en" ? "Skill Development" : "कौशल विकास", s: lang === "en" ? "Vocational Training" : "व्यावसायिक प्रशिक्षण", route: "/programs/skills-development" },
    { icon: Leaf, l: lang === "en" ? "Environment" : "पर्यावरण", s: lang === "en" ? "Plantation & Green Energy" : "वृक्षारोपण और ऊर्जा", route: "#" },
    { icon: Megaphone, l: lang === "en" ? "Relief & Rehabilitation" : "राहत एवं पुनर्वास", s: lang === "en" ? "Disaster & Emergency Aid" : "आपदा और आपातकाल", route: "#" },
    { icon: Wind, l: lang === "en" ? "Agriculture & Livelihood" : "कृषि एवं आजीविका", s: lang === "en" ? "Farming & Rural Income" : "खेती और ग्रामीण आय", route: "#" },
  ];

  return (
    <section id="focus-areas" className="py-8 bg-slate-50 scroll-mt-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "What We Do" : "हम क्या करते हैं"}
            title={lang === "en" ? "OUR PROGRAMS FOR SOCIAL IMPACT" : "सामाजिक प्रभाव के लिए हमारे कार्यक्रम"}
            subtitle={lang === "en" ? "Creating Opportunities. Strengthening Communities." : "अवसरों का सृजन। समुदायों का सशक्तिकरण।"}
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.07}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map(({ icon: Icon, l, s, route }, i) => {
              const col = CHEERFUL_COLORS[i % 6];
              return (
                <a key={l} href={route} className={`bg-white rounded-xl p-5 min-h-[125px] flex flex-col items-center justify-center text-center shadow-sm border ${col.border} hover:shadow-md transition block group hover:-translate-y-1`}>
                  <div className={`w-11 h-11 mx-auto rounded-xl ${col.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-xs`}>
                    <Icon className={`w-5 h-5 ${col.text}`} />
                  </div>
                  <div className="text-base font-extrabold text-slate-900 leading-tight mb-1">{l}</div>
                  <div className="text-xs font-semibold text-slate-500 leading-snug w-full">{s}</div>
                </a>
              );
            })}
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
    slug: "shiksha-na-ruke",
    tagline: "Keeping Education Within Reach",
    desc: "Ensuring uninterrupted education for underprivileged children through scholarships, school kits, and community learning centres.",
    color: "#15803d",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    cta: "Support Education",
  },
  {
    emoji: "🏥",
    name: "Har Pal Anmol Hai",
    slug: "har-pal-anmol-hai",
    tagline: "When Every Moment Matters",
    desc: "Emergency medical aid, free health camps, and diagnostic support reaching the most remote corners of rural communities.",
    color: "#e11d48",
    bg: "#FFF1F2",
    border: "#FECDD3",
    cta: "Support Health",
  },
  {
    emoji: "✈️",
    name: "Pari Ki Udaan",
    slug: "pari-ki-udaan",
    tagline: "Empowering Girls to Dream, Learn & Lead",
    desc: "Vocational training, hygiene kits, scholarships, and livelihood programs giving women and girls tools for independence.",
    color: "#db2777",
    bg: "#FDF2F8",
    border: "#FBCFE8",
    cta: "Support Girls",
  },
  {
    emoji: "⚖️",
    name: "Swabhimaan",
    slug: "swabhimaan",
    tagline: "Dignity. Equality. Self-Reliance.",
    desc: "Social justice, legal empowerment, government entitlement facilitation, and starter toolkits for sustainable livelihoods.",
    color: "#d97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    cta: "Support Dignity",
  },
  {
    emoji: "🌱",
    name: "Taiyyari Kal Ki",
    slug: "taiyyari-kal-ki",
    tagline: "Preparing Communities for Tomorrow",
    desc: "Future skills, digital training, sustainable agriculture, and climate resilience building future-ready communities.",
    color: "#0d9488",
    bg: "#F0FDFA",
    border: "#99F6E4",
    cta: "Support Future",
  },
];

function CampaignsSection({ lang }: LanguageProp) {
  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-1.5">
                {lang === "en" ? "OUR CAMPAIGNS" : "हमारे अभियान"}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#0b1f3b] uppercase tracking-wide">
                {lang === "en" ? "FIVE PILLARS OF CHANGE" : "परिवर्तन के पांच स्तंभ"}
              </h2>
              <p className="text-slate-700 font-medium text-xs sm:text-sm mt-1">
                {lang === "en"
                  ? "Focused action. Collective purpose. Lasting change."
                  : "केंद्रित कार्रवाई। सामूहिक उद्देश्य। स्थायी परिवर्तन।"}
              </p>
            </div>
            <a
              href="/campaign"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#0b1f3b] hover:text-[#15803d] transition shrink-0 self-start sm:self-end"
            >
              <span>Explore All Campaigns</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAMPAIGNS.map((c) => (
              <div
                key={c.slug}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="text-2xl shrink-0">{c.emoji}</div>
                    <a
                      href={`/campaign/${c.slug}`}
                      className="text-[11px] font-bold text-slate-500 group-hover:text-[#15803d] transition flex items-center gap-1"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-base group-hover:text-[#0b1f3b]">
                      <a href={`/campaign/${c.slug}`}>{c.name}</a>
                    </h3>
                    <p className="text-xs font-bold mt-0.5" style={{ color: c.color }}>
                      {c.tagline}
                    </p>
                  </div>

                  <div className="w-full h-1 rounded-full my-3" style={{ backgroundColor: c.color, opacity: 0.2 }} />
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{c.desc}</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={`/campaign/${c.slug}`}
                    className="text-xs font-extrabold text-[#0b1f3b] hover:text-[#15803d] transition inline-flex items-center gap-1"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                  <a
                    href={`/donate?campaign=${c.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: c.bg, color: c.color, border: `1.5px solid ${c.border}` }}
                  >
                    {c.cta} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-gradient-to-br from-brand-green to-[#0b1f3b] rounded-2xl p-5 flex flex-col justify-between h-full text-white shadow-xs">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl shrink-0">🌟</span>
                  <h3 className="font-extrabold text-white text-base leading-none">Join the Movement</h3>
                </div>
                <p className="text-white/80 text-xs leading-relaxed mb-3">
                  Volunteer, donate, or partner with ISLAH to multiply the impact of these 5 campaigns across underserved communities.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href="/donate"
                  className="w-full text-center bg-[#f97316] hover:bg-orange-600 text-white font-bold text-xs py-2 rounded-lg transition shadow-xs"
                >
                  Donate Now
                </a>
                <a
                  href="/campaign"
                  className="w-full text-center bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs py-2 rounded-lg transition"
                >
                  View All Campaigns
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

// ─── Our Partners & Collaborators ───────────────────────────────────────────

const PARTNERS = [
  { name: "Tata Consultancy Services", short: "TCS", type: "Technology & Skill Partner", bg: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "HCL Foundation", short: "HCL", type: "CSR & Rural Empowerment", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { name: "Infosys Foundation", short: "Infosys", type: "Education & Health Support", bg: "bg-sky-50 text-sky-700 border-sky-200" },
  { name: "Wipro Cares", short: "Wipro", type: "Community Sustainability", bg: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Tech Mahindra Foundation", short: "Tech M", type: "Vocational & Disability", bg: "bg-red-50 text-red-700 border-red-200" },
  { name: "Reliance Foundation", short: "Reliance", type: "Healthcare & Nutrition", bg: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "SBI Foundation", short: "SBI", type: "Financial Inclusion & Aid", bg: "bg-cyan-50 text-cyan-800 border-cyan-200" },
  { name: "Azim Premji Foundation", short: "APF", type: "Primary Education Initiative", bg: "bg-rose-50 text-rose-700 border-rose-200" },
  { name: "L&T Public Charitable Trust", short: "L&T", type: "Infrastructure & Water", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "Adani Foundation", short: "Adani", type: "Community Transformation", bg: "bg-violet-50 text-violet-700 border-violet-200" },
];

function OurPartnersSection({ lang }: LanguageProp) {
  const repeatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-6 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-3">
        <ScrollReveal>
          <SectionHeader
            tag={lang === "en" ? "OUR PARTNERS" : "हमारे सहयोगी"}
            title={lang === "en" ? "TOGETHER, WE CREATE GREATER IMPACT" : "साथ मिलकर हम लाते हैं बड़ा बदलाव"}
            subtitle={lang === "en"
              ? "Collaboration brings together knowledge, resources and people to create meaningful and sustainable change."
              : "सहयोग ज्ञान, संसाधन और लोगों को एक साथ लाकर सार्थक और स्थायी बदलाव का निर्माण करता है।"}
          />
        </ScrollReveal>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="relative w-full overflow-hidden py-1">
        <div className="animate-marquee-slow flex items-center gap-4">
          {repeatedPartners.map((partner, index) => (
            <div
              key={`${partner.short}-${index}`}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md p-3 px-4 flex items-center gap-3 shrink-0 min-w-[240px] max-w-[270px] hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
            >
              <div className={`w-10 h-10 rounded-lg border ${partner.bg} flex items-center justify-center font-black text-xs shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                {partner.short}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-slate-900 text-xs leading-tight truncate group-hover:text-brand-orange transition-colors">
                  {partner.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  {partner.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section className="py-5 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header Title and navigation arrows */}
        <div className="flex items-center justify-between mb-4 relative">

          {/* Centered Gallery Header */}
          <div className="flex-1">
            <SectionHeader
              tag={lang === "en" ? "GALLERY" : "गैलरी"}
              title={lang === "en" ? "A VISUAL JOURNEY OF IMPACT" : "दृश्य यात्रा"}
              subtitle={lang === "en" ? "Stories of People, Communities and Change." : "लोगों, समुदायों और परिवर्तन की कहानियाँ।"}
            />
          </div>

          {/* Navigation controls */}
          <div className="absolute right-0 top-2 flex items-center gap-2">
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
        <div className="text-center mt-5">
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

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const handleOpenModal = (type: RoleType) => {
    setActiveModal(type);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <HeroCarouselSection />
      <HeroSection lang={lang} />
      <UrgentPatientsSection lang={lang} />
      <WhatWeDo lang={lang} />
      <ImpactStats lang={lang} />
      <FeaturedCauses lang={lang} />
      <CampaignsSection lang={lang} />
      <OurPartnersSection lang={lang} />
      <GallerySection lang={lang} />
      <Footer onOpenModal={handleOpenModal} />

      {/* Unified Role Forms Modal */}
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
