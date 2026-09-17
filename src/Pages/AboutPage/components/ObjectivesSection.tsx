import { Target, Globe, TrendingUp, Users, Scale, Eye, Binoculars, Rocket } from "lucide-react";

import objVisionImg from "@/assets/kite.png";
import objMissionImg from "@/assets/logo.png";
import img1 from "@/assets/cervical-cancer.jpg";
import img2 from "@/assets/thematic-agriculture.jpg";
import img3 from "@/assets/basic-need.png";

function ImgFallback({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`bg-brand-green/10 flex items-center justify-center ${className}`}>
      <span className="text-brand-green/40 text-xs font-medium text-center px-2">{label}</span>
    </div>
  );
}

export default function ObjectivesSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:rounded-2xl lg:overflow-hidden lg:shadow-xl">

          {/* LEFT: Objectives */}
          <div className="bg-[#0b1f3b] p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0">
                <Target className="text-brand-orange w-5 h-5" />
              </div>
              <h2 className="text-white font-bold text-sm uppercase tracking-widest">Our Objectives</h2>
            </div>

            <div className="flex flex-col">
              {[
                {
                  icon: Globe,
                  text: "To strive for holistic and sustainable development work among the poor, marginalised, downtrodden, illiterate, vulnerable and the exploited ones, irrespective of their caste, creed, language, sex or religion."
                },
                {
                  icon: TrendingUp,
                  text: "A positive socio-economic life to bring change in the lives of deprived communities and to uplift their status at par with the national average thematic areas in of human development."
                },
                {
                  icon: Users,
                  text: "To enable them to contribute towards nation-building in all spheres of life."
                },
                {
                  icon: Scale,
                  text: "Striving for a just society and to make India compassionate, in which all citizens of the nation can achieve their optimum potential."
                }
              ].map((obj, i) => (
                <div key={i} className="border-b border-white/10 pb-5 mb-5 last:border-0 last:mb-0 flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-green/30 rounded-full flex items-center justify-center shrink-0">
                    <obj.icon className="text-brand-green w-5 h-5" />
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed">{obj.text}</p>
                </div>
              ))}
            </div>
            <div>
              <img
                src={objVisionImg}
              />
            </div>
          </div>

          {/* CENTER: Vision */}
          <div className="bg-white p-8 lg:col-span-1">
            <div className="bg-brand-green text-white rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
              <Eye className="w-5 h-5 shrink-0" />
              <span className="font-bold text-sm uppercase tracking-widest">Our Vision &amp; Mission</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Binoculars className="text-brand-orange w-5 h-5 shrink-0" />
              <h3 className="text-brand-green-dark font-bold text-base">OUR VISION</h3>
            </div>
            <img
              src={objMissionImg}
              className="w-full h-44 object-cover rounded-lg mb-5"
            />
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Islah Welfare Foundation (Islah) is planning to create educational, health and housing facilities to improve the lot of millions of poor people in the country under Islah Welfare Foundation as "Vision 2047".
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              "Vision 2047" is an ambitious plan to bring about transformation in the social landscape of the country. The plan envisages the establishment of multifarious institutions across the country.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              It serves the purpose of humanity and the Almighty as well. It is dedicated to going beyond charity by enabling people to reach their fullest extent. It calls for a society with equality for the maximum of the masses at large. It enables the have-nots to access the resources for a total change in their lives and hence promotes the country to step into a new world. It helps people meet their social and spiritual needs through their own efforts. It is all about a total upliftment of the Indian society with a view to vertical mobility of every individual and group of people.
            </p>

            <div className="bg-brand-green/8 border-l-4 border-brand-green rounded-r-lg p-4 mt-4 text-xs text-slate-600 italic leading-relaxed">
              We don't know how many years it will take us to do it, but it will continue till the day we don't see any kid on the streets begging and picking up rags and instead study in schools or play in the playground, enjoying the innocence of their childhood.
            </div>
          </div>

          {/* RIGHT: Mission */}
          <div className="bg-slate-50 p-8 lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <Rocket className="text-brand-orange w-5 h-5 shrink-0" />
              <h3 className="text-brand-green-dark font-bold text-base">OUR MISSION</h3>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Our mission is to serve the poor and deprived sections of society by providing them with basic amenities like education, healthcare, food and shelter that equip individuals to become an equal partner in the progress of the nation and by helping the sufferers of natural calamities to move towards a world free from hunger, ignorance, deprivation and exploitation.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              The Islah Welfare Foundation (Islah) is engaged in helping people with little or no resources. With the high spirit and dedication of its volunteers, Islah strives to alleviate human suffering and to help them achieve real improvement in the quality of their lives.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-6">
              <img
                src={img1}
                className="h-24 w-full object-cover rounded-md"
              />
              <img
                src={img2}
                className="h-24 w-full object-cover rounded-md"
              />
              <img
                src={img3}
                className="h-24 w-full object-cover rounded-md"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
