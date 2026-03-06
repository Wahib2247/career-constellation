import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/", label: "OVERVIEW", exact: true },
  { to: "/projects", label: "SIMULATIONS" },
  { to: "/governance", label: "GOVERNANCE" },
  { to: "/investments", label: "CAPITAL" },
  { to: "/research", label: "RECORDS" },
  { to: "/reflections", label: "JOURNAL" },
  { to: "/about", label: "LABORATORY" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
          ? "bg-paper/95 backdrop-blur-md shadow-sm border-ink/10"
          : "bg-paper/70 backdrop-blur-sm border-transparent"
          }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-12 flex items-center justify-between font-mono">
          {/* Logo / System ID */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="flex flex-col leading-none">
              <span className="text-xs font-black tracking-[0.2em] text-ink uppercase">Institutional Archive</span>
              <span className="text-[11px] text-ink/40 mt-1 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                System Online // v1.2.0
              </span>
            </div>
          </Link>

          {/* Desktop Nav - High Density */}
          <nav className="hidden xl:flex items-center gap-0 border-x border-ink/[0.08] h-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `px-5 h-full flex items-center text-xs font-black tracking-widest transition-all duration-200 border-r border-ink/[0.08] last:border-r-0 ${isActive
                    ? "bg-ink text-paper"
                    : "text-ink/60 hover:text-ink hover:bg-ink/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Status */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end leading-none">
              <span className="text-[10px] text-ink/40 uppercase tracking-tighter font-black">Terminal ID</span>
              <span className="text-xs text-ink font-black font-mono">WAHIB_ARCHIVE_01</span>
            </div>
            <Link to="/contact" className="px-6 py-2 bg-ink text-paper text-xs font-black tracking-[0.2em] uppercase hover:bg-ink/90 transition-all shadow-md">
              Access enquiry
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-ink hover:bg-ink/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-paper border-t border-ink/10 font-mono">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-4 text-[11px] font-bold tracking-widest border-b border-ink/[0.08] ${isActive
                    ? "bg-ink text-paper"
                    : "text-ink/60 hover:bg-ink/5 hover:text-ink"
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
