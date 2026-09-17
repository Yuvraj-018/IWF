import { Eye, Target } from "lucide-react";
import overviewImg from "@/assets/cause-education.jpg";

export default function OverviewSection() {
  return (
    <section id="overview" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">

        {/* Left — Overview text */}
        <div>
          <p className="text-brand-green font-bold text-xs uppercase tracking-widest mb-4">🌿 OVERVIEW</p>
          <div className="space-y-4">
            {[
              "The Islah Welfare Foundation (Islah) is a public charitable trust working for the socio-economic development of the weaker sections of society.",
              "The Islah is working to establish multifarious institutions for the betterment of weaker sections of society. Education, healthcare, micro-finance and women empowerment are some of the areas the Islah is mainly focusing upon.",
              "The goal of the foundation is to help create a society where everyone is equal and prosperous, and there is justice for all. With an aim to reduce the gap between haves and have-nots, the Islah is working to provide all the basic resources to the poor and needy that are necessary to live, survive and grow gracefully in a society.",
            ].map((para, i) => (
              <p key={i} className="border-l-4 border-brand-green pl-4 text-sm text-slate-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Overview image */}
          <div className="mt-8 rounded-xl overflow-hidden h-52">
            <img src={overviewImg} alt="Islah Overview" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right — Vision + Mission cards */}
        <div className="flex flex-col gap-5">
          {/* Vision Card */}
          <div className="bg-brand-green text-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest text-white/80">OUR VISION</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              To create an equitable and empowered society where every individual has the opportunity, resources, and dignity to lead a meaningful life.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-[#0b1f3b] text-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-brand-orange" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest text-white/80">OUR MISSION</span>
            </div>
            <ul className="space-y-3">
              {[
                "To uplift underdeveloped communities through sustainable development initiatives",
                "To improve access to quality education and healthcare",
                "To promote self-reliance through skill development and livelihood programs",
                "To empower women and marginalised groups",
                "To create long-term, measurable social impact",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/85 leading-relaxed">
                  <span className="text-brand-orange font-bold mt-0.5 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
