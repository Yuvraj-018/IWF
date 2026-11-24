import { useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  Download,
  Globe2,
  Heart,
  Landmark,
  Lock,
  Mail,
  Phone,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { FormSection, Section, SectionHeader } from "@/components/getInvolved/PageSections";
import { DonationForm } from "@/components/donation/DonationForm";
import { ORG } from "@/components/documents/orgDetails";
import { useAllPatients } from "@/services/patientService";
import {
  OFFLINE_BANK_DETAILS,
  prefillFromSearch,
  type DonateSearch,
} from "@/content/donationContent";

const OFFICIAL_BANK_PDF =
  "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/docs/official_banking_and_contact_details.pdf";

function CopyRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-slate-100 last:border-0 text-xs sm:text-[13px]">
      <span className="text-slate-500 shrink-0">{label}</span>
      <span className="flex items-center gap-1.5 min-w-0">
        <span
          className={`text-[#071527] font-semibold text-right break-words ${mono ? "font-mono" : ""}`}
        >
          {value}
        </span>
        {mono && (
          <button
            type="button"
            onClick={() =>
              navigator.clipboard?.writeText(value).then(() => {
                setCopied(true);
                toast.success(`${label} copied`);
                setTimeout(() => setCopied(false), 1500);
              })
            }
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </span>
    </div>
  );
}

export default function DonatePage() {
  const search = useSearch({ strict: false }) as DonateSearch;
  const prefill = useMemo(() => prefillFromSearch(search), [search]);
  const { patients } = useAllPatients();
  const patient = prefill.patientSlug
    ? patients.find((p) => p.slug === prefill.patientSlug)
    : undefined;

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        <SubpageHeroCarousel
          tag="DONATE • ISLAH WELFARE FOUNDATION"
          title="Donation & Community Support Form"
          subtitle="Make a difference. Empower communities. Create lasting impact. Make a one-time or recurring contribution and choose the area you wish to support."
          breadcrumbs={[
            { label: "Get Involved", href: "/get-involved" },
            { label: "Donation & Support", href: "/donate-and-support" },
            { label: "Donation Form" },
          ]}
        >
          {patient ? (
            <div className="inline-flex items-center gap-3 p-2.5 pr-5 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md max-w-md">
              <img
                src={patient.image}
                alt={patient.name}
                className="w-11 h-11 rounded-xl object-cover shrink-0"
              />
              <div className="text-xs">
                <p className="font-semibold text-white">
                  Emergency patient support: {patient.name}
                </p>
                <p className="text-slate-300">
                  {patient.disease} • {patient.hospital}
                </p>
              </div>
            </div>
          ) : prefill.contextLabel ? (
            <div className="inline-flex items-center gap-3 p-2 pr-5 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md max-w-md">
              <span className="w-9 h-9 rounded-xl bg-brand-orange text-white flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-white" />
              </span>
              <div className="text-xs">
                <p className="text-slate-300">You are supporting</p>
                <p className="font-semibold text-white">{prefill.contextLabel}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-orange" /> Secure payment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ReceiptText className="w-3.5 h-3.5 text-brand-orange" /> Instant receipt
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" /> No platform fee
              </span>
            </div>
          )}
        </SubpageHeroCarousel>

        <FormSection
          id="donation-form"
          eyebrow="Donation & Community Support Form"
          title="Make a Difference. Empower Communities. Create Lasting Impact."
          desc="Your contribution can help ISLAH advance education, healthcare, women and youth empowerment, skills development, rural livelihoods, social justice, environmental sustainability and humanitarian relief. Complete this form to make a one-time or recurring contribution and select the area you wish to support."
        >
          <DonationForm prefill={prefill} />
          <p className="mt-4 text-xs text-slate-500 text-center">
            Want to know how your contribution is used?{" "}
            <Link
              to="/donate-and-support"
              className="font-semibold text-brand-orange hover:text-orange-700"
            >
              Explore Donation & Support →
            </Link>
          </p>
        </FormSection>

        {/* Offline contribution */}
        <Section id="offline-contribution">
          <SectionHeader
            eyebrow="Other Ways to Give"
            title="Contribute Offline"
            desc="Prefer a bank transfer, cheque or demand draft? Use ISLAH's official details below."
            action={
              <a
                href={OFFICIAL_BANK_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition"
              >
                <Download className="w-4 h-4 text-brand-orange" /> Official Banking Details (PDF)
              </a>
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#071527]">
                  Bank Transfer (Indian Nationals)
                </h3>
              </div>
              <CopyRow label="Account Name" value={OFFLINE_BANK_DETAILS.accountName} />
              <CopyRow label="Account No." value={OFFLINE_BANK_DETAILS.accountNo} mono />
              <CopyRow label="Account Type" value={OFFLINE_BANK_DETAILS.accountType} />
              <CopyRow label="IFS Code" value={OFFLINE_BANK_DETAILS.ifsc} mono />
              <CopyRow label="MICR Code" value={OFFLINE_BANK_DETAILS.micr} />
              <CopyRow label="Bank" value={OFFLINE_BANK_DETAILS.bankName} />
              <CopyRow label="Branch" value={OFFLINE_BANK_DETAILS.branch} />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#071527]">
                  By Cheque / Demand Draft
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Make the cheque or draft payable to
              </p>
              <p className="mt-1.5 px-3 py-2 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm font-semibold text-brand-green">
                {OFFLINE_BANK_DETAILS.chequePayableTo}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                and send it to
              </p>
              <p className="mt-1.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#071527] leading-relaxed">
                {OFFLINE_BANK_DETAILS.chequeAddress}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Globe2 className="w-5 h-5" />
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#071527]">
                  Foreign Passport Holders
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This option is not active yet. Donations by foreign citizens require registration
                under the Foreign Contribution (Regulation) Act, which ISLAH is in the process of
                obtaining.
              </p>
              <span className="inline-flex mt-3 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold">
                Activating shortly
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
              After a transfer or cheque, email the transaction details with your postal address
              (and PAN, if you need tax-deduction documentation) so we can issue your receipt.
              Tax-related documentation is subject to ISLAH's eligibility and applicable legal
              requirements.
            </p>
            <div className="flex flex-col gap-1 text-xs font-semibold shrink-0">
              <a
                href={`mailto:${ORG.email}`}
                className="inline-flex items-center gap-1.5 text-[#071527] hover:text-brand-orange"
              >
                <Mail className="w-3.5 h-3.5 text-brand-orange" /> {ORG.email}
              </a>
              <a
                href={`tel:${ORG.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 text-[#071527] hover:text-brand-orange"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange" /> {ORG.phone}
              </a>
            </div>
          </div>
        </Section>

        <section className="py-10 sm:py-12 bg-slate-50 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#071527]">
              There Are Many Ways to Stand with ISLAH.
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Volunteer, mentor, partner, sponsor a programme or become a member.
            </p>
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-sm font-semibold transition"
            >
              Explore Get Involved <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
