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
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { PatientCard } from "@/components/healthcare/PatientCard";
import { URGENT_PATIENTS } from "@/content/patients";
import { usePatients } from "@/services/patientService";
import criticalLifeSupportImg from "@/assets/critical_life_support.png";
import MedicalEmergencyWorkflow from "@/components/healthcare/MedicalEmergencyWorkflow";

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
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{title}</h2>
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
    <>
      <SubpageHeroCarousel
        tag="HEALTHCARE • EMERGENCY SUPPORT"
        title="Critical Life & Emergency Support (CLES)"
        subtitle="Har Pal Anmol Hai — when every second counts, we provide immediate emergency financial assistance for underprivileged patients fighting for life in critical hospital care."
        breadcrumbs={[
          { label: "What We Do", href: "/programs" },
          { label: "Healthcare", href: "/programs/healthcare" },
          { label: "Critical Life Support (CLES)" },
        ]}
        images={[criticalLifeSupportImg]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to="/donate"
            search={{ patientId: undefined, amount: undefined }}
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Support a Patient Now</span>
          </Link>
          <a
            href="#how-we-work"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl backdrop-blur-md transition cursor-pointer"
          >
            How We Work →
          </a>
        </div>
      </SubpageHeroCarousel>

      <section className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-xl bg-orange-50/60 border border-orange-100"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#f97316]" />
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900 block leading-tight">{value}</span>
                  <span className="text-xs text-gray-500 leading-tight">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
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
                <Icon className="w-[22px] h-[22px] text-slate-700" />
                <span className="text-[11px] text-gray-600 font-medium text-center leading-tight max-w-[88px]">
                  {label}
                </span>
              </div>
              {i < features.length - 1 && <div className="hidden sm:block w-px h-8 bg-gray-200" />}
            </div>
          ))}
        </div>
        <div className="bg-[#071527] rounded-xl px-5 py-3 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full xl:w-auto">
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
  const { patients } = usePatients(true);
  const [sortOption, setSortOption] = useState<"most-urgent" | "highest-need" | "recently-added">("most-urgent");

  const displayPatients = [...(patients && patients.length > 0 ? patients : URGENT_PATIENTS)].sort((a, b) => {
    if (sortOption === "highest-need") return (b.neededAmount - b.raisedAmount) - (a.neededAmount - a.raisedAmount);
    if (sortOption === "recently-added") return new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime();
    return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
  });

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
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Patients Needing Urgent Support
              </h2>
              <div className="h-1 w-12 bg-[#f97316] rounded-full mt-1.5" />
            </div>
            <select
              className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-200 w-full sm:w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="most-urgent">Sort by: Most Urgent</option>
              <option value="highest-need">Sort by: Highest Need</option>
              <option value="recently-added">Sort by: Recently Added</option>
            </select>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayPatients.map((patient) => (
              <PatientCard key={patient.id} {...patient} />
            ))}
          </div>
        </div>


        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-5">
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
            <ClipboardList className="w-9 h-9 text-brand-green" />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-900">
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
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                  <HeartPulse className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                    For economically weaker families, a medical emergency often becomes a fight for survival. In many cases, critically ill patients admitted to hospitals are unable to receive timely treatment due to lack of financial resources, emergency medical support, or immediate assistance required during life-threatening situations.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
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
              As a result, many underprivileged patients face delays in treatment at the most critical moments, putting their lives at serious risk.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this urgent humanitarian need, Islah Welfare Foundation (Islah) proposes the Critical Life &amp; Emergency Support Initiative to provide emergency assistance and life-saving support to poor and vulnerable patients admitted to hospitals in critical condition.
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
            subtitle="Islah provides targeted emergency support across four critical areas to ensure no patient is denied life-saving care."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.09}>
          <div className="grid sm:grid-cols-2 gap-5">
            {SUPPORT_AREAS.map((area) => {
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
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">{area.num}</span>
                      <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-green-dark transition-colors">{area.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2.5 flex-1">
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
                <span className="text-[10px] font-bold text-brand-orange mb-2">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Vision Quote */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-slate-50/80 border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
            <p className="text-base sm:text-lg font-semibold text-slate-800 max-w-3xl mx-auto leading-relaxed italic">
              "Standing with vulnerable patients in their most critical moments — because timely support can save lives."
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

function PolicySection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200" id="fundraising-policy">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Transparency & Governance Policy
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                Fundraising for Critical Medical Treatment Policy
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Effective Date: 01/04/2026 • Registered Charitable Trust Governance Document
              </p>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 text-xs font-bold text-[#004724] border border-[#004724]/30 hover:bg-emerald-50 rounded-lg transition-colors shrink-0"
            >
              {isOpen ? "Collapse Full Policy" : "Read Full Policy Document"}
            </button>
          </div>

          <div className="mt-6 text-xs text-slate-600 space-y-3">
            <p className="font-semibold text-slate-800">
              Islah Welfare Foundation conducts transparent fundraising campaigns to provide critical medical aid for individuals unable to meet life-saving medical costs.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Direct Provider Payments</div>
                <p className="text-[11px] text-slate-500">
                  Payments are routed directly to verified hospitals, pharmacies, and diagnostic centres with receipts.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Surplus Fund Governance</div>
                <p className="text-[11px] text-slate-500">
                  Any excess funds after verified treatment are transferred to the Health & Well-Being Surplus Fund for emergency patients.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Independent Verification</div>
                <p className="text-[11px] text-slate-500">
                  Every patient case undergoes multi-tier physical and clinical verification before fundraising commences.
                </p>
              </div>
            </div>

            {isOpen && (
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4 text-slate-700 leading-relaxed text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">1. Purpose:</h4>
                  <p>
                    Islah Welfare Foundation conducts fundraising campaigns to provide financial assistance for individuals requiring critical medical treatment who are unable to meet the cost of their medical care. This policy explains how funds collected through individual medical fundraising campaigns are managed, utilised, and accounted for, ensuring transparency, fairness, and responsible stewardship of donor contributions.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">2. Individual Medical Fundraising Campaigns:</h4>
                  <p>
                    Each fundraising campaign is launched based on information and supporting medical documents provided by the beneficiary or their authorised representative. The campaign specifies an estimated treatment cost, which serves as the fundraising target. Actual treatment expenses may vary depending on the patient's medical condition, hospital requirements, and treatment progress.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">3. Administrative & Fund Management Cost:</h4>
                  <p>
                    To support the planning, verification, fundraising, campaign management, payment processing, documentation, compliance, monitoring, communication, and overall administration of medical fundraising activities, 20% of the total funds raised may be utilised towards administrative, campaign management, compliance, verification, payment processing, monitoring, and program management expenses incurred in operating the medical fundraising program. The actual percentage applied may vary depending on the circumstances of each campaign.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">4. Where Total Funds Collected Are Less Than the Estimated Treatment Cost:</h4>
                  <p>
                    If the total amount raised for an individual beneficiary is less than the estimated treatment cost: (a) Islah Welfare Foundation may allocate up to 20% of the total amount collected towards administrative and program management expenses; (b) The remaining amount will be utilised exclusively towards the beneficiary's eligible medical treatment and related approved medical expenses; (c) Donors acknowledge that, in such cases, the total amount collected may not be sufficient to fully meet the beneficiary's treatment requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">5. Where Total Funds Collected Exceed the Required Treatment Cost:</h4>
                  <p>
                    If the total amount collected exceeds the amount reasonably required for the beneficiary's eligible medical treatment: (1) The beneficiary's verified medical expenses shall be paid first; (2) Administrative and program management costs, as provided under this policy, may be retained by Islah; (3) Any remaining surplus amount shall not be refunded to individual donors; (4) The surplus shall be transferred to Health & Well-Being Surplus Fund and utilised for: critical medical treatment assistance, emergency healthcare support, medical aid for economically weaker patients, health camps and community healthcare initiatives, and other healthcare programs consistent with the charitable objectives of Islah Welfare Foundation.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">6. Change in Treatment Circumstances:</h4>
                  <p>
                    If treatment is completed at a lower cost, discontinued, the beneficiary no longer requires assistance, becomes ineligible, unfortunately passes away before full utilisation of the funds, or the hospital refuses or returns payment, then after settling all verified eligible medical expenses and applicable administrative costs, any remaining balance may be transferred to the Health & Well-Being Surplus Fund.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">7. Payment of Medical Assistance:</h4>
                  <p>
                    Wherever reasonably possible, payments shall be made directly to hospitals, medical institutions, pharmacies, diagnostic centres, or other authorised healthcare providers. Direct payment to beneficiaries may be made only where appropriate documentation and verification are available.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">8. Verification & Donor Consent:</h4>
                  <p>
                    By donating, donors acknowledge that donations are voluntary and irrevocable, support charitable medical assistance programs, and will be managed in accordance with this policy. Treatment costs are estimates, and donations are non-refundable except where required by law.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold">Registered Office:</span> B-144, Abul Fazal Enclave-II, Okhla, New Delhi, Delhi-110025 • Email: info@iwfindia.org • Website: www.iwfindia.org
                </div>
              </div>
            )}
          </div>
        </div>
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
          All Healthcare Initiatives
        </Link>
        <Link
          to="/programs/healthcare/rural-ambulance"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          Next: Rural Ambulance & Emergency Response (RAER)
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
        <PatientCardsSection />
        <BottomCTABanner />
        <OverviewSection />
        <ObjectiveSection />
        <SupportAreasSection />
        <ImplementationSection />
        <ImpactSection />
        <PolicySection />
        <BackNav />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

