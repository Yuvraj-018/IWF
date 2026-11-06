import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
} from "@/components/layout/SiteLayout";
import {
  AlertCircle,
  HeartPulse,
  Pill,
  Users,
  Banknote,
  Stethoscope,
  TestTube,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Siren,
  Clock,
  ShieldCheck,
  HandHeart,
  Building2,
  IndianRupee,
  Ambulance,
  Heart,
  Share2,
  BookOpen,
} from "lucide-react";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { PatientCarousel } from "@/components/healthcare/PatientCarousel";
import { toast } from "sonner";
import { URGENT_PATIENTS } from "@/content/patients";
import { usePatients } from "@/services/patientService";
import { fetchSuccessStories } from "@/services/storyService";
import type { SuccessStoryItem } from "@/content/mediaContent";
import criticalLifeSupportImg from "@/assets/critical_life_support.png";
import MedicalEmergencyWorkflow from "@/components/healthcare/MedicalEmergencyWorkflow";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STRUGGLE_POINTS = [
  { icon: Banknote, text: "Emergency hospital expenses" },
  { icon: HeartPulse, text: "ICU and critical care support" },
  { icon: Pill, text: "Medicines and urgent diagnostic tests" },
  { icon: AlertCircle, text: "Blood requirements and emergency procedures" },
  { icon: Siren, text: "Transportation and ambulance services" },
  { icon: Clock, text: "Immediate financial assistance during hospitalisation" },
];

