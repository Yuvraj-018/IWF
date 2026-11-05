import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Copy,
  Pencil,
  RefreshCw,
  RotateCcw,
  Save,
} from "lucide-react";
import Turnstile from "@/components/common/Turnstile";
import { INDIAN_STATES } from "@/content/locations";
import { submitApplication, type ApplicationType } from "@/services/applicationService";
import { uploadSingleFile } from "@/services/uploadService";
import {
  blockNonDigitsOnKeyDown,
  blockNumbersOnKeyDown,
  sanitizeDigits,
  sanitizeName,
} from "@/utils/formValidation";
import {
  CheckChips,
  CheckboxRow,
  Field,
  FileUpload,
  PhoneInput,
  CityField,
  RadioCards,
  RadioPills,
  SelectInput,
  SubHeading,
  focusFirstError,
  inputClass,
  type FieldErrors,
  type UploadedFile,
} from "@/components/forms/formFields";
import { EMAIL_RE, URL_RE, isValidPhone, phoneError } from "@/components/forms/formRules";
import { SectorAreaPicker, flattenSectorAreas, type SectorPickerValue } from "./SectorAreaPicker";

// ============================================================================
// Schema
// ============================================================================

/** Field value shapes: text, multi-select, checkbox, sector picker. */
export type FieldValue = string | string[] | boolean | SectorPickerValue | null | undefined;
// Values are read dynamically by field key; `any` keeps config conditions concise.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Values = Record<string, any>;
type Cond = (v: Values) => boolean;
type Options = string[] | ((v: Values) => string[]);

interface BaseField {
  key: string;
  label: string;
  required?: boolean | Cond;
  /** Shows "(Optional)" next to the label. */
  optional?: boolean;
  hint?: string;
  placeholder?: string;
  visibleIf?: Cond;
  /** Grid columns to span inside the section (default 1). */
  span?: 1 | 2 | 3;
  validate?: (value: FieldValue, values: Values) => string | undefined;
  /** Hide from the review summary. */
  noReview?: boolean;
}

export type FieldDef = BaseField &
  (
    | {
        type: "text";
        inputType?: "text" | "email" | "url";
        variant?: "name" | "digits" | "year" | "pin" | "upper";
        maxLength?: number;
        /** For `pin`: key of the country field (default "country"). */
        countryKey?: string;
      }
    | { type: "textarea"; rows?: number; maxLength?: number }
    | { type: "select"; options: Options }
    | { type: "state"; countryKey?: string; cityKey?: string }
    | { type: "city"; stateKey: string; countryKey?: string }
    | { type: "phone"; codeKey: string }
    | { type: "date"; futureOnly?: boolean; pastOnly?: boolean }
    | { type: "pills"; options: string[] }
    | { type: "chips"; options: Options; columns?: 2 | 3 }
    | { type: "cards"; options: { id: string; title: string; desc: string }[] }
    | { type: "checkbox"; text: React.ReactNode }
    | { type: "file"; accept: string; imageOnly?: boolean }
    | { type: "sectors" }
  );

export interface SectionDef {
  title?: string;
  desc?: string;
  columns?: 1 | 2 | 3;
  visibleIf?: Cond;
  fields: FieldDef[];
}

export interface StepDef {
  title: string;
  /** Short line under the step heading. */
  intro?: string;
  sections: SectionDef[];
}

export interface PayloadCore {
  fullName: string;
  email: string;
  phone: string;
  countryCode?: string;
  city?: string;
  state?: string;
  organization?: string;
  message?: string;
}

export interface WizardConfig {
  id: string;
  applicationType: ApplicationType;
  /** Reference prefix shown if the API does not return one, e.g. "VOL". */
  refPrefix: string;
  /** Exactly three steps; the last one is rendered after the review summary. */
  steps: [StepDef, StepDef, StepDef];
  initial?: Values;
  toPayload: (v: Values) => PayloadCore;
  success: {
    title: string;
    body: string;
    nextSteps: { title: string; desc: string }[];
  };
}

