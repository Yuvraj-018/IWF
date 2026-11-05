import { Link } from "@tanstack/react-router";
import { AGE_GROUPS, COUNTRIES, GENDERS } from "@/components/forms/formRules";
import type { FieldDef, SectionDef, Values } from "./ApplicationWizard";

type Cond = (v: Values) => boolean;

/** Personal details block shared by individual applications. */
export function personalSection(opts: { ageGroups?: string[]; title?: string } = {}): SectionDef {
  return {
    title: opts.title ?? "Personal information",
    fields: [
      {
        key: "fullName",
        type: "text",
        variant: "name",
        label: "Full Name",
        required: true,
        span: 2,
        maxLength: 60,
        placeholder: "Your full name",
      },
      {
        key: "phone",
        type: "phone",
        codeKey: "countryCode",
        label: "Mobile / WhatsApp Number",
        required: true,
      },
      {
        key: "email",
        type: "text",
        inputType: "email",
        label: "Email Address",
        required: true,
        placeholder: "name@example.com",
      },
      {
        key: "ageGroup",
        type: "select",
        options: opts.ageGroups ?? AGE_GROUPS,
        label: "Age Group",
        required: true,
        placeholder: "Select age group",
      },
      {
        key: "gender",
        type: "select",
        options: GENDERS,
        label: "Gender",
        optional: true,
        placeholder: "Select",
      },
    ],
  };
}

/** Country / state / city / address / PIN block. */
export function locationSection(
  opts: {
    title?: string;
    prefix?: string;
    visibleIf?: Cond;
    addressRequired?: boolean;
    pinRequired?: boolean;
  } = {},
): SectionDef {
  const p = opts.prefix ?? "";
  const k = (name: string) => (p ? `${p}${name[0].toUpperCase()}${name.slice(1)}` : name);
  return {
    title: opts.title ?? "Location",
    columns: 3,
    visibleIf: opts.visibleIf,
    fields: [
      { key: k("country"), type: "select", options: COUNTRIES, label: "Country", required: true },
      {
        key: k("state"),
        type: "state",
        countryKey: k("country"),
        cityKey: k("city"),
        label: "State / Union Territory",
        required: true,
      },
      {
        key: k("city"),
        type: "city",
        stateKey: k("state"),
        countryKey: k("country"),
        label: "City / District",
        required: true,
      },
      {
        key: k("address"),
        type: "text",
        label: "Full Address",
        optional: !opts.addressRequired,
        required: opts.addressRequired,
        span: 2,
        maxLength: 250,
        placeholder: "House / street, locality, landmark",
      },
      {
        key: k("pin"),
        type: "text",
        variant: "pin",
        countryKey: k("country"),
        label: "PIN / Postal Code",
        optional: !opts.pinRequired,
        required: opts.pinRequired,
        placeholder: "PIN code",
      },
    ],
  };
}

export const locationInitial = (prefix = ""): Values =>
  prefix ? { [`${prefix}Country`]: "India" } : { country: "India" };

export function hearAboutFields(
  options: string[],
  referralLabel = "Referral Name / Source",
): FieldDef[] {
  return [
    {
      key: "hearAbout",
      type: "select",
      options,
      label: "How did you hear about ISLAH?",
      placeholder: "Select an option",
    },
    {
      key: "referral",
      type: "text",
      label: referralLabel,
      optional: true,
      maxLength: 100,
      placeholder: "Name or source",
    },
  ];
}

export function recognitionField(
  question: string,
  options: { id: string; title: string; desc: string }[],
): FieldDef {
  return { key: "recognition", type: "cards", label: question, required: true, span: 3, options };
}

/** Checkbox whose text links to a policy page in a new tab. */
export function policyDeclaration(
  key: string,
  before: string,
  linkText: string,
  to: string,
  after = ".",
): FieldDef {
  return {
    key,
    type: "checkbox",
    required: true,
    label: linkText,
    span: 3,
    text: (
      <>
        {before}{" "}
        <Link
          to={to}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="text-brand-orange font-semibold underline underline-offset-2"
        >
          {linkText}
        </Link>
        {after}
      </>
    ),
  };
}

export function declaration(key: string, text: string, required = true): FieldDef {
  return { key, type: "checkbox", label: text, text, required, span: 3 };
}

export const updatesDeclaration = (text: string): FieldDef => ({
  key: "optUpdates",
  type: "checkbox",
  label: "Updates",
  span: 3,
  text: <span className="text-slate-500">(Optional) {text}</span>,
});

export const PREFERRED_DAYS = ["Monday to Friday", "Saturday", "Sunday", "Flexible"];
export const DOC_ACCEPT = "application/pdf,image/jpeg,image/png,.doc,.docx";
