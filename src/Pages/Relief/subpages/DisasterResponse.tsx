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
  LifeBuoy,
  Utensils,
  Droplets,
  Home as HomeIcon,
  Shirt,
  Users,
  HeartPulse,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Sparkles,
    title: "Emergency Needs Assessment",
    desc: "Rapidly understanding the nature and scale of an emergency, identifying priority household needs, and aligning responses based on field realities.",
  },
  {
    num: "02",
    icon: LifeBuoy,
    title: "Immediate Humanitarian Response",
    desc: "Facilitating immediate essential assistance including dry food rations, clean drinking water, hygiene materials, and urgent household necessities.",
  },
  {
    num: "03",
    icon: Users,
    title: "Vulnerable Household Support",
    desc: "Giving focused attention to children, pregnant women, single mothers, elderly persons, and individuals with disabilities facing acute hardship.",
  },
  {
    num: "04",
    icon: Building,
    title: "Community-Based Response",
    desc: "Working shoulder-to-shoulder with local village volunteers, grassroots institutions, and administrative authorities for coordinated action.",
  },
  {
    num: "05",
    icon: TrendingUp,
    title: "Recovery & Rehabilitation Linkages",
    desc: "Connecting immediate relief directly with long-term livelihood restoration, productive asset replacement, and community resilience building.",
  },
];

const IMPLEMENTATION_MODULES = [
  { icon: Utensils, title: "Emergency Food & Essential Supplies", desc: "Nutritious dry ration kits, pre-packaged meals, infant food, and cooking fuel for displaced families." },
  { icon: Droplets, title: "Drinking Water & Hygiene Support", desc: "Safe drinking water purification sachets, mobile filtration units, chlorine tablets, and soap kits." },
  { icon: HomeIcon, title: "Shelter-Related & Household Assistance", desc: "Heavy-duty waterproof tarpaulins, bamboo supports, ground sheets, and temporary refuge facilitation." },
  { icon: Shirt, title: "Clothing & Basic Family Essentials", desc: "Clean clothing sets, towels, durable footwear, and weather-appropriate apparel for children and adults." },
  { icon: Users, title: "Targeted Vulnerable Household Care", desc: "Direct specialized aid packages for orphans, widows, bedridden elders, and families without breadwinners." },
  { icon: HeartPulse, title: "Health Assistance & Medical Referrals", desc: "Emergency first aid, distribution of essential medicines, and coordinated transport for critical hospital cases." },
  { icon: GraduationCap, title: "Education & Child-Support Interventions", desc: "Child-friendly temporary learning spaces, replacement notebooks, school bags, and emotional comfort." },
  { icon: TrendingUp, title: "Livelihood Recovery & Tool Restocking", desc: "Replacing lost agricultural tools, artisan looms, petty trade carts, and seeds to restore self-sufficiency." },
  { icon: ShieldCheck, title: "Community Awareness & Preparedness", desc: "Educating rural communities on early storm warnings, safe flood evacuation routes, and hygiene preservation." },
  { icon: Building, title: "Institutional Coordination & Partnerships", desc: "Collaborating transparently with local disaster management authorities, panchayats, and CSR foundations." },
];

const TARGET_PARTICIPANTS = [
  "Families affected by sudden natural disasters, floods, storms, or fires",
  "Economically vulnerable, daily-wage, and landless rural households",
  "Displaced or crisis-affected communities living in temporary shelters",
  "Children, primary students, and youth whose education has been disrupted",
  "Women-headed households, widows, older persons, and persons with disabilities",
  "Small and marginal farmers suffering catastrophic crop or asset loss",
  "Families facing complete loss of shelter, household belongings, or livelihood tools",
  "Other marginalized groups identified through impartial on-ground assessment",
];

const RESPONSE_PATHWAY = [
  { step: "01", label: "ASSESS", tag: "Rapid Audit", desc: "Evaluate on-ground crisis severity, displaced populations, and urgent requirements." },
  { step: "02", label: "PRIORITISE", tag: "Triage Vulnerabilities", desc: "Focus immediate lifelines on women, children, elders, and the most destitute." },
  { step: "03", label: "RESPOND", tag: "Deploy Lifelines", desc: "Deliver dry rations, clean drinking water, tarpaulins, and emergency hygiene." },
  { step: "04", label: "SUPPORT", tag: "Sustain Families", desc: "Provide health checkups, medical referrals, and child-safe learning continuity." },
  { step: "05", label: "RECOVER", tag: "Household Stabilisation", desc: "Assist in debris clearing, temporary shelter rebuilding, and domestic return." },
  { step: "06", label: "REHABILITATE", tag: "Restore Livelihoods", desc: "Replace lost farming tools, livestock, petty trade carts, and artisan gear." },
  { step: "07", label: "BUILD RESILIENCE", tag: "Preparedness", desc: "Train village disaster committees and establish local emergency relief reserves." },
];

