import { 
  ApiProduct, 
  ApiKey, 
  ApiSubscription, 
  UsageMetrics, 
  AuditEvent, 
  Organization,
  User,
  ApiEndpoint,
  CodeExample,
  PricingTier,
  PlaygroundRequest,
  PlaygroundResponse,
  ApiError
} from '@/types/api-portal';

// Mock Data
export const mockOrganization: Organization = {
  id: 'org_1',
  name: 'Partner Inc.',
  slug: 'partner-inc',
  plan: 'pro',
  createdAt: new Date('2024-01-01'),
  members: []
};

export const mockUser: User = {
  id: 'user_1',
  name: 'Alex Developer',
  email: 'alex@partner-inc.com',
  role: 'admin',
  organizationId: 'org_1',
  createdAt: new Date('2024-01-01'),
  lastLoginAt: new Date()
};

export const mockApiProducts: ApiProduct[] = [
  {
    id: 'api_vehicle_telemetry',
    name: 'Vehicle Telemetry API',
    description: 'Real-time location, speed, fuel level, and sensor data from your fleet vehicles.',
    icon: 'satellite',
    category: 'telemetry',
    tags: ['Real-Time', 'Vehicles', 'Data', 'GPS'],
    version: '2.1.0',
    status: 'active',
    accessLevel: 'public',
    documentation: `# Vehicle Telemetry API

Access real-time and historical telemetry data from your fleet vehicles.

## Authentication
All requests require a valid API key in the \`Authorization\` header:
\`\`\`
Authorization: Bearer fe_sk_your_api_key_here
\`\`\`

## Rate Limits
- Free tier: 1,000 requests/day
- Pro tier: 10,000 requests/day
- Enterprise: Custom limits

## Base URL
\`https://api.fleetedge.com/v2/telemetry\``,
    pricing: [
      {
        id: 'free_telemetry',
        name: 'Free',
        description: 'Perfect for testing and small applications',
        price: 0,
        currency: 'USD',
        interval: 'month',
        features: ['1,000 requests/day', 'Basic support', '7-day data retention'],
        limits: { requests: 1000, period: 'day', rateLimit: 10 }
      },
      {
        id: 'pro_telemetry',
        name: 'Pro',
        description: 'For production applications with moderate usage',
        price: 99,
        currency: 'USD',
        interval: 'month',
        features: ['10,000 requests/day', 'Priority support', '30-day data retention', 'Webhooks'],
        limits: { requests: 10000, period: 'day', rateLimit: 100 }
      },
      {
        id: 'enterprise_telemetry', 
        name: 'Enterprise',
        description: 'Custom solutions for large-scale operations',
        price: 499,
        currency: 'USD',
        interval: 'month',
        features: ['Unlimited requests', '24/7 support', 'Custom retention', 'SLA guarantee'],
        limits: { requests: -1, period: 'day', rateLimit: 1000 }
      }
    ],
    endpoints: [
      {
        id: 'get_vehicle',
        method: 'GET',
        path: '/vehicles/{vin}',
        summary: 'Get vehicle information',
        description: 'Retrieve detailed information about a specific vehicle by VIN',
        parameters: [
          {
            name: 'vin',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Vehicle Identification Number',
            example: '1HGBH41JXMN109186'
          },
          {
            name: 'include',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Additional data to include (location,fuel,diagnostics)',
            example: 'location,fuel'
          }
        ],
        responses: [
          {
            status: 200,
            description: 'Vehicle information retrieved successfully',
            content: {
              'application/json': {
                schema: {},
                example: {
                  vin: '1HGBH41JXMN109186',
                  make: 'Honda',
                  model: 'Accord',
                  year: 2023,
                  status: 'active',
                  location: {
                    lat: 40.7128,
                    lng: -74.0060,
                    timestamp: '2024-01-15T10:30:00Z'
                  }
                }
              }
            }
          },
          {
            status: 404,
            description: 'Vehicle not found'
          }
        ],
        requiredScopes: ['vehicles:read'],
        examples: [
          {
            title: 'Basic vehicle lookup',
            description: 'Get basic vehicle information',
            request: {
              method: 'GET',
              url: '/vehicles/1HGBH41JXMN109186',
              headers: { 'Authorization': 'Bearer fe_sk_...' }
            },
            response: {
              status: 200,
              body: {
                vin: '1HGBH41JXMN109186',
                make: 'Honda',
                model: 'Accord',
                year: 2023,
                status: 'active'
              }
            }
          }
        ]
      },
      {
        id: 'get_vehicle_location',
        method: 'GET',
        path: '/vehicles/{vin}/location',
        summary: 'Get current vehicle location',
        description: 'Get the real-time location of a vehicle',
        parameters: [
          {
            name: 'vin',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Vehicle Identification Number',
            example: '1HGBH41JXMN109186'
          }
        ],
        responses: [
          {
            status: 200,
            description: 'Location retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    vin: { type: 'string' },
                    location: {
                      type: 'object',
                      properties: {
                        lat: { type: 'number' },
                        lng: { type: 'number' },
                        speed: { type: 'number' },
                        heading: { type: 'number' },
                        timestamp: { type: 'string', format: 'date-time' }
                      }
                    }
                  }
                },
                example: {
                  vin: '1HGBH41JXMN109186',
                  location: {
                    lat: 40.7128,
                    lng: -74.0060,
                    speed: 45.5,
                    heading: 180,
                    timestamp: '2024-01-15T10:30:00Z'
                  }
                }
              }
            }
          }
        ],
        requiredScopes: ['vehicles:read', 'location:read'],
        examples: []
      }
    ],
    rateLimit: { requests: 100, period: 'minute' },
    scopes: ['vehicles:read', 'location:read', 'fuel:read', 'diagnostics:read'],
    examples: [
      {
        language: 'curl',
        title: 'Get Vehicle Info',
        code: `curl -X GET "https://api.fleetedge.com/v2/telemetry/vehicles/1HGBH41JXMN109186" \\
  -H "Authorization: Bearer fe_sk_your_api_key_here" \\
  -H "Content-Type: application/json"`
      },
      {
        language: 'javascript',
        title: 'Get Vehicle Info (JavaScript)',
        code: `const response = await fetch('https://api.fleetedge.com/v2/telemetry/vehicles/1HGBH41JXMN109186', {
  headers: {
    'Authorization': 'Bearer fe_sk_your_api_key_here',
    'Content-Type': 'application/json'
  }
});
const vehicle = await response.json();
console.log(vehicle);`
      },
      {
        language: 'python',
        title: 'Get Vehicle Info (Python)',
        code: `import requests

response = requests.get(
    'https://api.fleetedge.com/v2/telemetry/vehicles/1HGBH41JXMN109186',
    headers={
        'Authorization': 'Bearer fe_sk_your_api_key_here',
        'Content-Type': 'application/json'
    }
)
vehicle = response.json()
print(vehicle)`
      }
    ]
  },
  {
    id: 'api_route_optimization',
    name: 'Route Optimization API',
    description: 'Calculate the most efficient routes for your fleet using advanced algorithms.',
    icon: 'navigation',
    category: 'logistics',
    tags: ['Logistics', 'Planning', 'Efficiency', 'Routes'],
    version: '1.3.0',
    status: 'active',
    accessLevel: 'public',
    documentation: '# Route Optimization API\n\nOptimize routes for maximum efficiency...',
    pricing: [
      {
        id: 'basic_routing',
        name: 'Basic',
        description: 'Essential routing for small fleets',
        price: 49,
        currency: 'USD',
        interval: 'month',
        features: ['500 route calculations/month', 'Basic optimization', 'Email support'],
        limits: { requests: 500, period: 'month', rateLimit: 5 }
      }
    ],
    endpoints: [],
    rateLimit: { requests: 50, period: 'minute' },
    scopes: ['routes:read', 'routes:create'],
    examples: []
  },
  {
    id: 'api_analytics',
    name: 'Fleet Analytics API',
    description: 'Advanced analytics and reporting for fleet performance insights.',
    icon: 'chart-bar',
    category: 'analytics',
    tags: ['Analytics', 'Reports', 'Insights', 'Performance'],
    version: '2.0.0',
    status: 'beta',
    accessLevel: 'partner',
    documentation: '# Fleet Analytics API\n\nGet deep insights into your fleet performance...',
    pricing: [],
    endpoints: [],
    rateLimit: { requests: 25, period: 'minute' },
    scopes: ['analytics:read'],
    examples: []
  }
];

