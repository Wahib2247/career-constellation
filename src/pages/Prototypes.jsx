import { motion } from "framer-motion";
import { prototypes } from "../constants";

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
    "Platform UI": "bg-blue-50 text-blue-700 border-blue-100",
    "Governance UI": "bg-purple-50 text-purple-700 border-purple-100",
    "Economic Model": "bg-amber-50 text-amber-700 border-amber-100",
};

const statusColors = {
    Prototype: "bg-blue-50 text-blue-700",
    Simulation: "bg-purple-50 text-purple-700",
    Concept: "bg-slate-50 text-slate-600",
};

// Token Economy Flow Diagram
const TokenEconomyDiagram = () => (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-institutional">
        <h3 className="text-lg font-bold text-slate-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Token Economy Loop
        </h3>
        <div className="relative">
            {/* Center */}
            <div className="flex justify-center mb-6">
                <div className="bg-slate-900 text-white rounded-2xl px-6 py-3 text-sm font-semibold text-center">
                    Institutional Treasury
                </div>
            </div>

            {/* Arrows and nodes */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                    <div className="bg-blue-100 text-blue-800 rounded-xl p-3 text-xs font-semibold">
                        Student Engagement
                    </div>
                    <div className="text-xs text-slate-400">Earns tokens →</div>
                    <div className="bg-blue-50 text-blue-700 rounded-lg p-2 text-xs">
                        Study sessions<br />Peer teaching<br />Milestones
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="bg-emerald-100 text-emerald-800 rounded-xl p-3 text-xs font-semibold">
                        Token Circulation
                    </div>
                    <div className="text-xs text-slate-400">↑ Mint / Burn ↓</div>
                    <div className="bg-emerald-50 text-emerald-700 rounded-lg p-2 text-xs">
                        Inflation controls<br />Redemption rates<br />Equilibrium model
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="bg-purple-100 text-purple-800 rounded-xl p-3 text-xs font-semibold">
                        Redemption Layer
                    </div>
                    <div className="text-xs text-slate-400">← Spends tokens</div>
                    <div className="bg-purple-50 text-purple-700 rounded-lg p-2 text-xs">
                        Advanced content<br />Tutoring access<br />Mentorship
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <div className="text-xs text-slate-400">
                    Community investors fund the treasury → outcomes verified → disbursement triggered
                </div>
            </div>
        </div>
    </div>
);

const Prototypes = () => {
    return (
        <main className="bg-paper-cool min-h-screen">
            <section className="bg-white border-b border-slate-100 pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <FadeIn>
                        <span className="section-label">Prototypes</span>
                        <h1
                            className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6 max-w-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Technical Execution
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                            UI mockups, dashboard previews, token economy simulations, and governance voting interfaces — making abstract systems tangible.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Prototype cards */}
                        <div className="lg:col-span-2 space-y-6">
                            {prototypes.map((proto, i) => (
                                <FadeIn key={proto.id} delay={i * 0.08}>
                                    <div className="doc-card">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[proto.category] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
                                                    {proto.category}
                                                </span>
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[proto.status] || "bg-slate-50 text-slate-600"}`}>
                                                    {proto.status}
                                                </span>
                                            </div>
                                        </div>

                                        <h2
                                            className="text-xl font-bold text-slate-900 mb-1"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {proto.title}
                                        </h2>
                                        <p className="text-sm font-medium text-slate-500 mb-4">{proto.subtitle}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{proto.description}</p>

                                        {/* Features */}
                                        <div className="mb-4">
                                            <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Key Features</div>
                                            <div className="flex flex-wrap gap-2">
                                                {proto.features.map(f => (
                                                    <span key={f} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tech stack */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs text-slate-400 font-medium">Stack:</span>
                                            {proto.techStack.map(t => (
                                                <span key={t} className="text-xs px-2 py-0.5 bg-slate-900 text-white rounded-full">{t}</span>
                                            ))}
                                        </div>

                                        {/* Placeholder preview */}
                                        <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 h-32 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-slate-300 text-2xl mb-1">⬜</div>
                                                <div className="text-xs text-slate-400">Interactive preview coming soon</div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <FadeIn delay={0.1}>
                                <TokenEconomyDiagram />
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="bg-slate-900 text-white rounded-2xl p-6">
                                    <h4 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Prototype Philosophy
                                    </h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Every prototype is built to test a specific hypothesis about how a system should work. The goal is not a polished product, but a working model that generates evidence.
                                    </p>
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
