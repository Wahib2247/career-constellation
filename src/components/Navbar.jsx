import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/projects", label: "Projects" },
  { to: "/governance", label: "Governance Lab" },
  { to: "/investments", label: "Capital Allocation" },
  { to: "/research", label: "Research" },
  { to: "/pilots", label: "Pilots" },
  { to: "/reflections", label: "Reflections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-white/70 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-playfair">W</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-slate-900 tracking-tight">Wahib</span>
              <span className="text-xs text-slate-400 block leading-none tracking-widest uppercase">Governance & EdTech Lab</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
