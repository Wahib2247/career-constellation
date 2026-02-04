import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { aboutContent, importantTechIcons, skills } from "../constants";

const About = () => {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef({});

  const sections = [
    { id: "profile", title: "Identity" },
    { id: "arsenal", title: "Research Arsenal" },
    { id: "mission", title: "Philosophy" },
    { id: "fieldwork", title: "Proof of Work" },
    { id: "ideas", title: "Directions" },
    { id: "interests", title: "Logs" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 min-h-screen bg-[#F8FAFC] overflow-hidden">

      {/* ----------------- GLOBAL BACKGROUND ----------------- */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        {/* Restored ambient orbs but lighter */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100 blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50 blur-[100px] opacity-40"></div>
      </div>

      {/* ----------------- SIDE NAV ----------------- */}
      <div className='hidden xl:block fixed right-12 top-1/2 transform -translate-y-1/2 z-20'>
        <nav className='bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-4 border border-slate-200'>
          <ul className='space-y-4'>
            {sections.map((section) => (
              <li key={section.id} className="relative group">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 writing-vertical-lr py-2 ${activeSection === section.id
                    ? "text-blue-600 scale-105"
                    : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {section.title}
                </button>
                {activeSection === section.id && (
                  <span className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-full"></span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ----------------- 1. INVESTIGATOR PROFILE ----------------- */}
      <div id="profile" ref={(el) => (sectionRefs.current.profile = el)} className="mb-32">
        <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
          Independent Investigator
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-5xl sm:text-7xl font-bold font-poppins text-slate-900 leading-tight mb-8">
              Wahib <br />
              <span className="text-slate-400 font-serif italic text-4xl sm:text-5xl">Investigator & Systems Builder</span>
            </h1>

            <div className="prose prose-lg text-slate-600 font-light leading-relaxed mb-8">
              <p className="text-xl text-slate-800 font-medium mb-4">
                Exploring the intersection of automation, psychology, and humanitarian impact.
              </p>
              {/* Research Motivation */}
              <p>
                I frame my work not as a career but as a series of missions. My goal is to build systems that automate the mundane to liberate human agency, using insights from behavioral science to design platforms that genuinely improve well-being.
              </p>
              <p>
                This portfolio acts as a laboratory notebook—a living record of ideas, experiments, and reflections rather than a showroom of finished products.
              </p>
            </div>

            <div className="flex gap-4">
              {importantTechIcons.slice(0, 5).map((tech, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm p-2 hover:scale-110 transition-transform" title={tech.name}>
                  <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Avatar / Abstract Visual */}
          <div className="relative h-[500px] w-full bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 via-slate-100 to-slate-200 opacity-60"></div>
            <div className="text-slate-300 font-bold text-9xl select-none opacity-20 transform -rotate-12">W</div>

            {/* Floating "Status" Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg">
              <div className="flex justify-between items-end">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Status</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-sm font-bold text-slate-700">Open for Collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- 2. RESEARCH ARSENAL (Skills) ----------------- */}
      <div id="arsenal" ref={(el) => (sectionRefs.current.arsenal = el)} className="mb-32">
        <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-4">
          <h2 className="text-3xl font-bold font-poppins text-slate-900">Research Arsenal</h2>
          <span className="text-slate-400 font-mono text-sm">v4.0.0</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-3">
              <div className="w-10 h-10 p-2 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
                <img src={skill.imageUrl} alt={skill.name} className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{skill.name}</p>
                <p className="text--[10px] text-slate-400 uppercase tracking-wide">{skill.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- 3. RESEARCH PHILOSOPHY ----------------- */}
      <div id="mission" ref={(el) => (sectionRefs.current.mission = el)} className="mb-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-20"></div>

          <h2 className="relative z-10 text-3xl sm:text-5xl font-bold font-poppins text-white mb-8 leading-tight">
            My Research Philosophy
          </h2>

          <div className="relative z-10 max-w-4xl mx-auto mt-6 text-slate-300 text-lg leading-relaxed font-light">
            <p>"Iterative experimentation beats master planning. I build to understand."</p>
            <div className="mt-8 border-t border-white/10 pt-8" dangerouslySetInnerHTML={{ __html: aboutContent.mission.items[0].content }} />
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-5xl mx-auto mt-16">
            {aboutContent.mission.items[1].content.map((role, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-blue-400 mb-4 text-2xl">✦</div>
                <p className="text-slate-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: role }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------- 4. PROOF OF WORK ----------------- */}
      <div id="fieldwork" ref={(el) => (sectionRefs.current.fieldwork = el)} className="mb-32">
        <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-12 border-l-4 border-slate-900 pl-6">Proof of Work (Artifacts)</h2>

        <div className="space-y-12 relative max-w-4xl">
          <div className="absolute left-8 top-4 bottom-4 w-[1px] bg-slate-200 hidden sm:block"></div>

          {aboutContent.work.items.concat(aboutContent.academic.items).filter(item => item.date || item.title).map((item, index) => (
            <div key={index} className="relative sm:pl-24 group">
              {/* Timeline Dot */}
              <div className="absolute left-[29px] top-6 w-3 h-3 bg-white border-2 border-slate-300 rounded-full z-10 hidden sm:block group-hover:border-blue-500 group-hover:scale-125 transition-all"></div>

              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group-hover:border-blue-200">
                {item.date && (
                  <span className="absolute top-8 right-8 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-wider">
                    {item.date}
                  </span>
                )}

                <h3 className="text-xl font-bold text-slate-800 mb-2 font-poppins">{item.title}</h3>
                {item.subtitle && <p className="text-sm text-slate-500 mb-6 font-medium">{item.subtitle}</p>}

                {item.type === 'list' && (
                  <ul className="space-y-3 mb-6">
                    {item.content.map((point, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed group-hover:text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0 group-hover:bg-blue-400 transition-colors"></span>
                        <span dangerouslySetInnerHTML={{ __html: point }} />
                      </li>
                    ))}
                  </ul>
                )}

                {/* Special Rendering for MagicTask Tree Sections */}
                {item.treeSections && (
                  <div className="mt-4 space-y-4">
                    {item.treeSections.map((sec, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-sm font-bold text-slate-700 mb-2">{sec.title}</h4>
                        <ul className="list-disc ml-4 space-y-1">
                          {sec.points.map((pt, pIdx) => (
                            <li key={pIdx} className="text-xs text-slate-500">{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mt-2">
                    View Artifact
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- 5. CURRENT RESEARCH DIRECTIONS ----------------- */}
      <div id="ideas" ref={(el) => (sectionRefs.current.ideas = el)} className="mb-32">
        <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-4">
          <h2 className="text-3xl font-bold font-poppins text-slate-900">Current Research Directions</h2>
          <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">Running Threads</span>
        </div>

        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {aboutContent.ideas.items.map((idea, index) => (
            <div key={index} className="break-inside-avoid bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-poppins">{idea.title}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-6">{idea.subtitle}</p>

              {idea.type === 'list' ? (
                <ul className="space-y-4">
                  {idea.content.map((point, i) => (
                    <li key={i} className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-4 hover:border-blue-300 transition-colors">
                      <span dangerouslySetInnerHTML={{ __html: point }} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed font-serif italic text-lg">
                  "{idea.content}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- 6. PERSONAL LOGS ----------------- */}
      <div id="interests" ref={(el) => (sectionRefs.current.interests = el)} className="mb-32">
        <div className="p-1 pb-0 bg-gradient-to-br from-slate-200 to-slate-100 rounded-[3rem]">
          <div className="bg-[#F8FAFC] rounded-[2.9rem] p-10 sm:p-20">
            <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-12 text-center">Personal Logs</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutContent.interests.items.map((interest, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{interest.title}</h3>
                  <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider">{interest.subtitle}</p>

                  {interest.type === 'list' && (
                    <ul className="space-y-2">
                      {interest.content.map((item, i) => (
                        <li key={i} className="text-xs text-slate-600 flex gap-2">
                          <span className="text-slate-300">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {interest.type === 'paragraph' && (
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {interest.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- COLLABORATION FOOTER ----------------- */}
      {/* ----------------- COLLABORATION FOOTER ----------------- */}
      <div className="mt-32 pb-12">
        <div className="relative bg-slate-900 rounded-3xl p-12 overflow-hidden text-center group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-[100%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>

          <h2 className="relative z-10 text-4xl sm:text-5xl font-bold font-poppins text-white mb-6 leading-tight">
            Signal Detected?
          </h2>
          <p className="relative z-10 text-slate-300 mb-10 max-w-xl mx-auto text-lg font-light leading-relaxed">
            This lab operates on exchange. If you have a hypothesis to test, a system to build, or a critique to offer, open a channel.
          </p>

          <Link
            to="/contact"
            className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Open Frequency
          </Link>
        </div>
      </div>

    </section>
  );
};

export default About;