import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Briefcase,
  CheckCircle2,
  RotateCcw,
  Send,
  AlertCircle,
  ArrowRight,
  UploadCloud,
  FileText,
  Lock,
} from "lucide-react";
import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";

const careerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .regex(/^[^0-9]+$/, "Name cannot contain numbers"),
  email: z.string().trim().email("Valid email address is required"),
  countryCode: z.string().default("+91"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  currentLocation: z.string().trim().min(2, "Current location is required"),
  linkedInProfile: z.string().trim().optional(),

  currentDesignation: z.string().trim().optional(),
  totalExperience: z.string().min(1, "Please select total experience"),
  functionalArea: z.string().min(1, "Please select functional area"),
  preferredLocation: z.string().min(1, "Please select preferred location"),
  expectedRoleType: z.string().min(1, "Please select expected role type"),
  expectedEmploymentType: z.string().min(1, "Please select employment type"),

  cvFileName: z.string().min(1, "Please upload your updated CV / Resume"),

  skillHighlights: z.string().trim().optional(),
  aboutYourself: z
    .string()
    .trim()
    .min(10, "Please write a brief introduction about yourself (min 10 characters)"),

  agreePrivacy: z.literal(true, {
    errorMap: () => ({
      message: "Please agree to the Privacy Policy and talent database consent",
    }),
  }),
});

type CareerFormData = z.infer<typeof careerSchema>;

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

const EXPERIENCE_OPTIONS = [
  "Fresher / Entry Level (0-1 Year)",
  "1 - 3 Years",
  "3 - 5 Years",
  "5 - 8 Years",
  "8 - 12 Years",
  "12+ Years",
];

const FUNCTIONAL_AREAS = [
  "Program Management & Field Operations",
  "Education, Teaching & Curriculum",
  "Healthcare & Community Medicine",
  "Women Empowerment & SHG Development",
  "Skill Development & Vocational Training",
  "Agriculture, Rural Livelihoods & Environment",
  "Finance, Accounts & Compliance",
  "Human Resources (HR) & Administration",
  "Communications, Media & Public Relations",
  "Monitoring, Evaluation & Research (MEL)",
  "Fundraising, CSR & Donor Relations",
  "Information Technology & Systems",
  "Other",
];

const PREFERRED_LOCATIONS = [
  "New Delhi (Administrative HQ)",
  "Darbhanga, Bihar (Field Hub)",
  "Patna, Bihar",
  "Rural Bihar (Field Assignments)",
  "Remote / Work From Home",
  "Pan-India (Travel-Based)",
];

const ROLE_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Volunteer",
  "Internship",
];

const EMPLOYMENT_TYPES = [
  "Permanent",
  "Contractual",
  "Project-Based",
];

interface CareerApplicationFormProps {
  onSuccess?: (appId: string) => void;
  isModal?: boolean;
}

