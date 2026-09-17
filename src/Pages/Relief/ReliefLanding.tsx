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
  ShieldAlert,
  HeartHandshake,
  Home as HomeIcon,
  CloudRain,
  TrendingUp,
  Sparkles,
  Users,
  CheckCircle2,
  AlertTriangle,
  Flame,
  LifeBuoy,
  Shirt,
  Utensils,
  Truck,
  Building,
  Activity,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_CHALLENGES = [
  {
    num: "01",
    title: "Devastating Natural Disasters",
    desc: "Floods, flash inundations, cyclonic storms, and landslides that abruptly destroy rural homes, standing crops, and livestock.",
  },
  {
    num: "02",
    title: "Extreme Seasonal Hardship",
    desc: "Freezing Himalayan winter cold waves and scorching summer heatwaves placing unhoused, elderly, and rural families under severe duress.",
  },
  {
    num: "03",
    title: "Loss of Essential Household Belongings",
    desc: "Displacement and destruction of basic shelter, clothing, bedding, cooking utensils, and clean drinking water facilities.",
  },
  {
    num: "04",
    title: "Acute Disruption of Livelihoods",
    desc: "Loss of daily wage employment, damaged artisan looms, destroyed farming inputs, and ruined rural shops that stall family income for months.",
  },
  {
    num: "05",
    title: "Disproportionate Impact on Vulnerable Groups",
    desc: "Children, pregnant women, single mothers, elderly persons, and individuals with disabilities face heightened health and safety threats during crises.",
  },
  {
    num: "06",
    title: "Isolation of Underserved Rural Areas",
    desc: "Remoteness from urban emergency centres, blocked roads, and severed supply chains delaying vital humanitarian relief to marginalized villages.",
  },
];

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: LifeBuoy,
    title: "Emergency Response",
    desc: "Mobilizing rapid, well-coordinated, and timely humanitarian assistance during sudden crises and natural disasters based on assessed needs.",
  },
  {
    num: "02",
    icon: Shirt,
    title: "Essential Needs & Dignity",
    desc: "Delivering essential shelter materials, warm clothing, hygiene supplies, and household utility kits with deep empathy and respect.",
  },
  {
    num: "03",
    icon: CloudRain,
    title: "Seasonal & Disaster-Specific Support",
    desc: "Providing tailored seasonal aid—winter blankets, flood ration kits, storm recovery, and heatwave hydration points—when vulnerability peaks.",
  },
  {
    num: "04",
    icon: Users,
    title: "Vulnerable Community Support",
    desc: "Prioritizing women-headed households, children, orphan families, the elderly, and persons with disabilities facing elevated hardship.",
  },
  {
    num: "05",
    icon: TrendingUp,
    title: "Livelihood Recovery",
    desc: "Bridging immediate food relief with productive tool replacement, micro-enterprise restocking, agricultural inputs, and vocational recovery.",
  },
  {
    num: "06",
    icon: ShieldAlert,
    title: "Rehabilitation & Resilience",
    desc: "Building long-term disaster preparedness, community storage assets, volunteer taskforces, and sustainable village reconstruction.",
  },
];

const INITIATIVES = [
  {
    num: "01",
    abbr: "EDR",
    title: "Emergency Relief & Disaster Response Programme",
    desc: "Rapid deployment of emergency food supplies, drinking water, medical referrals, temporary shelter, and child support during crisis situations.",
    href: "/programs/relief-and-rehabilitation/emergency-disaster-response",
    icon: LifeBuoy,
    tag: "Immediate Response",
  },
  {
    num: "02",
    abbr: "SCN",
    title: "Shelter, Clothing & Necessities Support",
    desc: "Restoring dignity and essential household security through emergency shelter materials, seasonal warm clothing, bedding, and family kits.",
    href: "/programs/relief-and-rehabilitation/shelter-clothing-necessities",
    icon: HomeIcon,
    tag: "Essential Comfort & Dignity",
  },
  {
    num: "03",
    abbr: "SDSR",
    title: "Seasonal & Disaster-Specific Relief Support",
    desc: "Facilitating targeted relief during annual monsoon floods, bitter winter cold waves, heat emergencies, and localized fire incidents.",
    href: "/programs/relief-and-rehabilitation/seasonal-disaster-relief",
    icon: CloudRain,
    tag: "Seasonal Protection",
  },
  {
    num: "04",
    abbr: "LRR",
    title: "Livelihood Recovery & Rehabilitation Support",
    desc: "Helping affected rural families replace productive assets, restock micro-enterprises, restore allied farming, and regain economic independence.",
    href: "/programs/relief-and-rehabilitation/livelihood-recovery-rehabilitation",
    icon: TrendingUp,
    tag: "Rehabilitation & Independence",
  },
];

