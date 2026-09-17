import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  School,
  Heart,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Users,
  Shield,
  Lightbulb,
  Award,
  Building,
  Activity,
  Compass,
  AlertTriangle,
  GraduationCap,
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
import heroImg from "@/assets/sector_education_1.png";
import causeEduImg from "@/assets/cause-education.jpg";

export default function PrimarySchoolPage() {
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
              <span className="text-slate-900 font-bold">Primary School (EPS)</span>
            </nav>
          </div>
        </div>

        {/* ─── Hero Section ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#00381e] via-[#005a30] to-[#014725] text-white py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Link
                  to="/programs/education"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white transition mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Education &amp; Learning
                </Link>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                    PRIMARY SCHOOL
                  </span>
                </div>

                <div className="inline-block px-3.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-emerald-300 font-extrabold text-xs sm:text-sm tracking-wide">
                  Erawin Public School (EPS), Darbhanga, Bihar
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-emerald-100">
                  Building strong foundations for rural education and a brighter tomorrow.
                </h2>

                <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Every child deserves a beginning from which they can grow. EPS is an initiative of ISLAH focused on strengthening access to foundational and primary education for children in underserved communities.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#details"
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition"
                  >
                    <span>Explore Our Approach</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveModal("sponsor")}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl backdrop-blur-md transition"
                  >
                    <Heart className="w-4 h-4 fill-brand-orange text-brand-orange" />
                    <span>Support a Learner</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-white/5">
                  <img
                    src={heroImg}
                    alt="Erawin Public School Campus &amp; Students"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="p-4 bg-slate-900/90 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                      ERAWIN PUBLIC SCHOOL
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Nurturing young minds • Building better futures in rural Bihar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Need for Schools vs Our Initiative ──────────────────────────────── */}
        <section id="details" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Need */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#15803d] flex items-center justify-center font-bold shrink-0">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                      NEED FOR SCHOOLS IN RURAL AREAS
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  While school enrolment in Bihar has crossed 90%, the quality of education remains a major concern. Studies indicate that only about half of primary school children achieve basic reading proficiency, highlighting a serious gap between schooling and actual learning outcomes.
                </p>

                <div className="space-y-2 text-xs text-slate-700">
                  <p className="font-bold text-slate-900">In rural areas of Darbhanga, Bihar, this challenge is even more pronounced due to:</p>
                  {[
                    "Lack of quality primary schools and structured learning environments",
                    "Shortage of trained teachers and modern teaching methods",
                    "Limited access to foundational learning resources",
                    "Low awareness among families about the importance of early education",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-red-50/70 border border-red-200 rounded-2xl space-y-2">
                  <p className="text-xs font-bold text-red-900 uppercase tracking-wider">
                    These gaps at the primary level lead to long-term consequences:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-[11px] text-red-800">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>High dropout rates in later stages</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>Poor transition to higher education</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>Limited employment opportunities</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>Continuation of cycle of poverty</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Our Initiative EPS */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                      OUR INITIATIVE: ERAWIN PUBLIC SCHOOL (EPS)
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Recognising that primary education is the foundation of lifelong learning, Islah Welfare Foundation (Islah) has established Erawin Public School (EPS) in a rural area in Darbhanga, Bihar, to address these critical gaps at the grassroots level.
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The objective is to ensure that children in rural areas receive quality education at the right stage, where it matters the most. Strengthening primary education helps build strong literacy, numeracy, and life skills, which are essential for future academic and professional success.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { title: "Accessible Quality Education", desc: "Bringing modern pedagogy directly to rural children.", icon: School, color: "#15803d" },
                    { title: "Affordable for Rural Families", desc: "Ensuring economic constraints never stop a child.", icon: Heart, color: "#ea580c" },
                    { title: "Safe & Nurturing Environment", desc: "A positive space where every child is valued and respected.", icon: Shield, color: "#2563eb" },
                    { title: "Building Values & Citizens", desc: "Fostering ethics, cooperation, and social responsibility.", icon: Award, color: "#7c3aed" },
                  ].map((pil) => {
                    const IconC = pil.icon;
                    return (
                      <div key={pil.title} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                        <IconC className="w-5 h-5" style={{ color: pil.color }} />
                        <h4 className="font-bold text-xs text-slate-900">{pil.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-snug">{pil.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Overview & Educational Approach vs Impact ──────────────────────── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview of EPS */}
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center font-bold shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                    OVERVIEW OF ERAWIN PUBLIC SCHOOL (EPS)
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Erawin Public School (EPS) is a flagship initiative of Islah, dedicated to providing accessible, affordable, and value-based modern education in rural areas.
                </p>

                <div className="space-y-2.5 pt-1">
                  <p className="text-xs font-bold text-slate-900">The school focuses on:</p>
                  {[
                    "Strong foundational learning (literacy and numeracy)",
                    "Development of critical thinking and creativity",
                    "Student-centric and activity-based learning approach",
                    "Integration of moral values, ethics, and social responsibility",
                    "Holistic development, including confidence, leadership, and life skills",
                  ].map((foc) => (
                    <div key={foc} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{foc}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-500 italic bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                  EPS aims to serve as a model rural school, demonstrating how quality education can transform communities.
                </p>
              </div>

              {/* Right Column: Expected Impact */}
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                    EXPECTED IMPACT
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Significant improvement in learning outcomes", desc: "Accelerating academic performance in reading, writing and math." },
                    { title: "Reduction in dropout rates", desc: "Keeping children enrolled during critical primary and secondary transitions." },
                    { title: "Strengthening of the local teaching-learning ecosystem", desc: "Continuous training and modern pedagogy for rural educators." },
                    { title: "Increased transition to higher education pathways", desc: "Opening opportunities for middle, secondary and collegiate advancement." },
                    { title: "Development of an educated, skilled generation", desc: "Nurturing empowered, confident and productive citizens." },
                  ].map((imp) => (
                    <div key={imp.title} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{imp.title}</p>
                        <p className="text-[11px] text-slate-500">{imp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 text-white rounded-2xl p-4 text-center">
                  <p className="text-sm font-extrabold text-emerald-300">
                    Education Empowers Dreams • Builds Futures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Future Vision & Expansion ───────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                GROWTH STRATEGY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                FUTURE VISION &amp; EXPANSION
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Building on the success of Erawin Public School, Islah plans to replicate this model in other underserved rural areas across India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Establish Quality Primary Schools", desc: "In underserved rural regions with acute schooling deficits.", step: "01" },
                { title: "Create Model Institutions", desc: "Demonstrating high learning outcomes, digital labs and sports.", step: "02" },
                { title: "Ensure Last-Mile Access", desc: "Reaching remote habitations where children walk miles for school.", step: "03" },
                { title: "Scale Impact", desc: "Reaching thousands of rural children with lifetime foundational learning.", step: "04" },
              ].map((vis) => (
                <div key={vis.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-brand-orange">{vis.step}</span>
                  <h4 className="font-extrabold text-sm text-slate-900">{vis.title}</h4>
                  <p className="text-xs text-slate-600">{vis.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Quote & Bottom CTAs ─────────────────────────────────────────────── */}
        <section className="py-14 bg-emerald-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <blockquote className="text-lg sm:text-xl font-black text-white leading-snug">
                  “Building strong foundations today — empowering rural children through quality primary education for a better tomorrow.”
                </blockquote>
                <p className="text-xs text-emerald-300">
                  Your support can change a child's educational trajectory forever.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal("sponsor")}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate for School Development</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <Users className="w-4 h-4" />
                  <span>Sponsor a Child's Education</span>
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
