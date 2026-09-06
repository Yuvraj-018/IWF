import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Building2, Send, CheckCircle2,
  AlertCircle, Clock, Globe, Users, MessageCircle, ArrowRight,
  Facebook, Twitter, Instagram, Youtube, Linkedin,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const OFFICES = [
  {
    type: "Registered Office",
    badge: "Headquarters",
    badgeColor: "#15803d",
    badgeBg: "#F0FDF4",
    address: "B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025, India",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Sat: 9:00 AM – 5:00 PM",
    icon: Building2,
  },
  {
    type: "Patna Office",
    badge: "State Capital",
    badgeColor: "#1D4ED8",
    badgeBg: "#EFF6FF",
    address: "Patna, Bihar – Contact for exact address",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
    icon: Building2,
  },
  {
    type: "Delhi Office",
    badge: "National Capital",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB",
    address: "New Delhi – Contact for exact address",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
    icon: Building2,
  },
  {
    type: "Meerut Office",
    badge: "UP",
    badgeColor: "#7C3AED",
    badgeBg: "#F5F3FF",
    address: "Meerut, Uttar Pradesh – Contact for exact address",
    phone: "+91 9811861633",
    email: "info@iwfindia.org",
    timing: "Mon–Fri: 10:00 AM – 4:00 PM",
    icon: Building2,
  },
];

const CONTACT_PERSONS = [
  {
    name: "Md. Imteyazullah",
    title: "Chairman",
    initials: "MI",
    color: "#15803d",
    bg: "#F0FDF4",
    phone: "+91 9811861633",
    email: "chairman@iwfindia.org",
    desc: "Visionary leader guiding IWF's mission since inception.",
  },
  {
    name: "Md. Azizullah",
    title: "Treasurer",
    initials: "MA",
    color: "#D97706",
    bg: "#FFFBEB",
    phone: "+91 9811861633",
    email: "treasurer@iwfindia.org",
    desc: "Oversees all financial operations and fund management.",
  },
  {
    name: "Dr. Nasera Firdausi",
    title: "Chief Executive Officer",
    initials: "NF",
    color: "#DB2777",
    bg: "#FDF2F8",
    phone: "+91 9811861633",
    email: "ceo@iwfindia.org",
    desc: "Leads program execution, partnerships, and field operations.",
  },
];

