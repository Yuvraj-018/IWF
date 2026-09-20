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
  Leaf,
  Layers,
  Sparkles,
  Shield,
  Droplets,
  Sprout,
  Users,
  CheckCircle2,
  TrendingUp,
  GraduationCap,
  Wheat,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-agriculture.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Layers,
    title: "Soil Health Awareness",
    desc: "Promoting awareness of soil fertility, organic matter, nutrient management and long-term living soil vitality.",
  },
  {
    num: "02",
    icon: Leaf,
    title: "Natural Agriculture Awareness",
    desc: "Introducing rural communities to natural and ecological approaches to farming that work in harmony with nature.",
  },
  {
    num: "03",
    icon: Shield,
    title: "Responsible Input Management",
    desc: "Encouraging informed, responsible use of agricultural inputs to lower costs and eliminate unnecessary chemical dependencies.",
  },
  {
    num: "04",
    icon: Sprout,
    title: "Biodiversity & Ecological Balance",
    desc: "Creating awareness of the symbiotic relationship between farming, biodiversity, beneficial pollinator insects and healthy soil microbiomes.",
  },
  {
    num: "05",
    icon: GraduationCap,
    title: "Farmer Learning & Demonstration",
    desc: "Supporting knowledge-sharing, on-farm demonstrations and practical bio-preparation workshops wherever appropriate.",
  },
  {
    num: "06",
    icon: Users,
    title: "Local Adaptation",
    desc: "Recognising local crops, soil types, indigenous varieties, and farmer circumstances when promoting sustainable practices.",
  },
];

const IMPLEMENTATION_MODULES = [
  { icon: Leaf, title: "Organic Agriculture Orientations", desc: "Introducing principles of chemical-free cultivation, biological pest controls, and organic certification awareness." },
  { icon: Sprout, title: "Natural Farming Workshops", desc: "Practical preparation of Jeevamrit, Beejamrit, neem-based repellents, and fermented bio-stimulants." },
  { icon: Layers, title: "Soil Health Campaigns", desc: "Understanding soil organic carbon percentages, earthworm populations, and regenerative cover-cropping." },
  { icon: GraduationCap, title: "Farmer Training & Knowledge Exchange", desc: "Peer-to-peer workshops connecting experienced natural practitioners with transitioning smallholders." },
  { icon: Droplets, title: "Composting & Biomass Utilization", desc: "Vermicomposting, NADEP composting, farm residue recycling, and bio-waste conversion." },
  { icon: Shield, title: "Sustainable Input Management", desc: "Educating farmers on replacing costly synthetic chemicals with locally prepared farm-yard formulations." },
  { icon: Sparkles, title: "Biodiversity & Eco-Balance Sessions", desc: "Promoting multi-cropping, boundary tree windbreaks, bird perches, and beneficial predatory insects." },
  { icon: Users, title: "Community Demo Plots", desc: "Establishing participatory demo farms to evaluate pest resilience and yield stability over multiple seasons." },
  { icon: Wheat, title: "Expert & Institutional Linkages", desc: "Connecting farmers with national organic research institutes, state agriculture officers, and certifiers." },
];

const TARGET_PARTICIPANTS = [
  "Small and marginal farmers burdened by escalating chemical input costs",
  "Rural farming households seeking healthier, residue-free family consumption",
  "Women farmers managing homestead nutrition gardens and kitchen farms",
  "Youth interested in modern eco-friendly and organic agri-business",
  "Farmer groups and Joint Liability Groups exploring organic clusters",
  "Rural producers aiming to tap into chemical-free local consumer markets",
  "Community-based organisations promoting environmental sustainability",
];

const SUSTAINABILITY_PATHWAY = [
  { step: "01", label: "UNDERSTAND", tag: "Soil Biology", desc: "Recognize that living soil organisms govern plant immunity & vigor" },
  { step: "02", label: "LEARN", tag: "Natural Formulations", desc: "Master local bio-input recipes (compost, botanicals, bio-fertilizers)" },
  { step: "03", label: "EXPLORE", tag: "Pilot Plots", desc: "Test natural farming on a portion of land to observe soil response" },
  { step: "04", label: "ADAPT", tag: "Refine Techniques", desc: "Customize crop combinations and water schedules to local climate" },
  { step: "05", label: "PRACTISE", tag: "Full Cultivation", desc: "Scale chemical-free practices across the farm with confidence" },
  { step: "06", label: "SUSTAIN", tag: "Long-Term Resilience", desc: "Maintain fertile, living soils that nourish families and communities" },
];

