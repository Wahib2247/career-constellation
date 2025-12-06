// Spelling correction and fuzzy matching for queries
// Handles typos and variations in user input

// Levenshtein distance for fuzzy matching
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
};

// Find closest match using Levenshtein distance
const findClosestMatch = (word, dictionary, maxDistance = 2) => {
  let bestMatch = word;
  let minDistance = maxDistance + 1;

  for (const correctWord of dictionary) {
    const distance = levenshteinDistance(word, correctWord);
    if (distance < minDistance && distance <= maxDistance) {
      minDistance = distance;
      bestMatch = correctWord;
    }
  }

  return minDistance <= maxDistance ? bestMatch : word;
};

export const correctSpelling = (query) => {
  if (!query || typeof query !== 'string') return query;
  
  const lowerQuery = query.toLowerCase().trim();
  
  // Dictionary of correct words
  const dictionary = [
    'contact', 'project', 'projects', 'academic', 'achievement', 'achievements',
    'scholarship', 'education', 'research', 'about', 'good', 'person', 'mad',
    'can', 'how', 'is', 'he', 'FlowFund', 'fund', 'my', 'life', 'magictask',
    'work', 'experience', 'mission', 'philosophy', 'goal', 'future', 'venture',
    'interest', 'interests', 'wahib', 'tell', 'me', 'what', 'where', 'when',
    'who', 'why', 'which', 'email', 'reach', 'connect', 'get', 'in', 'touch'
  ];
  
  // Common misspellings map (exact replacements)
  const exactCorrections = {
    // Contact variations
    'contactn': 'contact',
    'contac': 'contact',
    'contat': 'contact',
    'contatc': 'contact',
    'conatct': 'contact',
    'contcat': 'contact',
    'contacn': 'contact',
    
    // Project variations
    'projec': 'project',
    'projet': 'project',
    'projct': 'project',
    'projecs': 'projects',
    'projets': 'projects',
    
    // Academic variations
    'academc': 'academic',
    'acadmic': 'academic',
    'academi': 'academic',
    'acadmeic': 'academic',
    
    // Achievement variations
    'achievment': 'achievement',
    'achievemnt': 'achievement',
    'achievments': 'achievements',
    'achievemnts': 'achievements',
    
    // Research variations
    'reserch': 'research',
    'resarch': 'research',
    'reaserch': 'research',
    'reaseach': 'research',
    
    // About variations
    'abot': 'about',
    'abou': 'about',
    
    // Good variations
    'god': 'good',
    'gud': 'good',
    'goood': 'good',
    
    // Person variations
    'persn': 'person',
    'perosn': 'person',
    'peson': 'person',
    'perosn': 'person',
    
    // Can variations
    'cna': 'can',
    'cn': 'can',
    
    // How variations
    'howw': 'how',
    'ho': 'how',
    'howw': 'how',
    
    // Is variations
    'si': 'is',
    'iss': 'is',
    
    // He variations
    'eh': 'he',
    'hee': 'he',
  };

  let corrected = lowerQuery;
  
  // First, apply exact corrections (whole word replacements)
  Object.keys(exactCorrections).forEach(misspelling => {
    // Use word boundaries to match whole words only
    const regex = new RegExp(`\\b${misspelling}\\b`, 'gi');
    corrected = corrected.replace(regex, exactCorrections[misspelling]);
  });
  
  // Then, use fuzzy matching for remaining words
  const words = corrected.split(/\s+/);
  const correctedWords = words.map(word => {
    // Skip if word is already in dictionary or is very short
    if (dictionary.includes(word) || word.length <= 2) {
      return word;
    }
    
    // Remove punctuation for matching
    const cleanWord = word.replace(/[^\w]/g, '');
    if (cleanWord.length <= 2) return word;
    
    // Try fuzzy match
    const matched = findClosestMatch(cleanWord, dictionary, 2);
    if (matched !== cleanWord) {
      // Preserve original punctuation
      return word.replace(cleanWord, matched);
    }
    
    return word;
  });
  
  corrected = correctedWords.join(' ');
  
  // Handle common phrase misspellings
  const phraseCorrections = {
    'how cna i': 'how can i',
    'how cn i': 'how can i',
    'howw can i': 'how can i',
    'how can i contactn': 'how can i contact',
    'how can i contac': 'how can i contact',
    'how can i contat': 'how can i contact',
    'academc achievements': 'academic achievements',
    'acadmic achievements': 'academic achievements',
  };
  
  Object.keys(phraseCorrections).forEach(phrase => {
    if (corrected.includes(phrase)) {
      corrected = corrected.replace(phrase, phraseCorrections[phrase]);
    }
  });

  return corrected;
};

// Fuzzy matching for project names
export const fuzzyMatchProject = (query, projectNames) => {
  const lowerQuery = query.toLowerCase();
  const correctedQuery = correctSpelling(lowerQuery);
  
  // Direct matches
  for (const projectName of projectNames) {
    const lowerProject = projectName.toLowerCase();
    if (correctedQuery.includes(lowerProject) || lowerProject.includes(correctedQuery)) {
      return projectName;
    }
  }
  
  // Partial matches (check if query contains significant parts of project name)
  for (const projectName of projectNames) {
    const words = projectName.toLowerCase().split(/\s+/);
    const queryWords = correctedQuery.split(/\s+/);
    
    // Check if at least 2 words match
    const matchingWords = words.filter(word => 
      queryWords.some(qWord => qWord.includes(word) || word.includes(qWord))
    );
    
    if (matchingWords.length >= Math.min(2, words.length)) {
      return projectName;
    }
  }
  
  return null;
};

