# Role & Permissions Manager - Implementation Plan

## Component Architecture Analysis

### Available Components (From Design System)
**Atoms (Basic Building Blocks)**:
- `Icon` - For action buttons, status indicators
- `Label` - Form labels and descriptions
- `Divider` - Section separators

**UI Components (Complex Building Blocks)**:
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` - Main user table
- `Sheet` (Drawer/Modal) - User edit panel
- `Button` - Actions, confirmations
- `Badge` - Role indicators, status badges
- `Input` - Search, form fields
- `Select`, `DropdownMenu` - Role selection, filters
- `Switch` - Permission toggles
- `Tooltip` - Permission explanations
- `Tabs` - Permission categories
- `Avatar` - User photos
- `Card` - Role preview, summaries
- `Skeleton` - Loading states
- `Toast` - Success/error notifications
- `Popover` - Quick previews

**Molecules (From Existing)**:
- `StatsCard` - Can adapt for permission summaries
- `TaskCard` - Can adapt for role cards

### New Components Needed

**Atoms**:
- `PermissionToggle` - Enhanced switch with labels
- `RoleIndicator` - Color-coded role badges
- `RiskBadge` - Security risk level indicators
- `StatusDot` - Active/inactive/pending states

**Molecules**:
- `UserCard` - User info with role and actions
- `PermissionGroup` - Collapsible permission sections
- `RoleSelector` - Dropdown with descriptions and role comparison
- `BulkActionBar` - Sticky bottom action bar
- `UserSearch` - Search with advanced filters and saved searches
- `PermissionMatrix` - Grid view with bulk column editing (Airtable-style)
- `AuditEntry` - Change log with justification and versioned diffs
- `RolePreview` - Permission summary with simulated UI overlay
- `AccessDriftCard` - Detection and reset for permission drift
- `BreakGlassPanel` - Emergency access override interface

**Organisms**:
- `UserTable` - Main data table with sorting/filtering and drift indicators
- `UserEditDrawer` - Side panel with SCIM sync status and change preview
- `RoleManager` - Role creation/editing with template inheritance
- `BulkEditModal` - Multi-user operations with impact analysis
- `AuditLog` - Change history with compliance export features
- `PermissionPreview` - "View as user" with simulated interface overlay
- `AccessRollbackCenter` - 24-hour change reversion interface
- `AccessDriftAnalyzer` - Dashboard for permission drift detection
- `ComplianceExporter` - Audit-ready report generation interface

## Detailed Screen Specifications

### 1. Main User Management Table

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────────────────┐
│ ┌─ Header ──────────────────────────────────────────────────────────┐ │
│ │ 🔍 Search Users...    [Role ▼] [Status ▼] [Department ▼] [+ User] │ │
│ └───────────────────────────────────────────────────────────────────┘ │
│ ┌─ Bulk Actions (Conditional) ─────────────────────────────────────── │
│ │ 📋 3 users selected    [Assign Role ▼] [Export] [Deactivate]      │ │
│ └───────────────────────────────────────────────────────────────────┘ │
│ ┌─ Table ──────────────────────────────────────────────────────────── │
│ │ □ │ 👤 │ Name          │ Role           │ Last Login │ Status │ ⋮  │ │
│ │ ☑ │ VS │ Vaibhav Sharma│ Fleet Manager  │ 2 min ago  │ 🟢     │ ⋮  │ │
│ │ ☑ │ AS │ Arjun Singh   │ Mechanic       │ 1h ago     │ 🟢     │ ⋮  │ │
│ │ ☑ │ RM │ Reema Patel   │ Driver         │ 12d ago    │ 🟡     │ ⋮  │ │
│ │ □ │ KS │ Kiran Shah    │ Driver [+2]    │ 45d ago    │ 🔴     │ ⋮  │ │
│ └───────────────────────────────────────────────────────────────────┘ │
│ Showing 1-20 of 847 users                            [← 1 2 3 4 →]   │
└─────────────────────────────────────────────────────────────────────┘
```

