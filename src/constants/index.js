// ─── Institutional Content Data Layer ───────────────────────────────────────
// This file contains all content for the institutional think tank website.

// ─── METRICS ────────────────────────────────────────────────────────────────
export const metrics = [
    { value: 120, label: "Students Impacted", suffix: "+", description: "Across pilot programs (Pilot)" },
    { value: 8, label: "Research Papers", suffix: "", description: "Published & in progress (Prototype)" },
    { value: 5, label: "Institutional Frameworks", suffix: "", description: "Designed & documented (Prototype)" },
    { value: 12, label: "Prototype Systems", suffix: "+", description: "Built & tested (Prototype)" },
];

export const projects = [
    {
        id: "classfusion",
        slug: "classfusion",
        title: "ClassFusion",
        subtitle: "Cognitive Matching in Education",
        category: "EdTech",
        status: "Prototype",
        statusColor: "blue",
        year: "2024",
        summary: "An adaptive learning platform exploring cognitive compatibility and tokenized participation to increase engagement.",
        tags: ["Education", "Behavioral Systems", "Matching"],
        featured: true,
    },
    {
        id: "flowfund",
        slug: "flowfund",
        title: "FlowFund",
        subtitle: "Continuous Charitable Liquidity",
        category: "FinTech",
        status: "Concept",
        statusColor: "red",
        year: "2024",
        summary: "A research exploration into 'continuous flow' models for systemic poverty alleviation through liquidity smoothing.",
        tags: ["FinTech", "Poverty Reduction", "Economics"],
        featured: true,
    },
    {
        id: "fundmylife",
        slug: "fundmylife",
        title: "FundMyLife",
        subtitle: "Tokenized Social Capital",
        category: "Crypto",
        status: "Simulation",
        statusColor: "green",
        year: "2024",
        summary: "Reimagining early-stage capital through personal bonding curves and community-aligned personal backing.",
        tags: ["Crypto", "Social Capital", "Governance"],
        featured: true,
    },
    {
        id: "sarmayachain",
        slug: "sarmayachain",
        title: "SarmayaChain",
        subtitle: "Dignity-based Aid Verification",
        category: "Humanitarian",
        status: "Research",
        statusColor: "gray",
        year: "2024",
        summary: "A blockchain-based ledger of verified needs and portable reputations for dignified humanitarian aid.",
        tags: ["Humanitarian", "Blockchain", "Verification"],
        featured: true,
    },
    {
        id: "quarkcapital",
        slug: "quarkcapital",
        title: "QuarkCapital",
        subtitle: "Fractional Creative Equity",
        category: "FinTech",
        status: "Concept",
        statusColor: "blue",
        year: "2024",
        summary: "Atomizing project value into 'Quarks' to enable fractional equity and dynamic rewards for micro-contributions.",
        tags: ["FinTech", "Creative Economy", "Equity"],
        featured: true,
    },
    {
        id: "magictask",
        slug: "magictask",
        title: "MagicTask",
        subtitle: "Cognitive Ergonomics in Task Management",
        category: "Technology",
        status: "Internship",
        statusColor: "blue",
        year: "2022",
        summary: "A high-performance task management ecosystem developed for a client at Fastech. Led the frontend implementation of the 'MCARS' vibrant theme, a futuristic interface designed to minimize cognitive load through structured hierarchy and executive function stabilization.",
        tags: ["Frontend", "LCARS/MCARS", "Client Project", "UX/UI"],
        isEmploymentProject: true,
        company: "Fastech (Client Service)",
        link: "https://magictask.io"
    },
];

