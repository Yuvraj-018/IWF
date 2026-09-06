import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  GraduationCap,
  CheckCircle2,
  RotateCcw,
  Send,
  AlertCircle,
  ArrowRight,
  Upload,
  UserCheck,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";
import { INDIAN_STATES, BIHAR_DISTRICTS } from "@/content/locations";

const mentorSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .regex(/^[^0-9]+$/, "Name cannot contain numbers"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select gender"),
  countryCode: z.string().default("+91"),
  mobile: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  email: z.string().trim().email("Valid email address is required"),
  fieldOfExpertise: z.string().trim().min(2, "Field of expertise is required"),
  currentOccupation: z.string().trim().optional(),
  address: z.string().trim().min(5, "Address is required"),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),

  highestQualification: z.string().optional(),
  totalExperience: z.string().optional(),
  organizationName: z.string().trim().optional(),

  mentorshipAreas: z
    .array(z.string())
    .min(1, "Please select at least one mentorship area"),
  otherAreaText: z.string().trim().optional(),
  modeOfMentorship: z.enum(["Online", "Offline", "Both"], {
    required_error: "Please select preferred mode",
  }),
  availability: z.enum(["Weekly", "Monthly", "Flexible"], {
    required_error: "Please select your availability",
  }),
  mentorshipType: z.enum(["One-to-One", "Group Mentoring", "Workshops / Seminars"]).optional(),

  motivation: z
    .string()
    .trim()
    .min(10, "Please share why you want to become a mentor (min 10 characters)"),
  contribution: z
    .string()
    .trim()
    .min(10, "Please share how you can contribute (min 10 characters)"),

  hasPriorExperience: z.enum(["Yes", "No"]).default("No"),
  priorExperienceDesc: z.string().trim().optional(),

  photoFile: z.any().optional(),
  resumeFile: z.any().optional(),
  idProofFile: z.any().optional(),

  confirmAccuracy: z.literal(true, {
    errorMap: () => ({ message: "Please confirm that the information provided is accurate" }),
  }),
  agreePolicy: z.literal(true, {
    errorMap: () => ({ message: "Please read and agree to the Policy and Code of Conduct" }),
  }),
});

type MentorFormData = z.infer<typeof mentorSchema>;

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

const MENTOR_AREAS = [
  "Career Guidance",
  "Academic Support",
  "Skill Development",
  "Entrepreneurship",
  "Personal Development",
  "Other",
];

const QUALIFICATIONS = [
  "Secondary (10th)",
  "Higher Secondary (12th)",
  "Diploma",
  "Graduate / Bachelor's",
  "Post Graduate / Master's",
  "Doctorate / PhD",
  "Professional Degree (B.Tech, MBBS, CA, LLB, MBA)",
  "Other",
];

const EXPERIENCE_RANGES = [
  "0 - 2 Years",
  "3 - 5 Years",
  "6 - 10 Years",
  "10 - 15 Years",
  "15+ Years",
];

interface MentorApplicationFormProps {
  onSuccess?: (appId: string) => void;
  isModal?: boolean;
}

