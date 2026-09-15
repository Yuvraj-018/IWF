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
  ArrowRight,
  Trees,
  Leaf,
  Droplets,
  Recycle,
  Sparkles,
  Sun,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Users,
  Building,
  GraduationCap,
  Globe,
  Compass,
  Sprout,
  Wind,
  HeartHandshake,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_CHALLENGES = [
  {
    num: "01",
    title: "Water Scarcity & Depletion",
    desc: "Unregulated extraction, unpredictable monsoons, and vanishing village water bodies threaten agricultural viability and domestic water security.",
  },
  {
    num: "02",
    title: "Land Degradation & Soil Erosion",
    desc: "Loss of topsoil organic matter, chemical over-fertilization, and unsustainable tillage reduce agricultural yield and ecological stability.",
  },
  {
    num: "03",
    title: "Waste & Plastic Accumulation",
    desc: "Rapid influx of non-biodegradable plastics and lack of rural waste segregation result in open burning, blocked drainage, and soil toxicity.",
  },
  {
    num: "04",
    title: "Loss of Green Cover",
    desc: "Deforestation, infrastructure expansion, and unregulated felling strip villages of natural windbreaks, shaded microclimates, and tree biodiversity.",
  },
  {
    num: "05",
    title: "Biodiversity & Pollinator Decline",
    desc: "Destruction of native plant habitats, hedgerows, and beneficial insect populations disrupts natural pest suppression and agro-ecosystem balance.",
  },
  {
    num: "06",
    title: "Climate-Related Vulnerabilities",
    desc: "Increasing frequency of heatwaves, prolonged dry spells, unseasonal rains, and weather anomalies directly impact vulnerable agrarian families.",
  },
];

const APPROACH_PILLARS = [
  {
    num: "01",
    title: "Environmental Awareness",
    desc: "Building deep understanding of environmental challenges and encouraging responsible habits among communities, children, youth, women, and farmers.",
    icon: Globe,
  },
  {
    num: "02",
    title: "Clean & Green Communities",
    desc: "Promoting clean surroundings, responsible waste practices, reduction of litter and plastic pollution, and developing greener public village spaces.",
    icon: Recycle,
  },
  {
    num: "03",
    title: "Trees & Green Cover",
    desc: "Encouraging tree plantation, nurturing tree survival, community greening, and greater appreciation of the ecological and social value of vegetation.",
    icon: Trees,
  },
  {
    num: "04",
    title: "Sustainable Rural Development",
    desc: "Connecting environmental sustainability with agriculture, diversified livelihoods, community infrastructure, and long-term rural resilience.",
    icon: Compass,
  },
];

const INITIATIVES = [
  {
    num: "01",
    abbr: "EAP",
    title: "Environmental Awareness Programme",
    desc: "Building environmental literacy, climate awareness, and community responsibility to understand, value, and protect local natural ecosystems.",
    href: "/programs/environment/environmental-awareness",
    icon: Globe,
    tag: "Awareness & Literacy",
  },
  {
    num: "02",
    abbr: "GCC",
    title: "Green Village & Clean Community Initiative",
    desc: "Promoting cleaner, greener and healthier rural settlements through community clean-up drives, plastic elimination, and waste segregation.",
    href: "/programs/environment/green-village-clean-community",
    icon: Recycle,
    tag: "Cleanliness & Sanitation",
  },
  {
    num: "03",
    abbr: "TPCG",
    title: "Tree Plantation & Community Greening Programme",
    desc: "Promoting community-led plantation of native trees, long-term post-plantation care, school eco-nurseries, and shared green public spaces.",
    href: "/programs/environment/tree-plantation-greening",
    icon: Trees,
    tag: "Greenery & Biodiversity",
  },
  {
    num: "04",
    abbr: "SRD",
    title: "Sustainable Rural Development Programme",
    desc: "Unifying natural resource stewardship, resilient rural livelihoods, water security, and eco-friendly village enterprises under a common framework.",
    href: "/programs/environment/sustainable-rural-development",
    icon: Compass,
    tag: "Resilience & Livelihoods",
  },
];

const RURAL_FOCUS_STEPS = [
  { step: "01", title: "Healthy Environment", desc: "Clean air, fertile soil, restored water bodies, and flourishing native vegetation" },
  { step: "02", title: "Protected Natural Resources", desc: "Responsible stewardship of groundwaters, forests, and communal pasture lands" },
  { step: "03", title: "Sustainable Livelihoods", desc: "Eco-friendly farming, allied enterprises, and green rural trade skills" },
  { step: "04", title: "Stronger Communities", desc: "Participatory village committees, women's groups, and active youth eco-clubs" },
  { step: "05", title: "Greater Rural Resilience", desc: "Autonomous capability to withstand climate disruptions and ecological shocks" },
];

