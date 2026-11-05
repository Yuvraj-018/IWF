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
  Building2,
  Users,
  Baby,
  Megaphone,
  Banknote,
  Stethoscope,
  HeartPulse,
  Handshake,
  BarChart2,
  ShieldCheck,
  Lightbulb,
  TreePine,
  Clock,
  ChevronDown,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import wellnessCentresImg from "@/assets/wellness_centres.png";
import ruralHealthCentreHero from "@/assets/rural-health-centre.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHALLENGES = [
  { icon: Building2, text: "Limited availability of nearby healthcare facilities" },
  { icon: Users, text: "Shortage of doctors, nurses, and trained healthcare workers" },
  { icon: ShieldCheck, text: "Lack of preventive healthcare and regular health monitoring" },
  { icon: Baby, text: "Poor maternal and child healthcare support" },
  { icon: Lightbulb, text: "Limited awareness about nutrition, hygiene, and healthy living" },
  { icon: Banknote, text: "Financial barriers to accessing quality medical treatment" },
  { icon: Clock, text: "Delayed diagnosis of diseases and chronic health conditions" },
];

const ACCORDION_AREAS = [
  {
    num: "01",
    icon: Stethoscope,
    title: "Primary Healthcare Services",
    bullets: [
      "Basic medical consultation and treatment support",
      "General health check-ups and primary care services",
      "Management of common illnesses and minor health conditions",
      "Referral support for advanced medical treatment when required",
    ],
  },
  {
    num: "02",
    icon: HeartPulse,
    title: "Preventive Healthcare & Wellness",
    bullets: [
      "Regular health screening and preventive care programmes",
      "Awareness on nutrition, hygiene, sanitation, and healthy lifestyle",
      "Promotion of fitness, mental well-being, and disease prevention",
      "Monitoring of chronic conditions such as diabetes and hypertension",
    ],
  },
  {
    num: "03",
    icon: Baby,
    title: "Women & Child Healthcare Support",
    bullets: [
      "Maternal and child healthcare awareness and support",
      "Menstrual hygiene and women wellness programmes",
      "Nutrition awareness for mothers and children",
      "Adolescent health and anaemia awareness initiatives",
    ],
  },
  {
    num: "04",
    icon: Megaphone,
    title: "Community Health Awareness & Outreach",
    bullets: [
      "Health awareness camps and village outreach programmes",
      "Education on communicable and lifestyle diseases",
      "Community participation and health education activities",
      "Awareness regarding vaccination, sanitation, and preventive practices",
    ],
  },
  {
    num: "05",
    icon: Banknote,
    title: "Affordable & Accessible Rural Healthcare",
    bullets: [
      "Low-cost or subsidised healthcare services for poor families",
      "Healthcare access for remote and underserved communities",
      "Support for economically weaker and vulnerable populations",
      "Community-based healthcare support mechanisms",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  { icon: Building2, text: "Establishment of healthcare and wellness centres in rural areas" },
  { icon: Users, text: "Engagement of qualified healthcare professionals and community health workers" },
  { icon: Handshake, text: "Collaboration with hospitals, doctors, and medical institutions" },
  { icon: Megaphone, text: "Community outreach and awareness programmes" },
  { icon: TreePine, text: "CSR partnerships and healthcare support initiatives" },
  { icon: BarChart2, text: "Continuous monitoring, documentation, and impact assessment" },
];

const IMPACT_OUTCOMES = [
  { icon: Building2, text: "Improve access to primary healthcare services in rural areas" },
  { icon: ShieldCheck, text: "Promote preventive healthcare and healthy lifestyle practices" },
  { icon: HeartPulse, text: "Reduce disease burden and delayed treatment cases" },
  { icon: Baby, text: "Improve maternal, child, and community health outcomes" },
  { icon: Lightbulb, text: "Strengthen rural healthcare infrastructure and awareness" },
  { icon: Users, text: "Enhance overall health, dignity, and quality of life in underserved communities" },
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

// ─── Accordion Component ──────────────────────────────────────────────────────

function AccordionPanel({ area, isOpen, onToggle }: {
  area: typeof ACCORDION_AREAS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = area.icon;
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "bg-white border-brand-green shadow-sm"
          : "bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm"
      } group`}
    >
      {/* Accordion Header */}
      <button
        className="w-full flex items-center gap-4 p-5 transition-colors text-left cursor-pointer bg-transparent"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          isOpen
            ? "bg-brand-green/10 text-brand-green"
            : "bg-emerald-50 text-emerald-600 group-hover:bg-brand-green/10"
        }`}>
          <Icon className="w-5 h-5 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-widest block text-slate-400">
            {area.num}
          </span>
          <span className={`font-semibold text-sm transition-colors ${
            isOpen
              ? "text-brand-green-dark"
              : "text-slate-800 group-hover:text-brand-green-dark"
          }`}>
            {area.title}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-brand-green"
              : "text-slate-400 group-hover:text-slate-600"
          }`}
        />
      </button>

      {/* Accordion Body — CSS max-height transition */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
      >
        <div className="px-5 pb-5 pt-1 bg-white border-t border-slate-50">
          <ul className="space-y-3">
            {area.bullets.map((b, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                <ArrowRight className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <SubpageHeroCarousel
      tag="HEALTHCARE • RHWC"
      title="Rural Healthcare & Wellness Centres (RHWC)"
      subtitle="Bringing healthcare closer to rural communities — building healthier lives through accessible care, awareness, and wellness."
      breadcrumbs={[
        { label: "What We Do", href: "/programs" },
        { label: "Healthcare", href: "/programs/healthcare" },
        { label: "Rural Healthcare & Wellness Centres" },
      ]}
      images={[ruralHealthCentreHero, wellnessCentresImg]}
    >
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All Healthcare Programmes
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
          <SectionTitle label="Overview" title="Building Healthcare From the Ground Up" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                  <Building2 className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                    Access to quality healthcare remains one of the biggest challenges in rural India. Millions of people living in villages and underserved communities continue to face difficulties in obtaining timely medical consultation, basic treatment, preventive healthcare services, and emergency medical support due to inadequate healthcare infrastructure and a shortage of healthcare professionals.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                    In many rural areas, people are forced to travel long distances even for minor medical treatment, resulting in delayed care, increased expenses, and worsening health conditions. The lack of accessible and affordable healthcare services particularly affects economically weaker families, women, children, elderly individuals, and persons with chronic illnesses.
                  </p>
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-slate-300">
                    Rural communities commonly face:
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
                    src={wellnessCentresImg}
                    alt="Rural Healthcare & Wellness Centres"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Rural Healthcare &amp; Wellness Centres</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHALLENGES.slice(0, 4).map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 p-4 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-4 mb-12">
            {CHALLENGES.slice(4).map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 p-4 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-gradient-to-br from-slate-50 to-brand-green/5 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this critical healthcare gap, Islah Welfare Foundation (Islah) proposes the Establishment of Rural Healthcare &amp; Wellness Centres to provide accessible, affordable, preventive, and community-focused healthcare services in rural and underserved areas.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full max-w-full text-center whitespace-normal">
              Our Goal: Strengthen primary healthcare systems at the grassroots level while promoting overall health, wellness, and preventive care within communities.
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
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">Project Objective</p>
            <p className="text-base md:text-lg text-slate-800 font-medium leading-relaxed">
              To establish community-based Rural Healthcare &amp; Wellness Centres that provide accessible healthcare services, preventive care, health awareness, and basic medical support to underserved rural populations.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ApproachAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            label="Project Approach"
            title="5 Service Areas"
            subtitle="Click each area to explore the full details of how Islah's Rural Wellness Centres will serve communities."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="space-y-3">
            {ACCORDION_AREAS.map((area, i) => (
              <AccordionPanel
                key={area.num}
                area={area}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ImplementationSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle label="How We Work" title="6-Step Implementation Plan" />
        </ScrollReveal>

        {/* Upward-building stagger — 3 + 3 grid */}
        <ScrollReveal stagger={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {IMPLEMENTATION_STEPS.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 bg-white rounded-md border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-xs group-hover:bg-brand-green-dark transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="pt-0.5">
                  <Icon className="w-4 h-4 text-brand-green mb-1.5" />
                  <p className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-slate-800 transition-colors">{text}</p>
                </div>
              </div>
            ))}
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
          <SectionTitle label="Expected Impact" title="6 Outcomes We Aim For" />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMPACT_OUTCOMES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-orange block mb-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-slate-50/80 border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
            <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto mb-4 leading-relaxed font-normal">
              Islah believes that healthcare is a fundamental necessity, and every individual deserves access to affordable, timely, and quality healthcare services regardless of their socio-economic condition or geographic location.
            </p>
            <p className="text-base sm:text-lg font-semibold text-slate-800 max-w-3xl mx-auto leading-relaxed italic border-t border-slate-200 pt-4">
              "Bringing healthcare closer to rural communities — building healthier lives through accessible care, awareness, and wellness."
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
          to="/programs/healthcare/cervical-cancer"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Cervical Cancer Prevention (CCPA)
        </Link>
        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:translate-x-0.5"
        >
          All Healthcare Initiatives
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default function WellnessCentres() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <HeroSection />
        <OverviewSection />
        <ObjectiveSection />
        <ApproachAccordionSection />
        <ImplementationSection />
        <ImpactSection />
        <BackNav />
      </main>
      <Footer />
    </div>
  );
}
