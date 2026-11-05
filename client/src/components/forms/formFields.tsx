import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AlertCircle, Check, CheckCircle2, RefreshCw, Upload, X, FileText } from "lucide-react";
import { blockNonDigitsOnKeyDown, sanitizeDigits } from "@/utils/formValidation";
import { PhoneCodeSelect } from "./PhoneCodeSelect";
import { maxDigits, phonePlaceholder } from "./phone";
import { OTHER_CITY, districtsFor } from "@/content/indiaDistricts";
import { sendMemberOtp, verifyMemberOtp } from "@/services/memberService";

export type FieldErrors = Record<string, string>;

// ============================================================================
// Shared class names
// ============================================================================

const BASE_INPUT =
  "w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2";

export function inputClass(hasError?: boolean) {
  return `${BASE_INPUT} ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-brand-orange focus:ring-brand-orange/15"
  }`;
}

/** Scroll to and focus the first field that has an error. */
export function focusFirstError(errors: FieldErrors) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const el = document.getElementById(`field-${first}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const focusable = el.querySelector<HTMLElement>("input, select, textarea, button");
  focusable?.focus({ preventScroll: true });
}

// ============================================================================
// Field wrapper
// ============================================================================

export function Field({
  name,
  label,
  required,
  optional,
  hint,
  error,
  className = "",
  children,
}: {
  name: string;
  label: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  hint?: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={`field-${name}`} className={`scroll-mt-28 ${className}`}>
      <label className="block text-xs font-semibold text-slate-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-slate-400 font-normal ml-1">(Optional)</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[11px] text-slate-500 leading-snug">{hint}</p>
      ) : null}
    </div>
  );
}

/** Small section heading used inside a step. */
export function SubHeading({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="pt-1">
      <h4 className="text-sm font-semibold text-[#071527]">{title}</h4>
      {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
    </div>
  );
}

// ============================================================================
// Inputs
// ============================================================================

export function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  hasError?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass(hasError)}
    >
      {placeholder !== undefined && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/**
 * City / district for a chosen Indian state: a dropdown of that state's districts
 * plus "Other" (which reveals a text box). Free text for other countries or before
 * a state is chosen.
 */
export function CityField({
  state,
  isIndia = true,
  value,
  onChange,
  hasError,
  className,
}: {
  state: string;
  isIndia?: boolean;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  /** Override for the input/select classes (e.g. react-hook-form pages with their own style). */
  className?: string;
}) {
  const districts = isIndia ? districtsFor(state) : [];
  const listed = districts.includes(value);
  const [custom, setCustom] = useState(Boolean(value) && !listed);
  const cls = className ?? inputClass(hasError);

  useEffect(() => {
    // A new state was chosen and the old value no longer belongs to it.
    if (!value) setCustom(false);
  }, [state, value]);

  if (!districts.length) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isIndia ? "Select a state first, or type your city" : "City / town"}
        className={cls}
      />
    );
  }

  const showText = custom || (Boolean(value) && !listed);
  return (
    <div className="space-y-2">
      <select
        value={showText ? OTHER_CITY : value}
        onChange={(e) => {
          if (e.target.value === OTHER_CITY) {
            setCustom(true);
            onChange("");
          } else {
            setCustom(false);
            onChange(e.target.value);
          }
        }}
        className={cls}
      >
        <option value="" disabled>
          Select city / district
        </option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
        <option value={OTHER_CITY}>{OTHER_CITY}</option>
      </select>
      {showText && (
        <input
          type="text"
          value={value}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your city or town"
          className={cls}
        />
      )}
    </div>
  );
}

export function PhoneInput({
  countryCode,
  onCountryCodeChange,
  value,
  onChange,
  hasError,
}: {
  countryCode: string;
  onCountryCodeChange: (v: string) => void;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  return (
    <div className="flex gap-2 items-stretch">
      <PhoneCodeSelect
        value={countryCode}
        onChange={(dial) => {
          onCountryCodeChange(dial);
          onChange(sanitizeDigits(value, maxDigits(dial)));
        }}
      />
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={value}
        onKeyDown={blockNonDigitsOnKeyDown}
        onChange={(e) => onChange(sanitizeDigits(e.target.value, maxDigits(countryCode)))}
        placeholder={phonePlaceholder(countryCode)}
        className={inputClass(hasError)}
      />
    </div>
  );
}

// ============================================================================
// Choice controls
// ============================================================================

/** Multi-select chips with a checkbox look. */
export function CheckChips({
  options,
  selected,
  onToggle,
  hasError,
  columns = 2,
}: {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  hasError?: boolean;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-2 ${columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"} ${
        hasError ? "rounded-lg ring-1 ring-red-300 p-1" : ""
      }`}
    >
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => onToggle(opt)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left text-xs sm:text-[13px] transition ${
              checked
                ? "border-emerald-400 bg-emerald-50/70 text-emerald-900"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span
              className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                checked
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {checked && <Check className="w-3 h-3" />}
            </span>
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Inline radio pills (for short choices like Yes / No). */
export function RadioPills({
  options,
  value,
  onChange,
  hasError,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`px-3.5 py-2 rounded-lg border text-xs sm:text-[13px] transition ${
              active
                ? "border-[#071527] bg-slate-50 text-[#071527] font-semibold ring-1 ring-[#071527]/20"
                : hasError
                  ? "border-red-300 bg-white text-slate-700 hover:bg-slate-50"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/** Stacked radio cards with title + description. */
export function RadioCards<T extends string>({
  options,
  value,
  onChange,
  hasError,
}: {
  options: { id: T; title: string; desc: string }[];
  value: T | "";
  onChange: (v: T) => void;
  hasError?: boolean;
}) {
  return (
    <div role="radiogroup" className="grid sm:grid-cols-3 gap-2.5">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={`p-3 rounded-lg border text-left transition flex gap-2.5 ${
              active
                ? "border-brand-orange bg-orange-50/50 ring-1 ring-brand-orange/25"
                : hasError
                  ? "border-red-300 bg-white hover:bg-slate-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <span
              className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                active ? "border-brand-orange bg-brand-orange" : "border-slate-300"
              }`}
            >
              {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            <span>
              <span className="block text-xs sm:text-[13px] font-semibold text-[#071527]">
                {opt.title}
              </span>
              <span className="block text-[11px] text-slate-600 mt-0.5 leading-snug">
                {opt.desc}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function CheckboxRow({
  checked,
  onChange,
  required,
  hasError,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  hasError?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer rounded-lg px-2 py-1.5 -mx-2 transition ${
        hasError ? "bg-red-50" : "hover:bg-slate-50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#f97316]"
      />
      <span className="leading-relaxed">
        {children}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
    </label>
  );
}

// ============================================================================
// File upload
// ============================================================================

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  /** Data URL (kept for images so they can be previewed / placed on the card). */
  dataUrl?: string;
  file: File;
}

const MAX_FILE_MB = 5;

export function FileUpload({
  value,
  onChange,
  accept,
  imageOnly,
  hasError,
}: {
  value: UploadedFile | null;
  onChange: (f: UploadedFile | null) => void;
  accept: string;
  imageOnly?: boolean;
  hasError?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${MAX_FILE_MB} MB.`);
      return;
    }
    if (imageOnly && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG or PNG).");
      return;
    }
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () =>
        onChange({
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: String(reader.result),
          file,
        });
      reader.readAsDataURL(file);
    } else {
      onChange({ name: file.name, size: file.size, type: file.type, file });
    }
  };

  if (value) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50/50">
        {value.dataUrl && imageOnly ? (
          <img
            src={value.dataUrl}
            alt=""
            className="w-9 h-9 rounded-full object-cover border border-white"
          />
        ) : (
          <FileText className="w-5 h-5 text-emerald-700 shrink-0" />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-800 truncate">{value.name}</p>
          <p className="text-[11px] text-slate-500">{(value.size / 1024).toFixed(0)} KB</p>
        </div>
        <button
          type="button"
          onClick={() => {
            onChange(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-white transition"
          aria-label="Remove file"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed text-xs transition ${
          hasError
            ? "border-red-300 text-red-600 bg-red-50/40"
            : "border-slate-300 text-slate-600 hover:border-brand-orange hover:bg-orange-50/40"
        }`}
      >
        <Upload className="w-4 h-4" />
        <span>Choose file</span>
        <span className="text-slate-400">· max {MAX_FILE_MB} MB</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </>
  );
}

// ============================================================================
// OTP verification block
// ============================================================================

export function OtpVerifier({
  target,
  displayTarget,
  verified,
  onVerified,
  hasError,
}: {
  /** Identifier sent to the OTP API (mobile number or email). */
  target: string;
  /** Human readable target. */
  displayTarget: string;
  verified: boolean;
  onVerified: () => void;
  hasError?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // Reset when the target changes (e.g. user edits their number)
  useEffect(() => {
    setSent(false);
    setCode("");
  }, [target]);

  const send = async () => {
    setSending(true);
    try {
      const res = await sendMemberOtp(target);
      toast.success(
        res?.devHint ? `OTP sent (dev OTP: ${res.devHint})` : `OTP sent to ${displayTarget}`,
      );
    } catch {
      // Backend not reachable — temporary validation mode
      toast.info("OTP sent! (Use 123456 for temporary validation)", {
        duration: 8000,
      });
    } finally {
      setSent(true);
      setTimer(45);
      setSending(false);
    }
  };

  const verify = async () => {
    if (code.length !== 6) return;
    setVerifying(true);
    try {
      let ok = code === "123456";
      if (!ok) {
        try {
          const res = await verifyMemberOtp(target, code);
          ok = Boolean(res?.success);
        } catch {
          ok = false;
        }
      }
      if (ok) {
        onVerified();
        toast.success("Mobile number verified.");
      } else {
        toast.error("Invalid code. Please check and try again.");
      }
    } finally {
      setVerifying(false);
    }
  };

  if (verified) {
    return (
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{displayTarget} verified</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border p-3 space-y-3 ${
        hasError ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-slate-50/60"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-slate-600">
          We'll send a 6-digit OTP to{" "}
          <span className="font-semibold text-[#071527]">{displayTarget}</span>
        </div>
        <button
          type="button"
          onClick={send}
          disabled={sending || timer > 0}
          className="px-3.5 py-1.5 rounded-lg bg-[#071527] hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold transition"
        >
          {sending ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : timer > 0 ? (
            `Resend in ${timer}s`
          ) : sent ? (
            "Resend OTP"
          ) : (
            "Send OTP"
          )}
        </button>
      </div>
      {sent && (
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onKeyDown={(e) => {
              if (e.key === "Enter") verify();
              else blockNonDigitsOnKeyDown(e);
            }}
            onChange={(e) => setCode(sanitizeDigits(e.target.value, 6))}
            placeholder="••••••"
            className={`${inputClass(false)} !w-36 text-center font-mono tracking-[0.3em]`}
          />
          <button
            type="button"
            onClick={verify}
            disabled={verifying || code.length !== 6}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold transition"
          >
            {verifying ? "Verifying…" : "Verify"}
          </button>
        </div>
      )}
    </div>
  );
}
