import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { CTA } from "../components";
import { projects, pageTexts } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  const { title, titleHighlight, description } = pageTexts.projects;
  const [titleRef, titleVisible] = useScrollAnimation();
  const [descRef, descVisible] = useScrollAnimation({ threshold: 0.2 });
  const [divingLink, setDivingLink] = useState(null);
  const navigate = useNavigate();

  const handleDiveDeep = (e, projectName) => {
    e.preventDefault();
    const link = e.currentTarget;
    const targetUrl = `/projects/${projectName.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Find the project card
    const card = link.closest('.project-card');
    if (!card) return;
    
    // Get card position for paint splash origin
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Add dive deep class to the clicked card
    card.classList.add('dive-deep-active');
    
    // Create colorful paint splashes
    const colors = [
      'rgba(255, 20, 147, 0.6)',   // Deep pink
      'rgba(0, 198, 255, 0.6)',     // Cyan
      'rgba(255, 215, 0, 0.6)',     // Gold
      'rgba(138, 43, 226, 0.6)',    // Blue violet
      'rgba(255, 69, 0, 0.6)',      // Red orange
      'rgba(0, 255, 127, 0.6)',     // Spring green
    ];
    
    const angles = [0, 60, 120, 180, 240, 300];
    const splashElements = [];
    
    colors.forEach((color, index) => {
      const splash = document.createElement('div');
      splash.className = 'dive-deep-paint-splash';
      splash.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
      splash.style.left = `${centerX}px`;
      splash.style.top = `${centerY}px`;
      splash.style.transformOrigin = 'center';
      
      // Calculate splash direction
      const angle = (angles[index] * Math.PI) / 180;
      const distance = 150 + Math.random() * 100;
      const splashX = Math.cos(angle) * distance;
      const splashY = Math.sin(angle) * distance;
      
      splash.style.setProperty('--splash-x', `${splashX}px`);
      splash.style.setProperty('--splash-y', `${splashY}px`);
      
      document.body.appendChild(splash);
      splashElements.push(splash);
    });
    
    // Add rainbow overlay
    const overlay = document.createElement('div');
    overlay.className = 'dive-deep-overlay';
    document.body.appendChild(overlay);
    
    // Navigate after animation
    setTimeout(() => {
      navigate(targetUrl);
      // Clean up
      setTimeout(() => {
        splashElements.forEach(splash => {
          if (splash.parentNode) {
            splash.parentNode.removeChild(splash);
          }
        });
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        card.classList.remove('dive-deep-active');
        setDivingLink(null);
      }, 100);
    }, 400);
  };

  return (
    <section className="max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)]">
      <h1
        ref={titleRef}
        className={`sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins transition-all duration-700 ${
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {title}{" "}
        <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent drop-shadow font-semibold">
          {titleHighlight}
        </span>
      </h1>

      <p
        ref={descRef}
        className={`text-slate-500 mt-2 leading-relaxed transition-all duration-700 delay-100 ${
          descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {description}
      </p>

      <div className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const [projectRef, projectVisible] = useScrollAnimation({ threshold: 0.1 });

          // Layout: first card full width, next 3 in column, rest full width
          let colSpan = '';
          if (index === 0) {
            // First card: full width
            colSpan = 'md:col-span-2 lg:col-span-3';
          } else if (index >= 1 && index <= 3) {
            // Cards 1-3: single column (stacked)
            colSpan = 'md:col-span-1 lg:col-span-1';
          } else {
            // Remaining cards: full width
            colSpan = 'md:col-span-2 lg:col-span-3';
          }

          return (
            <div
              ref={projectRef}
              key={project.name}
              className={`project-card ${colSpan} relative w-full group cursor-pointer transition-all duration-700 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${
                projectVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Inverted Border Radius Effect using CSS Mask */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  maskImage: "url(#inverted-border-mask)",
                  WebkitMaskImage: "url(#inverted-border-mask)", // For webkit browsers
                }}
              />
              <svg height="0" width="0">
                <defs>
                  <mask id="inverted-border-mask" x="0" y="0" width="100%" height="100%">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <rect x="20" y="20" width="calc(100% - 40px)" height="calc(100% - 40px)" fill="black" />
                  </mask>
                </defs>
              </svg>

              {/* Main Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="block-container w-14 h-14 group-hover:scale-110 transition-transform duration-300 mb-4">
                  <div className={`btn-back rounded-xl ${project.theme}`} />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={project.iconUrl}
                      alt={project.name}
                      className="w-1/2 h-1/2 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                <h4 className="text-xl font-poppins font-semibold group-hover:text-blue-600 transition-colors duration-300 mb-2">
                  {project.name}
                </h4>

                <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mt-auto flex items-center gap-2 font-poppins group/link">
                  <Link
                    to={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleDiveDeep(e, project.name)}
                    className="font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-all duration-300 text-sm"
                  >
                    Dive Deep
                    <img
                      src={arrow}
                      alt="arrow"
                      className="w-4 h-4 object-contain transform group-hover/link:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};

export default Projects;