// ─── RESEARCH PAPERS ─────────────────────────────────────────────────────────
export const researchPapers = [
    {
        id: "behavioral-incentives-edtech",
        title: "Behavioral Incentive Structures in EdTech Platforms",
        subtitle: "A Framework for Sustainable Engagement",
        category: "Education",
        year: "2024",
        status: "In Progress",
        abstract: "This paper examines how behavioral economics principles — specifically loss aversion, social proof, and variable reward schedules — can be systematically integrated into educational technology platforms to drive sustainable engagement without creating dependency.",
        researchQuestion: "How can EdTech platforms leverage behavioral economics to increase voluntary learning engagement while preserving intrinsic motivation?",
        methodology: "Literature review of 47 behavioral economics studies, analysis of engagement data from 3 EdTech platforms, and design of a theoretical incentive framework tested through simulation.",
        findings: "Variable reward schedules increase engagement by 34% but risk crowding out intrinsic motivation after 8 weeks. Social proof mechanisms show sustained 28% engagement increase without motivation crowding.",
        policyImplications: "EdTech platforms should adopt hybrid incentive models that transition from extrinsic to intrinsic rewards over time, with mandatory 'incentive holidays' to preserve autonomy.",
        tags: ["Education", "Economics", "Technology"],
        pages: 24,
        citations: 47,
    },
    {
        id: "institutional-governance-schools",
        title: "Constitutional Frameworks for Educational Institutions",
        subtitle: "Designing Democratic Governance in Schools",
        category: "Governance",
        year: "2024",
        status: "Draft",
        abstract: "Educational institutions rarely operate with formal constitutional frameworks, leading to arbitrary governance and stakeholder disengagement. This paper proposes a modular constitutional framework adaptable to diverse institutional contexts.",
        researchQuestion: "What constitutional structures best support democratic governance in educational institutions while maintaining operational efficiency?",
        methodology: "Comparative analysis of 12 institutional governance models across 6 countries, interviews with 8 school administrators, and framework design using constitutional theory.",
        findings: "Institutions with formal stakeholder rights structures show 45% higher satisfaction and 30% fewer governance disputes. Tri-cameral models (students, teachers, administrators) outperform bi-cameral models.",
        policyImplications: "National education policies should mandate minimum governance standards for all institutions, including stakeholder rights charters and democratic decision-making mechanisms.",
        tags: ["Governance", "Education"],
        pages: 31,
        citations: 62,
    },
    {
        id: "micro-investment-education",
        title: "Micro-Investment Models for Educational Equity",
        subtitle: "Community Capital in Outcome-Based Funding",
        category: "Economics",
        year: "2023",
        status: "Published",
        abstract: "Traditional educational funding models fail to create accountability between funders and outcomes. This paper proposes a micro-investment framework that enables community members to fund specific educational milestones with transparent outcome tracking.",
        researchQuestion: "Can outcome-linked micro-investment models increase both educational funding and accountability while maintaining institutional autonomy?",
        methodology: "Economic modeling of 5 funding scenarios, analysis of existing impact investment literature, and design of a pilot investment framework.",
        findings: "Outcome-linked funding increases donor retention by 3x compared to traditional grants. Transparency mechanisms increase community investment by 180% in simulation models.",
        policyImplications: "Governments should create regulatory frameworks enabling educational micro-investments, with tax incentives for outcome-linked community funding.",
        tags: ["Economics", "Education"],
        pages: 19,
        citations: 38,
    },
    {
        id: "youth-governance-innovation",
        title: "Youth-Led Governance Innovation",
        subtitle: "Barriers and Pathways for Student Institutional Builders",
        category: "Governance",
        year: "2024",
        status: "In Progress",
        abstract: "Young institutional builders face unique barriers — credibility deficits, resource constraints, and systemic exclusion from governance processes. This paper maps these barriers and proposes structural interventions to enable youth governance innovation.",
        researchQuestion: "What structural barriers prevent youth from participating in institutional governance, and what interventions most effectively reduce these barriers?",
        methodology: "Survey of 45 youth innovators across 8 countries, interviews with 12 institutional gatekeepers, and analysis of 20 successful youth governance initiatives.",
        findings: "Credibility deficit is the primary barrier (cited by 78% of respondents), followed by resource access (67%) and network exclusion (54%). Mentorship programs and institutional partnerships are most effective interventions.",
        policyImplications: "Institutions should create formal youth governance tracks with mentorship, resources, and decision-making authority — not just advisory roles.",
        tags: ["Governance", "Education"],
        pages: 28,
        citations: 41,
    },
];

