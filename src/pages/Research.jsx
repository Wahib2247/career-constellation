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
    Published: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Draft: "bg-amber-50 text-amber-700 border-amber-100",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-100",
};

const categoryColors = {
    Education: "bg-sky-50 text-sky-700",
    Governance: "bg-purple-50 text-purple-700",
    Economics: "bg-amber-50 text-amber-700",
    Technology: "bg-emerald-50 text-emerald-700",
};

const PaperCard = ({ paper }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-institutional overflow-hidden">
            {/* Header */}
            <div className="p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[paper.category] || "bg-slate-50 text-slate-600"}`}>
                        {paper.category}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[paper.status] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
                        {paper.status}
                    </span>
                    <span className="text-xs text-slate-400">{paper.year}</span>
                    <span className="text-xs text-slate-400 ml-auto">{paper.pages} pages · {paper.citations} citations</span>
                </div>

                <h2
                    className="text-2xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {paper.title}
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-4 italic">{paper.subtitle}</p>

                {/* Abstract */}
                <div className="mb-4">
                    <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Abstract</div>
                    <p className="text-slate-600 text-sm leading-relaxed">{paper.abstract}</p>
                </div>

                {/* Expand button */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                    {expanded ? "Collapse" : "Read More"}
                    <svg
                        className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Expanded content */}
            {expanded && (
                <div className="border-t border-slate-100 p-8 bg-slate-50 space-y-6">
                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Research Question</div>
                        <p className="text-slate-700 text-sm leading-relaxed italic">"{paper.researchQuestion}"</p>
                    </div>
                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Methodology</div>
                        <p className="text-slate-600 text-sm leading-relaxed">{paper.methodology}</p>
                    </div>
                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Key Findings</div>
                        <p className="text-slate-600 text-sm leading-relaxed">{paper.findings}</p>
                    </div>
                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Policy Implications</div>
                        <p className="text-slate-600 text-sm leading-relaxed">{paper.policyImplications}</p>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="px-8 py-4 border-t border-slate-100 flex items-center gap-4">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                </button>
                <div className="flex flex-wrap gap-1.5 ml-auto">
                    {paper.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{tag}</span>
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
        <main className="bg-paper-cool min-h-screen">
            {/* Header */}
            <section className="bg-white border-b border-slate-100 pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <span className="section-label">Research & Whitepapers</span>
                        <h1
                            className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6 max-w-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Research Contributions
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                            Academic and policy research on education systems, governance innovation, and economic inclusion. Each paper includes methodology, findings, and policy implications.
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

            {/* Papers */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6 sm:px-12 space-y-8">
                    {filtered.map((paper, i) => (
                        <FadeIn key={paper.id} delay={i * 0.08}>
                            <PaperCard paper={paper} />
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Research Note */}
            <section className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Research Methodology Note</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        All research follows a structured methodology: literature review, empirical analysis or simulation, framework development, and policy implication mapping. Papers marked "In Progress" are in active development and available for peer review upon request.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
};

export default Research;
