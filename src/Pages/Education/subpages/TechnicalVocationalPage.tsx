import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
  RoleFormModal,
} from "@/components/layout/SiteLayout";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Wrench,
  Cpu,
  Scissors,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  Building2,
  Lightbulb,
  Award,
  DollarSign,
  ArrowDown,
  Layers,
  GraduationCap,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_education_1.png";

export default function TechnicalVocationalPage() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  const LEARNING_FLOW = [
    { step: "Learn", sub: "Build Knowledge" },
    { step: "Practise", sub: "Gain Practical Skills" },
    { step: "Qualify", sub: "Get Certified" },
    { step: "Connect", sub: "Access Opportunities" },
    { step: "Earn & Grow", sub: "Build a Better Future" },
  ];

  const WHY_TVET_POINTS = [
    {
      title: "Youth Employment Gap",
      desc: "Many young people complete basic education but lack practical skills for suitable employment.",
    },
    {
      title: "Women's Economic Empowerment",
      desc: "Women have the ability and motivation to earn but lack access to training, tools, markets, or guidance.",
    },
    {
      title: "Local Community Potential",
      desc: "Rural communities have capable people but limited opportunities to develop and apply their capabilities locally.",
    },
  ];

  const PATHWAY_STEPS = [
    { label: "Learning", sub: "Foundational concepts" },
    { label: "Practical Skills", sub: "Hands-on tools & tradecraft" },
    { label: "Capability", sub: "Confidence & competence" },
    { label: "Employment / Self-Employment", sub: "Market integration" },
    { label: "Income", sub: "Financial stability" },
    { label: "Economic Resilience", sub: "Generational security" },
  ];

  const TECHNICAL_TRADES = [
    "Electrical work & house wiring",
    "Computer applications & IT support",
    "Basic mechanical & machinery repair",
    "Digital & technology-related skills",
    "Solar installation & basic electronics",
    "Other locally relevant technical trades",
  ];

  const VOCATIONAL_TRADES = [
    "Tailoring, cutting & garment making",
    "Beauty, wellness & salon enterprise",
    "Handicrafts & artisanal product making",
    "Small-scale agro-production & processing",
    "Digital services & data entry operations",
    "Other demand-based vocational activities",
  ];

  const SIX_STEP_APPROACH = [
    {
      num: "01",
      title: "Skill Identification",
      desc: "We understand local employment and livelihood opportunities and identify skills with practical, immediate relevance.",
    },
    {
      num: "02",
      title: "Practical Training",
      desc: "Emphasising hands-on workshop learning to build real competence rather than relying solely on theoretical instruction.",
    },
    {
      num: "03",
      title: "Industry & Market Orientation",
      desc: "Exposing trainees to employers, local businesses, professionals, and supply chains to ensure skills meet real market needs.",
    },
    {
      num: "04",
      title: "Soft Skills & Employability",
      desc: "Communication, workplace ethics, digital literacy, problem-solving, financial awareness, and professional readiness.",
    },
    {
      num: "05",
      title: "Assessment & Certification",
      desc: "Rigorous performance evaluation and recognized documentation according to applicable training standards.",
    },
    {
      num: "06",
      title: "Livelihood & Placement Support",
      desc: "Facilitating connections with employers, service providers, micro-credit linkages, and entrepreneurship incubators.",
    },
  ];

  const IMPACT_PILLARS = [
    {
      title: "Improved Employability",
      desc: "Participants develop practical, market-relevant skills that make them job-ready.",
    },
    {
      title: "Self-Employment & Enterprise",
      desc: "Skilled individuals can launch independent workshops, micro-enterprises, and services.",
    },
    {
      title: "Higher Income Potential",
      desc: "Moving away from unskilled daily labour towards dignified, well-paying specialized work.",
    },
    {
      title: "Women's Economic Participation",
      desc: "Equipping women with home-based and commercial skills for financial self-reliance.",
    },
    {
      title: "Local Skilled Workforce",
      desc: "Creating an ecosystem of electricians, technicians, and artisans within rural clusters.",
    },
    {
      title: "Economic Resilience",
      desc: "Diversifying household incomes to withstand climate shocks and economic hardship.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center overflow-hidden bg-slate-900">
          <img
            src={heroImg}
            alt="Technical and Vocational Training"
            className="absolute inset-0 h-full w-full object-cover opacity-30 filter saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00381c]/95 via-[#004724]/85 to-slate-950/80" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1">
                <Home className="w-3.5 h-3.5" /> Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/programs/education" className="hover:text-white">
                Education & Learning
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-semibold">
                Technical & Vocational (TVET)
              </span>
            </nav>

            <Link
              to="/programs/education"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-100 hover:text-white border border-emerald-400/30 bg-emerald-950/40 hover:bg-emerald-900/50 px-3.5 py-1.5 rounded-md transition-all mb-4 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Initiatives
            </Link>

            <div className="inline-flex items-center gap-2 bg-[#ea580c]/20 border border-[#ea580c]/50 text-orange-200 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <Wrench className="w-3.5 h-3.5 text-[#ea580c]" />
              Work • Earn • Create • Grow
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
                  Technical & Vocational Education and Training{" "}
                  <span className="text-amber-400">— TVET</span>
                </h1>
                <p className="text-base md:text-lg font-medium text-emerald-100/90 mb-4">
                  Building practical capabilities that help people work, earn,
                  create, and grow.
                </p>
                <p className="text-sm md:text-base text-slate-200/90 max-w-3xl leading-relaxed">
                  Formal education can provide knowledge, but meaningful
                  economic opportunity often requires practical skills, relevant
                  training, confidence, and access to livelihood pathways.
                  Through TVET, we bridge the gap between learning and
                  livelihood.
                </p>
              </div>

              {/* Hero Callout Card */}
              <div className="lg:col-span-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl text-white">
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    <Sparkles className="w-4 h-4" />
                    Market-Driven Livelihood
                  </div>
                  <p className="text-xs md:text-sm text-emerald-50 leading-relaxed mb-4">
                    Combining technical education, vocational workshops, soft
                    skills, and direct employer placement to lift families into
                    lasting self-reliance.
                  </p>
                  <div className="text-xs font-semibold text-emerald-200 pt-3 border-t border-white/15 flex items-center justify-between">
                    <span>Technical + Vocational</span>
                    <span className="text-amber-300 font-bold">100% Practical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-STEP CONTINUUM RIBBON */}
        <section className="bg-white border-b border-slate-200 py-6 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {LEARNING_FLOW.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#004724] flex items-center justify-center font-black text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {item.step}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: WHY TVET & TVET CREATES PATHWAYS (2 COLUMNS) */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 cols: Why Need of TVET */}
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3 inline-block">
                        Why TVET?
                      </span>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">
                        Education Should Create Capability as Well as Knowledge
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        For many young people and women in rural and underserved
                        communities, opportunities to acquire market-relevant
                        technical and vocational skills remain limited. Distance
                        from training institutions, financial constraints,
                        inadequate information, and lack of employer linkages
                        restrict their ability to convert potential into income.
                      </p>

                      <div className="space-y-3.5 mb-6">
                        {WHY_TVET_POINTS.map((pt, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-200/80"
                          >
                            <h4 className="text-xs font-bold text-slate-900 mb-1">
                              {pt.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {pt.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                      <p className="text-xs md:text-sm font-bold text-[#004724]">
                        “Our objective is not simply to provide training. It is
                        to create pathways from skills to opportunity.”
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right 5 cols: TVET Creates Pathways */}
              <div className="lg:col-span-5">
                <ScrollReveal delay={150}>
                  <div className="h-full bg-gradient-to-br from-[#0b1f3b] to-[#004724] text-white rounded-2xl p-8 shadow-md flex flex-col justify-between border border-emerald-700/40">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        Pathway To Self-Reliance
                      </div>
                      <h3 className="text-xl font-bold text-white mb-6">
                        TVET Creates Pathways
                      </h3>

                      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-400/30">
                        {PATHWAY_STEPS.map((step, idx) => (
                          <div key={idx} className="relative flex items-center gap-3">
                            <span className="absolute -left-6 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b1f3b] flex items-center justify-center text-[9px] font-bold text-white" />
                            <div>
                              <div className="text-xs font-bold text-emerald-100">
                                {step.label}
                              </div>
                              <div className="text-[11px] text-slate-300">
                                {step.sub}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 text-xs text-amber-200 italic mt-6">
                      From basic education to sustainable intergenerational wealth.
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT IS TVET? (TECHNICAL & VOCATIONAL DUAL TRACKS) */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#004724] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                Integrated Learning Platform
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3 mb-3">
                What is TVET?
              </h2>
              <p className="text-sm text-slate-600">
                A practical pathway to economic opportunity combining technical
                education, vocational trades, hands-on learning, and enterprise
                readiness.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Technical Skills Card */}
              <ScrollReveal>
                <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-emerald-400 transition-all shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004724] flex items-center justify-center shrink-0">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Technical Skills
                      </h3>
                      <p className="text-xs text-slate-500">
                        Practical engineering & technology trades
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    Practical training in areas such as:
                  </p>

                  <div className="space-y-2">
                    {TECHNICAL_TRADES.map((trade, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 text-xs md:text-sm font-medium text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{trade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Vocational Skills Card */}
              <ScrollReveal delay={150}>
                <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-amber-400 transition-all shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Scissors className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Vocational Skills
                      </h3>
                      <p className="text-xs text-slate-500">
                        Livelihood & enterprise-oriented trades
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    Training in livelihood-oriented areas such as:
                  </p>

                  <div className="space-y-2">
                    {VOCATIONAL_TRADES.map((trade, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 text-xs md:text-sm font-medium text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{trade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Note banner */}
            <div className="max-w-3xl mx-auto p-4 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-600">
              <span className="font-bold text-slate-800">Note: </span>
              The specific courses will be determined according to local
              opportunity, market demand, learner interests, available
              infrastructure, and implementation capacity.
            </div>
          </div>
        </section>

        {/* SECTION 3: 6-STEP TVET APPROACH */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] bg-orange-50 border border-orange-200 px-3.5 py-1 rounded-full">
                Learn • Practise • Qualify • Connect • Earn • Grow
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3 mb-3">
                Our TVET Approach
              </h2>
              <p className="text-sm text-slate-600">
                A sequential 6-stage framework taking learners from local skill
                audits to sustainable livelihood placement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SIX_STEP_APPROACH.map((step, idx) => (
                <ScrollReveal key={idx} delay={idx * 80}>
                  <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#004724] border border-emerald-200 flex items-center justify-center font-black text-sm">
                          {step.num}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Phase {idx + 1}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: EXPECTED IMPACT */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#004724] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                From Skill Development to Economic Resilience
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-3 mb-2">
                Expected Impact
              </h2>
              <p className="text-sm text-slate-600">
                Empowering individuals, families, and communities with
                productive capabilities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {IMPACT_PILLARS.map((imp, idx) => (
                <ScrollReveal key={idx} delay={idx * 60}>
                  <div className="h-full bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#004724] flex items-center justify-center font-bold text-xs mb-3">
                        ✓
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2">
                        {imp.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {imp.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: STATEMENT BANNER */}
        <section className="py-14 bg-[#004724] text-white text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <span className="text-4xl text-amber-400 font-serif leading-none block">
              “
            </span>
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-emerald-50 italic">
              Education should not only prepare young people for
              examinations—it should also prepare them for employment,
              entrepreneurship, and independent livelihoods.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-amber-400/60" />
              <span className="text-amber-300 font-semibold text-xs uppercase tracking-widest">
                Islah Welfare Foundation
              </span>
              <span className="h-px w-8 bg-amber-400/60" />
            </div>
          </div>
        </section>

        {/* SECTION 6: PARTNER CTA */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0b1f3b] via-[#004724] to-[#00381c] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Skills Today • Opportunities Tomorrow
                </div>
                <h3 className="text-xl md:text-2xl font-black">
                  Build a Self-Reliant & Empowered Community
                </h3>
                <p className="text-xs text-emerald-100/90 mt-1 max-w-lg">
                  Partner with us to fund training kits, sponsor a vocational
                  batch, or provide apprenticeship opportunities.
                </p>
              </div>
              <button
                onClick={() => setActiveModal("partner")}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md hover:shadow-lg"
              >
                Partner With Us
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/programs/education/career-guidance"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-800 hover:text-[#004724] border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Prev: Career Guidance &
              Mentorship (CGM)
            </Link>
            <Link
              to="/programs/education/knowledge-research-publication"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-[#004724] hover:bg-[#00381c] px-5 py-2.5 rounded-lg transition-all shadow-sm"
            >
              Next: Knowledge, Research & Publication (KRP){" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
