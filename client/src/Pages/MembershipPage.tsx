import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Heart,
  UserCheck,
  Users,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { MembershipPolicyModal } from "@/components/membership/MembershipPolicyModal";
import { MembershipApplicationForm } from "@/components/membership/MembershipApplicationForm";
import { MembershipStatusPortal } from "@/components/membership/MembershipStatusPortal";
import {
  MEMBERSHIP_TIERS,
  type FormMode,
  type TierType,
} from "@/components/membership/membershipConfig";

export default function MembershipPage() {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  // Applicant type & tier are shared between the tier cards and the application form
  const [formMode, setFormMode] = useState<FormMode>("individual");
  const [selectedTier, setSelectedTier] = useState<TierType>("Yellow");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Deep links (e.g. /membership#membership-status from the Community page) arrive before
  // this lazily loaded page has rendered, so scroll to the target once it exists.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el)
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        {/* ================================================================== */}
        {/* 1. HERO SECTION (Fixed dark navy background #071527)              */}
        {/* ================================================================== */}
        <SubpageHeroCarousel
          tag="JOIN ISLAH COMMUNITY"
          title="Become an ISLAH Member"
          subtitle="Be Part of a Community Working for Meaningful Change. Connect through participation, knowledge, skills and responsible social support."
          breadcrumbs={[
            { label: "Get Involved", href: "/#get-involved" },
            { label: "Become a Member" },
          ]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#membership-form"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm transition-all shadow-sm shadow-orange-950/20 active:scale-95"
            >
              <span>Become a Member</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#membership-options"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all active:scale-95"
            >
              <span>Membership Options</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#membership-status"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white underline underline-offset-4 ml-1 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>Already a member? Check Status / Renew</span>
            </a>
          </div>
        </SubpageHeroCarousel>

        {/* ================================================================== */}
        {/* 2. MEMBERSHIP IS MORE THAN A CONTRIBUTION                          */}
        {/* ================================================================== */}
        <section className="py-12 sm:py-14 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                02. More Than a Contribution
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1 mb-3">
                A Community Built on Learning, Participation & Service
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                An ISLAH membership represents an opportunity to become part of a growing community
                committed to social development. Members contribute within their interests and
                capacity through their time, knowledge, skills, ideas, and responsible support.
              </p>
            </div>

            {/* 4 Pillars in Pastel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8">
              {[
                {
                  title: "Participation",
                  desc: "Take part in grassroots initiatives, awareness programs, and community-driven actions.",
                  bg: "bg-blue-50/60 hover:bg-blue-50",
                  border: "border-blue-100",
                  icon: Users,
                  accent: "text-blue-600",
                },
                {
                  title: "Knowledge",
                  desc: "Share your professional expertise, academic insights, and mentorship to enrich learners.",
                  bg: "bg-amber-50/60 hover:bg-amber-50",
                  border: "border-amber-100",
                  icon: GraduationCap,
                  accent: "text-amber-600",
                },
                {
                  title: "Skills",
                  desc: "Contribute vocational, technical, legal, healthcare, or leadership skills to empower others.",
                  bg: "bg-emerald-50/60 hover:bg-emerald-50",
                  border: "border-emerald-100",
                  icon: Briefcase,
                  accent: "text-emerald-600",
                },
                {
                  title: "Community",
                  desc: "Belong to an authentic, values-led network working for sustainable, positive social change.",
                  bg: "bg-orange-50/60 hover:bg-orange-50",
                  border: "border-orange-100",
                  icon: Heart,
                  accent: "text-orange-600",
                },
              ].map((p, i) => {
                const IconComponent = p.icon;
                return (
                  <div
                    key={i}
                    className={`p-5 rounded-xl border ${p.border} ${p.bg} transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    <div
                      className={`p-2.5 rounded-lg bg-white inline-block shadow-xs mb-3 ${p.accent}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-[#071527] mb-1.5">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Activities list */}
            <div className="mt-8 p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Subject to applicable policies, ISLAH members may:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs sm:text-sm text-slate-700">
                {[
                  "Participate in selected programmes",
                  "Join awareness & outreach activities",
                  "Contribute time, skills & ideas",
                  "Access volunteer opportunities",
                  "Attend learning sessions & seminars",
                  "Share knowledge & mentorship",
                  "Support community initiatives",
                  "Engage with wider social impacts",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 3. MEMBERSHIP PRINCIPLES                                           */}
        {/* ================================================================== */}
        <section className="py-12 sm:py-14 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                03. Core Values
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
                Our Membership Principles
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                ISLAH seeks to maintain a membership community based on responsibility, transparency
                and mutual respect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  title: "Respect",
                  desc: "Treating individuals, beneficiaries and communities with dignity, empathy and honor.",
                },
                {
                  title: "Inclusion",
                  desc: "Welcoming people from diverse backgrounds who align with our humanitarian purpose.",
                },
                {
                  title: "Integrity",
                  desc: "Maintaining responsible, ethical and honest participation across all activities.",
                },
                {
                  title: "Accountability",
                  desc: "Following applicable organisational policies, safeguarding standards and governance rules.",
                },
                {
                  title: "Community First",
                  desc: "Keeping measurable, meaningful community welfare at the very center of everything we do.",
                },
                {
                  title: "Responsible Participation",
                  desc: "Contributing within one's capacity while respecting procedures and community wellbeing.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-[#071527] flex items-center justify-center text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-base">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. WHO CAN BECOME A MEMBER & WHAT MEMBERS CAN DO                   */}
        {/* ================================================================== */}
        <section className="py-12 sm:py-14 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Who can join */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    04. Community Inclusivity
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1 mb-2">
                    Who Can Become a Member?
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    A community open to all individuals and organizations wanting to contribute
                    towards sustainable social progress.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      role: "Students & Young People",
                      desc: "Participate in learning, volunteering and grassroots youth initiatives.",
                    },
                    {
                      role: "Educators & Professionals",
                      desc: "Share knowledge, professional expertise and vocational mentoring.",
                    },
                    {
                      role: "Entrepreneurs & Business Leaders",
                      desc: "Support livelihoods, micro-enterprise and community development.",
                    },
                    {
                      role: "Community Members",
                      desc: "Participate directly in awareness drives, relief actions and local welfare.",
                    },
                    {
                      role: "Social-Impact Supporters",
                      desc: "Support ISLAH's mission through sustained engagement and responsible giving.",
                    },
                    {
                      role: "Organisations & Institutions",
                      desc: "Partner as an institution via structured organizational supporting membership.",
                    },
                  ].map((who, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100/60 transition-colors"
                    >
                      <h4 className="font-semibold text-xs sm:text-sm text-[#071527] mb-1">
                        {who.role}
                      </h4>
                      <p className="text-[12px] sm:text-xs text-slate-600 leading-relaxed">
                        {who.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: What Members Can Do Pipeline */}
              <div className="lg:col-span-5 bg-blue-50/40 border border-blue-100 rounded-2xl p-5 sm:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  05. Engagement Pipeline
                </span>
                <h3 className="text-lg font-semibold text-[#071527] mt-1 mb-3">
                  One Membership. Many Ways to Participate.
                </h3>
                <p className="text-xs text-slate-600 mb-5">
                  Membership is a continuous journey that evolves with your time and interests:
                </p>

                <div className="space-y-2">
                  {[
                    { step: "Member", label: "Join the ISLAH community family" },
                    { step: "Participate", label: "Stay connected with programs & updates" },
                    { step: "Contribute", label: "Share time, knowledge, skills & ideas" },
                    { step: "Volunteer", label: "Serve directly through field initiatives" },
                    { step: "Mentor", label: "Guide learners and community youth" },
                    { step: "Support", label: "Responsible contribution per your capacity" },
                    { step: "Stay Connected", label: "Grow with the community over years" },
                  ].map((stage, idx, arr) => (
                    <div key={idx} className="relative">
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-blue-100 shadow-2xs">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="text-xs">
                          <span className="font-bold text-[#071527] mr-1.5">{stage.step}:</span>
                          <span className="text-slate-600">{stage.label}</span>
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-0.5 h-2 bg-blue-200 mx-auto my-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 6. YOUR MEMBERSHIP JOURNEY                                         */}
        {/* ================================================================== */}
        <section className="py-12 sm:py-14 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                06. Roadmap
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
                Your Membership Journey
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
                Simple, transparent, and connected from your first application.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {[
                { no: "01", title: "Discover", sub: "Explore mission" },
                { no: "02", title: "Choose", sub: "Select your tier" },
                { no: "03", title: "Apply", sub: "Complete details" },
                { no: "04", title: "Verify", sub: "Fast OTP check" },
                { no: "05", title: "Confirm", sub: "Payment / Submit" },
                { no: "06", title: "Receive", sub: "Member ID & Card" },
                { no: "07", title: "Participate", sub: "Join programs" },
                { no: "08", title: "Renew", sub: "Annual continuity" },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-lg border border-slate-200 text-center shadow-2xs"
                >
                  <span className="text-[11px] font-mono font-bold text-brand-orange block mb-1">
                    {step.no}
                  </span>
                  <p className="font-semibold text-xs text-[#071527]">{step.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{step.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 7. MEMBERSHIP OPTIONS / TIERS                                      */}
        {/* ================================================================== */}
        <section
          id="membership-options"
          className="py-12 sm:py-16 bg-white border-b border-slate-100 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                07. Membership Options
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
                Choose a Membership That Matches Your Commitment
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Structured supporting tiers offering different levels of participation, learning and
                responsible contribution.
              </p>
            </div>

            {/* Individual vs Org Tab Switcher */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setFormMode("individual")}
                  className={`px-4 sm:px-6 py-2 rounded-lg transition-all ${
                    formMode === "individual"
                      ? "bg-white text-[#071527] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Individual Membership (Blue / Yellow / Green)
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode("organisation")}
                  className={`px-4 sm:px-6 py-2 rounded-lg transition-all ${
                    formMode === "organisation"
                      ? "bg-white text-[#071527] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Organisational Supporting Membership (Orange)
                </button>
              </div>
            </div>

            {/* Individual Cards */}
            {formMode === "individual" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {(["Blue", "Yellow", "Green"] as TierType[]).map((tierKey) => {
                  const tier = MEMBERSHIP_TIERS[tierKey];
                  const Icon = tier.icon;
                  const isSelected = selectedTier === tierKey;

                  return (
                    <div
                      key={tierKey}
                      className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 ${
                        tier.borderClass
                      } ${tier.bgPastel} ${
                        tier.popular ? "shadow-md ring-1 ring-amber-300" : "shadow-xs"
                      }`}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                          Most Popular
                        </div>
                      )}

                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${tier.badge}`}
                          >
                            {tier.cardName}
                          </span>
                          <Icon className="w-5 h-5" style={{ color: tier.accentColor }} />
                        </div>

                        <h3 className="text-xl font-bold text-[#071527] mb-1">{tier.roleTitle}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[38px]">
                          {tier.tagline}
                        </p>

                        {/* Price */}
                        <div className="mb-4 pb-4 border-b border-slate-200/80">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-bold text-[#071527]">
                              ₹{tier.amount.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">/ year</span>
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            Approx. {tier.monthlyEquiv} contribution
                          </span>
                        </div>

                        {/* Suitable for */}
                        <div className="mb-4">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                            Suitable For:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {tier.suitableFor.map((item, idx) => (
                              <span
                                key={idx}
                                className="text-[11px] bg-white/80 border border-slate-200/80 rounded px-2 py-0.5 text-slate-700"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            What you receive:
                          </span>
                          {tier.features.map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-700"
                            >
                              <Check
                                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                                style={{ color: tier.accentColor }}
                              />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <a
                        href="#membership-form"
                        onClick={() => {
                          setSelectedTier(tierKey);
                          setFormMode("individual");
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all text-center ${
                          isSelected
                            ? "bg-[#071527] text-white shadow-xs"
                            : "bg-white hover:bg-slate-100 text-slate-900 border border-slate-300"
                        }`}
                      >
                        <span>
                          {isSelected ? "Selected for Application" : `Apply for ${tier.cardName}`}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Organisational Card */
              <div className="max-w-2xl mx-auto">
                {(() => {
                  const tier = MEMBERSHIP_TIERS.Orange;
                  const Icon = tier.icon;
                  return (
                    <div
                      className={`rounded-2xl border p-6 sm:p-8 ${tier.borderClass} ${tier.bgPastel} shadow-sm`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${tier.badge}`}
                        >
                          {tier.cardName} — Corporate & Institutional
                        </span>
                        <Icon className="w-6 h-6 text-orange-600" />
                      </div>

                      <h3 className="text-2xl font-bold text-[#071527] mb-2">{tier.roleTitle}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">{tier.tagline}</p>

                      <div className="mb-6 pb-6 border-b border-orange-200/80">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-[#071527]">
                            ₹{tier.amount.toLocaleString("en-IN")}
                          </span>
                          <span className="text-sm text-slate-500 font-medium">/ year</span>
                        </div>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          Approx. {tier.monthlyEquiv} institutional contribution
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                            Suitable For:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {tier.suitableFor.map((item, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-white/90 border border-orange-200 rounded px-2.5 py-1 text-slate-800"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                            Key Opportunities:
                          </span>
                          <div className="space-y-1.5">
                            {tier.features.map((feat, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-xs text-slate-700"
                              >
                                <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <a
                        href="#membership-form"
                        onClick={() => {
                          setSelectedTier("Orange");
                          setFormMode("organisation");
                        }}
                        className="w-full py-3 px-6 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                      >
                        <span>Start Organisation Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 8. MEMBERSHIP APPLICATION FORM (3 steps, autosave, OTP)           */}
        {/* ================================================================== */}
        <section
          id="membership-form"
          className="py-12 sm:py-14 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                08. Application Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-0.5">
                {formMode === "individual"
                  ? "Individual Supporting Membership Application"
                  : "Organisational Membership Application"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Three short steps. Your progress is saved on this device as you go.
              </p>
            </div>
            <MembershipApplicationForm
              mode={formMode}
              onModeChange={setFormMode}
              tier={selectedTier}
              onTierChange={setSelectedTier}
              onOpenPolicy={() => setIsPolicyModalOpen(true)}
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* 9. CHECK MEMBERSHIP STATUS / RENEW (Self-service via OTP)          */}
        {/* ================================================================== */}
        <section
          id="membership-status"
          className="py-12 sm:py-14 bg-white border-b border-slate-100 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Already a Member?
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
                Check Membership Status & Renew
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                No passwords needed — verify with a one-time code to view your card, renew your plan
                or switch to a different one.
              </p>
            </div>
            <MembershipStatusPortal onOpenPolicy={() => setIsPolicyModalOpen(true)} />
          </div>
        </section>

        {/* ================================================================== */}
        {/* 10. BEYOND MEMBERSHIP                                              */}
        {/* ================================================================== */}
        <section className="py-12 sm:py-14 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                10. Beyond Membership
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
                Your ISLAH Journey Can Grow With You
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Membership can be the beginning—not the end—of your engagement. As your interests
                and capacity evolve, explore other ways to make an impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {[
                {
                  title: "Volunteer",
                  desc: "Give your time, skills & energy to grassroots projects.",
                  href: "/volunteer",
                  action: "Explore Volunteering",
                  bg: "hover:bg-blue-50/50",
                },
                {
                  title: "Mentor",
                  desc: "Share professional experience with young learners.",
                  href: "/mentor",
                  action: "Become a Mentor",
                  bg: "hover:bg-amber-50/50",
                },
                {
                  title: "Partner",
                  desc: "Build institutional or program-level collaborations.",
                  href: "/partner",
                  action: "Explore Partnership",
                  bg: "hover:bg-emerald-50/50",
                },
                {
                  title: "Sponsor",
                  desc: "Support a defined health, school or relief initiative.",
                  href: "/sponsor",
                  action: "Sponsor a Program",
                  bg: "hover:bg-orange-50/50",
                },
                {
                  title: "Donate",
                  desc: "Provide financial contributions directly to verified causes.",
                  href: "/donate",
                  action: "Support Our Work",
                  bg: "hover:bg-purple-50/50",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`bg-white p-4 sm:p-5 rounded-xl border border-slate-200 transition-all ${card.bg} flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="font-bold text-sm text-[#071527] mb-1">{card.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{card.desc}</p>
                  </div>
                  <Link
                    to={card.href as any}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange hover:text-orange-700"
                  >
                    <span>{card.action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 11. FREQUENTLY ASKED QUESTIONS (FAQ)                               */}
        {/* ================================================================== */}
        <section className="py-12 sm:py-14 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                11. Questions & Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  q: "Who can become an ISLAH member?",
                  a: "Individuals and institutions that share ISLAH's vision and commit to our membership principles can apply, subject to the organisation's approved policy and verification.",
                },
                {
                  q: "Is membership the same as making a donation?",
                  a: "No. Membership establishes a sustained association with ISLAH under our community charter, while a donation is a financial contribution toward specific causes or programs.",
                },
                {
                  q: "Can members volunteer with ISLAH?",
                  a: "Yes. Members can explore suitable volunteer initiatives in education, healthcare, relief, and skills according to their skills and availability.",
                },
                {
                  q: "Can members become mentors?",
                  a: "Absolutely. Members with academic, professional, vocational or entrepreneurial experience can mentor youth in our Community Learning Centres and skills programs.",
                },
                {
                  q: "Will I receive a membership card?",
                  a: "Yes. Following successful application confirmation, members receive an official Digital Membership Card with their unique Member ID and QR verification.",
                },
                {
                  q: "How long is membership valid?",
                  a: "Memberships are valid for 1 Year (or 2 Years if selected) from the date of activation, with automated reminders sent prior to expiry.",
                },
                {
                  q: "Can I renew my membership?",
                  a: "Yes. You can renew your membership directly from this page using the Self-Service portal with quick OTP verification.",
                },
                {
                  q: "Can I update my directory recognition preferences?",
                  a: "Yes. You can change between Public, Private, or Anonymous directory listing at any time by contacting the ISLAH coordination desk.",
                },
                {
                  q: "Is membership transferable?",
                  a: "No. Individual membership is personal to the registered member and cannot be transferred to another individual.",
                },
                {
                  q: "Can I be both a member and a donor?",
                  a: "Yes. Many of our patron members also support emergency healthcare patients and special learning campaigns as donors.",
                },
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-[#071527]">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-brand-orange shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 py-3.5 text-xs sm:text-sm text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 12. READY TO JOIN FINAL CTA                                        */}
        {/* ================================================================== */}
        <section className="py-12 sm:py-14 bg-slate-50 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Your Journey Begins Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1 mb-3">
              Ready to Become Part of ISLAH?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
              Become part of a community working for learning, participation, service and meaningful
              development across Bihar and beyond.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#membership-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm transition shadow-sm"
              >
                <span>Become a Member Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#membership-options"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition"
              >
                <span>Explore Options</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Official Membership Policy Modal */}
      <MembershipPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
