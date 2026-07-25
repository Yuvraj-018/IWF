import { Link, useLocation } from "@tanstack/react-router";
import newLogo from "@/assets/new logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Impact", to: "/impact" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact Us", to: "/contact" },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src={newLogo} alt="IWF Logo" className="w-12 h-12 object-contain" />
          <div className="leading-tight">
            <div className="text-lg font-extrabold text-brand-green">IWF</div>
            <div className="text-[10px] font-semibold text-brand-green-dark tracking-wider">ISLAH WELFARE<br />FOUNDATION</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground">
          {navItems.map((n) => {
            const isActive = location.pathname === n.to || (n.to !== "/" && location.pathname.startsWith(n.to));
            return (
              <Link 
                key={n.label} 
                to={n.to} 
                className={`hover:text-brand-green transition ${isActive ? "text-brand-green" : ""}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/membership"
            className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm px-5 py-2.5 rounded shadow transition"
          >
            Become Member
          </Link>
          <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm px-5 py-2.5 rounded shadow transition">
            DONATE NOW
          </button>
        </div>
      </div>
    </header>
  );
}
