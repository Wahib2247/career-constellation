import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { investments } from "../constants/investments";

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

const Investments = () => {
    return (
        <main className="bg-paper min-h-screen pt-32 pb-20 relative selection:bg-ink selection:text-paper overflow-hidden">
            <MeshBackground />
            
            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                {/* Header */}
                <section className="mb-20">
                    <span className="section-label">Archive_Scope // Capital Allocation Lab</span>
                    <h1 className="text-6xl sm:text-8xl font-black text-ink mt-8 mb-10 tracking-tighter leading-[0.9]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Systems <span className="italic text-ink/20">Investment</span> Journal
                    </h1>
                    <p className="text-ink/60 text-xl font-medium leading-relaxed max-w-3xl italic border-l border-ink/10 pl-8">
                        This archive documents strategic capital allocations in entities whose operational logic aligns with our core research interests: education access, governance tools, and financial inclusion. We prioritize mission alignment and long-term systemic stability over speculative returns.
                    </p>
                </section>

                {/* Methodology Bento block */}
                <div className="bento-item bg-white/40 backdrop-blur-xl p-10 mb-20 border-ink/[0.08] flex flex-col md:flex-row items-center gap-10">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-ink/[0.08] flex items-center justify-center text-2xl shadow-sm shrink-0">
                        ⚖️
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/45 mb-4 px-1">Institutional_Methodology</h4>
                        <p className="text-sm font-bold text-ink/80 leading-relaxed font-inter italic">
                            Each entry is logged with technical reflections on how the entity's model interacts with systemic variables. These are internal research documents and represent personal convictions, not financial consultation.
                        </p>
                    </div>
                </div>

                {/* Investment Bento Grid */}
                <div className="bento-grid">
                    {investments.map((item, index) => {
                        const isLarge = index === 0;
                        return (
                            <Link 
                                to={`/investments/${item.id}`} 
                                key={item.id} 
                                className={`group ${isLarge ? 'bento-span-2' : 'bento-span-1'}`}
                            >
                                <div className="bento-item h-full bg-white hover:bg-white/80 transition-all duration-500 flex flex-col p-10 border-ink/[0.08] group-hover:border-ink/20 shadow-sm hover:shadow-xl">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-16 h-16 rounded-2xl bg-paper border border-ink/[0.08] flex items-center justify-center p-4 shadow-inner group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0">
                                            <img src={item.logo} alt={item.name} className="w-full h-full object-contain opacity-60 group-hover:opacity-100" />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-ink/40 group-hover:text-ink/70 transition-colors">
                                                RECORD_{item.id.toUpperCase()}
                                            </span>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-ink mt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                                {item.sector}
                                            </p>
                                        </div>
                                    </div>

                                    <h2 className="text-4xl font-black text-ink mb-4 tracking-tighter leading-tight group-hover:italic transition-all" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {item.name}
                                    </h2>

                                    <div className="flex flex-wrap gap-2 mb-10">
                                        <span className="px-3 py-1 bg-ink/5 text-[9px] font-black text-ink/40 rounded-md uppercase tracking-widest group-hover:bg-ink group-hover:text-paper transition-colors">
                                            {item.investmentTheme}
                                        </span>
                                        <span className="px-3 py-1 border border-ink/10 text-[9px] font-black text-ink/45 rounded-md uppercase tracking-widest group-hover:border-ink/30 group-hover:text-ink/70 transition-colors">
                                            {item.thesisTag}
                                        </span>
                                    </div>

                                    <p className="text-ink/40 text-sm font-medium leading-relaxed mb-12 flex-1 italic group-hover:text-ink/70 transition-colors line-clamp-3">
                                        {item.companyOverview}
                                    </p>

                                    <div className="pt-8 border-t border-ink/[0.08] flex items-center justify-between mt-auto">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/40 group-hover:text-ink/70 transition-colors italic">
                                            VIEW_REFLECTION_001
                                        </span>
                                        <div className="w-10 h-10 rounded-full border border-ink/[0.08] flex items-center justify-center transition-all group-hover:bg-ink group-hover:text-paper group-hover:border-ink group-hover:scale-110">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Ethical Footnote */}
                <section className="mt-32 pt-16 border-t border-ink/[0.08] text-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
                    <p className="text-ink text-[9px] uppercase tracking-[0.6em] font-black mb-10 italic">Integrity_Guard_Protocol</p>
                    <div className="flex flex-wrap justify-center gap-12">
                        {[
                            "NO_SPECULATIVE_TRADING",
                            "STABILITY_OVER_GAIN",
                            "MISSION_ALIGNMENT_REQUIRED",
                            "PERSONAL_conviction_ONLY"
                        ].map(rule => (
                            <div key={rule} className="flex items-center gap-3 text-ink text-[10px] font-black uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                                {rule}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Investments;
