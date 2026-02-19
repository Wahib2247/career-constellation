import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { investments } from "../constants/investments";

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const SectionHeader = ({ label, title }) => (
    <div className="mb-8">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block">{label}</span>
        <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
    </div>
);

const InvestmentDetail = () => {
    const { investmentId } = useParams();
    const item = investments.find(i => i.id === investmentId);

    useEffect(() => {
        if (item) {
            document.title = `Wahib | ${item.name} Analysis`;
        }
    }, [item]);

    if (!item) return <Navigate to="/investments" replace />;

    return (
        <main className="bg-white min-h-screen pt-28 pb-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Breadcrumb & Navigation */}
                <FadeIn className="mb-12 flex items-center justify-between">
                    <Link to="/investments" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Return to Lab
                    </Link>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">{item.sector}</span>
                        <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-sm">{item.investmentTheme}</span>
                    </div>
                </FadeIn>

                {/* Hero Section */}
                <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <FadeIn>
                        <div className="w-16 h-16 rounded-2xl bg-paper-cool border border-slate-100 flex items-center justify-center p-4 mb-8">
                            <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Analysis: <br />
                            <span className="italic text-slate-400">{item.name}</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            {item.companyOverview}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.15}>
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125" />
                            <div className="relative z-10">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-6">Investigator's Summary</h3>
                                <p className="text-slate-300 mb-8 leading-relaxed italic border-l-2 border-blue-500 pl-6">
                                    "{item.learningOutcomes}"
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Thesis Tag</p>
                                        <p className="font-bold text-sm text-white">{item.thesisTag}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Focus Mode</p>
                                        <p className="font-bold text-sm text-white">Systems Micro-Analysis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Core Analysis Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

                    {/* Main Body */}
                    <div className="lg:col-span-2 space-y-20">

                        {/* 1. Why I Invested (Thesis) */}
                        <FadeIn>
                            <SectionHeader label="Thesis Exploration" title="Investment Rationale" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Market Gap", content: item.whyIInvested.marketGap },
                                    { label: "Innovation Model", content: item.whyIInvested.innovationModel },
                                    { label: "Governance Structure", content: item.whyIInvested.governanceStructure },
                                    { label: "Inclusion Potential", content: item.whyIInvested.inclusionPotential }
                                ].map(point => (
                                    <div key={point.label} className="p-6 bg-paper-cool border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{point.label}</h4>
                                        <p className="text-sm text-slate-700 leading-relaxed font-semibold">{point.content}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* 2. Systemic Relevance */}
                        <FadeIn>
                            <SectionHeader label="Connection Graph" title="Systemic Relevance" />
                            <div className="space-y-4">
                                {[
                                    { title: "Education Impact", content: item.systemicRelevance.education },
                                    { title: "Financial Access", content: item.systemicRelevance.financeAccess },
                                    { title: "Youth Empowerment", content: item.systemicRelevance.youthEmpowerment },
                                    { title: "Platform Economics", content: item.systemicRelevance.platformEconomics }
                                ].map((row, i) => (
                                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-6 border-b border-slate-100 group">
                                        <h4 className="text-sm font-black uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors w-48 shrink-0">{row.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{row.content}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                    </div>

                    {/* Sidebar Analysis */}
                    <div className="lg:col-span-1 space-y-12">

                        {/* 3. Risk Reflection */}
                        <FadeIn delay={0.2}>
                            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8">
                                <SectionHeader label="Adversarial Analysis" title="Risk Reflection" />
                                <div className="space-y-8">
                                    {[
                                        { label: "Scaling Barriers", content: item.riskReflection.scalingBarriers },
                                        { label: "Regulatory Friction", content: item.riskReflection.regulatoryFriction },
                                        { label: "Monetization Risks", content: item.riskReflection.monetizationRisks }
                                    ].map(risk => (
                                        <div key={risk.label} className="group">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{risk.label}</h4>
                                            </div>
                                            <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                                                {risk.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        {/* 4. Contact / Follow up */}
                        <FadeIn delay={0.3}>
                            <div className="p-8 bg-blue-600 rounded-[2rem] text-white">
                                <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Discuss this Thesis</h3>
                                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                                    Have insights on the governance or market dynamics of this sector? Let's conduct a peer review.
                                </p>
                                <Link to="/contact" className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-sm block text-center hover:bg-blue-50 transition-colors">
                                    Open Investigation
                                </Link>
                            </div>
                        </FadeIn>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default InvestmentDetail;
