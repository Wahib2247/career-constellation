import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

// Important Tech Icons for About Page
export const importantTechIcons = [
    { icon: react, name: "React" },
    { icon: nodejs, name: "Node.js" },
    { icon: javascript, name: "JavaScript" },
    { icon: mongodb, name: "MongoDB" },
    { icon: express, name: "Express" },
    { icon: git, name: "Git" },
    { icon: github, name: "GitHub" },
];

export const skills = [
  // Technical Foundations
  { imageUrl: css, name: "CSS", type: "Frontend" },
  { imageUrl: html, name: "HTML", type: "Frontend" },
  { imageUrl: javascript, name: "JavaScript", type: "Frontend" },
  { imageUrl: typescript, name: "TypeScript", type: "Frontend" },
  { imageUrl: react, name: "React", type: "Frontend" },
  { imageUrl: nextjs, name: "Next.js", type: "Frontend" },
  { imageUrl: nodejs, name: "Node.js", type: "Backend" },
  { imageUrl: express, name: "Express", type: "Backend" },
  { imageUrl: mongodb, name: "MongoDB", type: "Database" },
  { imageUrl: redux, name: "Redux", type: "State Management" },
  { imageUrl: git, name: "Git", type: "Version Control" },
  { imageUrl: github, name: "GitHub", type: "Version Control" },
  { imageUrl: tailwindcss, name: "Tailwind CSS", type: "Frontend" },
  { imageUrl: mui, name: "Material-UI", type: "Frontend" },
  { imageUrl: sass, name: "Sass", type: "Frontend" },
  { imageUrl: motion, name: "Motion", type: "Animation" },
];

export const experiences = [
    {
        title: "Research Assistant",
        company_name: "Academic Research Project",
        icon: react,
        iconBg: "#accbe1",
        date: "2023 - Present",
        points: [
            "Conducted research on human-computer interaction and behavioral psychology in digital interfaces.",
            "Developed web applications using React.js to test and validate research hypotheses.",
            "Collaborated with academic supervisors and research teams to design user studies.",
            "Published findings on the intersection of psychology, economics, and technology.",
        ],
    },
    {
        title: "Independent Study & Projects",
        company_name: "Self-Directed Learning",
        icon: javascript,
        iconBg: "#fbc3bc",
        date: "2022 - Present",
        points: [
            "Explored full-stack development through building applications that address real-world problems.",
            "Studied behavioral economics and its applications in fintech and user experience design.",
            "Developed projects integrating psychology principles with modern web technologies.",
            "Maintained open-source contributions and documented learning journey.",
        ],
    },
    {
        title: "Academic Excellence",
        company_name: "Scholarship Recipient",
        icon: github,
        iconBg: "#b7e4c7",
        date: "2024",
        points: [
            "Recognized for outstanding academic performance and innovative project work.",
            "Demonstrated excellence in interdisciplinary studies combining technology and social sciences.",
            "Contributed to community through educational initiatives and knowledge sharing.",
            "Maintained high academic standards while pursuing independent research interests.",
        ],
    },
    {
        title: "Leadership Development",
        company_name: "CGDL Leadership Program",
        icon: nextjs,
        iconBg: "#a2d2ff",
        date: "2025",
        points: [
            "Participated in comprehensive leadership and community building program.",
            "Developed skills in project management, team collaboration, and strategic thinking.",
            "Applied systems thinking to frame projects as missions with measurable impact.",
            "Mentored peers and contributed to program development initiatives.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/Wahib2247',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/muhammad-wahib-b6bb6a373/',
    }
];

export const projects = [
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'Research Paper Summarization Tool',
        description: 'An AI-powered application designed to help researchers and students quickly extract key insights from academic papers. Uses natural language processing to generate structured summaries with citations and methodology highlights.',
        link: '#',
    },
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Behavioral Economics Dashboard',
        description: 'A data visualization platform exploring consumer behavior patterns and economic decision-making. Integrates psychological principles with financial data to provide insights into behavioral finance trends.',
        link: '#',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Academic Discussion Platform',
        description: 'A full-stack platform for academic discourse, enabling researchers and students to engage in structured discussions, share resources, and collaborate on interdisciplinary projects.',
        link: '#',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Humanitarian Impact Tracker',
        description: 'A web application designed to track and visualize the impact of humanitarian initiatives. Combines data analytics with user experience design to make complex social impact metrics accessible.',
        link: '#',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Systems Thinking Visualization Tool',
        description: 'An interactive tool for mapping and analyzing complex systems, particularly useful for understanding geopolitical and economic interconnections. Built with React and Three.js for immersive data exploration.',
        link: '#',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'UX Psychology Research Platform',
        description: 'A research platform for studying user behavior and psychological patterns in digital interfaces. Includes A/B testing capabilities and behavioral analytics for academic research purposes.',
        link: '#',
    }
];

