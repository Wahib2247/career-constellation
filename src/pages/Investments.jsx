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

const Investments = () => {
    return (
        <main className="bg-paper-cool min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Header */}
                <section className="mb-16">
                    <FadeIn>
                        <span className="section-label">Investment Research</span>
                        <h1 className="text-5xl font-bold text-slate-900 mt-4 mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Capital Allocation <span className="italic text-slate-400">Lab</span>
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                            Applying systems thinking to capital allocation. This lab reframes investment from speculative trading to academic research — exploring how capital flows can catalyze institutional innovation, educational equity, and systemic change.
                        </p>
                    </FadeIn>
                </section>

                {/* Methodology Alert */}
                <FadeIn delay={0.1}>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                            🔬
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 mb-1">Research Protocol</h3>
                            <p className="text-blue-800/80 text-sm leading-relaxed">
                                Every allocation listed here is treated as a <strong>systemic case study</strong>. We analyze company governance, innovation models, and inclusion potential to understand how capital influences human flourishing.
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* Investment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {investments.map((item, index) => (
                        <FadeIn key={item.id} delay={index * 0.1}>
                            <Link to={`/investments/${item.id}`} className="group h-full">
                                <div className="bg-white rounded-[2rem] border border-slate-200 p-8 h-full flex flex-col hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative overflow-hidden">
                                    {/* Backdrop decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 group-hover:bg-blue-50 rounded-full -mr-16 -mt-16 transition-colors duration-500" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-paper-cool border border-slate-100 flex items-center justify-center p-3 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">{item.sector}</span>
                                                <div className="h-1 w-8 bg-slate-200 mt-1 rounded-full group-hover:w-12 group-hover:bg-blue-500 transition-all duration-500" />
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {item.name}
                                        </h2>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-full uppercase tracking-tighter group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                {item.investmentTheme}
                                            </span>
                                            <span className="px-3 py-1 border border-slate-100 text-[10px] font-bold text-slate-400 rounded-full uppercase tracking-tighter group-hover:border-blue-200 group-hover:text-blue-500 transition-colors">
                                                {item.thesisTag}
                                            </span>
                                        </div>

                                        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                                            {item.companyOverview.substring(0, 120)}...
                                        </p>

                                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                                            <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">View Case Study</span>
                                            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>

                {/* Ethical Footer */}
                <FadeIn delay={0.4} className="mt-20 pt-10 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-widest font-black mb-4">Institutional Safety Protocol</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {[
                            "Research-based Allocations Only",
                            "No Speculative Trading",
                            "Systems Analysis Priority",
                            "Transparent Governance Research"
                        ].map(rule => (
                            <div key={rule} className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                {rule}
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </main>
    );
};

export default Investments;
