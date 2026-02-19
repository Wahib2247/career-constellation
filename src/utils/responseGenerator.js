// Intelligent Response Generator for Wahib's AI Counterpart
// ChatGPT-like responses with varied greetings, spelling tolerance, and knowledge base awareness

import { wahibKnowledge } from './wahibKnowledge';
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
const getGreeting = (userName, useName = true) => {
  if (!userName || !useName) {
    return [
      "Inquiry received. ",
      "Mapping data coordinates... ",
      "Accessing laboratory records: ",
      "Searching research threads... "
    ][Math.floor(Math.random() * 4)];
  }

  const greetings = [
    `Hi ${userName.split(' ')[0]}! `,
    `${userName.split(' ')[0]}, `,
    `Hey ${userName.split(' ')[0]}! `,
    `Thanks for asking, ${userName.split(' ')[0]}! `,
    `Great question, ${userName.split(' ')[0]}! `,
    `Inquiry acknowledged, ${userName.split(' ')[0]}. `,
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
};

export const generateIntelligentResponse = (query, userName = '', conversationHistory = []) => {
  if (!query || typeof query !== 'string') {
    return {
      text: "I didn't understand the data pulse. Could you rephrase your inquiry?",
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

  // Check for repetition
  const isRepetitive = recentResponses.length >= 2 &&
    recentResponses.slice(-2).every(resp =>
      resp.includes(recentResponses[0].substring(0, 50))
    );

  // Vary greeting usage (don't use name every time)
  const useName = Math.random() > 0.4; // 60% chance of using name
  const greeting = getGreeting(userName, useName);

  // Decision/Commitment deferral
  if (intent === 'decision') {
    const decisionResponses = [
      `${greeting}Wahib handles personal commitments and scheduling directly. I've noted this inquiry for his review.`,
      `${greeting}I'm an assistant for research data — for meetings or collaborations, Wahib will reach out to you personally.`,
      `${greeting}My protocol is restricted to information sharing. For personal arrangements, please use the Contact page to reach Wahib directly.`
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
      `${greeting}Wahib's academic record is built on consistency. He completed O-Levels in 2024 with high achievement, earning an Academic Excellence Scholarship for both his performance and project innovation. Currently, he's mastering Maths, Physics, and Computer Science at the A-Level, while also serving as a peer mentor.`,
      `${greeting}Educationally, Wahib focuses on the intersection of STEM and research. Since completing O-Levels in 2024 with a High Achievement Certificate, he moved into A-Levels (Maths/Physics/CS) and earned a prestigious Academic Excellence Scholarship. He balances this rigor with independent research in behavioral science.`,
      `${greeting}Academic metrics: O-Levels (2024) High Achievement, recipient of the 2024 Academic Excellence Scholarship for innovative project work, and current A-Level studies in Maths, Physics, and CS. His mentor-student mindset defines his scholastic approach.`
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
          text: `${greeting}FlowFund represents an exploration into "money velocity" for humanitarian aid. It's envisioned as a Shopify-like ecosystem for NGOs, using transparent tokenomics to move capital where it's needed most.`,
          actionLink: "/projects",
          actionText: "Explore FlowFund",
          deferral: false
        };
      }

      if (matchedProject.toLowerCase().includes('magictask')) {
        return {
          text: `${greeting}MagicTask is a flagship project from Wahib's time at Fastech. It utilizes the MCARS vibrant interface to stabilize executive function and minimize cognitive load in task management.`,
          actionLink: "https://magictask.io",
          actionText: "Visit MagicTask",
          deferral: false
        };
      }
    }

    const responses = [
      `${greeting}Wahib constructs "Technical Lab Artifacts" rather than just apps. From MagicTask's cognitive ergonomics to FlowFund's humanitarian tokenomics, his work explores the fusion of code and psychology.`,
      `${greeting}The project index contains everything from high-fidelity institutional work like MagicTask to blueprint-stage research like FlowFund. You can explore the full laboratory library in the Projects section.`,
      `${greeting}Current research artifacts include behavioral dashboards, humanitarian platform concepts (FlowFund), and technical builds like MagicTask. Each serves as a data point in his learning journey.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/projects",
      actionText: "Open Research Grid",
      deferral: false
    };
  }

  // Research interests
  if (lowerQuery === 'research interests' || intent === 'research' || lowerQuery.match(/\b(research|interest|study|focus)\b/i)) {
    const responses = [
      `${greeting}Wahib operates at the intersection of Psychology (Behavioral Economics/UX), Architecture (Microservices/Bot Orchestration), and Social Impact (Fintech for NGOs). His central question: how can we build systems that self-organize around human needs?`,
      `${greeting}His research map covers three main nodes: Behavioral Science (Fogg Model/Kahneman), Systems Design (Architecture/Logic), and Humanitarian Scaling (Sustainable Impact Models). He's particularly interested in "Impact over Ego".`,
      `${greeting}Wahib's inquiry currently focuses on "Human-Readable Systems". This involves studying how technology influences human motivation and how we can architect more ethical, transparent platforms for humanitarian good.`
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
    `${greeting}I'm tracking several data nodes: academic credentials (scholarships/grades), project artifacts (MagicTask/FlowFund), and research threads (psychology/tech architecture). What should we synthesize next?`,
    `${greeting}My protocol allows me to explore Wahib's background, mission, and current research builds. Are you interested in the technical implementation or the philosophical motivation behind his work?`,
    `${greeting}Search parameters are broad: I can discuss Wahib's academic achievements, his work at companies like Fastech, or his vision for humanitarian tech platforms. Where shall we start the inquiry?`,
    `${greeting}Laboratory records are accessible for: O-Levels/Scholarship data, Projects (FlowFund/Fund My Life), and Research Focus (Behavioral UX). Help me narrow the inquiry vector.`
  ];

  return {
    text: genericResponses[Math.floor(Math.random() * genericResponses.length)],
    actionLink: null,
    actionText: null,
    deferral: false
  };
};
