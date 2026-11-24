import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCheck,
  Clock,
  Copy,
  Download,
  Mail,
  Phone,
  RefreshCw,
  RotateCcw,
  XCircle,
} from "lucide-react";
import {
  DonationCertificateSvg,
  downloadCertificatePdf,
  type DonationCertificateData,
} from "@/components/documents/DonationCertificate";
import {
  downloadDonationReceiptPdf,
  type DonationReceiptInfo,
} from "@/components/documents/donationReceipt";
import { formatDocMonth, useLogoDataUrl } from "@/components/documents/docUtils";
import { donorTierFor } from "@/components/documents/donorTier";
import { ORG } from "@/components/documents/orgDetails";
import {
  FREQUENCY_LABEL,
  PROGRAMME_MULTIPLE,
  PROGRAMME_SPECIFIC,
  RECOGNITION_LABEL,
  RECURRING_AUTO_DEBIT_ENABLED,
} from "@/content/donationContent";
import { donorDisplayName, type DonationValues } from "./donationModel";

export interface DonationOutcome {
  status: "success" | "pending" | "failed";
  values?: DonationValues;
  purpose?: string;
  paymentId?: string;
  paidAt?: Date;
  /** ISLAH-DON-YEAR-XXXXX */
  reference?: string;
  receiptNo?: string;
  reason?: string;
}

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function CopyChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="font-mono text-sm font-semibold text-[#071527] break-all">{value}</span>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(value).then(() => toast.success("Copied"))}
        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-white transition"
        aria-label={`Copy ${label.toLowerCase()}`}
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function DonorCare() {
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs">
      <a
        href={`tel:${ORG.phone.replace(/\s/g, "")}`}
        className="inline-flex items-center gap-1.5 font-semibold text-[#071527] hover:text-brand-orange"
      >
        <Phone className="w-3.5 h-3.5 text-brand-orange" /> {ORG.phone}
      </a>
      <a
        href={`mailto:${ORG.email}`}
        className="inline-flex items-center gap-1.5 font-semibold text-[#071527] hover:text-brand-orange"
      >
        <Mail className="w-3.5 h-3.5 text-brand-orange" /> {ORG.email}
      </a>
    </div>
  );
}

const card = "bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs";
const btnPrimary =
  "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition";
const btnOutline =
  "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-700 text-xs sm:text-sm font-semibold transition";
const btnDark =
  "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#071527] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition";

