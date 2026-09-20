import { Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-brand-green text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-5">
          <a href="tel:+919811861633" className="flex items-center gap-1.5 hover:opacity-80"><Phone className="w-3.5 h-3.5" /> +91-9811861633</a>
          <a href="mailto:info@iwfindia.org" className="flex items-center gap-1.5 hover:opacity-80"><Mail className="w-3.5 h-3.5" /> info@iwfindia.org</a>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2">Follow Us:</span>
          {[
            { Icon: Facebook, href: "https://www.facebook.com/islahindia/", label: "Facebook" },
            { Icon: Twitter, href: "https://x.com/islahindia/", label: "Twitter / X" },
            { Icon: Instagram, href: "https://www.instagram.com/islahwelfarefoundation/", label: "Instagram" },
            { Icon: Youtube, href: "https://www.youtube.com/channel/UC5sty9L25QQwC89JwGmEIVw/", label: "YouTube" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/islah-welfare-foundation-6a028b432/", label: "LinkedIn" },
          ].map(({ Icon, href, label }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center"><Icon className="w-3 h-3" /></a>
          ))}
        </div>
      </div>
    </div>
  );
}
