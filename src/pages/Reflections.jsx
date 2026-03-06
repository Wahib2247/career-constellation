import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reflections } from "../constants";

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
);

const ReflectionCard = ({ reflection, featured = false }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bento-item bg-white border-ink/[0.08] overflow-hidden group transition-all duration-700 ${featured ? "md:col-span-2 md:row-span-2 p-12" : "p-8"}`}>
            <div className="flex items-center gap-4 mb-8 flex-wrap">
                {featured && (
                    <span className="text-[9px] font-black tracking-[0.3em] px-3 py-1.5 rounded-lg bg-ink text-paper uppercase shadow-xl">
                        Featured_Inquiry
                    </span>
                )}
                <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg border border-ink/10 bg-paper/50 text-ink/60 italic">
                    //{reflection.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-ink/40 uppercase tracking-widest">{reflection.date}</span>
            </div>

            <h2
                className={`text-ink mb-4 tracking-tighter leading-none group-hover:italic transition-all ${featured ? "text-5xl sm:text-6xl font-black" : "text-3xl font-bold"}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                <span className="text-ink/35 mr-3 font-mono text-[0.4em] uppercase tracking-widest">
                    [{reflection.id % 2 === 0 ? "DRAFT" : "WORKING_PAPER"}]
                </span>
                {reflection.title}
            </h2>
            <p className="text-sm font-semibold text-ink/55 mb-8 uppercase tracking-[0.15em] italic font-inter">{reflection.subtitle}</p>
            <p className={`text-ink/70 leading-relaxed font-inter font-medium italic border-l-2 border-ink/15 pl-6 ${featured ? "text-xl max-w-2xl" : "text-md"}`}>
                {reflection.excerpt}
            </p>

            <AnimatePresence>
                {expanded && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-12 pt-12 border-t border-ink/10 overflow-hidden"
                    >
                        <div className="prose prose-sm prose-slate max-w-none">
                            {reflection.content.split('\n\n').map((para, i) => (
                                <p key={i} className="text-ink text-lg leading-[1.7] mb-8 font-serif italic tracking-tight text-ink/80">{para}</p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-between">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-ink/30 hover:text-ink transition-all group-hover:gap-6"
                >
                    {expanded ? "CONCLUDE_ENTRY" : "EXPAND_NARRATIVE"}
                    <svg
                        className={`w-3.5 h-3.5 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                <div className="flex gap-2">
                    {reflection.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-mono font-bold px-2 py-1 bg-ink/5 text-ink/50 rounded uppercase opacity-0 group-hover:opacity-100 transition-opacity">#{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Reflections = () => {
    const [filter, setFilter] = useState("All");
    const categories = ["All", "Institutional Design", "EdTech", "Systems Thinking", "Education"];

    const filtered = filter === "All"
        ? reflections
        : reflections.filter(r => r.category === filter || r.tags.includes(filter));

    return (
        <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden">
            <MeshBackground />

            {/* ─── HEADER ─── */}
            <section className="relative pt-40 pb-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <FadeIn>
                        <span className="section-label group cursor-default">
                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                            Archive_Type: Lab_Journal // Reflective_Inquiries
                        </span>
                        
                        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mt-12">
                            <div className="max-w-3xl">
                                <h1
                                    className="text-6xl sm:text-9xl font-black text-ink tracking-tighter leading-[0.85]"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Journal <br /><span className="text-ink/10 italic">Dispatches</span>.
                                </h1>
                                <p className="mt-12 text-2xl text-ink/40 font-medium italic border-l border-ink/10 pl-8 leading-tight tracking-tight">
                                    A chronicle of systemic observations, institutional building, and the philosophical underpinnings of my research lab.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pb-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${filter === cat ? "bg-ink text-paper border-ink shadow-2xl scale-110" : "bg-white/60 text-ink/60 border-ink/15 hover:border-ink/40 hover:text-ink hover:bg-white"}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ─── BENTO GRID ─── */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((reflection, i) => (
                            <FadeIn key={reflection.id} delay={i * 0.08}>
                                <ReflectionCard reflection={reflection} featured={i === 0 && filter === "All"} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PHILOSOPHY BLOCK ─── */}
            <section className="py-40 bg-ink text-paper relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-paper/10 rounded-full animate-pulse" />
                </div>
                
                <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center relative z-10">
                    <FadeIn>
                        <span className="text-[10px] font-black uppercase tracking-[1em] text-paper/60 mb-16 inline-block italic">Laboratory_Manifesto</span>
                        <blockquote
                            className="text-4xl sm:text-6xl font-black text-paper leading-tight tracking-tighter italic font-serif"
                        >
                            "These entries are written in the process of <span className="text-paper/60 italic">building</span> — not as polished essays, but as honest records of <span className="text-paper/45">thinking in motion</span>."
                        </blockquote>
                        
                        <div className="mt-20 flex flex-center justify-center items-center gap-6 opacity-20">
                            <div className="w-16 h-px bg-paper" />
                            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Constellation_Labs // v3.1</span>
                            <div className="w-16 h-px bg-paper" />
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
};

export default Reflections;
