import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  BadgeCheck,
  Clock,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { Section } from "@/components/getInvolved/PageSections";
import { Field, inputClass } from "@/components/forms/formFields";
import { apiRequest } from "@/services/apiClient";
import { ORG } from "@/components/documents/orgDetails";

interface VerifiedDocument {
  documentNo: string;
  documentType: string;
  title: string;
  issuedTo: string;
  issuer?: string;
  issueDate: string;
  validTill: string | null;
  status: string;
  details?: Record<string, unknown>;
}

const TYPE_LABEL: Record<string, string> = {
  donation_receipt: "Donation Receipt",
  programme_certificate: "Donor Acknowledgement Card",
  membership_certificate: "Membership",
  volunteer_certificate: "Volunteer Certificate",
  sponsorship_certificate: "Sponsorship Certificate",
  institutional_document: "Statutory Document",
  authorisation_letter: "Authorisation Letter",
};

/** Detail fields shown publicly, with their labels. Anything else stays hidden. */
const DETAIL_LABEL: [string, string][] = [
  ["amount", "Amount"],
  ["cause", "Purpose"],
  ["category", "Category"],
  ["receiptNo", "Receipt No."],
  ["certificateNo", "Certificate No."],
  ["memberNo", "Member ID"],
  ["pan", "PAN"],
  ["district", "District"],
  ["state", "State"],
  ["regNo", "Registration No."],
  ["orderNo", "Order No."],
  ["csrNo", "CSR Registration No."],
  ["darpanId", "NGO Darpan ID"],
  ["jurisdiction", "Jurisdiction"],
  ["validFrom", "Valid From"],
];

const fmtDate = (s?: string | null) => {
  if (!s) return "";
  const d = new Date(s);
  return Number.isNaN(d.getTime())
    ? s
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

function StatusBadge({ status }: { status: string }) {
  const look =
    status === "Verified" || status === "Active" || status === "Success"
      ? {
          cls: "bg-emerald-50 border-emerald-200 text-emerald-700",
          Icon: ShieldCheck,
          label: "Verified",
        }
      : status === "Expired"
        ? { cls: "bg-amber-50 border-amber-200 text-amber-800", Icon: Clock, label: "Expired" }
        : {
            cls: "bg-red-50 border-red-200 text-red-700",
            Icon: ShieldAlert,
            label: status || "Not valid",
          };
  const { Icon } = look;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${look.cls}`}
    >
      <Icon className="w-3.5 h-3.5" /> {look.label}
    </span>
  );
}

export default function VerifyPage() {
  const search = useSearch({ strict: false }) as { ref?: string };
  const navigate = useNavigate();
  const [query, setQuery] = useState(search.ref ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifiedDocument | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lookup = async (ref: string) => {
    const clean = ref.trim();
    if (!clean) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await apiRequest<{ success: boolean; data?: VerifiedDocument; message?: string }>(
        `/verify/${encodeURIComponent(clean)}`,
      );
      if (res?.success && res.data) setResult(res.data);
      else setError(res?.message || `No document matching "${clean}" was found.`);
    } catch (err) {
      const status = (err as { statusCode?: number })?.statusCode;
      setError(
        status === 404
          ? `No document matching "${clean}" was found in ISLAH's records. Check the number and try again.`
          : "We could not reach the verification service. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.ref) {
      setQuery(search.ref);
      lookup(search.ref);
    }
    // Runs when the ref in the link changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.ref]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    if (clean === search.ref) lookup(clean);
    else navigate({ to: "/verify", search: { ref: clean } });
  };

  const details = result?.details ?? {};
  const detailRows = DETAIL_LABEL.filter(
    ([k]) =>
      details[k] !== undefined && details[k] !== null && details[k] !== "" && details[k] !== "N/A",
  ).map(
    ([k, label]) =>
      [
        label,
        k === "amount"
          ? `₹${Number(details[k]).toLocaleString("en-IN")}`
          : k === "validFrom"
            ? fmtDate(String(details[k]))
            : String(details[k]),
      ] as const,
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        <SubpageHeroCarousel
          tag="DOCUMENT VERIFICATION"
          title="Verify an ISLAH Document"
          subtitle="Check that a donation receipt, acknowledgement card, membership or statutory document was genuinely issued by ISLAH Welfare Foundation."
          breadcrumbs={[{ label: "Verify a Document" }]}
        />

        <Section tone="muted">
          <div className="max-w-3xl mx-auto space-y-5">
            <form
              onSubmit={submit}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6"
            >
              <Field
                name="ref"
                label="Document number"
                hint="Enter the receipt number (REC-…), certificate number (CERT-…), member ID (ISLAH-…) or registration number exactly as printed."
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={query}
                    maxLength={60}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. REC-2026-00008"
                    className={`${inputClass(false)} font-mono uppercase`}
                  />
                  <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#071527] hover:bg-slate-800 disabled:opacity-60 text-white text-sm font-semibold transition shrink-0"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    Verify
                  </button>
                </div>
              </Field>
            </form>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                      {TYPE_LABEL[result.documentType] ?? "Document"}
                    </span>
                    <h2 className="text-lg sm:text-xl font-semibold text-[#071527] mt-0.5">
                      {result.title}
                    </h2>
                  </div>
                  <StatusBadge status={result.status} />
                </div>
                <dl className="px-5 sm:px-6 py-4 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {(
                    [
                      ["Document No.", result.documentNo],
                      ["Issued To", result.issuedTo],
                      ["Issued By", result.issuer || ORG.name],
                      ["Issue Date", fmtDate(result.issueDate)],
                      ["Valid Till", fmtDate(result.validTill)],
                      ...detailRows,
                    ] as (readonly [string, string])[]
                  )
                    .filter(([, value]) => value)
                    .map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between gap-3 text-xs sm:text-[13px]"
                      >
                        <dt className="text-slate-500 shrink-0">{label}</dt>
                        <dd className="text-slate-800 text-right min-w-0 break-words font-medium">
                          {value}
                        </dd>
                      </div>
                    ))}
                </dl>
                <p className="px-5 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 flex items-start gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-px" />
                  This record comes from ISLAH's official registry. Personal details such as PAN are
                  partly hidden. For questions, write to {ORG.email}.
                </p>
              </div>
            )}
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
