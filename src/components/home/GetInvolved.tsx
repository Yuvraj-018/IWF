import { Hand, HandHeart, Heart, Users, Briefcase } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function GetInvolved() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>Get Involved</SectionTitle>
        <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto mb-6">Islah's doors are always open to individuals, corporates, and institutions. Whether you have time, skills, resources, or ideas — there is a place for you here. Join us in being a drop that makes the ocean.</p>
        <div className="bg-white border border-slate-100 shadow-sm rounded-md p-6 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
          {[
            { icon: Hand, l: "Volunteer", s: "Give your time & skills" },
            { icon: HandHeart, l: "Partner", s: "CSR & collaborations" },
            { icon: Heart, l: "Sponsor", s: "Fund a programme" },
            { icon: Users, l: "Mentor", s: "Guide the next generation" },
            { icon: Briefcase, l: "Employee", s: "Build a career with purpose" },
          ].map((i) => (
            <div key={i.l} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-2">
                <i.icon className="w-5 h-5 text-brand-green" />
              </div>
              <div className="text-sm font-bold">{i.l}</div>
              <div className="text-[11px] text-slate-500">{i.s}</div>
            </div>
          ))}
          <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded">DONATE NOW</button>
        </div>
      </div>
    </section>
  );
}
