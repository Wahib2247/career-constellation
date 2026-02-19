import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { aboutContent, timeline, skills, experiences, stakeholderFeedback } from "../constants";

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

const About = () => {
  const areasOfWork = [
    {
      icon: "🏫",
      title: "EdTech Systems",
      description: "Designing educational platforms that integrate behavioral economics, governance tools, and economic incentives to create equitable learning environments.",
      projects: ["ClassFusion", "Behavioral Incentive Research"],
    },
    {
      icon: "⚖️",
      title: "Governance Innovation",
      description: "Building constitutional frameworks, rights charters, voting systems, and accountability models for educational institutions.",
      projects: ["GovernanceOS", "Institutional Constitution Framework"],
    },
    {
      icon: "📊",
      title: "Economic Inclusion",
      description: "Designing micro-investment models, outcome-based funding systems, and community capital frameworks for educational equity.",
      projects: ["MicroInvest Education Fund", "Token Economy Design"],
    },
  ];

  const researchInterests = aboutContent.interests.items.find(i => i.title === "Research Interests")?.content || [
    "Democratic governance in non-state institutions",
    "Behavioral economics of educational engagement",
    "Community capital and social investment models",
    "Youth participation in institutional design",
    "Technology-mediated governance systems",
    "Constitutional theory and institutional design",
  ];

  const signatureQuote = aboutContent.academic.items.find(i => i.title === "Signature Quote")?.content || "Life is short, sleep is eternal";

  return (
    <main className="bg-paper-cool min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <span className="section-label">About</span>
              <h1
                className="text-5xl sm:text-6xl font-bold text-slate-900 mt-4 mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Institutional<br />
                <span className="italic text-slate-400">Architect</span>
              </h1>
              <p className="text-blue-600 font-medium italic mb-6">"{signatureQuote}"</p>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                I work at the intersection of education systems, governance innovation, and economic inclusion — designing institutional frameworks, running behavioral pilots, and building technology that makes these systems tangible.
              </p>
              <p className="text-slate-600 leading-relaxed">
                My goal is not to build products, but to build <em>infrastructure</em>: the governance frameworks, economic models, and institutional architectures that make equitable education possible at scale.
              </p>
              <div className="mt-8 flex gap-4">
                <Link to="/contact" className="btn-primary">
                  Get in Touch
                </Link>
                <Link to="/projects" className="btn-secondary">
                  View Work
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              {/* Status card */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-slate-700">Open for Collaboration</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Focus", value: "Education Systems & Governance" },
                    { label: "Location", value: "Pakistan" },
                    { label: "Status", value: "Student Founder" },
                    { label: "Seeking", value: "Research Partners, Institutional Pilots" },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold w-20 shrink-0 pt-0.5">{item.label}</span>
                      <span className="text-sm text-slate-700 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">Current Focus (2024)</div>
                  <ul className="space-y-2">
                    {[
                      "Scaling ClassFusion pilot to 500+ students",
                      "Completing GovernanceOS documentation",
                      "Submitting behavioral incentives paper for peer review",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
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

      {/* Systems Philosophy */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-slate-400 border border-slate-700 rounded-full mb-6">
                Systems Philosophy
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Iterative experimentation beats master planning. I build to understand."
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {aboutContent.mission.items[0].content}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aboutContent.mission.items[1].content.map((principle, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-blue-400 text-xl mb-3">✦</div>
                <p className="text-slate-300 text-sm leading-relaxed">{principle}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Professional Practice & Residencies Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">Applied Research</p>
              <h2 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Professional Practices & Residencies
              </h2>
            </div>
            <p className="text-slate-500 max-w-md text-sm leading-relaxed">
              Bridging academic inquiry with industrial application through strategic internships and functional research roles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 bg-paper-cool rounded-2xl border border-slate-200 hover:border-blue-200 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-2 group-hover:scale-110 transition-transform shadow-sm">
                      <img src={exp.icon} alt={exp.company_name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{exp.title}</h3>
                      <p className="text-blue-600 font-semibold text-xs uppercase tracking-wider">{exp.company_name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-6 font-medium italic">{exp.date}</p>
                  <ul className="space-y-3 flex-1">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="text-blue-500 text-xs mt-1.5 flex-shrink-0">◆</span>
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

      {/* Areas of Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn className="mb-12">
            <span className="section-label">Areas of Work</span>
            <h2
              className="text-3xl font-bold text-slate-900 mt-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Three Domains of Practice
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areasOfWork.map((area, i) => (
              <FadeIn key={area.title} delay={i * 0.1}>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 h-full">
                  <div className="text-3xl mb-4">{area.icon}</div>
                  <h3
                    className="text-xl font-bold text-slate-900 mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{area.description}</p>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Projects</div>
                    <ul className="space-y-1">
                      {area.projects.map(p => (
                        <li key={p} className="text-sm text-slate-700 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-400" />
                          {p}
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

      {/* Timeline */}
      <section className="py-20 bg-paper-cool">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <FadeIn className="mb-12">
            <span className="section-label">Timeline</span>
            <h2
              className="text-3xl font-bold text-slate-900 mt-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Initiatives Timeline
            </h2>
          </FadeIn>

          <div className="relative max-w-3xl">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-1.5 w-10 h-10 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-slate-600">{item.year.slice(-2)}</span>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-institutional">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{item.type}</span>
                        <span className="text-xs text-slate-400">{item.year}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <span className="section-label">Research Interests</span>
              <h2
                className="text-3xl font-bold text-slate-900 mt-4 mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Active Research Threads
              </h2>
              <ul className="space-y-3">
                {researchInterests.map((interest, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-slate-500">
                      {i + 1}
                    </span>
                    {interest}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>


              <span className="section-label">Technical Stack</span>
              <h2
                className="text-3xl font-bold text-slate-900 mt-4 mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Research Tools
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
                      <img src={skill.imageUrl} alt={skill.name} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{skill.name}</div>
                      <div className="text-xs text-slate-400">{skill.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
          <FadeIn>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Open a Channel
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Research partnerships, institutional pilots, governance consultations. If you're working on education equity or governance innovation, let's connect.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Contact
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default About;