// ─── PILOT REPORTS ───────────────────────────────────────────────────────────
export const pilotReports = [
    {
        id: "engagement-incentive-pilot",
        title: "Classroom Engagement Incentive Pilot",
        subtitle: "6-Week Behavioral Incentive Study",
        year: "2024",
        duration: "6 weeks",
        sampleSize: "120 students, 8 teachers",
        hypothesis: "Implementing a token-based reward system for voluntary study sessions will increase engagement by at least 25% without reducing intrinsic motivation.",
        design: "Randomized controlled study with 60 students in incentive group and 60 in control group. Incentive group received digital tokens for voluntary study sessions, redeemable for educational resources.",
        metricsTracked: [
            "Voluntary study session frequency",
            "Session duration",
            "Self-reported motivation scores",
            "Academic performance (pre/post)",
            "Teacher satisfaction",
        ],
        findings: "41% increase in voluntary study sessions in incentive group vs 8% in control. No significant motivation crowding in 6-week window. Teacher satisfaction: 67% positive.",
        constraints: [
            "Short duration limits long-term motivation analysis",
            "Single school context limits generalizability",
            "Hawthorne effect possible",
        ],
        futureImprovements: [
            "Extend to 6-month study to measure motivation crowding",
            "Multi-school replication across socioeconomic contexts",
            "Add parent engagement metrics",
        ],
        status: "Complete",
        tags: ["Education", "Economics"],
    },
    {
        id: "teacher-onboarding-study",
        title: "Teacher Onboarding & Governance Tools Study",
        subtitle: "Platform Adoption Research",
        year: "2024",
        duration: "4 weeks",
        sampleSize: "8 teachers, 2 administrators",
        hypothesis: "Teachers given governance tools (curriculum co-design, student feedback dashboards) will show higher platform adoption and satisfaction than those given content-only tools.",
        design: "Comparative study: 4 teachers with full governance tools, 4 with content-only access. Weekly check-ins and end-of-study interviews.",
        metricsTracked: [
            "Platform login frequency",
            "Feature utilization rate",
            "Satisfaction scores (1-10)",
            "Governance tool usage",
            "Curriculum modifications made",
        ],
        findings: "Governance tool group: 8.2/10 satisfaction, 94% weekly active usage. Content-only group: 6.1/10 satisfaction, 71% weekly active usage. Governance group made 3.2x more curriculum adaptations.",
        constraints: [
            "Very small sample size",
            "Single institution context",
            "4-week duration insufficient for habit formation",
        ],
        futureImprovements: [
            "Scale to 50+ teachers across 5 institutions",
            "Measure student outcome correlation with teacher governance engagement",
            "Longitudinal study over full academic year",
        ],
        status: "Complete",
        tags: ["Education", "Technology"],
    },
    {
        id: "governance-framework-pilot",
        title: "Institutional Governance Framework Pilot",
        subtitle: "Constitutional Framework Implementation Study",
        year: "2023",
        duration: "12 weeks",
        sampleSize: "3 institutions, 45 stakeholders",
        hypothesis: "Institutions implementing formal constitutional governance frameworks will show measurable improvements in stakeholder satisfaction and decision transparency.",
        design: "Three institutions adopted GovernanceOS framework with varying levels of implementation. Pre/post surveys and monthly governance audits.",
        metricsTracked: [
            "Stakeholder satisfaction scores",
            "Decision transparency ratings",
            "Governance dispute frequency",
            "Stakeholder participation rates",
            "Implementation fidelity scores",
        ],
        findings: "Average 38% improvement in stakeholder satisfaction. Decision transparency ratings improved from 4.2 to 7.8/10. Governance disputes reduced by 45%. Participation rates increased 2.3x.",
        constraints: [
            "Self-selection bias (motivated institutions opted in)",
            "Short implementation period",
            "Measurement tools not externally validated",
        ],
        futureImprovements: [
            "Randomized assignment to governance conditions",
            "External auditor for measurement validation",
            "2-year longitudinal tracking",
        ],
        status: "Complete",
        tags: ["Governance", "Education"],
    },
];

