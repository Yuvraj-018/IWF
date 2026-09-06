import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heart,
  CheckCircle2,
  RotateCcw,
  Send,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";
import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";

const sponsorSchema = z.object({
  sponsorName: z.string().trim().min(2, "Full Name / Organization Name is required"),
  sponsorType: z.string().min(1, "Please select type of sponsor"),
  contactPerson: z
    .string()
    .trim()
    .min(2, "Contact person name is required")
    .regex(/^[^0-9]+$/, "Name cannot contain numbers"),
  designation: z.string().trim().optional(),
  email: z.string().trim().email("Valid email address is required"),
  countryCode: z.string().default("+91"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  address: z.string().trim().min(5, "Complete address is required"),

  areasOfInterest: z
    .array(z.string())
    .min(1, "Please select at least one area of interest"),
  preferredProgram: z.string().optional(),
  supportType: z.enum(["Financial Support", "In-Kind Support", "CSR Partnership", "Other"], {
    required_error: "Please select type of support",
  }),
  contributionDetails: z
    .string()
    .trim()
    .min(10, "Please share how you would like to contribute (min 10 characters)"),

  website: z.string().trim().optional(),
  yearOfEstablishment: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), "Enter a valid 4-digit year"),
  motivation: z
    .string()
    .trim()
    .min(10, "Please tell us why you want to support ISLAH (min 10 characters)"),

  confirmAccuracy: z.literal(true, {
    errorMap: () => ({
      message:
        "Please confirm that the information provided is accurate and you wish to apply as a sponsor",
    }),
  }),
  agreePolicy: z.literal(true, {
    errorMap: () => ({ message: "Please read and agree to the Policy and Code of Conduct" }),
  }),
});

type SponsorFormData = z.infer<typeof sponsorSchema>;

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

const SPONSOR_TYPES = [
  "Individual Sponsor",
  "Corporate / CSR Foundation",
  "Philanthropic Trust / Family Foundation",
  "Non-Profit / NGO",
  "Community / Faith-Based Association",
  "Alumni / Student Group",
  "Small & Medium Enterprise (SME)",
  "Other",
];

const AREAS_OF_INTEREST = [
  "Education & Scholarships",
  "Healthcare & Health Camps",
  "Women Empowerment & SHGs",
  "Livelihood & Vocational Training",
  "Environment & Tree Plantation",
  "Agriculture & Rural Development",
  "Relief & Disaster Rehabilitation",
  "Model Village Development",
];

const PREFERRED_PROGRAMS = [
  "Child Education & Scholarship Sponsorship",
  "Free Health Camps & Diagnostic Outreach",
  "Rural Community Health Centre",
  "Women Self-Help Group (SHG) Livelihood Fund",
  "Youth Skill & Vocational Training Centre",
  "Tree Plantation & Rural Clean Energy",
  "Ambulance & Critical Life Support Support",
  "Farmer Tools & Sustainable Agriculture",
  "Emergency Relief & Rehabilitation",
  "General / Unrestricted Community Sponsorship",
];

interface SponsorApplicationFormProps {
  onSuccess?: (appId: string) => void;
  isModal?: boolean;
}