// Extract intent from query with comprehensive keyword matching
export const extractIntent = (query) => {
  const corrected = correctSpelling(query.toLowerCase());
  
  // Import keyword map (will be available after wahibKnowledge is loaded)
  // For now, use comprehensive patterns
  const intents = {
    // Decision/commitment queries - check FIRST (highest priority)
    decision: /\b(arrange|arranges|arranged|arranging|schedule|schedules|scheduled|scheduling|meeting|meetings|meet|meets|call|calls|calling|interview|interviews|appointment|appointments|available|availability|free|time|when|where|commit|commits|committed|commitment|promise|promises|promised|guarantee|guarantees|can you|will you|do you want|would you|join|joins|joined|collaborate|collaborates|hire|hires|employ|employs|partnership|team up|location|in person|where are you|where can i|book|books|booking|set up|setup|plan|plans|planned)\b/i,
    
    // Contact queries
    contact: /\b(contact|contacts|email|emails|reach|reaches|connect|connects|get in touch|how to reach|how can i contact|where can i contact|how to connect|communication|message|messages|send|sends|write|writes|talk|talks|call|calls|phone|telephone)\b/i,
    
    // Academic queries
    academic: /\b(academic|education|scholarship|o-level|a-level|olevel|alevel|grades|qualification|achievement|achievements|certificate|school|student|studies|studying|learn|learning|university|college|degree|diploma|exam|exams|test|tests|result|results|merit|excellence|outstanding|performance|deserves.*scholarship|why.*scholarship|scholarship.*deserve|deserving)\b/i,
    
    // Project queries
    project: /\b(project|projects|work|works|build|built|building|create|created|creating|develop|developed|developing|development|portfolio|application|applications|app|apps|software|program|programs|code|coding|programming|FlowFund|fund my life|fundmylife|magictask|magic task|research paper|summarization|behavioral economics|dashboard|academic discussion|platform|humanitarian impact|tracker|systems thinking|visualization|ux psychology|research platform)\b/i,
    
    // Work/Experience queries
    work: /\b(work|works|working|job|jobs|employment|employ|career|experience|experiences|position|positions|role|roles|research assistant|independent study|full-stack|fullstack|developer|development|web development|react|node|javascript|typescript|mongodb|express|tech|technology|technical|programming|coding|software engineering|engineering)\b/i,
    
    // Research queries
    research: /\b(research|researches|researching|study|studies|studying|interest|interests|interested|focus|focuses|focused|psychology|psychological|behavioral|behavior|behaviour|economics|economic|philosophy|philosophical|humanitarian|human|humanity|tech|technology|systems|system|architecture|geopolitics|geopolitical|society|social|fogg|kahneman|ariely|thaler|microservices|recommender|bot orchestration|trend seeding|cunningham|fintech)\b/i,
    
    // Mission/Philosophy queries
    mission: /\b(mission|missions|philosophy|philosophies|philosophical|vision|visions|values|value|believe|believes|belief|beliefs|approach|approaches|principle|principles|core|purpose|purposes|blueprint architect|community onboarder|narrative strategist|systems thinker|human flourishing|human agency|well-being)\b/i,
    
    // About queries
    about: /\b(about|who|tell me|describe|explain|information|info|background|biography|bio|story|stories|introduction|introduce|overview|summary|summarize|details|detail|what.*wahib|who.*wahib)\b/i,
    
    // Personality queries
    personality: /\b(personality|personalities|character|characters|trait|traits|good person|nice|kind|friendly|funny|humor|humorous|mad|angry|upset|calm|patient|impatient|what like|how like|what kind|what type|person|people)\b/i,
    
    // Goal queries
    goal: /\b(goal|goals|future|futures|plan|plans|planned|planning|aspiration|aspirations|dream|dreams|dreamed|dreaming|want|wants|wanted|wanting|aim|aims|aimed|aiming|ambition|ambitions|ambitious|hope|hopes|hoped|hoping|wish|wishes|wished|wishing|intend|intends|intended|intending|intention|intentions)\b/i,
    
    // Venture queries
    venture: /\b(venture|ventures|blueprint|blueprints|idea|ideas|concept|concepts|exploration|explorations|explore|explores|explored|exploring|startup|startups|business|businesses|company|companies|initiative|initiatives)\b/i,
    
    // Interest queries
    interest: /\b(interest|interests|interested|interesting|hobby|hobbies|passion|passions|passionate|like|likes|liked|liking|enjoy|enjoys|enjoyed|enjoying|favorite|favourites|favourite|prefer|prefers|preferred|preferring|preference|preferences|curious|curiosity)\b/i,
  };
  
  // Check decision/commitment first (highest priority)
  if (intents.decision.test(corrected)) {
    return 'decision';
  }
  
  // Check other intents
  for (const [intent, pattern] of Object.entries(intents)) {
    if (intent !== 'decision' && pattern.test(corrected)) {
      return intent;
    }
  }
  
  return 'unknown';
};
