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

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    const isEmployment = project.isEmploymentProject;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className={`px-10 py-12 border-b border-slate-100 ${isEmployment ? "bg-slate-50/80" : "bg-white"}`}>
                    <button
                        onClick={onClose}
                        className={`absolute top-8 right-8 w-10 h-10 border rounded-full flex items-center justify-center transition-all shadow-sm ${isEmployment ? "bg-white border-slate-200 text-slate-400 hover:text-[#ff9999] hover:border-[#ff9999]" : "bg-white border-slate-200 text-slate-400 hover:text-slate-900"}`}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isEmployment ? 3 : 2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${isEmployment ? "bg-[#ffcc33] text-[#050505] border-transparent" : categoryColors[project.category]}`}>
                            {isEmployment ? "Institutional Assignment" : project.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.year}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-5xl font-black text-slate-900 mb-2 uppercase tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {project.title}
                            </h2>
                            <p className={`${isEmployment ? "text-blue-600" : "text-blue-600"} font-black uppercase text-xs tracking-[0.3em]`}>
                                {isEmployment ? "Technical Interface Construction // Fastech" : project.subtitle}
                            </p>
                        </div>
                        {isEmployment && (
                            <div className="flex gap-1 items-center pb-2">
                                <div className="w-12 h-6 bg-[#ff9999] rounded-l-full" />
                                <div className="w-20 h-6 bg-[#ffcc33]" />
                                <div className="w-8 h-6 bg-[#99ccff] rounded-r-full" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-10 lg:p-12 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h4 className={`text-[10px] uppercase tracking-[0.3em] font-black ${isEmployment ? "text-[#ff9999]" : "text-slate-400"} mb-4`}>Technical Summary</h4>
                                <p className="text-slate-600 text-base leading-relaxed">
                                    {project.summary}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className={`text-[10px] uppercase tracking-[0.3em] font-black ${isEmployment ? "text-[#99ccff]" : "text-slate-400"} mb-2`}>Institution</h4>
                                    <p className="font-bold text-slate-900 text-sm">{project.company || "Independent Research"}</p>
                                </div>
                                <div>
                                    <h4 className={`text-[10px] uppercase tracking-[0.3em] font-black ${isEmployment ? "text-[#99ccff]" : "text-slate-400"} mb-2`}>Role</h4>
                                    <p className="font-bold text-slate-900 text-sm">Lead Systems Designer</p>
                                </div>
                            </div>

                            <div>
                                <h4 className={`text-[10px] uppercase tracking-[0.3em] font-black ${isEmployment ? "text-[#cc99ff]" : "text-slate-400"} mb-4`}>Core Architecture</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className={`px-4 py-2 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {project.link && (
                                <div className="pt-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-4 px-10 py-5 ${isEmployment ? "bg-[#ffcc33]/20 text-slate-900" : "bg-blue-600 text-white"} text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:opacity-90 transition-all shadow-xl group`}
                                    >
                                        {isEmployment ? "Visit Website" : "Dive Deep"}
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <h4 className={`text-[10px] uppercase tracking-[0.3em] font-black ${isEmployment ? "text-slate-400" : "text-slate-400"}`}>Interface Environment Preview</h4>
                            <div className={`rounded-3xl overflow-hidden border ${isEmployment ? "border-slate-200" : "border-slate-100"} bg-slate-900 aspect-video relative group/preview`}>
                                {isEmployment && project.title === "MagicTask" ? (
                                    <img
                                        src={magictask_lcars}
                                        alt="MagicTask LCARS Interface"
                                        className="w-full h-full object-cover opacity-90 group-hover/preview:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700 font-black text-xs uppercase tracking-widest">
                                        No Preview Available
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-400 italic leading-relaxed">
                                {isEmployment ? "Institutional clearance required for full interactive terminal access." : "Project visualization for research methodology demonstration."}
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
        <main className="bg-paper-cool min-h-screen">
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <section className="bg-white border-b border-slate-100 pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <span className="section-label">Institutional Projects</span>
                        <h1
                            className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6 max-w-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Systems Under Construction
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                            Each project is a full institutional system — with governance models, economic architectures, technology stacks, and pilot evidence. Not products, but infrastructure.
                        </p>
                    </FadeIn>

                    {/* Filters */}
                    <FadeIn delay={0.1} className="mt-8 flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`filter-pill ${filter === cat ? "filter-pill-active" : "filter-pill-inactive"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </FadeIn>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((project, i) => (
                            <FadeIn key={project.id} delay={i * 0.08}>
                                {project.isEmploymentProject ? (
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="block text-left group h-full w-full"
                                    >
                                        <ProjectCard project={project} />
                                    </button>
                                ) : (
                                    <Link to={`/projects/${project.slug}`} className="block group h-full">
                                        <ProjectCard project={project} />
                                    </Link>
                                )}
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Note */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 max-w-3xl">
                            <h3 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Project Methodology
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Each project follows a rigorous 10-section case study structure: Overview → Problem Landscape → Solution Architecture → Governance Model → Economic System → Technology Stack → Impact Simulation → Pilot Findings → Scaling Challenges → Downloadable Documents. This ensures institutional-level documentation for every initiative.
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
        <div className={`doc-card h-full flex flex-col group/card transition-all duration-300 relative overflow-hidden ${isEmployment ? "border-l-4 border-l-[#ffcc33] bg-white" : "hover:border-blue-500/30 bg-white"}`}>
            {/* Institutional Accent Bar (Thin & Approved) */}
            {isEmployment && (
                <div className="absolute top-0 right-0 w-32 h-1 flex gap-1 pt-0">
                    <div className="flex-1 h-full bg-[#ff9999]" />
                    <div className="w-8 h-full bg-[#cc99ff]" />
                    <div className="w-4 h-full bg-[#99ccff]" />
                </div>
            )}

            <div className={`${isEmployment ? "p-7" : "p-6"} flex flex-col h-full`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${isEmployment ? "bg-[#ffcc33]/10 text-[#050505] border-[#ffcc33]/20" : categoryColors[project.category] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
                        {isEmployment ? "Institutional Assignment" : project.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{project.year}</span>
                </div>

                {/* Status */}
                <div className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-6 w-fit ${isEmployment ? "bg-white border border-[#ffcc33]/20 text-slate-600" : statusColors[project.status] || "bg-slate-50 text-slate-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${project.statusColor === "blue" ? "bg-blue-500" : project.statusColor === "green" ? "bg-emerald-500" : project.statusColor === "red" ? "bg-rose-500" : "bg-amber-500"} animate-pulse`} />
                    {project.status}
                </div>

                <h2
                    className={`text-2xl font-bold mb-1 transition-colors ${isEmployment ? "text-slate-900 group-hover/card:text-blue-600" : "text-slate-900 group-hover:text-blue-600"}`}
                    style={{ fontFamily: isEmployment ? "'Inter', sans-serif" : "'Playfair Display', serif" }}
                >
                    {project.title}
                </h2>
                <p className={`text-sm font-medium mb-4 ${isEmployment ? "text-blue-600" : "text-slate-500"}`}>{project.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 italic">{project.summary}</p>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                        <span key={tag} className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${isEmployment ? "bg-[#ffcc33]/5 text-slate-500 border border-slate-100" : "bg-slate-100 text-slate-500"}`}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <div className={`mt-8 pt-5 border-t flex items-center justify-between ${isEmployment ? "border-[#ffcc33]/20" : "border-slate-100"}`}>
                    <span className={`text-sm font-bold transition-colors ${isEmployment ? "text-slate-900 group-hover/card:text-blue-600" : "text-slate-900 group-hover:text-blue-600"}`}>
                        {isEmployment ? "Visit Website" : "Dive Deep"}
                    </span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isEmployment ? "bg-[#ffcc33]/20 text-slate-900 group-hover/card:bg-blue-600 group-hover/card:text-white" : "text-slate-400 group-hover:text-blue-600"}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstitutionalProjects;
