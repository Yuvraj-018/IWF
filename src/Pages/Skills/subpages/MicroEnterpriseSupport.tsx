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
  Rocket,
  Lightbulb,
  FileCheck,
  Calculator,
  Smartphone,
  Store,
  Users,
  CheckCircle2,
  TrendingUp,
  Scissors,
  Palette,
  Utensils,
  ShoppingBag,
  Wrench,
  Sparkles,
  Laptop,
  Wheat,
  FolderKanban,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_skills_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Enterprise & Self-Employment Awareness",
    desc: "Creating awareness about micro-enterprises, home-based businesses, local services and self-employment opportunities.",
  },
  {
    num: "02",
    icon: FolderKanban,
    title: "Business Idea Development",
    desc: "Helping participants identify feasible business ideas based on their skills, interests, local resources, community needs and market opportunities.",
  },
  {
    num: "03",
    icon: FileCheck,
    title: "Start-up Readiness",
    desc: "Building practical knowledge around basic business planning, initial investment requirements, costing, pricing and operational planning.",
  },
  {
    num: "04",
    icon: Calculator,
    title: "Business Management Skills",
    desc: "Developing capabilities in record keeping, cash-flow awareness, customer management, purchasing, inventory and day-to-day business operations.",
  },
  {
    num: "05",
    icon: Smartphone,
    title: "Financial & Digital Capability",
    desc: "Promoting financial literacy, responsible money management, banking awareness, digital payments and appropriate digital tools for business.",
  },
  {
    num: "06",
    icon: Store,
    title: "Market & Customer Linkages",
    desc: "Where feasible, helping entrepreneurs understand local markets and connect with customers, businesses, producer groups and relevant networks.",
  },
  {
    num: "07",
    icon: Users,
    title: "Mentorship & Enterprise Strengthening",
    desc: "Providing guidance, where feasible, to help emerging entrepreneurs address challenges, improve their practices and build more sustainable enterprises.",
  },
];

const SUPPORT_DOMAINS = [
  { icon: Home, title: "Home-Based Enterprises", desc: "Flexible home workshops, artisanal crafting, specialty catering and household goods production." },
  { icon: Scissors, title: "Tailoring & Garment Work", desc: "Custom apparel tailoring, alteration counters, school uniform stitching and textile works." },
  { icon: Palette, title: "Handicrafts & Traditional Crafts", desc: "Regional embroidery, bamboo & jute utility goods, sustainable décor and cultural souvenirs." },
  { icon: Utensils, title: "Food Processing & Micro-Units", desc: "Snack manufacturing, flour & spice blending, hygienic packaging and local confectioneries." },
  { icon: ShoppingBag, title: "Retail & Neighborhood Services", desc: "Corner convenience stalls, seasonal produce distribution, hardware and household goods retailing." },
  { icon: Wrench, title: "Repair & Technical Services", desc: "Mobile phone repair, household electrical services, bicycle/two-wheeler maintenance and plumbing." },
  { icon: Sparkles, title: "Beauty & Wellness Services", desc: "Home grooming, neighborhood beauty parlours, henna/bridal services and wellness care." },
  { icon: Laptop, title: "Digital & Tech-Enabled Desks", desc: "E-governance document kiosks, online bill payments, printing desks and digital services." },
  { icon: Wheat, title: "Agriculture & Allied Enterprises", desc: "Dairy cattle rearing, organic inputs, backyard poultry, nursery saplings and vermiculture." },
  { icon: Rocket, title: "Locally Relevant Micro-Enterprises", desc: "Tailored micro-enterprises catering to unmet niche demands within local rural markets." },
];

const TARGET_PARTICIPANTS = [
  "Rural women and youth seeking economic self-determination",
  "Unemployed and underemployed individuals in semi-rural areas",
  "Aspiring grassroots micro-entrepreneurs needing incubation",
  "Existing small-scale entrepreneurs seeking enterprise formalization",
  "Members of Self-Help Groups (SHGs) looking for individual ventures",
  "Skilled artisans and tradespeople seeking self-employment",
  "Economically vulnerable households seeking diversified income sources",
];

const ENTERPRISE_STAGES = [
  { step: "01", label: "SKILL", desc: "Recognize & hone core practical capability or vocational trade" },
  { step: "02", label: "IDEA", desc: "Shape capability into a viable local micro-business proposition" },
  { step: "03", label: "PLAN", desc: "Calculate basic input costs, pricing model & startup logistics" },
  { step: "04", label: "START", desc: "Acquire basic tools, set up physical/home space & initiate work" },
  { step: "05", label: "MANAGE", desc: "Maintain daily transaction logs, quality standards & customer care" },
  { step: "06", label: "EARN", desc: "Secure stable weekly/monthly cash surplus for the family" },
  { step: "07", label: "GROW", desc: "Reinvest prudently, explore new customers & achieve resilience" },
];

