import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { aboutContent, experiences } from "../constants";

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const MeshBackground = () => (
    <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
);

const About = () => {
    const areasOfWork = [
        {
          icon: "SCHEMA",
          title: "EdTech Systems",
          description: "Designing educational platforms that integrate behavioral economics, governance tools, and economic incentives to create equitable learning environments.",
          projects: ["ClassFusion", "Behavioral Incentive Research"],
        },
        {
          icon: "POLICY",
          title: "Governance Innovation",
          description: "Building constitutional frameworks, rights charters, voting systems, and accountability models for educational institutions.",
          projects: ["GovernanceOS", "Institutional Constitution Framework"],
        },
        {
          icon: "MODELS",
          title: "Economic Inclusion",
          description: "Designing micro-investment models, outcome-based funding systems, and community capital frameworks for educational equity.",
          projects: ["MicroInvest Education Fund", "Token Economy Design"],
        },
      ];

  const signatureQuote = aboutContent.academic.items.find(i => i.title === "Signature Quote")?.content || "Iterative experimentation is the baseline.";

  return (
    <main className="bg-paper min-h-screen relative selection:bg-ink selection:text-paper overflow-hidden font-sans">
      <MeshBackground />

      {/* ─── LABORATORY OVERVIEW ─── */}
      <section className="relative pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <FadeIn>
              <span className="section-label group cursor-default">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                Institutional_Profile // Primary_Metadata
              </span>
              <h1
                className="text-6xl sm:text-9xl font-black text-ink mt-8 mb-12 tracking-tighter leading-[0.85]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Systems <br />
                <span className="italic text-ink/20">Architect</span>.
              </h1>
              <div className="bg-white/40 backdrop-blur-sm border-l-4 border-ink p-10 mb-12 shadow-2xl rounded-tr-3xl rounded-br-3xl">
                <p className="text-2xl font-serif italic text-ink/80 leading-tight">
                  "{signatureQuote}"
                </p>
                <div className="mt-6 text-[9px] font-black uppercase tracking-[0.4em] text-ink/55">// Founding_Axiom</div>
              </div>
              <p className="text-2xl text-ink/60 leading-relaxed mb-12 italic border-l border-ink/[0.08] pl-8 font-medium">
                I work at the intersection of education systems, governance innovation, and economic inclusion — designing institutional frameworks, running behavioral pilots, and building technology that makes these systems tangible.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-10 py-5 bg-ink text-paper rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  ENQUIRY_CHANNEL
                </Link>
                <Link to="/projects" className="px-10 py-5 bg-white/40 backdrop-blur-xl border border-ink/[0.08] text-ink rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/60 transition-all">
                  RESEARCH_INDEX
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bento-item bg-white border-ink/[0.08] p-12 group hover:shadow-2xl transition-all duration-700">
                <div className="flex items-center gap-4 mb-12 pb-6 border-b border-ink/[0.08]">
                   <div className="w-12 h-12 bg-ink text-paper rounded-xl flex items-center justify-center font-black text-xl shadow-xl">W</div>
                   <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-ink">Wahib</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/30 italic">Personnel_ID: ARCH_042</div>
                   </div>
                </div>

                <div className="space-y-8">
                  {[
                    { label: "Research_Focus", value: "Education Systems & Governance" },
                    { label: "Deployment_Loc", value: "Pakistan [Central Archive]" },
                    { label: "Designation", value: "Data Analyst" },
                    { label: "Clearance_Lvl", value: "Alpha // Strategic_Design" },
                  ].map(item => (
                    <div key={item.label} className="flex flex-col gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-ink/55">{item.label}</span>
                      <span className="text-sm text-ink font-bold tracking-tight italic border-l border-ink/10 pl-4">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-10 border-t border-ink/[0.08] bg-paper/50 -mx-12 -mb-12 p-12">
                  <div className="text-[9px] font-black uppercase tracking-[0.4em] text-ink/55 mb-8 italic">// Active_Pipeline_v3.0</div>
                  <ul className="space-y-6">
                    {[
                      "Scaling ClassFusion pilot to 500+ simulated nodes",
                      "GovernanceOS final documentation release",
                      "Behavioral incentives paper [Peer Review Status]",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-ink/70 font-bold leading-tight italic group/item">
                        <span className="text-ink/50 font-mono text-xs group-hover/item:text-ink transition-colors">[0{i + 1}]</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── SYSTEMS PHILOSOPHY ─── */}
      <section className="py-40 bg-ink text-paper relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-paper/60 italic block mb-12">
                Foundational_Archives // v4.0
              </span>
              <h2
                className="text-5xl sm:text-8xl font-black mb-16 tracking-tighter leading-[0.9]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Iterative <span className="text-paper/60 italic">Experimentation</span> <br /> 
                Beats Master Planning.
              </h2>
              <p className="text-paper/60 text-2xl leading-tight italic font-serif border-l-2 border-paper/10 pl-10 max-w-3xl">
                We build to understand — and we document everything so others can build further.
              </p>
            </div>
          </FadeIn>

          <div className="mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-paper/10 border border-paper/10 rounded-[3rem] overflow-hidden">
            {aboutContent.mission.items[1].content.map((principle, i) => (
              <div key={i} className="bg-ink p-16 hover:bg-white/5 transition-all duration-700 group">
                <div className="text-paper/60 font-mono text-xs mb-8 tracking-tighter group-hover:text-paper/60 transition-colors">[AXIOM_0{i+1}]</div>
                <p className="text-paper/80 text-md leading-relaxed font-inter font-medium italic pr-8">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROFESSIONAL RESIDENCIES ─── */}
      <section className="py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-28 border-b border-ink/[0.08] pb-12">
            <div className="max-w-2xl">
              <span className="section-label group cursor-default">Practice_History // Residency_Log</span>
              <h2 className="text-5xl sm:text-7xl font-black text-ink mt-8 tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                Professional <br /><span className="text-ink/10 italic">Audit</span>.
              </h2>
            </div>
            <p className="text-ink/40 max-w-md text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed italic border-l border-ink/[0.08] pl-8">
              Validated audit of strategic internships and functional research roles bridging academic theory with industrial application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bento-item bg-white border-ink/[0.08] p-12 hover:shadow-2xl transition-all duration-700 h-full flex flex-col group">
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-16 bg-paper rounded-2xl p-3 shadow-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={exp.icon} alt={exp.company_name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-black text-ink text-sm tracking-widest arrow leading-none mb-2">{exp.title.toUpperCase()}</h3>
                      <p className="text-ink/50 font-black text-[10px] uppercase tracking-[0.3em] italic">{exp.company_name}</p>
                    </div>
                  </div>
                  <div className="text-[9px] font-black text-ink/50 mb-10 border-l-2 border-ink/[0.08] pl-6 tracking-widest uppercase">REV_{exp.date.split(' ').pop()} // {exp.date.split(' ')[0]}</div>
                  <ul className="space-y-6 flex-1">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex gap-4 text-sm text-ink/60 leading-tight font-medium italic group/item">
                        <span className="text-ink/35 mt-1 shrink-0 font-mono text-[10px] group-hover/item:text-ink transition-colors">{" >> "}</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOMAINS OF INQUIRY ─── */}
      <section className="py-40 bg-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 font-mono">
          <FadeIn className="mb-24">
            <span className="section-label">Technical_Domains // Focus_Index</span>
            <h2
              className="text-5xl sm:text-7xl font-black text-ink mt-8 tracking-tighter"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Foundational <br /><span className="text-ink/10 italic">Core_Focus</span>.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areasOfWork.map((area, i) => (
              <FadeIn key={area.title} delay={i * 0.1}>
                <div className="bento-item bg-white border-ink/[0.08] p-16 h-full hover:bg-white transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ink/[0.01] blur-3xl" />
                  <div className="text-[10px] font-black text-ink/50 mb-12 tracking-[0.4em] italic font-mono">DOMAIN_REQ_0{i+1}</div>
                  <h3
                    className="text-4xl font-black text-ink mb-8 tracking-tight group-hover:italic transition-all"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-ink/60 text-lg leading-relaxed mb-16 italic font-inter font-medium">{area.description}</p>
                  
                  <div className="mt-auto">
                    <div className="text-[9px] uppercase font-black tracking-[0.4em] text-ink/50 mb-6 pb-2 border-b border-ink/[0.08] italic">Active Simulation Index</div>
                    <ul className="space-y-4">
                      {area.projects.map(p => (
                        <li key={p} className="text-sm text-ink font-bold flex items-center gap-4 italic group/p">
                          <span className="w-1.5 h-1.5 bg-ink/10 rounded-full group-hover/p:bg-emerald-500 group-hover/p:animate-pulse transition-all shadow-xl" />
                          {p.toUpperCase()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTNOTES ─── */}
      <section className="py-60 relative z-10 text-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10">
          <FadeIn>
            <h2
              className="text-5xl sm:text-8xl font-black mb-12 tracking-tighter italic font-serif leading-none"
            >
              Open for <br /><span className="text-ink/10">Inquiry</span>.
            </h2>
            <p className="text-2xl text-ink/40 mb-20 max-w-2xl mx-auto font-medium italic border-l-2 border-ink/[0.08] pl-10 leading-tight">
              Institutional collaborations, system pilots, and governance consultations are logged via direct inquiry.
            </p>
            <Link to="/contact" className="px-12 py-6 bg-ink text-paper rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-6 mx-auto w-fit">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              ESTABLISH_LINK
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default About;