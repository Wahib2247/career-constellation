import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { projects } from "../constants";
import { projectDetails } from "../constants/projectDetails";
import { arrow } from "../assets/icons";
import { ProjectArtifactCard } from "../components";
import useScrollAnimation from "../hooks/useScrollAnimation";

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const [expandedSections, setExpandedSections] = useState({
    system: false,
    methodology: false,
    reflection: false,
    roadmap: false,
  });

  // Find project by slug
  const project = projects.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === projectSlug?.toLowerCase()
  );

  // Get detailed project data - map slug to project key
  const slugToKeyMap = {
    "classfusion": "classfusion",
    "flowfund": "flowfund",
    "fundmylife": "fundmylife",
    "sarmayachain": "sarmayachain",
    "quarkcapital": "quarkcapital"
  };
  const projectKey = slugToKeyMap[projectSlug?.toLowerCase()];
  const details = projectDetails[projectKey];

  if (!project || !details) {
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

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [headerRef, headerVisible] = useScrollAnimation();

  return (
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
      <div
        ref={headerRef}
        className={`flex items-start gap-6 mb-8 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="block-container w-20 h-20 flex-shrink-0">
          <div className={`btn-back rounded-xl ${project.theme}`} />
          <div className="btn-front rounded-xl flex justify-center items-center">
            <img src={project.iconUrl} alt={project.name} className="w-1/2 h-1/2 object-contain" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-800 mb-3">
            {project.name}
          </h1>
          <div className={`status-badge ${details.statusColor}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            <span>{details.status}</span>
          </div>
        </div>
      </div>

      {/* 1. Problem Statement */}
      <div className="project-section">
        <h2 className="text-2xl font-semibold font-poppins text-slate-800 mb-4">
          Problem Statement
        </h2>
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{details.problemStatement}</p>
      </div>

      {/* 2. Project Overview */}
      <div className="project-section">
        <h2 className="text-2xl font-semibold font-poppins text-slate-800 mb-4">
          Project Overview
        </h2>
        <p className="text-slate-600 leading-relaxed">{details.overview}</p>
      </div>

      {/* 3. Proposed System / Architecture */}
      <div className="project-section">
        <h2 className="text-2xl font-semibold font-poppins text-slate-800 mb-4">
          Proposed System / Architecture
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">Actors</h3>
            <ul className="space-y-2 text-slate-600">
              {details.proposedSystem.actors.map((actor, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1.5">•</span>
                  <span>{actor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">Incentive Logic</h3>
            <ul className="space-y-2 text-slate-600">
              {details.proposedSystem.incentiveLogic.map((incentive, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1.5">•</span>
                  <span>{incentive}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">Feedback Loops</h3>
            <ul className="space-y-2 text-slate-600">
              {details.proposedSystem.feedbackLoops.map((loop, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1.5">•</span>
                  <span>{loop}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">
              Governance / Ethics Layer
            </h3>
            <ul className="space-y-2 text-slate-600">
              {details.proposedSystem.governance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Placeholder for Architecture Diagram */}
        <div className="mt-6 p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center">
          <p className="text-slate-500 text-sm">
            <strong>Architecture Diagram Placeholder</strong>
            <br />
            System architecture visualization will be added here (SVG or image)
          </p>
        </div>
      </div>

      {/* 4. Artifacts & Evidence */}
      <div className="project-section">
        <h2 className="text-2xl font-semibold font-poppins text-slate-800 mb-6">
          Artifacts & Evidence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.artifacts.map((artifact, idx) => (
            <ProjectArtifactCard key={idx} {...artifact} />
          ))}
        </div>
      </div>

      {/* 5. Research & Methodology */}
      <div className="project-section">
        <div
          className="expandable-section-header"
          onClick={() => toggleSection("methodology")}
        >
          <h2 className="text-2xl font-semibold font-poppins text-slate-800">
            Research & Methodology
          </h2>
          <svg
            className={`w-6 h-6 text-slate-500 transform transition-transform duration-200 ${
              expandedSections.methodology ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          className={`expandable-section-content ${
            expandedSections.methodology ? "expanded" : ""
          }`}
        >
          <p className="text-slate-600 leading-relaxed">{details.researchMethodology}</p>
        </div>
      </div>

      {/* 6. Reflection & Open Questions */}
      <div className="project-section">
        <div
          className="expandable-section-header"
          onClick={() => toggleSection("reflection")}
        >
          <h2 className="text-2xl font-semibold font-poppins text-slate-800">
            Reflection & Open Questions
          </h2>
          <svg
            className={`w-6 h-6 text-slate-500 transform transition-transform duration-200 ${
              expandedSections.reflection ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          className={`expandable-section-content ${
            expandedSections.reflection ? "expanded" : ""
          }`}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">
                Assumptions That Might Be Wrong
              </h3>
              <ul className="space-y-2 text-slate-600">
                {details.reflection.assumptions.map((assumption, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1.5">•</span>
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">
                Tradeoffs That Emerged
              </h3>
              <ul className="space-y-2 text-slate-600">
                {details.reflection.tradeoffs.map((tradeoff, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1.5">•</span>
                    <span>{tradeoff}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 font-poppins">
                What Remains Unresolved
              </h3>
              <ul className="space-y-2 text-slate-600">
                {details.reflection.unresolved.map((question, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1.5">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Roadmap / What's Next */}
      <div className="project-section">
        <div
          className="expandable-section-header"
          onClick={() => toggleSection("roadmap")}
        >
          <h2 className="text-2xl font-semibold font-poppins text-slate-800">Roadmap / What's Next</h2>
          <svg
            className={`w-6 h-6 text-slate-500 transform transition-transform duration-200 ${
              expandedSections.roadmap ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          className={`expandable-section-content ${
            expandedSections.roadmap ? "expanded" : ""
          }`}
        >
          <ul className="space-y-3 text-slate-600">
            {details.roadmap.map((phase, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1 font-semibold">{idx + 1}.</span>
                <span>{phase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8. Collaboration / Inquiry Section */}
      <div className="project-section bg-gradient-to-br from-blue-50/50 to-slate-50/50 border-blue-200/50">
        <h2 className="text-2xl font-semibold font-poppins text-slate-800 mb-4">
          Collaboration & Inquiry
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">{details.collaboration}</p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-amber-50/50 border border-amber-200/50 rounded-xl">
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-800">Note:</strong> This project is an evolving exploration
          backed by real thinking and early execution—not a finished product. All claims, models, and
          proposals are experimental and subject to revision based on research, critique, and
          real-world testing.
        </p>
      </div>
    </section>
  );
};

export default ProjectDetail;
