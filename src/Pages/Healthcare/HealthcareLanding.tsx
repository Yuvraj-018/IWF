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
  HeartPulse,
  Siren,
  HandHeart,
  Droplets,
  Stethoscope,
  Ribbon,
  Activity,
  Building2,
  Ambulance,
  ChevronRight,
  Home,
  ShieldCheck,
  Lightbulb,
  Users,
  Heart,
  Thermometer,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Clock,
  Baby,
  Smile,
  Search,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import causeMedImg from "@/assets/cause-medical.png";
import overviewHero from "@/assets/overview-hero.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_FEATURE_CARDS = [
  {
    icon: HeartPulse,
    title: "Accessible Healthcare",
    desc: "Quality medical care for underserved communities",
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care",
    desc: "Early screening and healthy lifestyle education",
  },
  {
    icon: Ambulance,
    title: "Emergency Support",
    desc: "Rapid response and critical life assistance",
  },
  {
    icon: Stethoscope,
    title: "Community Wellness",
    desc: "Holistic care for mothers, children, and families",
  },
];

const HERO_PILLARS_RIBBON = [
  { icon: Heart, label: "Better Health", sub: "For Every Family" },
  { icon: Users, label: "Stronger Communities", sub: "Resilient & Empowered" },
  { icon: Sparkles, label: "Empowered Lives", sub: "Dignity & Hope" },
  { icon: Smile, label: "Brighter Tomorrow", sub: "Intergenerational Wellness" },
];

const WHY_POINTS = [
  {
    icon: Building2,
    text: "Limited availability of healthcare facilities forces people to travel long distances",
  },
  {
    icon: Users,
    text: "Shortage of qualified doctors, specialists, and medical staff in rural areas",
  },
  {
    icon: Heart,
    text: "High cost of treatment makes healthcare unaffordable for poor families",
  },
  {
    icon: Lightbulb,
    text: "Lack of awareness leads to delayed diagnosis and preventable diseases",
  },
  {
    icon: Thermometer,
    text: "Seasonal disasters such as floods further disrupt healthcare access",
  },
  {
    icon: ShieldCheck,
    text: "Dependence on untrained or informal practitioners increases health risks",
  },
  {
    icon: Ambulance,
    text: "Limited emergency medical transportation and ambulance support in remote villages",
  },
  {
    icon: HeartPulse,
    text: "Poor awareness regarding hygiene, nutrition, women's health, and preventive care",
  },
];

const APPROACH_PILLARS = [
  "Providing subsidised or free healthcare support to poor and vulnerable communities",
  "Promoting preventive healthcare and health awareness initiatives",
  "Improving access to basic and emergency medical services",
  "Organising health check-up camps, screenings, and outreach programmes",
  "Supporting critical life and emergency medical assistance",
  "Promoting women's health, menstrual hygiene, and community wellness",
  "Conducting awareness programmes on diseases such as diabetes, cervical cancer, and lifestyle illnesses",
  "Strengthening healthcare accessibility in underserved rural areas through community interventions",
];

const CONTINUUM_STEPS = [
  { name: "Emergency", sub: "CLES" },
  { name: "Access", sub: "RAER" },
  { name: "Medical Aid", sub: "MAP" },
  { name: "Screening", sub: "CHC" },
  { name: "Prevention", sub: "DPLA" },
  { name: "Women's Health", sub: "MHHS" },
  { name: "Cancer Prevention", sub: "CCPA" },
  { name: "Rural Infrastructure", sub: "RHWC" },
];

