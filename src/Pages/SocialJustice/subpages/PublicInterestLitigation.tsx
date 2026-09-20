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
  Scale,
  Search,
  BookOpen,
  FileText,
  Gavel,
  Landmark,
  CheckCircle2,
  TrendingUp,
  Shield,
  Users,
  Heart,
  Globe,
  Sparkles,
  Building,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/contact-hands-hero.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Search,
    title: "Identify",
    desc: "Recognising significant social justice concerns that may have broader community or public implications.",
  },
  {
    num: "02",
    icon: BookOpen,
    title: "Research",
    desc: "Understanding the facts, evidence, affected communities, applicable legal framework and wider social impact.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Assess",
    desc: "Evaluating legal merit, standing, maintainability, appropriate forum and potential remedies with qualified legal professionals.",
  },
  {
    num: "04",
    icon: Scale,
    title: "Strategise",
    desc: "Developing a responsible legal approach focused on practical remedies and sustainable social impact.",
  },
  {
    num: "05",
    icon: Gavel,
    title: "Litigate",
    desc: "Where appropriate and legally permissible, pursuing or supporting suitable proceedings before competent courts or judicial forums through qualified advocates.",
  },
  {
    num: "06",
    icon: Landmark,
    title: "Create Impact",
    desc: "Using appropriate legal outcomes, advocacy and community engagement to encourage wider awareness, accountability and positive change.",
  },
];

const LITIGATION_DOMAINS = [
  {
    icon: Globe,
    title: "Public Interest Legal Action",
    desc: "Identifying and supporting suitable matters involving genuine issues of wider public or community interest.",
  },
  {
    icon: Shield,
    title: "Rights Protection Litigation",
    desc: "Supporting appropriate judicial action concerning serious, continuous, and significant violations of fundamental rights.",
  },
  {
    icon: Users,
    title: "Rural & Community Justice",
    desc: "Addressing systemic legal concerns affecting underserved rural populations, forest dwellers, and vulnerable agrarian clusters.",
  },
  {
    icon: Heart,
    title: "Women & Child Rights Litigation",
    desc: "Exploring appropriate judicial remedies concerning systemic issues affecting the safety, dignity, and rights of women and children.",
  },
  {
    icon: Scale,
    title: "Equality & Non-Discrimination",
    desc: "Supporting legal interventions against institutional exclusion, unequal welfare distribution, and systemic barriers.",
  },
  {
    icon: Building,
    title: "Access to Essential Services",
    desc: "Where legally appropriate, addressing broader challenges in access to rural schooling, drinking water, healthcare, and public welfare.",
  },
  {
    icon: Sparkles,
    title: "Strategic Litigation for Social Change",
    desc: "Carefully selecting matters where a judicial remedy may contribute to broader systemic improvements beyond an individual case.",
  },
];

const TARGET_POPULATIONS = [
  "Rural and underserved communities facing systemic deprivation",
  "Economically vulnerable groups excluded from welfare safety nets",
  "Women and children facing widespread rights infractions",
  "Youth and marginalized communities lacking institutional recourse",
  "Persons with disabilities facing infrastructure accessibility barriers",
  "Vulnerable workers confronting institutional negligence or safety hazards",
  "Communities affected by systemic, long-standing injustices",
  "Public matters involving critical issues of widespread community welfare",
];

const ISSUE_TO_IMPACT = [
  { step: "01", label: "IDENTIFY", tag: "Public Concern • Injustice", desc: "Recognize issues affecting wide community or public groups" },
  { step: "02", label: "RESEARCH", tag: "Facts • Evidence • Law", desc: "Comprehensive on-ground fact-finding and legal jurisprudence review" },
  { step: "03", label: "ASSESS", tag: "Merit • Standing • Remedy", desc: "Examining constitutional maintainability before High Courts / Supreme Court" },
  { step: "04", label: "ACT", tag: "Strategy • Representation", desc: "Drafting writ petitions and public-interest submissions through advocates" },
  { step: "05", label: "PURSUE", tag: "Justice • Accountability", desc: "Presenting rigorous evidentiary arguments to secure directive orders" },
  { step: "06", label: "IMPACT", tag: "Institutional Change", desc: "Leveraging judicial orders for policy compliance and lasting community benefit" },
];

