import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { investments } from "../constants/investments";
import MathFormula from "../components/MathFormula";

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
);

const TechnicalWatermark = () => (
    <div className="absolute inset-x-0 top-[20%] pointer-events-none opacity-[0.03] select-none z-0 overflow-hidden whitespace-nowrap">
        <div className="text-[20vw] font-black uppercase tracking-tighter">
            CAPITAL_ALLOCATION // AUDIT_LOG // {new Date().getFullYear()}
        </div>
    </div>
);

const HypothesisCard = ({ hypothesis }) => (
    <div className="bento-item bg-ink text-paper p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] pointer-events-none" />
        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-paper/60 mb-8 font-mono">
            // Allocation_Hypothesis
        </div>
        <div className="space-y-8">
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-paper/40 mb-2 font-sans">Statement</h4>
                <p className="text-2xl font-black italic tracking-tight leading-[1.1] font-serif">{hypothesis.statement}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-paper/40 mb-2 font-sans">Variable</h4>
                    <p className="text-xs font-bold text-paper/60 italic font-mono">{hypothesis.variable}</p>
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-paper/40 mb-2 font-sans">Simulated Outcome</h4>
                    <p className="text-xs font-bold text-paper/60 italic font-mono">{hypothesis.outcome}</p>
                </div>
            </div>
        </div>
    </div>
);

const AdversarialAnalysis = ({ analysis }) => (
    <div className="bento-item bg-white border-red-500/10 p-10 hover:shadow-2xl transition-all duration-700 relative group">
        <div className="absolute top-4 right-4 text-[10px] font-black text-red-500/20 uppercase tracking-[0.5em] font-mono">Red_Team_Audit</div>
        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-8 flex items-center gap-3 font-mono">
            <span className="w-2 h-2 bg-red-500/20 rounded-full animate-pulse" />
            Adversarial_Analysis
        </div>
        <div className="space-y-8">
            <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/40 mb-2 font-sans">Attack Vector</h5>
                <p className="text-lg text-ink/80 font-black italic leading-tight font-serif">{analysis.attackVector}</p>
            </div>
            <div className="pt-6 border-t border-ink/[0.08]">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/40 mb-2 font-sans">Mitigation</h5>
                <p className="text-sm font-bold text-ink/60 italic font-inter">{analysis.mitigation}</p>
            </div>
        </div>
    </div>
);

const SystemLogic = ({ logic }) => (
    <div className="bento-item border-ink/[0.08] p-12 bg-white flex flex-col justify-center items-center text-center group">
        <div className="text-[9px] font-black uppercase tracking-[0.5em] text-ink/45 mb-10 font-mono">Economic_Logic_Model</div>
        <div className="text-4xl sm:text-5xl font-black text-ink tracking-tight font-serif mb-6 bg-paper/50 px-8 py-4 rounded-3xl border border-ink/[0.07] overflow-x-auto">
            <MathFormula formula={logic} />
        </div>
        <div className="flex gap-2 opacity-10">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-ink" />)}
        </div>
    </div>
);

const TraceabilityStack = ({ item }) => (
    <div className="mt-12 space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/55 mb-6 font-mono">Traceability_Matrix</h4>
        <div className="p-6 bg-ink/[0.02] border border-ink/[0.08] rounded-2xl">
            <div className="text-[10px] font-black text-ink/55 uppercase tracking-widest mb-1 font-mono">Investment Theme</div>
            <div className="text-sm font-black text-ink italic font-serif transition-colors uppercase">{item.investmentTheme}</div>
        </div>
        <div className="p-6 bg-white border border-ink/[0.08] rounded-2xl shadow-sm">
            <div className="text-[10px] font-black text-ink/55 uppercase tracking-widest mb-1 font-mono">Thesis Tag</div>
            <div className="text-sm font-black text-ink italic font-serif leading-tight uppercase">{item.thesisTag}</div>
        </div>
    </div>
);

