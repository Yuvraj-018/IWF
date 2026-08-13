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
  AlertCircle,
  HeartPulse,
  Pill,
  Users,
  Banknote,
  Stethoscope,
  TestTube,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Siren,
  Clock,
  ShieldCheck,
  HandHeart,
  Building2,
  IndianRupee,
  Wallet,
  Building,
  Ambulance,
  Heart,
  Share2,
  ClipboardList,
  Shield,
  Calendar,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import { PatientCard } from "@/components/healthcare/PatientCard";
import { URGENT_PATIENTS } from "@/content/patients";
import criticalLifeSupportImg from "@/assets/critical_life_support.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STRUGGLE_POINTS = [
  { icon: Banknote, text: "Emergency hospital expenses" },
  { icon: HeartPulse, text: "ICU and critical care support" },
  { icon: Pill, text: "Medicines and urgent diagnostic tests" },
  { icon: AlertCircle, text: "Blood requirements and emergency procedures" },
  { icon: Siren, text: "Transportation and ambulance services" },
  { icon: Clock, text: "Immediate financial assistance during hospitalisation" },
];

const SUPPORT_AREAS = [
  {
    icon: Banknote,
    num: "01",
    title: "Emergency Financial Assistance",
    bullets: [
      "Support for urgent medical expenses during hospitalisation",
      "Assistance for poor patients requiring immediate treatment",
      "Financial aid for critical and emergency healthcare needs",
    ],
  },
  {
    icon: HeartPulse,
    num: "02",
    title: "Critical Care & Hospital Support",
    bullets: [
      "Support for ICU, emergency ward, and life-saving treatment requirements",
      "Assistance for medicines, injections, oxygen, and emergency diagnostics",
      "Coordination with hospitals and healthcare providers for urgent care",
    ],
  },
  {
    icon: TestTube,
    num: "03",
    title: "Emergency Medicines & Diagnostic Support",
    bullets: [
      "Assistance for costly medicines and emergency medical consumables",
      "Support for urgent blood tests, scans, and diagnostic procedures",
      "Help for patients requiring immediate medical intervention",
    ],
  },
  {
    icon: Users,
    num: "04",
    title: "Support for Economically Weaker Families",
    bullets: [
      "Priority assistance for poor, vulnerable, and marginalised patients",
      "Humanitarian support during sudden medical crises",
      "Compassionate assistance for families facing financial distress during emergencies",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  { icon: Stethoscope, text: "Coordination with hospitals, doctors, and healthcare providers" },
  { icon: Siren, text: "Emergency response and rapid support mechanisms" },
  { icon: ShieldCheck, text: "Identification and verification of genuinely needy patients" },
  { icon: HandHeart, text: "Community donations, CSR partnerships, and humanitarian support networks" },
  { icon: CheckCircle2, text: "Transparent monitoring and documentation of assistance provided" },
];

const IMPACT_OUTCOMES = [
  { icon: HeartPulse, text: "Save lives through timely emergency intervention" },
  { icon: Users, text: "Support poor families during critical medical situations" },
  { icon: Clock, text: "Reduce delays in life-saving treatment due to financial constraints" },
  { icon: Siren, text: "Improve access to emergency healthcare support in underserved communities" },
  { icon: HandHeart, text: "Provide dignity, compassion, and hope to vulnerable patients and families" },
];

// ─── Shared ──────────────────────────────────────────────────────────────────

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

// ─── Sections ─────────────────────────────────────────────────────────────────

function RedesignHeroSection() {
  const stats = [
    { icon: HeartPulse, value: "624+", label: "Patients Supported" },
    { icon: Building2, value: "48+", label: "Partner Hospitals" },
    { icon: IndianRupee, value: "₹1.85 Cr+", label: "Support Provided" },
    { icon: ShieldCheck, value: "100%", label: "For Patient Support" },
  ];

  return (
    <section className="bg-white pt-8 pb-0 px-6 lg:px-16">
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium max-w-7xl mx-auto">
        <Link to="/" className="hover:text-[#0b1f3b] transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/programs/healthcare" className="hover:text-[#0b1f3b] transition-colors">
          Healthcare
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">Critical Life & Emergency Support</span>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[38%_37%_25%] gap-6 items-stretch">
        <div className="flex flex-col justify-center pr-0 lg:pr-6">
          <h1 className="text-4xl lg:text-5xl font-black leading-tight">
            <span className="text-[#0b1f3b]">CRITICAL LIFE &</span>
            <br />
            <span className="text-[#f97316]">EMERGENCY SUPPORT</span>
            <br />
            <span className="text-[#0b1f3b]">INITIATIVE</span>
          </h1>
          <p className="mt-4 text-sm italic text-gray-700 font-medium before:content-['\201C'] after:content-['\201D']">
            Har Pal Anmol Hai—when every second counts, we stand to save lives.
          </p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-sm">
            We provide immediate financial support to underprivileged patients admitted to
            hospitals in critical condition. Your support can save a life.
          </p>
        </div>

        <div className="overflow-hidden min-h-[280px] lg:min-h-[360px]">
          {/* Image ref: doctor treating patient with oxygen mask, ICU setting */}
          <img
            src={criticalLifeSupportImg}
            alt="Critical life and emergency hospital support"
            className="w-full h-full min-h-[280px] lg:min-h-[360px] object-cover rounded-tl-2xl rounded-tr-2xl"
          />
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-5 flex flex-col gap-4">
          <div>
            <p className="text-base font-bold text-[#0b1f3b]">Every Second Matters</p>
            <p className="text-xs text-gray-500 mt-0.5">Timely Support. Better Care. Saved Lives.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-orange-50"
              >
                <Icon className="w-5 h-5 text-[#f97316]" />
                <span className="text-lg font-black text-[#0b1f3b]">{value}</span>
                <span className="text-[10px] text-gray-500 text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
          <Link
            to="/donate"
            search={{ patientId: undefined, amount: undefined }}
            className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 mt-3"
          >
            <Heart className="w-4 h-4 fill-white" />
            SUPPORT A PATIENT NOW
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureStripSection() {
  const features = [
    { icon: Clock, label: "Timely Intervention" },
    { icon: Wallet, label: "Financial Assistance" },
    { icon: Building, label: "Hospital & ICU Support" },
    { icon: Ambulance, label: "Emergency Care" },
    { icon: Users, label: "Saving Lives Together" },
  ];

  return (
    <section className="bg-gray-50 border-t border-b border-gray-100 py-5 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center gap-4 xl:gap-8 flex-1">
          {features.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex items-center gap-4 xl:gap-8">
              <div className="flex flex-col items-center gap-1.5">
                <Icon className="w-[22px] h-[22px] text-[#0b1f3b]" />
                <span className="text-[11px] text-gray-600 font-medium text-center leading-tight max-w-[88px]">
                  {label}
                </span>
              </div>
              {i < features.length - 1 && <div className="hidden sm:block w-px h-8 bg-gray-200" />}
            </div>
          ))}
        </div>
        <div className="bg-[#0b1f3b] rounded-xl px-5 py-3 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full xl:w-auto">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-white shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">100% Transparent Support</p>
              <p className="text-white/60 text-xs">Your donation reaches the patient directly.</p>
            </div>
          </div>
          <a
            href="#how-we-work"
            className="border border-white/40 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            HOW WE WORK →
          </a>
        </div>
      </div>
    </section>
  );
}

function PatientCardsSection() {
  const sidebarReasons = [
    {
      icon: HeartPulse,
      bg: "bg-red-50",
      iconColor: "text-red-500",
      text: "Many poor patients in critical condition cannot afford life-saving treatment.",
    },
    {
      icon: HandHeart,
      bg: "bg-green-50",
      iconColor: "text-green-600",
      text: "Your support helps them receive timely medical care and emergency support.",
    },
    {
      icon: Shield,
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
      text: "Together, we can save more lives and bring hope to families.",
    },
  ];

  return (
    <section className="bg-white py-10 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-[#0b1f3b] uppercase tracking-wide">
                Patients Needing Urgent Support
              </h2>
              <div className="h-1 w-12 bg-[#f97316] rounded-full mt-1.5" />
            </div>
            <select
              className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-200 w-full sm:w-auto"
              defaultValue="most-urgent"
            >
              <option value="most-urgent">Sort by: Most Urgent</option>
              <option value="highest-need">Sort by: Highest Need</option>
              <option value="recently-added">Sort by: Recently Added</option>
            </select>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {URGENT_PATIENTS.map((patient) => (
              <PatientCard key={patient.id} {...patient} />
            ))}
          </div>
        </div>

        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24">
          <h3 className="text-sm font-black text-[#0b1f3b] uppercase tracking-wide mb-5">
            Why Your Support Matters
          </h3>
          <div className="flex flex-col gap-4">
            {sidebarReasons.map(({ icon: Icon, bg, iconColor, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-100 my-5" />
          <div className="bg-orange-50 rounded-2xl p-4 relative">
            <span className="text-[#f97316] text-5xl font-serif leading-none absolute -top-1 left-3">
              &ldquo;
            </span>
            <p className="text-xs text-gray-700 italic leading-relaxed pt-4">
              A small contribution from you can bring someone back to life.
              Please support. Every second counts.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function BottomCTABanner() {
  return (
    <section className="bg-gray-50 border-t border-gray-100 py-6 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-2.5 rounded-xl shrink-0">
            <ClipboardList className="w-9 h-9 text-[#0b1f3b]" />
          </div>
          <div>
            <p className="font-bold text-sm text-[#0b1f3b]">
              You can be the reason for someone&apos;s second chance at life.
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Join our mission to support critically ill patients in their most difficult moments.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-end">
          <a
            href="/donate"
            className="bg-[#f97316] hover:bg-orange-600 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition-colors active:scale-95"
          >
            <Heart className="w-4 h-4 fill-white" />
            <div className="text-left">
              <div>DONATE NOW</div>
              <div className="text-[10px] font-normal opacity-80">Support a Patient</div>
            </div>
          </a>
          <button
            type="button"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition-colors bg-white active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-gray-500" />
            <div className="text-left">
              <div>SHARE NOW</div>
              <div className="text-[10px] font-normal text-gray-400">Spread Hope</div>
            </div>
          </button>
          <Link
            to="/membership"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition-colors bg-white active:scale-95"
          >
            <Calendar className="w-4 h-4 text-gray-500" />
            <div className="text-left">
              <div>BECOME A MONTHLY DONOR</div>
              <div className="text-[10px] font-normal text-gray-400">Support Regularly</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle label="Overview" title="The Harsh Reality" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                  <HeartPulse className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                    For economically weaker families, a medical emergency often becomes a fight for survival. In many cases, critically ill patients admitted to hospitals are unable to receive timely treatment due to lack of financial resources, emergency medical support, or immediate assistance required during life-threatening situations.
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                    In rural and underserved communities, poor families frequently struggle to arrange:
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
                    src={criticalLifeSupportImg}
                    alt="Critical Life & Emergency Support"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Critical Life &amp; Emergency Support</span>
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
                className="group flex items-start gap-4 p-5 rounded-md bg-[#0b1f3b] hover:bg-white border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0 w-9 h-9 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <p className="text-sm text-white/90 group-hover:text-slate-700 font-medium leading-relaxed transition-colors">{text}</p>
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
              As a result, many underprivileged patients face delays in treatment at the most critical moments, putting their lives at serious risk.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this urgent humanitarian need, Islah Welfare Foundation (IWF) proposes the Critical Life &amp; Emergency Support Initiative to provide emergency assistance and life-saving support to poor and vulnerable patients admitted to hospitals in critical condition.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full">
              Our Goal: Ensure that no individual is denied emergency medical care due to poverty or financial hardship.
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
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">Initiative Objective</p>
            <p className="text-base md:text-lg text-slate-800 font-medium leading-relaxed">
              To provide timely emergency support and humanitarian medical assistance to underprivileged patients admitted to hospitals in critical condition, helping them access immediate treatment and life-saving care.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SupportAreasSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            label="Our Support Areas"
            title="4 Areas of Intervention"
            subtitle="IWF provides targeted emergency support across four critical areas to ensure no patient is denied life-saving care."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.09}>
          <div className="grid sm:grid-cols-2 gap-5">
            {SUPPORT_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.num}
                  className="group bg-[#0b1f3b] hover:bg-white rounded-md p-6 border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-md bg-white/15 group-hover:bg-brand-orange/15 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-white group-hover:text-brand-orange transition-colors" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/60 group-hover:text-slate-400 uppercase tracking-widest block transition-colors">{area.num}</span>
                      <h3 className="font-bold text-sm text-white group-hover:text-brand-green-dark transition-colors">{area.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {area.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-slate-100 group-hover:text-slate-600 text-sm leading-relaxed transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-brand-green shrink-0 mt-0.5 transition-colors" />
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
            {/* Connecting line — desktop */}
            <div className="hidden lg:block absolute top-11 left-0 right-0 h-0.5 bg-brand-green/20 z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
              {IMPLEMENTATION_STEPS.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-22 h-22 rounded-full bg-white border-2 border-brand-green/30 flex flex-col items-center justify-center mb-4 shadow-sm group-hover:border-brand-green group-hover:shadow-md transition-all duration-300 p-5">
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
          <SectionTitle label="Expected Impact" title="5 Outcomes We Aim For" />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {IMPACT_OUTCOMES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group bg-[#0b1f3b] hover:bg-white rounded-md p-5 border border-brand-green/10 hover:border-brand-green/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-full bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-4.5 h-4.5 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-white/70 group-hover:text-brand-green mb-2 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-xs text-slate-100 group-hover:text-slate-600 font-medium leading-relaxed transition-colors">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Vision Quote */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-brand-green-darker rounded-md p-10 text-center">
            <p className="text-lg md:text-xl font-semibold text-white max-w-3xl mx-auto leading-relaxed italic">
              "Standing with vulnerable patients in their most critical moments — because timely support can save lives."
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-semibold text-sm tracking-wide">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
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
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          All Healthcare Programmes
        </Link>
        <Link
          to="/programs/healthcare/medical-aid"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          Next: Medical Aid Programme
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function CriticalLifeSupport() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <RedesignHeroSection />
        <FeatureStripSection />
        <PatientCardsSection />
        <BottomCTABanner />
        <OverviewSection />
        <ObjectiveSection />
        <SupportAreasSection />
        <ImplementationSection />
        <ImpactSection />
        <BackNav />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
