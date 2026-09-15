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
  Wheat,
  Users,
  Lightbulb,
  BookOpen,
  Share2,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Droplets,
  Store,
  Compass,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-agriculture.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Users,
    title: "Farmer-Centred Learning",
    desc: "Designing awareness and training activities around practical issues faced by farmers and rural households.",
  },
  {
    num: "02",
    icon: BookOpen,
    title: "Practical Agricultural Knowledge",
    desc: "Promoting learning on crop planning, farm management, resource utilisation and appropriate agricultural practices.",
  },
  {
    num: "03",
    icon: Cpu,
    title: "Technology & Innovation Awareness",
    desc: "Creating awareness of relevant agricultural technologies, tools, techniques and innovations that may improve farm efficiency.",
  },
  {
    num: "04",
    icon: Lightbulb,
    title: "Resource & Scheme Awareness",
    desc: "Helping communities become more aware of relevant institutional resources, agricultural support systems and opportunities.",
  },
  {
    num: "05",
    icon: Share2,
    title: "Peer Learning & Knowledge Sharing",
    desc: "Encouraging farmers to share experiences, practices, challenges and locally relevant solutions.",
  },
  {
    num: "06",
    icon: TrendingUp,
    title: "Women & Youth Participation",
    desc: "Encouraging greater participation of rural women and young people in agricultural learning and livelihood development.",
  },
];

const TRAINING_MODULES = [
  { icon: Users, title: "Farmer Awareness Camps", desc: "Village-level weekend gatherings discussing seasonal sowing calendars, soil tests, and cost reduction." },
  { icon: BookOpen, title: "Agricultural Training Programmes", desc: "Structured short-courses on integrated pest management, seed grading, and nursery establishment." },
  { icon: Share2, title: "Knowledge-Sharing Sessions", desc: "Interactive farmer dialogues examining pest outbreaks, crop rotation triumphs, and local remedies." },
  { icon: Layers, title: "Crop & Farm Management", desc: "Calculating input budgets, managing farm labour, maintaining harvest records, and crop diversification." },
  { icon: Cpu, title: "Agri-Technology Awareness", desc: "Hands-on exposure to solar water pumps, seed drills, multi-crop threshers, and precision sprayers." },
  { icon: Droplets, title: "Soil, Water & Resource Sessions", desc: "Demonstrations of check dams, farm ponds, mulch barriers, and micro-sprinkler installations." },
  { icon: Store, title: "Market & Livelihood Awareness", desc: "Understanding weekly mandi pricing, direct retail consumer channels, and collective selling." },
  { icon: Compass, title: "Demonstration & Field Visits", desc: "Exposure trips to high-performing progressive farms, university research plots, and Krishi Vigyan Kendras." },
  { icon: Lightbulb, title: "Institutional Scheme Linkages", desc: "Assisting farmers with PM-Kisan verification, crop insurance documentation, and state subsidies." },
];

const TARGET_PARTICIPANTS = [
  "Small and marginal farmers seeking practical technical guidance",
  "Rural farming households aiming to improve crop profitability",
  "Agricultural labourers aspiring to manage self-cultivated lands",
  "Women farmers managing kitchen gardens, livestock, and farms",
  "Rural youth exploring innovative agriculture as a career",
  "Farmer groups, Self-Help Groups, and cooperative societies",
  "Emerging rural producers testing diversified allied crops",
  "Vulnerable agricultural communities in rain-fed regions",
];

const LEARNING_PATHWAY = [
  { step: "01", label: "AWARENESS", tag: "Identify Needs", desc: "Discovering improved cultivation methods & scheme options" },
  { step: "02", label: "LEARNING", tag: "Interactive Workshops", desc: "Hands-on training in crop care, soil health & input preparation" },
  { step: "03", label: "SKILL", tag: "Technical Mastery", desc: "Mastering practical tools, equipment & resource management" },
  { step: "04", label: "APPLICATION", tag: "Field Practice", desc: "Applying newly learned techniques directly on personal farm plots" },
  { step: "05", label: "EXPERIENCE", tag: "Reflection & Trial", desc: "Evaluating crop performance, pest resistance, and cost savings" },
  { step: "06", label: "IMPROVEMENT", tag: "Ongoing Growth", desc: "Sustained productivity, peer mentoring & higher net income" },
];

