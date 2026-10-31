import { useState } from "react";
import { toast } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Building2, Send, CheckCircle2,
  AlertCircle, Clock, Globe, Users, MessageSquare, ArrowRight,
  Facebook, Twitter, Instagram, Youtube, Linkedin, Heart,
  Sprout, Handshake, ChevronRight, Home, ExternalLink
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import contactHandsImg from "@/assets/contact-hands-hero.jpg";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import aboutHero from "@/assets/about-hero.jpg";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";

import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";

// ─── Data from Contact Page Structure Specification ───────────────────────────

const OFFICES = [
  {
    number: "01",
    type: "REGISTERED OFFICE",
    city: "Darbhanga, Bihar",
    address: "Bathiya, Darbhanga, Bihar – 847423, India",
    role: "Official registered address of ISLAH Welfare Foundation.",
    inCharge: "Mr. Md. Azizullah",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
    badge: "REGISTERED OFFICE",
    badgeCls: "bg-emerald-700 text-white",
    iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    themeColor: "#15803d",
    mapUrl:
      "https://www.google.com/maps/place/26%C2%B009'43.0%22N+86%C2%B011'29.2%22E/@26.1619444,86.1888695,17z/data=!3m1!4b1!4m4!3m3!8m2!3d26.1619444!4d86.1914444?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    number: "02",
    type: "ADMINISTRATIVE OFFICE",
    city: "New Delhi, Delhi",
    address: "B-144, Abul Fazal Enclave-II, Okhla, New Delhi, Delhi – 110025, India",
    role: "Central office for day-to-day administration, coordination and organisational operations.",
    inCharge: "Er. Nasera Firdausi",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 9:00 AM – 5:00 PM",
    badge: "ADMINISTRATIVE OFFICE",
    badgeCls: "bg-purple-700 text-white",
    iconBg: "bg-purple-50 text-purple-700 border-purple-200",
    themeColor: "#7c3aed",
    mapUrl:
      "https://www.google.com/maps/place/28%C2%B032'55.5%22N+77%C2%B018'10.3%22E/@28.54875,77.3002862,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.54875!4d77.3028611?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    number: "03",
    type: "REGIONAL OFFICE – BIHAR",
    city: "Patna, Bihar",
    address: "Sector-B, New Azimabad Colony, Patna, Bihar – 800006, India",
    role: "Regional coordination and programme support for Bihar.",
    inCharge: "Mr. Md. Sharique",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
    badge: "REGIONAL OFFICE – BIHAR",
    badgeCls: "bg-blue-600 text-white",
    iconBg: "bg-blue-50 text-blue-700 border-blue-200",
    themeColor: "#1d4ed8",
    mapUrl:
      "https://www.google.com/maps/place/25%C2%B036'35.4%22N+85%C2%B011'16.2%22E/@25.6098246,85.1852633,17z/data=!3m1!4b1!4m4!3m3!8m2!3d25.6098246!4d85.1878382?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    number: "04",
    type: "REGIONAL OFFICE – UTTAR PRADESH",
    city: "Meerut, Uttar Pradesh",
    address: "Sisoli, Garh Road, Meerut, Uttar Pradesh – 250004, India",
    role: "Regional coordination and programme support for Uttar Pradesh.",
    inCharge: "Mr. Md. Irshad Ali",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
    badge: "REGIONAL OFFICE – U.P.",
    badgeCls: "bg-amber-600 text-white",
    iconBg: "bg-amber-50 text-amber-700 border-amber-200",
    themeColor: "#d97706",
    mapUrl:
      "https://www.google.com/maps/place/28%C2%B055'01.0%22N+77%C2%B048'13.3%22E/@28.9169316,77.8011315,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.9169316!4d77.8037064?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
  },
];

