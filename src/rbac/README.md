# FleetEdge RBAC Module

## Overview
This module contains all Role & Permissions Manager components, utilities, and demo scenarios. It's a self-contained frontend prototype that demonstrates enterprise-grade access management capabilities using the existing frosted glass design system.

## Folder Structure

```
src/rbac/
├── components/           # RBAC-specific components
│   ├── atoms/           # Basic building blocks (permission-toggle, role-indicator)
│   ├── molecules/       # Composite components (user-card, role-selector, permission-matrix-row)
│   ├── organisms/       # Complex interfaces (user-table, role-manager, audit-dashboard)
│   └── templates/       # Page layouts (rbac-layout, user-management-layout)
├── pages/               # Main RBAC interfaces (dashboard, users, roles, audit, demo)
├── hooks/               # Custom React hooks (useUsers, useRoles, usePermissions, useAudit)
├── utils/               # Helper functions (mock-data, demo-scenarios, permission-utils)
├── types/               # TypeScript definitions (User, Role, Permission, AuditLog)
├── data/                # Mock data and scenarios (users.json, roles.json, permissions.json)
├── styles/              # RBAC-specific styles (rbac-overrides.css)
└── tests/               # Component tests
```

## Design System Analysis & Integration

### Visual Theme Compatibility
The RBAC module leverages the existing **frosted glass design language**:
- **Primary Theme**: Translucent glass effects with `backdrop-blur` and subtle borders
- **Color Palette**: Neutral grays with purple/blue accents, full light/dark mode support
- **Gradient Background**: Dual-tone gradients with floating blurred circles
- **Glass Variants**: Multiple effects (`frosted-glass`, `glass-effect`, `glass-primary`)

### Available Components for RBAC

#### Perfect Matches (Ready to Use)
| Component | RBAC Use Case | Variants Available |
|-----------|---------------|-------------------|
| **Table** | User management grids | Default with hover states |
| **Card** | User/role panels | `frostedGlass` (default), `interactive`, `elevated` |
| **Badge** | Role indicators | `success`, `warning`, `destructive`, `info` |
| **Button** | Actions/CTAs | `frostedGlass`, `outline`, `destructive`, `gradient` |
| **Switch** | Permission toggles | Default with focus states |
| **Select** | Role dropdowns | Multi-select support |
| **Input** | Search/filters | Focus animations, icon support |
| **Sheet** | User edit panels | Slide-out with backdrop |
| **Dropdown Menu** | Actions menu | Nested menu support |
| **Tooltip** | Help text | Hover/focus triggers |
| **Avatar** | User profiles | Fallback support, size variants |
| **Skeleton** | Loading states | Table, card, avatar variants |

#### Complex Patterns to Reuse
From **Fleet Maintenance Component**:
- **Progress Ring**: Role assignment progress indicators
- **Expandable Cards**: Detailed permission breakdowns
- **Confidence Breakdown**: Access audit confidence scores
- **Data Export**: Compliance report generation

From **Dashboard Component**:
- **Stats Cards**: RBAC metrics (active users, roles, permissions)
- **Grid Layouts**: Responsive component organization

### Styling Conventions & Patterns

#### Color Coding System
```typescript
// Status Colors (consistent across components)
critical: "text-red-500 bg-red-500/20"    // Access denied, security risks
warning: "text-orange-500 bg-orange-500/20"  // Pending approvals, expiring access
success: "text-green-500 bg-green-500/20"    // Active permissions, compliant
info: "text-blue-500 bg-blue-500/20"         // Informational, neutral status
```

#### Glass Effect Variants
```css
/* Default glass effect for cards */
.frosted-glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Interactive elements */
.glass-effect {
  @apply bg-background/60 backdrop-blur-3xl border-white/20 shadow-xl;
}

/* Hover states */
.glass-effect:hover {
  @apply bg-background/70 backdrop-blur-4xl border-white/30;
}
```

#### Animation Patterns
- **Transitions**: `transition-all duration-200/300`
- **Hover Effects**: `hover:bg-white/30`, `hover:shadow-lg`, `hover:-translate-y-1`
- **Active States**: `active:scale-[0.96]`, `active:shadow-inner-md`
- **Focus States**: `focus-visible:ring-2 focus-visible:ring-white/30`

### RBAC-Specific Component Patterns

