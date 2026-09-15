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
  Wrench,
  Laptop,
  Briefcase,
  Users,
  Compass,
  Store,
  Network,
  CheckCircle2,
  TrendingUp,
  FileText,
  Sparkles,
  Scissors,
  Palette,
  ShoppingBag,
  Cpu,
  GraduationCap,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_skills_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Wrench,
    title: "Market-Relevant Skills",
    desc: "Promoting practical skills based on local opportunities, participant interests and evolving employment needs.",
  },
  {
    num: "02",
    icon: Users,
    title: "Employability Skills",
    desc: "Developing communication, teamwork, problem-solving, workplace behaviour, time management and professional confidence.",
  },
  {
    num: "03",
    icon: Laptop,
    title: "Digital Capability",
    desc: "Building basic digital and computer skills that can support education, employment, entrepreneurship and access to opportunities.",
  },
  {
    num: "04",
    icon: FileText,
    title: "Job Readiness",
    desc: "Supporting participants with CV preparation, interview skills, workplace awareness and practical preparation for employment.",
  },
  {
    num: "05",
    icon: Compass,
    title: "Career Awareness",
    desc: "Helping participants understand different employment, training and livelihood pathways and the capabilities required for them.",
  },
  {
    num: "06",
    icon: Store,
    title: "Entrepreneurship & Self-Employment",
    desc: "Introducing self-employment and entrepreneurship as alternative livelihood pathways for individuals with appropriate skills, interests and aspirations.",
  },
  {
    num: "07",
    icon: Network,
    title: "Opportunity & Market Linkages",
    desc: "Where feasible, facilitating connections with employers, businesses, training institutions, entrepreneurs and relevant opportunity networks.",
  },
];

const IMPLEMENTATION_DOMAINS = [
  { icon: Laptop, title: "Digital & Computer Skills", desc: "Foundational computer literacy, office software, internet research and basic digital operations." },
  { icon: Briefcase, title: "Office & Administrative Skills", desc: "Data entry, basic record keeping, documentation, filing and organizational support." },
  { icon: ShoppingBag, title: "Retail & Service-Sector Skills", desc: "Customer service, retail desk handling, inventory management and store operations." },
  { icon: Scissors, title: "Tailoring & Garment Skills", desc: "Cutting, stitching, pattern drafting, alteration and finished garment manufacturing." },
  { icon: Sparkles, title: "Beauty & Wellness Services", desc: "Personal grooming, skincare, beauty care techniques and self-employed salon services." },
  { icon: Palette, title: "Handicrafts & Small Production", desc: "Traditional crafts, local artisan items, sustainable packaging and handmade goods." },
  { icon: Store, title: "Food Processing & Allied Activities", desc: "Hygienic preservation, grinding, baking, packaging and food trade standards." },
  { icon: TrendingUp, title: "Basic Entrepreneurship Skills", desc: "Costing, pricing, cash flow tracking, customer management and micro-business planning." },
  { icon: Users, title: "Communication & Workplace Skills", desc: "Spoken clarity, professional etiquette, team collaboration and workplace readiness." },
  { icon: Cpu, title: "Locally Relevant Livelihood Skills", desc: "Demand-driven trades and technical capabilities matched to regional economic opportunities." },
];

const TARGET_AUDIENCE = [
  "Rural and underserved youth seeking sustainable livelihoods",
  "School and college graduates preparing for modern work environments",
  "First-time job seekers needing workplace orientation",
  "Unemployed and underemployed individuals seeking career transitions",
  "Women seeking dignified, independent livelihood opportunities",
  "Economically vulnerable households requiring stable income",
  "Individuals interested in self-employment and micro-entrepreneurship",
];

const EMPLOYABILITY_PATHWAY = [
  { step: "01", label: "LEARN", desc: "Acquire relevant skills, knowledge & foundational capabilities" },
  { step: "02", label: "DEVELOP", desc: "Practical hands-on training, workshop practice & trade mastery" },
  { step: "03", label: "PREPARE", desc: "Workplace etiquette, CV drafting, digital awareness & interview readiness" },
  { step: "04", label: "CONNECT", desc: "Linkages with employers, markets, institutions & mentors" },
  { step: "05", label: "WORK", desc: "Entering employment, home-based production or self-employment" },
  { step: "06", label: "GROW", desc: "Sustained earning, career progression, dignity & community resilience" },
];

