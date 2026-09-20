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
  Globe,
  Droplets,
  Recycle,
  Leaf,
  Sun,
  Heart,
  BookOpen,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: BookOpen,
    title: "Environmental Education",
    desc: "Creating simple, engaging and practical awareness about nature, natural resource cycles, pollution, climate change and sustainable living.",
  },
  {
    num: "02",
    icon: Droplets,
    title: "Water & Resource Awareness",
    desc: "Promoting responsible, mindful use and community conservation of precious groundwater, ponds, rivers, soil fertility and natural commons.",
  },
  {
    num: "03",
    icon: Recycle,
    title: "Waste & Pollution Awareness",
    desc: "Building widespread awareness about source waste reduction, segregation, recycling, plastic pollution perils, and clean village surroundings.",
  },
  {
    num: "04",
    icon: Leaf,
    title: "Nature & Biodiversity",
    desc: "Helping communities understand the vital importance of trees, native vegetation, wildlife, pollinator insects and healthy local ecosystems.",
  },
  {
    num: "05",
    icon: Sun,
    title: "Climate Awareness",
    desc: "Improving grassroots community understanding of climate-related risks, changing seasonal patterns, resilience, and adaptive farming practices.",
  },
  {
    num: "06",
    icon: Heart,
    title: "Responsible Living",
    desc: "Encouraging practical, environmentally responsible habits and energy-saving measures at household, school, farm, and community levels.",
  },
];

const IMPLEMENTATION_MODULES = [
  { icon: Globe, title: "Community Environmental Campaigns", desc: "Interactive village gatherings, folk theatre, and awareness marches highlighting local ecological challenges." },
  { icon: BookOpen, title: "Environmental Education Sessions", desc: "Structured learning modules for youth and adults on ecological balance, natural resource conservation, and pollution control." },
  { icon: Sparkles, title: "School & Youth Eco-Clubs", desc: "Nurturing children as young eco-warriors through painting contests, tree planting, nature walks, and green science experiments." },
  { icon: Users, title: "Village-Level Awareness Meetings", desc: "Open discussions with panchayat leaders, elders, and farmers on managing local water bodies and grazing lands." },
  { icon: Sun, title: "Observance & Outreach Days", desc: "Mobilizing mass community participation on World Environment Day, Earth Day, Water Day, and Wildlife Week." },
  { icon: Droplets, title: "Water & Natural-Resource Drives", desc: "Educating families on rainwater harvesting, avoiding wasteful consumption, and protecting drinking water sources." },
  { icon: Recycle, title: "Waste & Plastic-Reduction Drives", desc: "Demonstrations on segregating wet vs. dry waste, composting biodegradable scraps, and ending single-use polythene." },
  { icon: Leaf, title: "Biodiversity & Nature Activities", desc: "Documenting native trees, birds, and beneficial pollinator species to cultivate love and respect for indigenous ecology." },
  { icon: TrendingUp, title: "Climate-Awareness Orientations", desc: "Sharing actionable advice on weather forecasting, heatwave precautions, and crop insurance protections." },
  { icon: BookOpen, title: "Knowledge Materials & Guides", desc: "Publishing easy-to-read illustrated booklets, posters, and vernacular audio messages on eco-friendly living." },
  { icon: Heart, title: "Community Volunteering Drives", desc: "Training grassroots environmental volunteers to lead local cleanups, sapling protection, and pond monitoring." },
];

const TARGET_PARTICIPANTS = [
  "Rural households dependent on land, water, and forests",
  "Children, primary students, and rural adolescent youth",
  "Women's Self-Help Groups and neighborhood collectives",
  "Farmers seeking climate-resilient practices",
  "Schools, madrasas, and rural educational institutions",
  "Local village panchayats and grassroots civic leaders",
  "Community-based organisations and social workers",
  "Volunteers, university interns, and passionate green advocates",
];

const ACTION_PATHWAY = [
  { step: "01", label: "LEARN", tag: "Basic Ecology", desc: "Discover environmental fundamentals, water cycles, and local biodiversity." },
  { step: "02", label: "UNDERSTAND", tag: "Cause & Effect", desc: "Recognize how human actions, plastic, and waste directly affect health and soil." },
  { step: "03", label: "CARE", tag: "Empathy & Pride", desc: "Cultivate genuine stewardship and collective responsibility for village surroundings." },
  { step: "04", label: "PARTICIPATE", tag: "Community Action", desc: "Join school eco-clubs, clean-up drives, and village water conservation sessions." },
  { step: "05", label: "ACT", tag: "Responsible Habits", desc: "Segregate household waste, plant trees, save water, and eliminate polythene bags." },
  { step: "06", label: "SUSTAIN", tag: "Lifelong Culture", desc: "Embed inter-generational eco-conscious values across family and community life." },
];

