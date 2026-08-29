import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearch } from "@tanstack/react-router";
import { URGENT_PATIENTS } from "@/content/patients";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  CreditCard,
  Building2,
  Banknote,
  CheckCircle2,
  Download,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Award,
  Star,
  Sparkles,
  Phone,
  MapPin,
  AlertCircle,
  QrCode,
  Copy,
  Check,
  IndianRupee,
  FileText,
  BadgeCheck,
  User,
  Briefcase,
  Landmark,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";

// ─── Constants ────────────────────────────────────────────────────────────────

const FINANCIAL_TYPES = [
  "General Donation",
  "Health Care",
  "Education Support",
  "Orphan Sponsorship",
  "Course Fees & Kits",
  "Self-Employment",
  "School Project",
  "Model Village",
  "Micro Finance",
  "Community Learning Centre",
  "Skill Development",
  "Low-Cost Housing",
  "Event Fees",
  "Women's Empowerment",
  "Relief & Rehabilitation",
  "Sponsorship for Students",
];

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const BANK_DETAILS = {
  indian: {
    accountNo: "1004451030069725",
    accountName: "ISLAH WELFARE FOUNDATION",
    bank: "Uttar Bihar Gramin Bank",
    branch: "Baghant, Manigachhi, Darbhanga",
    ifsc: "CBIN0R10001",
    micr: "600229004",
    accountType: "Saving Account",
  },
  fcra: {
    accountNo: "1004451030069725",
    accountName: "ISLAH WELFARE FOUNDATION",
    bank: "State Bank of India",
    branch: "FCRA Cell, 4th Floor, SBI New Delhi Main Branch, 11, Sansad Marg, New Delhi-110001",
    ifsc: "SBIN0000691",
    swift: "SBININBB104",
    accountType: "FCRA Saving Account",
  },
};

// ─── Donor Tier Logic ─────────────────────────────────────────────────────────

function getDonorTier(amount: number) {
  if (amount >= 50000) return { label: "Platinum", color: "#8B5CF6", bg: "#EDE9FE", icon: Sparkles };
  if (amount >= 20000) return { label: "Gold", color: "#D97706", bg: "#FEF3C7", icon: Award };
  if (amount >= 5000) return { label: "Silver", color: "#2563EB", bg: "#EFF6FF", icon: Star };
  return { label: "General", color: "#15803D", bg: "#F0FDF4", icon: Heart };
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const donorSchema = z.object({
  donorType: z.enum(["individual", "corporate", "institution"], { required_error: "Please select donor type" }),
  citizenship: z.enum(["indian", "foreign"], { required_error: "Please select citizenship" }),
  fullName: z.string().trim().min(2, "Full name / Organisation name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(10, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Address is required"),
  taxExemption: z.boolean().optional(),
  pan: z.string().trim().optional(),
  financialType: z.string().min(1, "Please select a donation category"),
  amount: z.number({ invalid_type_error: "Enter a valid amount" }).min(1, "Amount must be at least Rs.1"),
  paymentMode: z.enum(["online", "bank", "offline"]),
  consent: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.citizenship === "indian" && data.taxExemption) {
    if (!data.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(data.pan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A valid PAN Number (e.g. ABCDE1234F) is required for 80G tax exemption",
        path: ["pan"],
      });
    }
  }
});

type DonorFormData = z.infer<typeof donorSchema>;

type ReceiptData = DonorFormData & {
  receiptNo: string;
  date: string;
};

// --- Receipt & Donor Card - open as printable HTML in new window ---

