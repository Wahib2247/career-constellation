// ML-Powered Response Generator
// Uses machine learning principles for dynamic, adaptive responses
// Can integrate with OpenAI/Anthropic APIs or use local learning mechanisms

import { wahibKnowledge } from './wahibKnowledge';
import { correctSpelling, fuzzyMatchProject, extractIntent } from './spellingHelper';
import { projects } from '../constants';

// Learning mechanism - stores patterns and improves over time
class LearningEngine {
  constructor() {
    this.patterns = this.loadPatterns();
    this.responseQuality = this.loadQualityMetrics();
    this.userFeedback = this.loadFeedback();
  }

  loadPatterns() {
    try {
      const stored = localStorage.getItem('wahib_ml_patterns');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  loadQualityMetrics() {
    try {
      const stored = localStorage.getItem('wahib_ml_quality');
      return stored ? JSON.parse(stored) : { total: 0, positive: 0 };
    } catch {
      return { total: 0, positive: 0 };
    }
  }

  loadFeedback() {
    try {
      const stored = localStorage.getItem('wahib_ml_feedback');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  savePatterns() {
    try {
      localStorage.setItem('wahib_ml_patterns', JSON.stringify(this.patterns));
    } catch (e) {
      console.error('Failed to save patterns:', e);
    }
  }

  saveQualityMetrics() {
    try {
      localStorage.setItem('wahib_ml_quality', JSON.stringify(this.responseQuality));
    } catch (e) {
      console.error('Failed to save quality metrics:', e);
    }
  }

  saveFeedback() {
    try {
      localStorage.setItem('wahib_ml_feedback', JSON.stringify(this.userFeedback));
    } catch (e) {
      console.error('Failed to save feedback:', e);
    }
  }

  // Learn from successful patterns (supervised learning)
  learnPattern(intent, query, response, success = true) {
    if (!this.patterns[intent]) {
      this.patterns[intent] = {
        queries: [],
        responses: [],
        successRate: 0,
        count: 0
      };
    }

    this.patterns[intent].queries.push(query.toLowerCase());
    this.patterns[intent].responses.push(response);
    this.patterns[intent].count++;

    if (success) {
      this.patterns[intent].successRate =
        (this.patterns[intent].successRate * (this.patterns[intent].count - 1) + 1) /
        this.patterns[intent].count;
    } else {
      this.patterns[intent].successRate =
        (this.patterns[intent].successRate * (this.patterns[intent].count - 1)) /
        this.patterns[intent].count;
    }

    this.savePatterns();
  }

  // Find similar patterns (unsupervised learning - clustering)
  findSimilarPatterns(query, intent) {
    if (!this.patterns[intent]) return null;

    const queryWords = query.toLowerCase().split(/\s+/);
    let bestMatch = null;
    let bestScore = 0;

    this.patterns[intent].queries.forEach((storedQuery, index) => {
      const storedWords = storedQuery.split(/\s+/);
      const commonWords = queryWords.filter(w => storedWords.includes(w));
      const score = commonWords.length / Math.max(queryWords.length, storedWords.length);

      if (score > bestScore && score > 0.3) {
        bestScore = score;
        bestMatch = {
          query: storedQuery,
          response: this.patterns[intent].responses[index],
          score: score
        };
      }
    });

    return bestMatch;
  }

  // Record feedback for backpropagation-like improvement
  recordFeedback(intent, query, response, feedback) {
    this.userFeedback.push({
      intent,
      query,
      response,
      feedback, // 'positive', 'negative', or score 1-5
      timestamp: Date.now()
    });

    // Update quality metrics
    this.responseQuality.total++;
    if (feedback === 'positive' || (typeof feedback === 'number' && feedback >= 4)) {
      this.responseQuality.positive++;
    }

    // Keep only last 100 feedback entries
    if (this.userFeedback.length > 100) {
      this.userFeedback = this.userFeedback.slice(-100);
    }

    this.saveFeedback();
    this.saveQualityMetrics();
  }

  // Get quality score (for adaptive learning)
  getQualityScore() {
    if (this.responseQuality.total === 0) return 0.5;
    return this.responseQuality.positive / this.responseQuality.total;
  }
}

// Initialize learning engine
const learningEngine = new LearningEngine();

// API Integration for ML-powered responses
const generateMLResponse = async (query, context, knowledgeBase) => {
  // Check if API key is configured
  const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY;

  if (!apiKey) {
    // Fallback to rule-based with learning
    return null;
  }

  try {
    const systemPrompt = `You are Wahib's AI counterpart, an interim representative helping visitors explore his portfolio. 

KNOWLEDGE BASE:
${JSON.stringify(knowledgeBase, null, 2)}

CRITICAL RULES:
1. For questions about arranging calls, meetings, scheduling, availability, personal commitments, hiring, collaboration, partnerships, or any decision-making queries → ALWAYS respond: "Noted — Wahib will deliver his response directly. You can also reach him via the Contact page."

2. For "what is he doing" or "what does he do" → Explain his current work: Research Assistant (2023-Present), Independent Study & Projects, A-Levels studies, and various projects.

3. Answer questions using ONLY the knowledge base provided
4. If information isn't in the knowledge base, acknowledge this limitation and suggest related topics you CAN discuss
5. Maintain Wahib's tone: humble, reflective, student-oriented, growth-focused
6. Frame responses as explorations, not final authority
7. Be concise but thoughtful
8. Use the user's name if provided in context
9. For generic queries (like "jd", "dksa", "ssda", "vafv", "lol", "qwe", etc.), provide helpful context about what you CAN discuss rather than just asking for clarification

CONTEXT: ${JSON.stringify(context)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Free tier friendly - cost-efficient model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('ML API error:', error);
    return null; // Fallback to rule-based
  }
};

// Enhanced response generator with ML capabilities
export const generateMLIntelligentResponse = async (
  query,
  userName = '',
  conversationHistory = [],
  useML = true
) => {
  // Correct spelling first
  const correctedQuery = correctSpelling(query);
  const lowerQuery = correctedQuery.toLowerCase();
  const intent = extractIntent(correctedQuery);

  // Try ML-powered response first (if enabled and API available)
  if (useML) {
    const mlResponse = await generateMLResponse(
      correctedQuery,
      {
        userName,
        conversationHistory: conversationHistory.slice(-5),
        intent
      },
      wahibKnowledge
    );

    if (mlResponse) {
      // Learn from ML response
      learningEngine.learnPattern(intent, correctedQuery, mlResponse, true);
      return {
        text: mlResponse,
        actionLink: null,
        actionText: null,
        deferral: false,
        mlGenerated: true
      };
    }
  }

  // Fallback to learning-enhanced rule-based system
  // Check for similar patterns (unsupervised learning)
  const similarPattern = learningEngine.findSimilarPatterns(correctedQuery, intent);

  if (similarPattern && similarPattern.score > 0.5) {
    // Use learned pattern with adaptation
    const adaptedResponse = adaptResponse(similarPattern.response, userName, query);
    learningEngine.learnPattern(intent, correctedQuery, adaptedResponse, true);
    return {
      text: adaptedResponse,
      actionLink: null,
      actionText: null,
      deferral: false,
      mlGenerated: false,
      learned: true
    };
  }

  // Generate new response using rule-based system
  const response = generateRuleBasedResponse(correctedQuery, lowerQuery, intent, userName, conversationHistory);

  // Learn from this response
  learningEngine.learnPattern(intent, correctedQuery, response.text, true);

  return response;
};

// Adapt learned response to current context
const adaptResponse = (learnedResponse, userName, currentQuery) => {
  let adapted = learnedResponse;

  // Personalize with name if available
  if (userName && !adapted.includes(userName.split(' ')[0])) {
    const greetings = [
      `Hi ${userName.split(' ')[0]}! `,
      `Hello ${userName.split(' ')[0]}, `,
      `Thanks for the inquiry, ${userName.split(' ')[0]}. `,
    ];
    adapted = `${greetings[Math.floor(Math.random() * greetings.length)]}${adapted}`;
  }

  // Add context-aware variations (removed repetitive phrases)
  const variations = [
    adapted,
    adapted + ' This insight stems from Wahib\'s core research methodology.',
    adapted + ' Feel free to ask more about this specific thread.'
  ];

  return variations[Math.floor(Math.random() * variations.length)];
};

// Rule-based response generator (fallback)
const generateRuleBasedResponse = (correctedQuery, lowerQuery, intent, userName, conversationHistory) => {
  const greeting = userName ? `Hi ${userName.split(' ')[0]}! ` : '';

  // Decision/Commitment deferral - comprehensive pattern matching
  // Check intent first (most reliable)
  if (intent === 'decision') {
    const decisionResponses = [
      `${greeting}Noted — Wahib will deliver his response directly. You can also reach him via the Contact page.`,
      `${greeting}I understand you'd like to connect with Wahib. While I can't arrange meetings directly, Wahib will get back to you personally about this. You can also reach him through the Contact page — he's always open to meaningful conversations and collaborations.`,
      `${greeting}For personal arrangements like meetings or collaborations, Wahib prefers to respond directly. You can reach him through the Contact page, and he'll get back to you soon!`,
      `${greeting}I appreciate your interest! For scheduling, meetings, or commitments, Wahib handles these personally. Please reach out through the Contact page, and he'll respond directly.`
    ];
    return {
      text: decisionResponses[Math.floor(Math.random() * decisionResponses.length)],
      actionLink: "/contact",
      actionText: "Go to Contact",
      deferral: true
    };
  }

  // Also check for decision patterns as fallback
  const decisionPatterns = [
    /\b(arrange|arranges|arranged|arranging|schedule|schedules|scheduled|scheduling)\b/i,
    /\b(meeting|meetings|meet|meets|call|calls|calling|interview|interviews|appointment|appointments)\b/i,
    /\b(available|availability|free|time|when|where)\b/i,
    /\b(commit|commits|committed|commitment|promise|promises|promised|guarantee|guarantees)\b/i,
    /\b(can you|will you|do you want|would you)\b/i,
    /\b(join|joins|joined|collaborate|collaborates|hire|hires|employ|employs|partnership|team up)\b/i,
    /\b(location|locations|in person|where are you|where can i|book|books|booking|set up|setup)\b/i
  ];

  if (decisionPatterns.some(pattern => pattern.test(correctedQuery))) {
    const decisionResponses = [
      `${greeting}Noted — Wahib will deliver his response directly. You can also reach him via the Contact page.`,
      `${greeting}I understand you'd like to connect with Wahib. While I can't arrange meetings directly, Wahib will get back to you personally about this. You can also reach him through the Contact page — he's always open to meaningful conversations and collaborations.`,
      `${greeting}For personal arrangements like meetings or collaborations, Wahib prefers to respond directly. You can reach him through the Contact page, and he'll get back to you soon!`
    ];
    return {
      text: decisionResponses[Math.floor(Math.random() * decisionResponses.length)],
      actionLink: "/contact",
      actionText: "Go to Contact",
      deferral: true
    };
  }

  // Contact queries
  if (intent === 'contact' || lowerQuery.match(/\b(contact|email|reach|connect)\b/i)) {
    return {
      text: `${greeting}You can reach Wahib through the Contact page or email at ${wahibKnowledge.contact.email}. He's always open to academic discussions and collaborations!`,
      actionLink: "/contact",
      actionText: "Go to Contact",
      deferral: false
    };
  }

  // Academic/Scholarship - check for exact quick reply match first
  if (lowerQuery === 'academic achievements' ||
    intent === 'academic' ||
    lowerQuery.match(/\b(academic|education|scholarship|achievement)\b/i)) {
    const academic = wahibKnowledge.academic;
    return {
      text: `${greeting}Wahib's academic journey includes completing O-Levels in 2024 with high grades and a High Achievement Certificate. He was awarded an Academic Excellence Scholarship in 2024 for outstanding performance and innovative project work. Throughout A-Levels, he's maintained high standards in Maths, Physics, and Computer Science while mentoring peers.`,
      actionLink: "/about#academic",
      actionText: "View Academic Journey",
      deferral: false
    };
  }

  // Projects
  if (intent === 'project' || lowerQuery.match(/\b(project|work|build|create)\b/i)) {
    const matchedProject = fuzzyMatchProject(correctedQuery, [
      ...projects.map(p => p.name),
      'FlowFund',
      'Fund My Life',
      'MagicTask'
    ]);

    if (matchedProject) {
      const project = projects.find(p => p.name.toLowerCase() === matchedProject.toLowerCase());
      if (project) {
        return {
          text: `${greeting}${project.name} is ${project.description}`,
          actionLink: project.link !== '#' ? project.link : "/projects",
          actionText: "View Project",
          deferral: false
        };
      }
    }

    return {
      text: `${greeting}Wahib has several research-driven projects exploring technology, behavioral science, and social impact.`,
      actionLink: "/projects",
      actionText: "View Projects",
      deferral: false
    };
  }

  // Research interests - check for exact quick reply match first
  if (lowerQuery === 'research interests' ||
    intent === 'research' ||
    lowerQuery.match(/\b(research|interest|study|focus|what.*study|what.*research)\b/i)) {
    const research = wahibKnowledge.research;
    return {
      text: `${greeting}Wahib's research spans several interconnected areas: Psychology & Philosophy (human readability, Fogg Behavior Model B=MAT, behavioral economics from Kahneman/Ariely/Thaler, philosophical inquiry into ethics and human evolution), Tech & Systems Architecture (microservices logic, recommender systems, bot orchestration, system design thinking), and Society & Geopolitics (trend seeding, Cunningham's Law, fintech for humanitarian aid, geopolitical analysis). He's particularly interested in how technology can serve humanitarian goals rather than just profit.`,
      actionLink: "/about#ideas",
      actionText: "Explore Research",
      deferral: false
    };
  }

  // Enhanced generic fallback with context-aware suggestions
  const genericResponses = [
    `${greeting}That's an interesting question. I have access to Wahib's portfolio content covering: his projects (Research Paper Summarization Tool, Behavioral Economics Dashboard, Academic Discussion Platform, Humanitarian Impact Tracker, Systems Thinking Visualization Tool, UX Psychology Research Platform, MagicTask, FlowFund, Fund My Life), academic journey (O-Levels completed 2024, Academic Excellence Scholarship 2024, A-Levels in Maths/Physics/Computer Science), work experience (Research Assistant 2023-Present, Independent Study & Projects 2022-Present), research interests (Psychology & Philosophy, Tech & Systems Architecture, Society & Geopolitics, Humanitarian Platforms), mission & philosophy, ventures, interests, and goals. Could you help me understand what specifically you're curious about?`,
    `${greeting}I'd love to help! My knowledge comes from Wahib's portfolio, so I can discuss: projects (including MagicTask, FlowFund, Fund My Life, and research-driven applications), academic achievements (O-Levels, A-Levels, 2024 scholarship), work experience (Research Assistant, Independent Study & Projects), research interests (Psychology, Tech Architecture, Society & Geopolitics), mission & philosophy, ventures, interests, leadership programs (CGDL 2025), or how to contact him. What aspect interests you most?`,
    `${greeting}That's a thoughtful question. I'm working with information from Wahib's portfolio covering: projects (research-driven applications and blueprint ideas), academic journey (O-Levels 2024, A-Levels, Academic Excellence Scholarship 2024), work (Research Assistant, full-stack development), research (Psychology, Tech, Society, Humanitarian focus), mission, ventures, interests, and goals. Could you be more specific about what you'd like to know?`,
    `${greeting}I can help with questions about Wahib's projects, academic journey (including scholarship details), work experience, research interests, mission & philosophy, ventures, interests, leadership programs, or how to contact him. What would you like to explore?`
  ];

  const randomIndex = Math.floor(Math.random() * genericResponses.length);

  return {
    text: genericResponses[randomIndex],
    actionLink: null,
    actionText: null,
    deferral: false
  };
};

// Export learning engine for feedback collection
export { learningEngine };

// Function to record user feedback (for backpropagation-like improvement)
export const recordUserFeedback = (intent, query, response, feedback) => {
  learningEngine.recordFeedback(intent, query, response, feedback);
};

// Get learning statistics
export const getLearningStats = () => {
  return {
    qualityScore: learningEngine.getQualityScore(),
    patternsLearned: Object.keys(learningEngine.patterns).length,
    totalFeedback: learningEngine.responseQuality.total,
    positiveFeedback: learningEngine.responseQuality.positive
  };
};
