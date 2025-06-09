export interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: string;
  description: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

export interface BusinessImpact {
  metric: string;
  before: string;
  after: string;
  improvement: string;
  category: 'time' | 'cost' | 'satisfaction' | 'revenue';
}

export const heroMetrics: Metric[] = [
  {
    id: 'onboarding-time',
    label: 'Developer Onboarding Time',
    value: '< 20 min',
    change: '99% reduction',
    description: 'From 3 business days to under 20 minutes',
    icon: 'Clock',
    trend: 'up',
    color: 'green'
  },
  {
    id: 'support-tickets',
    label: 'API Support Tickets',
    value: '73%',
    change: 'reduction',
    description: 'Decreased from 25% to 10% of all tickets',
    icon: 'TrendingDown',
    trend: 'up',
    color: 'blue'
  },
  {
    id: 'conversion-rate',
    label: 'Playground to Subscription',
    value: '28%',
    change: '4x increase',
    description: 'Up from 7% with interactive playground',
    icon: 'TrendingUp',
    trend: 'up',
    color: 'purple'
  },
  {
    id: 'nps-score',
    label: 'Developer NPS',
    value: '+72',
    change: '+27 points',
    description: 'From 45 (Detractor) to 72 (Promoter)',
    icon: 'Star',
    trend: 'up',
    color: 'orange'
  }
];

export const businessImpactMetrics: BusinessImpact[] = [
  {
    metric: 'Time to First API Call',
    before: '~3 business days',
    after: '< 15 minutes',
    improvement: '> 99% reduction',
    category: 'time'
  },
  {
    metric: 'Support Tickets (Token Issues)',
    before: '37 / month',
    after: '< 10 / month',
    improvement: '~73% reduction',
    category: 'cost'
  },
  {
    metric: 'Playground-to-Sub Conversion',
    before: '7% (from marketing page)',
    after: '28%',
    improvement: '4x increase',
    category: 'revenue'
  },
  {
    metric: 'Integration NPS',
    before: '45 (Detractor)',
    after: '72 (Promoter)',
    improvement: '+27 points',
    category: 'satisfaction'
  },
  {
    metric: 'Enterprise CLI Adoption',
    before: '0%',
    after: '7 of top 10 accounts',
    improvement: 'New Power-User Channel',
    category: 'revenue'
  }
];

export const designProcessMetrics = {
  research: {
    userInterviews: 5,
    personas: 4,
    journeyMaps: 3,
    painPoints: 12
  },
  design: {
    wireframes: 15,
    prototypes: 8,
    iterations: 6,
    components: 45
  },
  validation: {
    usabilityTests: 8,
    a11yScore: 95,
    performanceScore: 92,
    mobileOptimized: true
  }
};

export const platformMetrics = {
  apiPortal: {
    apis: 12,
    endpoints: 180,
    developers: 1200,
    requests: '2.5M/month'
  },
  rbac: {
    users: 847,
    roles: 8,
    permissions: 24,
    modules: 4
  }
}; 