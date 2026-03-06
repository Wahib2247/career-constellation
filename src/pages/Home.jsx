import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { metrics, projects, researchPapers, reflections } from "../constants";
import StatusBadge from "../components/StatusBadge";
import classfusionBp from "../assets/images/blueprints/classfusion_blueprint_1772823077547.png";

// Fade-in on scroll component
const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
);

const Home = () => {
    const metricsRef = useRef(null);
    const [metricsInView, setMetricsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setMetricsInView(true); },
            { threshold: 0.2 }
        );
        if (metricsRef.current) observer.observe(metricsRef.current);
        return () => observer.disconnect();
    }, []);

    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
    const featuredPapers = researchPapers.slice(0, 3);
    const featuredReflection = reflections[0];

    return (
        <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden font-sans">
            <MeshBackground />

            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex items-center pt-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full relative z-10">
                    <div className="max-w-5xl">
                        <FadeIn>
                            <span className="section-label group cursor-default">
                                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                                Archive_Status: Online // Institutional_Records_v3.0
                            </span>
                        </FadeIn>

                        <h1
                            className="mt-10 text-6xl sm:text-8xl lg:text-[9.5rem] font-black text-ink leading-[0.85] tracking-tighter"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Social <span className="italic text-ink/20">Architect</span> <br />
                            & Researcher.
                        </h1>

                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                            <p className="text-2xl sm:text-3xl font-medium text-ink/60 leading-tight italic border-l border-ink/10 pl-8 font-serif tracking-tight">
                                Analyzing educational infrastructure, investment frameworks, and governance protocols to build equitable systems.
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <Link to="/projects" className="px-10 py-5 bg-ink text-paper rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl">
                                    EXAMINE_PORTFOLIO
                                </Link>
                                <Link to="/research" className="px-10 py-5 bg-white/40 backdrop-blur-xl border border-ink/[0.08] text-ink rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/60 transition-all">
                                    READ_RESEARCH
                                </Link>
                            </div>
                        </div>

                        {/* Domain Tags as Bento Block */}
                        <div className="mt-20 flex flex-wrap gap-3 opacity-60">
                            {[
                                "Education_Systems", "Governance_Decryption", "Incentive_Synthesis", "Institutional_Design", "Economic_Inclusion"
                            ].map(tag => (
                                <span key={tag} className="text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 border border-ink/10 rounded-lg bg-paper/20">
                                    //{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subtle Scroll Indicator */}
                <div className="absolute bottom-12 left-6 sm:left-12 flex items-center gap-6 opacity-20">
                    <div className="w-12 h-px bg-ink" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">Scroll_to_Indices</span>
                </div>
            </section>

            {/* ─── METRICS ─── */}
            <section ref={metricsRef} className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {metrics.map((metric, i) => (
                             <div key={metric.label} className="bento-item bg-white/50 backdrop-blur-sm border-ink/[0.08] p-12 group hover:bg-white transition-all duration-700">
                                <div className="text-5xl font-black text-ink mb-4 tracking-tighter leading-none group-hover:italic transition-all">
                                    {metricsInView ? metric.value : 0}{metric.suffix}
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 mb-2">{metric.label}</div>
                                <div className="text-[9px] font-medium text-ink/55 uppercase tracking-widest">{metric.description}</div>
                             </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CORE PILLARS ─── */}
            <section className="py-40 bg-ink text-paper relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <div className="max-w-3xl mb-24">
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-paper/60 italic">Research_Pillars // v4.0</span>
                        <h2 className="text-5xl sm:text-7xl font-black mt-8 tracking-tighter leading-[0.9]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Mapping the <br /><span className="text-paper/60 italic">Institutional</span> Landscape.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-paper/10 border border-paper/10 rounded-[3rem] overflow-hidden">
                        {[
                            {
                                id: "01",
                                title: "Education Systems Architecture",
                                desc: "Structural analysis of institutional governance and accountability loops. Counterfactual modeling of school autonomy.",
                                link: "/projects"
                            },
                            {
                                id: "02",
                                title: "Governance Decryption",
                                desc: "Mapping non-state governance as algorithmic social technology. Formalizing informal decision-making protocols.",
                                link: "/governance"
                            },
                            {
                                id: "03",
                                title: "Incentive Synthesis",
                                desc: "Researching outcome-based funding models and continuous liquidity streams for social capital allocation.",
                                link: "/research"
                            }
                        ].map(pillar => (
                            <div key={pillar.id} className="p-16 hover:bg-white/5 transition-all duration-700 group cursor-help">
                                <div className="text-4xl font-black text-paper/45 mb-12 group-hover:text-paper/40 transition-colors font-mono tracking-tighter">{pillar.id}</div>
                                <h3 className="text-2xl font-black mb-6 leading-tight group-hover:italic transition-all" style={{ fontFamily: "'Playfair Display', serif" }}>{pillar.title}</h3>
                                <p className="text-paper/50 text-sm leading-relaxed mb-10 font-medium font-inter">{pillar.desc}</p>
                                <Link to={pillar.link} className="inline-flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-paper/60 group-hover:text-paper transition-all group-hover:gap-6">
                                    ACCESS_FILE <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURED FLAGSHIP (CLASSFUSION) ─── */}
            <section className="py-40 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="bento-item bg-white border-ink/[0.08] p-0 overflow-hidden group shadow-2xl rounded-[4rem]">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-20 flex flex-col justify-center">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-ink/55 mb-8 italic">Primary_Simulation_Entry</span>
                                <h2 className="text-6xl sm:text-7xl font-black text-ink mb-10 tracking-tighter leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    ClassFusion <br /><span className="text-ink/10 italic">Case_Study</span>
                                </h2>
                                <p className="text-xl text-ink/60 leading-relaxed mb-12 italic border-l-2 border-ink/[0.08] pl-8 font-medium">
                                    An adaptive learning prototype exploring incentive systems, democratic governance tools, and micro-investment mechanisms.
                                </p>
                                
                                <div className="grid grid-cols-2 gap-8 mb-16 px-8">
                                    {[
                                        { l: "Simulated_Capacity", v: "120+" },
                                        { l: "Engagement_Index", v: "+41%" },
                                        { l: "Accountability_Rate", v: "67%" },
                                        { l: "Pilot_Cycle", v: "6WK" },
                                    ].map(s => (
                                        <div key={s.l}>
                                            <div className="text-4xl font-black text-ink tracking-tighter">{s.v}</div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/55 mt-2">{s.l}</div>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/projects/classfusion" className="w-fit px-12 py-5 bg-ink text-paper rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-xl">
                                    READ_FULL_BluePrint
                                </Link>
                            </div>

                            <div className="bg-ink relative min-h-[500px] overflow-hidden">
                                <img 
                                    src={classfusionBp} 
                                    alt="ClassFusion" 
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen scale-110 group-hover:scale-125 transition-transform duration-[3s]" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12 p-8 bg-paper/5 backdrop-blur-2xl border border-paper/10 rounded-2xl">
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-paper/55 mb-4 inline-block">Architecture_Overview</div>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                                        <p className="text-paper text-[10px] font-bold tracking-widest uppercase italic border-l border-paper/10 pl-4">Simulating_Behavioral_Governance_Loops_v2.1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ARCHIVE INDICES (PROJECTS & RESEARCH) ─── */}
            <section className="py-40 bg-paper relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24">
                        <div className="max-w-2xl">
                            <span className="section-label cursor-default">Archive_Selection // Technical_Indices</span>
                            <h2 className="text-5xl sm:text-7xl font-black mt-8 tracking-tighter leading-[0.9]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Featured <br /><span className="text-ink/10 italic">Inquiries</span>.
                            </h2>
                        </div>
                        <Link to="/projects" className="px-10 py-4 bg-white/40 backdrop-blur-xl border border-ink/[0.08] text-ink rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/60 transition-all flex items-center gap-4">
                            VIEW_ALL_RECORDS <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map(p => (
                            <Link key={p.id} to={`/projects/${p.slug}`} className="bento-item bg-white border-ink/[0.08] p-10 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 flex flex-col">
                                <div className="flex justify-between items-start mb-10">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 bg-ink/5 text-ink/30 border border-ink/[0.08] rounded-md italic group-hover:bg-ink group-hover:text-paper transition-all">
                                        {p.category}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-ink/40">{p.year}</span>
                                </div>
                                <h3 className="text-3xl font-black text-ink mb-4 tracking-tighter group-hover:italic transition-all" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</h3>
                                <p className="text-sm text-ink/40 mb-10 italic border-l border-ink/[0.08] pl-4 font-medium flex-1 line-clamp-3">{p.summary}</p>
                                <div className="mt-auto pt-8 border-t border-ink/[0.08] text-[10px] font-mono font-bold text-ink/40 uppercase tracking-widest italic overflow-hidden whitespace-nowrap text-ellipsis">
                                    //{p.logic}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── RESEARCH PREPRINTS LIST ─── */}
            <section className="py-40 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-16">
                         <div>
                            <span className="section-label">Research_Preprints_Inventory</span>
                            <h2 className="text-5xl font-black mt-8 tracking-tighter leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Latest <br /><span className="text-ink/10 italic">Working_Papers</span>.
                            </h2>
                         </div>
                         <p className="text-lg text-ink/50 italic font-medium leading-relaxed border-l-2 border-ink/[0.08] pl-8">
                            Iterative preprints exploring systemic design across educational and economic boundaries. All entries undergo empirical validation.
                         </p>
                    </div>

                    <div className="space-y-4">
                        {featuredPapers.map(paper => (
                           <Link key={paper.id} to="/research" className="bento-item bg-white/40 backdrop-blur-sm border-ink/[0.08] p-8 flex flex-col md:flex-row items-center gap-10 group hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
                                <div className="w-16 h-16 bg-ink text-paper rounded-2xl flex items-center justify-center shrink-0 font-black text-xl group-hover:scale-110 active:scale-95 transition-all shadow-xl font-serif italic">
                                    {paper.title.charAt(0)}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center gap-4 justify-center md:justify-start mb-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 italic">//{paper.category}</span>
                                        <span className="w-1 h-1 bg-ink/10 rounded-full" />
                                        <span className="text-[10px] font-mono font-bold text-ink/55 uppercase">REV_{paper.year}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-ink mb-1 tracking-tighter group-hover:italic transition-all leading-tight">{paper.title}</h3>
                                    <p className="text-sm text-ink/40 italic font-medium">{paper.subtitle}</p>
                                </div>
                                <button className="hidden md:flex px-8 py-3 border border-ink/10 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 group-hover:border-ink group-hover:text-ink transition-all">
                                    ACCESS_FILE
                                </button>
                           </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FOUNDER MANIFESTO (REPLACED QUOTE) ─── */}
            <section className="py-60 relative overflow-hidden bg-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-ink/[0.01] rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center relative z-10">
                    <FadeIn>
                        <span className="text-[10px] font-black uppercase tracking-[1em] text-ink/35 mb-20 inline-block italic">Institutional_Philosophy</span>
                        <blockquote
                            className="text-4xl sm:text-7xl font-black text-ink leading-[0.95] tracking-tighter mb-20 italic font-serif"
                        >
                            "Iterative <span className="text-ink/30">experimentation</span> beats master planning. We build to <span className="text-ink/25">understand</span> — and we document everything so others can build further."
                        </blockquote>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-ink text-paper rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-2xl">W</div>
                            <div className="text-center">
                                <div className="text-[11px] font-black uppercase tracking-[0.5em] text-ink">Wahib</div>
                                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-ink/55 mt-2 italic">Founding_Researcher // Constellation_Labs</div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ─── REFLECTION FEATURE ─── */}
            <section className="py-40 bg-paper/50 backdrop-blur-xl relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
                    <FadeIn>
                        <span className="section-label cursor-default">Journal_Dispatches // Reflections</span>
                        <h2 className="text-5xl sm:text-7xl font-black mt-10 tracking-tighter mb-24" style={{ fontFamily: "'Playfair Display', serif" }}>
                            From the <span className="text-ink/20 italic">Lab Journal</span>.
                        </h2>

                        {featuredReflection && (
                            <Link to="/reflections" className="bento-item bg-white border-ink/[0.08] p-20 group hover:shadow-2xl transition-all duration-1000 block max-w-5xl mx-auto text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-ink/[0.01] blur-[80px] pointer-events-none" />
                                <div className="flex flex-wrap items-center gap-6 mb-12">
                                    <span className="px-4 py-1.5 bg-ink text-paper text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        {featuredReflection.category}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-ink/55 uppercase tracking-[0.3em]">{featuredReflection.date} // {featuredReflection.readTime} read</span>
                                </div>
                                <h3 className="text-5xl sm:text-6xl font-black text-ink mb-10 tracking-tighter group-hover:italic transition-all leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {featuredReflection.title}
                                </h3>
                                <p className="text-2xl text-ink/40 leading-relaxed italic max-w-4xl font-serif tracking-tight pr-12 group-hover:text-ink/70 transition-colors">
                                    {featuredReflection.excerpt}
                                </p>
                                <div className="mt-20 inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-ink/55 group-hover:text-ink transition-all group-hover:gap-10">
                                    OPEN_FULL_INQUIRY <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </Link>
                        )}
                    </FadeIn>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-60 bg-ink text-paper relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-6xl sm:text-9xl font-black mb-12 tracking-tighter leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Open for <br /><span className="text-paper/60 italic">Collaboration</span>.
                        </h2>
                        <p className="text-2xl text-paper/40 leading-relaxed mb-20 max-w-2xl mx-auto font-medium italic">
                            Research partnerships, institutional pilots, governance consultations, and co-design opportunities.
                        </p>
                        <div className="flex flex-wrap gap-6 justify-center">
                            <Link to="/contact" className="px-12 py-6 bg-paper text-ink rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-4">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                START_CONVERSATION
                            </Link>
                            <Link to="/about" className="px-12 py-6 bg-white/5 border border-paper/10 text-paper rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] hover:bg-white/10 transition-all">
                                ABOUT_THE_LAB
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Footer Footnote */}
            <section className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center opacity-10 hover:opacity-40 transition-opacity font-mono text-ink">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-relaxed">
                        © 2024 CONSTELLATION LABS // GOVERNANCE_RECORDS // ALL_DATA_SIMULATED <br />
                        CLEARANCE_LEVEL_ALPHA // ARCHIVE_STATUS_VERIFIED
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Home;
