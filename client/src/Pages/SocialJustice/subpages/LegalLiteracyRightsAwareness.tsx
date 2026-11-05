import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
} from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Users,
  Heart,
  FileText,
  Shield,
  HandMetal,
  CheckCircle2,
  TrendingUp,
  Scale,
  Sparkles,
  Smartphone,
  GraduationCap,
  Landmark,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/contact-hands-hero.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: BookOpen,
    title: "Rights Education",
    desc: "Creating awareness about basic legal, constitutional and human rights in simple and accessible language.",
  },
  {
    num: "02",
    icon: Users,
    title: "Community Legal Awareness",
    desc: "Conducting awareness sessions, workshops, camps and community outreach on issues affecting everyday life.",
  },
  {
    num: "03",
    icon: Heart,
    title: "Women & Child Rights",
    desc: "Promoting awareness of women's and children's rights, dignity, safety, equality and protection.",
  },
  {
    num: "04",
    icon: Landmark,
    title: "Government Services & Entitlements",
    desc: "Creating awareness about relevant public services, welfare schemes, documentation and appropriate access channels.",
  },
  {
    num: "05",
    icon: Shield,
    title: "Grievance & Justice Awareness",
    desc: "Helping communities understand appropriate grievance-redressal mechanisms and pathways for seeking lawful remedies.",
  },
  {
    num: "06",
    icon: HandMetal,
    title: "Legal Referral",
    desc: "Where specialised assistance is required, connecting individuals with qualified advocates, legal-aid institutions or other appropriate professional support.",
  },
];

const PROGRAM_ACTIVITIES = [
  {
    icon: Scale,
    title: "Rural Legal Literacy Camps",
    desc: "Community-based awareness camps focusing on practical legal, land documentation, and rights-related issues.",
  },
  {
    icon: BookOpen,
    title: "Know Your Rights Sessions",
    desc: "Simple interactive educational sessions helping villagers understand their fundamental rights, responsibilities and legal protections.",
  },
  {
    icon: Heart,
    title: "Women & Child Rights Awareness",
    desc: "Targeted awareness activities addressing domestic protection, child labour prevention, right to education, and inheritance rights.",
  },
  {
    icon: Landmark,
    title: "Government Entitlements Awareness",
    desc: "Demystifying public welfare schemes, ration card issuance, pension benefits, job card registrations, and administrative guidelines.",
  },
  {
    icon: Smartphone,
    title: "Consumer & Digital Rights Awareness",
    desc: "Educating rural citizens on digital safety, UPI fraud prevention, consumer dispute redressal, and safe cyber practices.",
  },
  {
    icon: GraduationCap,
    title: "Youth Legal & Civic Awareness",
    desc: "Building constitutional consciousness, civic duty, equality principles, and democratic values among rural youth and students.",
  },
  {
    icon: HandMetal,
    title: "Legal Guidance & Referral Support",
    desc: "Facilitating access to qualified advocates, District Legal Services Authorities (DLSA), and institutional legal-aid panels.",
  },
];

const TARGET_COMMUNITIES = [
  "Rural and underserved communities with low legal awareness",
  "Women and girls needing safety and legal guidance",
  "Children and youth requiring protective legal frameworks",
  "Economically vulnerable families facing administrative exploitation",
  "Persons with disabilities seeking statutory accommodations",
  "Vulnerable daily wage and seasonal workers",
  "Individuals with limited literacy navigating formal procedures",
  "Communities facing social or institutional discrimination",
];

const KNOWLEDGE_TO_EMPOWERMENT = [
  { step: "01", label: "KNOW", tag: "Rights • Responsibilities", desc: "Foundational understanding of constitutional guarantees" },
  { step: "02", label: "UNDERSTAND", tag: "Law • Procedures", desc: "Comprehending statutory requirements & welfare guidelines" },
  { step: "03", label: "RECOGNISE", tag: "Injustice • Violations", desc: "Identifying unlawful exploitation, fraud, or denial of rights" },
  { step: "04", label: "ACT", tag: "Grievance • Referral", desc: "Taking timely steps through proper administrative forums" },
  { step: "05", label: "ACCESS", tag: "Institutions • Legal Aid", desc: "Engaging state legal-aid machinery and qualified advocates" },
  { step: "06", label: "EMPOWER", tag: "Dignity • Equality", desc: "Cultivating community confidence, resilience & active citizenship" },
];