const EXPECTED_IMPACTS = [
  "Substantially heightened environmental literacy and eco-consciousness across villages",
  "Increased awareness and active discussion of localized ecological challenges",
  "More measured, responsible stewardship of scarce water and natural resources",
  "Significant reduction in littering, open burning, and plastic accumulation",
  "Greater understanding and preservation of native flora, fauna, and biodiversity",
  "Broadened community participation in green volunteer campaigns and cleanups",
  "Lifelong environmental values instilled in rural children and adolescent youth",
  "Stronger local community ownership and vigilance over village natural resources",
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

export default function EnvironmentalAwareness() {
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
          alt="Environmental Awareness Programme"
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
            <Link to="/programs/environment" className="hover:text-white transition-colors">
              Environment &amp; Sustainable Development
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-bold">Environmental Awareness</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Initiative 01 • EAP
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Environmental Awareness Programme
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium mb-2">
              Understanding Our Environment. Inspiring Responsible Action.
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mb-6">
              Transforming ecological knowledge into responsible everyday behavior and community action across
              rural homes, schools, farms, and public commons.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalRole("volunteer")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm cursor-pointer"
              >
                Volunteer for Awareness Drives
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Sponsor Eco-Club Kits
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
                  Knowledge into Action
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Accessible, Practical Ecological Literacy
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Environmental sustainability begins with awareness. Rural communities depend closely on land,
                    water, agriculture, forests, biodiversity and other natural resources, yet environmental issues
                    are often not fully understood or discussed at the community level.
                  </p>
                  <p>
                    The Environmental Awareness Programme of ISLAH seeks to make environmental knowledge accessible,
                    practical and relevant to rural communities.
                  </p>
                  <p>
                    Through awareness campaigns, educational activities, community discussions and participatory programmes,
                    ISLAH aims to encourage people to understand environmental challenges and take responsible action
                    in their homes, schools, farms and communities.
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
                      Strengthening Grassroots Awareness
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To strengthen environmental awareness and encourage responsible environmental behaviour among rural
                      communities, children, youth, women, farmers and community groups.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Globe className="w-4 h-4" />
                      <span>Learn • Care • Participate • Act</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (6 Pillars) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Core Curriculum"
              title="Our Approach"
              subtitle="Covering foundational concepts in resource conservation, biodiversity, waste reduction, and climate preparedness."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROACH_PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} delay={index * 0.05}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-lg bg-[#004724]/10 text-brand-green flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">{pillar.num}</span>
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

      {/* Implementation Modules */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Interactive Formats"
              title="Implementation Approach"
              subtitle="Community campaigns, school clubs, water marches, plastic segregation workshops, and vernacular guides."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {IMPLEMENTATION_MODULES.map((mod, index) => {
              const IconComp = mod.icon;
              return (
                <ScrollReveal key={mod.title} delay={index * 0.03}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{mod.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{mod.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awareness to Action Pathway (6 Steps) */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Behavioral Transformation
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Awareness-to-Action Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Environmental awareness should go far beyond static lectures. Our goal is to guide rural communities
                from understanding to active empathy, individual practice, and collective village stewardship.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {ACTION_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STEP {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < ACTION_PATHWAY.length - 1 && (
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
                  Participants
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Engage
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
                  Measured Progress
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
              Our Commitment
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Transforming Knowledge into Responsible Action
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH believes that environmental awareness should go beyond information. Our goal is to help
              communities transform knowledge into responsible behaviour and collective action that sustains the planet.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Awareness is the first step towards protecting the environment we depend upon.”
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
            to="/programs/environment"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Sector Overview: Environment &amp; Sustainable Development
          </Link>
          <Link
            to="/programs/environment/green-village-clean-community"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Green Village &amp; Clean Community (GCC)
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
          title={`Support Environmental Awareness Programme`}
        />
      )}
    </div>
  );
}
