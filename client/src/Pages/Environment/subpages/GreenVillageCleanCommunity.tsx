import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
} from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Recycle,
  Sparkles,
  Shield,
  Trash2,
  Trees,
  Users,
  CheckCircle2,
  TrendingUp,
  Heart,
  Droplets,
  Package,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Sparkles,
    title: "Clean Community Awareness",
    desc: "Encouraging households and village communities to understand the direct connection between clean surroundings and public health.",
  },
  {
    num: "02",
    icon: Recycle,
    title: "Waste Responsibility",
    desc: "Promoting household waste reduction, source segregation into wet and dry streams, composting, and responsible recycling.",
  },
  {
    num: "03",
    icon: Trash2,
    title: "Plastic Reduction",
    desc: "Creating intensive awareness regarding harmful single-use plastic disposal and encouraging cloth, jute, and bio-degradable alternatives.",
  },
  {
    num: "04",
    icon: Shield,
    title: "Community Cleanliness",
    desc: "Supporting resident-led periodic clean-up activities to clear public pathways, village ponds, school premises, and community commons.",
  },
  {
    num: "05",
    icon: Trees,
    title: "Green Spaces Development",
    desc: "Encouraging micro-plantation, floral borders, public shaded groves, and herbal gardens in community common grounds.",
  },
  {
    num: "06",
    icon: Users,
    title: "Community Ownership",
    desc: "Empowering residents, youth clubs, women's self-help groups, and schools to take proud, long-term stewardship of their village environment.",
  },
];

const IMPLEMENTATION_MODULES = [
  { icon: Sparkles, title: "Village Cleanliness Campaigns", desc: "Door-to-door hygiene communication, wall slogans, and community meetings advocating clean neighborhoods." },
  { icon: Recycle, title: "Community Clean-Up Drives", desc: "Mobilizing collective shramdaan (voluntary labor) to clean village squares, choked gutters, and illegal dump sites." },
  { icon: Package, title: "Source Waste Segregation Workshops", desc: "Training families to separate organic kitchen scraps for bio-compost and keep plastics and recyclables dry." },
  { icon: Trash2, title: "Anti-Plastic Drives & Alternatives", desc: "Promoting village plastic bans, cloth shopping bag distribution, and eco-friendly local packaging." },
  { icon: Users, title: "School Cleanliness & Eco-Activities", desc: "Engaging school children in campus zero-waste projects, dustbin installations, and cleanliness competitions." },
  { icon: Trees, title: "Community Greening & Plantation", desc: "Transforming barren roadside berms and open dumping yards into green tree-lined village parks." },
  { icon: Shield, title: "Responsible Disposal Guidance", desc: "Eliminating open burning of plastic and agricultural waste by establishing localized community composting pits." },
  { icon: Heart, title: "Green-Community Volunteers", desc: "Forming active Village Cleanliness Taskforces to monitor cleanliness and mentor fellow residents." },
  { icon: Droplets, title: "Sanitation & Drainage Awareness", desc: "Educating households on greywater disposal, soak-pit construction, and keeping drinking water sources sterile." },
  { icon: Users, title: "Community Environmental Dialogues", desc: "Convening village panchayat discussions to address shared sanitation bottlenecks and waste infrastructure." },
];

const TARGET_PARTICIPANTS = [
  "Rural households seeking healthier, hygienic living spaces",
  "Entire village communities and neighborhood clusters",
  "School students, teachers, and rural youth groups",
  "Women's Self-Help Groups (SHGs) and Mahila Mandals",
  "Village Panchayats, ward members, and community elders",
  "Rural schools, Anganwadis, and primary health sub-centres",
  "Local market vendors, tea stalls, and village shopkeepers",
  "Community cleanliness volunteers and green advocates",
];

const COMMUNITY_PATHWAY = [
  { step: "01", label: "CLEAN", tag: "Eliminate Hazards", desc: "Remove trash heaps, stop open plastic burning, and restore shared lanes." },
  { step: "02", label: "GREEN", tag: "Restore Nature", desc: "Plant trees, create flowering verges, and revitalize community squares." },
  { step: "03", label: "PARTICIPATE", tag: "Collective Action", desc: "Engage women, youth, and elders in monthly village maintenance drives." },
  { step: "04", label: "PROTECT", tag: "Shared Vigilance", desc: "Establish community monitoring committees to prevent relapse into dumping." },
  { step: "05", label: "SUSTAIN", tag: "Permanent Habits", desc: "Embed decentralized composting, dustbins, and institutional pride." },
];

