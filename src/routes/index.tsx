import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin,
  GraduationCap, HeartPulse, Users, Sprout, Wrench, Leaf,
  BookOpen, Stethoscope, Hand, Tractor, MapPin, Calendar,
  ArrowRight, Award, ShieldCheck, Heart, HandHeart, Briefcase,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import causeEdu from "@/assets/cause-education.jpg";
import causeMed from "@/assets/cause-medical.jpg";
import causeWomen from "@/assets/cause-women.jpg";
import thEnv from "@/assets/thematic-environment.jpg";
import thEnt from "@/assets/thematic-entrepreneur.jpg";
import thWom from "@/assets/thematic-women.jpg";
import thAgr from "@/assets/thematic-agriculture.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import footerBg from "@/assets/footer-bg.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const navItems = ["Home", "About Us", "Programs", "Impact", "Get Involved", "Contact Us"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide uppercase">{children}</h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      {/* Top utility bar */}
      <div className="bg-brand-green text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a className="flex items-center gap-1.5 hover:opacity-80"><Phone className="w-3.5 h-3.5" /> +91-9801812625</a>
            <a className="flex items-center gap-1.5 hover:opacity-80"><Mail className="w-3.5 h-3.5" /> info@iwfindia.org</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-2">Follow Us:</span>
            {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a key={i} className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center"><Icon className="w-3 h-3" /></a>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-extrabold text-brand-green">IWF</div>
              <div className="text-[10px] font-semibold text-brand-green-dark tracking-wider">ISLAH WELFARE<br />FOUNDATION</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground">
            {navItems.map((n, i) => (
              <a key={n} className={`hover:text-brand-green transition ${i === 0 ? "text-brand-green" : ""}`}>{n}</a>
            ))}
          </nav>
          <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm px-5 py-2.5 rounded shadow transition">
            DONATE NOW
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[520px] md:h-[600px] overflow-hidden">
          <img src={hero} alt="Empowering lives in rural India" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <p className="text-sm md:text-base mb-3 font-medium">Empowering Youth · Enriching Communities · Transforming Lives</p>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Empowering Lives Through<br />
                <span className="text-brand-orange">Education</span>, <span className="text-brand-orange">Healthcare</span><br />
                & <span className="text-brand-orange">Livelihood</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/90">Your support creates real change in rural India.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-3 rounded shadow-lg transition">DONATE NOW</button>
                <button className="bg-white/95 hover:bg-white text-brand-green-dark font-semibold px-6 py-3 rounded shadow-lg transition">GET INVOLVED</button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
          <div className="bg-brand-green text-white rounded-md shadow-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { icon: Users, n: "5,000+", l: "Lives Impacted" },
              { icon: HeartPulse, n: "100+", l: "Health Camps" },
              { icon: GraduationCap, n: "2,000+", l: "Students Supported" },
              { icon: Leaf, n: "10,000+", l: "Beneficiaries" },
            ].map(({ icon: Icon, n, l }) => (
              <div key={l} className="p-5 flex items-center gap-3 justify-center">
                <Icon className="w-9 h-9 opacity-90" />
                <div>
                  <div className="text-2xl font-extrabold">{n}</div>
                  <div className="text-xs opacity-90">{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle>Featured Causes</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: causeEdu, icon: BookOpen, title: "Child Education", desc: "Support school fees, learning materials and better future.", raised: "1,65,240", pct: 75 },
              { img: causeMed, icon: Stethoscope, title: "Medical Help", desc: "Support free care, medicines and health camps.", raised: "2,12,880", pct: 48 },
              { img: causeWomen, icon: Users, title: "Women Empowerment", desc: "Empower women through skills, training and livelihoods.", raised: "1,48,720", pct: 60 },
            ].map((c) => (
              <article key={c.title} className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-100">
                <div className="relative h-44">
                  <img src={c.img} alt={c.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-brand-green" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{c.desc}</p>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>₹ {c.raised} Raised</span>
                    <span>{c.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green" style={{ width: `${c.pct}%` }} />
                  </div>
                  <button className="mt-4 w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm py-2.5 rounded transition">DONATE NOW</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle>What We Do</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: GraduationCap, l: "Education" },
              { icon: HeartPulse, l: "Healthcare" },
              { icon: Users, l: "Women Empowerment" },
              { icon: Sprout, l: "Rural Development" },
              { icon: Wrench, l: "Skill Development" },
              { icon: Leaf, l: "Environment Protection" },
            ].map(({ icon: Icon, l }) => (
              <div key={l} className="bg-white rounded-md p-5 text-center shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-brand-green" />
                </div>
                <div className="text-xs font-semibold text-slate-700">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs + Major Thematic */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          {/* Programs */}
          <div>
            <SectionTitle>Our Programs</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Education Support", desc: "Quality education support for underprivileged children." },
                { icon: HeartPulse, title: "Healthcare Camps", desc: "Organising free health checkups and awareness camps." },
                { icon: Users, title: "Women Empowerment", desc: "Skill training, livelihood support and self-reliance programs." },
                { icon: Sprout, title: "Rural Development", desc: "Working for better infrastructure and sustainable rural growth." },
              ].map((p) => (
                <div key={p.title} className="bg-white rounded-md p-5 border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-md bg-brand-orange/15 flex items-center justify-center mb-3">
                    <p.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-600 mb-2">{p.desc}</p>
                  <a className="text-xs font-semibold text-brand-green inline-flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></a>
                </div>
              ))}
            </div>
          </div>

          {/* Thematic */}
          <div>
            <SectionTitle>Major Thematic Areas</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              {[
                { img: thEnv, l: "Environment Conservation" },
                { img: thEnt, l: "Entrepreneurship & Skills" },
                { img: thWom, l: "Women Empowerment" },
                { img: thAgr, l: "Agriculture Support" },
              ].map((t) => (
                <div key={t.l} className="relative h-40 rounded-md overflow-hidden group">
                  <img src={t.img} alt={t.l} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white font-semibold text-sm">{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events & Gallery */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionTitle>Events & Notices</SectionTitle>
            <div className="space-y-3">
              {[
                { d: "25", m: "MAY", title: "Free Health Camp in Bathiya", desc: "Join us for a free health check-up camp for the local community." },
                { d: "05", m: "JUN", title: "World Environment Day Drive", desc: "Tree plantation & awareness drive in local villages." },
                { d: "15", m: "JUL", title: "Scholarship Distribution Program", desc: "Supporting bright students for a better tomorrow." },
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
                  <a className="text-xs font-semibold text-brand-green whitespace-nowrap">View Details →</a>
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

      {/* Get Involved */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle>Get Involved</SectionTitle>
          <div className="bg-white border border-slate-100 shadow-sm rounded-md p-6 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
            {[
              { icon: Hand, l: "Volunteer", s: "Join our team" },
              { icon: HandHeart, l: "Partner", s: "Collaborate with us" },
              { icon: Heart, l: "Sponsor", s: "Support a cause" },
              { icon: Users, l: "Mentor", s: "Share your expertise" },
              { icon: Briefcase, l: "Employee", s: "Work with us" },
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

      {/* Footer */}
      <footer className="relative text-white">
        <div className="absolute inset-0">
          <img src={footerBg} alt="" loading="lazy" width={1600} height={600} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-green-darker/95" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white text-brand-green flex items-center justify-center"><Leaf className="w-6 h-6" /></div>
              <div className="leading-tight">
                <div className="font-extrabold">ISLAH</div>
                <div className="text-[10px] tracking-wider">WELFARE FOUNDATION</div>
              </div>
            </div>
            <p className="text-sm text-white/80">Islah Welfare Foundation is committed to empowering underprivileged communities through education, skill development, healthcare and social welfare initiatives for a better tomorrow.</p>
            <div className="mt-4">
              <div className="text-xs font-semibold mb-2">FOLLOW US</div>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <a key={i} className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center"><Icon className="w-4 h-4" /></a>
                ))}
              </div>
            </div>
          </div>

          {[
            { t: "QUICK LINKS", items: ["About Us", "What We Do", "Our Programs", "Impact Stories", "Media Center", "Careers", "Get In Touch"] },
            { t: "MANAGEMENT", items: ["Board of Trustees", "Executive Body", "Advisory Board", "Policies & Documents", "Annual Reports"] },
            { t: "LEGAL", items: ["Certificates", "FCRA", "12A & 80G", "Privacy Policy", "Terms & Conditions", "Refund Policy"] },
          ].map((col) => (
            <div key={col.t}>
              <h4 className="font-bold mb-3 text-sm flex items-center gap-2"><span className="w-1.5 h-4 bg-brand-orange" /> {col.t}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {col.items.map((i) => <li key={i} className="hover:text-white"><a>{i}</a></li>)}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-bold mb-3 text-sm flex items-center gap-2"><span className="w-1.5 h-4 bg-brand-orange" /> CONTACT US</h4>
            <ul className="space-y-3 text-sm text-white/85">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" /> Bathiya, Via- Pusa Mangacchi, Darbhanga, Bihar – 847425, India</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" /> +91 9801812625</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" /> info@iwfindia.org</li>
            </ul>
            <button className="mt-5 w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" /> DONATE NOW
            </button>
            <p className="text-[11px] text-center text-white/70 mt-2">Your support can change lives</p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative bg-white text-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-brand-green" />
                <h4 className="font-bold">STAY CONNECTED</h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">Subscribe to our newsletter and stay updated with our latest activities and impact.</p>
              <form className="flex">
                <input className="flex-1 border border-slate-300 rounded-l px-3 py-2 text-sm" placeholder="Enter your email address" />
                <button className="bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-5 rounded-r">SUBSCRIBE</button>
              </form>
            </div>
            <div>
              <div className="text-center text-xs font-bold tracking-wider text-slate-700 mb-3">WE ARE A TRUSTED ORGANIZATION</div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { icon: Award, l: "Registered Trust" },
                  { icon: ShieldCheck, l: "12A 80G Certified" },
                  { icon: Heart, l: "Impact Driven" },
                  { icon: ShieldCheck, l: "Secure & Transparent" },
                ].map((i) => (
                  <div key={i.l}>
                    <div className="w-10 h-10 mx-auto rounded-full bg-brand-orange/15 flex items-center justify-center mb-1">
                      <i.icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div className="text-[10px] font-semibold">{i.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-4 items-center">
              {[
                { icon: ShieldCheck, t: "Transparency", d: "We are open and honest in all our actions." },
                { icon: Hand, t: "Accountability", d: "We take responsibility for our commitments." },
                { icon: Heart, t: "Compassion", d: "We care for people and communities we serve." },
              ].map((v) => (
                <div key={v.t} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0"><v.icon className="w-4 h-4 text-brand-green" /></div>
                  <div>
                    <div className="font-bold text-sm">{v.t}</div>
                    <div className="text-xs text-slate-600">{v.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-100 text-center text-xs text-slate-600 py-3">
            © 2026 Islah Welfare Foundation. All Rights Reserved. &nbsp;·&nbsp; Privacy Policy &nbsp;·&nbsp; Terms & Conditions &nbsp;·&nbsp; Refund Policy
          </div>
        </div>
      </footer>
    </div>
  );
}
