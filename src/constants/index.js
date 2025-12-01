import { meta, shopify, starbucks, tesla } from "../assets/images";
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
        link: 'https://www.linkedin.com/in/Wahib2247',
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