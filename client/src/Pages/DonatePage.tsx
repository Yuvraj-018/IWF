import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearch } from "@tanstack/react-router";
import { usePatients } from "@/services/patientService";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  CreditCard,
  Building2,
  Banknote,
  CheckCircle2,
  Download,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Award,
  Star,
  Sparkles,
  Phone,
  MapPin,
  AlertCircle,
  QrCode,
  Copy,
  Check,
  BadgeCheck,
  FileText,
  Upload,
  Lock,
  Printer,
  RotateCcw,
  HelpCircle,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import { StandardPageHero } from "@/components/layout/StandardPageHero";
import type { RoleType } from "@/components/forms/RoleFormModal";
import {
  downloadDonationReceiptPdf,
  printDonationReceipt,
  type DonationReceiptInfo,
} from "@/components/documents/donationReceipt";
import { uploadSingleFile } from "@/services/uploadService";
import { DonationReceiptView } from "@/components/documents/DonationReceiptView";
import {
  DonationCertificateViewer,
  type DonationCertificateData,
} from "@/components/documents/DonationCertificate";
import { DONOR_TIERS, donorTierFor, tierRangeText } from "@/components/documents/donorTier";
import { formatDocMonth } from "@/components/documents/docUtils";
import { DonationSummaryCard, type ReminderChoice } from "@/components/donation/DonationSummaryCard";
import {
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";
import { INDIAN_STATES } from "@/content/locations";
import { PhoneCodeSelect } from "@/components/forms/PhoneCodeSelect";
import { CityField } from "@/components/forms/formFields";
import { isValidPhone, maxDigits, phoneError, phonePlaceholder } from "@/components/forms/phone";
import { openRazorpayModal } from "@/utils/razorpay";

// ─── Financial Types from Page 70 & 71 of PDF ────────────────────────────────
const FINANCIAL_TYPES = [
  "Medical Emergency",
  "Education & Learning",
  "Health Care & Well-being",
  "Women & Youth Empowerment",
  "Skills, Livelihoods & Entrepreneurship",
  "Social Justice & Legal Empowerment",
  "Agriculture & Rural Livelihoods",
  "Environment & Sustainability",
  "Humanitarian Relief & Rehabilitation",
  "General Donation",
  "Capital Donation",
];

export function normalizeFinancialType(param?: string): string {
  if (!param) return "General Donation";
  const decoded = decodeURIComponent(param).trim();
  const exact = FINANCIAL_TYPES.find((f) => f.toLowerCase() === decoded.toLowerCase());
  if (exact) return exact;

  const clean = decoded.toLowerCase();
  if (
    clean.includes("medic") ||
    clean.includes("patient") ||
    clean.includes("emergency") ||
    clean.includes("hospital") ||
    clean.includes("ambulance") ||
    clean.includes("cancer") ||
    clean.includes("diabetes") ||
    clean.includes("menstrual") ||
    clean.includes("cles")
  ) {
    return clean.includes("emergency") || clean.includes("patient") || clean.includes("critical")
      ? "Medical Emergency"
      : "Health Care & Well-being";
  }
  if (clean.includes("edu") || clean.includes("school") || clean.includes("clc") || clean.includes("learn") || clean.includes("scholarship")) {
    return "Education & Learning";
  }
  if (clean.includes("health")) {
    return "Health Care & Well-being";
  }
  if (clean.includes("women") || clean.includes("shg") || clean.includes("gender") || clean.includes("girl")) {
    return "Women & Youth Empowerment";
  }
  if (clean.includes("skill") || clean.includes("livelihood") || clean.includes("entrepreneur") || clean.includes("vocation")) {
    return "Skills, Livelihoods & Entrepreneurship";
  }
  if (clean.includes("justice") || clean.includes("legal") || clean.includes("rights") || clean.includes("grievance")) {
    return "Social Justice & Legal Empowerment";
  }
  if (clean.includes("agri") || clean.includes("farm") || clean.includes("crop")) {
    return "Agriculture & Rural Livelihoods";
  }
  if (clean.includes("env") || clean.includes("green") || clean.includes("tree") || clean.includes("clean") || clean.includes("climate") || clean.includes("water") || clean.includes("plastic")) {
    return "Environment & Sustainability";
  }
  if (clean.includes("relief") || clean.includes("disaster") || clean.includes("rehab") || clean.includes("shelter") || clean.includes("flood") || clean.includes("winter") || clean.includes("ration")) {
    return "Humanitarian Relief & Rehabilitation";
  }
  return "General Donation";
}

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

// ─── Offline Bank Details from Page 72 of PDF ────────────────────────────────
const OFFLINE_BANK_DETAILS = {
  accountNo: "1004451030069725",
  accountType: "Saving Account",
  accountName: "Islah Welfare Foundation",
  ifsc: "PUNBOMBGB06",
  micr: "800811002",
  bankName: "Bihar Gramin Bank",
  branch: "Baghant, Manigachi, Darbhanga, Bihar- 847423",
  chequePayableTo: "ISLAH WELFARE FOUNDATION",
  chequeAddress: "B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025",
  contactNo: "9811861633",
  contactEmail: "info@iwfindia.org",
};

// ─── Schema Matching Page 70 ──────────────────────────────────────────────────
const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/**
 * All checks run in one pass (superRefine), so every problem is shown at once —
 * zod skips refinements while any base field fails, which would hide the tax fields.
 */
const donorSchema = z
  .object({
    financialType: z.string(),
    patientSlug: z.string().optional(),
    amount: z.any(),
    reminder: z.enum(["None", "Monthly", "Yearly"]),
    donorType: z.enum(["Individual", "Corporate"]),
    fullName: z.string(),
    countryCode: z.string(),
    phone: z.string(),
    email: z.string(),
    state: z.string(),
    city: z.string(),
    taxExemption: z.boolean(),
    pan: z.string().optional(),
    panFile: z.any().optional(),
    address: z.string().optional(),
    pincode: z.string().optional(),
    photoFile: z.any().optional(),
    websiteConsent: z.enum(["Yes", "No"]),
    citizenDeclaration: z.boolean(),
    termsAgreement: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const issue = (path: string, message: string) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [path] });

    if (!data.financialType) issue("financialType", "Please choose a cause");
    const amount = Number(data.amount);
    if (!Number.isFinite(amount) || amount <= 0) issue("amount", "Enter an amount");
    else if (amount < 100) issue("amount", "The minimum donation is ₹100");

    const name = data.fullName.trim();
    if (name.length < 2) issue("fullName", "Enter your name");
    else if (data.donorType === "Individual" && /[0-9]/.test(name))
      issue("fullName", "Name cannot contain numbers");

    if (!data.phone) issue("phone", "Enter your mobile number");
    else if (!isValidPhone(data.countryCode, data.phone))
      issue("phone", phoneError(data.countryCode, data.phone) ?? "Enter a valid mobile number");
    if (!z.string().email().safeParse(data.email.trim()).success)
      issue("email", "Enter a valid email address");
    if (!data.state) issue("state", "Select your state");
    if (data.city.trim().length < 2) issue("city", "Select or type your city / district");

    if (data.taxExemption) {
      const pan = (data.pan ?? "").toUpperCase();
      if (!pan) issue("pan", "PAN is required for a tax-deduction receipt");
      else if (!PAN_PATTERN.test(pan)) issue("pan", "Enter a valid PAN, e.g. ABCDE1234F");
      if (!(data.panFile instanceof File)) issue("panFile", "Upload a photo or PDF of your PAN card");
      if (!data.address || data.address.trim().length < 5) issue("address", "Enter your postal address");
      if (!/^\d{6}$/.test(data.pincode ?? "")) issue("pincode", "Enter a valid 6-digit PIN code");
    }

    if (!data.citizenDeclaration) issue("citizenDeclaration", "Please confirm this declaration");
    if (!data.termsAgreement)
      issue("termsAgreement", "Please accept the Terms of Use and Donor Privacy Policy");
  });

