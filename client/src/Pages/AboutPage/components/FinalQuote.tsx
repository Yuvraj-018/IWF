export default function FinalQuote({ onOpenModal }: { onOpenModal: (type: "volunteer" | "partner" | "sponsor" | "mentor" | "employee") => void }) {
  return (
    <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#0c2340] py-20 px-4 text-center border-t border-slate-800">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-brand-orange text-6xl md:text-8xl font-serif leading-none mb-4 block">"</span>
        
        <p className="text-white text-xl md:text-3xl font-semibold leading-relaxed italic mb-8">
          Vision 2047 is not just a goal—it is a commitment to build an empowered, equitable, and self-reliant India where no one is left behind.
        </p>
        
        <div className="flex items-center justify-center gap-3 w-full max-w-md mx-auto mb-10">
          <span className="h-px flex-1 bg-white/30" />
          <span className="text-brand-orange font-bold text-sm tracking-widest uppercase">Islah Welfare Foundation</span>
          <span className="h-px flex-1 bg-white/30" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => onOpenModal("sponsor")}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded shadow-lg uppercase tracking-wider transition-colors cursor-pointer"
          >
            Donate Now
          </button>
          <button 
            onClick={() => onOpenModal("volunteer")}
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded uppercase tracking-wider transition-colors cursor-pointer"
          >
            Get Involved
          </button>
          <button 
            onClick={() => onOpenModal("partner")}
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded uppercase tracking-wider transition-colors cursor-pointer"
          >
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
}
