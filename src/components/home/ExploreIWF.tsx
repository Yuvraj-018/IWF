import { Info, Target, BarChart2, Newspaper, UserCheck, MessageCircle, ArrowRight } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function ExploreIWF() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>Explore IWF</SectionTitle>
        <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto mb-10">Discover the full breadth of our work — from governance and programs to impact and opportunities to join us.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Info,
              page: "About Us",
              summary: "IWF is a public charitable trust dedicated to the socio-economic development of India's most vulnerable communities. Guided by 'Vision 2047', we are building an equitable, self-reliant India where every individual has access to education, healthcare, and a dignified livelihood. Our governance is rooted in transparency, accountability, and measurable impact.",
            },
            {
              icon: Target,
              page: "Programs",
              summary: "IWF runs structured programmes across Education, Healthcare, Women Empowerment, Skill Development, Rural Development, Environment & Sustainability, Entrepreneurship, and Relief & Rehabilitation. Each programme is community-driven, impact-monitored, and designed for lasting, scalable change at the grassroots level.",
            },
            {
              icon: BarChart2,
              page: "Impact",
              summary: "IWF has touched 5,000+ lives, conducted 100+ health camps, and supported 2,000+ students across rural India. We document every outcome through success stories, annual reports, and a live impact statistics dashboard — ensuring full transparency with every rupee contributed.",
            },
            {
              icon: Newspaper,
              page: "Media & Updates",
              summary: "Stay informed with the latest news, events, newsletters, press releases, and publications from IWF's field teams. Our gallery captures real moments of transformation from the communities we serve. Follow our updates to see your support in action.",
            },
            {
              icon: UserCheck,
              page: "Get Involved",
              summary: "Whether as a Volunteer, Partner, Sponsor, Mentor, or Employee — IWF welcomes everyone who wants to contribute. Our doors are open to individuals, corporates, and institutions. Every role, big or small, creates a ripple of positive change in the communities we serve.",
            },
            {
              icon: MessageCircle,
              page: "Contact Us",
              summary: "Reach IWF at our registered office in Bathiya, Darbhanga (Bihar) or connect with us in Patna, Delhi, or Meerut. Write to info@iwfindia.org or call +91 9811861633. We would love to hear your ideas, feedback, or offer of support.",
            },
          ].map((item) => (
            <div key={item.page} className="bg-white rounded-md p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-md bg-brand-orange/15 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-brand-green-dark">{item.page}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.summary}</p>
              <a href="#" className="text-xs font-semibold text-brand-green inline-flex items-center gap-1 hover:opacity-80 transition">Learn More <ArrowRight className="w-3 h-3" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
