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
  ShoppingBag,
  Lightbulb,
  MessageCircle,
  Droplets,
  BookOpen,
  Users,
  Heart,
  CheckCircle2,
  School,
  Handshake,
  BarChart2,
  Smile,
  ShieldCheck,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import menstrualHygieneImg from "@/assets/menstrual_hygiene.png";
import menstrualHygiene from "@/assets/menstrual-hygiene.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STRUGGLE_POINTS = [
  { icon: ShoppingBag, text: "Inability to afford sanitary pads and hygiene products" },
  { icon: Lightbulb, text: "Lack of awareness about menstrual health and hygiene" },
  { icon: MessageCircle, text: "Social stigma and cultural taboos surrounding menstruation" },
  { icon: Droplets, text: "Limited access to clean sanitation and disposal facilities" },
  { icon: ShieldCheck, text: "Increased risk of infections and health complications" },
  { icon: School, text: "School absenteeism among adolescent girls during menstrual cycles" },
];

const APPROACH_AREAS = [
  {
    num: "01",
    icon: ShoppingBag,
    title: "Distribution of Menstrual Hygiene Kits",
    bullets: [
      "Distribution of sanitary pads and hygiene kits to girls and women",
      "Support for economically weaker and vulnerable communities",
      "Ensuring access to safe and hygienic menstrual products",
    ],
  },
  {
    num: "02",
    icon: BookOpen,
    title: "Menstrual Health Awareness & Education",
    bullets: [
      "Awareness sessions on menstrual hygiene and health",
      "Education on safe hygiene practices and infection prevention",
      "Breaking myths, stigma, and misconceptions around menstruation",
    ],
  },
  {
    num: "03",
    icon: School,
    title: "School & Community Outreach Programmes",
    bullets: [
      "Menstrual hygiene awareness programmes in schools and villages",
      "Engagement with teachers, parents, and community leaders",
      "Encouraging girls' education and regular school attendance",
    ],
  },
  {
    num: "04",
    icon: Heart,
    title: "Women Health & Dignity Support",
    bullets: [
      "Promoting confidence, dignity, and health among adolescent girls and women",
      "Encouraging open discussion and positive health behaviour",
      "Supporting women's health through community-based initiatives",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  { icon: ShoppingBag, text: "Distribution drives in schools, rural communities, and underserved areas" },
  { icon: Handshake, text: "Collaboration with healthcare professionals and volunteers" },
  { icon: Users, text: "Awareness workshops and community engagement activities" },
  { icon: Lightbulb, text: "CSR partnerships and humanitarian support initiatives" },
  { icon: BarChart2, text: "Monitoring and evaluation of outreach and impact" },
];

const IMPACT_OUTCOMES = [
  { icon: Lightbulb, text: "Improve menstrual hygiene awareness among girls and women" },
  { icon: ShieldCheck, text: "Reduce health risks and infections caused by poor hygiene practices" },
  { icon: School, text: "Increase school attendance and participation among adolescent girls" },
  { icon: MessageCircle, text: "Break social stigma and encourage informed conversations" },
  { icon: Smile, text: "Promote dignity, confidence, and well-being for women and girls" },
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
      tag="HEALTHCARE • MHHS"
      title="Menstrual Health & Hygiene Support (MHHS)"
      subtitle="Breaking social stigmas, distributing sanitary hygiene essentials, and educating adolescent girls and rural women on reproductive health and dignity."
      breadcrumbs={[
        { label: "What We Do", href: "/programs" },
        { label: "Healthcare", href: "/programs/healthcare" },
        { label: "Menstrual Health & Hygiene" },
      ]}
      images={[menstrualHygiene, menstrualHygieneImg]}
    >
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All Healthcare Initiatives
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
          <SectionTitle label="Overview" title="A Neglected Yet Critical Issue" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
                <div className="absolute -top-4 -right-4 text-slate-100 select-none pointer-events-none">
                  <Droplets className="w-32 h-32" />
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
                  <span>🌿</span> Context &amp; Challenge
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed border-l-3 border-[#004724] pl-3">
                    Menstrual hygiene remains one of the most neglected yet critical health and social issues affecting adolescent girls and women, particularly in rural and underserved communities. Due to poverty, lack of awareness, social stigma, and limited access to sanitary products, many girls and women are unable to manage menstruation safely and hygienically.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange">
                    In rural areas, menstrual health is often surrounded by silence, misinformation, and social taboos, leading to poor hygiene practices and serious health risks. Many girls are forced to miss school during menstruation, while women suffer in silence without access to basic menstrual hygiene support.
                  </p>
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-slate-300">
                    Economically weaker families often struggle with:
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
                    src={menstrualHygieneImg}
                    alt="Menstrual Hygiene Support"
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Menstrual Hygiene Support</span>
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
              As a result, menstrual health challenges directly impact the education, health, dignity, confidence, and well-being of girls and women.
            </p>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-3xl mx-auto mb-4">
              Recognising this urgent need, Islah Welfare Foundation (Islah) proposes the Menstrual Hygiene Support Programme to promote menstrual health awareness, improve access to hygiene products, and support the dignity and well-being of adolescent girls and women from underserved communities.
            </p>
            <div className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full">
              Our Goal: Ensure that no girl or woman suffers due to lack of awareness, affordability, or access to menstrual hygiene support.
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
              To improve menstrual hygiene awareness and provide access to safe menstrual hygiene products and healthcare support for adolescent girls and women, especially from economically weaker and rural communities.
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
            title="4 Areas of Action"
            subtitle="From product distribution to awareness and dignity — Islah's approach is comprehensive and community-rooted."
          />
        </ScrollReveal>

        <ScrollReveal stagger={0.09}>
          {/* 2×2 grid as specified */}
          <div className="grid sm:grid-cols-2 gap-5">
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
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">{area.num}</span>
                      <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-green-dark transition-colors">
                        {area.title}
                      </h3>
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

        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-slate-50/80 border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
            <p className="text-base sm:text-lg font-semibold text-slate-800 max-w-3xl mx-auto leading-relaxed italic">
              "Islah believes that menstrual hygiene is a basic health and dignity issue, and every girl and woman deserves access to safe hygiene support, awareness, and care."
            </p>
            <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto">
              "Supporting dignity, health, and confidence — because no girl should be held back by menstruation."
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
          to="/programs/healthcare/diabetes-prevention"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Prev: Diabetes Prevention &amp; Lifestyle (DPLA)
        </Link>
        <Link
          to="/programs/healthcare/cervical-cancer"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:translate-x-0.5"
        >
          Next: Cervical Cancer Prevention (CCPA)
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function MenstrualHygiene() {
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
