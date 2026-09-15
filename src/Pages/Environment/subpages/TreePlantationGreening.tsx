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
  Trees,
  ShieldCheck,
  Droplets,
  GraduationCap,
  Sparkles,
  Leaf,
  Users,
  CheckCircle2,
  TrendingUp,
  Sprout,
  Heart,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Trees,
    title: "Community Plantation",
    desc: "Mobilizing broad community participation in planting native trees across village commons, roadside avenues, pond banks, and public spaces.",
  },
  {
    num: "02",
    icon: Sprout,
    title: "Appropriate Planting",
    desc: "Promoting scientific awareness in selecting hardy, climate-adapted indigenous species (Neem, Peepal, Banyan, Jamun, Amla) suitable for local soils.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Tree Care & Survival",
    desc: "Emphasising vital post-plantation protection—protective tree guards, bio-fencing, regular watering schedules, mulching, and growth monitoring.",
  },
  {
    num: "04",
    icon: GraduationCap,
    title: "School & Youth Participation",
    desc: "Engaging rural students and youth clubs through 'Adopt-a-Tree' campaigns, campus eco-nurseries, and hands-on botanical education.",
  },
  {
    num: "05",
    icon: Sparkles,
    title: "Community Green Spaces",
    desc: "Developing and revitalizing shared shaded community groves, hospital verges, temple peripheries, and village memorial forests.",
  },
  {
    num: "06",
    icon: Leaf,
    title: "Biodiversity Awareness",
    desc: "Educating communities on the critical ecological role of diverse trees in conserving groundwater, preventing soil erosion, and harboring birds.",
  },
];

const IMPLEMENTATION_MODULES = [
  { icon: Trees, title: "Community Tree Plantation Drives", desc: "Mass seasonal planting events during monsoon months bringing together families, youth, and elders." },
  { icon: GraduationCap, title: "School & Youth Planting Activities", desc: "School campus greening projects instilling a sense of personal ownership and environmental empathy in children." },
  { icon: ShieldCheck, title: "Tree Care & Protection Awareness", desc: "Training communities on installing bamboo tree-guards, applying organic pest repellents, and seasonal pruning." },
  { icon: Sparkles, title: "Community Greening Campaigns", desc: "Coordinating multi-village competitions and celebratory tree-planting melas to revitalize denuded commons." },
  { icon: Sprout, title: "Institutional Campus Plantation", desc: "Greening premises of primary health centres, gram panchayat offices, veterinary clinics, and schools." },
  { icon: Leaf, title: "Native & Indigenous Species Advocacy", desc: "Educating against invasive monocultures (like Eucalyptus) in favor of deep-rooted, drought-tolerant native varieties." },
  { icon: Droplets, title: "Watering & Post-Plantation Maintenance", desc: "Setting up community watering rotas, drip bottle irrigation, and dry-season survival patrols." },
  { icon: Users, title: "Environmental Education Workshops", desc: "Interactive field sessions explaining tree carbon sequestration, micro-climate cooling, and groundwater recharge." },
  { icon: Heart, title: "Community Monitoring & Tree Census", desc: "Tracking sapling survival rates at 6, 12, and 24 months to ensure true long-term ecological returns." },
];

const TARGET_PARTICIPANTS = [
  "Rural village residents and farming families",
  "Primary and secondary school students and teachers",
  "Youth groups, Nehru Yuva Kendra volunteers, and eco-clubs",
  "Women's Self-Help Groups and neighborhood collectives",
  "Smallholder farmers seeking agro-forestry boundaries",
  "Gram Panchayats, rural dispensaries, and local institutions",
  "Environmental volunteers, CSR teams, and tree lovers",
  "Civil society organisations and conservation activists",
];

