// Intelligent Response Generator for Wahib's AI Counterpart
// ChatGPT-like responses with varied greetings, spelling tolerance, and knowledge base awareness

import { wahibKnowledge } from './wahibKnowledge';
import { correctSpelling, fuzzyMatchProject, extractIntent } from './spellingHelper';
import { projects } from '../constants';

// Get all project names for fuzzy matching
const allProjectNames = [
  ...projects.map(p => p.name),
  'FloodCoin',
  'Fund My Life',
  'MagicTask'
];

// Varied greeting patterns
const getGreeting = (userName, useName = true) => {
  if (!userName || !useName) return '';
  
  const greetings = [
    `Hi ${userName.split(' ')[0]}! `,
    `${userName.split(' ')[0]}, `,
    `Hey ${userName.split(' ')[0]}! `,
    `Thanks for asking, ${userName.split(' ')[0]}! `,
    `${userName.split(' ')[0]}, `,
    `Great question, ${userName.split(' ')[0]}! `,
  ];
  
  return greetings[Math.floor(Math.random() * greetings.length)];
};

export const generateIntelligentResponse = (query, userName = '', conversationHistory = []) => {
  if (!query || typeof query !== 'string') {
    return {
      text: "I didn't understand that. Could you rephrase your question?",
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
  const useName = Math.random() > 0.3; // 70% chance of using name
  const greeting = getGreeting(userName, useName);
  
  // Decision deferral patterns - needs personal input
  const decisionPatterns = [
    /\b(join|collaborate|work with|hire|employ|partnership|team up)\b/i,
    /\b(available|free|time|schedule|meeting|call|interview|when|where)\b/i,
    /\b(commit|promise|guarantee|can you|will you|do you want)\b/i,
    /\b(meet|meeting|in person|location|where are you|where can i)\b/i
  ];

  const requiresDecision = decisionPatterns.some(pattern => pattern.test(correctedQuery));

  if (requiresDecision) {
    const responses = [
      `${greeting}I understand you'd like to connect with Wahib. While I can't arrange meetings directly, Wahib will get back to you personally about this. You can also reach him through the Contact page — he's always open to meaningful conversations and collaborations.`,
      `${greeting}Noted — Wahib will deliver his response directly. You can also reach him via the Contact page.`,
      `${greeting}For personal arrangements like meetings or collaborations, Wahib prefers to respond directly. You can reach him through the Contact page, and he'll get back to you soon!`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/contact",
      actionText: "Go to Contact",
      deferral: true
    };
  }

  // Personality/Character questions
  if (intent === 'personality' || lowerQuery.match(/\b(good person|mad|angry|nice|kind|personality|character)\b/i)) {
    const responses = [
      `${greeting}While I don't have specific anecdotes about Wahib's personality traits, I can tell you he approaches learning with curiosity and reflection. His portfolio shows someone who thinks deeply about systems and human behavior. For a more personal sense of his character, you'd get better insights by talking with him directly!`,
      `${greeting}From what I can see in his work, Wahib seems thoughtful and reflective — someone who values learning and impact over ego. But honestly, personality is best understood through direct conversation. Would you like to reach out to him?`,
      `${greeting}I'm limited to what's in his portfolio, so I can't speak to personal traits like whether he's funny or gets mad. What I can tell you is his work shows someone committed to learning, systems thinking, and humanitarian impact. For personal insights, connecting directly would be best!`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/contact",
      actionText: "Connect with Wahib",
      deferral: false
    };
  }

  // Contact queries (with spelling tolerance)
  if (intent === 'contact' || lowerQuery.match(/\b(contact|email|reach|connect|get in touch|how to reach|how can i contact|where can i contact|contactn|contac)\b/i)) {
    const responses = [
      `${greeting}You can reach Wahib through the Contact page or email at ${wahibKnowledge.contact.email}. He's always open to academic discussions and collaborations!`,
      `${greeting}Wahib can be reached via the Contact page on this site, or directly at ${wahibKnowledge.contact.email}. He welcomes academic discussions and meaningful collaborations.`,
      `${greeting}For direct contact, use the Contact page or email ${wahibKnowledge.contact.email}. Wahib is particularly interested in academic discussions and collaborative opportunities.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/contact",
      actionText: "Go to Contact",
      deferral: false
    };
  }

  // Project queries - check actual projects array
  if (intent === 'project' || lowerQuery.match(/\b(project|work|build|create|developed|portfolio)\b/i)) {
    // Try to match specific project
    const matchedProject = fuzzyMatchProject(correctedQuery, allProjectNames);
    
    if (matchedProject) {
      // Find project in actual projects array
      const project = projects.find(p => 
        p.name.toLowerCase() === matchedProject.toLowerCase()
      );
      
      if (project) {
        return {
          text: `${greeting}${project.name} is ${project.description}`,
          actionLink: project.link !== '#' ? project.link : "/projects",
          actionText: "View Project",
          deferral: false
        };
      }
      
      // Check blueprint projects
      if (matchedProject.toLowerCase().includes('floodcoin')) {
        return {
          text: `${greeting}FloodCoin is Wahib's blueprint-stage idea for a financial chain that motivates money flow from rich to poor, hosted like Shopify for NGOs and individuals. It's designed to reduce poverty through incentives and internal currency. Currently exploring transparent tokenomics and community-driven value creation.`,
          actionLink: "/projects",
          actionText: "View Projects",
          deferral: false
        };
      }
      
      if (matchedProject.toLowerCase().includes('fund my life') || matchedProject.toLowerCase().includes('fundmylife')) {
        return {
          text: `${greeting}Fund My Life is a blueprint-stage exploration of transparent tokenomics and community-driven value creation. The vision: a meme-coin with humanitarian angles, where community onboarding becomes a mechanism for collective impact. Currently mapping tokenomics flows and community governance structures.`,
          actionLink: "/projects",
          actionText: "View Projects",
          deferral: false
        };
      }
      
      if (matchedProject.toLowerCase().includes('magictask')) {
        return {
          text: `${greeting}MagicTask (2022) is a complex UI/UX design project with MCARS theme. It's a task management system that leverages UX psychology and habit formation models, building platforms that transform productivity through psychological insights. You can check it out at https://magictask.io`,
          actionLink: "https://magictask.io",
          actionText: "Visit MagicTask",
          deferral: false
        };
      }
    }
    
    // General projects response
    const projectList = projects.slice(0, 3).map(p => p.name).join(', ');
    const responses = [
      `${greeting}Wahib has several research-driven projects exploring technology, behavioral science, and social impact. These include ${projectList}, FloodCoin, Fund My Life, and MagicTask. Each project serves as both a technical implementation and a learning experiment.`,
      `${greeting}His portfolio includes projects like ${projectList}, plus blueprint-stage ideas like FloodCoin and Fund My Life. You can explore all of them on the Projects page.`,
      `${greeting}Wahib works on various projects including ${projectList}, along with humanitarian platform concepts. Check out the Projects page for details on each one!`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/projects",
      actionText: "View Projects",
      deferral: false
    };
  }

  // Academic achievements - comprehensive with scholarship details
  // Check FIRST (before generic "about" queries) - more specific patterns first
  const isAcademicQuery = intent === 'academic' || 
      lowerQuery.includes('academic') || 
      lowerQuery.includes('achievement') || 
      lowerQuery.includes('achievements') ||
      lowerQuery.includes('scholarship') ||
      lowerQuery.includes('education') ||
      lowerQuery.includes('grades') ||
      lowerQuery.includes('o-level') ||
      lowerQuery.includes('a-level') ||
      lowerQuery.includes('qualification') ||
      lowerQuery.match(/\b(academic|education|scholarship|achievement|grades|o-level|a-level|qualification|deserves.*scholarship|why.*scholarship)\b/i);
      
  if (isAcademicQuery) {
    const academic = wahibKnowledge.academic;
    const responses = [
      `${greeting}Wahib's academic journey includes completing O-Levels in 2024 with high grades across core subjects and receiving a High Achievement Certificate from his school. He was awarded an Academic Excellence Scholarship in 2024, recognized for outstanding academic performance and innovative project work. Throughout A-Levels, he's maintained high standards in Maths, Physics, and Computer Science while mentoring peers and helping them improve. His independent research focuses on Human-Computer Interaction, Behavioral Economics, Systems Thinking, and Humanitarian Impact Assessment.`,
      `${greeting}Academically, Wahib completed O-Levels in 2024 with high achievement and earned an Academic Excellence Scholarship the same year for outstanding performance and innovative project work. He's maintaining strong performance in A-Levels (Maths, Physics, Computer Science), earned an official school certificate for strong performance, and actively mentors peers. Beyond coursework, he researches Human-Computer Interaction, Behavioral Economics, Systems Thinking, and Humanitarian Impact Assessment.`,
      `${greeting}His academic record shows: O-Levels completion in 2024 with high grades and High Achievement Certificate, Academic Excellence Scholarship in 2024 for outstanding performance and innovative project work, ongoing A-Levels excellence in Maths/Physics/Computer Science with official school certificate, plus peer mentoring. His research interests span Human-Computer Interaction, Behavioral Economics, Systems Thinking, and Humanitarian Impact Assessment.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#academic",
      actionText: "View Academic Journey",
      deferral: false
    };
  }

  // Scholarship-specific queries
  if (lowerQuery.match(/\b(deserves.*scholarship|why.*scholarship|scholarship.*deserve|deserving|merit|award)\b/i)) {
    const academic = wahibKnowledge.academic;
    const responses = [
      `${greeting}Wahib deserves a scholarship because he's demonstrated outstanding academic performance (O-Levels with high grades, High Achievement Certificate, Academic Excellence Scholarship in 2024), maintains rigorous standards while pursuing independent research, actively mentors peers, and focuses on research that combines technology with humanitarian impact. His work shows commitment to learning, systems thinking, and creating platforms that matter.`,
      `${greeting}Wahib is a deserving scholarship candidate based on: high academic achievement (O-Levels excellence, 2024 scholarship recipient), strong A-Levels performance in Maths/Physics/Computer Science, independent research in Human-Computer Interaction and Behavioral Economics, peer mentoring, and a portfolio demonstrating innovative project work that balances technology with humanitarian impact.`,
      `${greeting}Yes, Wahib deserves a scholarship. He's earned an Academic Excellence Scholarship (2024), maintains high academic standards across O-Levels and A-Levels, conducts independent research in Human-Computer Interaction and Behavioral Economics, mentors peers, and builds projects that explore technology's humanitarian potential. His approach combines academic rigor with systems thinking and impact-focused work.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#academic",
      actionText: "View Academic Journey",
      deferral: false
    };
  }

  // About Wahib (moved after academic to avoid conflicts)
  if (intent === 'about' || lowerQuery.match(/\b(about|who|tell me.*wahib|describe.*wahib)\b/i)) {
    const responses = [
      `${greeting}Wahib is a curious mind, lifelong learner, and systems thinker from Pakistan. He explores how automation, psychology, and humanitarian impact can fuse into platforms that matter. His journey is about learning every day, systems thinking, and maintaining authenticity. This portfolio is a living record of ideas, experiments, and reflections rather than finished products.`,
      `${greeting}Wahib is a systems thinker and lifelong learner from Pakistan, focused on building platforms that combine automation, psychology, and humanitarian impact. His work reflects a student-explorer mindset — always learning, reflecting, and framing ideas as ongoing explorations.`,
      `${greeting}From what I know, Wahib is a curious learner and systems thinker who's exploring how technology can serve humanitarian goals. His portfolio shows someone committed to learning, authenticity, and impact over ego.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about",
      actionText: "Read More",
      deferral: false
    };
  }

  // Research interests - comprehensive
  if (intent === 'research' || lowerQuery.match(/\b(research|interest|study|focus|what.*study|what.*research)\b/i)) {
    const research = wahibKnowledge.research;
    const responses = [
      `${greeting}Wahib's research spans several interconnected areas: Psychology & Philosophy (human readability, Fogg Behavior Model B=MAT, behavioral economics from Kahneman/Ariely/Thaler, philosophical inquiry into ethics and human evolution), Tech & Systems Architecture (microservices logic, recommender systems, bot orchestration, system design thinking), and Society & Geopolitics (trend seeding, Cunningham's Law, fintech for humanitarian aid, geopolitical analysis). He's particularly interested in how technology can serve humanitarian goals rather than just profit.`,
      `${greeting}His research interests include: Psychology & Philosophy (human readability, Fogg Behavior Model, behavioral economics, ethics), Tech Architecture (microservices, recommender systems, bot orchestration), and Social Systems (trend seeding, Cunningham's Law, humanitarian fintech, geopolitical analysis). The common thread: using technology for human impact. His humanitarian focus explores autonomous governance, transparent systems, and community-driven models for sustainable impact.`,
      `${greeting}Wahib researches at the intersection of psychology, technology, and social systems. Key areas: behavioral economics in UX (Fogg Model, Kahneman insights), system architecture (microservices, recommender systems), and fintech for humanitarian aid. He explores platforms where impact is greater than profit, focusing on systems that self-organize around human need rather than shareholder value.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#ideas",
      actionText: "Explore Research",
      deferral: false
    };
  }

  // Work/Experience queries - comprehensive with experiences
  if (intent === 'work' || lowerQuery.match(/\b(work|experience|job|employment|career|what.*does|what.*work|research assistant|leadership)\b/i)) {
    const responses = [
      `${greeting}Wahib's work includes: Research Assistant (2023-Present) conducting research on human-computer interaction and behavioral psychology, developing React.js applications for user studies, and publishing findings on psychology-economics-technology intersection. Independent Study & Projects (2022-Present) exploring full-stack development, studying behavioral economics in fintech/UX, and integrating psychology with modern web technologies. Full-stack development using React, Node.js, building user-centric interfaces with behavioral psychology principles, implementing microservices architecture. Notable project: MagicTask (2022) with MCARS theme leveraging UX psychology and habit formation models.`,
      `${greeting}Wahib works as a Research Assistant (2023-Present) researching human-computer interaction and behavioral psychology, developing React.js applications for research, and collaborating with academic teams. He also does Independent Study & Projects (2022-Present) in full-stack development, behavioral economics applications, and psychology-integrated web technologies. His technical work includes React/Node.js full-stack development, building interfaces with behavioral psychology focus, microservices architecture, and applications balancing automation with human-centered design. MagicTask (2022) is a key project demonstrating UX psychology application.`,
      `${greeting}His work spans: Research Assistant role (2023-Present) in human-computer interaction research, React.js development for user studies, and publishing on psychology-economics-technology. Independent projects (2022-Present) in full-stack development, behavioral economics in fintech/UX, and psychology-integrated web tech. Technical work: React/Node.js development, behavioral psychology-based interfaces, microservices, automation-human design integration. MagicTask (2022) showcases UX psychology and habit formation models.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#work",
      actionText: "View Work & Projects",
      deferral: false
    };
  }

  // Leadership/Program queries
  if (lowerQuery.match(/\b(leadership|cgdl|program|development|mentor)\b/i)) {
    const responses = [
      `${greeting}Wahib participated in the CGDL Leadership Program (2025), a comprehensive leadership and community building program. He developed skills in project management, team collaboration, and strategic thinking, applied systems thinking to frame projects as missions with measurable impact, and mentored peers while contributing to program development initiatives.`,
      `${greeting}He's part of the CGDL Leadership Program (2025), developing leadership skills, project management, team collaboration, and strategic thinking. He applies systems thinking to frame projects as missions and actively mentors peers.`,
      `${greeting}Wahib is in the CGDL Leadership Program (2025), focusing on leadership development, project management, systems thinking application to missions, and peer mentoring.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about",
      actionText: "Learn More",
      deferral: false
    };
  }

  // Ventures/Blueprint projects
  if (lowerQuery.match(/\b(venture|blueprint|idea|concept|exploration)\b/i)) {
    const responses = [
      `${greeting}Wahib's ventures and blueprint projects include FloodCoin (a financial chain motivating money flow from rich to poor, like Shopify for NGOs) and Fund My Life (a meme-coin with humanitarian angles exploring transparent tokenomics). These are early-stage explorations where ideas meet implementation, representing his vision for platforms balancing innovation with humanitarian impact.`,
      `${greeting}His blueprint projects include FloodCoin (financial chain for poverty reduction through incentives) and Fund My Life (humanitarian meme-coin with community-driven value creation). These ventures represent early-stage explorations of platforms that balance innovation with humanitarian impact.`,
      `${greeting}Wahib's ventures are blueprint-stage ideas: FloodCoin (financial chain for NGOs/individuals to reduce poverty) and Fund My Life (humanitarian meme-coin with transparent tokenomics). These explore how community onboarding can become a mechanism for collective impact.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#ventures",
      actionText: "View Ventures",
      deferral: false
    };
  }

  // Interests/Explorations
  if (lowerQuery.match(/\b(interest|exploration|hobby|what.*interested|what.*like|passion)\b/i)) {
    const responses = [
      `${greeting}Wahib's interests include Philosophy & Human Nature (human evolution, cognitive biases, ethics in technology, metaphysics of systems), Media & Narrative (podcast culture, reaction videos, trend seeding, algorithm bias), and Humanitarian Focus (platforms addressing real human needs, systems that empower rather than extract, business models creating sustainable community value). He believes technology should prioritize impact over profit.`,
      `${greeting}His interests span Philosophy & Human Nature (evolution, cognitive biases, tech ethics), Media & Narrative (podcast culture, virality, algorithm bias), and Humanitarian Focus (impact over profit, empowering systems, sustainable community value). The core question: "How can automation and psychology serve humanitarian goals?"`,
      `${greeting}Wahib explores philosophy (human evolution, ethics in tech), media culture (podcasts, virality, algorithm bias), and humanitarian platforms (impact over profit, empowering systems). His central question: how can automation and psychology serve humanitarian goals?`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#interests",
      actionText: "View Interests",
      deferral: false
    };
  }

  // Mission/Philosophy
  if (intent === 'mission' || lowerQuery.match(/\b(mission|philosophy|vision|values|believe|approach)\b/i)) {
    const responses = [
      `${greeting}${wahibKnowledge.mission.core} His approach frames roles as missions: Blueprint Architect, Community Onboarder, Narrative Strategist, and Systems Thinker.`,
      `${greeting}Wahib's mission centers on building platforms that fuse automation, psychology, and humanitarian impact. He believes technology should serve human flourishing, asking: "How does this improve human agency and well-being?"`,
      `${greeting}His philosophy: technology should prioritize human flourishing over efficiency metrics. He frames work as missions — Blueprint Architect, Community Onboarder, Narrative Strategist, Systems Thinker.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about#mission",
      actionText: "Learn More",
      deferral: false
    };
  }

  // Goals/Future
  if (intent === 'goal' || lowerQuery.match(/\b(goal|future|plan|aspiration|dream|want|aim)\b/i)) {
    const responses = [
      `${greeting}Wahib aims to position himself for university admissions and collaborations by showcasing a credible, reflective portfolio. Long-term, he wants to build platforms that fuse automation, psychology, and humanitarian impact. His approach centers on learning every day, systems thinking, humanitarian impact, and authenticity.`,
      `${greeting}Short-term: positioning for university admissions through this portfolio. Long-term: building platforms that combine automation, psychology, and humanitarian impact. The approach: continuous learning, systems thinking, and authenticity.`,
      `${greeting}His goals include university positioning and long-term platform building. The focus is always on learning, systems thinking, and creating humanitarian impact through technology.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: "/about",
      actionText: "Learn More",
      deferral: false
    };
  }

  // Questions about the AI itself
  if (lowerQuery.match(/\b(you|yourself|who are you|what are you|ai|bot|assistant|limited|knowledge)\b/i)) {
    const responses = [
      `${greeting}I'm Wahib's AI counterpart — an interim representative with access to his portfolio content. I can answer questions about his academic journey, projects, research interests, and philosophy. However, I have a limited knowledge base (just what's in his portfolio), so for personal insights or decisions, I defer to Wahib himself.`,
      `${greeting}I'm an AI assistant with access to Wahib's portfolio information. I can help with questions about his work, background, and research, but my knowledge is limited to what's documented here. For personal matters or direct communication, I'll point you to the Contact page.`,
      `${greeting}I'm Wahib's AI representative, working with a limited knowledge base from his portfolio. I can discuss his projects, academic journey, and research, but acknowledge I don't know everything. For personal insights or arrangements, connecting directly with Wahib is best.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: null,
      actionText: null,
      deferral: false
    };
  }

  // Handle repetitive queries with acknowledgment
  if (isRepetitive) {
    const responses = [
      `${greeting}I notice we've covered similar ground. I have a limited knowledge base from Wahib's portfolio, so I might not have the specific answer you're looking for. Could you rephrase or ask about something specific? For example: his projects, academic background, research interests, or how to contact him.`,
      `${greeting}I want to help, but I'm working with limited information from Wahib's portfolio. If my previous answers weren't what you needed, could you try asking differently? I can help with: projects, academic achievements, research, or contact information.`,
      `${greeting}I might be missing something here. Since I only know what's in Wahib's portfolio, could you clarify what you're looking for? I can discuss his work, background, research interests, or help you contact him directly.`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      actionLink: null,
      actionText: null,
      deferral: false
    };
  }

  // Generic fallback with knowledge base acknowledgment - comprehensive list
  const genericResponses = [
    `${greeting}That's an interesting question. I have access to Wahib's portfolio content, which covers: his projects (MagicTask, FloodCoin, Fund My Life, and research-driven applications), academic journey (O-Levels, A-Levels, Academic Excellence Scholarship 2024), work experience (Research Assistant, Independent Study), research interests (Psychology, Tech Architecture, Society & Geopolitics), mission & philosophy, ventures, interests, and goals. Could you help me understand what specifically you're curious about?`,
    `${greeting}I'd love to help! My knowledge comes from Wahib's portfolio, so I can discuss: projects, academic achievements (including his 2024 scholarship), work experience, research interests, mission & philosophy, ventures, interests, leadership programs, or how to contact him. What aspect interests you most?`,
    `${greeting}That's a thoughtful question. I'm working with information from Wahib's portfolio covering: projects, academic journey (O-Levels, A-Levels, scholarship), work (Research Assistant, full-stack development), research (Psychology, Tech, Society), mission, ventures, interests, and goals. Could you be more specific about what you'd like to know?`,
    `${greeting}I can help with questions about Wahib's projects, academic journey (including scholarship details), work experience, research interests, mission & philosophy, ventures, interests, or how to contact him. What would you like to explore?`
  ];

  const randomIndex = Math.floor(Math.random() * genericResponses.length);
  
  return {
    text: genericResponses[randomIndex],
    actionLink: null,
    actionText: null,
    deferral: false
  };
};
