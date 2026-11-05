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
  Ambulance,
  Baby,
  Radio,
  Banknote,
  Megaphone,
  Handshake,
  Users,
  HeartPulse,
  BarChart2,
  Clock,
  AlertCircle,
  MapPin,
  Siren,
  ShieldCheck,
  Car,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import ruralAmbulanceImg from "@/assets/rural_ambulance.png";
import ambulanceHero from "@/assets/ambulance.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHALLENGES = [
  { icon: Ambulance, text: "Lack of nearby ambulance and emergency transport services" },
  { icon: Clock, text: "Delays in reaching hospitals during critical situations" },
  { icon: MapPin, text: "Poor road connectivity and transportation infrastructure" },
  { icon: Banknote, text: "High cost of private ambulance services" },
  { icon: AlertCircle, text: "Increased risks during accidents, emergencies, and maternal health cases" },
  { icon: Radio, text: "Limited emergency response support in remote areas" },
];

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Siren,
    title: "Emergency Ambulance Services",
    bullets: [
      "Ambulance support for critical patients and medical emergencies",
      "Transportation of patients to hospitals and healthcare centres",
      "Emergency referral services for serious health conditions",
      "Support during accidents, trauma, and life-threatening situations",
    ],
  },
  {
    num: "02",
    icon: Baby,
    title: "Maternal & Child Emergency Support",
    bullets: [
      "Emergency transportation for pregnant women and newborn care cases",
      "Assistance during childbirth-related emergencies",
      "Improved access to maternal healthcare facilities in rural areas",
    ],
  },
  {
    num: "03",
    icon: Radio,
    title: "Rural Emergency Response System",
    bullets: [
      "Quick-response healthcare support during emergencies",
      "Coordination with hospitals, doctors, and healthcare providers",
      "Community-based emergency communication and support mechanisms",
    ],
  },
  {
    num: "04",
    icon: Car,
    title: "Affordable & Accessible Healthcare Transport",
    bullets: [
      "Low-cost or subsidised ambulance services for poor families",
      "Priority support for economically weaker and vulnerable patients",
      "Healthcare transportation support for remote and underserved villages",
    ],
  },
  {
    num: "05",
    icon: Megaphone,
    title: "Community Awareness & Preparedness",
    bullets: [
      "Awareness programmes on emergency response and first aid",
      "Community sensitisation regarding emergency healthcare access",
      "Promotion of timely medical intervention during emergencies",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  {
    icon: Car,
    title: "Deployment",
    text: "Ambulance and emergency response vehicles deployed in rural areas",
  },
  {
    icon: Handshake,
    title: "Coordination",
    text: "Coordination with hospitals, healthcare institutions, and emergency networks",
  },
  {
    icon: Users,
    title: "Engagement",
    text: "Trained drivers, healthcare staff, and volunteers onboarded",
  },
  {
    icon: Radio,
    title: "Systems",
    text: "Establishment of emergency response and communication systems",
  },
  {
    icon: HeartPulse,
    title: "Partnerships",
    text: "CSR partnerships and community healthcare support initiatives",
  },
  {
    icon: BarChart2,
    title: "Monitoring",
    text: "Continuous monitoring and emergency service evaluation",
  },
];

const IMPACT_OUTCOMES = [
  { icon: Clock, text: "Reduce delays in emergency medical transportation" },
  { icon: HeartPulse, text: "Improve survival and recovery rates during critical situations" },
  { icon: ShieldCheck, text: "Strengthen emergency healthcare access in rural communities" },
  { icon: Banknote, text: "Support poor families during medical emergencies" },
  { icon: Baby, text: "Improve maternal and child emergency healthcare outcomes" },
  { icon: Ambulance, text: "Save lives through timely and reliable ambulance support" },
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
      tag="HEALTHCARE • RAER"
      title="Rural Ambulance & Emergency Response (RAER)"
      subtitle="Reaching every life in time with fully equipped emergency transport, oxygen support, and basic life support for critical rural emergencies."
      breadcrumbs={[
        { label: "What We Do", href: "/programs" },
        { label: "Healthcare", href: "/programs/healthcare" },
        { label: "Rural Ambulance Service" },
      ]}
      images={[ambulanceHero, ruralAmbulanceImg]}
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
          <SectionTitle label="Overview" title="When Every Minute Matters" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                  <Ambulance className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                    In rural and remote areas, timely access to emergency medical transportation remains a major challenge. During medical emergencies, accidents, pregnancy complications, serious illnesses, or critical health conditions, many patients are unable to reach hospitals on time due to lack of ambulance services, poor transportation facilities, and financial constraints.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                    For economically weaker families, arranging emergency transportation often becomes difficult, resulting in dangerous delays in medical treatment. In many villages, patients are transported using unsafe or unsuitable means, putting lives at even greater risk.
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
                    src={ruralAmbulanceImg}
                    alt="Rural Ambulance & Emergency Response Service"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Rural Ambulance &amp; Emergency Response Service</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Challenge cards — desktop grid / scrollable on mobile */}
        <ScrollReveal stagger={0.07}>
          {/* Mobile: horizontal scroll ticker */}
          <div className="flex gap-4 overflow-x-auto pb-2 sm:hidden scrollbar-hide snap-x snap-mandatory w-full max-w-full">
            {CHALLENGES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-56 snap-start flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHALLENGES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="relative shrink-0 w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-gradient-to-br from-slate-50 to-brand-green/5 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center max-w-4xl mx-auto mt-12">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              As a result, many preventable deaths and complications occur simply because patients are unable to access timely medical transportation and emergency care.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this urgent healthcare need, Islah Welfare Foundation (Islah) proposes the Rural Ambulance &amp; Emergency Response Service to provide accessible, affordable, and timely emergency medical transportation and response support to rural and underserved communities.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full max-w-full text-center whitespace-normal">
              Our Goal: Ensure that no life is lost due to delayed access to emergency healthcare services.
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
              To provide timely ambulance and emergency response support for rural and economically weaker communities, ensuring rapid access to healthcare facilities during medical emergencies and critical situations.
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
            label="Project Approach"
            title="5 Areas of Emergency Support"
            subtitle="Islah's Rural Ambulance Service addresses the full spectrum of emergency healthcare needs — from transport to awareness."
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
                  <div className="w-full h-1 rounded-full bg-slate-100 group-hover:bg-brand-green transition-colors mb-5" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center transition-colors">
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
                  <div className="w-full h-1 rounded-full bg-slate-100 group-hover:bg-brand-green transition-colors mb-5" />
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

// Vertical Road/Route Timeline — ambulance journey metaphor
function ImplementationSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            label="How We Work"
            title="6-Step Route to Deployment"
            subtitle="From vehicle deployment to ongoing monitoring — every step of the journey mapped out."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.1}>
          <div className="relative">
            {/* Vertical road line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-brand-green/20" aria-hidden="true" />

            <div className="space-y-0">
              {IMPLEMENTATION_STEPS.map(({ icon: Icon, title, text }, i) => (
                <div key={i} className="relative flex items-start gap-5 pb-8 group">
                  {/* Route node */}
                  <div className="shrink-0 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-brand-green/40 flex items-center justify-center shadow-sm group-hover:border-brand-green group-hover:shadow-md transition-all duration-300">
                      <Icon className="w-4.5 h-4.5 text-brand-green" />
                    </div>
                    {/* Dot on road */}
                    {i < IMPLEMENTATION_STEPS.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-1 h-6 flex flex-col items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-brand-green/40" />
                        <span className="w-1 h-1 rounded-full bg-brand-green/30" />
                        <span className="w-1 h-1 rounded-full bg-brand-green/20" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-xs group-hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-widest">Step {String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-xs font-semibold text-slate-800">{title}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                  </div>
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
          <SectionTitle label="Expected Impact" title="6 Lives-Saving Outcomes" />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMPACT_OUTCOMES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5" />
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
            <p className="text-base sm:text-lg font-semibold text-slate-800 max-w-3xl mx-auto leading-relaxed italic">
              "Islah believes that timely emergency response can save lives, and every individual deserves quick access to healthcare support during critical moments, regardless of location or financial condition."
            </p>
            <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto">
              "Reaching every life in time — because emergency care should never be delayed by distance or poverty."
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
          to="/programs/healthcare/critical-life-support"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Critical Life & Emergency Support (CLES)
        </Link>
        <Link
          to="/programs/healthcare/medical-aid"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          Next: Medical Assistance for Poor Patients (MAP)
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default function RuralAmbulance() {
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
