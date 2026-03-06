export const investments = [
    {
        id: "edtech-alpha",
        name: "EdTech Alpha",
        sector: "EdTech",
        investmentTheme: "Inclusion",
        thesisTag: "Education equity",
        logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Mockup logo
        companyOverview: "A next-generation platform focused on providing high-quality educational resources to low-income regions through micro-transactions and offline-first mobile architecture.",
        whyIInvested: {
            marketGap: "I noticed that existing EdTech solutions often focus on high-bandwidth urban populations, leaving a secondary market in developing regions underserved.",
            innovationModel: "The reliance on data compression and localized caching allows interactive lessons to run on basic smartphones with minimal data cost.",
            governanceStructure: "The community-led curriculum board ensures local educators have a direct say in content relevance.",
            inclusionPotential: "This approach lowers the financial and technical entry barrier for quality learning in underserved communities."
        },
        systemicRelevance: {
            education: "Links to Research Lab projects like ClassFusion in understanding cognitive compatibility in resource-constrained environments.",
            financeAccess: "Explores how micro-payments can be institutionalized as a stable revenue model for community-led education.",
            youthEmpowerment: "Provides a platform for local youth to become content creators and mentors, earning fractional equity in the platform's growth.",
            platformEconomics: "A case study in 'Low-ARPU, High-Volume' platform dynamics."
        },
        riskReflection: {
            scalingBarriers: "High dependency on localized partnerships which can be difficult to replicate across different provinces.",
            regulatoryFriction: "Potential challenges with local digital currency regulations regarding micro-payments.",
            monetizationRisks: "Long-term sustainability relies on massive scale due to thin margins per user."
        },
        hypothesis: {
            statement: "Offline-first architectures are the mandatory substrate for educational equity in low-bandwidth regions.",
            variable: "Latency vs. Information retention.",
            outcome: "Simulation suggests 40% higher completion rates when synchronization is asynchronous."
        },
        systemLogic: "Equity = \\frac{Reach}{Bandwidth}",
        adversarialAnalysis: {
            attackVector: "Data Staleness. Outdated offline content leading to incorrect learning assessment.",
            mitigation: "Cryptographically signed version-stamping with priority sync for metadata."
        },
        learningOutcomes: "This research-led allocation taught me how hardware constraints in the Global South dictate software architecture more than developer preference."
    },
    {
        id: "fintech-flow",
        name: "FinTech Flow",
        sector: "FinTech",
        investmentTheme: "Governance",
        thesisTag: "Platform economics",
        logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
        companyOverview: "A decentralized liquidity protocol designed to smooth charitable flows, similar to the FlowFund concept in the Governance Lab.",
        whyIInvested: {
            marketGap: "Beneficiaries often face periods with no aid between cycles. I followed this company to see how they solve for these gaps.",
            innovationModel: "The use of continuous vesting contracts to stream support to recipient wallets seemed like a practical exploration of liquidity.",
            governanceStructure: "Involving local NGOs as verifiers for impact and need adds a layer of ground-level accountability.",
            inclusionPotential: "It removes the banking requirement for recipients, allowing direct participation in support streams."
        },
        systemicRelevance: {
            education: "Allows for 'Educational UBI' where students receive a continuous stream of support while enrolled.",
            financeAccess: "Core research into how programmed money can solve systemic poverty trap liquidity crunches.",
            youthEmpowerment: "Enables young researchers to receive direct funding for independent studies via streaming grants.",
            platformEconomics: "Study of 'Streaming Liquidity' as a replacement for 'Batch Transactions'."
        },
        riskReflection: {
            scalingBarriers: "Blockchain onboarding friction for non-technical users remains the primary hurdle.",
            regulatoryFriction: "Significant uncertainty regarding stablecoin regulations in target jurisdictions.",
            monetizationRisks: "Protocol depends on transaction fees which may disincentivize micro-streams if gas costs fluctuate."
        },
        hypothesis: {
            statement: "Streaming liquidity reduces recipient dependency on high-interest predatory lending cycles.",
            variable: "Streaming rate vs. credit reliance.",
            outcome: "Direct correlation between continuous flow and psychological financial security markers."
        },
        systemLogic: "Flow = \\int R_{rate} dt",
        adversarialAnalysis: {
            attackVector: "Wallet Drainage. Single point of failure for recipient private keys in non-custodial setups.",
            mitigation: "Multi-sig social recovery and time-locked withdrawal limits."
        },
        learningOutcomes: "Confirmed that 'Trust Architecture' (how people verify need) is more technically challenging than 'Transfer Architecture' (how money moves)."
    },
    {
        id: "gov-tech-core",
        name: "GovTech Core",
        sector: "GovTech",
        investmentTheme: "Incentives",
        thesisTag: "Governance innovation",
        logo: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
        companyOverview: "A software suite for local municipal governance, allowing citizens to vote on budget allocations and track project implementation in real-time.",
        whyIInvested: {
            marketGap: "Public trust in municipal spending can be improved through better transparency and participation tools.",
            innovationModel: "The quadratic voting system for budget prioritization is an interesting experiment in collective decision-making.",
            governanceStructure: "The delegation model allows citizens to assign their votes to trusted experts for specific topics.",
            inclusionPotential: "It provides a digital channel for communities to influence local policy directly."
        },
        systemicRelevance: {
            education: "Links to the 'Institutional Governance for Schools' research paper, applying town-hall dynamics to school boards.",
            financeAccess: "Investigates how public funds can be 'invested' directly by the public into high-impact local infrastructure.",
            youthEmpowerment: "Creates a 'Junior Council' tier within the app for youth under 18 to participate in non-binding policy experiments.",
            platformEconomics: "Research into 'Public Goods as a Service' (PGaaS) monetization models."
        },
        riskReflection: {
            scalingBarriers: "High resistance from entrenched political interests who benefit from opacity.",
            regulatoryFriction: "Requires legislative approval in most districts to be formally integrated into state budgets.",
            monetizationRisks: "SaaS model for governments is notoriously slow-cycle and politically sensitive."
        },
        hypothesis: {
            statement: "Quadratic voting in municipal budgets correctly prioritizes intensity of preference over simple majority.",
            variable: "Participation rate vs. allocation efficiency.",
            outcome: "Allocations align more closely with minority community needs in simulation models."
        },
        systemLogic: "Power = \\sqrt{Tokens}",
        adversarialAnalysis: {
            attackVector: "Collusion. Strategic voting blocks coordinating to bypass quadratic math.",
            mitigation: "Reputation-weighted voting power and adversarial audit logs."
        },
        learningOutcomes: "Learned that 'Incentive Alignment' in public sectors requires far more social engineering than technical engineering."
    }
];