const EXPECTED_IMPACTS = [
  "Increased awareness of legal and constitutional rights",
  "Improved understanding of laws and administrative procedures",
  "Greater awareness of public services and legitimate entitlements",
  "Reduced vulnerability to exploitation, fraud, and unfair practices",
  "Increased confidence in seeking appropriate institutional remedies",
  "Better awareness and protection of women's and children's rights",
  "Improved access to state legal-aid and dispute support mechanisms",
  "Stronger civic participation and responsible citizenship",
  "More informed, vigilant, and empowered grassroots communities",
];

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">{label}</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{title}</h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export default function LegalLiteracyRightsAwareness() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Banner */}
      <SubpageHeroCarousel
        tag="Initiative 01 • LLRA"
        title="Legal Literacy & Rights Awareness Programme"
        subtitle="Empowering rural communities with practical legal awareness, constitutional literacy, knowledge of government welfare entitlements, and pathways to lawful justice mechanisms."
        breadcrumbs={[
          { label: "What We Do", href: "/programs" },
          { label: "Social Justice & Legal Empowerment", href: "/programs/social-justice" },
          { label: "Legal Literacy & Rights Awareness" },
        ]}
        images={[heroImg]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to="/programs/social-justice"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Social Justice Initiatives
          </Link>
          <Link to="/partner" className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-brand-green-dark transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs hover:shadow-md cursor-pointer">
            Partner as Legal Aid Panel
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/volunteer" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer">
            Volunteer as Legal Educator
          </Link>
        </div>
      </SubpageHeroCarousel>

      {/* Overview & Objective */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Foundational Premise
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Legal Awareness as the Bedrock of Social Justice
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Legal awareness is an important foundation of social justice. In many rural and underserved
                    communities, people may have rights and legal protections but lack the knowledge, confidence
                    or guidance needed to understand and exercise them.
                  </p>
                  <p>
                    People face limited awareness of basic rights, lack of knowledge about public welfare entitlements,
                    difficulty understanding legal procedures, and vulnerability to exploitation, fraud, and unfair practices.
                  </p>
                  <p>
                    ISLAH believes that legal literacy should be simple, accessible and connected to real-life community needs.
                    Through this programme, we provide practical rights education and guidance on available support
                    mechanisms to help citizens make informed decisions and seek remedies through lawful channels.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="bg-[#f8faf8] border border-brand-green/20 rounded-xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full -mr-10 -mt-10" />
                  <div className="relative">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
                      Our Objective
                    </span>
                    <h3 className="text-xl font-bold text-brand-green-dark mb-4">
                      Strengthening Rights Consciousness
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To strengthen legal awareness, rights consciousness and confidence among rural and underserved
                      communities so that people can better understand their rights, responsibilities, available protections
                      and appropriate pathways to justice.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Scale className="w-4 h-4" />
                      <span>Informed Citizens • Protected Rights • Accessible Justice</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (6 Pillars) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Methodological Pillars"
              title="Our Approach"
              subtitle="Six strategic dimensions connecting educational awareness with real legal support and redressal mechanisms."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROACH_PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} delay={index * 0.05}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-lg bg-[#004724]/10 text-brand-green flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">{pillar.num}</span>
                      </div>
                      <h3 className="font-bold text-base text-brand-green-dark mb-2">{pillar.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Activities / Implementation */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Action Modules"
              title="Key Initiatives &amp; Camps"
              subtitle="Delivering targeted legal awareness, rights workshops and institutional referral mechanisms across rural districts."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PROGRAM_ACTIVITIES.map((act, index) => {
              const IconComp = act.icon;
              return (
                <ScrollReveal key={act.title} delay={index * 0.04}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{act.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Knowledge to Empowerment Pathway */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                Empowerment Architecture
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                From Knowledge to Empowerment Pathway
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed text-balance">
                Empowerment begins when citizens recognize injustice, navigate administrative channels,
                and assert their lawful rights with institutional support.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {KNOWLEDGE_TO_EMPOWERMENT.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">PHASE {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange mb-2">{stage.tag}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < KNOWLEDGE_TO_EMPOWERMENT.length - 1 && (
                    <div className="hidden lg:flex justify-end pt-3">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences & Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Priority Groups
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_COMMUNITIES.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Expected Impact */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Demonstrable Impact
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {EXPECTED_IMPACTS.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                        <TrendingUp className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Quote */}
      <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
              Our Vision
            </span>
            <blockquote className="text-lg sm:text-xl font-serif italic text-slate-800 leading-relaxed mb-3 text-balance">
              “Knowledge creates awareness. Awareness creates confidence. Confidence creates the pathway to justice.”
            </blockquote>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">— ISLAH</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Subpage Navigation */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/programs/social-justice"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Social Justice &amp; Legal Empowerment
          </Link>
          <Link
            to="/programs/social-justice/social-justice-legal-action"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Social Justice Legal Action (SJLA)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