const IMPACT_POINTS = [
  "Greater constitutional protection of fundamental rights and human dignity",
  "Improved access to higher judiciary and constitutional forums for rural citizens",
  "Greater transparency, responsiveness, and accountability in administrative bodies",
  "Systemic protection of vulnerable, underrepresented communities",
  "Increased public and institutional awareness on vital social justice questions",
  "Meaningful judicial directives establishing binding legal protections",
  "Constructive changes in policies, statutory enforcement, or institutional processes",
  "Stronger social inclusion, equality, and civic participation",
  "Long-term, sustainable positive social impact across wider populations",
];

// ─── Shared Components ────────────────────────────────────────────────────────

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

export default function PublicInterestLitigation() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-[#07162c] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Public Interest Litigation & Advocacy"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link to="/programs/social-justice" className="hover:text-white transition-colors">
              Social Justice &amp; Legal Empowerment
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Public Interest &amp; Strategic Litigation</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 03 • PISL
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Public Interest &amp; Strategic Litigation
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Using the Law for Public Good. Creating Change Beyond One Case.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Identifying, supporting, and pursuing carefully considered public-interest legal interventions
              before competent judicial forums to address systemic injustices, protect fundamental rights, and advance public welfare.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Collaborate on Strategic Matters
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Support Research &amp; Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Objective */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Systemic Impact
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  The Law as an Instrument for Public Good
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Some social justice issues affect not only individuals but entire communities or sections of society.
                    When such concerns cannot be adequately addressed through awareness, representation or administrative
                    mechanisms, appropriate judicial intervention may help protect rights and promote wider social change.
                  </p>
                  <p>
                    Rural and underserved communities frequently encounter systemic discrimination, denial of basic amenities,
                    barriers to education, environmental degradation, and a lack of institutional responsiveness.
                  </p>
                  <p>
                    ISLAH believes that law can be an important instrument for positive social change. The purpose is not
                    litigation for its own sake, but responsible legal action directed towards meaningful and sustainable social impact.
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
                      Broader Social &amp; Community Relief
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To use appropriate legal and judicial mechanisms to address significant issues affecting
                      vulnerable individuals, communities or the wider public, while promoting rights, equality,
                      accountability and social justice.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Scale className="w-4 h-4" />
                      <span>Public Good • Institutional Accountability • Precedent</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (6 Strategic Phases) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Rigorous Methodology"
              title="Our Approach"
              subtitle="From community fact-finding and jurisprudential analysis to responsible, evidence-led judicial action."
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

      {/* Focus Sectors & Strategic Litigation */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Intervention Areas"
              title="Key Focus Areas"
              subtitle="Where strategic legal action can catalyze widespread administrative compliance and protect community interests."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {LITIGATION_DOMAINS.map((domain, index) => {
              const IconComp = domain.icon;
              return (
                <ScrollReveal key={domain.title} delay={index * 0.04}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{domain.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{domain.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* From Issue to Social Impact Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Precedent &amp; Reform
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                From Issue to Social Impact Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Strategic litigation builds positive precedents, transforms policy execution,
                and brings enduring protection to entire community segments.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {ISSUE_TO_IMPACT.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">PHASE {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < ISSUE_TO_IMPACT.length - 1 && (
                    <div className="hidden lg:flex justify-end pt-3">
                      <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Beneficiary Communities
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_POPULATIONS.map((item) => (
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
                  Lasting Transformation
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Expected Impact
                </h2>
                <div className="bg-[#fbfcfb] border border-brand-green/20 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {IMPACT_POINTS.map((outcome) => (
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
      <section className="py-20 bg-[#004724] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Our Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Creating Change Beyond Individual Disputes
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH envisions a society where the law can serve as a meaningful pathway for protecting rights,
              strengthening accountability and advancing social justice. Carefully considered public-interest
              litigation helps address systemic issues and contributes to lasting, positive change for communities.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Using the law for public good—protecting rights, strengthening accountability and creating lasting social change.”
              </blockquote>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">— ISLAH</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Subpage Navigation */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/programs/social-justice/social-justice-legal-action"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Social Justice Legal Action (SJLA)
          </Link>
          <Link
            to="/programs/social-justice/grievance-accountability"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Grievance &amp; Accountability Initiative (GAI)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />

      {modalRole && (
        <RoleFormModal
          isOpen={true}
          role={modalRole}
          onClose={() => setModalRole(null)}
          title={`Support Public Interest & Strategic Litigation`}
        />
      )}
    </div>
  );
}