export function MentorApplicationForm({ onSuccess, isModal = false }: MentorApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [idProofName, setIdProofName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MentorFormData>({
    resolver: zodResolver(mentorSchema),
    defaultValues: {
      countryCode: "+91",
      gender: "Male",
      state: "Bihar",
      city: "Darbhanga",
      modeOfMentorship: "Both",
      availability: "Flexible",
      mentorshipType: "One-to-One",
      hasPriorExperience: "No",
      mentorshipAreas: [],
    },
  });

  const selectedAreas = watch("mentorshipAreas") || [];
  const currentMode = watch("modeOfMentorship");
  const currentAvailability = watch("availability");
  const currentType = watch("mentorshipType");
  const priorExp = watch("hasPriorExperience");

  const toggleArea = (area: string) => {
    const current = selectedAreas;
    if (current.includes(area)) {
      setValue(
        "mentorshipAreas",
        current.filter((a) => a !== area),
        { shouldValidate: true }
      );
    } else {
      setValue("mentorshipAreas", [...current, area], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: MentorFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    const generatedId = `IWF-MNT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setAppId(generatedId);
    setSubmitted(true);
    onSuccess?.(generatedId);
  };

  const handleReset = () => {
    reset({
      fullName: "",
      dob: "",
      gender: "",
      countryCode: "+91",
      mobile: "",
      email: "",
      fieldOfExpertise: "",
      currentOccupation: "",
      address: "",
      city: "",
      state: "Bihar",
      pincode: "",
      highestQualification: "",
      totalExperience: "",
      organizationName: "",
      mentorshipAreas: [],
      otherAreaText: "",
      modeOfMentorship: "Both",
      availability: "Flexible",
      mentorshipType: "One-to-One",
      motivation: "",
      contribution: "",
      hasPriorExperience: "No",
      priorExperienceDesc: "",
    });
    setPhotoName(null);
    setResumeName(null);
    setIdProofName(null);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 border-4 border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-brand-green" />
        </div>
        <h3 className="text-2xl font-black text-brand-green-dark mb-1">
          Mentor Application Submitted!
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-3">
          Thank you for offering to mentor aspiring students and youth with ISLAH. Your reference ID is:
        </p>
        <div className="inline-block bg-slate-100 border border-slate-300 rounded-xl px-5 py-2.5 font-mono font-black text-slate-800 text-base mb-6">
          {appId}
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-lg mx-auto text-left text-xs text-slate-700 space-y-1.5 mb-6">
          <p className="font-bold text-brand-green-dark">What Happens Next?</p>
          <p>• Our mentorship coordinator will review your profile, experience, and uploaded credentials.</p>
          <p>• We will contact you within <strong>7 working days</strong> to schedule an introductory alignment call.</p>
          <p>• Mentees matching your domain and availability will be paired accordingly.</p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            handleReset();
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
      {/* ── 1. BASIC INFORMATION ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 1
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            1. BASIC INFORMATION
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
              <input type="date" {...register("dob")} className={inputCls} />
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

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
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
                  {...register("mobile", {
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
              <FieldError msg={errors.mobile?.message} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email ID <span className="text-red-500">*</span>
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Field of Expertise <span className="text-red-500">*</span>
              </label>
              <input
                {...register("fieldOfExpertise")}
                placeholder="e.g. Science, Law, Engineering, IT, Finance..."
                className={inputCls}
              />
              <FieldError msg={errors.fieldOfExpertise?.message} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current Occupation
              </label>
              <input
                {...register("currentOccupation")}
                placeholder="Enter your occupation"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="sm:col-span-4">
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

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <input
                {...register("city")}
                placeholder="Enter city"
                className={inputCls}
              />
              <FieldError msg={errors.city?.message} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                State <span className="text-red-500">*</span>
              </label>
              <select {...register("state")} className={inputCls} defaultValue="Bihar">
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <FieldError msg={errors.state?.message} />
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

      {/* ── 2. PROFESSIONAL DETAILS ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 2
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            2. PROFESSIONAL DETAILS
          </h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Highest Qualification
            </label>
            <select {...register("highestQualification")} className={inputCls} defaultValue="">
              <option value="">Select qualification</option>
              {QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Total Work Experience
            </label>
            <select {...register("totalExperience")} className={inputCls} defaultValue="">
              <option value="">Select experience</option>
              {EXPERIENCE_RANGES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Organization / Institution Name
            </label>
            <input
              {...register("organizationName")}
              placeholder="Enter organization name"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── 3. MENTORSHIP INTEREST ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 3
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            3. MENTORSHIP INTEREST
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Preferred Mentorship Area <span className="text-red-500">*</span>{" "}
              <span className="text-slate-400 font-normal">(select one or more)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {MENTOR_AREAS.map((area) => {
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
            {selectedAreas.includes("Other") && (
              <input
                {...register("otherAreaText")}
                placeholder="Specify other mentorship area..."
                className={`mt-2 ${inputCls}`}
              />
            )}
            <FieldError msg={errors.mentorshipAreas?.message} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Preferred Mode of Mentorship <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                {(["Online", "Offline", "Both"] as const).map((mode) => (
                  <label
                    key={mode}
                    className={`flex-1 p-2.5 rounded-xl border-2 text-center cursor-pointer transition ${
                      currentMode === mode
                        ? "border-brand-green bg-brand-green/5"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={mode}
                      {...register("modeOfMentorship")}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold text-slate-800">{mode}</span>
                  </label>
                ))}
              </div>
              <FieldError msg={errors.modeOfMentorship?.message} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Availability <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                {(["Weekly", "Monthly", "Flexible"] as const).map((avail) => (
                  <label
                    key={avail}
                    className={`flex-1 p-2.5 rounded-xl border-2 text-center cursor-pointer transition ${
                      currentAvailability === avail
                        ? "border-brand-green bg-brand-green/5"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={avail}
                      {...register("availability")}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold text-slate-800">{avail}</span>
                  </label>
                ))}
              </div>
              <FieldError msg={errors.availability?.message} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Preferred Mentorship Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["One-to-One", "Group Mentoring", "Workshops / Seminars"] as const).map((type) => (
                <label
                  key={type}
                  className={`p-2.5 rounded-xl border-2 text-center cursor-pointer transition ${
                    currentType === type
                      ? "border-brand-green bg-brand-green/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("mentorshipType")}
                    className="sr-only"
                  />
                  <span className="text-xs font-bold text-slate-800">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. MOTIVATION & CONTRIBUTION ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 4
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            4. MOTIVATION & CONTRIBUTION
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Why do you want to become a mentor? <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              {...register("motivation")}
              placeholder="Write your motivation..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
            <FieldError msg={errors.motivation?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              How can you contribute as a mentor? <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              {...register("contribution")}
              placeholder="Share your skills, experience and how you can guide others..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
            />
            <FieldError msg={errors.contribution?.message} />
          </div>
        </div>
      </div>

      {/* ── 5. EXPERIENCE (OPTIONAL) ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 5
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            5. EXPERIENCE (OPTIONAL)
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Do you have prior mentoring / teaching experience?
            </label>
            <div className="flex gap-4">
              {(["Yes", "No"] as const).map((ans) => (
                <label key={ans} className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="radio"
                    value={ans}
                    {...register("hasPriorExperience")}
                    className="text-brand-green focus:ring-brand-green"
                  />
                  {ans}
                </label>
              ))}
            </div>
          </div>

          {priorExp === "Yes" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                If yes, please describe
              </label>
              <textarea
                rows={2}
                {...register("priorExperienceDesc")}
                placeholder="Write about your mentoring / teaching experience..."
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── 6. UPLOAD DOCUMENTS ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 6
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            6. UPLOAD DOCUMENTS
          </h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {/* Photo */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-brand-green transition">
            <ImageIcon className="w-7 h-7 text-slate-400 mx-auto mb-2" />
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Upload Photo <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-slate-400 block mb-2">JPG, PNG (Max 2MB)</span>
            <label className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs cursor-pointer">
              Choose File
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={(e) => setPhotoName(e.target.files?.[0]?.name || null)}
              />
            </label>
            {photoName && <p className="text-[10px] text-emerald-600 font-bold mt-1.5 truncate">{photoName}</p>}
          </div>

          {/* Resume */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-brand-green transition">
            <FileText className="w-7 h-7 text-slate-400 mx-auto mb-2" />
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Upload Resume / CV <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-slate-400 block mb-2">PDF, DOC, DOCX (Max 5MB)</span>
            <label className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs cursor-pointer">
              Choose File
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => setResumeName(e.target.files?.[0]?.name || null)}
              />
            </label>
            {resumeName && <p className="text-[10px] text-emerald-600 font-bold mt-1.5 truncate">{resumeName}</p>}
          </div>

          {/* ID Proof (Optional) */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-brand-green transition">
            <Upload className="w-7 h-7 text-slate-400 mx-auto mb-2" />
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Upload ID Proof <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <span className="text-[10px] text-slate-400 block mb-2">PDF, JPG, PNG (Max 5MB)</span>
            <label className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs cursor-pointer">
              Choose File
              <input
                type="file"
                accept=".pdf,image/jpeg,image/png"
                className="sr-only"
                onChange={(e) => setIdProofName(e.target.files?.[0]?.name || null)}
              />
            </label>
            {idProofName && <p className="text-[10px] text-emerald-600 font-bold mt-1.5 truncate">{idProofName}</p>}
          </div>
        </div>
      </div>

      {/* ── 7. TERMS & CONFIRMATION ── */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-orange">
            Section 7
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0b1f3b] tracking-wide uppercase">
            TERMS & CONFIRMATION
          </h3>
        </div>

        <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-start gap-2.5">
            <input
              id="mentorConfirmAccuracy"
              type="checkbox"
              {...register("confirmAccuracy")}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
            />
            <label htmlFor="mentorConfirmAccuracy" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
              I confirm that the information provided above is true to the best of my knowledge and I would like to apply as a mentor for ISLAH. <span className="text-red-500">*</span>
            </label>
          </div>
          <FieldError msg={errors.confirmAccuracy?.message} />

          <div className="flex items-start gap-2.5">
            <input
              id="mentorAgreePolicy"
              type="checkbox"
              {...register("agreePolicy")}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
            />
            <label htmlFor="mentorAgreePolicy" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
              I have read and agree to the{" "}
              <a
                href="/mentorship-policy"
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

      <p className="text-[11px] text-center text-slate-400 mt-2">
        Our team will review your application and get back to you within 7 working days.
      </p>
    </form>
  );
}
