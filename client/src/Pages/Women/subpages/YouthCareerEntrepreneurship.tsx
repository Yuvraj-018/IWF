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
  Briefcase,
  TrendingUp,
  Lightbulb,
  Users,
  Smartphone,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Target,
  Rocket,
  Store,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_entrepreneur_1.png";
import overviewHero from "@/assets/overview-hero.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Compass,
    title: "Career Awareness & Exploration",
    desc: "Helping youth understand different education, training, employment and career pathways while encouraging them to identify their interests, strengths and aspirations.",
  },
  {
    num: "02",
    icon: Target,
    title: "Career Guidance & Planning",
    desc: "Supporting young people in setting realistic career goals and developing individual pathways towards further education, employment, skill development or entrepreneurship.",
  },
  {
    num: "03",
    icon: Lightbulb,
    title: "Entrepreneurship Orientation",
    desc: "Introducing entrepreneurial thinking and helping aspiring young entrepreneurs understand opportunities, business basics, innovation and responsible enterprise development.",
  },
  {
    num: "04",
    icon: Store,
    title: "Business Planning & Enterprise Skills",
    desc: "Building practical knowledge in areas such as idea development, business planning, costing, pricing, customer understanding, marketing and basic financial management.",
  },
  {
    num: "05",
    icon: Users,
    title: "Mentorship & Professional Exposure",
    desc: "Where feasible, connecting youth with professionals, entrepreneurs, educators and experienced mentors who can provide guidance, inspiration and practical perspectives.",
  },
  {
    num: "06",
    icon: Smartphone,
    title: "Digital & Emerging Opportunities",
    desc: "Creating awareness of digital careers, technology-enabled work, online opportunities and emerging areas of employment and entrepreneurship.",
  },
  {
    num: "07",
    icon: Rocket,
    title: "Opportunity Linkages",
    desc: "Where feasible, facilitating connections with educational institutions, training providers, employers, businesses, entrepreneurship networks and other relevant opportunities.",
  },
];

const TARGET_YOUTH = [
  "Rural and underserved youth seeking direction and livelihood",
  "School and senior secondary college students exploring future pathways",
  "Recent graduates and first-time job seekers preparing for interviews",
  "Unemployed and underemployed youth needing market-relevant skills",
  "Youth exploring career alternatives and vocational trade pathways",
  "Aspiring young rural entrepreneurs ready to pilot micro-enterprises",
  "Young people from economically vulnerable and distressed families",
];

const YOUTH_PATHWAY = [
  { step: "01", label: "DISCOVER", desc: "Recognising personal strengths & aspirations" },
  { step: "02", label: "EXPLORE", desc: "Investigating market demands & career options" },
  { step: "03", label: "PLAN", desc: "Setting realistic goals & mapping educational steps" },
  { step: "04", label: "DEVELOP", desc: "Acquiring technical, business & digital skills" },
  { step: "05", label: "CREATE", desc: "Launching enterprise or securing employment" },
  { step: "06", label: "PROGRESS", desc: "Ongoing career growth, leadership & mentoring" },
];

const IMPACT_OUTCOMES = [
  "Greater career awareness and informed decision-making",
  "Improved understanding of education and employment pathways",
  "Stronger career planning capabilities and goal discipline",
  "Increased entrepreneurial awareness and innovation mindset",
  "Better understanding of basic enterprise development and finance",
  "Greater access to mentors, educators and professional networks",
  "Improved confidence in pursuing career and livelihood goals",
  "Increased readiness for employment, self-employment and entrepreneurship",
];

