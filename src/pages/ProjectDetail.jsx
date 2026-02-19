import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { projects } from "../constants";
import { projectDetails } from "../constants/projectDetails";
import { arrow } from "../assets/icons";

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const project = projects.find(
    (p) => p.slug.toLowerCase() === projectSlug?.toLowerCase()
  );

  const slugToKeyMap = useMemo(() => ({
    "classfusion": "classfusion",
    "flowfund": "flowfund",
    "fundmylife": "fundmylife",
    "sarmayachain": "sarmayachain",
    "quarkcapital": "quarkcapital"
  }), []);

  const projectKey = slugToKeyMap[projectSlug?.toLowerCase()];
  const details = projectDetails[projectKey];

  // Theme Logic: Dynamic Colors based on Project Status/Theme
  const getThemeStyles = (key) => {
    const themes = {
      classfusion: { bg: "from-amber-200 via-yellow-100 to-amber-50", accent: "text-amber-700", border: "border-amber-200", shadow: "shadow-amber-900/10", blob: "bg-amber-400" },
      flowfund: { bg: "from-rose-200 via-pink-100 to-rose-50", accent: "text-rose-800", border: "border-rose-200", shadow: "shadow-rose-900/10", blob: "bg-rose-500" },
      fundmylife: { bg: "from-emerald-200 via-green-100 to-emerald-50", accent: "text-emerald-800", border: "border-emerald-200", shadow: "shadow-emerald-900/10", blob: "bg-emerald-500" },
      sarmayachain: { bg: "from-slate-300 via-gray-200 to-slate-100", accent: "text-slate-800", border: "border-slate-300", shadow: "shadow-slate-900/10", blob: "bg-slate-500" },
      quarkcapital: { bg: "from-blue-200 via-indigo-100 to-blue-50", accent: "text-blue-800", border: "border-blue-200", shadow: "shadow-blue-900/10", blob: "bg-blue-600" }
    };
    return themes[key] || themes.classfusion;
  };

  const theme = getThemeStyles(projectKey);

  if (!project || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-300">Signal Lost</h1>
          <Link to="/projects" className="text-blue-600 underline mt-4 block">Return to Index</Link>
        </div>
      </div>
    );
  }

  const fadeInUp = "transition-all duration-1000 ease-out";
  const getDelay = (idx) => isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12";

  return (
    <section className="relative w-full min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-200 selection:text-blue-900">

      {/* ---------------- 0. IMMERSIVE HERO WRAPPER ---------------- */}
      <div className={`relative w-full h-[85vh] overflow-hidden flex flex-col justify-end pb-24 px-6 sm:px-12`}>

        {/* Dynamic Moving Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-80 z-0`}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay z-0"></div>

        {/* Ambient Orbs */}
        <div className={`absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse ${theme.blob}`}></div>
        <div className={`absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 mix-blend-multiply ${theme.blob}`}></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">

          {/* Back Link */}
          <Link to="/projects" className="absolute -top-[20vh] left-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500/80 hover:text-slate-900 transition-colors backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 bg-white/10">
            <img src={arrow} className="w-3 h-3 rotate-180 opacity-50" /> Index
          </Link>

          {/* Pills */}
          <div className={`flex flex-wrap gap-4 mb-8 ${fadeInUp} ${getDelay(0)}`}>
            <div className="px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/50 rounded-full text-xs font-bold uppercase tracking-widest text-slate-800 shadow-sm">
              {details.status}
            </div>
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest text-slate-700">
              {details.domain}
            </div>
          </div>

          {/* Massive Title */}
          <h1 className={`text-6xl sm:text-8xl md:text-9xl font-serif font-black text-slate-900 leading-[0.9] tracking-tight mb-8 drop-shadow-sm ${fadeInUp} ${getDelay(1)}`} style={{ transitionDelay: '100ms' }}>
            {details.name}
          </h1>

          {/* Descriptor */}
          <p className={`text-xl sm:text-2xl md:text-3xl text-slate-700 font-light leading-relaxed max-w-3xl ${fadeInUp} ${getDelay(2)}`} style={{ transitionDelay: '200ms' }}>
            {details.descriptor}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <img src={arrow} className="w-6 h-6 rotate-90" />
        </div>
      </div>


      {/* ---------------- 1. MAIN RESEARCH CONTENT (BENTO GRID) ---------------- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 -mt-20 pb-32">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* --- BLOCK: PROBLEM (Left Large) --- */}
          <div className={`lg:col-span-8 bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 shadow-xl ${theme.shadow} ${fadeInUp} ${getDelay(3)}`}>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">01 / The Failing</span>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">Problem Statement</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              {details.problemStatement}
            </p>
          </div>

          {/* --- BLOCK: META (Right Vertical) --- */}
          <div className={`lg:col-span-4 bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative overflow-hidden group ${fadeInUp} ${getDelay(4)}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${theme.blob} blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity`}></div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 block">02 / The Variable</span>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Core Hypothesis</h3>
            </div>

            <p className="text-lg text-slate-300 italic font-serif leading-relaxed relative z-10">
              "{details.hypothesis}"
            </p>
          </div>

          {/* --- BLOCK: SYSTEM OVERVIEW (Full Width) --- */}
          <div className={`lg:col-span-12 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm mt-8 ${fadeInUp} ${getDelay(5)}`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">03 / System Maps</span>
                <h3 className="text-4xl font-serif font-bold text-slate-900">Architecture & Flows</h3>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm text-slate-400">System Actors: {details.systemOverview.actors.length}</p>
                <p className="text-sm text-slate-400">Mechanisms: {details.systemOverview.mechanisms.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h4 className={`text-lg font-bold ${theme.accent} mb-6 uppercase tracking-wider`}>Actors</h4>
                <ul className="space-y-4">
                  {details.systemOverview.actors.map((actor, i) => (
                    <li key={i} className="flex gap-4 items-center text-slate-700">
                      <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-mono text-xs text-slate-400 shadow-sm">{i + 1}</span>
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h4 className={`text-lg font-bold ${theme.accent} mb-6 uppercase tracking-wider`}>Incentive Mechanisms</h4>
                <ul className="space-y-4">
                  {details.systemOverview.mechanisms.map((mech, i) => (
                    <li key={i} className="flex gap-4 items-center text-slate-700">
                      <div className={`w-2 h-2 rounded-full ${theme.blob}`}></div>
                      {mech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="font-mono text-sm text-slate-500 mb-4 uppercase tracking-widest">Stack Architecture</p>
              <p className="text-lg text-slate-800 font-light">{details.architecture.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {details.architecture.components.map((comp, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 rounded text-xs text-slate-600 border border-slate-200">{comp}</span>
                ))}
              </div>
            </div>
          </div>

          {/* --- BLOCK: ARTIFACTS (Gallery) --- */}
          <div className={`lg:col-span-6 bg-[#0f172a] text-slate-300 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden relative ${fadeInUp} ${getDelay(6)}`}>
            <div className="absolute top-0 right-[-20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>

            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-6 block relative z-10">04 / Evidence</span>
            <h3 className="text-3xl font-serif font-bold text-white mb-8 relative z-10">Artifacts</h3>

            <div className="space-y-4 relative z-10">
              {details.researchArtifacts.map((artifact, i) => (
                <div key={i} className="group p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-white/10 px-2 py-0.5 rounded">{artifact.type}</span>
                    <img src={arrow} className="w-3 h-3 invert -rotate-45 opacity-50 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{artifact.label}</h4>
                  <p className="text-xs text-slate-400">{artifact.caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- BLOCK: SIMULATION (Data) --- */}
          <div className={`lg:col-span-6 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm ${fadeInUp} ${getDelay(7)}`}>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">05 / Simulation</span>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-8">Outcomes</h3>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-sm leading-relaxed mb-6">
              <p className="text-slate-500 uppercase text-[10px] mb-2 font-bold tracking-widest">Input Scenario</p>
              <p className="text-slate-700 mb-6">{details.simulation.scenario}</p>

              <div className="h-[1px] w-full bg-slate-200 mb-6"></div>

              <p className="text-emerald-600 uppercase text-[10px] mb-2 font-bold tracking-widest">Observed Result</p>
              <p className="text-slate-900 font-bold">{details.simulation.outcome}</p>
            </div>

            <div className="flex gap-4">
              {details.methodology.metrics.slice(0, 2).map((metric, i) => (
                <div key={i} className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Metric</p>
                  <p className="text-xs font-bold text-slate-700">{metric}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- BLOCK: ETHICS & NEXT STEPS (Footer Grid) --- */}
          <div className={`lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ${fadeInUp} ${getDelay(8)}`}>
            {/* Ethics */}
            <div className="bg-amber-50 rounded-[2rem] p-8 border border-amber-100">
              <h3 className="text-amber-900 font-serif font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠</span> Risk Analysis
              </h3>
              <ul className="space-y-4">
                {details.ethicalRisks.map((risk, i) => (
                  <li key={i} className="text-amber-800 text-sm leading-relaxed">
                    <span className="font-bold block text-amber-900/80 mb-1">{risk.risk}</span>
                    {risk.mitigation}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200">
              <h3 className="text-slate-900 font-serif font-bold text-xl mb-6">Future Roadmap</h3>
              <ul className="border-l-2 border-slate-100 ml-2 space-y-6">
                {details.nextSteps.map((step, i) => (
                  <li key={i} className="relative pl-6">
                    <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300"></span>
                    <p className="text-slate-600 text-sm">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* ---------------- DISCLAIMER FOOTER ---------------- */}
        <div className={`mt-32 text-center opacity-60 hover:opacity-100 transition-opacity ${fadeInUp} ${getDelay(9)}`}>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">Academic Disclaimer</p>
          <p className="text-xs text-slate-500 max-w-lg mx-auto italic">
            {details.disclaimer}
          </p>
        </div>

      </div>
    </section>
  );
};

export default ProjectDetail;