const EXPECTED_IMPACTS = [
  "Improved practical agricultural knowledge and technical confidence",
  "Greater awareness and adoption of sustainable farming practices",
  "Better understanding of farm budgeting and resource efficiency",
  "Increased adoption of appropriate, labor-saving farm technologies",
  "Improved awareness of institutional subsidies, credit, and schemes",
  "Significantly higher participation of rural women and youth",
  "Stronger farmer decision-making and negotiation capability",
  "Increased confidence and self-reliance among smallholder producers",
  "Better awareness of livelihood diversification and allied income avenues",
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

export default function FarmerTraining() {
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
          alt="Farmer Awareness & Training Initiative"
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
            <Link to="/programs/agriculture" className="hover:text-white transition-colors">
              Agriculture &amp; Rural Livelihoods
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Farmer Awareness &amp; Training</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 02 • FAT
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Farmer Awareness &amp; Training Initiative
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Knowledge for Farmers. Skills for Better Decisions. Awareness for Stronger Livelihoods.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Creating accessible, practical opportunities for small and marginal farmers to acquire modern
              agronomic skills, exchange peer knowledge, and access government support systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Partner With Farmer Camps
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Sponsor Training Materials
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
                  Empowering Agrarian Decisions
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Practical Knowledge Over Abstract Theory
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Access to relevant knowledge can significantly influence the decisions farmers make about
                    cultivation, farm management, agricultural resources, markets and livelihood opportunities.
                  </p>
                  <p>
                    Many rural farmers, particularly small and marginal cultivators, have limited access to structured
                    agricultural training, updated market information, technical guidance and institutional resources.
                  </p>
                  <p>
                    The Farmer Awareness &amp; Training Initiative of ISLAH aims to create accessible opportunities for
                    farmers and rural producers to learn, exchange knowledge, improve awareness and make more informed
                    decisions—focusing on practical, field-tested learning rather than purely theoretical instruction.
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
                      Strengthening Farm Management
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To strengthen farmers’ knowledge, awareness and practical understanding of agriculture, farm
                      management, available resources, technologies, government and institutional opportunities,
                      and diversified rural livelihoods.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Wheat className="w-4 h-4" />
                      <span>Informed Decisions • Modern Skills • Peer Exchange</span>
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
              label="Interactive Methodology"
              title="Our Approach"
              subtitle="Cultivating a vibrant culture of collaborative, farmer-centric learning and local problem-solving."
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

      {/* Training Modules & Camps */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Field Interventions"
              title="Implementation Approach"
              subtitle="Diverse modules connecting technical guidance with real-world village agricultural calendars."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRAINING_MODULES.map((mod, index) => {
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

      {/* Learning Pathway (6 Stages) */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Skill Progression
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Learning Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                When farmers have access to relevant and understandable knowledge, they are better
                positioned to make informed decisions and build resilient livelihoods.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {LEARNING_PATHWAY.map((stage, idx) => (
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
                  {idx < LEARNING_PATHWAY.length - 1 && (
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
                  Beneficiaries
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
                  Empowerment Metrics
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
              Accessible, Practical &amp; Community-Oriented Knowledge
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH seeks to make agricultural knowledge accessible, practical and community-oriented,
              enabling farmers to learn not only from formal training but also from local experience, peer
              learning and relevant institutional expertise.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “An informed farmer is better equipped to make informed decisions, manage resources and build a stronger livelihood.”
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
            to="/programs/agriculture/sustainable-agriculture"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Sustainable Agriculture (SAD)
          </Link>
          <Link
            to="/programs/agriculture/organic-farming"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Organic Farming &amp; Natural Agriculture (ONA)
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
          title={`Support Farmer Awareness & Training`}
        />
      )}
    </div>
  );
}