export const mockApiKeys: ApiKey[] = [
  {
    id: 'key_1',
    name: 'Production App',
    keyPrefix: 'fe_sk_prod',
    maskedKey: 'fe_sk_prod_••••••••••••xxxx',
    scopes: ['vehicles:read', 'location:read', 'fuel:read'],
    status: 'active',
    organizationId: 'org_1',
    createdBy: 'user_1',
    createdAt: new Date('2024-01-01'),
    expiresAt: new Date('2024-07-01'),
    lastUsedAt: new Date('2024-01-15T10:30:00Z'),
    usageCount: 8450,
    description: 'Main production application key',
    environment: 'production'
  },
  {
    id: 'key_2',
    name: 'Staging Tester',
    keyPrefix: 'fe_sk_stag',
    maskedKey: 'fe_sk_stag_••••••••••••yyyy',
    scopes: ['vehicles:read'],
    status: 'active',
    organizationId: 'org_1',
    createdBy: 'user_1',
    createdAt: new Date('2024-01-10'),
    lastUsedAt: new Date('2024-01-13T15:20:00Z'),
    usageCount: 150,
    environment: 'staging'
  },
  {
    id: 'key_3',
    name: 'Old Development Key',
    keyPrefix: 'fe_sk_dev',
    maskedKey: 'fe_sk_dev_••••••••••••zzzz',
    scopes: ['vehicles:read'],
    status: 'expiring-soon',
    organizationId: 'org_1',
    createdBy: 'user_1',
    createdAt: new Date('2023-12-01'),
    expiresAt: new Date('2024-02-01'),
    lastUsedAt: new Date('2024-01-01T09:15:00Z'),
    usageCount: 25,
    environment: 'development'
  }
];

