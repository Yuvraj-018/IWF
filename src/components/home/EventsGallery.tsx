import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import { SectionTitle } from "./SectionTitle";

export function EventsGallery() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
        <div>
          <SectionTitle>Events & Notices</SectionTitle>
          <div className="space-y-3">
            {[
              { d: "25", m: "MAY", title: "Free Health Camp — Bathiya, Darbhanga", desc: "Free check-up camp under our 'Health Cannot Wait' initiative. Open to all community members. Medicines and consultations provided free of charge." },
              { d: "05", m: "JUN", title: "World Environment Day Plantation Drive", desc: "Tree plantation & sustainability awareness drive in local villages — part of Islah's Environment & Rural Livelihood programme. Join us to plant saplings." },
              { d: "15", m: "JUL", title: "Shiksha Na Ruke — Scholarship Distribution", desc: "Islah distributes scholarships to bright students under the 'Shiksha Na Ruke' campaign. Supporting eligible students for a better, educated tomorrow." },
            ].map((e) => (
              <div key={e.title} className="bg-white rounded-md p-4 flex gap-4 items-center border border-slate-100 shadow-sm">
                <div className="text-center bg-brand-green/10 rounded px-3 py-2 w-16">
                  <div className="text-xs font-bold text-brand-green">{e.m}</div>
                  <div className="text-xl font-extrabold text-brand-green-dark">{e.d}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{e.title}</h4>
                  <p className="text-xs text-slate-600">{e.desc}</p>
                </div>
                <a href="#" className="text-xs font-semibold text-brand-green whitespace-nowrap">View Details →</a>
              </div>
            ))}
            <button className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm py-2.5 rounded">VIEW ALL EVENTS</button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <SectionTitle>Gallery</SectionTitle>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[g1, g2, g3, g4, g5, g6].map((src, i) => (
              <div key={i} className="aspect-square rounded-md overflow-hidden">
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" width={600} height={600} className="w-full h-full object-cover hover:scale-110 transition" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
