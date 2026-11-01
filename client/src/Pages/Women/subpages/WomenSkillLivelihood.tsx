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
  Scissors,
  TrendingUp,
  Users,
  Briefcase,
  Heart,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Smartphone,
  Store,
  Palette,
  Compass,
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_women_1.png";
import causeWomenImg from "@/assets/cause-women.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Scissors,
    title: "Skill Development",
    desc: "Training in practical and market-relevant skills based on local needs, interests and opportunities.",
  },
  {
    num: "02",
    icon: Briefcase,
    title: "Livelihood Readiness",
    desc: "Helping women understand how their skills can be converted into employment, services, home-based work or small enterprises.",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Entrepreneurship Development",
    desc: "Building basic entrepreneurial capabilities, including business planning, costing, pricing, customer understanding and enterprise management.",
  },
  {
    num: "04",
    icon: Smartphone,
    title: "Financial & Digital Awareness",
    desc: "Promoting financial literacy, digital confidence, responsible money management and awareness of available financial and livelihood opportunities.",
  },
  {
    num: "05",
    icon: Store,
    title: "Market & Business Linkages",
    desc: "Where feasible, connecting trained women with local markets, customers, institutions, businesses, self-help groups and other livelihood networks.",
  },
  {
    num: "06",
    icon: Heart,
    title: "Mentorship & Continued Support",
    desc: "Providing guidance and mentorship to help women apply their skills, overcome initial challenges and progressively strengthen their livelihood activities.",
  },
];

const TRAINING_MODULES = [
  { icon: Scissors, title: "Tailoring & Garment Making", desc: "Basic stitching, pattern drafting, alteration and professional finishing techniques." },
  { icon: Palette, title: "Handicrafts & Traditional Products", desc: "Local craftwork, embroidery, jute products, and artisanal home décor items." },
  { icon: Sparkles, title: "Beauty & Wellness Services", desc: "Hygienic personal care, bridal styling, and localized salon services." },
  { icon: ShoppingBag, title: "Home-Based Production", desc: "Food preservation, spice grinding, packaging, and handmade household essentials." },
  { icon: Smartphone, title: "Digital Literacy & Basic Computers", desc: "Smartphone banking, online marketplace exploration, and basic digital operations." },
  { icon: Store, title: "Retail & Service-Based Skills", desc: "Customer communication, shop management, and localized neighborhood service provision." },
  { icon: TrendingUp, title: "Small Business & Enterprise Skills", desc: "Costing, bookkeeping, pricing strategy, inventory tracking, and group marketing." },
  { icon: Lightbulb, title: "Locally Relevant Income Activities", desc: "Demand-driven micro-work aligned with seasonal and regional rural market needs." },
];

const TARGET_BENEFICIARIES = [
  "Rural women and adolescent girls seeking self-reliance",
  "Women from economically vulnerable and marginalized households",
  "Women seeking formal employment or independent self-employment",
  "Women interested in home-based flexible livelihoods",
  "Aspiring female micro-entrepreneurs and artisans",
  "Women seeking to strengthen or expand existing small livelihood activities",
];

const LIVELIHOOD_PATHWAY = [
  { step: "01", label: "LEARN", desc: "Foundational training and market awareness" },
  { step: "02", label: "DEVELOP", desc: "Hands-on practice and skill mastery" },
  { step: "03", label: "PREPARE", desc: "Business orientation and toolkit setup" },
  { step: "04", label: "START", desc: "Initiating micro-service or production" },
  { step: "05", label: "EARN", desc: "Generating steady, dignified income" },
  { step: "06", label: "GROW", desc: "Scaling operations and mentoring others" },
];

