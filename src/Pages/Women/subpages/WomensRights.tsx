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
  ShieldAlert,
  Users,
  BookOpen,
  Heart,
  Megaphone,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Compass,
  Sparkles,
  PhoneCall,
  Lock,
} from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-women.jpg";
import causeWomenImg from "@/assets/cause-women.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPROACH_AREAS = [
  {
    num: "01",
    icon: Scale,
    title: "Rights & Legal Awareness",
    desc: "Creating accessible awareness of basic rights, entitlements and legal protections relevant to women and girls.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Gender Equality & Social Awareness",
    desc: "Encouraging positive attitudes towards equal opportunities, dignity, respect and participation of women and girls.",
  },
  {
    num: "03",
    icon: ShieldAlert,
    title: "Awareness on Safety & Protection",
    desc: "Promoting awareness about violence, harassment, exploitation and available avenues for seeking appropriate help and support.",
  },
  {
    num: "04",
    icon: BookOpen,
    title: "Education & Empowerment",
    desc: "Encouraging women and girls to understand the importance of education, confidence, informed decision-making and participation in community life.",
  },
  {
    num: "05",
    icon: Users,
    title: "Community Dialogue",
    desc: "Engaging families, community members, youth and local stakeholders in constructive conversations around dignity, equality, respect and shared responsibility.",
  },
  {
    num: "06",
    icon: PhoneCall,
    title: "Access to Information & Referral",
    desc: "Where appropriate, helping individuals become aware of relevant government services, legal-aid mechanisms and support institutions, with referrals to qualified or authorised service providers where required.",
  },
];

const TARGET_REACH = [
  "Rural women and adolescent girls in underserved villages",
  "Adolescent girls navigating educational transitions and rights",
  "Women from economically vulnerable, marginalized households",
  "Families, village elders, and male allies for shared mindset transformation",
  "Youth groups, student leaders, and community peer educators",
  "Local community-based groups and grassroots village committees",
];

const AWARENESS_PATHWAY = [
  { step: "01", label: "INFORM", desc: "Accessible awareness of constitutional and legal rights" },
  { step: "02", label: "UNDERSTAND", desc: "Grasping entitlements, safety laws & family rights" },
  { step: "03", label: "SPEAK", desc: "Finding voice against discrimination & coercion" },
  { step: "04", label: "PARTICIPATE", desc: "Active role in family & community decisions" },
  { step: "05", label: "EMPOWER", desc: "Living with equality, safety, and full human dignity" },
];

const IMPACT_OUTCOMES = [
  "Greater awareness of women’s rights and legal protections",
  "Increased confidence to seek information and appropriate institutional support",
  "Greater understanding of gender equality across rural communities",
  "More positive community attitudes towards women and girls",
  "Increased participation of women in household and community decision-making",
  "Stronger awareness of available government support and referral mechanisms",
  "Greater dignity, inclusion and equal social participation",
];

