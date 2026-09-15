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
  Store,
  Lightbulb,
  Search,
  BookOpen,
  Rocket,
  Smartphone,
  Network,
  Users,
  CheckCircle2,
  TrendingUp,
  Wheat,
  Utensils,
  Palette,
  Scissors,
  ShoppingBag,
  Wrench,
  Laptop,
  Factory,
  Compass,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_entrepreneur_1.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Entrepreneurship Awareness",
    desc: "Creating awareness about entrepreneurship, self-employment and local business opportunities as pathways towards income and economic independence.",
  },
  {
    num: "02",
    icon: Search,
    title: "Opportunity & Idea Identification",
    desc: "Helping participants identify viable business ideas based on local resources, skills, community needs and market demand.",
  },
  {
    num: "03",
    icon: BookOpen,
    title: "Business Skills & Capacity Building",
    desc: "Developing practical knowledge in business planning, costing, pricing, bookkeeping, customer management, marketing and basic financial management.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Enterprise Start-up Support",
    desc: "Where feasible, providing guidance to aspiring entrepreneurs as they move from an idea towards establishing a small or micro-enterprise.",
  },
  {
    num: "05",
    icon: Smartphone,
    title: "Digital & Financial Capability",
    desc: "Promoting awareness of digital tools, online opportunities, banking, digital payments and responsible financial practices relevant to enterprise development.",
  },
  {
    num: "06",
    icon: Network,
    title: "Market & Business Linkages",
    desc: "Where feasible, connecting rural entrepreneurs with local markets, customers, businesses, institutions, producer groups and other relevant networks.",
  },
  {
    num: "07",
    icon: Users,
    title: "Mentorship & Enterprise Growth",
    desc: "Providing access, where possible, to experienced entrepreneurs and professionals who can offer practical guidance on managing challenges and strengthening business sustainability.",
  },
];

const ENTERPRISE_SECTORS = [
  { icon: Wheat, title: "Agriculture & Allied Enterprises", desc: "Agri-inputs, nursery management, dairy collectives, poultry units, and post-harvest handling." },
  { icon: Utensils, title: "Food Processing & Value Addition", desc: "Local grain milling, oil pressing, spices packaging, dehydration and seasonal food ventures." },
  { icon: Palette, title: "Handicrafts & Traditional Products", desc: "Artisan cooperatives, pottery, handloom, sustainable eco-crafts and decorative regional goods." },
  { icon: Scissors, title: "Tailoring & Garment Enterprises", desc: "Boutique stitching units, school uniform production, textile trading and readymade apparel." },
  { icon: ShoppingBag, title: "Rural Retail & Service Businesses", desc: "Essential grocery stores, stationery outlets, rural hardware and personal care setups." },
  { icon: Wrench, title: "Repair & Technical Services", desc: "Two-wheeler servicing, electrical maintenance, solar installation, mobile and appliance repair." },
  { icon: Laptop, title: "Digital & Tech-Enabled Services", desc: "Digital service kiosks, printing/scanning stations, online commerce facilitation and data desks." },
  { icon: Store, title: "Home-Based Enterprises", desc: "Flexible cottage production, catering services, specialty baking and customized home products." },
  { icon: Factory, title: "Small-Scale Manufacturing", desc: "Paper cups/plates, packaging materials, cement brick moulding and sanitary products manufacturing." },
  { icon: Compass, title: "Local Tourism & Community Services", desc: "Eco-tourism homestays, transport coordination, cultural experiences and regional guiding." },
  { icon: Sparkles, title: "Locally Relevant Micro-Enterprises", desc: "Innovative rural business models tailored to unique regional resources and niche demands." },
];

const TARGET_ENTREPRENEURS = [
  "Rural youth and aspiring first-generation entrepreneurs",
  "Women entrepreneurs seeking commercial independence",
  "Members of Self-Help Groups (SHGs) looking to launch group enterprises",
  "Small-scale producers and localized service providers",
  "Farmers and rural households exploring agro-processing value addition",
  "Unemployed and underemployed individuals with business ambition",
  "Existing micro-enterprises seeking to stabilize and scale operations",
  "Economically vulnerable communities seeking long-term resilience",
];

const ENTREPRENEURSHIP_STAGES = [
  { step: "01", label: "IDENTIFY", desc: "Discover viable market opportunities & assess local community needs" },
  { step: "02", label: "LEARN", desc: "Acquire business fundamentals, costing, pricing & management basics" },
  { step: "03", label: "PLAN", desc: "Draft practical business roadmap, operational setup & financial model" },
  { step: "04", label: "START", desc: "Mobilize seed capital, acquire initial equipment & register enterprise" },
  { step: "05", label: "MANAGE", desc: "Maintain day-to-day accounts, quality standards & customer relationships" },
  { step: "06", label: "CONNECT", desc: "Establish stable supply chains, distribution networks & market channels" },
  { step: "07", label: "GROW", desc: "Expand operations, hire local talent & mentor upcoming entrepreneurs" },
];