const IMPACT_OUTCOMES = [
  "Greater access to practical and market-relevant skills",
  "Improved employability and livelihood readiness",
  "Increased opportunities for self-employment",
  "Growth of women-led micro-enterprises",
  "Improved financial and digital awareness",
  "Greater participation of women in household and community economic life",
  "Increased confidence, dignity and economic independence",
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
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Main Subpage ─────────────────────────────────────────────────────────────

export default function WomenSkillLivelihood() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Standardized Hero */}
        <SubpageHeroCarousel
          tag="WOMEN & YOUTH • WSDL"
          title="Women Skill Development & Livelihood Programme"
          subtitle="Building skills, creating sustainable livelihoods, and strengthening women’s financial independence through practical training and market linkage."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Women & Youth", href: "/programs/women-empowerment" },
            { label: "Skill & Livelihood" },
          ]}
          images={[heroImg, causeWomenImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/women-empowerment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Women &amp; Youth Initiatives
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* ── OVERVIEW ── */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Overview" title="Unlocking Talent, Creating Independence" />
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                    <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                      <Scissors className="w-32 h-32" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                      <span>🌿</span> Programme Imperative
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                        The Women Skill Development &amp; Livelihood Programme is an ISLAH initiative designed to help women in rural and underserved communities develop practical skills, access livelihood opportunities, and build sustainable sources of income.
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                        Many women possess talent, determination and the willingness to work, but lack access to structured training, market exposure, financial awareness and opportunities to convert their abilities into meaningful livelihoods.
                      </p>
                      <p className="text-slate-800 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-slate-300">
                        ISLAH seeks to bridge this gap by creating a supportive pathway from learning and skill development to livelihood, entrepreneurship and self-reliance.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5">
                <ScrollReveal delay={0.1}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-brand-green to-brand-orange rounded-2xl opacity-15 blur-sm group-hover:opacity-25 transition-opacity duration-300" />
                    <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
                      <img
                        src={causeWomenImg}
                        alt="Women in training"
                        className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-semibold">
                          Hands-On Vocational Skill Training
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR APPROACH (6 AREAS) ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Programme Approach"
                title="6 Pillars of Livelihood Enablement"
                subtitle="The programme focuses on practical, locally relevant and income-oriented skills that create opportunities for employment, self-employment and home-based enterprises."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {APPROACH_AREAS.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div
                      key={area.num}
                      className="group bg-white hover:bg-slate-50/80 rounded-xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
                    >
                      <span className="absolute top-2 right-4 text-5xl font-extrabold text-slate-100 select-none group-hover:text-brand-green/10 transition-colors">
                        {area.num}
                      </span>
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center mb-4 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-base text-slate-900 group-hover:text-brand-green-dark mb-2 transition-colors">
                          {area.num}. {area.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── IMPLEMENTATION TRACKS ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Implementation Tracks"
                title="Market-Oriented Training Areas"
                subtitle="Depending on local needs and available resources, practical training modules are tailored to regional demands."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.05}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {TRAINING_MODULES.map((track, i) => {
                  const Icon = track.icon;
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-brand-green/30 hover:shadow-md transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green mb-3">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1.5">{track.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{track.desc}</p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── WHO WE AIM TO SUPPORT ── */}
        <section className="py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Target Groups" title="Who We Aim to Support" />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {TARGET_BENEFICIARIES.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-green/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── THE ISLAH LIVELIHOOD PATHWAY ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Livelihood Progression"
                title="The ISLAH Livelihood Pathway"
                subtitle="We believe that meaningful empowerment begins when a woman has the knowledge and skills to make choices, the confidence to take action, and the opportunity to earn with dignity."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-10">
                {LIVELIHOOD_PATHWAY.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white hover:bg-slate-50/80 rounded-xl p-4 text-center border border-slate-200 hover:border-slate-300 shadow-xs transition-all"
                  >
                    <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-wider block mb-1">
                      Step {p.step}
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-slate-900 tracking-wide mb-1">
                      {p.label}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── EXPECTED IMPACT ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Outcomes" title="Expected Impact" />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {IMPACT_OUTCOMES.map((impact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:border-brand-green/30 hover:shadow-md transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-800 leading-relaxed">
                      {impact}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Vision Quote Banner */}
            <ScrollReveal delay={0.15}>
              <div className="mt-12 bg-slate-50/80 border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-3">
                  <span>🌸</span> Our Vision
                </div>
                <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed font-normal">
                  To create an enabling environment where women—particularly in rural and underserved communities—can learn, earn, participate and progress with dignity and confidence.
                </p>
                <blockquote className="text-base sm:text-lg font-semibold italic text-slate-800 max-w-2xl mx-auto leading-relaxed pt-3 border-t border-slate-200">
                  "A skill can become an opportunity. An opportunity can become a livelihood. And a livelihood can become independence."
                </blockquote>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-brand-orange/40" />
                  <span className="text-brand-orange font-semibold text-xs tracking-wide uppercase">
                    Islah Welfare Foundation
                  </span>
                  <span className="h-px w-8 bg-brand-orange/40" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── BACK / NEXT NAV ── */}
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/programs/women-empowerment"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              All Women &amp; Youth Initiatives
            </Link>
            <Link
              to="/programs/women-empowerment/self-help-groups"
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:translate-x-0.5"
            >
              Next: Self-Help Group Capacity Building (SHG)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
