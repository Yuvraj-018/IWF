import { Eye } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase text-brand-green-dark">
        {children}
      </h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

export default function LongTermVision() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>🌿 OUR LONG-TERM VISION</SectionTitle>

        <div className="grid lg:grid-cols-2 gap-12 items-start mt-8">
          {/* LEFT: Text */}
          <div className="flex flex-col gap-6">
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              Islah Welfare Foundation (Islah) envisions a progressive, inclusive, and self-reliant India by the year 2047—marking 100 years of independence—where every individual has access to quality education, healthcare, dignified housing, and sustainable livelihood opportunities.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              "Vision 2047" is an ambitious and transformative roadmap aimed at uplifting millions of underserved and marginalized people across the country through a structured and integrated development approach.
            </p>
          </div>

          {/* RIGHT: Card */}
          <div className="bg-[#0b1f3b] text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
            <div className="inline-flex items-center gap-2 bg-brand-green/30 px-3 py-1.5 rounded-full mb-6">
              <Eye className="w-4 h-4 text-white" />
              <span className="font-bold text-xs uppercase tracking-wider">VISION STATEMENT</span>
            </div>

            {/* <span className="text-brand-orange text-8xl font-serif leading-none block mb-2 opacity-60">"</span> */}

            <p className="text-white font-semibold text-base md:text-lg leading-relaxed italic">
              To create an equitable and empowered society where every individual has the opportunity, resources, and dignity to lead a meaningful life.
            </p>

            <p className="text-brand-orange text-xs font-bold tracking-wider mt-4">
              — Islah Welfare Foundation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
