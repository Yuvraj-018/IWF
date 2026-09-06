import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearch } from "@tanstack/react-router";
import { URGENT_PATIENTS } from "@/content/patients";
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
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";
import { INDIAN_STATES, BIHAR_DISTRICTS } from "@/content/locations";

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

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

// ─── Offline Bank Details from Page 72 of PDF ────────────────────────────────
const OFFLINE_BANK_DETAILS = {
  accountNo: "1004451030069725",
  accountType: "Saving Account",
  accountName: "ISLAH",
  ifsc: "PUNBOMBGB06",
  micr: "800811002",
  bankName: "Bihar Gramin Bank",
  branch: "Baghant, Manigachi, Darbhanga, Bihar- 847423",
  chequePayableTo: "ISLAH WELFARE FOUNDATION",
  chequeAddress: "B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025",
  contactNo: "9811861633",
  contactEmail: "info@iwfindia.org",
};

// ─── Donor Tier Logic ─────────────────────────────────────────────────────────

function getDonorTier(amount: number) {
  if (amount >= 50000) return { label: "Platinum", color: "#8B5CF6", bg: "#EDE9FE", icon: Sparkles };
  if (amount >= 20000) return { label: "Gold", color: "#D97706", bg: "#FEF3C7", icon: Award };
  if (amount >= 5000) return { label: "Silver", color: "#2563EB", bg: "#EFF6FF", icon: Star };
  return { label: "General", color: "#15803D", bg: "#F0FDF4", icon: Heart };
}

