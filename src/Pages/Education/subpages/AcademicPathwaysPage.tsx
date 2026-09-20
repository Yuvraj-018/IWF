import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Target,
  Heart,
  BookOpen,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  FileCheck,
  Compass,
  Laptop,
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
import causeEduImg from "@/assets/cause-education.jpg";

export default function AcademicPathwaysPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── Breadcrumb ──────────────────────────────────────────────────────── */}
        <div className="bg-slate-50 border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
              <Link to="/" className="hover:text-slate-900 flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link to="/programs" className="hover:text-slate-900">What We Do</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link to="/programs/education" className="hover:text-slate-900">Education &amp; Learning</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-900 font-bold">Academic Pathways &amp; Talent Development (APTD)</span>
            </nav>
          </div>
        </div>

        {/* ─── Hero Section ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#00381e] via-[#005a30] to-[#014725] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <Link
                  to="/programs/education"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white transition mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Education &amp; Learning
                </Link>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  Academic Pathways &amp; <br />
                  <span className="text-emerald-300">Talent Development (APTD)</span>
                </h1>

                <div className="inline-block px-3.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-emerald-300 font-extrabold text-xs sm:text-sm tracking-wide">
                  Discover Potential. Strengthen Learning. Open Pathways.
                </div>

                <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
                  In many rural communities, students have the ability and ambition to succeed, but lack access to quality academic support. APTD combines talent identification through RATS with structured Coaching &amp; Examination Support (CES).
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal("sponsor")}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Support APTD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal("partner")}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl backdrop-blur-md transition"
                  >
                    <Users className="w-4 h-4 text-emerald-300" />
                    <span>Partner With Us</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-white/5">
                  <img
                    src={causeEduImg}
                    alt="Academic coaching and examination support"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="p-4 bg-slate-900/90 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                      RATS + COACHING CENTRE
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Identifying talent • Nurturing excellence • Preparing for competitive futures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Two Integrated Components ───────────────────────────────────────── */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                FROM POTENTIAL TO POSSIBILITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Two Complementary Pillars of APTD
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Component 1: RATS */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-3 py-1 rounded-md bg-purple-100 text-purple-800">
                    COMPONENT 01
                  </span>
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Rural Academic Talent Search (RATS)
                  </h3>
                  <p className="text-xs font-bold text-purple-700 mt-0.5">
                    Identify Potential • Inspire Excellence • Nurture Talent
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  RATS seeks to identify promising students from rural communities through structured academic and aptitude-based assessments, ensuring merit is recognized regardless of background.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {[
                    "Competitive academic assessments & evaluations",
                    "Merit recognition, awards, and certificates",
                    "Identification of promising rural scholars",
                    "Academic motivation and self-belief encouragement",
                    "Mentorship, career advice, and scholarship information",
                  ].map((it) => (
                    <div key={it} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 2: CES */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-3 py-1 rounded-md bg-emerald-100 text-[#15803d]">
                    COMPONENT 02
                  </span>
                  <BookOpen className="w-6 h-6 text-[#15803d]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Coaching &amp; Examination Support (CES)
                  </h3>
                  <p className="text-xs font-bold text-[#15803d] mt-0.5">
                    Learn • Prepare • Perform
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structured academic coaching for students preparing for Board examinations (CBCE), entrance examinations, scholarship tests, and competitive academic admissions.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {[
                    "Concept-based coaching in STEM and Humanities",
                    "Comprehensive study materials and reference guides",
                    "Regular mock tests, assessments, and feedback",
                    "Revision strategies and exam time-management",
                    "Digital learning support & performance tracking",
                  ].map((it) => (
                    <div key={it} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The Need vs Vision ──────────────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Need */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-amber-700">
                  THE NEED
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Overcoming the Competitive Disadvantage
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For many students in rural and economically disadvantaged communities, barriers include:
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  {[
                    "Limited access to affordable quality coaching",
                    "Lack of structured examination preparation and mock tests",
                    "Limited exposure to competitive examinations and national benchmarks",
                    "Inadequate access to learning resources and academic guidance",
                    "Few opportunities to identify and recognise academic talent",
                    "Limited awareness of scholarships and higher-education pathways",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic bg-amber-50 p-3 rounded-xl border border-amber-200">
                  As a result, talented students may remain unnoticed or unable to compete effectively for higher education. APTD bridges this crucial gap.
                </p>
              </div>

              {/* Vision */}
              <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  OUR VISION
                </span>
                <h3 className="text-2xl font-black text-white leading-snug">
                  Creating Fairer Pathways to Academic Opportunity
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To identify and nurture academic potential among rural and underserved students while providing them with the knowledge, preparation, resources and guidance needed to pursue higher educational and career opportunities.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-xs font-extrabold text-emerald-300">
                    Conceptual Understanding + Study Skills + Confidence + Academic Discipline
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Moving beyond rote memorisation toward true problem-solving mastery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The Academic Pathway (6 Steps) ─────────────────────────────────── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
            <div className="max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                LEARNER JOURNEY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                The Academic Pathway
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                A structured, step-by-step roadmap from grassroots talent identification to competitive achievement.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { step: "01", title: "Identify", desc: "Rural Academic Talent Search (RATS)", color: "#15803d" },
                { step: "02", title: "Understand", desc: "Assessment & Academic Guidance", color: "#16a34a" },
                { step: "03", title: "Strengthen", desc: "Coaching & Learning Support", color: "#d97706" },
                { step: "04", title: "Prepare", desc: "Board & Competitive Exams", color: "#ea580c" },
                { step: "05", title: "Recognise", desc: "Achievement & Potential", color: "#7c3aed" },
                { step: "06", title: "Progress", desc: "Higher Education & Opportunity", color: "#0b1f3b" },
              ].map((st) => (
                <div key={st.step} className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-1.5 shadow-2xs">
                  <span className="text-xs font-black" style={{ color: st.color }}>{st.step}</span>
                  <h4 className="font-black text-sm text-slate-900">{st.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Expected Impact ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                MEASURABLE OUTCOMES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                EXPECTED IMPACT
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                APTD aims to level the playing field and unlock rural India's immense academic potential.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Greater identification of academic talent in rural communities",
                "Improved examination preparedness and academic performance",
                "Increased confidence and motivation among students",
                "Greater awareness of scholarships and higher-education opportunities",
                "Improved participation in competitive examinations",
                "Stronger pathways towards higher and professional education",
                "Reduced barriers created by lack of affordable coaching",
                "Development of a culture of learning, aspiration and achievement",
              ].map((imp) => (
                <div key={imp} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 leading-snug">{imp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom Quote & CTAs ─────────────────────────────────────────────── */}
        <section className="py-14 bg-emerald-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <blockquote className="text-lg sm:text-xl font-black text-white leading-snug">
                  “Empowering rural students with knowledge, mentorship, guidance, and opportunity to dream bigger, achieve higher, and shape a better future.”
                </blockquote>
                <p className="text-xs text-emerald-300">
                  Partner with us to nurture the next generation of scholars and leaders.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal("sponsor")}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support APTD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <Users className="w-4 h-4" />
                  <span>Partner With Us</span>
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
