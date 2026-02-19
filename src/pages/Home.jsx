import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { metrics, projects, researchPapers, reflections } from "../constants";

// Animated counter hook
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

// Single metric counter component
const MetricCounter = ({ metric, inView }) => {
  const count = useCounter(metric.value, 1800, inView);
  return (
    <div className="metric-card group hover:shadow-institutional-lg transition-all duration-300">
      <div className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 font-playfair">
        {count}{metric.suffix}
      </div>
      <div className="text-sm font-semibold text-slate-700 mb-1">{metric.label}</div>
      <div className="text-xs text-slate-400">{metric.description}</div>
    </div>
  );
};

// Fade-in on scroll
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const metricsRef = useRef(null);
  const [metricsInView, setMetricsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMetricsInView(true); },
      { threshold: 0.2 }
    );
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const featuredPapers = researchPapers.slice(0, 3);
  const featuredReflection = reflections[0];

  return (
    <main className="bg-paper-cool min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-white">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#1D2235 1px, transparent 1px), linear-gradient(90deg, #1D2235 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        {/* Accent orb */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label">Governance & EdTech Research Lab</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Designing Systems That{" "}
              <span className="italic text-slate-500">Democratize</span>{" "}
              Education and Governance.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-inter"
            >
              Building equitable education infrastructure, micro-investment ecosystems, and institutional governance frameworks — from the ground up, with evidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/projects" className="btn-primary">
                Explore Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/research" className="btn-secondary">
                Read Research
              </Link>
            </motion.div>

            {/* Domain tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex flex-wrap gap-2"
            >
              {["Education Systems", "Governance Innovation", "Economic Inclusion", "Behavioral Research", "Institutional Design"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <section ref={metricsRef} className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn className="text-center mb-12">
            <span className="section-label">Impact to Date</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Evidence-Driven Work
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <FadeIn key={metric.label} delay={i * 0.1}>
                <MetricCounter metric={metric} inView={metricsInView} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTITUTIONAL VISION ─── */}
      <section className="py-24 bg-paper-cool">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn className="mb-16">
            <span className="section-label">Institutional Vision</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Pillars of Systemic Change
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏛️",
                title: "Education as Infrastructure",
                body: "Education systems should be designed like public infrastructure — with formal governance, accountability mechanisms, and stakeholder rights. Not as service delivery, but as democratic institutions.",
                link: "/projects",
              },
              {
                icon: "⚖️",
                title: "Governance as Technology",
                body: "Governance frameworks are a form of social technology — they can be designed, tested, iterated, and improved. Modern institutional design should apply engineering rigor to governance.",
                link: "/governance",
              },
              {
                icon: "📊",
                title: "Economics of Inclusion",
                body: "Economic exclusion from education is a design choice that can be reversed with better economic models. Micro-investment and outcome-based funding can align incentives across all stakeholders.",
                link: "/research",
              },
            ].map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-institutional hover:shadow-institutional-lg transition-all duration-300 group h-full flex flex-col">
                  <div className="text-3xl mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">{pillar.body}</p>
                  <Link
                    to={pillar.link}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:gap-3 transition-all"
                  >
                    Explore
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FLAGSHIP PLATFORM ─── */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/30 rounded-full mb-6">
                Flagship Platform
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                ClassFusion
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                An adaptive learning platform integrating behavioral incentive systems, teacher governance tools, and micro-investment mechanisms to democratize quality education.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Students Piloted", value: "120+" },
                  { label: "Engagement Increase", value: "41%" },
                  { label: "Teacher Satisfaction", value: "67%" },
                  { label: "Pilot Duration", value: "6 weeks" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/projects/classfusion" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-colors">
                View Full Case Study
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8 space-y-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-6">Platform Architecture</div>
                {[
                  { layer: "Behavioral Layer", desc: "Token incentives, variable rewards, social proof", color: "bg-blue-500" },
                  { layer: "Governance Layer", desc: "Teacher tools, student rights, admin oversight", color: "bg-purple-500" },
                  { layer: "Economic Layer", desc: "Micro-investment, outcome funding, community capital", color: "bg-emerald-500" },
                  { layer: "Analytics Layer", desc: "Institutional dashboards, policy insights, impact metrics", color: "bg-amber-500" },
                ].map((item, i) => (
                  <div key={item.layer} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${item.color} shrink-0`} />
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{item.layer}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS GRID ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn className="flex items-end justify-between mb-12">
            <div>
              <span className="section-label">Institutional Projects</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Systems Under Construction
              </h2>
            </div>
            <Link to="/projects" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <Link to={`/projects/${project.slug}`} className="block group">
                  <div className="doc-card h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${project.statusColor === "blue" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                          project.statusColor === "green" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                            "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-slate-400">{project.year}</span>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-1 font-medium">{project.subtitle}</p>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1 mt-3">{project.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESEARCH CONTRIBUTIONS ─── */}
      <section className="py-24 bg-paper-cool">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn className="flex items-end justify-between mb-12">
            <div>
              <span className="section-label">Research</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Research Contributions
              </h2>
            </div>
            <Link to="/research" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              All Papers
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>

          <div className="space-y-4">
            {featuredPapers.map((paper, i) => (
              <FadeIn key={paper.id} delay={i * 0.1}>
                <Link to="/research" className="block group">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-institutional hover:shadow-institutional-lg transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                            {paper.category}
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${paper.status === "Published" ? "bg-emerald-50 text-emerald-700" :
                              paper.status === "Draft" ? "bg-amber-50 text-amber-700" :
                                "bg-blue-50 text-blue-700"
                            }`}>
                            {paper.status}
                          </span>
                          <span className="text-xs text-slate-400">{paper.year}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {paper.title}
                        </h3>
                        <p className="text-sm text-slate-500 mb-3">{paper.subtitle}</p>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{paper.abstract}</p>
                      </div>
                      <div className="hidden sm:flex flex-col items-end gap-2 shrink-0 text-right">
                        <span className="text-xs text-slate-400">{paper.pages} pages</span>
                        <span className="text-xs text-slate-400">{paper.citations} citations</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER QUOTE ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
          <FadeIn>
            <div className="text-6xl text-slate-200 mb-6 font-serif">"</div>
            <blockquote
              className="text-2xl sm:text-3xl font-medium text-slate-800 leading-relaxed mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Iterative experimentation beats master planning. I build to understand — and I document everything so others can build further.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-900">Wahib</div>
                <div className="text-xs text-slate-400">Founder, Governance & EdTech Lab</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FEATURED REFLECTION ─── */}
      <section className="py-24 bg-paper-cool">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn className="flex items-end justify-between mb-12">
            <div>
              <span className="section-label">Reflections</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                From the Lab Journal
              </h2>
            </div>
            <Link to="/reflections" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              All Entries
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>

          {featuredReflection && (
            <FadeIn>
              <Link to="/reflections" className="block group">
                <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-institutional hover:shadow-institutional-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="section-label">{featuredReflection.category}</span>
                    <span className="text-xs text-slate-400">{featuredReflection.date}</span>
                    <span className="text-xs text-slate-400">· {featuredReflection.readTime} read</span>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {featuredReflection.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg max-w-3xl">{featuredReflection.excerpt}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:gap-3 transition-all">
                    Read Full Entry
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
          <FadeIn>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Open for Collaboration
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Research partnerships, institutional pilots, governance consultations, and co-design opportunities. If you're working on education equity or governance innovation, let's connect.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Start a Conversation
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20">
                About the Lab
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Home;