// ─── Schema Matching Page 70 ──────────────────────────────────────────────────
const donorSchema = z.object({
  financialType: z.string().min(1, "Please select a financial type"),
  frequency: z.enum(["One Time", "Monthly", "Quarterly", "Yearly"]),
  amount: z.number({ invalid_type_error: "Enter a valid amount" }).min(100, "Minimum donation amount is ₹100"),
  recurringPledge: z.boolean().default(false),
  pledgeMonths: z.string().default("12 Months"),

  donorType: z.enum(["Individual", "Corporate"]).default("Individual"),
  fullName: z
    .string()
    .trim()
    .min(2, "Full Name is required")
    .regex(/^[^0-9]+$/, "Name cannot contain numbers"),
  countryCode: z.string().default("+91"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  address: z.string().trim().min(5, "Full address is required"),
  state: z.string().min(1, "Please select state"),
  city: z.string().trim().min(2, "City is required"),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),

  taxExemption: z.boolean().default(false),
  pan: z.string().trim().optional(),
  panFile: z.any().optional(),
  photoFile: z.any().optional(),

  websiteConsent: z.enum(["Yes", "No"]).default("Yes"),
  citizenDeclaration: z.literal(true, {
    errorMap: () => ({ message: "Please confirm that you are a citizen of India donating your own funds" }),
  }),
  termsAgreement: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the Terms of Use and Donor Privacy" }),
  }),
}).superRefine((data, ctx) => {
  if (data.taxExemption) {
    if (!data.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(data.pan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A valid 10-character PAN (e.g. ABCDE1234F) is required for 80G tax exemption",
        path: ["pan"],
      });
    }
  }
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

export default function DonatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number | "Other">(2000);
  const [panFileName, setPanFileName] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const [receiptNumber, setReceiptNumber] = useState("IWF/RCPT/2025-26/000125");
  const [paymentDate, setPaymentDate] = useState("22 May 2025 | 10:45 AM");

  // Read URL search params (e.g. ?patientId=mohammed-salim&amount=64000)
  const search = useSearch({ strict: false }) as { patientId?: string; amount?: string };
  const contextPatient = search.patientId
    ? URGENT_PATIENTS.find((p) => p.slug === search.patientId)
    : null;
  const contextAmount = search.amount ? parseInt(search.amount, 10) : undefined;

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
      financialType: contextPatient ? "Medical Emergency" : "Medical Emergency",
      frequency: "One Time",
      amount: contextAmount || 2500,
      recurringPledge: true,
      pledgeMonths: "12 Months",
      donorType: "Individual",
      fullName: "Md. Aftab Alam",
      countryCode: "+91",
      phone: "9123456780",
      email: "aftabalam@email.com",
      address: "Darbhanga, Bihar - 846004, India",
      state: "Bihar",
      city: "Darbhanga",
      pincode: "846004",
      taxExemption: true,
      pan: "AACTS7973G",
      websiteConsent: "Yes",
      citizenDeclaration: true,
      termsAgreement: true,
    },
  });

  const watchFinancialType = watch("financialType");
  const watchFrequency = watch("frequency");
  const watchAmount = watch("amount") || 0;
  const watchRecurringPledge = watch("recurringPledge");
  const watchDonorType = watch("donorType");
  const watchFullName = watch("fullName");
  const watchPhone = watch("phone");
  const watchEmail = watch("email");
  const watchAddress = watch("address");
  const watchState = watch("state");

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
    await new Promise((r) => setTimeout(r, 600));
    const randomReceiptNum = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setReceiptNumber(`IWF/RCPT/${now.getFullYear()}-${(now.getFullYear() + 1).toString().slice(-2)}/${randomReceiptNum}`);
    setPaymentDate(`${formattedDate} | ${formattedTime}`);
    setSubmitted(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── Hero Header (Matching Top of Page 70) ─────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#00381e] via-[#005a30] to-[#014725] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-emerald-300" /> DONATE US
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Donate &amp; Make a Difference
                </h1>
                <p className="text-emerald-100 text-sm sm:text-base max-w-xl leading-relaxed">
                  Your contribution helps us empower lives and build stronger communities across rural and underserved areas.
                </p>

                {contextPatient && (
                  <div className="mt-4 p-3 bg-white/10 border border-white/20 rounded-2xl flex items-center gap-3 max-w-md">
                    <img
                      src={contextPatient.image}
                      alt={contextPatient.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-white">Emergency Patient Support: {contextPatient.name}</p>
                      <p className="text-emerald-200">{contextPatient.disease} • {contextPatient.hospital}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-4 rounded-3xl text-center shadow-xl max-w-xs">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-8 h-8 fill-brand-orange text-brand-orange" />
                  </div>
                  <h4 className="font-black text-white text-base">DONATE NOW</h4>
                  <p className="text-emerald-200 text-xs mt-1 leading-snug">
                    100% Tax Exempted under Section 80G of Income Tax Act 1961
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Two-Column Donation Section (Exact Reproduction of Page 70) ──── */}
        <section ref={formRef} className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* ── LEFT COLUMN: Donation Form ── */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
                    {/* Part 1: Choose Donation Type */}
                    <div>
                      <div className="flex items-center gap-2.5 pb-2 mb-4 border-b border-slate-100">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                          1
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-wide">
                          Choose Donation Type
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {/* Financial Type */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Financial Type <span className="text-red-500">*</span>
                          </label>
                          <select {...register("financialType")} className={inputCls}>
                            {FINANCIAL_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <FieldError msg={errors.financialType?.message} />
                        </div>

                        {/* Frequency */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Frequency <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {(["One Time", "Monthly", "Quarterly", "Yearly"] as const).map((freq) => {
                              const isSelected = watchFrequency === freq;
                              return (
                                <button
                                  key={freq}
                                  type="button"
                                  onClick={() => setValue("frequency", freq)}
                                  className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-brand-green text-white border-brand-green shadow-xs"
                                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                  }`}
                                >
                                  {freq}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Amount Presets */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Amount (₹) <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                            {PRESET_AMOUNTS.map((amt) => {
                              const isSelected = selectedPreset === amt && watchAmount === amt;
                              return (
                                <button
                                  key={amt}
                                  type="button"
                                  onClick={() => handlePresetClick(amt)}
                                  className={`py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-brand-green text-white border-brand-green shadow-xs"
                                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                  }`}
                                >
                                  ₹ {amt.toLocaleString("en-IN")}
                                </button>
                              );
                            })}
                            <button
                              type="button"
                              onClick={handleOtherClick}
                              className={`py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                                selectedPreset === "Other"
                                  ? "bg-brand-green text-white border-brand-green shadow-xs"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              Other
                            </button>
                          </div>

                          {/* Enter Amount Input */}
                          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/20">
                            <span className="text-sm font-bold text-slate-400 mr-2">₹</span>
                            <input
                              type="number"
                              {...register("amount", { valueAsNumber: true })}
                              placeholder="Enter amount"
                              className="h-10 w-full text-xs sm:text-sm font-bold text-slate-800 outline-none"
                            />
                          </div>
                          <FieldError msg={errors.amount?.message} />
                        </div>

                        {/* 12 Months Pledge Checkbox & Dropdown (Page 70) */}
                        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                          <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("recurringPledge")}
                              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-bold text-slate-800">
                              Yes, I would like to contribute for 12 months (₹{(watchAmount * 12).toLocaleString("en-IN")})
                            </span>
                          </label>

                          {watchRecurringPledge && (
                            <div className="flex items-center gap-3 pt-1 text-xs">
                              <span className="text-slate-600 font-semibold">Select number of months:</span>
                              <select
                                {...register("pledgeMonths")}
                                className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-800 outline-none"
                              >
                                <option value="3 Months">3 Months</option>
                                <option value="6 Months">6 Months</option>
                                <option value="9 Months">9 Months</option>
                                <option value="12 Months">12 Months</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Part 2: Donor Information */}
                    <div>
                      <div className="flex items-center gap-2.5 pb-2 mb-4 border-b border-slate-100">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                          2
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-wide">
                          Donor Information
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {/* Who is making this donation? */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-2">
                            Who is making this donation? <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-6">
                            <label className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
                              <input
                                type="radio"
                                value="Individual"
                                {...register("donorType")}
                                className="text-brand-green focus:ring-brand-green cursor-pointer"
                              />
                              <span>Individual</span>
                            </label>
                            <label className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
                              <input
                                type="radio"
                                value="Corporate"
                                {...register("donorType")}
                                className="text-brand-green focus:ring-brand-green cursor-pointer"
                              />
                              <span>Corporate</span>
                            </label>
                          </div>
                        </div>

                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            {watchDonorType === "Individual" ? "Full Name" : "Company / Organisation Name"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            {...register("fullName", {
                              onChange: (e) => {
                                e.target.value = sanitizeName(e.target.value);
                              },
                            })}
                            onKeyDown={blockNumbersOnKeyDown}
                            placeholder="Enter your full name"
                            className={inputCls}
                          />
                          <FieldError msg={errors.fullName?.message} />
                        </div>

                        {/* Phone Number & Email Address */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                              <select
                                {...register("countryCode")}
                                className="h-10 w-24 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-800 outline-none"
                              >
                                {COUNTRY_CODES.map((c) => (
                                  <option key={c.code} value={c.code}>
                                    {c.code}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="tel"
                                {...register("phone", {
                                  onChange: (e) => {
                                    e.target.value = sanitizeDigits(e.target.value, 10);
                                  },
                                })}
                                onKeyDown={blockNonDigitsOnKeyDown}
                                maxLength={10}
                                placeholder="Enter mobile number"
                                className={inputCls}
                              />
                            </div>
                            <FieldError msg={errors.phone?.message} />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              {...register("email")}
                              placeholder="Enter email address"
                              className={inputCls}
                            />
                            <FieldError msg={errors.email?.message} />
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            {...register("address")}
                            placeholder="Enter complete address"
                            className={inputCls}
                          />
                          <FieldError msg={errors.address?.message} />
                        </div>

                        {/* State, City, PIN Code */}
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              State <span className="text-red-500">*</span>
                            </label>
                            <select {...register("state")} className={inputCls}>
                              <option value="" disabled>Select State</option>
                              {INDIAN_STATES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <FieldError msg={errors.state?.message} />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              City <span className="text-red-500">*</span>
                            </label>
                            {watchState === "Bihar" ? (
                              <select {...register("city")} className={inputCls}>
                                <option value="" disabled>Select City / District</option>
                                {BIHAR_DISTRICTS.map((d) => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                {...register("city")}
                                placeholder="Enter City"
                                className={inputCls}
                              />
                            )}
                            <FieldError msg={errors.city?.message} />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              PIN Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              {...register("pincode", {
                                onChange: (e) => {
                                  e.target.value = sanitizeDigits(e.target.value, 6);
                                },
                              })}
                              onKeyDown={blockNonDigitsOnKeyDown}
                              maxLength={6}
                              placeholder="Enter PIN code"
                              className={inputCls}
                            />
                            <FieldError msg={errors.pincode?.message} />
                          </div>
                        </div>

                        {/* 80G Tax Deduction Certificate (Page 70) */}
                        <div className="pt-2">
                          <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("taxExemption")}
                              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-bold text-slate-800">
                              I want tax deduction certificate under income tax act 2025
                            </span>
                          </label>

                          {watch("taxExemption") && (
                            <div className="mt-3 p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3">
                              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                                <span>Check this if you need tax deduction certificate under income tax act 2025</span>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  PAN Card is mandatory for tax deduction certificates under income tax act 2025:
                                </label>
                                <input
                                  {...register("pan")}
                                  placeholder="Enter PAN (e.g. AACTS7973G)"
                                  maxLength={10}
                                  className={`${inputCls} uppercase font-mono tracking-wider`}
                                />
                                <FieldError msg={errors.pan?.message} />
                              </div>

                              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                                <div>
                                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                    PAN Card *
                                  </label>
                                  <label className="flex items-center justify-center gap-2 h-9 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer">
                                    <Upload className="w-3.5 h-3.5 text-brand-green" />
                                    <span>{panFileName || "Upload PAN Card"}</span>
                                    <input
                                      type="file"
                                      accept="image/*,.pdf"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) setPanFileName(e.target.files[0].name);
                                      }}
                                    />
                                  </label>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                    Photo (Optional)
                                  </label>
                                  <label className="flex items-center justify-center gap-2 h-9 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer">
                                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                                    <span>{photoFileName || "Upload Photo (Optional)"}</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) setPhotoFileName(e.target.files[0].name);
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Consent for Display on Website (Page 70) */}
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <label className="block text-xs font-bold text-slate-800">
                            Consent for Display on Website (Optional but Recommended)
                          </label>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            We value your privacy and respect your choice. I authorize for my / our name to be displayed on the official website of Islah Welfare Foundation (IWF) as a Supporting Member/Donor. This will help inspire others and promote transparency.
                          </p>
                          <div className="space-y-1.5 pt-1">
                            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                value="Yes"
                                {...register("websiteConsent")}
                                className="text-brand-green focus:ring-brand-green cursor-pointer"
                              />
                              <span>Yes, you may display my name on the website.</span>
                            </label>
                            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                value="No"
                                {...register("websiteConsent")}
                                className="text-brand-green focus:ring-brand-green cursor-pointer"
                              />
                              <span>I do not want my name to be displayed on the website.</span>
                            </label>
                          </div>
                        </div>

                        {/* Declarations & Agreements */}
                        <div className="space-y-2.5 pt-1">
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("citizenDeclaration")}
                              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green cursor-pointer mt-0.5"
                            />
                            <span className="text-xs text-slate-700 leading-snug">
                              I hereby declare that I am a citizen of India, making this donation out of my own funds.
                            </span>
                          </label>
                          <FieldError msg={errors.citizenDeclaration?.message} />

                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("termsAgreement")}
                              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green cursor-pointer mt-0.5"
                            />
                            <span className="text-xs text-slate-700 leading-snug">
                              I acknowledge that I have read and understood the{" "}
                              <a
                                href="/terms-and-conditions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-green font-bold hover:underline"
                              >
                                Terms of Use
                              </a>{" "}
                              and Website and{" "}
                              <a
                                href="/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-green font-bold hover:underline"
                              >
                                Donor Privacy
                              </a>{" "}
                              and I agree to abide by them.
                            </span>
                          </label>
                          <FieldError msg={errors.termsAgreement?.message} />
                        </div>

                        {/* Donate Securely Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-green/30 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
                          >
                            <Lock className="w-4 h-4" />
                            {isSubmitting ? "Processing..." : "Donate Securely Now"}
                          </button>
                          <p className="text-[11px] text-slate-400 text-center mt-2">
                            Your donation is 100% secure and encrypted.
                          </p>
                        </div>

                        {/* Security Trust Badges (Page 70) */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-500 font-bold">
                          <span className="flex items-center gap-1.5">
                            <Shield className="w-4 h-4 text-emerald-600" /> SSL SECURED
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BadgeCheck className="w-4 h-4 text-blue-600" /> Verified by Razorpay
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-brand-green" /> PCI DSS COMPLIANT
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* ── RIGHT COLUMN: Live Donation Summary & Instant Receipt (Page 70) ── */}
              <div className="lg:col-span-5 space-y-6">
                {/* Donation Summary Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5 text-left">
                  {submitted && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                      <div className="flex items-center gap-2 text-brand-green font-extrabold text-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Thank You for Your Generous Donation!</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Your contribution can bring real change in someone's life.
                      </p>
                      <p className="text-xs text-slate-700 font-medium pt-1">
                        Your donation of <strong>₹{watchAmount.toLocaleString("en-IN")}</strong> has been received successfully. A receipt has been sent to <strong>{watchEmail}</strong>
                      </p>
                    </div>
                  )}

                  {/* Official Receipt Card Box */}
                  <div className="border-2 border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-sm font-black text-[#006837] tracking-wide">
                          Donation Summary
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          ISLAH WELFARE FOUNDATION
                        </p>
                        <p className="text-[9px] text-slate-400 italic">
                          (Empowering Youth | Enriching Communities | Transforming Lives)
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-black text-brand-green text-xs">
                        IWF
                      </div>
                    </div>

                    {/* Receipt Meta */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl font-mono">
                      <div>
                        <span className="text-slate-400 block font-sans text-[10px]">Receipt No. :</span>
                        <span className="font-bold text-slate-800">{receiptNumber}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block font-sans text-[10px]">Receipt Date :</span>
                        <span className="font-bold text-slate-800">{paymentDate.split(" | ")[0]}</span>
                      </div>
                    </div>

                    {/* Donor Details */}
                    <div className="space-y-1.5 text-xs border-b border-slate-100 pb-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Donor Details
                      </p>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Name :</span>
                        <span className="font-bold text-slate-800">{watchFullName || "--"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Mobile No. :</span>
                        <span className="font-bold text-slate-800">
                          {watchPhone ? `+91 ${watchPhone}` : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Email :</span>
                        <span className="font-bold text-slate-800">{watchEmail || "--"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Address :</span>
                        <span className="font-bold text-slate-800 text-right max-w-[200px] truncate">
                          {watchAddress || `${"Darbhanga"}, ${watchState}`}
                        </span>
                      </div>
                    </div>

                    {/* Donation Details */}
                    <div className="space-y-1.5 text-xs border-b border-slate-100 pb-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Donation Details
                      </p>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Financial Type :</span>
                        <span className="font-bold text-brand-green">{watchFinancialType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Frequency :</span>
                        <span className="font-bold text-slate-800">{watchFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Amount :</span>
                        <span className="font-black text-brand-orange text-sm">
                          ₹ {watchAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Contribution For :</span>
                        <span className="font-bold text-slate-800">
                          {contextPatient ? `Patient ${contextPatient.name}` : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Payment Mode :</span>
                        <span className="font-bold text-slate-800">UPI / Online</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-slate-500 font-sans">Transaction ID :</span>
                        <span className="font-bold text-slate-800">pay_OR12345abcdef67890</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-slate-500 font-sans">Payment Date :</span>
                        <span className="font-bold text-slate-800">{paymentDate}</span>
                      </div>
                    </div>

                    {/* Signatory & Mission Quote */}
                    <div className="pt-2 text-center space-y-2">
                      <p className="text-[11px] text-slate-500 italic leading-snug">
                        Thank you for supporting our mission. Your generosity helps us create a lasting social impact.
                      </p>
                      <div className="pt-2 flex flex-col items-center">
                        <div className="w-32 h-10 border-b border-slate-300 flex items-end justify-center pb-1">
                          <span className="font-serif italic text-sm text-slate-600">Authorised Signatory</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                          Islah Welfare Foundation
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Download Receipt & Send on Email (Page 70) */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={printReceipt}
                      className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" /> Download Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Receipt dispatched to ${watchEmail || "your email"}`)}
                      className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-brand-orange" /> Send on Email
                    </button>
                  </div>

                  {/* What Happens Next? (Page 70) */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs text-slate-600">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider">
                      What Happens Next?
                    </h4>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>Receipt has been sent to your email.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>You will also receive updates on how your contribution is making an impact.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        For any queries, contact us at{" "}
                        <a href="mailto:info@iwfindia.org" className="text-brand-green font-bold hover:underline">
                          info@iwfindia.org
                        </a>{" "}
                        |{" "}
                        <a href="tel:+919811861633" className="text-brand-green font-bold hover:underline">
                          +91 9811861633
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Us Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2 text-left">
                  <p className="text-xs font-black text-slate-700 uppercase tracking-wide">
                    Questions or Need Assistance?
                  </p>
                  <p className="text-xs text-slate-500">
                    Our donor care team is here to support you at every step of your giving journey.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+919811861633"
                      className="flex items-center gap-2 text-xs text-brand-green font-bold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" /> +91 9811861633
                    </a>
                    <a
                      href="mailto:info@iwfindia.org"
                      className="flex items-center gap-2 text-xs text-brand-green font-bold hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" /> info@iwfindia.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Offline Contribution (Exact Reproduction of Page 72) ─── */}
        <section id="offline-contribution" className="py-14 bg-white border-b border-slate-200 text-left">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Offline Contribute
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
                  <h3 className="font-black text-sm text-slate-900 border-b border-slate-200 pb-2">
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
                      <span className="font-bold text-brand-green">ISLAH</span>
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
                  <h3 className="font-black text-sm text-slate-900 border-b border-slate-200 pb-2">
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
                  <h3 className="font-black text-sm text-red-600 border-b border-red-100 pb-2">
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
              <h4 className="font-black text-sm text-slate-900 uppercase tracking-wide">
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
                  {[
                    { tier: "Platinum", icon: Sparkles, amount: "₹50,000+", color: "#7C3AED", bg: "#EDE9FE" },
                    { tier: "Gold", icon: Award, amount: "₹20,000 – ₹49,999", color: "#B45309", bg: "#FEF3C7" },
                    { tier: "Silver", icon: Star, amount: "₹5,000 – ₹19,999", color: "#2563EB", bg: "#EFF6FF" },
                    { tier: "General", icon: Heart, amount: "Below ₹5,000", color: "#15803D", bg: "#F0FDF4" },
                  ].map(({ tier, icon: Icon, amount, color, bg }) => (
                    <div key={tier} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: bg }}>
                      <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                      <div>
                        <p className="text-xs font-bold" style={{ color }}>{tier} Donor</p>
                        <p className="text-xs text-slate-500">{amount} — Special recognition + Donor Card</p>
                      </div>
                    </div>
                  ))}
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
                <a href="mailto:info@iwfindia.org" className="underline font-black">
                  info@iwfindia.org
                </a>{" "}
                along with your postal address or inform us at{" "}
                <a href="tel:+919811861633" className="underline font-black">
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