const CONTACT_PERSONS = [
  {
    number: "01",
    name: "Er. Nasera Firdausi",
    title: "Acting Chairman",
    initials: "NF",
    color: "#2563eb",
    bg: "bg-blue-50",
    badgeCls: "bg-blue-100 text-blue-800 border-blue-200",
    phone: "+91 9811861633",
    email: "chairman@iwfindia.org",
  },
  {
    number: "02",
    name: "Er. Md. Ejazullah",
    title: "Secretary",
    initials: "ME",
    color: "#16a34a",
    bg: "bg-emerald-50",
    badgeCls: "bg-emerald-100 text-emerald-800 border-emerald-200",
    phone: "+91 9811861633",
    email: "secretary@iwfindia.org",
  },
  {
    number: "03",
    name: "Mr. Md. Azizullah",
    title: "Treasurer",
    initials: "MA",
    color: "#ea580c",
    bg: "bg-amber-50",
    badgeCls: "bg-amber-100 text-amber-800 border-amber-200",
    phone: "+91 9811861633",
    email: "treasurer@iwfindia.org",
  },
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Volunteer",
  "Partnership",
  "Sponsorship",
  "Donation",
  "Membership",
  "Mentorship",
  "Programme Information",
  "Media",
  "Careers",
  "Regional Office Enquiry",
  "Other",
] as const;

const REGIONAL_OFFICES_OPTIONS = [
  "Registered Office — Darbhanga",
  "Administrative Office — New Delhi",
  "Regional Office — Patna",
  "Regional Office — Meerut",
];

const VISUAL_SELECTOR_OPTIONS = [
  { label: "Partnership", icon: "🤝", value: "Partnership" },
  { label: "Donation", icon: "💙", value: "Donation" },
  { label: "Volunteer", icon: "🙋", value: "Volunteer" },
  { label: "Mentorship", icon: "🎓", value: "Mentorship" },
  { label: "Programmes", icon: "🏫", value: "Programme Information" },
  { label: "Membership", icon: "🪪", value: "Membership" },
  { label: "Media", icon: "📰", value: "Media" },
  { label: "General Enquiry", icon: "📩", value: "General Enquiry" },
];

// ─── Schema ───────────────────────────────────────────────────────────────────
// Note: Subject is completely removed as explicitly mandated in the specification.

const contactSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name is required")
      .regex(/^[^0-9]+$/, "Full name cannot contain numbers"),
    email: z.string().trim().email("Valid email required"),
    countryCode: z.string().default("+91"),
    phone: z
      .string()
      .trim()
      .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
    cityDistrict: z.string().trim().optional(),
    state: z.string().trim().optional(),
    pinCode: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^\d{6}$/.test(val), {
        message: "PIN code must be 6 digits",
      }),
    enquiryType: z.string().min(1, "Please select an enquiry type"),
    regionalOfficeTarget: z.string().optional(),
    message: z.string().trim().min(10, "Message must be at least 10 characters"),
    preferredContactMethod: z.enum(["Email", "Phone Call", "WhatsApp"]).default("Email"),
    privacy: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the Privacy Policy to proceed" }),
    }),
  })
  .refine(
    (data) => {
      if (data.enquiryType === "Regional Office Enquiry") {
        return !!data.regionalOfficeTarget && data.regionalOfficeTarget.length > 0;
      }
      return true;
    },
    {
      message: "Please choose which office you would like to contact",
      path: ["regionalOfficeTarget"],
    }
  );

type ContactFormData = z.infer<typeof contactSchema>;

const inputCls =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-400";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 mt-1 text-xs font-medium text-red-600">
      <AlertCircle className="w-3 h-3 shrink-0" /> {msg}
    </p>
  );
}