const EXPECTED_IMPACTS = [
  "Greater awareness and appreciation of soil health and microbiology",
  "Increased understanding of organic and natural farming techniques",
  "Improved adoption of ecological, low-input cultivation practices",
  "More responsible, efficient agricultural resource and water use",
  "Greater awareness of agro-biodiversity and natural pest predation",
  "Increased farmer capacity to formulate inputs from farm-gate resources",
  "Greater interest in sustainable, chemical-free agricultural alternatives",
  "Stronger long-term agricultural, ecological, and economic resilience",
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

export default function OrganicFarming() {
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
          alt="Organic Farming & Natural Agriculture Promotion"
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
            <Link to="/programs/agriculture" className="hover:text-white transition-colors">
              Agriculture &amp; Rural Livelihoods
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-bold">Organic Farming</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Initiative 03 • ONA
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Organic Farming &amp; Natural Agriculture
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium mb-2">
              Healthier Soil. Responsible Farming. A More Sustainable Agricultural Future.
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mb-6">
              Fostering awareness and practical capacity around organic and natural agricultural approaches,
              regenerating living soil health, reducing synthetic input reliance, and nurturing ecological balance.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm cursor-pointer"
              >
                Partner as Organic Extensionist
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Sponsor Demonstration Kits
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
                  Regenerating Living Soil
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Locally Appropriate, Responsible Farming
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Healthy soil, responsible resource management and ecological balance are important foundations
                    of sustainable agriculture. Organic and natural agriculture approaches offer valuable pathways
                    for increasing awareness of soil health, reducing unnecessary dependence on expensive external inputs
                    and encouraging more environmentally conscious farming practices.
                  </p>
                  <p>
                    The Organic Farming &amp; Natural Agriculture Promotion Programme of ISLAH seeks to create awareness
                    and knowledge while recognising that agricultural practices must remain locally appropriate, practical
                    and suitable for farmers’ specific socio-economic circumstances.
                  </p>
                  <p>
                    ISLAH’s role is primarily focused on awareness, education, capacity building and responsible promotion,
                    rather than imposing a single rigid farming model on rural communities.
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
                      Soil Health &amp; Ecological Balance
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To promote awareness of organic and natural agriculture approaches, soil health, ecological
                      balance and responsible agricultural resource management while encouraging informed and locally
                      appropriate farming decisions.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Leaf className="w-4 h-4" />
                      <span>Living Soil • Bio-Inputs • Informed Choice</span>
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
              label="Principles of Ecology"
              title="Our Approach"
              subtitle="Cultivating soil biodiversity, non-chemical inputs, and ecological pest suppression through scientific agro-ecology."
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
              label="Field Practices"
              title="Implementation Approach"
              subtitle="Practical on-farm demonstrations, bio-formulation preparation, and soil organic carbon enrichment."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {IMPLEMENTATION_MODULES.map((mod, index) => {
              const IconComp = mod.icon;
              return (
                <ScrollReveal key={mod.title} delay={index * 0.04}>
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

      {/* Sustainability Pathway (6 Stages) */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Transition Framework
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Sustainability Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Sustainable agriculture should evolve through knowledge, evidence, local experience,
                and informed farmer choice rather than arbitrary imposition.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {SUSTAINABILITY_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STEP {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < SUSTAINABILITY_PATHWAY.length - 1 && (
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
                  Long-Term Outcomes
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
              Living Soil Stewardship
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              A Culture of Responsible Farming
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              We seek to encourage an agricultural culture where healthy soil, responsible farming and
              sustainable livelihoods are considered together—rebuilding the vitality of village ecosystems.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Healthy soil is more than a farming resource—it is a foundation for sustainable food systems and rural livelihoods.”
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
            to="/programs/agriculture/farmer-training"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Farmer Awareness &amp; Training (FAT)
          </Link>
          <Link
            to="/programs/agriculture/farmer-livelihood"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Farmer Livelihood &amp; Income Enhancement (FLI)
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
          title={`Support Organic Farming & Natural Agriculture`}
        />
      )}
    </div>
  );
}
