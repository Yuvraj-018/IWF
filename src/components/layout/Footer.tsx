import {
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  MapPin, Phone, Mail, Heart, Award, ShieldCheck, Hand
} from "lucide-react";
import footerBg from "@/assets/footer-bg.jpg";
import newLogo from "@/assets/new logo.png";

export function Footer() {
  return (
    <footer className="relative text-white">
      <div className="absolute inset-0">
        <img src={footerBg} alt="" loading="lazy" width={1600} height={600} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-green-darker/95" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4 bg-[#fdfbf7] p-3 rounded-2xl w-fit">
            <img src={newLogo} alt="IWF Logo" className="w-12 h-12 object-contain" />
            <div className="leading-tight">
              <div className="font-extrabold text-black">ISLAH</div>
              <div className="text-[10px] tracking-wider text-black">WELFARE FOUNDATION</div>
            </div>
          </div>
          <p className="text-sm text-white/80">Islah Welfare Foundation is committed to empowering underprivileged communities through education, skill development, healthcare and social welfare initiatives for a better tomorrow.</p>
          <p className="text-xs text-white/60 mt-3 italic">"We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop." — Mother Teresa</p>
          <div className="mt-4">
            <div className="text-xs font-semibold mb-2">FOLLOW US</div>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center"><Icon className="w-4 h-4" /></a>
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
              {col.items.map((i) => <li key={i} className="hover:text-white"><a href="#">{i}</a></li>)}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-bold mb-3 text-sm flex items-center gap-2"><span className="w-1.5 h-4 bg-brand-orange" /> CONTACT US</h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" /> Bathiya, Darbhanga, Bihar – 847423, India</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" /> +91 9811861633 &nbsp;|&nbsp; +91 6272 288697</li>
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
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-1 border border-slate-300 rounded-l px-3 py-2 text-sm" placeholder="Enter your email address" />
              <button type="submit" className="bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-5 rounded-r">SUBSCRIBE</button>
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
              { icon: ShieldCheck, t: "Transparency", d: "We are open and honest in all our actions and financial operations — every rupee is accounted for and reported." },
              { icon: Hand, t: "Accountability", d: "We hold ourselves and our partners accountable for project outcomes, ensuring commitments are met with integrity." },
              { icon: Heart, t: "Compassion", d: "We care for people and the communities we serve, remaining sensitive to their needs, dignity, and aspirations." },
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
  );
}
