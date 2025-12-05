import { Link } from "react-router-dom";
import useScrollAnimation from "../hooks/useScrollAnimation";

import { CTA } from "../components";
import { projects, pageTexts } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  const { title, titleHighlight, description, liveLink } = pageTexts.projects;
  const [titleRef, titleVisible] = useScrollAnimation();
  const [descRef, descVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className='max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)]'>
      <h1 
        ref={titleRef}
        className={`sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {title}{" "}
        <span className='bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent drop-shadow font-semibold'>
          {titleHighlight}
        </span>
      </h1>

      <p 
        ref={descRef}
        className={`text-slate-500 mt-2 leading-relaxed transition-all duration-700 delay-100 ${descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {description}
      </p>

      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project, index) => {
          const [projectRef, projectVisible] = useScrollAnimation({ threshold: 0.1 });
          return (
          <div 
            ref={projectRef}
            className={`lg:w-[400px] w-full group cursor-pointer transition-all duration-700 ${projectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
            key={project.name}
          >
            <div className='block-container w-12 h-12 group-hover:scale-110 transition-transform duration-300'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={project.iconUrl}
                  alt='threads'
                  className='w-1/2 h-1/2 object-contain group-hover:scale-110 transition-transform duration-300'
                />
              </div>
            </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold group-hover:text-blue-600 transition-colors duration-300'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500 group-hover:text-slate-700 transition-colors duration-300'>{project.description}</p>
              <div className='mt-5 flex items-center gap-2 font-poppins group/link'>
                <Link
                  to={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-all duration-300'
                >
                  {liveLink}
                  <img
                    src={arrow}
                    alt='arrow'
                    className='w-4 h-4 object-contain transform group-hover/link:translate-x-1 transition-transform duration-300'
                  />
                </Link>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;
