# RBAC Module Integration Guide

## Adding RBAC to Main Showcase

### 1. Update Showcase Navigation

In `src/components/showcase/index.tsx`, add a new tab for Security:

```typescript
const tabs = [
  "Atoms",
  "Molecules", 
  "Organisms",
  "Complex Components",
  "Security (RBAC)",  // <- Add this
  "Templates"
]
```

### 2. Import RBAC Components

```typescript
// Add to imports in showcase/index.tsx
import { RBAC_MODULE_READY } from '@/rbac'
// Once components are built:
// import { RBACDashboard, UserManagement } from '@/rbac'
```

### 3. Add Security Tab Content

```typescript
// In the showcase component's tab content section
{activeTab === "Security (RBAC)" && (
  <div className="space-y-8">
    <div className="text-center py-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        🔐 Role & Permissions Manager
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Enterprise-grade access control system for FleetEdge. 
        Manage users, roles, and permissions across EV, Fuel, and Tipper modules.
      </p>
      
      {RBAC_MODULE_READY ? (
        // Once built, show actual components
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RBACDashboard />
          <UserManagement />
        </div>
      ) : (
        // Show coming soon for now
        <div className="bg-white rounded-lg p-8 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">🚧 Coming Soon</h3>
          <div className="space-y-3 text-left max-w-lg mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
              <span>User Management Table with Search & Filters</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Role Assignment with Permission Preview</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
              <span>Bulk Operations & Access Drift Detection</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
              <span>Interactive Demo Scenarios</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)}
```

## Navigation Integration Options

### Option 1: Separate RBAC App Route
Create a dedicated route for the RBAC system:

```
/rbac/dashboard - Main RBAC dashboard
/rbac/users - User management
/rbac/roles - Role management  
/rbac/audit - Audit logs
/rbac/demo - Interactive demo
```

### Option 2: Embedded in Showcase
Keep RBAC as part of the component showcase for demonstration purposes.

### Option 3: Modal/Drawer Integration
Launch RBAC interfaces from buttons in the main showcase using sheets/modals.

## File Import Strategy

Once components are built, imports will look like:

```typescript
// Pages
import { 
  RBACDashboard,
  UserManagement, 
  RoleManagement,
  AuditLog,
  DemoMode 
} from '@/rbac'

// Individual components for embedding
import {
  UserTable,
  UserEditDrawer,
  PermissionPreview
} from '@/rbac'

// Hooks for data management
import {
  useUsers,
  useRoles, 
  usePermissions,
  useDemo
} from '@/rbac'

// Types for TypeScript
import type {
  User,
  Role,
  Permission,
  DemoScenario
} from '@/rbac'
```

## Styling Integration

The RBAC module includes its own stylesheet that extends the existing design system:

```typescript
// This import brings in RBAC-specific styles
import '@/rbac/styles/index.css'
```

The styles are designed to:
- Extend existing Tailwind utilities
- Maintain design system consistency
- Add domain-specific styling (role badges, permission toggles, etc.)
- Support light/dark themes if implemented

## Development Workflow

1. **Phase 1**: Basic structure and atoms (Week 1-2)
2. **Phase 2**: Core organisms and user table (Week 3-4)  
3. **Phase 3**: Advanced features and demo mode (Week 5-6)
4. **Phase 4**: Polish and showcase integration (Week 7-8)

Each phase can be integrated incrementally into the main showcase as components are completed. 