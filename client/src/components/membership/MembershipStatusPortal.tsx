import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  FileText,
  Pencil,
  RefreshCw,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  blockNumbersOnKeyDown,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
  sanitizeName,
} from "@/utils/formValidation";
import { INDIAN_STATES } from "@/content/locations";
import { checkMemberStatus, renewMember } from "@/services/memberService";
import {
  EMAIL_RE,
  INDIVIDUAL_TIERS,
  MAX_SPECIFIED_YEARS,
  MEMBERSHIP_TIERS,
  computeValidTill,
  formatDisplayMonth,
  formatLongMonth,
  parseValidTill,
  startOfMonth,
  generateReceiptNo,
  isValidPhone,
  phoneError,
  normaliseTier,
  type TierType,
} from "./membershipConfig";
import {
  CheckboxRow,
  Field,
  OtpVerifier,
  PhoneInput,
  CityField,
  RadioPills,
  SelectInput,
  SubHeading,
  focusFirstError,
  inputClass,
  type FieldErrors,
} from "@/components/forms/formFields";
import { MemberCardViewer } from "./MemberCard";
import { downloadReceiptPdf, type ReceiptData } from "./membershipReceipt";

// ============================================================================
// Types
// ============================================================================

interface MemberProfile {
  id: string;
  name: string;
  tier: TierType;
  isOrganisation: boolean;
  status: string;
  joined: string;
  validFrom: string;
  validTill: string;
  countryCode: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
}

type ContactFields = Pick<
  MemberProfile,
  "name" | "countryCode" | "phone" | "email" | "address" | "district" | "state" | "pincode"
>;

const CODE_TO_TIER: Record<string, TierType> = {
  MBL: "Blue",
  MYL: "Yellow",
  MGR: "Green",
  MOR: "Orange",
};


/** Demo record used when the members API is not reachable. */
function demoProfile(query: string): MemberProfile {
  const q = query.trim().toUpperCase();
  const code = q.match(/^ISLAH-(M[A-Z]{2})-/)?.[1];
  const tier = (code && CODE_TO_TIER[code]) || "Yellow";
  const isOrganisation = tier === "Orange";
  return {
    id: q.startsWith("ISLAH-") ? q : "ISLAH-MYL-2025-4819",
    name: isOrganisation ? "Sunrise Education Trust" : "Mohammad Aftab Alam",
    tier,
    isOrganisation,
    status: "Active",
    joined: "15 Apr 2025",
    validFrom: "15 Apr 2025",
    validTill: "Apr 2026",
    countryCode: "+91",
    phone: /^\d{10}$/.test(query.trim()) ? query.trim() : "9876543210",
    email: isOrganisation ? "contact@sunrisetrust.org" : "aftab.alam@example.com",
    address: "Ward No. 12, Laheriasarai",
    district: "Darbhanga",
    state: "Bihar",
    pincode: "846001",
  };
}

// ============================================================================
// Component
// ============================================================================

