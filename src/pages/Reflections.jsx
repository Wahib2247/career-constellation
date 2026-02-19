import { useState } from "react";
import { motion } from "framer-motion";
import { reflections } from "../constants";

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
    "Institutional Design": "bg-blue-50 text-blue-700",
    "EdTech": "bg-emerald-50 text-emerald-700",
    "Systems Thinking": "bg-purple-50 text-purple-700",
    "Education": "bg-amber-50 text-amber-700",
};

const ReflectionCard = ({ reflection, featured = false }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bg-white rounded-2xl border border-slate-100 shadow-institutional overflow-hidden ${featured ? "ring-2 ring-slate-900 ring-offset-2" : ""}`}>
            <div className="p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    {featured && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-white">
                            Featured
                        </span>
                    )}
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[reflection.category] || "bg-slate-50 text-slate-600"}`}>
                        {reflection.category}
                    </span>
                    <span className="text-xs text-slate-400">{reflection.date}</span>
                    <span className="text-xs text-slate-400">· {reflection.readTime} read</span>
                </div>

                <h2
                    className="text-2xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {reflection.title}
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-4 italic">{reflection.subtitle}</p>
                <p className="text-slate-600 leading-relaxed">{reflection.excerpt}</p>

                {expanded && (
                    <div className="mt-6 pt-6 border-t border-slate-100 prose-institutional">
                        {reflection.content.split('\n\n').map((para, i) => (
                            <p key={i} className="text-slate-600 text-sm leading-relaxed mb-4">{para}</p>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                >
                    {expanded ? "Collapse" : "Read Full Entry"}
                    <svg
                        className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className="px-8 py-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {reflection.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{tag}</span>
                ))}
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
        <main className="bg-paper-cool min-h-screen">
            <section className="bg-white border-b border-slate-100 pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <span className="section-label">Reflections</span>
                        <h1
                            className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6 max-w-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Lab Journal
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                            Intellectual reflections on building institutional systems, governance innovation, and the barriers to scaling youth-led change. Written in the process, not after.
                        </p>
                    </FadeIn>

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

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-8">
                    {filtered.map((reflection, i) => (
                        <FadeIn key={reflection.id} delay={i * 0.08}>
                            <ReflectionCard reflection={reflection} featured={i === 0 && filter === "All"} />
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Writing note */}
            <section className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <div className="text-center">
                            <p className="text-slate-400 text-sm italic font-serif">
                                "These entries are written in the process of building — not as polished essays, but as honest records of thinking in motion."
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
};

export default Reflections;
