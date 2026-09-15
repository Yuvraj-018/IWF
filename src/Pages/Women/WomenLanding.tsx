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
  Users,
  Sparkles,
  Scissors,
  PiggyBank,
  Scale,
  Compass,
  Briefcase,
  TrendingUp,
  Heart,
  ShieldCheck,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Home,
  CheckCircle2,
  BookOpen,
  Award,
  DollarSign,
  Smile,
  Zap,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import causeWomenImg from "@/assets/cause-women.jpg";
import sectorWomenImg from "@/assets/sector_women_1.png";
import thematicWomenImg from "@/assets/thematic-women.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_FEATURE_CARDS = [
  {
    icon: Scissors,
    title: "Vocational Skills",
    desc: "Market-ready training and home-based livelihoods for women",
  },
  {
    icon: PiggyBank,
    title: "Self-Help Groups",
    desc: "Community savings collectives, governance and financial literacy",
  },
  {
    icon: Scale,
    title: "Rights & Dignity",
    desc: "Legal literacy, gender equality, safety and social inclusion",
  },
  {
    icon: Compass,
    title: "Youth Careers",
    desc: "Career guidance, mentorship, and entrepreneurship orientation",
  },
];

const PILLAR_RIBBON = [
  {
    icon: Sparkles,
    label: "Dignity & Capability",
    sub: "Pathways from learning to self-reliance",
  },
  {
    icon: TrendingUp,
    label: "Financial Independence",
    sub: "Savings collectives and micro-enterprises",
  },
  {
    icon: Scale,
    label: "Rights & Equality",
    sub: "Community dialogue and legal awareness",
  },
  {
    icon: Compass,
    label: "Youth Leadership",
    sub: "Guiding the next generation of changemakers",
  },
];

const CHALLENGES = [
  {
    icon: GraduationCap,
    title: "Limited Education & Skills",
    desc: "Restricted access to quality schooling, higher education, and market-relevant technical training.",
  },
  {
    icon: Briefcase,
    title: "Youth Unemployment",
    desc: "High rates of unemployment and underemployment due to skill mismatches and lack of career guidance.",
  },
  {
    icon: DollarSign,
    title: "Financial Dependency",
    desc: "Women frequently experience economic dependency with limited avenues for personal savings or independent income.",
  },
  {
    icon: TrendingUp,
    title: "Restricted Entrepreneurship",
    desc: "Lack of initial capital, business literacy, and market linkages prevents women and youth from launching micro-enterprises.",
  },
  {
    icon: Compass,
    title: "Early School Dropout",
    desc: "Financial distress and social pressures force young people into early dropout, restricting career pathways.",
  },
  {
    icon: Lightbulb,
    title: "Low Rights & Health Awareness",
    desc: "Limited awareness regarding basic legal protections, hygiene, women's health, and government entitlement schemes.",
  },
  {
    icon: Users,
    title: "Limited Decision-Making",
    desc: "Restricted representation and low voice for women in family decision-making and community governance.",
  },
  {
    icon: Zap,
    title: "Distress Migration",
    desc: "Absence of sustainable local livelihoods forces distress migration of youth, fracturing family stability.",
  },
  {
    icon: Smile,
    title: "Underutilised Potential",
    desc: "Loss of confidence and untapped capabilities preventing individuals from realising their full human potential.",
  },
];

const STRATEGIC_APPROACH = [
  {
    num: "01",
    title: "Education & Awareness",
    desc: "Promoting access to knowledge and awareness that can help women and young people make informed decisions about education, careers, health, rights and opportunities.",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "Skills & Employability",
    desc: "Supporting practical and market-relevant skills that can improve employability, self-employment and sustainable livelihood opportunities.",
    icon: Scissors,
  },
  {
    num: "03",
    title: "Entrepreneurship & Livelihoods",
    desc: "Encouraging women and youth to explore entrepreneurship, micro-enterprises, self-employment and other sustainable income opportunities.",
    icon: TrendingUp,
  },
  {
    num: "04",
    title: "Financial Awareness & Independence",
    desc: "Promoting financial literacy, savings awareness, income-generation capabilities and greater economic independence.",
    icon: PiggyBank,
  },
  {
    num: "05",
    title: "Leadership & Participation",
    desc: "Creating opportunities for women and youth to participate in community activities, leadership initiatives, volunteering and local development processes.",
    icon: Users,
  },
  {
    num: "06",
    title: "Rights, Dignity & Inclusion",
    desc: "Promoting awareness of rights, gender equality, dignity and inclusive participation while supporting vulnerable individuals through appropriate programmes.",
    icon: Scale,
  },
];

