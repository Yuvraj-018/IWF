import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  Heart,
  Lightbulb,
  Compass,
  Wrench,
  FileText,
  School,
  PackageCheck,
  Building,
  Target,
  Users,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Globe,
  Zap,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import causeEducationImg from "@/assets/cause-education.jpg";
import sectorEducation1 from "@/assets/sector_education_1.png";
import sectorEducation2 from "@/assets/sector_education_2.png";

const STATS = [
  {
    num: "8",
    label: "Core Programmes",
    sub: "Across the entire educational journey",
    icon: School,
    color: "#15803d",
    bg: "#f0fdf4",
  },
  {
    num: "7",
    label: "Stages of Opportunity",
    sub: "From access to genuine agency",
    icon: Target,
    color: "#ea580c",
    bg: "#fff7ed",
  },
  {
    num: "∞",
    label: "Possibilities to Grow",
    sub: "For every rural learner",
    icon: Sparkles,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    num: "1",
    label: "Connected Ecosystem",
    sub: "One journey, many futures",
    icon: Globe,
    color: "#0b1f3b",
    bg: "#eff6ff",
  },
];

const APPROACH_STAGES = [
  {
    step: "01",
    title: "ACCESS",
    desc: "Create opportunities for learners to enter and continue their educational journey.",
    color: "#15803d",
  },
  {
    step: "02",
    title: "LEARNING",
    desc: "Strengthen knowledge, understanding and academic capability.",
    color: "#16a34a",
  },
  {
    step: "03",
    title: "DISCOVERY",
    desc: "Identify individual interests, abilities and potential.",
    color: "#d97706",
  },
  {
    step: "04",
    title: "GUIDANCE",
    desc: "Connect learners with mentors, information and informed choices.",
    color: "#ea580c",
  },
  {
    step: "05",
    title: "SKILLS",
    desc: "Transform knowledge into practical and employable capabilities.",
    color: "#dc2626",
  },
  {
    step: "06",
    title: "OPPORTUNITY",
    desc: "Connect learners with higher education, employment, entrepreneurship and further learning.",
    color: "#7c3aed",
  },
  {
    step: "07",
    title: "AGENCY",
    desc: "Enable individuals to make informed choices and actively shape their future.",
    color: "#0b1f3b",
  },
];

const INITIATIVES = [
  {
    num: "01",
    title: "Primary School — EPS",
    tagline: "Building Strong Foundations",
    desc: "Strengthening early childhood and primary education with child-centred learning, foundational literacy and numeracy.",
    href: "/programs/education/primary-school",
    icon: School,
    badge: "Foundational",
    color: "#15803d",
  },
  {
    num: "02",
    title: "School Kit & Learning Support (SKLS)",
    tagline: "Removing Basic Barriers to Learning",
    desc: "Providing essential school bags, notebooks, textbooks and stationery so no child is held back by a lack of basic materials.",
    href: "/programs/education/school-kit-learning-support",
    icon: PackageCheck,
    badge: "Resource Support",
    color: "#d97706",
  },
  {
    num: "03",
    title: "Community Learning Centre (CLC)",
    tagline: "Learning Beyond the Classroom",
    desc: "Community-based spaces fostering supplementary education, values, life skills and holistic child development.",
    href: "/programs/education/community-learning-centre",
    icon: Building,
    badge: "Community",
    color: "#2563eb",
  },
  {
    num: "04",
    title: "Academic Pathways & Talent Development (APTD)",
    tagline: "Discover Potential. Strengthen Learning. Open Pathways.",
    desc: "Combining Rural Academic Talent Search (RATS) with structured Coaching & Examination Support (CES).",
    href: "/programs/education/academic-pathways-talent-development",
    icon: Target,
    badge: "Excellence",
    color: "#7c3aed",
  },
  {
    num: "05",
    title: "Scholarships for Higher Education (SHE)",
    tagline: "Supporting Aspiration Beyond School",
    desc: "Enabling meritorious and economically disadvantaged students to pursue secondary, undergraduate and professional education.",
    href: "/programs/education/scholarships",
    icon: Award,
    badge: "Financial Aid",
    color: "#ea580c",
  },
  {
    num: "06",
    title: "Career Guidance & Mentorship (CGM)",
    tagline: "Helping Young People Make Informed Choices",
    desc: "Accurate career counselling, entrance exam navigation and direct mentor connections for rural students.",
    href: "/programs/education/career-guidance",
    icon: Compass,
    badge: "Mentorship",
    color: "#0891b2",
  },
  {
    num: "07",
    title: "Technical & Vocational Training (TVET)",
    tagline: "Turning Knowledge into Capability",
    desc: "Market-oriented technical and vocational training empowering youth and women with employable skills.",
    href: "/programs/education/technical-vocational-training",
    icon: Wrench,
    badge: "Employability",
    color: "#b45309",
  },
  {
    num: "08",
    title: "Knowledge, Research & Publication (KRP)",
    tagline: "Learning That Creates Knowledge",
    desc: "Public libraries, digital knowledge hubs, community research and academic publication to foster intellectual depth.",
    href: "/programs/education/knowledge-research-publication",
    icon: FileText,
    badge: "Research",
    color: "#0b1f3b",
  },
];

