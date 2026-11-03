import { X, MapPin, Calendar, ShieldCheck, Award, Heart, Building2, User, Globe, Briefcase } from "lucide-react";
import type { MemberItem, DonorItem, PartnerItem, VolunteerItem } from "../communityData";

export type ProfileData =
  | { type: "member"; data: MemberItem }
  | { type: "donor"; data: DonorItem }
  | { type: "partner"; data: PartnerItem }
  | { type: "volunteer"; data: VolunteerItem };

interface ProfileDetailModalProps {
  profile: ProfileData | null;
  onClose: () => void;
}

export function ProfileDetailModal({ profile, onClose }: ProfileDetailModalProps) {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Brand Theme Gradient */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#071527] to-[#122e54] text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-lg text-brand-orange">
              {profile.type === "member" && <User className="w-6 h-6 text-brand-orange" />}
              {profile.type === "donor" && <Heart className="w-6 h-6 text-brand-orange" />}
              {profile.type === "partner" && <Building2 className="w-6 h-6 text-brand-orange" />}
              {profile.type === "volunteer" && <Briefcase className="w-6 h-6 text-brand-orange" />}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                ISLAH Community Profile
              </p>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                {profile.data.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-slate-700 text-sm">
          {/* Member Details */}
          {profile.type === "member" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    profile.data.category === "Blue"
                      ? "bg-blue-100 text-blue-800"
                      : profile.data.category === "Yellow"
                      ? "bg-amber-100 text-amber-800"
                      : profile.data.category === "Green"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {profile.data.category} Card Member
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {profile.data.status}
                </span>
                <span className="text-xs text-slate-500 font-mono">ID: {profile.data.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Designation / Role</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{profile.data.type}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Profession</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{profile.data.profession || "Community Advocate"}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    {profile.data.district}, {profile.data.state}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Active Validity</p>
                  <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Till {profile.data.validTill}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Donor Details */}
          {profile.type === "donor" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {profile.data.tier} Donor
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {profile.data.type}
                </span>
                <span className="text-xs text-slate-500">Supporting Since {profile.data.sinceYear}</span>
              </div>

              <p className="text-slate-600 leading-relaxed pt-1">
                {profile.data.description}
              </p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Supported Causes & Programs
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.data.causes.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white text-xs font-medium text-slate-700 border border-slate-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Partner Details */}
          {profile.type === "partner" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  {profile.data.category}
                </span>
                <span className="text-xs text-slate-500">Partner Since {profile.data.sinceYear}</span>
              </div>

              <p className="text-slate-600 leading-relaxed pt-1">
                {profile.data.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Focus Area</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{profile.data.focusArea}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{profile.data.location}</p>
                </div>
              </div>
            </>
          )}

          {/* Volunteer Details */}
          {profile.type === "volunteer" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {profile.data.role}
                </span>
                <span className="text-xs text-slate-500 font-medium">{profile.data.title}</span>
              </div>

              <p className="text-slate-600 leading-relaxed pt-1">
                {profile.data.bio}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Domain & Skills</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{profile.data.domain}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{profile.data.location}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

