import { useState } from "react";
import { motion } from "framer-motion";
import { governanceDocs } from "../constants";

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
    <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
);

const GovernanceHierarchy = () => (
    <div className="bento-item bg-white border-ink/[0.07] p-10 shadow-sm">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-ink/50 mb-8 italic">
            Governance_Hierarchy
        </h4>
        <div className="space-y-3">
            {[
                { level: "L1", label: "Constitutional Layer", desc: "Founding axioms & rights" },
                { level: "L2", label: "Governance Charter", desc: "Institutional structure" },
                { level: "L3", label: "Policy Framework", desc: "Operational protocols" },
                { level: "L4", label: "Enforcement Mechanism", desc: "Accountability loops" },
            ].map((item) => (
                <div key={item.level} className="flex items-center gap-4 p-3 rounded-xl hover:bg-paper/60 transition-all group/h">
                    <span className="w-8 h-8 rounded-lg bg-ink text-paper flex items-center justify-center text-[9px] font-black shrink-0">
                        {item.level}
                    </span>
                    <div>
                        <div className="text-[10px] font-black text-ink uppercase tracking-wider">{item.label}</div>
                        <div className="text-[9px] text-ink/50 font-medium italic">{item.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const GovernanceLab = () => {
    const [filter, setFilter] = useState("All");
    const types = ["All", "Charter", "Constitution", "Framework"];

    const filtered = filter === "All" ? governanceDocs : governanceDocs.filter(d => d.type === filter);

    return (
        <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden font-sans">
            <MeshBackground />

            {/* Header */}
            <section className="pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <span className="section-label">
                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                            Archive_Scope // Social Architecture
                        </span>
                        <h1
                            className="text-6xl sm:text-8xl lg:text-9xl font-black text-ink mt-8 mb-10 tracking-tighter leading-[0.9]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Governance <span className="italic text-ink/20">Lab</span>
                        </h1>
                        <p className="text-ink/65 text-xl font-medium leading-relaxed max-w-3xl italic border-l border-ink/15 pl-8">
                            The structural documentation of institutional constitutions, charters, and accountability models — defining the governance infrastructure for equitable systems.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Documents */}
                        <div className="lg:col-span-2">
                            {/* Filters */}
                            <div className="flex flex-wrap gap-3 mb-12">
                                {types.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilter(type)}
                                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${filter === type ? "bg-ink text-paper border-ink shadow-xl scale-105" : "bg-white/60 text-ink/60 border-ink/15 hover:border-ink/40 hover:text-ink hover:bg-white"}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-6">
                                {filtered.map((doc) => (
                                    <FadeIn key={doc.id}>
                                        <div className="bento-item bg-white p-10 hover:bg-white/90 transition-all duration-500 group shadow-sm hover:shadow-xl">
                                            <div className="flex items-start justify-between gap-6 mb-8">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="px-3 py-1.5 bg-ink text-paper text-[9px] font-black uppercase tracking-widest rounded-lg">
                                                        {doc.type}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-ink/50 uppercase tracking-[0.2em]">{doc.version} // {doc.year}</span>
                                                </div>
                                                <span className="text-[9px] font-black text-ink/30 uppercase tracking-[0.4em] shrink-0">{doc.pages}_PG</span>
                                            </div>

                                            <h3
                                                className="text-3xl font-black text-ink mb-3 tracking-tighter leading-tight group-hover:italic transition-all"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {doc.title}
                                            </h3>
                                            <p className="text-sm font-semibold text-ink/55 mb-6 italic border-l border-ink/10 pl-4">{doc.subtitle}</p>
                                            <p className="text-sm text-ink/65 leading-relaxed italic mb-8 line-clamp-3">{doc.abstract}</p>

                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {doc.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 border border-ink/10 text-ink/40 rounded-md italic group-hover:text-ink/60 transition-colors">//{tag}</span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-6 pt-8 border-t border-ink/[0.08]">
                                                <button className="group/btn inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-all">
                                                    <div className="w-8 h-8 rounded-full border border-ink/15 flex items-center justify-center group-hover/btn:bg-ink group-hover/btn:text-paper group-hover/btn:border-ink transition-all">
                                                        <svg className="w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    DOWNLOAD_PDF
                                                </button>
                                                <button className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 hover:text-ink transition-colors italic">
                                                    READ_FULL_TRANSCRIPT
                                                </button>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-12">
                            <GovernanceHierarchy />

                            <div className="bento-item bg-ink text-paper p-10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-paper/50 mb-8 italic">
                                    Strategic_Principles
                                </h4>
                                <ul className="space-y-6">
                                    {[
                                        "Stakeholder rights before efficiency",
                                        "Transparency as default logic",
                                        "Democratic participation protocols",
                                        "Accountability via enforced audit",
                                        "Contextual institutional adaptability",
                                    ].map((principle, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="text-paper/60 mt-0.5 font-black text-sm shrink-0">0{i + 1}</span>
                                            <span className="text-sm font-semibold tracking-tight leading-relaxed italic pr-4 text-paper/85">{principle}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default GovernanceLab;
