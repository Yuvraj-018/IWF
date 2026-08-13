import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, X } from "lucide-react";
import { useForm, type FieldErrors, type FieldValues } from "react-hook-form";
import { z } from "zod";

export type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

type FieldType = "text" | "email" | "tel" | "number" | "select" | "textarea" | "file" | "checkbox";

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  fullWidth?: boolean;
  rows?: number;
};

type RoleConfig = {
  title: string;
  intro: string;
  fields: FieldConfig[];
};

const roleConfigs: Record<RoleType, RoleConfig> = {
  volunteer: {
    title: "Apply to Volunteer",
    intro:
      "Share your details and how you would like to contribute your time, skills, or field support.",
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "age", label: "Age", type: "number", required: true, min: 1, max: 120 },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: ["Male", "Female", "Other"],
      },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: ["Single", "Married", "Prefer not to say"],
      },
      { name: "address", label: "Address", type: "text", required: true, fullWidth: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "pinCode", label: "Pin Code", type: "text", required: true },
      { name: "email", label: "E-mail", type: "email", required: true },
      { name: "contactNumber", label: "Contact Number", type: "tel", required: true },
      {
        name: "qualification",
        label: "Academic Qualification",
        type: "text",
        required: true,
        placeholder: "Mention the highest qualification",
      },
      { name: "experienceYears", label: "Experience Years", type: "number", min: 0, max: 60 },
      { name: "experienceMonths", label: "Experience Months", type: "number", min: 0, max: 11 },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Why do you want to volunteer with IWF?",
        rows: 4,
        fullWidth: true,
      },
    ],
  },
  partner: {
    title: "Become a Partner",
    intro:
      "Tell us about your organization and the kind of collaboration you want to explore with IWF.",
    fields: [
      { name: "organizationName", label: "Organization Name", type: "text", required: true },
      {
        name: "organizationType",
        label: "Organization Type",
        type: "select",
        required: true,
        options: [
          "Corporate / CSR Foundation",
          "NGO / Non-Profit",
          "Educational Institution",
          "Social Enterprise / Development Agency",
        ],
      },
      { name: "contactPerson", label: "Contact Person", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: true },
      { name: "email", label: "Email ID", type: "email", required: true },
      { name: "mobile", label: "Mobile Number", type: "tel", required: true },
      { name: "address", label: "Address", type: "text", required: true, fullWidth: true },
      {
        name: "proposal",
        label: "Partnership Proposal / Message",
        type: "textarea",
        required: true,
        rows: 4,
        fullWidth: true,
      },
    ],
  },
  sponsor: {
    title: "Become a Sponsor",
    intro:
      "Share sponsorship details so IWF can align your support with a suitable programme or campaign.",
    fields: [
      { name: "sponsorName", label: "Sponsor / Organization Name", type: "text", required: true },
      {
        name: "sponsorCategory",
        label: "Sponsor Category",
        type: "select",
        required: true,
        options: [
          "Individual Sponsor",
          "Corporate / Business House",
          "Startup / Emerging Brand",
          "CSR Foundation",
          "Educational Institution",
        ],
      },
      { name: "contactPerson", label: "Contact Person", type: "text", required: true },
      {
        name: "programme",
        label: "Programme / Opportunity to Sponsor",
        type: "select",
        required: true,
        options: [
          "Events & Awareness Campaigns",
          "Education Support Programs",
          "Healthcare Initiatives & Camps",
          "Community Development Projects",
          "Skill Development & Livelihood",
          "Environmental & Sustainability Drives",
        ],
      },
      { name: "email", label: "Email ID", type: "email", required: true },
      { name: "mobile", label: "Mobile Number", type: "tel", required: true },
      {
        name: "details",
        label: "Sponsorship Details / Custom Request",
        type: "textarea",
        rows: 4,
        fullWidth: true,
      },
    ],
  },
  mentor: {
    title: "Become a Mentor",
    intro:
      "Let us know your background and how you can guide students, youth, or community members.",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      {
        name: "profession",
        label: "Current Profession",
        type: "text",
        required: true,
        placeholder: "Teacher, engineer, entrepreneur, etc.",
      },
      {
        name: "expertise",
        label: "Area of Expertise",
        type: "select",
        required: true,
        options: [
          "Academic Guidance",
          "Career Counselling",
          "Skill Development",
          "Entrepreneurship",
          "Technology / Digital Skills",
          "Other",
        ],
      },
      {
        name: "mode",
        label: "Mentorship Mode",
        type: "select",
        required: true,
        options: ["Online Sessions", "Offline Workshops", "Both"],
      },
      { name: "email", label: "Email ID", type: "email", required: true },
      { name: "contactNumber", label: "Contact Number", type: "tel", required: true },
      {
        name: "bio",
        label: "Brief Bio / Mentorship Plan",
        type: "textarea",
        required: true,
        rows: 4,
        fullWidth: true,
      },
    ],
  },
  employee: {
    title: "Apply for Employment",
    intro:
      "Apply for a role with IWF and share the basic details our team will need for follow-up.",
    fields: [
      {
        name: "postAppliedFor",
        label: "Post Applied For",
        type: "text",
        required: true,
        placeholder: "Program Manager, Field Officer, etc.",
      },
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "mobile", label: "Mobile Number", type: "tel", required: true },
      { name: "email", label: "Email ID", type: "email", required: true },
      { name: "qualification", label: "Qualification", type: "text", required: true },
      {
        name: "experience",
        label: "Experience",
        type: "text",
        required: true,
        placeholder: "3 years, fresh graduate, etc.",
      },
      { name: "resume", label: "Upload Resume", type: "file", required: true, fullWidth: true },
      {
        name: "confirmDetails",
        label: "I confirm details are correct",
        type: "checkbox",
        required: true,
        fullWidth: true,
      },
    ],
  },
};