export const mockUsageMetrics: UsageMetrics = {
  current: 8450,
  limit: 10000,
  period: 'month',
  timestamp: new Date(),
  breakdown: [
    { endpoint: '/vehicles/{vin}', count: 5200 },
    { endpoint: '/vehicles/{vin}/location', count: 2100 },
    { endpoint: '/vehicles/{vin}/fuel', count: 850 },
    { endpoint: '/vehicles/search', count: 300 }
  ]
};

export const mockAuditEvents: AuditEvent[] = [
  {
    id: 'audit_1',
    organizationId: 'org_1',
    userId: 'user_1',
    action: 'api_key.created',
    resource: 'api_key',
    resourceId: 'key_1',
    metadata: { keyName: 'Production App', scopes: ['vehicles:read'] },
    timestamp: new Date('2024-01-01T10:00:00Z'),
    userAgent: 'Mozilla/5.0...',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'audit_2',
    organizationId: 'org_1',
    userId: 'user_1',
    action: 'api_key.rotated',
    resource: 'api_key',
    resourceId: 'key_2',
    metadata: { oldKeyId: 'key_2_old', newKeyId: 'key_2', gracePeriod: '24h' },
    timestamp: new Date('2024-01-10T14:30:00Z'),
    userAgent: 'FleetEdge CLI v1.2.0',
    ipAddress: '192.168.1.100'
  }
];

// API Functions
export class ApiPortalService {
  // API Products
  static async getApiProducts(): Promise<ApiProduct[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockApiProducts;
  }

