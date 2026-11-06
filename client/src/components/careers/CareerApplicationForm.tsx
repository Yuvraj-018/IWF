import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AlertCircle, ArrowRight, CheckCheck, RefreshCw } from "lucide-react";
import Turnstile from "@/components/common/Turnstile";
import { submitApplication } from "@/services/applicationService";
import { uploadSingleFile } from "@/services/uploadService";
import { blockNumbersOnKeyDown, sanitizeName } from "@/utils/formValidation";
import {
  CheckboxRow,
  Field,
  FileUpload,
  PhoneInput,
  SelectInput,
  focusFirstError,
  inputClass,
  type FieldErrors,
  type UploadedFile,
} from "@/components/forms/formFields";
import { EMAIL_RE, QUALIFICATIONS, isValidPhone, phoneError } from "@/components/forms/formRules";
import { GENERAL_APPLICATION } from "@/content/careerOpenings";

const EXPERIENCE = [
  "Fresher",
  "Less than 1 year",
  "1–2 years",
  "2–5 years",
  "5–10 years",
  "More than 10 years",
];

const EMPTY = {
  fullName: "",
  countryCode: "+91",
  phone: "",
  email: "",
  qualification: "",
  experience: "",
  location: "",
  position: "",
  declaration: false,
};

export function CareerApplicationForm({
  positions,
  selectedPosition,
}: {
  positions: string[];
  /** Pre-selects a position when a candidate clicks "Apply Now" on a role. */
  selectedPosition?: string;
}) {
  const [v, setV] = useState(EMPTY);
  const [resume, setResume] = useState<UploadedFile | null>(null);
  const [photo, setPhoto] = useState<UploadedFile | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPosition) {
      setV((p) => ({ ...p, position: selectedPosition }));
      setErrors(({ position: _p, ...rest }) => rest);
    }
  }, [selectedPosition]);

  const set = <K extends keyof typeof EMPTY>(k: K, val: (typeof EMPTY)[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors(({ [k]: _x, ...rest }) => rest);
  };

  const allPositions = [...positions, GENERAL_APPLICATION];

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!v.position) e.position = "Select the position you are applying for.";
    if (v.fullName.trim().length < 3) e.fullName = "Please enter your full name.";
    if (!isValidPhone(v.countryCode, v.phone))
      e.phone = phoneError(v.countryCode, v.phone) ?? "Enter a valid mobile number.";
    if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (!v.qualification) e.qualification = "Select your qualification.";
    if (!v.experience) e.experience = "Select your experience.";
    if (v.location.trim().length < 2) e.location = "Enter your current location.";
    if (!resume) e.resume = "Please upload your resume (PDF, DOC or DOCX).";
    if (!v.declaration) e.declaration = "Required";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      toast.error("Please complete the highlighted fields.");
      setTimeout(() => focusFirstError(e), 50);
      return;
    }
    setSubmitting(true);
    setApiError(null);
    try {
      const file = await uploadSingleFile(resume!.file, "islah/applications/career");
      const photoFile = photo
        ? await uploadSingleFile(photo.file, "islah/applications/career/photos")
        : null;
      const res = await submitApplication({
        type: "career",
        fullName: v.fullName.trim(),
        email: v.email.trim(),
        phone: v.phone,
        countryCode: v.countryCode,
        city: v.location.trim(),
        message: v.position,
        resumeUrl: file.url,
        turnstileToken: token,
        formData: {
          position: v.position,
          qualification: v.qualification,
          experience: v.experience,
          currentLocation: v.location.trim(),
          cvFileUrl: file.url,
          cvFileName: resume!.name,
          resume: { name: resume!.name, url: file.url },
          ...(photoFile
            ? {
                photoUrl: photoFile.url,
                documents: { photo: { name: photo!.name, url: photoFile.url } },
              }
            : {}),
        },
      });
      setReference(
        res?.applicationId ||
          res?.id ||
          `ISLAH-CAR-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`,
      );
      toast.success("Application submitted successfully!");
    } catch (err) {
      const msg =
        err instanceof Error && err.message ? err.message : "Could not submit your application.";
      setApiError(`${msg} Please check your connection and try again.`);
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (reference) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-[#071527]">Application Received</h3>
        <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
          Thank you for applying for <strong>{v.position}</strong>. Our team will review your
          profile and contact shortlisted candidates for the next stage.
        </p>
        <p className="mt-3 text-sm">
          Reference: <span className="font-mono font-semibold text-[#071527]">{reference}</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setReference(null);
            setV(EMPTY);
            setResume(null);
            setPhoto(null);
          }}
          className="mt-4 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          Apply for another role
        </button>
      </div>
    );
  }

  const has = (k: string) => Boolean(errors[k]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3.5">
        <Field name="position" label="Position Applied For" required error={errors.position}>
          <SelectInput
            value={allPositions.includes(v.position) ? v.position : ""}
            onChange={(x) => set("position", x)}
            options={allPositions}
            placeholder="Select position"
            hasError={has("position")}
          />
        </Field>
        <Field name="fullName" label="Full Name" required error={errors.fullName}>
          <input
            type="text"
            value={v.fullName}
            maxLength={60}
            onKeyDown={blockNumbersOnKeyDown}
            onChange={(e) => set("fullName", sanitizeName(e.target.value))}
            placeholder="Enter your full name"
            className={inputClass(has("fullName"))}
          />
        </Field>
        <Field name="phone" label="Mobile Number" required error={errors.phone}>
          <PhoneInput
            countryCode={v.countryCode}
            onCountryCodeChange={(c) => set("countryCode", c)}
            value={v.phone}
            onChange={(p) => set("phone", p)}
            hasError={has("phone")}
          />
        </Field>
        <Field name="email" label="Email Address" required error={errors.email}>
          <input
            type="email"
            value={v.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="Enter email address"
            className={inputClass(has("email"))}
          />
        </Field>
        <Field name="qualification" label="Qualification" required error={errors.qualification}>
          <SelectInput
            value={v.qualification}
            onChange={(x) => set("qualification", x)}
            options={QUALIFICATIONS}
            placeholder="Select qualification"
            hasError={has("qualification")}
          />
        </Field>
        <Field name="experience" label="Experience" required error={errors.experience}>
          <SelectInput
            value={v.experience}
            onChange={(x) => set("experience", x)}
            options={EXPERIENCE}
            placeholder="Select experience"
            hasError={has("experience")}
          />
        </Field>
        <Field name="location" label="Current Location" required error={errors.location}>
          <input
            type="text"
            value={v.location}
            maxLength={80}
            onChange={(e) => set("location", e.target.value)}
            placeholder="City, State"
            className={inputClass(has("location"))}
          />
        </Field>
        <Field
          name="resume"
          label="Upload Resume"
          required
          error={errors.resume}
          hint="PDF, DOC or DOCX — max 5 MB."
        >
          <FileUpload
            value={resume}
            onChange={(f) => {
              setResume(f);
              setErrors(({ resume: _r, ...rest }) => rest);
            }}
            accept="application/pdf,.doc,.docx"
            hasError={has("resume")}
          />
        </Field>
        <Field name="photo" label="Your Photo" optional hint="JPG, PNG or WEBP — max 5 MB.">
          <FileUpload
            value={photo}
            onChange={setPhoto}
            accept="image/jpeg,image/png,image/webp"
            imageOnly
          />
        </Field>
      </div>

      <div id="field-declaration" className="scroll-mt-28 mt-4">
        <CheckboxRow
          checked={v.declaration}
          onChange={(c) => set("declaration", c)}
          required
          hasError={has("declaration")}
        >
          I confirm that the above information is correct, and I have read and agree to the{" "}
          <Link
            to="/employment-policy"
            target="_blank"
            className="text-brand-orange font-semibold underline underline-offset-2"
          >
            Employment Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/code-of-conduct"
            target="_blank"
            className="text-brand-orange font-semibold underline underline-offset-2"
          >
            Code of Conduct
          </Link>
          .
        </CheckboxRow>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Turnstile
          action="application"
          onSuccess={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold transition"
        >
          {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
          {submitting ? "Submitting…" : "Submit Application"}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
      {apiError && (
        <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-px" />
          <span>{apiError}</span>
        </div>
      )}
    </div>
  );
}
