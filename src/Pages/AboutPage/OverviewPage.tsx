import { useState } from "react";
import {
  GraduationCap,
  HeartPulse,
  Users,
  Briefcase,
  Scale,
  Sprout,
  Leaf,
  Megaphone,
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
  Compass,
  CheckCircle2,
  Layers,
  Heart,
  Lightbulb,
  Handshake,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

import overviewHero from "@/assets/overview-hero.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";

export default function OverviewPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [activeTab, setActiveTab] = useState<"I" | "S" | "L" | "A" | "H">("I");

  const standsFor = [
    {
      letter: "I",
      word: "Integrated",
      tagline: "Interconnected Social Development",
      desc: "We connect different dimensions of development rather than treating social challenges separately. Education, health, livelihood and infrastructure work synergistically.",
      color: "from-blue-600 to-indigo-700",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Layers,
    },
    {
      letter: "S",
      word: "Social",
      tagline: "Inclusion, Dignity & Equality",
      desc: "We work towards inclusion, human dignity, social equality, primary education, healthcare access, community participation, and holistic social well-being.",
      color: "from-emerald-600 to-teal-700",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Users,
    },
    {
      letter: "L",
      word: "Livelihood",
      tagline: "Economic Independence & Skills",
      desc: "We support market-aligned vocational skills, modern agriculture, micro-entrepreneurship, women Self-Help Groups, and sustainable income opportunities.",
      color: "from-amber-600 to-orange-700",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Briefcase,
    },
    {
      letter: "A",
      word: "Advancement",
      tagline: "Innovation, Tech & Progress",
      desc: "We promote digital learning, modern technology, grassroots leadership, environmental sustainability, and progressive opportunities for rural advancement.",
      color: "from-purple-600 to-violet-700",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      icon: TrendingUp,
    },
    {
      letter: "H",
      word: "Humanitarian Action",
      tagline: "Emergency Relief & Care",
      desc: "We respond swiftly to critical emergencies and support vulnerable individuals and communities through relief, rehabilitation, and life-saving assistance.",
      color: "from-rose-600 to-red-700",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      icon: Heart,
    },
  ];

  const areasOfWork = [
    {
      icon: GraduationCap,
      emoji: "🎓",
      title: "Education & Learning",
      desc: "Creating opportunities for children, students, youth and adults through education, digital learning, scholarships, mentoring and career guidance.",
      link: "/programs/education",
      color: "border-blue-200 hover:border-blue-400 bg-blue-50/40",
      iconBg: "bg-blue-600 text-white",
    },
    {
      icon: HeartPulse,
      emoji: "❤️",
      title: "Healthcare & Well-being",
      desc: "Promoting accessible healthcare, preventive awareness, medical assistance, maternal and child health, nutrition and emergency support.",
      link: "/programs/healthcare",
      color: "border-rose-200 hover:border-rose-400 bg-rose-50/40",
      iconBg: "bg-rose-600 text-white",
    },
    {
      icon: Users,
      emoji: "👩",
      title: "Women & Youth Empowerment",
      desc: "Creating opportunities for women and young people to develop skills, confidence, leadership and economic independence.",
      link: "/programs/women-empowerment",
      color: "border-pink-200 hover:border-pink-400 bg-pink-50/40",
      iconBg: "bg-pink-600 text-white",
    },
    {
      icon: Briefcase,
      emoji: "💼",
      title: "Skills & Livelihoods",
      desc: "Supporting employability, vocational skills, entrepreneurship, livelihoods and sustainable income generation.",
      link: "/programs/skills-development",
      color: "border-amber-200 hover:border-amber-400 bg-amber-50/40",
      iconBg: "bg-amber-600 text-white",
    },
    {
      icon: Scale,
      emoji: "⚖️",
      title: "Social Justice & Legal Empowerment",
      desc: "Promoting awareness of rights and facilitating appropriate access to legal support and institutional entitlements.",
      link: "/policies",
      color: "border-indigo-200 hover:border-indigo-400 bg-indigo-50/40",
      iconBg: "bg-indigo-600 text-white",
    },
    {
      icon: Sprout,
      emoji: "🌾",
      title: "Agriculture & Rural Livelihoods",
      desc: "Supporting farmers, modern agrarian knowledge, soil health, water access, and resilient rural economies.",
      link: "/programs/agriculture",
      color: "border-emerald-200 hover:border-emerald-400 bg-emerald-50/40",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      icon: Leaf,
      emoji: "🌱",
      title: "Environment & Sustainable Development",
      desc: "Promoting environmental awareness, tree plantation, sustainable agriculture, water conservation, waste management and greener communities.",
      link: "/programs/environment",
      color: "border-teal-200 hover:border-teal-400 bg-teal-50/40",
      iconBg: "bg-teal-600 text-white",
    },
    {
      icon: Megaphone,
      emoji: "🤝",
      title: "Humanitarian Relief & Rehabilitation",
      desc: "Supporting vulnerable people and communities during difficult circumstances, natural calamities, and emergency crises.",
      link: "/programs/relief-and-rehabilitation",
      color: "border-orange-200 hover:border-orange-400 bg-orange-50/40",
      iconBg: "bg-orange-600 text-white",
    },
  ];

  const progressionSteps = [
    { num: "01", step: "Relief", desc: "responds to an immediate critical need." },
    { num: "02", step: "Education", desc: "creates foundational opportunity." },
    { num: "03", step: "Skills", desc: "creates viable, dignified livelihood." },
    { num: "04", step: "Livelihood", desc: "creates economic resilience." },
    { num: "05", step: "Community Participation", desc: "creates local ownership." },
    { num: "06", step: "Ownership", desc: "creates lasting, sustainable change." },
  ];

  const vision2047Pillars = [
    "Every child has meaningful opportunities to learn, grow and realise their potential.",
    "Young people possess the skills, confidence and opportunities to participate in India's evolving economy.",
    "Women are empowered as equal participants, leaders and contributors to social and economic development.",
    "Farmers and rural families have access to sustainable livelihoods, knowledge, technology and resilient agricultural practices.",
    "Communities have access to better health, sanitation, nutrition and essential support systems.",
    "Rural communities become increasingly self-reliant, environmentally responsible and economically resilient.",
    "Technology and innovation become instruments of inclusion rather than exclusion.",
    "Communities actively participate in solving their own challenges and shaping their own development.",
    "Development becomes inclusive, sustainable, measurable and rooted in human dignity.",
  ];

  const changeMakers = [
    { from: "A child supported today", to: "becomes tomorrow's skilled professional" },
    { from: "A trained farmer", to: "becomes an innovator in sustainable agriculture" },
    { from: "An empowered woman", to: "becomes an economic contributor and community leader" },
    { from: "A skilled young person", to: "creates enterprise and opportunities for others" },
    { from: "A strengthened rural village", to: "becomes an inspirational model for neighbouring regions" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Section with Subpage Carousel */}
      <SubpageHeroCarousel
        tag="ABOUT ISLAH"
        title="Overview & Institutional Identity"
        subtitle="ISLAH (Integrated Social, Livelihood, Advancement & Humanitarian Action) — Creating Possibilities. Strengthening Communities. Transforming Lives."
        breadcrumbs={[{ label: "Overview" }]}
        images={[overviewHero, aboutHero, slide1, slide2]}
      />

      <main className="space-y-16 py-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section 1: Introduction & Identity */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#f97316]">
                  <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
                  Integrated Community Development
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b1f3b] tracking-tight leading-tight">
                  Public Identity of Islah Welfare Foundation
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  <strong className="text-[#0b1f3b] font-bold">ISLAH</strong> is the public identity of{" "}
                  <strong>Islah Welfare Foundation</strong>, a non-profit organisation committed to
                  advancing the well-being, dignity, and resilience of rural and underserved
                  communities.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  We believe that meaningful development cannot be achieved by addressing problems in
                  isolation. Education without livelihood, healthcare without awareness, infrastructure
                  without participation, or economic support without dignity cannot create lasting
                  change.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  ISLAH therefore follows an <strong>integrated and community-centred approach</strong>,
                  bringing together education, healthcare, livelihoods, agriculture, women and youth
                  empowerment, environmental sustainability, humanitarian assistance, and community
                  development.
                </p>
              </div>

              {/* Purpose Callout Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-black text-sm shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-[#0b1f3b] text-base">Our Purpose is Simple</h3>
                </div>
                <p className="text-slate-800 text-sm font-semibold italic leading-relaxed pl-10">
                  “To create the conditions in which individuals can become empowered, families can
                  become resilient, and communities can become self-reliant.”
                </p>
              </div>
            </div>

            {/* Approach Card in Right Column */}
            <div className="lg:col-span-5 bg-[#0b1f3b] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  Our Approach
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Development as Opportunity, Capability & Systems
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  At ISLAH, we see development not merely as the delivery of services, but as the
                  creation of opportunities, capabilities and systems that enable communities to shape
                  their own future.
                </p>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  We work with communities to understand their needs, identify practical solutions,
                  mobilise resources, develop partnerships, and implement initiatives that are
                  relevant to local realities.
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-5 border-t border-white/15">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
                  Underlying Objective
                </p>
                <p className="text-base sm:text-lg font-black text-white tracking-wide leading-snug">
                  Empower people. Strengthen livelihoods. Build resilient communities.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: ISLAH Stands For (Interactive Acronym Showcase) */}
        <ScrollReveal>
          <div className="space-y-6 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#f97316]">
                Institutional Definition
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                ISLAH Stands For
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Each letter in ISLAH represents a foundational pillar of our integrated community
                transformation strategy.
              </p>
            </div>

            {/* Letter Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2.5 pt-2">
              {standsFor.map((item) => (
                <button
                  key={item.letter}
                  onClick={() => setActiveTab(item.letter as "I" | "S" | "L" | "A" | "H")}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer shadow-xs ${
                    activeTab === item.letter
                      ? "bg-[#0b1f3b] text-white scale-105 shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span className="w-7 h-7 rounded-lg bg-brand-orange/20 text-brand-orange font-black flex items-center justify-center text-sm">
                    {item.letter}
                  </span>
                  <span>{item.word}</span>
                </button>
              ))}
            </div>

            {/* Active Tab Detail Display */}
            {(() => {
              const current = standsFor.find((s) => s.letter === activeTab) || standsFor[0];
              const Icon = current.icon;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 mt-4">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${current.color} text-white flex flex-col items-center justify-center shrink-0 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-1" />
                    <span className="font-black text-base">{current.letter}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-[#0b1f3b]">
                        {current.letter} — {current.word}
                      </h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.badgeBg}`}>
                        {current.tagline}
                      </span>
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      {current.desc}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Quick 5 Pillars Preview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {standsFor.map((item) => (
                <div
                  key={item.letter}
                  onClick={() => setActiveTab(item.letter as "I" | "S" | "L" | "A" | "H")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    activeTab === item.letter
                      ? "bg-orange-50/70 border-brand-orange shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-brand-orange text-sm">{item.letter}</span>
                    <span className="font-extrabold text-slate-900 text-xs truncate">{item.word}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Our Areas of Work */}
        <ScrollReveal>
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#f97316]">
                Core Programs
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                Our Areas of Work
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ISLAH works across interconnected areas of community development to create
                self-reliance and long-term socio-economic progress:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {areasOfWork.map((area) => (
                <a
                  key={area.title}
                  href={area.link}
                  className={`p-5 rounded-2xl border ${area.color} transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl ${area.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                        <area.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xl select-none">{area.emoji}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-[#0b1f3b] leading-snug group-hover:text-brand-orange transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1 text-xs font-bold text-brand-green group-hover:text-brand-green-dark">
                    <span>Explore Program</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Section 4: From Assistance to Empowerment (Visual Chain) */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#07162c] to-[#0b1f3b] text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-orange">
                <Lightbulb className="w-3.5 h-3.5" />
                Strategic Transformation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                From Assistance to Empowerment
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                A central principle of ISLAH is that development should move beyond short-term
                assistance wherever possible. Our programmes connect immediate support with longer-term
                empowerment.
              </p>
            </div>

            {/* Progression Chain Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {progressionSteps.map((item, idx) => (
                <div
                  key={item.num}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-brand-orange bg-brand-orange/20 px-2 py-0.5 rounded-md">
                        {item.num}
                      </span>
                      {idx < progressionSteps.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-white/30 hidden lg:block" />
                      )}
                    </div>
                    <h4 className="text-base font-extrabold text-white mb-1">{item.step}</h4>
                    <p className="text-xs text-white/70 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/15">
              <p className="text-sm font-bold text-white/90">
                “Relief responds. Education opens doors. Skills build livelihoods. Livelihoods ensure
                resilience. Participation ensures ownership. And ownership creates sustainable
                change.”
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 5: Vision, Mission & Philosophy */}
        <ScrollReveal>
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#f97316]">
                Guiding Principles
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                Our Vision, Mission & Philosophy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vision */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0b1f3b]">Our Vision</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A society where every individual can live with dignity, develop their potential,
                    sustain a secure livelihood, and contribute to a healthy, resilient and self-reliant
                    community.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-blue-600">
                  Dignity • Potential • Self-Reliance
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0b1f3b]">Our Mission</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To create inclusive and sustainable opportunities for rural and underserved
                    communities through integrated interventions in education, healthcare, livelihoods,
                    agriculture, empowerment, environmental sustainability and humanitarian
                    action—while fostering community participation, partnerships and responsible
                    development.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600">
                  Integrated • Sustainable • Community-Driven
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0b1f3b]">Our Philosophy</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We believe that every community possesses potential. Development is not about
                    changing communities from the outside; it is about unlocking their potential from
                    within:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-700 font-semibold list-disc list-inside">
                    <li>A child with opportunity becomes a learner.</li>
                    <li>A learner becomes skilled.</li>
                    <li>A skilled person becomes economically independent.</li>
                    <li>An empowered family builds stronger communities.</li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-brand-orange">
                  Unlocking Inner Potential
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 6: Commitment to Responsible Action */}
        <ScrollReveal>
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0b1f3b] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                  Our Commitment to Responsible Action & Transparency
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Integrity, Accountability & Honest Communication
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 leading-relaxed pt-2">
              <p>
                ISLAH is committed to conducting its activities with integrity, transparency,
                accountability and respect for human dignity. Our programmes and activities are
                undertaken according to organisational objectives, available resources, identified
                community needs and implementation capacity.
              </p>
              <p>
                Some initiatives may be operational, while others may remain proposed or planned
                initiatives and will be implemented progressively, subject to availability of funds,
                resources, partnerships, approvals and organisational capacity. Responsible development
                requires honest communication about achievements, ongoing work, and future aspirations.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 7: Vision 2047 — Building Communities That Shape a Developed Rural India */}
        <ScrollReveal>
          <div className="border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 bg-white shadow-sm">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 px-3 py-1 rounded-full text-xs font-black text-brand-orange uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Centenary of Independence
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b1f3b] tracking-tight">
                Vision 2047: Building Communities That Shape a Developed Rural India
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                As India moves towards 2047, the centenary of its independence, ISLAH envisions a future
                where the progress of the nation is reflected not only in economic growth and
                technological advancement, but also in the dignity, capabilities, resilience and
                quality of life of every community.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe that the journey towards a developed India must begin with strong, educated,
                healthy, skilled and self-reliant communities—particularly in rural and underserved
                regions.
              </p>
            </div>

            {/* 9 Aspirations by 2047 */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-[#0b1f3b] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                By 2047, ISLAH Aspires to See Communities Where:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {vision2047Pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 hover:bg-orange-50/40 hover:border-orange-200 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-semibold leading-snug">{pillar}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* From Beneficiaries to Change-Makers */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-[#0b1f3b]">
                  Our Approach — From Beneficiaries to Change-Makers
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Our 2047 vision goes beyond creating beneficiaries of development. We aspire to help
                  create change-makers.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {changeMakers.map((item, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-xs">
                    <span className="text-[11px] font-bold text-brand-orange uppercase block mb-1">
                      {item.from}
                    </span>
                    <span className="text-xs font-black text-slate-900 leading-snug">
                      → {item.to}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Society Goals & Commitment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                <h4 className="font-black text-[#0b1f3b] text-base">We Aspire to Build a Society Where:</h4>
                <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    No child is deprived of education
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    No individual is forced into poverty due to lack of opportunity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    Women are empowered and independent
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    Every family has access to basic needs and dignity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    Communities are self-reliant and resilient
                  </li>
                </ul>
              </div>

              <div className="bg-[#0b1f3b] text-white rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-md">
                <div className="space-y-2">
                  <h4 className="font-black text-brand-orange text-base uppercase tracking-wider">
                    A Commitment to Change
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed italic">
                    “We may not measure this journey in years alone, but in the lives transformed along
                    the way. Our mission will continue until no child is seen begging or forced into
                    labour, every child is in school or playing freely, and every individual can live with
                    dignity.”
                  </p>
                </div>
                <div className="pt-3 border-t border-white/15 flex flex-wrap gap-2">
                  {["Education", "Healthcare", "Women Empowerment", "Relief & Rehabilitation", "Rural Livelihoods"].map(
                    (area) => (
                      <span
                        key={area}
                        className="text-[10px] font-bold bg-white/10 text-white px-2.5 py-1 rounded-md border border-white/15"
                      >
                        {area}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Closing National Alignment Callout */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl p-6 text-center shadow-lg">
              <h3 className="text-lg sm:text-xl font-black tracking-wide">
                ISLAH 2047 — Empowering People. Strengthening Communities. Advancing a Developed India.
              </h3>
              <p className="text-white/90 text-xs sm:text-sm mt-1.5 max-w-2xl mx-auto">
                Positioning ISLAH as a catalyst and community-level contributor within India&apos;s centenary
                development journey.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