const PHILOSOPHY_PILLARS = [
  { title: "Knowledge", desc: "The ability to understand and absorb foundational concepts.", icon: BookOpen },
  { title: "Critical Thinking", desc: "The ability to question, analyse, reason and evaluate evidence.", icon: Lightbulb },
  { title: "Capability", desc: "The practical skill to apply what one learns in real situations.", icon: Zap },
  { title: "Confidence", desc: "The courage to speak, engage and pursue meaningful opportunities.", icon: Award },
  { title: "Character", desc: "The ethical responsibility to use knowledge constructively with integrity.", icon: ShieldCheck },
  { title: "Creativity", desc: "The capacity to imagine new possibilities and innovative solutions.", icon: Sparkles },
  { title: "Contribution", desc: "The willingness to use one's capabilities for the wider community good.", icon: Heart },
];

export default function EducationLandingPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── 1. HERO SECTION ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#00381e] via-[#005a30] to-[#014725] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-16 sm:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-black uppercase tracking-widest">
                  <GraduationCap className="w-3.5 h-3.5 fill-emerald-300" />
                  <span>EDUCATION &amp; LEARNING</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  From Learning <br className="hidden sm:inline" />
                  to <span className="text-emerald-300">Possibility.</span>
                </h1>

                <p className="text-base sm:text-lg font-medium text-emerald-200/90 italic">
                  From the First Lesson to a Future of Possibilities
                </p>

                <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Creating pathways for children and young people to learn, discover their potential, develop capabilities, and build a future with greater opportunity.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#initiatives"
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition"
                  >
                    <span>Explore Our Programmes</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveModal("sponsor")}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl backdrop-blur-md transition"
                  >
                    <Heart className="w-4 h-4 fill-brand-orange text-brand-orange" />
                    <span>Support a Learner</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/5 backdrop-blur-xs">
                  <img
                    src={causeEducationImg}
                    alt="Rural education and learning support"
                    className="w-full h-72 sm:h-88 object-cover transform hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <p className="text-[11px] font-black uppercase tracking-widest text-emerald-300">
                      Inclusive Development
                    </p>
                    <h3 className="text-base font-extrabold text-white leading-snug">
                      Empowering rural learners with knowledge, dignity and future agency.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. STAT COUNTER BAR ─────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((st) => {
                const IconComponent = st.icon;
                return (
                  <div
                    key={st.label}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: st.bg, color: st.color }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                        {st.num}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                        {st.label}
                      </div>
                      <div className="text-[11px] text-slate-500 hidden sm:block">
                        {st.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 3. OVERVIEW & CHALLENGE vs VISION ───────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Left: Overview & Challenge */}
              <div className="lg:col-span-6 space-y-6">
                <ScrollReveal>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#15803d] text-xs font-black uppercase tracking-wider">
                      <span>OVERVIEW</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                      Education is more than entering a classroom.
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      It is about developing the ability to learn, think, create, choose and contribute. At ISLAH, we believe that every child and young person—regardless of where they live or their economic circumstances—should have the opportunity to discover their potential and build a meaningful future.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our Education &amp; Learning initiatives are designed as a connected pathway—from foundational learning and academic support to higher education, career guidance, technical skills, research and knowledge creation.
                    </p>
                  </div>
                </ScrollReveal>

                {/* The Challenge */}
                <ScrollReveal>
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>THE CHALLENGE • RURAL EDUCATION IN INDIA</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">
                      Interconnected Barriers in Underserved Communities
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A student may have access to a school but still lack learning resources. Another may have academic ability but lack guidance. A talented student may have aspirations for higher education but face financial barriers:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                      {[
                        "Limited access to quality educational resources",
                        "Learning gaps in foundational literacy and numeracy",
                        "School dropout during secondary and later stages",
                        "Shortages of educational and mentoring support",
                        "Limited access to digital learning opportunities",
                        "Gender-related barriers to continued education",
                        "Limited exposure to higher-education pathways",
                        "Inadequate access to practical skill learning",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: Our Vision & Ecosystem */}
              <div className="lg:col-span-6 space-y-6">
                <ScrollReveal>
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="relative z-10 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-black uppercase tracking-wider">
                        <span>OUR VISION</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        Education as a Pathway to Opportunity
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        ISLAH believes that meaningful educational development requires more than increasing access to classrooms. It requires creating an ecosystem that supports learners at different stages of their journey.
                      </p>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                        <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                          The Learner Progression Pipeline
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
                          {[
                            "Access Education",
                            "Learn",
                            "Discover Potential",
                            "Receive Guidance",
                            "Develop Skills",
                            "Find Opportunities",
                            "Build Agency",
                          ].map((step, idx) => (
                            <div key={step} className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-emerald-200 text-[11px]">
                                {step}
                              </span>
                              {idx < 6 && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                          <p className="text-xs font-bold text-white">Classroom to Livelihood</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Connecting books to self-reliance</p>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                          <p className="text-xs font-bold text-white">Equity &amp; Inclusion</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Equal focus on girls and first-generation learners</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Photo Feature Banner */}
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src={sectorEducation1}
                    alt="Classroom learning"
                    className="w-full h-44 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                  <img
                    src={sectorEducation2}
                    alt="School kit distribution"
                    className="w-full h-44 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. OUR APPROACH: FROM ACCESS TO AGENCY ──────────────────────────── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                OUR METHODOLOGY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                From Access to Agency
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                A connected 7-stage progression designed to support learners throughout every milestone of life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {APPROACH_STAGES.map((st) => (
                <div
                  key={st.step}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between text-left hover:shadow-md transition"
                >
                  <div className="space-y-2">
                    <div
                      className="text-xs font-black tracking-widest"
                      style={{ color: st.color }}
                    >
                      {st.step}
                    </div>
                    <h3 className="font-black text-sm text-slate-900 tracking-tight">
                      {st.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 mt-3">
                    <div className="h-1 w-6 rounded-full" style={{ backgroundColor: st.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. INITIATIVES GRID (Eight Pathways. One Purpose.) ─────────────── */}
        <section id="initiatives" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                OUR INITIATIVES &amp; PROGRAMMES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Eight Pathways. One Purpose.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Building a complete ecosystem that nurtures foundational learning, opens doors to competitive academia, equips youth with marketable skills, and cultivates intellectual inquiry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {INITIATIVES.map((init) => {
                const IconComponent = init.icon;
                return (
                  <div
                    key={init.num}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between p-6 group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-black px-2.5 py-1 rounded-md text-white"
                          style={{ backgroundColor: init.color }}
                        >
                          {init.num}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {init.badge}
                        </span>
                      </div>

                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 group-hover:scale-110 transition">
                        <IconComponent className="w-6 h-6" style={{ color: init.color }} />
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900 group-hover:text-[#15803d] transition leading-snug">
                          {init.title}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-500 mt-1">
                          {init.tagline}
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {init.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100">
                      <Link
                        to={init.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803d] hover:text-[#0b1f3b] transition"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 6. OUR PHILOSOPHY: BEYOND ACADEMIC ACHIEVEMENT ─────────────────── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                We Believe Education Should Build More Than Academic Achievement
              </h2>
              <p className="text-xs text-slate-600">
                True education empowers the whole human being through 7 balanced dimensions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {PHILOSOPHY_PILLARS.map((pil) => {
                const IconComponent = pil.icon;
                return (
                  <div
                    key={pil.title}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900">{pil.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{pil.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 7. EXPECTED IMPACT ──────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-emerald-900 via-[#004724] to-[#002e17] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  LONG-TERM OUTCOMES
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Building Stronger Futures Through Education
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Through its Education &amp; Learning initiatives, ISLAH aims to create measurable, sustainable change across the lives of rural learners, families and entire communities.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                {[
                  "Improved access to educational opportunities in rural areas",
                  "Stronger foundational learning in literacy & numeracy",
                  "Greater educational continuity and reduced dropout rates",
                  "Increased access to academic guidance and expert mentorship",
                  "Greater participation in secondary and higher education",
                  "Development of market-driven technical and employability skills",
                  "Increased confidence and informed career decision-making",
                  "Empowerment of girls and first-generation learners",
                  "Development of capable, self-reliant rural communities",
                ].map((impact) => (
                  <div key={impact} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-snug">{impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. ROADMAP BANNER ───────────────────────────────────────────────── */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400">
              FROM FIRST LEARNING TO FUTURE POSSIBILITY
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">Foundation</p>
                <p className="text-xs font-black text-white mt-1">EPS + SKLS</p>
                <p className="text-[10px] text-emerald-300">Every child starts right</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">Discovery</p>
                <p className="text-xs font-black text-white mt-1">CLC + APTD</p>
                <p className="text-[10px] text-emerald-300">Uncovering rural talent</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">Advancement</p>
                <p className="text-xs font-black text-white mt-1">SHE + CGM</p>
                <p className="text-[10px] text-emerald-300">Higher education &amp; paths</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">Readiness</p>
                <p className="text-xs font-black text-white mt-1">TVET</p>
                <p className="text-[10px] text-emerald-300">Skills for livelihood</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
                <p className="text-[10px] uppercase font-bold text-slate-400">Knowledge</p>
                <p className="text-xs font-black text-white mt-1">KRP</p>
                <p className="text-[10px] text-emerald-300">Research &amp; publication</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. OUR STATEMENT ────────────────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
              OUR STATEMENT
            </span>
            <blockquote className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              “Empowering rural learners today for a better India tomorrow.”
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-600">
              Because inclusive development begins where opportunity is needed most.
            </p>
          </div>
        </section>

        {/* ─── 10. CALL TO ACTION BANNER ───────────────────────────────────────── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                  BE A PART OF THEIR JOURNEY
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Support Quality Education in Rural India
                </h3>
                <p className="text-xs text-slate-600">
                  Whether through sponsoring a student, funding school kits, or mentoring youth, your partnership transforms lives.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal("sponsor")}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Support Education</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition"
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
