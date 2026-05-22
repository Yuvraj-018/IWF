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
  Activity,
  Salad,
  Dumbbell,
  Users,
  HandHeart,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
  Handshake,
  BarChart2,
  HeartPulse,
  Clock,
  Banknote,
  Utensils,
  TreePine,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import diabetesPreventionImg from "@/assets/diabetes_prevention.png";
import diabetesHero from "@/assets/diabetes.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHALLENGES = [
  { icon: Lightbulb, text: "Lack of awareness about diabetes prevention and healthy lifestyle practices" },
  { icon: Stethoscope, text: "Limited access to regular health check-ups and blood sugar screening" },
  { icon: Banknote, text: "Inability to afford continuous treatment and medicines" },
  { icon: Utensils, text: "Poor nutritional awareness and unhealthy food habits" },
  { icon: Clock, text: "Delayed diagnosis and untreated health conditions" },
  { icon: HeartPulse, text: "Increased risk of complications due to lack of monitoring and care" },
];

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Diabetes Awareness & Health Education",
    bullets: [
      "Awareness campaigns on diabetes, its causes, symptoms, and complications",
      "Education on preventive healthcare and healthy lifestyle habits",
      "Community sessions on balanced nutrition, physical activity, and stress management",
    ],
    highlight: false,
  },
  {
    num: "02",
    icon: Activity,
    title: "Free Health Screening & Check-up Camps",
    bullets: [
      "Blood sugar testing and diabetes screening camps",
      "Basic health check-ups for early identification of high-risk individuals",
      "Monitoring support for diabetic and pre-diabetic individuals",
    ],
    highlight: false,
  },
  {
    num: "03",
    icon: Salad,
    title: "Lifestyle & Nutrition Guidance",
    bullets: [
      "Guidance on healthy eating habits and balanced diet",
      "Promotion of physical fitness, yoga, and active lifestyle practices",
      "Awareness on reducing lifestyle risk factors such as obesity and inactivity",
    ],
    highlight: true, // visually stands out per phase7 design spec
  },
  {
    num: "04",
    icon: TreePine,
    title: "Rural Health Outreach & Community Engagement",
    bullets: [
      "Outreach programmes in villages and underserved communities",
      "Engagement with healthcare professionals, volunteers, and local stakeholders",
      "Health awareness sessions in schools, community centres, and public gatherings",
    ],
    highlight: false,
  },
  {
    num: "05",
    icon: HandHeart,
    title: "Support for Economically Weaker Communities",
    bullets: [
      "Awareness and screening support for vulnerable and low-income groups",
      "Referral guidance for patients requiring medical consultation or treatment",
      "Encouraging affordable and preventive healthcare practices",
    ],
    highlight: false,
  },
];

const IMPLEMENTATION_STEPS = [
  { icon: Users, text: "Community health awareness campaigns and screening camps" },
  { icon: Handshake, text: "Collaboration with doctors, nutritionists, healthcare experts, and volunteers" },
  { icon: TreePine, text: "Preventive healthcare outreach in rural and underserved areas" },
  { icon: HeartPulse, text: "CSR partnerships and public health support initiatives" },
  { icon: BarChart2, text: "Monitoring and evaluation of programme outreach and impact" },
];

const IMPACT_OUTCOMES = [
  { icon: Lightbulb, text: "Increase awareness about diabetes prevention and healthy living" },
  { icon: Stethoscope, text: "Promote early detection and timely medical consultation" },
  { icon: Dumbbell, text: "Encourage healthier lifestyle habits among communities" },
  { icon: ShieldCheck, text: "Reduce the risk of diabetes-related complications" },
  { icon: HeartPulse, text: "Improve overall community health and well-being" },
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
    <section className="relative min-h-[380px] flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={diabetesHero}
        alt="Diabetes Prevention & Lifestyle Awareness"
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
          <span className="text-white/80">Diabetes Prevention</span>
        </nav>

        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded transition-all mb-6 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Healthcare Programmes
        </Link>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-5">
          <Activity className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">Programme 06</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
          Diabetes Prevention &amp;<br />
          <span className="text-brand-orange">Lifestyle Awareness Programme</span>
        </h1>

        <p className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed italic">
          "Promoting healthy lifestyles and preventive care —{" "}
          <span className="text-white not-italic font-semibold">because awareness today can prevent disease tomorrow.</span>"
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
          <SectionTitle label="Overview" title="A Growing Silent Crisis" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden text-white">
                <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                  <Activity className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                    Diabetes has emerged as one of the fastest-growing lifestyle diseases in India, affecting millions of people across both urban and rural communities. Lack of awareness, unhealthy lifestyle habits, poor dietary practices, physical inactivity, stress, and delayed diagnosis have significantly increased the risk of diabetes and related health complications.
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                    In rural and underserved areas, many individuals remain unaware of the early symptoms, preventive measures, and long-term risks associated with diabetes. Due to limited healthcare access and low health awareness, diabetes is often diagnosed at advanced stages, leading to serious complications such as heart disease, kidney failure, vision problems, nerve damage, and other chronic conditions.
                  </p>
                  <p className="text-white/90 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-white/40">
                    Economically weaker families frequently face:
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
                    src={diabetesPreventionImg}
                    alt="Diabetes Prevention & Lifestyle Awareness"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Diabetes Prevention &amp; Lifestyle Awareness</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {CHALLENGES.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 bg-[#0d2b1a] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0 w-9 h-9 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <p className="text-sm text-slate-100 group-hover:text-slate-700 font-medium leading-relaxed transition-colors">{text}</p>
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
              As a result, diabetes not only affects individual health but also places a heavy financial and emotional burden on families and communities.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this growing public health concern, Islah Welfare Foundation (IWF) proposes the Diabetes Prevention &amp; Lifestyle Awareness Programme to promote awareness, preventive healthcare, early detection, and healthy lifestyle practices among rural and underserved populations.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full max-w-full text-center whitespace-normal">
              Our Goal: Educate communities about diabetes prevention and encourage healthier living to reduce the burden of lifestyle-related diseases.
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
              To create awareness about diabetes prevention, promote healthy lifestyle practices, and encourage early screening and preventive healthcare among rural and economically weaker communities.
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
            title="5 Areas of Action"
            subtitle="From awareness to screening, nutrition, outreach and community support — a complete lifestyle health programme."
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
                  <span className="absolute top-3 right-4 text-6xl font-extrabold text-white/10 select-none leading-none group-hover:text-brand-green/5 transition-colors">
                    {area.num}
                  </span>
                  {/* Highlighted card gets a stronger top bar */}
                  <div className="w-full h-1 rounded-full mb-5 transition-colors bg-white/30 group-hover:bg-brand-green" />
                  {area.highlight && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange group-hover:text-brand-green mb-2 transition-colors">⭐ Key Focus Area</span>
                  )}
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
                className="group flex flex-col items-center text-center p-5 bg-[#0d2b1a] hover:bg-white rounded-md border border-brand-green/10 hover:border-brand-green/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
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

        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-brand-green-darker rounded-md p-10 text-center">
            <p className="text-lg md:text-xl font-semibold text-white max-w-3xl mx-auto leading-relaxed italic">
              "Promoting healthy lifestyles and preventive care — because awareness today can prevent disease tomorrow."
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
          to="/programs/healthcare/cervical-cancer"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Cervical Cancer Prevention
        </Link>
        <Link
          to="/programs/healthcare/wellness-centres"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          Next: Rural Wellness Centres
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default function DiabetesPrevention() {
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
