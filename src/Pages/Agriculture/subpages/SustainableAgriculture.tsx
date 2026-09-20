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
  Sprout,
  Sun,
  Droplets,
  Layers,
  GraduationCap,
  Users,
  CheckCircle2,
  TrendingUp,
  FileText,
  Shield,
  Leaf,
  Wheat,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-agriculture.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Sprout,
    title: "Sustainable Farming Awareness",
    desc: "Promoting awareness of farming practices that balance agricultural productivity with responsible use of soil, water and other natural resources.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Soil Health & Farm Resource Management",
    desc: "Encouraging greater awareness of soil health, nutrient management, organic matter and responsible agricultural inputs.",
  },
  {
    num: "03",
    icon: Sun,
    title: "Climate-Responsive Agriculture",
    desc: "Building awareness of agricultural approaches that may help farmers better understand and respond to changing weather and climate-related challenges.",
  },
  {
    num: "04",
    icon: Droplets,
    title: "Resource-Efficient Practices",
    desc: "Promoting efficient use of agricultural inputs, water, energy and other farm resources.",
  },
  {
    num: "05",
    icon: GraduationCap,
    title: "Knowledge & Capacity Building",
    desc: "Facilitating farmer-oriented awareness sessions, demonstrations, training and knowledge-sharing activities.",
  },
  {
    num: "06",
    icon: Users,
    title: "Local & Community-Based Solutions",
    desc: "Encouraging practical approaches that consider local agricultural conditions, community resources and farmers’ existing knowledge and experience.",
  },
];

const IMPLEMENTATION_ACTIVITIES = [
  { icon: Users, title: "Farmer Awareness & Orientation", desc: "Interactive community orientations introducing sustainable crop cycles and regenerative principles." },
  { icon: GraduationCap, title: "Sustainable Farming Training", desc: "Hands-on workshops on non-chemical pest management, green manuring, and biological soil enrichment." },
  { icon: Sprout, title: "Demonstration & Knowledge Sharing", desc: "Field model plots demonstrating input reduction, higher net yield margins, and healthy crop stands." },
  { icon: Layers, title: "Soil & Resource Management", desc: "Soil testing camps, organic carbon revitalization, and balanced micro-nutrient application." },
  { icon: Sun, title: "Climate-Resilient Practices", desc: "Drought-tolerant crop varieties, contingency planting strategies, and weather advisory alerts." },
  { icon: Droplets, title: "Resource-Efficient Technologies", desc: "Mulching, ridge-and-furrow cultivation, and micro-irrigation to maximize crop water efficiency." },
  { icon: Users, title: "Community-Level Learning", desc: "Village farmer study circles, women farmer meetings, and peer-to-peer experiential exchanges." },
  { icon: LandmarkIcon, title: "Institutional Expert Linkages", desc: "Connecting grassroots farmers with Krishi Vigyan Kendras (KVKs), universities, and agronomists." },
  { icon: FileText, title: "Good Practice Documentation", desc: "Simple vernacular handbooks, advisory leaflets, and audio-visual guides documenting proven methods." },
];

function LandmarkIcon(props: any) {
  return <Leaf {...props} />;
}

const TARGET_FARMERS = [
  "Small and marginal farmers cultivating fragmented land holdings",
  "Rural farming households seeking lower cultivation input costs",
  "Agricultural workers and seasonal farm labourers",
  "Rural producers and village-level cultivators",
  "Farmer groups, Joint Liability Groups, and community collectives",
  "Women and youth actively engaged in farming operations",
  "Economically vulnerable rural households facing drought risks",
];

const SUSTAINABLE_PATHWAY = [
  { step: "01", label: "LEARN", tag: "Principles & Science", desc: "Understand ecological balance and living soil dynamics" },
  { step: "02", label: "UNDERSTAND", tag: "Farm Resources", desc: "Assess water availability, soil health & input economics" },
  { step: "03", label: "ADOPT", tag: "Better Practices", desc: "Implement organic amendments, intercropping & mulching" },
  { step: "04", label: "CONSERVE", tag: "Soil & Water", desc: "Protect topsoil moisture and prevent groundwater depletion" },
  { step: "05", label: "IMPROVE", tag: "Yield Quality", desc: "Achieve superior crop resilience and reduced expenditure" },
  { step: "06", label: "SUSTAIN", tag: "Long-Term Viability", desc: "Preserve farm fertility and food security for future generations" },
];

