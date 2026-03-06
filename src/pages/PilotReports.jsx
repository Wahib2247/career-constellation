import { useState } from "react";
import { motion } from "framer-motion";
import { pilotReports } from "../constants";

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
);

const PilotCard = ({ report }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bento-item bg-white border-ink/[0.08] p-0 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-ink/5 text-ink/40 border border-ink/[0.08] rounded-md">
                        {report.status}
                    </span>
                    <span className="text-[10px] font-mono text-ink/40 uppercase tracking-widest">{report.year} // {report.duration} // n={report.sampleSize}</span>
                </div>

                <h2
                    className="text-4xl font-black text-ink mb-2 tracking-tighter leading-tight group-hover:italic transition-all"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {report.title}
                </h2>
                <p className="text-sm font-medium text-ink/40 mb-10 italic border-l border-ink/10 pl-4">{report.subtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Hypothesis */}
                    <div className="bg-paper/40 rounded-2xl p-6 border border-ink/[0.07]">
                        <div className="text-[9px] uppercase tracking-[0.4em] text-ink/45 mb-4 font-black italic">The Hypothesis</div>
                        <p className="text-ink text-sm leading-relaxed font-medium italic">"{report.hypothesis}"</p>
                    </div>

                    {/* Key Finding */}
                    <div className="bg-ink text-paper rounded-2xl p-6 border-none shadow-lg">
                        <div className="text-[9px] uppercase tracking-[0.4em] text-paper/55 mb-4 font-black italic">Key Finding</div>
                        <p className="text-paper/90 text-sm leading-relaxed font-bold tracking-tight">{report.findings}</p>
                    </div>
                </div>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-colors"
                >
                    {expanded ? "COLLAPSE_RECORD" : "ACCESS_FULL_REPORT"}
                    <svg
                        className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {expanded && (
                <div className="border-t border-ink/[0.08] p-10 bg-paper/30 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <div className="text-[9px] uppercase tracking-[0.4em] text-ink/45 mb-4 font-black">Study Design</div>
                            <p className="text-ink/60 text-xs font-medium leading-relaxed italic border-l border-ink/10 pl-4">{report.design}</p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="text-[9px] uppercase tracking-[0.4em] text-ink/45 mb-4 font-black">Metrics Tracked</div>
                                <div className="flex flex-wrap gap-2">
                                    {report.metricsTracked.map((m, i) => (
                                        <span key={i} className="px-3 py-1 bg-white border border-ink/[0.08] text-[9px] font-black uppercase tracking-widest text-ink/40 rounded-md">
                                            [{m}]
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-ink/[0.08]">
                        <div>
                            <div className="text-[9px] uppercase tracking-[0.4em] text-ink/45 mb-4 font-black">Constraints</div>
                            <ul className="space-y-3">
                                {report.constraints.map((c, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-medium text-ink/50 italic">
                                        <div className="w-1.5 h-1.5 rounded-full bg-ink/10 shrink-0" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="text-[9px] uppercase tracking-[0.4em] text-ink/45 mb-4 font-black">Optimization Path</div>
                            <ul className="space-y-3">
                                {report.futureImprovements.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-black text-ink/60 uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-ink/20 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-10 py-6 border-t border-ink/[0.08] flex items-center justify-between bg-white/50 backdrop-blur-sm">
                <button className="group/dl inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 hover:text-ink transition-all">
                    <div className="w-8 h-8 rounded-full border border-ink/[0.08] flex items-center justify-center group-hover/dl:bg-ink group-hover/dl:text-paper group-hover/dl:border-ink transition-all">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    DOWNLOAD_PDF_RECORD
                </button>
                <div className="flex flex-wrap gap-2">
                    {report.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border border-ink/[0.08] text-ink/50 rounded-sm italic">//{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PilotReports = () => {
    return (
        <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden font-sans">
            <MeshBackground />
            
            <section className="pt-32 pb-16 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <span className="section-label">Archive_Category // Evaluation Records</span>
                    <h1
                        className="text-6xl sm:text-8xl font-black text-ink mt-8 mb-10 tracking-tighter leading-[0.9]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Empirical <span className="italic text-ink/20">Evaluation</span> Pilots
                    </h1>
                    <p className="text-ink/60 text-xl font-medium leading-relaxed max-w-3xl italic border-l border-ink/10 pl-8">
                        Structured pilot studies testing theoretical frameworks against real-world constraints. Each entry documents hypothesis, design, findings, and institutional limitations.
                    </p>

                    {/* Summary stats Bento Header */}
                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                            { label: "Pilots Completed", value: "03" },
                            { label: "Participants", value: "185+" },
                            { label: "Institutions", value: "06" },
                            { label: "Avg. Duration", value: "07w" },
                        ].map(stat => (
                            <div key={stat.label} className="bento-item bg-white/40 backdrop-blur-xl p-8 border-ink/[0.08] text-center flex flex-col justify-center shadow-sm">
                                <div className="text-4xl font-black text-ink tracking-tighter">{stat.value}</div>
                                <div className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mt-3">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative z-10">
                <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-12">
                    {pilotReports.map((report, i) => (
                        <div key={report.id}>
                            <PilotCard report={report} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Archive Footnote */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="text-center opacity-20 hover:opacity-100 transition-opacity duration-1000 font-mono text-ink border-t border-ink/[0.08] pt-12">
                        <p className="text-[9px] uppercase tracking-[0.5em] font-black mb-6 italic">Empirical_Integrity_Protocol</p>
                        <p className="text-[11px] max-w-2xl mx-auto leading-relaxed font-bold tracking-tight px-12 uppercase italic">
                            All pilot data is anonymized and stored following university-level research ethics protocols. Access to raw datasets requires Level-3 authorization.
                        </p>
                        <p className="text-[10px] mt-12 opacity-40 font-black tracking-[0.2em] font-sans">© 2024 CONSTELLATION LABS // EVALUATION_RECORDS</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PilotReports;
