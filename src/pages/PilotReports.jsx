import { useState } from "react";
import { motion } from "framer-motion";
import { pilotReports } from "../constants";

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

const PilotCard = ({ report }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-institutional overflow-hidden">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {report.status}
                    </span>
                    <span className="text-xs text-slate-400">{report.year}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400">{report.duration}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400">{report.sampleSize}</span>
                </div>

                <h2
                    className="text-2xl font-bold text-slate-900 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {report.title}
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-6 italic">{report.subtitle}</p>

                {/* Hypothesis */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                    <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Hypothesis</div>
                    <p className="text-slate-700 text-sm leading-relaxed italic">"{report.hypothesis}"</p>
                </div>

                {/* Key Finding */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-4">
                    <div className="text-xs uppercase tracking-widest text-emerald-600 mb-2 font-semibold">Key Finding</div>
                    <p className="text-slate-700 text-sm leading-relaxed">{report.findings}</p>
                </div>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                    {expanded ? "Collapse Details" : "View Full Report"}
                    <svg
                        className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {expanded && (
                <div className="border-t border-slate-100 p-8 bg-slate-50 space-y-6">
                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">Study Design</div>
                        <p className="text-slate-600 text-sm leading-relaxed">{report.design}</p>
                    </div>

                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">Metrics Tracked</div>
                        <ul className="space-y-1.5">
                            {report.metricsTracked.map((m, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">Constraints</div>
                        <ul className="space-y-1.5">
                            {report.constraints.map((c, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">Future Improvements</div>
                        <ul className="space-y-1.5">
                            {report.futureImprovements.map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="px-8 py-4 border-t border-slate-100 flex items-center gap-4">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Report
                </button>
                <div className="flex flex-wrap gap-1.5 ml-auto">
                    {report.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PilotReports = () => {
    return (
        <main className="bg-paper-cool min-h-screen">
            <section className="bg-white border-b border-slate-100 pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <span className="section-label">Pilot Reports</span>
                        <h1
                            className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6 max-w-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Empirical Experimentation
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                            Structured pilot studies testing theoretical frameworks against real-world constraints. Each report documents hypothesis, design, findings, and limitations.
                        </p>
                    </FadeIn>

                    {/* Summary stats */}
                    <FadeIn delay={0.1} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Pilots Completed", value: "3" },
                            { label: "Total Participants", value: "185+" },
                            { label: "Institutions Involved", value: "6" },
                            { label: "Avg. Duration", value: "7 weeks" },
                        ].map(stat => (
                            <div key={stat.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </FadeIn>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-8">
                    {pilotReports.map((report, i) => (
                        <FadeIn key={report.id} delay={i * 0.08}>
                            <PilotCard report={report} />
                        </FadeIn>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default PilotReports;
