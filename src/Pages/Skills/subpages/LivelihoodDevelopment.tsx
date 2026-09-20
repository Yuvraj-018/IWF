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
  TrendingUp,
  Search,
  Wrench,
  Home as HomeIcon,
  Store,
  CreditCard,
  Network,
  HeartHandshake,
  CheckCircle2,
  Wheat,
  Scissors,
  Palette,
  Utensils,
  ShoppingBag,
  Laptop,
  Factory,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_skills_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Search,
    title: "Livelihood Assessment & Opportunity Identification",
    desc: "Understanding local skills, resources, interests and market opportunities to identify realistic livelihood pathways.",
  },
  {
    num: "02",
    icon: Wrench,
    title: "Skills for Livelihoods",
    desc: "Connecting individuals with relevant practical skills and training that can support employment, self-employment or income-generating activities.",
  },
  {
    num: "03",
    icon: HomeIcon,
    title: "Self-Employment & Home-Based Livelihoods",
    desc: "Encouraging suitable home-based and small-scale livelihood activities that can enable individuals, particularly women, to participate in economic life.",
  },
  {
    num: "04",
    icon: Store,
    title: "Micro-Enterprise Development",
    desc: "Supporting aspiring livelihood participants in understanding basic enterprise planning, costing, pricing, record keeping and customer management.",
  },
  {
    num: "05",
    icon: CreditCard,
    title: "Financial & Digital Capability",
    desc: "Promoting financial literacy, savings awareness, responsible money management and digital capabilities relevant to livelihood development.",
  },
  {
    num: "06",
    icon: Network,
    title: "Market & Business Linkages",
    desc: "Where feasible, connecting producers, service providers and emerging entrepreneurs with local markets, customers, businesses and other relevant networks.",
  },
  {
    num: "07",
    icon: HeartHandshake,
    title: "Mentorship & Continued Support",
    desc: "Providing guidance and mentorship, where feasible, to help participants overcome initial challenges and strengthen the sustainability of their livelihood activities.",
  },
];

const IMPLEMENTATION_SECTORS = [
  { icon: Wheat, title: "Agriculture & Allied Livelihoods", desc: "Small-scale livestock, horticulture, vermicomposting, poultry, and allied rural production." },
  { icon: Scissors, title: "Tailoring & Garment Work", desc: "Apparel making, home furnishing textiles, alteration services and garment production." },
  { icon: Palette, title: "Handicrafts & Traditional Products", desc: "Preserving cultural artisan traditions, bamboo/cane craft, jute articles and handcrafted decor." },
  { icon: Utensils, title: "Food Processing & Home Production", desc: "Value addition for spices, pulses, pickles, traditional snacks and dry grain processing." },
  { icon: ShoppingBag, title: "Retail & Local Services", desc: "Neighborhood grocery stalls, mobile vending, household repair and essential local services." },
  { icon: Laptop, title: "Digital & Tech-Enabled Services", desc: "Common service centre operations, digital document processing, mobile recharges and e-services." },
  { icon: Factory, title: "Small-Scale Production", desc: "Eco-friendly bag making, soap/detergent compounding, candle making and packaging units." },
  { icon: Store, title: "Micro-Enterprises & Self-Employment", desc: "Individual trade units, small service workshops and household entrepreneurial initiatives." },
  { icon: Sparkles, title: "Locally Relevant Livelihood Trades", desc: "Tailored micro-income pathways responding to hyper-local seasonal and market demands." },
];

const TARGET_POPULATION = [
  "Rural and underserved households seeking economic security",
  "Women and youth seeking independent livelihood opportunities",
  "Unemployed and underemployed individuals in semi-rural clusters",
  "Small-scale producers and localized service providers",
  "Members of Self-Help Groups (SHGs) looking to scale activities",
  "Aspiring micro-entrepreneurs needing initial footing",
  "Economically vulnerable families vulnerable to seasonal migration",
];

const LIVELIHOOD_STAGES = [
  { step: "01", label: "IDENTIFY", desc: "Assess local skills, community resources & market demand" },
  { step: "02", label: "LEARN", desc: "Acquire trade-specific capabilities & practical technical skills" },
  { step: "03", label: "DEVELOP", desc: "Formulate livelihood plan, establish costing & acquire equipment" },
  { step: "04", label: "START", desc: "Launch home-based or local micro-enterprise operations" },
  { step: "05", label: "EARN", desc: "Generate predictable, dignified household cash-flows" },
  { step: "06", label: "SUSTAIN", desc: "Manage savings, navigate challenges & reinvest prudently" },
  { step: "07", label: "GROW", desc: "Scale enterprise reach, mentor peers & build lasting resilience" },
];

