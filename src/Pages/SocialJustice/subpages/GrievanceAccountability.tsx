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
  Shield,
  Ear,
  FileText,
  Compass,
  Send,
  AlertOctagon,
  Eye,
  CheckCircle2,
  TrendingUp,
  Building,
  Scale,
  Users,
  MessageSquare,
  Landmark,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/contact-hands-hero.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_PILLARS = [
  {
    num: "01",
    icon: Ear,
    title: "Listen",
    desc: "Understanding genuine concerns, grievances and issues affecting individuals or communities.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Document",
    desc: "Encouraging appropriate documentation of facts, records, communications and relevant evidence.",
  },
  {
    num: "03",
    icon: Compass,
    title: "Guide",
    desc: "Helping people understand the appropriate authority, grievance mechanism and lawful process for raising their concerns.",
  },
  {
    num: "04",
    icon: Send,
    title: "Represent",
    desc: "Where appropriate, supporting individuals or communities in making representations before relevant authorities and institutions.",
  },
  {
    num: "05",
    icon: AlertOctagon,
    title: "Escalate",
    desc: "Where ordinary grievance mechanisms do not provide an appropriate resolution, exploring suitable statutory, legal or judicial remedies with qualified professionals.",
  },
  {
    num: "06",
    icon: Eye,
    title: "Monitor",
    desc: "Where feasible, following up on significant matters and identifying recurring issues requiring broader advocacy or intervention.",
  },
];

const INITIATIVE_AREAS = [
  {
    icon: MessageSquare,
    title: "Community Grievance Support",
    desc: "Helping rural communities understand and access appropriate statutory and administrative grievance-redressal mechanisms.",
  },
  {
    icon: Shield,
    title: "Rights & Entitlement Protection",
    desc: "Supporting awareness and appropriate action concerning delays, denial, or improper access to legitimate public services and entitlements.",
  },
  {
    icon: Landmark,
    title: "Institutional Accountability",
    desc: "Promoting transparency, responsiveness, and responsible functioning of administrative bodies and frontline service institutions.",
  },
  {
    icon: Building,
    title: "Public Service Grievance Awareness",
    desc: "Creating awareness about official portals, Right to Information (RTI) channels, and statutory grievance frameworks.",
  },
  {
    icon: Users,
    title: "Community Representation",
    desc: "Facilitating structured, written representations to relevant district authorities concerning genuine, collective civic issues.",
  },
  {
    icon: Scale,
    title: "Legal & Judicial Escalation",
    desc: "Where ordinary channels fail, facilitating professional legal assistance and pursuing suitable statutory remedies or writ petitions.",
  },
  {
    icon: Eye,
    title: "Public Interest Grievance Monitoring",
    desc: "Tracking recurring systemic complaints to inform broader community-level advocacy and public-interest interventions.",
  },
];

const TARGET_CITIZENS = [
  "Rural and underserved communities facing bureaucratic apathy",
  "Economically vulnerable families denied legitimate welfare benefits",
  "Women and children experiencing service delivery neglect",
  "Youth and vulnerable workers facing administrative delays",
  "Persons with disabilities encountering physical or procedural barriers",
  "Individuals navigating complex government procedures without guidance",
  "Communities experiencing continuous denial of water, roads, or schooling",
  "Collective community groups facing public-interest grievances",
];

const GRIEVANCE_TO_ACCOUNTABILITY = [
  { step: "01", label: "LISTEN", tag: "Concern • Community Issue", desc: "Patiently receiving and recording genuine community grievances" },
  { step: "02", label: "DOCUMENT", tag: "Facts • Evidence", desc: "Collecting official receipts, letters, notices, and verifiable proof" },
  { step: "03", label: "REPRESENT", tag: "Application • Redressal", desc: "Submitting formal representations before relevant designated officers" },
  { step: "04", label: "FOLLOW UP", tag: "Response • Review", desc: "Systematic tracking of timelines, tracking numbers, and compliance" },
  { step: "05", label: "ESCALATE", tag: "Statutory • Judicial Action", desc: "Approaching appellate authorities, ombudsmen, or courts if ignored" },
  { step: "06", label: "CHANGE", tag: "Justice • Responsiveness", desc: "Securing systemic administrative compliance and community relief" },
];