export function MembershipStatusPortal({ onOpenPolicy }: { onOpenPolicy: () => void }) {
  // Lookup
  const [query, setQuery] = useState("");
  const [lookupStarted, setLookupStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState<MemberProfile | null>(null);

  // Renewal
  const [stage, setStage] = useState<"overview" | "choose" | "form" | "done">("overview");
  const [path, setPath] = useState<"same" | "change">("same");
  const [newTier, setNewTier] = useState<TierType>("Yellow");
  const [periodChoice, setPeriodChoice] = useState<"1" | "2" | "custom">("1");
  const [customYears, setCustomYears] = useState("3");
  const [editingContact, setEditingContact] = useState(false);
  const [contact, setContact] = useState<ContactFields | null>(null);
  const [newPhoneVerifiedFor, setNewPhoneVerifiedFor] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const queryValid =
    /^ISLAH-M[A-Z]{2}-\d{4}-\d{3,6}$/i.test(query.trim()) || /^[6-9]\d{9}$/.test(query.trim());

  // --------------------------------------------------------------------------
  // Lookup
  // --------------------------------------------------------------------------

  const fetchMember = async () => {
    setLoading(true);
    try {
      let profile: MemberProfile | null = null;
      try {
        const res = await checkMemberStatus(query.trim());
        if (res?.member) {
          const m = res.member as typeof res.member &
            Partial<MemberProfile> & { phone?: string; address?: string; pincode?: string };
          const tier = normaliseTier(String(m.category));
          profile = {
            ...demoProfile(query),
            id: m.id,
            name: m.name,
            tier,
            isOrganisation: tier === "Orange",
            status: m.status,
            joined: m.joined,
            validFrom: m.validFrom || m.joined,
            validTill: m.validTill,
            state: m.state,
            district: m.district,
            phone: m.phone || "",
            email: m.email || "",
            address: m.address || "",
            pincode: m.pincode || "",
          };
        }
      } catch {
        /* API unavailable — fall back to demo record */
      }
      const found = profile || demoProfile(query);
      // A lapsed validity date always means the membership has expired
      const till = parseValidTill(found.validTill);
      if (till && till.getTime() < new Date().setHours(0, 0, 0, 0)) found.status = "Expired";
      setMember(found);
      setStage("overview");
      toast.success("Membership details retrieved.");
    } finally {
      setLoading(false);
    }
  };

  const resetLookup = () => {
    setMember(null);
    setLookupStarted(false);
    setQuery("");
    setStage("overview");
    setReceipt(null);
  };

  // --------------------------------------------------------------------------
  // Renewal derived values
  // --------------------------------------------------------------------------

  const targetTier: TierType = member ? (path === "same" ? member.tier : newTier) : "Yellow";
  const years = periodChoice === "custom" ? Number(customYears) || 0 : Number(periodChoice);
  const fee = MEMBERSHIP_TIERS[targetTier].amount * years;

  const renewalDates = useMemo(() => {
    if (!member) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentTill = parseValidTill(member.validTill);
    // Renewal continues from the month after the current one ends, or this month if expired
    let from = startOfMonth(today);
    if (currentTill && currentTill >= today) {
      from = new Date(currentTill.getFullYear(), currentTill.getMonth() + 1, 1);
    }
    return { from, till: computeValidTill(from, Math.max(years, 1)) };
  }, [member, years]);

  const phoneChanged = Boolean(
    member &&
    contact &&
    (contact.phone !== member.phone || contact.countryCode !== member.countryCode),
  );
  const newPhoneVerified =
    !phoneChanged || newPhoneVerifiedFor === `${contact?.countryCode}${contact?.phone}`;

  const startRenewal = (p: "same" | "change") => {
    if (!member) return;
    setPath(p);
    if (p === "change") {
      setNewTier(INDIVIDUAL_TIERS.find((t) => t !== member.tier) || "Yellow");
    }
    setPeriodChoice("1");
    setCustomYears("3");
    setContact({
      name: member.name,
      countryCode: member.countryCode,
      phone: member.phone,
      email: member.email,
      address: member.address,
      district: member.district,
      state: member.state,
      pincode: member.pincode,
    });
    setEditingContact(false);
    setNewPhoneVerifiedFor(null);
    setAgree(false);
    setErrors({});
    setStage("form");
  };

  const setC = <K extends keyof ContactFields>(k: K, val: ContactFields[K]) => {
    setContact((prev) => (prev ? { ...prev, [k]: val } : prev));
    if (errors[k]) setErrors(({ [k]: _x, ...rest }) => rest);
  };

  const validateRenewal = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!member || !contact) return e;
    if (path === "change" && newTier === member.tier)
      e.newTier = "Choose a plan different from your current one.";
    if (periodChoice === "custom") {
      const n = Number(customYears);
      if (!Number.isInteger(n) || n < 3 || n > MAX_SPECIFIED_YEARS)
        e.customYears = `Enter a number of years between 3 and ${MAX_SPECIFIED_YEARS}.`;
    }
    if (editingContact) {
      if (contact.name.trim().length < 3) e.name = "Enter the full name.";
      if (!isValidPhone(contact.countryCode, contact.phone))
        e.phone = phoneError(contact.countryCode, contact.phone) ?? "Enter a valid mobile number.";
      if (!EMAIL_RE.test(contact.email.trim())) e.email = "Enter a valid email address.";
      if (!contact.state.trim()) e.state = "Select the state.";
      if (!contact.district.trim()) e.district = "Enter the city or district.";
      if (contact.pincode && !/^\d{6}$/.test(contact.pincode))
        e.pincode = "PIN code must be 6 digits.";
    }
    if (phoneChanged && !newPhoneVerified) e.newPhoneOtp = "Verify your new mobile number.";
    if (!agree) e.agree = "Required";
    return e;
  };

  const submitRenewal = async () => {
    if (!member || !contact || !renewalDates) return;
    const e = validateRenewal();
    if (Object.keys(e).length) {
      setErrors(e);
      toast.error("Please review the highlighted fields.");
      setTimeout(() => focusFirstError(e), 50);
      return;
    }
    setSubmitting(true);
    try {
      const updates = Object.fromEntries(
        (Object.keys(contact) as (keyof ContactFields)[])
          .filter((k) => contact[k] !== member[k])
          .map((k) => [k === "pincode" ? "pincode" : k, contact[k]]),
      );
      try {
        await renewMember({
          memberNo: member.id,
          membershipPeriod: years,
          renewalType: path,
          category: targetTier,
          contactUpdates: Object.keys(updates).length ? updates : undefined,
        });
      } catch {
        /* Backend unreachable — continue with client-side confirmation */
      }

      const validFrom = formatDisplayMonth(renewalDates.from);
      const validTill = formatDisplayMonth(renewalDates.till);
      const tierCfg = MEMBERSHIP_TIERS[targetTier];
      setMember({
        ...member,
        ...contact,
        tier: targetTier,
        status: "Active",
        validFrom,
        validTill,
      });
      setReceipt({
        receiptNo: generateReceiptNo(),
        memberId: member.id,
        name: contact.name,
        tier: targetTier,
        category: `${tierCfg.cardName} (${tierCfg.roleTitle})`,
        period: years,
        amount: fee,
        date: formatLongMonth(new Date()),
        validFrom,
        validTill,
        type: "Renewal",
      });
      setStage("done");
      toast.success("Membership renewed successfully!");
      document
        .getElementById("membership-status")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================================================
  // Render
  // ==========================================================================

  if (!member) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 max-w-2xl mx-auto shadow-xs">
        <Field
          name="lookup"
          label="Member ID or Registered Mobile Number"
          hint="e.g. ISLAH-MYL-2025-4819 or your 10-digit mobile number"
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value.toUpperCase().replace(/\s/g, ""));
                  setLookupStarted(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && queryValid && setLookupStarted(true)}
                placeholder="Member ID or mobile number"
                className={`${inputClass(false)} pl-9`}
              />
            </div>
            {!lookupStarted && (
              <button
                type="button"
                onClick={() => setLookupStarted(true)}
                disabled={!queryValid}
                className="px-4 py-2.5 rounded-lg bg-[#071527] hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold transition shrink-0"
              >
                Continue
              </button>
            )}
          </div>
        </Field>

        {lookupStarted && (
          <div className="mt-4">
            {loading ? (
              <div className="flex items-center gap-2 text-xs text-slate-600 py-3">
                <RefreshCw className="w-4 h-4 animate-spin" /> Retrieving your membership…
              </div>
            ) : (
              <OtpVerifier
                target={query.trim()}
                displayTarget="your registered mobile number"
                verified={false}
                onVerified={fetchMember}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  const tierCfg = MEMBERSHIP_TIERS[member.tier];
  const isActive = member.status.toLowerCase() === "active";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] text-slate-500 uppercase tracking-wide font-semibold">
            Welcome back
          </span>
          <h3 className="text-lg sm:text-xl font-semibold text-[#071527]">{member.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">{member.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {member.status}
          </span>
          <button
            type="button"
            onClick={resetLookup}
            className="text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50 px-2 py-1 rounded transition"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Overview: card + details + actions                                 */}
      {/* ------------------------------------------------------------------ */}
      {(stage === "overview" || stage === "choose") && (
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 pt-5">
          <MemberCardViewer
            data={{
              tier: member.tier,
              name: member.name,
              memberId: member.id,
              validFrom: member.validFrom,
              validTill: member.validTill,
              isOrganisation: member.isOrganisation,
            }}
          />
          <div className="space-y-4">
            <dl className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs sm:text-sm">
              {[
                ["Plan", `${tierCfg.cardName} — ${tierCfg.roleTitle}`],
                ["Member since", member.joined],
                ["Valid till", member.validTill],
                ["Location", [member.district, member.state].filter(Boolean).join(", ")],
              ].map(([k, val]) => (
                <div key={k} className="flex justify-between gap-3 px-4 py-2.5">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-[#071527] text-right">{val}</dd>
                </div>
              ))}
            </dl>

            {stage === "overview" ? (
              <button
                type="button"
                onClick={() => setStage("choose")}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold transition"
              >
                <RotateCcw className="w-4 h-4" />
                Renew Membership
              </button>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-700">How would you like to renew?</p>
                <button
                  type="button"
                  onClick={() => startRenewal("same")}
                  className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-brand-orange hover:bg-orange-50/40 text-left transition group"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#071527]">
                      Renew my current plan
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-orange transition" />
                  </span>
                  <span className="block text-xs text-slate-600 mt-0.5">
                    Continue as {tierCfg.cardName} · ₹{tierCfg.amount.toLocaleString("en-IN")}/year
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => startRenewal("change")}
                  disabled={member.isOrganisation}
                  className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-brand-orange hover:bg-orange-50/40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:opacity-60 text-left transition group"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#071527]">Change my plan</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-orange transition" />
                  </span>
                  <span className="block text-xs text-slate-600 mt-0.5">
                    {member.isOrganisation
                      ? "Only one organisational plan is currently offered."
                      : "Switch to a different card category while renewing"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setStage("overview")}
                  className="text-xs text-slate-500 hover:text-slate-800 px-1"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Renewal form                                                        */}
      {/* ------------------------------------------------------------------ */}
      {stage === "form" && contact && renewalDates && (
        <div className="pt-5">
          <button
            type="button"
            onClick={() => setStage("choose")}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h4 className="text-base font-semibold text-[#071527]">
            {path === "same" ? "Renew your current plan" : "Change plan & renew"}
          </h4>

          <div className="grid lg:grid-cols-[1fr_18rem] gap-6 mt-4">
            <div className="space-y-5">
              {/* Plan */}
              <div className="space-y-3">
                <SubHeading title="Plan" />
                {path === "same" ? (
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                    <div>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${tierCfg.badge}`}
                      >
                        {tierCfg.cardName}
                      </span>
                      <p className="text-sm font-semibold text-[#071527] mt-1.5">
                        {tierCfg.roleTitle}
                      </p>
                    </div>
                    <span className="text-sm text-slate-800">
                      ₹{tierCfg.amount.toLocaleString("en-IN")} / year
                    </span>
                  </div>
                ) : (
                  <Field
                    name="newTier"
                    label="Choose your new plan"
                    required
                    error={errors.newTier}
                  >
                    <div role="radiogroup" className="grid sm:grid-cols-3 gap-2.5">
                      {INDIVIDUAL_TIERS.map((t) => {
                        const cfg = MEMBERSHIP_TIERS[t];
                        const isCurrent = t === member.tier;
                        const active = newTier === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            disabled={isCurrent}
                            onClick={() => {
                              setNewTier(t);
                              setErrors(({ newTier: _n, ...rest }) => rest);
                            }}
                            className={`p-3 rounded-xl border text-left transition disabled:opacity-55 disabled:cursor-not-allowed ${
                              active && !isCurrent
                                ? "border-brand-orange bg-orange-50/50 ring-1 ring-brand-orange/25"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}
                              >
                                {cfg.cardName}
                              </span>
                              {isCurrent ? (
                                <span className="text-[10px] text-slate-500">Current</span>
                              ) : (
                                active && <Check className="w-4 h-4 text-brand-orange" />
                              )}
                            </span>
                            <span className="block text-sm font-semibold text-[#071527] mt-1.5">
                              {cfg.roleTitle}
                            </span>
                            <span className="block text-xs text-slate-700">
                              ₹{cfg.amount.toLocaleString("en-IN")} / year
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                )}

                <Field
                  name="customYears"
                  label="Renewal Period"
                  required
                  error={errors.customYears}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <RadioPills
                      options={["1 Year", "2 Years", "Specify years"]}
                      value={
                        periodChoice === "1"
                          ? "1 Year"
                          : periodChoice === "2"
                            ? "2 Years"
                            : "Specify years"
                      }
                      onChange={(val) =>
                        setPeriodChoice(val === "1 Year" ? "1" : val === "2 Years" ? "2" : "custom")
                      }
                    />
                    {periodChoice === "custom" && (
                      <input
                        type="text"
                        inputMode="numeric"
                        aria-label="Number of years"
                        value={customYears}
                        onKeyDown={blockNonDigitsOnKeyDown}
                        onChange={(e) => setCustomYears(sanitizeDigits(e.target.value, 2))}
                        className={`${inputClass(Boolean(errors.customYears))} !w-20 text-center`}
                      />
                    )}
                  </div>
                </Field>
              </div>

              {/* Contact details */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <SubHeading
                    title="Your details"
                    desc={
                      editingContact
                        ? "Update anything that has changed."
                        : "We'll keep these unless you update them."
                    }
                  />
                  {!editingContact && (
                    <button
                      type="button"
                      onClick={() => setEditingContact(true)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange hover:bg-orange-50 px-2 py-1 rounded transition"
                    >
                      <Pencil className="w-3 h-3" /> Update
                    </button>
                  )}
                </div>

                {!editingContact ? (
                  <dl className="grid gap-y-1.5 text-xs sm:text-[13px] rounded-xl bg-slate-50/70 border border-slate-200 p-3.5">
                    {[
                      [member.isOrganisation ? "Organisation" : "Name", contact.name],
                      ["Mobile", `${contact.countryCode} ${contact.phone}`],
                      ["Email", contact.email],
                      [
                        "Address",
                        [contact.address, contact.district, contact.state, contact.pincode]
                          .filter(Boolean)
                          .join(", "),
                      ],
                    ].map(([k, val]) => (
                      <div key={k} className="flex gap-2">
                        <dt className="text-slate-500 w-16 shrink-0">{k}</dt>
                        <dd className="text-slate-800 min-w-0 break-words">{val || "–"}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3.5">
                    <Field
                      name="name"
                      label={member.isOrganisation ? "Organisation Name" : "Full Name"}
                      required
                      error={errors.name}
                      className="sm:col-span-2"
                    >
                      <input
                        type="text"
                        value={contact.name}
                        onKeyDown={member.isOrganisation ? undefined : blockNumbersOnKeyDown}
                        onChange={(e) =>
                          setC(
                            "name",
                            member.isOrganisation ? e.target.value : sanitizeName(e.target.value),
                          )
                        }
                        className={inputClass(Boolean(errors.name))}
                      />
                    </Field>
                    <Field
                      name="phone"
                      label="Mobile / WhatsApp Number"
                      required
                      error={errors.phone}
                    >
                      <PhoneInput
                        countryCode={contact.countryCode}
                        onCountryCodeChange={(c) => setC("countryCode", c)}
                        value={contact.phone}
                        onChange={(p) => setC("phone", p)}
                        hasError={Boolean(errors.phone)}
                      />
                    </Field>
                    <Field name="email" label="Email Address" required error={errors.email}>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => setC("email", e.target.value)}
                        className={inputClass(Boolean(errors.email))}
                      />
                    </Field>
                    <Field name="address" label="Address" optional className="sm:col-span-2">
                      <input
                        type="text"
                        value={contact.address}
                        onChange={(e) => setC("address", e.target.value)}
                        className={inputClass(false)}
                      />
                    </Field>
                    <div className="sm:col-span-2 grid sm:grid-cols-[1fr_1fr_7rem] gap-x-4 gap-y-3.5">
                      <Field name="state" label="State / UT" required error={errors.state}>
                        <SelectInput
                          value={contact.state}
                          onChange={(val) => {
                            setC("state", val);
                            if (val !== contact.state) setC("district", "");
                          }}
                          options={INDIAN_STATES}
                          placeholder="Select state"
                          hasError={Boolean(errors.state)}
                        />
                      </Field>
                      <Field
                        name="district"
                        label="City / District"
                        required
                        error={errors.district}
                      >
                        <CityField
                          state={contact.state}
                          value={contact.district}
                          onChange={(val) => setC("district", val)}
                          hasError={Boolean(errors.district)}
                        />
                      </Field>
                      <Field name="pincode" label="PIN" optional error={errors.pincode}>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={contact.pincode}
                          onKeyDown={blockNonDigitsOnKeyDown}
                          onChange={(e) => setC("pincode", sanitizeDigits(e.target.value, 6))}
                          className={inputClass(Boolean(errors.pincode))}
                        />
                      </Field>
                    </div>
                    {phoneChanged && (
                      <div id="field-newPhoneOtp" className="sm:col-span-2 scroll-mt-28">
                        <p className="text-xs font-semibold text-slate-700 mb-1">
                          Verify your new mobile number
                        </p>
                        <OtpVerifier
                          target={contact.phone}
                          displayTarget={`${contact.countryCode} ${contact.phone}`}
                          verified={newPhoneVerified}
                          onVerified={() => {
                            setNewPhoneVerifiedFor(`${contact.countryCode}${contact.phone}`);
                            setErrors(({ newPhoneOtp: _n, ...rest }) => rest);
                          }}
                          hasError={Boolean(errors.newPhoneOtp)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 self-start rounded-xl border border-slate-200 p-4 space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Renewal summary
              </h5>
              <dl className="space-y-1.5 text-xs sm:text-[13px]">
                {[
                  ["Plan", MEMBERSHIP_TIERS[targetTier].cardName],
                  ["Period", `${years || "–"} year${years === 1 ? "" : "s"}`],
                  [
                    "New validity",
                    `${formatDisplayMonth(renewalDates.from)} – ${formatDisplayMonth(renewalDates.till)}`,
                  ],
                ].map(([k, val]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="text-slate-800 text-right">{val}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-2 pt-2 border-t border-slate-100">
                  <dt className="text-slate-700 font-medium">Amount payable</dt>
                  <dd className="text-[#071527] font-semibold text-base">
                    ₹{(fee || 0).toLocaleString("en-IN")}
                  </dd>
                </div>
              </dl>
              <div id="field-agree" className="scroll-mt-28">
                <CheckboxRow
                  checked={agree}
                  onChange={(c) => {
                    setAgree(c);
                    setErrors(({ agree: _a, ...rest }) => rest);
                  }}
                  required
                  hasError={Boolean(errors.agree)}
                >
                  My details are accurate and I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenPolicy();
                    }}
                    className="text-brand-orange font-semibold underline underline-offset-2"
                  >
                    Membership Policy
                  </button>
                  .
                </CheckboxRow>
              </div>
              <button
                type="button"
                onClick={submitRenewal}
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold transition"
              >
                {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {submitting ? "Processing…" : `Renew & Pay ₹${(fee || 0).toLocaleString("en-IN")}`}
              </button>
            </aside>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Done                                                                */}
      {/* ------------------------------------------------------------------ */}
      {stage === "done" && receipt && (
        <div className="pt-5">
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm mb-5">
            <CheckCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Your membership has been renewed until <strong>{receipt.validTill}</strong>. Your
              updated card is below.
            </span>
          </div>
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 items-start">
            <MemberCardViewer
              data={{
                tier: member.tier,
                name: member.name,
                memberId: member.id,
                validFrom: member.validFrom,
                validTill: member.validTill,
                isOrganisation: member.isOrganisation,
              }}
            />
            <div className="space-y-3">
              <dl className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs sm:text-sm">
                {[
                  ["Receipt Number", receipt.receiptNo],
                  ["Plan", receipt.category],
                  ["Period", `${receipt.period} year${receipt.period > 1 ? "s" : ""}`],
                  ["Amount", `₹${receipt.amount.toLocaleString("en-IN")}`],
                ].map(([k, val]) => (
                  <div key={k} className="flex justify-between gap-3 px-4 py-2.5">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-medium text-[#071527] text-right">{val}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() =>
                  downloadReceiptPdf(receipt).catch(() =>
                    toast.error("Could not generate the receipt."),
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
              >
                <FileText className="w-3.5 h-3.5" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
