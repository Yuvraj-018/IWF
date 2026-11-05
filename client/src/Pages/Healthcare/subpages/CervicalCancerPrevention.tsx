import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
} from "@/components/layout/SiteLayout";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Ribbon,
  Microscope,
  Heart,
  Users,
  HandHeart,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
  Handshake,
  BarChart2,
  HeartPulse,
  BookOpen,
  MessageCircle,
  Building2,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import cervicalCancerImg from "@/assets/cervical_cancer.png";
import cervicalCancerHero from "@/assets/cervical-cancer.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const AWARENESS_GAPS = [
  "The causes and symptoms of cervical cancer",
  "The importance of early screening and prevention",
  "Availability of HPV vaccination and preventive healthcare",
  "Regular women's health check-ups and medical consultation",
];

const CHALLENGES = [
  "Limited access to women's healthcare services",
  "Lack of awareness about cervical cancer and HPV infection",
  "Inability to afford screening and diagnostic tests",
  "Delayed diagnosis due to social hesitation and fear",
  "Poor access to preventive healthcare and medical counselling",
];

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Awareness & Health Education Campaigns",
    bullets: [
      "Community awareness sessions on cervical cancer prevention",
      "Education about HPV infection, symptoms, risk factors, and early signs",
      "Promotion of regular women's health check-ups and preventive care",
    ],
  },
  {
    num: "02",
    icon: Microscope,
    title: "Cervical Cancer Screening Support",
    bullets: [
      "Organising screening and health check-up camps for women",
      "Encouraging early diagnosis through medical consultation and screening",
      "Referral assistance for women requiring further medical evaluation",
    ],
  },
  {
    num: "03",
    icon: Heart,
    title: "Women's Health & Hygiene Awareness",
    bullets: [
      "Awareness on reproductive health, menstrual hygiene, and women's wellness",
      "Promoting healthy lifestyle practices and preventive healthcare behaviour",
      "Breaking myths, fear, and stigma associated with women's diseases",
    ],
  },
  {
    num: "04",
    icon: Users,
    title: "Community Outreach & Rural Health Engagement",
    bullets: [
      "Outreach programmes in rural and underserved communities",
      "Engagement with healthcare professionals, volunteers, and women groups",
      "Health education through schools, community centres, and awareness drives",
    ],
  },
  {
    num: "05",
    icon: HandHeart,
    title: "Support for Economically Weaker Women",
    bullets: [
      "Assistance and guidance for vulnerable women requiring medical support",
      "Connecting needy patients with healthcare institutions and support systems",
      "Encouraging access to affordable preventive healthcare services",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  { icon: Ribbon, text: "Medical awareness camps and women health outreach programmes" },
  { icon: Handshake, text: "Collaboration with doctors, hospitals, healthcare experts, and volunteers" },
  { icon: Users, text: "Community mobilisation and health education activities" },
  { icon: HeartPulse, text: "CSR partnerships and public health support initiatives" },
  { icon: BarChart2, text: "Monitoring and documentation of programme outreach and impact" },
];

const IMPACT_OUTCOMES = [
  { icon: Lightbulb, text: "Increase awareness about cervical cancer prevention and early detection" },
  { icon: Stethoscope, text: "Encourage women to undergo regular health screening" },
  { icon: MessageCircle, text: "Reduce stigma and misinformation related to women's health" },
  { icon: Building2, text: "Improve access to preventive healthcare services in rural areas" },
  { icon: ShieldCheck, text: "Promote healthier, informed, and empowered communities" },
];

// ─── Shared ──────────────────────────────────────────────────────────────────

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">{label}</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{title}</h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <SubpageHeroCarousel
      tag="HEALTHCARE • CCPA"
      title="Cervical Cancer Prevention & Awareness (CCPA)"
      subtitle="Creating awareness, encouraging prevention, and protecting women's health through early screening, HPV education, and timely medical intervention."
      breadcrumbs={[
        { label: "What We Do", href: "/programs" },
        { label: "Healthcare", href: "/programs/healthcare" },
        { label: "Cervical Cancer Prevention" },
      ]}
      images={[cervicalCancerHero, cervicalCancerImg]}
    >
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All Healthcare Initiatives
        </Link>
      </div>
    </SubpageHeroCarousel>
  );
}

