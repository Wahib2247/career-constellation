import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "../constants";
import { projectDetails } from "../constants/projectDetails";
import StatusBadge from "../components/StatusBadge";
import MathFormula from "../components/MathFormula";

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none">
        <div className="simulation-glow-orb top-[-10%] left-[-10%] opacity-10" />
        <div className="simulation-glow-orb bottom-[-10%] right-[-10%] opacity-5" />
    </div>
);

const TechnicalWatermark = () => (
    <div className="absolute inset-x-0 top-[20%] pointer-events-none opacity-[0.03] select-none z-0 overflow-hidden whitespace-nowrap">
        <div className="text-[20vw] font-black uppercase tracking-tighter">
            VERIFIED_RESEARCH // CONSTELLATION_LABS // {new Date().getFullYear()}
        </div>
    </div>
);

const HypothesisCard = ({ hypothesis }) => (
    <div className="bento-item bg-ink text-paper p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] pointer-events-none" />
        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-paper/60 mb-8 font-mono">
            // Speculative_Hypothesis
        </div>
        <div className="space-y-8">
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-paper/40 mb-2 font-sans">Statement</h4>
                <p className="text-2xl font-black italic tracking-tight leading-[1.1] font-serif">{hypothesis.statement}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-paper/40 mb-2 font-sans">Variable</h4>
                    <p className="text-xs font-bold text-paper/60 italic font-mono">{hypothesis.variable}</p>
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-paper/40 mb-2 font-sans">Simulated Outcome</h4>
                    <p className="text-xs font-bold text-paper/60 italic font-mono">{hypothesis.outcome}</p>
                </div>
            </div>
        </div>
    </div>
);

const AdversarialAnalysis = ({ analysis }) => (
    <div className="bento-item bg-white border-red-500/10 p-10 hover:shadow-2xl transition-all duration-700 relative group">
        <div className="absolute top-4 right-4 text-[10px] font-black text-red-500/20 uppercase tracking-[0.5em] font-mono">Red_Team_Audit</div>
        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-8 flex items-center gap-3 font-mono">
            <span className="w-2 h-2 bg-red-500/20 rounded-full animate-pulse" />
            Adversarial_Analysis
        </div>
        <div className="space-y-8">
            <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/40 mb-2 font-sans">Attack Vector</h5>
                <p className="text-lg text-ink/80 font-black italic leading-tight font-serif">{analysis.attackVector}</p>
            </div>
            <div className="pt-6 border-t border-ink/[0.08]">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/40 mb-2 font-sans">Mitigation</h5>
                <p className="text-sm font-bold text-ink/60 italic font-inter">{analysis.mitigation}</p>
            </div>
        </div>
    </div>
);

const SystemLogic = ({ logic }) => (
    <div className="bento-item border-ink/[0.08] p-12 bg-white flex flex-col justify-center items-center text-center group">
        <div className="text-[9px] font-black uppercase tracking-[0.5em] text-ink/45 mb-10 font-mono">System_Logic_Model</div>
        <div className="text-4xl sm:text-5xl font-black text-ink tracking-tight font-serif mb-6 bg-paper/50 px-8 py-4 rounded-3xl border border-ink/[0.07] overflow-x-auto">
            <MathFormula formula={logic} />
        </div>
        <div className="flex gap-2 opacity-10">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-ink" />)}
        </div>
    </div>
);

const TraceabilityStack = ({ matrix }) => (
    <div className="mt-12 space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/55 mb-6 font-mono">Traceability_Matrix</h4>
        <div className="p-6 bg-ink/[0.02] border border-ink/[0.08] rounded-2xl">
            <div className="text-[10px] font-black text-ink/55 uppercase tracking-widest mb-1 font-mono">First Principle</div>
            <div className="text-sm font-black text-ink italic font-serif group-hover:text-ink/60 transition-colors uppercase">{matrix.interest}</div>
        </div>
        <div className="p-6 bg-white border border-ink/[0.08] rounded-2xl shadow-sm">
            <div className="text-[10px] font-black text-ink/55 uppercase tracking-widest mb-1 font-mono">Research Core</div>
            <div className="text-sm font-black text-ink italic font-serif leading-tight">{matrix.paper}</div>
        </div>
    </div>
);

