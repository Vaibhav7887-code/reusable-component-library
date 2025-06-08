// FleetEdge RBAC Module Entry Point
// Phase 4: Complete RBAC System with Advanced Features

// Main pages for navigation integration
export { UserManagementPage } from './pages/users'

// Key organisms for embedding in other parts of the app
export { UserTable } from './components/organisms/user-table'
export { UserEditPopup } from './components/organisms/user-edit-popup'
export { BulkOperationsModal } from './components/organisms/bulk-operations-modal'
export { DemoShowcasePanel } from './components/organisms/demo-showcase-panel'

// Templates
export { UserOnboardingWizard } from './components/templates/user-onboarding-wizard'

// Molecule components
export { UserCard } from './components/molecules/user-card'
export { PermissionMatrix } from './components/molecules/permission-matrix'
export { RoleAssignment } from './components/molecules/role-assignment'

// Atomic components
export { PermissionToggle } from './components/atoms/permission-toggle'
export { RoleIndicator } from './components/atoms/role-indicator'
export { StatusDot } from './components/atoms/status-dot'

// Utility hooks for integration
export { useUsers } from './hooks/useUsers'
export { useBulkActions } from './hooks/useBulkActions'
export { useDemo } from './hooks/useDemo'

// Types for external consumption
export type { 
  User, 
  Role, 
  Permission, 
  Module,
  ModuleAccess,
  BulkOperation,
  BulkOperationResult,
  UserFilters,
  AuditLog 
} from './types'

// Mock data for demos
export { 
  mockUsers, 
  mockRoles, 
  mockModules, 
  mockPermissions 
} from './utils/mock-data'

// Module status
export const RBAC_MODULE_READY = true
export const RBAC_PHASE_COMPLETE = 4
export const RBAC_VERSION = "1.0.0" 