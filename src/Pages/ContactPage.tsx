import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Building2, Send, CheckCircle2,
  AlertCircle, Clock, Globe, Users, MessageSquare, ArrowRight,
  Facebook, Twitter, Instagram, Youtube, Linkedin, Heart,
  Sprout, Handshake, ChevronRight
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import contactHandsImg from "@/assets/contact-hands-hero.jpg";

import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";

// ─── Data from Contact Us page.docx ──────────────────────────────────────────

const OFFICES = [
  {
    type: "Registered Office: Bathiya, Darbhanga, Bihar – 847423",
    shortName: "Registered Office",
    badge: "HEADQUARTERS",
    badgeCls: "bg-emerald-700 text-white",
    iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    themeColor: "#15803d",
    address: "Bathiya, Darbhanga, Bihar – 847423",
    inCharge: "Md. Azizullah",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Sat: 10:00 AM – 4:00 PM",
  },
  {
    type: "Patna Office",
    shortName: "Patna Office",
    badge: "BIHAR OFFICE",
    badgeCls: "bg-blue-600 text-white",
    iconBg: "bg-blue-50 text-blue-700 border-blue-200",
    themeColor: "#1d4ed8",
    address: "Sector-B, New Azimabad Colony, Patna, Bihar- 800006",
    inCharge: "Md. Sharique",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
  },
  {
    type: "Meerut Office",
    shortName: "Meerut Office",
    badge: "UP OFFICE",
    badgeCls: "bg-amber-600 text-white",
    iconBg: "bg-amber-50 text-amber-700 border-amber-200",
    themeColor: "#d97706",
    address: "Sisoli, Garh Road, Meerut, Uttar Pradesh- 250004",
    inCharge: "Md. Irshad Ali",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
  },
  {
    type: "Delhi Office",
    shortName: "Delhi Office",
    badge: "ADMINISTRATIVE OFFICE",
    badgeCls: "bg-purple-700 text-white",
    iconBg: "bg-purple-50 text-purple-700 border-purple-200",
    themeColor: "#7c3aed",
    address: "B-144, Abul Fazal Enclave-II, Okhla, New Delhi, Delhi-110025",
    inCharge: "Er. Nasera Firdausi",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 9:00 AM – 5:00 PM",
  },
];

