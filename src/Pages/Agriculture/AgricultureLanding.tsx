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
  Wheat,
  Sprout,
  Users,
  TrendingUp,
  Droplets,
  Leaf,
  Sun,
  Shield,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Layers,
  Store,
  Compass,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_agriculture_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_CHALLENGES = [
  {
    num: "01",
    title: "Knowledge & Technology Gaps",
    desc: "Limited access to modern and sustainable agricultural knowledge, with low awareness of improved cultivation practices and resource-saving technologies.",
  },
  {
    num: "02",
    title: "Resource & Water Constraints",
    desc: "Severe water scarcity, depleting groundwater tables, and inefficient use of irrigation water create seasonal stress for farming families.",
  },
  {
    num: "03",
    title: "Dependence on Traditional Practices",
    desc: "Continued reliance on low-productivity traditional methods and imbalanced chemical fertilizer inputs degrade long-term soil fertility.",
  },
  {
    num: "04",
    title: "Single-Source Income Vulnerability",
    desc: "Heavy dependence on single or seasonal harvest income leaves households vulnerable to price shocks, crop failures, and climate risks.",
  },
  {
    num: "05",
    title: "Underemployment & Out-Migration",
    desc: "Limited local livelihood diversification, lack of agro-processing units, and seasonal unemployment drive distress rural out-migration.",
  },
  {
    num: "06",
    title: "Climate & Environmental Stress",
    desc: "Erratic rainfall, recurrent drought cycles, and shifting weather patterns intensify the precariousness of smallholder farming.",
  },
];

const APPROACH_PILLARS = [
  {
    num: "01",
    title: "Sustainable Agriculture Development",
    desc: "Promoting awareness and capacity building around sustainable, resource-efficient and locally appropriate agricultural practices that contribute to resilient rural livelihoods.",
    icon: Sprout,
  },
  {
    num: "02",
    title: "Farmer Awareness & Capacity Building",
    desc: "Creating accessible opportunities for farmers to enhance knowledge of crop planning, modern techniques, farm management, and institutional resources.",
    icon: Wheat,
  },
  {
    num: "03",
    title: "Organic & Natural Agriculture Promotion",
    desc: "Encouraging awareness of organic and natural farming approaches, emphasizing living soil health, ecological balance, and reduced synthetic dependency.",
    icon: Leaf,
  },
  {
    num: "04",
    title: "Farmer Livelihood & Income Enhancement",
    desc: "Supporting rural households in exploring livelihood diversification, allied activities, local agro-processing, and value-added market channels.",
    icon: TrendingUp,
  },
];

const INITIATIVES = [
  {
    num: "01",
    abbr: "SAD",
    title: "Sustainable Agriculture Development Programme",
    desc: "Promoting awareness, knowledge and capacity building around sustainable, resource-conscious and climate-responsive farming practices.",
    href: "/programs/agriculture/sustainable-agriculture",
    icon: Sprout,
    tag: "Sustainability & Soil",
  },
  {
    num: "02",
    abbr: "FAT",
    title: "Farmer Awareness & Training Initiative",
    desc: "Facilitating village-level awareness camps, practical training, technology orientation, and peer-to-peer farmer knowledge exchange.",
    href: "/programs/agriculture/farmer-training",
    icon: Wheat,
    tag: "Knowledge & Skills",
  },
  {
    num: "03",
    abbr: "ONA",
    title: "Organic Farming & Natural Agriculture Promotion",
    desc: "Fostering awareness and locally appropriate adoption of organic inputs, natural pest management, composting, and soil regeneration.",
    href: "/programs/agriculture/organic-farming",
    icon: Leaf,
    tag: "Natural & Eco-Friendly",
  },
  {
    num: "04",
    abbr: "FLI",
    title: "Farmer Livelihood & Income Enhancement Initiative",
    desc: "Empowering rural households with allied agri-activities, post-harvest value addition, cottage enterprise, and diversified income streams.",
    href: "/programs/agriculture/farmer-livelihood",
    icon: TrendingUp,
    tag: "Diversification & Value",
  },
];

const TARGET_BENEFICIARIES = [
  "Small and marginal farmers holding fragmented land parcels",
  "Rural farming households seeking steady cash flows",
  "Agricultural landless workers and seasonal laborers",
  "Small producers and localized village cultivators",
  "Self-Help Groups (SHGs) and community farmer collectives",
  "Aspiring rural agri-entrepreneurs and youth leaders",
  "Agriculture and allied livelihood practitioners (dairy, poultry, fisheries)",
  "Economically vulnerable rural families vulnerable to drought",
];