export function SponsorApplicationForm({ onSuccess, isModal = false }: SponsorApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      countryCode: "+91",
      supportType: "Financial Support",
      areasOfInterest: [],
    },
  });

  const selectedAreas = watch("areasOfInterest") || [];
  const currentSupportType = watch("supportType");

  const toggleArea = (area: string) => {
    const current = selectedAreas;
    if (current.includes(area)) {
      setValue(
        "areasOfInterest",
        current.filter((a) => a !== area),
        { shouldValidate: true }
      );
    } else {
      setValue("areasOfInterest", [...current, area], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: SponsorFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    const generatedId = `IWF-SPN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setAppId(generatedId);
    setSubmitted(true);
    onSuccess?.(generatedId);
  };

  const handleReset = () => {
    reset({
      sponsorName: "",
      sponsorType: "",
      contactPerson: "",
      designation: "",
      email: "",
      countryCode: "+91",
      phone: "",
      address: "",
      areasOfInterest: [],
      preferredProgram: "",
      supportType: "Financial Support",
      contributionDetails: "",
      website: "",
      yearOfEstablishment: "",
      motivation: "",
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 border-4 border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-brand-green" />
        </div>
        <h3 className="text-2xl font-black text-brand-green-dark mb-1">
          Sponsorship Application Submitted!
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-3">
          Thank you for choosing to sponsor a cause with ISLAH. Your reference ID is:
        </p>
        <div className="inline-block bg-slate-100 border border-slate-300 rounded-xl px-5 py-2.5 font-mono font-black text-slate-800 text-base mb-6">
          {appId}
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-lg mx-auto text-left text-xs text-slate-700 space-y-1.5 mb-6">
          <p className="font-bold text-brand-green-dark">What Happens Next?</p>
          <p>• Our sponsorship team will review your preferred initiative and support type.</p>
          <p>• We will contact you within <strong>3-5 working days</strong> with a formal program alignment proposal.</p>
          <p>• Detailed utilization budgets, 80G tax receipt schedules, and impact reports will be shared.</p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            handleReset();
          }}
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-2.5 rounded-xl transition text-xs uppercase tracking-wider cursor-pointer"
        >
          Submit Another Sponsorship <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
      {/* ── 1. SPONSOR / ORGANIZATION DETAILS ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 1
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            1. SPONSOR / ORGANIZATION DETAILS
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name / Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("sponsorName")}
              placeholder="Enter full name or organization name"
              className={inputCls}
            />
            <FieldError msg={errors.sponsorName?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Type of Sponsor <span className="text-red-500">*</span>
            </label>
            <select {...register("sponsorType")} className={inputCls} defaultValue="">
              <option value="" disabled>Select type</option>
              {SPONSOR_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <FieldError msg={errors.sponsorType?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Contact Person <span className="text-red-500">*</span>
            </label>
            <input
              {...register("contactPerson", {
                onChange: (e) => {
                  e.target.value = sanitizeName(e.target.value);
                },
              })}
              onKeyDown={blockNumbersOnKeyDown}
              placeholder="Enter contact person name"
              className={inputCls}
            />
            <FieldError msg={errors.contactPerson?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Designation
            </label>
            <input
              {...register("designation")}
              placeholder="Enter designation"
              className={inputCls}
            />
            <FieldError msg={errors.designation?.message} />
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                {...register("countryCode")}
                className="h-10 w-28 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-800 outline-none"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.country})
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
                placeholder="Enter phone number"
                className={inputCls}
              />
            </div>
            <FieldError msg={errors.phone?.message} />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              {...register("address")}
              placeholder="Enter complete address"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
            <FieldError msg={errors.address?.message} />
          </div>
        </div>
      </div>

      {/* ── 2. SPONSORSHIP INTEREST ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 2
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            2. SPONSORSHIP INTEREST
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Areas of Interest <span className="text-red-500">*</span>{" "}
              <span className="text-slate-400 font-normal">(select one or more)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AREAS_OF_INTEREST.map((area) => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-brand-green text-white border-brand-green shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span>{area}</span>
                    {isSelected && <span className="text-white text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
            <FieldError msg={errors.areasOfInterest?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Program / Initiative
            </label>
            <select {...register("preferredProgram")} className={inputCls} defaultValue="">
              <option value="">Select program / initiative</option>
              {PREFERRED_PROGRAMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Type of Support <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["Financial Support", "In-Kind Support", "CSR Partnership", "Other"] as const).map(
                (type) => (
                  <label
                    key={type}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-2.5 ${
                      currentSupportType === type
                        ? "border-brand-green bg-brand-green/5"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={type}
                      {...register("supportType")}
                      className="text-brand-green focus:ring-brand-green cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">{type}</span>
                  </label>
                )
              )}
            </div>
            <FieldError msg={errors.supportType?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              How would you like to contribute? <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              {...register("contributionDetails")}
              placeholder="Share your ideas, expectations and how you wish to support."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
            <FieldError msg={errors.contributionDetails?.message} />
          </div>
        </div>
      </div>

      {/* ── 3. ADDITIONAL INFORMATION ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 3
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            3. ADDITIONAL INFORMATION
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Website <span className="text-slate-400 font-normal">(if any)</span>
            </label>
            <input
              {...register("website")}
              placeholder="https://example.org"
              className={inputCls}
            />
            <FieldError msg={errors.website?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Year of Establishment
            </label>
            <input
              {...register("yearOfEstablishment", {
                onChange: (e) => {
                  e.target.value = sanitizeDigits(e.target.value, 4);
                },
              })}
              onKeyDown={blockNonDigitsOnKeyDown}
              maxLength={4}
              placeholder="e.g. 2015"
              className={inputCls}
            />
            <FieldError msg={errors.yearOfEstablishment?.message} />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Why do you want to support ISLAH? <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              {...register("motivation")}
              placeholder="Tell us what inspires you about our work."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
            <FieldError msg={errors.motivation?.message} />
          </div>
        </div>
      </div>

      {/* ── 4. TERMS & CONFIRMATION ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 4
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            4. TERMS & CONFIRMATION
          </h3>
        </div>

        <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-start gap-2.5">
            <input
              id="sponsorConfirmAccuracy"
              type="checkbox"
              {...register("confirmAccuracy")}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
            />
            <label htmlFor="sponsorConfirmAccuracy" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
              I confirm that the information provided above is true to the best of my knowledge and I would like to apply as a sponsor for ISLAH. <span className="text-red-500">*</span>
            </label>
          </div>
          <FieldError msg={errors.confirmAccuracy?.message} />

          <div className="flex items-start gap-2.5">
            <input
              id="sponsorAgreePolicy"
              type="checkbox"
              {...register("agreePolicy")}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
            />
            <label htmlFor="sponsorAgreePolicy" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
              I have read and agree to the{" "}
              <a
                href="/sponsorship-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green font-bold hover:underline"
              >
                Policy
              </a>{" "}
              and{" "}
              <a
                href="/code-of-conduct"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green font-bold hover:underline"
              >
                Code of Conduct
              </a>
              . <span className="text-red-500">*</span>
            </label>
          </div>
          <FieldError msg={errors.agreePolicy?.message} />
        </div>
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-[#0b1f3b] hover:bg-brand-green text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Application <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1 mt-2">
        <Lock className="w-3 h-3" /> Your information is secure and will only be used to process your application.
      </p>
    </form>
  );
}
