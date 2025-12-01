import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { experiences, skills } from "../constants";
import { react, nodejs, javascript, mongodb, express, git, github, arrow } from "../assets/icons";

import "react-vertical-timeline-component/style.min.css";

const About = () => {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef({});

  const sections = [
    { id: "work", title: "Work & Projects" },
    { id: "mission", title: "Mission & Vision" },
    { id: "ventures", title: "Blueprint Projects" },
    { id: "ideas", title: "Ideas & Research" },
    { id: "interests", title: "Interests" },
    { id: "academic", title: "Academic Journey" },
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

  const importantTechIcons = [
    { icon: react, name: "React" },
    { icon: nodejs, name: "Node.js" },
    { icon: javascript, name: "JavaScript" },
    { icon: mongodb, name: "MongoDB" },
    { icon: express, name: "Express" },
    { icon: git, name: "Git" },
    { icon: github, name: "GitHub" },
  ];

  return (
    <section className='max-container relative'>
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
      <h1 className='head-text'>
        Hello, I'm{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          {" "}
          Wahib
        </span>{" "}
        👋
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          A curious mind, lifelong learner, and systems thinker from Pakistan.
          My journey is about exploring how automation, psychology, and humanitarian impact
          can fuse into platforms that matter. This portfolio is a living record of ideas,
          experiments, and reflections rather than finished products.
        </p>
      </div>


      <div className='py-10 flex flex-col' id='work' ref={(el) => (sectionRefs.current.work = el)}>
        <h3 className='subhead-text'>Work & Projects</h3>
        <p className='mt-3 text-slate-500'>
          Building practical solutions while exploring the intersection of technology and human behavior.
          Each project serves as both a technical implementation and a learning experiment.
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <div className='flex justify-between items-start mb-4'>
              <div className='flex-1'>
                <h4 className='text-lg font-semibold text-black'>Web Development & Full-Stack Projects</h4>
              </div>
              <div className='flex gap-3 flex-wrap'>
                {importantTechIcons.slice(0, 7).map((tech) => (
                  <div key={tech.name} className='block-container w-12 h-12'>
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
            </div>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Developing full-stack applications using React, Node.js, and modern web technologies.</li>
              <li>Building responsive, user-centric interfaces with focus on behavioral psychology principles.</li>
              <li>Implementing microservices architecture and scalable system designs.</li>
              <li>Creating applications that integrate automation with human-centered design.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <div className='flex justify-between items-start mb-4'>
              <div className='flex-1'>
                <h4 className='text-lg font-semibold text-black'>MagicTask (MCARS theme)</h4>
                <p className='text-sm text-slate-500'>2022</p>
              </div>
            </div>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Complex UI/UX design with MCARS theme.</li>
              <li>Designing task management system that leverages UX psychology and habit formation models.</li>
              <li>Building platforms that transform productivity through psychological insights.</li>
            </ul>
            <a href="https://magictask.io" className="relative top-2 font-semibold text-blue-600 hover:text-blue-800 hover:underline">Live Link</a>
          </div>
        </div>
      </div>

      <div className='py-10 flex flex-col' id='mission' ref={(el) => (sectionRefs.current.mission = el)}>
        <h3 className='subhead-text'>Mission & Vision</h3>
        <p className='mt-3 text-slate-500'>
          My approach to work transcends traditional job descriptions. I frame roles as missions,
          each serving a larger purpose in building systems that matter.
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Core Mission</h4>
            <p className='text-sm text-slate-500'>Personal Philosophy</p>
            <p className='mt-2 text-slate-600 text-sm leading-relaxed'>
              Building platforms that fuse automation, psychology, and humanitarian impact.
              I believe technology should serve human flourishing, not just efficiency metrics.
              Every system I architect is designed with the question: "How does this improve
              human agency and well-being?"
            </p>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Mission-Based Roles</h4>
            <p className='text-sm text-slate-500'>Alternative Framework</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li><strong>Blueprint Architect:</strong> Designing system foundations that enable scalable impact.</li>
              <li><strong>Community Onboarder:</strong> Creating pathways for meaningful engagement and participation.</li>
              <li><strong>Narrative Strategist:</strong> Framing projects as stories that inspire action and connection.</li>
              <li><strong>Systems Thinker:</strong> Connecting dots between technology, behavior, and social outcomes.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='py-10 flex flex-col' id='ventures' ref={(el) => (sectionRefs.current.ventures = el)}>
        <h3 className='subhead-text'>Ventures & Blueprint Projects</h3>
        <p className='mt-3 text-slate-500'>
          Early-stage explorations where ideas meet implementation. These represent my vision
          for platforms that balance innovation with humanitarian impact.
        </p>
        <div className='mt-8 flex flex-col'>
          <div className='record-box p-6 rounded-lg shadow bg-white relative'>
            <h4 className='text-lg font-semibold text-black'>Fund My Life</h4>
            <p className='text-sm text-slate-500'>Meme-Coin Project (Blueprint Stage)</p>
            <p className='mt-2 text-slate-600 text-sm leading-relaxed'>
              Exploring transparent tokenomics and community-driven value creation. The vision:
              a meme-coin with humanitarian angles, where community onboarding becomes a
              mechanism for collective impact. Currently mapping tokenomics flows and
              community governance structures.
            </p>
            <div className='absolute transform -bottom-6 left-2'>
              <Link
                to='/projects'
                className='btn flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow'
              >
                View More Projects &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='py-10 flex flex-col' id='ideas' ref={(el) => (sectionRefs.current.ideas = el)}>
        <h3 className='subhead-text'>Ideas & Research</h3>
        <p className='mt-3 text-slate-500'>
          Ongoing exploration of ideas that shape my thinking. These represent my current
          research interests and the frameworks I use to understand complex systems.
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Psychology & Philosophy</h4>
            <p className='text-sm text-slate-500'>Theoretical Foundations</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li><strong>Human Readability:</strong> Designing systems that feel natural and intuitive to human cognition.</li>
              <li><strong>Fogg Behavior Model:</strong> Applying B=MAT (Motivation, Ability, Trigger) to product design.</li>
              <li><strong>Behavioral Economics:</strong> Integrating insights from Kahneman, Ariely, and Thaler into UX flows.</li>
              <li><strong>Philosophical Inquiry:</strong> Exploring ethics, human evolution, and what makes systems "good."</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Tech & Systems Architecture</h4>
            <p className='text-sm text-slate-500'>Technical Exploration</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li><strong>Microservices Logic:</strong> Building systems that are modular, scalable, and maintainable.</li>
              <li><strong>Recommender Systems:</strong> Creating algorithms that enhance user experience without manipulation.</li>
              <li><strong>Bot Orchestration:</strong> Designing automated systems that augment rather than replace human agency.</li>
              <li><strong>System Design:</strong> Thinking in flows, dependencies, and emergent behaviors.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Society & Geopolitics</h4>
            <p className='text-sm text-slate-500'>Systems Thinking</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li><strong>Trend Seeding:</strong> Understanding how ideas spread and how to design for virality ethically.</li>
              <li><strong>Cunningham's Law:</strong> Leveraging human psychology in community building and knowledge systems.</li>
              <li><strong>Fintech for Humanitarian Aid:</strong> Exploring how financial technology can serve poverty reduction.</li>
              <li><strong>Geopolitical Analysis:</strong> Understanding how global systems affect local impact.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Habit-Forming Business Models</h4>
            <p className='text-sm text-slate-500'>Research & Development</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Studying UX psychology principles (Fogg Behavior Model, behavioral triggers).</li>
              <li>Designing monetization flows that align user value with sustainable revenue.</li>
              <li>Building recommender systems that enhance user experience while maintaining ethical boundaries.</li>
              <li>Exploring how habit formation can drive positive outcomes rather than addiction.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Humanitarian Platforms</h4>
            <p className='text-sm text-slate-500'>Vision & Ideation</p>
            <p className='mt-2 text-slate-600 text-sm leading-relaxed'>
              Platforms where impact greater than profit. I'm exploring how autonomous governance,
              transparent systems, and community-driven models can create sustainable
              humanitarian impact. The goal: systems that self-organize around human need
              rather than shareholder value.
            </p>
          </div>
        </div>
      </div>

      <div className='py-10 flex flex-col' id='interests' ref={(el) => (sectionRefs.current.interests = el)}>
        <h3 className='subhead-text'>Interests & Explorations</h3>
        <p className='mt-3 text-slate-500'>
          Areas I'm actively exploring beyond formal work. These interests inform my thinking
          and shape the questions I ask about technology, society, and human behavior.
        </p>
        <div className='mt-8 flex flex-col gap-6'>
          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Philosophy & Human Nature</h4>
            <p className='text-sm text-slate-500'>Personal Inquiry</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Human evolution and how it shapes our cognitive biases and social structures.</li>
              <li>Ethics in technology: What obligations do we have when building systems that influence behavior?</li>
              <li>Metaphysics of systems: What makes a system "real" versus "constructed"?</li>
              <li>The relationship between individual agency and systemic forces.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Media, Narrative & Virality</h4>
            <p className='text-sm text-slate-500'>Cultural Analysis</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Podcast culture and how long-form content shapes ideas.</li>
              <li>Reaction videos and narrative amplification: understanding the attention economy.</li>
              <li>Trend seeding: How ideas spread and how to design for organic growth.</li>
              <li>Algorithm bias and how recommendation systems shape what we see and think.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Humanitarian Focus</h4>
            <p className='text-sm text-slate-500'>Core Principle</p>
            <p className='mt-2 text-slate-600 text-sm leading-relaxed'>
              I believe technology should prioritize impact over profit. My exploration centers on:
              platforms that address real human needs, systems that empower rather than extract,
              and business models that create sustainable value for communities. The question
              I keep returning to: "How can automation and psychology serve humanitarian goals?"
            </p>
          </div>
        </div>
      </div>

      <div className='py-16' id='academic' ref={(el) => (sectionRefs.current.academic = el)}>
        <h3 className='subhead-text'>Academic Journey & Achievements</h3>
        <p className='mt-3 text-slate-500'>
          A comprehensive record of academic milestones, research contributions, and scholarly achievements.
          Each stage represents a commitment to rigorous inquiry and interdisciplinary learning.
        </p>

        <div className='mt-8 flex flex-col gap-6'>
          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>O-Levels</h4>
            <p className='text-sm text-slate-500'>Completed 2024</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Achieved high grades across core subjects.</li>
              <li>Received a High Achievement Certificate from the school.</li>
              <li>Built strong foundations in analytical thinking and interdisciplinary learning.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Academic Excellence Scholarship</h4>
            <p className='text-sm text-slate-500'>Awarded 2024</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Recognized for outstanding academic performance.</li>
              <li>Maintained rigorous academic standards while pursuing independent research initiatives.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Mantaining the Standards</h4>
            <p className='text-sm text-slate-500'>Throughout A-Levels</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Maintained high academic standards across all subjects.</li>
              <li>Earned official school certificate for strong performance.</li>
              <li>Focused on Maths, Physics, and Computer Science as core areas of study.</li>
              <li>Mentored peers and helped them improve their academic performance.</li>
            </ul>
          </div>

          <div className='record-box p-6 rounded-lg shadow bg-white'>
            <h4 className='text-lg font-semibold text-black'>Research Focus Areas (Apart from school)</h4>
            <p className='text-sm text-slate-500'>Ongoing</p>
            <ul className='list-disc ml-5 mt-2 text-slate-600 text-sm'>
              <li>Human-Computer Interaction and Behavioral Psychology in Digital Interfaces</li>
              <li>Behavioral Economics and Decision-Making in Financial Technology</li>
              <li>Systems Thinking and Geopolitical Analysis</li>
              <li>Humanitarian Impact Assessment and Social Innovation</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default About;
