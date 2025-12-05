// Knowledge Base for Wahib's AI Counterpart
// This contains all the information about Wahib from the portfolio

import { aboutContent, projects, pageTexts, experiences } from '../constants';

export const wahibKnowledge = {
  // Personal Introduction
  introduction: {
    text: "I'm Wahib's Personal AI counterpart. I'm here to help you explore his journey, work, and ideas. Think of this as a new way of interviewing — ask me anything about Wahib, and I'll share what I know from his portfolio.",
    tone: "humble, reflective, student-oriented"
  },

  // Academic Journey
  academic: {
    oLevels: {
      completed: "2024",
      achievements: [
        "Achieved high grades across core subjects",
        "Received High Achievement Certificate from school",
        "Built strong foundations in analytical thinking and interdisciplinary learning"
      ]
    },
    scholarship: {
      year: "2024",
      description: "Recognized for outstanding academic performance and innovative project work. Maintained rigorous academic standards while pursuing independent research initiatives."
    },
    aLevels: {
      status: "Maintaining high standards",
      focus: "Maths, Physics, and Computer Science",
      achievements: [
        "Maintained high academic standards across all subjects",
        "Earned official school certificate for strong performance",
        "Mentored peers and helped them improve their academic performance"
      ]
    },
    researchFocus: [
      "Human-Computer Interaction and Behavioral Psychology in Digital Interfaces",
      "Behavioral Economics and Decision-Making in Financial Technology",
      "Systems Thinking and Geopolitical Analysis",
      "Humanitarian Impact Assessment and Social Innovation"
    ]
  },

  // Mission & Philosophy
  mission: {
    core: "Building platforms that fuse automation, psychology, and humanitarian impact. Technology should serve human flourishing, not just efficiency metrics. Every system is designed with the question: 'How does this improve human agency and well-being?'",
    roles: [
      "Blueprint Architect: Designing system foundations that enable scalable impact",
      "Community Onboarder: Creating pathways for meaningful engagement",
      "Narrative Strategist: Framing projects as stories that inspire action",
      "Systems Thinker: Connecting dots between technology, behavior, and social outcomes"
    ]
  },

  // Projects - now includes all projects from constants
  projects: {
    // All projects from the projects array
    portfolioProjects: projects.map(p => ({
      name: p.name,
      description: p.description,
      link: p.link,
      theme: p.theme
    })),
    // Blueprint projects (also part of projects conceptually)
    magicTask: {
      name: "MagicTask",
      year: "2022",
      description: "Complex UI/UX design with MCARS theme. Task management system leveraging UX psychology and habit formation models. Built platforms that transform productivity through psychological insights.",
      link: "https://magictask.io"
    },
    floodCoin: {
      name: "FloodCoin",
      status: "Blueprint Stage",
      description: "A blueprint-stage idea for a financial chain that motivates money flow from rich to poor, hosted like Shopify for NGOs and individuals. Designed to reduce poverty through incentives and internal currency. Exploring transparent tokenomics and community-driven value creation."
    },
    fundMyLife: {
      name: "Fund My Life",
      status: "Blueprint Stage",
      description: "Exploring transparent tokenomics and community-driven value creation. A meme-coin with humanitarian angles, where community onboarding becomes a mechanism for collective impact. Currently mapping tokenomics flows and community governance structures."
    }
  },

  // Research Interests
  research: {
    psychology: [
      "Human Readability: Designing systems that feel natural and intuitive to human cognition",
      "Fogg Behavior Model: Applying B=MAT (Motivation, Ability, Trigger) to product design",
      "Behavioral Economics: Integrating insights from Kahneman, Ariely, and Thaler into UX flows",
      "Philosophical Inquiry: Exploring ethics, human evolution, and what makes systems 'good'"
    ],
    tech: [
      "Microservices Logic: Building systems that are modular, scalable, and maintainable",
      "Recommender Systems: Creating algorithms that enhance user experience without manipulation",
      "Bot Orchestration: Designing automated systems that augment rather than replace human agency",
      "System Design: Thinking in flows, dependencies, and emergent behaviors"
    ],
    society: [
      "Trend Seeding: Understanding how ideas spread and how to design for virality ethically",
      "Cunningham's Law: Leveraging human psychology in community building",
      "Fintech for Humanitarian Aid: Exploring how financial technology can serve poverty reduction",
      "Geopolitical Analysis: Understanding how global systems affect local impact"
    ],
    humanitarian: "Platforms where impact greater than profit. Exploring how autonomous governance, transparent systems, and community-driven models can create sustainable humanitarian impact. The goal: systems that self-organize around human need rather than shareholder value."
  },

  // Future Goals
  goals: {
    shortTerm: "Position himself for university admissions and collaborations by showcasing a credible, reflective portfolio",
    longTerm: "Build platforms that fuse automation, psychology, and humanitarian impact",
    approach: "Learning every day, systems thinking, humanitarian impact, authenticity"
  },

  // Contact
  contact: {
    email: "wahibb07@gmail.com",
    message: "Always open to academic discussions and collaborations"
  },

  // Tone Guidelines
  tone: {
    style: "humble, reflective, student-oriented, growth-focused",
    framing: "Present achievements as milestones in a learning journey, not as final mastery",
    responses: "Frame responses as explorations, not final authority",
    closure: "Thank you for exploring ideas with Wahib's AI counterpart — your curiosity helps these explorations grow."
  }
};

// Helper function to search knowledge base
export const searchKnowledge = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];

  // Academic queries
  if (lowerQuery.includes('academic') || lowerQuery.includes('education') || lowerQuery.includes('scholarship') || lowerQuery.includes('o-level') || lowerQuery.includes('a-level')) {
    results.push({
      category: 'academic',
      data: wahibKnowledge.academic
    });
  }

  // Project queries
  if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('floodcoin') || lowerQuery.includes('fund my life') || lowerQuery.includes('magictask')) {
    results.push({
      category: 'projects',
      data: wahibKnowledge.projects
    });
  }

  // Mission/Philosophy queries
  if (lowerQuery.includes('mission') || lowerQuery.includes('philosophy') || lowerQuery.includes('vision') || lowerQuery.includes('goal')) {
    results.push({
      category: 'mission',
      data: wahibKnowledge.mission
    });
  }

  // Research queries
  if (lowerQuery.includes('research') || lowerQuery.includes('interest') || lowerQuery.includes('psychology') || lowerQuery.includes('behavioral') || lowerQuery.includes('humanitarian')) {
    results.push({
      category: 'research',
      data: wahibKnowledge.research
    });
  }

  // Contact queries
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach') || lowerQuery.includes('connect')) {
    results.push({
      category: 'contact',
      data: wahibKnowledge.contact
    });
  }

  return results;
};
