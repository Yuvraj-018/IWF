import { useState } from "react";
import {
  Building2,
  Handshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Award,
  Users,
  Heart,
  Sprout,
  Target,
  Sparkles,
  GraduationCap,
  HeartPulse,
  Landmark,
  UserCheck,
  Home,
  MessageSquare,
  Search,
  PenTool,
  Rocket,
  Layers,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Megaphone,
  BookOpen,
  TrendingUp,
  Lightbulb,
  FileCheck,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import type { RoleType } from "@/components/forms/RoleFormModal";

export default function PartnersDonorsPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const PARTNER_LOGOS = [
    { name: "Tata Trusts", badge: "TT", type: "Community Development", color: "text-blue-700 bg-blue-50 border-blue-200" },
    { name: "HCL Foundation", badge: "HCL", type: "CSR & Rural Upliftment", color: "text-sky-700 bg-sky-50 border-sky-200" },
    { name: "Vedanta", badge: "VED", type: "Sustainable Growth", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { name: "Reliance Foundation", badge: "RF", type: "Healthcare & Nutrition", color: "text-red-700 bg-red-50 border-red-200" },
    { name: "Adani Foundation", badge: "AF", type: "Community Transformation", color: "text-violet-700 bg-violet-50 border-violet-200" },
    { name: "Tech Mahindra Foundation", badge: "TMF", type: "Skill & Vocational Support", color: "text-orange-700 bg-orange-50 border-orange-200" },
    { name: "Amazon Future Engineer", badge: "AFE", type: "Digital Education", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { name: "Infosys Foundation", badge: "INF", type: "Education & Rural Health", color: "text-blue-800 bg-blue-50 border-blue-200" },
    { name: "SBI Foundation", badge: "SBI", type: "Inclusive Development", color: "text-cyan-800 bg-cyan-50 border-cyan-200" },
    { name: "Wipro Cares", badge: "WC", type: "Sustainability Action", color: "text-purple-700 bg-purple-50 border-purple-200" },
  ];

  const PARTNERSHIP_MODELS = [
    {
      num: "01",
      title: "Programme Partnership",
      desc: "Collaborate to design, implement and strengthen specific community programmes.",
      badge: "Collaborate • Implement • Measure",
      color: "border-emerald-300 text-emerald-700 bg-emerald-50/60",
      numBg: "bg-emerald-600 text-white",
      icon: Handshake,
    },
    {
      num: "02",
      title: "Knowledge Partnership",
      desc: "Share research, domain expertise, training modules and innovative technology solutions.",
      badge: "Knowledge • Innovation • Capacity",
      color: "border-blue-300 text-blue-700 bg-blue-50/60",
      numBg: "bg-blue-600 text-white",
      icon: BookOpen,
    },
    {
      num: "03",
      title: "Resource Partnership",
      desc: "Contribute financial, material, technological or infrastructural resources to community needs.",
      badge: "Resources • Access • Opportunity",
      color: "border-amber-300 text-amber-700 bg-amber-50/60",
      numBg: "bg-amber-600 text-white",
      icon: Sprout,
    },
    {
      num: "04",
      title: "CSR Partnership",
      desc: "Work together on structured CSR initiatives aligned with Schedule VII and national impact goals.",
      badge: "Purpose • Partnership • Impact",
      color: "border-purple-300 text-purple-700 bg-purple-50/60",
      numBg: "bg-purple-600 text-white",
      icon: Users,
    },
    {
      num: "05",
      title: "Implementation Partnership",
      desc: "Combine strengths for effective, verified and transparent on-ground programme delivery.",
      badge: "Plan • Implement • Learn",
      color: "border-teal-300 text-teal-700 bg-teal-50/60",
      numBg: "bg-teal-600 text-white",
      icon: Layers,
    },
    {
      num: "06",
      title: "Strategic Partnership",
      desc: "Build long-term collaboration for institutional scale, innovative rural pilots and lasting impact.",
      badge: "Vision • Collaboration • Scale",
      color: "border-orange-300 text-orange-700 bg-orange-50/60",
      numBg: "bg-[#f97316] text-white",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-orange/20 selection:text-[#0b1f3b]">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* ─── Hero Section (Navy Split Banner) ───────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#0b1f3b] via-[#0f284e] to-[#0b1f3b] text-white py-10 md:py-14 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Col (Text & CTAs) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  PARTNERS & SPONSORS
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                  Together, We Create <br />
                  <span className="text-white">Lasting </span>
                  <span className="text-emerald-400">Impact</span>
                </h1>
                <p className="text-xs sm:text-sm font-bold text-slate-300 mt-1.5 flex items-center gap-1.5">
                  <span>One Mission. Shared Responsibility. Greater Impact.</span>
                  <span className="text-sm">🌿</span>
                </p>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl">
                When strengths come together, communities grow stronger. Join <strong className="text-white font-semibold">ISLAH</strong> in building opportunities, empowering lives and shaping a better tomorrow.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer"
                >
                  <Handshake className="w-3.5 h-3.5" />
                  <span>PARTNER WITH ISLAH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveModal("sponsor")}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer backdrop-blur-xs"
                >
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>SPONSOR A PROGRAMME</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Col (2x2 Pillars Grid) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm hover:bg-white/15 transition group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs text-white mb-0.5">Shared Purpose</h4>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    Working together around real community needs and aspirations.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm hover:bg-white/15 transition group">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs text-white mb-0.5">Stronger Communities</h4>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    Resources, knowledge and networks create lasting change.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm hover:bg-white/15 transition group">
                  <div className="w-8 h-8 rounded-lg bg-[#f97316]/20 text-[#f97316] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs text-white mb-0.5">Sustainable Impact</h4>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    Solutions that empower communities to become self-reliant.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm hover:bg-white/15 transition group">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs text-white mb-0.5">Transparent Governance</h4>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    Built on governance, accountability and mutual respect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── Section: Our Partners & Supporters Logo Marquee ────────────────── */}
      <section className="py-8 px-4 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-center">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-slate-200" />
              OUR PARTNERS & SUPPORTERS
              <span className="h-px w-8 bg-slate-200" />
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-1">
            {PARTNER_LOGOS.map((partner, i) => (
              <div
                key={i}
                className="bg-slate-50/90 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-2xs hover:border-[#15803d] hover:bg-white transition-all cursor-default group"
              >
                <span className={`w-7 h-7 rounded-lg border ${partner.color} flex items-center justify-center text-[10px] font-black shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                  {partner.badge}
                </span>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs leading-tight group-hover:text-[#0b1f3b]">
                    {partner.name}
                  </h5>
                  <p className="text-[9px] text-slate-400 font-medium leading-none mt-0.5">
                    {partner.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="space-y-10 py-8 px-4 md:px-8 max-w-7xl mx-auto">
        {/* ─── Section: 2-Column Core (OUR PARTNERS & OUR SPONSORS) ─────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Column: OUR PARTNERS */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                      OUR PARTNERS
                    </h3>
                    <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                      <span>Partners Who Bring Strength to the Mission</span>
                      <span>🌿</span>
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  ISLAH partners with organisations, institutions and professionals who share our commitment to inclusive and sustainable development. Together, we combine expertise, networks, technology and resources to create meaningful change.
                </p>

                {/* 8 Partner Category Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {[
                    {
                      icon: GraduationCap,
                      title: "Educational Institutions",
                      desc: "Schools, colleges, universities and research organisations.",
                      color: "text-blue-700 bg-blue-50 border-blue-200",
                    },
                    {
                      icon: Building2,
                      title: "Corporate Organisations",
                      desc: "Businesses committed to responsible growth and social impact.",
                      color: "text-indigo-700 bg-indigo-50 border-indigo-200",
                    },
                    {
                      icon: HeartPulse,
                      title: "Healthcare Institutions",
                      desc: "Hospitals, clinics, health organisations and medical professionals.",
                      color: "text-rose-700 bg-rose-50 border-rose-200",
                    },
                    {
                      icon: Landmark,
                      title: "Government & Public Institutions",
                      desc: "Collaborating within appropriate frameworks and procedures.",
                      color: "text-slate-700 bg-slate-100 border-slate-200",
                    },
                    {
                      icon: Users,
                      title: "NGOs & Civil Society",
                      desc: "Organisations working in complementary areas of social development.",
                      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
                    },
                    {
                      icon: UserCheck,
                      title: "Professional Networks",
                      desc: "Experts, practitioners and professionals from diverse fields.",
                      color: "text-amber-700 bg-amber-50 border-amber-200",
                    },
                    {
                      icon: Home,
                      title: "Community Organisations",
                      desc: "Local groups with deep understanding of community needs and realities.",
                      color: "text-teal-700 bg-teal-50 border-teal-200",
                    },
                    {
                      icon: Sparkles,
                      title: "Technology & Innovation Partners",
                      desc: "Technology providers and innovators creating solutions for social good.",
                      color: "text-purple-700 bg-purple-50 border-purple-200",
                    },
                  ].map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                        <div className={`w-7 h-7 rounded-lg border ${p.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-xs leading-tight">{p.title}</h5>
                          <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{p.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Styled Quote Box */}
              <div className="bg-emerald-50/70 border-l-4 border-emerald-600 p-3 rounded-r-xl text-xs text-slate-700 font-medium italic flex items-center justify-between gap-3">
                <p>
                  “Partnership is not about doing something for a community, it is about working with communities to create something that can continue beyond the partnership itself.”
                </p>
                <span className="text-base shrink-0">🌿</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: OUR SPONSORS */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                      OUR SPONSORS
                    </h3>
                    <p className="text-xs font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                      <span>Those Who Turn Resources Into Opportunities</span>
                      <span>🌿</span>
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  Our sponsors help us transform resources into real opportunities for people and communities through programmes, campaigns and initiatives.
                </p>

                {/* 6 Balanced Sponsorship Category Cards (2-Column Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {[
                    {
                      icon: Heart,
                      title: "Sponsor a Cause",
                      desc: "Support an area that aligns with your philanthropic priorities.",
                      color: "text-rose-600 bg-rose-50 border-rose-200",
                    },
                    {
                      icon: FileCheck,
                      title: "Sponsor a Programme",
                      desc: "Help sustain or expand a specific community development programme.",
                      color: "text-blue-600 bg-blue-50 border-blue-200",
                    },
                    {
                      icon: Megaphone,
                      title: "Sponsor a Campaign",
                      desc: "Support one of ISLAH's flagship development campaigns.",
                      color: "text-purple-600 bg-purple-50 border-purple-200",
                    },
                    {
                      icon: Sprout,
                      title: "Sponsor an Initiative",
                      desc: "Provide targeted resources for a focused rural activity or pilot project.",
                      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
                    },
                    {
                      icon: Building2,
                      title: "CSR Partnership",
                      desc: "Collaborate for meaningful CSR & community development compliance.",
                      color: "text-amber-600 bg-amber-50 border-amber-200",
                    },
                    {
                      icon: Handshake,
                      title: "Strategic Co-Funding",
                      desc: "Joint implementation and co-funding for large-scale social outcomes.",
                      color: "text-teal-600 bg-teal-50 border-teal-200",
                    },
                  ].map((s, idx) => {
                    const Icon = s.icon;
                    return (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                        <div className={`w-7 h-7 rounded-lg border ${s.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-xs leading-tight">{s.title}</h5>
                          <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{s.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Styled Quote Box */}
              <div className="bg-sky-50/70 border-l-4 border-sky-600 p-3 rounded-r-xl text-xs text-slate-700 font-medium italic flex items-center justify-between gap-3">
                <p>
                  “Every sponsorship is a step towards education, dignity, health, livelihoods and empowerment.”
                </p>
                <span className="text-base shrink-0">🌿</span>
              </div>
            </div>
          </ScrollReveal>
        </section>


        {/* ─── Section: PARTNERSHIP MODELS ─────────────────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#0b1f3b]">
                COLLABORATION FRAMEWORKS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                PARTNERSHIP MODELS
              </h2>
              <p className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                <span>Flexible ways to collaborate for greater impact</span>
                <span>🌿</span>
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {PARTNERSHIP_MODELS.map((model, i) => {
              const Icon = model.icon;
              return (
                <ScrollReveal key={i}>
                  <div className={`bg-white rounded-2xl p-4 border-2 ${model.color} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-0.5`}>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className={`w-6 h-6 rounded-lg ${model.numBg} flex items-center justify-center text-[10px] font-black`}>
                          {model.num}
                        </span>
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
                      </div>

                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs leading-snug">
                          {model.title}
                        </h4>
                        <p className="text-[10px] text-slate-600 leading-relaxed mt-1">
                          {model.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100">
                      <span className="text-[9px] font-bold uppercase tracking-wider block text-slate-500">
                        {model.badge}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ─── Section: FROM COLLABORATION TO IMPACT (Full-width Banner) ──── */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-slate-950 via-[#0b1f3b] to-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/10 space-y-4">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">
                VALUE CREATION PATHWAY
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                FROM COLLABORATION TO IMPACT
              </h3>
              <p className="text-xs text-slate-300">
                A successful partnership creates more than activity—it creates enduring capability.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15 flex flex-col items-center justify-between">
                <Users className="w-5 h-5 text-[#38bdf8] mb-1" />
                <div>
                  <h5 className="font-black text-xs text-white">PARTNERS & SPONSORS</h5>
                  <p className="text-[9px] text-slate-300 mt-0.5">Expertise • Resources • Technology</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15 flex flex-col items-center justify-between">
                <Lightbulb className="w-5 h-5 text-amber-400 mb-1" />
                <div>
                  <h5 className="font-black text-xs text-white">ISLAH</h5>
                  <p className="text-[9px] text-slate-300 mt-0.5">Planning • Implementation</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15 flex flex-col items-center justify-between">
                <Home className="w-5 h-5 text-emerald-400 mb-1" />
                <div>
                  <h5 className="font-black text-xs text-white">COMMUNITIES</h5>
                  <p className="text-[9px] text-slate-300 mt-0.5">Participation • Ownership</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15 flex flex-col items-center justify-between">
                <BookOpen className="w-5 h-5 text-rose-400 mb-1" />
                <div>
                  <h5 className="font-black text-xs text-white">OPPORTUNITIES</h5>
                  <p className="text-[9px] text-slate-300 mt-0.5">Education • Health • Skills</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15 flex flex-col items-center justify-between">
                <TrendingUp className="w-5 h-5 text-yellow-300 mb-1" />
                <div>
                  <h5 className="font-black text-xs text-white">OUTCOMES</h5>
                  <p className="text-[9px] text-slate-300 mt-0.5">Capability • Resilience</p>
                </div>
              </div>

              <div className="bg-emerald-600/30 backdrop-blur-md rounded-xl p-3 text-center border border-emerald-400/40 flex flex-col items-center justify-between">
                <Award className="w-5 h-5 text-emerald-300 mb-1" />
                <div>
                  <h5 className="font-black text-xs text-emerald-300">LASTING IMPACT</h5>
                  <p className="text-[9px] text-slate-200 mt-0.5">Stronger Communities</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section: WHAT WE BRING & LET'S WORK TOGETHER ────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: What We Bring to the Partnership */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#15803d]">
                INSTITUTIONAL STRENGTHS
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b] flex items-center gap-1.5 mt-0.5">
                <span>WHAT WE BRING TO THE PARTNERSHIP</span>
                <span>🌿</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Community-centred approach",
                  desc: "We understand local realities before designing interventions.",
                },
                {
                  title: "Flexible collaboration",
                  desc: "Partnership models adapted to shared objectives and priorities.",
                },
                {
                  title: "Integrated perspective",
                  desc: "Connecting education, healthcare, livelihoods and environment.",
                },
                {
                  title: "Responsible implementation",
                  desc: "Ensuring governance, transparent reporting and accountability.",
                },
                {
                  title: "Local engagement",
                  desc: "Valuing grassroots participation and local knowledge.",
                },
                {
                  title: "Impact orientation",
                  desc: "Focusing on verifiable, meaningful and sustainable outcomes.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">{item.title}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Let's Work Together (4 Process Steps) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#f97316]">
                GET STARTED
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b] flex items-center gap-1.5 mt-0.5">
                <span>LET'S WORK TOGETHER</span>
                <span>🌿</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Whether you are an organisation, institution, foundation or individual, there is a meaningful way to collaborate with ISLAH.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <h5 className="font-bold text-slate-900 text-[10px] uppercase">DISCUSS</h5>
                <p className="text-[9px] text-slate-500 leading-tight">Start conversation</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <h5 className="font-bold text-slate-900 text-[10px] uppercase">EXPLORE</h5>
                <p className="text-[9px] text-slate-500 leading-tight">Identify synergies</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                  <PenTool className="w-3.5 h-3.5" />
                </div>
                <h5 className="font-bold text-slate-900 text-[10px] uppercase">DESIGN</h5>
                <p className="text-[9px] text-slate-500 leading-tight">Co-create model</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <h5 className="font-bold text-slate-900 text-[10px] uppercase">DELIVER</h5>
                <p className="text-[9px] text-slate-500 leading-tight">Achieve impact</p>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setActiveModal("partner")}
                className="w-full bg-[#0b1f3b] hover:bg-[#163a69] text-white font-extrabold text-xs py-2.5 rounded-xl transition shadow-sm uppercase tracking-wider cursor-pointer"
              >
                Initiate Collaboration →
              </button>
            </div>
          </div>
        </section>

        {/* ─── Section: Bottom Banner CTA ──────────────────────────────────── */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-emerald-800 via-[#15803d] to-teal-900 rounded-2xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Be a Partner. Be a Sponsor. Be a Changemaker.
                </h4>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Join ISLAH in building opportunities and transforming lives.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                onClick={() => setActiveModal("partner")}
                className="bg-white hover:bg-slate-100 text-[#15803d] font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer"
              >
                PARTNER WITH US →
              </button>
              <button
                onClick={() => setActiveModal("sponsor")}
                className="bg-black/20 hover:bg-black/30 border border-white/30 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer backdrop-blur-xs"
              >
                SPONSOR NOW →
              </button>
            </div>
          </div>
        </ScrollReveal>
      </main>


      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

