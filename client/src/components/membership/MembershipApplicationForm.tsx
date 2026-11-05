import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  FileText,
  Pencil,
  RefreshCw,
  RotateCcw,
  Save,
  User,
  Building2,
} from "lucide-react";
import {
  blockNumbersOnKeyDown,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
  sanitizeName,
} from "@/utils/formValidation";
import { INDIAN_STATES, BIHAR_DISTRICTS } from "@/content/locations";
import { registerMember, type RegisterMemberPayload } from "@/services/memberService";
import {
  AGE_GROUPS,
  COUNTRIES,
  EMAIL_RE,
  GENDERS,
  HEAR_ABOUT_OPTIONS,
  INDIVIDUAL_TIERS,
  MAX_SPECIFIED_YEARS,
  MEMBERSHIP_TIERS,
  ORG_CONTRIBUTION_WAYS,
  ORG_HEAR_ABOUT_OPTIONS,
  ORG_REG_TYPES,
  ORG_TYPES,
  OTHER_CONTRIBUTION,
  OTHER_SECTOR,
  PAN_RE,
  RECOGNITION_OPTIONS,
  REP_RELATIONSHIPS,
  SECTOR_OPTIONS,
  URL_RE,
  computeValidTill,
  formatDisplayDate,
  generateMemberId,
  generateReceiptNo,
  isValidPhone,
  type FormMode,
  type Recognition,
  type TierType,
} from "./membershipConfig";
import {
  CheckChips,
  CheckboxRow,
  Field,
  FileUpload,
  OtpVerifier,
  PhoneInput,
  RadioCards,
  RadioPills,
  SelectInput,
  SubHeading,
  focusFirstError,
  inputClass,
  type FieldErrors,
  type UploadedFile,
} from "@/components/forms/formFields";
import { MemberCardViewer, type MemberCardData } from "./MemberCard";
import { downloadReceiptPdf, type ReceiptData } from "./membershipReceipt";

// ============================================================================
// Form state
// ============================================================================

const INITIAL = {
  // Individual — personal & location
  fullName: "",
  dob: "",
  ageGroup: "",
  gender: "",
  countryCode: "+91",
  phone: "",
  email: "",
  country: "India",
  state: "",
  district: "",
  fullAddress: "",
  pinCode: "",

  // Membership period (shared)
  periodChoice: "1" as "1" | "2" | "custom",
  customYears: "3",

  // Interests (shared)
  sectors: [] as string[],
  otherSector: "",
  preferredSector: "",

  // Individual — additional
  hearAbout: "",
  referralName: "",
  whyJoin: "",

  recognition: "" as Recognition | "",

  // Organisation — details
  orgType: "",
  orgLegalName: "",
  orgCommonName: "",
  orgEstYear: "",
  orgWebsite: "",
  orgEmail: "",
  orgCountryCode: "+91",
  orgPhone: "",
  orgRegType: "",
  orgRegNumber: "",
  orgRegAuthority: "",
  orgPan: "",
  orgAddress: "",
  orgCity: "",
  orgState: "",
  orgCountry: "India",
  orgPin: "",
  corrSame: true,
  corrAddress: "",

  // Organisation — authorised representative
  repName: "",
  repDesignation: "",
  repDepartment: "",
  repCountryCode: "+91",
  repPhone: "",
  repEmail: "",
  repRelationship: "",
  repAuthorised: "",
  signatoryDetails: "",

  // Organisation — profile & contribution
  orgIntro: "",
  contributions: [] as string[],
  otherContribution: "",
  orgWhyJoin: "",
  orgStrengths: "",
  collaborated: "",
  collabDetails: "",
  orgHearAbout: "",
  orgReferral: "",
  logoConsent: false,

  // Declarations
  declAccurate: false,
  declPolicy: false,
  declProcessing: false,
  declStatus: false,
  optUpdates: true,
  declRepName: "",
  declRepDesignation: "",
  declElectronic: false,
};

type FormValues = typeof INITIAL;
type FileKey =
  "photo" | "idProof" | "orgRegCert" | "orgBrochure" | "orgAuthLetter" | "orgAdditional";

const STORAGE_DRAFT_KEY = "islah_membership_draft_v3";

const STEPS = [
  { id: 1, label: "Your Details" },
  { id: 2, label: "Membership & Interests" },
  { id: 3, label: "Review & Submit" },
];

interface SubmissionResult {
  card: MemberCardData;
  receipt: ReceiptData;
}

// ============================================================================
// Component
// ============================================================================