**States & Interactions**:
- **Empty State**: "No users match your filters. Try adjusting search criteria."
- **Loading State**: Skeleton rows with shimmer effect
- **Bulk Selection**: Checkbox column, sticky action bar appears
- **Row Hover**: Highlight with quick actions (Edit, View, Duplicate)
- **Sort**: Click headers to sort (Name, Role, Last Login, Status)
- **Pagination**: Standard pagination or infinite scroll for large datasets

**Key Features**:
- **Smart Search**: Name, email, role, department across all fields
- **Multi-Filter**: Combine role + status + department filters
- **Quick Actions**: Row-level edit, duplicate, view permissions
- **Custom Columns**: Admin can show/hide columns
- **Export**: CSV/Excel export with current filters applied

### 2. User Edit Drawer (Right Panel)

**Layout Structure**:
```
┌─ Edit User Permissions ────────────────────────────────┐
│ ← Close                                          Save  │
├─────────────────────────────────────────────────────┤
│ 👤 Vaibhav Sharma                                      │
│    vaibhav@fleetedge.com                               │
│                                                        │
│ ┌─ Basic Info ────────────────────────────────────────┐ │
│ │ Role: [Fleet Manager        ▼] ⓘ                   │ │
│ │ Status: ● Active  ○ Inactive                        │ │
│ │ Department: [Operations     ▼]                      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌─ Permissions ──────────────────────────────────────┐ │
│ │ ▼ Vehicle Management                                │ │
│ │   ☑ View all vehicles        ⓘ                     │ │
│ │   ☑ Assign drivers          ⓘ                     │ │
│ │   ☐ Delete vehicles         ⓘ [RESTRICTED]        │ │
│ │                                                     │ │
│ │ ▼ Fleet Analytics                                   │ │
│ │   ☑ View reports            ⓘ                     │ │
│ │   ☑ Export data             ⓘ                     │ │
│ │   ☐ Modify dashboards       ⓘ [CUSTOM]            │ │
│ │                                                     │ │
│ │ ▶ Service Management                                │ │
│ │ ▶ Driver Management                                 │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌─ Preview ──────────────────────────────────────────┐ │
│ │ [Preview as User] [Role Summary]                   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ [Cancel]                                        [Save] │
└─────────────────────────────────────────────────────┘
```

**Progressive Disclosure**:
- **Level 1**: Role dropdown (shows 80% of use cases)
- **Level 2**: Permission categories (collapsed by default)
- **Level 3**: Individual permissions (only when category expanded)
- **Advanced**: Custom permissions (toggle to show)

**Smart Features**:
- **Role Templates**: Selecting role auto-fills permissions
- **Change Detection**: Highlight modified permissions
- **Conflict Warnings**: "This permission requires Vehicle Access"
- **Risk Indicators**: Flag high-risk permission combinations
- **Similar Users**: "3 other mechanics have similar permissions"

### 3. Role Preview Modal

**Layout Structure**:
```
┌─ Fleet Manager Role Preview ───────────────────────────┐
│                                                 × Close │
├─────────────────────────────────────────────────────┤
│ This role can access:                                  │
│                                                        │
│ ✅ View all 247 vehicles across EV, Fuel, Tipper      │
│ ✅ Assign any of 89 drivers to vehicles                │
│ ✅ Access service records and maintenance history      │
│ ✅ Generate and export fleet analytics reports         │
│ ✅ View driver performance and safety scores           │
│                                                        │
│ This role CANNOT:                                      │
│                                                        │
│ ❌ Delete vehicles or drivers                          │
│ ❌ Modify company-wide settings                        │
│ ❌ Access financial/billing information                │
│ ❌ Manage other user accounts                          │
│                                                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔍 Similar roles: Senior Mechanic, Operations Lead  │ │
│ │ 👥 12 users currently have this role                │ │
│ │ 📊 Most-used permissions: Vehicle View (98%), etc   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ [View Full Permissions] [Preview Interface] [Assign]  │
└─────────────────────────────────────────────────────┘
```

### 4. Bulk Edit Modal