#### Permission Matrix Structure
```typescript
// Leverages existing Table + Switch components
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>User/Role</TableHead>
      {modules.map(module => (
        <TableHead key={module}>{module}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        {modules.map(module => (
          <TableCell key={module}>
            <Switch 
              checked={hasPermission(user, module)}
              onCheckedChange={(checked) => updatePermission(user, module, checked)}
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### User Card Composition
```typescript
// Combines Card + Avatar + Badge + Button
<Card variant="frostedGlass" className="interactive">
  <CardHeader>
    <div className="flex items-center gap-3">
      <Avatar src={user.avatar} fallback={user.initials} />
      <div>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </div>
      <Badge variant={getRoleVariant(user.role)}>
        {user.role}
      </Badge>
    </div>
  </CardHeader>
  <CardContent>
    {/* Role details */}
  </CardContent>
  <CardFooter>
    <Button variant="outline" className="flex-1">Edit</Button>
    <Button variant="destructive" className="flex-1">Remove</Button>
  </CardFooter>
</Card>
```

#### Progress Indicators
```typescript
// Reused from Fleet Maintenance
<ProgressRing progress={accessLevel} size={60}>
  <span className="text-sm font-medium">{accessLevel}%</span>
</ProgressRing>
```

### Technical Implementation

#### State Management Pattern
```typescript
// Custom hooks for RBAC data
const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock API calls with realistic delays
  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1200);
  }, []);
  
  return { users, loading, updateUser, deleteUser };
};
```

#### Mock Data Structure
```typescript
// Realistic enterprise data
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  modules: ModuleAccess[];
  lastLogin: Date;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  color: BadgeVariant;
  userCount: number;
}
```

#### Component File Structure
```typescript
// Atomic component example
// src/rbac/components/atoms/permission-toggle.tsx
export interface PermissionToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  description?: string;
}

// Molecule component example  
// src/rbac/components/molecules/user-card.tsx
export interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  variant?: 'default' | 'compact' | 'detailed';
}

// Organism component example
// src/rbac/components/organisms/user-table.tsx
export interface UserTableProps {
  users: User[];
  loading?: boolean;
  onUserSelect: (user: User) => void;
  onBulkAction: (action: string, users: User[]) => void;
}
```

## Demo Scenarios

Pre-configured scenarios for comprehensive testing:

### 1. New Driver Onboarding
- **Scenario**: Add new driver with basic EV module access
- **Components**: User creation form, role assignment, permission preview
- **Data**: Mock driver profiles, onboarding checklist

### 2. Bulk Role Assignment
- **Scenario**: Assign "Fleet Manager" role to multiple users
- **Components**: Bulk selection, role picker, impact preview
- **Data**: 50+ users, role change simulation

### 3. Emergency Access Management
- **Scenario**: Grant temporary admin access during incident
- **Components**: Emergency access panel, time-limited permissions, audit trail
- **Data**: Emergency scenarios, access expiration logic

### 4. Permission Troubleshooting
- **Scenario**: Diagnose why user can't access specific module
- **Components**: Permission analyzer, conflict resolution, step-by-step guide
- **Data**: Permission conflicts, resolution suggestions

### 5. Compliance Audit Simulation
- **Scenario**: Generate access compliance report for audit
- **Components**: Audit dashboard, compliance metrics, export functionality
- **Data**: 6 months of access logs, compliance violations

### 6. Access Drift Detection
- **Scenario**: Identify users with excessive permissions over time
- **Components**: Drift analyzer, permission timeline, cleanup recommendations
- **Data**: Permission history, drift patterns, cleanup suggestions

## Development Guidelines

### Code Standards
- **Line Limit**: Keep components under 250 lines
- **TypeScript**: All files must be TypeScript with proper interfaces
- **Atomic Design**: Follow atoms → molecules → organisms → templates
- **Accessibility**: Include ARIA labels, keyboard navigation, screen reader support

### Component Naming
```typescript
// Atoms: action-object pattern
permission-toggle.tsx, role-indicator.tsx, access-badge.tsx

// Molecules: object-action pattern  
user-card.tsx, role-selector.tsx, permission-matrix-row.tsx

// Organisms: domain-object pattern
user-table.tsx, role-manager.tsx, audit-dashboard.tsx

// Templates: layout-purpose pattern
rbac-layout.tsx, user-management-layout.tsx
```

### Performance Considerations
- **Virtualization**: Use for large user lists (1000+ users)
- **Debouncing**: Search inputs with 300ms delay
- **Memoization**: Expensive permission calculations
- **Lazy Loading**: Large data sets with pagination

### Testing Requirements
- **Unit Tests**: All utility functions and hooks
- **Component Tests**: Interactive behaviors and state changes
- **Integration Tests**: Complete user workflows
- **Accessibility Tests**: Keyboard navigation and screen readers

## Integration with Main Showcase

The RBAC module integrates seamlessly with the main component showcase:

```typescript
// Added to main showcase tabs
{ id: "rbac-demo", title: "RBAC System" }

// Showcase content
case "rbac-demo":
  return <RBACShowcase />;
```

This creates a comprehensive RBAC demonstration that maintains consistency with the existing design system while showcasing enterprise-grade access management capabilities. 