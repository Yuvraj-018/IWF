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
  GraduationCap,
  Award,
  BookOpen,
  Target,
  AlertTriangle,
  Info,
  CheckCircle2,
  Users,
  Compass,
  HeartHandshake,
  TrendingUp,
  Scale,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  School,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_education_1.png";

export default function ScholarshipsPage() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  const HIGHLIGHT_RIBBON = [
    {
      icon: Award,
      title: "Financial Support",
      sub: "For Secondary & Higher Ed",
    },
    {
      icon: Users,
      title: "Empowering",
      sub: "Rural Students",
    },
    {
      icon: TrendingUp,
      title: "Building Careers",
      sub: "Creating Futures",
    },
    {
      icon: Scale,
      title: "Equal Opportunity",
      sub: "For All Deserving Minds",
    },
    {
      icon: BookOpen,
      title: "Education Today",
      sub: "Better Tomorrow",
    },
  ];

  const CHALLENGE_POINTS = [
    "Inability to afford school/college fees, books, and travel expenses",
    "Economic pressure to support family income",
    "Lack of access to higher education institutions nearby",
    "Absence of guidance and motivation for career pathways",
  ];

  const IMPACT_OF_CHALLENGE = [
    "High dropout rates at secondary and higher education levels",
    "Limited employment and livelihood opportunities",
    "Continuation of the cycle of poverty across generations",
  ];

  const APPROACH_PILLARS = [
    {
      num: "1",
      title: "Financial Support",
      icon: Award,
      badge: "Fee & Supply Coverage",
      points: [
        "Scholarships for secondary, undergraduate, and higher education",
        "Coverage of fees, books, study materials, and essential expenses",
      ],
    },
    {
      num: "2",
      title: "Academic Support",
      icon: BookOpen,
      badge: "Mentorship & Tracking",
      points: [
        "Mentorship and academic guidance",
        "Regular counseling and performance tracking",
        "Support for exam preparation and skill development",
      ],
    },
    {
      num: "3",
      title: "Career Guidance",
      icon: Compass,
      badge: "Pathways & Leadership",
      points: [
        "Career counseling and pathway planning",
        "Exposure to higher education and career opportunities",
        "Building confidence and leadership skills",
      ],
    },
    {
      num: "4",
      title: "Community Outreach",
      icon: HeartHandshake,
      badge: "Identification & Mobilization",
      points: [
        "Identifying deserving students in rural communities",
        "Engaging with parents, teachers, and local leaders",
        "Promoting the importance of education and aspirations",
      ],
    },
  ];

  const IMPLEMENTATION_STEPS = [
    "Identification of deserving students",
    "Establishment of scholarship selection criteria",
    "Engagement of donors & CSR partners",
    "Disbursement of scholarships & support",
    "Regular monitoring, evaluation and impact assessment",
  ];

  const EXPECTED_IMPACTS = [
    "Promote equal access to education for marginalised communities",
    "Reduce dropout rates at critical stages of education",
    "Encourage academic excellence and higher education participation",
    "Develop future leaders and skilled professionals",
    "Contribute to inclusive and sustainable social development",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[440px] flex items-center overflow-hidden bg-slate-900">
          <img
            src={heroImg}
            alt="Scholarships for Higher Education"
            className="absolute inset-0 h-full w-full object-cover opacity-35 filter saturate-110"
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
              <span className="text-white font-semibold">Scholarships (SHE)</span>
            </nav>

            <Link
              to="/programs/education"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-100 hover:text-white border border-emerald-400/30 bg-emerald-950/40 hover:bg-emerald-900/50 px-3.5 py-1.5 rounded-md transition-all mb-4 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Initiatives
            </Link>

            <div className="inline-flex items-center gap-2 bg-[#ea580c]/20 border border-[#ea580c]/50 text-orange-200 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <GraduationCap className="w-3.5 h-3.5 text-[#ea580c]" />
              Invest in Education. Empower Futures. Transform Lives.
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
                  Scholarships for Higher Education{" "}
                  <span className="text-amber-400">— SHE</span>
                </h1>
                <p className="text-base md:text-lg font-medium text-emerald-100/90 mb-4">
                  (Enabling Equal Access to Education & Opportunities)
                </p>
                <p className="text-sm md:text-base text-slate-200/90 max-w-3xl leading-relaxed">
                  Supporting meritorious and financially needy students in rural
                  areas to pursue secondary, undergraduate, and higher education
                  with dignity and confidence.
                </p>
              </div>

              {/* Hero Quote Card */}
              <div className="lg:col-span-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl text-white relative">
                  <span className="text-4xl text-amber-400 font-serif leading-none absolute top-4 left-4 opacity-50">
                    “
                  </span>
                  <p className="text-sm md:text-base font-semibold italic pl-6 text-emerald-50 leading-relaxed mb-3">
                    Education is the most powerful tool to change lives and
                    build a better tomorrow.
                  </p>
                  <div className="text-right text-xs font-bold text-amber-300 uppercase tracking-widest">
                    — Islah Higher Education Mission
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-PILLAR VALUE RIBBON */}
        <section className="bg-white border-b border-slate-200 py-6 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
              {HIGHLIGHT_RIBBON.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-[#004724] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="col-span-2 md:col-span-3 lg:col-span-1 p-3 rounded-xl bg-gradient-to-br from-[#004724] to-[#0b1f3b] text-white text-center shadow-md flex flex-col justify-center">
                <p className="text-[11px] font-medium text-emerald-100 leading-snug">
                  Your support today can{" "}
                  <strong className="text-amber-300 font-bold">scholar a student</strong>{" "}
                  and change generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: THE CHALLENGE VS MORE INFO (2 COLUMNS) */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              {/* The Challenge */}
              <ScrollReveal>
                <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      The Challenge
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
                      Need of Scholarships for Higher Education
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      In rural regions, access to education does not end at
                      school enrollment—the real challenge begins after primary
                      education. While many children start schooling, a large
                      number are forced to drop out after Class 8 or 10 due to
                      financial hardship.
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {CHALLENGE_POINTS.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-slate-700 text-xs md:text-sm font-medium"
                        >
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                            ×
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                        This leads to a serious issue where potential remains
                        untapped, resulting in:
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                        {IMPACT_OF_CHALLENGE.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
                            <span className="font-semibold text-slate-800">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* More Info / Solution */}
              <ScrollReveal delay={150}>
                <div className="h-full bg-white rounded-2xl p-8 border border-emerald-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      <Info className="w-4 h-4 text-emerald-700" />
                      More Information
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
                      Addressing the Critical Higher Education Gap
                    </h2>

                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      To address this critical gap,{" "}
                      <strong className="text-[#004724]">
                        Islah Welfare Foundation (Islah)
                      </strong>{" "}
                      proposes a Comprehensive Scholarship Programme aimed at
                      supporting meritorious and financially needy students to
                      pursue secondary, undergraduate, and higher education.
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      This initiative is designed to remove financial barriers
                      and enable deserving students to continue their academic
                      journey with dignity and confidence. Beyond financial
                      assistance, the program also focuses on nurturing students
                      through mentorship, academic guidance, and career support,
                      ensuring long-term success.
                    </p>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 mb-4">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-[#004724] shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            Beyond Monetary Aid: Holistic Support
                          </h4>
                          <p className="text-xs text-slate-600 leading-snug">
                            Every scholarship recipient is paired with academic
                            mentors, career counselors, and leadership modules to
                            maximize retention and career outcomes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>Secondary • Undergraduate • Professional</span>
                    <span className="text-[#ea580c]">100% Transparent DBT</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROGRAMME OBJECTIVE */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#004724] to-[#0b1f3b] text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                  <Target className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
                    Programme Objective
                  </div>
                  <h3 className="text-lg md:text-xl font-bold leading-relaxed text-emerald-50">
                    “To ensure that no deserving student in rural areas is
                    deprived of education due to financial constraints, by
                    providing scholarships and holistic academic support for
                    secondary and higher education.”
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROGRAMME APPROACH (4 PILLARS) */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] bg-orange-50 border border-orange-200 px-3.5 py-1 rounded-full">
                Structured Support Model
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3 mb-3">
                Programme Approach
              </h2>
              <p className="text-sm text-slate-600">
                Four interconnected pillars designed to empower rural students
                from initial scholarship selection to career fruition.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {APPROACH_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 100}>
                    <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#004724] border border-emerald-200 flex items-center justify-center font-black text-base">
                            {pillar.num}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                            {pillar.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 mb-3">
                          <Icon className="w-5 h-5 text-[#004724]" />
                          <h3 className="text-base font-bold text-slate-900">
                            {pillar.title}
                          </h3>
                        </div>

                        <ul className="space-y-2 text-xs md:text-sm text-slate-600">
                          {pillar.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: 3-COLUMN FRAMEWORK (IMPLEMENTATION | EXPECTED IMPACT | WHY IT MATTERS) */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {/* 1. Implementation Plan */}
              <ScrollReveal>
                <div className="h-full bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#004724] uppercase tracking-wider mb-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-600" />
                      Execution Blueprint
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
                      Implementation Plan
                    </h3>
                    <div className="space-y-2.5">
                      {IMPLEMENTATION_STEPS.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200 text-xs md:text-sm font-medium text-slate-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 2. Expected Impact */}
              <ScrollReveal delay={100}>
                <div className="h-full bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">
                      <TrendingUp className="w-4 h-4 text-[#ea580c]" />
                      Measurable Outcomes
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
                      Expected Impact
                    </h3>
                    <div className="space-y-2.5">
                      {EXPECTED_IMPACTS.map((impact, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200 text-xs md:text-sm font-medium text-slate-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                          <span>{impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 3. Why It Matters / CSR Opportunity */}
              <ScrollReveal delay={200}>
                <div className="h-full bg-gradient-to-br from-[#0b1f3b] to-[#004724] text-white rounded-2xl p-7 shadow-lg flex flex-col justify-between border border-emerald-700/50">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      CSR & Social Investment
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                      Why It Matters
                    </h3>
                    <p className="text-sm text-emerald-100/90 leading-relaxed mb-6">
                      The scholarship programme offers CSR partners an
                      exceptional opportunity to invest in human capital
                      development, creating a ripple effect of empowerment,
                      economic upliftment, and long-term community transformation.
                    </p>

                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2">
                      <div className="text-xs font-bold text-amber-300">
                        High Social Return on Investment (SROI)
                      </div>
                      <p className="text-xs text-slate-200 leading-snug">
                        Every rupee invested in rural higher education prevents
                        intergenerational poverty, elevates household living
                        standards, and produces future doctors, engineers, and
                        public servants.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300">
                    <span>Direct Donor Auditing</span>
                    <span>100% Accountable</span>
                  </div>
                </div>
              </ScrollReveal>
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
              Supporting dreams, removing barriers—ensuring every rural child
              gets a fair chance to learn, grow, and succeed.
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

        {/* SECTION 6: SUPPORT & PARTNER CTA */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveModal("sponsor")}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#ea580c] to-amber-600 text-white text-left shadow-md hover:shadow-lg transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-100 mb-1">
                    Direct Sponsorship
                  </div>
                  <h4 className="text-lg font-black group-hover:underline">
                    Support a Student
                  </h4>
                  <p className="text-xs text-orange-100/90 mt-1">
                    Your contribution can transform a life.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </button>

              <button
                onClick={() => setActiveModal("partner")}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#004724] to-[#0b1f3b] text-white text-left shadow-md hover:shadow-lg transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
                    Institutional Collaboration
                  </div>
                  <h4 className="text-lg font-black group-hover:underline">
                    Become a Partner
                  </h4>
                  <p className="text-xs text-emerald-100/90 mt-1">
                    Partner with us to build brighter futures.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/programs/education/academic-pathways-talent-development"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-800 hover:text-[#004724] border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Prev: Academic Pathways & Talent
              Dev (APTD)
            </Link>
            <Link
              to="/programs/education/career-guidance"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-[#004724] hover:bg-[#00381c] px-5 py-2.5 rounded-lg transition-all shadow-sm"
            >
              Next: Career Guidance & Mentorship (CGM){" "}
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
