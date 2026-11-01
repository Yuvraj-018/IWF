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
  ArrowRight,
  Scale,
  Shield,
  BookOpen,
  Gavel,
  FileText,
  Users,
  Building,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Eye,
  HandMetal,
  Landmark,
  ShieldAlert,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/contact-hands-hero.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_CHALLENGES = [
  {
    num: "01",
    title: "Limited Rights Awareness",
    desc: "Widespread lack of basic legal and constitutional literacy in rural and underserved areas prevents individuals from asserting their rights.",
  },
  {
    num: "02",
    title: "Social Discrimination & Exclusion",
    desc: "Marginalized groups, women, and vulnerable families routinely face systemic discrimination, social biases, and institutional neglect.",
  },
  {
    num: "03",
    title: "Denial of Services & Entitlements",
    desc: "Legitimate welfare benefits, public services, and statutory entitlements are frequently delayed, withheld, or obstructed by bureaucratic hurdles.",
  },
  {
    num: "04",
    title: "Exploitation & Unfair Practices",
    desc: "Vulnerable workers, informal laborers, and economically weaker households remain susceptible to fraud, wage suppression, and abusive practices.",
  },
  {
    num: "05",
    title: "Limited Access to Justice",
    desc: "Exorbitant litigation costs, geographic distance from courts, and scarcity of legal aid create formidable barriers to lawful dispute redressal.",
  },
  {
    num: "06",
    title: "Institutional Barriers",
    desc: "Fear of authorities, administrative opacity, and complex procedural formalities discourage citizens from approaching grievance forums.",
  },
];

const APPROACH_PILLARS = [
  {
    num: "01",
    title: "Rights Awareness",
    desc: "Promoting awareness of basic rights, responsibilities, equality and constitutional values in simple, local languages.",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "Legal Literacy",
    desc: "Making relevant legal, statutory and administrative procedures understandable, practical and directly actionable.",
    icon: FileText,
  },
  {
    num: "03",
    title: "Access to Justice",
    desc: "Helping individuals navigate appropriate legal, institutional and grievance-redressal pathways without fear or confusion.",
    icon: Scale,
  },
  {
    num: "04",
    title: "Legal Support & Referral",
    desc: "Connecting genuine community matters with qualified advocates, state legal-aid authorities, and verified professionals.",
    icon: HandMetal,
  },
  {
    num: "05",
    title: "Judicial Action",
    desc: "Where appropriate and legally permissible, supporting proceedings before competent courts concerning genuine public-interest issues.",
    icon: Gavel,
  },
  {
    num: "06",
    title: "Advocacy & Accountability",
    desc: "Promoting lawful action, institutional transparency and systemic protection for marginalized and vulnerable communities.",
    icon: Landmark,
  },
];

const INITIATIVES = [
  {
    num: "01",
    abbr: "LLRA",
    title: "Legal Literacy & Rights Awareness Programme",
    desc: "Community awareness camps, rights education, consumer awareness, and guidance on government entitlements and available legal remedies.",
    href: "/programs/social-justice/legal-literacy-rights-awareness",
    icon: BookOpen,
    tag: "Awareness & Literacy",
  },
  {
    num: "02",
    abbr: "SJLA",
    title: "Social Justice Legal Action",
    desc: "Supporting or pursuing lawful legal action in genuine matters involving social injustice, rights violations, discrimination, or exploitation.",
    href: "/programs/social-justice/social-justice-legal-action",
    icon: Gavel,
    tag: "Remedy & Action",
  },
  {
    num: "03",
    abbr: "PISL",
    title: "Public Interest & Strategic Litigation",
    desc: "Exploring responsible judicial interventions on broader systemic issues affecting underserved communities and the public interest.",
    href: "/programs/social-justice/public-interest-strategic-litigation",
    icon: Scale,
    tag: "Systemic Reform",
  },
  {
    num: "04",
    abbr: "GAI",
    title: "Grievance & Accountability Initiative",
    desc: "Facilitating lawful grievance mechanisms, documentation, and responsible institutional engagement to ensure administrative accountability.",
    href: "/programs/social-justice/grievance-accountability",
    icon: Shield,
    tag: "Accountability & Redressal",
  },
];

