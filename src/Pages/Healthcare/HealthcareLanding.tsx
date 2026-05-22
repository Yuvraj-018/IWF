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
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import causeMedImg from "@/assets/cause-medical.png";
import overviewHero from "@/assets/overview-hero.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const WHY_POINTS = [
  { icon: Building2, text: "Limited availability of healthcare facilities forces people to travel long distances" },
  { icon: Users, text: "Shortage of qualified doctors, specialists, and medical staff" },
  { icon: Heart, text: "High cost of treatment makes healthcare unaffordable for poor families" },
  { icon: Lightbulb, text: "Lack of awareness leads to delayed diagnosis and preventable diseases" },
  { icon: Thermometer, text: "Seasonal disasters such as floods further disrupt healthcare access" },
  { icon: ShieldCheck, text: "Dependence on untrained or informal practitioners increases health risks" },
  { icon: Ambulance, text: "Limited emergency medical transportation and ambulance support" },
  { icon: HeartPulse, text: "Poor awareness regarding hygiene, nutrition, women's health, and preventive care" },
];

const APPROACH_PILLARS = [
  "Providing subsidised or free healthcare support to poor and vulnerable communities",
  "Promoting preventive healthcare and health awareness initiatives",
  "Improving access to basic and emergency medical services",
  "Organising health check-up camps, screenings, and outreach programmes",
  "Supporting critical life and emergency medical assistance",
  "Promoting women's health, menstrual hygiene, and community wellness",
  "Conducting awareness programmes on diseases such as diabetes, cervical cancer, and lifestyle-related illnesses",
  "Strengthening healthcare accessibility in underserved rural areas through community-based interventions",
];

const IMPACT_OUTCOMES = [
  "Improved access to affordable and preventive healthcare services",
  "Reduction in disease burden and preventable illnesses",
  "Timely medical intervention and reduced health-related risks",
  "Increased healthcare awareness and behavioural change",
  "Improved maternal, women, and community health outcomes",
  "Enhanced access to emergency medical support in rural areas",
  "Improved overall quality of life and community well-being",
];

