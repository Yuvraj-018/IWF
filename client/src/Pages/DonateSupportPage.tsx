import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Archive,
  ArrowDown,
  ArrowRight,
  Award,
  BookOpenCheck,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  Compass,
  Download,
  Eye,
  FileCheck2,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  Landmark,
  LifeBuoy,
  Lightbulb,
  MapPin,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import {
  FormSection,
  IconCards,
  JourneySteps,
  PolicyLinks,
  Section,
  SectionHeader,
  pastel,
} from "@/components/getInvolved/PageSections";
import { DonationForm } from "@/components/donation/DonationForm";
import { DONOR_TIERS, tierRangeText, type DonorTier } from "@/components/documents/donorTier";
import { DONATION_FAQS, GENERAL_SUPPORT, SUPPORT_AREA_INFO } from "@/content/donationContent";

/** Opens the donation form page in a new tab (with optional prefill). */
function donateHref(params: Record<string, string> = {}) {
  const q = new URLSearchParams(params).toString();
  return q ? `/donate?${q}` : "/donate";
}

const TIER_LOOK: Record<DonorTier, { icon: LucideIcon; cls: string }> = {
  General: { icon: Heart, cls: "bg-emerald-50 text-emerald-700" },
  Silver: { icon: Star, cls: "bg-slate-100 text-slate-600" },
  Gold: { icon: Award, cls: "bg-amber-50 text-amber-700" },
  Platinum: { icon: Sparkles, cls: "bg-sky-50 text-slate-800" },
};

const AFTER_YOU_GIVE = [
  { title: "Donation", desc: "Your contribution enters the applicable organisational process." },
  {
    title: "Programme / Organisational Need",
    desc: "Resources are considered against identified needs and priorities.",
  },
  { title: "Implementation", desc: "Appropriate programmes or activities are implemented." },
  {
    title: "Monitoring",
    desc: "Progress and implementation are reviewed according to the nature of the initiative.",
  },
  { title: "Documentation", desc: "Relevant records are maintained." },
  {
    title: "Learning & Reporting",
    desc: "Where applicable, outcomes, progress and learning are communicated.",
  },
  {
    title: "Continued Engagement",
    desc: "Supporters can remain connected through future opportunities.",
  },
];

const MORE_THAN_DONATION: {
  icon: LucideIcon;
  title: string;
  desc: string;
  cta: string;
  to: string;
}[] = [
  {
    icon: HeartHandshake,
    title: "Volunteer with ISLAH",
    desc: "Give your time and skills.",
    cta: "Volunteer With Us",
    to: "/volunteer",
  },
  {
    icon: Handshake,
    title: "Partner with ISLAH",
    desc: "Build a structured institutional collaboration.",
    cta: "Explore Partnership",
    to: "/partner",
  },
  {
    icon: GraduationCap,
    title: "Become a Mentor",
    desc: "Share knowledge and experience.",
    cta: "Become a Mentor",
    to: "/mentor",
  },
  {
    icon: Target,
    title: "Sponsor a Programme",
    desc: "Support a defined programme or initiative.",
    cta: "Sponsor a Programme",
    to: "/sponsor",
  },
  {
    icon: UserPlus,
    title: "Become a Member",
    desc: "Join the ISLAH community.",
    cta: "Become a Member",
    to: "/membership",
  },
];

const primaryBtn =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm transition-all active:scale-95";
const ghostBtn =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all active:scale-95 disabled:opacity-60";
const outlineBtn =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-sm font-semibold transition";