const EXPECTED_IMPACTS = [
  "Improved practical and employment-oriented skills",
  "Greater workplace readiness and confidence",
  "Improved digital and professional capabilities",
  "Better awareness of career and livelihood opportunities",
  "Increased readiness for employment and self-employment",
  "Greater entrepreneurial awareness",
  "Stronger connections with relevant opportunity networks",
  "Progress towards sustainable livelihoods and self-reliance",
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

export default function SkillsEmployability() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-[#07162c] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Skills & Employability Programme"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link to="/programs/skills-development" className="hover:text-white transition-colors">
              Skills, Livelihoods &amp; Entrepreneurship
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Skills &amp; Employability</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 01 • SEP
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Skills &amp; Employability Programme
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Building Skills. Creating Opportunity. Enabling Sustainable Livelihoods.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Equipping young people and economically vulnerable communities in rural and underserved areas
              with practical, market-relevant and employment-oriented capabilities to bridge the gap between learning and earning.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Partner With This Initiative
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Sponsor a Training Batch
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
                  Context &amp; Background
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Bridging the Gap Between Learning &amp; Earning
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    The Skills &amp; Employability Programme is an ISLAH initiative designed to equip young people
                    and economically vulnerable communities in rural and underserved areas with practical, relevant
                    and employment-oriented skills.
                  </p>
                  <p>
                    Education can open the door to opportunity, but employability also depends on practical capabilities,
                    confidence, communication, digital awareness and the ability to adapt to changing workplace requirements.
                  </p>
                  <p>
                    ISLAH seeks to bridge the gap between learning and livelihood by helping participants develop skills
                    that can be applied in employment, self-employment and everyday economic life.
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
                      Moving from Potential to Preparedness
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      The programme aims to help individuals move from potential to preparedness—developing the
                      practical and professional capabilities needed to pursue meaningful work and build sustainable livelihood pathways.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our focus is not limited to training alone. We seek to connect skills with employability,
                      opportunity and self-reliance.
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
              label="Strategic Framework"
              title="Our Approach"
              subtitle="Seven strategic pillars that connect classroom instruction with practical economic activity and career advancement."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROACH_AREAS.map((pillar, index) => {
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

      {/* Implementation Domains */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Curriculum &amp; Trades"
              title="Implementation Approach"
              subtitle="Depending on local needs and available resources, the programme facilitates market-oriented vocational and livelihood skills."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {IMPLEMENTATION_DOMAINS.map((domain, index) => {
              const IconComp = domain.icon;
              return (
                <ScrollReveal key={domain.title} delay={index * 0.04}>
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

      {/* Employability Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Progression Architecture
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                The ISLAH Employability Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Meaningful skill development should lead beyond the classroom. The goal is to help people
                apply what they learn, access opportunity and build a sustainable livelihood.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {EMPLOYABILITY_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.06}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-brand-orange">STAGE {stage.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{stage.label}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < EMPLOYABILITY_PATHWAY.length - 1 && (
                    <div className="hidden lg:flex justify-end pt-4">
                      <ArrowRight className="w-4 h-4 text-white/30" />
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
                  Focus Groups
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Aim to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_AUDIENCE.map((item) => (
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
                  Measurable Outcomes
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {EXPECTED_IMPACTS.map((outcome) => (
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
              Creating Dignified Work &amp; Sustainable Futures
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              To create pathways through which rural and underserved communities can acquire relevant skills,
              develop confidence and access opportunities for dignified work, entrepreneurship and sustainable livelihoods.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Skills create capability. Employability creates opportunity. Opportunity creates a pathway to self-reliance.”
              </blockquote>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">— ISLAH</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Navigation to other initiatives */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/programs/skills-development"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Skills, Livelihoods &amp; Entrepreneurship
          </Link>
          <Link
            to="/programs/skills-development/livelihood-development"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Livelihood Development Initiative (LDI)
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
          title={`Partner with Skills & Employability Programme`}
        />
      )}
    </div>
  );
}