const IMPACT_OUTCOMES = [
  "Improved practical agricultural knowledge and technical awareness",
  "Greater adoption of sustainable and climate-resilient farming methods",
  "More responsible, regenerative stewardship of soil and natural resources",
  "Increased awareness of water conservation and micro-irrigation practices",
  "Greater livelihood diversification across smallholder households",
  "Expanded opportunities in allied sectors (dairy, horticulture, composting)",
  "Greater value-addition, farm-level processing, and packaging opportunities",
  "Increased participation of rural women and youth in agrarian economies",
  "Improved awareness of institutional credit, subsidies, and government schemes",
  "Stronger rural livelihood resilience against climate and market disruptions",
  "Enhanced market linkages and fair remuneration for produce",
  "Greater self-reliance, food security, and dignity for rural families",
  "Stronger, collaborative, and more resilient village communities",
];

const RURAL_LIVELIHOOD_PATHWAY = [
  { step: "01", title: "LEARN", tag: "Knowledge & Insights", desc: "Acquiring modern agronomic knowledge & sustainable practices" },
  { step: "02", title: "ADOPT", tag: "Farming Techniques", desc: "Implementing regenerative soil, water & crop management" },
  { step: "03", title: "PRODUCE", tag: "Bountiful Harvests", desc: "Achieving consistent, higher-quality agricultural output" },
  { step: "04", title: "ADD VALUE", tag: "Processing & Grading", desc: "Sorting, grading, cleaning and localized value addition" },
  { step: "05", title: "CONNECT", tag: "Markets & Collectives", desc: "Linking with cooperative markets, buyer networks & FPOs" },
  { step: "06", title: "EARN", tag: "Income & Stability", desc: "Generating predictable, diversified household cash flows" },
  { step: "07", title: "GROW", tag: "Self-Reliance & Dignity", desc: "Reinvesting in farm assets and building enduring resilience" },
];

