import { Link } from "@tanstack/react-router";
import { Heart, Users, Handshake } from "lucide-react";

interface ActionStripProps {
  title?: string;
  subtitle?: string;
  showPartner?: boolean;
}

export function ActionStrip({
  title = "Together, we can create lasting impact and build sustainable communities.",
  subtitle = "Join us in making a difference today!",
  showPartner = true,
}: ActionStripProps) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 mt-8 bg-gradient-to-r from-[#071527] to-[#0c2340] text-white shadow-lg border border-slate-800 relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-6 flex items-center gap-3.5">
          <div className="p-3 bg-white/10 rounded-xl text-brand-orange shrink-0 border border-white/10">
            <Heart className="w-5 h-5 fill-brand-orange/30 text-brand-orange" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold tracking-tight text-white leading-snug">
              {title}
            </h3>
            <p className="text-xs text-slate-300 font-normal mt-0.5">{subtitle}</p>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-2.5">
          <Link
            to="/donate"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Donate Now</span>
          </Link>

          <Link
            to="/volunteer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <Users className="w-3.5 h-3.5 text-slate-300" />
            <span>Volunteer</span>
          </Link>

          {showPartner && (
            <Link
              to="/partner"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Handshake className="w-3.5 h-3.5 text-slate-700" />
              <span>Partner With Us</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