// ─── Shared SectionTitle ──────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function WomensRights() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[440px] flex items-center overflow-hidden bg-slate-900">
          <img
            src={heroImg}
            alt="Women’s Rights & Gender Equality Awareness"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/women-empowerment" className="hover:text-white transition-colors">
                Women &amp; Youth Empowerment
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">Women’s Rights &amp; Gender Equality</span>
            </nav>

            <Link
              to="/programs/women-empowerment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded transition-all mb-6 hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Women &amp; Youth Initiatives
            </Link>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-5">
              <Scale className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                Initiative 03 • WRGE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-3xl">
              Women’s Rights &amp;<br />
              <span className="text-brand-orange">Gender Equality Awareness</span>
            </h1>

            <p className="text-lg text-white/90 font-medium mb-3">
              Know Your Rights. Strengthen Your Voice. Build a More Equal Future.
            </p>

            <p className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed italic">
              "Equality begins with awareness, grows through participation and becomes meaningful when every woman can live with dignity."
            </p>
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Overview" title="Awareness, Dignity &amp; Equal Participation" />
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-green/20 shadow-sm relative overflow-hidden text-white">
                    <div className="absolute -top-4 -right-4 text-white/10 select-none pointer-events-none">
                      <Scale className="w-32 h-32" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider mb-4">
                      <span>🌿</span> Constitutional &amp; Human Rights
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-white text-sm font-semibold leading-relaxed border-l-3 border-white/60 pl-3">
                        The Women’s Rights &amp; Gender Equality Awareness Initiative is an ISLAH programme focused on creating awareness about women’s rights, dignity, equality, safety and meaningful participation in family and community life.
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-3 border-brand-orange/60">
                        In many rural and underserved communities, women may have limited awareness of their legal and social rights or face barriers to education, decision-making, economic participation and access to support systems.
                      </p>
                      <p className="text-white/90 text-sm font-semibold leading-relaxed pl-3 border-l-3 border-white/40">
                        ISLAH seeks to address these gaps through rights awareness, community dialogue, education and appropriate referral support.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5">
                <ScrollReveal delay={0.1}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-brand-green to-brand-orange rounded-2xl opacity-15 blur-sm group-hover:opacity-25 transition-opacity duration-300" />
                    <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
                      <img
                        src={causeWomenImg}
                        alt="Community dialogue"
                        className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-semibold">
                          Community Dialogue &amp; Rights Awareness
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR APPROACH (6 AREAS) ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Programme Approach"
                title="6 Pillars of Rights &amp; Equality Action"
                subtitle="A balanced approach combining rights education, safety awareness, constructive community dialogue, and legal referral linkages."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {APPROACH_AREAS.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div
                      key={area.num}
                      className="group bg-[#0b1f3b] hover:bg-white rounded-xl p-6 border border-brand-green/10 hover:border-brand-green/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      <span className="absolute top-2 right-4 text-5xl font-extrabold text-white/5 select-none group-hover:text-brand-green/5 transition-colors">
                        {area.num}
                      </span>
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-lg bg-white/10 group-hover:bg-brand-green/10 flex items-center justify-center mb-4 transition-colors">
                          <Icon className="w-5 h-5 text-white group-hover:text-brand-green transition-colors" />
                        </div>
                        <h3 className="font-bold text-base text-white group-hover:text-brand-green-dark mb-2 transition-colors">
                          {area.num}. {area.title}
                        </h3>
                        <p className="text-xs text-slate-200 group-hover:text-slate-600 leading-relaxed transition-colors">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── WHO WE AIM TO REACH ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Target Outreach" title="Who We Aim to Reach" />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {TARGET_REACH.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-brand-green/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── COMMUNITY AWARENESS PATHWAY ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                label="Awareness Progression"
                title="Our Community Awareness Pathway"
                subtitle="We believe that awareness is the first step towards meaningful empowerment. When women understand their rights and communities understand their responsibilities, equality becomes a shared commitment rather than an individual struggle."
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.08}>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-10">
                {AWARENESS_PATHWAY.map((p, i) => (
                  <div
                    key={i}
                    className="bg-[#0b1f3b] text-white rounded-xl p-4 text-center border border-brand-green/20 relative group hover:border-brand-orange transition-all"
                  >
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
                      Step {p.step}
                    </span>
                    <p className="text-sm md:text-base font-extrabold text-white tracking-wide mb-1">
                      {p.label}
                    </p>
                    <p className="text-[10px] text-slate-300 leading-tight">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── EXPECTED IMPACT ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle label="Impact" title="Expected Impact" />
            </ScrollReveal>

            <ScrollReveal stagger={0.06}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {IMPACT_OUTCOMES.map((impact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80 shadow-sm hover:border-brand-green/30 hover:shadow-md transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-800 leading-relaxed">
                      {impact}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Vision Quote Banner */}
            <ScrollReveal delay={0.15}>
              <div className="mt-12 bg-brand-green-darker rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden shadow-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
                  <span>⚖️</span> Our Vision
                </div>
                <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-4 leading-relaxed">
                  To contribute towards rural communities where women and girls are informed, respected, safe, heard and able to participate equally in shaping their families, livelihoods and communities.
                </p>
                <blockquote className="text-lg md:text-xl font-bold italic text-white max-w-2xl mx-auto leading-relaxed pt-3 border-t border-white/10">
                  "Equality begins with awareness, grows through participation and becomes meaningful when every woman can live with dignity."
                </blockquote>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-brand-orange/60" />
                  <span className="text-brand-orange font-semibold text-xs tracking-wide uppercase">
                    Islah Welfare Foundation
                  </span>
                  <span className="h-px w-8 bg-brand-orange/60" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── BACK / NEXT NAV ── */}
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/programs/women-empowerment/self-help-groups"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Prev: Self-Help Groups (SHG)
            </Link>
            <Link
              to="/programs/women-empowerment/youth-career-entrepreneurship"
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:translate-x-0.5"
            >
              Next: Youth Career &amp; Entrepreneurship (YCED)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
