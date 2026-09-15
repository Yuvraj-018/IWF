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
  Gavel,
  Scale,
  Search,
  FileCheck,
  Shield,
  Users,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Building,
  Heart,
  Landmark,
  Eye,
  HandMetal,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/contact-hands-hero.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Search,
    title: "Identify",
    desc: "Identifying genuine and significant social justice concerns affecting individuals, communities or vulnerable groups.",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "Assess",
    desc: "Understanding the facts, available evidence, legal issues, appropriate forum and possible remedies with qualified legal professionals.",
  },
  {
    num: "03",
    icon: HandMetal,
    title: "Advise",
    desc: "Providing appropriate legal guidance and explaining available administrative, statutory and judicial pathways.",
  },
  {
    num: "04",
    icon: Shield,
    title: "Intervene",
    desc: "Where appropriate, making representations before relevant authorities or initiating suitable legal proceedings.",
  },
  {
    num: "05",
    icon: Gavel,
    title: "Pursue",
    desc: "Supporting appropriate matters before competent courts, tribunals or other authorised forums through qualified advocates.",
  },
  {
    num: "06",
    icon: Eye,
    title: "Follow Up",
    desc: "Monitoring supported matters, where feasible, and continuing appropriate community and institutional engagement.",
  },
];

const ACTION_AREAS = [
  {
    icon: AlertTriangle,
    title: "Rights Violation Legal Action",
    desc: "Supporting appropriate legal remedies in genuine cases involving serious violations of rights or lawful entitlements.",
  },
  {
    icon: Scale,
    title: "Discrimination & Social Justice Action",
    desc: "Addressing appropriate legal concerns involving social discrimination, exclusion, systemic inequality or unfair practices.",
  },
  {
    icon: Heart,
    title: "Women & Child Justice Action",
    desc: "Facilitating legal intervention in matters concerning the protection, physical safety, custody, and fundamental rights of women and children.",
  },
  {
    icon: Users,
    title: "Community Rights Protection",
    desc: "Supporting suitable legal action concerning issues affecting vulnerable rural communities, land displacement, and common resources.",
  },
  {
    icon: Landmark,
    title: "Public Interest Legal Action",
    desc: "Where legally maintainable, pursuing or supporting matters before tribunals or higher courts involving wider public or community interest.",
  },
  {
    icon: TrendingUp,
    title: "Strategic Litigation",
    desc: "Exploring carefully selected legal matters that may establish progressive precedents and contribute to positive social change.",
  },
  {
    icon: Building,
    title: "Legal & Institutional Representation",
    desc: "Working with certified advocates and legal-aid bodies to pursue lawful remedies before statutory authorities and judicial forums.",
  },
];

const TARGET_CONSTITUENCIES = [
  "Rural and underserved communities lacking financial resources for litigation",
  "Economically vulnerable families facing eviction, fraud, or exploitation",
  "Women and girls facing gender violence, dowry harassment, or denial of rights",
  "Children and youth facing trafficking, abuse, or denial of education",
  "Persons with disabilities denied statutory accessibility or employment",
  "Vulnerable daily-wage, bonded, or migrant workers facing wage theft",
  "Individuals facing serious, systemic human rights violations",
  "Communities affected by discrimination, displacement, or exclusion",
  "Genuine public matters requiring lawful court interventions",
];

const INJUSTICE_TO_JUSTICE = [
  { step: "01", label: "IDENTIFY", tag: "Injustice • Rights Violation", desc: "Recognize acute social injustice or denial of constitutional protection" },
  { step: "02", label: "ASSESS", tag: "Facts • Evidence • Merit", desc: "Rigorous evidentiary scrutiny and standing assessment by legal counsel" },
  { step: "03", label: "PLAN", tag: "Remedy • Appropriate Forum", desc: "Selecting administrative, statutory tribunal or judicial filing" },
  { step: "04", label: "ACT", tag: "Representation • Proceedings", desc: "Filing formal petitions, rejoinders, and evidence through advocates" },
  { step: "05", label: "PURSUE", tag: "Protection • Accountability", desc: "Diligent representation during hearings until lawful relief is secured" },
  { step: "06", label: "CHANGE", tag: "Justice • Equality • Dignity", desc: "Enforcing judgments to establish lasting community protection" },
];