import {
  COUNTRY_CODES,
  blockNumbersOnKeyDown,
  sanitizeName,
  blockNonDigitsOnKeyDown,
  sanitizeDigits,
} from "@/utils/formValidation";

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
  address: z.string().trim().optional(),
  zip: z
    .string()
    .trim()
    .refine((v) => !v || /^\d{6}$/.test(v), { message: "PIN code must be a 6-digit number" })
    .optional(),
  subject: z.string().trim().min(2, "Subject is required"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  privacy: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputCls = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 mt-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="w-3 h-3" /> {msg}
    </p>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      countryCode: "+91",
    },
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-green to-[#0b1f3b] px-6 py-5">
        <h2 className="text-white font-extrabold text-xl flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-brand-orange" /> Send Us a Message
        </h2>
        <p className="text-white/70 text-xs mt-1">We typically respond within 24–48 hours.</p>
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4 border-4 border-brand-green/20">
                <CheckCircle2 className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-extrabold text-brand-green-dark mb-2">Message Sent!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Thank you for reaching out. Our team will get back to you at your registered email within 24–48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-brand-green-dark transition-colors"
              >
                Send another message <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">First Name <span className="text-red-500">*</span></label>
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
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Last Name <span className="text-red-500">*</span></label>
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <input {...register("email")} type="email" placeholder="you@example.com" className={inputCls} />
                  <FieldError msg={errors.email?.message} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/20">
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

              <div className="grid sm:grid-cols-[1fr_auto] gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address</label>
                  <input {...register("address")} placeholder="Your city / village" className={inputCls} />
                </div>
                <div className="w-28">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">PIN Code</label>
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

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject <span className="text-red-500">*</span></label>
                <input {...register("subject")} placeholder="How can we help you?" className={inputCls} />
                <FieldError msg={errors.subject?.message} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message <span className="text-red-500">*</span></label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us more about your query, suggestion, or collaboration idea..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
                />
                <FieldError msg={errors.message?.message} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <input
                  id="contact-privacy"
                  type="checkbox"
                  {...register("privacy")}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green cursor-pointer"
                />
                <label htmlFor="contact-privacy" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  . IWF will use my information solely to respond to this inquiry.
                </label>
              </div>
              {errors.privacy && <FieldError msg={errors.privacy.message} />}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.01] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[#0b1f3b] text-white py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-green rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact IWF</h1>
            <p className="text-white/75 max-w-xl leading-relaxed text-base">
              Reach us at our offices across Bihar, Delhi, and Uttar Pradesh — or write to us and we'll respond within 24–48 hours.
            </p>
            <div className="flex flex-wrap gap-5 mt-8">
              <a href="tel:+919811861633" className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold">
                <Phone className="w-4 h-4 text-brand-orange" /> +91 9811861633
              </a>
              <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold">
                <Mail className="w-4 h-4 text-brand-orange" /> info@iwfindia.org
              </a>
              <span className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                <Globe className="w-4 h-4 text-brand-orange" /> iwfindia.org
              </span>
            </div>
          </div>
        </section>

        {/* Office Cards */}
        <section className="py-14 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Our Offices</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">Where to Find Us</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {OFFICES.map((office) => (
                <div key={office.type} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: office.badgeBg }}>
                      <office.icon className="w-5 h-5" style={{ color: office.badgeColor }} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: office.badgeColor, backgroundColor: office.badgeBg }}>
                      {office.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-sm mb-3">{office.type}</h3>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: office.badgeColor }} />
                      <p className="text-xs text-slate-600 leading-snug">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: office.badgeColor }} />
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-xs font-semibold text-slate-700 hover:underline">{office.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: office.badgeColor }} />
                      <a href={`mailto:${office.email}`} className="text-xs font-semibold text-slate-700 hover:underline">{office.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: office.badgeColor }} />
                      <p className="text-xs text-slate-500">{office.timing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Contact Persons */}
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Leadership</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">Key Contact Persons</h2>
              <p className="text-slate-500 text-sm mt-2">For specific inquiries, reach out directly to our leadership team.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {CONTACT_PERSONS.map((person) => (
                <div key={person.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition-all">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-extrabold" style={{ backgroundColor: person.bg, color: person.color }}>
                    {person.initials}
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base">{person.name}</h3>
                  <p className="text-xs font-bold mb-3" style={{ color: person.color }}>{person.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{person.desc}</p>
                  <div className="space-y-2">
                    <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 hover:text-brand-green transition-colors">
                      <Phone className="w-3.5 h-3.5" style={{ color: person.color }} /> {person.phone}
                    </a>
                    <a href={`mailto:${person.email}`} className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 hover:text-brand-green transition-colors">
                      <Mail className="w-3.5 h-3.5" style={{ color: person.color }} /> {person.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form + Social */}
        <section className="py-14 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            <ContactForm />

            <div className="space-y-5">
              {/* Quick contact */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-brand-green-dark text-sm mb-4 uppercase tracking-wide">Quick Contact</h3>
                <div className="space-y-3">
                  {[
                    { icon: Phone, label: "Phone", value: "+91 9811861633", href: "tel:+919811861633" },
                    { icon: Mail, label: "Email", value: "info@iwfindia.org", href: "mailto:info@iwfindia.org" },
                    { icon: Globe, label: "Website", value: "iwfindia.org", href: "#" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition group">
                      <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-brand-green" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-bold text-slate-700 group-hover:text-brand-green transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-brand-green-dark text-sm mb-4 uppercase tracking-wide">Follow Us</h3>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { Icon: Facebook, color: "#1877F2", label: "Facebook" },
                    { Icon: Twitter, color: "#1DA1F2", label: "Twitter" },
                    { Icon: Instagram, color: "#E1306C", label: "Instagram" },
                    { Icon: Youtube, color: "#FF0000", label: "YouTube" },
                    { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn" },
                  ].map(({ Icon, color, label }) => (
                    <a key={label} href="#" aria-label={label} className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-transform" style={{ backgroundColor: `${color}15` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA to donate */}
              <div className="bg-gradient-to-br from-brand-green to-[#0b1f3b] rounded-xl p-5 text-white">
                <h3 className="font-extrabold text-base mb-1">Support Our Mission</h3>
                <p className="text-white/70 text-xs leading-relaxed mb-4">Every contribution goes directly to our programs in education, healthcare, and livelihood.</p>
                <a href="/donate" className="block w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 rounded-lg transition text-sm">
                  Donate Now
                </a>
              </div>

              {/* Volunteer CTA */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Join as Volunteer</p>
                    <p className="text-xs text-slate-500">Give your time and skills</p>
                  </div>
                </div>
                <a href="/volunteer" className="block w-full text-center bg-brand-green/10 hover:bg-brand-green/20 text-brand-green font-bold py-2.5 rounded-lg transition text-sm border border-brand-green/20">
                  Apply to Volunteer
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