function generateReceiptPDF(data: ReceiptData) {
  const tier = getDonorTier(data.amount);
  const tierBg = tier.label === "Platinum" ? "#ede9fe" : tier.label === "Gold" ? "#fef3c7" : tier.label === "Silver" ? "#eff6ff" : "#f0fdf4";
  const tierTxt = tier.label === "Platinum" ? "#5b21b6" : tier.label === "Gold" ? "#92400e" : tier.label === "Silver" ? "#1e40af" : "#166534";
  const payLabel = data.paymentMode === "online" ? "Online (UPI / Card / Net Banking)" : data.paymentMode === "bank" ? "Bank Transfer (NEFT / RTGS / IMPS)" : "Offline / Cheque / DD";


  const html = "<!DOCTYPE html><html lang=en><head><meta charset=UTF-8>" +
    "<meta http-equiv='Content-Type' content='text/html;charset=utf-8'>" +
    "<title>IWF-Donation-Receipt-" + data.receiptNo + "</title>" +
    "<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}" +
    "body{font-family:Arial,sans-serif;background:#e5e7eb}" +
    ".actions{position:fixed;top:14px;right:14px;z-index:100;display:flex;gap:8px}" +
    ".btn{border:none;border-radius:7px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer}" +
    ".btn-save{background:#15582f;color:white}.btn-close{background:#6b7280;color:white}" +
    ".page{width:210mm;min-height:297mm;margin:16px auto;background:white;box-shadow:0 4px 24px rgba(0,0,0,.15)}" +
    ".hdr{background:#15582f;padding:16px 28px;color:white;display:flex;align-items:center;gap:14px}" +
    ".logo{background:rgba(255,255,255,.15);border-radius:8px;width:48px;height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:white;flex-shrink:0}" +
    ".hdr-name{font-size:17px;font-weight:800;letter-spacing:.5px}" +
    ".hdr-sub{font-size:8.5px;opacity:.8;margin-top:2px}" +
    ".title-bar{background:#ea580c;text-align:center;padding:9px}" +
    ".title-bar span{color:white;font-size:12px;font-weight:800;letter-spacing:3px}" +
    ".meta{display:flex;justify-content:space-between;padding:11px 28px;border-bottom:1px solid #e5e7eb;font-size:9.5px;color:#555}" +
    ".meta strong{color:#222}" +
    ".sec{margin:12px 22px;padding:13px 15px;border-radius:8px}" +
    ".sec-g{background:#f0fdf4}.sec-s{background:#f8fafc}" +
    ".sec-title{font-size:9.5px;font-weight:800;color:#15582f;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:9px;padding-bottom:5px;border-bottom:1px solid #dcfce7}" +
    ".row{display:flex;margin-bottom:5px;font-size:9.5px}" +
    ".lbl{font-weight:700;color:#555;width:125px;flex-shrink:0}.val{color:#1a1a1a;flex:1}" +
    ".two{display:flex;gap:14px}" +
    ".amt-box{background:#15582f;color:white;border-radius:8px;padding:13px;text-align:center;display:flex;flex-direction:column;justify-content:center;min-width:160px}" +
    ".amt-lbl{font-size:8px;font-weight:700;opacity:.8;text-transform:uppercase;letter-spacing:1px}" +
    ".amt-val{font-size:26px;font-weight:900;margin-top:3px}" +
    ".tax{margin:10px 22px;padding:11px 15px;background:#fff7ed;border-left:4px solid #ea580c;border-radius:6px}" +
    ".tax-t{font-size:9px;font-weight:800;color:#ea580c;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}" +
    ".tax-b{font-size:9px;color:#555;line-height:1.6}" +
    ".tier{margin:8px 22px;padding:9px 14px;border-radius:8px;text-align:center;font-size:11px;font-weight:800;background:" + tierBg + ";color:" + tierTxt + "}" +
    ".decl{margin:8px 22px;text-align:center;font-size:8.5px;color:#888;line-height:1.5}" +
    ".sigs{display:flex;justify-content:space-between;margin:18px 38px 8px}" +
    ".sig{text-align:center}.sig-line{border-top:1px solid #555;width:110px;margin:0 auto 4px}" +
    ".sig-name{font-size:8.5px;color:#666}.sig-org{font-size:8.5px;font-weight:700;color:#15582f;margin-top:1px}" +
    ".ftr{background:#15582f;color:white;text-align:center;font-size:8px;padding:7px 16px;margin-top:18px}" +
    "@media print{body{background:white}.actions{display:none!important}.page{margin:0;box-shadow:none;width:100%}}" +
    "@page{size:A4;margin:0}</style></head><body>" +
    "<div class=actions>" +
    "<button class='btn btn-save' onclick='window.print()'>Save as PDF (Print)</button>" +
    "<button class='btn btn-close' onclick='window.close()'>X Close</button></div>" +
    "<div class=page>" +
    "<div class=hdr><div class=logo>IWF</div>" +
    "<div><div class=hdr-name>ISLAH</div>" +
    "<div class=hdr-sub>Knowledge, Opportunity, A Better Future. - B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025, India</div>" +
    "<div class=hdr-sub>info@iwfindia.org - +91-9811861633 - iwfindia.org</div></div></div>" +
    "<div class=title-bar><span>OFFICIAL DONATION RECEIPT</span></div>" +
    "<div class=meta><span><strong>Receipt No.:</strong> " + data.receiptNo + "</span><span><strong>Date:</strong> " + data.date + "</span></div>" +
    "<div class='sec sec-g'><div class=sec-title>Donor Information</div>" +
    "<div class=row><span class=lbl>Full Name:</span><span class=val>" + data.fullName + "</span></div>" +
    "<div class=row><span class=lbl>Donor Type:</span><span class=val style='font-weight:700'>" + (data.donorType === "individual" ? "Individual" : data.donorType === "corporate" ? "Corporate" : "Institution") + "</span></div>" +
    "<div class=row><span class=lbl>Email Address:</span><span class=val>" + data.email + "</span></div>" +
    "<div class=row><span class=lbl>Phone Number:</span><span class=val>" + data.phone + "</span></div>" +
    "<div class=row><span class=lbl>Address:</span><span class=val>" + data.address + "</span></div>" +
    (data.pan ? "<div class=row><span class=lbl>PAN Number:</span><span class=val>" + data.pan + "</span></div>" : "") +
    "</div>" +
    "<div class='sec sec-s'><div class=sec-title>Donation Details</div><div class=two><div style='flex:1'>" +
    "<div class=row><span class=lbl>Donation Category:</span><span class=val>" + data.financialType + "</span></div>" +
    "<div class=row><span class=lbl>Payment Mode:</span><span class=val>" + payLabel + "</span></div>" +
    "<div class=row><span class=lbl>Citizenship:</span><span class=val>" + (data.citizenship === "indian" ? "Indian National" : "Foreign National") + "</span></div>" +
    "<div class=row><span class=lbl>Donor Tier:</span><span class=val style='font-weight:700;color:" + tierTxt + "'>" + tier.label + "</span></div>" +
    "</div><div class=amt-box><div class=amt-lbl>Amount Donated</div>" +
    "<div class=amt-val>Rs." + data.amount.toLocaleString("en-IN") + "</div></div></div></div>" +
    "<div class=tax><div class=tax-t>80G Tax Exemption Notice</div>" +
    "<div class=tax-b>This donation is eligible for 50% tax exemption under Section 80G of the Income Tax Act, 1961. Form 10BE will be issued. Please retain this receipt for your records.</div></div>" +
    "<div class=tier>You are a <strong>" + tier.label + " Donor</strong> - Thank you for your generous contribution to our mission!</div>" +
    "<div class=decl>We hereby acknowledge receiving the above-mentioned donation for charitable purposes.<br>All donations are utilized transparently and effectively.</div>" +
    "<div class=sigs><div class=sig><div class=sig-line></div><div class=sig-name>Authorized Signatory</div><div class=sig-org>Islah Welfare Foundation</div></div>" +
    "<div class=sig><div class=sig-line></div><div class=sig-name>Donor Signature</div></div></div>" +
    "<div class=ftr>Islah Welfare Foundation (Reg.) | B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025, India | info@iwfindia.org | +91-9811861633</div>" +
    "</div></body></html>";

  const w = window.open("", "_blank");
  if (w) { w.document.open("text/html;charset=utf-8", "replace"); w.document.write(html); w.document.close(); }
}