// ============================================================================
// Helpers
// ============================================================================

const EMPTY_SECTORS: SectorPickerValue = { sectors: [], areas: {}, otherText: "" };

const allFields = (cfg: WizardConfig) =>
  cfg.steps.flatMap((s) => s.sections.flatMap((sec) => sec.fields));

function defaultValue(f: FieldDef): FieldValue {
  switch (f.type) {
    case "chips":
      return [];
    case "checkbox":
      return false;
    case "sectors":
      return EMPTY_SECTORS;
    case "file":
      return null;
    default:
      return "";
  }
}

function buildInitial(cfg: WizardConfig): Values {
  const v: Values = {};
  for (const f of allFields(cfg)) if (f.type !== "file") v[f.key] = defaultValue(f);
  return { ...v, ...cfg.initial };
}

const resolve = (o: Options, v: Values) => (typeof o === "function" ? o(v) : o);
const isRequired = (f: FieldDef, v: Values) =>
  typeof f.required === "function" ? f.required(v) : Boolean(f.required);
const isVisible = (f: { visibleIf?: Cond }, v: Values) => !f.visibleIf || f.visibleIf(v);

function isEmpty(f: FieldDef, val: unknown) {
  if (f.type === "sectors") return !(val as SectorPickerValue | undefined)?.sectors?.length;
  if (Array.isArray(val)) return val.length === 0;
  if (f.type === "checkbox") return !val;
  return val === null || val === undefined || String(val).trim() === "";
}

function validateField(
  f: FieldDef,
  v: Values,
  files: Record<string, UploadedFile | null>,
): string | undefined {
  const val = f.type === "file" ? files[f.key] : v[f.key];
  const required = isRequired(f, v);

  if (isEmpty(f, val)) {
    if (!required) return undefined;
    if (f.type === "checkbox") return "Required";
    if (f.type === "chips" || f.type === "sectors") return "Please select at least one option.";
    if (f.type === "select" || f.type === "pills" || f.type === "cards" || f.type === "state")
      return "Please select an option.";
    if (f.type === "file") return "Please upload this document.";
    if (f.type === "city") return "Please select or type your city / district.";
    return "Please fill in this field.";
  }

  if (f.type === "sectors") {
    const s = val as SectorPickerValue;
    const missing = s.sectors.filter((name) => !(s.areas[name] || []).length);
    if (missing.length) return `Select at least one specific area for: ${missing.join(", ")}.`;
  }
  if (f.type === "text") {
    const str = String(val).trim();
    if (f.inputType === "email" && !EMAIL_RE.test(str))
      return "Enter a valid email address, e.g. name@example.com.";
    if (f.inputType === "url" && !URL_RE.test(str))
      return "Enter a valid web address, e.g. https://example.org.";
    if (f.variant === "name" && str.length < 3)
      return "Please enter the full name (at least 3 letters).";
    if (f.variant === "year") {
      const y = Number(str);
      const now = new Date().getFullYear();
      if (!/^\d{4}$/.test(str) || y < 1800 || y > now)
        return `Enter a valid year between 1800 and ${now}.`;
    }
    if (f.variant === "pin") {
      const india = (v[f.countryKey || "country"] || "India") === "India";
      if (india ? !/^\d{6}$/.test(str) : !/^[A-Za-z0-9 -]{3,10}$/.test(str))
        return india ? "PIN code must be 6 digits." : "Enter a valid postal code.";
    }
  }
  if (f.type === "phone" && !isValidPhone(v[f.codeKey] || "+91", String(val)))
    return phoneError(v[f.codeKey] || "+91", String(val)) ?? "Enter a valid mobile number.";
  if (f.type === "date") {
    const d = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime())) return "Enter a valid date.";
    if (f.futureOnly && d < today) return "Please choose today or a future date.";
    if (f.pastOnly && d > today) return "Date cannot be in the future.";
  }
  return f.validate?.(val, v);
}

