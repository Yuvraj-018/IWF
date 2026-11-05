import { Check, ChevronDown } from "lucide-react";
import { SECTOR_CATALOGUE, OTHER_AREA } from "@/content/sectorCatalogue";
import { inputClass } from "@/components/forms/formFields";

export interface SectorPickerValue {
  sectors: string[];
  areas: Record<string, string[]>;
  otherText: string;
}

/**
 * Sector cards that expand to reveal their specific sub-areas once selected.
 */
export function SectorAreaPicker({
  value,
  onChange,
  hasError,
  otherError,
}: {
  value: SectorPickerValue;
  onChange: (v: SectorPickerValue) => void;
  hasError?: boolean;
  otherError?: string;
}) {
  const toggleSector = (name: string) => {
    if (value.sectors.includes(name)) {
      const { [name]: _removed, ...rest } = value.areas;
      onChange({ ...value, sectors: value.sectors.filter((s) => s !== name), areas: rest });
    } else {
      onChange({ ...value, sectors: [...value.sectors, name] });
    }
  };

  const toggleArea = (sector: string, area: string) => {
    const current = value.areas[sector] || [];
    const next = current.includes(area) ? current.filter((a) => a !== area) : [...current, area];
    onChange({ ...value, areas: { ...value.areas, [sector]: next } });
  };

  const otherSelected = Object.values(value.areas).some((list) => list.includes(OTHER_AREA));

  return (
    <div className="space-y-3">
      <div
        className={`columns-1 sm:columns-2 lg:columns-3 gap-2.5 ${
          hasError ? "rounded-lg ring-1 ring-red-300 p-1" : ""
        }`}
      >
        {SECTOR_CATALOGUE.map((sector) => {
          const selected = value.sectors.includes(sector.name);
          const picked = value.areas[sector.name] || [];
          return (
            <div
              key={sector.name}
              className={`break-inside-avoid mb-2.5 rounded-lg border transition ${
                selected
                  ? "border-emerald-300 bg-emerald-50/40"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={selected}
                aria-expanded={selected}
                onClick={() => toggleSector(sector.name)}
                className="w-full flex items-start gap-2.5 px-3 py-2.5 text-left"
              >
                <span
                  className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                    selected
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {selected && <Check className="w-3 h-3" />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs sm:text-[13px] font-semibold text-[#071527] leading-snug">
                    {sector.name}
                  </span>
                  {!selected && (
                    <span className="block text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {sector.short}
                    </span>
                  )}
                  {selected && picked.length > 0 && (
                    <span className="block text-[11px] text-emerald-700 mt-0.5">
                      {picked.length} selected
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform ${selected ? "rotate-180" : ""}`}
                />
              </button>

              {selected && (
                <div className="px-3 pb-3 pt-0.5 space-y-1 border-t border-emerald-100">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold pt-2">
                    Select specific areas
                  </p>
                  {sector.areas.map((area) => {
                    const on = picked.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggleArea(sector.name, area)}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-xs transition ${
                          on
                            ? "bg-white text-emerald-900 font-medium"
                            : "text-slate-700 hover:bg-white"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border shrink-0 ${
                            on
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {on && <Check className="w-2.5 h-2.5" />}
                        </span>
                        {area}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {otherSelected && (
        <div id="field-sectorOther" className="scroll-mt-28 max-w-md">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Other — please specify<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            type="text"
            value={value.otherText}
            maxLength={150}
            onChange={(e) => onChange({ ...value, otherText: e.target.value })}
            placeholder="Describe the area"
            className={inputClass(Boolean(otherError))}
          />
          {otherError && <p className="mt-1 text-[11px] text-red-600">{otherError}</p>}
        </div>
      )}
    </div>
  );
}

/** Flatten picker value into "Sector: area" strings (for review and payload). */
export function flattenSectorAreas(v: SectorPickerValue): string[] {
  return v.sectors.flatMap((s) =>
    (v.areas[s] || []).map((a) =>
      a === OTHER_AREA && v.otherText ? `${s}: ${v.otherText}` : `${s}: ${a}`,
    ),
  );
}
