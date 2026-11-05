import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { PHONE_COUNTRIES, PINNED_COUNT, countryForDial, flagUrl, type PhoneCountry } from "./phone";

function Flag({ iso, className = "" }: { iso: string; className?: string }) {
  const src = flagUrl(iso);
  if (!src)
    return <span className={`inline-block w-5 h-[13px] rounded-[2px] bg-slate-200 ${className}`} />;
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={`inline-block w-5 h-[13px] rounded-[2px] object-cover ring-1 ring-black/10 ${className}`}
    />
  );
}

/**
 * Country dial-code picker with flags and search. `value` is the dial code ("+91");
 * the chosen country is remembered so shared codes (+1 US/Canada) show the right flag.
 */
export function PhoneCodeSelect({
  value,
  onChange,
  className = "",
  buttonClassName = "",
  dark = false,
}: {
  value: string;
  onChange: (dial: string) => void;
  className?: string;
  buttonClassName?: string;
  /** Style for dark backgrounds. */
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<PhoneCountry | undefined>(() => countryForDial(value));
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected?.dial !== value) setSelected(countryForDial(value));
  }, [value, selected?.dial]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    setTimeout(() => searchRef.current?.focus(), 0);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return PHONE_COUNTRIES;
    return PHONE_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.slice(1).startsWith(q) ||
        c.iso.toLowerCase() === q,
    );
  }, [query]);

  const pick = (c: PhoneCountry) => {
    setSelected(c);
    onChange(c.dial);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={rootRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code ${selected ? `${selected.name} ${selected.dial}` : value}`}
        className={`h-full inline-flex items-center gap-1.5 rounded-lg border px-2.5 text-sm transition ${
          dark
            ? "border-white/15 bg-white/10 text-white hover:bg-white/15"
            : "border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100"
        } ${buttonClassName}`}
      >
        <Flag iso={selected?.iso ?? "IN"} />
        <span className="font-medium tabular-nums">{value}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 z-[60] w-72 max-w-[85vw] rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden text-slate-800"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter" && results[0]) {
              e.preventDefault();
              pick(results[0]);
            }
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {results.map((c, i) => (
              <li key={c.iso}>
                {!query && i === PINNED_COUNT && <div className="my-1 border-t border-slate-100" />}
                <button
                  type="button"
                  role="option"
                  aria-selected={selected?.iso === c.iso}
                  onClick={() => pick(c)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-sm hover:bg-orange-50 ${
                    selected?.iso === c.iso ? "bg-orange-50/70 font-medium" : ""
                  }`}
                >
                  <Flag iso={c.iso} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-slate-500 tabular-nums">{c.dial}</span>
                </button>
              </li>
            ))}
            {results.length === 0 && (
              <li className="px-3 py-3 text-sm text-slate-500">No country found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