  static async getApiProduct(id: string): Promise<ApiProduct | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockApiProducts.find(api => api.id === id) || null;
  }

  // API Keys
  static async getApiKeys(organizationId: string): Promise<ApiKey[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockApiKeys.filter(key => key.organizationId === organizationId);
  }

  static async createApiKey(data: {
    name: string;
    scopes: string[];
    expiresAt?: Date;
    description?: string;
    environment: string;
  }): Promise<{ key: ApiKey; secret: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const keyId = `key_${Date.now()}`;
    const secret = `fe_sk_${data.environment}_${Math.random().toString(36).substring(2, 15)}`;
    
    const newKey: ApiKey = {
      id: keyId,
      name: data.name,
      keyPrefix: secret.substring(0, 12),
      maskedKey: `${secret.substring(0, 12)}••••••••••••${secret.slice(-4)}`,
      scopes: data.scopes,
      status: 'active',
      organizationId: mockOrganization.id,
      createdBy: mockUser.id,
      createdAt: new Date(),
      expiresAt: data.expiresAt,
      usageCount: 0,
      description: data.description,
      environment: data.environment as any
    };

    return { key: newKey, secret };
  }

  static async rotateApiKey(keyId: string, gracePeriodHours: number = 0): Promise<{ oldKey: ApiKey; newKey: ApiKey; secret: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const oldKey = mockApiKeys.find(k => k.id === keyId);
    if (!oldKey) throw new Error('Key not found');

    const secret = `fe_sk_${oldKey.environment}_${Math.random().toString(36).substring(2, 15)}`;
    const newKey: ApiKey = {
      ...oldKey,
      id: `${keyId}_new`,
      keyPrefix: secret.substring(0, 12),
      maskedKey: `${secret.substring(0, 12)}••••••••••••${secret.slice(-4)}`,
      createdAt: new Date(),
      usageCount: 0
    };

    return { oldKey, newKey, secret };
  }

  static async deleteApiKey(keyId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulate deletion
  }

  // Usage & Analytics
  static async getUsageMetrics(organizationId: string, keyId?: string): Promise<UsageMetrics> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockUsageMetrics;
  }

  static async getAuditEvents(organizationId: string, limit: number = 50): Promise<AuditEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockAuditEvents.slice(0, limit);
  }

  // Playground
  static async executePlaygroundRequest(request: PlaygroundRequest): Promise<PlaygroundResponse> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
    
    // Simulate different responses based on endpoint
    const isSuccess = Math.random() > 0.2; // 80% success rate
    
    if (!isSuccess) {
      const errors: ApiError[] = [
        {
          code: 'INVALID_API_KEY',
          message: 'The provided API key is invalid or has expired.',
          suggestions: ['Check that your API key is correct', 'Ensure the key has not expired', 'Verify the key has the required scopes'],
          docsUrl: 'https://docs.fleetedge.com/authentication'
        },
        {
          code: 'INSUFFICIENT_SCOPE',
          message: 'Your API key does not have the required scope for this operation.',
          details: { required: ['vehicles:read'], provided: ['vehicles:write'] },
          suggestions: ['Generate a new key with the required scopes', 'Update your existing key permissions'],
          docsUrl: 'https://docs.fleetedge.com/scopes'
        },
        {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'You have exceeded the rate limit for your current plan.',
          details: { limit: 100, window: '1 hour', retryAfter: 1800 },
          suggestions: ['Wait before making more requests', 'Upgrade your plan for higher limits', 'Implement exponential backoff'],
          docsUrl: 'https://docs.fleetedge.com/rate-limits'
        }
      ];
      
      const error = errors[Math.floor(Math.random() * errors.length)];
      
      return {
        id: `resp_${Date.now()}`,
        requestId: request.id,
        status: error.code === 'RATE_LIMIT_EXCEEDED' ? 429 : error.code === 'INSUFFICIENT_SCOPE' ? 403 : 401,
        headers: { 'content-type': 'application/json' },
        body: { error },
        duration: Math.random() * 500 + 100,
        timestamp: new Date(),
        error: error.message
      };
    }

    // Success responses
    const mockResponses = {
      '/vehicles/{vin}': {
        vin: request.parameters.vin || '1HGBH41JXMN109186',
        make: 'Honda',
        model: 'Accord',
        year: 2023,
        status: 'active',
        location: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.01,
          lng: -74.0060 + (Math.random() - 0.5) * 0.01,
          timestamp: new Date().toISOString()
        },
        fuel: {
          level: Math.floor(Math.random() * 100),
          efficiency: 28.5
        }
      },
      '/vehicles/{vin}/location': {
        vin: request.parameters.vin || '1HGBH41JXMN109186',
        location: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.01,
          lng: -74.0060 + (Math.random() - 0.5) * 0.01,
          speed: Math.floor(Math.random() * 70),
          heading: Math.floor(Math.random() * 360),
          timestamp: new Date().toISOString()
        }
      }
    };

    const responseBody = mockResponses[request.endpoint.path as keyof typeof mockResponses] || { message: 'Success' };

    return {
      id: `resp_${Date.now()}`,
      requestId: request.id,
      status: 200,
      headers: {
        'content-type': 'application/json',
        'x-ratelimit-remaining': '99',
        'x-ratelimit-reset': (Date.now() + 3600000).toString()
      },
      body: responseBody,
      duration: Math.random() * 1000 + 200,
      timestamp: new Date()
    };
  }

  // Subscriptions
  static async getSubscriptions(organizationId: string): Promise<ApiSubscription[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: 'sub_1',
        organizationId,
        apiProductId: 'api_vehicle_telemetry',
        planId: 'pro_telemetry',
        status: 'active',
        createdAt: new Date('2024-01-01'),
        currentPeriodStart: new Date('2024-01-01'),
        currentPeriodEnd: new Date('2024-02-01'),
        usage: mockUsageMetrics
      }
    ];
  }

  static async createSubscription(data: {
    apiProductId: string;
    planId: string;
  }): Promise<ApiSubscription> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: `sub_${Date.now()}`,
      organizationId: mockOrganization.id,
      apiProductId: data.apiProductId,
      planId: data.planId,
      status: 'active',
      createdAt: new Date(),
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      usage: {
        current: 0,
        limit: 10000,
        period: 'month',
        timestamp: new Date(),
        breakdown: []
      }
    };
  }
} 