export function DonationConfirmation({
  outcome,
  onRetry,
  onDonateAgain,
}: {
  outcome: DonationOutcome;
  onRetry: () => void;
  onDonateAgain: () => void;
}) {
  if (outcome.status === "failed") {
    return (
      <div className={`${card} text-center`}>
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <XCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-[#071527]">Payment Unsuccessful</h3>
        <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
          Your payment could not be completed{outcome.reason ? `: ${outcome.reason}` : "."} No
          donation has been recorded. If any amount was debited, it is normally returned to your
          account by your bank or the payment gateway — please contact us if it is not.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          <button type="button" onClick={onRetry} className={btnPrimary}>
            <RefreshCw className="w-3.5 h-3.5" /> Try Again
          </button>
          <Link to="/contact" className={btnOutline}>
            Contact ISLAH
          </Link>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
          <DonorCare />
        </div>
      </div>
    );
  }

  if (outcome.status === "pending") {
    return (
      <div className={`${card} text-center`}>
        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          Payment Status: Pending Confirmation
        </span>
        <h3 className="text-xl sm:text-2xl font-semibold text-[#071527] mt-3">
          We're confirming your payment
        </h3>
        <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
          The payment gateway responded, but we could not yet confirm the transaction with ISLAH's
          donation system.{" "}
          <strong className="font-semibold text-[#071527]">Please do not pay again.</strong> Once
          the payment is verified, your receipt and acknowledgement card will be emailed to{" "}
          {outcome.values?.email || "you"}.
        </p>
        {outcome.paymentId && (
          <div className="mt-4">
            <CopyChip label="Payment ID" value={outcome.paymentId} />
            <p className="text-[11px] text-slate-500 mt-1.5">
              Keep this ID. If money was debited and you have not heard from us within one working
              day, contact donor care with it.
            </p>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          <Link to="/" className={btnDark}>
            Return to ISLAH <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
          <DonorCare />
        </div>
      </div>
    );
  }

  return <DonationSuccess outcome={outcome} onDonateAgain={onDonateAgain} />;
}

function DonationSuccess({
  outcome,
  onDonateAgain,
}: {
  outcome: DonationOutcome;
  onDonateAgain: () => void;
}) {
  const v = outcome.values!;
  const paidAt = outcome.paidAt ?? new Date();
  const amount = Number(v.amount) || 0;
  const tier = donorTierFor(amount);
  const donor = donorDisplayName(v);
  const tax = v.documentation === "tax";
  const recordsReady = Boolean(outcome.receiptNo);
  const logo = useLogoDataUrl();
  const svgRef = useRef<SVGSVGElement>(null);
  const [busy, setBusy] = useState<null | "receipt" | "card">(null);

  const programme =
    v.programmeChoice === PROGRAMME_SPECIFIC
      ? v.programme
      : v.programmeChoice === PROGRAMME_MULTIPLE
        ? v.programmes.join(", ")
        : v.programmeChoice || "Not specified";

  const receiptNo = outcome.receiptNo ?? "";
  const receipt: DonationReceiptInfo = {
    receiptNo,
    paidAt,
    donorName: tax ? v.legalName.trim() || donor : donor,
    donorType: v.donorCategory === "Individual" ? "Individual" : "Corporate",
    pan: tax ? v.pan.toUpperCase() : undefined,
    address:
      [v.address.trim(), v.city, v.state, v.country].filter(Boolean).join(", ") +
      (v.pin ? ` - ${v.pin}` : ""),
    email: v.email.trim(),
    phone: `${v.countryCode} ${v.phone}`,
    taxRequested: tax,
    amount,
    paymentMode: "Online",
    paymentStatus: "Successful",
    transactionId: outcome.paymentId ?? "",
    frequency: FREQUENCY_LABEL[v.frequency],
    purpose: outcome.purpose ?? "General Support",
  };

  const certificate: DonationCertificateData = {
    donorName: donor,
    amount,
    cause: outcome.purpose ?? "ISLAH Programmes",
    date: formatDocMonth(paidAt),
    year: paidAt.getFullYear(),
    certificateNo: /RCPT/i.test(receiptNo)
      ? receiptNo.replace(/RCPT/i, "CERT")
      : `CERT-${receiptNo}`,
  };

  const run = async (kind: "receipt" | "card") => {
    setBusy(kind);
    try {
      if (kind === "receipt") await downloadDonationReceiptPdf(receipt);
      else if (svgRef.current) await downloadCertificatePdf(svgRef.current, certificate);
    } catch {
      toast.error("Could not generate the PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const rows: [string, ReactNode][] = [
    ["Donor", donor],
    ["Donation Amount", fmtINR(amount)],
    ["Support Area", v.supportAreas.join(", ")],
    ["Programme / Initiative", programme],
    ["Donation Frequency", FREQUENCY_LABEL[v.frequency]],
    [
      "Payment Status",
      <span key="s" className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
        <CheckCheck className="w-3.5 h-3.5" /> Successful
      </span>,
    ],
    ["Recognition Preference", v.recognition ? RECOGNITION_LABEL[v.recognition] : "—"],
    ["Donor Acknowledgement", tier.label],
    ...(receiptNo ? ([["Receipt No.", receiptNo]] as [string, string][]) : []),
  ];

  return (
    <div className="space-y-5">
      <div className={card}>
        <div className="text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCheck className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            Payment Received
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#071527] mt-3">
            Thank you for supporting ISLAH Welfare Foundation
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Thank you for standing with communities working towards opportunity, dignity and
            sustainable development. Your contribution has been received successfully.
          </p>
          {outcome.reference && (
            <div className="mt-4">
              <CopyChip label="Your Donation Reference" value={outcome.reference} />
            </div>
          )}
        </div>

        <dl className="mt-6 pt-5 border-t border-slate-100 grid sm:grid-cols-2 gap-x-8 gap-y-2">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 text-xs sm:text-[13px]">
              <dt className="text-slate-500 shrink-0">{label}</dt>
              <dd className="text-slate-800 text-right min-w-0 break-words">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => run("receipt")}
              disabled={!recordsReady || busy !== null}
              className={btnPrimary}
            >
              <Download className="w-3.5 h-3.5" />
              {busy === "receipt" ? "Preparing…" : "Download Donation Receipt"}
            </button>
            <button
              type="button"
              onClick={() => run("card")}
              disabled={!recordsReady || !logo || busy !== null}
              className={btnOutline}
            >
              <Download className="w-3.5 h-3.5" />
              {busy === "card" ? "Preparing…" : "Download Acknowledgement Card"}
            </button>
            <Link to="/" className={btnDark}>
              Return to ISLAH <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[11px] text-slate-500 text-center mt-2.5 leading-relaxed">
            {recordsReady ? (
              <>
                Your donation receipt and acknowledgement card have also been sent to{" "}
                <span className="font-medium text-slate-700">{v.email.trim()}</span>.
              </>
            ) : (
              "Your receipt is being prepared and will be emailed to you shortly."
            )}{" "}
            {tax &&
              "Tax-deduction documentation is issued only where ISLAH is eligible and the applicable requirements are met."}
          </p>
          {v.frequency !== "One Time" && (
            <p className="text-[11px] text-slate-500 text-center mt-1">
              {RECURRING_AUTO_DEBIT_ENABLED
                ? `Your ${v.frequency.toLowerCase()} mandate is active. You can cancel it at any time.`
                : `We'll remind you before each ${v.frequency === "Monthly" ? "month" : "year"}'s contribution — nothing is charged automatically.`}
            </p>
          )}
        </div>
      </div>

      {recordsReady && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            With Gratitude
          </span>
          <h4 className="text-base sm:text-lg font-semibold text-[#071527] mt-0.5">
            Your {tier.label} Acknowledgement Card
          </h4>
          <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 bg-white">
            <DonationCertificateSvg ref={svgRef} data={certificate} logo={logo} />
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={onDonateAgain}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-slate-600 hover:bg-white text-xs font-medium transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Make another donation
        </button>
      </div>
    </div>
  );
}
