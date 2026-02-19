import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "Navigation",
      links: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Institutional Repositories",
      links: [
        { label: "Project Index", to: "/projects" },
        { label: "Governance Lab", to: "/governance" },
        { label: "Capital Allocation Lab", to: "/investments" },
        { label: "Technical Prototypes", to: "/prototypes" },
      ],
    },
    {
      title: "Knowledge Base",
      links: [
        { label: "Research & Whitepapers", to: "/research" },
        { label: "Pilot Empirical Reports", to: "/pilots" },
        { label: "Laboratory Reflections", to: "/reflections" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-white selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand & Quote */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                W
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Wahib<span className="text-blue-500">.</span>Research
              </span>
            </Link>

            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm">
              Designing democratic systems that decentralize institutional power and democratize education. Building the architecture for a more equitable future through systems thinking and behavioral economics.
            </p>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-8 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />
              <p className="text-slate-300 font-medium italic relative z-10">
                "Life is short, sleep is eternal"
              </p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-3 font-bold">Personal Directive</p>
            </div>

            <div className="flex gap-4">
              {[
                {
                  label: 'Mail', href: 'mailto:wahibb07@gmail.com', icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  label: 'LinkedIn', href: 'https://linkedin.com', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )
                },
                {
                  label: 'GitHub', href: 'https://github.com/Wahib2247', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )
                }
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-[0.9rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 hover:border-white hover:-translate-y-1 transition-all group shadow-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 pb-2 border-b border-white/5">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[13px] text-slate-400 hover:text-blue-400 hover:translate-x-1.5 inline-block transition-all duration-300 font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-slate-500 text-[11px] font-medium">
              © {year} Wahib2247 · Governance & EdTech Research Lab
            </p>
            <p className="text-slate-700 text-[9px] tracking-[0.2em] font-black">
              PROTOTYPING POSITIVE SUM REVOLUTIONS
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Status: Verified Research</span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
