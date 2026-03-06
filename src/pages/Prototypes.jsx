import { motion } from "framer-motion";
import { prototypes } from "../constants";

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

// Token Economy Flow Diagram - Refined Blueprint
const TokenEconomyDiagram = () => (
    <div className="bg-white rounded-[2rem] border border-ink/[0.08] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-ink/[0.02] blur-3xl pointer-events-none" />
        <h3 className="text-xl font-black text-ink mb-10 tracking-tighter uppercase italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            // Token_Economy_Protocol
        </h3>
        
        <div className="relative space-y-12">
            {/* Center Node */}
            <div className="flex justify-center">
                <div className="bg-ink text-paper rounded-2xl px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] text-center shadow-2xl group-hover:scale-105 transition-transform duration-700">
                    Institutional_Treasury
                </div>
            </div>

            {/* Arrows and nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="bento-item bg-paper/50 border-ink/[0.08] p-6 hover:bg-white transition-all">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-ink mb-4 italic">Engagement_Vect</div>
                    <div className="text-[9px] font-mono text-ink/30 mb-4 tracking-widest uppercase">Earns tokens →</div>
                    <ul className="text-[9px] font-bold text-ink/60 uppercase tracking-widest space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Study_Sessions</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Peer_Teaching</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Milestones</li>
                    </ul>
                </div>

                <div className="bento-item bg-ink text-paper border-white/10 p-6 flex flex-col justify-center items-center text-center">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Circulation_Gate</div>
                    <div className="text-[9px] font-mono text-paper/40 mb-4 tracking-widest uppercase">↑ Mint / Burn ↓</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
                        Equilibrium_Model_v2.1 <br />
                        Inflation_Controls
                    </div>
                </div>

                <div className="bento-item bg-paper/50 border-ink/[0.08] p-6 hover:bg-white transition-all">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-ink mb-4 italic">Redemption_Lyr</div>
                    <div className="text-[9px] font-mono text-ink/30 mb-4 tracking-widest uppercase">← Spends tokens</div>
                    <ul className="text-[9px] font-bold text-ink/60 uppercase tracking-widest space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Adv_Content</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Tutoring_Acc</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Mentorship</li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-ink/[0.08] text-center">
                <p className="text-[10px] font-mono font-bold text-ink/40 uppercase tracking-[0.3em] leading-loose">
                    [SYSTEM_LOG]: Community investors fund the treasury → outcomes verified via oracle → programmatic disbursement triggered via smart contract.
                </p>
            </div>
        </div>
    </div>
);

const Prototypes = () => {
    return (
        <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden">
            <MeshBackground />

            {/* ─── HEADER ─── */}
            <section className="relative pt-40 pb-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <FadeIn>
                        <span className="section-label group cursor-default">
                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                            Simulation_Lab // Active_Prototypes
                        </span>
                        
                        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mt-12">
                            <div className="max-w-3xl">
                                <h1
                                    className="text-6xl sm:text-9xl font-black text-ink tracking-tighter leading-[0.85]"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Technical <br /><span className="text-ink/10 italic">Execution</span>.
                                </h1>
                                <p className="mt-12 text-2xl text-ink/40 font-medium italic border-l border-ink/10 pl-8 leading-tight tracking-tight">
                                    UI mockups, dashboard previews, token economy simulations, and governance voting interfaces — making abstract systems tangible.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ─── MAIN CONTENT ─── */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Prototype cards */}
                        <div className="lg:col-span-8 space-y-8">
                            {prototypes.map((proto, i) => (
                                <FadeIn key={proto.id} delay={i * 0.08}>
                                    <div className="bento-item bg-white border-ink/[0.08] p-12 group hover:shadow-2xl transition-all duration-700">
                                        <div className="flex items-center justify-between mb-10">
                                            <div className="flex items-center gap-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg border border-ink/10 bg-paper text-ink/40 italic">
                                                    //{proto.category}
                                                </span>
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg bg-ink text-paper opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    {proto.status}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-ink/30 tracking-[0.5em]">v{2.0 + i*0.1}</span>
                                        </div>

                                        <h2
                                            className="text-4xl font-black text-ink mb-4 tracking-tighter leading-none group-hover:italic transition-all"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {proto.title}
                                        </h2>
                                        <p className="text-sm font-semibold text-ink/55 mb-10 uppercase tracking-[0.15em] italic font-inter">{proto.subtitle}</p>
                                        <p className="text-xl text-ink/60 leading-relaxed mb-12 italic border-l-2 border-ink/[0.08] pl-8 font-medium">
                                            {proto.description}
                                        </p>

                                        {/* Features & Tech */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-[0.5em] text-ink/45 mb-6">Key_Features</div>
                                                <div className="space-y-3">
                                                    {proto.features.map(f => (
                                                        <div key={f} className="flex items-center gap-4 text-[10px] font-bold text-ink/60 uppercase tracking-widest">
                                                            <div className="w-1.5 h-1.5 bg-ink/10 rounded-full" />
                                                            {f}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-[0.5em] text-ink/45 mb-6">Tech_Stack_Array</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {proto.techStack.map(t => (
                                                        <span key={t} className="text-[9px] font-black px-4 py-2 border border-ink/[0.08] bg-paper rounded-lg uppercase tracking-widest text-ink/40 group-hover:text-ink transition-colors">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Placeholder Preview with Simulation Vibes */}
                                        <div className="mt-16 bg-ink/[0.02] rounded-[2rem] border border-ink/[0.08] h-64 flex items-center justify-center relative overflow-hidden group/preview">
                                            <div className="absolute inset-0 bg-institutional-grid opacity-20 pointer-events-none" />
                                            <div className="relative text-center">
                                                <div className="w-20 h-20 bg-ink text-paper rounded-[1.5rem] flex items-center justify-center font-black text-2xl mx-auto mb-6 group-hover/preview:scale-110 group-hover/preview:rotate-6 transition-all duration-700 shadow-2xl overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                    {proto.title.charAt(0)}
                                                </div>
                                                <div className="text-[10px] font-black text-ink/40 uppercase tracking-[0.4em] italic leading-tight">
                                                    Simulation_Interface_Offline <br />
                                                    <span className="text-[10px] font-mono tracking-widest">Awaiting_Data_Ingestion...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            <FadeIn delay={0.1}>
                                <TokenEconomyDiagram />
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="bg-ink text-paper rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-paper/60 mb-8 inline-block italic">Institutional_Philosophy</span>
                                    <h4 className="text-3xl font-black mb-8 tracking-tighter leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Prototype <br /><span className="text-paper/60 italic">Axioms</span>.
                                    </h4>
                                    <p className="text-paper/60 text-lg leading-relaxed font-medium italic border-l-2 border-white/10 pl-8">
                                        Every prototype is built to test a specific hypothesis about how a system should work. The goal is not a polished product, but a working model that generates empirical evidence.
                                    </p>
                                    
                                    <div className="mt-12 flex items-center gap-6 opacity-20">
                                        <div className="w-12 h-px bg-paper" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verified_Records</span>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Prototypes;