const HUMANITARIAN_VALUES = [
  { name: "Local", desc: "Rooted in village ground realities and community structures" },
  { name: "Inclusive", desc: "Reaching every marginalized, excluded, and vulnerable group" },
  { name: "Need-Based", desc: "Rigorous objective assessment before mobilizing resources" },
  { name: "Dignified", desc: "Treating affected families with utmost compassion and respect" },
  { name: "Community-Centred", desc: "Empowering residents to lead their own recovery efforts" },
  { name: "Practical", desc: "Delivering durable, immediately usable, high-utility supplies" },
];

const RELIEF_TO_RESILIENCE_STEPS = [
  { step: "01", title: "RELIEF", tag: "Immediate Lifelines", desc: "Providing emergency food, clean water, first aid, and temporary shelter." },
  { step: "02", title: "RECOVERY", tag: "Stabilizing Households", desc: "Helping families clean debris, replace essential belongings, and restart routines." },
  { step: "03", title: "REHABILITATION", tag: "Restoring Capacity", desc: "Replacing lost productive tools, livestock, craft machinery, and seed stocks." },
  { step: "04", title: "REBUILDING", tag: "Strengthening Systems", desc: "Reconstructing resilient community infrastructure, flood bunds, and schools." },
  { step: "05", title: "RESILIENCE", tag: "Prepared Communities", desc: "Forming trained community volunteer units capable of mitigating future shocks." },
];

const TARGET_PARTICIPANTS = [
  "Families severely impacted by floods, fires, storms, and extreme weather",
  "Economically disadvantaged, landless, and daily wage rural households",
  "Displaced communities and families lacking adequate shelter",
  "Children, school students, and pregnant/lactating mothers",
  "Women-headed households, widows, and single-earner families",
  "Elderly persons living alone and persons with disabilities",
  "Small and marginal farmers suffering catastrophic crop or livestock loss",
  "Rural artisans and petty shopkeepers stripped of productive assets",
];

