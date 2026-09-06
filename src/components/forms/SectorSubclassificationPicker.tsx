import { useState } from "react";
import {
  GraduationCap,
  HeartPulse,
  Sparkles,
  Briefcase,
  Scale,
  Sprout,
  TreePine,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
} from "lucide-react";
import { VOLUNTEER_SECTORS, type SectorOption } from "@/content/volunteerSectors";

interface SectorSubclassificationPickerProps {
  selectedSectors: string[];
  selectedSubcategories: Record<string, string[]>;
  otherText: string;
  onChange: (value: {
    sectors: string[];
    subcategories: Record<string, string[]>;
    otherText: string;
  }) => void;
  error?: string;
}

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  HeartPulse,
  Sparkles,
  Briefcase,
  Scale,
  Sprout,
  TreePine,
  ShieldAlert,
};

export function SectorSubclassificationPicker({
  selectedSectors,
  selectedSubcategories,
  otherText,
  onChange,
  error,
}: SectorSubclassificationPickerProps) {
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({});

  const toggleSector = (sectorId: string) => {
    const isSelected = selectedSectors.includes(sectorId);
    let newSectors: string[];
    const newSubcategories = { ...selectedSubcategories };

    if (isSelected) {
      newSectors = selectedSectors.filter((id) => id !== sectorId);
      delete newSubcategories[sectorId];
    } else {
      newSectors = [...selectedSectors, sectorId];
      // Automatically expand on select
      setExpandedSectors((prev) => ({ ...prev, [sectorId]: true }));
      // Default to empty or first subcategory
      if (!newSubcategories[sectorId]) {
        newSubcategories[sectorId] = [];
      }
    }

    onChange({
      sectors: newSectors,
      subcategories: newSubcategories,
      otherText,
    });
  };

  const toggleAccordion = (e: React.MouseEvent, sectorId: string) => {
    e.stopPropagation();
    setExpandedSectors((prev) => ({
      ...prev,
      [sectorId]: !prev[sectorId],
    }));
  };

  const toggleSubcategory = (sectorId: string, subcat: string) => {
    // If parent sector is not yet selected, select it
    let newSectors = selectedSectors;
    if (!selectedSectors.includes(sectorId)) {
      newSectors = [...selectedSectors, sectorId];
    }

    const currentList = selectedSubcategories[sectorId] || [];
    const isChecked = currentList.includes(subcat);
    const updatedList = isChecked
      ? currentList.filter((item) => item !== subcat)
      : [...currentList, subcat];

    onChange({
      sectors: newSectors,
      subcategories: {
        ...selectedSubcategories,
        [sectorId]: updatedList,
      },
      otherText,
    });
  };

  const selectAllSubcategories = (sector: SectorOption) => {
    const currentList = selectedSubcategories[sector.id] || [];
    const allSelected = currentList.length === sector.subcategories.length;

    let newSectors = selectedSectors;
    if (!selectedSectors.includes(sector.id)) {
      newSectors = [...selectedSectors, sector.id];
    }

    onChange({
      sectors: newSectors,
      subcategories: {
        ...selectedSubcategories,
        [sector.id]: allSelected ? [] : [...sector.subcategories],
      },
      otherText,
    });
  };

  const totalSubcategoriesSelected = Object.values(selectedSubcategories).reduce(
    (acc, list) => acc + (list?.length || 0),
    0
  );

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green-dark">
              What We Do — Working Sectors
            </span>
            <span className="text-[10px] bg-brand-orange text-white font-bold px-2 py-0.5 rounded-full">
              Multi-Select
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Select one or more sectors and check specific initiatives you wish to contribute to.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 shrink-0">
          <span className="text-brand-green font-bold">{selectedSectors.length}</span> sector(s),{" "}
          <span className="text-brand-orange font-bold">{totalSubcategoriesSelected}</span> activity(s) selected
        </div>
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          {error}
        </p>
      )}

      {/* 8 Working Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {VOLUNTEER_SECTORS.map((sector) => {
          const isSelected = selectedSectors.includes(sector.id);
          const isExpanded = expandedSectors[sector.id] || isSelected;
          const chosenSubs = selectedSubcategories[sector.id] || [];
          const IconComp = iconMap[sector.iconName] || HelpCircle;

          return (
            <div
              key={sector.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isSelected
                  ? "border-brand-green bg-green-50/30 shadow-sm ring-1 ring-brand-green/20"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {/* Sector Header / Toggle */}
              <div
                onClick={() => toggleSector(sector.id)}
                className="p-3.5 flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all ${
                      isSelected
                        ? "bg-brand-green border-brand-green text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center text-white shrink-0 shadow-xs"
                        style={{ backgroundColor: sector.badgeColor }}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {sector.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {sector.shortDescription}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleAccordion(e, sector.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition shrink-0"
                  title="Toggle sub-initiatives"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Subclassified initiatives */}
              {isExpanded && (
                <div className="px-4 pb-3.5 pt-2 border-t border-slate-100 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Sub-Initiatives ({chosenSubs.length}/{sector.subcategories.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => selectAllSubcategories(sector)}
                      className="text-[11px] font-semibold text-brand-green hover:underline"
                    >
                      {chosenSubs.length === sector.subcategories.length ? "Deselect All" : "Select All"}
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {sector.subcategories.map((subcat) => {
                      const isSubChecked = chosenSubs.includes(subcat);

                      return (
                        <label
                          key={subcat}
                          className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition text-xs select-none ${
                            isSubChecked
                              ? "bg-brand-green/10 text-brand-green-dark font-medium"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSubChecked}
                            onChange={() => toggleSubcategory(sector.id, subcat)}
                            className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
                          />
                          <span className="leading-snug">{subcat}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Other Option */}
      <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-brand-orange" /> Other Area of Interest / Sector (Please specify)
        </label>
        <input
          type="text"
          value={otherText}
          onChange={(e) =>
            onChange({
              sectors: selectedSectors,
              subcategories: selectedSubcategories,
              otherText: e.target.value,
            })
          }
          placeholder="e.g. Media & Photography, Mental Health, Event Management..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs text-slate-800 outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