// Page Text Constants
export const pageTexts = {
    projects: {
        title: "My",
        titleHighlight: "Projects",
        description: "This collection represents research-driven projects that explore the intersection of technology, behavioral science, and social impact. Each project serves as both a technical demonstration and an inquiry into complex interdisciplinary questions. These initiatives are developed with academic rigor, incorporating research methodologies, data analysis, and evidence-based design principles. Many projects are open-source and welcome scholarly collaboration and peer review.",
        liveLink: "Live Link",
    },
    about: {
        greeting: "Hello, I'm",
        name: "Wahib",
        emoji: "👋",
        introduction: "A curious mind, lifelong learner, and systems thinker from Pakistan. My journey is about exploring how automation, psychology, and humanitarian impact can fuse into platforms that matter. This portfolio is a living record of ideas, experiments, and reflections rather than finished products.",
    }
};

// About Page Sections
export const aboutSections = [
    { id: "work", title: "Work & Projects" },
    { id: "mission", title: "Mission & Vision" },
    { id: "ventures", title: "Blueprint Projects" },
    { id: "ideas", title: "Ideas & Research" },
    { id: "interests", title: "Interests" },
    { id: "academic", title: "Academic Journey" },
];

// About Page Content
export const aboutContent = {
    work: {
        title: "Work & Projects",
        description: "Building practical solutions while exploring the intersection of technology and human behavior. Each project serves as both a technical implementation and a learning experiment.",
        items: [
            {
                title: "Web Development & Full-Stack Projects",
                subtitle: null,
                date: null,
                type: "list",
                content: [
                    "Developing full-stack applications using React, Node.js, and modern web technologies.",
                    "Building responsive, user-centric interfaces with focus on behavioral psychology principles.",
                    "Implementing microservices architecture and scalable system designs.",
                    "Creating applications that integrate automation with human-centered design.",
                ],
            },
            {
                title: "MagicTask (MCARS theme)",
                subtitle: null,
                date: "2022",
                type: "list",
                content: [
                    "Complex UI/UX design with MCARS theme.",
                    "Designing task management system that leverages UX psychology and habit formation models.",
                    "Building platforms that transform productivity through psychological insights.",
                ],
                link: "https://magictask.io",
                linkText: "Live Link",
            },
        ],
    },
    mission: {
        title: "Mission & Vision",
        description: "My approach to work transcends traditional job descriptions. I frame roles as missions, each serving a larger purpose in building systems that matter.",
        items: [
            {
                title: "Core Mission",
                subtitle: "Personal Philosophy",
                type: "paragraph",
                content: "Building platforms that fuse automation, psychology, and humanitarian impact. I believe technology should serve human flourishing, not just efficiency metrics. Every system I architect is designed with the question: \"How does this improve human agency and well-being?\"",
            },
            {
                title: "Mission-Based Roles",
                subtitle: "Alternative Framework",
                type: "list",
                content: [
                    "<strong>Blueprint Architect:</strong> Designing system foundations that enable scalable impact.",
                    "<strong>Community Onboarder:</strong> Creating pathways for meaningful engagement and participation.",
                    "<strong>Narrative Strategist:</strong> Framing projects as stories that inspire action and connection.",
                    "<strong>Systems Thinker:</strong> Connecting dots between technology, behavior, and social outcomes.",
                ],
            },
        ],
    },
    ventures: {
        title: "Ventures & Blueprint Projects",
        description: "Early-stage explorations where ideas meet implementation. These represent my vision for platforms that balance innovation with humanitarian impact.",
        items: [
            {
                title: "Fund My Life",
                subtitle: "Meme-Coin Project (Blueprint Stage)",
                type: "paragraph",
                content: "Exploring transparent tokenomics and community-driven value creation. The vision: a meme-coin with humanitarian angles, where community onboarding becomes a mechanism for collective impact. Currently mapping tokenomics flows and community governance structures.",
                buttonText: "View More Projects &rarr;",
                buttonLink: "/projects",
            },
        ],
    },
    ideas: {
        title: "Ideas & Research",
        description: "Ongoing exploration of ideas that shape my thinking. These represent my current research interests and the frameworks I use to understand complex systems.",
        items: [
            {
                title: "Psychology & Philosophy",
                subtitle: "Theoretical Foundations",
                type: "list",
                content: [
                    "<strong>Human Readability:</strong> Designing systems that feel natural and intuitive to human cognition.",
                    "<strong>Fogg Behavior Model:</strong> Applying B=MAT (Motivation, Ability, Trigger) to product design.",
                    "<strong>Behavioral Economics:</strong> Integrating insights from Kahneman, Ariely, and Thaler into UX flows.",
                    "<strong>Philosophical Inquiry:</strong> Exploring ethics, human evolution, and what makes systems \"good.\"",
                ],
            },
            {
                title: "Tech & Systems Architecture",
                subtitle: "Technical Exploration",
                type: "list",
                content: [
                    "<strong>Microservices Logic:</strong> Building systems that are modular, scalable, and maintainable.",
                    "<strong>Recommender Systems:</strong> Creating algorithms that enhance user experience without manipulation.",
                    "<strong>Bot Orchestration:</strong> Designing automated systems that augment rather than replace human agency.",
                    "<strong>System Design:</strong> Thinking in flows, dependencies, and emergent behaviors.",
                ],
            },
            {
                title: "Society & Geopolitics",
                subtitle: "Systems Thinking",
                type: "list",
                content: [
                    "<strong>Trend Seeding:</strong> Understanding how ideas spread and how to design for virality ethically.",
                    "<strong>Cunningham's Law:</strong> Leveraging human psychology in community building and knowledge systems.",
                    "<strong>Fintech for Humanitarian Aid:</strong> Exploring how financial technology can serve poverty reduction.",
                    "<strong>Geopolitical Analysis:</strong> Understanding how global systems affect local impact.",
                ],
            },
            {
                title: "Habit-Forming Business Models",
                subtitle: "Research & Development",
                type: "list",
                content: [
                    "Studying UX psychology principles (Fogg Behavior Model, behavioral triggers).",
                    "Designing monetization flows that align user value with sustainable revenue.",
                    "Building recommender systems that enhance user experience while maintaining ethical boundaries.",
                    "Exploring how habit formation can drive positive outcomes rather than addiction.",
                ],
            },
            {
                title: "Humanitarian Platforms",
                subtitle: "Vision & Ideation",
                type: "paragraph",
                content: "Platforms where impact greater than profit. I'm exploring how autonomous governance, transparent systems, and community-driven models can create sustainable humanitarian impact. The goal: systems that self-organize around human need rather than shareholder value.",
            },
        ],
    },
    interests: {
        title: "Interests & Explorations",
        description: "Areas I'm actively exploring beyond formal work. These interests inform my thinking and shape the questions I ask about technology, society, and human behavior.",
        items: [
            {
                title: "Philosophy & Human Nature",
                subtitle: "Personal Inquiry",
                type: "list",
                content: [
                    "Human evolution and how it shapes our cognitive biases and social structures.",
                    "Ethics in technology: What obligations do we have when building systems that influence behavior?",
                    "Metaphysics of systems: What makes a system \"real\" versus \"constructed\"?",
                    "The relationship between individual agency and systemic forces.",
                ],
            },
            {
                title: "Media, Narrative & Virality",
                subtitle: "Cultural Analysis",
                type: "list",
                content: [
                    "Podcast culture and how long-form content shapes ideas.",
                    "Reaction videos and narrative amplification: understanding the attention economy.",
                    "Trend seeding: How ideas spread and how to design for organic growth.",
                    "Algorithm bias and how recommendation systems shape what we see and think.",
                ],
            },
            {
                title: "Humanitarian Focus",
                subtitle: "Core Principle",
                type: "paragraph",
                content: "I believe technology should prioritize impact over profit. My exploration centers on: platforms that address real human needs, systems that empower rather than extract, and business models that create sustainable value for communities. The question I keep returning to: \"How can automation and psychology serve humanitarian goals?\"",
            },
        ],
    },
    academic: {
        title: "Academic Journey & Achievements",
        description: "A comprehensive record of academic milestones, research contributions, and scholarly achievements. Each stage represents a commitment to rigorous inquiry and interdisciplinary learning.",
        items: [
            {
                title: "O-Levels",
                subtitle: "Completed 2024",
                type: "list",
                content: [
                    "Achieved high grades across core subjects.",
                    "Received a High Achievement Certificate from the school.",
                    "Built strong foundations in analytical thinking and interdisciplinary learning.",
                ],
            },
            {
                title: "Academic Excellence Scholarship",
                subtitle: "Awarded 2024",
                type: "list",
                content: [
                    "Recognized for outstanding academic performance.",
                    "Maintained rigorous academic standards while pursuing independent research initiatives.",
                ],
            },
            {
                title: "Mantaining the Standards",
                subtitle: "Throughout A-Levels",
                type: "list",
                content: [
                    "Maintained high academic standards across all subjects.",
                    "Earned official school certificate for strong performance.",
                    "Focused on Maths, Physics, and Computer Science as core areas of study.",
                    "Mentored peers and helped them improve their academic performance.",
                ],
            },
            {
                title: "Research Focus Areas (Apart from school)",
                subtitle: "Ongoing",
                type: "list",
                content: [
                    "Human-Computer Interaction and Behavioral Psychology in Digital Interfaces",
                    "Behavioral Economics and Decision-Making in Financial Technology",
                    "Systems Thinking and Geopolitical Analysis",
                    "Humanitarian Impact Assessment and Social Innovation",
                ],
            },
        ],
    },
};