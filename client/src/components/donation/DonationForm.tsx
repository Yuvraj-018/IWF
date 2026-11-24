import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  Lock,
  Pencil,
  RefreshCw,
  RotateCcw,
  Save,
  ShieldCheck,
} from "lucide-react";
import {
  CheckChips,
  CheckboxRow,
  CityField,
  Field,
  FileUpload,
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
import {
  COUNTRIES,
  EMAIL_RE,
  PAN_RE,
  isValidPhone,
  phoneError,
} from "@/components/forms/formRules";
import { DOC_ACCEPT } from "@/components/forms/wizard/fieldKit";
import { INDIAN_STATES } from "@/content/locations";
import {
  AREA_WORK_CODES,
  CONTRIBUTION_OTHER,
  CONTRIBUTION_TYPES,
  DOCUMENTATION_OPTIONS,
  DONOR_CATEGORIES,
  DONOR_INDIVIDUAL,
  DONOR_ORGANISATION,
  FREQUENCY_LABEL,
  FREQUENCY_OPTIONS,
  GENERAL_SUPPORT,
  HEAR_ABOUT_OPTIONS,
  MAX_ONLINE_DONATION,
  MIN_DONATION,
  ORGANISATION_TYPES,
  PRESET_AMOUNTS,
  PROGRAMME_CHOICES,
  PROGRAMME_GENERAL,
  PROGRAMME_MULTIPLE,
  PROGRAMME_RECOMMEND,
  PROGRAMME_SPECIFIC,
  RECOGNITION_LABEL,
  RECOGNITION_OPTIONS,
  RECURRING_AUTO_DEBIT_ENABLED,
  SECTOR_AREAS,
  SUPPORT_AREAS,
  flatProgrammes,
  programmesForAreas,
  type DocumentationPreference,
  type DonationFrequency,
  type DonationPrefill,
  type RecognitionPreference,
} from "@/content/donationContent";
import { ORG } from "@/components/documents/orgDetails";
import { amountInWords } from "@/components/documents/docUtils";
import { donorTierFor } from "@/components/documents/donorTier";
import { useAllPatients } from "@/services/patientService";
import type { Patient } from "@/content/patients";
import { uploadSingleFile } from "@/services/uploadService";
import { openRazorpayModal } from "@/utils/razorpay";
import {
  blockNonDigitsOnKeyDown,
  blockNumbersOnKeyDown,
  sanitizeDigits,
  sanitizeName,
} from "@/utils/formValidation";
import { DonationConfirmation, type DonationOutcome } from "./DonationConfirmation";
import { donorDisplayName, type DonationValues } from "./donationModel";

// ============================================================================
// State
// ============================================================================

type FileKey = "panCard" | "supportingDoc" | "photo" | "orgLogo";
type Files = Record<FileKey, UploadedFile | null>;

const INITIAL: DonationValues = {
  contributionType: "",
  contributionOther: "",
  supportAreas: [],
  programmeChoice: "",
  programme: "",
  programmes: [],
  patientSlug: "",
  patientName: "",
  amountPreset: "5000",
  amount: "5000",
  frequency: "One Time",
  recurringAck: false,
  purposeDetails: "",
  donorCategory: DONOR_INDIVIDUAL,
  fullName: "",
  orgName: "",
  orgType: "",
  contactPerson: "",
  designation: "",
  countryCode: "+91",
  phone: "",
  whatsappCode: "+91",
  whatsapp: "",
  email: "",
  country: "India",
  state: "",
  city: "",
  address: "",
  pin: "",
  documentation: "",
  legalName: "",
  pan: "",
  hearAbout: "",
  comments: "",
  recognition: "",
  displayName: "",
  displayOrgName: "",
  logoAuthorised: false,
  declAccurate: false,
  declPolicy: false,
  declTax: false,
  declIndian: false,
  optUpdates: false,
};

const NO_FILES: Files = { panCard: null, supportingDoc: null, photo: null, orgLogo: null };

const DRAFT_KEY = "islah_donation_draft";
/** Never kept in the browser draft. */
const PRIVATE_KEYS: (keyof DonationValues)[] = ["pan"];

const STEPS = [
  { title: "Contribution", intro: "Choose what you would like to support and how much." },
  {
    title: "Donor Details",
    intro: "Tell us who the contribution is from and the receipt you need.",
  },
  {
    title: "Preferences & Consent",
    intro: "Recognition, communication and the required declarations.",
  },
  { title: "Review & Pay", intro: "Check your details. You can edit any section before paying." },
];
const LAST = STEPS.length - 1;

const OTHER_AMOUNT = "Other Amount";
const presetLabel = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const PRESET_OPTIONS = [...PRESET_AMOUNTS.map(presetLabel), OTHER_AMOUNT];

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const isIndia = (v: DonationValues) => (v.country || "India") === "India";
const isOrg = (v: DonationValues) => v.donorCategory === DONOR_ORGANISATION;

// ============================================================================
// Derived labels (review, receipt, payload)
// ============================================================================

function contributionLabel(v: DonationValues) {
  return v.contributionType === CONTRIBUTION_OTHER
    ? `Other — ${v.contributionOther.trim()}`
    : v.contributionType;
}

function programmeLabel(v: DonationValues) {
  if (v.programmeChoice === PROGRAMME_SPECIFIC) return v.programme;
  if (v.programmeChoice === PROGRAMME_MULTIPLE) return v.programmes.join(", ");
  return v.programmeChoice || "Not specified";
}

/** Short purpose used on the receipt and acknowledgement card. */
function purposeLabel(v: DonationValues) {
  if (v.patientSlug && v.patientName) return `Medical support for ${v.patientName}`;
  const sectors = v.supportAreas.filter((a) => SECTOR_AREAS.includes(a));
  if (v.programmeChoice === PROGRAMME_SPECIFIC && v.programme) return v.programme;
  if (sectors.length === 1) return sectors[0];
  if (sectors.length > 1) return "Multiple ISLAH Programme Areas";
  return "General Support — ISLAH Programmes";
}

// ============================================================================
// Validation
// ============================================================================

function validateStep(step: number, v: DonationValues, files: Files): FieldErrors {
  const e: FieldErrors = {};
  const need = (key: string, ok: boolean, msg: string) => {
    if (!ok && !e[key]) e[key] = msg;
  };

  if (step === 0) {
    need("contributionType", Boolean(v.contributionType), "Please select an option.");
    if (v.contributionType === CONTRIBUTION_OTHER)
      need(
        "contributionOther",
        v.contributionOther.trim().length >= 3,
        "Please specify the contribution type.",
      );
    need("supportAreas", v.supportAreas.length > 0, "Please select at least one support area.");
    if (v.programmeChoice === PROGRAMME_SPECIFIC)
      need("programme", Boolean(v.programme), "Please select a programme.");
    if (v.programmeChoice === PROGRAMME_MULTIPLE)
      need("programmes", v.programmes.length >= 2, "Please select at least two programmes.");
    const amount = Number(v.amount);
    if (!v.amount || !amount) e.amount = "Please enter your donation amount.";
    else if (amount < MIN_DONATION)
      e.amount = `The minimum online donation is ${fmtINR(MIN_DONATION)}.`;
    else if (amount > MAX_ONLINE_DONATION)
      e.amount = `For contributions above ${fmtINR(MAX_ONLINE_DONATION)}, please use bank transfer or contact us.`;
    if (v.frequency !== "One Time")
      need(
        "recurringAck",
        v.recurringAck,
        "Please confirm you understand how recurring support works.",
      );
  }

  if (step === 1) {
    const org = isOrg(v);
    if (org) {
      need(
        "orgName",
        v.orgName.trim().length >= 3,
        "Please enter the organisation / institution name.",
      );
      need(
        "contactPerson",
        v.contactPerson.trim().length >= 3,
        "Please enter the full name (at least 3 letters).",
      );
    } else {
      need(
        "fullName",
        v.fullName.trim().length >= 3,
        "Please enter the full name (at least 3 letters).",
      );
    }
    if (!v.phone) e.phone = "Please fill in this field.";
    else if (!isValidPhone(v.countryCode, v.phone))
      e.phone = phoneError(v.countryCode, v.phone) ?? "Enter a valid mobile number.";
    if (!org && v.whatsapp && !isValidPhone(v.whatsappCode, v.whatsapp))
      e.whatsapp = phoneError(v.whatsappCode, v.whatsapp) ?? "Enter a valid WhatsApp number.";
    if (!v.email.trim()) e.email = "Please fill in this field.";
    else if (!EMAIL_RE.test(v.email.trim()))
      e.email = "Enter a valid email address, e.g. name@example.com.";

    const tax = v.documentation === "tax";
    need("country", Boolean(v.country), "Please select an option.");
    need(
      "state",
      Boolean(v.state.trim()),
      isIndia(v) ? "Please select an option." : "Please fill in this field.",
    );
    need("city", Boolean(v.city.trim()), "Please select or type your city / district.");
    if (tax)
      need("address", v.address.trim().length >= 10, "Please enter your complete postal address.");
    if (tax || v.pin) {
      if (!v.pin) e.pin = "Please fill in this field.";
      else if (isIndia(v) ? !/^\d{6}$/.test(v.pin) : !/^[A-Za-z0-9 -]{3,10}$/.test(v.pin))
        e.pin = isIndia(v) ? "PIN code must be 6 digits." : "Enter a valid postal code.";
    }

    need("documentation", Boolean(v.documentation), "Please select an option.");
    if (tax) {
      need(
        "legalName",
        v.legalName.trim().length >= 3,
        "Please enter the full legal name (as on PAN).",
      );
      const pan = v.pan.toUpperCase();
      if (!pan) e.pan = "Please enter the donor's PAN.";
      else if (!PAN_RE.test(pan)) e.pan = "Enter a valid PAN, e.g. ABCDE1234F.";
      else if (pan === ORG.pan) e.pan = "This is ISLAH's PAN. Please enter the donor's own PAN.";
      else if (!org && pan[3] !== "P")
        e.pan = "For an individual, the 4th character of the PAN is 'P'. Please check the PAN.";
    }
  }

  if (step === 2) {
    need("recognition", Boolean(v.recognition), "Please select an option.");
    if (v.recognition === "public" && isOrg(v) && files.orgLogo)
      need(
        "logoAuthorised",
        v.logoAuthorised,
        "Please confirm you are authorised to permit logo use.",
      );
    need("declAccurate", v.declAccurate, "Required");
    need("declPolicy", v.declPolicy, "Required");
    need("declTax", v.declTax, "Required");
    need("declIndian", v.declIndian, "Required");
  }
  return e;
}

// ============================================================================
// Component
// ============================================================================

export function DonationForm({
  prefill,
  id = "donation-form-card",
}: {
  prefill?: DonationPrefill;
  id?: string;
}) {
  const [v, setValues] = useState<DonationValues>(INITIAL);
  const [files, setFiles] = useState<Files>(NO_FILES);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [savedLabel, setSavedLabel] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payNotice, setPayNotice] = useState<{ tone: "error" | "info"; text: string } | null>(null);
  const [outcome, setOutcome] = useState<DonationOutcome | null>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const { patients: allPatients, loading: patientsLoading } = useAllPatients();
  // Open appeals only — plus the patient the donor arrived for, whatever their status.
  const patients = useMemo(
    () =>
      allPatients.filter(
        (p) =>
          ((p as Patient & { status?: string }).status ?? "Active") === "Active" ||
          p.slug === v.patientSlug,
      ),
    [allPatients, v.patientSlug],
  );
  const selectedPatient = patients.find((p) => p.slug === v.patientSlug);

  // A link may carry only the patient's slug: fill in the name once the list arrives.
  useEffect(() => {
    if (selectedPatient && v.patientName !== selectedPatient.name)
      setValues((prev) => ({ ...prev, patientName: selectedPatient.name }));
  }, [selectedPatient, v.patientName]);

  // ---------------------------------------------------------------- draft + prefill
  useEffect(() => {
    let next = INITIAL;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft?.values) {
          next = { ...INITIAL, ...draft.values };
          setSavedLabel("Draft restored");
        }
      }
    } catch {
      /* ignore */
    }
    if (prefill) {
      const { contextLabel: _c, ...fields } = prefill;
      next = {
        ...next,
        ...Object.fromEntries(Object.entries(fields).filter(([, x]) => x !== undefined)),
      };
      if (prefill.amount)
        next.amountPreset = PRESET_AMOUNTS.includes(Number(prefill.amount))
          ? prefill.amount
          : "Other";
    }
    setValues(next);
    setDraftReady(true);
    // Prefill is read once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDirty = useMemo(() => JSON.stringify(v) !== JSON.stringify(INITIAL), [v]);

  const saveDraft = (values: DonationValues) => {
    try {
      const safe: Partial<DonationValues> = { ...values };
      for (const k of PRIVATE_KEYS) delete safe[k];
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ values: safe }));
      setSavedLabel(
        `Draft saved ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      );
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!draftReady || !isDirty || outcome?.status === "success") return;
    const t = setTimeout(() => saveDraft(v), 800);
    return () => clearTimeout(t);
  }, [v, isDirty, draftReady, outcome]);

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  };

  const resetAll = (message?: string) => {
    clearDraft();
    setValues(INITIAL);
    setFiles(NO_FILES);
    setErrors({});
    setStep(0);
    setMaxStep(0);
    setSavedLabel(null);
    setPayNotice(null);
    setOutcome(null);
    if (message) toast.info(message);
  };

  // ---------------------------------------------------------------- setters
  const clearError = (...keys: string[]) =>
    setErrors((prev) => {
      if (!keys.some((k) => prev[k])) return prev;
      const next = { ...prev };
      for (const k of keys) delete next[k];
      return next;
    });

  const set = <K extends keyof DonationValues>(key: K, value: DonationValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    clearError(key);
  };

  const patch = (changes: Partial<DonationValues>) => {
    setValues((prev) => ({ ...prev, ...changes }));
    clearError(...Object.keys(changes));
  };

  const setFile = (key: FileKey, file: UploadedFile | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
    clearError(key);
  };

  /** Keeps programme selections in step with the chosen support areas. */
  const setSupportAreas = (areas: string[]) => {
    const available = flatProgrammes(areas);
    const hasSectors = available.length > 0;
    patch({
      supportAreas: areas,
      programme: available.includes(v.programme) ? v.programme : "",
      programmes: v.programmes.filter((p) => available.includes(p)),
      programmeChoice:
        !hasSectors &&
        (v.programmeChoice === PROGRAMME_SPECIFIC || v.programmeChoice === PROGRAMME_MULTIPLE)
          ? ""
          : v.programmeChoice,
      patientSlug: areas.includes("Healthcare & Well-being") ? v.patientSlug : "",
      patientName: areas.includes("Healthcare & Well-being") ? v.patientName : "",
    });
  };

  // ---------------------------------------------------------------- navigation
  const scrollToTop = () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const showErrors = (e: FieldErrors) => {
    setErrors(e);
    const n = Object.keys(e).length;
    toast.error(`Please complete the ${n} highlighted field${n > 1 ? "s" : ""}.`);
    setTimeout(() => focusFirstError(e), 60);
  };

  const goTo = (target: number) => {
    setPayNotice(null);
    if (target < step) {
      setErrors({});
      setStep(target);
      scrollToTop();
      return;
    }
    for (let s = step; s < target; s++) {
      const e = validateStep(s, v, files);
      if (Object.keys(e).length) {
        setStep(s);
        showErrors(e);
        return;
      }
    }
    saveDraft(v);
    setErrors({});
    setStep(target);
    setMaxStep((m) => Math.max(m, target));
    scrollToTop();
  };

  // ---------------------------------------------------------------- derived
  const amount = Number(v.amount) || 0;
  const tier = donorTierFor(amount);
  const sectorAreas = v.supportAreas.filter((a) => SECTOR_AREAS.includes(a));
  const programmeGroups = programmesForAreas(sectorAreas);
  const programmeOptions = programmeGroups.length
    ? PROGRAMME_CHOICES
    : [PROGRAMME_GENERAL, PROGRAMME_RECOMMEND];
  const showPatients = v.supportAreas.includes("Healthcare & Well-being");
  const patientRemaining = selectedPatient
    ? Math.max((selectedPatient.neededAmount || 0) - (selectedPatient.raisedAmount || 0), 0)
    : 0;

  const choosePatient = (p: Patient | null) => {
    if (!p) return patch({ patientSlug: "", patientName: "" });
    const changes: Partial<DonationValues> = { patientSlug: p.slug, patientName: p.name };
    if (!v.contributionType) changes.contributionType = "Emergency / Humanitarian Support";
    if (
      !v.programmeChoice ||
      v.programmeChoice === PROGRAMME_GENERAL ||
      v.programmeChoice === PROGRAMME_RECOMMEND
    ) {
      changes.programmeChoice = PROGRAMME_SPECIFIC;
      changes.programme = "Critical Life & Emergency Support (CLES)";
    }
    patch(changes);
  };
  const tax = v.documentation === "tax";
  const org = isOrg(v);
  const freqWord = v.frequency === "Monthly" ? "month" : "year";

  // ---------------------------------------------------------------- payment
  const handlePay = async () => {
    for (let s = 0; s < LAST; s++) {
      const e = validateStep(s, v, files);
      if (Object.keys(e).length) {
        setStep(s);
        showErrors(e);
        return;
      }
    }

    setPaying(true);
    setPayNotice(null);
    const donorName = donorDisplayName(v);
    const purpose = purposeLabel(v);
    const primaryArea = sectorAreas[0];

    const financialType =
      sectorAreas.length === 1
        ? primaryArea
        : sectorAreas.length
          ? "Multiple Programme Areas"
          : "General Donation";
    const workAreaId = sectorAreas.length === 1 ? AREA_WORK_CODES[primaryArea] : undefined;
    // Razorpay allows 15 notes of up to 256 characters each.
    const gatewayNotes = Object.fromEntries(
      Object.entries({
        donorName,
        donorType: org ? "Corporate" : "Individual",
        email: v.email.trim(),
        phone: v.phone,
        countryCode: v.countryCode,
        city: v.city.trim(),
        state: v.state.trim(),
        financialType,
        cause: purpose,
        workAreaId,
        patientSlug: v.patientSlug,
        frequency: v.frequency,
        reminder: v.frequency === "One Time" ? "None" : v.frequency,
        pan: tax ? v.pan.toUpperCase() : undefined,
      })
        .filter(([, x]) => x)
        .map(([k, x]) => [k, String(x).slice(0, 250)]),
    );

    let payment: Awaited<ReturnType<typeof openRazorpayModal>>;
    try {
      const { createPaymentOrder } = await import("@/services/donationService");
      const order = await createPaymentOrder({
        amount,
        receipt: `don_${Date.now()}`,
        notes: { purpose: "donation", ...gatewayNotes },
      });
      if (!order?.order_id) throw new Error(order?.message || "Could not start the payment.");

      payment = await openRazorpayModal({
        orderId: order.order_id,
        amount: order.amount,
        keyId: order.key_id,
        name: ORG.name,
        description: `Donation — ${purpose}`.slice(0, 250),
        prefill: { name: donorName, email: v.email.trim(), contact: `${v.countryCode}${v.phone}` },
        // Razorpay's webhook builds a backup record from these if verification never completes.
        notes: { purpose: "donation", ...gatewayNotes },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setPaying(false);
      if (/cancelled by user/i.test(msg)) {
        setPayNotice({
          tone: "info",
          text: "Payment was not completed and no money was deducted. Your details are saved — you can try again.",
        });
      } else if (/order|start the payment|network|fetch|load/i.test(msg) || !msg) {
        setPayNotice({
          tone: "error",
          text: `${msg || "We could not reach the payment gateway."} Please check your connection and try again — no money was deducted.`,
        });
      } else {
        setOutcome({ status: "failed", reason: msg });
        scrollToTop();
      }
      return;
    }

    // Payment captured by the gateway — store documents, then verify with ISLAH.
    const upload = async (key: FileKey, folder: string, isPrivate = false) => {
      const f = files[key];
      if (!f) return undefined;
      try {
        return (await uploadSingleFile(f.file, folder, isPrivate)).url;
      } catch (err) {
        console.warn(`Donation upload (${key}) failed:`, err);
        return undefined;
      }
    };
    const [panFileUrl, supportingDocUrl, donorPhotoUrl, orgLogoUrl] = await Promise.all([
      tax ? upload("panCard", "donations/pan", true) : Promise.resolve(undefined),
      upload("supportingDoc", "donations/documents", true),
      upload("photo", "donors/photos"),
      v.recognition === "public" && org
        ? upload("orgLogo", "donors/logos")
        : Promise.resolve(undefined),
    ]);

    const paidAt = new Date();
    const base: Omit<DonationOutcome, "status"> = {
      values: v,
      purpose,
      paymentId: payment.razorpay_payment_id,
      paidAt,
    };

    try {
      const { verifyPayment } = await import("@/services/donationService");
      const recurring = v.frequency !== "One Time";
      const res = await verifyPayment({
        razorpay_order_id: payment.razorpay_order_id,
        razorpay_payment_id: payment.razorpay_payment_id,
        razorpay_signature: payment.razorpay_signature,
        donationData: {
          donorName: tax ? v.legalName.trim() || donorName : donorName,
          donorType: org ? "Corporate" : "Individual",
          email: v.email.trim(),
          phone: v.phone,
          countryCode: v.countryCode,
          address: v.address.trim() || [v.city, v.state].filter(Boolean).join(", "),
          city: v.city.trim(),
          state: v.state.trim(),
          pincode: v.pin,
          financialType,
          workAreaId,
          frequency: v.frequency,
          reminder: v.frequency === "One Time" ? "None" : v.frequency,
          recurringPledge: recurring,
          amount,
          taxExemption: tax,
          pan: tax ? v.pan.toUpperCase() : undefined,
          panFileUrl,
          donorPhotoUrl,
          patientSlug: v.patientSlug || undefined,
          websiteConsent: v.recognition === "public" ? "Yes" : "No",
          isPublicConsent: v.recognition === "public",
          metadata: {
            source: "donation-form-v2",
            contributionType: contributionLabel(v),
            supportAreas: v.supportAreas,
            programmeChoice: v.programmeChoice,
            programmes: v.programmeChoice === PROGRAMME_SPECIFIC ? [v.programme] : v.programmes,
            purpose,
            purposeDetails: v.purposeDetails.trim(),
            patientName: v.patientSlug ? v.patientName : undefined,
            donorCategory: v.donorCategory,
            fullName: org ? undefined : v.fullName.trim(),
            organisation: org
              ? {
                  name: v.orgName.trim(),
                  type: v.orgType,
                  contactPerson: v.contactPerson.trim(),
                  designation: v.designation.trim(),
                }
              : undefined,
            whatsapp: !org && v.whatsapp ? `${v.whatsappCode} ${v.whatsapp}` : undefined,
            country: v.country,
            documentation: v.documentation,
            legalName: tax ? v.legalName.trim() : undefined,
            supportingDocUrl,
            orgLogoUrl,
            hearAbout: v.hearAbout,
            comments: v.comments.trim(),
            recognition: v.recognition,
            displayName: v.recognition === "public" ? v.displayName.trim() || donorName : undefined,
            displayOrgName: v.recognition === "public" ? v.displayOrgName.trim() : undefined,
            recognitionLevel: tier.label,
            recurringAutoDebit: recurring ? RECURRING_AUTO_DEBIT_ENABLED : undefined,
            communicationConsent: v.optUpdates,
            declarations: {
              accurate: v.declAccurate,
              policy: v.declPolicy,
              taxUnderstanding: v.declTax,
              indianContribution: v.declIndian,
            },
          },
        },
      });
      if (!res?.success) throw new Error(res?.message || "Verification failed");

      const receiptNo: string | undefined = res.receiptNo || res.entity?.receiptNo;
      const entityRef: unknown = res.entity?.donationNo;
      const reference =
        res.donationRef ||
        (typeof entityRef === "string" && entityRef.startsWith("ISLAH-DON") ? entityRef : "") ||
        `ISLAH-DON-${paidAt.getFullYear()}-${payment.razorpay_payment_id.slice(-5).toUpperCase()}`;
      clearDraft();
      const certificateNo: string | undefined = res.entity?.certificateNo;
      setOutcome({ ...base, status: "success", reference, receiptNo, certificateNo });
      toast.success("Payment received. Thank you for supporting ISLAH!");
    } catch (err) {
      console.error("Donation verification error:", err);
      setOutcome({ ...base, status: "pending" });
    } finally {
      setPaying(false);
      scrollToTop();
    }
  };

  // ==========================================================================
  // Render: outcome
  // ==========================================================================
  if (outcome) {
    return (
      <div id={id} className="scroll-mt-24">
        <DonationConfirmation
          outcome={outcome}
          onRetry={() => {
            setOutcome(null);
            setStep(LAST);
          }}
          onDonateAgain={() => resetAll()}
        />
      </div>
    );
  }

  // ==========================================================================
  // Render helpers
  // ==========================================================================
  const block = (
    title: string,
    desc: string | undefined,
    children: React.ReactNode,
    first = false,
  ) => (
    <div className={first ? "space-y-3.5" : "pt-5 mt-5 border-t border-slate-100 space-y-3.5"}>
      <SubHeading title={title} desc={desc} />
      {children}
    </div>
  );
  const grid = (children: React.ReactNode, cols: 2 | 3 = 2) => (
    <div
      className={`grid gap-x-4 gap-y-3.5 ${cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {children}
    </div>
  );
  const textInput = (
    key: keyof DonationValues,
    opts: {
      placeholder?: string;
      type?: string;
      maxLength?: number;
      name?: boolean;
      upper?: boolean;
    } = {},
  ) => (
    <input
      type={opts.type ?? "text"}
      value={String(v[key] ?? "")}
      maxLength={opts.maxLength ?? 150}
      placeholder={opts.placeholder}
      onKeyDown={opts.name ? blockNumbersOnKeyDown : undefined}
      onChange={(e) => {
        let next = e.target.value;
        if (opts.name) next = sanitizeName(next);
        if (opts.upper) next = next.toUpperCase().replace(/[^A-Z0-9]/g, "");
        set(key, next as never);
      }}
      className={`${inputClass(Boolean(errors[key]))} ${opts.upper ? "uppercase font-mono tracking-wider" : ""}`}
    />
  );
  const err = (key: string) => errors[key];

  // ==========================================================================
  // Steps
  // ==========================================================================
  const stepContribution = (
    <>
      {block(
        "01 — Contribution Details",
        undefined,
        <>
          <Field
            name="contributionType"
            label="Contribution Type"
            required
            error={err("contributionType")}
          >
            <RadioPills
              options={CONTRIBUTION_TYPES}
              value={v.contributionType}
              onChange={(x) => {
                const changes: Partial<DonationValues> = { contributionType: x };
                if (x === "General Donation" && !v.supportAreas.length) {
                  changes.supportAreas = [GENERAL_SUPPORT];
                  changes.programmeChoice = v.programmeChoice || PROGRAMME_GENERAL;
                }
                patch(changes);
              }}
              hasError={Boolean(err("contributionType"))}
            />
          </Field>
          {v.contributionType === CONTRIBUTION_OTHER && (
            <Field
              name="contributionOther"
              label="Please specify"
              required
              error={err("contributionOther")}
            >
              {textInput("contributionOther", {
                placeholder: "Type of contribution",
                maxLength: 100,
              })}
            </Field>
          )}

          <Field
            name="supportAreas"
            label="Preferred Support Area"
            required
            hint="Select one or more. Choose General Support if you would like ISLAH to allocate your contribution according to current priorities."
            error={err("supportAreas")}
          >
            <CheckChips
              options={SUPPORT_AREAS}
              selected={v.supportAreas}
              onToggle={(o) =>
                setSupportAreas(
                  v.supportAreas.includes(o)
                    ? v.supportAreas.filter((x) => x !== o)
                    : [...v.supportAreas, o],
                )
              }
              hasError={Boolean(err("supportAreas"))}
            />
          </Field>

          <Field
            name="programmeChoice"
            label="Preferred Programme / Initiative"
            optional
            hint={
              programmeGroups.length
                ? "Programme options follow the support areas you selected."
                : "Select one of the eight programme areas above to choose specific programmes."
            }
          >
            <RadioPills
              options={programmeOptions}
              value={v.programmeChoice}
              onChange={(x) => set("programmeChoice", x)}
            />
          </Field>

          {v.programmeChoice === PROGRAMME_SPECIFIC && programmeGroups.length > 0 && (
            <Field name="programme" label="Programme" required error={err("programme")}>
              <select
                value={v.programme}
                onChange={(e) => set("programme", e.target.value)}
                className={inputClass(Boolean(err("programme")))}
              >
                <option value="" disabled>
                  Select a programme
                </option>
                {programmeGroups.map((g) => (
                  <optgroup key={g.area} label={g.area}>
                    {g.programmes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>
          )}

          {v.programmeChoice === PROGRAMME_MULTIPLE && programmeGroups.length > 0 && (
            <Field
              name="programmes"
              label="Programmes"
              required
              hint="Select two or more."
              error={err("programmes")}
            >
              <div className="space-y-3">
                {programmeGroups.map((g) => (
                  <div key={g.area}>
                    {programmeGroups.length > 1 && (
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                        {g.area}
                      </p>
                    )}
                    <CheckChips
                      options={g.programmes}
                      selected={v.programmes}
                      onToggle={(o) =>
                        set(
                          "programmes",
                          v.programmes.includes(o)
                            ? v.programmes.filter((x) => x !== o)
                            : [...v.programmes, o],
                        )
                      }
                      hasError={Boolean(err("programmes"))}
                    />
                  </div>
                ))}
              </div>
            </Field>
          )}

          {showPatients && (
            <Field
              name="patientSlug"
              label="Support a specific patient"
              optional
              hint="Direct your contribution to a verified patient's treatment, or let ISLAH support the patient whose need is greatest."
            >
              <PatientPicker
                patients={patients}
                loading={patientsLoading}
                value={v.patientSlug}
                onChange={choosePatient}
              />
            </Field>
          )}
          {showPatients && selectedPatient && (
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-700 leading-relaxed space-y-1.5">
              <p>
                Your contribution will be directed to{" "}
                <strong className="font-semibold text-[#071527]">{selectedPatient.name}</strong>'s
                treatment. If their verified need is already fully met, ISLAH will use it for other
                patients under the same programme, in line with its{" "}
                <Link
                  to="/donation-policy"
                  target="_blank"
                  className="text-brand-orange font-semibold underline underline-offset-2"
                >
                  Donation Policy
                </Link>
                .
              </p>
              {patientRemaining >= MIN_DONATION && (
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>
                    Still needed:{" "}
                    <strong className="font-semibold text-[#071527]">
                      {fmtINR(patientRemaining)}
                    </strong>
                  </span>
                  {patientRemaining <= MAX_ONLINE_DONATION && amount !== patientRemaining && (
                    <button
                      type="button"
                      onClick={() =>
                        patch({ amount: String(patientRemaining), amountPreset: "Other" })
                      }
                      className="text-[11px] font-semibold text-brand-orange hover:text-orange-700 underline underline-offset-2"
                    >
                      Donate the remaining amount
                    </button>
                  )}
                </p>
              )}
            </div>
          )}
        </>,
        true,
      )}

      {block(
        "Donation Amount & Frequency",
        "The suggested amounts are illustrative. You may enter another amount, subject to applicable payment-gateway limits.",
        <>
          <Field
            name="amount"
            label="Donation Amount (₹)"
            required
            error={err("amount")}
            hint={
              amount >= MIN_DONATION ? (
                <>
                  {amountInWords(amount)} ·{" "}
                  <span className="font-semibold text-[#071527]">{tier.label}</span> recognition
                </>
              ) : (
                `Minimum ${fmtINR(MIN_DONATION)}.`
              )
            }
          >
            <div className="space-y-2">
              <RadioPills
                options={PRESET_OPTIONS}
                value={
                  v.amountPreset !== "Other" && PRESET_AMOUNTS.includes(amount)
                    ? presetLabel(amount)
                    : OTHER_AMOUNT
                }
                onChange={(label) => {
                  if (label === OTHER_AMOUNT) {
                    set("amountPreset", "Other");
                    setTimeout(() => amountRef.current?.focus(), 0);
                    return;
                  }
                  const n = PRESET_AMOUNTS[PRESET_OPTIONS.indexOf(label)];
                  patch({ amountPreset: String(n), amount: String(n) });
                }}
              />
              <div className="relative sm:max-w-xs">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                  ₹
                </span>
                <input
                  ref={amountRef}
                  type="text"
                  inputMode="numeric"
                  value={v.amount}
                  maxLength={7}
                  placeholder="Enter your donation amount"
                  onKeyDown={blockNonDigitsOnKeyDown}
                  onChange={(e) =>
                    patch({ amount: sanitizeDigits(e.target.value, 7), amountPreset: "Other" })
                  }
                  className={`${inputClass(Boolean(err("amount")))} !pl-8 font-semibold`}
                />
              </div>
            </div>
          </Field>

          <Field name="frequency" label="Donation Frequency" required>
            <RadioPills
              options={FREQUENCY_OPTIONS.map((o) => o.label)}
              value={FREQUENCY_OPTIONS.find((o) => o.value === v.frequency)?.label ?? ""}
              onChange={(label) =>
                patch({
                  frequency: FREQUENCY_OPTIONS.find((o) => o.label === label)?.value ?? "One Time",
                  recurringAck: false,
                })
              }
            />
          </Field>

          {v.frequency !== "One Time" && (
            <div
              id="field-recurringAck"
              className={`scroll-mt-28 rounded-lg border p-3.5 space-y-2 ${
                err("recurringAck")
                  ? "border-red-300 bg-red-50/40"
                  : "border-amber-200 bg-amber-50/50"
              }`}
            >
              <p className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-px" />
                {RECURRING_AUTO_DEBIT_ENABLED ? (
                  <span>
                    You will authorise a {v.frequency.toLowerCase()} payment mandate of{" "}
                    <strong>{fmtINR(amount)}</strong> with the payment gateway. It renews every{" "}
                    {freqWord} until you cancel it, which you can do at any time through the gateway
                    link in your confirmation email or by writing to {ORG.email}.
                  </span>
                ) : (
                  <span>
                    Today's payment of <strong>{fmtINR(amount || 0)}</strong> is your first{" "}
                    {freqWord}ly contribution. Automatic debits (e-mandates) are not yet enabled on
                    ISLAH's payment gateway, so{" "}
                    <strong>nothing will be charged automatically</strong>. Your {freqWord}ly pledge
                    is recorded with this donation; make each next contribution on this page, and
                    stop whenever you like.
                  </span>
                )}
              </p>
              <CheckboxRow
                checked={v.recurringAck}
                onChange={(c) => set("recurringAck", c)}
                required
                hasError={Boolean(err("recurringAck"))}
              >
                I understand that nothing is charged automatically and that I make each future
                contribution myself.
              </CheckboxRow>
              {err("recurringAck") && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {err("recurringAck")}
                </p>
              )}
            </div>
          )}

          <Field name="purposeDetails" label="Additional Purpose Details" optional>
            <textarea
              rows={3}
              maxLength={1000}
              value={v.purposeDetails}
              onChange={(e) => set("purposeDetails", e.target.value)}
              placeholder="Please describe any specific purpose or initiative you would like your contribution to support."
              className={`${inputClass(false)} resize-y`}
            />
          </Field>
        </>,
      )}
    </>
  );

  const stepDonor = (
    <>
      {block(
        "02 — Donor Information",
        undefined,
        <>
          <Field name="donorCategory" label="Donor Category" required>
            <RadioPills
              options={DONOR_CATEGORIES}
              value={v.donorCategory}
              onChange={(x) => set("donorCategory", x)}
            />
          </Field>
          {grid(
            org ? (
              <>
                <Field
                  name="orgName"
                  label="Organisation / Institution Name"
                  required
                  error={err("orgName")}
                  className="sm:col-span-2"
                >
                  {textInput("orgName", { placeholder: "Registered name", maxLength: 120 })}
                </Field>
                <Field name="orgType" label="Organisation Type" optional>
                  <SelectInput
                    value={v.orgType}
                    onChange={(x) => set("orgType", x)}
                    options={ORGANISATION_TYPES}
                    placeholder="Select type"
                  />
                </Field>
                <Field
                  name="contactPerson"
                  label="Authorised Contact Person"
                  required
                  error={err("contactPerson")}
                >
                  {textInput("contactPerson", {
                    placeholder: "Full name",
                    maxLength: 60,
                    name: true,
                  })}
                </Field>
                <Field name="designation" label="Designation / Role" optional>
                  {textInput("designation", { placeholder: "e.g. CSR Manager", maxLength: 80 })}
                </Field>
                <Field
                  name="phone"
                  label="Mobile Number with Country Code"
                  required
                  error={err("phone")}
                >
                  <PhoneInput
                    countryCode={v.countryCode}
                    onCountryCodeChange={(c) => set("countryCode", c)}
                    value={v.phone}
                    onChange={(p) => set("phone", p)}
                    hasError={Boolean(err("phone"))}
                  />
                </Field>
                <Field name="email" label="Email Address" required error={err("email")}>
                  {textInput("email", { type: "email", placeholder: "name@organisation.org" })}
                </Field>
              </>
            ) : (
              <>
                <Field
                  name="fullName"
                  label="Full Name"
                  required
                  error={err("fullName")}
                  className="sm:col-span-2"
                >
                  {textInput("fullName", {
                    placeholder: "Your full name",
                    maxLength: 60,
                    name: true,
                  })}
                </Field>
                <Field
                  name="phone"
                  label="Mobile Number with Country Code"
                  required
                  error={err("phone")}
                >
                  <PhoneInput
                    countryCode={v.countryCode}
                    onCountryCodeChange={(c) => set("countryCode", c)}
                    value={v.phone}
                    onChange={(p) => set("phone", p)}
                    hasError={Boolean(err("phone"))}
                  />
                </Field>
                <Field
                  name="whatsapp"
                  label="WhatsApp Number"
                  optional
                  hint="Only if different from your mobile number."
                  error={err("whatsapp")}
                >
                  <PhoneInput
                    countryCode={v.whatsappCode}
                    onCountryCodeChange={(c) => set("whatsappCode", c)}
                    value={v.whatsapp}
                    onChange={(p) => set("whatsapp", p)}
                    hasError={Boolean(err("whatsapp"))}
                  />
                </Field>
                <Field
                  name="email"
                  label="Email Address"
                  required
                  error={err("email")}
                  className="sm:col-span-2"
                >
                  {textInput("email", { type: "email", placeholder: "name@example.com" })}
                </Field>
              </>
            ),
          )}
        </>,
        true,
      )}

      {block(
        "Address Details",
        tax
          ? "A complete postal address is required for tax-deduction documentation."
          : "We only collect the address needed for administration and your receipt.",
        grid(
          <>
            <Field
              name="country"
              label="Country"
              required
              error={err("country")}
              hint={
                !isIndia(v)
                  ? "ISLAH can currently accept contributions only from Indian citizens (FCRA registration is in progress). Indian citizens living abroad may continue."
                  : undefined
              }
            >
              <SelectInput
                value={v.country}
                onChange={(x) => patch({ country: x, state: "", city: "", pin: "" })}
                options={COUNTRIES}
                hasError={Boolean(err("country"))}
              />
            </Field>
            <Field name="state" label="State / Union Territory" required error={err("state")}>
              {isIndia(v) ? (
                <SelectInput
                  value={v.state}
                  onChange={(x) => patch({ state: x, city: x !== v.state ? "" : v.city })}
                  options={INDIAN_STATES}
                  placeholder="Select state / UT"
                  hasError={Boolean(err("state"))}
                />
              ) : (
                textInput("state", { placeholder: "State / province / region", maxLength: 80 })
              )}
            </Field>
            <Field name="city" label="City / District" required error={err("city")}>
              <CityField
                state={v.state}
                isIndia={isIndia(v)}
                value={v.city}
                onChange={(x) => set("city", x)}
                hasError={Boolean(err("city"))}
              />
            </Field>
            <Field
              name="address"
              label={tax ? "Complete Postal Address" : "Address"}
              required={tax}
              optional={!tax}
              error={err("address")}
              className="sm:col-span-2"
            >
              {textInput("address", {
                placeholder: "House / street, locality, landmark",
                maxLength: 250,
              })}
            </Field>
            <Field
              name="pin"
              label="PIN / Postal Code"
              required={tax}
              optional={!tax}
              error={err("pin")}
            >
              <input
                type="text"
                inputMode={isIndia(v) ? "numeric" : undefined}
                value={v.pin}
                maxLength={isIndia(v) ? 6 : 10}
                placeholder={isIndia(v) ? "6-digit PIN" : "Postal code"}
                onKeyDown={isIndia(v) ? blockNonDigitsOnKeyDown : undefined}
                onChange={(e) =>
                  set(
                    "pin",
                    isIndia(v) ? sanitizeDigits(e.target.value, 6) : e.target.value.toUpperCase(),
                  )
                }
                className={inputClass(Boolean(err("pin")))}
              />
            </Field>
          </>,
          3,
        ),
      )}

      {block(
        "03 — Receipt & Tax Documentation",
        undefined,
        <>
          <Field
            name="documentation"
            label="Documentation Preference"
            required
            error={err("documentation")}
          >
            <RadioCards
              options={DOCUMENTATION_OPTIONS}
              value={v.documentation}
              onChange={(x) => {
                const changes: Partial<DonationValues> = { documentation: x };
                if (x === "tax" && !v.legalName) changes.legalName = donorDisplayName(v);
                patch(changes);
              }}
              hasError={Boolean(err("documentation"))}
            />
          </Field>
          <p className="text-[11px] text-slate-500 leading-snug">
            Tax-related documentation is subject to ISLAH's eligibility, applicable registration or
            approval status, the nature of the contribution and the legal requirements in force.
          </p>

          {tax && (
            <div className="rounded-lg border border-orange-200 bg-orange-50/40 p-3.5 space-y-3.5">
              {grid(
                <>
                  <Field
                    name="legalName"
                    label="Donor's Full Legal Name"
                    required
                    hint="As it appears on the PAN."
                    error={err("legalName")}
                  >
                    {textInput("legalName", {
                      placeholder: "Full legal name",
                      maxLength: 120,
                      name: !org,
                    })}
                  </Field>
                  <Field
                    name="pan"
                    label="Donor's PAN"
                    required
                    hint="Enter the donor's own PAN — not ISLAH's PAN."
                    error={err("pan")}
                  >
                    {textInput("pan", { placeholder: "ABCDE1234F", maxLength: 10, upper: true })}
                  </Field>
                  <Field
                    name="panCard"
                    label="PAN Card"
                    optional
                    hint="Not required. Upload only if ISLAH asks for it for verification. Stored privately."
                    className="sm:col-span-2"
                  >
                    <FileUpload
                      value={files.panCard}
                      onChange={(f) => setFile("panCard", f)}
                      accept="application/pdf,image/jpeg,image/png"
                    />
                  </Field>
                </>,
              )}
              <p className="text-[11px] text-slate-600 leading-snug">
                Your postal address, city, state, country and PIN above are used on the tax
                documentation. ISLAH provides tax-related documentation only where legally
                authorised and the relevant conditions are satisfied. A donation does not
                automatically qualify for a tax deduction.
              </p>
            </div>
          )}
        </>,
      )}

      {block(
        "04 — Supporting Documents",
        "Optional, where applicable. Routine donors do not need to upload a photograph or identity proof — share documents only if ISLAH has asked for them for a specific verification or statutory purpose. Files are stored securely.",
        grid(
          <>
            <Field
              name="supportingDoc"
              label="Supporting Document"
              optional
              hint="PDF, JPG, PNG or Word."
            >
              <FileUpload
                value={files.supportingDoc}
                onChange={(f) => setFile("supportingDoc", f)}
                accept={DOC_ACCEPT}
              />
            </Field>
            <Field
              name="photo"
              label="Photo"
              optional
              hint="Used only with your recognition choice."
            >
              <FileUpload
                value={files.photo}
                onChange={(f) => setFile("photo", f)}
                accept="image/*"
                imageOnly
              />
            </Field>
          </>,
        ),
      )}
    </>
  );

  const stepPreferences = (
    <>
      {block(
        "05 — Additional Information",
        undefined,
        grid(
          <>
            <Field name="hearAbout" label="How did you hear about ISLAH?" optional>
              <SelectInput
                value={v.hearAbout}
                onChange={(x) => set("hearAbout", x)}
                options={HEAR_ABOUT_OPTIONS}
                placeholder="Select an option"
              />
            </Field>
            <Field name="comments" label="Additional Comments" optional className="sm:col-span-2">
              <textarea
                rows={3}
                maxLength={1000}
                value={v.comments}
                onChange={(e) => set("comments", e.target.value)}
                placeholder="Share any relevant information about your contribution or the initiative you wish to support."
                className={`${inputClass(false)} resize-y`}
              />
            </Field>
          </>,
        ),
        true,
      )}

      {block(
        "06 — Donor Recognition & Privacy",
        "Public recognition is optional and does not affect the ability to donate. Donor contact details and transaction information will not be published.",
        <>
          <Field
            name="recognition"
            label="Would you like ISLAH to recognise your contribution publicly?"
            required
            error={err("recognition")}
          >
            <RadioCards
              options={RECOGNITION_OPTIONS}
              value={v.recognition}
              onChange={(x) => set("recognition", x)}
              hasError={Boolean(err("recognition"))}
            />
          </Field>
          {v.recognition === "public" && (
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5 space-y-3.5">
              <p className="text-xs font-semibold text-[#071527]">
                Optional Public Listing Details
              </p>
              {grid(
                <>
                  <Field
                    name="displayName"
                    label="Preferred Display Name"
                    optional
                    hint="Leave blank to use your donor name."
                  >
                    {textInput("displayName", {
                      placeholder: donorDisplayName(v) || "Name to display",
                      maxLength: 80,
                    })}
                  </Field>
                  {org && (
                    <Field name="displayOrgName" label="Organisation Name" optional>
                      {textInput("displayOrgName", {
                        placeholder: v.orgName || "Organisation name",
                        maxLength: 120,
                      })}
                    </Field>
                  )}
                  {org && (
                    <Field
                      name="orgLogo"
                      label="Organisation Logo"
                      optional
                      hint="Logo use requires appropriate permission."
                      className="sm:col-span-2"
                    >
                      <FileUpload
                        value={files.orgLogo}
                        onChange={(f) => {
                          setFile("orgLogo", f);
                          if (!f) set("logoAuthorised", false);
                        }}
                        accept="image/png,image/jpeg,image/webp"
                        imageOnly
                      />
                    </Field>
                  )}
                </>,
              )}
              {org && files.orgLogo && (
                <div id="field-logoAuthorised" className="scroll-mt-28">
                  <CheckboxRow
                    checked={v.logoAuthorised}
                    onChange={(c) => set("logoAuthorised", c)}
                    required
                    hasError={Boolean(err("logoAuthorised"))}
                  >
                    I confirm that I am authorised to permit ISLAH to display this logo for donor
                    recognition.
                  </CheckboxRow>
                </div>
              )}
            </div>
          )}
        </>,
      )}

      {block(
        "07 — Declaration & Consent",
        "Mandatory declarations",
        <div className="space-y-1">
          {(
            [
              [
                "declAccurate",
                <>
                  I confirm that the information provided in this form is accurate to the best of my
                  knowledge and that I am authorised to make this contribution, where applicable.
                </>,
              ],
              [
                "declPolicy",
                <>
                  I have read and agree to ISLAH's{" "}
                  <Link
                    to="/donation-policy"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-brand-orange font-semibold underline underline-offset-2"
                  >
                    Donation Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms-and-conditions"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-brand-orange font-semibold underline underline-offset-2"
                  >
                    Terms of Use
                  </Link>
                  .
                </>,
              ],
              [
                "declTax",
                <>
                  I understand that any tax-related documentation or benefit is subject to ISLAH's
                  eligibility and applicable legal requirements.
                </>,
              ],
              [
                "declIndian",
                <>
                  I am an Indian citizen and this contribution is made from my own / my
                  organisation's Indian funds. (ISLAH cannot yet accept foreign contributions under
                  FCRA.)
                </>,
              ],
            ] as const
          ).map(([key, text]) => (
            <div key={key} id={`field-${key}`} className="scroll-mt-28">
              <CheckboxRow
                checked={v[key]}
                onChange={(c) => set(key, c)}
                required
                hasError={Boolean(err(key))}
              >
                {text}
              </CheckboxRow>
            </div>
          ))}
          <p className="text-xs font-semibold text-[#071527] pt-3">
            Optional Communication Preference
          </p>
          <CheckboxRow checked={v.optUpdates} onChange={(c) => set("optUpdates", c)}>
            <span className="text-slate-600">
              I would like to receive updates about ISLAH's programmes, donation opportunities and
              community impact.
            </span>
          </CheckboxRow>
        </div>,
      )}
    </>
  );

  const reviewRows: { step: number; title: string; rows: [string, string][] }[] = [
    {
      step: 1,
      title: "Donor",
      rows: [
        ["Donor Name", donorDisplayName(v)],
        ["Donor Category", org ? "Organisation" : "Individual"],
        ["Donor Acknowledgement", tier.label],
        ["Receipt Email", v.email.trim()],
        [
          "Documentation Preference",
          DOCUMENTATION_OPTIONS.find((o) => o.id === v.documentation)?.title ?? "",
        ],
      ],
    },
    {
      step: 0,
      title: "Contribution",
      rows: [
        ["Contribution Type", contributionLabel(v)],
        ["Donation Frequency", FREQUENCY_LABEL[v.frequency]],
        ["Support Area", v.supportAreas.join(", ")],
        ["Programme / Initiative", programmeLabel(v)],
        ["Patient / Beneficiary", v.patientSlug ? v.patientName || "Selected patient" : ""],
        ["Donation Purpose", v.purposeDetails.trim() || purposeLabel(v)],
      ],
    },
    {
      step: 2,
      title: "Preferences",
      rows: [
        ["Recognition Preference", v.recognition ? RECOGNITION_LABEL[v.recognition] : ""],
        ...(v.recognition === "public"
          ? ([["Display Name", v.displayName.trim() || donorDisplayName(v)]] as [string, string][])
          : []),
        ["Programme Updates", v.optUpdates ? "Yes" : "No"],
      ],
    },
  ];

  const stepReview = (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-200">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Donation Summary
          </h4>
        </div>
        <div className="divide-y divide-slate-100">
          {reviewRows.map((g) => (
            <div key={g.title} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                  {g.title}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(g.step)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-orange hover:text-orange-700 px-1.5 py-0.5 rounded hover:bg-orange-50 transition"
                >
                  <Pencil className="w-3 h-3" /> Edit
                </button>
              </div>
              <dl className="space-y-1.5">
                {g.rows
                  .filter(([, text]) => text)
                  .map(([label, text]) => (
                    <div key={label} className="flex justify-between gap-3 text-xs sm:text-[13px]">
                      <dt className="text-slate-500 shrink-0 max-w-[45%]">{label}</dt>
                      <dd className="text-slate-800 text-right min-w-0 break-words">{text}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/70 space-y-1.5">
          <div className="flex justify-between text-xs sm:text-[13px]">
            <span className="text-slate-500">Donation Amount</span>
            <span className="text-slate-800">{fmtINR(amount)}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-[13px]">
            <span className="text-slate-500">Processing / platform fee</span>
            <span className="text-slate-800">₹0</span>
          </div>
          <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wide text-[#071527]">
              Total Donation
            </span>
            <span className="text-lg font-bold text-[#071527]">{fmtINR(amount)}</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed">
        ISLAH does not add any processing or platform fee — you pay exactly {fmtINR(amount)}
        {v.frequency !== "One Time" &&
          (RECURRING_AUTO_DEBIT_ENABLED
            ? ` every ${freqWord}`
            : ` today, as the first of your ${freqWord}ly contributions`)}
        . Your bank or card issuer may apply its own charges.
      </p>

      <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-slate-700 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-px" />
        <span>
          Payment is processed by Razorpay, ISLAH's authorised payment gateway. ISLAH never collects
          or stores your card details, CVV, UPI PIN or banking passwords.
        </span>
      </div>

      {payNotice && (
        <div
          className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
            payNotice.tone === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-slate-50 border-slate-200 text-slate-700"
          }`}
        >
          <AlertCircle
            className={`w-4 h-4 shrink-0 mt-px ${payNotice.tone === "error" ? "text-red-600" : "text-slate-500"}`}
          />
          <span>{payNotice.text}</span>
        </div>
      )}
    </div>
  );

  const body = [stepContribution, stepDonor, stepPreferences, stepReview][step];
  const nextLabel = step < 2 ? "Save & Continue" : "Review Donation";

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <div
      id={id}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden scroll-mt-24"
    >
      {/* Progress */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 py-3 flex items-center gap-2 sm:gap-4">
        <ol className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
          {STEPS.map((s, i) => {
            const isCurrent = step === i;
            const isDone = step > i;
            const reachable = i <= maxStep;
            return (
              <li key={s.title} className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                <button
                  type="button"
                  disabled={!reachable || isCurrent || paying}
                  onClick={() => goTo(i)}
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
                    {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </span>
                  <span className={`${isCurrent ? "inline" : "hidden lg:inline"} truncate`}>
                    {s.title}
                  </span>
                </button>
                {i < LAST && <span className="h-px w-3 sm:w-6 bg-slate-300 shrink-0" />}
              </li>
            );
          })}
        </ol>
        <div className="flex items-center gap-1.5 shrink-0">
          {savedLabel && (
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-emerald-700">
              <Save className="w-3 h-3" />
              {savedLabel}
            </span>
          )}
          {amount >= MIN_DONATION && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] text-slate-600">
              <span className="font-semibold text-[#071527]">{fmtINR(amount)}</span>
              {v.frequency !== "One Time" && <span>/ {freqWord}</span>}
              <span className="text-slate-300">·</span>
              {tier.label}
            </span>
          )}
          {isDirty && !paying && (
            <button
              type="button"
              onClick={() => resetAll("Form cleared.")}
              title="Clear form"
              className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-5">
          <h3 className="text-base sm:text-lg font-semibold text-[#071527]">
            {step === LAST ? "08 — Review & Secure Payment" : STEPS[step].title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {STEPS[step].intro}{" "}
            {step < LAST && (
              <>
                Fields marked <span className="text-red-500">*</span> are required.
              </>
            )}
          </p>
        </div>

        {body}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 pt-5 mt-6 border-t border-slate-200">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={paying}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < LAST ? (
            <button
              type="button"
              onClick={() => goTo(step + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#071527] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition"
            >
              {nextLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePay}
              disabled={paying}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition"
            >
              {paying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Processing…
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Proceed to Secure Payment
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
// Patient picker (targeted healthcare support)
// ============================================================================

function PatientPicker({
  patients,
  loading,
  value,
  onChange,
}: {
  patients: Patient[];
  loading: boolean;
  value: string;
  onChange: (p: Patient | null) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q
    ? patients.filter((p) =>
        [p.name, p.disease, p.hospital].some((t) => (t || "").toLowerCase().includes(q)),
      )
    : patients;

  const radio = (active: boolean) => (
    <span
      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
        active ? "border-brand-orange bg-brand-orange" : "border-slate-300"
      }`}
    >
      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
    </span>
  );
  const row = (active: boolean) =>
    `w-full flex items-center gap-3 px-3 py-2.5 text-left transition ${
      active ? "bg-orange-50/60" : "bg-white hover:bg-slate-50"
    }`;

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      {patients.length > 4 && (
        <div className="p-2 border-b border-slate-200 bg-slate-50/70">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, condition or hospital"
            className={inputClass(false)}
          />
        </div>
      )}
      <div role="radiogroup" className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        <button
          type="button"
          role="radio"
          aria-checked={!value}
          onClick={() => onChange(null)}
          className={row(!value)}
        >
          {radio(!value)}
          <span className="text-xs sm:text-[13px] font-semibold text-[#071527]">
            Any patient — where the need is greatest
          </span>
        </button>
        {loading && <p className="px-3 py-3 text-xs text-slate-500">Loading patient appeals…</p>}
        {!loading && !patients.length && (
          <p className="px-3 py-3 text-xs text-slate-500">
            There are no open patient appeals right now.
          </p>
        )}
        {!loading && patients.length > 0 && !shown.length && (
          <p className="px-3 py-3 text-xs text-slate-500">No patient matches “{query}”.</p>
        )}
        {shown.map((p) => {
          const active = value === p.slug;
          const needed = p.neededAmount || 0;
          const raised = Math.min(p.raisedAmount || 0, needed || Infinity);
          const pct = needed ? Math.round((raised / needed) * 100) : 0;
          const remaining = Math.max(needed - raised, 0);
          return (
            <button
              key={p.slug}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(p)}
              className={row(active)}
            >
              {radio(active)}
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                />
              ) : (
                <span className="w-10 h-10 rounded-lg bg-rose-50 shrink-0" />
              )}
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-xs sm:text-[13px] font-semibold text-[#071527] truncate">
                    {p.name}
                  </span>
                  {p.urgent && (
                    <span className="px-1.5 py-px rounded bg-red-50 border border-red-200 text-red-700 text-[10px] font-semibold shrink-0">
                      Urgent
                    </span>
                  )}
                </span>
                <span className="block text-[11px] text-slate-500 truncate">
                  {[p.disease, p.hospital].filter(Boolean).join(" · ")}
                </span>
                {needed > 0 && (
                  <span className="mt-1 flex items-center gap-2">
                    <span className="h-1 flex-1 max-w-40 rounded-full bg-slate-200 overflow-hidden">
                      <span className="block h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      {remaining > 0 ? `${fmtINR(remaining)} still needed` : "Fully funded"}
                    </span>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