// --- Donor Card Generator ---

function generateDonorCardPDF(data: ReceiptData) {
  const tier = getDonorTier(data.amount);
  const cardBg =
    tier.label === "Platinum"
      ? "linear-gradient(135deg,#5b21b6,#7c3aed)"
      : tier.label === "Gold"
      ? "linear-gradient(135deg,#b45309,#d97706)"
      : tier.label === "Silver"
      ? "linear-gradient(135deg,#1e40af,#3b82f6)"
      : "linear-gradient(135deg,#15803d,#16a34a)";

  const html = "<!DOCTYPE html><html lang=en><head><meta charset=UTF-8>" +
    "<meta http-equiv='Content-Type' content='text/html;charset=utf-8'>" +
    "<title>IWF-Donor-Card-" + data.receiptNo + "</title>" +
    "<style>*{box-sizing:border-box;margin:0;padding:0}" +
    "body{background:#111827;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:Arial,sans-serif}" +
    ".actions{position:fixed;top:14px;right:14px;z-index:100;display:flex;gap:8px}" +
    ".btn{border:none;border-radius:7px;padding:9px 18px;font-size:12px;font-weight:700;cursor:pointer}" +
    ".btn-save{background:#15582f;color:white}.btn-close{background:#6b7280;color:white}" +
    ".card{width:340px;height:212px;border-radius:16px;background:" + cardBg + ";padding:20px;color:white;position:relative;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.5)}" +
    ".c1{position:absolute;top:-30px;right:-20px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.08)}" +
    ".c2{position:absolute;bottom:-25px;right:-10px;width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,.06)}" +
    ".top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}" +
    ".org{font-size:7.5px;font-weight:700;letter-spacing:1.5px;opacity:.85}" +
    ".amt-val{font-size:22px;font-weight:900}.amt-lbl{font-size:7px;opacity:.7;text-align:right}" +
    ".badge{display:inline-block;background:rgba(255,255,255,.2);border-radius:20px;padding:3px 10px;font-size:7.5px;font-weight:700;letter-spacing:1px;margin-bottom:14px}" +
    ".name{font-size:18px;font-weight:900;letter-spacing:.5px;text-transform:uppercase;margin-bottom:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".details{display:flex;gap:18px}" +
    ".det-lbl{font-size:7px;opacity:.65;text-transform:uppercase;letter-spacing:1px}" +
    ".det-val{font-size:9px;font-weight:700;margin-top:1px}" +
    ".foot{margin-top:8px;font-size:7px;opacity:.55}" +
    "@media print{body{background:white;display:block;padding:10mm}.card{box-shadow:none}.actions{display:none!important}}" +
    "@page{size:90mm 60mm landscape;margin:5mm}</style></head><body>" +
    "<div class=actions>" +
    "<button class='btn btn-save' onclick='window.print()'>Save as PDF (Print)</button>" +
    "<button class='btn btn-close' onclick='window.close()'>X Close</button></div>" +
    "<div class=card><div class=c1></div><div class=c2></div>" +
    "<div class=top><div class=org>ISLAH WELFARE FOUNDATION</div>" +
    "<div><div class=amt-val>Rs. " + data.amount.toLocaleString("en-IN") + "</div><div class=amt-lbl>Amount Donated</div></div></div>" +
    "<div class=badge>* " + tier.label.toUpperCase() + " DONOR</div>" +
    "<div class=name>" + data.fullName + "</div>" +
    "<div class=details>" +
    "<div><div class=det-lbl>Category</div><div class=det-val>" + data.financialType + "</div></div>" +
    "<div><div class=det-lbl>Receipt No.</div><div class=det-val>" + data.receiptNo + "</div></div>" +
    "<div><div class=det-lbl>Date</div><div class=det-val>" + data.date + "</div></div>" +
    "</div>" +
    "<div class=foot>iwfindia.org - info@iwfindia.org - +91-9811861633</div>" +
    "</div></body></html>";

  const w = window.open("", "_blank");
  if (w) { w.document.open("text/html;charset=utf-8", "replace"); w.document.write(html); w.document.close(); }
}

