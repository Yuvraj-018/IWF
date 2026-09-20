import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  PackageCheck,
  Heart,
  BookOpen,
  CheckCircle2,
  Users,
  ShieldCheck,
  Award,
  PenTool,
  Bookmark,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
  RoleFormModal,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import kitImg from "@/assets/sector_education_2.png";
import causeEduImg from "@/assets/cause-education.jpg";

export default function SchoolKitPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── Hero Section ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#00381e] via-[#005a30] to-[#014725] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Standardized Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-emerald-200/80 mb-4 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-brand-orange" /> Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <Link to="/programs" className="hover:text-white">What We Do</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <Link to="/programs/education" className="hover:text-white">Education &amp; Learning</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-emerald-300 font-semibold">School Kit Support (SKLS)</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  SKLS • SCHOOL KITS
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  School Kit &amp; Learning <br className="hidden sm:inline" />
                  <span className="text-emerald-300">Support (SKLS)</span>
                </h1>

                <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Providing essential school kits to underprivileged children for a brighter and confident future. Removing basic resource barriers so every child can learn with dignity.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveModal("sponsor")}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Support a Child</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal("partner")}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl backdrop-blur-md transition cursor-pointer"
                  >
                    <PackageCheck className="w-4 h-4 text-emerald-300" />
                    <span>Donate for School Kits</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl bg-white/5 max-w-md ml-auto">
                  <img
                    src={kitImg}
                    alt="School Kit Distribution to Rural Children"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                  <div className="p-3.5 bg-slate-900/90 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                      CONFIDENCE &amp; DIGNITY
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      “A simple school kit can change a child's journey — empowering them to learn and grow.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Highlights Bar ──────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
              {[
                { title: "Essential School Kits", desc: "Age-appropriate materials", icon: PackageCheck },
                { title: "Encouraging Education", desc: "Motivating attendance", icon: BookOpen },
                { title: "Building Confidence", desc: "Dignity without stigma", icon: Award },
                { title: "Rural Communities", desc: "Deep grassroots reach", icon: Users },
              ].map((pill) => {
                const IconC = pill.icon;
                return (
                  <div key={pill.title} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center shrink-0">
                      <IconC className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{pill.title}</h4>
                      <p className="text-[10px] text-slate-500">{pill.desc}</p>
                    </div>
                  </div>
                );
              })}

              <div className="bg-[#15803d] text-white p-3 rounded-xl text-center col-span-2 md:col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Take Action</p>
                <p className="text-xs font-black">Give tools to learn &amp; succeed</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The Challenge vs More Info ──────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* The Challenge */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                      THE CHALLENGE
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In many underserved rural communities, access to education is not only limited by infrastructure but also by the lack of basic learning materials. Thousands of children—especially orphans and students from economically weaker families—are unable to afford essentials such as school bags, notebooks, uniforms, and stationery.
                </p>

                <p className="text-xs font-bold text-slate-800">
                  For poor families, these basic items often become a financial burden, leading to:
                </p>

                <div className="space-y-2 text-xs text-slate-700">
                  {[
                    "Low school attendance and irregular participation",
                    "Poor learning outcomes due to lack of study materials",
                    "Increased dropout rates at an early stage",
                    "Loss of confidence and interest in education",
                  ].map((ch) => (
                    <div key={ch} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-500 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                  Without these essential tools, children are unable to fully participate in classroom learning, directly affecting their academic progression.
                </p>
              </div>

              {/* More Info */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#15803d] flex items-center justify-center font-bold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                      MORE INFO
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Recognising this fundamental gap, Islah Welfare Foundation (Islah) proposes the School Kit Distribution Programme to ensure that no child is deprived of education due to a lack of basic resources.
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Each kit is thoughtfully designed to ensure that children can attend school with confidence, dignity, and readiness to learn. By removing these basic obstacles, the initiative directly contributes to improved enrolment, regular attendance, and sustained engagement in education.
                </p>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#15803d]">
                    DIGNITY IN EVERY KIT — SUPPORT WITHOUT STIGMA
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We believe educational assistance should be provided in a manner that respects the dignity and privacy of every child. The purpose is not to label a child as a beneficiary, but to empower a learner to participate with pride.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Programme Objective & Approach (Kit Components) ───────────────── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center max-w-3xl mx-auto space-y-3 shadow-xs">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                PROGRAMME OBJECTIVE
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                To provide essential school kits to underprivileged students, enabling them to attend school with dignity, confidence, and readiness to learn, while reducing dropout rates.
              </h3>
            </div>

            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                  PROGRAMME APPROACH
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Provision of Complete, Age-Appropriate School Kits
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "School Bags", desc: "Durable, waterproof, and ergonomic backpacks built for rural terrains.", icon: PackageCheck, color: "#15803d" },
                  { title: "Notebooks & Textbooks", desc: "High-quality lined and unlined notebooks for comprehensive classwork.", icon: BookOpen, color: "#2563eb" },
                  { title: "Pens, Pencils & Stationery", desc: "Complete pencil cases with pens, pencils, erasers, sharpeners, and rulers.", icon: PenTool, color: "#ea580c" },
                  { title: "Basic Learning Materials", desc: "Geometry sets, drawing books, crayons, and visual study aids.", icon: Bookmark, color: "#7c3aed" },
                ].map((kit) => {
                  const IconC = kit.icon;
                  return (
                    <div key={kit.title} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <IconC className="w-5 h-5" style={{ color: kit.color }} />
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900">{kit.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{kit.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3 Columns: Plan, Impact, Why It Matters ───────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Implementation Plan */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-[#15803d]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>IMPLEMENTATION PLAN</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-700">
                  {[
                    "Identification of needy students in rural areas",
                    "Procurement of high-grade, durable school kits",
                    "Distribution through schools and local community partners",
                    "Ensuring transparent and equitable distribution",
                    "Regular monitoring and feedback collection",
                  ].map((step) => (
                    <div key={step} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Impact */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-purple-700">
                  <TrendingUp className="w-4 h-4" />
                  <span>EXPECTED IMPACT</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-700">
                  {[
                    "Improved school attendance and regular participation",
                    "Reduction in dropout rates among poor students",
                    "Enhanced learning outcomes and academic performance",
                    "Increased confidence and motivation among children",
                    "Encouragement for families to prioritise education",
                  ].map((imp) => (
                    <div key={imp} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why It Matters */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-brand-orange">
                  <Heart className="w-4 h-4" />
                  <span>WHY IT MATTERS</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A simple school kit removes barriers, restores dignity, and shows a child that they are valued.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  It empowers them to learn with confidence and dream of a better future. When many people contribute together, small acts of support create life-changing educational opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Bottom Quote & CTAs ─────────────────────────────────────────────── */}
        <section className="py-14 bg-emerald-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <blockquote className="text-lg sm:text-xl font-black text-white leading-snug">
                  “A simple school kit can change a child's journey — empowering them with confidence, dignity, and the opportunity to learn, grow, and build a better future.”
                </blockquote>
                <p className="text-xs text-emerald-300">
                  Help provide essential learning resources to rural children today.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal("sponsor")}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support a Child</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>Donate for School Kits</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
