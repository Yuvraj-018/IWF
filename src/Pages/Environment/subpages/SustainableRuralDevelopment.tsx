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
  Layers,
  Droplets,
  Sun,
  Sparkles,
  Users,
  Target,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Leaf,
  Trees,
  Recycle,
  HeartHandshake,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Droplets,
    title: "Sustainable Natural Resource Management",
    desc: "Promoting responsible, equitable use and long-term conservation of communal land, groundwater, soils, and natural village vegetation.",
  },
  {
    num: "02",
    icon: Briefcase,
    title: "Resilient Rural Livelihoods",
    desc: "Connecting ecological sustainability directly with farm diversification, agro-allied vocations, green craft skills, and micro-enterprises.",
  },
  {
    num: "03",
    icon: Sun,
    title: "Climate Resilience",
    desc: "Building frontline community awareness and adaptive capacities to withstand seasonal droughts, erratic rainfall, and weather shocks.",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "Sustainable Communities",
    desc: "Developing cleaner, greener, and environmentally responsible village habitats with active waste segregation and protected commons.",
  },
  {
    num: "05",
    icon: Users,
    title: "Inclusive Participation",
    desc: "Actively mobilizing women, smallholder farmers, marginalized families, and youth to co-design and lead local development plans.",
  },
  {
    num: "06",
    icon: Target,
    title: "Local Solutions",
    desc: "Prioritizing pragmatic, affordable, and culturally rooted technologies adapted to indigenous socio-economic and agro-ecological conditions.",
  },
];

const DEVELOPMENT_MODEL_TIERS = [
  { tier: "01", name: "PEOPLE", tag: "Human Dignity & Inclusion", desc: "Community well-being, equal gender participation, health, and social equity." },
  { tier: "02", name: "RESOURCES", tag: "Natural Wealth Conservation", desc: "Mindful, equitable stewardship of water aquifers, topsoils, seeds, and forests." },
  { tier: "03", name: "LIVELIHOODS", tag: "Economic Opportunities", desc: "Sustainable agriculture, green vocations, value addition, and local markets." },
  { tier: "04", name: "ENVIRONMENT", tag: "Ecological Restoration", desc: "Protection of native biodiversity, tree canopies, and living ecosystems." },
  { tier: "05", name: "RESILIENCE", tag: "Enduring Future", desc: "Self-reliant, prepared village communities flourishing across generations." },
];

const IMPLEMENTATION_MODULES = [
  { icon: Leaf, title: "Sustainable Agriculture & Resource Stewardship", desc: "Advocating soil organic enrichment, natural pest suppression, and indigenous seed conservation." },
  { icon: Droplets, title: "Community Water Conservation", desc: "Revitalizing village ponds, check-dams, rooftop harvesting, and micro-irrigation systems." },
  { icon: Compass, title: "Grassroots Environmental Education", desc: "Village seminars, farmer field orientations, and youth environmental leadership training." },
  { icon: Sparkles, title: "Clean & Green Village Infrastructure", desc: "Supporting decentralized composting, community dustbins, and tree-lined village avenues." },
  { icon: Trees, title: "Community Greening & Afforestation", desc: "Planting native multi-purpose tree species on degraded commons and grazing pasture lands." },
  { icon: Recycle, title: "Waste Management & Plastic Mitigation", desc: "Eliminating open burning of village garbage and developing rural recycling linkages." },
  { icon: Sun, title: "Climate Resilience & Adaptation Planning", desc: "Setting up participatory village climate taskforces and weather alert advisory desks." },
  { icon: Briefcase, title: "Green Skills & Sustainable Livelihoods", desc: "Vocational courses in solar installation, organic input production, and bio-waste processing." },
  { icon: TrendingUp, title: "Rural Micro-Enterprise Incubation", desc: "Supporting self-help group collectives in agro-processing, herbal products, and eco-packaging." },
  { icon: Users, title: "Women & Youth Community Leadership", desc: "Empowering female gram panchayat members and youth clubs to govern local natural assets." },
  { icon: HeartHandshake, title: "Community-Based Environmental Action", desc: "Facilitating multi-stakeholder partnerships between village elders, local schools, and CSR entities." },
];

const TARGET_PARTICIPANTS = [
  "Rural farming households and landless agricultural wage earners",
  "Smallholder and marginal cultivators seeking sustainable inputs",
  "Rural women, Self-Help Groups (SHGs), and youth leaders",
  "School students, young graduates, and emerging green entrepreneurs",
  "Small local producers and traditional rural artisans",
  "Community-based organisations and Village Development Committees",
  "Socio-economically vulnerable and climate-impacted rural families",
];

const DEVELOPMENT_PATHWAY = [
  { step: "01", label: "UNDERSTAND", tag: "Baseline Audit", desc: "Assess local groundwater levels, soil health, land use, and household income streams." },
  { step: "02", label: "PARTICIPATE", tag: "Village Consensus", desc: "Bring together women, youth, and farmers to formulate shared development priorities." },
  { step: "03", label: "CONSERVE", tag: "Resource Guard", desc: "Protect water catchments, ban single-use plastics, and plant indigenous vegetative buffers." },
  { step: "04", label: "DEVELOP", tag: "Green Assets", desc: "Introduce allied agricultural enterprises, processing facilities, and renewable energy." },
  { step: "05", label: "ADAPT", tag: "Climate Buffers", desc: "Diversify income to shield families against market volatility and weather extremes." },
  { step: "06", label: "SUSTAIN", tag: "Lasting Legacy", desc: "Consolidate village self-reliance and environmental stewardship for future generations." },
];

