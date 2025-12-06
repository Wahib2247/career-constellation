import { useParams, Link } from "react-router-dom";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import { Footer } from "../components";

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  
  // Find project by slug (convert name to slug format)
  const project = projects.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === projectSlug?.toLowerCase()
  );

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2">
            <img src={arrow} alt="back" className="w-4 h-4 rotate-180" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-5xl mx-auto sm:p-16 pb-12 !pt-[126px] px-8 min-h-[calc(100vh-80px)]">
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-300 mb-8 group"
        >
          <img 
            src={arrow} 
            alt="back" 
            className="w-4 h-4 rotate-180 transform group-hover:-translate-x-1 transition-transform duration-300" 
          />
          <span className="text-sm font-medium">Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="block-container w-20 h-20 flex-shrink-0">
            <div className={`btn-back rounded-xl ${project.theme}`} />
            <div className="btn-front rounded-xl flex justify-center items-center">
              <img
                src={project.iconUrl}
                alt={project.name}
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-800 mb-2">
              {project.name}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-blue-700">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-poppins">
              Deep Dive into {project.name}
            </h2>
            
            <div className="prose prose-slate max-w-none mb-6">
              <p className="text-slate-600 leading-relaxed text-base mb-4">
                {project.description}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">
                What's Coming
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Detailed project documentation and case studies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Technical architecture and implementation details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Research methodology and findings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Live demos and interactive prototypes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Source code and open-source contributions</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-blue-50/50 border border-blue-200/50 rounded-xl">
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">Interested in learning more?</strong> This project is part of an ongoing exploration. 
                For inquiries, collaborations, or to discuss the ideas behind {project.name}, feel free to reach out through the Contact page.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get in Touch
            &rarr;
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;

