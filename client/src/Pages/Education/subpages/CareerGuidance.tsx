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
  Compass,
  Target,
  AlertTriangle,
  Info,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Laptop,
  HelpCircle,
  Lightbulb,
  HeartHandshake,
  Check,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_education_2.png";

export default function CareerGuidance() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  const HIGHLIGHT_RIBBON = [
    {
      icon: Users,
      title: "Expert Career Counselling",
      sub: "One-on-One Guidance",
    },
    {
      icon: BookOpen,
      title: "Academic Guidance",
      sub: "Subject & Stream Selection",
    },
    {
      icon: GraduationCap,
      title: "Higher Education Support",
      sub: "College & Course Mapping",
    },
    {
      icon: Target,
      title: "Competitive Exam Prep",
      sub: "Entrance Coaching Support",
    },
    {
      icon: HeartHandshake,
      title: "Mentorship & Life Skills",
      sub: "Communication & Confidence",
    },
    {
      icon: TrendingUp,
      title: "Building Success",
      sub: "Sustainable Career Paths",
    },
  ];

  const CHALLENGE_POINTS = [
    "Lack of awareness about career options and emerging fields",
    "Limited knowledge of courses, colleges, and entrance exams",
    "Absence of mentorship and expert guidance",
    "Dependence on misinformation or peer influence",
    "Inability to afford private counselling services",
  ];

  const UNINFORMED_IMPACTS = [
    "Mismatch between education and career opportunities",
    "Low transition to higher education",
    "Increased unemployment or underemployment",
    "Continuation of the cycle of poverty",
  ];

  const WE_HELP_POINTS = [
    { title: "Discover Their Strengths", desc: "Aptitude profiling & interest discovery" },
    { title: "Explore Career Options", desc: "Awareness of 150+ contemporary vocations" },
    { title: "Plan the Right Path", desc: "Step-by-step roadmap for higher studies" },
    { title: "Achieve Their Goals", desc: "Mentorship until admission and career entry" },
  ];

  const APPROACH_PILLARS = [
    {
      num: "1",
      title: "Career Counselling Sessions",
      icon: Users,
      points: [
        "Career counselling sessions in schools and community centres",
        "One-to-one and group counselling for students and parents",
      ],
    },
    {
      num: "2",
      title: "Academic Support & Training",
      icon: BookOpen,
      points: [
        "Academic training workshops and subject-specific support",
        "Improving learning skills and academic performance",
      ],
    },
    {
      num: "3",
      title: "Competitive Exam & Higher Ed Guidance",
      icon: GraduationCap,
      points: [
        "Guidance for competitive exams and higher education admissions",
        "Information on courses, colleges, scholarships and opportunities",
      ],
    },
    {
      num: "4",
      title: "Mentorship & Life Skills",
      icon: HeartHandshake,
      points: [
        "Training of career counsellors and local mentors",
        "Integration of life skills, communication, and personality development",
      ],
    },
    {
      num: "5",
      title: "Digital Awareness & Support",
      icon: Laptop,
      points: [
        "Awareness about online platforms, applications, and resources",
        "Guidance on admissions, form filling, and documentation",
      ],
    },
  ];

  const EXPECTED_IMPACTS = [
    {
      icon: Lightbulb,
      title: "Identification of Hidden Talent",
      desc: "Recognizing academic and leadership potential in deep rural areas",
    },
    {
      icon: TrendingUp,
      title: "Improved Academic Motivation",
      desc: "Setting clear targets leads to measurable improvement in board marks",
    },
    {
      icon: GraduationCap,
      title: "Higher Ed Transition",
      desc: "Increased transition rate to colleges, universities, and professional diplomas",
    },
    {
      icon: Compass,
      title: "Better Interest-Career Fit",
      desc: "Ending uninformed stream choices and aligning passion with market demand",
    },
    {
      icon: Award,
      title: "Competitive Exam Participation",
      desc: "Higher rural registration and success in government, medical & engineering tests",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Standardized Hero */}
        <SubpageHeroCarousel
          tag="EDUCATION • CGM"
          title="Career Guidance & Mentorship (CGM)"
          subtitle="Providing accurate career information, academic direction, and mentorship support to help rural students make informed decisions and build a successful future."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Education", href: "/programs/education" },
            { label: "Career Guidance" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/education"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Programmes
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* 6-PILLAR HIGHLIGHT RIBBON */}
        <section className="bg-white border-b border-slate-200 py-6 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {HIGHLIGHT_RIBBON.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col justify-center p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#004724] flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 1: THE CHALLENGE VS MORE INFO */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              {/* Left: The Challenge */}
              <ScrollReveal>
                <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      The Challenge
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                      Need of Career Guidance & Mentorship
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      Rural India is home to a vast pool of talented and capable
                      students, but due to lack of exposure, guidance, and
                      recognition, their potential often remains unidentified
                      and underdeveloped.
                    </p>

                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Key challenges faced by rural students include:
                    </p>
                    <div className="space-y-2 mb-6">
                      {CHALLENGE_POINTS.map((pt, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/50 border border-amber-100 text-slate-700 text-xs md:text-sm font-medium"
                        >
                          <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                            ×
                          </span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Due to these challenges, many students make uninformed
                        career choices, leading to:
                      </p>
                      <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
                        {UNINFORMED_IMPACTS.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
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

              {/* Right: More Info & We Help Students */}
              <ScrollReveal delay={150}>
                <div className="h-full bg-white rounded-2xl p-8 border border-emerald-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      <Info className="w-4 h-4 text-emerald-700" />
                      More Information
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                      Bridging the Career Information Chasm
                    </h2>

                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      Recognising this critical gap,{" "}
                      <strong className="text-[#004724]">
                        Islah Welfare Foundation (Islah)
                      </strong>{" "}
                      proposes the Career Guidance & Mentorship (CGM) Programme
                      as a structured initiative to guide and support rural
                      students.
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      This programme connects students with expert counsellors,
                      educators, and industry mentors, providing personalised
                      career guidance, academic support, and awareness about
                      opportunities. It empowers students to make the right
                      choices and build a confident and successful future.
                    </p>

                    {/* WE HELP STUDENTS CARDS */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#004724] mb-3">
                        We Help Students:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {WE_HELP_POINTS.map((card, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-3 rounded-xl border border-emerald-200/60 shadow-xs"
                          >
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{card.title}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 pl-5 leading-tight">
                              {card.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>Aptitude • Mentorship • Admissions</span>
                    <span className="text-[#ea580c]">100% Free for Rural Youth</span>
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
                    “To provide accurate career information, academic direction,
                    and mentorship support to rural students, enabling them to
                    make informed decisions about their education and future
                    careers.”
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROGRAMME APPROACH (5 PILLARS) */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] bg-orange-50 border border-orange-200 px-3.5 py-1 rounded-full">
                5 Pillars of Support
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3 mb-3">
                Programme Approach
              </h2>
              <p className="text-sm text-slate-600">
                A multi-stage ecosystem designed to demystify careers, prepare
                students for competitive exams, and link them with lifelong
                mentors.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
              {APPROACH_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 80}>
                    <div className="h-full bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#004724] border border-emerald-200 flex items-center justify-center font-bold text-sm">
                            {pillar.num}
                          </span>
                          <Icon className="w-5 h-5 text-[#004724]" />
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mb-3 leading-snug">
                          {pillar.title}
                        </h3>

                        <ul className="space-y-2 text-xs text-slate-600">
                          {pillar.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                              <span className="leading-snug">{pt}</span>
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

        {/* SECTION 4: EXPECTED IMPACT (5 CARDS) */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#004724] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                Tangible Outcomes
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3 mb-2">
                Expected Impact
              </h2>
              <p className="text-sm text-slate-600">
                Transforming rural talent from unguided potential into confident
                professionals and changemakers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {EXPECTED_IMPACTS.map((imp, idx) => {
                const Icon = imp.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 80}>
                    <div className="h-full bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all text-center flex flex-col items-center justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004724] flex items-center justify-center mb-3 mx-auto">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-xs md:text-sm font-bold text-slate-900 mb-2 leading-tight">
                          {imp.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {imp.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: STATEMENT BANNER */}
        <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800 text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-3xl text-brand-orange font-serif leading-none block">
              “
            </span>
            <p className="text-lg md:text-xl font-semibold leading-relaxed text-slate-800 italic text-balance">
              Enabling rural students to make the right choices—turning
              aspirations into clear, achievable career pathways.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-slate-300" />
              <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                Islah Welfare Foundation
              </span>
              <span className="h-px w-8 bg-slate-300" />
            </div>
          </div>
        </section>

        {/* SECTION 6: SUPPORT & MENTOR CTAS */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-5">
              <button
                onClick={() => setActiveModal("sponsor")}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50/20 text-slate-900 text-left shadow-xs hover:shadow-md transition-all flex items-center justify-between group hover:scale-[1.01] active:scale-95"
              >
                <div>
                  <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200 mb-2">
                    Direct Sponsorship
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                    Support This Initiative
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Your contribution can guide and transform young lives.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center shrink-0 ml-4 group-hover:bg-brand-orange group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setActiveModal("mentor")}
                className="p-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-left shadow-md hover:shadow-lg transition-all flex items-center justify-between group hover:scale-[1.01] active:scale-95"
              >
                <div>
                  <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-700/50 mb-2">
                    Share Your Expertise
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    Become a Mentor
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Share your knowledge. Shape a brighter future.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 ml-4 group-hover:bg-white group-hover:text-slate-900 transition-all">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <section className="py-8 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/programs/education/scholarships"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-800 hover:text-emerald-700 border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> Prev: Scholarships for Higher
              Education (SHE)
            </Link>
            <Link
              to="/programs/education/technical-vocational-training"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95"
            >
              Next: Technical & Vocational Education (TVET){" "}
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
