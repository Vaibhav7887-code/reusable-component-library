// Core Types for API Portal System
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  organizationId: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: SubscriptionPlan;
  createdAt: Date;
  members: User[];
}

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ApiCategory;
  tags: string[];
  version: string;
  status: ApiStatus;
  accessLevel: AccessLevel;
  pricing: PricingTier[];
  endpoints: ApiEndpoint[];
  documentation: string;
  examples: CodeExample[];
  rateLimit: RateLimit;
  scopes: string[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  description: string;
  parameters: Parameter[];
  requestBody?: RequestBody;
  responses: ApiResponse[];
  requiredScopes: string[];
  examples: EndpointExample[];
}

export interface Parameter {
  name: string;
  in: 'query' | 'path' | 'header';
  required: boolean;
  type: string;
  description: string;
  example?: any;
  schema?: any;
}

export interface RequestBody {
  required: boolean;
  content: {
    [mediaType: string]: {
      schema: any;
      example?: any;
    };
  };
}

export interface ApiResponse {
  status: number;
  description: string;
  content?: {
    [mediaType: string]: {
      schema: any;
      example?: any;
    };
  };
}

export interface EndpointExample {
  title: string;
  description: string;
  request: {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: any;
  };
  response: {
    status: number;
    headers?: Record<string, string>;
    body: any;
  };
}

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  maskedKey: string;
  scopes: string[];
  status: KeyStatus;
  organizationId: string;
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  usageCount: number;
  description?: string;
  environment: Environment;
}

export interface ApiSubscription {
  id: string;
  organizationId: string;
  apiProductId: string;
  planId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  usage: UsageMetrics;
}

export interface UsageMetrics {
  current: number;
  limit: number;
  period: 'hour' | 'day' | 'month';
  timestamp: Date;
  breakdown: {
    endpoint: string;
    count: number;
  }[];
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    requests: number;
    period: 'hour' | 'day' | 'month';
    rateLimit: number;
  };
}

export interface AuditEvent {
  id: string;
  organizationId: string;
  userId: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  metadata: Record<string, any>;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
}

export interface CodeExample {
  language: 'curl' | 'javascript' | 'python' | 'go' | 'java';
  title: string;
  code: string;
  description?: string;
}

export interface PlaygroundRequest {
  id: string;
  endpoint: ApiEndpoint;
  parameters: Record<string, any>;
  headers: Record<string, string>;
  body?: any;
  timestamp: Date;
}

export interface PlaygroundResponse {
  id: string;
  requestId: string;
  status: number;
  headers: Record<string, string>;
  body: any;
  duration: number;
  timestamp: Date;
  error?: string;
}

export interface RateLimit {
  requests: number;
  period: 'minute' | 'hour' | 'day';
  burst?: number;
}

// Enums
export type UserRole = 'owner' | 'admin' | 'developer' | 'viewer';

export type ApiCategory = 'telemetry' | 'logistics' | 'analytics' | 'integration';

export type ApiStatus = 'active' | 'deprecated' | 'beta' | 'coming-soon';

export type AccessLevel = 'public' | 'partner' | 'private';

export type KeyStatus = 'active' | 'expired' | 'revoked' | 'expiring-soon';

export type Environment = 'development' | 'staging' | 'production';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export type AuditAction = 
  | 'api_key.created'
  | 'api_key.deleted' 
  | 'api_key.rotated'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.canceled'
  | 'user.invited'
  | 'user.removed'
  | 'organization.updated';

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  suggestions?: string[];
  docsUrl?: string;
}

export interface PlaygroundError extends ApiError {
  requestId: string;
  endpoint: string;
  statusCode: number;
} 