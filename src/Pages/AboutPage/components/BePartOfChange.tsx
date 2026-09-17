import footerBg from "@/assets/footer-bg.jpg";

interface BePartOfChangeProps {
  onOpenModal: (type: "volunteer" | "partner" | "sponsor" | "mentor" | "employee") => void;
}

export default function BePartOfChange({ onOpenModal }: BePartOfChangeProps) {
  return (
    <section id="be-part-of-change" className="relative py-24 text-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={footerBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#0b1f3b]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide mb-4">
          Be Part of the{" "}
          <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange/60">
            CHANGE
          </span>
        </h2>
        <p className="text-slate-300 text-base mb-10 max-w-xl mx-auto">
          Whether you want to donate, volunteer, or partner with us — there is a place for you at Islah. Together, we can build a better tomorrow for thousands of families across India.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onOpenModal("sponsor")}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded shadow-lg uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95"
          >
            DONATE NOW
          </button>
          <a
            href="#"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95"
          >
            GET INVOLVED
          </a>
          <button
            onClick={() => onOpenModal("partner")}
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95"
          >
            PARTNER WITH US
          </button>
        </div>
      </div>
    </section>
  );
}