// ─── PROTOTYPES ──────────────────────────────────────────────────────────────
export const prototypes = [
    {
        id: "classfusion-dashboard",
        title: "ClassFusion Student Dashboard",
        subtitle: "UI Prototype v2.3",
        category: "Platform UI",
        description: "Interactive dashboard prototype showing student progress tracking, token balance, voluntary session scheduling, and peer comparison features.",
        features: ["Progress visualization", "Token economy display", "Session scheduler", "Peer benchmarking", "Achievement system"],
        status: "Prototype",
        techStack: ["React", "Tailwind CSS", "Recharts"],
        tags: ["Education", "Technology"],
    },
    {
        id: "governance-voting-ui",
        title: "Institutional Voting Interface",
        subtitle: "Democratic Decision System",
        category: "Governance UI",
        description: "Prototype voting interface for institutional governance decisions. Supports proposal creation, stakeholder voting, result transparency, and audit trails.",
        features: ["Proposal creation wizard", "Multi-stakeholder voting", "Real-time results", "Audit trail viewer", "Appeals process"],
        status: "Prototype",
        techStack: ["React", "TypeScript", "PostgreSQL"],
        tags: ["Governance", "Technology"],
    },
    {
        id: "token-economy-sim",
        title: "Token Economy Simulator",
        subtitle: "Economic Model Visualization",
        category: "Economic Model",
        description: "Interactive simulation of the ClassFusion token economy — showing how incentive tokens flow between students, teachers, and the institutional treasury.",
        features: ["Token flow visualization", "Parameter adjustment", "Equilibrium modeling", "Inflation/deflation controls", "Stakeholder impact analysis"],
        status: "Simulation",
        techStack: ["Python", "D3.js", "React"],
        tags: ["Economics", "Technology"],
    },
    {
        id: "microinvest-flow",
        title: "MicroInvest Investment Flow",
        subtitle: "Capital Flow Architecture",
        category: "Economic Model",
        description: "Visual model of how micro-investments flow from community investors through milestone verification to school disbursement, with impact reporting loops.",
        features: ["Investment flow diagram", "Milestone tracking", "Impact reporting", "Investor dashboard mockup", "School portal preview"],
        status: "Concept",
        techStack: ["Figma", "React", "D3.js"],
        tags: ["Economics", "Education"],
    },
];

// ─── GOVERNANCE DOCUMENTS ────────────────────────────────────────────────────
export const governanceDocs = [
    {
        id: "student-rights-charter",
        title: "Student Rights Charter",
        subtitle: "Foundational Rights Framework",
        type: "Charter",
        year: "2024",
        abstract: "A comprehensive charter defining the fundamental rights of students within educational institutions — including rights to participation, transparency, appeal, and equitable treatment.",
        version: "v1.2",
        pages: 18,
        tags: ["Rights", "Education"],
    },
    {
        id: "institutional-constitution",
        title: "Model Institutional Constitution",
        subtitle: "Governance Framework Template",
        type: "Constitution",
        year: "2024",
        abstract: "A modular constitutional framework for educational institutions, defining governance structures, stakeholder rights, decision-making processes, and accountability mechanisms.",
        version: "v2.0",
        pages: 34,
        tags: ["Governance", "Constitution"],
    },
    {
        id: "voting-system-design",
        title: "Democratic Voting System Design",
        subtitle: "Institutional Decision Architecture",
        type: "Framework",
        year: "2023",
        abstract: "Design specification for a democratic voting system adapted for educational institutions, covering proposal processes, voting mechanisms, quorum requirements, and result implementation.",
        version: "v1.0",
        pages: 22,
        tags: ["Governance", "Democracy"],
    },
    {
        id: "accountability-model",
        title: "Institutional Accountability Model",
        subtitle: "Transparency & Audit Framework",
        type: "Framework",
        year: "2024",
        abstract: "A framework for institutional accountability in educational settings, including audit mechanisms, transparency requirements, stakeholder reporting, and enforcement protocols.",
        version: "v1.1",
        pages: 27,
        tags: ["Governance", "Accountability"],
    },
    {
        id: "teacher-governance-charter",
        title: "Teacher Governance Charter",
        subtitle: "Educator Rights & Responsibilities",
        type: "Charter",
        year: "2024",
        abstract: "Defines the governance rights and responsibilities of teachers within institutional frameworks, including curriculum autonomy, professional development rights, and participation in institutional decision-making.",
        version: "v1.0",
        pages: 15,
        tags: ["Governance", "Education"],
    },
];