const TARGET_COMMUNITIES = [
  "Rural and underserved communities lacking institutional support",
  "Women and adolescent girls facing discrimination or abuse",
  "Children and youth requiring protective legal safeguards",
  "Economically vulnerable families facing eviction or wage theft",
  "Persons with disabilities seeking dignity and accessibility",
  "Vulnerable workers in unorganized, hazardous, or seasonal sectors",
  "Communities facing social exclusion and institutional barriers",
  "Individuals unable to afford formal legal representation",
];

const IMPACT_OUTCOMES = [
  "Increased awareness of legal and constitutional rights and responsibilities",
  "Improved practical legal, civic and administrative literacy across villages",
  "Greater access to institutional grievance and justice mechanisms",
  "Better legal protection for vulnerable women, children and laborers",
  "Increased transparency, responsiveness and accountability in local institutions",
  "Greater citizen confidence in seeking lawful, constitutional remedies",
  "Targeted judicial interventions in genuine social justice matters",
  "Stronger, better-informed and resilient grassroots communities",
];

const AWARENESS_TO_JUSTICE_PATHWAY = [
  { step: "01", title: "KNOW", tag: "Rights • Responsibilities • Protections", desc: "Understanding basic constitutional and legal entitlements" },
  { step: "02", title: "UNDERSTAND", tag: "Law • Entitlements • Remedies", desc: "Deciphering administrative guidelines, rights and procedures" },
  { step: "03", title: "EMPOWER", tag: "Confidence • Participation • Action", desc: "Overcoming fear and building civic participation" },
  { step: "04", title: "ACCESS", tag: "Institutions • Legal Support", desc: "Reaching appropriate legal aid, authorities and counsel" },
  { step: "05", title: "PURSUE", tag: "Legal Action • Judicial Remedies", desc: "Seeking lawful remedies, representation and accountability" },
  { step: "06", title: "ADVANCE", tag: "Equality • Dignity • Social Justice", desc: "Sustaining long-term equality, equity and dignity" },
];

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">{label}</p>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{title}</h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && <p className="text-slate-600 max-w-3xl mx-auto text-sm leading-relaxed text-balance">{subtitle}</p>}
    </div>
  );
}

