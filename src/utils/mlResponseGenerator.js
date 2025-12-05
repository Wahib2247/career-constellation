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

INSTRUCTIONS:
- Answer questions using ONLY the knowledge base provided
- If information isn't in the knowledge base, acknowledge this limitation
- Maintain Wahib's tone: humble, reflective, student-oriented, growth-focused
- Frame responses as explorations, not final authority
- For personal decisions/meetings, defer to Wahib via Contact page
- Be concise but thoughtful
- Use the user's name if provided in context

CONTEXT: ${JSON.stringify(context)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or 'gpt-3.5-turbo' for cost efficiency
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
    adapted = `Hi ${userName.split(' ')[0]}! ${adapted}`;
  }
  
  // Add context-aware variations
  const variations = [
    adapted,
    adapted.replace(/\./g, ', and this reflects his approach.'),
    adapted + ' This is part of his ongoing exploration.'
  ];
  
  return variations[Math.floor(Math.random() * variations.length)];
};

// Rule-based response generator (fallback)
const generateRuleBasedResponse = (correctedQuery, lowerQuery, intent, userName, conversationHistory) => {
  const greeting = userName ? `Hi ${userName.split(' ')[0]}! ` : '';
  
  // Decision deferral
  const decisionPatterns = [
    /\b(join|collaborate|work with|hire|employ|partnership|team up)\b/i,
    /\b(available|free|time|schedule|meeting|call|interview|when|where)\b/i,
    /\b(commit|promise|guarantee|can you|will you|do you want)\b/i,
    /\b(meet|meeting|in person|location|where are you|where can i)\b/i
  ];

  if (decisionPatterns.some(pattern => pattern.test(correctedQuery))) {
    return {
      text: `${greeting}Noted — Wahib will deliver his response directly. You can also reach him via the Contact page.`,
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

  // Academic/Scholarship
  if (intent === 'academic' || lowerQuery.match(/\b(academic|education|scholarship|achievement)\b/i)) {
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
      'FloodCoin',
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
      text: `${greeting}Wahib has several research-driven projects exploring technology, behavioral science, and social impact. These include projects like Research Paper Summarization Tool, Behavioral Economics Dashboard, and blueprint-stage ideas like FloodCoin and Fund My Life.`,
      actionLink: "/projects",
      actionText: "View Projects",
      deferral: false
    };
  }

  // Generic fallback
  return {
    text: `${greeting}That's an interesting question. I have access to Wahib's portfolio content covering his projects, academic journey, research interests, and philosophy. Could you be more specific about what you'd like to know?`,
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