const INITIATIVES = [
  {
    num: "01",
    abbr: "WSDL",
    title: "Women Skill Development & Livelihood Programme",
    desc: "Supporting women with practical skills, vocational training (tailoring, handicrafts, food processing), and livelihood opportunities that contribute to greater economic independence.",
    href: "/programs/women-empowerment/women-skill-livelihood",
    icon: Scissors,
    tag: "Livelihood & Skills",
  },
  {
    num: "02",
    abbr: "SHG",
    title: "Self-Help Group Capacity Building",
    desc: "Strengthening knowledge, financial literacy, bookkeeping, leadership and collective enterprise capabilities among women participating in community-based groups.",
    href: "/programs/women-empowerment/self-help-groups",
    icon: PiggyBank,
    tag: "Collective Thrift & Enterprise",
  },
  {
    num: "03",
    abbr: "WRGE",
    title: "Women’s Rights & Gender Equality Awareness",
    desc: "Creating accessible awareness regarding constitutional protections, domestic safety, equality, respect, and active participation in family and community life.",
    href: "/programs/women-empowerment/womens-rights",
    icon: Scale,
    tag: "Rights, Equality & Safety",
  },
  {
    num: "04",
    abbr: "YCED",
    title: "Youth Career & Entrepreneurship Development",
    desc: "Guiding rural youth through career exploration, mentorship, digital skills, business planning, and enterprise incubation to unlock sustainable livelihoods.",
    href: "/programs/women-empowerment/youth-career-entrepreneurship",
    icon: Compass,
    tag: "Youth & Future Pathways",
  },
];

