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
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">{title}</h2>
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
      className={`border rounded-md overflow-hidden transition-all duration-300 ${
        isOpen
          ? "bg-white border-brand-green shadow-md"
          : "bg-[#0d2b1a] hover:bg-white border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md"
      } group`}
    >
      {/* Accordion Header */}
      <button
        className={`w-full flex items-center gap-4 p-5 transition-colors text-left cursor-pointer ${
          isOpen ? "bg-white" : "bg-[#0d2b1a] group-hover:bg-white"
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-colors ${
          isOpen
            ? "bg-brand-green/10"
            : "bg-white/15 group-hover:bg-brand-green/10"
        }`}>
          <Icon className={`w-5 h-5 transition-colors ${
            isOpen
              ? "text-brand-green"
              : "text-white group-hover:text-brand-green"
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-widest block transition-colors ${
            isOpen ? "text-slate-400" : "text-white/70 group-hover:text-slate-400"
          }`}>{area.num}</span>
          <span className={`font-bold text-sm transition-colors ${
            isOpen
              ? "text-brand-green-dark"
              : "text-white group-hover:text-brand-green-dark"
          }`}>
            {area.title}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-brand-green"
              : "text-white/70 group-hover:text-slate-400"
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
    <section className="relative min-h-[380px] flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={ruralHealthCentreHero}
        alt="Establishment of Rural Healthcare & Wellness Centres"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Modern dark/green gradient overlay for rich premium feel and high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium flex-wrap">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/programs/healthcare" className="hover:text-white transition-colors">Healthcare</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">Rural Wellness Centres</span>
        </nav>

        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded transition-all mb-6 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Healthcare Programmes
        </Link>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-5">
          <Building2 className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">Programme 07</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
          Establishment of Rural<br />
          <span className="text-brand-orange">Healthcare &amp; Wellness Centres</span>
        </h1>

        <p className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed italic">
          "Bringing healthcare closer to rural communities —{" "}
          <span className="text-white not-italic font-semibold">building healthier lives through accessible care, awareness, and wellness.</span>"
        </p>
      </div>
    </section>
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
              <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden text-white">
                <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                  <Building2 className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                    Access to quality healthcare remains one of the biggest challenges in rural India. Millions of people living in villages and underserved communities continue to face difficulties in obtaining timely medical consultation, basic treatment, preventive healthcare services, and emergency medical support due to inadequate healthcare infrastructure and a shortage of healthcare professionals.
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                    In many rural areas, people are forced to travel long distances even for minor medical treatment, resulting in delayed care, increased expenses, and worsening health conditions. The lack of accessible and affordable healthcare services particularly affects economically weaker families, women, children, elderly individuals, and persons with chronic illnesses.
                  </p>
                  <p className="text-white/90 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-white/40">
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
                className="group flex items-start gap-3 p-4 bg-[#0d2b1a] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <p className="text-xs text-slate-100 group-hover:text-slate-700 font-medium leading-relaxed transition-colors">{text}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-4 mb-12">
            {CHALLENGES.slice(4).map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 p-4 bg-[#0d2b1a] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <p className="text-xs text-slate-100 group-hover:text-slate-700 font-medium leading-relaxed transition-colors">{text}</p>
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
              Recognising this critical healthcare gap, Islah Welfare Foundation (IWF) proposes the Establishment of Rural Healthcare &amp; Wellness Centres to provide accessible, affordable, preventive, and community-focused healthcare services in rural and underserved areas.
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
            subtitle="Click each area to explore the full details of how IWF's Rural Wellness Centres will serve communities."
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
                className="group flex items-start gap-4 p-5 bg-[#0d2b1a] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/70 group-hover:text-brand-green block mb-0.5 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-slate-100 group-hover:text-slate-800 font-medium leading-relaxed transition-colors">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-brand-green-darker rounded-md p-10 text-center">
            <p className="text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-6 leading-relaxed">
              IWF believes that healthcare is a fundamental necessity, and every individual deserves access to affordable, timely, and quality healthcare services regardless of their socio-economic condition or geographic location.
            </p>
            <p className="text-lg md:text-xl font-semibold text-white max-w-3xl mx-auto leading-relaxed italic border-t border-white/10 pt-6">
              "Bringing healthcare closer to rural communities — building healthier lives through accessible care, awareness, and wellness."
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
          to="/programs/healthcare/diabetes-prevention"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Diabetes Prevention
        </Link>
        <Link
          to="/programs/healthcare/rural-ambulance"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          Next: Rural Ambulance Service
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default function WellnessCentres() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

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
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
