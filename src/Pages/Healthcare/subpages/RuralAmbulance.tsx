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
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">{title}</h2>
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
    <section className="relative min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={ambulanceHero}
        alt="Rural Ambulance & Emergency Response Service"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Modern dark/green gradient overlay for rich premium feel and high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent" />

      {/* Pulse ring — urgency indicator (brand-green, not red) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-brand-orange/30 animate-ping" style={{ animationDuration: "2s" }} />
          <span className="absolute inset-3 rounded-full border-2 border-brand-orange/20 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.4s" }} />
          <div className="w-14 h-14 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center">
            <Siren className="w-7 h-7 text-brand-orange" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium flex-wrap">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/programs/healthcare" className="hover:text-white transition-colors">Healthcare</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">Rural Ambulance Service</span>
        </nav>

        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded transition-all mb-6 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Healthcare Programmes
        </Link>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-5">
          <Ambulance className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">Programme 08</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
          Rural Ambulance &amp;<br />
          <span className="text-brand-orange">Emergency Response Service</span>
        </h1>

        <p className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed italic">
          "Reaching every life in time —{" "}
          <span className="text-white not-italic font-semibold">because emergency care should never be delayed by distance or poverty.</span>"
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
          <SectionTitle label="Overview" title="When Every Minute Matters" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden text-white">
                <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                  <Ambulance className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                    In rural and remote areas, timely access to emergency medical transportation remains a major challenge. During medical emergencies, accidents, pregnancy complications, serious illnesses, or critical health conditions, many patients are unable to reach hospitals on time due to lack of ambulance services, poor transportation facilities, and financial constraints.
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                    For economically weaker families, arranging emergency transportation often becomes difficult, resulting in dangerous delays in medical treatment. In many villages, patients are transported using unsafe or unsuitable means, putting lives at even greater risk.
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
          <div className="flex gap-4 overflow-x-auto pb-2 sm:hidden scrollbar-hide snap-x snap-mandatory">
            {CHALLENGES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-56 snap-start flex items-start gap-3 p-4 bg-[#0d2b1a] rounded-md border border-brand-green/10 shadow-sm"
              >
                <div className="shrink-0 w-8 h-8 rounded-md bg-white/15 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-slate-100 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHALLENGES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 bg-[#0d2b1a] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative shrink-0 w-9 h-9 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <p className="text-sm text-slate-100 group-hover:text-slate-700 font-medium leading-relaxed transition-colors">{text}</p>
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
              Recognising this urgent healthcare need, Islah Welfare Foundation (IWF) proposes the Rural Ambulance &amp; Emergency Response Service to provide accessible, affordable, and timely emergency medical transportation and response support to rural and underserved communities.
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
            subtitle="IWF's Rural Ambulance Service addresses the full spectrum of emergency healthcare needs — from transport to awareness."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {APPROACH_AREAS.slice(0, 3).map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.num}
                  className="group relative bg-[#0d2b1a] hover:bg-white rounded-md p-6 border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Pulse on icon for urgency */}
                  <span className="absolute top-3 right-4 text-6xl font-extrabold text-white/10 select-none leading-none group-hover:text-brand-green/5 transition-colors">
                    {area.num}
                  </span>
                  <div className="w-full h-1 rounded-full bg-white/30 group-hover:bg-brand-green transition-colors mb-5" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 rounded-md bg-white/15 group-hover:bg-brand-orange/15 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-white group-hover:text-brand-orange transition-colors" />
                      {/* Subtle pulse ring on hover */}
                      <span className="absolute inset-0 rounded-md border border-brand-orange/40 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" style={{ animationDuration: "1.5s" }} />
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-brand-green-dark transition-colors">{area.title}</h3>
                  </div>
                  <ul className="space-y-2.5 flex-1 relative z-10">
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
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {APPROACH_AREAS.slice(3).map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.num}
                  className="group relative bg-[#0d2b1a] hover:bg-white rounded-md p-6 border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <span className="absolute top-3 right-4 text-6xl font-extrabold text-white/10 select-none leading-none group-hover:text-brand-green/5 transition-colors">
                    {area.num}
                  </span>
                  <div className="w-full h-1 rounded-full bg-white/30 group-hover:bg-brand-green transition-colors mb-5" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-white/15 group-hover:bg-brand-orange/15 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-white group-hover:text-brand-orange transition-colors" />
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-brand-green-dark transition-colors">{area.title}</h3>
                  </div>
                  <ul className="space-y-2.5 flex-1 relative z-10">
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
                  <div className="flex-1 bg-[#0d2b1a] hover:bg-white border border-brand-green/10 hover:border-brand-green/30 rounded-md p-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-white/80 group-hover:text-brand-orange uppercase tracking-widest transition-colors">Step {String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] text-white/30 group-hover:text-slate-300 transition-colors">•</span>
                      <span className="text-xs font-bold text-white group-hover:text-brand-green-dark transition-colors">{title}</span>
                    </div>
                    <p className="text-sm text-slate-100 group-hover:text-slate-600 leading-relaxed transition-colors">{text}</p>
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
                className="group flex items-start gap-4 p-5 bg-[#0d2b1a] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5 text-white group-hover:text-brand-green transition-colors" />
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
            <p className="text-lg md:text-xl font-semibold text-white max-w-3xl mx-auto leading-relaxed italic">
              "IWF believes that timely emergency response can save lives, and every individual deserves quick access to healthcare support during critical moments, regardless of location or financial condition."
            </p>
            <p className="text-white/70 text-sm mt-4 max-w-xl mx-auto">
              "Reaching every life in time — because emergency care should never be delayed by distance or poverty."
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
          to="/programs/healthcare/wellness-centres"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Rural Wellness Centres
        </Link>
        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          All Healthcare Programmes
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default function RuralAmbulance() {
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
        <ApproachSection />
        <ImplementationSection />
        <ImpactSection />
        <BackNav />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