const SUPPORT_AREAS = [
  {
    icon: Banknote,
    num: "01",
    title: "Emergency Financial Assistance",
    bullets: [
      "Support for urgent medical expenses during hospitalisation",
      "Assistance for poor patients requiring immediate treatment",
      "Financial aid for critical and emergency healthcare needs",
    ],
  },
  {
    icon: HeartPulse,
    num: "02",
    title: "Critical Care & Hospital Support",
    bullets: [
      "Support for ICU, emergency ward, and life-saving treatment requirements",
      "Assistance for medicines, injections, oxygen, and emergency diagnostics",
      "Coordination with hospitals and healthcare providers for urgent care",
    ],
  },
  {
    icon: TestTube,
    num: "03",
    title: "Emergency Medicines & Diagnostic Support",
    bullets: [
      "Assistance for costly medicines and emergency medical consumables",
      "Support for urgent blood tests, scans, and diagnostic procedures",
      "Help for patients requiring immediate medical intervention",
    ],
  },
  {
    icon: Users,
    num: "04",
    title: "Support for Economically Weaker Families",
    bullets: [
      "Priority assistance for poor, vulnerable, and marginalised patients",
      "Humanitarian support during sudden medical crises",
      "Compassionate assistance for families facing financial distress during emergencies",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  { icon: Stethoscope, text: "Coordination with hospitals, doctors, and healthcare providers" },
  { icon: Siren, text: "Emergency response and rapid support mechanisms" },
  { icon: ShieldCheck, text: "Identification and verification of genuinely needy patients" },
  { icon: HandHeart, text: "Community donations, CSR partnerships, and humanitarian support networks" },
  { icon: CheckCircle2, text: "Transparent monitoring and documentation of assistance provided" },
];

const IMPACT_OUTCOMES = [
  { icon: HeartPulse, text: "Save lives through timely emergency intervention" },
  { icon: Users, text: "Support poor families during critical medical situations" },
  { icon: Clock, text: "Reduce delays in life-saving treatment due to financial constraints" },
  { icon: Siren, text: "Improve access to emergency healthcare support in underserved communities" },
  { icon: HandHeart, text: "Provide dignity, compassion, and hope to vulnerable patients and families" },
];

// ─── Shared ──────────────────────────────────────────────────────────────────

const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const SECTION = "py-10 sm:py-12";

function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
}: {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-6 sm:mb-8 ${align === "center" ? "text-center max-w-3xl mx-auto" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1.5">{label}</p>
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] tracking-tight text-balance">{title}</h2>
      {subtitle && <p className="text-slate-600 text-sm leading-relaxed mt-2 text-pretty">{subtitle}</p>}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function RedesignHeroSection() {
  const stats = [
    { icon: HeartPulse, value: "624+", label: "Patients supported" },
    { icon: Building2, value: "48+", label: "Partner hospitals" },
    { icon: IndianRupee, value: "₹1.85 Cr+", label: "Support provided" },
    { icon: ShieldCheck, value: "100%", label: "Verified cases" },
  ];

  return (
    <>
      <SubpageHeroCarousel
        tag="HEALTHCARE • EMERGENCY SUPPORT"
        title="Critical Life & Emergency Support (CLES)"
        subtitle="Har Pal Anmol Hai — when every second counts, we provide immediate emergency financial assistance for underprivileged patients fighting for life in critical hospital care."
        breadcrumbs={[
          { label: "What We Do", href: "/programs" },
          { label: "Healthcare", href: "/programs/healthcare" },
          { label: "Critical Life Support (CLES)" },
        ]}
        images={[criticalLifeSupportImg]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#patients"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Support a Patient</span>
          </a>
          <a
            href="#how-we-work-medical"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl backdrop-blur-md transition cursor-pointer"
          >
            How We Work →
          </a>
        </div>
      </SubpageHeroCarousel>

      <section className="bg-white border-b border-slate-100 py-6">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-orange-50/60 border border-orange-100"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-[#f97316]" />
                </div>
                <div className="min-w-0">
                  <span className="text-lg sm:text-xl font-semibold text-slate-900 block leading-tight whitespace-nowrap">
                    {value}
                  </span>
                  <span className="text-xs text-slate-500 leading-tight">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PatientCardsSection() {
  const { patients } = usePatients(true);
  const [sortOption, setSortOption] = useState<"most-urgent" | "highest-need" | "recently-added">("most-urgent");

  const displayPatients = [...(patients && patients.length > 0 ? patients : URGENT_PATIENTS)].sort((a, b) => {
    if (sortOption === "highest-need") return b.neededAmount - b.raisedAmount - (a.neededAmount - a.raisedAmount);
    if (sortOption === "recently-added") return new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime();
    return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
  });

  return (
    <section id="patients" className={`bg-white ${SECTION} scroll-mt-20`}>
      <div className={CONTAINER}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1.5">Verified cases</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] tracking-tight">
              Patients Needing Urgent Support
            </h2>
          </div>
          <select
            aria-label="Sort patients"
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 w-full sm:w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
          >
            <option value="most-urgent">Sort by: Most urgent</option>
            <option value="highest-need">Sort by: Highest need</option>
            <option value="recently-added">Sort by: Recently added</option>
          </select>
        </div>
        <PatientCarousel patients={displayPatients} />
      </div>
    </section>
  );
}

function CaseThumb({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span className="w-16 h-16 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
        <HeartPulse className="w-6 h-6" />
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-16 h-16 rounded-lg object-cover shrink-0 bg-slate-100"
      loading="lazy"
    />
  );
}

function BottomCTABanner() {
  const reasons = [
    "Many patients in critical condition cannot afford life-saving treatment.",
    "Your support helps them receive timely care and emergency help.",
    "Every case is verified, and funds go directly to the hospital.",
  ];

  // Past healthcare cases from the CMS (Success Stories → Healthcare).
  const [pastCases, setPastCases] = useState<SuccessStoryItem[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetchSuccessStories({ category: "Healthcare", limit: 3 }).then((res) => {
      if (!cancelled && res?.success && Array.isArray(res.data)) setPastCases(res.data.slice(0, 3));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const share = async () => {
    const url = window.location.href;
    const data = {
      title: "Critical Life & Emergency Support — ISLAH",
      text: "Help critically ill patients get timely treatment. Every second counts.",
      url,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied — share it with friends and family.");
      }
    } catch {
      /* user cancelled */
    }
  };

  const storiesLink = { to: "/media/success-stories" as const, search: { category: "Healthcare" } };

  return (
    <section className={`bg-slate-50 border-y border-slate-200 ${SECTION}`}>
      <div className={CONTAINER}>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0b1f3b] text-balance">
              You can be the reason for someone&apos;s second chance at life.
            </h2>
            <p className="text-sm text-slate-600 mt-1.5 text-pretty">
              Join our mission to support critically ill patients in their most difficult moments.
            </p>
            <ul className="mt-4 space-y-2">
              {reasons.map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 sm:gap-3 mt-5">
              <Link
                to="/donate"
                search={{ financialType: "Medical Emergency" }}
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition"
              >
                <Heart className="w-4 h-4 fill-white" /> Donate Now
              </Link>
              <Link
                {...storiesLink}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white hover:bg-slate-100 text-[#0b1f3b] font-semibold text-sm px-5 py-2.5 rounded-xl transition"
              >
                <BookOpen className="w-4 h-4 text-brand-orange" /> View Patient Stories
              </Link>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-[#0b1f3b] font-semibold text-sm px-2 py-1.5 sm:py-2.5 transition"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">Lives we&apos;ve helped</p>
              <Link {...storiesLink} className="text-xs font-semibold text-[#0b1f3b] hover:text-brand-orange inline-flex items-center gap-1">
                All stories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {pastCases.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {pastCases.map((story) => (
                  <li key={story.id}>
                    <Link {...storiesLink} className="flex gap-3 py-3 first:pt-0 last:pb-0 group">
                      <CaseThumb src={story.image} alt={story.personName} />
                      <span className="min-w-0">
                        <span className="block font-semibold text-sm text-[#0b1f3b] group-hover:text-brand-orange transition leading-snug">
                          {story.title}
                        </span>
                        <span className="block text-xs text-slate-500 mt-0.5">
                          {[story.personName, [story.village, story.state].filter(Boolean).join(", ")]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                        <span className="block text-xs text-slate-600 leading-relaxed mt-1 line-clamp-2">{story.excerpt}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed">
                Read how timely support helped patients and their families through critical treatment.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className={`bg-white ${SECTION}`}>
      <div className={CONTAINER}>
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-10 items-start">
          <div>
            <SectionTitle label="Overview" title="The Harsh Reality" align="left" />
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed text-pretty">
              <p>
                For economically weaker families, a medical emergency often becomes a fight for survival. Many critically ill
                patients admitted to hospitals cannot receive timely treatment because they lack the money, emergency medical
                support or immediate help that life-threatening situations demand.
              </p>
              <p className="font-medium text-[#0b1f3b]">
                In rural and underserved communities, poor families frequently struggle to arrange:
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5 mt-4">
              {STRUGGLE_POINTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 rounded-lg border border-slate-200 p-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-slate-700 leading-snug self-center">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <img
              src={criticalLifeSupportImg}
              alt="Critical Life & Emergency Support"
              className="w-full h-56 sm:h-64 object-cover rounded-2xl border border-slate-200"
            />
            <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">Our Initiative</p>
              <p className="text-sm text-slate-700 leading-relaxed text-pretty">
                As a result, many underprivileged patients face delays in treatment at the most critical moments. Islah
                Welfare Foundation&apos;s Critical Life &amp; Emergency Support Initiative provides emergency assistance and
                life-saving support to poor and vulnerable patients admitted to hospitals in critical condition.
              </p>
              <p className="text-sm text-[#0b1f3b] font-semibold leading-relaxed text-pretty border-l-2 border-brand-orange pl-3">
                Our goal: no one should be denied emergency medical care because of poverty or financial hardship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportAreasSection() {
  return (
    <section className={`bg-slate-50 border-t border-slate-200 ${SECTION}`}>
      <div className={CONTAINER}>
        <SectionTitle
          label="Our Support Areas"
          title="4 Areas of Intervention"
          subtitle="Targeted emergency support across four critical areas, so that no patient is denied life-saving care."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUPPORT_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div key={area.num} className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-xs font-semibold text-slate-400 tracking-widest">{area.num}</span>
                </div>
                <h3 className="font-semibold text-base text-[#0b1f3b] leading-snug text-balance">{area.title}</h3>
                <ul className="space-y-2 mt-3">
                  {area.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed text-pretty">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImplementationSection() {
  return <MedicalEmergencyWorkflow showImageToggle={true} />;
}

function ImpactSection() {
  return (
    <section className={`bg-white ${SECTION}`}>
      <div className={CONTAINER}>
        <SectionTitle label="Expected Impact" title="5 Outcomes We Aim For" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {IMPACT_OUTCOMES.map(({ icon: Icon, text }, i) => (
            <div key={text} className="rounded-xl p-4 border border-slate-200 flex sm:flex-col gap-3">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5" />
                </span>
                <span className="text-xs font-bold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed text-pretty">{text}</p>
            </div>
          ))}
        </div>

        <figure className="mt-6 rounded-xl border border-slate-200 border-l-4 border-l-brand-orange bg-slate-50/70 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
          <blockquote className="text-base text-slate-800 italic leading-relaxed text-pretty">
            “Standing with vulnerable patients in their most critical moments — because timely support can save lives.”
          </blockquote>
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-brand-orange shrink-0">
            — Islah Welfare Foundation
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function PolicySection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-10 sm:py-12 bg-slate-50 border-t border-slate-200" id="fundraising-policy">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Transparency & Governance Policy
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#0b1f3b]">
                Fundraising for Critical Medical Treatment Policy
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Effective Date: 01/04/2026 • Registered Charitable Trust Governance Document
              </p>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 text-xs font-bold text-[#004724] border border-[#004724]/30 hover:bg-emerald-50 rounded-lg transition-colors shrink-0"
            >
              {isOpen ? "Collapse Full Policy" : "Read Full Policy Document"}
            </button>
          </div>

          <div className="mt-6 text-sm text-slate-600 space-y-3">
            <p className="font-semibold text-slate-800">
              Islah Welfare Foundation conducts transparent fundraising campaigns to provide critical medical aid for individuals unable to meet life-saving medical costs.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Direct Provider Payments</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Payments are routed directly to verified hospitals, pharmacies, and diagnostic centres with receipts.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Surplus Fund Governance</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Any excess funds after verified treatment are transferred to the Health & Well-Being Surplus Fund for emergency patients.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Independent Verification</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every patient case undergoes multi-tier physical and clinical verification before fundraising commences.
                </p>
              </div>
            </div>

            {isOpen && (
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4 text-slate-700 leading-relaxed text-sm">
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">1. Purpose:</h4>
                  <p>
                    Islah Welfare Foundation conducts fundraising campaigns to provide financial assistance for individuals requiring critical medical treatment who are unable to meet the cost of their medical care. This policy explains how funds collected through individual medical fundraising campaigns are managed, utilised, and accounted for, ensuring transparency, fairness, and responsible stewardship of donor contributions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">2. Individual Medical Fundraising Campaigns:</h4>
                  <p>
                    Each fundraising campaign is launched based on information and supporting medical documents provided by the beneficiary or their authorised representative. The campaign specifies an estimated treatment cost, which serves as the fundraising target. Actual treatment expenses may vary depending on the patient's medical condition, hospital requirements, and treatment progress.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">3. Administrative & Fund Management Cost:</h4>
                  <p>
                    To support the planning, verification, fundraising, campaign management, payment processing, documentation, compliance, monitoring, communication, and overall administration of medical fundraising activities, 20% of the total funds raised may be utilised towards administrative, campaign management, compliance, verification, payment processing, monitoring, and program management expenses incurred in operating the medical fundraising program. The actual percentage applied may vary depending on the circumstances of each campaign.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">4. Where Total Funds Collected Are Less Than the Estimated Treatment Cost:</h4>
                  <p>
                    If the total amount raised for an individual beneficiary is less than the estimated treatment cost: (a) Islah Welfare Foundation may allocate up to 20% of the total amount collected towards administrative and program management expenses; (b) The remaining amount will be utilised exclusively towards the beneficiary's eligible medical treatment and related approved medical expenses; (c) Donors acknowledge that, in such cases, the total amount collected may not be sufficient to fully meet the beneficiary's treatment requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">5. Where Total Funds Collected Exceed the Required Treatment Cost:</h4>
                  <p>
                    If the total amount collected exceeds the amount reasonably required for the beneficiary's eligible medical treatment: (1) The beneficiary's verified medical expenses shall be paid first; (2) Administrative and program management costs, as provided under this policy, may be retained by Islah; (3) Any remaining surplus amount shall not be refunded to individual donors; (4) The surplus shall be transferred to Health & Well-Being Surplus Fund and utilised for: critical medical treatment assistance, emergency healthcare support, medical aid for economically weaker patients, health camps and community healthcare initiatives, and other healthcare programs consistent with the charitable objectives of Islah Welfare Foundation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">6. Change in Treatment Circumstances:</h4>
                  <p>
                    If treatment is completed at a lower cost, discontinued, the beneficiary no longer requires assistance, becomes ineligible, unfortunately passes away before full utilisation of the funds, or the hospital refuses or returns payment, then after settling all verified eligible medical expenses and applicable administrative costs, any remaining balance may be transferred to the Health & Well-Being Surplus Fund.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">7. Payment of Medical Assistance:</h4>
                  <p>
                    Wherever reasonably possible, payments shall be made directly to hospitals, medical institutions, pharmacies, diagnostic centres, or other authorised healthcare providers. Direct payment to beneficiaries may be made only where appropriate documentation and verification are available.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0b1f3b] text-sm mb-1">8. Verification & Donor Consent:</h4>
                  <p>
                    By donating, donors acknowledge that donations are voluntary and irrevocable, support charitable medical assistance programs, and will be managed in accordance with this policy. Treatment costs are estimates, and donations are non-refundable except where required by law.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold">Registered Office:</span> B-144, Abul Fazal Enclave-II, Okhla, New Delhi, Delhi-110025 • Email: info@iwfindia.org • Website: www.iwfindia.org
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BackNav() {
  return (
    <section className="py-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/programs/healthcare"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border-2 border-brand-green/20 hover:border-brand-green/60 px-5 py-2.5 rounded transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          All Healthcare Initiatives
        </Link>
        <Link
          to="/programs/healthcare/rural-ambulance"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 rounded transition-all duration-200 shadow-md"
        >
          Next: Rural Ambulance & Emergency Response (RAER)
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function CriticalLifeSupport() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <RedesignHeroSection />
        <PatientCardsSection />
        <BottomCTABanner />
        <OverviewSection />
        <SupportAreasSection />
        <ImplementationSection />
        <ImpactSection />
        <PolicySection />
        <BackNav />
      </main>
      <Footer />
    </div>
  );
}