const IMPACT_POINTS = [
  "Increased access to sustainable livelihood opportunities",
  "Improved income-generation capabilities for vulnerable families",
  "Greater readiness and confidence for self-employment",
  "Strengthened small-scale livelihood and production activities",
  "Increased financial literacy and digital capability",
  "Improved access to local markets and support networks",
  "Greater participation of women and youth in local economies",
  "Increased economic resilience, dignity and self-reliance",
];

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">{label}</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">{title}</h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export default function LivelihoodDevelopment() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-[#07162c] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Livelihood Development Initiative"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-4 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-brand-orange" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link to="/programs/skills-development" className="hover:text-white transition-colors">
              Skills, Livelihoods &amp; Entrepreneurship
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-bold">Livelihood Development</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Initiative 02 • LDI
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Livelihood Development Initiative
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium mb-2">
              Creating Livelihoods. Strengthening Families. Building Self-Reliance.
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mb-6">
              Helping individuals and families in rural and underserved communities establish secure, dignified
              and sustainable sources of income by transforming local skills and resources into viable economic activities.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm cursor-pointer"
              >
                Partner With This Initiative
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Support Livelihood Toolkits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Objective */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  The Core Challenge
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  From Vulnerability to Economic Resilience
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    The Livelihood Development Initiative is an ISLAH programme focused on helping individuals
                    and families in rural and underserved communities develop sustainable and dignified sources of income.
                  </p>
                  <p>
                    For many communities, the challenge is not simply the absence of work, but limited access to skills,
                    productive opportunities, resources, markets, financial knowledge and support networks.
                  </p>
                  <p>
                    ISLAH seeks to address these interconnected barriers by supporting practical livelihood pathways
                    that build upon local skills, resources and economic opportunities.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="bg-[#f8faf8] border border-brand-green/20 rounded-xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full -mr-10 -mt-10" />
                  <div className="relative">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
                      Our Objective
                    </span>
                    <h3 className="text-xl font-bold text-brand-green-dark mb-4">
                      Connecting Skills to Practical Economy
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      The initiative aims to help people move from vulnerability towards greater economic resilience
                      by strengthening their ability to develop, access and sustain livelihood opportunities.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our approach connects skills and resources with practical economic activity—whether through
                      employment, self-employment, home-based work, small enterprises or locally relevant livelihood activities.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (7 Pillars) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Systemic Methodology"
              title="Our Approach"
              subtitle="Seven integrated steps guiding participants from initial assessment through micro-enterprise growth."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROACH_PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} delay={index * 0.05}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-lg bg-[#004724]/10 text-brand-green flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-extrabold text-slate-400 font-mono tracking-wider">
                          {pillar.num}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-brand-green-dark mb-2">{pillar.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Sectors */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Livelihood Sectors"
              title="Implementation Approach"
              subtitle="Depending on local needs and feasibility, the initiative supports a diverse array of dignified livelihood streams."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {IMPLEMENTATION_SECTORS.map((sector, index) => {
              const IconComp = sector.icon;
              return (
                <ScrollReveal key={sector.title} delay={index * 0.04}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{sector.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{sector.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The ISLAH Livelihood Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Progression Pathway
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                The ISLAH Livelihood Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Sustainable livelihoods are built through more than income alone. They require capability,
                opportunity, confidence, resilience and continued access to appropriate support.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {LIVELIHOOD_STAGES.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STEP {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{stage.label}</h3>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < LIVELIHOOD_STAGES.length - 1 && (
                    <div className="hidden lg:flex justify-end pt-3">
                      <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Target Communities
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Aim to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_POPULATION.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Expected Impact */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Measurable Progress
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {IMPACT_POINTS.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                        <TrendingUp className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Statement */}
      <section className="py-20 bg-[#004724] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Our Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Secure, Dignified &amp; Sustainable Livelihoods
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              To create pathways through which rural and underserved communities can build secure, dignified
              and sustainable livelihoods, enabling individuals and families to become more economically resilient and self-reliant.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “A sustainable livelihood is more than a source of income—it is a pathway to dignity, resilience and a better future.”
              </blockquote>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">— ISLAH</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Subpage Navigation */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/programs/skills-development/skills-employability"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Skills &amp; Employability Programme (SEP)
          </Link>
          <Link
            to="/programs/skills-development/rural-entrepreneurship"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Rural Entrepreneurship Initiative (REI)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />

      {modalRole && (
        <RoleFormModal
          isOpen={true}
          role={modalRole}
          onClose={() => setModalRole(null)}
          title={`Support Livelihood Development Initiative`}
        />
      )}
    </div>
  );
}
