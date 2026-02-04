import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { projects, pageTexts } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'prototype': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'concept': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'simulation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'research draft': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Bento Span Logic
  const getSpanClass = (index) => {
    if (index === 0) return "md:col-span-2 lg:col-span-12";
    if (index === 1 || index === 2) return "md:col-span-1 lg:col-span-6";
    return "md:col-span-1 lg:col-span-6";
  };

  return (
    <section className="relative max-w-[1400px] mx-auto px-6 sm:px-12 pt-32 pb-24 min-h-screen bg-[#F8FAFC]">

      {/* ----------------- GLOBAL BACKGROUND ----------------- */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

      {/* ----------------- HERO HEADER ----------------- */}
      <div className={`mb-24 text-center max-w-3xl mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-slate-500 uppercase bg-white rounded-full border border-slate-200 shadow-sm">
          Index of Explorations
        </span>
        <h1 className="text-5xl sm:text-6xl font-serif font-bold text-slate-900 leading-tight mb-8">
          Active Research <br />
          <span className="text-slate-400 italic">Explorations</span>
        </h1>
        <p className="text-xl text-slate-500 font-light leading-relaxed">
          {pageTexts.projects.description.split('.')[0]}.
        </p>
      </div>

      {/* ----------------- BENTO GRID ----------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {projects.map((project, index) => (
          <Link
            to={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
            key={project.name}
            className={`group relative bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col ${getSpanClass(index)} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Top Right Corner Inverse Decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#F8FAFC] rounded-bl-[2.5rem] z-10 pointer-events-none group-hover:bg-blue-50 transition-colors duration-500"></div>
            <div className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
              <img src={arrow} className="w-4 h-4 -rotate-45 opacity-30 group-hover:opacity-100 group-hover:invert transition-all" />
            </div>

            {/* Top Row: Domain & Status */}
            <div className="relative z-10 flex justify-between items-start mb-6 pr-16">
              <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {project.domain || "Research"}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(project.status)}`}>
                {project.status || "Concept"} mode
              </span>
            </div>

            {/* Research Question (The Hook) */}
            <div className="relative z-10 mb-6 flex-1">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Research Question</h3>
              <p className="text-2xl font-serif font-medium text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                {project.researchQuestion || "How can we improve this system?"}
              </p>
            </div>

            {/* Project Identity */}
            <div className="relative z-10 flex items-center gap-4 mt-auto border-t border-slate-100 pt-6">
              <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100`}>
                <img src={project.iconUrl} alt={project.name} className="w-full h-full object-contain opacity-80" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:underline decoration-blue-200 underline-offset-4 decoration-2">{project.name}</h2>
                <p className="text-xs text-slate-400">View Case Study</p>
              </div>
            </div>

          </Link>
        ))}
      </div>

      {/* ----------------- FOOTER CTA ----------------- */}
      <div className="mt-32 text-center pb-12">
        <div className="inline-flex items-center justify-center w-16 h-1 bg-slate-200 rounded-full mb-8"></div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Transmission Ends</p>
        <p className="text-slate-500 font-light max-w-lg mx-auto leading-relaxed">
          The index is constantly updating. Do you have a research query? <br />
          <Link to="/contact" className="text-blue-600 font-medium hover:text-blue-800 border-b border-blue-200 hover:border-blue-600 transition-colors">Submit a new variable.</Link>
        </p>
      </div>

    </section>
  );
};

export default Projects;