type DonorFormData = z.infer<typeof donorSchema>;

const inputCls =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 mt-1 text-[11px] font-medium text-red-600">
      <AlertCircle className="w-3 h-3 shrink-0" /> {msg}
    </p>
  );
}

const labelCls = "block text-xs font-semibold text-slate-700 mb-1.5";
const chipCls = "py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold border transition cursor-pointer";
const chipOn = "bg-orange-50 text-[#071527] border-brand-orange ring-1 ring-brand-orange/25";
const chipOff = "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pb-2 mb-4 border-b border-slate-100">
      <span className="w-6 h-6 rounded-full bg-[#071527] text-white text-xs font-semibold flex items-center justify-center">
        {n}
      </span>
      <h2 className="text-base sm:text-lg font-semibold text-slate-900">{title}</h2>
    </div>
  );
}

function FilePick({
  name,
  placeholder,
  accept,
  onPick,
}: {
  name: string | null;
  placeholder: string;
  accept: string;
  onPick: (file: File | null) => void;
}) {
  return (
    <label className="flex items-center gap-2 h-10 px-3 rounded-lg border border-dashed border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer transition">
      <Upload className="w-3.5 h-3.5 text-brand-orange shrink-0" />
      <span className="truncate">{name || placeholder}</span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          if (file && file.size > 5 * 1024 * 1024) {
            toast.error("Please choose a file under 5 MB.");
            e.target.value = "";
            return;
          }
          onPick(file);
        }}
      />
    </label>
  );
}

