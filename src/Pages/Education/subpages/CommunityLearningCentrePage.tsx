import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Building,
  Heart,
  BookOpen,
  CheckCircle2,
  Users,
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  Globe,
  Smile,
  Compass,
} from "lucide-react";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
  RoleFormModal,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import causeEduImg from "@/assets/cause-education.jpg";
import heroImg from "@/assets/sector_education_1.png";

export default function CommunityLearningCentrePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── Breadcrumb ──────────────────────────────────────────────────────── */}
        <div className="bg-slate-50 border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
              <Link to="/" className="hover:text-slate-900 flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link to="/programs" className="hover:text-slate-900">What We Do</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link to="/programs/education" className="hover:text-slate-900">Education &amp; Learning</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-900 font-bold">Community Learning Centre (CLC)</span>
            </nav>
          </div>
        </div>

        {/* ─── Hero Section ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#00381e] via-[#005a30] to-[#014725] text-white py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Link
                  to="/programs/education"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white transition mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Education &amp; Learning
                </Link>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                  COMMUNITY LEARNING <br />
                  <span className="text-emerald-300">CENTRE (CLC)</span>
                </h1>

                <div className="inline-block px-3.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-emerald-300 font-extrabold text-xs sm:text-sm tracking-wide">
                  Building Character, Knowledge &amp; Community Harmony
                </div>

                <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
                  A dedicated space for moral development, community learning, and inclusive value-based education for rural youth. Nurturing minds, values, and social cohesion beyond the traditional classroom.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal("sponsor")}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Support This Initiative</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal("partner")}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl backdrop-blur-md transition"
                  >
                    <Building className="w-4 h-4 text-emerald-300" />
                    <span>Donate for CLC Centre</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-white/5">
                  <img
                    src={heroImg}
                    alt="Community &amp; Islamic Learning Centre"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="p-4 bg-slate-900/90 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                      COMMUNITY LEARNING CENTRE
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Knowledge • Values • Community Development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Highlights Bar ──────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Value-Based Education", desc: "Promoting moral values and ethics", icon: BookOpen },
                { title: "Community Learning", desc: "Building knowledge and life skills", icon: Users },
                { title: "Youth Development", desc: "Nurturing confident, responsible youth", icon: Award },
                { title: "Social Harmony", desc: "Encouraging respect, compassion and unity", icon: Heart },
              ].map((pill) => {
                const IconC = pill.icon;
                return (
                  <div key={pill.title} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center shrink-0">
                      <IconC className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{pill.title}</h4>
                      <p className="text-[11px] text-slate-500">{pill.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Need vs Approach ────────────────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Need */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                      NEED FOR A COMMUNITY LEARNING CENTRE
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Rural areas in India are not only facing challenges in access to quality formal education but also a growing gap in moral, ethical, and value-based learning. While schools focus primarily on academic curriculum, there is limited structured space for character building, community learning, and value education.
                </p>

                <p className="text-xs font-bold text-slate-800">
                  In many villages, children and adolescents lack guidance in:
                </p>

                <div className="space-y-2 text-xs text-slate-700">
                  {[
                    "Discipline, social responsibility, and cultural values",
                    "Ethical behaviour essential for building a balanced society",
                    "Basic inclusive Islamic education aligned with modern understanding",
                    "Compassion, respect, and community harmony",
                  ].map((nd) => (
                    <div key={nd} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{nd}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-600 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                  Recognising this gap, ISLAH proposes to establish dedicated Community Learning Centres as separate units, complementing but independent from formal schooling.
                </p>
              </div>

              {/* Project Objective & Commitment */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                    PROJECT OBJECTIVE
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                    To create a community-based learning space that promotes moral values, ethical development, basic Islamic education, and social awareness, especially among children and youth in rural areas.
                  </h3>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      “To nurture minds, strengthen values and empower communities through knowledge, character and collective growth.”
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#15803d]">
                    OUR COMMITMENT
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    CLC ensures education works hand in hand with cultural grounding. By combining moral instruction with civic responsibility, we help children grow into empathetic, ethical, and proactive citizens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Project Approach (4 Pillars) ────────────────────────────────────── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                PROJECT APPROACH
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Four Pillars of Community Transformation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  num: "1",
                  title: "Value-Based Education",
                  items: [
                    "Basic understanding of community & moral values",
                    "Focus on ethics, discipline, honesty, and compassion",
                    "Age-appropriate and inclusive learning approach",
                  ],
                  color: "#15803d",
                },
                {
                  num: "2",
                  title: "Community Learning & Life Skills",
                  items: [
                    "Sessions on life skills, personality & leadership",
                    "Guidance on social responsibility & community engagement",
                    "Promotion of peaceful coexistence & mutual respect",
                  ],
                  color: "#ea580c",
                },
                {
                  num: "3",
                  title: "Youth & Child Development",
                  items: [
                    "Structured learning activities for children & youth",
                    "Focus on character building & confidence",
                    "Safe, positive environment for learning & interaction",
                  ],
                  color: "#2563eb",
                },
                {
                  num: "4",
                  title: "Community Engagement & Awareness",
                  items: [
                    "Regular community sessions and discussions",
                    "Involvement of parents, elders, and local leaders",
                    "Strengthening community bonding & social cohesion",
                  ],
                  color: "#7c3aed",
                },
              ].map((pil) => (
                <div key={pil.num} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div
                    className="w-8 h-8 rounded-full text-white font-black text-xs flex items-center justify-center"
                    style={{ backgroundColor: pil.color }}
                  >
                    {pil.num}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{pil.title}</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pil.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Plan, Impact & Future Vision ────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Plan */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#15803d]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>IMPLEMENTATION PLAN</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  {[
                    "Establishment of dedicated learning centres in rural areas",
                    "Engagement of trained educators & community facilitators",
                    "Development of structured curriculum & activity-based sessions",
                    "Collaboration with local communities and stakeholders",
                    "Regular monitoring and impact assessment",
                  ].map((s) => (
                    <div key={s} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700">
                  <TrendingUp className="w-4 h-4" />
                  <span>EXPECTED IMPACT</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  {[
                    "Strengthened moral and ethical values among youth",
                    "Improved community harmony and social responsibility",
                    "Development of confident, disciplined individuals",
                    "Enhanced community participation and engagement",
                    "Creation of a value-driven and socially aware society",
                  ].map((s) => (
                    <div key={s} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700">
                  <Globe className="w-4 h-4" />
                  <span>FUTURE VISION</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  IWF aims to scale this model across multiple rural areas, creating a network of Community Learning Centres that promote:
                </p>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Holistic development (values + life skills)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Strong community foundations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Positive youth engagement &amp; leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Bottom Quote & CTAs ─────────────────────────────────────────────── */}
        <section className="py-14 bg-emerald-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <blockquote className="text-lg sm:text-xl font-black text-white leading-snug">
                  “Nurturing minds and building character — empowering rural communities through education, values, and collective growth.”
                </blockquote>
                <p className="text-xs text-emerald-300">
                  Help us build community learning centres that shape better tomorrows.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal("sponsor")}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support This Initiative</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal("partner")}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition"
                >
                  <Building className="w-4 h-4" />
                  <span>Donate for CLC Centre</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
