import { Link, useParams } from "@tanstack/react-router";
import {
  Home,
  ChevronRight,
  Heart,
  Share2,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Building2,
  Calendar,
  User,
  FileText,
  Shield,
  Clock,
  Users,
  ArrowLeft,
  BadgeCheck,
  Stethoscope,
  Phone,
} from "lucide-react";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
  RoleFormModal,
} from "@/components/layout/SiteLayout";
import { URGENT_PATIENTS } from "@/content/patients";
import type { Patient, PatientCondition } from "@/content/patients";
import { useState } from "react";
import { PatientCard } from "@/components/healthcare/PatientCard";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function conditionStyles(c: PatientCondition) {
  return c === "Critical"
    ? { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", border: "border-red-200" }
    : c === "Serious"
      ? { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500", border: "border-orange-200" }
      : c === "Recovering"
        ? { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200" }
        : { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", border: "border-green-200" };
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection({ patient }: { patient: Patient }) {
  const pct = Math.min(100, Math.round((patient.raisedAmount / patient.neededAmount) * 100));
  const cond = conditionStyles(patient.condition);
  const remaining = patient.neededAmount - patient.raisedAmount;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Help ${patient.name} — IWF`,
        text: `${patient.name} needs urgent help. Please support their treatment.`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <section className="bg-white pt-6 pb-0 px-4 lg:px-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium max-w-7xl mx-auto">
        <Link to="/" className="hover:text-[#0b1f3b] flex items-center gap-1">
          <Home className="w-3 h-3" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/programs/healthcare/critical-life-support" className="hover:text-[#0b1f3b]">
          Critical Life Support
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">{patient.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
          {/* Photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={patient.image}
              alt={patient.name}
              className="w-full h-80 lg:h-96 object-cover object-center"
            />
            {patient.urgent && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider shadow">
                URGENT
              </span>
            )}
            <div
              className={`absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${cond.bg} ${cond.text} ${cond.border}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cond.dot} animate-pulse`} />
              {patient.condition}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="text-white font-black text-xl">{patient.name}</p>
              <p className="text-white/80 text-sm">
                Age {patient.age} • {patient.gender} • {patient.hospital}
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-5">
            {/* Case ID badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 bg-[#0b1f3b]/5 border border-[#0b1f3b]/20 text-[#0b1f3b] text-xs font-bold px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                Case ID: {patient.verificationId}
              </span>
              <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                <BadgeCheck className="w-3.5 h-3.5" />
                IWF Verified
              </span>
              <span className="text-xs text-gray-500">
                Admitted {formatDate(patient.admissionDate)}
              </span>
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-[#0b1f3b] mb-1">
                {patient.name}
              </h1>
              <p className="text-[#f97316] font-bold text-base">{patient.disease}</p>
            </div>


            {/* Goal */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Treatment Goal</p>
              <div className="flex items-center gap-1">
                <IndianRupee className="w-5 h-5 text-[#f97316]" />
                <span className="text-3xl font-black text-[#0b1f3b]">
                  {patient.neededAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Total amount needed for full treatment</p>
            </div>


            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/donate"
                search={{ patientId: patient.slug, amount: String(patient.neededAmount - patient.raisedAmount) }}
                className="flex-1 bg-[#f97316] hover:bg-orange-600 text-white font-black text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md shadow-orange-200"
              >
                <Heart className="w-5 h-5 fill-white" />
                DONATE FOR {patient.name.split(" ")[0].toUpperCase()}
              </Link>
              <button
                onClick={handleShare}
                className="sm:w-auto bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Hospital */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-blue-900 uppercase tracking-wide">Hospital</p>
                <p className="text-sm font-bold text-blue-800 mt-0.5">{patient.hospital}</p>
                {patient.hospitalAddress && (
                  <p className="text-xs text-blue-600 mt-0.5">{patient.hospitalAddress}</p>
                )}
                {patient.ward && (
                  <p className="text-xs text-blue-500 mt-0.5">Ward: {patient.ward}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Story ───────────────────────────────────────────────────────────

function StorySection({ patient }: { patient: Patient }) {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <p className="text-xs font-black text-[#f97316] uppercase tracking-widest mb-3">
            Patient Story
          </p>
          <h2 className="text-2xl font-black text-[#0b1f3b] mb-6">
            The Human Behind the Case
          </h2>

          <div className="space-y-4">
            {patient.story.map((para, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {patient.familyBackground && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-amber-900 uppercase tracking-wide mb-1.5">
                    Family Background
                  </p>
                  <p className="text-sm text-amber-800 leading-relaxed">{patient.familyBackground}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Diagnosis sidebar */}
        <div className="flex flex-col gap-5">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <Stethoscope className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-red-900 uppercase tracking-wide mb-1">
                  Medical Diagnosis
                </p>
                <p className="text-sm font-bold text-red-800">{patient.disease}</p>
              </div>
            </div>
            {patient.diagnosis && (
              <p className="text-xs text-red-700 leading-relaxed border-t border-red-200 pt-3 mt-2">
                {patient.diagnosis}
              </p>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
            <p className="text-xs font-black text-[#0b1f3b] uppercase tracking-wide">Quick Facts</p>
            {[
              { icon: User, label: "Patient", value: `${patient.name}, ${patient.age} yrs (${patient.gender})` },
              { icon: Calendar, label: "Admitted", value: formatDate(patient.admissionDate) },
              { icon: Building2, label: "Hospital", value: patient.hospital },
              { icon: AlertCircle, label: "Condition", value: patient.condition },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon className="w-4 h-4 text-[#0b1f3b]/50 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{label}</p>
                  <p className="text-xs text-gray-700 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0b1f3b] rounded-2xl p-5 text-white text-center">
            <Phone className="w-6 h-6 mx-auto mb-2 opacity-70" />
            <p className="text-xs font-black uppercase tracking-wide mb-1">Contact IWF</p>
            <p className="text-xs opacity-70 mb-3">
              Questions about this case? Our team is here.
            </p>
            <a
              href="tel:+919811861633"
              className="text-sm font-bold text-[#f97316] hover:underline"
            >
              +91 98018 12625
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Verification & Transparency ─────────────────────────────────────

function VerificationSection({ patient }: { patient: Patient }) {
  return (
    <section className="py-12 bg-green-50 border-t border-green-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 text-green-800 text-xs font-black px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
            <BadgeCheck className="w-4 h-4" />
            Transparency & Verification
          </div>
          <h2 className="text-2xl font-black text-[#0b1f3b]">
            100% Verified by IWF Field Team
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Every patient case is personally verified by our field coordinator and medical experts before we accept a single rupee of donations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verification details */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Case Reference</p>
                <p className="text-base font-black text-[#0b1f3b]">{patient.verificationId}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">
                  Verified By
                </p>
                <p className="text-sm text-gray-800 font-semibold">{patient.verifiedBy}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">
                  Verification Date
                </p>
                <p className="text-sm text-gray-800 font-semibold">{formatDate(patient.verificationDate)}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <p className="text-xs text-green-800 font-semibold">
                  Case cleared for public fundraising
                </p>
              </div>
            </div>
          </div>

          {/* Document checklist */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-[#0b1f3b]" />
              <p className="text-sm font-black text-[#0b1f3b] uppercase tracking-wide">
                Documents Verified
              </p>
            </div>
            <div className="space-y-3">
              {patient.documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${doc.verified ? "bg-green-100" : "bg-gray-200"
                      }`}
                  >
                    {doc.verified ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-700 font-medium">{doc.label}</p>
                  {doc.verified && (
                    <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* IWF transparency pledge */}
          <div className="bg-[#0b1f3b] rounded-2xl p-6 text-white flex flex-col">
            <BadgeCheck className="w-8 h-8 text-[#f97316] mb-4" />
            <h3 className="font-black text-lg mb-3">IWF's Transparency Pledge</h3>
            <ul className="space-y-3 flex-1">
              {[
                "All cases personally verified by field staff",
                "Donations disbursed directly to hospital/pharmacy",
                "Every rupee tracked and accounted for",
                "Donor reports published after case closure",
                "Zero administrative deductions from this fund",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#f97316] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-white/20 text-center">
              <p className="text-[10px] text-white/50 uppercase tracking-wide">
                Registered Charity · 80G Tax Exemption Eligible
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Financial Breakdown ─────────────────────────────────────────────

function FinancialSection({ patient }: { patient: Patient }) {
  const remaining = patient.neededAmount - patient.raisedAmount;
  const pct = Math.min(100, Math.round((patient.raisedAmount / patient.neededAmount) * 100));

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <p className="text-xs font-black text-[#f97316] uppercase tracking-widest mb-2">
          Financial Transparency
        </p>
        <h2 className="text-2xl font-black text-[#0b1f3b] mb-8">Complete Cost Breakdown</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cost table */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-[#0b1f3b] px-5 py-3 flex items-center justify-between">
              <p className="text-white text-xs font-black uppercase tracking-wide">
                Treatment Cost Estimate
              </p>
              <p className="text-white/60 text-xs">Case: {patient.verificationId}</p>
            </div>
            <div className="divide-y divide-gray-100">
              {patient.costBreakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5">
                  <p className="text-sm text-gray-700">{item.label}</p>
                  <p className="text-sm font-bold text-[#0b1f3b]">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between px-5 py-4 bg-[#0b1f3b]/5">
                <p className="text-sm font-black text-[#0b1f3b] uppercase tracking-wide">
                  Total Required
                </p>
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-4 h-4 text-[#f97316]" />
                  <p className="text-lg font-black text-[#f97316]">
                    {patient.neededAmount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Funding status */}
          <div className="flex flex-col gap-5">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <p className="text-xs font-black text-[#0b1f3b] uppercase tracking-wide mb-4">
                Funding Status
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Total Needed", value: `₹${patient.neededAmount.toLocaleString("en-IN")}`, color: "text-[#0b1f3b]" },
                  { label: "Still Needed", value: `₹${remaining.toLocaleString("en-IN")}`, color: "text-[#f97316]" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="text-center">
                    <p className={`text-lg font-black ${color}`}>{value}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-green-900 uppercase tracking-wide mb-1.5">
                    Fund Utilisation
                  </p>
                  <p className="text-xs text-green-800 leading-relaxed">
                    All raised funds are transferred directly to the hospital billing department or pharmacy. IWF maintains receipts and will publish a full fund utilisation report once the case is resolved.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/donate"
              search={{ patientId: patient.slug, amount: String(remaining) }}
              className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md shadow-orange-200 text-center"
            >
              <Heart className="w-5 h-5 fill-white" />
              Donate ₹{remaining.toLocaleString("en-IN")} to Complete Funding
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Donation History ─────────────────────────────────────────────────

function DonationHistorySection({ patient }: { patient: Patient }) {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent donations */}
          <div>
            <p className="text-xs font-black text-[#f97316] uppercase tracking-widest mb-2">
              Recent Contributions
            </p>
            <h2 className="text-2xl font-black text-[#0b1f3b] mb-6">
              {patient.donorsCount} People Have Donated
            </h2>
            <div className="space-y-3">
              {patient.donationHistory.map((d, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#0b1f3b]/10 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-[#f97316]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#0b1f3b] truncate">{d.donor}</p>
                      {d.message && (
                        <p className="text-[11px] text-gray-500 italic truncate">"{d.message}"</p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-0.5">{formatTimeAgo(d.date)}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-green-700">
                      +₹{d.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400 text-center pt-2">
                Showing last {patient.donationHistory.length} of {patient.donorsCount} donations · All donors are anonymized for privacy
              </p>
            </div>
          </div>

          {/* Field Updates Timeline */}
          <div>
            <p className="text-xs font-black text-[#f97316] uppercase tracking-widest mb-2">
              IWF Field Updates
            </p>
            <h2 className="text-2xl font-black text-[#0b1f3b] mb-6">
              Case Progress Timeline
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-5 pl-12 relative">
                {patient.updates.map((update, i) => {
                  const iconMap = {
                    admission: AlertCircle,
                    surgery: Stethoscope,
                    treatment: Stethoscope,
                    progress: CheckCircle2,
                    discharge: CheckCircle2,
                    funding: IndianRupee,
                  };
                  const Icon = iconMap[update.type] || Clock;
                  const colorMap = {
                    admission: "bg-red-100 text-red-600 border-red-200",
                    surgery: "bg-purple-100 text-purple-600 border-purple-200",
                    treatment: "bg-blue-100 text-blue-600 border-blue-200",
                    progress: "bg-green-100 text-green-600 border-green-200",
                    discharge: "bg-green-100 text-green-600 border-green-200",
                    funding: "bg-orange-100 text-orange-600 border-orange-200",
                  };
                  const colors = colorMap[update.type] || "bg-gray-100 text-gray-600";

                  return (
                    <div key={i} className="relative">
                      <div
                        className={`absolute -left-8 w-8 h-8 rounded-full border-2 flex items-center justify-center ${colors}`}
                        style={{ top: "0" }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="text-xs font-black text-[#0b1f3b]">{update.title}</p>
                          <time className="text-[10px] text-gray-400 shrink-0">
                            {formatDate(update.date)}
                          </time>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{update.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Other Patients ──────────────────────────────────────────────────

function OtherPatientsSection({ currentSlug }: { currentSlug: string }) {
  const others = URGENT_PATIENTS.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <p className="text-xs font-black text-[#f97316] uppercase tracking-widest mb-2">
          Others Needing Help
        </p>
        <h2 className="text-2xl font-black text-[#0b1f3b] mb-6">More Patients Need Your Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((p) => (
            <PatientCard key={p.id} {...p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/programs/healthcare/critical-life-support"
            className="inline-flex items-center gap-2 bg-[#0b1f3b] hover:bg-[#18325c] text-white font-bold text-sm py-3 px-6 rounded-xl transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Patients Needing Support
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function PatientProfilePage() {
  const { patientSlug } = useParams({ from: "/patients/$patientSlug" });
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  const patient = URGENT_PATIENTS.find((p) => p.slug === patientSlug);

  if (!patient) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col">
        <NotificationTicker />
        <UtilityBar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-black text-gray-700 mb-2">Patient Not Found</h1>
            <p className="text-gray-500 mb-6">
              This patient profile may have been removed or the link is incorrect.
            </p>
            <Link
              to="/programs/healthcare/critical-life-support"
              className="bg-[#0b1f3b] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#18325c] transition-colors"
            >
              View All Patients
            </Link>
          </div>
        </main>
        <Footer onOpenModal={setActiveModal} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <HeroSection patient={patient} />
        <StorySection patient={patient} />
        <VerificationSection patient={patient} />
        <FinancialSection patient={patient} />
        <DonationHistorySection patient={patient} />
        <OtherPatientsSection currentSlug={patient.slug} />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