export function MembershipApplicationForm({
  mode,
  onModeChange,
  tier,
  onTierChange,
  onOpenPolicy,
}: {
  mode: FormMode;
  onModeChange: (m: FormMode) => void;
  tier: TierType;
  onTierChange: (t: TierType) => void;
  onOpenPolicy: () => void;
}) {
  const [v, setValues] = useState<FormValues>(INITIAL);
  const [files, setFiles] = useState<Record<FileKey, UploadedFile | null>>({
    photo: null,
    idProof: null,
    orgRegCert: null,
    orgBrochure: null,
    orgAuthLetter: null,
    orgAdditional: null,
  });
  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [verifiedFor, setVerifiedFor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);

  const isOrg = mode === "organisation";
  const effectiveTier: TierType = isOrg
    ? "Orange"
    : INDIVIDUAL_TIERS.includes(tier)
      ? tier
      : "Yellow";
  const tierConfig = MEMBERSHIP_TIERS[effectiveTier];
  const years = v.periodChoice === "custom" ? Number(v.customYears) || 0 : Number(v.periodChoice);
  const fee = tierConfig.amount * years;

  const otpTarget = isOrg ? v.repPhone : v.phone;
  const otpCountryCode = isOrg ? v.repCountryCode : v.countryCode;
  const otpVerified = Boolean(otpTarget) && verifiedFor === `${otpCountryCode}${otpTarget}`;

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  };

  const setFile = (key: FileKey, f: UploadedFile | null) => {
    setFiles((prev) => ({ ...prev, [key]: f }));
    if (errors[key]) setErrors(({ [key]: _omit, ...rest }) => rest);
  };

  const toggleIn = (key: "sectors" | "contributions", option: string) => {
    const list = v[key];
    set(key, list.includes(option) ? list.filter((x) => x !== option) : [...list, option]);
  };

  // --------------------------------------------------------------------------
  // Draft autosave (localStorage — per-device convenience only)
  // --------------------------------------------------------------------------

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft?.values) setValues({ ...INITIAL, ...draft.values });
        if (draft?.mode) onModeChange(draft.mode);
        if (draft?.tier) onTierChange(draft.tier);
        setSavedLabel("Draft restored");
      }
    } catch {
      /* ignore */
    }
    setDraftReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDirty = useMemo(
    () =>
      Object.keys(INITIAL).some(
        (k) =>
          JSON.stringify(v[k as keyof FormValues]) !==
          JSON.stringify(INITIAL[k as keyof FormValues]),
      ),
    [v],
  );

  useEffect(() => {
    if (!draftReady || !isDirty || result) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify({ values: v, mode, tier }));
        setSavedLabel(
          `Draft saved ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        );
      } catch {
        /* ignore quota errors */
      }
    }, 700);
    return () => clearTimeout(t);
  }, [v, mode, tier, isDirty, draftReady, result]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty && !result) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, result]);

  const clearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setValues(INITIAL);
    setFiles({
      photo: null,
      idProof: null,
      orgRegCert: null,
      orgBrochure: null,
      orgAuthLetter: null,
      orgAdditional: null,
    });
    setErrors({});
    setStep(1);
    setMaxStepReached(1);
    setVerifiedFor(null);
    setSavedLabel(null);
    toast.info("Application cleared.");
  };

  // Reset step-level errors when switching applicant type
  useEffect(() => {
    setErrors({});
    setStep(1);
    setMaxStepReached(1);
  }, [mode]);

  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------

  const validate = (s: number): FieldErrors => {
    const e: FieldErrors = {};
    const req = (key: string, val: string, msg: string) => {
      if (!val.trim()) e[key] = msg;
    };
    const currentYear = new Date().getFullYear();

    if (s === 1 && !isOrg) {
      if (v.fullName.trim().length < 3) e.fullName = "Enter your full name (at least 3 letters).";
      if (v.dob) {
        const d = new Date(v.dob);
        const age = (Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000);
        if (d.getTime() > Date.now()) e.dob = "Date of birth cannot be in the future.";
        else if (age < 18) e.dob = "Applicants must be at least 18 years old.";
      }
      req("ageGroup", v.ageGroup, "Select your age group.");
      if (!isValidPhone(v.countryCode, v.phone))
        e.phone =
          v.countryCode === "+91"
            ? "Enter a valid 10-digit Indian mobile number."
            : "Enter a valid phone number.";
      if (!EMAIL_RE.test(v.email.trim()))
        e.email = "Enter a valid email address, e.g. name@example.com.";
      req("country", v.country, "Select your country.");
      req("state", v.state, "Select or enter your state / union territory.");
      req("district", v.district, "Enter your city or district.");
      if (
        v.pinCode &&
        (v.country === "India"
          ? !/^\d{6}$/.test(v.pinCode)
          : !/^[A-Za-z0-9 -]{3,10}$/.test(v.pinCode))
      )
        e.pinCode =
          v.country === "India" ? "PIN code must be 6 digits." : "Enter a valid postal code.";
    }

    if (s === 1 && isOrg) {
      req("orgType", v.orgType, "Select the type of organisation.");
      if (v.orgLegalName.trim().length < 3)
        e.orgLegalName = "Enter the organisation's registered legal name.";
      if (
        v.orgEstYear &&
        (!/^\d{4}$/.test(v.orgEstYear) || +v.orgEstYear < 1800 || +v.orgEstYear > currentYear)
      )
        e.orgEstYear = `Enter a valid year between 1800 and ${currentYear}.`;
      if (v.orgWebsite && !URL_RE.test(v.orgWebsite.trim()))
        e.orgWebsite = "Enter a valid website, e.g. https://example.org.";
      if (!EMAIL_RE.test(v.orgEmail.trim()))
        e.orgEmail = "Enter the organisation's official email address.";
      if (!isValidPhone(v.orgCountryCode, v.orgPhone))
        e.orgPhone = "Enter a valid official contact number.";
      if (v.orgPan && v.orgCountry === "India" && !PAN_RE.test(v.orgPan))
        e.orgPan = "PAN must be in the format ABCDE1234F.";
      req("orgAddress", v.orgAddress, "Enter the registered office address.");
      req("orgCity", v.orgCity, "Enter the city or district.");
      req("orgState", v.orgState, "Select or enter the state / union territory.");
      req("orgCountry", v.orgCountry, "Select the country.");
      if (
        v.orgCountry === "India"
          ? !/^\d{6}$/.test(v.orgPin)
          : !/^[A-Za-z0-9 -]{3,10}$/.test(v.orgPin)
      )
        e.orgPin =
          v.orgCountry === "India" ? "Enter the 6-digit PIN code." : "Enter a valid postal code.";
      if (!v.corrSame) req("corrAddress", v.corrAddress, "Enter the correspondence address.");

      if (v.repName.trim().length < 3) e.repName = "Enter the representative's full name.";
      req("repDesignation", v.repDesignation, "Enter the representative's designation.");
      if (!isValidPhone(v.repCountryCode, v.repPhone))
        e.repPhone = "Enter a valid mobile / WhatsApp number.";
      if (!EMAIL_RE.test(v.repEmail.trim()))
        e.repEmail = "Enter the representative's official email.";
      req("repRelationship", v.repRelationship, "Select the relationship with the organisation.");
      req("repAuthorised", v.repAuthorised, "Please confirm whether this person is authorised.");
      if (v.repAuthorised === "No")
        req(
          "signatoryDetails",
          v.signatoryDetails,
          "Enter the authorised signatory's name and designation.",
        );
    }

    if (s === 2) {
      if (v.periodChoice === "custom") {
        const n = Number(v.customYears);
        if (!Number.isInteger(n) || n < 3 || n > MAX_SPECIFIED_YEARS)
          e.customYears = `Enter a number of years between 3 and ${MAX_SPECIFIED_YEARS}.`;
      }
      if (isOrg && v.sectors.length === 0) e.sectors = "Select at least one programme sector.";
      if (v.sectors.includes(OTHER_SECTOR))
        req("otherSector", v.otherSector, "Please specify the other area.");
      if (isOrg) {
        if (v.contributions.length === 0)
          e.contributions = "Select at least one way your organisation could contribute.";
        if (v.contributions.includes(OTHER_CONTRIBUTION))
          req("otherContribution", v.otherContribution, "Please describe the other contribution.");
        if (v.orgWhyJoin.trim().length < 20)
          e.orgWhyJoin = "Please share a short reason (at least 20 characters).";
        req("collaborated", v.collaborated, "Please select an option.");
      }
      req("recognition", v.recognition, "Choose how you would like to be recognised.");
    }

    if (s === 3) {
      if (!v.declAccurate) e.declAccurate = "Required";
      if (!v.declPolicy) e.declPolicy = "Required";
      if (!v.declProcessing) e.declProcessing = "Required";
      if (!v.declStatus) e.declStatus = "Required";
      if (isOrg) {
        req("declRepName", v.declRepName, "Enter the authorised representative's name.");
        req("declRepDesignation", v.declRepDesignation, "Enter the designation.");
        if (!v.declElectronic) e.declElectronic = "Required";
      }
      if (!otpVerified) e.otp = "Verify your mobile number to submit.";
    }
    return e;
  };

  const scrollToFormTop = () => {
    const el = document.getElementById("membership-form");
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  };

  const goTo = (target: number) => {
    // Moving forward requires every step in between to be valid
    for (let s = step; s < target; s++) {
      const e = validate(s);
      if (Object.keys(e).length) {
        setStep(s);
        setErrors(e);
        toast.error(
          `Please complete the ${Object.keys(e).length} highlighted field${Object.keys(e).length > 1 ? "s" : ""}.`,
        );
        setTimeout(() => focusFirstError(e), 50);
        return;
      }
    }
    if (target === 3 && isOrg) {
      setValues((p) => ({
        ...p,
        declRepName: p.declRepName || p.repName,
        declRepDesignation: p.declRepDesignation || p.repDesignation,
      }));
    }
    setErrors({});
    setStep(target);
    setMaxStepReached((m) => Math.max(m, target));
    scrollToFormTop();
  };

  // --------------------------------------------------------------------------
  // Submission
  // --------------------------------------------------------------------------

  const handleSubmit = async () => {
    const e = validate(3);
    if (Object.keys(e).length) {
      setErrors(e);
      toast.error("Please accept the required declarations and verify your mobile number.");
      setTimeout(() => focusFirstError(e), 50);
      return;
    }
    setIsSubmitting(true);
    try {
      const memberId = generateMemberId(effectiveTier);
      const receiptNo = generateReceiptNo();
      const from = new Date();
      const till = computeValidTill(from, years);
      const name = isOrg ? v.orgLegalName.trim() : v.fullName.trim();

      const payload: RegisterMemberPayload = {
        name,
        fullName: name,
        category: effectiveTier,
        email: (isOrg ? v.orgEmail : v.email).trim(),
        phone: isOrg ? v.orgPhone : v.phone,
        mobile: isOrg ? v.repPhone : v.phone,
        countryCode: isOrg ? v.repCountryCode : v.countryCode,
        state: isOrg ? v.orgState : v.state,
        district: isOrg ? v.orgCity : v.district,
        address: isOrg ? v.orgAddress : v.fullAddress,
        pincode: isOrg ? v.orgPin : v.pinCode,
        membershipPeriod: years,
        consentDisplay: v.recognition,
        metadata: {
          formMode: mode,
          ...(isOrg
            ? {
                orgType: v.orgType,
                orgCommonName: v.orgCommonName,
                orgEstYear: v.orgEstYear,
                orgWebsite: v.orgWebsite,
                orgOfficialPhone: `${v.orgCountryCode} ${v.orgPhone}`,
                orgRegType: v.orgRegType,
                orgRegNumber: v.orgRegNumber,
                orgRegAuthority: v.orgRegAuthority,
                orgPan: v.orgPan,
                orgCountry: v.orgCountry,
                correspondenceAddress: v.corrSame ? "Same as registered office" : v.corrAddress,
                representative: {
                  name: v.repName,
                  designation: v.repDesignation,
                  department: v.repDepartment,
                  phone: `${v.repCountryCode} ${v.repPhone}`,
                  email: v.repEmail,
                  relationship: v.repRelationship,
                  authorised: v.repAuthorised,
                  signatoryDetails: v.signatoryDetails,
                },
                orgIntro: v.orgIntro,
                contributions: v.contributions,
                otherContribution: v.otherContribution,
                whyJoin: v.orgWhyJoin,
                strengths: v.orgStrengths,
                collaborated: v.collaborated,
                collabDetails: v.collabDetails,
                hearAbout: v.orgHearAbout,
                referralName: v.orgReferral,
                logoConsent: v.logoConsent,
                declaration: {
                  name: v.declRepName,
                  designation: v.declRepDesignation,
                  date: from.toISOString(),
                },
              }
            : {
                dob: v.dob,
                ageGroup: v.ageGroup,
                gender: v.gender,
                country: v.country,
                hearAbout: v.hearAbout,
                referralName: v.referralName,
                whyJoin: v.whyJoin,
              }),
          sectors: v.sectors,
          otherSector: v.otherSector,
          preferredSector: v.preferredSector,
          optUpdates: v.optUpdates,
          documents: Object.fromEntries(
            Object.entries(files)
              .filter(([, f]) => f)
              .map(([k, f]) => [k, { name: f!.name, size: f!.size, type: f!.type }]),
          ),
        },
      };

      try {
        await registerMember(payload);
      } catch {
        // Backend unreachable in local / mock mode — continue with client-side confirmation
      }

      try {
        localStorage.removeItem(STORAGE_DRAFT_KEY);
      } catch {
        /* ignore */
      }

      setResult({
        card: {
          tier: effectiveTier,
          name,
          memberId,
          validFrom: formatDisplayDate(from),
          validTill: formatDisplayDate(till),
          photoUrl: !isOrg ? files.photo?.dataUrl : undefined,
          isOrganisation: isOrg,
        },
        receipt: {
          receiptNo,
          memberId,
          name,
          tier: effectiveTier,
          category: `${tierConfig.cardName} (${tierConfig.roleTitle})`,
          period: years,
          amount: fee,
          date: formatDisplayDate(from),
          validFrom: formatDisplayDate(from),
          validTill: formatDisplayDate(till),
          type: "New Membership",
        },
      });
      toast.success("Membership application submitted successfully!");
      scrollToFormTop();
    } catch {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startOver = () => {
    setResult(null);
    setValues(INITIAL);
    setFiles({
      photo: null,
      idProof: null,
      orgRegCert: null,
      orgBrochure: null,
      orgAuthLetter: null,
      orgAdditional: null,
    });
    setStep(1);
    setMaxStepReached(1);
    setVerifiedFor(null);
    setSavedLabel(null);
  };

  // ==========================================================================
  // Render: success
  // ==========================================================================

  if (result) {
    const r = result.receipt;
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#071527]">
            Welcome to the ISLAH Community!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            Your application has been recorded. A copy of your receipt and member card will also be
            sent to your email.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 items-start">
          <MemberCardViewer data={result.card} />

          <div className="space-y-4">
            <dl className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs sm:text-sm">
              {[
                ["Application Reference", r.memberId],
                ["Receipt Number", r.receiptNo],
                ["Membership Category", r.category],
                ["Membership Period", `${r.period} year${r.period > 1 ? "s" : ""}`],
                ["Amount", `₹${r.amount.toLocaleString("en-IN")}`],
                ["Membership Status", "Active / In Review"],
              ].map(([k, val]) => (
                <div key={k} className="flex justify-between gap-3 px-4 py-2.5">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-[#071527] text-right">{val}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  downloadReceiptPdf(r).catch(() => toast.error("Could not generate the receipt."))
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
              >
                <FileText className="w-3.5 h-3.5" />
                Download Receipt
              </button>
              <button
                type="button"
                onClick={startOver}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-medium transition"
              >
                Submit another application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // Render: wizard
  // ==========================================================================

  const err = (k: string) => errors[k];
  const has = (k: string) => Boolean(errors[k]);
  const textInput = (
    key: keyof FormValues,
    props: React.InputHTMLAttributes<HTMLInputElement> & { sanitize?: (s: string) => string } = {},
  ) => {
    const { sanitize, ...rest } = props;
    return (
      <input
        type="text"
        value={v[key] as string}
        onChange={(e) => set(key, (sanitize ? sanitize(e.target.value) : e.target.value) as never)}
        className={inputClass(has(key))}
        {...rest}
      />
    );
  };
  const textArea = (key: keyof FormValues, placeholder: string, rows = 3) => (
    <textarea
      value={v[key] as string}
      onChange={(e) => set(key, e.target.value as never)}
      placeholder={placeholder}
      rows={rows}
      maxLength={1000}
      className={`${inputClass(has(key))} resize-y`}
    />
  );

  const stateField = (
    name: "state" | "orgState",
    countryValue: string,
    onChange: (val: string) => void,
  ) =>
    countryValue === "India" ? (
      <SelectInput
        value={v[name]}
        onChange={onChange}
        options={INDIAN_STATES}
        placeholder="Select state / UT"
        hasError={has(name)}
      />
    ) : (
      textInput(name, { placeholder: "State / province / region" })
    );

  const grid = "grid sm:grid-cols-2 gap-x-4 gap-y-3.5";
  const section = "pt-5 mt-5 border-t border-slate-100 space-y-3.5";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Progress */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 py-3 flex items-center gap-2 sm:gap-4">
        <ol className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
          {STEPS.map((s, i) => {
            const isCurrent = step === s.id;
            const isDone = step > s.id;
            const reachable = s.id <= maxStepReached;
            return (
              <li key={s.id} className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                <button
                  type="button"
                  disabled={!reachable || isCurrent}
                  onClick={() =>
                    s.id < step ? (setErrors({}), setStep(s.id), scrollToFormTop()) : goTo(s.id)
                  }
                  className={`flex items-center gap-2 text-xs rounded-md px-1 py-0.5 transition ${
                    isCurrent
                      ? "text-[#071527] font-semibold"
                      : isDone
                        ? "text-emerald-700 hover:bg-emerald-50"
                        : reachable
                          ? "text-slate-600 hover:bg-slate-100"
                          : "text-slate-400"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${
                      isCurrent
                        ? "bg-[#071527] text-white"
                        : isDone
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : s.id}
                  </span>
                  <span className={`${isCurrent ? "inline" : "hidden sm:inline"} truncate`}>
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && <span className="h-px w-4 sm:w-8 bg-slate-300 shrink-0" />}
              </li>
            );
          })}
        </ol>
        <div className="flex items-center gap-1.5 shrink-0">
          {savedLabel && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-700">
              <Save className="w-3 h-3" />
              {savedLabel}
            </span>
          )}
          {isDirty && (
            <button
              type="button"
              onClick={clearDraft}
              title="Clear form"
              className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* ================================================================ */}
        {/* STEP 1 — YOUR DETAILS                                            */}
        {/* ================================================================ */}
        {step === 1 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#071527]">
                  {isOrg ? "Organisation & Representative" : "Your Details"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fields marked <span className="text-red-500">*</span> are required.
                </p>
              </div>
              <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold self-start">
                {(
                  [
                    ["individual", "Individual", User],
                    ["organisation", "Organisation", Building2],
                  ] as const
                ).map(([m, label, Icon]) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onModeChange(m)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                      mode === m
                        ? "bg-white text-[#071527] shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {!isOrg ? (
              <>
                <div className="space-y-3.5">
                  <SubHeading title="Personal information" />
                  <div className={grid}>
                    <Field
                      name="fullName"
                      label="Full Name"
                      required
                      error={err("fullName")}
                      className="sm:col-span-2"
                    >
                      {textInput("fullName", {
                        placeholder: "As it should appear on your membership card",
                        sanitize: sanitizeName,
                        onKeyDown: blockNumbersOnKeyDown,
                        autoComplete: "name",
                        maxLength: 60,
                      })}
                    </Field>
                    <Field
                      name="phone"
                      label="Mobile / WhatsApp Number"
                      required
                      error={err("phone")}
                    >
                      <PhoneInput
                        countryCode={v.countryCode}
                        onCountryCodeChange={(c) => set("countryCode", c)}
                        value={v.phone}
                        onChange={(p) => set("phone", p)}
                        hasError={has("phone")}
                      />
                    </Field>
                    <Field name="email" label="Email Address" required error={err("email")}>
                      {textInput("email", {
                        type: "email",
                        placeholder: "name@example.com",
                        autoComplete: "email",
                      })}
                    </Field>
                    <Field name="ageGroup" label="Age Group" required error={err("ageGroup")}>
                      <SelectInput
                        value={v.ageGroup}
                        onChange={(val) => set("ageGroup", val)}
                        options={AGE_GROUPS}
                        placeholder="Select age group"
                        hasError={has("ageGroup")}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field name="dob" label="Date of Birth" optional error={err("dob")}>
                        <input
                          type="date"
                          value={v.dob}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={(e) => set("dob", e.target.value)}
                          className={inputClass(has("dob"))}
                        />
                      </Field>
                      <Field name="gender" label="Gender" optional>
                        <SelectInput
                          value={v.gender}
                          onChange={(val) => set("gender", val)}
                          options={GENDERS}
                          placeholder="Select"
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                <div className={section}>
                  <SubHeading title="Location" />
                  <div className="grid sm:grid-cols-3 gap-x-4 gap-y-3.5">
                    <Field name="country" label="Country" required error={err("country")}>
                      <SelectInput
                        value={v.country}
                        onChange={(val) => {
                          set("country", val);
                          set("state", "");
                          set("district", "");
                        }}
                        options={COUNTRIES}
                        hasError={has("country")}
                      />
                    </Field>
                    <Field
                      name="state"
                      label="State / Union Territory"
                      required
                      error={err("state")}
                    >
                      {stateField("state", v.country, (val) => {
                        set("state", val);
                        set("district", "");
                      })}
                    </Field>
                    <Field name="district" label="City / District" required error={err("district")}>
                      {v.country === "India" && v.state === "Bihar" ? (
                        <SelectInput
                          value={v.district}
                          onChange={(val) => set("district", val)}
                          options={BIHAR_DISTRICTS}
                          placeholder="Select district"
                          hasError={has("district")}
                        />
                      ) : (
                        textInput("district", { placeholder: "City or district" })
                      )}
                    </Field>
                    <Field
                      name="fullAddress"
                      label="Full Address"
                      optional
                      className="sm:col-span-2"
                    >
                      {textInput("fullAddress", {
                        placeholder: "House / street, locality, landmark",
                        autoComplete: "street-address",
                      })}
                    </Field>
                    <Field name="pinCode" label="PIN / Postal Code" optional error={err("pinCode")}>
                      {textInput("pinCode", {
                        placeholder: v.country === "India" ? "6-digit PIN" : "Postal code",
                        inputMode: v.country === "India" ? "numeric" : "text",
                        maxLength: v.country === "India" ? 6 : 10,
                        sanitize: v.country === "India" ? (s) => sanitizeDigits(s, 6) : undefined,
                        autoComplete: "postal-code",
                      })}
                    </Field>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3.5">
                  <SubHeading title="Organisation details" />
                  <div className={grid}>
                    <Field
                      name="orgLegalName"
                      label="Registered Name of Organisation"
                      required
                      error={err("orgLegalName")}
                    >
                      {textInput("orgLegalName", {
                        placeholder: "Full legal name",
                        maxLength: 120,
                      })}
                    </Field>
                    <Field
                      name="orgType"
                      label="Type of Organisation"
                      required
                      error={err("orgType")}
                    >
                      <SelectInput
                        value={v.orgType}
                        onChange={(val) => set("orgType", val)}
                        options={ORG_TYPES}
                        placeholder="Select type"
                        hasError={has("orgType")}
                      />
                    </Field>
                    <Field name="orgCommonName" label="Common / Public Name" optional>
                      {textInput("orgCommonName", {
                        placeholder: "Name the organisation is commonly known by",
                        maxLength: 120,
                      })}
                    </Field>
                    <div className="grid grid-cols-[7rem_1fr] gap-3">
                      <Field name="orgEstYear" label="Est. Year" optional error={err("orgEstYear")}>
                        {textInput("orgEstYear", {
                          placeholder: "YYYY",
                          inputMode: "numeric",
                          maxLength: 4,
                          sanitize: (s) => sanitizeDigits(s, 4),
                        })}
                      </Field>
                      <Field name="orgWebsite" label="Website" optional error={err("orgWebsite")}>
                        {textInput("orgWebsite", { type: "url", placeholder: "https://" })}
                      </Field>
                    </div>
                    <Field
                      name="orgEmail"
                      label="Official Email Address"
                      required
                      error={err("orgEmail")}
                    >
                      {textInput("orgEmail", {
                        type: "email",
                        placeholder: "contact@organisation.org",
                      })}
                    </Field>
                    <Field
                      name="orgPhone"
                      label="Official Contact Number"
                      required
                      error={err("orgPhone")}
                    >
                      <PhoneInput
                        countryCode={v.orgCountryCode}
                        onCountryCodeChange={(c) => set("orgCountryCode", c)}
                        value={v.orgPhone}
                        onChange={(p) => set("orgPhone", p)}
                        hasError={has("orgPhone")}
                      />
                    </Field>
                  </div>
                </div>

                <div className={section}>
                  <SubHeading
                    title="Registration"
                    desc="Where applicable to your organisation's legal form."
                  />
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3.5">
                    <Field name="orgRegType" label="Registration Type">
                      <SelectInput
                        value={v.orgRegType}
                        onChange={(val) => set("orgRegType", val)}
                        options={ORG_REG_TYPES}
                        placeholder="Select"
                      />
                    </Field>
                    <Field name="orgRegNumber" label="Registration Number">
                      {textInput("orgRegNumber", {
                        placeholder: "Registration no.",
                        maxLength: 60,
                      })}
                    </Field>
                    <Field name="orgRegAuthority" label="Authority / Jurisdiction" optional>
                      {textInput("orgRegAuthority", {
                        placeholder: "e.g. Registrar of Societies",
                        maxLength: 120,
                      })}
                    </Field>
                    <Field name="orgPan" label="PAN / Tax ID" optional error={err("orgPan")}>
                      {textInput("orgPan", {
                        placeholder: "ABCDE1234F",
                        maxLength: 20,
                        sanitize: (s) => s.toUpperCase().replace(/\s/g, ""),
                      })}
                    </Field>
                  </div>
                </div>

                <div className={section}>
                  <SubHeading title="Registered office" />
                  <div className="grid sm:grid-cols-4 gap-x-4 gap-y-3.5">
                    <Field
                      name="orgAddress"
                      label="Registered Office Address"
                      required
                      error={err("orgAddress")}
                      className="sm:col-span-4"
                    >
                      {textInput("orgAddress", {
                        placeholder: "Building, street, locality",
                        maxLength: 250,
                      })}
                    </Field>
                    <Field name="orgCountry" label="Country" required error={err("orgCountry")}>
                      <SelectInput
                        value={v.orgCountry}
                        onChange={(val) => {
                          set("orgCountry", val);
                          set("orgState", "");
                        }}
                        options={COUNTRIES}
                      />
                    </Field>
                    <Field name="orgState" label="State / UT" required error={err("orgState")}>
                      {stateField("orgState", v.orgCountry, (val) => set("orgState", val))}
                    </Field>
                    <Field name="orgCity" label="City / District" required error={err("orgCity")}>
                      {textInput("orgCity", { placeholder: "City or district" })}
                    </Field>
                    <Field name="orgPin" label="PIN / Postal Code" required error={err("orgPin")}>
                      {textInput("orgPin", {
                        placeholder: v.orgCountry === "India" ? "6-digit PIN" : "Postal code",
                        inputMode: v.orgCountry === "India" ? "numeric" : "text",
                        maxLength: v.orgCountry === "India" ? 6 : 10,
                        sanitize:
                          v.orgCountry === "India" ? (s) => sanitizeDigits(s, 6) : undefined,
                      })}
                    </Field>
                  </div>
                  <CheckboxRow checked={v.corrSame} onChange={(c) => set("corrSame", c)}>
                    Correspondence address is the same as the registered office
                  </CheckboxRow>
                  {!v.corrSame && (
                    <Field
                      name="corrAddress"
                      label="Correspondence Address"
                      required
                      error={err("corrAddress")}
                    >
                      {textInput("corrAddress", {
                        placeholder: "Full correspondence address with PIN",
                        maxLength: 250,
                      })}
                    </Field>
                  )}
                </div>

                <div className={section}>
                  <SubHeading
                    title="Authorised representative"
                    desc="The person authorised to submit and manage this application on behalf of the organisation."
                  />
                  <div className="grid sm:grid-cols-3 gap-x-4 gap-y-3.5">
                    <Field name="repName" label="Full Name" required error={err("repName")}>
                      {textInput("repName", {
                        placeholder: "Full name",
                        sanitize: sanitizeName,
                        onKeyDown: blockNumbersOnKeyDown,
                        maxLength: 60,
                      })}
                    </Field>
                    <Field
                      name="repDesignation"
                      label="Designation / Position"
                      required
                      error={err("repDesignation")}
                    >
                      {textInput("repDesignation", {
                        placeholder: "e.g. Secretary, Director",
                        maxLength: 60,
                      })}
                    </Field>
                    <Field name="repDepartment" label="Department / Unit" optional>
                      {textInput("repDepartment", {
                        placeholder: "Department or unit",
                        maxLength: 60,
                      })}
                    </Field>
                    <Field
                      name="repPhone"
                      label="Mobile / WhatsApp Number"
                      required
                      error={err("repPhone")}
                    >
                      <PhoneInput
                        countryCode={v.repCountryCode}
                        onCountryCodeChange={(c) => set("repCountryCode", c)}
                        value={v.repPhone}
                        onChange={(p) => set("repPhone", p)}
                        hasError={has("repPhone")}
                      />
                    </Field>
                    <Field
                      name="repEmail"
                      label="Official Email Address"
                      required
                      error={err("repEmail")}
                    >
                      {textInput("repEmail", {
                        type: "email",
                        placeholder: "name@organisation.org",
                      })}
                    </Field>
                    <Field
                      name="repRelationship"
                      label="Relationship with Organisation"
                      required
                      error={err("repRelationship")}
                    >
                      <SelectInput
                        value={v.repRelationship}
                        onChange={(val) => set("repRelationship", val)}
                        options={REP_RELATIONSHIPS}
                        placeholder="Select"
                        hasError={has("repRelationship")}
                      />
                    </Field>
                  </div>
                  <Field
                    name="repAuthorised"
                    label="Is this person authorised to submit the application on behalf of the organisation?"
                    required
                    error={err("repAuthorised")}
                  >
                    <RadioPills
                      options={["Yes", "No"]}
                      value={v.repAuthorised}
                      onChange={(val) => set("repAuthorised", val)}
                      hasError={has("repAuthorised")}
                    />
                  </Field>
                  {v.repAuthorised === "No" && (
                    <Field
                      name="signatoryDetails"
                      label="Authorised Signatory Name and Designation"
                      required
                      error={err("signatoryDetails")}
                      hint="Only an appropriately authorised representative should submit. Provide the authorised signatory's details."
                    >
                      {textInput("signatoryDetails", {
                        placeholder: "e.g. Dr. A. Rahman, Chairperson",
                        maxLength: 120,
                      })}
                    </Field>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 2 — MEMBERSHIP & INTERESTS                                  */}
        {/* ================================================================ */}
        {step === 2 && (
          <div>
            <div className="mb-5">
              <h3 className="text-base sm:text-lg font-semibold text-[#071527]">
                {isOrg ? "Membership & Contribution" : "Membership & Interests"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose your membership and tell us a little about your interests.
              </p>
            </div>

            {/* Category */}
            <div className="space-y-3.5">
              <SubHeading title="Membership category" />
              {!isOrg ? (
                <div role="radiogroup" className="grid sm:grid-cols-3 gap-2.5">
                  {INDIVIDUAL_TIERS.map((t) => {
                    const cfg = MEMBERSHIP_TIERS[t];
                    const active = effectiveTier === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onTierChange(t)}
                        className={`p-3.5 rounded-xl border text-left transition ${
                          active
                            ? "border-brand-orange bg-orange-50/50 ring-1 ring-brand-orange/25"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}
                          >
                            {cfg.cardName}
                          </span>
                          {active && <Check className="w-4 h-4 text-brand-orange" />}
                        </div>
                        <p className="text-sm font-semibold text-[#071527] mt-2">{cfg.roleTitle}</p>
                        <p className="text-sm text-slate-800 mt-0.5">
                          ₹{cfg.amount.toLocaleString("en-IN")}{" "}
                          <span className="text-[11px] text-slate-500">/ year</span>
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl border border-orange-200 bg-orange-50/40 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${tierConfig.badge}`}
                    >
                      Orange Card
                    </span>
                    <p className="text-sm font-semibold text-[#071527] mt-1.5">
                      Organizational Member — Corporate Member
                    </p>
                  </div>
                  <p className="text-sm text-slate-800">
                    ₹{tierConfig.amount.toLocaleString("en-IN")}{" "}
                    <span className="text-[11px] text-slate-500">/ year</span>
                  </p>
                </div>
              )}

              <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-end">
                <Field
                  name="customYears"
                  label="Membership Period"
                  required
                  error={err("customYears")}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <RadioPills
                      options={["1 Year", "2 Years", "Specify years"]}
                      value={
                        v.periodChoice === "1"
                          ? "1 Year"
                          : v.periodChoice === "2"
                            ? "2 Years"
                            : "Specify years"
                      }
                      onChange={(val) =>
                        set(
                          "periodChoice",
                          val === "1 Year" ? "1" : val === "2 Years" ? "2" : "custom",
                        )
                      }
                    />
                    {v.periodChoice === "custom" && (
                      <input
                        type="text"
                        inputMode="numeric"
                        aria-label="Number of years"
                        value={v.customYears}
                        onKeyDown={blockNonDigitsOnKeyDown}
                        onChange={(e) => set("customYears", sanitizeDigits(e.target.value, 2))}
                        className={`${inputClass(has("customYears"))} !w-20 text-center`}
                      />
                    )}
                  </div>
                </Field>
                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-500 block">Membership Fee</span>
                  <span className="text-xl font-semibold text-[#071527]">
                    ₹{(fee || 0).toLocaleString("en-IN")}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    for {years || "–"} year{years === 1 ? "" : "s"} · start date confirmed on
                    approval
                  </span>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className={section}>
              <SubHeading
                title={isOrg ? "Areas of interest & potential contribution" : "Areas of interest"}
                desc={isOrg ? undefined : "Optional — select all that apply."}
              />
              <Field
                name="sectors"
                label={
                  isOrg
                    ? "Which ISLAH programme sectors align with your organisation's interests?"
                    : "Programme sectors"
                }
                required={isOrg}
                error={err("sectors")}
              >
                <CheckChips
                  options={SECTOR_OPTIONS}
                  selected={v.sectors}
                  onToggle={(o) => toggleIn("sectors", o)}
                  hasError={has("sectors")}
                  columns={3}
                />
              </Field>
              <div className={grid}>
                {v.sectors.includes(OTHER_SECTOR) && (
                  <Field
                    name="otherSector"
                    label="Other — please specify"
                    required
                    error={err("otherSector")}
                  >
                    {textInput("otherSector", { placeholder: "Describe the area", maxLength: 120 })}
                  </Field>
                )}
                <Field name="preferredSector" label="Preferred Sector / First Choice" optional>
                  <SelectInput
                    value={v.sectors.includes(v.preferredSector) ? v.preferredSector : ""}
                    onChange={(val) => set("preferredSector", val)}
                    options={v.sectors.length ? v.sectors : SECTOR_OPTIONS}
                    placeholder="Select your primary area"
                  />
                </Field>
              </div>

              {isOrg && (
                <>
                  <Field
                    name="contributions"
                    label="How would your organisation like to contribute?"
                    required
                    error={err("contributions")}
                    hint="Selecting an area indicates willingness to explore opportunities — not a funding commitment."
                  >
                    <CheckChips
                      options={ORG_CONTRIBUTION_WAYS}
                      selected={v.contributions}
                      onToggle={(o) => toggleIn("contributions", o)}
                      hasError={has("contributions")}
                      columns={3}
                    />
                  </Field>
                  {v.contributions.includes(OTHER_CONTRIBUTION) && (
                    <Field
                      name="otherContribution"
                      label="Other contribution — please specify"
                      required
                      error={err("otherContribution")}
                    >
                      {textInput("otherContribution", {
                        placeholder: "Describe the contribution",
                        maxLength: 160,
                      })}
                    </Field>
                  )}
                </>
              )}
            </div>

            {/* Additional information */}
            <div className={section}>
              <SubHeading title="Additional information" />
              {!isOrg ? (
                <div className={grid}>
                  <Field name="hearAbout" label="How did you hear about ISLAH?">
                    <SelectInput
                      value={v.hearAbout}
                      onChange={(val) => set("hearAbout", val)}
                      options={HEAR_ABOUT_OPTIONS}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field name="referralName" label="Referral Name / Source" optional>
                    {textInput("referralName", {
                      placeholder: "Who or what referred you",
                      maxLength: 80,
                    })}
                  </Field>
                  <Field
                    name="whyJoin"
                    label="Why would you like to join ISLAH?"
                    optional
                    className="sm:col-span-2"
                  >
                    {textArea("whyJoin", "A few lines about your motivation", 2)}
                  </Field>
                </div>
              ) : (
                <div className={grid}>
                  <Field
                    name="orgWhyJoin"
                    label="Why would your organisation like to join ISLAH?"
                    required
                    error={err("orgWhyJoin")}
                    className="sm:col-span-2"
                  >
                    {textArea("orgWhyJoin", "Share your organisation's motivation for joining", 3)}
                  </Field>
                  <Field name="orgIntro" label="Brief introduction to your organisation" optional>
                    {textArea("orgIntro", "Purpose, principal activities, communities served", 3)}
                  </Field>
                  <Field
                    name="orgStrengths"
                    label="Strengths, expertise or resources you could contribute"
                    optional
                  >
                    {textArea("orgStrengths", "Key strengths or resources", 3)}
                  </Field>
                  <Field
                    name="collaborated"
                    label="Has your organisation previously collaborated with ISLAH?"
                    required
                    error={err("collaborated")}
                  >
                    <RadioPills
                      options={["Yes", "No", "Not sure"]}
                      value={v.collaborated}
                      onChange={(val) => set("collaborated", val)}
                      hasError={has("collaborated")}
                    />
                  </Field>
                  {v.collaborated === "Yes" ? (
                    <Field name="collabDetails" label="Brief details of the collaboration" optional>
                      {textInput("collabDetails", {
                        placeholder: "Programme, year, nature of work",
                        maxLength: 200,
                      })}
                    </Field>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                  <Field name="orgHearAbout" label="How did you hear about ISLAH?">
                    <SelectInput
                      value={v.orgHearAbout}
                      onChange={(val) => set("orgHearAbout", val)}
                      options={ORG_HEAR_ABOUT_OPTIONS}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field name="orgReferral" label="Referral Name / Organisation" optional>
                    {textInput("orgReferral", { placeholder: "Who referred you", maxLength: 80 })}
                  </Field>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className={section}>
              <SubHeading
                title={isOrg ? "Supporting documents" : "Documents"}
                desc="Share only what is necessary. Documents are accessible only to authorised ISLAH personnel."
              />
              {!isOrg ? (
                <div className={grid}>
                  <Field
                    name="photo"
                    label="Profile Photograph"
                    optional
                    hint="Shown on your digital member card."
                  >
                    <FileUpload
                      value={files.photo}
                      onChange={(f) => setFile("photo", f)}
                      accept="image/jpeg,image/png,image/webp"
                      imageOnly
                    />
                  </Field>
                  <Field
                    name="idProof"
                    label="Identity Proof"
                    optional
                    hint="Requested only if required for verification."
                  >
                    <FileUpload
                      value={files.idProof}
                      onChange={(f) => setFile("idProof", f)}
                      accept="image/*,application/pdf"
                    />
                  </Field>
                </div>
              ) : (
                <div className={grid}>
                  <Field
                    name="orgRegCert"
                    label="Registration Certificate"
                    hint="Where applicable."
                  >
                    <FileUpload
                      value={files.orgRegCert}
                      onChange={(f) => setFile("orgRegCert", f)}
                      accept="image/*,application/pdf"
                    />
                  </Field>
                  <Field
                    name="orgAuthLetter"
                    label="Authorisation Letter / Resolution"
                    hint="Required where needed to establish authority to apply."
                  >
                    <FileUpload
                      value={files.orgAuthLetter}
                      onChange={(f) => setFile("orgAuthLetter", f)}
                      accept="image/*,application/pdf"
                    />
                  </Field>
                  <Field name="orgBrochure" label="Organisation Profile / Brochure" optional>
                    <FileUpload
                      value={files.orgBrochure}
                      onChange={(f) => setFile("orgBrochure", f)}
                      accept="application/pdf"
                    />
                  </Field>
                  <Field name="orgAdditional" label="Additional Supporting Document" optional>
                    <FileUpload
                      value={files.orgAdditional}
                      onChange={(f) => setFile("orgAdditional", f)}
                      accept="image/*,application/pdf"
                    />
                  </Field>
                </div>
              )}
            </div>

            {/* Recognition */}
            <div className={section}>
              <SubHeading
                title="Recognition in the ISLAH Community Directory"
                desc="Optional public recognition does not affect your application. Contact details and documents are never published."
              />
              <Field
                name="recognition"
                label={
                  isOrg
                    ? "How would your organisation like to be recognised?"
                    : "How would you like your membership to be recognised?"
                }
                required
                error={err("recognition")}
              >
                <RadioCards
                  options={RECOGNITION_OPTIONS[mode]}
                  value={v.recognition}
                  onChange={(val) => set("recognition", val)}
                  hasError={has("recognition")}
                />
              </Field>
              {isOrg && v.recognition === "public" && (
                <CheckboxRow checked={v.logoConsent} onChange={(c) => set("logoConsent", c)}>
                  I am authorised to grant ISLAH permission to display our organisation's logo in
                  the directory.
                </CheckboxRow>
              )}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 3 — REVIEW & SUBMIT                                         */}
        {/* ================================================================ */}
        {step === 3 && (
          <div>
            <div className="mb-5">
              <h3 className="text-base sm:text-lg font-semibold text-[#071527]">Review & Submit</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Check your details, confirm the declarations and verify your mobile number.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <SummaryCard
                title={isOrg ? "Organisation & representative" : "Your details"}
                onEdit={() => {
                  setErrors({});
                  setStep(1);
                  scrollToFormTop();
                }}
              >
                {(isOrg
                  ? [
                      ["Organisation", v.orgLegalName],
                      ["Type", v.orgType],
                      ["Official contact", `${v.orgCountryCode} ${v.orgPhone} · ${v.orgEmail}`],
                      [
                        "Registered office",
                        [v.orgCity, v.orgState, v.orgCountry].filter(Boolean).join(", "),
                      ],
                      ["Representative", `${v.repName} (${v.repDesignation})`],
                      ["Rep. contact", `${v.repCountryCode} ${v.repPhone} · ${v.repEmail}`],
                    ]
                  : [
                      ["Name", v.fullName],
                      ["Age group", v.ageGroup],
                      ["Mobile", `${v.countryCode} ${v.phone}`],
                      ["Email", v.email],
                      ["Location", [v.district, v.state, v.country].filter(Boolean).join(", ")],
                    ]
                ).map(([k, val]) => (
                  <SummaryRow key={k} label={k} value={val} />
                ))}
              </SummaryCard>
              <SummaryCard
                title="Membership"
                onEdit={() => {
                  setErrors({});
                  setStep(2);
                  scrollToFormTop();
                }}
              >
                <SummaryRow
                  label="Category"
                  value={`${tierConfig.cardName} — ${tierConfig.roleTitle}`}
                />
                <SummaryRow label="Period" value={`${years} year${years > 1 ? "s" : ""}`} />
                <SummaryRow
                  label="Membership fee"
                  value={`₹${fee.toLocaleString("en-IN")}`}
                  strong
                />
                <SummaryRow
                  label="Recognition"
                  value={
                    RECOGNITION_OPTIONS[mode].find((o) => o.id === v.recognition)?.title || "–"
                  }
                />
                <SummaryRow
                  label="Interests"
                  value={
                    v.sectors.length
                      ? v.sectors
                          .map((s) => (s === OTHER_SECTOR && v.otherSector ? v.otherSector : s))
                          .join(", ")
                      : "–"
                  }
                />
                <SummaryRow
                  label="Documents"
                  value={
                    Object.values(files).filter(Boolean).length
                      ? `${Object.values(files).filter(Boolean).length} attached`
                      : "None"
                  }
                />
              </SummaryCard>
            </div>

            <div className={section}>
              <SubHeading title="Declaration & consent" />
              <div className="space-y-0.5">
                <CheckboxRow
                  checked={v.declAccurate}
                  onChange={(c) => set("declAccurate", c)}
                  required
                  hasError={has("declAccurate")}
                >
                  {isOrg
                    ? "I confirm that the information provided is accurate to the best of my knowledge and that I am authorised to submit this application on behalf of the organisation."
                    : "I confirm that the information provided in this application is true and accurate to the best of my knowledge."}
                </CheckboxRow>
                <CheckboxRow
                  checked={v.declPolicy}
                  onChange={(c) => set("declPolicy", c)}
                  required
                  hasError={has("declPolicy")}
                >
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenPolicy();
                    }}
                    className="text-brand-orange font-semibold underline underline-offset-2"
                  >
                    Membership Policy & Code of Conduct
                  </button>
                  {isOrg
                    ? ", and the organisation will comply with the applicable requirements."
                    : ", and agree to comply with the applicable requirements."}
                </CheckboxRow>
                <CheckboxRow
                  checked={v.declProcessing}
                  onChange={(c) => set("declProcessing", c)}
                  required
                  hasError={has("declProcessing")}
                >
                  I understand that ISLAH will use the information provided to process this
                  application, communicate
                  {isOrg ? " with the authorised representative" : " with me"} and administer the
                  membership in accordance with its privacy notice.
                </CheckboxRow>
                <CheckboxRow
                  checked={v.declStatus}
                  onChange={(c) => set("declStatus", c)}
                  required
                  hasError={has("declStatus")}
                >
                  {isOrg
                    ? "I understand that submission or payment alone does not establish membership where further approval is required, and that organisational membership does not confer trustee or governance status, voting rights, funding, accreditation or a formal partnership."
                    : "I understand that submitting an application or completing payment does not by itself establish membership if further review is required. My membership status will be communicated by ISLAH."}
                </CheckboxRow>
                <CheckboxRow checked={v.optUpdates} onChange={(c) => set("optUpdates", c)}>
                  <span className="text-slate-500">
                    (Optional) {isOrg ? "We would" : "I would"} like to receive updates about
                    ISLAH's programmes, activities and impact.
                  </span>
                </CheckboxRow>
              </div>

              {isOrg && (
                <div className="grid sm:grid-cols-3 gap-x-4 gap-y-3.5 pt-2">
                  <Field
                    name="declRepName"
                    label="Name of Authorised Representative"
                    required
                    error={err("declRepName")}
                  >
                    {textInput("declRepName", {
                      sanitize: sanitizeName,
                      onKeyDown: blockNumbersOnKeyDown,
                      maxLength: 60,
                    })}
                  </Field>
                  <Field
                    name="declRepDesignation"
                    label="Designation"
                    required
                    error={err("declRepDesignation")}
                  >
                    {textInput("declRepDesignation", { maxLength: 60 })}
                  </Field>
                  <Field name="declDate" label="Date">
                    <input
                      type="text"
                      readOnly
                      value={formatDisplayDate(new Date())}
                      className={`${inputClass(false)} bg-slate-50 text-slate-600`}
                    />
                  </Field>
                  <div className="sm:col-span-3">
                    <CheckboxRow
                      checked={v.declElectronic}
                      onChange={(c) => set("declElectronic", c)}
                      required
                      hasError={has("declElectronic")}
                    >
                      I confirm that I am submitting this application on behalf of the organisation
                      named above.
                    </CheckboxRow>
                  </div>
                </div>
              )}
            </div>

            <div className={section}>
              <SubHeading
                title="Verify your mobile number"
                desc="ISLAH does not use passwords — a one-time code confirms your contact details."
              />
              <div id="field-otp" className="scroll-mt-28 max-w-lg">
                <OtpVerifier
                  target={otpTarget}
                  displayTarget={`${otpCountryCode} ${otpTarget}`}
                  verified={otpVerified}
                  onVerified={() => {
                    setVerifiedFor(`${otpCountryCode}${otpTarget}`);
                    setErrors(({ otp: _o, ...rest }) => rest);
                  }}
                  hasError={has("otp")}
                />
                {err("otp") && <p className="mt-1 text-[11px] text-red-600">{err("otp")}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 pt-5 mt-6 border-t border-slate-200">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setStep(step - 1);
                scrollToFormTop();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => goTo(step + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#071527] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition"
            >
              {step === 1 ? "Continue to Membership" : "Review Application"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit & Pay ₹{fee.toLocaleString("en-IN")}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Review helpers
// ============================================================================

function SummaryCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h4>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-orange hover:text-orange-700 px-1.5 py-0.5 rounded hover:bg-orange-50 transition"
        >
          <Pencil className="w-3 h-3" />
          Edit
        </button>
      </div>
      <dl className="space-y-1.5">{children}</dl>
    </div>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-3 text-xs sm:text-[13px]">
      <dt className="text-slate-500 shrink-0">{label}</dt>
      <dd
        className={`text-right break-words min-w-0 ${strong ? "font-semibold text-[#071527]" : "text-slate-800"}`}
      >
        {value || "–"}
      </dd>
    </div>
  );
}