const IMPACT_METRICS = [
  "Greater awareness of rural entrepreneurship opportunities",
  "Improved business and enterprise management capabilities",
  "Increased readiness and confidence for self-employment",
  "Development of new and emerging micro-enterprises",
  "Strengthening and formalization of existing small businesses",
  "Greater financial literacy and digital payments capability",
  "Improved access to regional markets and business networks",
  "Increased local employment and income-generation opportunities",
  "Greater economic resilience, self-reliance and community wealth",
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

export default function RuralEntrepreneurship() {
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
          alt="Rural Entrepreneurship Initiative"
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
            <Link to="/programs/skills-development" className="hover:text-white transition-colors">
              Skills, Livelihoods &amp; Entrepreneurship
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Rural Entrepreneurship</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 03 • REI
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Rural Entrepreneurship Initiative
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Local Ideas. Local Enterprise. Sustainable Rural Growth.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Encouraging and supporting entrepreneurship within rural and underserved communities by helping
              individuals transform local skills, resources, ideas and opportunities into sustainable enterprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Partner as an Enterprise Mentor
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Support Seed Incubation
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
                  Unlocking Rural Potential
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  From Idea to Viable Local Enterprise
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    The Rural Entrepreneurship Initiative is an ISLAH programme designed to encourage and support
                    entrepreneurship within rural and underserved communities by helping individuals transform local skills,
                    resources, ideas and opportunities into sustainable enterprises.
                  </p>
                  <p>
                    Rural communities possess significant entrepreneurial potential—from agriculture and traditional crafts
                    to local services, food processing and emerging digital opportunities. However, limited access to business
                    knowledge, finance, markets, technology, mentorship and enterprise networks can prevent promising ideas
                    from developing into viable businesses.
                  </p>
                  <p>
                    ISLAH seeks to help bridge these gaps by creating a supportive pathway from entrepreneurial awareness
                    to enterprise development, income generation and sustainable growth.
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
                      Fostering Inclusive Rural Enterprise
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      The initiative aims to promote a culture of rural entrepreneurship where individuals can identify
                      opportunities, develop practical business capabilities, start suitable enterprises and progressively build sustainable livelihoods.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our focus is on practical, locally relevant and inclusive entrepreneurship, particularly for people
                      who have limited access to conventional business support.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (7 Pillars) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Enterprise Incubation"
              title="Our Approach"
              subtitle="A structured framework guiding grassroots entrepreneurs from ideation to sustainable business growth."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROACH_PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} delay={index * 0.05}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-lg bg-[#004724]/10 text-brand-green flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-extrabold text-slate-400 font-mono tracking-wider">
                          {pillar.num}
                        </span>
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

      {/* Implementation Sectors */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Potential Ventures"
              title="Implementation Approach"
              subtitle="Depending on local resources, skills and market opportunities, the initiative fosters diverse micro-enterprises."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENTERPRISE_SECTORS.map((sector, index) => {
              const IconComp = sector.icon;
              return (
                <ScrollReveal key={sector.title} delay={index * 0.03}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{sector.title}</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{sector.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The ISLAH Entrepreneurship Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Action Architecture
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                The ISLAH Entrepreneurship Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                The objective is not simply to encourage people to start businesses, but to help them develop
                the knowledge, capabilities, networks and confidence required to build sustainable enterprises.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {ENTREPRENEURSHIP_STAGES.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">PHASE {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{stage.label}</h3>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < ENTREPRENEURSHIP_STAGES.length - 1 && (
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

      {/* Target Audience & Expected Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Eligible Participants
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Aim to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_ENTREPRENEURS.map((item) => (
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
                  Long-Term Value
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {IMPACT_METRICS.map((outcome) => (
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
              Our Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Vibrant Rural Entrepreneurship Ecosystems
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              To foster a vibrant rural entrepreneurship ecosystem where local talent, skills and resources
              can become sustainable enterprises, meaningful livelihoods and engines of community-level economic development.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Entrepreneurship begins with an idea, grows through capability and creates lasting value when opportunity meets action.”
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
            to="/programs/skills-development/livelihood-development"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Livelihood Development Initiative (LDI)
          </Link>
          <Link
            to="/programs/skills-development/micro-enterprise-support"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Micro-Enterprise &amp; Self-Employment Support (MSES)
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
          title={`Support Rural Entrepreneurship Initiative`}
        />
      )}
    </div>
  );
}
