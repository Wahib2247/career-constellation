import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../constants";
import { magictask_lcars } from "../assets/images";

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

const categoryColors = {
    EdTech: "bg-blue-50 text-blue-700 border-blue-100",
    Economics: "bg-amber-50 text-amber-700 border-amber-100",
    Governance: "bg-purple-50 text-purple-700 border-purple-100",
    Technology: "bg-emerald-50 text-emerald-700 border-emerald-100",
    FinTech: "bg-cyan-50 text-cyan-700 border-cyan-100",
    Crypto: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Humanitarian: "bg-slate-50 text-slate-700 border-slate-100",
};

const statusColors = {
    "Prototype": "bg-blue-50 text-blue-700",
    "Concept": "bg-rose-50 text-rose-700",
    "Simulation": "bg-emerald-50 text-emerald-700",
    "Research": "bg-slate-50 text-slate-700",
    "Internship": "bg-indigo-50 text-indigo-700",
};

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none">
        <div className="simulation-glow-orb top-[-10%] left-[-10%] opacity-20" />
        <div className="simulation-glow-orb bottom-[-10%] right-[-10%] opacity-15" />
    </div>
);

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    const isEmployment = project.isEmploymentProject;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink/10 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-paper w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden relative border border-ink/[0.08]"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className={`relative z-10 px-10 py-12 border-b border-ink/[0.08] bg-white/40 backdrop-blur-xl`}>
                    <button
                        onClick={onClose}
                        className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center transition-all hover:bg-ink/5 rounded-full group/close"
                    >
                        <svg className="w-5 h-5 text-ink/50 group-hover/close:text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-ink/10 bg-white text-ink/60">
                            {isEmployment ? "Institutional Record" : project.category}
                        </span>
                        <span className="text-[11px] font-bold text-ink/55 uppercase tracking-[0.3em] font-mono">{project.year}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-4xl font-black text-ink mb-2 tracking-tighter leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {project.title}
                            </h2>
                            <p className="text-ink/40 font-black uppercase text-[10px] tracking-[0.4em]">
                                {isEmployment ? "Technical_Interface_Construction // Fastech" : project.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-10 overflow-y-auto max-h-[70vh] relative z-10 bg-white/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-10">
                            <div className="clay-card p-8">
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-ink/30 mb-4">
                                    Technical_Summary
                                </h4>
                                <p className="text-ink/70 text-base leading-relaxed font-medium italic font-inter italic">
                                    "{project.summary}"
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 px-2">
                                <div>
                                    <h4 className="text-[9px] uppercase tracking-[0.3em] font-black text-ink/50 mb-2">Institution</h4>
                                    <p className="font-black text-ink/80 text-xs tracking-wide">{project.company || "Independent Research"}</p>
                                </div>
                                <div>
                                    <h4 className="text-[9px] uppercase tracking-[0.3em] font-black text-ink/50 mb-2">Role</h4>
                                    <p className="font-black text-ink/80 text-xs tracking-wide">Data Analyst</p>
                                </div>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-white border border-ink/[0.08]">
                                <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-ink/50 mb-4">Core Architecture</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-paper/50 text-ink/50 rounded-lg text-[9px] font-black uppercase tracking-widest hover:text-ink transition-colors border border-ink/[0.08]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {project.link && (
                                <div className="pt-4">
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center gap-4 px-10 py-4 bg-ink text-paper text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:brightness-110 transition-all shadow-lg group"
                                    >
                                        {isEmployment ? "Visit Website" : "Dive Deep"}
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.a>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-ink/50 px-2 italic">Interface Environment Preview</h4>
                            <div className="brutalist-card rounded-[2rem] overflow-hidden border-ink/10 bg-paper/30 aspect-video relative group/preview flex items-center justify-center">
                                {isEmployment && project.title === "MagicTask" ? (
                                    <img
                                        src={magictask_lcars}
                                        alt="MagicTask LCARS Interface"
                                        className="w-full h-full object-cover opacity-60 group-hover/preview:opacity-100 transition-opacity duration-700"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-ink/40 font-black text-[9px] uppercase tracking-[0.4em] gap-3">
                                        <div className="w-10 h-10 border border-dashed border-ink/25 rounded-full animate-spin" />
                                        No Preview Available
                                    </div>
                                )}
                            </div>
                            <p className="text-[9px] text-ink/30 italic leading-relaxed px-4 font-mono uppercase tracking-widest text-center">
                                {isEmployment ? "Institutional clearance required for terminal access." : "Project visualization for research methodology demonstration."}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const InstitutionalProjects = () => {
    const [filter, setFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const categories = ["All", "EdTech", "Governance", "Economics", "Technology"];

    const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter || p.tags.includes(filter));

    return (
        <main className="bg-paper min-h-screen selection:bg-ink selection:text-paper overflow-hidden font-sans relative">
            <MeshBackground />

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center lg:text-left">
                    <FadeIn>
                        <span className="section-label mb-6">Institutional Projects</span>
                        <h1
                            className="text-5xl sm:text-7xl font-black text-ink mt-4 mb-8 leading-[0.9] tracking-tighter"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Systems_Under_Construction
                        </h1>
                        <p className="text-ink/60 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium italic font-inter mx-auto lg:mx-0">
                            "Each project is a full institutional system — with governance models, economic architectures, technology stacks, and pilot evidence. Not products, but infrastructure."
                        </p>
                    </FadeIn>

                    {/* Filters */}
                    <FadeIn delay={0.1} className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all border ${filter === cat ? "bg-ink text-paper border-ink shadow-md" : "bg-white/50 text-ink/40 border-ink/[0.08] hover:border-ink/20"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </FadeIn>
                </div>
            </section>

            {/* Projects Bento Grid */}
            <section className="py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="bento-grid">
                        {filtered.map((project, i) => (
                            <FadeIn 
                                key={project.id} 
                                delay={i * 0.05}
                                className={`${i === 0 || i === 4 ? "bento-span-2" : ""} ${i === 1 ? "bento-row-2" : ""}`}
                            >
                                {project.isEmploymentProject ? (
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="bento-item h-full w-full group/card"
                                    >
                                        <ProjectCard project={project} />
                                    </button>
                                ) : (
                                    <Link to={`/projects/${project.slug}`} className="bento-item h-full group/card">
                                        <ProjectCard project={project} />
                                    </Link>
                                )}
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Note */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <div className="bg-white border border-ink/[0.08] p-12 rounded-[3rem] shadow-sm max-w-4xl mx-auto">
                            <h3 className="text-2xl font-black text-ink mb-6 flex items-center gap-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                <span className="w-10 h-0.5 bg-ink/10 rounded-full" />
                                Project_Methodology
                            </h3>
                            <p className="text-ink/50 text-base leading-relaxed font-medium italic font-inter px-6 border-l border-ink/10">
                                Each project follows a rigorous 10-section case study structure: Overview → Problem Landscape → Solution Architecture → Governance Model → Economic System → Technology Stack → Impact Simulation → Pilot Findings → Scaling Challenges → Downloadable Documents.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
};

const ProjectCard = ({ project }) => {
    const isEmployment = project.isEmploymentProject;

    return (
        <div className="flex flex-col h-full w-full">
            {/* Blueprint Thumbnail for Bento */}
            {project.blueprint && (
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] group-hover/card:opacity-[0.08] transition-opacity pointer-events-none">
                    <img src={project.blueprint} alt="" className="w-full h-full object-cover scale-150 rotate-12" />
                </div>
            )}

            <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ink/30 px-3 py-1 bg-ink/[0.03] rounded-full border border-ink/[0.08]">
                        {isEmployment ? "EMPLOYMENT" : project.category}
                    </span>
                    <span className="text-[9px] text-ink/50 font-bold tracking-[0.2em] font-mono">{project.year}</span>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-ink/40 mb-6">
                    <span className={`w-1.5 h-1.5 rounded-full ${project.id === 'magictask' ? 'bg-blue-400' : 'bg-emerald-400'} animate-pulse`} />
                    {project.status}
                </div>

                <h2
                    className="text-3xl font-black mb-3 text-ink leading-[1.1] tracking-tighter"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {project.title}
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 mb-8 border-b border-ink/[0.08] pb-4">
                    {project.subtitle}
                </p>
                <p className="text-sm text-ink/60 leading-relaxed flex-1 italic font-medium pr-12 line-clamp-3">
                    {project.summary}
                </p>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 border border-ink/[0.08] text-ink/30 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-10 pt-6 border-t border-ink/[0.08] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/55 group-hover/card:text-ink/60 transition-colors">
                        {isEmployment ? "VIEW_RECORD" : "EXPLORE_ARCHIVE"}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-ink/[0.02] border border-ink/[0.08] text-ink/50 group-hover/card:bg-ink group-hover/card:text-paper group-hover/card:border-ink">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstitutionalProjects;