const IMPACT_POINTS = [
  "Improved practical awareness of sustainable agricultural methods",
  "Better understanding of responsible soil, water, and input management",
  "Greater adoption of water conservation and micro-irrigation techniques",
  "Increased knowledge of climate-responsive contingency farming",
  "Improved farm management, expenditure tracking, and cost reduction",
  "Greater adoption of appropriate, locally validated sustainable practices",
  "Stronger agricultural livelihood resilience against erratic weather",
  "Increased community awareness of environmentally responsible farming",
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

export default function SustainableAgriculture() {
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
          alt="Sustainable Agriculture Development Programme"
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
            <span className="text-brand-orange font-bold">Sustainable Agriculture</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Initiative 01 • SAD
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Sustainable Agriculture Development
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium mb-2">
              Growing Responsibly. Farming Sustainably. Building Resilient Rural Livelihoods.
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mb-6">
              Promoting awareness, knowledge and capacity building around agricultural practices that are
              productive, resource-conscious, environmentally responsible, and locally appropriate for smallholder farmers.
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
                Sponsor Demo Plots
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
                  Context &amp; Imperative
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Beyond Short-Term Yields: Regenerating Agrarian Foundations
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Agriculture is fundamental to the economic and social life of rural communities. For millions of
                    farming households, it provides food, employment, income and a foundation for household security.
                  </p>
                  <p>
                    However, agricultural productivity and rural livelihoods are increasingly influenced by changing
                    climatic conditions, soil degradation, water constraints, rising input costs, and limited access to updated knowledge.
                  </p>
                  <p>
                    The Sustainable Agriculture Development Programme seeks to promote awareness around agricultural practices
                    that are productive, resource-conscious, environmentally responsible and locally appropriate—encouraging
                    farmers to look beyond short-term production and consider the long-term health of soil, water, biodiversity, and family livelihoods.
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
                      Strengthening Long-Term Viability
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To promote sustainable and resilient agricultural practices that help rural communities improve
                      their agricultural knowledge, use resources responsibly and strengthen the long-term viability
                      of farming-based livelihoods.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Sprout className="w-4 h-4" />
                      <span>Soil Health • Water Stewardship • Climate Resilience</span>
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
              label="Scientific &amp; Ecological Pillars"
              title="Our Approach"
              subtitle="Six strategic principles guiding farmers toward lower input expenses, balanced soil biology, and resilient harvests."
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

      {/* Implementation Activities */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="On-Ground Activities"
              title="Implementation Approach"
              subtitle="Practical modules connecting farmer orientation, field demonstration plots, and institutional agro-extension."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {IMPLEMENTATION_ACTIVITIES.map((act, index) => {
              const IconComp = act.icon;
              return (
                <ScrollReveal key={act.title} delay={index * 0.04}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{act.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sustainable Agriculture Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Transition Architecture
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Sustainable Agriculture Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Sustainable agriculture begins with knowledge and grows through practical adoption,
                community participation, and responsible management of local natural resources.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {SUSTAINABLE_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">PHASE {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < SUSTAINABLE_PATHWAY.length - 1 && (
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

      {/* Target Farmers & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Smallholder Focus
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_FARMERS.map((item) => (
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
                  Agricultural Outcomes
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

      {/* Vision & Quote */}
      <section className="py-20 bg-[#004724] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Our Commitment
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Productivity &amp; Sustainability Moving Together
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH seeks to support an agricultural future where productivity and sustainability move together—helping
              rural communities strengthen farming practices while protecting the natural resources on which future generations depend.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Sustainable agriculture is not only about growing more; it is about growing responsibly and preserving the resources that make future growth possible.”
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
            to="/programs/agriculture"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Agriculture &amp; Rural Livelihoods
          </Link>
          <Link
            to="/programs/agriculture/farmer-training"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Farmer Awareness &amp; Training Initiative (FAT)
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
          title={`Support Sustainable Agriculture`}
        />
      )}
    </div>
  );
}