const PROGRAMMES = [
  {
    num: "01",
    code: "CLES",
    icon: Siren,
    title: "Critical Life & Emergency Support",
    tagline: "Har Pal Anmol Hai",
    desc: "Immediate humanitarian financial assistance to critically ill underprivileged patients during life-threatening ICU emergencies.",
    route: "/programs/healthcare/critical-life-support",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
  },
  {
    num: "02",
    code: "RAER",
    icon: Ambulance,
    title: "Rural Ambulance & Emergency Response",
    tagline: "Reaching Every Life in Time",
    desc: "Accessible, affordable, and rapid emergency ambulance transportation for rural and remote communities.",
    route: "/programs/healthcare/rural-ambulance",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    num: "03",
    code: "MAP",
    icon: HandHeart,
    title: "Medical Assistance for Poor Patients",
    tagline: "Care & Compassion for All",
    desc: "Financial assistance covering hospital admissions, costly medicines, diagnostic tests, and surgical expenses.",
    route: "/programs/healthcare/medical-aid",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    num: "04",
    code: "CHC",
    icon: Stethoscope,
    title: "Community Health Check-up Camps",
    tagline: "Healthcare to the Doorstep",
    desc: "Free preventive medical consultations, diagnostic screenings, and health awareness camps for underserved villages.",
    route: "/programs/healthcare/health-checkup-camps",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
  {
    num: "05",
    code: "DPLA",
    icon: Activity,
    title: "Diabetes Prevention & Lifestyle Awareness",
    tagline: "Awareness Today, Health Tomorrow",
    desc: "Community screening camps, blood sugar testing, and healthy living education to combat lifestyle-related illnesses.",
    route: "/programs/healthcare/diabetes-prevention",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    num: "06",
    code: "MHHS",
    icon: Droplets,
    title: "Menstrual Health & Hygiene Support",
    tagline: "Dignity, Health & Confidence",
    desc: "Sanitary pad distribution drives, school awareness sessions, and breaking social stigma around women's health.",
    route: "/programs/healthcare/menstrual-hygiene",
    badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
  },
  {
    num: "07",
    code: "CCPA",
    icon: Ribbon,
    title: "Cervical Cancer Prevention & Awareness",
    tagline: "Early Action Saves Lives",
    desc: "Screening camps, HPV education, and preventive care support for women in economically weaker rural communities.",
    route: "/programs/healthcare/cervical-cancer",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
  },
  {
    num: "08",
    code: "RHWC",
    icon: Building2,
    title: "Rural Healthcare & Wellness Centres",
    tagline: "Bringing Healthcare Closer",
    desc: "Permanent community-based primary healthcare clinics providing continuous consultation, diagnostics, and maternal wellness.",
    route: "/programs/healthcare/wellness-centres",
    badgeColor: "bg-emerald-50 text-[#004724] border-emerald-200",
  },
];

const HEALTH_SERVICES = [
  {
    icon: Stethoscope,
    title: "General Health Check-ups",
    desc: "Routine physical examinations, doctor consultations, and basic medications.",
  },
  {
    icon: Baby,
    title: "Mother & Child Healthcare",
    desc: "Antenatal care, infant immunization counseling, and pediatric nutrition guidance.",
  },
  {
    icon: Heart,
    title: "Women's Health & Wellness",
    desc: "Reproductive health counseling, menstrual hygiene, and cervical screenings.",
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care & Screenings",
    desc: "Early detection tests for diabetes, hypertension, and chronic diseases.",
  },
  {
    icon: BookOpen,
    title: "Health Awareness Programs",
    desc: "Community workshops on water sanitation, nutrition, and first-aid response.",
  },
  {
    icon: ArrowUpRight,
    title: "Referral & Follow-up Support",
    desc: "Care navigation to tertiary hospital partners for advanced medical procedures.",
  },
];

const IMPACT_OUTCOMES = [
  "Improved access to affordable and preventive healthcare services",
  "Reduction in disease burden and preventable illnesses",
  "Timely medical intervention and reduced health-related risks",
  "Increased healthcare awareness and positive behavioural change",
  "Improved maternal, women, and community health outcomes",
  "Enhanced access to emergency medical transport in rural areas",
  "Improved overall quality of life and community well-being",
];

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionTitle({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest text-[#ea580c] mb-2">
        {label}
      </p>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="h-px w-8 bg-[#004724]" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {title}
        </h2>
        <span className="h-px w-8 bg-[#004724]" />
      </div>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HealthcareLanding() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[480px] flex items-center overflow-hidden bg-slate-900">
          <img
            src={overviewHero}
            alt="IWF Healthcare & Well-Being Initiatives"
            className="absolute inset-0 h-full w-full object-cover opacity-35 filter saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00381c]/95 via-[#004724]/85 to-slate-950/80" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1">
                <Home className="w-3.5 h-3.5" /> Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-semibold">
                Healthcare & Well-Being
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-[#ea580c]/20 border border-[#ea580c]/50 text-orange-200 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <HeartPulse className="w-3.5 h-3.5 text-[#ea580c]" />
              Accessible Healthcare. Healthier Communities.
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-8">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
                  Healthcare & Well-Being
                </h1>
                <p className="text-base md:text-lg text-emerald-100/95 max-w-3xl leading-relaxed font-normal mb-4">
                  We are committed to improving healthcare access in rural and
                  underserved communities through preventive care, awareness,
                  medical support, and emergency services.
                </p>
                <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed italic border-l-2 border-amber-400 pl-3">
                  “Ensuring healthcare reaches the last mile—because no life
                  should be lost due to lack of access to timely medical care.”
                </p>
              </div>

              {/* Stats Card */}
              <div className="lg:col-span-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                    Impact at a Glance
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-black text-white">8</div>
                      <div className="text-xs text-emerald-100/80">
                        Specialized Initiatives
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-amber-400">100+</div>
                      <div className="text-xs text-emerald-100/80">
                        Health Check-up Camps
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">624+</div>
                      <div className="text-xs text-emerald-100/80">
                        Critical Patients Saved
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-emerald-300">100%</div>
                      <div className="text-xs text-emerald-100/80">
                        Transparent Care
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
              {HERO_FEATURE_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {card.title}
                      </div>
                      <div className="text-[10px] text-emerald-200/80 leading-tight hidden sm:block">
                        {card.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4 PILLARS RIBBON */}
        <section className="bg-white border-b border-slate-200 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {HERO_PILLARS_RIBBON.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex items-center justify-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#004724] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        {p.label}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        {p.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW & THE HEALTH-POVERTY CYCLE */}
        <section className="py-16 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Overview"
                title="Healthcare in Rural India"
                subtitle="Addressing the systemic connection between health deprivation and intergenerational poverty."
              />
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="bg-white p-7 md:p-9 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#004724] uppercase tracking-wider">
                      <span>🌿</span> Health & Poverty Cycle
                    </div>
                    <p className="text-slate-800 text-sm md:text-base font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                      Health is one of the most critical pillars of human
                      development, yet it continues to remain a major challenge
                      in rural India. The relationship between health and poverty
                      is deeply interconnected—poor health reduces earning
                      capacity, while poverty limits access to proper
                      healthcare, creating a continuous cycle of deprivation and
                      vulnerability.
                    </p>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed pl-3 border-l-3 border-[#ea580c]">
                      In recent years, the rising cost and commercialisation of
                      healthcare services have made quality medical treatment
                      increasingly unaffordable for economically weaker
                      communities, particularly in rural areas. As a result,
                      millions of people are unable to access timely diagnosis,
                      preventive healthcare, emergency medical support, and
                      essential treatment services.
                    </p>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed pl-3 border-l-3 border-slate-300">
                      Women, children, elderly persons, and economically
                      disadvantaged families are among the most affected due to
                      limited healthcare infrastructure, lack of awareness, and
                      financial constraints.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5">
                <ScrollReveal delay={0.1}>
                  <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-white">
                    <img
                      src={causeMedImg}
                      alt="Healthcare in Rural India"
                      className="w-full h-80 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                        Rural Health Access
                      </span>
                      <p className="text-sm font-semibold">
                        Reaching communities left behind by commercial medicine
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHY HEALTHCARE INTERVENTION IS NEEDED (CHALLENGES) */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="The Challenge"
                title="Why Healthcare Intervention Is Needed in Rural Areas"
                subtitle="Rural communities face significantly greater healthcare barriers due to systemic gaps in infrastructure, awareness, and service delivery."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {WHY_POINTS.map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-[#004724] flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center text-xs md:text-sm text-amber-900 font-semibold max-w-3xl mx-auto">
              Without timely medical intervention, minor illnesses often
              escalate into serious, life-threatening conditions, leading to
              ruinous financial hardship and reduced quality of life for rural
              families.
            </div>
          </div>
        </section>

        {/* 4. OUR APPROACH */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Strategic Model"
                title="Our Approach"
                subtitle="To address these critical gaps, IWF develops community-focused healthcare solutions that are affordable, accessible, preventive, and sustainable."
              />
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {APPROACH_PILLARS.map((pillar, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div className="h-full bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#004724] flex items-center justify-center font-black text-xs">
                          {i + 1}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                        {pillar}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CONTINUUM BANNER & 8 KEY HEALTHCARE INITIATIVES */}
        <section className="py-16 bg-white border-t border-slate-200" id="programmes">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Portfolio of Care"
                title="Our 8 Healthcare Initiatives"
                subtitle="From emergency critical response and ambulance services to preventive check-ups, women's health, and permanent village wellness clinics."
              />
            </ScrollReveal>

            {/* Continuum Pathway Ribbon */}
            <div className="mb-12 p-4 rounded-2xl bg-gradient-to-r from-[#00381c] via-[#004724] to-[#0b1f3b] text-white shadow-md">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest text-center mb-3">
                Healthcare Continuum of Care
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center">
                {CONTINUUM_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15"
                  >
                    <div className="text-[11px] font-bold text-white leading-tight">
                      {step.name}
                    </div>
                    <div className="text-[9px] text-amber-300 font-semibold">
                      {step.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 Programmes Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROGRAMMES.map((prog) => {
                const Icon = prog.icon;
                return (
                  <ScrollReveal key={prog.num}>
                    <Link
                      to={prog.route}
                      className="group h-full bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004724] group-hover:bg-[#004724] group-hover:text-white flex items-center justify-center transition-colors">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${prog.badgeColor}`}
                          >
                            {prog.code}
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider mb-1">
                          {prog.tagline}
                        </div>
                        <h3 className="font-black text-base text-slate-900 group-hover:text-[#004724] mb-2 leading-snug transition-colors">
                          {prog.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {prog.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#004724] group-hover:text-[#ea580c]">
                        <span>Explore Initiative</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. OUR HEALTH SERVICES (6 CORE SERVICES) */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Clinical Offerings"
                title="Our Health Services"
                subtitle="Direct clinical, preventive, diagnostic, and counseling services delivered across our camps and wellness clinics."
              />
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HEALTH_SERVICES.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 60}>
                    <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#004724] flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">
                          {srv.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {srv.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. EXPECTED IMPACT (7 OUTCOMES) */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Measurable Change"
                title="Expected Impact"
                subtitle="Through its healthcare and wellness initiatives, ISLAH creates measurable, sustainable, and life-saving impact in rural communities."
              />
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {IMPACT_OUTCOMES.slice(0, 4).map((outcome, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#004724] flex items-center justify-center font-bold text-xs mb-3">
                    0{i + 1}
                  </div>
                  <p className="text-xs md:text-sm text-slate-800 font-semibold leading-relaxed">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {IMPACT_OUTCOMES.slice(4).map((outcome, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#004724] flex items-center justify-center font-bold text-xs mb-3">
                    0{i + 5}
                  </div>
                  <p className="text-xs md:text-sm text-slate-800 font-semibold leading-relaxed">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. STATEMENT BANNER */}
        <section className="py-14 bg-[#004724] text-white text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <span className="text-4xl text-amber-400 font-serif leading-none block">
              “
            </span>
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-emerald-50 italic">
              Ensuring healthcare reaches the last mile—because no life should be
              lost due to lack of access to timely medical care.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-amber-400/60" />
              <span className="text-amber-300 font-semibold text-xs uppercase tracking-widest">
                Islah Welfare Foundation
              </span>
              <span className="h-px w-8 bg-amber-400/60" />
            </div>
          </div>
        </section>

        {/* 9. HEALTHY TODAY, STRONGER TOMORROW CTA */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#0b1f3b] via-[#004724] to-[#00381c] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Healthy Today • Stronger Tomorrow
                </div>
                <h3 className="text-xl md:text-3xl font-black">
                  Bring Hope, Heal Lives & Build Healthier Communities
                </h3>
                <p className="text-xs md:text-sm text-emerald-100/90 mt-2 max-w-xl">
                  Your support funds emergency surgeries, sponsors ambulance fuel,
                  supplies sanitary kits, and stocks free village clinics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveModal("sponsor")}
                  className="px-6 py-3.5 rounded-xl bg-[#ea580c] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Support Our Initiatives
                </button>
                <button
                  onClick={() => setActiveModal("volunteer")}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#004724] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Become a Volunteer
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
