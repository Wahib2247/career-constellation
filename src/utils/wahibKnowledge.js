// Knowledge Base for Wahib's AI Counterpart
// Mapped directly from website constants to reduce redundancy and ensure consistency

import { aboutContent, projects, pageTexts, experiences } from '../constants';

export const wahibKnowledge = {
  // Personal Introduction - from pageTexts
  introduction: {
    text: pageTexts.about.introduction,
    name: pageTexts.about.name,
    greeting: pageTexts.about.greeting,
    tone: "humble, reflective, student-oriented"
  },

  // Academic Journey - mapped from aboutContent.academic
  academic: {
    oLevels: {
      completed: "2024",
      achievements: aboutContent.academic.items[0].content
    },
    scholarship: {
      year: "2024",
      description: aboutContent.academic.items[1].content.join(" "),
      points: aboutContent.academic.items[1].content
    },
    aLevels: {
      status: "Maintaining high standards",
      focus: "Maths, Physics, and Computer Science",
      achievements: aboutContent.academic.items[2].content
    },
    researchFocus: aboutContent.academic.items[3].content
  },

  // Mission & Philosophy - mapped from aboutContent.mission
  mission: {
    core: aboutContent.mission.items[0].content,
    roles: aboutContent.mission.items[1].content.map(role => role.replace(/<strong>|<\/strong>/g, ''))
  },

  // Projects - mapped directly from constants
  projects: {
    // All projects from the projects array
    portfolioProjects: projects.map(p => ({
      name: p.name,
      description: p.description,
      link: p.link,
      theme: p.theme
    })),
    // Blueprint projects from aboutContent
    magicTask: {
      name: "MagicTask",
      year: "2022",
      description: aboutContent.work.items[1].content.join(" "),
      link: aboutContent.work.items[1].link
    },
    FlowFund: {
      name: "FlowFund",
      status: "Blueprint Stage",
      description: "A blueprint-stage idea for a financial chain that motivates money flow from rich to poor, hosted like Shopify for NGOs and individuals. Designed to reduce poverty through incentives and internal currency. Exploring transparent tokenomics and community-driven value creation."
    },
    fundMyLife: {
      name: "Fund My Life",
      status: "Blueprint Stage",
      description: typeof aboutContent.ventures.items[0].content === 'string' 
        ? aboutContent.ventures.items[0].content 
        : aboutContent.ventures.items[0].content.join(" ")
    }
  },

  // Work & Experience - mapped from experiences and aboutContent.work
  work: {
    experiences: experiences.map(exp => ({
      title: exp.title,
      company: exp.company_name,
      date: exp.date,
      points: exp.points
    })),
    skills: aboutContent.work.items[0].content
  },

  // Research Interests - mapped from aboutContent.ideas
  research: {
    psychology: aboutContent.ideas.items[0].content.map(item => item.replace(/<strong>|<\/strong>/g, '')),
    tech: aboutContent.ideas.items[1].content.map(item => item.replace(/<strong>|<\/strong>/g, '')),
    society: aboutContent.ideas.items[2].content.map(item => item.replace(/<strong>|<\/strong>/g, '')),
    habitForming: aboutContent.ideas.items[3].content,
    humanitarian: aboutContent.ideas.items[4].content
  },

  // Interests - mapped from aboutContent.interests
  interests: {
    philosophy: aboutContent.interests.items[0].content,
    media: aboutContent.interests.items[1].content,
    humanitarian: aboutContent.interests.items[2].content
  },

  // Ventures - mapped from aboutContent.ventures
  ventures: {
    description: aboutContent.ventures.description,
    projects: aboutContent.ventures.items
  },

  // Future Goals - from aboutContent context
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

// Comprehensive keyword lists for better matching
export const keywordMap = {
  academic: [
    'academic', 'education', 'scholarship', 'o-level', 'a-level', 'olevel', 'alevel',
    'grades', 'qualification', 'achievement', 'achievements', 'certificate', 'school',
    'student', 'studies', 'studying', 'learn', 'learning', 'university', 'college',
    'degree', 'diploma', 'exam', 'exams', 'test', 'tests', 'result', 'results',
    'merit', 'excellence', 'outstanding', 'performance', 'academically', 'scholarly',
    'deserves scholarship', 'why scholarship', 'scholarship deserve', 'deserving'
  ],
  project: [
    'project', 'projects', 'work', 'works', 'build', 'built', 'building', 'create',
    'created', 'creating', 'develop', 'developed', 'developing', 'development',
    'portfolio', 'application', 'applications', 'app', 'apps', 'software', 'program',
    'programs', 'code', 'coding', 'programming', 'FlowFund', 'fund my life',
    'fundmylife', 'magictask', 'magic task', 'research paper', 'summarization',
    'behavioral economics', 'dashboard', 'academic discussion', 'platform',
    'humanitarian impact', 'tracker', 'systems thinking', 'visualization',
    'ux psychology', 'research platform'
  ],
  work: [
    'work', 'works', 'working', 'job', 'jobs', 'employment', 'employ', 'career',
    'experience', 'experiences', 'position', 'positions', 'role', 'roles',
    'research assistant', 'independent study', 'full-stack', 'fullstack',
    'developer', 'development', 'web development', 'react', 'node', 'javascript',
    'typescript', 'mongodb', 'express', 'tech', 'technology', 'technical',
    'programming', 'coding', 'software engineering', 'engineering'
  ],
  research: [
    'research', 'researches', 'researching', 'study', 'studies', 'studying',
    'interest', 'interests', 'interested', 'focus', 'focuses', 'focused',
    'psychology', 'psychological', 'behavioral', 'behavior', 'behaviour',
    'economics', 'economic', 'philosophy', 'philosophical', 'humanitarian',
    'human', 'humanity', 'tech', 'technology', 'systems', 'system',
    'architecture', 'geopolitics', 'geopolitical', 'society', 'social',
    'fogg', 'kahneman', 'ariely', 'thaler', 'microservices', 'recommender',
    'bot orchestration', 'trend seeding', 'cunningham', 'fintech'
  ],
  mission: [
    'mission', 'missions', 'philosophy', 'philosophies', 'philosophical',
    'vision', 'visions', 'values', 'value', 'believe', 'believes', 'belief',
    'beliefs', 'approach', 'approaches', 'principle', 'principles', 'core',
    'purpose', 'purposes', 'goal', 'goals', 'objective', 'objectives',
    'blueprint architect', 'community onboarder', 'narrative strategist',
    'systems thinker', 'human flourishing', 'human agency', 'well-being'
  ],
  contact: [
    'contact', 'contacts', 'contacted', 'email', 'emails', 'reach', 'reaches',
    'reached', 'connect', 'connects', 'connected', 'connection', 'connections',
    'get in touch', 'get in contact', 'how to reach', 'how can i contact',
    'where can i contact', 'how to connect', 'communication', 'communicate',
    'message', 'messages', 'messaging', 'send', 'sends', 'sending', 'write',
    'writes', 'writing', 'talk', 'talks', 'talking', 'speak', 'speaks',
    'speaking', 'call', 'calls', 'calling', 'phone', 'telephone'
  ],
  about: [
    'about', 'who', 'tell me', 'describe', 'explain', 'information', 'info',
    'background', 'biography', 'bio', 'story', 'stories', 'introduction',
    'introduce', 'overview', 'summary', 'summarize', 'details', 'detail'
  ],
  decision: [
    'arrange', 'arranges', 'arranged', 'arranging', 'arrangement', 'arrangements',
    'schedule', 'schedules', 'scheduled', 'scheduling', 'meeting', 'meetings',
    'meet', 'meets', 'met', 'call', 'calls', 'calling', 'interview', 'interviews',
    'appointment', 'appointments', 'available', 'availability', 'free', 'time',
    'when', 'where', 'commit', 'commits', 'committed', 'commitment', 'commitments',
    'promise', 'promises', 'promised', 'guarantee', 'guarantees', 'guaranteed',
    'can you', 'will you', 'do you want', 'would you', 'join', 'joins', 'joined',
    'joining', 'collaborate', 'collaborates', 'collaborated', 'collaboration',
    'collaborations', 'work with', 'hire', 'hires', 'hired', 'hiring', 'employ',
    'employs', 'employed', 'employment', 'partnership', 'partnerships', 'partner',
    'partners', 'team up', 'teaming up', 'location', 'locations', 'in person',
    'where are you', 'where can i', 'book', 'books', 'booking', 'booked', 'plan',
    'plans', 'planned', 'planning', 'set up', 'setting up', 'setup'
  ],
  personality: [
    'personality', 'personalities', 'character', 'characters', 'trait', 'traits',
    'good person', 'nice', 'kind', 'friendly', 'funny', 'humor', '',
    'mad', 'angry', 'upset', 'calm', 'patient', 'impatient', 'what like',
    'how like', 'what kind', 'what type', 'person', 'people'
  ],
  goal: [
    'goal', 'goals', 'future', 'futures', 'plan', 'plans', 'planned', 'planning',
    'aspiration', 'aspirations', 'dream', 'dreams', 'dreamed', 'dreaming',
    'want', 'wants', 'wanted', 'wanting', 'aim', 'aims', 'aimed', 'aiming',
    'ambition', 'ambitions', 'ambitious', 'hope', 'hopes', 'hoped', 'hoping',
    'wish', 'wishes', 'wished', 'wishing', 'intend', 'intends', 'intended',
    'intending', 'intention', 'intentions'
  ],
  venture: [
    'venture', 'ventures', 'blueprint', 'blueprints', 'idea', 'ideas', 'concept',
    'concepts', 'exploration', 'explorations', 'explore', 'explores', 'explored',
    'exploring', 'startup', 'startups', 'business', 'businesses', 'company',
    'companies', 'initiative', 'initiatives'
  ],
  interest: [
    'interest', 'interests', 'interested', 'interesting', 'hobby', 'hobbies',
    'passion', 'passions', 'passionate', 'like', 'likes', 'liked', 'liking',
    'enjoy', 'enjoys', 'enjoyed', 'enjoying', 'favorite', 'favourites',
    'favourite', 'prefer', 'prefers', 'preferred', 'preferring', 'preference',
    'preferences', 'curious', 'curiosity', 'explore', 'explores', 'explored',
    'exploring', 'exploration', 'explorations'
  ]
};

// Enhanced search function with comprehensive keyword matching
export const searchKnowledge = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];

  // Check each category with comprehensive keyword matching
  Object.entries(keywordMap).forEach(([category, keywords]) => {
    const matches = keywords.some(keyword => {
      // Handle multi-word keywords
      if (keyword.includes(' ')) {
        return lowerQuery.includes(keyword);
      }
      // Handle single-word keywords with word boundaries
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      return regex.test(lowerQuery);
    });

    if (matches) {
      results.push({
        category,
        data: wahibKnowledge[category] || null
      });
    }
  });

  return results;
};