const textRequired = (label: string) => z.string().trim().min(1, `${label} is required`);

function buildSchema(fields: FieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "checkbox") {
      shape[field.name] = field.required
        ? z.literal(true, { errorMap: () => ({ message: `${field.label} is required` }) })
        : z.boolean().optional();
      return;
    }

    if (field.type === "file") {
      shape[field.name] = field.required
        ? z.unknown().refine((value) => {
            return (
              !!value && typeof value === "object" && "length" in value && Number(value.length) > 0
            );
          }, `${field.label} is required`)
        : z.unknown().optional();
      return;
    }

    if (field.type === "email") {
      shape[field.name] = field.required
        ? textRequired(field.label).email("Enter a valid email address")
        : z.string().trim().email("Enter a valid email address").or(z.literal("")).optional();
      return;
    }

    if (field.type === "number") {
      const base = field.required ? textRequired(field.label) : z.string().trim().optional();
      shape[field.name] = base.superRefine((value, ctx) => {
        if (!value) return;
        const numberValue = Number(value);
        if (Number.isNaN(numberValue)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${field.label} must be a number` });
          return;
        }
        if (field.min !== undefined && numberValue < field.min) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${field.label} must be at least ${field.min}`,
          });
        }
        if (field.max !== undefined && numberValue > field.max) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${field.label} must be ${field.max} or less`,
          });
        }
      });
      return;
    }

    shape[field.name] = field.required ? textRequired(field.label) : z.string().trim().optional();
  });

  return z.object(shape);
}

function getError(errors: FieldErrors<FieldValues>, name: string) {
  const error = errors[name];
  return typeof error?.message === "string" ? error.message : undefined;
}

export interface RoleFormModalProps {
  type: RoleType | null;
  onClose: () => void;
}

export function RoleFormModal({ type, onClose }: RoleFormModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const config = type ? roleConfigs[type] : null;
  const schema = useMemo(() => (config ? buildSchema(config.fields) : z.object({})), [config]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    setSubmitted(false);
    reset();
  }, [reset, type]);

  if (!type || !config) return null;

  const close = () => {
    reset();
    onClose();
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-slate-100 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-brand-green px-5 py-4 text-white sm:px-6">
          <div>
            <h3 className="text-base font-bold uppercase tracking-wide sm:text-lg">
              {config.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-white/80">{config.intro}</p>
          </div>
          <button
            onClick={close}
            className="mt-0.5 rounded p-1 text-white/80 transition hover:text-white"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                <Heart className="h-8 w-8 text-brand-green" />
              </div>
              <h4 className="mb-2 text-xl font-bold text-slate-800">Details Received</h4>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                Your details have been captured on the frontend. Backend submission will be
                connected later.
              </p>
              <button
                onClick={close}
                className="mt-6 rounded bg-brand-green px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-green-dark"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(() => setSubmitted(true))} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                {config.fields.map((field) => {
                  const error = getError(errors, field.name);
                  const fieldClass = field.fullWidth ? "md:col-span-2" : "";

                  if (field.type === "checkbox") {
                    return (
                      <div
                        key={field.name}
                        className={`flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 ${fieldClass}`}
                      >
                        <input
                          id={field.name}
                          type="checkbox"
                          {...register(field.name)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                        />
                        <div>
                          <label
                            htmlFor={field.name}
                            className="cursor-pointer text-sm font-semibold text-slate-700"
                          >
                            {field.label} {field.required ? "*" : ""}
                          </label>
                          {error && (
                            <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name} className={fieldClass}>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-xs font-semibold text-slate-600"
                      >
                        {field.label} {field.required ? "*" : ""}
                      </label>
                      {field.type === "select" ? (
                        <select
                          id={field.name}
                          {...register(field.name)}
                          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          rows={field.rows ?? 3}
                          placeholder={field.placeholder}
                          {...register(field.name)}
                          className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                        />
                      ) : field.type === "file" ? (
                        <input
                          id={field.name}
                          type="file"
                          {...register(field.name)}
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand-green/10 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-brand-green hover:file:bg-brand-green/20"
                        />
                      ) : (
                        <input
                          id={field.name}
                          type={field.type}
                          min={field.min}
                          max={field.max}
                          placeholder={field.placeholder}
                          {...register(field.name)}
                          className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                        />
                      )}
                      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="rounded px-5 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-brand-green px-6 py-2 text-sm font-bold text-white shadow-md transition hover:bg-brand-green-dark"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
