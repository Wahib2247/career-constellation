
// Project-specific detailed content for academic showcase pages
// Strictly following the 11-Section Research Lab Schema

export const projectDetails = {
  classfusion: {
    name: "ClassFusion",
    descriptor: "A research exploration into cognitive compatibility in education.",
    status: "Prototype",
    statusColor: "yellow",
    domain: "EdTech / Behavioral Systems",

    // 2. Problem Statement
    problemStatement: `Traditional education systems treat students as uniform cohorts, ignoring individual cognitive profiles and intrinsic motivation. This 'factory model' leads to disengagement, suboptimal pairing of students and teachers, and a reliance on punitive rather than positive reinforcement. The system fails to optimize for the 'transfer of knowledge' because it ignores the relational compatibility required for effective mentorship.`,

    // 3. Hypothesis
    hypothesis: `If we model the classroom as a 'matching market' of cognitive needs—pairing students and teachers based on psychometric compatibility while tokenizing participation—we can significantly increase engagement and learning retention. The core assumption is that relational alignment is a stronger predictor of educational outcome than standardized curriculum delivery.`,

    // 4. System Overview
    systemOverview: {
      actors: [
        "Learners (Profiled by learning style & motivation)",
        "Educators (Profiled by teaching method & expertise)",
        "Matching Engine (Algorithmic compatibility layer)",
        "Incentive Protocol (Tokenized curiosity rewards)"
      ],
      mechanisms: [
        "Psychometric Profiling Input",
        "Double-sided Matching Algorithm",
        "Engagement-based Token Distribution",
        "Compatibility Feedback Loops"
      ]
    },

    // 5. Architecture
    architecture: {
      description: "The system operates on a JAMstack architecture with a specialized matching microservice.",
      components: [
        "Frontend: React.js interactive dashboard for profile visualization.",
        "Data Layer: JSON-based graph store for cognitive profiles.",
        "Logic: Weighted matching algorithm (Concept Stage: Python simulation).",
        "Incentives: Local state simulation of token rewards (non-blockchain MVP)."
      ]
    },

    // 6. Research Artifacts
    researchArtifacts: [
      {
        type: "Figma Prototype",
        label: "Cognitive Matching Interface",
        caption: "UI demonstrating how compatibility scores are visualized for users.",
        link: "#"
      },
      {
        type: "Algorithm Logic",
        label: "Matching Simulation (Python)",
        caption: "Conceptual logic for weighing psychometric variables against teaching styles.",
        link: "#"
      }
    ],

    // 7. Simulations
    simulation: {
      scenario: "Simulated a cohort of 50 students and 5 teachers with assigned 'Cognitive Types' (e.g., Visual-Spatial vs. Auditory-Sequential).",
      outcome: "Preliminary logic suggests a 40% reduction in 'friction' (mismatched communication styles) compared to random assignment. *Note: Synthetic data only.*"
    },

    // 8. Methodology
    methodology: {
      approach: "Design-Based Research (DBR) focusing on iterative development of the matching algorithm.",
      metrics: [
        "Compatibility Score Accuracy (Theoretical)",
        "User Perceived Fairness (Qualitative)",
        "Time-to-Engagement (Simulation)"
      ]
    },

    // 9. Ethical Risks
    ethicalRisks: [
      {
        risk: "Deterministic Labeling",
        mitigation: "Risk of pigeonholing students. Mitigation: Profiles must be dynamic and evolving, not static snapshots."
      },
      {
        risk: "Incentive Gaming",
        mitigation: "'Learning for earning' tokens rather than knowledge. Mitigation: Cap token velocity and weigh 'effort' metrics."
      }
    ],

    // 10. Next Steps
    nextSteps: [
      "Refine the psychometric weighting variables.",
      "Develop a clickable MVP for small-group testing.",
      "Draft a whitepaper on 'Algorithmic Mentorship'."
    ],

    // 11. Disclaimer
    disclaimer: "This project is an ongoing research exploration. All findings are preliminary, and the system has not been deployed in real-world environments."
  },

  flowfund: {
    name: "FlowFund",
    descriptor: "A research exploration into continuous charitable liquidity.",
    status: "Concept",
    statusColor: "red",
    domain: "FinTech / Poverty Reduction",

    problemStatement: `Charitable giving is currently episodic and high-friction. The 'poverty trap' is exacerbated by liquidity crunches, yet aid arrives in sporadic lumps rather than reliable streams. Existing platforms are 'stores' for causes, lacking the fluid, continuous nature required for systemic poverty alleviation. This structural inefficiency prevents aid from acting as a true safety net.`,

    hypothesis: `A 'continuous flow' model—where small, automated micro-transactions occur constantly between peers—can create a more resilient safety net than large, sporadic donations. By framing poverty alleviation as a liquidity problem rather than a funding volume problem, we can smooth consumption for beneficiaries using existing capital more efficiently.`,

    systemOverview: {
      actors: [
        "Liquid Providers (Donors with auto-stream enabled)",
        "Verified Recipients (Wallet-holders with need-status)",
        "Verification Nodes (Trusted local entities)",
        "Flow Protocol (Stream distribution logic)"
      ],
      mechanisms: [
        "Continuous Vesting (Money flows second-by-second)",
        "Consumption Smoothing Algorithms",
        "Trust-based Verification Graphs",
        "Dynamic P2P Routing"
      ]
    },

    architecture: {
      description: "Conceptual designs leverage programmable banking APIs (like Stripe Connect) or L2 Blockchain streams.",
      components: [
        "Stream Engine: Logic for dividing lumps into flows.",
        "Dashboard: Visualization of 'Current Flow Rate' vs. 'Total Donated'.",
        "Verification Oracle: Mockup of trusted-peer verification."
      ]
    },

    researchArtifacts: [
      {
        type: "System Diagram",
        label: "Liquidity Flow Chart",
        caption: "Visualizing how a $30 donation smooths into a $1/day stream.",
        link: "#"
      },
      {
        type: "UI Mockup",
        label: "Stream Dashboard",
        caption: "Donor view focused on 'Flow' rather than 'Transaction'.",
        link: "#"
      }
    ],

    simulation: {
      scenario: "Modeled 100 donors giving $30/month vs. $1/day streams.",
      outcome: "Stream methodology reduced beneficiary 'zero-balance days' by 85% in the theoretical model, suggesting high impact on consumption smoothing."
    },

    methodology: {
      approach: "Comparative modeling of cash-flow volatility.",
      metrics: [
        "Volatility Index (Recipient Variance)",
        "Donor Retention Rate (Projected)",
        "System Latency"
      ]
    },

    ethicalRisks: [
      {
        risk: "Dependency Creation",
        mitigation: "Continuous flows might discourage graduation from aid. Mitigation: Time-limited 'seasons' of support."
      },
      {
        risk: "Privacy Trade-offs",
        mitigation: "Verifying need requires intrusive data. Mitigation: Zero-Knowledge Proofs for eligibility."
      }
    ],

    nextSteps: [
      "Mathematical modeling of the flow algorithm.",
      "User interviews with regular donors on 'subscription' fatigue.",
      "Technical feasibility study of L2 streaming payment costs."
    ],

    disclaimer: "This project is an ongoing research exploration. All findings are preliminary, and the system has not been deployed in real-world environments."
  },

  fundmylife: {
    name: "FundMyLife",
    descriptor: "A research exploration into tokenized social capital.",
    status: "Simulation",
    statusColor: "green",
    domain: "Crypto / Social Capital",

    problemStatement: `Access to early-stage capital is gatekept by formal institutions. Individuals with high potential but low collateral cannot 'IPO' themselves. While social capital exists, it is illiquid and unquantifiable. Current crowdfunding is donation-based, offering no alignment of incentives between backer and creator beyond altruism.`,

    hypothesis: `By tokenizing 'future potential' via a meme-coin mechanism or personal bonding curve, we can create a market for personal backing. If community members can buy 'shares' in a person's journey, incentives align for mutual success, democratizing access to 'belief capital'.`,

    systemOverview: {
      actors: [
        "Creators (Issuers of personal tokens)",
        "Backers (Holders of personal tokens)",
        "Bonding Curve (Automated Market Maker)",
        "Reputation Oracle (Milestone verification)"
      ],
      mechanisms: [
        "Token Minting on Bonding Curve",
        "Milestone-based Vesting",
        "Governance Voting Rights",
        "Social Proof Feed"
      ]
    },

    architecture: {
      description: "Smart contract logic on Ethereum/Solana testnets.",
      components: [
        "Bonding Curve Contract (Solidity/Rust mockup)",
        "Profile Interface (Web3 connection)",
        "Governance Dashboard (Voting on milestones)",
        "Treasury Wallet (Multisig)"
      ]
    },

    researchArtifacts: [
      {
        type: "Contract Logic",
        label: "Bonding Curve Model",
        caption: "Spreadsheet simulation of token price relative to supply.",
        link: "#"
      },
      {
        type: "UI Concept",
        label: "Personal IPO Page",
        caption: "Design for a 'Human Stock Market' profile.",
        link: "#"
      }
    ],

    simulation: {
      scenario: "Simulated a 'run' on a personal token where 50 backers buy in.",
      outcome: "Volatility was high. Theoretical model suggests 'Time-Locking' tokens is necessary to prevent pump-and-dump scenarios on human beings."
    },

    methodology: {
      approach: "Game Theoretic modeling of self-interest vs. communal support.",
      metrics: [
        "Token Stability",
        "Creator Stress Index (Theoretical)",
        "Backer ROI vs. Support Duration"
      ]
    },

    ethicalRisks: [
      {
        risk: "Commodification of Humans",
        mitigation: "Reducing people to stock prices creates dystopia. Mitigation: Focus on 'Project' tokens, not 'Person' tokens."
      },
      {
        risk: "Speculative Bubbles",
        mitigation: "Pump & Dump schemes. Mitigation: impose heavy sell taxes that redistribute to the creator."
      }
    ],

    nextSteps: [
      "Refine the 'Bonding Curve' math to reduce volatility.",
      "Consult with ethicists on 'human tokenization'.",
      "Develop a non-financialized 'reputation point' prototype."
    ],

    disclaimer: "This project is an ongoing research exploration. All findings are preliminary, and the system has not been deployed in real-world environments."
  },

  sarmayachain: {
    name: "SarmayaChain",
    descriptor: "A research exploration into dignity-based aid verification.",
    status: "Research Draft",
    statusColor: "black",
    domain: "Humanitarian / Blockchain",

    problemStatement: `Traditional aid is opaque, leading to donor mistrust and recipient stigma. There is no 'performance history' for the underprivileged to prove their reliability to sponsors. The current system relies on 'pity' rather than 'potential', failing to build a ladder for upward mobility.`,

    hypothesis: `A blockchain-based ledger of 'verified needs' and 'performance' (e.g., school grades, attendance) creates a portable reputation for recipients. By validating milestones on-chain, we can enable dignity-based sponsorship where donors invest in verified progress rather than just funding survival.`,

    systemOverview: {
      actors: [
        "Beneficiaries (Students/Families building reputation)",
        "Verifiers (Schools/Local shops validating data)",
        "Sponsors (Donors viewing verified data)",
        "Sarmaya Protocol (Immutable record keeper)"
      ],
      mechanisms: [
        "Did (Decentralized Identity) Creation",
        "Claim Verification Protocol",
        "Conditional Fund Release",
        "Reputation Score Calculation"
      ]
    },

    architecture: {
      description: "Proposed architecture utilizing Self-Sovereign Identity (SSI).",
      components: [
        "Identity Vault (User controls data)",
        "Verification Interface (For trusted 3rd parties)",
        "Public Ledger (Anonymized proof of progress)",
        "Smart Contract Escrow"
      ]
    },

    researchArtifacts: [
      {
        type: "Process Framework",
        label: "Verification Flow",
        caption: "Diagram detailing how a local school principal verifies grade data on-chain.",
        link: "#"
      },
      {
        type: "Data Model",
        label: "Reputation Schema",
        caption: "JSON structure for a 'Verified Student' credential.",
        link: "#"
      }
    ],

    simulation: {
      scenario: "Compared cost of traditional audit vs. on-chain verification.",
      outcome: "Theoretical reduction in administrative overhead by 60%, but high 'onboarding friction' for non-technical user base."
    },

    methodology: {
      approach: "Qualitative research interviews with local NGOs + Cost-benefit analysis.",
      metrics: [
        "Verification Cost per User",
        "Data Privacy Score",
        "User Autonomy Index"
      ]
    },

    ethicalRisks: [
      {
        risk: "Surveillance of the Poor",
        mitigation: "Public ledgers can expose vulnerable people. Mitigation: Zero-Knowledge proofs are mandatory so data remains private."
      },
      {
        risk: "Oracle Corruption",
        mitigation: "Verifiers taking bribes. Mitigation: Multi-sig verification (require 2 independent verifiers)."
      }
    ],

    nextSteps: [
      "Research Zero-Knowledge Proof libraries (zk-SNARKs).",
      "Partner with a local educational NGO for workflow interviews.",
      "Draft a technical specification for the Identity Vault."
    ],

    disclaimer: "This project is an ongoing research exploration. All findings are preliminary, and the system has not been deployed in real-world environments."
  },

  quarkcapital: {
    name: "QuarkCapital",
    descriptor: "A research exploration into fractional creative equity.",
    status: "Concept",
    statusColor: "blue",
    domain: "FinTech / Creative Economy",

    // 2. Problem Statement
    problemStatement: `Creative collaboration is often unpaid or vaguely compensated. 'Exposure' is not currency, and small contributions (an idea, a logo tweak) are lost in the equity shuffle. The current intellectual property system is binary (ownership vs non-ownership), failing to capture the granular, collective nature of modern digital creation.`,

    // 3. Core Hypothesis
    hypothesis: `"If we atomize projects into 'Quarks'—micro-units of value—contributors can earn fractional equity for granular work. By logging contributions on a transparent ledger, we can distribute value dynamically based on effort, creating a fairer creative supply chain."`,

    // 4. System Maps
    systemOverview: {
      actors: [
        "Project Initiators (Founders)",
        "Micro-Contributors (Designers/Coders)",
        "Valuation Algorithm (Weighting logic)",
        "Quark Ledger (Cap table)"
      ],
      mechanisms: [
        "Contribution Logging (e.g., via Github Commits)",
        "Value Weighting (Time x Skill Level)",
        "Dynamic Equity Splitting",
        "Dividends / Buyback Protocol"
      ]
    },

    // Stack Architecture
    architecture: {
      description: "A governance layer on top of version control (Git).",
      components: [
        "GitBot (Listen for PRs/Commits)",
        "Appraisal Interface (Peers vote on contribution value)",
        "Equity Dashboard (Real-time cap table)",
        "Smart Contract Registry"
      ]
    },

    // 5. Evidence / Artifacts
    researchArtifacts: [
      {
        type: "Algorithm Concept",
        label: "The Quark Formula",
        caption: "Mathematical model for dynamic equity dilution.",
        link: "#"
      },
      {
        type: "Workflow Diagram",
        label: "Commit-to-Equity Flow",
        caption: "Visualizing the path from a GitHub PR to wallet balance update.",
        link: "#"
      }
    ],

    // 6. Simulation / Outcomes
    simulation: {
      scenario: "Simulated a 5-person hackathon project. 1 Winner-take-all vs. Quark model.",
      outcome: "Quark model distributed value 40/20/15/15/10. Participants reported higher 'sense of ownership' (theoretical)."
    },

    // Metrics
    methodology: {
      approach: "Agent-based modelling of collaboration networks.",
      metrics: [
        "Perception of Fairness",
        "Contribution Velocity",
        "Retention of Contributors"
      ]
    },

    // Risk Analysis
    ethicalRisks: [
      {
        risk: "Over-Financialization",
        mitigation: "Turning friendship into transactions. Mitigation: Allow 'Gift' mode for non-transactional help."
      },
      {
        risk: "Complexity Tax",
        mitigation: "System is too hard to use. Mitigation: Automation must handle 90% of the accounting invisible."
      }
    ],

    // Future Roadmap
    nextSteps: [
      "Define the 'Quark' unit value.",
      "Build a simple web3 logger for GitHub commits.",
      "Write a manifesto on 'Liquid Equity'."
    ],

    disclaimer: "This project is an ongoing research exploration. All findings are preliminary, and the system has not been deployed in real-world environments."
  }
};
