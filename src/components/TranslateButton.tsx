import { useEffect, useRef, useState } from "react";
import { Languages, ChevronDown, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          containerId: string
        ) => void;
      };
    };
    googleTranslateElementInit: () => void;
    _iwfTranslateReady: boolean;
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────
const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";
const GOOGLE_TRANSLATE_ELEMENT_ID = "google_translate_element";
const SUPPRESSION_STYLE_ID = "goog-translate-suppress";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
];

const SUPPRESSION_CSS = `
  /* Hide Google's top banner frame */
  .goog-te-banner-frame.skiptranslate,
  .goog-te-banner-frame { display: none !important; }

  /* Reset body top offset that Google forces */
  body { top: 0 !important; position: static !important; }
  body.translated-ltr { top: 0 !important; }
  body.translated-rtl { top: 0 !important; }

  /* Hide the floating tooltip / balloon */
  #goog-gt-tt,
  .goog-te-balloon-frame { display: none !important; }

  /* Hide the skip translate iframe */
  iframe.skiptranslate { display: none !important; }

  /* Hide the widget container itself */
  #${GOOGLE_TRANSLATE_ELEMENT_ID} { display: none !important; }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function injectSuppressionStyle() {
  if (document.getElementById(SUPPRESSION_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = SUPPRESSION_STYLE_ID;
  style.textContent = SUPPRESSION_CSS;
  document.head.appendChild(style);
}

function injectTranslateContainer() {
  if (document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) return;
  const div = document.createElement("div");
  div.id = GOOGLE_TRANSLATE_ELEMENT_ID;
  div.style.display = "none";
  document.body.appendChild(div);
}

function loadGoogleTranslateScript(onReady: () => void) {
  if (window._iwfTranslateReady) { onReady(); return; }
  if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) return;

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en", includedLanguages: "hi,ur,bn,ta,te,kn,ml,mr,pa,gu,or", autoDisplay: false },
      GOOGLE_TRANSLATE_ELEMENT_ID
    );
    window._iwfTranslateReady = true;
    onReady();
  };

  const script = document.createElement("script");
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

function waitForCombo(cb: (select: HTMLSelectElement) => void, attempts = 0) {
  if (attempts > 60) return;
  const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (sel) { cb(sel); return; }
  setTimeout(() => waitForCombo(cb, attempts + 1), 50);
}

function getCookieLang(): string {
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : "en";
}

// Helper to switch language
function setGoogleLanguage(langCode: string, callback: () => void) {
  if (langCode === "en") {
    const past = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    const hostname = window.location.hostname;
    document.cookie = `googtrans=; ${past}; path=/`;
    document.cookie = `googtrans=; ${past}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=; ${past}; path=/; domain=.${hostname}`;
    try { window.location.reload(); } catch (_) {/* ignore */ }
  } else {
    waitForCombo((select) => {
      select.value = langCode;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      select.dispatchEvent(new Event("input", { bubbles: true }));
      setTimeout(callback, 500);
    });
  }
}

// ─── Floating Translate Widget (Bottom Left / Top Right) ───────────────────────
export function FloatingTranslateButton() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectSuppressionStyle();
    injectTranslateContainer();
    loadGoogleTranslateScript(() => {
      waitForCombo(() => {
        setIsReady(true);
        setCurrentLang(getCookieLang());
      });
    });

    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectLanguage = (code: string) => {
    setIsOpen(false);
    if (code === currentLang) return;
    setGoogleLanguage(code, () => {
      setCurrentLang(code);
    });
  };

  return (
    <div ref={dropdownRef} className="notranslate fixed top-20 right-3 z-[60] flex flex-col items-end gap-2" translate="no">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notranslate w-10 h-10 rounded-xl flex items-center justify-center bg-[#1a365d] hover:bg-[#254f8a] text-white shadow-2xl border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group relative"
        title="Change Website Language / भाषा बदलें"
        translate="no"
      >
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f97316]"></span>
        </span>
        <Languages className="w-5 h-5 shrink-0 text-white" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="notranslate bg-[#0b1f3b]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-2 w-52 flex flex-col gap-1 text-white animate-in slide-in-from-top-2 fade-in duration-200 max-h-80 overflow-y-auto" translate="no">
          <div className="px-2.5 py-1.5 text-[10px] font-black tracking-wider text-white/50 uppercase border-b border-white/5 mb-1 notranslate" translate="no">
            Select Language
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`notranslate flex items-center justify-between w-full px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left cursor-pointer ${
                currentLang === lang.code
                  ? "bg-brand-orange text-white"
                  : "hover:bg-white/10 text-white/90"
              }`}
              translate="no"
            >
              <span className="notranslate" translate="no">{lang.nativeName} ({lang.name})</span>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Inline Translate Button (Backward Compatible Header Pill) ────────────────
export function TranslateButton({ className = "" }: { className?: string }) {
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getCookieLang());
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectLanguage = (code: string) => {
    setIsOpen(false);
    setGoogleLanguage(code, () => {
      setCurrentLang(code);
    });
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div ref={dropdownRef} className="notranslate relative inline-block text-left" translate="no">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          notranslate flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30
          bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold
          transition-all duration-200 cursor-pointer select-none
          ${className}
        `}
        translate="no"
      >
        <Languages className="w-3.5 h-3.5 shrink-0" />
        <span className="notranslate" translate="no">{activeLangObj.nativeName}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {isOpen && (
        <div className="notranslate absolute right-0 mt-2 z-50 bg-[#0b1f3b]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-1.5 w-36 flex flex-col gap-0.5 text-white" translate="no">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`notranslate flex items-center justify-between w-full px-2.5 py-1.5 text-[11px] font-bold rounded-md transition-colors text-left cursor-pointer ${
                currentLang === lang.code
                  ? "bg-brand-orange text-white"
                  : "hover:bg-white/10 text-white/90"
              }`}
              translate="no"
            >
              <span className="notranslate" translate="no">{lang.nativeName}</span>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