const IMPACT_OUTCOMES = [
  "Rapid, dignified, and equitable distribution of emergency humanitarian relief",
  "Improved access to clean drinking water, nutritious rations, and dry shelter",
  "Protection of human dignity, physical safety, and health in crisis aftermath",
  "Essential continuity of child schooling and basic healthcare during displacement",
  "Accelerated transition from emergency dependency to autonomous household recovery",
  "Speedy restoration of damaged livelihoods, farm assets, and micro-enterprises",
  "Active community participation in disaster risk assessment and relief coordination",
  "Substantially enhanced disaster preparedness and hazard response capabilities",
  "Long-term household and community resilience against recurrent climate shocks",
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

export default function ReliefLanding() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#07162c] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Humanitarian Relief & Rehabilitation"
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
            <span className="text-brand-orange font-medium">Humanitarian Relief &amp; Rehabilitation</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              What We Do • Sector 08
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Humanitarian Relief &amp; Rehabilitation
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Responding with Compassion. Restoring Dignity. Rebuilding Lives and Resilience.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Supporting vulnerable individuals, families, and communities through emergency response, essential necessities,
              seasonal relief, and livelihood rehabilitation to transform immediate assistance into durable resilience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Support Emergency Relief Kits
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Partner for Disaster Response
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
                  Compassionate, Need-Based Humanitarian Action
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Emergencies and disasters can change lives within moments. Floods, fires, storms, extreme weather,
                    displacement and other crises can disrupt homes, livelihoods, food security, healthcare, education
                    and access to essential services.
                  </p>
                  <p>
                    For vulnerable rural communities, the consequences can continue long after the immediate emergency
                    has passed. Loss of productive assets, income, household belongings and access to basic services can
                    make recovery particularly difficult.
                  </p>
                  <p>
                    Through its Humanitarian Relief &amp; Rehabilitation sector, ISLAH Welfare Foundation seeks to support
                    individuals, families and communities affected by emergencies through a compassionate, need-based and
                    community-centred approach—connecting immediate relief with recovery, rehabilitation and resilience.
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
                      Relief, Recovery &amp; Resilience
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To support vulnerable and crisis-affected communities with appropriate humanitarian assistance while
                      helping create pathways towards recovery, livelihood restoration, rehabilitation and greater resilience.
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      Guided by assessed needs, local circumstances, available resources and transparent partnerships.
                    </p>
                    <div className="flex items-center gap-2 pt-4 text-xs font-bold text-brand-green">
                      <LifeBuoy className="w-4 h-4" />
                      <span>Immediate Lifelines • Dignity • Long-Term Rebuilding</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Humanitarian Focus (Core Values) */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange block mb-2">
                Humanitarian Principles
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-brand-green-dark">
                How We Deliver Humanitarian Assistance
              </h3>
              <p className="text-xs text-slate-600 mt-2">
                Ensuring interventions are dignified, community-driven, and focused on underserved rural regions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HUMANITARIAN_VALUES.map((val, idx) => (
              <ScrollReveal key={val.name} delay={idx * 0.04}>
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-center hover:border-brand-green/40 hover:shadow-sm transition-all h-full flex flex-col justify-center">
                  <h4 className="font-bold text-base text-brand-green mb-1">{val.name}</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Hardships We Address"
              title="Emergencies &amp; Vulnerabilities"
              subtitle="Confronting the multi-layered shocks that destabilize rural families during and after catastrophic crises."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_CHALLENGES.map((challenge, index) => (
              <ScrollReveal key={challenge.num} delay={index * 0.05}>
                <div className="bg-[#fbfcfb] rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between h-full">
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

      {/* Our Approach (6 Pillars) */}
      <section className="py-20 bg-[#fbfdfa] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Strategic Response"
              title="Our Approach"
              subtitle="A continuous spectrum uniting emergency relief, seasonal protection, vulnerable household care, and livelihood revival."
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

          {/* Continuity Ribbon */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 bg-brand-green-dark text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange block mb-1">
                  Core Continuity
                </span>
                <h4 className="text-lg font-bold text-white">The Humanitarian Relief Sequence</h4>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
                <span className="bg-white/10 px-3.5 py-1.5 rounded-md">Emergency Response</span>
                <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="bg-white/10 px-3.5 py-1.5 rounded-md">Basic Needs</span>
                <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="bg-white/10 px-3.5 py-1.5 rounded-md">Seasonal/Disaster Response</span>
                <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="bg-brand-orange text-white px-3.5 py-1.5 rounded-md font-bold">
                  Livelihood Recovery
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Action Programmes"
              title="Key Initiatives"
              subtitle="Discover our four structured humanitarian programmes spanning emergency relief, essential necessities, seasonal aid, and livelihood restoration."
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {INITIATIVES.map((init, index) => {
              const IconComp = init.icon;
              return (
                <ScrollReveal key={init.num} delay={index * 0.05}>
                  <div className="bg-[#f9fbf9] rounded-xl border border-slate-200/80 p-8 hover:bg-white hover:shadow-lg hover:border-brand-green/40 transition-all flex flex-col justify-between h-full group">
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
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors pt-4 border-t border-slate-200/60"
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

      {/* From Relief to Resilience (Flow Sequence) */}
      <section className="py-20 bg-[#0b1f3b] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Evolutionary Pathway
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                From Relief to Resilience
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Humanitarian assistance is most meaningful when it moves beyond temporary handouts and creates
                a durable pathway towards stability, livelihood restoration, and community preparedness.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {RELIEF_TO_RESILIENCE_STEPS.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-orange mb-2 block">
                      STAGE {stage.step}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1">{stage.title}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-xs text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < RELIEF_TO_RESILIENCE_STEPS.length - 1 && (
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
            {/* Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Affected Communities
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
                  Measured Outcomes
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
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
              Compassion in Crisis. Strength in Tomorrow.
            </h2>
            <p className="text-white/85 text-base leading-relaxed max-w-3xl mx-auto mb-8">
              Humanitarian work is not only about providing relief during a crisis. It is also about restoring dignity,
              protecting livelihoods, supporting recovery and strengthening the capacity of communities to face future challenges.
              ISLAH seeks to build a responsible humanitarian approach that connects compassion with action, relief with recovery,
              and recovery with resilience.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Relief responds to a crisis. Rehabilitation restores possibilities. Resilience prepares communities for tomorrow.”
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
              Stand with Communities Facing Emergency Hardship
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
              Partner with ISLAH Welfare Foundation to deploy rapid relief, winter blankets, flood aid kits,
              and livelihood restoration tools to crisis-stricken families across rural India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setModalRole("sponsor")}
                className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                Sponsor Relief Operations
              </button>
              <button
                onClick={() => setModalRole("partner")}
                className="border border-white/30 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Partner as Disaster Response Entity
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
          title={`Support Humanitarian Relief & Rehabilitation`}
        />
      )}
    </div>
  );
}