const IMPACT_POINTS = [
  "Greater access to competent, dignified legal representation and remedies",
  "Rigorous protection of legitimate constitutional and statutory entitlements",
  "Increased accountability for unlawful, fraudulent, or oppressive practices",
  "Better safeguarding of vulnerable women, children, and unorganized workers",
  "Strengthened public faith in lawful judicial and constitutional mechanisms",
  "Timely judicial intervention in genuine, verified social justice matters",
  "Advancement of equality, dignity, and fair treatment under the law",
  "Positive and sustainable social impact extending beyond individual relief",
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

export default function SocialJusticeLegalAction() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-[#07162c] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Social Justice Legal Action"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link to="/programs/social-justice" className="hover:text-white transition-colors">
              Social Justice &amp; Legal Empowerment
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-brand-orange font-medium">Social Justice Legal Action</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 02 • SJLA
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Social Justice Legal Action
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              From Injustice to Action. From Action to Justice.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Enabling lawful legal intervention, evidentiary support, and access to judicial remedies
              for genuine rights violations, discrimination, and exploitation affecting vulnerable communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Collaborate as Pro-Bono Counsel
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("sponsor")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Support Legal Aid Fund
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
                  When Action is Imperative
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Moving from Awareness to Lawful Remedy
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Social justice sometimes requires more than awareness, counselling or community advocacy.
                    When genuine rights violations, discrimination, exploitation or serious social injustices occur,
                    lawful legal action may be necessary to seek protection, remedy and accountability.
                  </p>
                  <p>
                    Many vulnerable individuals struggle to pursue justice due to lack of awareness of legal remedies,
                    financial barriers, limited access to qualified advocates, fear of authorities, or denial of rights.
                  </p>
                  <p>
                    ISLAH believes that justice must not stop at awareness when appropriate legal remedies are available.
                    All legal action will be undertaken through appropriate legal processes and with the involvement
                    of qualified legal professionals, based on facts, evidence and the merits of each matter.
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
                      Lawful Intervention &amp; Judicial Remedies
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To promote social justice by enabling lawful legal intervention and access to judicial remedies
                      for genuine rights violations and social justice concerns, particularly those affecting vulnerable
                      and underserved communities.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Gavel className="w-4 h-4" />
                      <span>Evidence-Based • Professional Representation • Accountability</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (6 Steps) */}
      <section className="py-20 bg-[#fbfdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Rigorous Legal Procedure"
              title="Our Approach"
              subtitle="A structured, professional process ensuring every legal intervention is fact-based, merit-tested, and professionally conducted."
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

      {/* Action Areas & Key Initiatives */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Practice Domains"
              title="Key Initiatives &amp; Action Areas"
              subtitle="Pursuing lawful remedies across critical sectors where vulnerable communities require steadfast legal backing."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ACTION_AREAS.map((area, index) => {
              const IconComp = area.icon;
              return (
                <ScrollReveal key={area.title} delay={index * 0.04}>
                  <div className="bg-[#f9fbf9] border border-slate-200/70 rounded-lg p-5 hover:bg-white hover:border-brand-green/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{area.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{area.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* From Injustice to Justice Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Legal Continuum
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                From Injustice to Justice Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Legal intervention is not pursued simply for litigation, but to protect rights,
                remedy acute wrongs, and establish meaningful accountability.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {INJUSTICE_TO_JUSTICE.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-brand-orange">STEP {stage.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{stage.label}</h3>
                    <p className="text-[11px] font-medium text-brand-orange/90 mb-2">{stage.tag}</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{stage.desc}</p>
                  </div>
                  {idx < INJUSTICE_TO_JUSTICE.length - 1 && (
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

      {/* Target Beneficiaries & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Affected Groups
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_CONSTITUENCIES.map((item) => (
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
                  Anticipated Impact
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
              Challenging Injustice Through Responsible Justice Mechanisms
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH envisions a society where genuine social injustice can be challenged through lawful,
              responsible and accessible justice mechanisms. When appropriate, legal action becomes a means of
              protecting rights, seeking remedies, strengthening accountability and creating meaningful social change.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “When injustice demands action, we stand for lawful remedies, human dignity and social justice.”
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
            to="/programs/social-justice/legal-literacy-rights-awareness"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Legal Literacy &amp; Rights Awareness (LLRA)
          </Link>
          <Link
            to="/programs/social-justice/public-interest-strategic-litigation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Next: Public Interest &amp; Strategic Litigation (PISL)
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
          title={`Support Social Justice Legal Action`}
        />
      )}
    </div>
  );
}
