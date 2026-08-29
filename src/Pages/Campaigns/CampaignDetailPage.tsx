import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Award,
  Users,
  Compass,
  FileCheck,
  ChevronRight,
  Lock,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import {
  CAMPAIGNS_DATA,
  ALL_CAMPAIGNS_LIST,
  type CampaignData,
} from "@/content/campaigns";
import { URGENT_PATIENTS } from "@/content/patients";
import { PatientCard } from "@/components/healthcare/PatientCard";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

interface CampaignDetailPageProps {
  campaignSlug: string;
}

export default function CampaignDetailPage({
  campaignSlug,
}: CampaignDetailPageProps) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);

  // Lookup campaign by slug or fallback
  const campaign: CampaignData =
    CAMPAIGNS_DATA[campaignSlug] || CAMPAIGNS_DATA["shiksha-na-ruke"];

  const otherCampaigns = ALL_CAMPAIGNS_LIST.filter(
    (c) => c.slug !== campaign.slug
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* ─── Breadcrumb Navigation ────────────────────────────────────────── */}
      <div className="bg-slate-100 border-b border-slate-200 py-2 px-4 md:px-8 text-xs font-semibold text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <a href="/" className="hover:text-[#15803d]">
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <a href="/campaign" className="hover:text-[#15803d]">
            Our Campaigns
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{campaign.name}</span>
        </div>
      </div>

      {/* ─── Hero Section (Theme-Specific Gradient) ───────────────────────── */}
      <section
        className={`relative bg-gradient-to-b ${campaign.bgGradient} text-white py-12 md:py-16 overflow-hidden border-b border-slate-800`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (Details & CTAs) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white/15 text-emerald-300 border border-white/20 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
                  CAMPAIGN {campaign.num} • {campaign.badge}
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {campaign.name}
                </h1>
                {campaign.hindiName && (
                  <p className="text-lg font-bold text-slate-300 mt-1">
                    {campaign.hindiName}
                  </p>
                )}
                <p className="text-sm md:text-base font-extrabold text-emerald-300 mt-2 flex items-center gap-1.5">
                  <span>{campaign.tagline}</span>
                  <span className="text-sm">🌿</span>
                </p>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl">
                {campaign.intro}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#donate-section"
                  className="bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer"
                >
                  SUPPORT THIS CAMPAIGN →
                </a>
                <button
                  onClick={() => setActiveModal("partner")}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer backdrop-blur-xs"
                >
                  PARTNER / SPONSOR →
                </button>
              </div>
            </div>

            {/* Right Column (Hero Media Card & Quote) */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-video border border-white/20">
                  <img
                    src={campaign.heroImage}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                      MISSION MOTTO
                    </span>
                    <h4 className="font-extrabold text-xs text-white">
                      {campaign.motto}
                    </h4>
                  </div>
                </div>

                <div className="bg-black/20 border-l-4 border-emerald-400 p-3 rounded-r-xl text-xs text-slate-200 italic leading-relaxed">
                  “{campaign.quote.text}”
                  {campaign.quote.author && (
                    <span className="block not-italic font-bold text-[10px] text-emerald-300 mt-1">
                      — {campaign.quote.author}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Body ──────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
        {/* ─── Section: Philosophy & The Challenge ─────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Core Philosophy */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                FOUNDATIONAL PRINCIPLE
              </span>
              <h3 className="text-xl font-black text-[#0b1f3b] mt-1">
                OUR PHILOSOPHY & PURPOSE
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                {campaign.philosophy}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium">
              <span className="font-bold block mb-1">
                Connected with the Wider ISLAH Ecosystem
              </span>
              This campaign works hand-in-hand with our education, health,
              livelihood, women empowerment, and rural development programmes to
              generate enduring community capability.
            </div>
          </div>

          {/* The Challenge We Address */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f97316]">
                GROUND REALITIES
              </span>
              <h3 className="text-xl font-black text-[#0b1f3b] mt-1">
                THE CHALLENGES WE ADDRESS
              </h3>
              <div className="space-y-2.5 mt-3">
                {campaign.challengeText.map((ch, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {ch}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section: Continuum Pathway ───────────────────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#0b1f3b]">
                SYSTEMIC INTERVENTION
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                {campaign.continuumTitle}
              </h2>
              <p className="text-xs font-bold text-emerald-700">
                Transforming immediate support into lasting self-reliance 🌿
              </p>
            </div>
          </ScrollReveal>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(
              campaign.continuumSteps.length,
              6
            )} gap-3`}
          >
            {campaign.continuumSteps.map((step, sIdx) => (
              <ScrollReveal key={sIdx}>
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between h-full hover:border-[#15803d] transition group">
                  <div className="space-y-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b1f3b] text-white flex items-center justify-center text-xs font-black">
                      {step.number}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ─── Section: Key Focus Areas ────────────────────────────────────── */}
        <section className="space-y-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#0b1f3b]">
                CORE INITIATIVES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                KEY INTERVENTIONS & FOCUS AREAS
              </h2>
              <p className="text-xs text-slate-500">
                Structured activities and interventions undertaken under{" "}
                {campaign.name}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaign.focusAreas.map((f, fIdx) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={fIdx}>
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-3.5 group hover:-translate-y-0.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0b1f3b]">
                        {f.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ─── Special Section for Har Pal Anmol Hai: Live Urgent Patients ─── */}
        {campaign.slug === "har-pal-anmol-hai" && (
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-rose-600">
                  URGENT PATIENT CASES
                </span>
                <h3 className="text-xl font-black text-[#0b1f3b]">
                  PATIENTS NEEDING TIMELY EMERGENCY CARE
                </h3>
              </div>
              <a
                href="/programs/healthcare/critical-life-support"
                className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                View All Cases →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {URGENT_PATIENTS.slice(0, 3).map((patient) => (
                <PatientCard key={patient.id} {...patient} />
              ))}
            </div>
          </section>
        )}

        {/* ─── Section: Who We Reach & Long-Term Vision ────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Who We Seek to Reach */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0b1f3b]">
                BENEFICIARY PROFILE
              </span>
              <h3 className="text-xl font-black text-[#0b1f3b] mt-1">
                WHO WE SEEK TO REACH
              </h3>
              <ul className="space-y-2 mt-3">
                {campaign.whoWeReach.map((who, wIdx) => (
                  <li
                    key={wIdx}
                    className="flex items-start gap-2 text-xs text-slate-700 font-medium"
                  >
                    <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                    <span>{who}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Long-Term Vision */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0b1f3b] to-slate-900 text-white rounded-2xl p-6 shadow-md border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                LOOKING AHEAD
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                OUR LONG-TERM VISION
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-3">
                {campaign.longTermVision}
              </p>
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-2">
                {campaign.relatedPrograms.map((rp, rIdx) => (
                  <a
                    key={rIdx}
                    href={rp.href}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-slate-200 transition"
                  >
                    {rp.title} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section: Donation Tiers & Support Module ────────────────────── */}
        <section id="donate-section" className="space-y-6 pt-4 scroll-mt-20">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#15803d]">
                MAKE AN IMPACT
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                SUPPORT {campaign.name.toUpperCase()}
              </h2>
              <p className="text-xs text-slate-500">
                Your contribution directly powers ground interventions with 80G
                tax benefits.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {campaign.donationTiers.map((tier, tIdx) => (
              <div
                key={tIdx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#15803d] transition-all group"
              >
                <div className="space-y-2">
                  <div className="text-2xl font-black text-[#0b1f3b]">
                    ₹{tier.amount.toLocaleString("en-IN")}
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {tier.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {tier.impact}
                  </p>
                </div>

                <a
                  href={`/donate?amount=${tier.amount}&campaign=${campaign.slug}`}
                  className="w-full text-center bg-[#15803d] hover:bg-[#166534] text-white font-black text-xs py-2.5 rounded-xl shadow-xs transition uppercase tracking-wider block"
                >
                  Contribute ₹{tier.amount.toLocaleString("en-IN")}
                </a>
              </div>
            ))}
          </div>

          <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                All donations to <strong>ISLAH (Islah Welfare Foundation)</strong> are eligible for <strong>50% Tax Exemption under Section 80G</strong> of the Income Tax Act.
              </span>
            </div>
            <a
              href="/donate"
              className="font-bold text-[#0b1f3b] hover:underline shrink-0"
            >
              Custom Amount →
            </a>
          </div>
        </section>

        {/* ─── Section: Explore Other Campaigns Switcher ───────────────────── */}
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-[#0b1f3b]">
              EXPLORE OTHER ISLAH CAMPAIGNS
            </h3>
            <a
              href="/campaign"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              All 5 Campaigns →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {otherCampaigns.map((oc) => (
              <a
                key={oc.id}
                href={`/campaign/${oc.slug}`}
                className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#15803d] transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                    CAMPAIGN {oc.num}
                  </span>
                  <h5 className="font-extrabold text-xs text-slate-900 group-hover:text-[#15803d] transition-colors">
                    {oc.name}
                  </h5>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[180px]">
                    {oc.tagline}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#15803d] group-hover:translate-x-1 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
