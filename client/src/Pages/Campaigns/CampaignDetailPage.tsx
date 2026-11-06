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
import { PatientCard } from "@/components/healthcare/PatientCard";
import { usePatients } from "@/services/patientService";
import {
  CAMPAIGNS_DATA,
  ALL_CAMPAIGNS_LIST,
  type CampaignData,
} from "@/content/campaigns";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";
import slide3 from "@/assets/hero-carousel/hero-slide-3.jpg";
import slide4 from "@/assets/hero-carousel/hero-slide-4.jpg";
import aboutHero from "@/assets/about-hero.jpg";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

interface CampaignDetailPageProps {
  campaignSlug: string;
}

export default function CampaignDetailPage({
  campaignSlug,
}: CampaignDetailPageProps) {
  const { patients: livePatients } = usePatients(true);
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

      {/* ─── Subpage Hero Carousel with In-Hero Action Buttons ──────── */}
      <SubpageHeroCarousel
        tag={`CAMPAIGN ${campaign.num} • ${campaign.badge.toUpperCase()}`}
        title={campaign.name}
        subtitle={`${campaign.tagline ? campaign.tagline + " — " : ""}${campaign.intro}`}
        breadcrumbs={[
          { label: "Our Campaigns", href: "/campaign" },
          { label: campaign.name },
        ]}
        images={[campaign.heroImage, aboutHero, slide1, slide2, slide3, slide4].filter(Boolean)}
      >
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#donate-section"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
          >
            <span>Support This Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setActiveModal("partner")}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer backdrop-blur-xs"
          >
            <Heart className="w-4 h-4 text-brand-orange" />
            <span>Partner / Sponsor</span>
          </button>
        </div>
      </SubpageHeroCarousel>

      {/* ─── Main Content Body ──────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
        {/* ─── Section: Philosophy & The Challenge ─────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Core Philosophy */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#15803d]">
                FOUNDATIONAL PRINCIPLE
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                OUR PHILOSOPHY & PURPOSE
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                {campaign.philosophy}
              </p>
            </div>

            {campaign.quote?.text && (
              <div className="bg-emerald-50/90 border-l-4 border-[#15803d] p-3.5 rounded-r-xl text-xs text-slate-800 italic leading-relaxed">
                “{campaign.quote.text}”
                {campaign.quote.author && (
                  <span className="block not-italic font-bold text-[10px] text-emerald-800 mt-1">
                    — {campaign.quote.author}
                  </span>
                )}
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
              <span className="font-bold block mb-1 text-slate-900">
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
              <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">
                GROUND REALITIES
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
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
            <div className="text-center max-w-5xl mx-auto space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                SYSTEMIC INTERVENTION
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight whitespace-normal md:whitespace-nowrap">
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
                    <span className="w-7 h-7 rounded-lg bg-[#071527] text-white flex items-center justify-center text-xs font-bold">
                      {step.number}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
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
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                CORE INITIATIVES
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
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
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#15803d]">
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
                <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600">
                  URGENT PATIENT CASES
                </span>
                <h3 className="text-xl font-bold text-slate-900">
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
              {livePatients.slice(0, 3).map((patient) => (
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
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                BENEFICIARY PROFILE
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
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
          <div className="lg:col-span-6 bg-gradient-to-br from-[#071527] to-[#0c2340] text-white rounded-2xl p-6 shadow-md border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                LOOKING AHEAD
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
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
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#15803d]">
                MAKE AN IMPACT
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
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
                  <div className="text-2xl font-bold text-slate-900">
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
                  className="w-full text-center bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider block"
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
              className="font-bold text-slate-900 hover:underline shrink-0"
            >
              Custom Amount →
            </a>
          </div>
        </section>

        {/* ─── Section: Explore Other Campaigns Switcher ───────────────────── */}
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
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
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                    CAMPAIGN {oc.num}
                  </span>
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#15803d] transition-colors">
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