**Layout Structure**:
```
┌─ Bulk Edit: 5 Users Selected ─────────────────────────┐
│                                                × Close │
├─────────────────────────────────────────────────────┤
│ Selected Users:                                        │
│ • Vaibhav Sharma (Fleet Manager)                      │
│ • Arjun Singh (Mechanic)                              │
│ • Reema Patel (Driver)                                │
│ • +2 more users                                       │
│                                                        │
│ ┌─ Actions ────────────────────────────────────────── │
│ │ ○ Assign Role: [Driver ▼]                          │ │
│ │ ○ Add Permission: [Select Permission ▼]            │ │
│ │ ○ Remove Permission: [Select Permission ▼]         │ │
│ │ ○ Change Status: ● Active ○ Inactive               │ │
│ │ ○ Set Expiration: [Date Picker]                    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ ⚠️ Impact Preview:                                     │
│ • 3 users will gain Vehicle Assignment permission      │
│ • 2 users will lose Service Record access             │
│ • All changes will be logged for audit                │
│                                                        │
│ [Cancel]                                        [Apply] │
└─────────────────────────────────────────────────────┘
```

### 5. Access Drift Analyzer Dashboard

**Layout Structure**:
```
┌─ Access Drift Analyzer ───────────────────────────────┐
│ 📊 Drift Overview                              [⚙️ Settings] │
├─────────────────────────────────────────────────────┤
│ ┌─ Summary Cards ────────────────────────────────────┐ │
│ │ 🔴 13 Users Drifted   🟡 4 Dormant (90d)   📋 Export │ │
│ │ 🟠 Top 3 Permissions  🔵 Role Compliance   📈 Trends │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌─ Drift Details ────────────────────────────────────┐ │
│ │ User                Role          Drift Type        │ │
│ │ Vaibhav Sharma     Fleet Mgr     +Vehicle Delete   │ │
│ │ Arjun Singh        Mechanic      +Export Data      │ │
│ │ Reema Patel        Driver        -View Analytics   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ [Reset Selected]  [Bulk Reset All]  [Export Report]   │
└─────────────────────────────────────────────────────┘
```

### 6. Permission Matrix (Grid View)

**Layout Structure**:
```
┌─ Permission Matrix ────────────────────────────────────┐
│ [Grid View] [List View]        [Compare Roles ▼]      │
├─────────────────────────────────────────────────────┤
│        │Vehicle│Analytics│Service│Driver│Admin│Export│ │
│ Users  │ View  │ View    │ Mgmt  │ Mgmt │Panel │Data  │ │
├─────────────────────────────────────────────────────┤ │
│ V.Sharma│  ✓   │    ✓    │   ✓   │  ✓   │  ✓  │  ✓  │ │
│ A.Singh │  ✓   │    ✓    │   ✓   │  ✗   │  ✗  │  ✗  │ │
│ R.Patel │  ✓   │    ✗    │   ✗   │  ✗   │  ✗  │  ✗  │ │
│ [+User] │ [⬇]  │  [⬇]   │  [⬇] │ [⬇]  │[⬇] │ [⬇] │ │
└─────────────────────────────────────────────────────┘
```

### 7. Access Rollback Center

**Layout Structure**:
```
┌─ Access Rollback Center (24h) ────────────────────────┐
│ 🕐 Recent Changes                         [Filter ▼]   │
├─────────────────────────────────────────────────────┤
│ ┌─ Change #1 ────────────────────────────────────────┐ │
│ │ 2h ago: Vaibhav Sharma                             │ │
│ │ Added: Vehicle Delete permission                    │ │
│ │ Reason: "Emergency vehicle removal needed"         │ │
│ │ [🔄 Rollback] [👁️ Details] [✓ Approve Permanent]  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌─ Change #2 ────────────────────────────────────────┐ │
│ │ 6h ago: Bulk Edit (3 users)                       │ │
│ │ Added: Export Data to Arjun Singh + 2 others      │ │
│ │ Reason: "Quarterly reporting access"               │ │
│ │ [🔄 Rollback All] [👁️ Details] [✓ Approve]        │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ [Export Change Log] [Clear Old Changes]                │
└─────────────────────────────────────────────────────┘
```

### 8. Demo Showcase Panel