const IMPLEMENTATION_MODULES = [
  { icon: Globe, title: "Environmental Education & Awareness", desc: "Interactive community seminars, audio-visual storytelling, and folk outreach on ecological protection." },
  { icon: Droplets, title: "Water Conservation & Stewardship", desc: "Rainwater harvesting orientation, check-dam maintenance, pond desilting, and micro-irrigation advocacy." },
  { icon: Trees, title: "Tree Plantation & Green Cover", desc: "Native species planting drives across schools, roadsides, temple grounds, and community commons." },
  { icon: Sprout, title: "Sustainable Land & Soil Practices", desc: "Organic mulching, composting, contour bunding, and prevention of soil nutrient depletion." },
  { icon: Recycle, title: "Waste Management & Plastic Reduction", desc: "Village waste segregation, promotion of cloth alternatives, and community clean-up campaigns." },
  { icon: Leaf, title: "Biodiversity & Ecosystem Awareness", desc: "Documenting local flora and fauna, bird conservation, and protecting native pollinator habitats." },
  { icon: Sparkles, title: "Clean & Green Rural Communities", desc: "Participatory village sanitation drives, whitewashing, open drain clearing, and community flowerbeds." },
  { icon: Sun, title: "Climate Awareness & Local Resilience", desc: "Educating smallholders on weather alerts, seasonal risk buffers, and drought-tolerant cropping." },
  { icon: Compass, title: "Sustainable Agriculture Promotion", desc: "Connecting eco-friendly practices with farmer training and low-chemical cultivation inputs." },
  { icon: TrendingUp, title: "Green Skills & Sustainable Livelihoods", desc: "Vocational training in solar repairs, vermicomposting, organic seed saving, and eco-packaging." },
  { icon: Users, title: "Community Volunteering & Green Clubs", desc: "Mobilizing youth groups and rural school children as certified local Environmental Champions." },
  { icon: HeartHandshake, title: "Sustainable Rural Development Projects", desc: "Holistic village adoption for integrated resource planning and multi-stakeholder partnerships." },
];

const TARGET_PARTICIPANTS = [
  "Rural households dependent on land, water, and forests",
  "Children, school students, and youth eco-club members",
  "Women's Self-Help Groups (SHGs) and local village leaders",
  "Small and marginal farmers facing climate uncertainties",
  "Schools, colleges, and rural educational institutions",
  "Local village Panchayats and community-based organisations",
  "Environmental volunteers and grassroots green advocates",
  "Rural artisans and small producers adopting eco-materials",
];