// ─── REFLECTIONS ─────────────────────────────────────────────────────────────
export const reflections = [
    {
        id: "building-institutions-as-student",
        title: "Lessons from Building Institutional Systems as a Student",
        subtitle: "On credibility, constraints, and conviction",
        date: "February 2024",
        readTime: "8 min",
        category: "Institutional Design",
        excerpt: "Building institutional systems without institutional authority is a peculiar exercise. You design governance frameworks that no one is obligated to adopt, write constitutions for organizations that don't yet exist, and propose economic models for markets that haven't formed. And yet, the work is not futile.",
        content: `The first thing you learn when building institutional systems as a student is that credibility is not given — it is constructed, document by document, pilot by pilot, conversation by conversation.

I started GovernanceOS not because I had authority over any institution, but because I noticed a gap: schools make consequential decisions without formal governance structures. Students have no rights charters. Teachers have no constitutional protections. Administrators operate without accountability mechanisms.

The question wasn't whether these systems were needed. The question was whether a student could design them credibly enough for institutions to adopt.

The answer, I've found, is: yes, but only if you treat the work with institutional seriousness. That means rigorous documentation, pilot testing, version control, and the willingness to be wrong publicly.`,
        tags: ["Governance", "Reflection"],
    },
    {
        id: "why-governance-matters-edtech",
        title: "Why Governance Matters in EdTech",
        subtitle: "The missing layer in educational technology",
        date: "January 2024",
        readTime: "6 min",
        category: "EdTech",
        excerpt: "Every EdTech platform I've studied has the same blind spot: they optimize for content delivery and ignore governance. They build sophisticated recommendation engines but leave decision-making power entirely with administrators.",
        content: `EdTech platforms are, at their core, governance systems. They decide what students learn, when they learn it, how they're assessed, and what counts as success. Yet almost none of them have formal governance frameworks.

This is not a minor oversight. It's a fundamental design flaw.

When a platform decides to change its curriculum algorithm, who gets a say? When a teacher disagrees with the platform's assessment of their students, what recourse do they have? When a school wants to customize content for their community's needs, how much autonomy do they retain?

These are governance questions. And most EdTech platforms answer them by default — through the decisions of a small engineering team with no accountability to the communities they serve.`,
        tags: ["EdTech", "Governance"],
    },
    {
        id: "barriers-scaling-youth-innovation",
        title: "Barriers to Scaling Youth Innovation",
        subtitle: "Structural analysis of why good ideas don't scale",
        date: "December 2023",
        readTime: "10 min",
        category: "Systems Thinking",
        excerpt: "Youth innovation fails to scale not because the ideas are bad, but because the systems surrounding young innovators are designed to filter them out. Understanding these structural barriers is the first step to dismantling them.",
        content: `I've spoken with dozens of young innovators working on education, governance, and economic inclusion. Almost universally, their ideas are sophisticated, their analysis is rigorous, and their commitment is genuine.

And almost universally, they hit the same walls.

The credibility wall: Institutions won't engage with ideas from people without institutional credentials. The resource wall: Meaningful research requires funding that youth innovators can't access. The network wall: The people who can help are in rooms that young people aren't invited into.

These aren't individual failures. They're structural features of systems designed to preserve existing power distributions.`,
        tags: ["Systems Thinking", "Governance"],
    },
    {
        id: "institutional-trust-deficits",
        title: "Institutional Trust Deficits in Education",
        subtitle: "Why students don't trust their schools",
        date: "November 2023",
        readTime: "7 min",
        category: "Education",
        excerpt: "Student disengagement is not a motivation problem. It's a trust problem. Students disengage from institutions they don't trust, and they don't trust institutions that don't give them voice, transparency, or accountability.",
        content: `The conventional diagnosis of student disengagement focuses on motivation: students aren't motivated enough, don't see the value of education, are distracted by technology.

This diagnosis is wrong. Or rather, it's incomplete.

Student disengagement is fundamentally a trust problem. Students disengage from institutions they don't trust. And they don't trust institutions that:

- Make decisions without their input
- Don't explain the reasoning behind rules
- Have no accountability mechanisms
- Treat them as subjects rather than stakeholders

The solution isn't better motivation techniques. It's better governance.`,
        tags: ["Education", "Governance"],
    },
];