const GREEN_PATHWAY = [
  { step: "01", label: "PLANT", tag: "Native Saplings", desc: "Select and plant robust, indigenous trees adapted to local agro-ecology." },
  { step: "02", label: "PROTECT", tag: "Tree Guards", desc: "Shield fragile young saplings from livestock grazing, drought, and weed choke." },
  { step: "03", label: "CARE", tag: "Water & Mulch", desc: "Nurture with regular moisture, organic compost, and community watering duties." },
  { step: "04", label: "GROW", tag: "Survival Audits", desc: "Monitor robust vegetative growth and root anchoring across multiple seasons." },
  { step: "05", label: "RESTORE", tag: "Ecosystem Return", desc: "Welcome back nesting birds, shade, soil stability, and ambient cooling." },
  { step: "06", label: "SUSTAIN", tag: "Living Heritage", desc: "Protect mature village canopies for the health and dignity of future generations." },
];

const EXPECTED_IMPACTS = [
  "High rates of community participation and active civic ownership in tree planting",
  "Pivotal shift from superficial planting numbers to long-term sapling survival and care",
  "Substantial expansion of village green cover, roadside shade, and micro-forests",
  "Deepened ecological consciousness and nurturing habits among school students",
  "Revitalization of local bird populations, pollinator insect habitats, and biodiversity",
  "Cooler village micro-climates and enhanced topsoil moisture retention",
  "Vibrant, aesthetically pleasing community surroundings and shared green groves",
  "Enduring village tradition of celebrating life milestones by planting trees",
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

export default function TreePlantationGreening() {
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
          alt="Tree Plantation & Community Greening Programme"
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
            <span className="text-brand-orange font-medium">Tree Plantation &amp; Greening</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 03 • TPCG
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Tree Plantation &amp; Community Greening Programme
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Plant Today. Care for Tomorrow. Grow a Greener Future.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Moving beyond token sapling drives to long-term tree protection, native biodiversity restoration,
              community stewardship, and resilient green public spaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("volunteer")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Volunteer as Tree Guardian
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Sponsor 100 Native Saplings &amp; Guards
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
                  Beyond Planting Alone
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Protecting &amp; Caring for Trees Over Time
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Trees and vegetation are important components of healthy ecosystems and can contribute to biodiversity,
                    soil protection, local environmental quality, shade, community well-being and greener rural landscapes.
                  </p>
                  <p>
                    However, plantation alone is not enough. Successful community greening also requires appropriate species
                    selection, suitable locations, community participation and long-term care.
                  </p>
                  <p>
                    The Tree Plantation &amp; Community Greening Programme of ISLAH seeks to promote responsible plantation
                    and community-based greening activities in rural and underserved areas. Our approach emphasises not only
                    planting trees but also protecting and caring for them over time.
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
                      Stewardship &amp; Survival
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To promote community participation in tree plantation, tree care, green-cover development and environmental
                      stewardship while encouraging locally appropriate and sustainable greening practices.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Trees className="w-4 h-4" />
                      <span>Native Species • Tree Survival • Long-Term Care</span>
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
              label="Greening Principles"
              title="Our Approach"
              subtitle="Ensuring high sapling survival rates through community participation, indigenous species, and youth involvement."
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
              label="Operations in the Field"
              title="Implementation Approach"
              subtitle="Plantation drives, school nurseries, tree guards, watering systems, and survival census monitoring."
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

      {/* Green Pathway (6 Steps) */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Lifecycle Framework
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Our Green Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                The success of a plantation programme should not be measured only by the number of saplings planted,
                but fundamentally by their multi-year survival, growth, and long-term contribution to local ecosystems.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {GREEN_PATHWAY.map((stage, idx) => (
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
                  {idx < GREEN_PATHWAY.length - 1 && (
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
                  Ecological Returns
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
              Intergenerational Stewardship
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Commitment to Tomorrow's Canopies
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH believes that the success of a plantation programme is defined by living trees that shelter,
              nourish, cool, and sustain rural villages for decades to come.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Planting a tree is an action today; caring for it is a commitment to tomorrow.”
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
            to="/programs/environment/green-village-clean-community"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Green Village &amp; Clean Community (GCC)
          </Link>
          <Link
            to="/programs/environment/sustainable-rural-development"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Sustainable Rural Development (SRD)
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
          title={`Support Tree Plantation & Community Greening`}
        />
      )}
    </div>
  );
}