// ─── Shared SectionTitle ──────────────────────────────────────────────────────

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">{label}</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{title}</h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function YouthCareerEntrepreneurship() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Standardized Hero */}
        <SubpageHeroCarousel
          tag="WOMEN & YOUTH • YCED"
          title="Youth Career & Entrepreneurship Development"
          subtitle="Discover direction, build capabilities, and create meaningful career and enterprise opportunities for rural youth to build self-reliance."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Women & Youth", href: "/programs/women-empowerment" },
            { label: "Youth Career & Entrepreneurship" },
          ]}
          images={[heroImg, overviewHero]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/women-empowerment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Women &amp; Youth Initiatives
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* ── OVERVIEW ── */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Overview" title="Connecting Ambition With Practical Direction" />
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                    <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                      <Compass className="w-32 h-32" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                      <span>🌿</span> Youth Mandate
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                        The Youth Career &amp; Entrepreneurship Development Programme is an ISLAH initiative designed to help young people in rural and underserved communities make informed career choices, develop entrepreneurial thinking and build pathways towards meaningful employment, self-employment and sustainable livelihoods.
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                        For many young people, choosing a career can be difficult without access to reliable information, professional guidance, mentors, exposure to different career pathways and practical knowledge about entrepreneurship.
                      </p>
                      <p className="text-slate-800 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-slate-300">
                        ISLAH seeks to bridge this gap by connecting career awareness with skills, mentorship and enterprise development.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5">
                <ScrollReveal delay={0.1}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-brand-green to-brand-orange rounded-2xl opacity-15 blur-sm group-hover:opacity-25 transition-opacity duration-300" />
                    <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
                      <img
                        src={overviewHero}
                        alt="Rural youth mentorship"
                        className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-semibold">
                          Career Mentorship &amp; Enterprise Incubation
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Objective Card */}
            <ScrollReveal>
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-brand-green/5 p-6 md:p-8 rounded-2xl border border-brand-green/20 text-center shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider mb-3">
                  <Target className="w-3.5 h-3.5" /> Programme Objective
                </div>
                <p className="text-sm md:text-base text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
                  The programme aims to help young people move from uncertainty to informed action—understanding their strengths, exploring opportunities, developing relevant capabilities and taking practical steps towards their chosen career or enterprise pathway.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── OUR APPROACH (7 AREAS) ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Programme Approach"
                title="7 Pillars of Youth Development"
                subtitle="From career discovery to business planning, mentorship, digital skills, and institutional linkages."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.07}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                {APPROACH_AREAS.slice(0, 6).map((area) => {
                  const Icon = area.icon;
                  return (
                    <div
                      key={area.num}
                      className="group bg-white hover:bg-slate-50/80 rounded-xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      <span className="absolute top-2 right-4 text-5xl font-extrabold text-slate-100 select-none">
                        {area.num}
                      </span>
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-base text-slate-800 mb-2 transition-colors">
                          {area.num}. {area.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed transition-colors">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 7th Centered Area */}
              <div className="max-w-md mx-auto">
                {APPROACH_AREAS.slice(6).map((area) => {
                  const Icon = area.icon;
                  return (
                    <div
                      key={area.num}
                      className="group bg-white hover:bg-slate-50/80 rounded-xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      <span className="absolute top-2 right-4 text-5xl font-extrabold text-slate-100 select-none">
                        {area.num}
                      </span>
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-base text-slate-800 mb-2 transition-colors">
                          {area.num}. {area.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed transition-colors">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── WHO WE AIM TO SUPPORT ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Target Beneficiaries" title="Who We Aim to Support" />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {TARGET_YOUTH.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-brand-green/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── THE ISLAH YOUTH PATHWAY ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Youth Progression"
                title="The ISLAH Youth Pathway"
                subtitle="We believe young people need more than information—they need direction, confidence, relevant capabilities and access to opportunity."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-10">
                {YOUTH_PATHWAY.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white text-slate-700 rounded-xl p-4 text-center border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 relative group transition-all"
                  >
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
                      Step {p.step}
                    </span>
                    <p className="text-sm md:text-base font-bold text-slate-800 tracking-wide mb-1">
                      {p.label}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── EXPECTED IMPACT ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Outcomes" title="Expected Impact" />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {IMPACT_OUTCOMES.map((impact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80 shadow-sm hover:border-brand-green/30 hover:shadow-md transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-800 leading-relaxed">
                      {impact}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Vision Quote Banner */}
            <ScrollReveal delay={0.15}>
              <div className="mt-8 bg-slate-50/80 rounded-2xl p-8 md:p-10 text-center border border-slate-200 relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-brand-orange border border-orange-200/60 text-xs font-semibold tracking-wider mb-4">
                  <span>🚀</span> Our Vision
                </div>
                <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed">
                  To enable rural and underserved youth to make informed career choices, develop entrepreneurial capabilities and build meaningful pathways towards employment, enterprise and sustainable livelihoods.
                </p>
                <blockquote className="text-base md:text-lg font-semibold italic text-slate-800 max-w-2xl mx-auto leading-relaxed pt-3 border-t border-slate-200">
                  "A clear direction can change a young person’s future; the right opportunity can help them build it."
                </blockquote>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-brand-orange/60" />
                  <span className="text-brand-orange font-medium text-xs tracking-wide uppercase">
                    Part of Women &amp; Youth Empowerment — ISLAH
                  </span>
                  <span className="h-px w-8 bg-brand-orange/60" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── BACK / NEXT NAV ── */}
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/programs/women-empowerment/womens-rights"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Prev: Women's Rights &amp; Gender Equality (WRGE)
            </Link>
            <Link
              to="/programs/women-empowerment"
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:translate-x-0.5"
            >
              All Women &amp; Youth Initiatives
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
