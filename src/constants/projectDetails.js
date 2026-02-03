// Project-specific detailed content for academic showcase pages

export const projectDetails = {
  classfusion: {
    name: "ClassFusion",
    status: "Prototype in Progress",
    statusColor: "yellow",
    problemStatement: `Traditional education systems struggle with one-size-fits-all approaches that fail to account for individual learning styles, cognitive profiles, and motivational drivers. Students often disengage when teaching methods don't align with their cognitive preferences, while teachers lack tools to understand and adapt to diverse learning needs. The current system treats learning as a linear, standardized process rather than a dynamic matching problem between students and educators. This misalignment leads to reduced engagement, lower retention, and missed opportunities for personalized growth.`,
    
    overview: `ClassFusion explores how compatibility-based matching between students and teachers can transform educational outcomes. The project asks: Can we model learning relationships as a compatibility game, where cognitive profiles, teaching styles, and motivational triggers align to create more effective educational experiences? Rather than claiming to solve all educational challenges, ClassFusion focuses specifically on the matching problem—how to connect learners with educators in ways that maximize engagement and learning transfer.`,
    
    proposedSystem: {
      actors: [
        "Students (with cognitive profiles, learning preferences, and motivational drivers)",
        "Teachers/Educators (with teaching styles, expertise domains, and communication approaches)",
        "Platform (matching algorithm, incentive distribution, progress tracking)"
      ],
      incentiveLogic: [
        "Gamified participation rewards that value curiosity, collaboration, and consistent engagement",
        "Compatibility scores that unlock better matches and learning opportunities",
        "Teacher incentives tied to student engagement metrics and learning outcomes",
        "Tokenized achievements that can be used within the ecosystem (not external currency)"
      ],
      feedbackLoops: [
        "Student-teacher compatibility ratings inform future matching",
        "Learning outcome data refines cognitive profile models",
        "Engagement patterns adjust incentive structures dynamically",
        "Community feedback shapes platform governance"
      ],
      governance: [
        "Transparent matching algorithm with explainable compatibility scores",
        "Student privacy protection for cognitive profile data",
        "Ethical guidelines preventing manipulation of engagement metrics",
        "Community-driven feature development and policy updates"
      ]
    },
    
    artifacts: [
      {
        title: "System Design Document v0.1",
        description: "Initial architecture outlining matching algorithms, cognitive profiling framework, and incentive structures. Includes preliminary research on learning science and motivation theory.",
        stage: "Draft",
        type: "Documentation",
        link: null,
        linkText: null
      },
      {
        title: "Figma Prototype",
        description: "Interactive UI/UX mockups exploring student-teacher matching interface, profile visualization, and gamified reward systems. Focuses on making compatibility scores transparent and actionable.",
        stage: "Early Design",
        type: "Design",
        link: null,
        linkText: null
      },
      {
        title: "Compatibility Model Simulation",
        description: "Experimental Python model simulating student-teacher matching based on cognitive profiles. Tests different matching algorithms and measures hypothetical engagement outcomes. Results are theoretical and not validated with real users.",
        stage: "Experimental",
        type: "Simulation",
        link: null,
        linkText: null
      }
    ],
    
    researchMethodology: `ClassFusion applies design-based research methodology, combining learning science theory (Vygotsky's zone of proximal development, cognitive load theory) with behavioral economics (incentive design, motivation frameworks). The project explores ethical tradeoffs between personalization and privacy, between gamification and intrinsic motivation, and between algorithmic matching and human agency. Research draws from educational psychology, human-computer interaction, and systems thinking to inform design decisions.`,
    
    reflection: {
      assumptions: [
        "That compatibility can be accurately modeled through cognitive profiles",
        "That gamified incentives enhance rather than undermine intrinsic motivation",
        "That students and teachers will engage authentically with the matching system"
      ],
      tradeoffs: [
        "Personalization vs. Privacy: Deeper profiling enables better matches but requires more sensitive data",
        "Gamification vs. Authenticity: Rewards may increase engagement but risk creating extrinsic motivation dependencies",
        "Algorithmic Matching vs. Human Choice: Automated matching is efficient but may reduce student agency in selecting teachers"
      ],
      unresolved: [
        "How to validate compatibility models without extensive user testing",
        "Whether tokenized rewards create sustainable long-term engagement",
        "How to prevent the system from reinforcing existing educational inequalities"
      ]
    },
    
    roadmap: [
      "Phase 1: Refine cognitive profiling framework based on learning science literature",
      "Phase 2: Develop and test matching algorithm with synthetic data",
      "Phase 3: Create interactive prototype for user testing with small group of educators",
      "Phase 4: Document ethical considerations and governance proposals",
      "Phase 5: Open-source core matching logic for academic review"
    ],
    
    collaboration: `ClassFusion is an open exploration of educational systems design. I welcome critique, collaboration, and academic discussion from researchers in learning science, behavioral economics, and educational technology. If you're interested in discussing the matching problem, incentive design, or ethical considerations in personalized education, please reach out.`
  },

  flowfund: {
    name: "FlowFund",
    status: "Early-Stage Concept",
    statusColor: "red",
    problemStatement: `Traditional charity models create intermittent, one-time donations that fail to address systemic poverty. Donors lack visibility into impact, NGOs struggle with funding consistency, and beneficiaries experience unpredictable support. The current system treats poverty reduction as a series of disconnected transactions rather than a continuous flow of resources. This fragmentation limits scalability, reduces donor trust, and prevents sustainable impact at scale.`,
    
    overview: `FlowFund explores how continuous money flow—rather than one-time donations—can create sustainable poverty reduction mechanisms. The project asks: Can we design a financial ecosystem where money moves continuously from donors to causes, with transparent tracking and incentive structures that maintain engagement? FlowFund does not claim to solve poverty, but rather investigates whether platform dynamics (similar to how Shopify hosts stores) can be applied to humanitarian causes, creating a self-sustaining ecosystem of giving.`,
    
    proposedSystem: {
      actors: [
        "Donors (individuals and organizations seeking to create impact)",
        "Cause Hosts (NGOs, individuals, communities promoting specific causes)",
        "Beneficiaries (recipients of funding, with verified need and impact tracking)",
        "Platform (facilitates flow, tracks impact, distributes incentives)"
      ],
      incentiveLogic: [
        "Donor rewards tied to impact visibility and cause performance",
        "Cause hosts earn platform tokens for successful fundraising and verified outcomes",
        "Continuous flow mechanisms (recurring donations, impact-based matching)",
        "Transparent tokenomics that align platform growth with humanitarian impact"
      ],
      feedbackLoops: [
        "Impact data informs donor decisions and cause rankings",
        "Successful causes receive algorithmic promotion and matching funds",
        "Donor engagement patterns shape platform incentive structures",
        "Beneficiary outcomes feed back into cause credibility scores"
      ],
      governance: [
        "Transparent impact verification protocols",
        "Ethical guidelines preventing exploitation of beneficiaries",
        "Community governance for platform policy decisions",
        "Anti-fraud mechanisms and need verification systems"
      ]
    },
    
    artifacts: [
      {
        title: "System Architecture Blueprint",
        description: "Conceptual design document outlining platform structure, money flow mechanisms, and incentive systems. Includes preliminary research on existing donation platforms and their limitations.",
        stage: "Conceptual",
        type: "Documentation",
        link: null,
        linkText: null
      },
      {
        title: "Tokenomics Model v0.1",
        description: "Early-stage economic model exploring how platform tokens could incentivize continuous giving while maintaining humanitarian focus. Includes risk analysis of tokenization in charity contexts.",
        stage: "Theoretical",
        type: "Model",
        link: null,
        linkText: null
      },
      {
        title: "Impact Tracking Framework",
        description: "Proposed system for verifying and tracking beneficiary outcomes. Explores how to measure impact without creating perverse incentives or burdening beneficiaries with excessive reporting.",
        stage: "Design Phase",
        type: "Framework",
        link: null,
        linkText: null
      }
    ],
    
    researchMethodology: `FlowFund applies systems thinking and behavioral economics to analyze money flow in humanitarian contexts. Research draws from platform economics (how marketplaces create value), incentive design (what motivates sustained giving), and impact measurement (how to verify outcomes without exploitation). The project explicitly explores ethical risks: tokenization in charity, potential for gamification to trivialize suffering, and platform dynamics that might prioritize growth over impact.`,
    
    reflection: {
      assumptions: [
        "That continuous flow mechanisms will outperform one-time donations",
        "That platform dynamics can be ethically applied to humanitarian causes",
        "That transparent impact tracking will increase donor trust and engagement"
      ],
      tradeoffs: [
        "Platform Growth vs. Impact Focus: Scaling requires incentives that might prioritize engagement over genuine need",
        "Tokenization vs. Dignity: Economic incentives may commodify suffering or create perverse motivations",
        "Transparency vs. Privacy: Impact tracking requires beneficiary data that must be protected"
      ],
      unresolved: [
        "How to prevent platform dynamics from creating winner-take-all effects among causes",
        "Whether tokenized incentives align with humanitarian ethics",
        "How to verify impact without creating reporting burdens for beneficiaries"
      ]
    },
    
    roadmap: [
      "Phase 1: Complete ethical risk assessment and governance framework",
      "Phase 2: Develop detailed tokenomics model with academic review",
      "Phase 3: Create prototype impact tracking system",
      "Phase 4: Design platform architecture with focus on beneficiary dignity",
      "Phase 5: Document learnings and open questions for academic discussion"
    ],
    
    collaboration: `FlowFund is a conceptual exploration of financial systems for poverty reduction. I'm particularly interested in discussing ethical considerations, platform economics in humanitarian contexts, and impact measurement frameworks. If you're a researcher, NGO practitioner, or systems thinker with insights on these topics, I'd welcome your perspective.`
  },

  fundmylife: {
    name: "FundMyLife",
    status: "Research Exploration",
    statusColor: "green",
    problemStatement: `Personal and humanitarian funding faces barriers: traditional platforms are bureaucratic, inaccessible to many, and lack transparency. Meme culture and community-driven movements have shown powerful mobilization potential, but existing financial systems fail to capture this energy for genuine impact. The gap between viral fundraising potential and sustainable, transparent funding mechanisms represents a significant opportunity—and risk.`,
    
    overview: `FundMyLife explores whether meme-coin dynamics can be ethically applied to personal and humanitarian funding. The project asks: Can community-driven tokenomics create sustainable funding mechanisms while maintaining transparency and avoiding speculative harm? This is explicitly framed as a social-finance experiment, not a speculative crypto project. FundMyLife investigates how viral mechanics, community ownership, and transparent tokenomics might democratize access to funding while explicitly addressing the ethical risks of meme dynamics.`,
    
    proposedSystem: {
      actors: [
        "Fundraisers (individuals or causes seeking funding)",
        "Community Members (token holders who support causes and participate in governance)",
        "Platform (facilitates token distribution, tracks fund allocation, ensures transparency)"
      ],
      incentiveLogic: [
        "Early supporters earn tokens that appreciate with community growth",
        "Fundraisers receive direct funding from token sales and community contributions",
        "Transparent allocation: percentage of tokens goes directly to verified causes",
        "Community governance: token holders vote on cause selection and platform policies"
      ],
      feedbackLoops: [
        "Successful fundraisers attract more community members",
        "Community growth increases token value and available funding",
        "Transparent impact reporting builds trust and sustains engagement",
        "Governance decisions shape platform evolution"
      ],
      governance: [
        "Explicit ethical guidelines preventing speculative manipulation",
        "Transparent fund allocation with public blockchain or equivalent verification",
        "Community-driven cause selection to prevent centralization",
        "Anti-fraud mechanisms and need verification"
      ]
    },
    
    artifacts: [
      {
        title: "Ethical Risk Assessment",
        description: "Comprehensive analysis of meme-coin dynamics, speculative risks, and potential for harm. Explicitly addresses how to prevent exploitation while leveraging community energy.",
        stage: "Draft",
        type: "Documentation",
        link: null,
        linkText: null
      },
      {
        title: "Tokenomics Design v0.1",
        description: "Early-stage economic model exploring token distribution, fund allocation percentages, and community governance mechanisms. Includes risk analysis of speculative behavior.",
        stage: "Conceptual",
        type: "Model",
        link: null,
        linkText: null
      },
      {
        title: "Community Governance Framework",
        description: "Proposed system for community-driven cause selection and platform decision-making. Explores how to balance decentralization with ethical oversight.",
        stage: "Design Phase",
        type: "Framework",
        link: null,
        linkText: null
      }
    ],
    
    researchMethodology: `FundMyLife applies critical analysis to meme-coin dynamics, examining both their mobilization potential and ethical risks. Research draws from behavioral economics (what drives viral engagement), tokenomics design (how to align incentives), and social finance (how to create sustainable funding mechanisms). The project explicitly discusses ethical tradeoffs: leveraging meme culture vs. preventing exploitation, community ownership vs. need for oversight, transparency vs. privacy.`,
    
    reflection: {
      assumptions: [
        "That meme-coin dynamics can be ethically harnessed for humanitarian purposes",
        "That community governance will prioritize genuine need over speculative gain",
        "That transparent tokenomics will prevent manipulation and fraud"
      ],
      tradeoffs: [
        "Viral Mechanics vs. Ethical Boundaries: Meme dynamics are powerful but can trivialize serious needs",
        "Community Ownership vs. Oversight: Decentralization enables participation but may lack accountability",
        "Transparency vs. Speculation: Public tokenomics prevents fraud but may attract speculators"
      ],
      unresolved: [
        "Whether meme-coin dynamics are fundamentally incompatible with ethical humanitarian funding",
        "How to prevent speculative behavior from undermining genuine fundraising",
        "Whether community governance can effectively prevent exploitation"
      ]
    },
    
    roadmap: [
      "Phase 1: Complete ethical risk assessment with academic review",
      "Phase 2: Design tokenomics model with explicit anti-speculation mechanisms",
      "Phase 3: Develop community governance framework",
      "Phase 4: Create prototype for small-scale testing (if ethical review passes)",
      "Phase 5: Document learnings and open questions"
    ],
    
    collaboration: `FundMyLife is a critical exploration of meme-coin dynamics in humanitarian contexts. I'm particularly interested in discussing ethical boundaries, tokenomics design, and whether viral mechanics can be ethically applied to serious causes. If you're a researcher, ethicist, or practitioner with insights on these questions, I'd welcome your perspective.`
  },

  sarmayachain: {
    name: "SarmayaChain",
    status: "Prototype in Progress",
    statusColor: "black",
    problemStatement: `Traditional charity models often strip beneficiaries of dignity by treating them as passive recipients rather than active participants in their own improvement. Performance-based sponsorship exists but lacks transparency, verification, and emotional connection. The current system fails to map real need, verify outcomes, or create sustainable pathways from poverty to self-sufficiency.`,
    
    overview: `SarmayaChain explores how performance-based sponsorship, verified need mapping, and emotionally loaded incentives can restore dignity to humanitarian investment. The project asks: Can we design a system where sponsors invest in individuals' growth trajectories, with transparent verification and outcomes that benefit both sponsor and beneficiary? SarmayaChain emphasizes dignity, verification, and humanitarian design—explicitly rejecting models that commodify suffering or create dependency.`,
    
    proposedSystem: {
      actors: [
        "Sponsors (individuals or organizations investing in beneficiary growth)",
        "Beneficiaries (underprivileged individuals with verified need and growth potential)",
        "Verifiers (trusted entities that map need and verify outcomes)",
        "Platform (facilitates matching, tracks performance, ensures dignity and transparency)"
      ],
      incentiveLogic: [
        "Sponsors receive emotional and social returns from beneficiary success stories",
        "Beneficiaries earn increased support based on verified progress toward self-sufficiency",
        "Performance-based funding creates pathways from dependency to independence",
        "Transparent impact data builds sponsor trust and beneficiary accountability"
      ],
      feedbackLoops: [
        "Beneficiary progress unlocks additional sponsor investment",
        "Success stories attract more sponsors to the platform",
        "Verified outcomes refine need mapping and matching algorithms",
        "Sponsor feedback shapes platform policies and beneficiary support structures"
      ],
      governance: [
        "Dignity-first design: beneficiaries are active participants, not passive recipients",
        "Transparent need verification to prevent fraud while protecting privacy",
        "Ethical guidelines preventing exploitation or commodification of suffering",
        "Community governance including beneficiary representation"
      ]
    },
    
    artifacts: [
      {
        title: "Humanitarian Design Framework",
        description: "Core principles for designing systems that restore dignity while enabling impact. Includes research on performance-based sponsorship models and their ethical implications.",
        stage: "Draft",
        type: "Framework",
        link: null,
        linkText: null
      },
      {
        title: "Need Mapping System Design",
        description: "Proposed framework for verifying need while protecting beneficiary dignity and privacy. Explores how to map need without creating dependency or exploitation.",
        stage: "Design Phase",
        type: "System Design",
        link: null,
        linkText: null
      },
      {
        title: "Performance-Based Sponsorship Model",
        description: "Early-stage model for linking sponsor investment to verified beneficiary progress. Includes ethical considerations and dignity protection mechanisms.",
        stage: "Conceptual",
        type: "Model",
        link: null,
        linkText: null
      }
    ],
    
    researchMethodology: `SarmayaChain applies humanitarian design principles, drawing from development economics, behavioral science, and ethical frameworks. Research examines existing sponsorship models, analyzes their failures (dependency creation, lack of dignity, insufficient verification), and proposes alternatives. The project explicitly prioritizes dignity over efficiency, beneficiary agency over donor convenience, and sustainable outcomes over short-term metrics.`,
    
    reflection: {
      assumptions: [
        "That performance-based sponsorship can create dignity rather than pressure",
        "That need verification can be transparent without being exploitative",
        "That emotionally loaded incentives align sponsor and beneficiary interests"
      ],
      tradeoffs: [
        "Performance Metrics vs. Dignity: Measuring progress is necessary but may create pressure or commodify improvement",
        "Verification vs. Privacy: Transparent outcomes build trust but require beneficiary data",
        "Sponsor Incentives vs. Beneficiary Autonomy: Aligning interests is powerful but may create dependency"
      ],
      unresolved: [
        "How to measure performance without creating harmful pressure on beneficiaries",
        "Whether performance-based models can avoid creating dependency relationships",
        "How to ensure verification doesn't become exploitative or burdensome"
      ]
    },
    
    roadmap: [
      "Phase 1: Complete humanitarian design framework with beneficiary input",
      "Phase 2: Develop need mapping system with privacy and dignity protections",
      "Phase 3: Design performance-based sponsorship model with ethical safeguards",
      "Phase 4: Create prototype for testing with small beneficiary group (if ethical review passes)",
      "Phase 5: Document learnings and refine based on beneficiary feedback"
    ],
    
    collaboration: `SarmayaChain prioritizes dignity and humanitarian design. I'm particularly interested in discussing with development practitioners, ethicists, and beneficiaries themselves. If you have experience with sponsorship models, need verification, or humanitarian design, I'd welcome your critique and collaboration.`
  },

  quarkcapital: {
    name: "QuarkCapital",
    status: "Early-Stage Concept",
    statusColor: "blue",
    problemStatement: `Traditional investment models exclude creative individuals and early-stage ideas from capital access. The gap between having an idea and securing funding is vast, and existing systems favor established entities over emerging creativity. Meanwhile, supporters who believe in creators early have no mechanism to share in their growth. The current financial architecture treats creativity and capital as separate, failing to recognize that ideas and contributions are valuable assets.`,
    
    overview: `QuarkCapital explores how creativity and capital can be treated as living, tradable units in a micro-asset ecosystem. The project asks: Can we reimagine projects, ideas, and contributions as "quarks" of value that can be tokenized, invested in, and grown collectively? This is framed as conceptual financial architecture—an exploration of how micro-investments, creativity-as-capital, and system evolution might enable inclusive economic participation. QuarkCapital does not claim to solve all funding gaps, but investigates whether new financial structures can emerge from blending psychology, gamified incentives, and crypto-style mechanics.`,
    
    proposedSystem: {
      actors: [
        "Creators (individuals with ideas, projects, or contributions seeking early support)",
        "Investors/Supporters (individuals who back creators early and share in growth)",
        "Platform (facilitates tokenization, tracks value, enables trading and growth)"
      ],
      incentiveLogic: [
        "Early supporters earn micro-assets (quarks) that appreciate with creator success",
        "Creators receive capital and community support in exchange for sharing future value",
        "Contribution-based rewards: active supporters earn more quarks through engagement",
        "Transparent value tracking enables informed investment decisions"
      ],
      feedbackLoops: [
        "Creator success increases quark value, rewarding early supporters",
        "Successful creators attract more supporters, creating network effects",
        "Platform growth increases liquidity and value discovery",
        "Community engagement shapes platform evolution and governance"
      ],
      governance: [
        "Transparent tokenization and value tracking mechanisms",
        "Community governance for platform policies and feature development",
        "Ethical guidelines preventing manipulation or exploitation",
        "Accessibility mechanisms ensuring inclusive participation"
      ]
    },
    
    artifacts: [
      {
        title: "Financial Architecture Blueprint",
        description: "Conceptual design for micro-asset ecosystem, tokenization mechanisms, and value tracking systems. Includes preliminary research on existing micro-investment models and their limitations.",
        stage: "Conceptual",
        type: "Documentation",
        link: null,
        linkText: null
      },
      {
        title: "Quark Tokenization Model",
        description: "Early-stage economic model exploring how ideas and contributions can be represented as tradeable micro-assets. Includes risk analysis and value discovery mechanisms.",
        stage: "Theoretical",
        type: "Model",
        link: null,
        linkText: null
      },
      {
        title: "Creator-Investor Matching Framework",
        description: "Proposed system for connecting creators with early supporters, tracking contributions, and enabling value sharing. Explores gamification and incentive alignment.",
        stage: "Design Phase",
        type: "Framework",
        link: null,
        linkText: null
      }
    ],
    
    researchMethodology: `QuarkCapital applies systems thinking to financial architecture, examining how micro-assets, tokenization, and gamified incentives might create new economic structures. Research draws from behavioral economics (what motivates early support), platform economics (how marketplaces enable value discovery), and creative economy studies (how to value non-traditional contributions). The project explores whether new financial structures can emerge from blending psychology, incentives, and technology.`,
    
    reflection: {
      assumptions: [
        "That creativity and contributions can be meaningfully tokenized as micro-assets",
        "That early supporters will engage authentically rather than speculatively",
        "That micro-investment structures can scale while maintaining accessibility"
      ],
      tradeoffs: [
        "Tokenization vs. Authenticity: Representing creativity as assets may commodify it",
        "Gamification vs. Serious Investment: Incentives may attract engagement but risk trivializing financial decisions",
        "Accessibility vs. Value: Making investment easy may enable participation but also enable poor decisions"
      ],
      unresolved: [
        "Whether micro-assets can create sustainable value or are inherently speculative",
        "How to prevent the system from favoring viral content over genuine creativity",
        "Whether gamified incentives align with serious financial participation"
      ]
    },
    
    roadmap: [
      "Phase 1: Complete financial architecture blueprint with academic review",
      "Phase 2: Develop detailed tokenization model and value tracking mechanisms",
      "Phase 3: Design creator-investor matching framework",
      "Phase 4: Create prototype for small-scale testing",
      "Phase 5: Document learnings and system evolution proposals"
    ],
    
    collaboration: `QuarkCapital is a conceptual exploration of financial architecture for creativity and micro-investments. I'm particularly interested in discussing with economists, financial systems researchers, and creators who have experienced funding barriers. If you have insights on micro-assets, tokenization, or creative economy structures, I'd welcome your perspective.`
  }
};
