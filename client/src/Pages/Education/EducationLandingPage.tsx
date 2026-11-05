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
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
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

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">{label}</p>
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{title}</h2>
      {subtitle && <p className="text-slate-600 text-sm leading-relaxed mt-2">{subtitle}</p>}
    </div>
  );
}

export default function EducationLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── 1. HERO SECTION (Matching About Us SubpageHeroCarousel) ─── */}
        <SubpageHeroCarousel
          tag="WHAT WE DO • SECTOR 01"
          title="Education & Learning"
          subtitle="From Learning to Possibility. Creating pathways for children and young people to learn, discover their potential, and build a future of opportunity."
          breadcrumbs={[
            { label: "Our Programs", href: "/programs" },
            { label: "Education & Learning" },
          ]}
          images={[causeEducationImg, sectorEducation1, sectorEducation2]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#initiatives"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/donate" search={{ financialType: "Education & Learning", initiative: "Education & Learning Programs" }} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer backdrop-blur-xs">
              <Heart className="w-4 h-4 text-brand-orange" />
              <span>Support a Learner</span>
            </Link>
          </div>
        </SubpageHeroCarousel>

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
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
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
        <section className="py-12 sm:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Left: Overview & Challenge */}
              <div className="space-y-6">
                <ScrollReveal>
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">Overview</p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] leading-snug">
                      Education is more than entering a classroom.
                    </h2>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      It is about developing the ability to learn, think, create, choose and contribute. At ISLAH, we believe that every child and young person—regardless of where they live or their economic circumstances—should have the opportunity to discover their potential and build a meaningful future.
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Our Education &amp; Learning initiatives are designed as a connected pathway—from foundational learning and academic support to higher education, career guidance, technical skills, research and knowledge creation.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 sm:p-6 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      The Challenge · Rural Education in India
                    </p>
                    <h3 className="text-lg font-semibold text-[#0b1f3b]">
                      Interconnected Barriers in Underserved Communities
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      A student may have access to a school but still lack learning resources. Another may have academic ability but lack guidance. A talented student may have aspirations for higher education but face financial barriers:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2 pt-1">
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
                        <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: Our Vision & Ecosystem */}
              <div className="space-y-5">
                <ScrollReveal>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">Our Vision</p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#0b1f3b] leading-tight">
                      Education as a Pathway to Opportunity
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      ISLAH believes that meaningful educational development requires more than increasing access to classrooms. It requires creating an ecosystem that supports learners at different stages of their journey.
                    </p>
                    <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2.5">
                      <p className="text-xs font-semibold text-[#0b1f3b]">The learner progression pipeline</p>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          "Access Education",
                          "Learn",
                          "Discover Potential",
                          "Receive Guidance",
                          "Develop Skills",
                          "Find Opportunities",
                          "Build Agency",
                        ].map((step, idx) => (
                          <div key={step} className="flex items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-100 text-[#0b1f3b] text-xs">
                              {step}
                            </span>
                            {idx < 6 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white border border-slate-200 rounded-xl">
                        <p className="text-sm font-semibold text-[#0b1f3b]">Classroom to Livelihood</p>
                        <p className="text-xs text-slate-600 mt-0.5">Connecting books to self-reliance</p>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-xl">
                        <p className="text-sm font-semibold text-[#0b1f3b]">Equity &amp; Inclusion</p>
                        <p className="text-xs text-slate-600 mt-0.5">Equal focus on girls and first-generation learners</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 gap-4">
                  <img
                    src={sectorEducation1}
                    alt="Classroom learning"
                    className="w-full h-40 rounded-2xl object-cover border border-slate-200"
                  />
                  <img
                    src={sectorEducation2}
                    alt="School kit distribution"
                    className="w-full h-40 rounded-2xl object-cover border border-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. OUR APPROACH: FROM ACCESS TO AGENCY ──────────────────────────── */}
        <section className="py-12 sm:py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              label="Our Methodology"
              title="From Access to Agency"
              subtitle="A connected 7-stage progression designed to support learners throughout every milestone of life."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {APPROACH_STAGES.map((st) => (
                <div
                  key={st.step}
                  className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between text-left hover:border-slate-300 transition"
                >
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold tracking-widest" style={{ color: st.color }}>
                      {st.step}
                    </div>
                    <h3 className="font-semibold text-sm text-[#0b1f3b]">{st.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                  <div className="h-1 w-6 rounded-full mt-3" style={{ backgroundColor: st.color }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. INITIATIVES GRID (Eight Pathways. One Purpose.) ─────────────── */}
        <section id="initiatives" className="py-12 sm:py-14 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              label="Our Initiatives & Programmes"
              title="Eight Pathways. One Purpose."
              subtitle="Building a complete ecosystem that nurtures foundational learning, opens doors to competitive academia, equips youth with marketable skills, and cultivates intellectual inquiry."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INITIATIVES.map((init) => {
                const IconComponent = init.icon;
                return (
                  <Link
                    key={init.num}
                    to={init.href}
                    className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between p-5 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${init.color}14`, color: init.color }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {init.num} · {init.badge}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#0b1f3b] leading-snug">{init.title}</h3>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{init.tagline}</p>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{init.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange mt-4">
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 6. OUR PHILOSOPHY: BEYOND ACADEMIC ACHIEVEMENT ─────────────────── */}
        <section className="py-12 sm:py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              label="Our Philosophy"
              title="Education Should Build More Than Academic Achievement"
              subtitle="True education empowers the whole person through seven balanced dimensions."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {PHILOSOPHY_PILLARS.map((pil) => {
                const IconComponent = pil.icon;
                return (
                  <div
                    key={pil.title}
                    className="bg-white rounded-xl p-4 border border-slate-200 flex gap-3 hover:border-slate-300 transition"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center shrink-0">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#0b1f3b]">{pil.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{pil.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 7. EXPECTED IMPACT ──────────────────────────────────────────────── */}
        <section className="py-12 sm:py-14 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              label="Long-Term Outcomes"
              title="Building Stronger Futures Through Education"
              subtitle="Through its Education & Learning initiatives, ISLAH aims to create measurable, sustainable change across the lives of rural learners, families and entire communities."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                <div key={impact} className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 leading-snug">{impact}</span>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange text-center mb-4">
                From First Learning to Future Possibility
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  ["Foundation", "EPS + SKLS", "Every child starts right"],
                  ["Discovery", "CLC + APTD", "Uncovering rural talent"],
                  ["Advancement", "SHE + CGM", "Higher education & paths"],
                  ["Readiness", "TVET", "Skills for livelihood"],
                  ["Knowledge", "KRP", "Research & publication"],
                ].map(([stage, code, line], i) => (
                  <div
                    key={stage}
                    className={`p-3 rounded-xl bg-white border border-slate-200 text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <p className="text-[11px] uppercase font-semibold tracking-wider text-slate-500">{stage}</p>
                    <p className="text-sm font-semibold text-[#0b1f3b] mt-0.5">{code}</p>
                    <p className="text-xs text-slate-600">{line}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. CALL TO ACTION BANNER ───────────────────────────────────────── */}
        <section className="py-16 bg-gradient-to-br from-[#071527] to-[#0c2340] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange block">
              BE A PART OF THEIR JOURNEY
            </span>
            <blockquote className="text-xl sm:text-2xl font-serif italic text-white/95 leading-relaxed max-w-2xl mx-auto text-balance">
              “Empowering rural learners today for a better India tomorrow.”
            </blockquote>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-balance">
              Whether through sponsoring a student, funding school kits, or mentoring youth, your partnership transforms lives.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/donate" search={{ financialType: "Education & Learning", initiative: "Education & Learning Programs" }} className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer">
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>Support Education</span>
              </Link>

              <Link to="/partner" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer">
                <Users className="w-4 h-4" />
                <span>Partner With Us</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