**Layout Structure**:
```
┌─ FleetEdge RBAC Demo ─────────────────────────────────┐
│ 🎯 Choose Demo Scenario                    [Reset Demo] │
├─────────────────────────────────────────────────────┤
│ ┌─ Quick Scenarios ──────────────────────────────────┐ │
│ │ 🔄 [New Driver Onboarding]    📊 [Bulk Role Edit]  │ │
│ │ ⚠️ [Emergency Access]         📋 [Compliance Audit]│ │
│ │ 🔍 [Permission Troubleshoot]  📈 [Access Drift]    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌─ Current Demo: New Driver Onboarding ──────────────┐ │
│ │ Step 2 of 4: Assigning Role                       │ │
│ │ ████████████████░░░░░░░░                         │ │
│ │                                                     │ │
│ │ 💡 Watch how role templates auto-fill permissions  │ │
│ │    and provide safety warnings                     │ │
│ │                                                     │ │
│ │ [◀ Previous] [▶ Next Step] [Skip Demo]            │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                        │
│ [📥 Download Demo Script] [🔗 Share Demo]              │
└─────────────────────────────────────────────────────┘
```

### 9. Mock Data Examples

**Sample Users** (hardcoded in `mock-data.ts`):
```typescript
const mockUsers = [
  {
    id: "1",
    name: "Vaibhav Sharma",
    email: "vaibhav@fleetedge.com",
    role: "Fleet Manager",
    status: "active",
    lastLogin: "2 minutes ago",
    driftStatus: "warning", // Has custom permissions
    avatar: "VS"
  },
  {
    id: "2", 
    name: "Arjun Singh",
    email: "arjun@fleetedge.com",
    role: "Mechanic",
    status: "active",
    lastLogin: "1 hour ago", 
    driftStatus: "clean", // Matches role defaults
    avatar: "AS"
  }
  // ... 50+ realistic users for demo
]
```

## Enhanced Frontend State Management

### Loading States
1. **Table Loading**: Skeleton rows with proper heights
2. **Search Loading**: Spinner in search input
3. **Save Loading**: Button spinner, disable form
4. **Bulk Action Loading**: Progress bar for large operations

### Error States
1. **Network Error**: Retry mechanism with exponential backoff
2. **Permission Denied**: Clear error with escalation path
3. **Validation Error**: Inline field-specific errors
4. **Bulk Operation Partial Failure**: Show success/failure breakdown

### Edge Cases
1. **No Users Found**: Empty state with clear action
2. **User Already Deleted**: Handle gracefully, show notification
3. **Permission Conflict**: Auto-resolve or require manual resolution
4. **Concurrent Edits**: Show warning, allow conflict resolution
5. **Browser Offline**: Cache changes, sync when online
6. **Large User Base**: Virtual scrolling, search-first approach
7. **SCIM Sync Failure**: Show sync status, manual retry options
8. **Access Drift Detection**: Automated monitoring with configurable thresholds
9. **Break-Glass Audit**: Emergency access automatically flagged for review
10. **Permission Inheritance Loops**: Detection and prevention mechanisms

### Frontend Prototype Scenarios
1. **Mock Data Integration**: Realistic hardcoded users, roles, and permission data
2. **Interactive Workflows**: Complete user flows with state management
3. **Visual Feedback**: Loading states, success/error notifications, and transitions
4. **Responsive Design**: Mobile-first approach with touch-friendly interactions
5. **Demo Scenarios**: Pre-configured showcase examples highlighting key features

## File Structure & Organization