const PROGRAMMES = [
  {
    num: "01",
    icon: Siren,
    title: "Critical Life & Emergency Support Initiative",
    desc: "Providing timely humanitarian medical assistance to critically ill underprivileged patients during life-threatening emergencies.",
    route: "/programs/healthcare/critical-life-support",
  },
  {
    num: "02",
    icon: HandHeart,
    title: "Medical Aid Programme for Poor Patients",
    desc: "Financial assistance and healthcare support covering treatment, medicines, diagnostics, and hospital expenses for poor patients.",
    route: "/programs/healthcare/medical-aid",
  },
  {
    num: "03",
    icon: Droplets,
    title: "Menstrual Hygiene Support Programme",
    desc: "Empowering girls and women with menstrual hygiene kits, awareness, and dignity — breaking stigma in rural communities.",
    route: "/programs/healthcare/menstrual-hygiene",
  },
  {
    num: "04",
    icon: Stethoscope,
    title: "Medical Health Check-up Camps",
    desc: "Free preventive health check-up camps for underserved rural communities — bringing doctors and diagnostics to the doorstep.",
    route: "/programs/healthcare/health-checkup-camps",
  },
  {
    num: "05",
    icon: Ribbon,
    title: "Cervical Cancer Prevention & Awareness",
    desc: "Creating awareness and supporting early detection of cervical cancer among women in economically weaker communities.",
    route: "/programs/healthcare/cervical-cancer",
  },
  {
    num: "06",
    icon: Activity,
    title: "Diabetes Prevention & Lifestyle Awareness",
    desc: "Promoting healthy lifestyles, free blood sugar screening, and preventive care awareness in rural and underserved areas.",
    route: "/programs/healthcare/diabetes-prevention",
  },
  {
    num: "07",
    icon: Building2,
    title: "Rural Healthcare & Wellness Centres",
    desc: "Establishing community-based wellness centres providing accessible primary healthcare to rural populations.",
    route: "/programs/healthcare/wellness-centres",
  },
  {
    num: "08",
    icon: Ambulance,
    title: "Rural Ambulance & Emergency Response",
    desc: "Timely ambulance and emergency response support ensuring rapid access for rural communities during medical emergencies.",
    route: "/programs/healthcare/rural-ambulance",
  },
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

function HeroSection() {
  return (
    <section className="relative min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={overviewHero}
        alt="IWF Healthcare Initiatives"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Modern dark/green gradient overlay for rich premium feel and high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">Healthcare</span>
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
          <HeartPulse className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-xs font-semibold tracking-wider uppercase text-white/90">IWF Healthcare Initiatives</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
          Health Care
        </h1>

        <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed font-normal">
          Ensuring healthcare reaches the last mile —{" "}
          <span className="text-white font-semibold">because no life should be lost due to lack of access to timely medical care.</span>
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mt-10">
          {[
            { n: "8", label: "Healthcare Programmes" },
            { n: "100+", label: "Health Camps Conducted" },
            { n: "5,000+", label: "Lives Impacted" },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-3xl font-extrabold text-brand-orange">{n}</span>
              <span className="text-xs text-white/60 font-medium mt-0.5">{label}</span>
            </div>
          ))}
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
          <SectionTitle label="Overview" title="Healthcare in Rural India" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                  <Stethoscope className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                  <span>🌿</span> Health &amp; Poverty Cycle
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                    Health is one of the most critical pillars of human development, yet it continues to remain a major challenge in rural India. The relationship between health and poverty is deeply interconnected—poor health reduces earning capacity, while poverty limits access to proper healthcare, creating a continuous cycle of deprivation and vulnerability.
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                    In recent years, the rising cost and commercialisation of healthcare services have made quality medical treatment increasingly unaffordable for economically weaker communities, particularly in rural areas. As a result, millions of people are unable to access timely diagnosis, preventive healthcare, emergency medical support, and essential treatment services.
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed pl-3 border-l-3 border-white/40">
                    Women, children, elderly persons, and economically disadvantaged families are among the most affected due to limited healthcare infrastructure, lack of awareness, and financial constraints.
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
                    src={causeMedImg}
                    alt="Healthcare in Rural India"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Healthcare in Rural India</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Callout & Action Plan */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-slate-50 to-brand-green/5 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Recognising these challenges, Islah Welfare Foundation (IWF) is committed to improving healthcare access and promoting community wellness in underserved rural areas through affordable, accessible, preventive, and awareness-based healthcare initiatives.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Our approach goes beyond treatment support—it focuses on building healthier communities through preventive healthcare, awareness, early intervention, emergency assistance, and sustainable healthcare access.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full">
              Our Goal: Promote health equity and build healthier rural communities.
            </div>
          </div>
        </ScrollReveal>

        {/* Why Intervention is Needed */}
        <ScrollReveal>
          <div className="border-t border-slate-100 pt-12 mt-12">
            <SectionTitle
              label="The Challenge"
              title="Why Healthcare Intervention Is Needed"
              subtitle="Rural communities continue to face significantly greater healthcare challenges compared to urban regions due to systemic gaps in infrastructure, awareness, and service delivery. The need for focused healthcare intervention in rural areas arises because:"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {WHY_POINTS.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group bg-[#0d2b1a] hover:bg-white rounded-md p-5 border border-brand-green/10 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="w-10 h-10 rounded-md bg-white/15 group-hover:bg-brand-green/10 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <p className="text-sm text-white/90 group-hover:text-slate-700 leading-relaxed font-medium transition-colors">{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-center text-slate-600 text-sm max-w-3xl mx-auto leading-relaxed mt-8">
            Without timely medical intervention, minor illnesses often escalate into serious and life-threatening conditions, leading to increased financial hardship and reduced quality of life for rural families.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            label="Our Approach"
            title="IWF's Healthcare Focus Areas"
            subtitle="A comprehensive, community-driven approach to delivering equitable healthcare across rural India."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {APPROACH_PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 bg-white rounded-md p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-brand-green flex items-center justify-center font-bold text-white text-xs group-hover:bg-brand-green-dark transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium group-hover:text-slate-900 transition-colors">
                  {pillar}
                </p>
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
          <SectionTitle 
            label="Expected Impact" 
            title="7 Outcomes We Drive" 
            subtitle="Through its healthcare and wellness initiatives, IWF aims to create measurable and sustainable impact in rural communities, including:"
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {IMPACT_OUTCOMES.slice(0, 4).map((outcome, i) => (
              <div key={i} className="group bg-[#0d2b1a] hover:bg-white rounded-md p-5 border border-brand-green/10 hover:border-brand-green/20 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-white group-hover:bg-brand-green flex items-center justify-center text-brand-green group-hover:text-white font-bold text-xs mb-4 transition-colors">
                  {i + 1}
                </div>
                <p className="text-sm text-white/90 group-hover:text-slate-700 font-medium leading-relaxed transition-colors">{outcome}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {IMPACT_OUTCOMES.slice(4).map((outcome, i) => (
              <div key={i} className="group bg-[#0d2b1a] hover:bg-white rounded-md p-5 border border-brand-green/10 hover:border-brand-green/20 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-white group-hover:bg-brand-green flex items-center justify-center text-brand-green group-hover:text-white font-bold text-xs mb-4 transition-colors">
                  {i + 5}
                </div>
                <p className="text-sm text-white/90 group-hover:text-slate-700 font-medium leading-relaxed transition-colors">{outcome}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Vision quote */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-brand-green-darker rounded-md p-10 text-center">
            <p className="text-base text-white/80 max-w-3xl mx-auto leading-relaxed mb-6">
              IWF envisions a future where no individual is deprived of healthcare due to poverty, distance, or lack of awareness. The foundation aims to strengthen rural healthcare systems and ensure that quality healthcare reaches even the most underserved communities.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white max-w-3xl mx-auto leading-relaxed italic">
              "Ensuring healthcare reaches the last mile—because no life should be lost due to lack of access to timely medical care."
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

function ProgrammesGrid() {
  return (
    <section className="py-16 bg-slate-50" id="programmes">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            label="Our Programmes"
            title="8 Healthcare Initiatives"
            subtitle="Each programme is designed to address a specific healthcare gap in rural and underserved communities."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.06}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMMES.map((prog) => {
              const Icon = prog.icon;
              return (
                <Link
                  key={prog.num}
                  to={prog.route}
                  className="group bg-[#0d2b1a] hover:bg-white rounded-md p-5 border border-brand-green/10 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-white/15 group-hover:bg-brand-orange/15 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-white group-hover:text-brand-orange transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white/60 group-hover:text-slate-400 transition-colors">{prog.num}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-brand-green-dark mb-2 leading-snug transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-slate-100 group-hover:text-slate-600 leading-relaxed flex-1 mb-4 transition-colors">{prog.desc}</p>
                  <span className="text-xs font-semibold text-white group-hover:text-brand-green inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function HealthcareLanding() {
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
        <ApproachSection />
        <ImpactSection />
        <ProgrammesGrid />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
