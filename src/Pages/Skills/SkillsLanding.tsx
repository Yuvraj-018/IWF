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
  Wrench,
  Briefcase,
  TrendingUp,
  Store,
  Compass,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Home,
  BookOpen,
  DollarSign,
  Rocket,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import entrepreneurImg from "@/assets/thematic-entrepreneur.jpg";
import sectorSkillsImg from "@/assets/sector_skills_1.png";
import sectorEntrepreneurImg from "@/assets/sector_entrepreneur_1.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_FEATURE_CARDS = [
  {
    icon: Wrench,
    title: "Market-Ready Skills",
    desc: "Demand-driven technical, digital and vocational capabilities",
  },
  {
    icon: Briefcase,
    title: "Employability & Jobs",
    desc: "Workplace readiness, job search skills, and institutional placement",
  },
  {
    icon: TrendingUp,
    title: "Livelihood Pathways",
    desc: "Connecting local skills and resources with stable income",
  },
  {
    icon: Store,
    title: "Rural Enterprises",
    desc: "Micro-business incubation, financial literacy, and market linkages",
  },
];

const PILLAR_RIBBON = [
  {
    icon: Wrench,
    label: "Practical Capabilities",
    sub: "Technical & digital trade skills",
  },
  {
    icon: Briefcase,
    label: "Workplace Readiness",
    sub: "Bridging the gap between learning & work",
  },
  {
    icon: TrendingUp,
    label: "Sustainable Income",
    sub: "Dignified, resilient local livelihoods",
  },
  {
    icon: Store,
    label: "Micro-Enterprises",
    sub: "From local ideas to sustainable businesses",
  },
];

const CHALLENGES = [
  {
    icon: Wrench,
    title: "Limited Practical Skills",
    desc: "Restricted access to hands-on, modern technical training aligned with contemporary market requirements.",
  },
  {
    icon: Briefcase,
    title: "Unemployment & Underemployment",
    desc: "High rates of youth unemployment due to educational mismatches and lack of career direction.",
  },
  {
    icon: Zap,
    title: "Seasonal & Precarious Work",
    desc: "Heavy reliance on volatile, low-income casual labour without social or financial security cushions.",
  },
  {
    icon: Store,
    title: "Restricted Self-Employment",
    desc: "Limited opportunities, starter capital, or business knowledge to establish small neighborhood services.",
  },
  {
    icon: Compass,
    title: "Lack of Mentorship",
    desc: "Absence of entrepreneurial guidance, incubators, or mentors to help turn ideas into viable business models.",
  },
  {
    icon: DollarSign,
    title: "Financial & Market Gaps",
    desc: "Limited awareness of pricing, bookkeeping, credit access, and modern customer discovery channels.",
  },
  {
    icon: Target,
    title: "Distress Migration",
    desc: "Lack of viable rural opportunities forcing youth into distressed migration to overcrowded urban centres.",
  },
  {
    icon: TrendingUp,
    title: "Monetisation Barriers",
    desc: "Severe difficulty in converting existing artisanal or manual skills into sustainable commercial income.",
  },
];

const STRATEGIC_APPROACH = [
  {
    num: "01",
    title: "Skills Development",
    desc: "Promoting practical, market-relevant and livelihood-oriented skills based on local needs, participant aspirations and emerging market opportunities.",
    icon: Wrench,
  },
  {
    num: "02",
    title: "Employability & Job Readiness",
    desc: "Helping individuals develop the technical, digital, communication and workplace capabilities required to successfully pursue employment opportunities.",
    icon: Briefcase,
  },
  {
    num: "03",
    title: "Livelihood Development",
    desc: "Connecting skills with practical income-generating opportunities, including self-employment, home-based production and local economic pathways.",
    icon: TrendingUp,
  },
  {
    num: "04",
    title: "Entrepreneurship",
    desc: "Encouraging individuals with suitable skills and potential to explore entrepreneurship, micro-enterprises and small-business opportunities.",
    icon: Store,
  },
];

const INITIATIVES = [
  {
    num: "01",
    abbr: "SEP",
    title: "Skills & Employability Programme",
    desc: "Equipping rural youth and vulnerable communities with practical, employment-oriented vocational, digital, and workplace communication capabilities.",
    href: "/programs/skills-development/skills-employability",
    icon: Wrench,
    tag: "Employability & Trades",
  },
  {
    num: "02",
    abbr: "LDI",
    title: "Livelihood Development Initiative",
    desc: "Connecting local resources, artisanal talents, and home-based production with stable market linkages and dignified income generation.",
    href: "/programs/skills-development/livelihood-development",
    icon: TrendingUp,
    tag: "Livelihood & Income",
  },
  {
    num: "03",
    abbr: "REI",
    title: "Rural Entrepreneurship Initiative",
    desc: "Fostering local business awareness, idea incubation, costing, pricing, and mentorship to transform rural talent into sustainable enterprises.",
    href: "/programs/skills-development/rural-entrepreneurship",
    icon: Store,
    tag: "Enterprise & Growth",
  },
  {
    num: "04",
    abbr: "MSES",
    title: "Micro-Enterprise & Self-Employment Support",
    desc: "Providing start-up readiness, business planning, digital financial literacy, and customer linkage for aspiring micro-entrepreneurs.",
    href: "/programs/skills-development/micro-enterprise-support",
    icon: Rocket,
    tag: "Self-Employment & Scale",
  },
];