// ─── Contact Form Component ───────────────────────────────────────────────────

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionReference, setSubmissionReference] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+91");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema) as any,
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+91",
      phone: "",
      cityDistrict: "",
      state: "",
      pinCode: "",
      enquiryType: "General Enquiry",
      regionalOfficeTarget: "",
      message: "",
      preferredContactMethod: "Email",
    },
  });

  const selectedEnquiryType = watch("enquiryType");
  const selectedPreferredMethod = watch("preferredContactMethod");

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError(null);
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const generatedRef = `ISLAH-ENQ-2026-${randomCode}`;


      const addressLine = [data.cityDistrict, data.state, data.pinCode ? `PIN: ${data.pinCode}` : ""]
        .filter(Boolean)
        .join(", ");

      const officeDetails =
        data.enquiryType === "Regional Office Enquiry" && data.regionalOfficeTarget
          ? `\nOffice Target: ${data.regionalOfficeTarget}`
          : "";

      const { submitContact } = await import("@/services/contactService");
      const json = await submitContact({
        name: data.fullName.trim(),
        email: data.email,
        phone: data.phone,
        countryCode: data.countryCode || "+91",
        subject: data.enquiryType + (data.regionalOfficeTarget ? ` - ${data.regionalOfficeTarget}` : ""),
        message: data.message.trim(),
        enquiryType: data.enquiryType,
        cityDistrict: data.cityDistrict,
        state: data.state,
        pinCode: data.pinCode,
        preferredContactMethod: data.preferredContactMethod || "Email",
        regionalOfficeTarget: data.regionalOfficeTarget,
        referenceNumber: generatedRef,
        source: "Contact Page",
      });

      setSubmissionReference(generatedRef);
      setSubmitted(true);
      toast.success("Enquiry submitted successfully! Reference: " + generatedRef);
    } catch (err: any) {
      console.error("Contact Form error:", err);
      const msg = err?.message || "We couldn't submit your enquiry. Please check your details and try again.";
      setSubmitError(msg);
      toast.error(err, "We couldn't submit your enquiry. Please check your details and try again.");
    }
  };

  const handleReset = () => {
    reset();
    setSubmitError(null);
    setSubmitted(false);
    setSubmissionReference("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden notranslate form-container" translate="no" dir="ltr">
      {/* Header bar styled with Deep Navy #071527 */}
      <div className="bg-[#071527] px-6 py-5 border-b border-slate-800">
        <h3 className="text-white font-black text-lg md:text-xl flex items-center gap-2.5 uppercase tracking-wide">
          <MessageSquare className="w-5 h-5 text-brand-orange" />
          <span>SEND US A MESSAGE</span>
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
          We'd love to hear from you. Whether you have a question, want to volunteer, explore a partnership, support our programmes, or learn more about ISLAH, send us a message and our team will get back to you.
        </p>
      </div>

      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 px-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="inline-block text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                Successful submission
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Thank you for contacting ISLAH.
              </h4>
              <div className="my-3 py-2 px-4 rounded-xl bg-slate-100 border border-slate-200 inline-block font-mono text-xs sm:text-sm font-bold text-[#071527]">
                Reference: <span className="text-brand-orange">{submissionReference}</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mt-2">
                Your enquiry has been received successfully. Our team will get back to you within 24–48 hours.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
              >
                <span>Send Another Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 notranslate"
              translate="no"
            >
              {/* Visual Selector: What can we help you with? */}
              <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What can we help you with?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {VISUAL_SELECTOR_OPTIONS.map((item) => {
                    const isSelected = selectedEnquiryType === item.value;
                    return (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => {
                          setValue("enquiryType", item.value, { shouldValidate: true });
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                          isSelected
                            ? "bg-[#071527] text-white border-[#071527] shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
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

              {/* Email Address & Phone Number */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                  <FieldError msg={errors.email?.message} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20">
                    <select
                      value={countryCode}
                      onChange={(e) => {
                        setCountryCode(e.target.value);
                        setValue("countryCode", e.target.value);
                      }}
                      className="bg-slate-50 border-r border-slate-200 px-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                      aria-label="Country Code"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      {...register("phone", {
                        onChange: (e) => {
                          e.target.value = sanitizeDigits(e.target.value, 10);
                        },
                      })}
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      maxLength={10}
                      onKeyDown={blockNonDigitsOnKeyDown}
                      className="h-10 w-full px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <FieldError msg={errors.phone?.message} />
                </div>
              </div>

              {/* Address: City / District, State, PIN Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Address
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      {...register("cityDistrict")}
                      placeholder="Enter your city or district"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <input
                      {...register("state")}
                      placeholder="State"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <input
                      {...register("pinCode", {
                        onChange: (e) => {
                          e.target.value = sanitizeDigits(e.target.value, 6);
                        },
                      })}
                      onKeyDown={blockNonDigitsOnKeyDown}
                      placeholder="PIN Code"
                      maxLength={6}
                      className={inputCls}
                    />
                    <FieldError msg={errors.pinCode?.message} />
                  </div>
                </div>
              </div>

              {/* How can we help you? * (Dropdown) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  How can we help you? <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("enquiryType")}
                  className={inputCls + " cursor-pointer"}
                >
                  <option value="">Select an enquiry type</option>
                  {ENQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <FieldError msg={errors.enquiryType?.message} />
              </div>

              {/* Conditional Field: Regional Office Enquiry */}
              {selectedEnquiryType === "Regional Office Enquiry" && (
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 animate-in fade-in duration-200">
                  <label className="block text-xs font-bold text-blue-900 mb-1">
                    Which office would you like to contact? <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("regionalOfficeTarget")}
                    className={inputCls + " cursor-pointer bg-white"}
                  >
                    <option value="">Select an office</option>
                    {REGIONAL_OFFICES_OPTIONS.map((office) => (
                      <option key={office} value={office}>
                        {office}
                      </option>
                    ))}
                  </select>
                  <FieldError msg={errors.regionalOfficeTarget?.message} />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Please tell us how we can help you..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-400 resize-none"
                />
                <FieldError msg={errors.message?.message} />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                  {(["Email", "Phone Call", "WhatsApp"] as const).map((method) => (
                    <label key={method} className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={method}
                        checked={selectedPreferredMethod === method}
                        onChange={() => setValue("preferredContactMethod", method)}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  id="contact-privacy-check"
                  type="checkbox"
                  {...register("privacy")}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer shrink-0"
                />
                <label
                  htmlFor="contact-privacy-check"
                  className="text-xs text-slate-700 leading-snug cursor-pointer select-none"
                >
                  I agree to the{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 font-bold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>{" "}
                  and consent to ISLAH using the information provided to respond to my enquiry.{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.privacy && <FieldError msg={errors.privacy.message} />}

              {/* Error feedback */}
              {submitError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:scale-[1.008] disabled:opacity-60 text-sm mt-1 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send Message →</span>
                  </>
                )}
              </button>

              {/* Sub-button text & privacy reassurance */}
              <div className="space-y-1 text-center pt-1">
                <p className="text-[11px] font-semibold text-slate-500">
                  We aim to respond to enquiries within 24–48 working hours.
                </p>
                <p className="text-[10px] text-slate-400">
                  Your information is treated with care and used only for responding to your enquiry, in accordance with our Privacy Policy.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Contact Page Component ──────────────────────────────────────────────

export default function ContactPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col selection:bg-sky-100 selection:text-sky-900">
      {/* Universal Top Layout Elements */}
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-1">
        {/* ─── Subpage Hero Carousel (Matching About Us Page) ──────────────── */}
        <SubpageHeroCarousel
          tag="LET'S STAY CONNECTED"
          title="Contact ISLAH"
          subtitle="We're here to listen, collaborate and create meaningful change together. Reach out to our offices or leave us a message."
          breadcrumbs={[{ label: "Contact Us" }]}
          images={[contactHandsImg, aboutHero, slide1, slide2]}
        />

        {/* ─── 4 Quick Action Links Bar ──────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-md">
            {/* Card 1: Call Us */}
            <a
              href="tel:+919811861633"
              className="bg-slate-50 hover:bg-orange-50 border border-slate-200/80 hover:border-brand-orange/40 rounded-xl p-3 flex items-center gap-3 transition group"
            >
              <div className="w-9 h-9 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Call Us</h4>
                <p className="text-[11px] text-slate-500 font-medium notranslate" dir="ltr" translate="no">+91 9811861633</p>
              </div>
            </a>
            {/* Card 2: Email Us */}
            <a
              href="mailto:info@iwfindia.org"
              className="bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-400/40 rounded-xl p-3 flex items-center gap-3 transition group"
            >
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">Email Us</h4>
                <p className="text-[11px] text-slate-500 font-medium truncate" title="info@iwfindia.org">info@iwfindia.org</p>
              </div>
            </a>
            {/* Card 3: Visit Us */}
            <a
              href="#offices"
              className="bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-400/40 rounded-xl p-3 flex items-center gap-3 transition group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Visit Us</h4>
                <p className="text-[11px] text-slate-500 font-medium">Our 4 Offices</p>
              </div>
            </a>
            {/* Card 4: Connect */}
            <a
              href="#send-message"
              className="bg-slate-50 hover:bg-purple-50 border border-slate-200/80 hover:border-purple-400/40 rounded-xl p-3 flex items-center gap-3 transition group"
            >
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Connect Us</h4>
                <p className="text-[11px] text-slate-500 font-medium">Send Message</p>
              </div>
            </a>
          </div>
        </div>

            {/* Core Values Strip */}
            <div className="bg-white pb-3 pt-0 border-b border-slate-200/80">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center sm:justify-start gap-5 sm:gap-8 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span className="tracking-wider uppercase text-[11px] sm:text-xs font-black text-slate-800">
                    STRONGER PEOPLE
                  </span>
                </div>
                <div className="hidden sm:block w-[1px] h-3.5 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="tracking-wider uppercase text-[11px] sm:text-xs font-black text-slate-800">
                    BRIGHTER COMMUNITIES
                  </span>
                </div>
                <div className="hidden sm:block w-[1px] h-3.5 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="tracking-wider uppercase text-[11px] sm:text-xs font-black text-slate-800">
                    A KINDER TOMORROW
                  </span>
                </div>
              </div>
            </div>

        {/* ─── Section 2: Our Offices (Four Offices in Exact Order) ───────────── */}
        <section id="offices" className="py-10 sm:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center gap-2 text-slate-800 mb-2">
                <Building2 className="w-6 h-6 text-sky-700" />
                <h2 className="text-2xl sm:text-3xl font-black tracking-wider uppercase">
                  OUR OFFICES
                </h2>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-brand-orange mt-1">
                Connecting Communities. Coordinating Action. Serving with Purpose.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                ISLAH Welfare Foundation operates through a network of offices that support its administrative, regional and community-focused activities. While our Registered Office serves as the Foundation’s official registered address, our Administrative and Regional Offices help coordinate programmes, partnerships and field activities across different locations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {OFFICES.map((office) => (
                <div
                  key={office.number}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all notranslate address-fixed"
                  translate="no"
                  dir="ltr"
                >
                  <div>
                    {/* Number Badge & Type */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono font-black text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                        {office.number}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${office.badgeCls}`}
                      >
                        {office.badge}
                      </span>
                    </div>

                    {/* City & Role */}
                    <h3 className="font-extrabold text-slate-900 text-base mb-1">
                      {office.city}
                    </h3>
                    <p className="text-xs text-brand-orange font-semibold leading-snug mb-3">
                      {office.role}
                    </p>

                    {/* In-Charge & Address */}
                    <div className="space-y-2 text-xs mb-4">
                      <p className="text-[11px] text-slate-600 font-medium">
                        Contact Person: <span className="font-bold text-slate-900 text-xs block mt-0.5">{office.inCharge}</span>
                      </p>
                      <div className="flex items-start gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                        <span className="leading-snug notranslate" dir="ltr" translate="no">
                          {office.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Links, Timing & Directions Button */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <a
                        href={`tel:${office.phone.replace(/\s+/g, "")}`}
                        className="text-slate-700 font-semibold hover:text-sky-700 hover:underline notranslate"
                        dir="ltr"
                        translate="no"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-slate-700 font-semibold hover:text-sky-700 hover:underline truncate"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px]">{office.timing}</span>
                    </div>

                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#071527] text-slate-800 hover:text-white border border-slate-200 transition-all font-bold text-xs group"
                    >
                      <span>Get Directions →</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Key Contact Persons ─────────────────────────────────────── */}
        <section className="py-10 sm:py-12 bg-slate-50 border-y border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 text-slate-800 mb-1.5">
                <Users className="w-5 h-5 text-emerald-700" />
                <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase">
                  KEY CONTACT PERSONS
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Reach out to the right person for your queries and collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CONTACT_PERSONS.map((person) => (
                <div
                  key={person.name}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all text-center flex flex-col items-center justify-between"
                >
                  <div className="w-full">
                    {/* Avatar Initials Circle */}
                    <div
                      className={`w-14 h-14 rounded-full ${person.bg} border-2 flex items-center justify-center mx-auto mb-3 text-base font-bold`}
                      style={{ color: person.color, borderColor: `${person.color}30` }}
                    >
                      {person.initials}
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base">{person.name}</h3>

                    <div className="mt-1.5 mb-4">
                      <span
                        className={`inline-block text-[11px] font-bold px-3 py-0.5 rounded-full border ${person.badgeCls}`}
                      >
                        {person.title}
                      </span>
                    </div>
                  </div>

                  <div className="w-full pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <a
                      href={`tel:${person.phone.replace(/\s+/g, "")}`}
                      className="flex items-center justify-center gap-2 text-slate-700 font-semibold hover:text-sky-700 transition-colors notranslate"
                      dir="ltr"
                      translate="no"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-600" />
                      <span>{person.phone}</span>
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center justify-center gap-2 text-slate-700 font-semibold hover:text-sky-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-sky-600" />
                      <span>{person.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Send Us a Message + Sidebar ─────────────────────────────── */}
        <section id="send-message" className="py-10 sm:py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
              {/* Form Column */}
              <ContactForm />

              {/* Sidebar Column */}
              <div className="space-y-4">
                {/* 1. Quick Contact */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 notranslate address-fixed" translate="no" dir="ltr">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">
                    QUICK CONTACT
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="tel:+919811861633"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">PHONE</p>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-sky-700 transition-colors notranslate" dir="ltr" translate="no">
                          +91 9811861633
                        </p>
                      </div>
                    </a>

                    <a
                      href="mailto:info@iwfindia.org"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">EMAIL</p>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                          info@iwfindia.org
                        </p>
                      </div>
                    </a>

                    <a
                      href="https://www.iwfindia.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">WEBSITE</p>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                          www.iwfindia.org
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* 2. Follow Us */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">
                    FOLLOW US
                  </h4>
                  <div className="flex items-center gap-2.5">
                    {[
                      { Icon: Facebook, color: "#1877F2", label: "Facebook", href: "https://www.facebook.com/islahindia/" },
                      { Icon: Twitter, color: "#1DA1F2", label: "Twitter / X", href: "https://x.com/islahindia/" },
                      { Icon: Instagram, color: "#E1306C", label: "Instagram", href: "https://www.instagram.com/islahindia/" },
                      { Icon: Youtube, color: "#FF0000", label: "YouTube", href: "https://www.youtube.com/channel/UC5sty9L25QQwC89JwGmEIVw/" },
                      { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn", href: "https://www.linkedin.com/in/islahindia/" },
                    ].map(({ Icon, color, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-50 hover:scale-105 hover:border-transparent transition-all shadow-2xs"
                        style={{ color }}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 3. Support Our Mission */}
                <div className="bg-[#071527] rounded-2xl p-5 text-white border border-slate-800 shadow-sm">
                  <h4 className="font-black text-sm mb-1.5 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>Support Our Mission</span>
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    Every contribution goes directly to our programs in education, healthcare, and livelihood.
                  </p>
                  <Link
                    to="/donate"
                    className="block w-full text-center bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2.5 rounded-xl transition text-xs sm:text-sm shadow"
                  >
                    Donate Now
                  </Link>
                </div>

                {/* 4. Join as Volunteer */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Join as Volunteer</h4>
                      <p className="text-[11px] text-slate-500">Give your time and skills</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal("volunteer")}
                    className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl transition text-xs border border-slate-200/80 cursor-pointer"
                  >
                    Get Involved
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Get Involved / Together CTA ─────────────────────────── */}
        <section className="py-8 bg-white border-t border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-emerald-50/90 rounded-2xl border border-emerald-200/70 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Handshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                    TOGETHER, WE CAN CREATE STRONGER COMMUNITIES
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xl mt-0.5 leading-relaxed">
                    Your support and partnership help us bring hope, opportunity and positive change to those who need it most.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0 w-full md:w-auto">
                <button
                  onClick={() => setActiveModal("volunteer")}
                  className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Volunteer</span>
                </button>
                <Link
                  to="/about/partners"
                  className="inline-flex items-center justify-center gap-2 bg-[#071527] hover:bg-[#0d223f] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm"
                >
                  <Handshake className="w-4 h-4 text-sky-400" />
                  <span>Partner With Us</span>
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Support our Mission</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Universal Footer and Role Form Modal */}
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
