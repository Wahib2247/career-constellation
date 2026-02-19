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

const typeColors = {
    Charter: "bg-purple-50 text-purple-700 border-purple-100",
    Constitution: "bg-blue-50 text-blue-700 border-blue-100",
    Framework: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Legislation: "bg-amber-50 text-amber-700 border-amber-100",
};

// Governance Hierarchy Diagram
const GovernanceHierarchy = () => (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-institutional">
        <h3 className="text-lg font-bold text-slate-900 mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Institutional Governance Hierarchy
        </h3>
        <div className="flex flex-col items-center gap-0">
            {/* Level 1 */}
            <div className="bg-slate-900 text-white rounded-xl px-8 py-3 text-sm font-semibold text-center w-64">
                Institutional Constitution
            </div>
            <div className="w-px h-6 bg-slate-300" />

            {/* Level 2 */}
            <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white rounded-xl px-5 py-2.5 text-xs font-semibold text-center w-40">
                        Student Rights Charter
                    </div>
                    <div className="w-px h-6 bg-slate-300" />
                    <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 text-xs font-medium text-center w-40">
                        Student Council
                    </div>
                </div>
                <div className="flex flex-col items-center mt-8">
                    <div className="w-px h-6 bg-slate-300" />
                    <div className="bg-slate-200 text-slate-700 rounded-xl px-5 py-2.5 text-xs font-semibold text-center w-40">
                        Accountability Model
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-purple-600 text-white rounded-xl px-5 py-2.5 text-xs font-semibold text-center w-40">
                        Teacher Governance Charter
                    </div>
                    <div className="w-px h-6 bg-slate-300" />
                    <div className="bg-purple-100 text-purple-800 rounded-lg px-4 py-2 text-xs font-medium text-center w-40">
                        Faculty Senate
                    </div>
                </div>
            </div>

            <div className="w-px h-6 bg-slate-300" />

            {/* Level 3 */}
            <div className="flex gap-4">
                <div className="bg-emerald-100 text-emerald-800 rounded-xl px-5 py-2.5 text-xs font-semibold text-center w-40">
                    Voting System
                </div>
                <div className="bg-amber-100 text-amber-800 rounded-xl px-5 py-2.5 text-xs font-semibold text-center w-40">
                    Appeals Process
                </div>
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
            {[
                { label: "Documents", value: "5" },
                { label: "Institutions Piloted", value: "3" },
                { label: "Stakeholders Covered", value: "45+" },
            ].map(stat => (
                <div key={stat.label}>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
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
        <main className="bg-paper-cool min-h-screen">
            {/* Header */}
            <section className="bg-white border-b border-slate-100 pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <span className="section-label">Governance Lab</span>
                        <h1
                            className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6 max-w-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Institutional Design Documents
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                            Constitutions, charters, legislative frameworks, voting systems, and accountability models — the governance infrastructure for equitable educational institutions.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Documents */}
                        <div className="lg:col-span-2">
                            {/* Filters */}
                            <FadeIn className="flex flex-wrap gap-2 mb-8">
                                {types.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilter(type)}
                                        className={`filter-pill ${filter === type ? "filter-pill-active" : "filter-pill-inactive"}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </FadeIn>

                            <div className="space-y-4">
                                {filtered.map((doc, i) => (
                                    <FadeIn key={doc.id} delay={i * 0.08}>
                                        <div className="doc-card">
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColors[doc.type] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
                                                        {doc.type}
                                                    </span>
                                                    <span className="text-xs text-slate-400">{doc.version}</span>
                                                    <span className="text-xs text-slate-400">{doc.year}</span>
                                                </div>
                                                <span className="text-xs text-slate-400 shrink-0">{doc.pages} pages</span>
                                            </div>

                                            <h3
                                                className="text-xl font-bold text-slate-900 mb-1"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {doc.title}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-500 mb-3">{doc.subtitle}</p>
                                            <p className="text-sm text-slate-600 leading-relaxed">{doc.abstract}</p>

                                            <div className="mt-4 flex flex-wrap gap-1.5 mb-4">
                                                {doc.tags.map(tag => (
                                                    <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{tag}</span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                                <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Download PDF
                                                </button>
                                                <button className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                                    Read Online
                                                </button>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <FadeIn delay={0.1}>
                                <GovernanceHierarchy />
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="bg-slate-900 text-white rounded-2xl p-6">
                                    <h4 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Design Principles
                                    </h4>
                                    <ul className="space-y-3 text-sm text-slate-300">
                                        {[
                                            "Stakeholder rights before institutional efficiency",
                                            "Transparency as a default, not an exception",
                                            "Democratic legitimacy through participation",
                                            "Accountability with clear enforcement mechanisms",
                                            "Adaptability to diverse institutional contexts",
                                        ].map((principle, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-slate-500 mt-0.5">—</span>
                                                {principle}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default GovernanceLab;