const CONTACT_PERSONS = [
  {
    name: "Er. Nasera Firdausi",
    title: "V. Chairman",
    initials: "NF",
    color: "#2563eb",
    bg: "bg-blue-50",
    badgeCls: "bg-blue-100 text-blue-800 border-blue-200",
    phone: "+91 9811861633",
    email: "vchairman@iwfindia.org",
  },
  {
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

// ─── Schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is required")
    .regex(/^[^0-9]+$/, "First name cannot contain numbers"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .regex(/^[^0-9]+$/, "Last name cannot contain numbers"),
  email: z.string().trim().email("Valid email required"),
  countryCode: z.string().default("+91"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  address: z.string().trim().min(2, "Address is required"),
  zip: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  subject: z.string().trim().min(2, "Subject is required"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  privacy: z.literal(true, { errorMap: () => ({ message: "Please agree to the privacy policy" }) }),
});

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
  const [countryCode, setCountryCode] = useState("+91");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      countryCode: "+91",
    },
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
      {/* Header bar styled with Deep Navy #071527 */}
      <div className="bg-[#071527] px-6 py-4 border-b border-slate-800">
        <h3 className="text-white font-bold text-lg flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-sky-400" />
          <span>Send Us a Message</span>
        </h3>
        <p className="text-slate-300 text-xs mt-1">We typically respond within 24–48 hours.</p>
      </div>

      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-3.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Thank You for Reaching Out!</h4>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Your message has been received. Our dedicated team will review your query and get in touch with you shortly.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold transition shadow-sm"
              >
                Send Another Message <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3.5"
            >
              {/* Row 1: First Name & Last Name */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("firstName", {
                      onChange: (e) => {
                        e.target.value = sanitizeName(e.target.value);
                      },
                    })}
                    onKeyDown={blockNumbersOnKeyDown}
                    placeholder="Anjali"
                    className={inputCls}
                  />
                  <FieldError msg={errors.firstName?.message} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("lastName", {
                      onChange: (e) => {
                        e.target.value = sanitizeName(e.target.value);
                      },
                    })}
                    onKeyDown={blockNumbersOnKeyDown}
                    placeholder="Verma"
                    className={inputCls}
                  />
                  <FieldError msg={errors.lastName?.message} />
                </div>
              </div>

              {/* Row 2: Email Address & Phone Number */}
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
                    Phone Number <span className="text-red-500">*</span>
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
                      placeholder="98765 43210"
                      maxLength={10}
                      onKeyDown={blockNonDigitsOnKeyDown}
                      className="h-10 w-full px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <FieldError msg={errors.phone?.message} />
                </div>
              </div>

              {/* Row 3: Address & PIN Code */}
              <div className="grid sm:grid-cols-[1fr_140px] gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("address")}
                    placeholder="Your city / village"
                    className={inputCls}
                  />
                  <FieldError msg={errors.address?.message} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PIN Code : <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("zip", {
                      onChange: (e) => {
                        e.target.value = sanitizeDigits(e.target.value, 6);
                      },
                    })}
                    onKeyDown={blockNonDigitsOnKeyDown}
                    placeholder="847423"
                    maxLength={6}
                    className={inputCls}
                  />
                  <FieldError msg={errors.zip?.message} />
                </div>
              </div>

              {/* Row 4: Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("subject")}
                  placeholder="How can we help you?"
                  className={inputCls}
                />
                <FieldError msg={errors.subject?.message} />
              </div>

              {/* Row 5: Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell us more about your query, suggestion, or collaboration idea..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-400 resize-none"
                />
                <FieldError msg={errors.message?.message} />
              </div>

              {/* Privacy Policy Checkbox - explicitly opens in new tab as documented */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50/80 rounded-lg border border-slate-200">
                <input
                  id="contact-privacy-check"
                  type="checkbox"
                  {...register("privacy")}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="contact-privacy-check"
                  className="text-xs text-slate-600 leading-snug cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  . IWF will use my information solely to respond to this inquiry.{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.privacy && <FieldError msg={errors.privacy.message} />}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:scale-[1.008] disabled:opacity-60 text-sm mt-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
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
        {/* ─── Hero Section: 100% Native Vector & High-Res Build ───────────────── */}
        <section className="bg-[#071527] text-white pt-6 sm:pt-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4 select-none">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-200">Contact</span>
            </div>

            {/* Main Hero Grid: Left Content + Right Organic Composition */}
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center pb-8 sm:pb-12">
              {/* Left Column: Heading, Copy & 4 Cards */}
              <div className="space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-2.5">
                  <span className="w-8 h-[2px] bg-sky-400 inline-block rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
                    LET'S STAY CONNECTED
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                  Contact <span className="text-[#90cdf4]">Us</span>
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal">
                  We're here to listen, collaborate and create a brighter tomorrow together. Whether you
                  have a question, want to volunteer, explore a partnership, or simply learn more about
                  our work — we'd love to hear from you.
                </p>

                {/* 4 Dark Rounded Quick Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {/* Card 1: Call Us */}
                  <a
                    href="tel:+919811861633"
                    className="bg-[#0b1f36] border border-[#163559] hover:border-sky-400/80 hover:bg-[#0f2947] rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition group shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1b4478] text-sky-300 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4 text-sky-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-200 transition-colors">
                        Call Us
                      </h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5 whitespace-nowrap">
                        +91 98118 61633
                      </p>
                    </div>
                  </a>

                  {/* Card 2: Email Us */}
                  <a
                    href="mailto:info@iwfindia.org"
                    className="bg-[#0b1f36] border border-[#163559] hover:border-sky-400/80 hover:bg-[#0f2947] rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition group shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1b4478] text-sky-300 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4 text-sky-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-200 transition-colors">
                        Email Us
                      </h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5 truncate" title="info@iwfindia.org">
                        info@iwfindia.org
                      </p>
                    </div>
                  </a>

                  {/* Card 3: Visit Us */}
                  <a
                    href="#offices"
                    className="bg-[#0b1f36] border border-[#163559] hover:border-sky-400/80 hover:bg-[#0f2947] rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition group shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1b4478] text-sky-300 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4 text-sky-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-200 transition-colors">
                        Visit Us
                      </h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5 whitespace-nowrap">
                        New Delhi, India
                      </p>
                    </div>
                  </a>

                  {/* Card 4: Connect */}
                  <a
                    href="#send-message"
                    className="bg-[#0b1f36] border border-[#163559] hover:border-sky-400/80 hover:bg-[#0f2947] rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition group shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1b4478] text-sky-300 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4 text-sky-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-200 transition-colors">
                        Connect
                      </h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5 whitespace-nowrap">
                        Let's Make an Impact
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Native Organic Composition */}
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[1.15/1]">
                  {/* Background Soft Blue Organic Backdrop Layer */}
                  <div
                    className="absolute inset-2 bg-[#122e54] -rotate-3 scale-105 opacity-90 transition-transform pointer-events-none"
                    style={{
                      borderRadius: "50% 50% 65% 35% / 45% 45% 55% 55%",
                    }}
                  />

                  {/* Organic Frame with Razor-Sharp High-Res Photograph */}
                  <div
                    className="relative w-full h-full overflow-hidden border-[5px] sm:border-[6px] border-white shadow-2xl z-10"
                    style={{
                      borderRadius: "44% 56% 68% 32% / 42% 44% 56% 58%",
                    }}
                  >
                    <img
                      src={contactHandsImg}
                      alt="Together We Can Do More — Hands Reaching with Care and Compassion"
                      className="w-full h-full object-cover object-[center_30%] select-none scale-105"
                      loading="eager"
                    />
                  </div>

                  {/* Left Botanical Leaves SVG */}
                  <div className="absolute -left-6 sm:-left-8 top-1/4 w-12 sm:w-16 h-24 sm:h-32 pointer-events-none z-20">
                    <svg viewBox="0 0 60 120" fill="none" className="w-full h-full text-[#4a729e]">
                      <path
                        d="M50,110 Q35,80 15,60 Q5,40 10,15 Q30,20 40,40 Q48,60 50,110 Z"
                        fill="currentColor"
                        opacity="0.9"
                      />
                      <path
                        d="M48,80 Q25,70 18,48 Q35,45 42,65 Z"
                        fill="#385e88"
                        opacity="0.95"
                      />
                      <path
                        d="M52,45 Q38,30 35,10 Q50,15 52,45 Z"
                        fill="currentColor"
                        opacity="0.85"
                      />
                    </svg>
                  </div>

                  {/* Handwritten Note: Together We Can Do More ♡ */}
                  <div className="absolute -top-3 right-0 sm:right-2 z-20 select-none text-right">
                    <p className="font-['Caveat',cursive] text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight rotate-[-6deg] drop-shadow-md">
                      Together<br />
                      We Can Do<br />
                      More <span className="inline-block text-sky-200">♡</span>
                    </p>
                    <div className="w-10 sm:w-12 h-[2px] bg-sky-300 ml-auto mt-0.5 rounded-full rotate-[-6deg]" />
                  </div>

                  {/* Bottom Right Botanical Leaves & Tagline */}
                  <div className="absolute -bottom-2 sm:bottom-1 right-0 sm:right-1 z-20 select-none flex flex-col items-end">
                    {/* Small leaf motif */}
                    <div className="w-10 h-10 mb-1 pointer-events-none">
                      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-[#4a729e]">
                        <path
                          d="M35,5 Q20,15 10,28 Q15,35 28,25 Q35,18 35,5 Z"
                          fill="currentColor"
                          opacity="0.85"
                        />
                        <path
                          d="M25,20 Q12,25 5,38 Q18,36 25,20 Z"
                          fill="#385e88"
                          opacity="0.9"
                        />
                      </svg>
                    </div>

                    <div className="w-8 sm:w-10 h-[1.5px] bg-sky-400/60 mb-2" />

                    <div className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.22em] text-slate-300 uppercase space-y-0.5 text-right leading-tight">
                      <p>PEOPLE</p>
                      <p>SUPPORT</p>
                      <p>CHANGE</p>
                      <p>TOGETHER</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Curved Bottom Wave & 3 Core Values Pillar Bar ─────────────────── */}
          <div className="relative w-full overflow-hidden leading-none z-10">
            {/* Multi-layered Organic Wave Transition in Vector SVG */}
            <svg
              viewBox="0 0 1440 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-12 sm:h-16 md:h-20 block"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C380,85 760,25 1440,65 L1440,90 L0,90 Z"
                fill="#122e54"
                opacity="0.35"
              />
              <path
                d="M0,68 C420,95 820,35 1440,75 L1440,90 L0,90 Z"
                fill="#1e4675"
                opacity="0.45"
              />
              <path
                d="M0,50 C400,80 840,15 1440,60 L1440,90 L0,90 Z"
                fill="#ffffff"
              />
            </svg>

            {/* Core Values Strip sitting on the transition */}
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
          </div>
        </section>

        {/* ─── Section 2: Our Offices ────────────────────────────────────────────── */}
        <section id="offices" className="py-8 sm:py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center gap-2 text-slate-800 mb-1.5">
                <Building2 className="w-5 h-5 text-sky-700" />
                <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase">OUR OFFICES</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                We are present across multiple locations to serve communities better.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFICES.map((office) => (
                <div
                  key={office.shortName}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    {/* Badge & Icon Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center ${office.iconBg}`}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${office.badgeCls}`}
                      >
                        {office.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug mb-2">
                      {office.shortName}
                    </h3>

                    {/* In-Charge & Address */}
                    <div className="space-y-1.5 text-xs mb-3.5">
                      <p className="font-semibold text-slate-800">
                        Office In charge: <span className="font-bold text-slate-900">{office.inCharge}</span>
                      </p>
                      <div className="flex items-start gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                        <span className="leading-snug">{office.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Links & Timing */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <a
                        href={`tel:${office.phone.replace(/\s+/g, "")}`}
                        className="text-slate-700 font-semibold hover:text-sky-700 hover:underline"
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
                    <div className="flex items-center gap-1.5 text-slate-500 pt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px]">{office.timing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Key Contact Persons ─────────────────────────────────────── */}
        <section className="py-8 sm:py-10 bg-slate-50 border-y border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6 sm:mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {CONTACT_PERSONS.map((person) => (
                <div
                  key={person.name}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all text-center flex flex-col items-center justify-between"
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
                      className="flex items-center justify-center gap-2 text-slate-700 font-semibold hover:text-sky-700 transition-colors"
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
        <section id="send-message" className="py-8 sm:py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-[1fr_340px] gap-6 sm:gap-8 items-start">
              {/* Form Column */}
              <ContactForm />

              {/* Sidebar Column */}
              <div className="space-y-4">
                {/* 1. Quick Contact */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">
                    QUICK CONTACT
                  </h4>
                  <div className="space-y-2.5">
                    <a
                      href="tel:+919811861633"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">PHONE</p>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
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

                    <Link
                      to="/"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">WEBSITE</p>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                          iwfindia.org
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* 2. Follow Us */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">
                    FOLLOW US
                  </h4>
                  <div className="flex items-center gap-2.5">
                    {[
                      { Icon: Facebook, color: "#1877F2", label: "Facebook", href: "https://facebook.com" },
                      { Icon: Twitter, color: "#1DA1F2", label: "Twitter", href: "https://twitter.com" },
                      { Icon: Instagram, color: "#E1306C", label: "Instagram", href: "https://instagram.com" },
                      { Icon: Youtube, color: "#FF0000", label: "YouTube", href: "https://youtube.com" },
                      { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn", href: "https://linkedin.com" },
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

                {/* 3. Support Our Mission (Deep Navy card #071527) */}
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
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
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
                    className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl transition text-xs border border-slate-200/80"
                  >
                    Get Involved
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Bottom Community CTA Banner ──────────────────────────────── */}
        <section className="py-6 sm:py-8 bg-white border-t border-slate-200/80">
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
                    Your support and partnership help us bring hope, opportunity and positive change to those
                    who need it most.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Link
                  to="/about/partners"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#071527] hover:bg-[#0d223f] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm"
                >
                  <Handshake className="w-4 h-4 text-sky-400" />
                  <span>Partner With Us</span>
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