### RBAC Module Directory Structure
```
src/rbac/
├── components/                         # RBAC-specific components
│   ├── atoms/
│   │   ├── permission-toggle.tsx       (45 lines)
│   │   ├── role-indicator.tsx          (35 lines)
│   │   ├── risk-badge.tsx              (40 lines)
│   │   └── status-dot.tsx              (30 lines)
│   ├── molecules/
│   │   ├── user-card.tsx               (85 lines)
│   │   ├── permission-group.tsx        (120 lines)
│   │   ├── role-selector.tsx           (95 lines) 
│   │   ├── bulk-action-bar.tsx         (110 lines)
│   │   ├── user-search.tsx             (140 lines)
│   │   ├── permission-matrix.tsx       (180 lines)
│   │   ├── audit-entry.tsx             (75 lines)
│   │   ├── role-preview.tsx            (160 lines)
│   │   ├── access-drift-card.tsx       (95 lines)
│   │   ├── break-glass-panel.tsx       (130 lines)
│   │   └── demo-tour-guide.tsx         (85 lines)
│   ├── organisms/
│   │   ├── user-table.tsx              (220 lines)
│   │   ├── user-edit-drawer.tsx        (240 lines)
│   │   ├── role-manager.tsx            (200 lines)
│   │   ├── bulk-edit-modal.tsx         (180 lines)
│   │   ├── audit-log.tsx               (190 lines)
│   │   ├── permission-preview.tsx      (150 lines)
│   │   ├── access-rollback-center.tsx  (210 lines)
│   │   ├── access-drift-analyzer.tsx   (195 lines)
│   │   └── demo-showcase-panel.tsx     (170 lines)
│   └── templates/
│       ├── rbac-dashboard.tsx          (120 lines)
│       ├── user-management-layout.tsx  (100 lines)
│       └── audit-layout.tsx            (90 lines)
├── pages/                              # Main application pages
│   ├── dashboard.tsx                   (150 lines)
│   ├── users.tsx                       (180 lines)
│   ├── roles.tsx                       (160 lines)
│   ├── audit.tsx                       (140 lines)
│   └── demo.tsx                        (200 lines)
├── hooks/                              # Custom React hooks
│   ├── useUsers.ts                     (80 lines)
│   ├── useRoles.ts                     (70 lines)
│   ├── usePermissions.ts               (90 lines)
│   ├── useBulkActions.ts               (85 lines)
│   ├── useDemo.ts                      (95 lines)
│   └── useAudit.ts                     (75 lines)
├── utils/                              # Helper functions
│   ├── permission-utils.ts             (100 lines)
│   ├── role-templates.ts               (80 lines)
│   ├── audit-helpers.ts                (60 lines)
│   ├── drift-detection.ts              (90 lines)
│   ├── mock-data.ts                    (150 lines)
│   └── demo-scenarios.ts               (120 lines)
├── types/                              # TypeScript definitions
│   ├── user.types.ts                   (50 lines)
│   ├── role.types.ts                   (40 lines)
│   ├── permission.types.ts             (45 lines)
│   ├── audit.types.ts                  (35 lines)
│   ├── demo.types.ts                   (30 lines)
│   └── mock-data.types.ts              (25 lines)
├── data/                               # Mock data and scenarios
│   ├── users.json                      # Sample user dataset
│   ├── roles.json                      # Predefined role definitions
│   ├── permissions.json                # Permission catalog
│   ├── scenarios.json                  # Demo workflow configurations
│   └── audit-log.json                  # Sample audit trail data
├── styles/                             # RBAC-specific styles
│   ├── index.css                       # Main stylesheet
│   ├── rbac.css                        # Module-specific styles
│   ├── animations.css                  # Transitions and loading
│   └── themes.css                      # Color themes and variants
└── README.md                           # Module documentation
```

### Component Breakdown by Priority

**Phase 1 - Core MVP** (Week 1-2):
1. `user-table.tsx` - Main interface
2. `user-edit-drawer.tsx` - Basic editing
3. `role-selector.tsx` - Role assignment
4. `permission-toggle.tsx` - Basic permissions
5. Supporting atoms and types

**Phase 2 - Enhanced UX** (Week 3-4):
1. `bulk-edit-modal.tsx` - Bulk operations
2. `role-preview.tsx` - Role understanding
3. `user-search.tsx` - Advanced filtering
4. `audit-log.tsx` - Change tracking

**Phase 3 - Advanced Features** (Week 5-6):
1. `permission-preview.tsx` - "View as user" with UI simulation
2. `role-manager.tsx` - Custom role creation with inheritance
3. `permission-matrix.tsx` - Airtable-style grid with bulk editing
4. `access-drift-analyzer.tsx` - Automated drift detection dashboard