const OUTCOME_MEASURES = [
  "Increased awareness of practical self-employment opportunities",
  "Improved enterprise readiness and foundational business capabilities",
  "Greater access to viable, dignified livelihood pathways",
  "Successful launch and strengthening of resilient micro-enterprises",
  "Improved digital banking literacy and contactless payment adoption",
  "Better understanding of localized market dynamics and customer needs",
  "Increased household income-generation and economic security",
  "Greater economic resilience, self-reliance and community dignity",
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

export default function MicroEnterpriseSupport() {
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
          alt="Micro-Enterprise Support & Market Linkages"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link to="/programs/skills-development" className="hover:text-white transition-colors">
              Skills, Livelihoods &amp; Entrepreneurship
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Micro-Enterprise Support</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 04 • MSES
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Micro-Enterprise &amp; Self-Employment Support
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Small Enterprise. Sustainable Income. Greater Independence.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Helping individuals and families in rural and underserved communities explore, establish
              and strengthen small-scale enterprises and self-employment opportunities to create sustainable income and dignity.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Partner With Micro-Enterprises
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Sponsor Self-Employment Kits
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
                  Practical Economic Independence
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Turning Skills &amp; Ideas into Viable Businesses
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    The Micro-Enterprise &amp; Self-Employment Support Initiative is an ISLAH programme designed to
                    help individuals and families in rural and underserved communities explore, establish and strengthen
                    small-scale enterprises and self-employment opportunities.
                  </p>
                  <p>
                    For many people, formal employment may not be readily accessible. Small businesses, home-based activities,
                    local services and micro-enterprises can provide practical pathways towards income generation and economic independence.
                  </p>
                  <p>
                    However, turning an idea or skill into a sustainable livelihood often requires business knowledge, planning,
                    financial awareness, market access and continued guidance. ISLAH seeks to help bridge these gaps through practical
                    capacity building, mentorship and appropriate opportunity linkages.
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
                      Moving from Skills to Sustainable Income
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      The initiative aims to support individuals who wish to start a small enterprise, strengthen
                      an existing activity or develop self-employment as a livelihood pathway.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our approach focuses on helping people move from skills and ideas to viable economic activity
                      and sustainable income.
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
              label="Support Framework"
              title="Our Approach"
              subtitle="Seven integrated steps empowering individuals to launch, operate and stabilize their small enterprises."
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
              label="Enterprise Typologies"
              title="Implementation Approach"
              subtitle="Depending on local needs and feasibility, support extends across a wide spectrum of self-employment and micro-ventures."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SUPPORT_DOMAINS.map((domain, index) => {
              const IconComp = domain.icon;
              return (
                <ScrollReveal key={domain.title} delay={index * 0.03}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{domain.title}</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{domain.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The ISLAH Enterprise Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Lifecycle Framework
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                The ISLAH Enterprise Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                The objective is not simply to encourage people to start small businesses, but to help them
                develop the capability, confidence and practical knowledge needed to sustain and gradually strengthen their livelihood activities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {ENTERPRISE_STAGES.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STAGE {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{stage.label}</h3>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < ENTERPRISE_STAGES.length - 1 && (
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

      {/* Target Beneficiaries & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Community Groups
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Aim to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_PARTICIPANTS.map((item) => (
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
                  Sustainable Impact
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {OUTCOME_MEASURES.map((outcome) => (
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

      {/* Vision & Quote */}
      <section className="py-20 bg-[#004724] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Our Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Sustainable Micro-Enterprises &amp; Dignified Self-Employment
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              To enable individuals in rural and underserved communities to turn skills, ideas and local
              opportunities into sustainable micro-enterprises and dignified self-employment, contributing to stronger
              livelihoods and greater economic independence.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “A small enterprise can create more than income—it can create confidence, dignity and a pathway towards self-reliance.”
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
            to="/programs/skills-development/rural-entrepreneurship"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Rural Entrepreneurship Initiative (REI)
          </Link>
          <Link
            to="/programs/skills-development"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Back to Skills, Livelihoods &amp; Entrepreneurship
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
          title={`Support Micro-Enterprise & Self-Employment`}
        />
      )}
    </div>
  );
}
