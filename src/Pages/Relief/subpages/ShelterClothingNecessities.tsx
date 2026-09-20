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
  Home as HomeIcon,
  Shirt,
  Package,
  HeartHandshake,
  Shield,
  Sparkles,
  Users,
  CheckCircle2,
  TrendingUp,
  Droplets,
  Bed,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Package,
    title: "Emergency Household Support",
    desc: "Facilitating essential replacement household utility articles, cooking utensils, and storage vessels for families whose belongings were destroyed.",
  },
  {
    num: "02",
    icon: HomeIcon,
    title: "Shelter-Related Assistance",
    desc: "Supporting appropriate temporary emergency shelter solutions, heavy waterproof tarpaulins, bamboo poles, and weatherproofing for displaced families.",
  },
  {
    num: "03",
    icon: Shirt,
    title: "Clothing & Seasonal Essentials",
    desc: "Supplying clean, dignified sets of everyday clothing, winter woollens, shawls, and durable footwear tailored to seasonal climate realities.",
  },
  {
    num: "04",
    icon: Bed,
    title: "Family Necessities & Comfort",
    desc: "Providing mattresses, sleeping mats, thick warm blankets, mosquito nets, and personal hygiene products to restore restful family sleep.",
  },
  {
    num: "05",
    icon: HeartHandshake,
    title: "Need-Based Fair Distribution",
    desc: "Executing transparent, respectful, and verified on-ground distribution prioritizing the most vulnerable, destitute, and excluded households.",
  },
];

const IMPLEMENTATION_MODULES = [
  { icon: HomeIcon, title: "Temporary Shelter Support Kits", desc: "Heavy-duty waterproof tarpaulins, ground sheets, fastening ropes, and bamboo frames for quick emergency shelter." },
  { icon: Shirt, title: "Clothing & Seasonal Apparel", desc: "Clean everyday cotton garments, thermal innerwear, sarees, dhotis, children's clothes, and sturdy slippers." },
  { icon: Bed, title: "Blankets & Bedding Bundles", desc: "Thick fleece quilts, woollen blankets, sleeping floor mats, and protective long-lasting mosquito bed nets." },
  { icon: Package, title: "Basic Kitchen Utensil Sets", desc: "Stainless steel pots, cooking pans, ladle spoons, plates, tumblers, and water storage containers." },
  { icon: Droplets, title: "Hygiene & Personal-Care Packs", desc: "Bathing soap, washing detergent, dental hygiene kits, sanitary napkins, and antiseptic liquid solutions." },
  { icon: Sparkles, title: "Essential Family Care Supplies", desc: "Solar lanterns, emergency torches, matchboxes, candles, and safe infant feeding supplies." },
  { icon: Shield, title: "Emergency Household Relief Kits", desc: "Comprehensive bundled family cartons packaged for immediate domestic restoration after flood or fire." },
  { icon: Users, title: "Support for Loss-Affected Families", desc: "Individualized case support for households suffering catastrophic total property destruction." },
  { icon: HeartHandshake, title: "Assessment-Driven Special Needs Aid", desc: "Customized provisions including walking canes, infant blankets, and adult diapers for special care dependents." },
];

const TARGET_PARTICIPANTS = [
  "Families affected by natural disasters, floods, storms, and fire outbreaks",
  "Displaced households living in roadside camps or community halls",
  "Families whose permanent homes or domestic belongings were damaged or washed away",
  "Economically vulnerable, daily-wage, and landless rural households",
  "Women-headed households, widows, and single mothers caring for young children",
  "Children and adolescents requiring urgent weather-protective clothing",
  "Older persons living alone and individuals with physical disabilities",
];

const SUPPORT_PATHWAY = [
  { step: "01", label: "IDENTIFY NEED", tag: "Damage Audit", desc: "Map unhoused families, lost belongings, and acute household gaps across villages." },
  { step: "02", label: "PRIORITISE", tag: "Triage Support", desc: "Focus immediate distribution on widows, infants, disabled, and completely destitute households." },
  { step: "03", label: "MOBILISE", tag: "Quality Packs", desc: "Procure high-grade waterproof tarpaulins, warm blankets, and stainless steel utensil kits." },
  { step: "04", label: "DISTRIBUTE", tag: "Dignified Handover", desc: "Conduct orderly, respectful, voucher-verified community distribution camps." },
  { step: "05", label: "FOLLOW UP", tag: "Comfort Check", desc: "Visit families to ensure shelters are weather-tight and children are warm and protected." },
  { step: "06", label: "SUPPORT RECOVERY", tag: "Long-Term Rebuilding", desc: "Transition families towards permanent home repair, livelihood revival, and self-reliance." },
];