function generateReceiptNo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const r = Math.floor(1000 + Math.random() * 9000);
  return `IWF-DON-${y}${m}-${r}`;
}

function formatDate() {
  return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  const labels = ["Donor Info", "Donation Details", "Payment", "Confirm"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {labels.slice(0, total).map((label, i) => {
        const s = i + 1;
        const isActive = s === step;
        const isDone = s < step;
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isDone
                    ? "bg-brand-green text-white shadow-lg shadow-brand-green/30"
                    : isActive
                      ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-110"
                      : "bg-slate-100 text-slate-400"
                  }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : s}
              </div>
              <span
                className={`text-[10px] mt-1 font-semibold tracking-wide whitespace-nowrap ${isActive ? "text-brand-orange" : isDone ? "text-brand-green" : "text-slate-400"
                  }`}
              >
                {label}
              </span>
            </div>
            {i < total - 1 && (
              <div
                className={`w-12 sm:w-16 h-0.5 mb-5 mx-1 transition-all duration-500 ${isDone ? "bg-brand-green" : "bg-slate-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 mt-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="w-3 h-3" /> {msg}
    </p>
  );
}

function InputField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

const inputCls =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400";

// ─── Step 1: Donor Info ───────────────────────────────────────────────────────

function Step1DonorInfo({
  form,
  onNext,
}: {
  form: ReturnType<typeof useForm<DonorFormData>>;
  onNext: () => void;
}) {
  const { register, formState: { errors }, watch, setValue, trigger } = form;
  const citizenship = watch("citizenship");
  const donorType = watch("donorType");

  const handleNext = async () => {
    const valid = await trigger(["donorType", "citizenship", "fullName", "email", "phone", "address", "pan", "taxExemption"]);
    if (valid) onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-6 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-green/10 flex items-center justify-center">
          <Heart className="w-3.5 h-3.5 text-brand-green" />
        </div>
        Your Information
      </h3>

      <div className="space-y-4">
        {/* Donor Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Donor Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([
              { val: "individual" as const, label: "Individual", icon: User },
              { val: "corporate" as const, label: "Corporate", icon: Briefcase },
              { val: "institution" as const, label: "Institution", icon: Landmark },
            ]).map(({ val, label, icon: Icon }) => (
              <button
                key={val}
                type="button"
                onClick={() => setValue("donorType", val, { shouldValidate: true })}
                className={`h-14 rounded-xl border-2 font-semibold text-sm transition-all flex flex-col items-center justify-center gap-1 ${
                  donorType === val
                    ? "border-brand-green bg-brand-green/5 text-brand-green shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
          <FieldError msg={errors.donorType?.message} />
        </div>

        {/* Citizenship */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Citizenship <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["indian", "foreign"] as const).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setValue("citizenship", val, { shouldValidate: true })}
                className={`h-12 rounded-lg border-2 font-semibold text-sm transition-all ${citizenship === val
                    ? "border-brand-green bg-brand-green/5 text-brand-green shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
              >
                {val === "indian" ? "Indian National" : "Foreign National"}
              </button>
            ))}
          </div>
          <FieldError msg={errors.citizenship?.message} />
        </div>

        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label={donorType === "individual" ? "Full Name" : donorType === "corporate" ? "Company Name" : "Institution Name"} required error={errors.fullName?.message}>
            <input {...register("fullName")} placeholder={donorType === "corporate" ? "ABC Pvt. Ltd." : donorType === "institution" ? "XYZ Trust / Foundation" : "Your full legal name"} className={inputCls} />
          </InputField>
          <InputField label="Email Address" required error={errors.email?.message}>
            <input {...register("email")} type="email" placeholder="you@example.com" className={inputCls} />
          </InputField>
        </div>

        {/* Phone */}
        <InputField label="Phone Number" required error={errors.phone?.message}>
          <input {...register("phone")} type="tel" placeholder="+91 98765 43210" className={inputCls} />
        </InputField>

        {/* Address */}
        <InputField label="Address" required error={errors.address?.message}>
          <textarea
            {...register("address")}
            placeholder="Full postal address"
            rows={2}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none"
          />
        </InputField>

        {/* PAN */}
        {citizenship === "indian" && (
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 mb-2">
            <input
              id="taxExemption"
              type="checkbox"
              {...register("taxExemption")}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green"
            />
            <label htmlFor="taxExemption" className="text-xs text-slate-600 cursor-pointer leading-relaxed">
              <strong>I want to claim 80G Tax Exemption</strong> (Requires a valid PAN card number)
            </label>
          </div>
        )}

        <InputField label={`PAN Number ${citizenship === "indian" && watch("taxExemption") ? "(Required for 80G certificate) *" : "(Optional)"}`} error={errors.pan?.message}>
          <input {...register("pan")} placeholder="ABCDE1234F" className={inputCls} style={{ textTransform: "uppercase" }} />
        </InputField>

        {citizenship === "indian" && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>PAN required for 80G tax exemption certificate.</strong> All Indian donations to IWF are eligible for 50% tax exemption under Section 80G of the Income Tax Act, 1961.
            </p>
          </div>
        )}

        {citizenship === "foreign" && (
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Foreign contributions are accepted via FCRA-designated account only.</strong> As per FCRA 2010, a passport copy (front & back) is required. Bank details will be shown in the next step.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-lg shadow-md shadow-brand-green/25 hover:bg-brand-green-dark transition-all hover:scale-[1.02] active:scale-95"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Step 2: Donation Details ─────────────────────────────────────────────────

function Step2DonationDetails({
  form,
  onNext,
  onBack,
}: {
  form: ReturnType<typeof useForm<DonorFormData>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const { register, formState: { errors }, watch, setValue, trigger } = form;
  const amount = watch("amount");
  const [customAmount, setCustomAmount] = useState(false);

  const handlePreset = (val: number) => {
    setValue("amount", val, { shouldValidate: true });
    setCustomAmount(false);
  };

  const handleNext = async () => {
    const valid = await trigger(["financialType", "amount"]);
    if (valid) onNext();
  };

  const tier = amount && amount > 0 ? getDonorTier(amount) : null;

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-6 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-orange/10 flex items-center justify-center">
          <IndianRupee className="w-3.5 h-3.5 text-brand-orange" />
        </div>
        Donation Details
      </h3>

      <div className="space-y-5">
        {/* Financial Type */}
        <InputField label="Donation Category" required error={errors.financialType?.message}>
          <select {...register("financialType")} defaultValue="" className={inputCls}>
            <option value="" disabled>Select a category</option>
            {FINANCIAL_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </InputField>

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Amount (INR) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handlePreset(val)}
                className={`py-2.5 rounded-lg text-sm font-bold border-2 transition-all ${amount === val && !customAmount
                    ? "border-brand-orange bg-brand-orange text-white shadow-md shadow-brand-orange/30"
                    : "border-slate-200 text-slate-600 hover:border-brand-orange/40 hover:bg-orange-50"
                  }`}
              >
                Rs. {val >= 1000 ? `${val / 1000}K` : val}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setCustomAmount(true); setValue("amount", 0 as unknown as number); }}
              className={`py-2.5 col-span-3 sm:col-span-5 rounded-lg text-sm font-bold border-2 transition-all ${customAmount
                  ? "border-brand-green bg-brand-green/5 text-brand-green"
                  : "border-dashed border-slate-300 text-slate-500 hover:border-brand-green/40"
                }`}
            >
              Custom Amount
            </button>
          </div>

          {customAmount && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
              <input
                type="number"
                min={1}
                placeholder="Enter amount"
                onChange={(e) => setValue("amount", Number(e.target.value), { shouldValidate: true })}
                className={`${inputCls} pl-8`}
              />
            </div>
          )}
          <FieldError msg={errors.amount?.message} />
        </div>

        {/* Donor Tier Preview */}
        <AnimatePresence>
          {tier && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="flex items-center gap-3 rounded-xl border-2 p-4"
                style={{ borderColor: tier.color, backgroundColor: tier.bg }}
              >
                <tier.icon className="w-7 h-7 shrink-0" style={{ color: tier.color }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: tier.color }}>
                    You qualify as a {tier.label} Donor 🎉
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    A {tier.label} Donor Card will be generated with your receipt.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Consent */}
        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <input
            id="consent"
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green"
          />
          <label htmlFor="consent" className="text-xs text-slate-600 cursor-pointer leading-relaxed">
            I consent to my name being displayed on IWF's website donor recognition section (optional). Your name will only be shown if you check this box.
          </label>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-lg shadow-md shadow-brand-green/25 hover:bg-brand-green-dark transition-all hover:scale-[1.02] active:scale-95"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────

function Step3Payment({
  form,
  onNext,
  onBack,
}: {
  form: ReturnType<typeof useForm<DonorFormData>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const { watch, setValue, formState: { errors } } = form;
  const paymentMode = watch("paymentMode");
  const citizenship = watch("citizenship");
  const [copied, setCopied] = useState<string | null>(null);
  const bank = citizenship === "foreign" ? BANK_DETAILS.fcra : BANK_DETAILS.indian;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-6 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-blue/10 flex items-center justify-center">
          <Shield className="w-3.5 h-3.5 text-brand-blue" />
        </div>
        Payment Method
      </h3>

      {/* Mode Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {([
          { val: "online" as const, icon: CreditCard, label: "Online Payment", sub: "UPI / Card / Net Banking" },
          { val: "bank" as const, icon: Building2, label: "Bank Transfer", sub: "NEFT / RTGS / IMPS" },
          { val: "offline" as const, icon: Banknote, label: "Offline / Cheque", sub: "Cheque / Demand Draft" },
        ] as const).map(({ val, icon: Icon, label, sub }) => (
          <button
            key={val}
            type="button"
            onClick={() => setValue("paymentMode", val)}
            className={`flex flex-col items-center gap-1.5 py-4 px-2 rounded-xl border-2 transition-all text-center ${paymentMode === val
                ? "border-brand-green bg-brand-green/5 shadow-sm"
                : "border-slate-200 hover:border-slate-300"
              }`}
          >
            <Icon className={`w-5 h-5 ${paymentMode === val ? "text-brand-green" : "text-slate-400"}`} />
            <span className={`text-xs font-bold leading-tight ${paymentMode === val ? "text-brand-green" : "text-slate-600"}`}>{label}</span>
            <span className="text-[10px] text-slate-400 leading-tight">{sub}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {paymentMode === "online" && (
          <motion.div key="online" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-4">
              {/* UPI QR */}
              <div className="bg-gradient-to-br from-brand-green/5 to-brand-green/10 border border-brand-green/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <QrCode className="w-5 h-5 text-brand-green" />
                  <h4 className="font-bold text-brand-green-dark text-sm">Scan UPI QR Code</h4>
                </div>
                {/* QR Placeholder */}
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-32 h-32 bg-white border-2 border-brand-green/20 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <div className="text-center">
                      <QrCode className="w-12 h-12 text-brand-green/40 mx-auto" />
                      <p className="text-[9px] text-slate-400 mt-1">QR Code</p>
                      <p className="text-[9px] text-slate-400">iwfindia@upi</p>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-sm flex-1">
                    <p className="text-slate-600 text-xs leading-relaxed">Scan with any UPI app — Google Pay, PhonePe, Paytm, BHIM, etc.</p>
                    <div className="bg-white rounded-lg border border-slate-200 px-3 py-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-700">iwfindia@ubgb</span>
                      <button type="button" onClick={() => copyToClipboard("iwfindia@ubgb", "upi")} className="text-brand-green hover:text-brand-green-dark">
                        {copied === "upi" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500">After payment, please email info@iwfindia.org with your transaction ID and name.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-slate-700">Other Online Options:</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Debit Card", "Credit Card", "Net Banking"].map((m) => (
                    <div key={m} className="bg-white border border-slate-200 rounded-lg py-2.5 text-center text-xs font-semibold text-slate-600">{m}</div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Online card / net banking payments are processed via authorized payment gateway. Integration coming soon — use UPI or Bank Transfer for now.</p>
              </div>
            </div>
          </motion.div>
        )}

        {paymentMode === "bank" && (
          <motion.div key="bank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-brand-green" />
                <h4 className="font-bold text-brand-green-dark text-sm">
                  {citizenship === "foreign" ? "FCRA Account (Foreign Donations)" : "Bank Transfer Details"}
                </h4>
              </div>
              {[
                ["Account Number", bank.accountNo],
                ["Account Name", bank.accountName],
                ["Bank Name", bank.bank],
                ["Branch", bank.branch],
                ["IFSC Code", bank.ifsc],
                ...(citizenship === "indian" ? [["MICR Code", BANK_DETAILS.indian.micr] as [string, string]] : []),
                ...("swift" in bank ? [["SWIFT Code", bank.swift] as [string, string]] : []),
                ["Account Type", bank.accountType],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-3 bg-white rounded-lg px-3 py-2.5 border border-slate-100">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5 font-mono">{value}</p>
                  </div>
                  <button type="button" onClick={() => copyToClipboard(value, label)} className="text-brand-green hover:text-brand-green-dark shrink-0 mt-1">
                    {copied === label ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                <p className="text-xs text-amber-700">
                  <strong>Important:</strong> After making the transfer, please email{" "}
                  <a href="mailto:info@iwfindia.org" className="underline">info@iwfindia.org</a>{" "}
                  with your name, transaction ID, and amount. We will issue your receipt within 10 working days.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {paymentMode === "offline" && (
          <motion.div key="offline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-slate-500" /> Cheque / Demand Draft
                </h4>
                <p className="text-sm text-slate-600 mb-2">Make the cheque / DD payable to:</p>
                <div className="bg-white border-2 border-dashed border-brand-green/30 rounded-lg p-3 text-center">
                  <p className="font-bold text-brand-green-dark text-base">"ISLAH WELFARE FOUNDATION"</p>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Send to:</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700">B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025, India</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-green" />
                    <p className="text-xs text-slate-700">+91 6272 288697</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-700 leading-relaxed">
                  After sending the cheque/DD, please contact us at{" "}
                  <a href="mailto:info@iwfindia.org" className="underline font-semibold">info@iwfindia.org</a>{" "}
                  with your details. Your receipt will be issued within 10 working days.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-lg shadow-md shadow-brand-green/25 hover:bg-brand-green-dark transition-all hover:scale-[1.02] active:scale-95"
        >
          Review Donation <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Step 4: Confirm ──────────────────────────────────────────────────────────

function Step4Confirm({
  form,
  onBack,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<DonorFormData>>;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const data = form.getValues();
  const tier = data.amount ? getDonorTier(data.amount) : null;

  const rows = [
    ["Full Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["PAN", data.pan || "Not provided"],
    ["Citizenship", data.citizenship === "indian" ? "Indian National" : "Foreign National"],
    ["Donation Category", data.financialType],
    ["Payment Mode", data.paymentMode === "online" ? "Online" : data.paymentMode === "bank" ? "Bank Transfer" : "Offline / Cheque"],
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-6 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-green/10 flex items-center justify-center">
          <BadgeCheck className="w-3.5 h-3.5 text-brand-green" />
        </div>
        Review & Confirm
      </h3>

      {/* Amount highlight */}
      <div className="bg-gradient-to-r from-brand-green to-brand-green-dark text-white rounded-xl p-5 mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">Donation Amount</p>
          <p className="text-3xl font-extrabold">₹{data.amount?.toLocaleString("en-IN")}</p>
          <p className="text-xs opacity-75 mt-1">{data.financialType}</p>
        </div>
        {tier && (
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 bg-white/10">
              <tier.icon className="w-4 h-4" />
              <span className="text-sm font-bold">{tier.label} Donor</span>
            </div>
          </div>
        )}
      </div>

      {/* Details table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden mb-5 shadow-sm">
        {rows.map(([label, value], i) => (
          <div key={label} className={`flex items-start justify-between gap-3 px-4 py-3 ${i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}`}>
            <span className="text-xs font-semibold text-slate-500 shrink-0 w-36">{label}</span>
            <span className="text-xs text-slate-800 font-medium text-right break-all">{value}</span>
          </div>
        ))}
      </div>

      {/* Documents that will be generated */}
      <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-4 mb-6">
        <p className="text-xs font-bold text-brand-green-dark mb-3 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" /> Documents you'll receive:
        </p>
        <div className="space-y-1.5">
          {[
            "✅ Donation Receipt (PDF)",
            data.citizenship === "indian" && data.pan ? "80G Tax Exemption Certificate" : "80G Certificate (PAN required)",
            "✅ Appreciation Letter",
            tier ? `✅ ${tier.label} Donor Card (PDF)` : "",
          ].filter(Boolean).map((doc) => (
            <p key={doc} className="text-xs text-slate-700">{doc}</p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3 rounded-lg shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95"
        >
          <Heart className="w-4 h-4" /> Confirm Donation
        </button>
      </div>
    </motion.div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  data,
  receiptNo,
  date,
}: {
  data: DonorFormData;
  receiptNo: string;
  date: string;
}) {
  const tier = getDonorTier(data.amount);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownloadReceipt = async () => {
    setDownloading("receipt");
    await generateReceiptPDF({ ...data, receiptNo, date });
    setDownloading(null);
  };

  const handleDownloadCard = async () => {
    setDownloading("card");
    await generateDonorCardPDF({ ...data, receiptNo, date });
    setDownloading(null);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: "spring" }} className="text-center py-4">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-brand-green/10 border-4 border-brand-green/20 flex items-center justify-center mx-auto mb-5"
      >
        <CheckCircle2 className="w-10 h-10 text-brand-green" />
      </motion.div>

      <h2 className="text-2xl font-extrabold text-brand-green-dark mb-2">Thank You, {data.fullName.split(" ")[0]}! 🎉</h2>
      <p className="text-slate-500 text-sm mb-1">Your donation of <strong className="text-brand-green">₹{data.amount.toLocaleString("en-IN")}</strong> has been recorded.</p>
      <p className="text-xs text-slate-400 mb-6">Receipt No: <span className="font-mono font-semibold text-slate-600">{receiptNo}</span></p>

      {/* Tier card */}
      <div
        className="inline-flex items-center gap-3 rounded-xl border-2 px-5 py-3 mb-8"
        style={{ borderColor: tier.color, backgroundColor: tier.bg }}
      >
        <tier.icon className="w-6 h-6" style={{ color: tier.color }} />
        <div className="text-left">
          <p className="text-sm font-bold" style={{ color: tier.color }}>You are a {tier.label} Donor</p>
          <p className="text-xs text-slate-500">Your support creates lasting impact</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleDownloadReceipt}
          disabled={downloading === "receipt"}
          className="flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3 px-5 rounded-xl shadow-md shadow-brand-green/25 hover:bg-brand-green-dark transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60"
        >
          {downloading === "receipt" ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Download Receipt
        </button>
        <button
          onClick={handleDownloadCard}
          disabled={downloading === "card"}
          className="flex items-center justify-center gap-2 border-2 font-bold py-3 px-5 rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          style={{ borderColor: tier.color, color: tier.color }}
        >
          {downloading === "card" ? (
            <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          ) : (
            <tier.icon className="w-4 h-4" />
          )}
          Download Donor Card
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <Mail className="w-3.5 h-3.5" />
        <span>A copy will be sent to <strong className="text-slate-600">{data.email}</strong> once backend is connected.</span>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [receiptNo] = useState(generateReceiptNo);
  const [date] = useState(formatDate);
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Read patient context from URL search params (e.g. ?patientId=mohammed-salim&amount=64000)
  const search = useSearch({ strict: false }) as { patientId?: string; amount?: string };
  const contextPatient = search.patientId
    ? URGENT_PATIENTS.find((p) => p.slug === search.patientId)
    : null;
  const contextAmount = search.amount ? parseInt(search.amount, 10) : undefined;

  const form = useForm<DonorFormData>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      citizenship: undefined,
      paymentMode: "online",
      financialType: contextPatient ? "Health Care" : "",
      amount: contextAmount,
      consent: false,
    },
    mode: "onSubmit",
  });

  // Sync pre-filled values when navigating from a patient profile
  useEffect(() => {
    if (contextPatient) {
      form.setValue("financialType", "Health Care");
    }
    if (contextAmount) {
      form.setValue("amount", contextAmount);
    }
  }, [contextPatient, contextAmount]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = () => { setStep((s) => s + 1); scrollToForm(); };
  const handleBack = () => { setStep((s) => s - 1); scrollToForm(); };
  const handleSubmit = () => { setSubmitted(true); scrollToForm(); };

  const data = form.getValues();

  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-[#0b1f3b] text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              Islah Welfare Foundation
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {contextPatient
                ? `Support ${contextPatient.name}`
                : "Make a Difference Today"}
            </h1>
            <p className="text-white/75 max-w-2xl leading-relaxed text-base">
              {contextPatient
                ? `You're donating for ${contextPatient.name} (${contextPatient.disease}). Your contribution goes directly to their treatment at ${contextPatient.hospital}.`
                : "Your donation reaches the last mile — funding healthcare, education, women empowerment, and emergency support for rural communities across India."}
            </p>

            {/* Patient mini-card when arriving from a profile */}
            {contextPatient && (
              <div className="mt-6 bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-4 max-w-xl">
                <img
                  src={contextPatient.image}
                  alt={contextPatient.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      URGENT
                    </span>
                    <span className="text-white/60 text-xs">{contextPatient.verificationId}</span>
                  </div>
                  <p className="text-white font-bold text-sm truncate">{contextPatient.name}</p>
                  <p className="text-white/70 text-xs truncate">{contextPatient.disease}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#f97316] font-black text-lg">
                    ₹{(contextPatient.neededAmount - contextPatient.raisedAmount).toLocaleString("en-IN")}
                  </p>
                  <p className="text-white/50 text-[10px]">still needed</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: Shield, text: "80G Tax Exemption" },
                { icon: BadgeCheck, text: "Instant Receipt" },
                { icon: Heart, text: "Transparent Fund Use" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-semibold">
                  <Icon className="w-3.5 h-3.5 text-brand-orange" /> {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Form Card */}
            <div ref={formRef} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-green to-brand-green-dark px-6 py-5">
                <h2 className="text-white font-extrabold text-xl">Donate Now</h2>
                <p className="text-white/75 text-xs mt-1">100% secure • Receipt generated instantly</p>
              </div>

              <div className="p-6 sm:p-8">
                {!submitted && <StepIndicator step={step} total={4} />}

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <SuccessScreen key="success" data={data} receiptNo={receiptNo} date={date} />
                  ) : step === 1 ? (
                    <Step1DonorInfo key="step1" form={form} onNext={handleNext} />
                  ) : step === 2 ? (
                    <Step2DonationDetails key="step2" form={form} onNext={handleNext} onBack={handleBack} />
                  ) : step === 3 ? (
                    <Step3Payment key="step3" form={form} onNext={handleNext} onBack={handleBack} />
                  ) : (
                    <Step4Confirm key="step4" form={form} onBack={handleBack} onSubmit={handleSubmit} />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Why Donate */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-brand-green-dark text-sm mb-4 uppercase tracking-wide">Why Your Support Matters</h3>
                <div className="space-y-3">
                  {[
                    { icon: "🎓", title: "Education", desc: "School fees, learning resources & scholarships" },
                    { icon: "🏥", title: "Healthcare", desc: "Free medical camps & emergency treatment" },
                    { icon: "👩", title: "Women Empowerment", desc: "Vocational skills & Self-Help Groups" },
                    { icon: "🆘", title: "Emergency Aid", desc: "Critical life & disaster relief support" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-700">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donor Tiers */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-brand-green-dark text-sm mb-4 uppercase tracking-wide">Donor Recognition</h3>
                <div className="space-y-2.5">
                  {[
                    { tier: "Platinum", icon: Sparkles, amount: "₹50,000+", color: "#7C3AED", bg: "#EDE9FE" },
                    { tier: "Gold", icon: Award, amount: "₹20,000 – ₹49,999", color: "#B45309", bg: "#FEF3C7" },
                    { tier: "Silver", icon: Star, amount: "₹5,000 – ₹19,999", color: "#2563EB", bg: "#EFF6FF" },
                    { tier: "General", icon: Heart, amount: "Below ₹5,000", color: "#15803D", bg: "#F0FDF4" },
                  ].map(({ tier, icon: Icon, amount, color, bg }) => (
                    <div key={tier} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: bg }}>
                      <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                      <div>
                        <p className="text-xs font-bold" style={{ color }}>{tier} Donor</p>
                        <p className="text-xs text-slate-500">{amount} — Special recognition + Donor Card</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-5">
                <h3 className="font-bold text-brand-green-dark text-sm mb-3 uppercase tracking-wide">Trust & Transparency</h3>
                <div className="space-y-2">
                  {[
                    "Registered charitable trust under applicable laws",
                    "80G tax exemption — 50% deduction on donations",
                    "Annual reports published for transparency",
                    "Internal + statutory audit conducted regularly",
                    "FCRA compliant for foreign contributions",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Questions? Contact Us</p>
                <div className="space-y-1.5">
                  <a href="tel:+919811861633" className="flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
                    <Phone className="w-3.5 h-3.5" /> +91 9811861633
                  </a>
                  <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
                    <Mail className="w-3.5 h-3.5" /> info@iwfindia.org
                  </a>
                </div>
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
