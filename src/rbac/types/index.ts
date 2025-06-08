// Core RBAC Types for FleetEdge
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  modules: ModuleAccess[];
  lastLogin: Date | null;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  department?: string;
  employeeId?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  color: BadgeVariant;
  userCount: number;
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: Module;
  action: PermissionAction;
  resource?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  permissions: Permission[];
}

export interface ModuleAccess {
  moduleId: string;
  permissions: string[];
  accessLevel: AccessLevel;
  grantedAt: Date;
  grantedBy: string;
  expiresAt?: Date;
}

// Enums and Union Types
export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'execute' | 'manage';
export type AccessLevel = 'none' | 'view' | 'edit' | 'admin' | 'owner';
export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info';

// Audit and Compliance Types
export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  oldValue?: any;
  newValue?: any;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
}

export type AuditAction = 
  | 'user_created' 
  | 'user_updated' 
  | 'user_deleted' 
  | 'role_assigned' 
  | 'role_removed'
  | 'permission_granted' 
  | 'permission_revoked'
  | 'login_success'
  | 'login_failed'
  | 'password_changed'
  | 'emergency_access_granted';

// Filter and Search Types
export interface UserFilters {
  status?: User['status'][];
  roles?: string[];
  modules?: string[];
  departments?: string[];
  lastLoginBefore?: Date;
  lastLoginAfter?: Date;
  search?: string;
}

export interface RoleFilters {
  isSystemRole?: boolean;
  modules?: string[];
  search?: string;
}

// Bulk Operations
export interface BulkOperation {
  type: 'assign_role' | 'remove_role' | 'grant_permission' | 'revoke_permission' | 'deactivate' | 'activate';
  userIds: string[];
  roleId?: string;
  permissionIds?: string[];
  reason?: string;
}

export interface BulkOperationResult {
  success: boolean;
  affectedUsers: number;
  errors: BulkOperationError[];
}

export interface BulkOperationError {
  userId: string;
  userName: string;
  error: string;
}

// Demo and Mock Data Types
export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'bulk-ops' | 'emergency' | 'troubleshooting' | 'audit' | 'drift';
  steps: DemoStep[];
  expectedOutcome: string;
}

export interface DemoStep {
  id: string;
  title: string;
  description: string;
  action: string;
  data?: any;
  expectedResult: string;
}

// Access Analysis Types
export interface AccessDrift {
  userId: string;
  userName: string;
  currentPermissions: Permission[];
  recommendedPermissions: Permission[];
  excessPermissions: Permission[];
  missingPermissions: Permission[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastReview: Date;
}

export interface ComplianceReport {
  id: string;
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  totalUsers: number;
  compliantUsers: number;
  violationsFound: ComplianceViolation[];
  riskScore: number;
  recommendations: string[];
}

export interface ComplianceViolation {
  id: string;
  type: 'excessive_permissions' | 'stale_access' | 'missing_review' | 'policy_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId: string;
  userName: string;
  description: string;
  detectedAt: Date;
  resolved: boolean;
  resolvedAt?: Date;
} 