const EXPECTED_IMPACTS = [
  "Rapid, dignified, and equitable delivery of critical emergency relief supplies",
  "Immediate access to clean drinking water, nutritious meals, and essential shelter",
  "Direct protection and comfort for the most vulnerable and marginalized families",
  "Preserved human dignity, safety, and hygiene during the peak of acute crisis",
  "Continuity of essential healthcare and primary child education where feasible",
  "Smooth, accelerated transition from emergency relief to livelihood rehabilitation",
  "Stronger community leadership, grassroots volunteering, and civic cohesion",
  "Robust, long-term disaster preparedness and resilient rural village systems",
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

export default function DisasterResponse() {
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
          alt="Emergency Relief & Disaster Response Programme"
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
            <Link to="/programs/relief-and-rehabilitation" className="hover:text-white transition-colors">
              Humanitarian Relief &amp; Rehabilitation
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-bold">Disaster Response</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Initiative 01 • EDR
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Emergency Relief &amp; Disaster Response
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium mb-2">
              Responding with Compassion. Reaching People in Crisis. Supporting Recovery with Dignity.
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mb-6">
              Providing rapid, dignified, and need-based humanitarian assistance during sudden calamities,
              delivering essential food, water, shelter, and creating direct pathways to long-term rehabilitation.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm cursor-pointer"
              >
                Sponsor Emergency Ration Kits
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("volunteer")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Join First-Responder Volunteers
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
                  Rapid Compassion
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Reaching People in Crisis
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Emergencies and disasters can disrupt lives within hours. Floods, fires, storms, extreme weather,
                    displacement, accidents and other crises can cause loss of shelter, food insecurity, livelihood
                    disruption and limited access to essential services.
                  </p>
                  <p>
                    Rural and economically vulnerable communities can face additional challenges due to limited access
                    to healthcare, transportation, markets, communication and institutional support.
                  </p>
                  <p>
                    Through the Emergency Relief &amp; Disaster Response Programme, ISLAH Welfare Foundation seeks to support
                    affected communities through timely, need-based and dignified humanitarian assistance, while helping
                    create pathways towards recovery and rehabilitation.
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
                      Immediate Aid to Long-Term Recovery
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To support individuals and families affected by emergencies and disasters with appropriate immediate
                      assistance and, where feasible, facilitate their transition from relief to recovery, rehabilitation and resilience.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <LifeBuoy className="w-4 h-4" />
                      <span>Speed • Dignity • Community Cohesion</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (5 Pillars) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Response Architecture"
              title="Our Approach"
              subtitle="From thorough field needs assessment to vulnerable household protection and recovery linkages."
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
              label="On-Ground Relief Operations"
              title="Implementation Approach"
              subtitle="Emergency dry rations, water chlorination, medical referrals, shelter materials, and child support."
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

      {/* Response Pathway (7 Steps) */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Crisis Continuum
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Humanitarian Response Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                A disciplined operational progression ensuring immediate relief connects seamlessly into sustainable
                rehabilitation, livelihood revival, and institutional resilience.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
            {RESPONSE_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.04}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STEP {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < RESPONSE_PATHWAY.length - 1 && (
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
                  Priority Groups
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
                  Humanitarian Outcomes
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
              Beyond Immediate Relief
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Compassion, Dignity &amp; Rebuilding
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH believes humanitarian response should go beyond immediate relief. Where circumstances permit,
              our efforts connect emergency assistance with recovery, rehabilitation, livelihood restoration and community resilience.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Relief meets an immediate need. Recovery restores possibilities. Resilience prepares communities for tomorrow.”
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
            to="/programs/relief-and-rehabilitation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Sector Overview: Humanitarian Relief &amp; Rehabilitation
          </Link>
          <Link
            to="/programs/relief-and-rehabilitation/shelter-clothing-necessities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Shelter, Clothing &amp; Necessities Support (SCN)
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
          title={`Support Emergency Disaster Response`}
        />
      )}
    </div>
  );
}
