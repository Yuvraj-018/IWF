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
  FileText,
  Shield,
  Clock,
  Users,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Stethoscope,
  Phone,
  FileCheck,
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
import MedicalEmergencyWorkflow from "@/components/healthcare/MedicalEmergencyWorkflow";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function conditionStyles(c: PatientCondition) {
  return c === "Critical"
    ? { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", border: "border-red-200" }
    : c === "Serious"
      ? { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500", border: "border-amber-200" }
      : c === "Recovering"
        ? { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200" }
        : { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", border: "border-green-200" };
}

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

  const cond = conditionStyles(patient.condition);
  const remaining = patient.neededAmount - patient.raisedAmount;
  const firstName = patient.name.split(" ")[0].toUpperCase();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Help ${patient.name} — IWF`,
        text: `${patient.name} needs urgent medical treatment support.`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const otherPatients = URGENT_PATIENTS.filter((p) => p.slug !== patient.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="pb-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100 py-3 px-4 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-[#0b1f3b] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link
              to="/programs/healthcare/critical-life-support"
              className="hover:text-[#0b1f3b]"
            >
              Critical Life Support
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-bold">{patient.name}</span>
          </div>
        </div>

        {/* TOP SECTION: Patient Overview + Sidebar (Treatment Cost & Pledge) */}
        <section className="pt-8 px-4 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_420px] gap-8 items-start">
            {/* Left: Patient Primary Info */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-start bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                {/* Photo Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-md bg-slate-900 group">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-full h-72 md:h-84 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {patient.urgent && (
                    <span className="absolute top-3.5 left-3.5 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded uppercase tracking-wider shadow">
                      URGENT
                    </span>
                  )}
                  <div
                    className={`absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${cond.bg} ${cond.text} ${cond.border}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cond.dot} animate-pulse`} />
                    {patient.condition}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                    <p className="text-white font-black text-lg leading-tight">{patient.name}</p>
                    <p className="text-white/80 text-xs mt-0.5">
                      Age {patient.age} • {patient.gender} • {patient.hospital}
                    </p>
                  </div>
                </div>

                {/* Patient Summary Details */}
                <div className="flex flex-col justify-between h-full space-y-4">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded-full">
                      <Shield className="w-3.5 h-3.5 text-slate-600" />
                      Case ID: {patient.verificationId}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      IWF Verified
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Admitted {formatDate(patient.admissionDate)}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-3">
                      <h1 className="text-2xl sm:text-3xl font-black text-[#0b1f3b]">
                        {patient.name}
                      </h1>
                      <span className="text-sm font-bold text-slate-500">
                        {patient.age} Yrs • {patient.gender}
                      </span>
                    </div>
                  </div>

                  {/* Medical Diagnosis Card */}
                  <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Stethoscope className="w-4 h-4 text-red-600 shrink-0" />
                      <span className="text-[11px] font-black text-red-800 uppercase tracking-wider">
                        MEDICAL DIAGNOSIS
                      </span>
                    </div>
                    <p className="text-sm font-black text-red-950 mb-1">{patient.disease}</p>
                    {patient.diagnosis && (
                      <p className="text-xs text-red-800/90 leading-relaxed">
                        {patient.diagnosis}
                      </p>
                    )}
                  </div>

                  {/* Hospital Info Card */}
                  <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sky-700 shrink-0" />
                        <span className="text-[11px] font-black text-sky-800 uppercase tracking-wider">
                          HOSPITAL
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-sky-700">
                        ADMITTED {formatDate(patient.admissionDate)}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-sky-950">{patient.hospital}</p>
                    {patient.hospitalAddress && (
                      <p className="text-xs text-sky-800 mt-0.5">{patient.hospitalAddress}</p>
                    )}
                    {patient.ward && (
                      <p className="text-xs font-semibold text-sky-900 mt-1">Ward: {patient.ward}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content: Story + Verification */}
              <div className="space-y-8">
                {/* PATIENT STORY */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <span className="text-xs font-black text-[#ea580c] uppercase tracking-widest block mb-2">
                    PATIENT STORY
                  </span>
                  <h2 className="text-2xl font-black text-[#0b1f3b] mb-4">
                    The Human Behind the Case
                  </h2>

                  <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                    {patient.story.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {patient.familyBackground && (
                    <div className="mt-6 bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-black text-amber-900 uppercase tracking-wide mb-1">
                            FAMILY BACKGROUND
                          </p>
                          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                            {patient.familyBackground}
                          </p>
                          <p className="text-xs text-amber-800 font-bold mt-2">
                            Emergency Contact Desk: +91 9811861633
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* TRANSPARENCY & VERIFICATION */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wide mb-3">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    TRANSPARENCY &amp; VERIFICATION
                  </div>
                  <h2 className="text-2xl font-black text-[#0b1f3b] mb-2">
                    100% Verified by IWF Field Team
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mb-6">
                    Every patient case is personally verified by our field coordinator and medical experts before we accept a single rupee of donations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Verification Details */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">CASE REFERENCE</p>
                          <p className="text-sm font-black text-[#0b1f3b]">{patient.verificationId}</p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
                        <div>
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">VERIFIED BY</span>
                          <span className="font-semibold text-slate-800">{patient.verifiedBy}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">VERIFICATION DATE</span>
                          <span className="font-semibold text-slate-800">{formatDate(patient.verificationDate)}</span>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-emerald-800">
                          Case cleared for public fundraising
                        </span>
                      </div>
                    </div>

                    {/* Documents Verified */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-[#0b1f3b]" />
                        <p className="text-xs font-black text-[#0b1f3b] uppercase tracking-wide">
                          DOCUMENTS VERIFIED
                        </p>
                      </div>
                      <div className="space-y-2">
                        {patient.documents.map((doc, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 text-xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="text-slate-700 font-medium">{doc.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Treatment Cost Estimate, Donation Action, Contact & Pledge */}
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Treatment Cost Estimate Box */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                <div className="bg-[#0b1f3b] text-white px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider">
                      TREATMENT COST ESTIMATE
                    </p>
                    <p className="text-[10px] text-slate-300 font-medium">Case: {patient.verificationId}</p>
                  </div>
                  <IndianRupee className="w-5 h-5 text-[#ea580c]" />
                </div>

                {/* Breakdown List */}
                <div className="p-5 space-y-3">
                  {patient.costBreakdown.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-b-0"
                    >
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#0b1f3b]">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}

                  {/* Total Required Row (Peach Background) */}
                  <div className="mt-4 bg-[#fff7ed] border border-[#ffedd5] rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-xs font-black text-[#0b1f3b] uppercase tracking-wider">
                      TOTAL REQUIRED
                    </span>
                    <span className="text-xl font-black text-[#ea580c]">
                      ₹ {patient.neededAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Progress info */}
                  <div className="pt-2 text-center text-xs text-slate-500 font-medium">
                    <span className="text-emerald-700 font-bold">
                      ₹{patient.raisedAmount.toLocaleString("en-IN")}
                    </span>{" "}
                    raised of ₹{patient.neededAmount.toLocaleString("en-IN")} •{" "}
                    <span className="text-[#ea580c] font-bold">
                      ₹{remaining.toLocaleString("en-IN")} needed
                    </span>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-2 space-y-2.5">
                    <Link
                      to="/donate"
                      search={{
                        patientId: patient.slug,
                        amount: String(remaining),
                      }}
                      className="w-full bg-[#ea580c] hover:bg-orange-600 text-white font-black text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md shadow-orange-500/20 text-center"
                    >
                      <Heart className="w-5 h-5 fill-white" />
                      DONATE FOR {firstName}
                    </Link>

                    <button
                      onClick={handleShare}
                      className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-slate-500" />
                      Share Case with Family &amp; Friends
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact IWF Box */}
              <div className="bg-[#0b1f3b] text-white rounded-3xl p-5 text-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-[#ea580c]">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-xs font-black uppercase tracking-wider mb-1">
                  CONTACT IWF
                </p>
                <p className="text-xs text-slate-300 mb-3">
                  Questions about this case? Our team is here.
                </p>
                <a
                  href="tel:+919811861633"
                  className="inline-block bg-red-600/90 hover:bg-red-600 text-white font-black text-sm px-4 py-2 rounded-full tracking-wider transition-colors"
                >
                  +91 9811861633
                </a>
              </div>

              {/* IWF's Transparency Pledge */}
              <div className="bg-[#0b1f3b] text-white rounded-3xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/15 pb-3">
                  <BadgeCheck className="w-6 h-6 text-[#ea580c]" />
                  <h3 className="text-sm font-black uppercase tracking-wider">
                    IWF's Transparency Pledge
                  </h3>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <span>All cases personally verified by field staff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <span>Donations disbursed directly to hospital/pharmacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <span>Every rupee tracked and accounted for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <span>Donor reports published after case closure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <span>
                      Administration cost deduction as per{" "}
                      <Link
                        to="/medical-treatment-policy"
                        className="underline text-orange-300 hover:text-white"
                      >
                        applicable policy*
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <span>Donor may verify from patient family/hospital</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-white/10 text-center">
                  <span className="inline-block bg-white/10 text-[10px] font-bold text-slate-300 px-3 py-1 rounded-full uppercase tracking-wider">
                    Registered Charity, Income Tax exemption eligible
                  </span>
                </div>
              </div>

              {/* Case Progress Timeline (Right Column in Design) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <span className="text-[11px] font-black text-[#ea580c] uppercase tracking-wider block mb-1">
                  IWF FIELD UPDATES
                </span>
                <h3 className="text-lg font-black text-[#0b1f3b] mb-4">
                  Case Progress Timeline
                </h3>

                <div className="relative pl-6 space-y-5">
                  <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200" />
                  {patient.updates.map((update, idx) => {
                    const iconColor =
                      idx === 0
                        ? "bg-red-100 text-red-600 border-red-200"
                        : idx === 1
                          ? "bg-blue-100 text-blue-600 border-blue-200"
                          : idx === 2
                            ? "bg-emerald-100 text-emerald-600 border-emerald-200"
                            : "bg-orange-100 text-[#ea580c] border-orange-200";

                    return (
                      <div key={idx} className="relative">
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${iconColor}`}
                        >
                          ●
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-bold text-[#0b1f3b] text-xs">
                              {update.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium shrink-0">
                              {formatDate(update.date)}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-[11px]">
                            {update.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8-STEP OPERATIONAL WORKFLOW: "HOW WE WORK" */}
        <div className="mt-16">
          <MedicalEmergencyWorkflow showImageToggle={true} />
        </div>

        {/* MORE PATIENTS NEED YOUR SUPPORT */}
        <section className="pt-16 px-4 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-[#ea580c] uppercase tracking-widest block mb-2">
              OTHERS NEEDING HELP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b]">
              More Patients Need Your Support
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPatients.map((p) => (
              <PatientCard key={p.id} {...p} />
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/programs/healthcare/critical-life-support"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b1f3b] hover:bg-[#16345d] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              View Previous Patient's Report
            </Link>
            <Link
              to="/programs/healthcare/critical-life-support"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b1f3b] hover:bg-[#16345d] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              View All Patients Needing Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
