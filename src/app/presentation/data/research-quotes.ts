export interface ResearchQuote {
  id: string;
  quote: string;
  speaker: string;
  role: string;
  context: string;
  category: 'trust' | 'frustration' | 'need' | 'insight';
  system: 'api-portal' | 'rbac' | 'both';
}

export interface ResearchFinding {
  id: string;
  title: string;
  description: string;
  evidence: string[];
  impact: string;
  designImplication: string;
}

export const researchQuotes: ResearchQuote[] = [
  {
    id: 'trust-first-impression',
    quote: "If I can't find your API docs from the homepage in two clicks, I'm gone. It tells me you don't actually care about developers.",
    speaker: 'Alex',
    role: 'Senior Developer',
    context: 'API Portal discovery experience',
    category: 'trust',
    system: 'api-portal'
  },
  {
    id: 'black-box-fear',
    quote: "The absolute worst is `400 Bad Request`. It's useless. Is my JSON malformed? Is a parameter wrong? Did I use a string instead of an int? I have to guess.",
    speaker: 'Alex',
    role: 'Senior Developer',
    context: 'API debugging experience',
    category: 'frustration',
    system: 'api-portal'
  },
  {
    id: 'scope-confusion',
    quote: "I once spent a whole day on an error that ended up being a missing scope on my API key. The docs never mentioned it.",
    speaker: 'Priya',
    role: 'Junior Developer',
    context: 'API authentication issues',
    category: 'frustration',
    system: 'api-portal'
  },
  {
    id: 'security-responsibility',
    quote: "Do I want to rotate my keys? Yes. Do I do it as often as I should? No. I'm always terrified it's going to break something in production.",
    speaker: 'Alex',
    role: 'Senior Developer',
    context: 'API key management',
    category: 'need',
    system: 'api-portal'
  },
  {
    id: 'golden-path',
    quote: "When I start with a new API, I just look for the 'Quick Start' guide. I want to find a cURL command I can copy, see it work, and then adapt it for my code.",
    speaker: 'Priya',
    role: 'Junior Developer',
    context: 'API onboarding experience',
    category: 'need',
    system: 'api-portal'
  },
  {
    id: 'permission-complexity',
    quote: "I don't have time to figure out complex permissions. I'm dealing with daily operational fires.",
    speaker: 'Sarah',
    role: 'Fleet Manager',
    context: 'RBAC daily usage',
    category: 'frustration',
    system: 'rbac'
  },
  {
    id: 'access-anxiety',
    quote: "I'm afraid of giving too much access and creating problems. I need confidence that my decisions won't create compliance issues.",
    speaker: 'Sarah',
    role: 'Fleet Manager',
    context: 'Role assignment decisions',
    category: 'need',
    system: 'rbac'
  },
  {
    id: 'user-workflow-impact',
    quote: "Users complain about missing features they should have. Wrong permissions break their daily workflows.",
    speaker: 'Maya',
    role: 'Product Operations',
    context: 'User support and troubleshooting',
    category: 'insight',
    system: 'rbac'
  },
  {
    id: 'compliance-pressure',
    quote: "Manual permission reviews take too long. I need to prove compliance to auditors quarterly. Regulatory violations can cost millions.",
    speaker: 'Raj',
    role: 'IT Manager',
    context: 'Compliance and audit requirements',
    category: 'need',
    system: 'rbac'
  }
];

export const researchFindings: ResearchFinding[] = [
  {
    id: 'trust-first-five-minutes',
    title: 'Trust is earned in the first 5 minutes, or lost forever',
    description: 'Developers make snap judgments about platform quality and reliability based on initial experience',
    evidence: [
      'Poor initial experience leads to immediate abandonment',
      'Confusing docs or no clear API key path = platform abandonment',
      'Quality perception formed within minutes'
    ],
    impact: 'High developer churn, lost potential integrations',
    designImplication: 'Prioritized self-serve key generation and interactive playground for immediate value'
  },
  {
    id: 'black-box-problem',
    title: 'Developers fear the "black box" of generic errors',
    description: 'Generic error messages create frustrating trial-and-error debugging cycles',
    evidence: [
      '70% of first API calls to new platforms fail',
      'Most common reasons: unclear auth instructions, missing parameters',
      'Hours wasted on preventable debugging'
    ],
    impact: 'Developer frustration, support ticket volume, platform abandonment',
    designImplication: 'Designed actionable error messages and interactive trace/playground'
  },
  {
    id: 'security-tools-expectation',
    title: 'Security is shared responsibility, but developers expect platform tools',
    description: 'Developers know best practices but will take shortcuts if platform doesn\'t provide secure, easy tools',
    evidence: [
      'Want to rotate keys but afraid of breaking production',
      'Will paste secrets insecurely if it\'s the easiest path',
      'Expect platform to provide secure tooling'
    ],
    impact: 'Security vulnerabilities, poor key hygiene practices',
    designImplication: 'Key rotation UX with grace period, scoped keys, usage analytics'
  },
  {
    id: 'golden-path-dependency',
    title: 'Junior developers rely on a "golden path"',
    description: 'Less experienced developers want clear step-by-step guidance rather than exploration',
    evidence: [
      'Look for Quick Start guides first',
      'Want copy-pasteable code examples',
      'Rely heavily on clear tutorials'
    ],
    impact: 'Junior developer adoption rates, support burden',
    designImplication: 'Docs-first journey with prominent code examples in multiple languages'
  }
];

export const userJourneyInsights = {
  painPoints: [
    'API keys take too long to get (3 days → manual process)',
    'Generic error messages provide no debugging help',
    'No way to test APIs before committing/paying',
    'Permission complexity overwhelms non-technical users',
    'No visibility into who has what access'
  ],
  designOpportunities: [
    'Self-serve API key generation with instant access',
    'Interactive playground for immediate testing',
    'Actionable error messages with suggested fixes',
    'Role templates for common permission patterns',
    'Visual permission matrix for enterprise oversight'
  ]
}; 