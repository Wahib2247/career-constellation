import { useState } from "react";

const ProjectArtifactCard = ({ title, description, stage, type, link, linkText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 transition-all duration-300 hover:bg-white/60 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <div className="flex flex-col h-full">
        <div className="mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg ${type === 'Documentation' ? 'bg-indigo-50 text-indigo-600' :
              type === 'Design' ? 'bg-pink-50 text-pink-600' :
                type === 'Code' || type === 'Simulation' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-slate-100 text-slate-500'
            }`}>
            {type}
          </span>
        </div>

        <h4 className="text-lg font-bold text-slate-800 leading-tight mb-2 font-poppins group-hover:text-blue-700 transition-colors">
          {title}
        </h4>

        <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-400">
            {stage}
          </span>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              {linkText || "View Artifact"}
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectArtifactCard;