function formatForReview(
  f: FieldDef,
  v: Values,
  files: Record<string, UploadedFile | null>,
): string {
  const val = f.type === "file" ? files[f.key] : v[f.key];
  if (f.type === "file") return (val as UploadedFile)?.name || "";
  if (f.type === "sectors")
    return flattenSectorAreas(val as SectorPickerValue)
      .map((s) => s.split(": ")[1])
      .join(", ");
  if (f.type === "checkbox") return val ? "Yes" : "";
  if (f.type === "cards") return f.options.find((o) => o.id === val)?.title || "";
  if (f.type === "phone") return val ? `${v[f.codeKey] || ""} ${val}` : "";
  if (f.type === "date" && val)
    return new Date(val).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  if (Array.isArray(val)) return val.join(", ");
  return String(val ?? "");
}

// ============================================================================
// Component
// ============================================================================

export function ApplicationWizard({ config }: { config: WizardConfig }) {
  const storageKey = `islah_application_draft_${config.id}`;
  const initial = useMemo(() => buildInitial(config), [config]);

  const [v, setValues] = useState<Values>(initial);
  const [files, setFiles] = useState<Record<string, UploadedFile | null>>({});
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [savedLabel, setSavedLabel] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  // ---------------------------------------------------------------- draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft?.values) setValues({ ...initial, ...draft.values });
        setSavedLabel("Draft restored");
      }
    } catch {
      /* ignore */
    }
    setDraftReady(true);
  }, [storageKey, initial]);

  const isDirty = useMemo(() => JSON.stringify(v) !== JSON.stringify(initial), [v, initial]);

  useEffect(() => {
    if (!draftReady || !isDirty || reference) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ values: v }));
        setSavedLabel(
          `Draft saved ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        );
      } catch {
        /* ignore */
      }
    }, 700);
    return () => clearTimeout(t);
  }, [v, isDirty, draftReady, reference, storageKey]);

  const resetAll = (message?: string) => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setValues(initial);
    setFiles({});
    setErrors({});
    setStep(0);
    setMaxStep(0);
    setSavedLabel(null);
    setApiError(null);
    if (message) toast.info(message);
  };

  // ---------------------------------------------------------------- setters
  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _x, ...rest } = prev;
      return rest;
    });

  const set = (key: string, value: FieldValue) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    clearError(key);
  };

  // ---------------------------------------------------------------- validation
  const validateStep = (index: number): FieldErrors => {
    const e: FieldErrors = {};
    for (const sec of config.steps[index].sections) {
      if (!isVisible(sec, v)) continue;
      for (const f of sec.fields) {
        if (!isVisible(f, v)) continue;
        const msg = validateField(f, v, files);
        if (msg) e[f.key] = msg;
        if (f.type === "sectors") {
          const s = v[f.key] as SectorPickerValue;
          const otherPicked = Object.values(s.areas).some((l) =>
            l.some((a) => a.startsWith("Other —")),
          );
          if (otherPicked && !s.otherText.trim()) e.sectorOther = "Please specify the other area.";
        }
      }
    }
    return e;
  };

  const scrollToTop = () => {
    // scrollIntoView also works when the wizard sits inside a scrolling modal
    document
      .getElementById(`wizard-${config.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showErrors = (e: FieldErrors) => {
    setErrors(e);
    const n = Object.keys(e).length;
    toast.error(`Please complete the ${n} highlighted field${n > 1 ? "s" : ""}.`);
    setTimeout(() => focusFirstError(e), 60);
  };

  const goTo = (target: number) => {
    if (target < step) {
      setErrors({});
      setStep(target);
      scrollToTop();
      return;
    }
    for (let s = step; s < target; s++) {
      const e = validateStep(s);
      if (Object.keys(e).length) {
        setStep(s);
        showErrors(e);
        return;
      }
    }
    setErrors({});
    setStep(target);
    setMaxStep((m) => Math.max(m, target));
    scrollToTop();
  };

  // ---------------------------------------------------------------- submit
  const handleSubmit = async () => {
    const e = validateStep(2);
    if (Object.keys(e).length) return showErrors(e);
    setSubmitting(true);
    setApiError(null);
    try {
      // Upload documents first so the application stores their URLs
      const uploaded: Record<string, { name: string; url: string }> = {};
      for (const [key, f] of Object.entries(files)) {
        if (!f) continue;
        const res = await uploadSingleFile(f.file, `islah/applications/${config.applicationType}`);
        uploaded[key] = { name: f.name, url: res.url };
      }

      const sectorField = allFields(config).find((f) => f.type === "sectors");
      const sectorValue = sectorField ? (v[sectorField.key] as SectorPickerValue) : EMPTY_SECTORS;
      const visibleValues = Object.fromEntries(
        allFields(config)
          .filter((f) => f.type !== "file" && isVisible(f, v))
          .map((f) => [f.key, v[f.key]]),
      );

      const core = config.toPayload(v);
      const res = await submitApplication({
        type: config.applicationType,
        ...core,
        selectedSectors: sectorValue.sectors,
        subclassifications: flattenSectorAreas(sectorValue),
        turnstileToken,
        formData: { ...visibleValues, documents: uploaded },
      });

      const ref =
        res?.applicationId ||
        res?.id ||
        `ISLAH-${config.refPrefix}-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
      setReference(ref);
      toast.success("Application submitted successfully!");
      scrollToTop();
    } catch (err) {
      const msg =
        err instanceof Error && err.message ? err.message : "Could not submit your application.";
      setApiError(`${msg} Please check your connection and try again — your answers are saved.`);
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================================================
  // Render: success
  // ==========================================================================
  if (reference) {
    return (
      <div
        id={`wizard-${config.id}`}
        className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-24"
      >
        <div className="text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#071527]">
            {config.success.title}
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">{config.success.body}</p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500">Application reference</span>
            <span className="font-mono text-sm font-semibold text-[#071527]">{reference}</span>
            <button
              type="button"
              onClick={() =>
                navigator.clipboard
                  ?.writeText(reference)
                  .then(() => toast.success("Reference copied"))
              }
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-white transition"
              aria-label="Copy reference"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            Please keep this reference for future communication with ISLAH.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-[#071527] mb-3 text-center">
            What happens next?
          </h4>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {config.success.nextSteps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-slate-200 p-3.5">
                <span className="text-[11px] font-bold text-brand-orange">0{i + 1}</span>
                <p className="text-sm font-semibold text-[#071527] mt-0.5">{s.title}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#071527] hover:bg-slate-800 text-white text-xs font-semibold transition"
          >
            Return to Get Involved <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => {
              setReference(null);
              resetAll();
            }}
            className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-xs font-medium transition"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // Render: fields
  // ==========================================================================
  const renderField = (f: FieldDef) => {
    const err = errors[f.key];
    const has = Boolean(err);
    const val = v[f.key];

    let control: React.ReactNode = null;
    switch (f.type) {
      case "text": {
        const sanitize = (s: string) => {
          if (f.variant === "name") return sanitizeName(s);
          if (f.variant === "digits") return sanitizeDigits(s, f.maxLength);
          if (f.variant === "year") return sanitizeDigits(s, 4);
          if (f.variant === "upper") return s.toUpperCase();
          if (f.variant === "pin" && (v[f.countryKey || "country"] || "India") === "India")
            return sanitizeDigits(s, 6);
          return s;
        };
        const numeric = f.variant === "digits" || f.variant === "year";
        control = (
          <input
            type={f.inputType || "text"}
            inputMode={numeric ? "numeric" : undefined}
            value={val ?? ""}
            maxLength={f.maxLength ?? (f.variant === "year" ? 4 : 150)}
            placeholder={f.placeholder}
            onKeyDown={
              f.variant === "name"
                ? blockNumbersOnKeyDown
                : numeric
                  ? blockNonDigitsOnKeyDown
                  : undefined
            }
            onChange={(e) => set(f.key, sanitize(e.target.value))}
            className={inputClass(has)}
          />
        );
        break;
      }
      case "textarea":
        control = (
          <textarea
            value={val ?? ""}
            rows={f.rows ?? 3}
            maxLength={f.maxLength ?? 1500}
            placeholder={f.placeholder}
            onChange={(e) => set(f.key, e.target.value)}
            className={`${inputClass(has)} resize-y`}
          />
        );
        break;
      case "select": {
        const opts = resolve(f.options, v);
        control = (
          <SelectInput
            value={opts.includes(val) ? val : ""}
            onChange={(x) => set(f.key, x)}
            options={opts}
            placeholder={f.placeholder || "Select an option"}
            hasError={has}
          />
        );
        break;
      }
      case "state":
        control =
          (v[f.countryKey || "country"] || "India") === "India" ? (
            <SelectInput
              value={val}
              onChange={(x) => {
                set(f.key, x);
                if (f.cityKey && x !== val) set(f.cityKey, "");
              }}
              options={INDIAN_STATES}
              placeholder="Select state / UT"
              hasError={has}
            />
          ) : (
            <input
              type="text"
              value={val ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder="State / province / region"
              className={inputClass(has)}
            />
          );
        break;
      case "city":
        control = (
          <CityField
            state={v[f.stateKey] || ""}
            isIndia={(v[f.countryKey || "country"] || "India") === "India"}
            value={val ?? ""}
            onChange={(x) => set(f.key, x)}
            hasError={has}
          />
        );
        break;
      case "phone":
        control = (
          <PhoneInput
            countryCode={v[f.codeKey] || "+91"}
            onCountryCodeChange={(c) => set(f.codeKey, c)}
            value={val ?? ""}
            onChange={(p) => set(f.key, p)}
            hasError={has}
          />
        );
        break;
      case "date": {
        const today = new Date().toISOString().slice(0, 10);
        control = (
          <input
            type="date"
            value={val ?? ""}
            min={f.futureOnly ? today : undefined}
            max={f.pastOnly ? today : undefined}
            onChange={(e) => set(f.key, e.target.value)}
            className={inputClass(has)}
          />
        );
        break;
      }
      case "pills":
        control = (
          <RadioPills
            options={f.options}
            value={val}
            onChange={(x) => set(f.key, x)}
            hasError={has}
          />
        );
        break;
      case "chips": {
        const opts = resolve(f.options, v);
        control = opts.length ? (
          <CheckChips
            options={opts}
            selected={val || []}
            onToggle={(o) =>
              set(
                f.key,
                (val || []).includes(o) ? val.filter((x: string) => x !== o) : [...(val || []), o],
              )
            }
            hasError={has}
            columns={f.columns}
          />
        ) : (
          <p className="text-xs text-slate-500 italic">
            {f.placeholder || "No options available yet."}
          </p>
        );
        break;
      }
      case "cards":
        control = (
          <RadioCards
            options={f.options}
            value={val}
            onChange={(x) => set(f.key, x)}
            hasError={has}
          />
        );
        break;
      case "checkbox":
        return (
          <div key={f.key} id={`field-${f.key}`} className={`scroll-mt-28 ${spanClass(f.span)}`}>
            <CheckboxRow
              checked={Boolean(val)}
              onChange={(c) => set(f.key, c)}
              required={isRequired(f, v)}
              hasError={has}
            >
              {f.text}
            </CheckboxRow>
          </div>
        );
      case "file":
        control = (
          <FileUpload
            value={files[f.key] || null}
            onChange={(file) => {
              setFiles((p) => ({ ...p, [f.key]: file }));
              clearError(f.key);
            }}
            accept={f.accept}
            imageOnly={f.imageOnly}
            hasError={has}
          />
        );
        break;
      case "sectors":
        control = (
          <SectorAreaPicker
            value={val || EMPTY_SECTORS}
            onChange={(next) => {
              set(f.key, next);
              clearError("sectorOther");
            }}
            hasError={has}
            otherError={errors.sectorOther}
          />
        );
        break;
    }

    return (
      <Field
        key={f.key}
        name={f.key}
        label={f.label}
        required={isRequired(f, v)}
        optional={f.optional}
        hint={f.hint}
        error={err}
        className={spanClass(f.span)}
      >
        {control}
      </Field>
    );
  };

  const renderSection = (sec: SectionDef, i: number, first: boolean) => {
    if (!isVisible(sec, v)) return null;
    const visible = sec.fields.filter((f) => isVisible(f, v));
    if (!visible.length) return null;
    const cols = sec.columns ?? 2;
    return (
      <div
        key={i}
        className={first ? "space-y-3.5" : "pt-5 mt-5 border-t border-slate-100 space-y-3.5"}
      >
        {sec.title && <SubHeading title={sec.title} desc={sec.desc} />}
        <div
          className={`grid gap-x-4 gap-y-3.5 ${
            cols === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : cols === 2
                ? "sm:grid-cols-2"
                : "grid-cols-1"
          }`}
        >
          {visible.map(renderField)}
        </div>
      </div>
    );
  };

  const current = config.steps[step];
  const isLast = step === 2;

  return (
    <div
      id={`wizard-${config.id}`}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden scroll-mt-24"
    >
      {/* Progress */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 py-3 flex items-center gap-2 sm:gap-4">
        <ol className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
          {config.steps.map((s, i) => {
            const isCurrent = step === i;
            const isDone = step > i;
            const reachable = i <= maxStep;
            return (
              <li key={s.title} className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                <button
                  type="button"
                  disabled={!reachable || isCurrent}
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
                  <span className={`${isCurrent ? "inline" : "hidden sm:inline"} truncate`}>
                    {s.title}
                  </span>
                </button>
                {i < 2 && <span className="h-px w-4 sm:w-8 bg-slate-300 shrink-0" />}
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
          <h3 className="text-base sm:text-lg font-semibold text-[#071527]">{current.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {current.intro || (
              <>
                Fields marked <span className="text-red-500">*</span> are required.
              </>
            )}
          </p>
        </div>

        {/* Review summary on the final step */}
        {isLast && (
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {config.steps.slice(0, 2).map((s, i) => (
              <div key={s.title} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {s.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-orange hover:text-orange-700 px-1.5 py-0.5 rounded hover:bg-orange-50 transition"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                </div>
                <dl className="space-y-1.5">
                  {s.sections
                    .filter((sec) => isVisible(sec, v))
                    .flatMap((sec) => sec.fields)
                    .filter((f) => isVisible(f, v) && !f.noReview && f.type !== "checkbox")
                    .map((f) => [f, formatForReview(f, v, files)] as const)
                    .filter(([, text]) => text)
                    .map(([f, text]) => (
                      <div
                        key={f.key}
                        className="flex justify-between gap-3 text-xs sm:text-[13px]"
                      >
                        <dt className="text-slate-500 shrink-0 max-w-[45%]">
                          {f.label.replace(/\s*\(.*\)$/, "")}
                        </dt>
                        <dd className="text-slate-800 text-right min-w-0 break-words line-clamp-2">
                          {text}
                        </dd>
                      </div>
                    ))}
                </dl>
              </div>
            ))}
          </div>
        )}

        {current.sections.map((sec, i) => renderSection(sec, i, i === 0 && !isLast))}

        {isLast && (
          <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
            <Turnstile
              action="application"
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
              onError={() => setTurnstileToken("")}
            />
            {apiError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-px" />
                <span>{apiError}</span>
              </div>
            )}
            <p className="text-[11px] text-slate-500">
              By submitting, you confirm that you have reviewed your application and the required
              declarations.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 pt-5 mt-6 border-t border-slate-200">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <span />
          )}
          {!isLast ? (
            <button
              type="button"
              onClick={() => goTo(step + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#071527] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition"
            >
              {step === 0 ? `Continue to ${config.steps[1].title}` : "Review Application"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit Application <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function spanClass(span?: 1 | 2 | 3) {
  if (span === 3) return "sm:col-span-2 lg:col-span-3";
  if (span === 2) return "sm:col-span-2";
  return "";
}