export default function SocialJusticeLanding() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Section with Subpage Carousel (Matching About Us Page) */}
      <SubpageHeroCarousel
        tag="WHAT WE DO • SECTOR 05"
        title="Social Justice & Legal Empowerment"
        subtitle="Creating Awareness. Pursuing Justice. Protecting Dignity. Combining constitutional literacy and lawful remedies to promote equality in vulnerable communities."
        breadcrumbs={[
          { label: "Our Programs", href: "/programs" },
          { label: "Social Justice & Legal Empowerment" },
        ]}
        images={[heroImg]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setModalRole("partner")}
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setModalRole("volunteer")}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer backdrop-blur-xs"
          >
            <Heart className="w-4 h-4 text-brand-orange" />
            <span>Volunteer as Legal Counsel</span>
          </button>
        </div>
      </SubpageHeroCarousel>

      {/* Overview & The Need */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Context &amp; Need
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Why Social Justice Requires More Than Awareness
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Social justice requires more than awareness. In many rural and underserved communities,
                    people face discrimination, exploitation, denial of rights and difficulty accessing appropriate
                    legal and institutional support.
                  </p>
                  <p>
                    Women, children, youth and vulnerable families may experience limited awareness of legal and
                    constitutional rights, social exclusion, denial of legitimate services, and vulnerability to exploitation.
                  </p>
                  <p>
                    ISLAH believes that people should know their rights and have access to appropriate pathways to justice.
                    Through its Social Justice, Rights &amp; Legal Empowerment initiatives, ISLAH seeks to combine rights
                    awareness, legal literacy, advocacy, institutional engagement and, where appropriate, lawful judicial
                    action to promote equality, accountability and dignity.
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
                      Empowering Rights &amp; Lawful Remedies
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To strengthen rights awareness, access to justice and social inclusion by empowering
                      vulnerable individuals and communities and, where legally appropriate, supporting access
                      to professional legal assistance and judicial remedies.
                    </p>
                    <div className="flex items-center gap-3 pt-2 text-xs font-bold text-brand-green">
                      <Scale className="w-4 h-4" />
                      <span>Constitutional Values • Accountability • Dignity</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Realities on the Ground"
              title="Challenges in Access to Justice"
              subtitle="Rural and vulnerable populations navigate complex systemic, economic, and institutional hurdles."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_CHALLENGES.map((ch, idx) => (
              <ScrollReveal key={ch.num} delay={idx * 0.05}>
                <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-brand-green/40 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-9 h-9 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-sm">
                        {ch.num}
                      </span>
                      <AlertCircle className="w-4 h-4 text-slate-300" />
                    </div>
                    <h3 className="font-bold text-base text-brand-green-dark mb-2">{ch.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ch.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200 text-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
              Our Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 leading-snug">
              Every Person Understood, Protected &amp; Empowered
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-6 text-balance">
              ISLAH envisions a society where every person can understand their rights, access appropriate
              justice mechanisms and live with dignity and equality. We believe that social justice becomes
              meaningful when awareness leads to empowerment, empowerment leads to lawful action, and lawful
              action contributes to lasting social change.
            </p>
            <div className="inline-block bg-orange-50 border border-orange-200 px-6 py-2.5 rounded-full text-brand-orange text-xs font-bold tracking-wider uppercase shadow-xs">
              “Know your rights. Seek justice. Protect dignity. Create change.” — ISLAH
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Approach (6 Pillars) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Strategic Framework"
              title="Our Approach"
              subtitle="A multifaceted approach combining education, legal support, institutional mediation and strategic judicial action."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROACH_PILLARS.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} delay={index * 0.05}>
                  <div className="bg-[#f9fbf9] rounded-xl border border-slate-200/70 p-6 hover:bg-white hover:shadow-md hover:border-brand-green/30 transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-lg bg-[#004724]/10 text-brand-green flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">{pillar.num}</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-2">{pillar.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Initiatives (4 Cards) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Programs &amp; Action Areas"
              title="Key Initiatives"
              subtitle="Explore the dedicated programmes driving rights literacy, grievance redressal and strategic legal assistance."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIATIVES.map((init, index) => {
              const IconComp = init.icon;
              return (
                <ScrollReveal key={init.num} delay={index * 0.06}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-lg hover:border-brand-green/40 transition-all flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-brand-orange">
                          {init.abbr} • 0{index + 1}
                        </span>
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                          {init.tag}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-brand-green-dark mb-2 leading-snug group-hover:text-brand-green transition-colors">
                        {init.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">{init.desc}</p>
                    </div>
                    <Link
                      to={init.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:text-brand-green-dark transition-colors pt-4 border-t border-slate-100"
                    >
                      <span>Explore Initiative</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Continuum Banner */}
          <div className="mt-8 bg-slate-50 border border-slate-200 p-6 rounded-xl text-center">
            <p className="text-xs uppercase font-bold tracking-widest text-brand-orange mb-1.5">
              Action Continuum
            </p>
            <p className="text-sm md:text-base font-semibold text-slate-800">
              Know Your Rights &nbsp;→&nbsp; Take Legal Action &nbsp;→&nbsp; Strategic Intervention &nbsp;→&nbsp; Accountability
            </p>
          </div>
        </div>
      </section>

      {/* From Awareness to Justice Pathway */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                Action Framework
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                From Awareness to Justice Pathway
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed text-balance">
                Meaningful social change requires connecting legal knowledge with real institutional access
                and lawful pursuit of remedies.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {AWARENESS_TO_JUSTICE_PATHWAY.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">PHASE {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{stage.title}</h3>
                    <p className="text-[11px] font-medium text-brand-orange mb-2">{stage.tag}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < AWARENESS_TO_JUSTICE_PATHWAY.length - 1 && (
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

      {/* Target Beneficiaries & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Constituencies
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
                  Measurable Change
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {IMPACT_OUTCOMES.map((outcome) => (
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

      {/* Statement & CTA */}
      <section className="py-16 bg-gradient-to-br from-[#071527] to-[#0c2340] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
              Core Conviction
            </span>
            <blockquote className="text-xl sm:text-2xl font-serif italic text-white/95 leading-relaxed max-w-2xl mx-auto mb-3 text-balance">
              “Know your rights. Seek justice. Protect dignity. Create change.”
            </blockquote>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-6">— ISLAH</p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 text-balance">
              Join us in strengthening access to legal literacy, defending fundamental human rights,
              and ensuring institutional accountability for rural and vulnerable citizens.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
              >
                Partner as Legal Institution
              </button>
              <button
                onClick={() => setModalRole("volunteer")}
                className="border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Join Legal Aid Panel
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer onOpenModal={(role) => setModalRole(role)} />

      <RoleFormModal
        type={modalRole}
        onClose={() => setModalRole(null)}
      />
    </div>
  );
}