const INTEGRATED_ECOSYSTEM_PILLARS = [
  { title: "Sustainable Agriculture", desc: "Balancing crop yields with ecological harmony" },
  { title: "Farmer Knowledge & Training", desc: "Practical workshops, camps and demonstrations" },
  { title: "Soil & Natural Resource Responsibility", desc: "Regenerating living soil organic carbon" },
  { title: "Water Conservation & Efficient Use", desc: "Drip, micro-irrigation and watershed harvesting" },
  { title: "Livelihood Diversification", desc: "Dairy, poultry, mushroom and horticulture" },
  { title: "Value Addition & Enterprise", desc: "Localized milling, spice blending and packaging" },
  { title: "Market & Institutional Linkages", desc: "Connecting producers to markets and subsidies" },
  { title: "Stronger Rural Livelihoods", desc: "Dignified, resilient, self-sustaining communities" },
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

export default function AgricultureLanding() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#07162c] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Agriculture & Rural Livelihoods"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-4 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-brand-orange" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link to="/programs" className="hover:text-white transition-colors">
              Our Programs
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-bold">Agriculture</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              What We Do • Sector 06
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Agriculture &amp; Rural Livelihoods
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium mb-2">
              Strengthening Rural Economies. Supporting Farmers. Building Sustainable Livelihoods.
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mb-6">
              Promoting sustainable agriculture, farmer awareness, living soil regeneration,
              livelihood diversification, and grassroots agri-entrepreneurship for smallholder families.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm cursor-pointer"
              >
                Partner With Our Rural Mission
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Sponsor Farmer Kits
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
                  Agrarian Heart of Rural Life
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Agriculture is More Than Cultivation
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Agriculture is at the heart of rural life and remains an important source of food, employment,
                    income and livelihood for millions of rural families. For communities in rural and underserved
                    areas, strengthening agriculture plays a significant role in improving household resilience and
                    creating local economic opportunities.
                  </p>
                  <p>
                    However, small and marginal farmers face mounting challenges related to agricultural knowledge,
                    water constraints, climate volatility, soil degradation, and limited market exposure. Women and
                    youth also play vital roles yet remain constrained by inadequate technical training and capital.
                  </p>
                  <p>
                    ISLAH believes that agriculture should not be viewed only as an activity of cultivation. It can
                    serve as a foundation for livelihood development, food security, local enterprise, employment,
                    entrepreneurship and stronger rural economies.
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
                      Sustainable Agriculture &amp; Diversification
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To support rural communities by promoting sustainable agriculture, farmer awareness,
                      responsible resource management, livelihood diversification and agri-entrepreneurship,
                      enabling farmers, women, youth and rural households to explore stronger and more sustainable livelihood opportunities.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Wheat className="w-4 h-4" />
                      <span>Soil Health • Water Conservation • Enterprise</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Ground Realities"
              title="Challenges Faced by Smallholder Farmers"
              subtitle="Addressing systemic environmental, financial and technical vulnerabilities across rural agricultural regions."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_CHALLENGES.map((ch, idx) => (
              <ScrollReveal key={ch.num} delay={idx * 0.05}>
                <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-9 h-9 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-sm">
                        {ch.num}
                      </span>
                      <AlertCircle className="w-4 h-4 text-slate-300" />
                    </div>
                    <h3 className="font-bold text-base text-brand-green-dark mb-2">{ch.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ch.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision & Commitment */}
      <section className="py-16 bg-[#07162c] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
              Our Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Resilient, Economically Empowered Rural Communities
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-8">
              ISLAH envisions stronger, more resilient and economically empowered rural communities where farmers,
              women, youth and rural households have access to knowledge, skills, opportunities and supportive networks
              that enable them to build sustainable livelihoods. Rural transformation becomes possible when local resources,
              knowledge, skills, enterprise and opportunity come together.
            </p>
            <div className="inline-block bg-white/10 backdrop-blur border border-white/15 px-6 py-3 rounded-full text-brand-orange text-xs font-bold tracking-wider uppercase">
              “Strong rural communities grow when knowledge, resources and opportunity come together.” — ISLAH
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Approach (4 Pillars) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Strategic Framework"
              title="Our Approach"
              subtitle="Four interconnected pillars designed to empower rural producers and protect the natural agrarian base."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPROACH_PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} delay={index * 0.05}>
                  <div className="bg-[#f9fbf9] rounded-xl border border-slate-200/70 p-6 hover:bg-white hover:shadow-md hover:border-brand-green/30 transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-lg bg-[#004724]/10 text-brand-green flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">{pillar.num}</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-2">{pillar.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Initiatives (4 Cards) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Dedicated Interventions"
              title="Key Initiatives"
              subtitle="Explore the practical programmes driving sustainable agriculture, farmer training, organic farming and livelihood enhancement."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIATIVES.map((init, index) => {
              const IconComp = init.icon;
              return (
                <ScrollReveal key={init.num} delay={index * 0.06}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-lg hover:border-brand-green/40 transition-all flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-brand-orange">
                          {init.abbr} • 0{index + 1}
                        </span>
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                          {init.tag}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-brand-green-dark mb-2 leading-snug group-hover:text-brand-green transition-colors">
                        {init.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">{init.desc}</p>
                    </div>
                    <Link
                      to={init.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:text-brand-green-dark transition-colors pt-4 border-t border-slate-100"
                    >
                      <span>Explore Initiative</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Continuum Banner */}
          <div className="mt-12 bg-[#0b1f3b] text-white p-6 rounded-xl text-center border border-white/10">
            <p className="text-xs uppercase font-bold tracking-widest text-brand-orange mb-2">
              Action Continuum
            </p>
            <p className="text-sm md:text-base font-semibold">
              Sustainability &nbsp;→&nbsp; Knowledge &nbsp;→&nbsp; Better Practices &nbsp;→&nbsp; Income &amp; Livelihoods
            </p>
          </div>
        </div>
      </section>

      {/* Rural Livelihood Pathway (7 Stages) */}
      <section className="py-20 bg-[#07162c] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Agrarian Lifecycle
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Rural Livelihood Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                A progressive pathway through which rural communities move from knowledge to productive practices,
                value addition, and sustainable income generation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {RURAL_LIVELIHOOD_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STAGE {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{stage.title}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < RURAL_LIVELIHOOD_PATHWAY.length - 1 && (
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

      {/* Integrated Ecosystem Overview */}
      <section className="py-20 bg-[#f9fbf9] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Ecosystem Synergy"
              title="Integrated Agriculture &amp; Rural Livelihood Ecosystem"
              subtitle="How all components work as a unified engine for long-term rural empowerment."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATED_ECOSYSTEM_PILLARS.map((eco, index) => (
              <ScrollReveal key={eco.title} delay={index * 0.04}>
                <div className="bg-white border border-slate-200/80 rounded-lg p-5 shadow-sm hover:border-brand-green/40 transition-all h-full">
                  <span className="text-xs font-mono font-bold text-brand-orange block mb-1">
                    0{index + 1}
                  </span>
                  <h4 className="font-bold text-sm text-brand-green-dark mb-1.5">{eco.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{eco.desc}</p>
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
                  Farming Communities
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_BENEFICIARIES.map((item) => (
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
                  Demonstrable Outcomes
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3">
                    {IMPACT_OUTCOMES.slice(0, 8).map((outcome) => (
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

      {/* Statement & CTA */}
      <section className="py-20 bg-[#004724] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Core Conviction
            </span>
            <blockquote className="text-xl md:text-3xl font-serif italic text-white/95 leading-relaxed max-w-3xl mx-auto mb-6">
              “Agriculture is more than cultivation. It can sustain families, create livelihoods, strengthen local economies and help build a more resilient rural future.”
            </blockquote>
            <p className="text-sm font-bold tracking-widest uppercase text-brand-orange mb-8">— ISLAH</p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Join us in empowering smallholder farmers, regenerating living soil, and building thriving rural economies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-sm px-8 py-3.5 rounded-lg transition-colors shadow-sm"
              >
                Partner With Our Mission
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="border border-white/30 text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                Support Farmer Training
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
          title={`Support Agriculture & Rural Livelihoods`}
        />
      )}
    </div>
  );
}
