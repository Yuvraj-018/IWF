import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
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
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
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
    <div className="text-center mb-10">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
        {label}
      </p>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] tracking-tight">
          {title}
        </h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HealthcareLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* 1. HERO SECTION (Matching About Us SubpageHeroCarousel) */}
        <SubpageHeroCarousel
          tag="WHAT WE DO • SECTOR 02"
          title="Healthcare & Well-Being"
          subtitle="We are committed to improving healthcare access in rural and underserved communities through preventive care, awareness, medical support, and emergency services."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Healthcare & Well-Being" },
          ]}
          images={[causeMedImg, overviewHero]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#programmes"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <span>Explore Initiatives</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/partner" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer backdrop-blur-xs">
              <Heart className="w-4 h-4 text-brand-orange" />
              <span>Partner With Us</span>
            </Link>
          </div>
        </SubpageHeroCarousel>

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
                subtitle="To address these critical gaps, Islah develops community-focused healthcare solutions that are affordable, accessible, preventive, and sustainable."
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
            <div className="mb-12 p-6 rounded-2xl bg-[#0b1f3b] text-white shadow-sm border border-slate-800">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-widest text-center mb-4">
                Healthcare Continuum of Care
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-center">
                {CONTINUUM_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/15 transition-all"
                  >
                    <div className="text-xs font-bold text-white leading-tight">
                      {step.name}
                    </div>
                    <div className="text-[10px] text-brand-orange font-bold mt-1">
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
                      className="group h-full bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green group-hover:bg-[#0b1f3b] group-hover:text-white flex items-center justify-center transition-colors">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${prog.badgeColor}`}
                          >
                            {prog.code}
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-brand-orange uppercase tracking-wider mb-1">
                          {prog.tagline}
                        </div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-orange mb-2 leading-snug transition-colors">
                          {prog.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                          {prog.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-brand-green group-hover:text-brand-orange transition-colors">
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
                    <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-sm transition-all flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-[#0b1f3b] mb-1">
                          {srv.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
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

        {/* 8. SUPPORT & PARTNER CTA */}
        <section className="py-14 bg-gradient-to-r from-[#071527] to-[#0c2340] text-white border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                Healthy Today • Stronger Tomorrow
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">
                Bring Hope, Heal Lives &amp; Build Healthier Communities
              </h2>
              <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm font-normal leading-relaxed mb-6">
                Your support funds emergency surgeries, sponsors ambulance fuel, supplies sanitary kits, and stocks free village clinics.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/donate" search={{ financialType: "Health Care & Well-being", initiative: "Healthcare & Well-being Initiatives" }} className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
                  Support Our Initiatives
                </Link>
                <Link to="/volunteer" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 cursor-pointer backdrop-blur-xs">
                  Become a Volunteer
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