export function CareerApplicationForm({ onSuccess, isModal = false }: CareerApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [cvName, setCvName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      countryCode: "+91",
      preferredLocation: "New Delhi (Administrative HQ)",
      expectedRoleType: "Full-time",
      expectedEmploymentType: "Permanent",
      totalExperience: "1 - 3 Years",
      functionalArea: "Program Management & Field Operations",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please upload a smaller file.");
        return;
      }
      setCvName(file.name);
      setValue("cvFileName", file.name, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: CareerFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    const generatedId = `IWF-JOB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setAppId(generatedId);
    setSubmitted(true);
    onSuccess?.(generatedId);
  };

  const handleReset = () => {
    reset({
      fullName: "",
      email: "",
      countryCode: "+91",
      phone: "",
      currentLocation: "",
      linkedInProfile: "",
      currentDesignation: "",
      totalExperience: "1 - 3 Years",
      functionalArea: "Program Management & Field Operations",
      preferredLocation: "New Delhi (Administrative HQ)",
      expectedRoleType: "Full-time",
      expectedEmploymentType: "Permanent",
      cvFileName: "",
      skillHighlights: "",
      aboutYourself: "",
    });
    setCvName(null);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 border-4 border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-brand-green" />
        </div>
        <h3 className="text-2xl font-black text-brand-green-dark mb-1">
          CV Submitted Successfully!
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-3">
          Thank you for applying to build your career with ISLAH. Your reference ID is:
        </p>
        <div className="inline-block bg-slate-100 border border-slate-300 rounded-xl px-5 py-2.5 font-mono font-black text-slate-800 text-base mb-6">
          {appId}
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-lg mx-auto text-left text-xs text-slate-700 space-y-1.5 mb-6">
          <p className="font-bold text-brand-green-dark">What Happens Next?</p>
          <p>• Our HR and talent acquisition team will review your CV and experience profile.</p>
          <p>• If your background matches an active opening, we will contact you within <strong>7 working days</strong>.</p>
          <p>• Your profile will also remain archived in our talent database for future relevant opportunities.</p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            handleReset();
          }}
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-2.5 rounded-xl transition text-xs uppercase tracking-wider cursor-pointer"
        >
          Submit Another Profile <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
      <div className="mb-2">
        <p className="text-xs text-slate-500">
          Please fill in your details and upload your CV. Our team will review your profile and contact you for suitable opportunities.
        </p>
      </div>

      {/* ── 1. PERSONAL INFORMATION ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 1
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            Personal Information
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
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
                placeholder="Enter your phone number"
                className={inputCls}
              />
            </div>
            <FieldError msg={errors.phone?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current Location <span className="text-red-500">*</span>
            </label>
            <input
              {...register("currentLocation")}
              placeholder="Enter your city / state"
              className={inputCls}
            />
            <FieldError msg={errors.currentLocation?.message} />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              LinkedIn Profile <span className="text-slate-400 font-normal">(if any)</span>
            </label>
            <input
              {...register("linkedInProfile")}
              placeholder="https://www.linkedin.com/in/yourprofile"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── 2. PROFESSIONAL DETAILS ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 2
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            Professional Details
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current Designation
            </label>
            <input
              {...register("currentDesignation")}
              placeholder="Enter your current designation"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Total Experience <span className="text-red-500">*</span>
            </label>
            <select {...register("totalExperience")} className={inputCls} defaultValue="">
              <option value="" disabled>Select experience</option>
              {EXPERIENCE_OPTIONS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
            <FieldError msg={errors.totalExperience?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Functional Area <span className="text-red-500">*</span>
            </label>
            <select {...register("functionalArea")} className={inputCls} defaultValue="">
              <option value="" disabled>Select functional area</option>
              {FUNCTIONAL_AREAS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <FieldError msg={errors.functionalArea?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Location <span className="text-red-500">*</span>
            </label>
            <select {...register("preferredLocation")} className={inputCls} defaultValue="">
              <option value="" disabled>Select preferred location</option>
              {PREFERRED_LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <FieldError msg={errors.preferredLocation?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Expected Role Type <span className="text-red-500">*</span>
            </label>
            <select {...register("expectedRoleType")} className={inputCls} defaultValue="">
              <option value="" disabled>Select role type</option>
              {ROLE_TYPES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 block mt-1">
              Full-time / Part-time / Remote / Volunteer / Internship
            </span>
            <FieldError msg={errors.expectedRoleType?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Expected Employment Type <span className="text-red-500">*</span>
            </label>
            <select {...register("expectedEmploymentType")} className={inputCls} defaultValue="">
              <option value="" disabled>Select employment type</option>
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 block mt-1">Permanent / Contractual</span>
            <FieldError msg={errors.expectedEmploymentType?.message} />
          </div>
        </div>
      </div>

      {/* ── 3. UPLOAD YOUR CV ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 3
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            Upload Your CV
          </h3>
        </div>

        <div className="border-2 border-dashed border-slate-200 hover:border-brand-green rounded-2xl p-6 text-center transition bg-slate-50/50">
          <UploadCloud className="w-10 h-10 text-brand-green mx-auto mb-2" />
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            Click to upload your CV or drag and drop
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOC, or DOCX (Max. 5 MB)</p>
          <label className="inline-block mt-3 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-xs transition">
            Choose File
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          {cvName && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-lg max-w-sm mx-auto">
              <FileText className="w-3.5 h-3.5" /> {cvName}
            </div>
          )}
          <FieldError msg={errors.cvFileName?.message} />
        </div>
      </div>

      {/* ── 4. ADDITIONAL INFORMATION ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 4
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            Additional Information
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Skill Highlights <span className="text-slate-400 font-normal">(comma separated)</span>
            </label>
            <input
              {...register("skillHighlights")}
              placeholder="e.g., Project Management, Communication, Teaching, Fundraising"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tell us about yourself <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              {...register("aboutYourself")}
              placeholder="Write a brief introduction about your experience, skills and areas of interest..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
            <FieldError msg={errors.aboutYourself?.message} />
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-start gap-2.5">
              <input
                id="careerAgreePrivacy"
                type="checkbox"
                {...register("agreePrivacy")}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
              />
              <label htmlFor="careerAgreePrivacy" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
                I agree to the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green font-bold hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                and consent to keep my details in IWF's talent database for future opportunities. <span className="text-red-500">*</span>
              </label>
            </div>
            <FieldError msg={errors.agreePrivacy?.message} />
          </div>
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
              Submit CV <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1 mt-2">
        <Lock className="w-3 h-3" /> Note: Your CV will be kept confidential and will only be used for relevant opportunities.
      </p>
    </form>
  );
}
