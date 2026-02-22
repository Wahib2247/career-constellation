import { correctSpelling, fuzzyMatchProject, extractIntent } from './spellingHelper';
import { projects } from '../constants';

// Get all project names for fuzzy matching
const allProjectNames = [
  ...projects.map(p => p.name),
  'FlowFund',
  'Fund My Life',
  'MagicTask'
];

// Varied greeting patterns
const getGreeting = () => {
  const greetings = [
    "I am Wahib's Documentation Assistant. How can I help you navigate the Lab's records?",
    "Welcome to the inquiry interface. What research area would you like to explore?",
    "Documentation Assistant online. Please state your query.",
    "Connecting you to the Lab's documentation. How can I assist you today?"
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
};

export const generateIntelligentResponse = (query, userName = '', conversationHistory = []) => {
  if (!query || typeof query !== 'string') {
    return {
      text: "I didn't understand the input. Could you rephrase your inquiry?",
      actionLink: null,
      actionText: null,
      deferral: false
    };
  }

  // Correct spelling first
  const correctedQuery = correctSpelling(query.trim());
  const lowerQuery = correctedQuery.toLowerCase();
  const intent = extractIntent(correctedQuery);

  // Track response patterns
  const recentResponses = conversationHistory
    .slice(-5)
    .filter(msg => msg.sender === 'bot')
    .map(msg => msg.text);

  const greeting = getGreeting();

  // Decision/Commitment deferral
  if (intent === 'decision') {
    const decisionResponses = [
      `${greeting} Wahib handles personal commitments and scheduling directly. I've noted this inquiry for his review.`,
      `${greeting} I'm an assistant for research data — for meetings or collaborations, Wahib will reach out to you personally.`,
      `${greeting} My role is restricted to information sharing. For personal arrangements, please use the Contact page to reach Wahib directly.`
    ];
    return {
      text: decisionResponses[Math.floor(Math.random() * decisionResponses.length)],
      actionLink: "/contact",
      actionText: "Go to Contact",
      deferral: true
    };
  }

  // Academic queries
  const isAcademicQuery = lowerQuery === 'academic achievements' ||
    intent === 'academic' ||
    lowerQuery.match(/\b(academic|education|scholarship|achievement|grades|o-level|a-level)\b/i);

  if (isAcademicQuery) {
    const responses = [
      `${greeting} Wahib's academic record is built on consistency. He completed O-Levels in 2024 with high achievement, earning an Academic Excellence Scholarship for both his performance and project innovation. Currently, he's mastering Maths, Physics, and Computer Science at the A-Level, while also serving as a peer mentor.`,
      `${greeting} Educationally, Wahib focuses on the intersection of STEM and research. Since completing O-Levels in 2024 with a High Achievement Certificate, he moved into A-Levels (Maths/Physics/CS) and earned a prestigious Academic Excellence Scholarship. He balances this rigor with independent research in behavioral science.`,
      `${greeting} Academic metrics: O-Levels (2024) High Achievement, recipient of the 2024 Academic Excellence Scholarship for innovative project work, and current A-Level studies in Maths, Physics, and CS. His mentor-student mindset defines his scholastic approach.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#academic",
      actionText: "Check Academic Proof",
      deferral: false
    };
  }

  // Project queries
  if (intent === 'project' || lowerQuery.match(/\b(project|work|build|create|developed|portfolio)\b/i)) {
    const matchedProject = fuzzyMatchProject(correctedQuery, allProjectNames);

    if (matchedProject) {
      if (matchedProject.toLowerCase().includes('flowfund')) {
        return {
          text: `${greeting} FlowFund represents an exploration into "money velocity" for humanitarian aid. It's envisioned as a platform ecosystem for NGOs, using transparent tokenomics to move capital where it's needed most.`,
          actionLink: "/projects",
          actionText: "Explore FlowFund",
          deferral: false
        };
      }

      if (matchedProject.toLowerCase().includes('magictask')) {
        return {
          text: `${greeting} MagicTask is a primary project from Wahib's time at Fastech. It utilizes a vibrant interface to minimize cognitive load in task management.`,
          actionLink: "https://magictask.io",
          actionText: "Visit MagicTask",
          deferral: false
        };
      }
    }

    const responses = [
      `${greeting} Wahib constructs research artifacts rather than just apps. From MagicTask's cognitive ergonomics to FlowFund's humanitarian tokenomics, his work explores the fusion of code and psychology.`,
      `${greeting} The project index contains everything from professional work like MagicTask to blueprint-stage research like FlowFund. You can explore the full library in the Projects section.`,
      `${greeting} Current research papers include behavioral dashboards, humanitarian platform concepts (FlowFund), and technical builds like MagicTask. Each serves as a step in his learning journey.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/projects",
      actionText: "View Projects",
      deferral: false
    };
  }

  // Research interests
  if (lowerQuery === 'research interests' || intent === 'research' || lowerQuery.match(/\b(research|interest|study|focus)\b/i)) {
    const responses = [
      `${greeting} Wahib operates at the intersection of Psychology (Behavioral Economics), Architecture (Systems Design), and Social Impact (Fintech for NGOs). His central question: how can we build systems that better serve human needs?`,
      `${greeting} His research map covers three main nodes: Behavioral Science, Systems Design, and Humanitarian Scaling. He's particularly interested in sustainable impact models.`,
      `${greeting} Wahib's inquiry currently focuses on "Human-Readable Systems". This involves studying how technology influences human motivation and how we can architect more ethical, transparent platforms.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#ideas",
      actionText: "Explore Research Map",
      deferral: false
    };
  }

  // Generic fallback (Diversified)
  const genericResponses = [
    `${greeting} I'm tracking several data points: academic credentials (scholarships/grades), project artifacts (MagicTask/FlowFund), and research threads (psychology). What should we focus on?`,
    `${greeting} My role is to help you explore Wahib's background, mission, and current research. Are you interested in the technical implementation or the research motivation behind his work?`,
    `${greeting} I can discuss Wahib's academic achievements, his work at companies like Fastech, or his vision for humanitarian tech platforms. Where shall we start?`,
    `${greeting} Documentation is available for: O-Levels/Scholarship data, Projects (FlowFund), and Research Focus (Behavioral UX). Help me narrow the inquiry.`
  ];

  return {
    text: genericResponses[Math.floor(Math.random() * genericResponses.length)],
    actionLink: null,
    actionText: null,
    deferral: false
  };
};