export default function DonateSupportPage() {
  const [brochureBusy, setBrochureBusy] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const downloadBrochure = async () => {
    setBrochureBusy(true);
    try {
      const { downloadSupportOptionsBrochure } =
        await import("@/components/donation/supportOptionsBrochure");
      await downloadSupportOptionsBrochure();
    } catch {
      toast.error("Could not prepare the brochure. Please try again.");
    } finally {
      setBrochureBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        {/* 01. Hero */}
        <SubpageHeroCarousel
          tag="DONATION & SUPPORT"
          title="Give With Purpose. Support Meaningful Change."
          subtitle="Every meaningful community initiative requires people who are willing to support it. Your contribution can help ISLAH strengthen opportunities for people and communities across rural and underserved areas through education, healthcare, livelihoods, empowerment, knowledge, environmental action, social development and humanitarian support."
          breadcrumbs={[
            { label: "Get Involved", href: "/get-involved" },
            { label: "Donation & Support" },
          ]}
        >
          <p className="hidden sm:block text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mb-3">
            Whether you choose to make a one-time contribution, provide recurring support, or
            support a specific programme, your generosity can become part of a larger effort toward
            meaningful and sustainable community development.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={donateHref()} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              Donate Now <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={downloadBrochure}
              disabled={brochureBusy}
              className={ghostBtn}
            >
              {brochureBusy ? "Preparing PDF…" : "Explore Support Our Work Options"}
              <ArrowDown className="w-4 h-4" />
            </button>
            <Link
              to="/about/community"
              search={{ tab: "donors" } as never}
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white underline underline-offset-4 ml-1 transition-colors"
            >
              Donor Community
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* 02. Why your support matters */}
        <Section>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="02. Why Your Support Matters"
                title="Together, We Can Help Create Possibilities."
              />
              <div className="-mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
                <p>
                  In many rural and underserved communities, access to quality education,
                  healthcare, skills, livelihoods, knowledge and essential support remains limited.
                </p>
                <p>
                  ISLAH works with communities to address these interconnected needs through
                  programmes designed around local priorities, participation and long-term
                  development.
                </p>
                <p>
                  Financial support helps create the resources needed to plan, implement, sustain
                  and strengthen these initiatives.
                </p>
              </div>
              <Link to="/programs" className={`${outlineBtn} mt-5`}>
                Explore Our Programmes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Your Support Can Help Us
              </h3>
              <IconCards
                columns={2}
                items={[
                  {
                    icon: TrendingUp,
                    title: "Expand Opportunities",
                    desc: "Support programmes that create access to learning, skills, health and community development.",
                  },
                  {
                    icon: MapPin,
                    title: "Reach Underserved Communities",
                    desc: "Help extend appropriate initiatives to communities where resources and opportunities may be limited.",
                  },
                  {
                    icon: Users,
                    title: "Strengthen Local Capacity",
                    desc: "Support training, knowledge-sharing, community participation and practical development.",
                  },
                  {
                    icon: RefreshCcw,
                    title: "Sustain Programmes",
                    desc: "Help maintain ongoing initiatives and the resources required for responsible implementation.",
                  },
                  {
                    icon: LifeBuoy,
                    title: "Respond to Humanitarian Needs",
                    desc: "Support appropriate relief, rehabilitation and community assistance when needs arise.",
                  },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* 03. Where your support can make a difference */}
        <Section tone="muted" id="support-areas">
          <SectionHeader
            eyebrow="03. Where Your Support Can Make a Difference"
            title="Eight Interconnected Areas. One Shared Purpose."
            desc="ISLAH works across interconnected areas of community development."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_AREA_INFO.map((a, i) => {
              const p = pastel(i);
              return (
                <div
                  key={a.name}
                  className={`rounded-xl border border-slate-200 bg-white p-5 transition ${p.hover} flex flex-col`}
                >
                  <span
                    className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.bg} ${p.icon}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-[#071527] mt-2.5 leading-snug">
                    {a.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed flex-1">
                    {a.desc}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <Link
                      to={a.to}
                      className="text-xs font-semibold text-brand-orange hover:text-orange-700"
                    >
                      {a.linkLabel} →
                    </Link>
                    <a
                      href={donateHref({ financialType: a.name })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-slate-500 hover:text-[#071527]"
                    >
                      Donate
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 text-xs font-bold">
              09
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-[#071527]">
                {GENERAL_SUPPORT}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                For supporters who want ISLAH to allocate their contribution according to current
                organisational priorities and programme needs. You do not need to select a programme
                to give.
              </p>
            </div>
            <a
              href={donateHref({ financialType: "General Donation" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#071527] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition shrink-0"
            >
              Give General Support <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Section>

        {/* 04. Your support, our responsibility */}
        <Section>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="04. Your Support. Our Responsibility."
                title="Responsible Support Begins with Transparency."
              />
              <div className="-mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
                <p>
                  When someone contributes to a social-purpose organisation, they place resources in
                  the organisation's care. ISLAH's approach is to treat that responsibility
                  seriously.
                </p>
                <p>
                  We aim to maintain clear processes for programme planning, financial
                  administration, documentation, monitoring and reporting in accordance with
                  applicable organisational requirements.
                </p>
                <p>
                  Where appropriate, supporters may receive relevant information regarding the use
                  and progress of their contribution.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Our Approach
              </h3>
              <IconCards
                columns={2}
                items={[
                  {
                    icon: Compass,
                    title: "Purpose",
                    desc: "Resources are connected to identified organisational and programme needs.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Responsibility",
                    desc: "Financial contributions are handled through appropriate organisational processes.",
                  },
                  {
                    icon: Archive,
                    title: "Documentation",
                    desc: "Relevant financial and programme records are maintained according to applicable requirements.",
                  },
                  {
                    icon: Eye,
                    title: "Monitoring",
                    desc: "Programmes and initiatives are reviewed according to their nature and implementation framework.",
                  },
                  {
                    icon: ClipboardList,
                    title: "Reporting",
                    desc: "Appropriate updates and reports may be provided to supporters where applicable.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Learning",
                    desc: "Programme experience and outcomes can inform future planning and improvement.",
                  },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* 05. Donor recognition */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="05. Donor Recognition"
            title="ISLAH Donor Recognition Levels"
            desc="Recognition levels are based on a single contribution. Every donor receives an acknowledgement, and public recognition is always your choice."
          />
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden max-w-4xl">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 sm:px-5 py-3">Level</th>
                  <th className="px-4 sm:px-5 py-3">Contribution</th>
                  <th className="px-4 sm:px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...DONOR_TIERS].reverse().map((t) => {
                  const look = TIER_LOOK[t.tier];
                  const Icon = look.icon;
                  return (
                    <tr key={t.tier} className="hover:bg-slate-50/60 transition">
                      <td className="px-4 sm:px-5 py-3">
                        <span className="inline-flex items-center gap-2.5">
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${look.cls}`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-sm font-semibold text-[#071527]">{t.label}</span>
                        </span>
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-xs sm:text-sm text-slate-700">
                        {tierRangeText(t)}
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-right">
                        <a
                          href={donateHref(t.min ? { amount: String(t.min) } : {})}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-orange hover:text-orange-700"
                        >
                          Donate Now <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 06. Donation journey */}
        <Section>
          <SectionHeader
            eyebrow="06. How Your Donation Journey Works"
            title="Simple. Secure. Documented."
          />
          <JourneySteps
            steps={[
              { title: "Choose", desc: "Select the type of support you would like to provide." },
              {
                title: "Contribute",
                desc: "Complete the donation through the available payment method.",
              },
              {
                title: "Confirm",
                desc: "Your contribution is recorded and processed through ISLAH's donation system.",
              },
              {
                title: "Receive",
                desc: "Receive the applicable donation acknowledgement or receipt.",
              },
              {
                title: "Stay Connected",
                desc: "Where applicable, receive relevant updates about ISLAH's work and impact.",
              },
              {
                title: "Continue the Journey",
                desc: "Remain connected through recurring support, volunteering, membership, mentorship or other opportunities.",
              },
            ]}
          />
        </Section>

        {/* 07. Donation form */}
        <FormSection
          id="donation-form"
          eyebrow="07. Donation & Community Support Form"
          title="Make a Difference. Empower Communities. Create Lasting Impact."
          desc="Your contribution can help ISLAH advance education, healthcare, women and youth empowerment, skills development, rural livelihoods, social justice, environmental sustainability and humanitarian relief. Complete this form to make a one-time or recurring contribution and select the area you wish to support."
        >
          <DonationForm />
        </FormSection>

        {/* 10. What happens after you give */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="10. What Happens After You Give?"
            title="Your Support Becomes Part of the Work."
            desc="A donation is not the end of the relationship. It can be the beginning of a continuing connection with ISLAH."
          />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {AFTER_YOU_GIVE.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="h-full rounded-xl border border-slate-200 bg-white p-4">
                  <span className="w-7 h-7 rounded-full bg-[#071527] text-white text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-[#071527] mt-2.5 leading-snug">
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                </div>
                {i < AFTER_YOU_GIVE.length - 1 && (
                  <span className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-slate-200 items-center justify-center text-brand-orange">
                    <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Section>

        {/* 11. More than donation */}
        <Section>
          <SectionHeader
            eyebrow="11. More Than Donation"
            title="There Are Many Ways to Stand with ISLAH."
            desc="Financial support is one way to contribute. Your involvement can grow according to your interests, skills and capacity."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MORE_THAN_DONATION.map((m, i) => {
              const p = pastel(i);
              const Icon = m.icon;
              return (
                <Link
                  key={m.to}
                  to={m.to}
                  className={`group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 ${p.hover} flex flex-col`}
                >
                  <span
                    className={`w-10 h-10 rounded-lg ${p.bg} ${p.icon} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-[#071527] mt-3 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed flex-1">
                    {m.desc}
                  </p>
                  <span className="mt-3 text-xs font-semibold text-brand-orange group-hover:text-orange-700">
                    {m.cta} →
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* 12. Commitment to responsible support */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="12. Our Commitment to Responsible Support"
            title="Your Contribution Deserves Responsible Stewardship."
            desc="ISLAH seeks to maintain responsible practices around the resources entrusted to it. Our approach includes:"
          />
          <IconCards
            columns={3}
            items={[
              {
                icon: Users,
                title: "Community-Centred Planning",
                desc: "Understanding community needs and programme priorities.",
              },
              {
                icon: Landmark,
                title: "Responsible Financial Administration",
                desc: "Maintaining appropriate financial processes and records.",
              },
              {
                icon: FileCheck2,
                title: "Programme Documentation",
                desc: "Recording relevant activities, progress and outcomes.",
              },
              {
                icon: Scale,
                title: "Accountability",
                desc: "Maintaining appropriate organisational oversight and responsibility.",
              },
              {
                icon: BookOpenCheck,
                title: "Transparency",
                desc: "Making relevant organisational information accessible where appropriate.",
              },
              {
                icon: TrendingUp,
                title: "Continuous Improvement",
                desc: "Using experience and learning to strengthen future programmes.",
              },
            ]}
          />
          <div className="mt-6">
            <PolicyLinks
              links={[
                { label: "Donation Policy", to: "/donation-policy" },
                { label: "Financial Transparency", to: "/financial-transparency-policy" },
                { label: "Refund Policy", to: "/refund-policy" },
                { label: "Privacy Policy", to: "/privacy-policy" },
              ]}
            />
          </div>
        </Section>

        {/* 13. FAQ */}
        <section className="py-12 sm:py-14 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                13. Questions & Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-2.5">
              {DONATION_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
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

        {/* 14. Final CTA */}
        <section className="py-12 sm:py-14 bg-slate-50 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              14. Ready to Support ISLAH?
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">
              Every Contribution Can Become Part of a Larger Effort.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Support ISLAH's work with rural and underserved communities through a contribution
              that reflects your interests and capacity.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <a
                href={donateHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryBtn}
              >
                Donate Now <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/programs" className={outlineBtn}>
                Explore Our Programmes <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className={outlineBtn}>
                Contact ISLAH <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <button
              type="button"
              onClick={downloadBrochure}
              disabled={brochureBusy}
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-slate-500 hover:text-[#071527] disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              {brochureBusy
                ? "Preparing PDF…"
                : "Download the Support Our Work Options brochure (PDF)"}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
