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
    'can', 'how', 'is', 'he', 'floodcoin', 'fund', 'my', 'life', 'magictask',
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
    'is he a good perosn': 'is he a good person',
    'is he a god person': 'is he a good person',
    'is he madd': 'is he mad',
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

// Extract intent from query
export const extractIntent = (query) => {
  const corrected = correctSpelling(query.toLowerCase());
  
  const intents = {
    contact: /\b(contact|email|reach|connect|get in touch|how to reach|how can i contact|where can i contact)\b/i,
    project: /\b(project|work|build|create|developed|portfolio|floodcoin|fund my life|magictask)\b/i,
    academic: /\b(academic|education|scholarship|achievement|grades|o-level|a-level|qualification|deserves.*scholarship|why.*scholarship)\b/i,
    research: /\b(research|interest|study|focus|what.*study|what.*research)\b/i,
    about: /\b(about|who|tell me.*wahib|describe.*wahib|what.*wahib)\b/i,
    personality: /\b(funny|humor|humorous|personality|character|what.*like|how.*like|good person|mad|angry)\b/i,
    mission: /\b(mission|philosophy|vision|values|believe|approach)\b/i,
    goal: /\b(goal|future|plan|aspiration|dream|want|aim)\b/i,
    work: /\b(work|experience|job|employment|career|what.*does|what.*work)\b/i,
    venture: /\b(venture|blueprint|idea|concept|exploration)\b/i,
    interest: /\b(interest|exploration|hobby|what.*interested|what.*like|passion)\b/i,
  };
  
  for (const [intent, pattern] of Object.entries(intents)) {
    if (pattern.test(corrected)) {
      return intent;
    }
  }
  
  return 'unknown';
};