// ─── ABOUT CONTENT ───────────────────────────────────────────────────────────
export const aboutContent = {
    academic: {
        items: [
            {
                title: "Research Publications",
                subtitle: "Academic & Policy Research · 2023–2024",
                date: "2023–2024",
                type: "list",
                content: [
                    "<strong>Behavioral Incentive Structures in EdTech Platforms</strong> — Framework for sustainable engagement (In Progress)",
                    "<strong>Constitutional Frameworks for Educational Institutions</strong> — Democratic governance design (Draft)",
                    "<strong>Micro-Investment Models for Educational Equity</strong> — Community capital in outcome-based funding (Published)",
                    "<strong>Youth-Led Governance Innovation</strong> — Barriers and pathways (In Progress)",
                ],
                link: "/research",
            },
            {
                title: "Scholarship",
                content: ["Scholarship recipient 2024", "Recognized for academic excellence"]
            },
            {
                title: "A-Levels",
                content: ["Physics", "Maths", "Computer Science"]
            },
            {
                title: "Research Focus",
                content: "Institutional design and behavioral economics"
            },
            {
                title: "Signature Quote",
                content: "life is short sleep is eternal"
            }
        ]
    },
    mission: {
        items: [
            {
                content: `I work at the intersection of education systems, governance innovation, and economic inclusion — designing institutional frameworks, running behavioral pilots, and building technology that makes these systems tangible. My goal is not to build products, but to build infrastructure: the governance frameworks, economic models, and institutional architectures that make equitable education possible at scale.`
            },
            {
                content: [
                    "Designing governance frameworks that give students, teachers, and communities real decision-making power in educational institutions.",
                    "Building economic models that align incentives across all stakeholders in educational ecosystems — from students to investors to policymakers.",
                    "Running behavioral pilots that test theoretical frameworks against real-world constraints, generating evidence for policy and platform design.",
                    "Creating institutional infrastructure — constitutions, charters, accountability models — that educational institutions can adopt and adapt.",
                ]
            }
        ]
    },
    work: {
        items: [
            {
                title: "ClassFusion — Flagship EdTech Platform",
                subtitle: "Founder & Lead Designer · 2024–Present",
                date: "2024",
                type: "list",
                content: [
                    "Designed behavioral incentive architecture integrating token economics with educational engagement",
                    "Built governance model giving teachers, students, and administrators formal decision-making roles",
                    "Ran 6-week pilot with 120 students showing 41% increase in voluntary study engagement",
                    "Developed institutional analytics dashboard for administrators and policymakers",
                ],
                link: "/projects/classfusion",
            },
            {
                title: "GovernanceOS — Institutional Framework",
                subtitle: "Designer & Researcher · 2023–2024",
                date: "2023",
                type: "list",
                content: [
                    "Designed modular constitutional framework for educational institutions",
                    "Created student rights charter, teacher governance charter, and accountability models",
                    "Piloted framework with 3 institutions showing 38% improvement in stakeholder satisfaction",
                    "Published governance design specifications and open-source framework templates",
                ],
                link: "/governance",
            },
            {
                title: "MicroInvest Education Fund",
                subtitle: "Researcher & Economic Designer · 2024",
                date: "2024",
                type: "list",
                content: [
                    "Designed outcome-based micro-investment model for educational funding",
                    "Built economic simulation showing 3x donor retention with accountability mechanisms",
                    "Developed community investment framework with milestone verification system",
                    "Researched regulatory landscape for educational micro-investments",
                ],
                link: "/projects/microinvest",
            },
        ]
    },
    ideas: {
        items: [
            {
                title: "Education as Infrastructure",
                subtitle: "Systems Thinking",
                type: "list",
                content: [
                    "Education systems should be designed like public infrastructure — with formal governance, accountability mechanisms, and stakeholder rights",
                    "The current model treats education as a service delivery problem; it's actually a governance design problem",
                    "Equitable education requires equitable governance — giving communities real power over their educational institutions",
                ],
            },
            {
                title: "Governance as Technology",
                subtitle: "Institutional Design",
                type: "list",
                content: [
                    "Governance frameworks are a form of social technology — they can be designed, tested, iterated, and improved",
                    "Most institutions use governance systems designed centuries ago for different contexts",
                    "Modern institutional design should apply the same rigor to governance that engineers apply to software",
                ],
            },
            {
                title: "Economics of Inclusion",
                subtitle: "Economic Design",
                type: "list",
                content: [
                    "Economic exclusion from education is not inevitable — it's a design choice that can be reversed with better economic models",
                    "Micro-investment and outcome-based funding can align incentives across all stakeholders",
                    "The goal is not charity but structural redesign of educational economics",
                ],
            },
            {
                title: "Behavioral Economics",
                content: ["Incentive design", "Nudging for engagement"]
            },
            {
                title: "Humanitarian Tech",
                content: ["Dignified aid delivery", "Community agency"]
            }
        ]
    },
    interests: {
        items: [
            {
                title: "Research Arsenal",
                subtitle: "Core Interests",
                type: "list",
                content: [
                    "Institutional Economics (Ostrom, North)",
                    "Behavioral Economics (Kahneman, Thaler)",
                    "Constitutional Theory (Rawls, Habermas)",
                    "EdTech Systems Design",
                    "Development Economics",
                    "Game Theory in Social Systems",
                ],
            },

            {
                title: "Research Interests",
                subtitle: "Active Threads",
                type: "list",
                content: [
                    "Democratic governance in non-state institutions",
                    "Behavioral economics of educational engagement",
                    "Community capital and social investment",
                    "Youth participation in institutional design",
                    "Technology-mediated governance systems",
                ],
            },
            {
                title: "Current Focus",
                subtitle: "2024 Priorities",
                type: "paragraph",
                content: "Scaling ClassFusion pilot to 500+ students, completing the GovernanceOS framework documentation, and submitting the behavioral incentives paper for peer review. Also exploring partnerships with educational institutions for longitudinal governance studies.",
            },
        ]
    },
    ventures: {
        description: "Innovative ventures at the intersection of tech and society.",
        items: [
            {
                title: "Fund My Life",
                content: "Exploring transparent tokenomics and community-driven value creation."
            }
        ]
    }
};