const TARGET_SEEKERS = [
  "Rural youth seeking career direction and technical capabilities",
  "Women and adolescent girls striving for independent income",
  "Economically weaker and vulnerable agricultural households",
  "Unemployed and underemployed individuals seeking stable trades",
  "Aspiring grassroots entrepreneurs and innovators",
  "Small-scale producers, artisans and local service providers",
  "Individuals seeking alternative, resilient livelihood opportunities",
];

const SKILL_TO_RELIANCE_PATHWAY = [
  { step: "01", title: "LEARN", tag: "Skills • Knowledge • Capability", desc: "Foundational technical & vocational education" },
  { step: "02", title: "PREPARE", tag: "Employability • Digital • Finance", desc: "Workplace readiness & financial literacy" },
  { step: "03", title: "WORK", tag: "Employment • Self-Employment", desc: "Accessing productive, dignified economic activity" },
  { step: "04", title: "CREATE", tag: "Entrepreneurship • Innovation", desc: "Piloting enterprise & local value addition" },
  { step: "05", title: "EARN", tag: "Income • Stability", desc: "Generating predictable household income" },
  { step: "06", title: "GROW", tag: "Self-Reliance • Resilience", desc: "Scaling operations & long-term dignity" },
];

const EXPECTED_IMPACTS = [
  "Increased access to practical and market-relevant skills",
  "Improved employability and workplace job readiness",
  "Greater self-employment and income-generation opportunities",
  "Increased economic participation of women and youth",
  "Growth of rural entrepreneurship and sustainable micro-enterprises",
  "Improved financial literacy and digital business capability",
  "Stronger connections between practical skills and livelihood markets",
  "Reduced dependence on unsustainable or low-income seasonal labour",
  "Greater local economic circulation and wealth creation",
  "Increased self-confidence, professional dignity and self-reliance",
  "More resilient households and thriving rural communities",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function SkillsLanding() {
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
            src={entrepreneurImg}
            alt="Skills, Livelihoods & Entrepreneurship"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs" className="hover:text-white transition-colors">What We Do</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">Skills, Livelihoods &amp; Entrepreneurship</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                Sector 04 • From Learning to Earning
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-4xl">
              Skills, Livelihoods &amp;<br />
              <span className="text-brand-orange">Entrepreneurship</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide mb-3 max-w-2xl">
              Building Skills. Creating Livelihoods. Enabling Self-Reliance.
            </p>

            <p className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed mb-8">
              Transforming potential into prepared capability through technical training, market linkages, and rural micro-enterprise support.
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
                    The Pathway From Learning to Earning
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  ISLAH believes that skill development should not end with training. The real objective is to create a sustainable pathway from learning to earning.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
              <div className="lg:col-span-7 space-y-4">
                <ScrollReveal>
                  <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden text-white">
                    <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                      <Wrench className="w-36 h-36" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                      <span>🌿</span> Economic Empowerment
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                        Skills are a foundation for economic opportunity. However, in many rural and underserved communities, people may have the willingness to work but lack access to practical skills, livelihood opportunities, market exposure, financial knowledge and entrepreneurial support.
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                        ISLAH believes that skill development should not end with training. The real objective is to create a pathway from learning to earning—helping individuals acquire useful skills, identify livelihood opportunities, access markets and, where appropriate, develop their own enterprises.
                      </p>
                      <p className="text-white/90 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-white/40">
                        Through its Skills, Livelihoods &amp; Entrepreneurship initiatives, ISLAH seeks to strengthen the economic capabilities of individuals and communities and promote dignified, sustainable and locally relevant livelihood opportunities.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5">
                <ScrollReveal delay={0.1}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-brand-green to-brand-orange rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
                      <img
                        src={sectorSkillsImg}
                        alt="Hands-on skills training"
                        className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                        <span className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
                          Action &amp; Impact
                        </span>
                        <p className="text-white text-sm font-semibold leading-snug">
                          "Connecting skills with practical economic activity—whether through employment, self-employment, home-based production, or small enterprises."
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
                    Why Livelihood Interventions Matter
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  Young people, women and economically vulnerable households in rural India face multiple structural challenges in accessing sustainable livelihoods.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {CHALLENGES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex flex-col justify-between p-5 bg-[#0b1f3b] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        <div className="w-9 h-9 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center mb-3 transition-colors">
                          <Icon className="w-4.5 h-4.5 text-white group-hover:text-brand-green transition-colors" />
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-brand-green-dark mb-1.5 transition-colors">
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
                      <Target className="w-3.5 h-3.5 text-brand-green" /> Our Objective
                    </div>
                    <h3 className="text-xl font-bold text-brand-green-dark mb-3">
                      Skills, Income &amp; Economic Resilience
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      To equip rural and underserved communities with practical skills, livelihood opportunities and entrepreneurial capabilities that can improve employability, income generation, self-reliance and long-term economic resilience.
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
                      Sovereignty Through Capability
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      ISLAH envisions rural and underserved communities where people have the skills, knowledge, opportunities and confidence to build sustainable livelihoods and shape their own economic future through capability and opportunity.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 6. STRATEGIC APPROACH (4 PILLARS) ── */}
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
                    Our 4-Pillar Approach
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  A four-stage methodology designed to bridge training, work readiness, market integration, and micro-business ownership.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                          {pillar.num} — {pillar.title}
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
                  Four targeted programmes connecting training to jobs, home-based production, rural enterprise incubation, and micro-business credit.
                </p>
              </div>
            </ScrollReveal>

            {/* Continuum Ribbon */}
            <ScrollReveal>
              <div className="mb-10 bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-brand-green/30 text-center">
                <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase mb-2">
                  Livelihoods &amp; Enterprise Continuum
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-bold text-brand-orange">
                  <span>Learn</span>
                  <span className="text-white/40">→</span>
                  <span className="text-white">Develop Skills</span>
                  <span className="text-white/40">→</span>
                  <span>Earn</span>
                  <span className="text-white/40">→</span>
                  <span className="text-emerald-400">Start Enterprise</span>
                  <span className="text-white/40">→</span>
                  <span className="text-brand-orange">Grow</span>
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
                          Explore Programme Details
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

        {/* ── 8. FROM SKILLS TO SELF-RELIANCE PATHWAY ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Six-Stage Journey
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-green" />
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
                    From Skills to Self-Reliance
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  Our comprehensive pathway ensuring no participant is left behind between training and sustainable financial independence.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
                {SKILL_TO_RELIANCE_PATHWAY.map((p, i) => (
                  <div
                    key={i}
                    className="bg-[#0b1f3b] text-white rounded-xl p-4 text-center border border-brand-green/20 relative group hover:border-brand-orange transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
                        Step {p.step}
                      </span>
                      <p className="text-base font-extrabold text-white tracking-wide mb-1">
                        {p.title}
                      </p>
                      <p className="text-[11px] font-bold text-emerald-400 mb-2 leading-tight">
                        {p.tag}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-tight">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 9. WHO WE SEEK TO SUPPORT ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                  Target Beneficiaries
                </p>
                <h3 className="text-2xl font-bold text-brand-green-dark">Who We Seek to Support</h3>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.05}>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {TARGET_SEEKERS.map((target, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-brand-green/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                      {target}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 10. EXPECTED IMPACT SECTION ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Measurable Outcomes
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-green" />
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
                    Expected Impact
                  </h2>
                  <span className="h-px w-8 bg-brand-green" />
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  Through these initiatives, ISLAH aims to create sustainable economic resilience across rural households and village economies:
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

        {/* ── 11. STATEMENT & VISION BANNER ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <div className="bg-brand-green-darker rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl text-white">
                <div className="absolute -top-10 -right-10 text-white/5 select-none pointer-events-none">
                  <Wrench className="w-48 h-48" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                  <span>🛠️</span> ISLAH Guiding Vision
                </div>
                <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed mb-6 italic text-white/95">
                  "Building skills that create livelihoods — enabling people to earn with dignity, grow with confidence and build sustainable futures."
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

        {/* ── 12. SUPPORT & PARTNER CTA ── */}
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Partner With Us
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Support Livelihoods &amp; Rural Enterprises
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                Help us establish community skill hubs, sponsor vocational toolkits, or mentor emerging rural micro-entrepreneurs. Together, we build self-reliance from the ground up.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-7 py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <TrendingUp className="w-4 h-4" /> Sponsor a Toolkit
                </Link>
                <button
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 px-7 py-3 rounded-full transition-all"
                >
                  CSR &amp; Skills Partnership <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModal("volunteer")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white px-5 py-3 rounded-full transition-all"
                >
                  Volunteer as a Trainer
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
