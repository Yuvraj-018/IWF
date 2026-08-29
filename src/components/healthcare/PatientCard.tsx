import { Eye, Heart, IndianRupee } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Patient } from "@/content/patients";

type PatientCardProps = Patient & {
  compact?: boolean;
};

export function PatientCard({
  slug,
  name,
  age,
  gender,
  disease,
  hospital,
  urgent,
  image,
  neededAmount,
  condition,
}: PatientCardProps) {
  const conditionColor =
    condition === "Critical"
      ? "bg-red-600 text-white"
      : condition === "Serious"
        ? "bg-orange-500 text-white"
        : condition === "Recovering"
          ? "bg-blue-500 text-white"
          : "bg-green-600 text-white";

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Image */}
      <div className="relative h-28 sm:h-32 w-full">
        <img
          src={image}
          alt={`${name} — patient needing urgent support`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {urgent && (
          <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
            URGENT
          </span>
        )}
        <span
          className={`absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm ${conditionColor}`}
        >
          {condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-extrabold text-[#0b1f3b] text-base leading-tight truncate">{name}</h3>
          <span className="text-xs font-bold text-slate-500 shrink-0">
            {age} Yrs · {gender}
          </span>
        </div>

        <div className="h-px bg-slate-100 my-0.5" />

        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-[10px] font-black text-[#f97316] uppercase tracking-wide shrink-0">
            Disease:
          </span>
          <span className="text-xs text-slate-800 font-bold truncate leading-snug">{disease}</span>
        </div>

        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-[10px] font-black text-[#0b1f3b] uppercase tracking-wide shrink-0">
            Hospital:
          </span>
          <span className="text-xs text-slate-700 font-semibold truncate leading-snug">{hospital}</span>
        </div>

        {/* Financial section */}
        <div className="mt-1 py-1 flex items-center justify-between border-t border-b border-slate-100">
          <span className="text-[10px] font-black text-[#0b1f3b] uppercase tracking-wide">
            Needed
          </span>
          <div className="flex items-center gap-0.5 text-sm text-[#f97316] font-black">
            <IndianRupee className="w-3.5 h-3.5 text-[#f97316] shrink-0" />
            <span>{neededAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <Link
            to="/patients/$patientSlug"
            params={{ patientSlug: slug }}
            className="w-full bg-[#0b1f3b] hover:bg-slate-800 text-white font-bold text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200 active:scale-95 text-center"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>View More</span>
          </Link>
          <a
            href={`/donate?patient=${encodeURIComponent(slug)}&name=${encodeURIComponent(name)}&amount=${encodeURIComponent(neededAmount)}`}
            className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-extrabold text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200 active:scale-95 text-center shadow-xs"
          >
            <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>Donate</span>
          </a>
        </div>
      </div>
    </article>
  );
}