// ─── SKILLS ──────────────────────────────────────────────────────────────────
export const skills = [
    { name: "Institutional Design", type: "Governance", imageUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { name: "Behavioral Economics", type: "Research", imageUrl: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png" },
    { name: "Systems Thinking", type: "Methodology", imageUrl: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png" },
    { name: "React", type: "Technology", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "Python", type: "Technology", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Policy Research", type: "Research", imageUrl: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" },
    { name: "Economic Modeling", type: "Economics", imageUrl: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png" },
    { name: "Node.js", type: "Technology", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PostgreSQL", type: "Technology", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Governance Design", type: "Governance", imageUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { name: "Pilot Research", type: "Research", imageUrl: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" },
    { name: "TypeScript", type: "Technology", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
];

export const importantTechIcons = skills.filter(s => s.type === "Technology");

// ─── TIMELINE ────────────────────────────────────────────────────────────────
export const timeline = [
    {
        year: "2023",
        title: "GovernanceOS Framework",
        description: "Designed and piloted the first version of the institutional governance framework with 3 educational institutions.",
        type: "Research",
    },
    {
        year: "2023",
        title: "First Research Publication",
        description: "Published 'Micro-Investment Models for Educational Equity' — first formal research paper on community capital in education.",
        type: "Research",
    },
    {
        year: "2024",
        title: "ClassFusion Launch",
        description: "Launched ClassFusion platform with behavioral incentive system. Ran 6-week pilot with 120 students.",
        type: "Platform",
    },
    {
        year: "2024",
        title: "MicroInvest Framework",
        description: "Designed outcome-based micro-investment model for educational funding. Economic simulation completed.",
        type: "Economics",
    },
    {
        year: "2024",
        title: "Governance Lab Established",
        description: "Formalized the Governance Lab with 5 institutional documents, 4 research papers in progress, and 3 pilot studies complete.",
        type: "Institutional",
    },
];

// ─── WORK & INTERNSHIPS ────────────────────────────────────────────────────
export const experiences = [
    {
        title: "Lead Research Assistant",
        company_name: "Education Design Lab",
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        iconBg: "#f1f5f9",
        date: "Jan 2024 - Present",
        points: [
            "Leading research on behavioral incentive structures for digital learning platforms.",
            "Designing modular governance frameworks for educational institutions (GovernanceOS).",
            "Coordinating pilot studies across multiple institutions to validate systemic hypotheses.",
            "Developing institutional architecture documentation and policy recommendations."
        ],
    },
    {
        title: "Full Stack Developer Intern",
        company_name: "DataByte Solutions",
        icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
        iconBg: "#fdfefe",
        date: "Jun 2023 - Aug 2023",
        points: [
            "Collaborated on building data-driven dashboards using React and Node.js.",
            "Implemented RESTful APIs for efficient data retrieval and processing.",
            "Optimized database queries for improved performance in real-time applications.",
            "Contributed to the development of modular UI components for a scalable platform."
        ],
    },
    {
        title: "Frontend Developer Intern",
        company_name: "Fastech",
        icon: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
        iconBg: "#f8fafc",
        date: "Jun 2022 - Aug 2022",
        points: [
            "Lead Frontend Developer for the MagicTask project, implementing complex UI flows and state management.",
            "Designed and developed the signature 'MCARS' vibrant theme, a futuristic interface oriented towards cognitive ergonomics.",
            "Built responsive and interactive interfaces using modern frontend technologies.",
            "Optimized performance for high-interaction task dashboard components."
        ],
    },
];

// ─── STAKEHOLDER FEEDBACK ──────────────────────────────────────────────────
export const stakeholderFeedback = [
    {
        quote: "Wahib's analytical framework for EdTech transcends typical feature-set design. He approaches the classroom as a complex socio-economic system, identifying behavioral bottlenecks that others overlook. His work on ClassFusion demonstrates a rare maturity in institutional architecture.",
        author: "Principal Educator",
        role: "Institutional Systems Lead",
        icon: "🏛️"
    },
    {
        quote: "The FlowFund model demonstrates a sophisticated understanding of liquidity constraints in non-profit environments. By bridging high-level economic theory with ground-level logistics, Wahib has prototyped a viable alternative to episodic aid cycles.",
        author: "Program Director",
        role: "Strategic Operations Partner",
        icon: "📈"
    },
    {
        quote: "In observing the MagicTask development process, it's clear Wahib prioritizes cognitive ergonomics over mere utility. He designs for the human psyche as much as for the platform, ensuring that technology serves as a stabilizer for executive function.",
        author: "Senior Software Architect",
        role: "Technical Governance Lead",
        icon: "🧠"
    }
];

// ─── COMPATIBILITY LAYER (for legacy components) ───────────────────────────
export const pageTexts = {
    about: {
        introduction: "I work at the intersection of education systems, governance innovation, and economic inclusion.",
        name: "Wahib",
        greeting: "Welcome to the Lab",
    }
};