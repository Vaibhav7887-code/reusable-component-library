export interface Persona {
  id: string;
  name: string;
  role: string;
  type: 'primary' | 'secondary' | 'external';
  avatar: string;
  description: string;
  goals: string[];
  frustrations: string[];
  needs: string[];
  context: string;
  keyInsights: string[];
  quotes: string[];
}

export const personas: Persona[] = [
  {
    id: 'alex-developer',
    name: 'Alex',
    role: 'External Developer',
    type: 'primary',
    avatar: 'AS',
    description: 'Software engineer at a third-party company building new features that rely on FleetEdge data',
    goals: [
      'Get vehicle telematics data into application quickly',
      'Build prototype to prove project value',
      'Ship feature on time with reliable integration'
    ],
    frustrations: [
      'Ambiguous instructions and slow UIs',
      'Having to talk to sales just to try an API',
      'Waiting for people and manual processes',
      'Fear of wasting time on dead-end integrations'
    ],
    needs: [
      'Fast, frictionless, and reliable way to access fleet data',
      'Clear documentation and self-service tools',
      'Elegant APIs with automation capabilities'
    ],
    context: 'Technically proficient, lives in IDE and terminal, values speed and efficiency',
    keyInsights: [
      'Values clear documentation over sales calls',
      'Needs self-service tools and automation',
      'Fears unreliable or poorly documented APIs'
    ],
    quotes: [
      "If I can't find your API docs from the homepage in two clicks, I'm gone.",
      "The absolute worst is '400 Bad Request'. It's useless.",
      "I need a fast, frictionless way to access fleet data so I can prove the value of my project."
    ]
  },
  {
    id: 'sarah-admin',
    name: 'Sarah',
    role: 'Fleet Operations Manager',
    type: 'primary',
    avatar: 'SM',
    description: 'Responsible for day-to-day fleet operations, ensuring right people have right access',
    goals: [
      'Assign roles quickly without complex permissions',
      'Ensure access decisions won\'t create problems later',
      'Manage 500+ users across 3 vehicle types efficiently'
    ],
    frustrations: [
      "Can't quickly understand what each role actually does",
      'Accidentally gives too much or too little access',
      'No way to bulk-manage seasonal workers',
      "Can't see blast radius of permission changes"
    ],
    needs: [
      'Confidence that access decisions are correct',
      'Role templates over complex customization',
      'Safety rails to prevent mistakes'
    ],
    context: 'Non-technical background, dealing with daily operational fires, compliance-focused',
    keyInsights: [
      'Prefers templates over customization',
      'Needs safety rails to prevent mistakes',
      'Values speed but prioritizes correctness'
    ],
    quotes: [
      "I don't have time to figure out complex permissions.",
      "I'm afraid of giving too much access and creating problems.",
      "I need confidence that my access decisions won't create compliance issues."
    ]
  },
  {
    id: 'maya-product-ops',
    name: 'Maya',
    role: 'Product Operations',
    type: 'secondary',
    avatar: 'MP',
    description: 'Ensures users can do their jobs effectively, bridges business and tech',
    goals: [
      'Preview what users see with their permissions',
      'Ensure permission changes enhance productivity',
      'Support 50+ customers effectively'
    ],
    frustrations: [
      "Can't easily test permission combinations",
      'No way to communicate changes to affected users',
      'Difficult to understand cross-module dependencies'
    ],
    needs: [
      'Assurance that permission changes enhance workflows',
      'Tools to test and preview user experiences',
      'Clear communication about changes'
    ],
    context: 'Supports customers, understands user workflows intimately, UX advocate',
    keyInsights: [
      'Thinks from user perspective first',
      'Needs to quickly test access scenarios',
      'Values clear communication about changes'
    ],
    quotes: [
      "Users complain about missing features they should have.",
      "Wrong permissions break their daily workflows.",
      "I need to see exactly what the user's permissions allow."
    ]
  },
  {
    id: 'raj-it-manager',
    name: 'Raj',
    role: 'IT Security Manager',
    type: 'secondary',
    avatar: 'RM',
    description: 'Ensures security compliance, maintains audit trails, technical oversight',
    goals: [
      'Prove compliance to auditors quarterly',
      'Maintain bulletproof evidence of access compliance',
      'Prevent privilege creep across the organization'
    ],
    frustrations: [
      'No way to track permission changes over time',
      "Can't identify users with excessive permissions",
      'Manual reviews are error-prone and slow'
    ],
    needs: [
      'Bulletproof evidence for compliance audits',
      'Exportable, timestamped data',
      'Consistency and standardization'
    ],
    context: 'Reports to CISO, manages enterprise security, compliance-focused',
    keyInsights: [
      'Thinks in terms of risk and compliance frameworks',
      'Needs exportable, timestamped data',
      'Values consistency and standardization'
    ],
    quotes: [
      "Manual permission reviews take too long.",
      "I need to prove compliance to auditors quarterly.",
      "Regulatory violations can cost millions in fines."
    ]
  }
];

export const personasBySystem = {
  apiPortal: ['alex-developer'],
  rbac: ['sarah-admin', 'maya-product-ops', 'raj-it-manager'],
  both: ['alex-developer'] // Alex uses both systems as technical user
};

export const personaInsights = {
  keyFindings: [
    'Trust is earned in the first 5 minutes, or lost forever',
    'Developers fear the "black box" of generic error messages',
    'Security is shared responsibility - platform must provide tools',
    'Junior developers rely on a "golden path" approach'
  ],
  behavioralPatterns: [
    'CLI-First Power User (Alex)',
    'Docs-First Explorer (Priya)',
    'UI-First Visual Learner'
  ]
}; 