const SimulationTerminal = ({ outcome }) => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const initialLogs = [
      `[SYSTEM] Initializing simulation...`,
      `[AUTH] Systems Architect Verified.`,
      `[DATA] Loading systemic variables...`,
      `[PARAM] Outcome target: ${outcome}`,
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < initialLogs.length) {
        setLogs(prev => [...prev, initialLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [outcome]);

  return (
    <div className="simulation-terminal mt-8">
      <div className="terminal-header">
        <div className="flex gap-1.5 opacity-30">
          <div className="w-2 h-2 rounded-full bg-ink" />
          <div className="w-2 h-2 rounded-full bg-ink" />
          <div className="w-2 h-2 rounded-full bg-ink" />
        </div>
        <span className="text-[9px] uppercase font-black tracking-widest opacity-20 ml-3 font-mono">Active Simulation Feed</span>
      </div>
      <div className="space-y-1 h-32 overflow-hidden text-[10px] font-mono text-ink/40">
        {logs.map((log, idx) => (
          <div key={idx} className="animate-fadeIn">{log}</div>
        ))}
        {logs.length === 4 && (
          <div className="text-ink/60 mt-2 font-black uppercase italic">
            {`> Simulation Stabilized: Result Logged.`}
          </div>
        )}
      </div>
    </div>
  );
};

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

    const projectKey = project?.id;
    const details = projectDetails[projectKey];

    if (!project || !details) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-paper font-sans">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-ink/40 uppercase tracking-[0.4em]">Signal Lost</h1>
                    <Link to="/projects" className="text-ink underline mt-8 block text-[10px] font-bold uppercase tracking-widest font-mono">Return to Index</Link>
                </div>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className="bg-paper min-h-screen flex flex-col lg:flex-row relative selection:bg-ink selection:text-paper font-sans overflow-hidden">
            <MeshBackground />
            <TechnicalWatermark />

            {/* ─── LEFT PANE: THE INDEX (Sticky) ─── */}
            <aside className="lg:w-96 w-full lg:h-screen lg:sticky lg:top-0 border-r border-ink/[0.08] bg-white/40 backdrop-blur-3xl z-30 p-12 flex flex-col overflow-y-auto">
                <Link 
                    to="/projects" 
                    className="group inline-flex items-center gap-4 text-ink/40 hover:text-ink transition-all mb-20"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] font-mono">Index_Archive</span>
                </Link>

                <div className="flex-1">
                    <div className="space-y-1 mb-12">
                        <div className="text-[11px] font-mono font-black text-ink/55 uppercase tracking-[0.4em] italic mb-4">// Metadata_Node</div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-mono font-bold text-ink/40 uppercase tracking-widest">ID: {project.id.toUpperCase()}</span>
                            <span className="text-xs font-mono font-bold text-ink/40 uppercase tracking-widest">YEAR: {project.year}</span>
                            <span className="text-xs font-mono font-bold text-ink/40 uppercase tracking-widest">VER: 3.1.2</span>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="text-[11px] font-mono font-black text-ink/55 uppercase tracking-[0.4em] italic mb-6">// Institutional_Status</div>
                        <div className="bg-white/80 border border-ink/[0.08] p-8 rounded-3xl shadow-sm relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-2 h-2 rounded-full m-4 ${project.status === 'Live' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                            <h4 className="text-2xl font-black text-ink tracking-tighter uppercase leading-none font-sans mb-2">{project.status}</h4>
                            <p className="text-[10px] font-mono font-bold text-ink/40 uppercase tracking-[0.2em]">{project.statusBadge || 'PROCESS_NOMINAL'}</p>
                        </div>
                    </div>

                    <TraceabilityStack matrix={project.traceabilityMatrix || { interest: 'Systems Thinker', paper: 'Institutional Methodology' }} />
                </div>

                <div className="pt-12 border-t border-ink/[0.08]">
                    <p className="text-[10px] font-mono font-bold text-ink/55 uppercase tracking-[0.3em] leading-relaxed italic">
                        Constellation_Labs // Project_Dossier <br />
                        Archive_Status: Online
                    </p>
                </div>
            </aside>

            {/* ─── RIGHT PANE: THE DOCUMENT ─── */}
            <article className="flex-1 min-w-0 relative z-10 lg:pl-0">
                <section className="pt-32 lg:pt-48 pb-12 px-8 lg:px-24">
                    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
                        <motion.div variants={item} className="mb-20">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-ink/55 mb-8 block font-mono">
                                // System_Directives // {project.category}
                            </span>
                            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black text-ink leading-[0.8] tracking-tighter mb-12 font-sans uppercase">
                                {project.title}<span className="text-ink/5 italic">.</span>
                            </h1>
                            <p className="text-3xl sm:text-4xl text-ink/60 font-black italic leading-[1.1] font-serif border-l-4 border-ink/[0.08] pl-12 max-w-4xl tracking-tight">
                                {details.descriptor}
                            </p>
                        </motion.div>

                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Speculative Hypothesis */}
                            <HypothesisCard hypothesis={project.hypothesis || { statement: details.hypothesis, variable: "TBD", outcome: "TBD" }} />
                            
                            {/* Red Team Analysis */}
                            <AdversarialAnalysis analysis={project.adversarialAnalysis || { attackVector: "Incentive Drift", mitigation: "Governance Loop" }} />
                        </motion.div>

                        <motion.div variants={item} className="bento-grid mb-8">
                            {/* Blueprint (Large) */}
                            <div className="bento-item bento-span-2 bento-row-2 bg-white/20 p-0 border-ink/[0.08] group/blueprint overflow-hidden min-h-[600px] relative">
                                {project.blueprint ? (
                                    <div className="relative w-full h-full flex items-center justify-center p-16">
                                        <img 
                                            src={project.blueprint} 
                                            alt={`${project.title} Technical Blueprint`} 
                                            className="w-full h-full object-contain opacity-70 group-hover/blueprint:opacity-100 transition-all duration-1000 grayscale hover:grayscale-0 scale-[1.1] group-hover/blueprint:scale-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-paper/80 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-12 left-12 p-8 bg-white/95 backdrop-blur-md border border-ink/[0.08] rounded-3xl shadow-2xl">
                                             <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/30 mb-2 font-mono">Technical_Blueprint_Identifier</h4>
                                             <p className="text-xs font-mono font-bold text-ink/60">{project.id.toUpperCase()}_SYS_ARCH_SPEC_2024</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-ink/5 gap-4">
                                        <div className="w-24 h-24 border border-ink/[0.08] rounded-full flex items-center justify-center animate-spin-slow">
                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A2 2 0 013 15.485V4.382a2 2 0 011.106-1.789L9 2m0 18l6-3m-6 3V2m6 15l4.447 2.224A2 2 0 0021 17.515V6.382a2 2 0 00-1.106-1.789L15 2m0 15V2m0 15L9 2" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em] font-mono">Mapping_System_Failure</span>
                                    </div>
                                )}
                            </div>

                            {/* Logic Model */}
                            <div className="bento-span-1">
                                <SystemLogic logic={project.systemLogic || project.logic} />
                            </div>

                            {/* Problem Statement */}
                            <div className="bento-item bento-span-1 bg-white hover:bg-paper transition-all duration-700 p-12 flex flex-col justify-center">
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-8 block font-mono">// Critical_Path // The_Problem</span>
                                <h3 className="text-4xl font-black text-ink mb-8 tracking-tighter leading-none font-sans uppercase">Institutional_Deficit</h3>
                                <p className="text-lg text-ink/60 leading-relaxed font-black italic font-serif border-l border-ink/[0.08] pl-8">
                                    {details.problemStatement}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {/* Architecture Detail */}
                            <div className="md:col-span-2 bento-item bg-ink text-paper p-16 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-paper/5 to-transparent pointer-events-none" />
                                <div className="flex justify-between items-start mb-16 pb-8 border-b border-paper/10">
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-paper/60 font-mono">Architecture_Resolution</h4>
                                    <span className="text-[9px] font-mono text-paper/60">SPEC_NODE_v{project.year}.1</span>
                                </div>
                                <p className="text-3xl font-black italic text-paper mb-16 leading-[1.1] pr-12 font-serif">{details.architecture.description}</p>
                                <div className="flex flex-wrap gap-4">
                                    {details.architecture.components.map((comp, i) => (
                                        <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-paper/40 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-500 font-mono">
                                            [{comp}]
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stakeholder Simulation */}
                            <div className="bento-item bg-white p-12 border-ink/[0.08]">
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-10 block font-mono">// Simulation_Outcome</span>
                                <h4 className="text-5xl font-black text-ink tracking-tighter uppercase leading-[0.8] mb-10 font-sans">
                                    {details.simulation.outcome}
                                </h4>
                                <SimulationTerminal outcome={details.simulation.outcome} />
                            </div>
                        </motion.div>

                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                           {/* Actors */}
                           <div className="bento-item border-ink/[0.08] bg-paper/20 p-10 ring-1 ring-ink/[0.02]">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-10 border-b border-ink/[0.08] pb-4 font-mono">Institutional_Actors</h4>
                                <div className="space-y-4">
                                    {details.systemOverview.actors.map((actor, i) => (
                                        <div key={i} className="flex items-center justify-between p-5 bg-white border border-ink/[0.08] rounded-2xl shadow-sm hover:translate-x-2 transition-transform duration-500">
                                            <span className="text-xs font-black text-ink uppercase tracking-widest font-sans">{actor}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-ink/10" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Linked Records */}
                            <div className="bento-item border-ink/[0.08] p-10 bg-white shadow-xl">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-10 border-b border-ink/[0.08] pb-4 font-mono">Research_Threads</h4>
                                <div className="space-y-4">
                                    {details.relatedResearch?.length > 0 ? (
                                        <>
                                            <Link to="/research" className="block p-6 bg-paper/[0.3] border border-ink/[0.08] hover:border-ink/20 rounded-3xl transition-all group/link">
                                                <div className="text-[10px] uppercase font-black tracking-[0.3em] text-ink/30 mb-2 font-mono">Deep_Variable_Analysis</div>
                                                <div className="text-sm font-black text-ink italic leading-tight font-serif group-hover/link:text-ink/60 transition-colors">Behavioral_Incentive_V4.pdf</div>
                                            </Link>
                                            <Link to="/reflections" className="block p-6 bg-ink text-paper border border-ink/[0.08] hover:bg-ink/90 rounded-3xl transition-all">
                                                <div className="text-[10px] uppercase font-black tracking-[0.3em] text-paper/55 mb-2 font-mono">Internal_Lab_Notes</div>
                                                <div className="text-sm font-black text-paper italic leading-tight font-serif">Trust_Deficits_Analysis.log</div>
                                            </Link>
                                        </>
                                    ) : (
                                        <div className="p-8 text-center text-[10px] font-black uppercase text-ink/35 italic">Records_Pending...</div>
                                    )}
                                </div>
                            </div>

                            {/* Integrity Footnote */}
                            <div className="bento-item bg-ink text-paper border-none p-10 flex flex-col justify-center text-center relative overflow-hidden group">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
                                <div className="relative z-10">
                                    <p className="text-[9px] font-mono font-black uppercase tracking-[0.5em] text-paper/60 mb-8 italic">Audit_Compliance</p>
                                    <p className="text-xs font-serif font-black italic leading-relaxed text-paper/70 px-4">
                                        "{details.disclaimer}"
                                    </p>
                                    <div className="mt-12 pt-12 border-t border-paper/10 flex flex-col gap-2">
                                        <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-paper/60 italic">Validated_By: Wahib_Systems_Architect</span>
                                        <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-paper/60 italic">Hash_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>
            </article>
        </main>
    );
};

export default ProjectDetail;
