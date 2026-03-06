import { useState } from "react";
import { motion } from "framer-motion";
import { researchPapers } from "../constants";

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

const statusColors = {
    Published: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    Draft: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    "In Progress": "bg-ink/5 text-ink/60 border-ink/10",
};

const categoryColors = {
    Education: "bg-ink/5 text-ink/70",
    Governance: "bg-accent/10 text-accent",
    Economics: "bg-ink/10 text-ink/80",
    Technology: "bg-ink/5 text-ink/70",
};

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
);

const PaperCard = ({ paper }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bento-item bg-white border-ink/[0.08] p-0 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
            {/* Header Content */}
            <div className="p-10">
                <div className="flex items-center gap-4 mb-8 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-ink/5 text-ink/40 border border-ink/[0.08] rounded-md">
                        {paper.category}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 border border-ink/10 text-ink/30 rounded-md italic">
                        {paper.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-ink/40 uppercase ml-auto tracking-widest">
                        REV_{paper.year} // P.{paper.pages}
                    </span>
                </div>

                <h2
                    className="text-4xl font-black text-ink mb-2 tracking-tighter leading-tight group-hover:italic transition-all"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {paper.title}
                </h2>
                <p className="text-sm font-medium text-ink/40 mb-10 italic border-l border-ink/10 pl-6 font-inter">{paper.subtitle}</p>

                {/* Abstract Preview */}
                <div className="mb-10 bg-paper/30 p-8 rounded-2xl border border-ink/[0.06]">
                    <div className="text-[9px] uppercase font-black tracking-[0.4em] text-ink/45 mb-4 italic">Abstract_Summary_Preview</div>
                    <p className="text-ink/70 text-sm leading-relaxed font-medium font-inter">{paper.abstract}</p>
                </div>

                {/* Expand Button */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-colors"
                >
                    {expanded ? "COLLAPSE_ENTRY" : "EXPAND_FULL_RECORD"}
                    <svg
                        className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Expanded Methodology/Insights */}
            {expanded && (
                <div className="border-t border-ink/[0.08] p-10 bg-paper/30 space-y-12 animate-fadeIn">
                    <div className="bg-ink text-paper p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] pointer-events-none" />
                        <div className="text-[9px] uppercase tracking-[0.4em] text-paper/55 mb-6 font-black italic">Primary Research Objective</div>
                        <p className="text-2xl font-black leading-snug italic font-serif tracking-tight pr-12">"{paper.researchQuestion}"</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="text-[9px] uppercase tracking-[0.4em] text-ink/50 font-black">Methodological_Logic</div>
                            <p className="text-ink/60 text-xs font-medium leading-relaxed italic border-l border-ink/10 pl-4">{paper.methodology}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="text-[9px] uppercase tracking-[0.4em] text-ink/50 font-black">Systemic_Implications</div>
                            <p className="text-ink/60 text-xs font-medium leading-relaxed italic border-l border-ink/10 pl-4">{paper.policyImplications}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Actions */}
            <div className="px-10 py-6 border-t border-ink/[0.08] flex items-center justify-between bg-white/50 backdrop-blur-sm">
                <button className="group/dl inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 hover:text-ink transition-all">
                    <div className="w-8 h-8 rounded-full border border-ink/[0.08] flex items-center justify-center group-hover/dl:bg-ink group-hover/dl:text-paper group-hover/dl:border-ink transition-all">
                        <svg className="w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    ACCESS_PDF_RECORD
                </button>
                <div className="flex flex-wrap gap-2">
                    {paper.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border border-ink/[0.08] text-ink/50 rounded-sm italic">//{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Research = () => {
    const [filter, setFilter] = useState("All");
    const categories = ["All", "Education", "Governance", "Economics", "Technology"];

    const filtered = filter === "All" ? researchPapers : researchPapers.filter(p => p.category === filter || p.tags.includes(filter));

    return (
        <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden font-sans">
            <MeshBackground />

            {/* Header */}
            <section className="pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <span className="section-label">Archive_Inventory // Technical Frameworks</span>
                    <h1
                        className="text-6xl sm:text-8xl lg:text-9xl font-black text-ink mt-8 mb-10 tracking-tighter leading-[0.9]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Research <span className="italic text-ink/20">Archive</span>
                    </h1>
                    <p className="text-ink/60 text-xl font-medium leading-relaxed max-w-3xl italic border-l border-ink/10 pl-8">
                        A centralized repository of institutional insights, theoretical frameworks, and working preprints addressing the systemic design of educational and economic infrastructure.
                    </p>

                    {/* Filters Bento block */}
                    <div className="mt-16 flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${filter === cat ? "bg-ink text-paper border-ink shadow-2xl scale-105" : "bg-white/60 text-ink/60 border-ink/15 hover:border-ink/40 hover:text-ink hover:bg-white"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research Records Grid */}
            <section className="py-20 relative z-10">
                <div className="max-w-5xl mx-auto px-6 sm:px-12 space-y-12">
                    {filtered.map((paper, i) => (
                        <div key={paper.id}>
                            <PaperCard paper={paper} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Methodology Bento Footer */}
            <section className="py-32 relative z-10">
                <div className="max-w-5xl mx-auto px-6 sm:px-12">
                    <div className="bento-item bg-ink text-paper p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />
                        <div className="flex flex-col md:flex-row items-start gap-12">
                            <div className="w-16 h-16 bg-white text-ink rounded-3xl flex items-center justify-center shrink-0 font-black text-2xl shadow-xl">
                                🔬
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-paper/55 mb-6">Validation_Protocol_v4.2</h4>
                                <p className="text-xl text-paper/80 leading-relaxed font-serif italic tracking-tight">
                                    All analytical frameworks published here undergo iterative validation against empirical datasets. We prioritize institutional rigor over transient metrics. Entries denoted as "In Progress" represent active systemic inquiries undergoing peer-review.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Archive Footnote */}
            <section className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center opacity-20 hover:opacity-60 transition-opacity font-mono text-ink">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] italic">© 2024 CONSTELLATION LABS // RESEARCH_DIVISION // CLEARANCE_LEVEL_3</p>
                </div>
            </section>
        </main>
    );
};

export default Research;