const EXPECTED_IMPACTS = [
  "Immediate restoration of fundamental domestic comfort, safety, and physical warmth",
  "Enhanced safety and weather protection for displaced and disaster-affected families",
  "Deep protection of human dignity and self-respect during catastrophic disruption",
  "Significant reduction in exposure-related illnesses, pneumonia, and hypothermia",
  "Rapid stabilization of everyday family cooking, hygiene, and domestic routines",
  "Greater community participation and solidarity in mutual relief coordination",
  "Smooth and empowered transition from emergency assistance towards long-term recovery",
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

export default function ShelterClothingNecessities() {
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
          alt="Shelter, Clothing & Necessities Support"
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
            <span className="text-brand-orange font-bold">Shelter, Clothing &amp; Necessities</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Initiative 02 • SCN
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Shelter, Clothing &amp; Necessities Support
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium mb-2">
              Restoring Essential Comfort. Protecting Dignity. Supporting Families Through Crisis.
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mb-6">
              Helping disaster-affected and vulnerable households access emergency shelter materials, seasonal clothing,
              bedding, cooking utensils, and family kits to restore basic living security.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm cursor-pointer"
              >
                Sponsor Family Shelter &amp; Bedding Kits
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("volunteer")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Volunteer for Kit Distribution
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
                  Restoring Human Comfort
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Protecting Families Through Hardship
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    During disasters and humanitarian emergencies, families can lose or become separated from the
                    necessities that make everyday life possible. Damage to homes, displacement, loss of belongings
                    and disruption of household resources can place already vulnerable families under severe pressure.
                  </p>
                  <p>
                    The Shelter, Clothing &amp; Basic Necessities Support initiative seeks to help affected and vulnerable
                    households access essential items and appropriate emergency support, based on assessed needs and available resources.
                  </p>
                  <p>
                    We believe that providing blankets, clothing, and shelter is not merely material relief—it is a vital
                    restoration of human dignity, physical safety, and personal comfort in the midst of turmoil.
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
                      Dignity, Safety &amp; Well-Being
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To support families facing humanitarian hardship with essential household, clothing and shelter-related
                      assistance that helps protect dignity, safety and basic well-being during and after emergencies.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <HomeIcon className="w-4 h-4" />
                      <span>Shelter • Clothing • Warmth • Dignity</span>
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
              label="Assistance Pillars"
              title="Our Approach"
              subtitle="Covering emergency household utensils, temporary shelter, seasonal clothing, and fair need-based distribution."
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
              label="Essential Kit Contents"
              title="Implementation Approach"
              subtitle="High-grade tarpaulins, bedding quilts, seasonal apparel, cooking sets, and personal care packs."
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

      {/* Support Pathway (6 Steps) */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Operational Lifecycle
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Support Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                From identifying unhoused families to procuring durable kits, respectful handover, and monitoring
                warmth, safety, and long-term recovery.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {SUPPORT_PATHWAY.map((stage, idx) => (
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
                  {idx < SUPPORT_PATHWAY.length - 1 && (
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
                  Priority Recipients
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
                  Measured Relief
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
              Dignity Through Hardship
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              No Family Should Face Crisis Alone
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              Communities affected by emergencies should not have to face the loss of basic necessities alone.
              Through compassionate, prompt, and responsible support, vulnerable families regain security, dignity, and stability.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “In times of crisis, restoring basic necessities is also about restoring dignity.”
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
            to="/programs/relief-and-rehabilitation/emergency-disaster-response"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Emergency Disaster Response (EDR)
          </Link>
          <Link
            to="/programs/relief-and-rehabilitation/seasonal-disaster-relief"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Seasonal &amp; Disaster-Specific Relief (SDSR)
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
          title={`Support Shelter, Clothing & Necessities`}
        />
      )}
    </div>
  );
}
