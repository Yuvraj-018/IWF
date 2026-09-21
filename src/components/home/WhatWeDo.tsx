import { GraduationCap, HeartPulse, Users, Wrench, Scale, Sprout, Leaf, Megaphone } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function WhatWeDo() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>What We Do</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: GraduationCap, l: "Education & Learning", s: "Learning Centres & Scholarships", href: "/programs/education" },
            { icon: HeartPulse, l: "Healthcare & Well-being", s: "Free camps, care & awareness", href: "/programs/healthcare" },
            { icon: Users, l: "Women & Youth Empowerment", s: "SHGs, skills & financial literacy", href: "/programs/women-empowerment" },
            { icon: Wrench, l: "Skills, Livelihoods & Entrepreneurship", s: "Vocational & entrepreneurship", href: "/programs/skills-development" },
            { icon: Scale, l: "Social Justice & Legal Empowerment", s: "Rights literacy & legal aid", href: "/programs/social-justice" },
            { icon: Sprout, l: "Agriculture & Rural Livelihoods", s: "Sustainable farming & income", href: "/programs/agriculture" },
            { icon: Leaf, l: "Environment & Sustainable Development", s: "Plantation & clean villages", href: "/programs/environment" },
            { icon: Megaphone, l: "Humanitarian Relief & Rehabilitation", s: "Disaster aid & recovery", href: "/programs/relief-and-rehabilitation" },
          ].map(({ icon: Icon, l, s, href }) => (
            <a key={l} href={href} className="bg-white rounded-md p-5 text-center shadow-sm border border-slate-100 hover:shadow-md transition block group">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6 text-brand-green" />
              </div>
              <div className="text-xs font-semibold text-slate-700 group-hover:text-brand-green transition-colors">{l}</div>
              <div className="text-[10px] text-slate-500 mt-1">{s}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