const IMPACT_POINTS = [
  "Increased citizen awareness of statutory grievance redressal channels",
  "Greater community confidence in raising genuine issues without fear",
  "Improved direct access to relevant administrative and local authorities",
  "Restoration and protection of delayed legitimate rights and entitlements",
  "Greater responsiveness, transparency, and accountability among public servants",
  "Stronger documentation, evidence-gathering, and written representation",
  "Timely legal, statutory, or judicial escalation where ordinary channels stall",
  "Enhanced community participation in local democratic governance",
  "Resilient, empowered communities capable of asserting their rights",
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

export default function GrievanceAccountability() {
  const [modalRole, setModalRole] = useState<"partner" | "volunteer" | "sponsor" | "mentor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-[#07162c] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Grievance & Accountability Initiative"
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
            <span className="text-brand-orange font-medium">Grievance &amp; Accountability</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              Initiative 04 • GAI
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Grievance &amp; Accountability Initiative
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
              Listen to Concerns. Strengthen Accountability. Promote Justice.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Empowering individuals and communities to understand grievance mechanisms, document genuine concerns,
              approach responsible institutions, and pursue lawful escalation for responsive governance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalRole("partner")}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Partner as Community Advocate
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRole("volunteer")}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Volunteer at Grievance Desks
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
                  Institutional Responsiveness
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6 leading-snug">
                  Every Genuine Grievance Deserves to be Heard
                </h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    A just society requires institutions that are responsive, transparent and accountable.
                    Yet, in many rural and underserved communities, people experience severe difficulties in
                    accessing public services, receiving legitimate entitlements or having their genuine concerns heard.
                  </p>
                  <p>
                    Citizens encounter unresolved grievances, denial or delay of benefits, lack of awareness
                    of administrative forums, language barriers, and hesitation in approaching authorities.
                  </p>
                  <p>
                    ISLAH believes that every genuine grievance deserves to be heard through an appropriate and lawful process.
                    Through this initiative, we help communities document facts, submit formal petitions, and escalate
                    unresolved matters for legal assistance or judicial intervention.
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
                      Strengthening Community Voice
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      To strengthen community voice, institutional accountability and access to grievance-redressal
                      mechanisms by helping vulnerable individuals and communities raise genuine concerns through
                      appropriate, lawful and evidence-based channels.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-green">
                      <Shield className="w-4 h-4" />
                      <span>Transparency • Due Process • Citizen Voice</span>
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
              label="Systemic Redressal"
              title="Our Approach"
              subtitle="A systematic pathway ensuring every complaint is verified, formally recorded, tracked, and lawfully escalated."
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

      {/* Program Focus Areas */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              label="Action Areas"
              title="Key Initiatives &amp; Mechanisms"
              subtitle="Bridging the gap between rural citizens and administrative grievance-redressal frameworks."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {INITIATIVE_AREAS.map((area, index) => {
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

      {/* From Grievance to Accountability Pathway */}
      <section className="py-20 bg-[#0b1f3b] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Redressal Framework
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                From Grievance to Accountability Pathway
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Transforming unheard concerns into informed action, informed action into accountability,
                and accountability into meaningful social change.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {GRIEVANCE_TO_ACCOUNTABILITY.map((stage, idx) => (
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
                  {idx < GRIEVANCE_TO_ACCOUNTABILITY.length - 1 && (
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

      {/* Target Citizens & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Target Beneficiaries */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Affected Citizens
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark mb-6">
                  Who We Seek to Support
                </h2>
                <div className="bg-[#f8faf8] border border-slate-200/80 rounded-xl p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {TARGET_CITIZENS.map((item) => (
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
                  Measurable Accountability
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

      {/* Vision & Statement */}
      <section className="py-20 bg-[#004724] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
              Our Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
              Every Genuine Concern Heard. Every Institution Accountable.
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto mb-10">
              ISLAH envisions communities where people can raise genuine concerns without fear, understand where
              to seek remedies and participate meaningfully in holding institutions accountable. When people are heard,
              institutions become more responsive and communities become stronger.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-2xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed mb-4">
                “Every genuine concern deserves to be heard. Every responsible institution should be accountable.”
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
            to="/programs/social-justice/public-interest-strategic-litigation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Public Interest &amp; Strategic Litigation (PISL)
          </Link>
          <Link
            to="/programs/social-justice"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Back to Social Justice &amp; Legal Empowerment
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
          title={`Support Grievance & Accountability Initiative`}
        />
      )}
    </div>
  );
}