**Phase 4 - Demo Polish & Showcase** (Week 7-8):
1. `access-rollback-center.tsx` - Interactive change history with mock timeline
2. `compliance-exporter.tsx` - Mock report generation with download simulation
3. `demo-scenarios.ts` - Pre-configured showcase workflows and data sets
4. `responsive-optimization` - Mobile/tablet testing and polish

### Integration with Existing Design System

**Import Strategy**:
```typescript
// Import from existing design system
import { Button, Input, Select } from '@/components/ui'
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge, Avatar, Tooltip } from '@/components/ui'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

// RBAC-specific components
import { PermissionToggle, RoleIndicator } from '@/rbac/components/atoms'
import { UserCard, RoleSelector } from '@/rbac/components/molecules'
import { UserTable, UserEditDrawer } from '@/rbac/components/organisms'
```

**Reuse Strategy**:
- **UI Foundation**: `Button`, `Input`, `Select`, `Table`, `Sheet`, `Card`
- **Display Elements**: `Badge`, `Avatar`, `Tooltip`, `Skeleton`
- **Feedback Systems**: `Toast`, `Progress`, `Spinner`
- **Layout Components**: `Tabs`, `Popover`, `DropdownMenu`

**RBAC Extensions**:
- Custom permission-specific styling variants
- Enhanced tooltips with permission explanations  
- Extended table features for user/role management
- Security-themed color schemes and badges
- Accessibility enhancements for enterprise use

**Styling Approach**:
- Extend existing Tailwind classes with RBAC-specific utilities
- Use CSS variables for theme customization
- Maintain design system consistency while adding domain-specific styling

### Frontend State Architecture

**Mock Data Management**:
```typescript
// Global State (Context/Zustand)
interface RBACState {
  users: MockUser[]
  roles: MockRole[]
  permissions: MockPermission[]
  currentUser: MockUser | null
  bulkSelection: string[]
  filters: FilterState
  auditLog: MockAuditEntry[]
  demoMode: boolean
  selectedScenario: DemoScenario
}

// Component-Specific State
interface UserTableState {
  sortBy: string
  sortDirection: 'asc' | 'desc'
  pagination: PaginationState
  loading: boolean
  mockDelay: number // For demo loading states
}
```

**Frontend Features**:
- Hardcoded mock data with realistic scenarios
- Simulated loading states with configurable delays
- Local state management for all interactions
- Toast notifications for user feedback
- Optimistic UI updates for smooth interactions
- Demo mode with guided tours and scenarios

### Enhanced Terminology & Language

**Consistent Security Language**:
- "Access grants" instead of "give access"
- "Privilege escalation" instead of "giving too much access"  
- "Permission bundles" when referring to role templates
- "Access profile cloning" instead of "duplicate permissions"
- "Risk exposure" rather than "blast radius"
- "Access drift" for deviations from role defaults

### Enterprise Feature Highlights

**Access Drift Analyzer**:
- Automated detection of users who deviate from role defaults
- Configurable drift thresholds and monitoring rules
- Bulk reset capabilities with approval workflows
- Trend analysis and risk scoring

**Break-Glass Access System**:
- Emergency override patterns for critical incidents
- Automatic audit trail generation for all emergency access
- Time-limited access with auto-expiration
- Approval workflow integration for post-incident review

**Compliance & Audit Features**:
- SOC2 Type II audit trail generation
- ISO27001 access control evidence packages
- Real-time permission change monitoring
- Cross-module privilege escalation detection
- Automated compliance reporting with customizable formats

**Demo & Prototype Features**:
- Realistic mock data representing enterprise scenarios
- Interactive workflows with immediate visual feedback
- Configurable demo scenarios for different use cases
- Responsive design optimized for various screen sizes
- Accessibility features with keyboard navigation support
- Export simulation with mock file downloads

This plan provides a comprehensive frontend prototype roadmap for showcasing the Role & Permissions Manager while maintaining modularity, staying within file size limits, and leveraging the existing design system effectively. Each component is designed for optimal user experience with hardcoded data that demonstrates real-world enterprise identity management scenarios. 