const IMPACT_OUTCOMES = [
  "Greater environmental awareness and active ecological literacy across rural villages",
  "More responsible, measured stewardship of community natural water and soil resources",
  "Increased community participation in grassroots environmental conservation and planting",
  "Cleaner, litter-free, and greener village surroundings and public common spaces",
  "Greater awareness and measurable reduction of single-use plastics and open dumping",
  "Improved community understanding of traditional and modern water conservation",
  "Greater appreciation, care, and protection for native trees and local biodiversity",
  "Stronger active environmental leadership and participation among rural women and youth",
  "Increased village preparedness and awareness of climate anomalies and extreme events",
  "Stronger, resilient integration between environmental protection and household livelihoods",
  "Lasting community ownership, pride, and self-reliance in local ecological sustainability",
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

export default function EnvironmentLanding() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#07162c] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Environment & Sustainable Development"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link to="/programs" className="hover:text-white transition-colors">
              Our Programs
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Environment &amp; Sustainable Development</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              What We Do • Sector 07
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Environment &amp; Sustainable Development
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Protecting Nature. Strengthening Rural Resilience. Building a Sustainable Future.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Connecting environmental responsibility with community participation, green cover expansion,
              plastic reduction, and sustainable rural livelihoods to build enduring ecological resilience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Partner for Green Villages
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Sponsor Tree Plantation Drives
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
                  Sector Overview
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Interconnected Nature &amp; Human Well-Being
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    A healthy environment is fundamental to healthy communities, sustainable livelihoods and a
                    resilient future. Rural communities depend closely on land, water, forests, biodiversity and other
                    natural resources for agriculture, livelihoods and everyday life.
                  </p>
                  <p>
                    At the same time, environmental challenges such as water scarcity, land degradation, waste and
                    pollution, loss of green cover, biodiversity decline and climate-related risks can increasingly affect
                    rural well-being and economic security.
                  </p>
                  <p>
                    Through its Environment &amp; Sustainable Development sector, ISLAH Welfare Foundation seeks to promote
                    greater environmental awareness, responsible use of natural resources, cleaner communities and sustainable
                    rural development. Our approach connects environmental responsibility with community participation,
                    sustainable livelihoods and resilience, recognising that protecting nature and improving human well-being
                    are closely interconnected.
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
                      Environmental Responsibility &amp; Rural Resilience
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To encourage environmentally responsible and sustainable development practices that help rural
                      communities understand environmental challenges, protect natural resources, improve their surroundings
                      and build greater resilience for the future.
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      Focusing on practical, community-centred approaches adapted to local environmental and social conditions.
                    </p>
                    <div className="flex items-center gap-2 pt-4 text-xs font-bold text-brand-green">
                      <Trees className="w-4 h-4" />
                      <span>Awareness • Conservation • Community Action</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core Challenges */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Environmental Realities"
              title="Challenges We Address"
              subtitle="Addressing critical rural ecological pressures that threaten community health, water security, and rural livelihoods."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_CHALLENGES.map((challenge, index) => (
              <ScrollReveal key={challenge.num} delay={index * 0.05}>
                <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-red-50 text-red-600 font-mono text-xs font-bold flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">{challenge.num}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">{challenge.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{challenge.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach (4 Core Pillars) */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Strategic Framework"
              title="Our Approach"
              subtitle="Connecting environmental responsibility, clean living spaces, green canopy restoration, and balanced rural development."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPROACH_PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} delay={index * 0.05}>
                  <div className="bg-[#f9fbf9] rounded-xl border border-slate-200/80 p-6 hover:bg-white hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between h-full">
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

          {/* Core Sequence Ribbon */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 bg-brand-green-dark text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange block mb-1">
                  Core Continuity
                </span>
                <h4 className="text-lg font-bold text-white">The Environmental Development Continuum</h4>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
                <span className="bg-white/10 px-3.5 py-1.5 rounded-md">Awareness</span>
                <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="bg-white/10 px-3.5 py-1.5 rounded-md">Clean Community</span>
                <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="bg-white/10 px-3.5 py-1.5 rounded-md">Green Cover</span>
                <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="bg-brand-orange text-white px-3.5 py-1.5 rounded-md font-bold">
                  Sustainable Development
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Action Programmes"
              title="Key Initiatives"
              subtitle="Explore our four dedicated programmes spanning ecological literacy, community cleanliness, tree stewardship, and sustainable village development."
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {INITIATIVES.map((init, index) => {
              const IconComp = init.icon;
              return (
                <ScrollReveal key={init.num} delay={index * 0.05}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-8 hover:shadow-lg hover:border-brand-green/40 transition-all flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                          Initiative {init.num} • {init.abbr}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-green transition-colors">
                          {init.tag}
                        </span>
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-brand-green-dark group-hover:text-brand-green transition-colors">
                            {init.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">{init.desc}</p>
                    </div>

                    <Link
                      to={init.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors pt-4 border-t border-slate-100"
                    >
                      <span>Explore Initiative Programme Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Rural Environmental Focus (Flow Sequence) */}
      <section className="py-20 bg-[#0b1f3b] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Ecological Framework
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Rural Environmental Focus
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Environmental sustainability is particularly crucial in rural areas because communities depend directly
                on agriculture, water, soil, livestock, and forest ecosystems for survival.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {RURAL_FOCUS_STEPS.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-orange mb-2 block">
                      STAGE {stage.step}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{stage.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < RURAL_FOCUS_STEPS.length - 1 && (
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

      {/* Implementation Approach (12 Modules) */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Field Operations"
              title="Implementation Approach"
              subtitle="Concrete, participatory interventions in education, water management, tree planting, waste segregation, and local green livelihoods."
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

      {/* Target Beneficiaries & Expected Impact */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Stakeholders
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Engage
                </h2>
                <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 shadow-sm">
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
                  Enduring Outcomes
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-white border border-brand-green/20 rounded-xl p-6 sm:p-8 shadow-sm">
                  <ul className="space-y-3.5">
                    {IMPACT_OUTCOMES.map((outcome) => (
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

      {/* Vision & Commitment */}
      <section className="py-20 bg-[#004724] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Our Vision &amp; Commitment
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-6 leading-snug">
              Cleaner. Greener. Healthier. More Resilient Rural Communities.
            </h2>
            <p className="text-white/85 text-base leading-relaxed max-w-3xl mx-auto mb-8">
              ISLAH believes that sustainable development is not simply about protecting nature—it is about creating
              a balanced relationship between people, environment, natural resources and sustainable livelihoods.
              Our commitment is to promote environmental responsibility through education, community action, conservation,
              and practical local solutions.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Protecting the environment is not only about saving nature. It is about protecting the resources, livelihoods and future of the communities that depend upon it.”
              </blockquote>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">— ISLAH</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Support / Partner CTA */}
      <section className="py-16 bg-[#07162c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Join Our Environmental &amp; Green Village Mission
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
              Whether you are an environmental organisation, CSR foundation, educational institution, or community volunteer,
              partner with ISLAH to plant trees, clean village surroundings, and foster sustainable rural development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                Partner with Environmental Sector
              </button>
              <button
                onClick={() => setModalRole("volunteer")}
                className="border border-white/30 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Volunteer for Plantation &amp; Cleanups
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {modalRole && (
        <RoleFormModal
          isOpen={true}
          role={modalRole}
          onClose={() => setModalRole(null)}
          title={`Support Environment & Sustainable Development`}
        />
      )}
    </div>
  );
}
