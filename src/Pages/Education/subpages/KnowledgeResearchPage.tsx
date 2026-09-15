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
  BookOpen,
  Library,
  Laptop,
  FileSearch,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Award,
  Compass,
  Lightbulb,
  Share2,
  HelpCircle,
  Database,
  Search,
  Globe2,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_education_2.png";

export default function KnowledgeResearchPage() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  const CONTINUUM_RIBBON = [
    { step: "Read", sub: "Access to Knowledge" },
    { step: "Learn", sub: "Build Skills & Understanding" },
    { step: "Research", sub: "Discover & Analyse" },
    { step: "Share", sub: "Exchange Ideas & Experiences" },
    { step: "Apply", sub: "Create Better Opportunities" },
  ];

  const WHY_KRP_POINTS = [
    "A student may attend school but still have limited access to books, reference materials, or a quiet place to study.",
    "A young person may have the ability to learn but lack access to digital resources, career information, or wider educational opportunities.",
    "A rural community may have valuable experiences, traditions, and local knowledge that remain undocumented or inaccessible to others.",
  ];

  const PATHWAY_FLOW = [
    "Access to Knowledge",
    "Reading & Learning",
    "Questioning & Exploration",
    "Research & Understanding",
    "Knowledge Sharing",
    "Better Opportunities & Informed Action",
  ];

  const FOUR_SUBTRACKS = [
    {
      icon: Library,
      title: "Rural Public Library",
      desc: "Accessible community libraries providing books, periodicals, reference resources, children's reading materials, study spaces, and community learning activities.",
      points: [
        "Books and reading materials",
        "Newspapers and magazines",
        "Reference & educational resources",
        "Quiet study spaces & children's reading corners",
      ],
    },
    {
      icon: Laptop,
      title: "Digital Knowledge & Learning",
      desc: "Expanding learning beyond the physical library with digital infrastructure, computer literacy, and internet-enabled academic tools.",
      points: [
        "Basic computer access & digital literacy",
        "Internet-enabled learning & online libraries",
        "Digital study materials & curriculum resources",
        "Access to useful information & civic services",
      ],
    },
    {
      icon: FileSearch,
      title: "Research & Community Studies",
      desc: "Listening to rural communities and conducting field research to document grassroots realities and strengthen evidence-based intervention.",
      points: [
        "Rural education & youth development studies",
        "Livelihood & vocational market analyses",
        "Women, community health & environmental studies",
        "Local development challenges & social audits",
      ],
    },
    {
      icon: Users,
      title: "Youth Research & Learning",
      desc: "Encouraging rural youth to transition from passive consumers of information into active observers, researchers, and community investigators.",
      points: [
        "Observation & research methodologies",
        "Critical thinking, writing & documentation",
        "Data collection, field surveys & interview skills",
        "Community understanding & youth-led reporting",
      ],
    },
  ];

  const OUR_VISION_ITEMS = [
    "Rural public libraries",
    "Community learning spaces",
    "Digital knowledge centres",
    "Student resource centres",
    "Mobile library and outreach services",
    "Reading and learning programmes",
    "Community research & studies",
    "Knowledge documentation",
    "Youth research opportunities",
    "Knowledge-sharing platforms & publications",
  ];

  const APPROACH_STEPS = [
    {
      num: "01",
      title: "Access to Knowledge",
      desc: "Bringing books, learning materials, digital resources, and useful information closer to rural communities.",
    },
    {
      num: "02",
      title: "Reading & Learning",
      desc: "Encouraging children, students, and community members to develop regular reading and self-learning habits.",
    },
    {
      num: "03",
      title: "Digital Access",
      desc: "Where feasible, providing computers, digital tools, and basic digital learning opportunities.",
    },
    {
      num: "04",
      title: "Research & Understanding",
      desc: "Encouraging people to ask questions, study issues, and develop a deeper understanding of rural challenges.",
    },
    {
      num: "05",
      title: "Knowledge Sharing",
      desc: "Publishing useful findings and making research accessible to students, communities, and wider audiences.",
    },
  ];

  const EXPECTED_IMPACTS = [
    {
      title: "Improved Access to Resources",
      desc: "Children and students gain greater access to books, study materials, and reference tools.",
    },
    {
      title: "Stronger Reading Culture",
      desc: "Regular reading activities encourage children and youth to develop lasting reading habits.",
    },
    {
      title: "Better Learning Spaces",
      desc: "Community-based learning spaces support education beyond the conventional classroom.",
    },
    {
      title: "Improved Digital Awareness",
      desc: "Rural youth gain hands-on familiarity with digital tools and online research platforms.",
    },
    {
      title: "Greater Access to Information",
      desc: "Community members access critical educational, career, scholarship, and public information.",
    },
    {
      title: "Stronger Research Culture",
      desc: "Young people develop scientific curiosity, analytical skills, and critical thinking.",
    },
    {
      title: "Preservation of Local Knowledge",
      desc: "Valuable local history, traditional wisdom, and community experiences are systematically documented.",
    },
    {
      title: "Better Informed Communities",
      desc: "Access to reliable information supports civic awareness and informed decision-making.",
    },
  ];

  const LONG_TERM_PILLARS = [
    "Library",
    "Reading",
    "Digital Learning",
    "Student Resources",
    "Research",
    "Community Knowledge",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[460px] flex items-center overflow-hidden bg-slate-900">
          <img
            src={heroImg}
            alt="Knowledge, Research & Publication"
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
                Knowledge & Research (KRP)
              </span>
            </nav>

            <Link
              to="/programs/education"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-100 hover:text-white border border-emerald-400/30 bg-emerald-950/40 hover:bg-emerald-900/50 px-3.5 py-1.5 rounded-md transition-all mb-4 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Initiatives
            </Link>

            <div className="inline-flex items-center gap-2 bg-[#ea580c]/20 border border-[#ea580c]/50 text-orange-200 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#ea580c]" />
              Intellectual Depth • Academic Rigour • Rational Inquiry
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
                  Knowledge, Research & Publication{" "}
                  <span className="text-amber-400">— KRP</span>
                </h1>
                <p className="text-base md:text-lg font-medium text-emerald-100/90 mb-4">
                  Making Knowledge Accessible. Encouraging Learning. Supporting
                  Better Understanding.
                </p>
                <p className="text-sm md:text-base text-slate-200/90 max-w-3xl leading-relaxed">
                  At ISLAH, we believe that knowledge has the power to transform
                  lives and communities. Through rural public libraries, reading
                  programmes, digital hubs, community research, and
                  publications, we create opportunities for people to read,
                  learn, question, explore, and share knowledge.
                </p>
              </div>

              {/* Hero Callout Card */}
              <div className="lg:col-span-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl text-white">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    <Sparkles className="w-4 h-4" />
                    Democratic Knowledge
                  </div>
                  <p className="text-xs md:text-sm text-emerald-50 leading-relaxed mb-4">
                    Knowledge should not remain confined to urban universities.
                    Every rural village deserves a quiet study space, books, and
                    scientific research tools.
                  </p>
                  <div className="text-xs font-semibold text-emerald-200 pt-3 border-t border-white/15 flex items-center justify-between">
                    <span>Library • Digital • Research</span>
                    <span className="text-amber-300 font-bold">100% Open Access</span>
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
              {CONTINUUM_RIBBON.map((item, idx) => (
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

        {/* SECTION 1: WHY KNOWLEDGE & RESEARCH & FLOW (2 COLUMNS) */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 cols: Why KRP */}
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3 inline-block">
                        Why Knowledge & Research?
                      </span>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">
                        Education Should Create a Culture of Learning
                      </h2>
                      <div className="space-y-3.5 mb-6">
                        {WHY_KRP_POINTS.map((pt, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#004724] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                      <p className="text-xs md:text-sm font-bold text-[#004724]">
                        “Our objective is not simply to provide books or
                        information. It is to create pathways that help people
                        learn, think, and make better use of knowledge.”
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right 5 cols: Connecting the Gaps */}
              <div className="lg:col-span-5">
                <ScrollReveal delay={150}>
                  <div className="h-full bg-gradient-to-br from-[#0b1f3b] to-[#004724] text-white rounded-2xl p-8 shadow-md flex flex-col justify-between border border-emerald-700/40">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        Systemic Connection
                      </div>
                      <h3 className="text-xl font-bold text-white mb-6">
                        Connecting Gaps to Action
                      </h3>

                      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-400/30">
                        {PATHWAY_FLOW.map((step, idx) => (
                          <div key={idx} className="relative flex items-center gap-3">
                            <span className="absolute -left-6 w-4 h-4 rounded-full bg-amber-400 border-2 border-[#0b1f3b] flex items-center justify-center text-[9px] font-bold text-slate-900" />
                            <span className="text-xs font-bold text-emerald-100">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 text-xs text-amber-200 italic mt-6">
                      Democratizing inquiry and analytical thinking in rural India.
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT IS KNOWLEDGE & RESEARCH? (4 SUB-TRACKS) */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#004724] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                Community-Based Platform
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3 mb-3">
                What is Knowledge & Research?
              </h2>
              <p className="text-sm text-slate-600">
                A proposed initiative designed to bring together libraries,
                reading programmes, digital learning, student resources,
                research, documentation, and knowledge-sharing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FOUR_SUBTRACKS.map((track, idx) => {
                const Icon = track.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 80}>
                    <div className="h-full bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 transition-all shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004724] flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-black text-slate-900 mb-2">
                          {track.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {track.desc}
                        </p>
                        <div className="space-y-1.5 pt-3 border-t border-slate-200/80">
                          {track.points.map((pt, pIdx) => (
                            <div
                              key={pIdx}
                              className="flex items-start gap-2 text-xs text-slate-700"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: THREE-COLUMN FRAMEWORK (VISION | APPROACH | IMPACT) */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {/* 1. Our Vision */}
              <ScrollReveal>
                <div className="h-full bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#004724] uppercase tracking-wider mb-2">
                      <Globe2 className="w-4 h-4 text-emerald-600" />
                      Future Horizon
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                      Our Vision
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Building rural communities through accessible and
                      sustainable knowledge models.
                    </p>
                    <div className="space-y-2">
                      {OUR_VISION_ITEMS.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 2. Our Approach */}
              <ScrollReveal delay={100}>
                <div className="h-full bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">
                      <Search className="w-4 h-4 text-[#ea580c]" />
                      Read • Learn • Question • Research • Share
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                      Our Approach
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Five structured phases from primary access to active
                      sharing.
                    </p>
                    <div className="space-y-3">
                      {APPROACH_STEPS.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                            <span className="w-5 h-5 rounded-md bg-emerald-100 text-[#004724] flex items-center justify-center font-black text-[10px]">
                              {step.num}
                            </span>
                            <span>{step.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug pl-7">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 3. Expected Impact */}
              <ScrollReveal delay={200}>
                <div className="h-full bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      Measurable Change
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                      Expected Impact
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      From access to knowledge to greater opportunity and informed
                      action.
                    </p>
                    <div className="space-y-2">
                      {EXPECTED_IMPACTS.map((imp, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
                        >
                          <div className="font-bold text-slate-900">
                            {imp.title}
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {imp.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SECTION 4: NETWORK OF RURAL KNOWLEDGE CENTRES */}
        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#004724] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
              Long-Term Direction
            </span>
            <h3 className="text-2xl font-black text-slate-900 mb-3">
              Network of Rural Knowledge & Learning Centres
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto mb-8">
              A comprehensive rural infrastructure bringing together 6
              indispensable knowledge assets into a single community hub.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {LONG_TERM_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#004724] to-[#0b1f3b] text-white shadow-sm flex flex-col items-center justify-center font-bold text-xs"
                >
                  <Database className="w-5 h-5 text-amber-300 mb-2" />
                  <span>{pillar}</span>
                </div>
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
              Knowledge is a powerful foundation for understanding society,
              addressing complex challenges and creating meaningful
              possibilities for the future.
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

        {/* SECTION 6: SUPPORT CTAS */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Be a Part of Their Journey
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Your support today can open doors to learning, confidence, and a
              better tomorrow.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveModal("sponsor")}
                className="px-6 py-3 rounded-xl bg-[#004724] hover:bg-[#00381c] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Support Education
              </button>
              <button
                onClick={() => setActiveModal("partner")}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Partner With Us
              </button>
              <button
                onClick={() => setActiveModal("volunteer")}
                className="px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-sm transition-all"
              >
                Volunteer / Mentor
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/programs/education/technical-vocational-training"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-800 hover:text-[#004724] border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Prev: Technical & Vocational
              (TVET)
            </Link>
            <Link
              to="/programs/education"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-[#004724] hover:bg-[#00381c] px-5 py-2.5 rounded-lg transition-all shadow-sm"
            >
              Back to Education Initiatives <ArrowRight className="w-4 h-4" />
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