const EXPECTED_IMPACTS = [
  "Visibly cleaner, hygienic, and dignified community surroundings",
  "Widespread awareness and practice of household waste segregation",
  "Measurable reduction in single-use plastic litter and toxic burning",
  "High levels of grassroots voluntary participation and community civic pride",
  "Increased awareness and practice of composting and organic recycling",
  "Vibrant, shaded green public spaces and roadside tree verges",
  "Enhanced health, reduced water-borne diseases, and vector control",
  "Durable, self-sustaining community ownership of rural cleanliness",
];

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">{label}</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{title}</h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export default function GreenVillageCleanCommunity() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Banner */}
      <SubpageHeroCarousel
        tag="Initiative 02 • GCC"
        title="Green Village & Clean Community"
        subtitle="Empowering rural communities to take collective responsibility for cleaner surroundings, plastic elimination, responsible waste disposal, and verdant public spaces."
        breadcrumbs={[
          { label: "What We Do", href: "/programs" },
          { label: "Environment & Sustainable Development", href: "/programs/environment" },
          { label: "Green Village" },
        ]}
        images={[heroImg]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to="/programs/environment"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Environment Programmes
          </Link>
          <Link to="/volunteer" className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-brand-green-dark transition-colors shadow-sm cursor-pointer">
            Join Village Cleanup Drives
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/donate" search={{ financialType: "Environment & Sustainability", initiative: "Green Village & Clean Community" }} className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            Sponsor Dustbins &amp; Composting Units
          </Link>
        </div>
      </SubpageHeroCarousel>

      {/* Overview & Objective */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Collective Rural Responsibility
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Foundations of Rural Well-Being
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    A clean and healthy community is an important foundation for rural well-being. Waste accumulation,
                    plastic pollution, unmanaged surroundings, open dumping and loss of green spaces can affect the
                    environment, public health, community appearance and overall quality of life.
                  </p>
                  <p>
                    The Green Village &amp; Clean Community Initiative of ISLAH seeks to encourage rural communities to take
                    collective responsibility for creating cleaner, greener and healthier living environments.
                  </p>
                  <p>
                    The initiative strategically combines environmental awareness with practical community participation—ensuring
                    that clean surroundings become a matter of shared dignity, pride, and health.
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
                      Cleaner Settlements &amp; Greener Spaces
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To promote cleaner rural settlements, responsible waste practices, greener surroundings and greater
                      community ownership of environmental cleanliness.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Recycle className="w-4 h-4" />
                      <span>Zero Litter • Plastic Reduction • Village Pride</span>
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
              label="Action Pillars"
              title="Our Approach"
              subtitle="Cultivating civic cleanliness, plastic elimination, household waste segregation, and community greening."
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
              label="Field Interventions"
              title="Implementation Approach"
              subtitle="Cleanliness shramdaan drives, school zero-waste audits, composting installations, and green corridors."
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

      {/* Community Pathway (5 Steps) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Transformational Framework
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Our Community Pathway
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed text-balance">
                A cleaner village is not created by occasional campaigns alone. It requires structured phases
                of clearing, greening, mobilization, monitoring, and permanent habit change.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {COMMUNITY_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-orange mb-2 block">
                      STAGE {stage.step}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-semibold text-brand-orange mb-2">{stage.tag}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < COMMUNITY_PATHWAY.length - 1 && (
                    <div className="hidden lg:flex justify-end pt-4">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Vision Box */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 bg-white border border-slate-200 shadow-xs rounded-xl p-6 text-center max-w-4xl mx-auto">
              <h4 className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">Our Vision</h4>
              <p className="text-sm text-slate-600">
                A green and clean village is one where:{" "}
                <span className="font-semibold text-slate-900">
                  People understand → Communities participate → Waste is responsibly managed → Green spaces are protected → Local surroundings improve
                </span>
              </p>
            </div>
          </ScrollReveal>
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
                  Stakeholders
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
                  Measured Transformation
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
      <section className="py-14 bg-gradient-to-r from-[#071527] to-[#0c2340] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
              Continuous Shared Responsibility
            </span>
            <h2 className="text-xl md:text-2xl font-bold mb-4 leading-snug">
              Every Resident an Environmental Steward
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
              ISLAH believes that a cleaner village is not created by occasional campaigns alone. It requires
              continuous awareness, community participation and shared responsibility across every household.
            </p>
            <div className="border-t border-white/15 pt-6 max-w-2xl mx-auto">
              <blockquote className="text-lg md:text-xl font-serif italic text-white/95 leading-relaxed mb-3 text-balance">
                “A clean and green community begins when environmental responsibility becomes everyone's responsibility.”
              </blockquote>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">— ISLAH</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Subpage Navigation */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/programs/environment/environmental-awareness"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-800 hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Environmental Awareness (EAP)
          </Link>
          <Link
            to="/programs/environment/tree-plantation-greening"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95"
          >
            Next: Tree Plantation &amp; Greening (TPCG)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