export default function DonatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number | "Other">(2000);
  const [panFileName, setPanFileName] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const [receiptNumber, setReceiptNumber] = useState("ISLAH/RCPT/2026-27/000001");
  const [paidAt, setPaidAt] = useState<Date>(() => new Date());
  const [transactionId, setTransactionId] = useState("pay_sample_123");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // Read URL search params (e.g. ?financialType=Education+%26+Learning&initiative=CLC&amount=5000)
  const search = useSearch({ strict: false }) as {
    patientId?: string;
    amount?: string;
    financialType?: string;
    program?: string;
    initiative?: string;
    cause?: string;
    type?: string;
  };
  const { patients: livePatients } = usePatients(true);
  const contextPatient = search.patientId
    ? livePatients.find((p) => p.slug === search.patientId)
    : null;
  const contextAmount = search.amount ? parseInt(search.amount, 10) : undefined;
  const rawFinancialType = search.financialType || search.program || search.type || search.cause;
  const initialFinancialType = contextPatient
    ? "Medical Emergency"
    : rawFinancialType
    ? normalizeFinancialType(rawFinancialType)
    : "General Donation";

  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonorFormData>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      financialType: initialFinancialType,
      patientSlug: contextPatient?.slug ?? "",
      amount: contextAmount || 2000,
      reminder: "None",
      donorType: "Individual",
      fullName: "",
      countryCode: "+91",
      phone: "",
      email: "",
      state: "",
      city: "",
      taxExemption: false,
      pan: "",
      address: "",
      pincode: "",
      websiteConsent: "Yes",
      citizenDeclaration: false,
      termsAgreement: false,
    },
  });

  const watchFinancialType = watch("financialType");
  const watchAmount = watch("amount") || 0;
  const watchReminder = watch("reminder") as ReminderChoice;
  const watchPatientSlug = watch("patientSlug");
  const selectedPatient =
    watchFinancialType === "Medical Emergency" && watchPatientSlug
      ? livePatients.find((p) => p.slug === watchPatientSlug)
      : undefined;
  const watchDonorType = watch("donorType");
  const watchFullName = watch("fullName");
  const watchCountryCode = watch("countryCode");
  const watchPhone = watch("phone");
  const watchEmail = watch("email");
  const watchAddress = watch("address");
  const watchState = watch("state");
  const watchCity = watch("city");
  const watchPincode = watch("pincode");
  const watchTaxExemption = watch("taxExemption");
  const watchPan = watch("pan");

  useEffect(() => {
    if (initialFinancialType) {
      setValue("financialType", initialFinancialType);
    }
    if (contextAmount) {
      setValue("amount", contextAmount);
    }
  }, [initialFinancialType, contextAmount, setValue]);

  const [docBusy, setDocBusy] = useState<null | "download" | "print">(null);

  // Full postal address only when a tax receipt was requested; otherwise city and state.
  const fullFormattedAddress =
    watchTaxExemption && watchAddress
      ? `${watchAddress}, ${[watchCity, watchState].filter(Boolean).join(", ")}${watchPincode ? ` - ${watchPincode}` : ""}`
      : [watchCity, watchState, "India"].filter(Boolean).join(", ");

  const receiptInfo: DonationReceiptInfo = {
    receiptNo: receiptNumber,
    paidAt,
    donorName: watchFullName || "Donor",
    donorType: watchDonorType,
    pan: watchTaxExemption ? watchPan : undefined,
    address: fullFormattedAddress,
    email: watchEmail || "-",
    phone: watchPhone ? `${watchCountryCode || "+91"} ${watchPhone}` : "-",
    taxRequested: Boolean(watchTaxExemption),
    amount: Number(watchAmount) || 0,
    transactionId,
    frequency: "One Time",
    purpose: watchFinancialType || "General Donation",
    beneficiary: selectedPatient?.name,
  };

  const certificateData: DonationCertificateData = {
    donorName: receiptInfo.donorName,
    amount: receiptInfo.amount,
    cause: receiptInfo.purpose,
    date: formatDocMonth(paidAt),
    year: paidAt.getFullYear(),
    certificateNo: /RCPT/i.test(receiptNumber)
      ? receiptNumber.replace(/RCPT/i, "CERT")
      : `CERT-${receiptNumber}`,
  };
  const donorTier = donorTierFor(receiptInfo.amount);

  const runReceiptAction = async (kind: "download" | "print") => {
    setDocBusy(kind);
    try {
      if (kind === "download") await downloadDonationReceiptPdf(receiptInfo);
      else await printDonationReceipt(receiptInfo);
    } catch {
      toast.error("Could not generate the receipt. Please try again.");
    } finally {
      setDocBusy(null);
    }
  };

  useEffect(() => {
    if (contextAmount) {
      setValue("amount", contextAmount);
      setSelectedPreset("Other");
    }
  }, [contextAmount, setValue]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(key);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const handlePresetClick = (val: number) => {
    setSelectedPreset(val);
    setValue("amount", val, { shouldValidate: true });
  };

  const handleOtherClick = () => {
    setSelectedPreset("Other");
  };

  const onSubmit = async (data: DonorFormData) => {
    try {
      setPaymentError(null);
      setIsPaymentProcessing(true);

      const { createPaymentOrder, verifyPayment } = await import("@/services/donationService");

      // STEP 1: Create Razorpay Order with backend
      const orderData = await createPaymentOrder({
        amount: Number(data.amount),
        receipt: `rcpt_${Date.now()}`,
        notes: {
          donorName: data.fullName,
          email: data.email,
          phone: data.phone,
          cause: data.financialType,
          patientSlug: data.patientSlug || "",
        },
      });

      if (!orderData || !orderData.order_id) {
        throw new Error(orderData?.message || "Failed to create payment order. Please try again.");
      }

      // STEP 2: Open Razorpay Standard Checkout Modal
      const paymentResult = await openRazorpayModal({
        orderId: orderData.order_id,
        amount: orderData.amount,
        keyId: orderData.key_id,
        name: "ISLAH Welfare Foundation",
        description: `Donation: ${data.financialType}`,
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: `${data.countryCode || "+91"}${data.phone}`,
        },
        notes: {
          financialType: data.financialType,
          pan: data.pan || "",
        },
      });

      // STEP 3: Upload confidential PAN card to private bucket & optional photo
      let panFileUrl: string | undefined = undefined;
      if (data.taxExemption && data.panFile instanceof File) {
        try {
          const panUpload = await uploadSingleFile(data.panFile, "donations/pan", true);
          panFileUrl = panUpload.url;
        } catch (panErr) {
          console.warn("PAN document upload warning, proceeding with payment:", panErr);
        }
      }

      let donorPhotoUrl: string | undefined = undefined;
      if (data.photoFile instanceof File) {
        try {
          const photoUpload = await uploadSingleFile(data.photoFile, "donors/photos", false);
          donorPhotoUrl = photoUpload.url;
        } catch (photoErr) {
          console.warn("Donor photo upload warning, proceeding with payment:", photoErr);
        }
      }

      // STEP 4: Verify Payment Signature with backend
      const verifyData = await verifyPayment({
        razorpay_order_id: paymentResult.razorpay_order_id,
        razorpay_payment_id: paymentResult.razorpay_payment_id,
        razorpay_signature: paymentResult.razorpay_signature,
        donationData: {
          donorName: data.fullName,
          donorType: data.donorType,
          email: data.email,
          phone: data.phone,
          countryCode: data.countryCode,
          address: data.taxExemption ? data.address : `${data.city}, ${data.state}`,
          city: data.city,
          state: data.state,
          pincode: data.taxExemption ? data.pincode : "",
          financialType: data.financialType,
          frequency: "One Time",
          reminder: data.reminder,
          amount: data.amount,
          taxExemption: data.taxExemption,
          pan: data.taxExemption ? data.pan?.toUpperCase() : undefined,
          panFileUrl,
          donorPhotoUrl,
          patientSlug: data.financialType === "Medical Emergency" ? data.patientSlug || undefined : undefined,
          websiteConsent: data.websiteConsent,
        },
      });

      if (!verifyData.success) {
        throw new Error(verifyData.message || "Payment signature verification failed. Please contact support.");
      }

      const assignedReceiptNo =
        verifyData.receiptNo ||
        verifyData.entity?.receiptNo ||
        `ISLAH/RCPT/${new Date().getFullYear()}/${Date.now()}`;

      setTransactionId(paymentResult.razorpay_payment_id);
      setReceiptNumber(assignedReceiptNo);
      setPaidAt(new Date());
      setSubmitted(true);
      toast.success(
        data.taxExemption
          ? "Payment verified. Your receipt with the tax-documentation request is ready."
          : "Payment verified. Your donation receipt is ready.",
      );

      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: any) {
      console.error("Donation Checkout Error:", err);
      setPaymentError(err.message || "Payment processing was cancelled or failed.");
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── Hero Header: Standard Deep Navy Hero ─────────────────────────── */}
        <StandardPageHero
          badge="SUPPORT OUR MISSION • DONATE"
          title="Donate & Make a Difference"
          description="Your contribution empowers lives, provides emergency medical aid to impoverished patients, and educates vulnerable children. Eligible donations may qualify for tax deduction, subject to applicable law."
          breadcrumb={[{ label: "Donate & Support" }]}
          taglineTop="Give Hope"
          taglineMid="Save A Life"
          taglineBot="Today"
          verticalWords={["HOPE", "HEALTH", "DIGNITY", "IMPACT"]}
          waveFill="#f8fafc"
        >
          {contextPatient && (
            <div className="p-3 bg-white/10 border border-white/20 rounded-2xl flex items-center gap-3 max-w-md backdrop-blur-md mb-2">
              <img
                src={contextPatient.image}
                alt={contextPatient.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="text-xs">
                <p className="font-bold text-white">Emergency Patient Support: {contextPatient.name}</p>
                <p className="text-emerald-200">{contextPatient.disease} • {contextPatient.hospital}</p>
              </div>
            </div>
          )}
          {!contextPatient && (search.initiative || search.cause || (rawFinancialType && initialFinancialType !== "General Donation")) && (
            <div className="mt-4 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 pr-5 border border-white/20">
              <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div className="text-xs text-left">
                <p className="font-bold text-white text-sm">
                  {search.initiative || search.cause ? `Supporting: ${search.initiative || search.cause}` : `Supporting: ${initialFinancialType}`}
                </p>
                <p className="text-emerald-200">{initialFinancialType} • Islah Welfare Foundation</p>
              </div>
            </div>
          )}
        </StandardPageHero>

        {/* ─── Two-Column Donation Section (Exact Reproduction of Page 70) ──── */}
        <section ref={formRef} className="py-10 sm:py-12 bg-slate-50/70 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              /* ── Dedicated Post-Payment Presentation (Upper Thank You + Receipt + Bottom Actions) ── */
              <div className="max-w-3xl mx-auto space-y-8 text-center">
                {/* Upper side: Celebratory Thank You Message */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" /> Payment Successful
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527]">
                      Thank You for Your Generous Donation!
                    </h2>
                    <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                      Your contribution of{" "}
                      <strong className="text-[#071527] font-semibold">
                        ₹{Number(watchAmount).toLocaleString("en-IN")}
                      </strong>{" "}
                      empowers lives, educates underprivileged children and strengthens communities.
                    </p>
                  </div>

                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
                    {[
                      ["Receipt ID", receiptNumber],
                      ["Amount Paid", `₹${Number(watchAmount).toLocaleString("en-IN")}`],
                      ["Tax Documentation", watchTaxExemption ? "Requested" : "Not requested"],
                      ["Recognition", donorTier.label],
                    ].map(([k, val]) => (
                      <div key={k} className="rounded-xl bg-slate-50 border border-slate-200 p-2.5">
                        <dt className="text-[11px] text-slate-500">{k}</dt>
                        <dd className="text-xs font-medium text-[#071527] truncate">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Receipt */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 text-left space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[#071527]">Your Donation Receipt</h3>
                      <p className="text-xs text-slate-500">
                        {watchTaxExemption
                          ? "Includes your tax-deduction documentation request."
                          : "General donation receipt — no tax-deduction documentation requested."}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => runReceiptAction("download")}
                        disabled={docBusy !== null}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-xs font-semibold transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {docBusy === "download" ? "Preparing…" : "Download PDF"}
                      </button>
                      <button
                        type="button"
                        onClick={() => runReceiptAction("print")}
                        disabled={docBusy !== null}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-700 text-xs font-semibold transition"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        {docBusy === "print" ? "Preparing…" : "Print"}
                      </button>
                    </div>
                  </div>
                  <DonationReceiptView info={receiptInfo} />
                </div>

                {/* Appreciation certificate */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 text-left space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                      With Gratitude
                    </span>
                    <h3 className="text-lg font-semibold text-[#071527] mt-0.5">
                      Your {donorTier.label} Certificate
                    </h3>
                    <p className="text-xs text-slate-500">
                      A certificate of appreciation for your contribution. Download it or share it
                      with friends and family.
                    </p>
                  </div>
                  <DonationCertificateViewer data={certificateData} />
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      window.scrollTo({ top: formRef.current?.offsetTop || 300, behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm transition cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-500" /> Make Another Donation
                  </button>
                </div>

                {/* What Happens Next & Donor Helpline Card */}
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 text-xs text-slate-600 shadow-sm">
                    <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                      <Shield className="w-4 h-4 text-brand-green" /> What Happens Next?
                    </h4>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>
                        {watchTaxExemption
                          ? "Your tax-documentation request is recorded. The official Form 114 certificate is issued after statutory filing, where eligible."
                          : `A confirmation of your donation has been sent to ${watchEmail || "your email"}.`}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>You will receive regular progress reports on how your contribution is making an impact.</span>
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 text-xs text-slate-600 shadow-sm">
                    <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brand-green" /> Donor Care &amp; Support
                    </h4>
                    <p className="text-slate-500">
                      Need a corrected receipt or have questions about your transaction?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <a href="tel:+919811861633" className="text-brand-green font-bold hover:underline flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> +91 9811861633
                      </a>
                      <a href="mailto:info@iwfindia.org" className="text-brand-green font-bold hover:underline flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> info@iwfindia.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* ── LEFT COLUMN: Donation Form ── */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs notranslate form-container" translate="no" dir="ltr">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 text-left notranslate" translate="no" dir="ltr" noValidate>
                    {/* Part 1: What you are giving */}
                    <div>
                      <StepTitle n={1} title="Your Donation" />
                      <div className="space-y-4">
                        <div>
                          <label className={labelCls}>
                            Cause you want to support <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register("financialType", {
                              onChange: (e) => {
                                if (e.target.value !== "Medical Emergency") setValue("patientSlug", "");
                              },
                            })}
                            className={inputCls}
                          >
                            {FINANCIAL_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <FieldError msg={errors.financialType?.message} />
                        </div>

                        {watchFinancialType === "Medical Emergency" && (
                          <div>
                            <label className={labelCls}>
                              Support a specific patient <span className="text-slate-400 font-normal">(optional)</span>
                            </label>
                            <select {...register("patientSlug")} className={inputCls}>
                              <option value="">Any patient — where the need is greatest</option>
                              {livePatients.map((p) => (
                                <option key={p.slug} value={p.slug}>
                                  {p.name} — {p.disease}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div>
                          <label className={labelCls}>
                            Amount <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2.5">
                            {PRESET_AMOUNTS.map((amt) => {
                              const isSelected = selectedPreset === amt && watchAmount === amt;
                              return (
                                <button
                                  key={amt}
                                  type="button"
                                  onClick={() => handlePresetClick(amt)}
                                  className={`${chipCls} ${isSelected ? chipOn : chipOff}`}
                                >
                                  ₹{amt.toLocaleString("en-IN")}
                                </button>
                              );
                            })}
                            <button
                              type="button"
                              onClick={handleOtherClick}
                              className={`${chipCls} ${selectedPreset === "Other" ? chipOn : chipOff}`}
                            >
                              Other
                            </button>
                          </div>
                          <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/15">
                            <span className="text-sm font-semibold text-slate-400 mr-2">₹</span>
                            <input
                              type="number"
                              inputMode="numeric"
                              min={100}
                              {...register("amount", {
                                valueAsNumber: true,
                                onChange: () => setSelectedPreset("Other"),
                              })}
                              placeholder="Enter any amount"
                              className="h-10 w-full text-sm font-semibold text-slate-800 outline-none"
                            />
                          </div>
                          <FieldError msg={errors.amount?.message as string | undefined} />
                        </div>

                        <div>
                          <label className={labelCls}>
                            Would you like a reminder to give again? <span className="text-slate-400 font-normal">(optional)</span>
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {(
                              [
                                ["None", "No, just once"],
                                ["Monthly", "Every month"],
                                ["Yearly", "Every year"],
                              ] as const
                            ).map(([val, label]) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setValue("reminder", val)}
                                className={`${chipCls} ${watchReminder === val ? chipOn : chipOff}`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1.5">
                            We only send a reminder. Each donation is your choice and nothing is charged automatically.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Part 2: Donor details */}
                    <div>
                      <StepTitle n={2} title="Your Details" />
                      <div className="space-y-4">
                        <div className="flex items-center gap-6">
                          {(
                            [
                              ["Individual", "Individual"],
                              ["Corporate", "Organisation / Company"],
                            ] as const
                          ).map(([val, label]) => (
                            <label key={val} className="inline-flex items-center gap-2 text-sm text-slate-800 cursor-pointer">
                              <input
                                type="radio"
                                value={val}
                                {...register("donorType")}
                                className="accent-[#f97316] cursor-pointer"
                              />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>

                        <div>
                          <label className={labelCls}>
                            {watchDonorType === "Individual" ? "Full Name" : "Organisation / Company Name"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            {...register("fullName", {
                              onChange: (e) => {
                                if (watchDonorType === "Individual") e.target.value = sanitizeName(e.target.value);
                              },
                            })}
                            onKeyDown={watchDonorType === "Individual" ? blockNumbersOnKeyDown : undefined}
                            placeholder={watchDonorType === "Individual" ? "As you would like it on your receipt" : "Registered name"}
                            autoComplete="name"
                            className={inputCls}
                          />
                          <FieldError msg={errors.fullName?.message} />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelCls}>
                              Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2 h-10">
                              <PhoneCodeSelect
                                value={watchCountryCode || "+91"}
                                onChange={(dial) => {
                                  setValue("countryCode", dial);
                                  setValue("phone", sanitizeDigits(watchPhone || "", maxDigits(dial)));
                                }}
                                buttonClassName="border-slate-200"
                              />
                              <input
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel-national"
                                {...register("phone", {
                                  onChange: (e) => {
                                    e.target.value = sanitizeDigits(e.target.value, maxDigits(watchCountryCode || "+91"));
                                  },
                                })}
                                onKeyDown={blockNonDigitsOnKeyDown}
                                placeholder={phonePlaceholder(watchCountryCode || "+91")}
                                className={inputCls}
                              />
                            </div>
                            <FieldError msg={errors.phone?.message} />
                          </div>
                          <div>
                            <label className={labelCls}>
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              autoComplete="email"
                              {...register("email")}
                              placeholder="name@example.com"
                              className={inputCls}
                            />
                            <FieldError msg={errors.email?.message} />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelCls}>
                              State <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={watchState || ""}
                              onChange={(e) => {
                                setValue("state", e.target.value, { shouldValidate: Boolean(errors.state) });
                                setValue("city", "");
                              }}
                              className={inputCls}
                            >
                              <option value="" disabled>
                                Select state
                              </option>
                              {INDIAN_STATES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                            <FieldError msg={errors.state?.message} />
                          </div>
                          <div>
                            <label className={labelCls}>
                              City / District <span className="text-red-500">*</span>
                            </label>
                            <CityField
                              state={watchState || ""}
                              value={watchCity || ""}
                              onChange={(val) => setValue("city", val, { shouldValidate: Boolean(errors.city) })}
                              className={inputCls}
                            />
                            <FieldError msg={errors.city?.message} />
                          </div>
                        </div>

                        {/* Tax-deduction documentation */}
                        <div className={`rounded-xl border p-4 ${watchTaxExemption ? "border-brand-orange/40 bg-orange-50/40" : "border-slate-200 bg-slate-50/60"}`}>
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("taxExemption")}
                              className="w-4 h-4 mt-0.5 accent-[#f97316] cursor-pointer"
                            />
                            <span>
                              <span className="block text-sm font-semibold text-slate-800">
                                I want a tax-deduction receipt
                              </span>
                              <span className="block text-xs text-slate-500">
                                Under the Income-tax Act, 2025. Needs your PAN, a copy of your PAN card and your postal address.
                              </span>
                            </span>
                          </label>

                          {watchTaxExemption && (
                            <div className="mt-4 grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className={labelCls}>
                                  PAN Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                  {...register("pan", {
                                    onChange: (e) => {
                                      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
                                    },
                                  })}
                                  placeholder="ABCDE1234F"
                                  maxLength={10}
                                  autoCapitalize="characters"
                                  className={`${inputCls} uppercase font-mono tracking-wider`}
                                />
                                <FieldError msg={errors.pan?.message} />
                              </div>
                              <div>
                                <label className={labelCls}>
                                  PAN Card (photo or PDF) <span className="text-red-500">*</span>
                                </label>
                                <FilePick
                                  name={panFileName}
                                  placeholder="Upload PAN card"
                                  accept="image/*,.pdf"
                                  onPick={(file) => {
                                    setPanFileName(file?.name ?? null);
                                    setValue("panFile", file ?? undefined, { shouldValidate: true });
                                  }}
                                />
                                <FieldError msg={(errors.panFile as { message?: string } | undefined)?.message} />
                              </div>
                              <div className="sm:col-span-2">
                                <label className={labelCls}>
                                  Postal Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                  {...register("address")}
                                  placeholder="House / street, locality, landmark"
                                  autoComplete="street-address"
                                  className={inputCls}
                                />
                                <FieldError msg={errors.address?.message} />
                              </div>
                              <div>
                                <label className={labelCls}>
                                  PIN Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                  {...register("pincode", {
                                    onChange: (e) => {
                                      e.target.value = sanitizeDigits(e.target.value, 6);
                                    },
                                  })}
                                  onKeyDown={blockNonDigitsOnKeyDown}
                                  inputMode="numeric"
                                  maxLength={6}
                                  placeholder="6-digit PIN"
                                  autoComplete="postal-code"
                                  className={inputCls}
                                />
                                <FieldError msg={errors.pincode?.message} />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Recognition: name display + optional photo */}
                        <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-800">Show my name on the donor wall</p>
                            <p className="text-xs text-slate-500">
                              With your permission we list supporters on our website to inspire others.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {(
                              [
                                ["Yes", "Yes, show my name"],
                                ["No", "No, keep it private"],
                              ] as const
                            ).map(([val, label]) => (
                              <label key={val} className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                <input
                                  type="radio"
                                  value={val}
                                  {...register("websiteConsent")}
                                  className="accent-[#f97316] cursor-pointer"
                                />
                                <span>{label}</span>
                              </label>
                            ))}
                          </div>
                          {watch("websiteConsent") === "Yes" && (
                            <div className="sm:w-1/2">
                              <label className={labelCls}>
                                Your photo <span className="text-slate-400 font-normal">(optional)</span>
                              </label>
                              <FilePick
                                name={photoFileName}
                                placeholder="Upload photo"
                                accept="image/*"
                                onPick={(file) => {
                                  setPhotoFileName(file?.name ?? null);
                                  setValue("photoFile", file ?? undefined);
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Declarations */}
                        <div className="space-y-2">
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("citizenDeclaration")}
                              className="w-4 h-4 mt-0.5 accent-[#f97316] cursor-pointer"
                            />
                            <span className="text-xs text-slate-700 leading-snug">
                              I am a citizen of India and this donation is from my own funds.
                            </span>
                          </label>
                          <FieldError msg={errors.citizenDeclaration?.message} />
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("termsAgreement")}
                              className="w-4 h-4 mt-0.5 accent-[#f97316] cursor-pointer"
                            />
                            <span className="text-xs text-slate-700 leading-snug">
                              I have read and agree to the{" "}
                              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-semibold hover:underline">
                                Terms of Use
                              </a>{" "}
                              and{" "}
                              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-semibold hover:underline">
                                Donor Privacy Policy
                              </a>
                              .
                            </span>
                          </label>
                          <FieldError msg={errors.termsAgreement?.message} />
                        </div>

                        {paymentError && (
                          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                            <span>{paymentError}</span>
                          </div>
                        )}

                        <div className="pt-1">
                          <button
                            type="submit"
                            disabled={isSubmitting || isPaymentProcessing}
                            className="w-full h-12 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer disabled:opacity-50"
                          >
                            <Lock className="w-4 h-4" />
                            {isSubmitting || isPaymentProcessing
                              ? "Opening secure payment…"
                              : `Donate ₹${(Number(watchAmount) || 0).toLocaleString("en-IN")} Securely`}
                          </button>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-emerald-600" /> SSL secured
                            </span>
                            <span className="flex items-center gap-1.5">
                              <BadgeCheck className="w-3.5 h-3.5 text-blue-600" /> Payments by Razorpay
                            </span>
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PCI DSS compliant
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* ── RIGHT COLUMN: Live summary ── */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <DonationSummaryCard
                    cause={watchFinancialType}
                    patientName={selectedPatient?.name}
                    amount={Number(watchAmount) || 0}
                    reminder={watchReminder}
                    taxRequested={Boolean(watchTaxExemption)}
                  />
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-2 text-left">
                    <p className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-brand-orange" />
                      Questions?
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Our donor care team can help with bank transfers, tax receipts or CSR giving.
                    </p>
                    <div className="pt-1 flex flex-col sm:flex-row gap-3">
                      <a href="tel:+919811861633" className="flex items-center gap-2 text-xs text-[#071527] font-semibold hover:text-brand-orange">
                        <Phone className="w-3.5 h-3.5" /> +91 9811861633
                      </a>
                      <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 text-xs text-[#071527] font-semibold hover:text-brand-orange">
                        <Mail className="w-3.5 h-3.5" /> info@iwfindia.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </section>

        {/* ─── Section 2: Offline Contribution (Exact Reproduction of Page 72) ─── */}
        <section id="offline-contribution" className="py-12 sm:py-14 bg-white text-left">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Contribute Offline
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Direct bank transfer, cheque, or draft options for generous donors wishing to contribute offline.
              </p>
            </div>

            {/* Offline 3-Column Table (Page 72) */}
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs text-slate-700">
                {/* Column 1: For All Indian Nationals */}
                <div className="p-6 bg-slate-50/50 space-y-3">
                  <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-200 pb-2">
                    For All Indian Nationals
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Account No.:</span>
                      <span className="font-mono font-bold text-slate-900 select-all">1004451030069725</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Account Type:</span>
                      <span className="font-bold text-slate-800">Saving Account</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Account Name:</span>
                      <span className="font-bold text-brand-green">{OFFLINE_BANK_DETAILS.accountName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">IFS Code:</span>
                      <span className="font-mono font-bold text-slate-900 select-all">PUNBOMBGB06</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">MICR Code:</span>
                      <span className="font-mono font-bold text-slate-900">800811002</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Bank Name:</span>
                      <span className="font-bold text-slate-800">Bihar Gramin Bank</span>
                    </div>
                    <div className="py-1">
                      <span className="text-slate-500 block mb-0.5">Branch:</span>
                      <span className="font-medium text-slate-800">
                        Baghant, Manigachi, Darbhanga, Bihar - 847423
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                    <span className="font-bold text-slate-700">Scan to Pay:</span>
                    <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg flex items-center justify-center p-1 shadow-xs">
                      <QrCode className="w-14 h-14 text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Column 2: By Cheque/Draft */}
                <div className="p-6 bg-slate-50/50 space-y-3">
                  <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-200 pb-2">
                    By Cheque / Draft
                  </h3>
                  <p className="leading-relaxed">
                    Please make your cheque/draft in the name of:
                  </p>
                  <div className="p-3 bg-white border border-emerald-200 rounded-xl font-bold text-brand-green text-xs shadow-xs">
                    ISLAH WELFARE FOUNDATION
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    and send it to:
                  </p>
                  <p className="font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                    B-144, Abul Fazal Enclave-II, Okhla, New Delhi - 110025
                  </p>
                  <div className="pt-2">
                    <span className="text-slate-500">Contact No.: </span>
                    <a href="tel:+919811861633" className="font-bold text-brand-green hover:underline">
                      +91 9811861633
                    </a>
                  </div>
                </div>

                {/* Column 3: For All Foreign Passport Holders */}
                <div className="p-6 bg-red-50/30 space-y-3">
                  <h3 className="font-semibold text-sm text-red-600 border-b border-red-100 pb-2">
                    For All Foreign Passport Holders
                  </h3>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center space-y-2 mt-4">
                    <p className="font-bold text-red-600 text-xs">
                      This option is not active yet. It shall be activated shortly.
                    </p>
                    <p className="text-[11px] text-red-700/80 leading-relaxed">
                      *Donations by foreign citizens require FCRA registration under the Foreign Contribution Regulation Act. We are in the process of obtaining FCRA clearance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Indian Contribution Notes & Tax Exemption (Page 72) */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs text-slate-700">
              <h4 className="font-semibold text-sm text-slate-900 uppercase tracking-wide">
                For Indian Contribution
              </h4>
              <p className="leading-relaxed">
                All Indian contributions will receive a Tax Exemption Certificate under the Income Tax Act. Please send us your email / postal address to which to send the Certificate. Please contact us on{" "}
                <a href="mailto:info@iwfindia.org" className="text-brand-green font-bold hover:underline">
                  info@iwfindia.org
                </a>
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] font-medium leading-relaxed">
                <strong>NOTE:</strong> For Tax Year 2026–27 onward, eligible reporting entities use <strong>Form 113</strong> to report qualifying donations and <strong>Form 114</strong> is the official donor certificate generated after the filing.
              </div>

              {/* Donor Tiers */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-brand-green-dark text-sm mb-4 uppercase tracking-wide">Donor Recognition</h3>
                <div className="space-y-2.5">
                  {DONOR_TIERS.map((t) => {
                    const look = {
                      Platinum: { icon: Sparkles, color: "#334155", bg: "#F1F5F9" },
                      Gold: { icon: Award, color: "#B45309", bg: "#FEF3C7" },
                      Silver: { icon: Star, color: "#64748B", bg: "#F8FAFC" },
                    }[t.tier];
                    const Icon = look.icon;
                    return (
                      <div key={t.tier} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: look.bg }}>
                        <Icon className="w-4 h-4 shrink-0" style={{ color: look.color }} />
                        <div>
                          <p className="text-xs font-bold" style={{ color: look.color }}>{t.label}</p>
                          <p className="text-xs text-slate-500">{tierRangeText(t)} — certificate of appreciation</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <p>
                  <strong>1.</strong> One of the most effective contributions you can make to our work is a tax-deductible donation. Your contribution helps us help those who need our assistance. So, whatever you give, your gift will have great leverage. Funds are used to provide:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Training workshops here that help humanitarian workers understand and get the work.</li>
                  <li>The development and distribution of education materials related to humanitarian work.</li>
                </ul>
                <p>
                  <strong>2.</strong> We do accept volunteers, although not all positions are always available. We also have Virtual Volunteer Opportunities.
                </p>
                <p>
                  <strong>3.</strong> We do accept sponsorship, although not all positions are always available. We also have sponsorship.
                </p>
                <p>
                  <strong>4.</strong> Partnerships are key to our success. Help us build awareness by sharing our work with friends, family, colleagues &amp; businesses and distribute our brochures in your local community.
                </p>
              </div>

              {/* Green Highlighted Note (Page 72) */}
              <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-950 font-bold text-xs leading-relaxed">
                Note: You may deposit cash online to the account and E-mail us the transfer details to{" "}
                <a href="mailto:info@iwfindia.org" className="underline font-semibold">
                  info@iwfindia.org
                </a>{" "}
                along with your postal address or inform us at{" "}
                <a href="tel:+919811861633" className="underline font-semibold">
                  9811861633
                </a>
                .
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

