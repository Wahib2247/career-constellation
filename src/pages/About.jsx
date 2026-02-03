import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CTA, AnimatedCard, AnimatedTitle } from "../components";
import { aboutSections, aboutContent, pageTexts, importantTechIcons } from "../constants";

const About = () => {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef({});
  const navigate = useNavigate();

  const sections = aboutSections;

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 120;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDiveDeep = (e, targetUrl) => {
    e.preventDefault();
    const link = e.currentTarget;
    
    // Find the card container - look for the AnimatedCard wrapper
    let card = link.closest('.group');
    if (!card) {
      card = link.closest('[class*="rounded-xl"]');
    }
    
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
        if (card) {
          card.classList.remove('dive-deep-active');
        }
      }, 100);
    }, 400);
  };

  const renderContentItem = (item) => {
    if (item.type === "list") {
      return (
        <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
          {item.content.map((point, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
          ))}
        </ul>
      );
    } else if (item.type === "paragraph") {
      return (
        <p className='mt-2 text-slate-600 text-sm leading-relaxed'>
          {item.content}
        </p>
      );
    }
    return null;
  };

  return (
    <section className='max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)] relative'>
      {/* Sidebar Navigation */}
      <div className='hidden lg:block fixed right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-20'>
        <nav className='bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-3 border border-gray-200/50'>
          <ul className='space-y-1.5'>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-xs font-medium transition-all duration-200 whitespace-nowrap ${activeSection === section.id
                    ? "text-blue-600 font-semibold"
                    : "text-slate-600 hover:text-blue-500"
                    }`}
                  style={{
                    transform: activeSection === section.id ? "translateX(2px)" : "translateX(0)",
                  }}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <h1 className='sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins'>
        {pageTexts.about.greeting}{" "}
        <span className='bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-semibold drop-shadow'>
          {" "}
          {pageTexts.about.name}
        </span>{" "}
        {pageTexts.about.emoji}
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          {pageTexts.about.introduction}
        </p>
      </div>

      {/* Academic Journey moved to top */}
      <div className='py-10 flex flex-col' id='academic' ref={(el) => (sectionRefs.current.academic = el)}>
        <AnimatedTitle className='font-semibold sm:text-3xl text-xl font-poppins cursor-default'>
          {aboutContent.academic.title}
        </AnimatedTitle>
        <p className='mt-3 text-slate-500'>
          {aboutContent.academic.description}
        </p>

        <div className='mt-8 flex flex-col gap-6'>
          {aboutContent.academic.items.map((item, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className='group relative p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-500 hover:border-blue-200/50 overflow-hidden claymorphism'
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(59, 130, 246, 0.05)',
              }}
            >
              {/* Aurora gradient animation */}
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'>
                <div className='absolute inset-0 animate-aurora' style={{
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))',
                  backgroundSize: '400% 400%',
                  animation: 'aurora 8s ease infinite',
                }}></div>
              </div>

              <h4 className='text-lg font-semibold text-black group-hover:text-blue-700 transition-colors duration-300'>{item.title}</h4>
              {item.subtitle && <p className='text-sm text-slate-500'>{item.subtitle}</p>}
              {renderContentItem(item)}
            </AnimatedCard>
          ))}
        </div>
      </div>


      <div className='py-10 flex flex-col' id='work' ref={(el) => (sectionRefs.current.work = el)}>
        <AnimatedTitle className='font-semibold sm:text-3xl text-xl font-poppins cursor-default'>
          {aboutContent.work.title}
        </AnimatedTitle>
        <p className='mt-3 text-slate-500'>
          {aboutContent.work.description}
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          {aboutContent.work.items.map((item, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className='group relative p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-500 hover:border-blue-200/50 overflow-hidden claymorphism'
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(59, 130, 246, 0.05)',
              }}
            >
              {/* Aurora gradient animation */}
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'>
                <div className='absolute inset-0 animate-aurora' style={{
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))',
                  backgroundSize: '400% 400%',
                  animation: 'aurora 8s ease infinite',
                }}></div>
              </div>
              
              {/* Header area: MagicTask gets nested look, others stay as full cards */}
              {item.title === "MagicTask (MCARS theme)" ? (
                <div className='mb-2 ml-6'>
                  <h4 className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
                    <span className='w-8 h-px bg-blue-200 inline-block' />
                    <span>{item.title}</span>
                    {item.date && <span className='text-[11px] text-slate-400'>• {item.date}</span>}
                  </h4>
                  {item.subtitle && <p className='text-xs text-slate-500 ml-8'>{item.subtitle}</p>}
                </div>
              ) : (
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex-1'>
                    <h4 className='text-lg font-semibold text-black group-hover:text-blue-700 transition-colors duration-300'>
                      {item.title}
                    </h4>
                    {item.subtitle && <p className='text-sm text-slate-500'>{item.subtitle}</p>}
                    {item.date && <p className='text-sm text-slate-500'>{item.date}</p>}
                  </div>
                  {index === 0 && (
                    <div className='flex gap-3 flex-wrap'>
                      {importantTechIcons.slice(0, 7).map((tech) => (
                        <div key={tech.name} className='block-container w-12 h-12 hover:scale-110 transition-transform duration-300'>
                          <div className='btn-back rounded-xl' />
                          <div className='btn-front rounded-xl flex justify-center items-center'>
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className='w-2/3 h-2/3 object-contain'
                              title={tech.name}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Custom rendering for MagicTask tree-style sub-card */}
              {item.title === "MagicTask (MCARS theme)" ? (
                <div className='mt-1 ml-6 space-y-4'>
                  <div className='border-l-2 border-dashed border-blue-200 pl-4 space-y-3 text-sm text-slate-600'>
                    <div>
                      <p className='font-semibold text-slate-800'>MagicTask Platform</p>
                      <p className='text-xs text-slate-500'>Gamified task management with MCARS theme</p>
                    </div>

                    {item.treeSections &&
                      item.treeSections.map((section) => (
                        <div key={section.title} className='pl-4 space-y-2'>
                          <p className='font-semibold text-slate-700'>{section.title}</p>
                          <ul className='list-disc ml-4 space-y-1'>
                            {section.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className='flex flex-wrap items-center gap-3'>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 group/link transition-all duration-300"
                      >
                        {item.linkText || "Live Link"}
                        <svg className='w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                      </a>
                    )}

                    <Link
                      to="/magictask"
                      onClick={(e) => handleDiveDeep(e, "/magictask")}
                      className='group/btn relative inline-flex items-center text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden'
                    >
                      <div className='absolute inset-0 bg-white/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300'></div>
                      <span className='relative z-10'>Dive Deep</span>
                      <svg className='w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {renderContentItem(item)}
                  {item.link && (
                    <a
                      href={item.link}
                      className="relative top-2 font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 group/link transition-all duration-300"
                    >
                      {item.linkText}
                      <svg className='w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </a>
                  )}
                </>
              )}
            </AnimatedCard>
          ))}
        </div>
      </div>

      <div className='py-10 flex flex-col' id='mission' ref={(el) => (sectionRefs.current.mission = el)}>
        <AnimatedTitle className='font-semibold sm:text-3xl text-xl font-poppins cursor-default'>
          {aboutContent.mission.title}
        </AnimatedTitle>
        <p className='mt-3 text-slate-500'>
          {aboutContent.mission.description}
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          {aboutContent.mission.items.map((item, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className='group relative p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-500 hover:border-blue-200/50 overflow-hidden claymorphism'
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(59, 130, 246, 0.05)',
              }}
            >
              {/* Aurora gradient animation */}
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'>
                <div className='absolute inset-0 animate-aurora' style={{
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))',
                  backgroundSize: '400% 400%',
                  animation: 'aurora 8s ease infinite',
                }}></div>
              </div>
              
              <h4 className='text-lg font-semibold text-black group-hover:text-blue-700 transition-colors duration-300'>{item.title}</h4>
              {item.subtitle && <p className='text-sm text-slate-500'>{item.subtitle}</p>}
              {renderContentItem(item)}
            </AnimatedCard>
          ))}
        </div>
      </div>

      <div className='py-10 flex flex-col' id='ventures' ref={(el) => (sectionRefs.current.ventures = el)}>
        <AnimatedTitle className='font-semibold sm:text-3xl text-xl font-poppins cursor-default'>
          {aboutContent.ventures.title}
        </AnimatedTitle>
        <p className='mt-3 text-slate-500'>
          {aboutContent.ventures.description}
        </p>
        <div className='mt-8 flex flex-col'>
          {aboutContent.ventures.items.map((item, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className='group relative p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-500 hover:border-blue-200/50 overflow-hidden claymorphism'
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(59, 130, 246, 0.05)',
              }}
            >
              {/* Aurora gradient animation */}
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'>
                <div className='absolute inset-0 animate-aurora' style={{
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))',
                  backgroundSize: '400% 400%',
                  animation: 'aurora 8s ease infinite',
                }}></div>
              </div>
              
              <h4 className='text-lg font-semibold text-black group-hover:text-blue-700 transition-colors duration-300'>{item.title}</h4>
              {item.subtitle && <p className='text-sm text-slate-500'>{item.subtitle}</p>}
              {renderContentItem(item)}
              {item.buttonText && item.buttonLink && (
                <div className='relative mt-4 z-20'>
                  <Link
                    to={item.buttonLink}
                    className='group/btn relative inline-flex items-center text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden'
                  >
                    {/* Fadeout overlay effect */}
                    <div className='absolute inset-0 bg-white/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300'></div>
                    <span className='relative z-10'>{item.buttonText.replace('&rarr;', '')}</span>
                    <svg className='w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </Link>
                </div>
              )}
            </AnimatedCard>
          ))}
        </div>
      </div>

      <div className='py-10 flex flex-col' id='ideas' ref={(el) => (sectionRefs.current.ideas = el)}>
        <AnimatedTitle className='font-semibold sm:text-3xl text-xl font-poppins cursor-default'>
          {aboutContent.ideas.title}
        </AnimatedTitle>
        <p className='mt-3 text-slate-500'>
          {aboutContent.ideas.description}
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          {aboutContent.ideas.items.map((item, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className='group relative p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-500 hover:border-blue-200/50 overflow-hidden claymorphism'
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(59, 130, 246, 0.05)',
              }}
            >
              {/* Aurora gradient animation */}
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'>
                <div className='absolute inset-0 animate-aurora' style={{
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))',
                  backgroundSize: '400% 400%',
                  animation: 'aurora 8s ease infinite',
                }}></div>
              </div>
              
              <h4 className='text-lg font-semibold text-black group-hover:text-blue-700 transition-colors duration-300'>{item.title}</h4>
              {item.subtitle && <p className='text-sm text-slate-500'>{item.subtitle}</p>}
              {renderContentItem(item)}
            </AnimatedCard>
          ))}
        </div>
      </div>

      <div className='py-10 flex flex-col' id='interests' ref={(el) => (sectionRefs.current.interests = el)}>
        <AnimatedTitle className='font-semibold sm:text-3xl text-xl font-poppins cursor-default'>
          {aboutContent.interests.title}
        </AnimatedTitle>
        <p className='mt-3 text-slate-500'>
          {aboutContent.interests.description}
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          {aboutContent.interests.items.map((item, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className='group relative p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-500 hover:border-blue-200/50 overflow-hidden claymorphism'
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(59, 130, 246, 0.05)',
              }}
            >
              {/* Aurora gradient animation */}
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'>
                <div className='absolute inset-0 animate-aurora' style={{
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))',
                  backgroundSize: '400% 400%',
                  animation: 'aurora 8s ease infinite',
                }}></div>
              </div>
              
              <h4 className='text-lg font-semibold text-black group-hover:text-blue-700 transition-colors duration-300'>{item.title}</h4>
              {item.subtitle && <p className='text-sm text-slate-500'>{item.subtitle}</p>}
              {renderContentItem(item)}
            </AnimatedCard>
          ))}
        </div>
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default About;