const EXPECTED_IMPACTS = [
  "Broadened grassroots understanding and commitment to sustainable rural development",
  "More responsible, equitable, and sustainable community natural-resource management",
  "Dramatically heightened environmental awareness across households and schools",
  "Diversified, climate-resilient household livelihood streams and enhanced incomes",
  "Clean, green, and dignified village public spaces and community environments",
  "Active financial, civic, and decision-making empowerment of rural women and youth",
  "Increased community readiness and adaptive capacity to counter climate anomalies",
  "Deepened, participatory civic engagement in local village gram sabha planning",
  "Strong, self-reinforcing linkages between ecological conservation and livelihood growth",
  "Resilient, self-reliant, and ecologically secure rural village communities",
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

export default function SustainableRuralDevelopment() {
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
          alt="Sustainable Rural Development Programme"
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
            <Link to="/programs/environment" className="hover:text-white transition-colors">
              Environment &amp; Sustainable Development
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Sustainable Rural Development</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 04 • SRD
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Sustainable Rural Development Programme
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              People. Resources. Livelihoods. Sustainability.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Unifying natural resource stewardship, rural enterprise, climate resilience, and community well-being
              under an integrated development framework where prosperity and ecology flourish together.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Partner as Model Village Adopter
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Sponsor Integrated Rural Eco-Projects
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
                  Integrated Development Framework
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Harmonizing People, Livelihoods &amp; Nature
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Sustainable rural development requires a balanced approach to people, livelihoods, natural
                    resources and the environment. Rural communities depend on agriculture, water, land, natural
                    resources and local economic activities.
                  </p>
                  <p>
                    At the same time, environmental pressures and changing social and economic conditions can affect
                    the long-term resilience of rural households.
                  </p>
                  <p>
                    The Sustainable Rural Development Programme of ISLAH seeks to promote a development approach in which
                    community well-being, environmental responsibility, livelihood resilience and local opportunities
                    move together. The programme provides an umbrella framework for connecting ISLAH's environmental
                    and rural-development efforts at the community level.
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
                      Resilience &amp; Long-Term Well-Being
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To promote environmentally responsible, inclusive and community-centred approaches that strengthen
                      rural resilience, sustainable livelihoods, resource conservation and long-term community well-being.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Compass className="w-4 h-4" />
                      <span>People • Resources • Livelihoods • Resilience</span>
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
              label="Strategic Pillars"
              title="Our Approach"
              subtitle="Holistic integration of natural resource management, diversified rural livelihoods, climate buffering, and local governance."
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

      {/* Sustainable Rural Development Model (5 Tiers) */}
      <section className="py-20 bg-[#0b1f3b] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Systemic Architecture
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Sustainable Rural Development Model
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Rural development succeeds when people, resources, livelihoods, and ecosystems form an interconnected,
                mutually reinforcing foundation of community strength.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {DEVELOPMENT_MODEL_TIERS.map((tier, idx) => (
              <ScrollReveal key={tier.tier} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-orange mb-2 block">
                      TIER {tier.tier}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1">{tier.name}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{tier.tag}</p>
                    <p className="text-xs text-white/70 leading-relaxed">{tier.desc}</p>
                  </div>
                  {idx < DEVELOPMENT_MODEL_TIERS.length - 1 && (
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

      {/* Implementation Modules */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Field Interventions"
              title="Implementation Approach"
              subtitle="Concrete, village-level initiatives bridging agriculture, water structures, green skills, and women-led rural enterprises."
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

      {/* Development Pathway (6 Steps) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Lifecycle Process"
              title="Our Development Pathway"
              subtitle="From participatory resource diagnosis to conservation, asset creation, climate buffering, and generational sustainability."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DEVELOPMENT_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.04}>
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:shadow-md hover:border-brand-green/40 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STEP {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-green-dark mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < DEVELOPMENT_PATHWAY.length - 1 && (
                    <div className="hidden lg:flex justify-end pt-3">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Target Beneficiaries & Impact */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Communities
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Support
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
                  Systemic Outcomes
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
              Development with Ecology
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Prosperity That Protects the Future
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH believes that rural development should not come at the cost of the environment. Our approach
              brings together people, nature, livelihoods and opportunity so that present development creates a stronger
              foundation for future generations.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Sustainable rural development means improving lives today while protecting the resources and opportunities that communities will depend upon tomorrow.”
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
            to="/programs/environment/tree-plantation-greening"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Tree Plantation &amp; Greening (TPCG)
          </Link>
          <Link
            to="/programs/environment"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Return to Environment Sector Overview
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
          title={`Support Sustainable Rural Development`}
        />
      )}
    </div>
  );
}