function OverviewSection() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle label="Overview" title="The Awareness Gap We Must Close" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                  <Ribbon className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                    Cervical cancer is one of the most preventable yet life-threatening diseases affecting women, particularly in low-income and rural communities where awareness, early screening, and access to healthcare remain limited. In India, thousands of women lose their lives every year due to late diagnosis and lack of timely medical intervention.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                    Social stigma, poor healthcare access, financial hardship, and lack of awareness often prevent women from seeking timely diagnosis and treatment.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand-green to-brand-orange rounded-2xl opacity-15 blur-sm group-hover:opacity-25 transition-opacity duration-300" />
                <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
                  <img
                    src={cervicalCancerImg}
                    alt="Cervical Cancer Prevention & Awareness"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Cervical Cancer Prevention &amp; Awareness</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Two-column comparison block as specified in Phase 6 design spec */}
        <ScrollReveal stagger={0.06}>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Left: What Women Don't Know */}
            <div className="group bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-green-dark uppercase tracking-wide transition-colors">What Women Don't Know</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4 italic leading-relaxed">
                Despite advancements in medical science, many women in rural and underserved areas remain unaware of:
              </p>
              <ul className="space-y-3 flex-1">
                {AWARENESS_GAPS.map((gap, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: What Women Face */}
            <div className="group bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-green-dark uppercase tracking-wide transition-colors">What Women Face</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4 italic leading-relaxed">
                Women in economically weaker communities frequently face:
              </p>
              <ul className="space-y-3 flex-1">
                {CHALLENGES.map((challenge, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-gradient-to-br from-slate-50 to-brand-green/5 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              As a result, many cases are detected only at advanced stages, reducing the chances of successful treatment and survival.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this urgent healthcare challenge, Islah Welfare Foundation (Islah) proposes the Cervical Cancer Prevention &amp; Awareness Programme to promote awareness, preventive healthcare, early screening, and women’s health education, especially in rural and underserved communities.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full max-w-full text-center whitespace-normal">
              Our Goal: Empower women with knowledge, encourage early detection, and reduce the burden of cervical cancer through awareness and preventive action.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ObjectiveSection() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="bg-white border border-brand-green/20 rounded-md p-8 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
              Programme Objective
            </p>
            <p className="text-base md:text-lg text-slate-800 font-medium leading-relaxed">
              To improve awareness, promote preventive healthcare, and support early detection of cervical cancer among women, especially in economically weaker and rural communities.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            label="Programme Approach"
            title="5 Pillars of Action"
            subtitle="From awareness campaigns to rural outreach and economic support — Islah takes a holistic approach to women's health."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {APPROACH_AREAS.slice(0, 3).map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.num}
                  className="group relative bg-white hover:bg-slate-50/80 rounded-xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-1"
                >
                  <span className="absolute top-3 right-4 text-5xl font-extrabold text-slate-100 select-none leading-none group-hover:text-brand-green/10 transition-colors">
                    {area.num}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-green-dark transition-colors">{area.title}</h3>
                  </div>
                  <ul className="space-y-2.5 flex-1 relative z-10">
                    {area.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {APPROACH_AREAS.slice(3).map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.num}
                  className="group relative bg-white hover:bg-slate-50/80 rounded-xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-1"
                >
                  <span className="absolute top-3 right-4 text-5xl font-extrabold text-slate-100 select-none leading-none group-hover:text-brand-green/10 transition-colors">
                    {area.num}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-green-dark transition-colors">{area.title}</h3>
                  </div>
                  <ul className="space-y-2.5 flex-1 relative z-10">
                    {area.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ImplementationSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle label="How We Work" title="Implementation Approach" />
        </ScrollReveal>
        <ScrollReveal stagger={0.1}>
          <div className="relative">
            <div className="hidden lg:block absolute top-11 left-0 right-0 h-0.5 bg-brand-green/20 z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
              {IMPLEMENTATION_STEPS.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-[88px] h-[88px] rounded-full bg-white border-2 border-brand-green/30 flex flex-col items-center justify-center mb-4 shadow-sm group-hover:border-brand-green group-hover:shadow-md transition-all duration-300">
                    <Icon className="w-6 h-6 text-brand-green mb-1" />
                    <span className="text-[10px] font-bold text-brand-green">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed group-hover:text-slate-800 transition-colors">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle label="Expected Impact" title="5 Outcomes We Drive" />
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {IMPACT_OUTCOMES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group bg-white hover:bg-slate-50/80 rounded-xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] font-bold text-brand-orange mb-2">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-slate-50/80 border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
            <p className="text-base sm:text-lg font-semibold text-slate-800 max-w-3xl mx-auto leading-relaxed italic">
              "Creating awareness, encouraging prevention, and protecting women's health — because early action can save lives."
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand-orange/40" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/40" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function BackNav() {
  return (
    <section className="py-10 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/programs/healthcare/menstrual-hygiene"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Menstrual Health &amp; Hygiene (MHHS)
        </Link>
        <Link
          to="/programs/healthcare/wellness-centres"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:translate-x-0.5"
        >
          Next: Rural Healthcare &amp; Wellness Centres (RHWC)
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default function CervicalCancerPrevention() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <HeroSection />
        <OverviewSection />
        <ObjectiveSection />
        <ApproachSection />
        <ImplementationSection />
        <ImpactSection />
        <BackNav />
      </main>
      <Footer />
    </div>
  );
}