const InvestmentDetail = () => {
    const { investmentId } = useParams();
    const item = investments.find(i => i.id === investmentId);

    useEffect(() => {
        if (item) {
            document.title = `Wahib | ${item.name} Analysis`;
            window.scrollTo(0, 0);
        }
    }, [item]);

    if (!item) return <Navigate to="/investments" replace />;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const listItem = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className="bg-paper min-h-screen flex flex-col lg:flex-row relative selection:bg-ink selection:text-paper font-sans overflow-hidden">
            <MeshBackground />
            <TechnicalWatermark />

            {/* ─── LEFT PANE: THE INDEX (Sticky) ─── */}
            <aside className="lg:w-96 w-full lg:h-screen lg:sticky lg:top-0 border-r border-ink/[0.08] bg-white/40 backdrop-blur-3xl z-30 p-12 flex flex-col overflow-y-auto">
                <Link 
                    to="/investments" 
                    className="group inline-flex items-center gap-4 text-ink/40 hover:text-ink transition-all mb-20"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] font-mono">Back_to_Capital</span>
                </Link>

                <div className="flex-1">
                    <div className="space-y-1 mb-12">
                        <div className="text-[11px] font-mono font-black text-ink/55 uppercase tracking-[0.4em] italic mb-4">// Allocation_Metadata</div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-mono font-bold text-ink/40 uppercase tracking-widest">ID: {item.id.toUpperCase()}</span>
                            <span className="text-xs font-mono font-bold text-ink/40 uppercase tracking-widest">SECTOR: {item.sector}</span>
                            <span className="text-xs font-mono font-bold text-ink/40 uppercase tracking-widest">AUDIT: 2024.Q1</span>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="text-[11px] font-mono font-black text-ink/55 uppercase tracking-[0.4em] italic mb-6">// Audit_Status</div>
                        <div className="bg-white/80 border border-ink/[0.08] p-8 rounded-3xl shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-2 h-2 rounded-full m-4 bg-emerald-400 animate-pulse" />
                            <h4 className="text-2xl font-black text-ink tracking-tighter uppercase leading-none font-sans mb-2">VERIFIED</h4>
                            <p className="text-[10px] font-mono font-bold text-ink/40 uppercase tracking-[0.2em]">THESIS_STABLE_V1</p>
                        </div>
                    </div>

                    <TraceabilityStack item={item} />
                </div>

                <div className="pt-12 border-t border-ink/[0.08]">
                    <p className="text-[10px] font-mono font-bold text-ink/55 uppercase tracking-[0.3em] leading-relaxed italic">
                        Constellation_Labs // Capital_Audit <br />
                        Archive_Status: Online
                    </p>
                </div>
            </aside>

            {/* ─── RIGHT PANE: THE DOCUMENT ─── */}
            <article className="flex-1 min-w-0 relative z-10 lg:pl-0">
                <section className="pt-32 lg:pt-48 pb-12 px-8 lg:px-24">
                    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
                        <motion.div variants={listItem} className="mb-20">
                            <div className="w-20 h-20 rounded-2xl bg-white border border-ink/[0.08] p-4 mb-10 shadow-xl flex items-center justify-center">
                                <img src={item.logo} alt={item.name} className="w-full h-full object-contain grayscale opacity-40" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-ink/55 mb-8 block font-mono">
                                // Capital_Allocation_Audit // {item.name}
                            </span>
                            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black text-ink leading-[0.8] tracking-tighter mb-12 font-sans uppercase">
                                Case_Audit<span className="text-ink/5 italic">:</span><br />
                                {item.name}
                            </h1>
                            <p className="text-3xl sm:text-4xl text-ink/60 font-black italic leading-[1.1] font-serif border-l-4 border-ink/[0.08] pl-12 max-w-4xl tracking-tight">
                                {item.companyOverview}
                            </p>
                        </motion.div>

                        <motion.div variants={listItem} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Allocation Hypothesis */}
                            <HypothesisCard hypothesis={item.hypothesis || { statement: "Reach requires scale.", variable: "Cost vs. Benefit", outcome: "Nominal" }} />
                            
                            {/* Adversarial Analysis */}
                            <AdversarialAnalysis analysis={item.adversarialAnalysis || { attackVector: "Incentive Drift", mitigation: "Governance Loop" }} />
                        </motion.div>

                        <motion.div variants={listItem} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div className="md:col-span-1">
                                <SystemLogic logic={item.systemLogic || "V = f(x)"} />
                            </div>
                            <div className="md:col-span-2 bento-item bg-white p-12 border-ink/[0.08] flex flex-col justify-center">
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-8 block font-mono">// Reflective_Insight // Outcomes</span>
                                <p className="text-3xl font-black text-ink tracking-tighter italic font-serif leading-tight">
                                    &ldquo;{item.learningOutcomes}&rdquo;
                                </p>
                            </div>
                        </motion.div>

                        {/* Why I Invested Section */}
                        <motion.div variants={listItem} className="mb-20">
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/55 mb-12 font-mono">Strategic_Rationale // Thesis</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Market_Gap", content: item.whyIInvested.marketGap },
                                    { label: "Innovation_Model", content: item.whyIInvested.innovationModel },
                                    { label: "Governance_Logic", content: item.whyIInvested.governanceStructure },
                                    { label: "Inclusion_Potential", content: item.whyIInvested.inclusionPotential }
                                ].map(point => (
                                    <div key={point.label} className="bento-item bg-white border-ink/[0.08] p-10 hover:bg-paper transition-all duration-700">
                                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-6 font-mono">{point.label}</h4>
                                        <p className="text-lg text-ink/70 leading-snug font-black italic font-serif">{point.content}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Research Linkage */}
                        <motion.div variants={listItem} className="mb-20">
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/55 mb-12 font-mono">Systemic_Integration // Research_Linkage</div>
                            <div className="space-y-6">
                                {[
                                    { title: "Education Impact", content: item.systemicRelevance.education, code: "ED_01" },
                                    { title: "Financial Access", content: item.systemicRelevance.financeAccess, code: "FIN_02" },
                                    { title: "Youth Empowerment", content: item.systemicRelevance.youthEmpowerment, code: "YTH_03" },
                                    { title: "Platform Economics", content: item.systemicRelevance.platformEconomics, code: "PLT_04" }
                                ].map((row, i) => (
                                    <div key={i} className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16 p-10 bg-white border border-ink/[0.05] rounded-3xl group hover:shadow-2xl transition-all duration-700">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/30 w-48 shrink-0 mt-1 font-mono italic">[{row.code}]</h4>
                                        <div className="flex-1">
                                            <h5 className="text-xl font-black text-ink mb-4 italic font-serif group-hover:underline underline-offset-8 transition-all">{row.title}</h5>
                                            <p className="text-ink/50 text-lg leading-relaxed italic font-black font-serif">{row.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Risk Assessment */}
                        <motion.div variants={listItem} className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
                           <div className="md:col-span-2 bento-item bg-ink text-paper p-16 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-paper/5 to-transparent pointer-events-none" />
                                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-paper/60 font-mono mb-16 pb-8 border-b border-paper/10">Stress_Test_Resolution</h4>
                                <div className="space-y-12">
                                    {[
                                        { label: "Scaling_Barriers", content: item.riskReflection.scalingBarriers },
                                        { label: "Regulatory_Friction", content: item.riskReflection.regulatoryFriction },
                                        { label: "Monetization_Degradation", content: item.riskReflection.monetizationRisks }
                                    ].map(risk => (
                                        <div key={risk.label} className="group">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full group-hover:animate-ping" />
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-paper group-hover:italic transition-all font-mono italic">AUDIT::{risk.label}</h4>
                                            </div>
                                            <p className="text-xl text-paper/60 leading-relaxed font-black italic font-serif group-hover:text-paper transition-colors pl-6 border-l border-paper/10">
                                                {risk.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bento-item bg-white p-12 border-ink/[0.08] flex flex-col justify-center text-center">
                                <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase font-sans">Discuss_Audit</h3>
                                <p className="text-ink/40 text-lg mb-12 leading-snug italic font-black font-serif">
                                    Have insights on the governance or market dynamics of this sector?
                                </p>
                                <Link to="/contact" className="w-full py-6 bg-ink text-paper rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] block text-center hover:scale-105 active:scale-95 transition-all shadow-xl font-mono">
                                    ESTABLISH_LINK
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>
            </article>
        </main>
    );
};

export default InvestmentDetail;
