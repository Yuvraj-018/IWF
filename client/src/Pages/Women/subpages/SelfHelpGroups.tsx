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
  Users,
  PiggyBank,
  BookOpen,
  TrendingUp,
  Heart,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Building,
  Smartphone,
  Store,
  Compass,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_women_1.png";
import causeWomenImg from "@/assets/cause-women.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Users,
    title: "Group Formation & Strengthening",
    desc: "Promoting awareness of collective action, group participation, shared responsibility and effective functioning of SHGs.",
  },
  {
    num: "02",
    icon: Compass,
    title: "Leadership & Governance",
    desc: "Building leadership capabilities, participatory decision-making, role clarity, meeting practices and transparent group processes.",
  },
  {
    num: "03",
    icon: BookOpen,
    title: "Financial Literacy & Record Management",
    desc: "Developing basic knowledge of savings, financial planning, record keeping, budgeting and responsible management of group funds.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Livelihood & Enterprise Development",
    desc: "Helping SHGs explore practical livelihood and micro-enterprise opportunities based on members' skills, local resources and market demand.",
  },
  {
    num: "05",
    icon: Smartphone,
    title: "Digital & Financial Inclusion",
    desc: "Improving awareness of digital tools, banking services, digital payments and other relevant financial and livelihood services.",
  },
  {
    num: "06",
    icon: Store,
    title: "Market & Institutional Linkages",
    desc: "Where feasible, facilitating connections with markets, financial institutions, government schemes, businesses, training providers and other support organisations.",
  },
  {
    num: "07",
    icon: Heart,
    title: "Mentorship & Continuous Capacity Building",
    desc: "Providing ongoing guidance and learning opportunities to help groups address challenges, improve their functioning and strengthen sustainability.",
  },
];

const IMPLEMENTATION_TRACKS = [
  { icon: Compass, title: "Leadership", desc: "Developing group facilitators and participatory decision-making skills." },
  { icon: ShieldCheck, title: "Governance", desc: "Transparent meeting procedures, election of leaders, and mutual accountability rules." },
  { icon: PiggyBank, title: "Financial Literacy", desc: "Understanding savings, internal loan rules, interest calculations, and bank linkage." },
  { icon: BookOpen, title: "Record Keeping", desc: "Transparent cashbooks, resolution minutes, loan registers, and individual passbooks." },
  { icon: TrendingUp, title: "Livelihoods", desc: "Collective raw material buying, production schedules, and joint marketing initiatives." },
  { icon: Store, title: "Entrepreneurship", desc: "Feasibility assessment, micro-business planning, and packaging for local markets." },
  { icon: Smartphone, title: "Digital Skills", desc: "UPI payments, mobile banking, SMS alert tracking, and government portal navigation." },
];

const TARGET_GROUPS = [
  "Women-led Self-Help Groups seeking institutional maturity",
  "Emerging community-based groups and rural savings circles",
  "Rural women seeking collective livelihood and micro-business opportunities",
  "SHGs involved in monthly savings and mutual financial assistance",
  "Women aspiring to develop joint micro-enterprises",
  "Community groups requiring organizational, administrative and financial capacity building",
];

const SHG_PATHWAY = [
  { step: "01", label: "ORGANISE", desc: "Mobilizing women & establishing group norms" },
  { step: "02", label: "LEARN", desc: "Financial literacy, bookkeeping & governance" },
  { step: "03", label: "STRENGTHEN", desc: "Regular savings & internal credit discipline" },
  { step: "04", label: "COLLABORATE", desc: "Collective enterprise & peer mentorship" },
  { step: "05", label: "CREATE", desc: "Micro-business setup & institutional linkage" },
  { step: "06", label: "GROW", desc: "Sustainable self-reliance & leadership" },
];

const IMPACT_OUTCOMES = [
  "Stronger and better-organised Self-Help Groups",
  "Improved leadership, accountability and decision-making",
  "Greater financial awareness and responsible money management",
  "Better record-keeping and transparent group governance",
  "Increased collective livelihood and enterprise opportunities",
  "Improved digital and formal financial capability",
  "Stronger market and institutional credit connections",
  "Greater confidence and collective participation among women",
];

// ─── Shared SectionTitle ──────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function SelfHelpGroups() {
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
          tag="WOMEN & YOUTH • SHG"
          title="Self-Help Group Capacity Building"
          subtitle="Strengthening groups, building confidence, and creating collective opportunity when women come together for self-reliance."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Women & Youth", href: "/programs/women-empowerment" },
            { label: "Self-Help Groups" },
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
              <SectionTitle label="Overview" title="Collective Strength, Collective Prosperity" />
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                    <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                      <PiggyBank className="w-32 h-32" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                      <span>🌿</span> Strategic Vision
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                        The Self-Help Group (SHG) Capacity Building Initiative is an ISLAH programme designed to strengthen women-led and community-based groups by developing their organisational, financial, leadership and livelihood capabilities.
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                        Self-Help Groups can become powerful platforms for collective action, savings, livelihood development and community participation. However, many groups need continued guidance and capacity building to strengthen their internal systems, manage resources effectively, access opportunities and develop sustainable income-generating activities.
                      </p>
                      <p className="text-slate-800 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-slate-300">
                        ISLAH seeks to support SHGs with practical knowledge, mentoring and community-level capacity building so that groups can become more organised, confident, responsible and self-reliant.
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
                        alt="Self-Help Group Meeting"
                        className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-semibold">
                          Women-Led Savings &amp; Credit Governance
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR APPROACH (7 AREAS) ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Programme Approach"
                title="7 Pillars of SHG Capacity Building"
                subtitle="Practical training and institutional guidance designed to help community collectives thrive sustainably."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.07}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                {APPROACH_AREAS.slice(0, 6).map((area) => {
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

              {/* 7th Centered Area */}
              <div className="max-w-md mx-auto">
                {APPROACH_AREAS.slice(6).map((area) => {
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

        {/* ── IMPLEMENTATION APPROACH ── */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Core Competencies"
                title="Implementation Approach"
                subtitle="Targeted modules delivered through community animators and field coordinators."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {IMPLEMENTATION_TRACKS.map((track, i) => {
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
              <SectionTitle label="Target Beneficiaries" title="Who We Aim to Support" />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {TARGET_GROUPS.map((item, i) => (
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

        {/* ── THE ISLAH SHG DEVELOPMENT PATHWAY ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Progression Pathway"
                title="The ISLAH SHG Development Pathway"
                subtitle="Our approach is designed to help SHGs progress from collective participation to stronger institutions and sustainable livelihood opportunities."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-10">
                {SHG_PATHWAY.map((p, i) => (
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <span>✨</span> Our Vision
                </div>
                <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed font-normal">
                  To strengthen Self-Help Groups as inclusive platforms for learning, collective action, economic opportunity and community development, enabling rural women to build stronger livelihoods and greater self-reliance.
                </p>
                <blockquote className="text-base sm:text-lg font-semibold italic text-slate-800 max-w-2xl mx-auto leading-relaxed pt-3 border-t border-slate-200">
                  "When women come together, collective strength becomes collective opportunity."
                </blockquote>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-brand-orange/40" />
                  <span className="text-brand-orange font-semibold text-xs tracking-wide uppercase">
                    Part of Women &amp; Youth Empowerment — ISLAH
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
              to="/programs/women-empowerment/women-skill-livelihood"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Prev: Women Skill Development (WSDL)
            </Link>
            <Link
              to="/programs/women-empowerment/womens-rights"
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:translate-x-0.5"
            >
              Next: Women's Rights &amp; Gender Equality (WRGE)
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