const EXPECTED_IMPACTS = [
  "Improved access to skills and livelihood opportunities",
  "Increased employability and self-employment among youth",
  "Greater financial independence and self-reliance among women",
  "Increased participation of women in economic activities",
  "Improved career awareness and preparedness among youth",
  "Growth of entrepreneurship and small-scale micro-enterprises",
  "Increased confidence, leadership and decision-making capacity",
  "Greater awareness of health, rights and social responsibilities",
  "Reduced dependence on unsustainable or low-income livelihoods",
  "Increased participation in community development and governance",
  "Stronger, resilient, and more dignified families and communities",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function WomenLanding() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ── 1. HERO SECTION ── */}
        <section className="relative min-h-[520px] flex items-center overflow-hidden bg-slate-900">
          <img
            src={thematicWomenImg}
            alt="Women & Youth Empowerment"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs" className="hover:text-white transition-colors">What We Do</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">Women &amp; Youth Empowerment</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                Sector 03 • Capability, Dignity &amp; Livelihood
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-4xl">
              Women &amp; Youth<br />
              <span className="text-brand-orange">Empowerment</span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide mb-3 max-w-2xl">
              Creating Opportunity. Building Confidence. Strengthening Communities.
            </p>

            <p className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed mb-8">
              Unlocking capability, financial self-reliance, leadership, and equality for rural women and young people across Bihar.
            </p>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
              {HERO_FEATURE_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3.5 hover:bg-white/15 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-brand-orange/30 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-brand-orange" />
                      </div>
                      <span className="text-xs font-bold text-white leading-tight">{card.title}</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-tight">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 2. 4-PILLAR RIBBON ── */}
        <section className="bg-brand-green-dark text-white py-4 border-y border-brand-green/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PILLAR_RIBBON.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 py-1">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">{p.label}</p>
                      <p className="text-[11px] text-white/60 leading-tight">{p.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. OVERVIEW SECTION ── */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Brief Information
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-green" />
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
                    Creating Pathways to Capability, Dignity &amp; Independence
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  When women and youth gain knowledge, capability, confidence and opportunity, the benefits extend beyond individuals to families, communities and future generations.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
              {/* Left Column: Context Cards */}
              <div className="lg:col-span-7 space-y-4">
                <ScrollReveal>
                  <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden text-white">
                    <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                      <Users className="w-36 h-36" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                      <span>🌿</span> Context &amp; Imperative
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                        Women and young people are among the most important drivers of social and economic development. Yet, in many rural and underserved communities, they continue to face barriers that limit their access to education, skills, employment, healthcare, entrepreneurship, leadership and meaningful participation in society.
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                        Women often experience financial dependency, limited livelihood opportunities, social inequality and inadequate awareness of health and rights. At the same time, many young people face unemployment, limited career guidance, lack of market-relevant skills and restricted access to opportunities that can help them build sustainable futures.
                      </p>
                      <p className="text-white/90 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-white/40">
                        ISLAH believes that empowering women and youth is not simply about helping—it is about creating pathways to capability, dignity, independence and participation.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Visual Feature Box */}
              <div className="lg:col-span-5">
                <ScrollReveal delay={0.1}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-brand-green to-brand-orange rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
                      <img
                        src={causeWomenImg}
                        alt="Women & Youth Empowerment in Action"
                        className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                        <span className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
                          Community Impact
                        </span>
                        <p className="text-white text-sm font-semibold leading-snug">
                          "Through integrated initiatives in education, skills, livelihoods, entrepreneurship, awareness and community engagement, ISLAH helps women and youth become confident, capable and active changemakers."
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. CHALLENGES / THE NEED SECTION ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  The Need
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-green" />
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
                    Why Focused Empowerment is Needed
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  Deep-seated systemic barriers in rural areas perpetuate inequality and economic stagnation unless met with targeted, comprehensive interventions.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {CHALLENGES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex items-start gap-4 p-5 bg-[#0b1f3b] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="shrink-0 w-9 h-9 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                        <Icon className="w-4.5 h-4.5 text-white group-hover:text-brand-green transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-brand-green-dark mb-1 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-200 group-hover:text-slate-600 leading-relaxed transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 5. OUR OBJECTIVE & VISION SECTION ── */}
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {/* Objective Card */}
                <div className="bg-gradient-to-br from-brand-green/5 to-slate-50 border-2 border-brand-green/20 rounded-2xl p-7 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green-dark text-xs font-bold uppercase tracking-wider mb-4">
                      <Compass className="w-3.5 h-3.5 text-brand-green" /> Our Objective
                    </div>
                    <h3 className="text-xl font-bold text-brand-green-dark mb-3">
                      Empowering Through Action &amp; Inclusion
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      To empower women and youth by creating opportunities for education, skills, livelihoods, entrepreneurship, financial awareness, leadership and meaningful community participation, enabling them to achieve greater self-reliance and contribute to sustainable community development.
                    </p>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-gradient-to-br from-brand-orange/5 to-slate-50 border-2 border-brand-orange/20 rounded-2xl p-7 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> Our Vision
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Communities of Equality &amp; Opportunity
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      ISLAH envisions communities where every woman and young person can learn, develop skills, earn with dignity, participate meaningfully and shape a better future. When they gain knowledge and capability, the benefits ripple across families, villages, and future generations.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 6. STRATEGIC APPROACH (6 PILLARS) ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Strategic Framework
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-green" />
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
                    Our 6-Pillar Approach
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  A structured methodology designed to accompany women and youth at every stage from knowledge acquisition to economic sovereignty.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {STRATEGIC_APPROACH.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="group bg-[#0b1f3b] hover:bg-white rounded-xl p-6 border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      <span className="absolute top-2 right-4 text-5xl font-extrabold text-white/5 select-none group-hover:text-brand-green/5 transition-colors">
                        {pillar.num}
                      </span>
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-lg bg-white/10 group-hover:bg-brand-green/10 flex items-center justify-center mb-4 transition-colors">
                          <Icon className="w-5 h-5 text-white group-hover:text-brand-green transition-colors" />
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-brand-green-dark mb-2.5 transition-colors">
                          {pillar.num}. {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-200 group-hover:text-slate-600 leading-relaxed transition-colors">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 7. KEY INITIATIVES GRID (4 INITIATIVES) ── */}
        <section className="py-16 bg-white" id="initiatives">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Implementation Approach
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-green" />
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
                    Our Key Initiatives
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  Four core operational programmes delivering practical skills, financial autonomy, rights awareness, and youth enterprise pathways.
                </p>
              </div>
            </ScrollReveal>

            {/* Continuum Ribbon */}
            <ScrollReveal>
              <div className="mb-10 bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-brand-green/30 text-center">
                <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase mb-2">
                  Empowerment Continuum
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-bold text-brand-orange">
                  <span>Learn</span>
                  <span className="text-white/40">→</span>
                  <span className="text-white">Develop Skills</span>
                  <span className="text-white/40">→</span>
                  <span>Build Confidence</span>
                  <span className="text-white/40">→</span>
                  <span className="text-emerald-400">Empower</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid md:grid-cols-2 gap-6">
                {INITIATIVES.map((init) => {
                  const Icon = init.icon;
                  return (
                    <Link
                      key={init.num}
                      to={init.href}
                      className="group bg-[#0b1f3b] hover:bg-white rounded-2xl p-7 border border-brand-green/10 hover:border-brand-green/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      <span className="absolute top-3 right-4 text-6xl font-extrabold text-white/5 select-none group-hover:text-brand-green/5 transition-colors">
                        {init.num}
                      </span>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-brand-orange/15 flex items-center justify-center transition-colors">
                            <Icon className="w-6 h-6 text-brand-orange group-hover:text-brand-orange transition-colors" />
                          </div>
                          <span className="text-[10px] font-bold text-white/70 group-hover:text-brand-orange uppercase tracking-wider bg-white/10 group-hover:bg-brand-orange/10 px-3 py-1 rounded-full transition-colors border border-white/10 group-hover:border-brand-orange/20">
                            {init.tag}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange mb-1">
                          <span>Initiative {init.num} • {init.abbr}</span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-brand-green-dark mb-3 transition-colors">
                          {init.title}
                        </h3>

                        <p className="text-xs md:text-sm text-slate-200 group-hover:text-slate-600 leading-relaxed mb-6 transition-colors">
                          {init.desc}
                        </p>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-white/10 group-hover:border-slate-100 flex items-center justify-between transition-colors">
                        <span className="text-xs font-bold text-white group-hover:text-brand-green transition-colors">
                          Explore Initiative Details
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-brand-green flex items-center justify-center text-white transition-all group-hover:translate-x-1">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 8. EXPECTED IMPACT SECTION ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Measurable Change
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-green" />
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
                    Expected Impact
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  Through its Women &amp; Youth Empowerment initiatives, ISLAH aims to contribute towards measurable and generational community transformation:
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.04}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {EXPECTED_IMPACTS.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-brand-green/30 hover:shadow-md transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-800 leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 9. STATEMENT & VISION BANNER ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="bg-brand-green-darker rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl text-white">
                <div className="absolute -top-10 -right-10 text-white/5 select-none pointer-events-none">
                  <Sparkles className="w-48 h-48" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                  <span>✨</span> ISLAH Guiding Vision
                </div>
                <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed mb-6 italic text-white/95">
                  "Empowering women and youth with knowledge, skills, dignity and opportunity — building confident individuals, stronger families and resilient communities."
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-brand-orange/60" />
                  <span className="text-brand-orange font-bold text-sm tracking-wider uppercase">
                    Islah Welfare Foundation
                  </span>
                  <span className="h-px w-10 bg-brand-orange/60" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 10. SUPPORT & PARTNER CTA ── */}
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Partner With Us
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Be the Catalyst for Empowerment
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                Join hands with Islah Welfare Foundation to sponsor skill toolkits, mentor young entrepreneurs, or expand rural self-help collectives. Every partnership directly uplifts a family.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-7 py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Heart className="w-4 h-4" /> Sponsor Women &amp; Youth
                </Link>
                <button
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 px-7 py-3 rounded-full transition-all"
                >
                  Corporate &amp; CSR Partnership <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModal("volunteer")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white px-5 py-3 rounded-full transition-all"
                >
                  Volunteer as a Mentor
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
