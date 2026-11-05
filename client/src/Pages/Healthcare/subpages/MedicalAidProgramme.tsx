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
  Banknote,
  Pill,
  Stethoscope,
  Users,
  FileText,
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  HandHeart,
  ClipboardList,
  HeartPulse,
  Smile,
  Heart,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import medicalAidImg from "@/assets/medical_aid.png";
import MedicalEmergencyWorkflow from "@/components/healthcare/MedicalEmergencyWorkflow";
import medicalAid from "@/assets/medical-aid.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STRUGGLE_POINTS = [
  { icon: Banknote, text: "Hospital admission and treatment expenses" },
  { icon: Pill, text: "Costly medicines and diagnostic tests" },
  { icon: Stethoscope, text: "Expenses related to surgeries and specialised treatment" },
  { icon: HeartPulse, text: "Financial burden during prolonged illness" },
  { icon: ShieldCheck, text: "Lack of access to affordable healthcare support" },
  { icon: FileText, text: "Dependence on loans or distress financing for treatment" },
];

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Banknote,
    title: "Financial Assistance for Treatment",
    bullets: [
      "Support for hospitalisation and medical treatment expenses",
      "Assistance for surgeries and specialised medical care",
      "Financial aid for economically weaker patients",
    ],
  },
  {
    num: "02",
    icon: Pill,
    title: "Support for Medicines & Diagnostics",
    bullets: [
      "Assistance for costly medicines and medical consumables",
      "Support for diagnostic tests, scans, and laboratory investigations",
      "Help for patients requiring long-term medication support",
    ],
  },
  {
    num: "03",
    icon: Users,
    title: "Support for Rural & Underserved Communities",
    bullets: [
      "Healthcare assistance for patients from rural and marginalised areas",
      "Identification and verification of genuinely needy beneficiaries",
      "Outreach support through hospitals, community networks, and volunteers",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  { icon: Stethoscope, text: "Coordination with hospitals, doctors, and healthcare institutions" },
  { icon: ClipboardList, text: "Verification and assessment of needy patients" },
  { icon: HandHeart, text: "Community donations, CSR partnerships, and humanitarian support" },
  { icon: FileText, text: "Transparent documentation and utilisation of funds" },
  { icon: CheckCircle2, text: "Continuous monitoring of patient support and treatment assistance" },
];

const IMPACT_OUTCOMES = [
  { icon: HeartHandshake, text: "Improve access to healthcare for poor patients" },
  { icon: Banknote, text: "Reduce financial burden on economically weaker families" },
  { icon: HeartPulse, text: "Ensure timely medical treatment and healthcare support" },
  { icon: ShieldCheck, text: "Prevent treatment discontinuation due to lack of funds" },
  { icon: Smile, text: "Restore hope, dignity, and well-being among vulnerable patients" },
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

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <SubpageHeroCarousel
      tag="HEALTHCARE • MAP"
      title="Medical Assistance for Poor Patients (MAP)"
      subtitle="Extending financial assistance, medicine support, and hospital coordination to impoverished individuals facing serious illnesses and medical emergencies."
      breadcrumbs={[
        { label: "What We Do", href: "/programs" },
        { label: "Healthcare", href: "/programs/healthcare" },
        { label: "Medical Aid Programme" },
      ]}
      images={[medicalAid, medicalAidImg]}
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
          <SectionTitle label="Overview" title="The Challenge of Affordability" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                  <Heart className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                    Access to quality healthcare remains a major challenge for economically weaker families, especially in rural and underserved communities. For many poor patients, even basic medical treatment becomes financially unaffordable due to rising healthcare costs, expensive medicines, diagnostic tests, and hospital expenses.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                    In many cases, patients are forced to delay or discontinue treatment because their families are unable to arrange the required funds. This situation becomes even more critical during serious illnesses, surgeries, long-term treatments, and hospitalisation.
                  </p>
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-slate-300">
                    Poor families often struggle with:
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
                    src={medicalAidImg}
                    alt="Medical Aid Programme"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Medical Aid Programme</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {STRUGGLE_POINTS.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 rounded-xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-gradient-to-br from-slate-50 to-brand-green/5 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              As a result, many patients suffer from delayed treatment, worsening health conditions, financial hardship, and loss of dignity.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this urgent humanitarian need, Islah Welfare Foundation (Islah) proposes the Medical Aid Programme for Poor Patients to provide financial assistance and healthcare support to economically disadvantaged individuals who are unable to afford medical treatment expenses.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full">
              Our Goal: Ensure that no patient is deprived of essential healthcare due to financial constraints.
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
              To provide financial assistance and humanitarian healthcare support to poor and underprivileged patients for medical treatment, medicines, diagnostics, and hospital-related expenses.
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
            title="3 Areas of Support"
            subtitle="Islah's Medical Aid Programme provides targeted support across three critical areas ensuring no patient is deprived of healthcare due to financial constraints."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.09}>
          <div className="grid md:grid-cols-3 gap-5">
            {APPROACH_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.num}
                  className="group bg-white hover:bg-slate-50/80 rounded-xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                        {area.num}
                      </span>
                      <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-green-dark transition-colors">
                        {area.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-2.5 flex-1">
                    {area.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed"
                      >
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
    <MedicalEmergencyWorkflow showImageToggle={true} />
  );
}

function ImpactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle label="Expected Impact" title="5 Outcomes We Aim For" />
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
                <span className="text-[10px] font-bold text-brand-orange mb-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Vision Quote */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-slate-50/80 border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
            <p className="text-base sm:text-lg font-semibold text-slate-800 max-w-3xl mx-auto leading-relaxed italic">
              "Islah believes that healthcare is a basic human necessity, and no individual should suffer or lose access to treatment due to poverty."
            </p>
            <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto">
              "Extending care and compassion to those who need it most — because every life deserves access to treatment and hope."
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand-orange/40" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">
                Islah Welfare Foundation
              </span>
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
          to="/programs/healthcare/rural-ambulance"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Rural Ambulance & Emergency Response (RAER)
        </Link>
        <Link
          to="/programs/healthcare/health-checkup-camps"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          Next: Community Health Check-up Camps (CHC)
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function MedicalAidProgramme() {
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
