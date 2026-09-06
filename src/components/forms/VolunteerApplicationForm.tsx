import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FileText,
  CheckCircle2,
  RotateCcw,
  Send,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";
import { SectorSubclassificationPicker } from "@/components/forms/SectorSubclassificationPicker";
import { INDIAN_STATES, BIHAR_DISTRICTS } from "@/content/locations";

const volunteerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .regex(/^[^0-9]+$/, "Full name cannot contain numbers"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select gender"),
  countryCode: z.string().default("+91"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  address: z.string().trim().min(5, "Full address is required"),
  state: z.string().min(1, "Please select state"),
  district: z.string().min(1, "Please select/enter district"),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),

  qualification: z.string().optional(),
  occupation: z.string().optional(),
  organization: z.string().trim().optional(),

  areasOfInterest: z.array(z.string()).optional(),
  specifyAreaOfInterest: z.string().trim().optional(),

  availability: z.enum(["On-site", "Online", "Hybrid"], {
    required_error: "Please choose how you would like to volunteer",
  }),

  skills: z.string().trim().optional(),
  previousExperience: z.string().trim().optional(),
  motivation: z.string().trim().optional(),

  confirmAccuracy: z.literal(true, {
    errorMap: () => ({ message: "Please confirm that the information provided is accurate" }),
  }),
  agreePolicy: z.literal(true, {
    errorMap: () => ({ message: "Please read and agree to the Volunteer Policy and Code of Conduct" }),
  }),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

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

const BASE_AREAS = [
  "Education",
  "Healthcare",
  "Women Empowerment",
  "Livelihood & Skill Development",
  "Environment",
  "Rural Development",
  "Relief & Rehabilitation",
  "Other (Please specify)",
];

const QUALIFICATIONS = [
  "Secondary (10th)",
  "Higher Secondary (12th)",
  "Diploma",
  "Graduate / Bachelor's",
  "Post Graduate / Master's",
  "Doctorate / PhD",
  "Professional Degree (MBBS, CA, LLB, B.Tech, etc.)",
  "Other",
];

const OCCUPATIONS = [
  "Student",
  "Working Professional",
  "Teacher / Educator",
  "Doctor / Healthcare Worker",
  "Engineer / IT Professional",
  "Legal / Finance Professional",
  "Business / Entrepreneur",
  "Social Worker",
  "Retired Professional",
  "Homemaker",
  "Other",
];

interface VolunteerApplicationFormProps {
  onSuccess?: (appId: string) => void;
  isModal?: boolean;
}

export function VolunteerApplicationForm({ onSuccess, isModal = false }: VolunteerApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  // Sector subclassification state
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({});
  const [otherText, setOtherText] = useState("");
  const [sectorError, setSectorError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      countryCode: "+91",
      state: "Bihar",
      district: "Darbhanga",
      availability: "Hybrid",
      areasOfInterest: [],
    },
  });

  const selectedState = watch("state");
  const selectedBaseAreas = watch("areasOfInterest") || [];
  const currentAvailability = watch("availability");

  const toggleBaseArea = (area: string) => {
    const current = selectedBaseAreas;
    if (current.includes(area)) {
      setValue("areasOfInterest", current.filter((a) => a !== area));
    } else {
      setValue("areasOfInterest", [...current, area]);
    }
  };

  const handleSectorChange = (data: {
    sectors: string[];
    subcategories: Record<string, string[]>;
    otherText: string;
  }) => {
    setSelectedSectors(data.sectors);
    setSelectedSubcategories(data.subcategories);
    setOtherText(data.otherText);
    if (data.sectors.length > 0 || data.otherText.trim().length > 0) {
      setSectorError(null);
    }
  };

  const onSubmit = async (data: VolunteerFormData) => {
    if (selectedBaseAreas.length === 0 && selectedSectors.length === 0 && otherText.trim().length === 0) {
      setSectorError("Please select at least one area of interest.");
      return;
    }

    await new Promise((r) => setTimeout(r, 700));
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppId = `ISLAH-VOL-${new Date().getFullYear()}-${randomNum}`;
    setAppId(newAppId);
    setSubmitted(true);
    onSuccess?.(newAppId);
  };

  const handleResetForm = () => {
    reset({
      fullName: "",
      dob: "",
      gender: "",
      countryCode: "+91",
      phone: "",
      email: "",
      address: "",
      state: "Bihar",
      district: "Darbhanga",
      pincode: "",
      qualification: "",
      occupation: "",
      organization: "",
      areasOfInterest: [],
      specifyAreaOfInterest: "",
      availability: "Hybrid",
      skills: "",
      previousExperience: "",
      motivation: "",
    });
    setSelectedSectors([]);
    setSelectedSubcategories({});
    setOtherText("");
    setSectorError(null);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4 border-4 border-brand-green/20">
          <CheckCircle2 className="w-8 h-8 text-brand-green" />
        </div>
        <h3 className="text-2xl font-black text-brand-green-dark mb-1">
          Volunteer Application Submitted!
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-3">
          Thank you for applying to volunteer with ISLAH. Your reference ID is:
        </p>
        <div className="inline-block bg-slate-100 border border-slate-300 rounded-xl px-5 py-2.5 font-mono font-black text-slate-800 text-base mb-6">
          {appId}
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-lg mx-auto text-left text-xs text-slate-700 space-y-1.5 mb-6">
          <p className="font-bold text-brand-green-dark">What Happens Next?</p>
          <p>• Our team will review your application and get back to you within <strong>7 working days</strong>.</p>
          <p>• You will receive an orientation schedule matching your selected areas of interest.</p>
          <p>• Digital volunteer ID and induction kit will be issued upon onboarding.</p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            handleResetForm();
          }}
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-2.5 rounded-xl transition text-xs uppercase tracking-wider cursor-pointer"
        >
          Submit Another Application <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
      {/* ── Personal Information ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-wide">
            Personal Information
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
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
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("dob")}
                className={inputCls}
              />
              <FieldError msg={errors.dob?.message} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gender <span className="text-red-500">*</span>
              </label>
              <select {...register("gender")} className={inputCls} defaultValue="">
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <FieldError msg={errors.gender?.message} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
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
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("address")}
              placeholder="Enter your full address"
              className={inputCls}
            />
            <FieldError msg={errors.address?.message} />
          </div>

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
                District <span className="text-red-500">*</span>
              </label>
              {selectedState === "Bihar" ? (
                <select {...register("district")} className={inputCls}>
                  <option value="" disabled>Select District</option>
                  {BIHAR_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              ) : (
                <input
                  {...register("district")}
                  placeholder="Select District"
                  className={inputCls}
                />
              )}
              <FieldError msg={errors.district?.message} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                {...register("pincode", {
                  onChange: (e) => {
                    e.target.value = sanitizeDigits(e.target.value, 6);
                  },
                })}
                onKeyDown={blockNonDigitsOnKeyDown}
                maxLength={6}
                placeholder="Enter pincode"
                className={inputCls}
              />
              <FieldError msg={errors.pincode?.message} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Education & Occupation ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-wide">
            Education & Occupation
          </h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Highest Qualification
            </label>
            <select {...register("qualification")} className={inputCls} defaultValue="">
              <option value="">Select Qualification</option>
              {QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Occupation
            </label>
            <select {...register("occupation")} className={inputCls} defaultValue="">
              <option value="">Select Occupation</option>
              {OCCUPATIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Organization / Institution (if any)
            </label>
            <input
              {...register("organization")}
              placeholder="Enter organization / institution name"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── Areas of Interest (Page 4 Exact Checkboxes + Subclassification) ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-3">
          <label className="text-sm sm:text-base font-extrabold text-slate-800 tracking-wide block">
            Areas of Interest
          </label>
          <p className="text-xs text-slate-600 mt-0.5">
            I am interested in volunteering for: <span className="text-red-500">*</span>
          </p>
        </div>

        {/* 8 Checkbox Grid matching Page 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
          {BASE_AREAS.map((area) => {
            const isChecked = selectedBaseAreas.includes(area);
            return (
              <label
                key={area}
                onClick={() => toggleBaseArea(area)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition select-none ${
                  isChecked
                    ? "bg-brand-green/10 border-brand-green text-brand-green-dark"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
                />
                <span className="leading-tight">{area}</span>
              </label>
            );
          })}
        </div>

        {/* Specify area of interest input if Other or custom */}
        <div className="mb-4">
          <input
            {...register("specifyAreaOfInterest")}
            placeholder="Specify area of interest"
            className={inputCls}
          />
        </div>

        <p className="text-xs text-red-600 font-bold mb-3">
          Area of interest should be opted more than one and option for subclassified under different sector
        </p>

        {/* Subclassified Sector Picker */}
        <SectorSubclassificationPicker
          selectedSectors={selectedSectors}
          selectedSubcategories={selectedSubcategories}
          otherText={otherText}
          onChange={handleSectorChange}
          error={sectorError || undefined}
        />
      </div>

      {/* ── Availability ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-3">
          <label className="text-sm sm:text-base font-extrabold text-slate-800 tracking-wide block">
            Availability
          </label>
          <p className="text-xs text-slate-600 mt-0.5">
            How would you like to volunteer? <span className="text-red-500">*</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(["On-site", "Online", "Hybrid"] as const).map((mode) => (
            <label
              key={mode}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-xs sm:text-sm cursor-pointer transition select-none ${
                currentAvailability === mode
                  ? "border-brand-green bg-brand-green/10 text-brand-green-dark"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                value={mode}
                {...register("availability")}
                className="text-brand-green focus:ring-brand-green cursor-pointer"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
        <FieldError msg={errors.availability?.message} />
      </div>

      {/* ── Skills & Experience ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-wide">
            Skills & Experience
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Skills you would like to contribute
            </label>
            <input
              {...register("skills")}
              placeholder="Enter your skills"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Previous volunteering experience (if any)
            </label>
            <textarea
              rows={2}
              {...register("previousExperience")}
              placeholder="Describe your experience"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Why do you want to volunteer with IWF?
            </label>
            <textarea
              rows={3}
              {...register("motivation")}
              placeholder="Write your motivation"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>
      </div>

      {/* ── Declarations ── */}
      <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-start gap-2.5">
          <input
            id="volConfirmAccuracy"
            type="checkbox"
            {...register("confirmAccuracy")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
          />
          <label htmlFor="volConfirmAccuracy" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
            I confirm that the information provided above is true to the best of my knowledge. <span className="text-red-500">*</span>
          </label>
        </div>
        <FieldError msg={errors.confirmAccuracy?.message} />

        <div className="flex items-start gap-2.5">
          <input
            id="volAgreePolicy"
            type="checkbox"
            {...register("agreePolicy")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
          />
          <label htmlFor="volAgreePolicy" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
            I have read and agree to the{" "}
            <a
              href="/volunteer-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green font-bold hover:underline"
            >
              Volunteer Policy
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

      {/* ── Action Buttons ── */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={handleResetForm}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 cursor-pointer"
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

      <p className="text-[11px] text-center text-slate-400 mt-2">
        Our team will review your application and get back to you within 7 working days.
      </p>
    </form>
  );
}
