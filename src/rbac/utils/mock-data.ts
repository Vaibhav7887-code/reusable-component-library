import type { User, Role, Permission, Module, AuditLog } from "@/rbac/types";

// FleetEdge Modules (defined first without permissions)
const baseModules: Module[] = [
  {
    id: "ev",
    name: "EV Management",
    description: "Electric vehicle fleet operations",
    icon: "⚡",
    color: "green",
    isActive: true,
    permissions: []
  },
  {
    id: "fuel",
    name: "Fuel Management", 
    description: "Fuel vehicle fleet operations",
    icon: "⛽",
    color: "blue",
    isActive: true,
    permissions: []
  },
  {
    id: "tipper",
    name: "Tipper Management",
    description: "Construction vehicle operations", 
    icon: "🚛",
    color: "orange",
    isActive: true,
    permissions: []
  },
  {
    id: "analytics",
    name: "Fleet Analytics",
    description: "Data analysis and reporting",
    icon: "📊", 
    color: "purple",
    isActive: true,
    permissions: []
  }
];

// Core Permissions (without circular references)
export const mockPermissions: Permission[] = [
  // EV Module Permissions
  { id: "ev_view", name: "View EV Vehicles", description: "View electric vehicle data", module: { id: "ev", name: "EV Management", description: "Electric vehicle fleet operations", icon: "⚡", color: "green", isActive: true, permissions: [] }, action: "read" },
  { id: "ev_assign", name: "Assign EV Drivers", description: "Assign drivers to electric vehicles", module: { id: "ev", name: "EV Management", description: "Electric vehicle fleet operations", icon: "⚡", color: "green", isActive: true, permissions: [] }, action: "update" },
  { id: "ev_manage", name: "Manage EV Fleet", description: "Full electric vehicle management", module: { id: "ev", name: "EV Management", description: "Electric vehicle fleet operations", icon: "⚡", color: "green", isActive: true, permissions: [] }, action: "manage" },
  
  // Fuel Module Permissions  
  { id: "fuel_view", name: "View Fuel Vehicles", description: "View fuel vehicle data", module: { id: "fuel", name: "Fuel Management", description: "Fuel vehicle fleet operations", icon: "⛽", color: "blue", isActive: true, permissions: [] }, action: "read" },
  { id: "fuel_assign", name: "Assign Fuel Drivers", description: "Assign drivers to fuel vehicles", module: { id: "fuel", name: "Fuel Management", description: "Fuel vehicle fleet operations", icon: "⛽", color: "blue", isActive: true, permissions: [] }, action: "update" },
  { id: "fuel_manage", name: "Manage Fuel Fleet", description: "Full fuel vehicle management", module: { id: "fuel", name: "Fuel Management", description: "Fuel vehicle fleet operations", icon: "⛽", color: "blue", isActive: true, permissions: [] }, action: "manage" },
  
  // Tipper Module Permissions
  { id: "tipper_view", name: "View Tippers", description: "View tipper vehicle data", module: { id: "tipper", name: "Tipper Management", description: "Construction vehicle operations", icon: "🚛", color: "orange", isActive: true, permissions: [] }, action: "read" },
  { id: "tipper_assign", name: "Assign Tipper Drivers", description: "Assign drivers to tipper vehicles", module: { id: "tipper", name: "Tipper Management", description: "Construction vehicle operations", icon: "🚛", color: "orange", isActive: true, permissions: [] }, action: "update" },
  { id: "tipper_manage", name: "Manage Tipper Fleet", description: "Full tipper vehicle management", module: { id: "tipper", name: "Tipper Management", description: "Construction vehicle operations", icon: "🚛", color: "orange", isActive: true, permissions: [] }, action: "manage" },
  
  // Analytics Permissions
  { id: "analytics_view", name: "View Reports", description: "View fleet analytics and reports", module: { id: "analytics", name: "Fleet Analytics", description: "Data analysis and reporting", icon: "📊", color: "purple", isActive: true, permissions: [] }, action: "read" },
  { id: "analytics_export", name: "Export Data", description: "Export analytics data", module: { id: "analytics", name: "Fleet Analytics", description: "Data analysis and reporting", icon: "📊", color: "purple", isActive: true, permissions: [] }, action: "execute" },
  { id: "analytics_create", name: "Create Reports", description: "Create custom analytics reports", module: { id: "analytics", name: "Fleet Analytics", description: "Data analysis and reporting", icon: "📊", color: "purple", isActive: true, permissions: [] }, action: "create" }
];

// Export the populated modules (now safe from circular references)
export const mockModules: Module[] = [
  {
    id: "ev",
    name: "EV Management",
    description: "Electric vehicle fleet operations",
    icon: "⚡",
    color: "green",
    isActive: true,
    permissions: mockPermissions.slice(0, 3)
  },
  {
    id: "fuel",
    name: "Fuel Management", 
    description: "Fuel vehicle fleet operations",
    icon: "⛽",
    color: "blue",
    isActive: true,
    permissions: mockPermissions.slice(3, 6)
  },
  {
    id: "tipper",
    name: "Tipper Management",
    description: "Construction vehicle operations", 
    icon: "🚛",
    color: "orange",
    isActive: true,
    permissions: mockPermissions.slice(6, 9)
  },
  {
    id: "analytics",
    name: "Fleet Analytics",
    description: "Data analysis and reporting",
    icon: "📊", 
    color: "purple",
    isActive: true,
    permissions: mockPermissions.slice(9, 12)
  }
];

// Role Templates
export const mockRoles: Role[] = [
  {
    id: "driver",
    name: "Driver",
    description: "Standard vehicle driver with basic access",
    permissions: [mockPermissions[0], mockPermissions[3], mockPermissions[6]], // View access only
    color: "info",
    userCount: 342,
    isSystemRole: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: "mechanic", 
    name: "Mechanic",
    description: "Vehicle maintenance specialist",
    permissions: [mockPermissions[0], mockPermissions[3], mockPermissions[6], mockPermissions[9]], // View + Analytics
    color: "warning",
    userCount: 89,
    isSystemRole: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-03-10")
  },
  {
    id: "fleet_manager",
    name: "Fleet Manager", 
    description: "Regional fleet operations manager",
    permissions: [
      mockPermissions[0], mockPermissions[1], // EV View + Assign
      mockPermissions[3], mockPermissions[4], // Fuel View + Assign  
      mockPermissions[6], mockPermissions[7], // Tipper View + Assign
      mockPermissions[9], mockPermissions[10] // Analytics View + Export
    ],
    color: "success",
    userCount: 23,
    isSystemRole: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-05-20")
  },
  {
    id: "admin",
    name: "System Admin",
    description: "Full system administrator access",
    permissions: mockPermissions, // All permissions
    color: "destructive", 
    userCount: 8,
    isSystemRole: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  }
];

// Generate realistic users with Indian names and realistic data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Vaibhav Sharma",
    email: "vaibhav@fleetedge.com",
    avatar: "VS",
    role: mockRoles[2], // Fleet Manager
    modules: [
      { moduleId: "ev", permissions: ["ev_view", "ev_assign"], accessLevel: "edit", grantedAt: new Date("2023-06-01"), grantedBy: "admin" },
      { moduleId: "fuel", permissions: ["fuel_view", "fuel_assign"], accessLevel: "edit", grantedAt: new Date("2023-06-01"), grantedBy: "admin" }
    ],
    lastLogin: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    status: "active",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-12-15"),
    department: "Operations",
    employeeId: "FE001"
  },
  {
    id: "2", 
    name: "Arjun Singh",
    email: "arjun@fleetedge.com",
    avatar: "AS",
    role: mockRoles[1], // Mechanic
    modules: [
      { moduleId: "ev", permissions: ["ev_view"], accessLevel: "view", grantedAt: new Date("2023-07-15"), grantedBy: "vaibhav@fleetedge.com" },
      { moduleId: "analytics", permissions: ["analytics_view"], accessLevel: "view", grantedAt: new Date("2023-07-15"), grantedBy: "vaibhav@fleetedge.com" }
    ],
    lastLogin: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    status: "active",
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-11-20"),
    department: "Maintenance",
    employeeId: "FE002"
  },
  {
    id: "3",
    name: "Reema Patel",
    email: "reema@fleetedge.com", 
    avatar: "RP",
    role: mockRoles[0], // Driver
    modules: [
      { moduleId: "ev", permissions: ["ev_view"], accessLevel: "view", grantedAt: new Date("2023-08-01"), grantedBy: "vaibhav@fleetedge.com" }
    ],
    lastLogin: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    status: "active",
    createdAt: new Date("2023-08-01"),
    updatedAt: new Date("2023-08-01"),
    department: "Operations",
    employeeId: "FE003"
  },
  {
    id: "4",
    name: "Kiran Shah",
    email: "kiran@fleetedge.com",
    avatar: "KS", 
    role: mockRoles[0], // Driver
    modules: [
      { moduleId: "fuel", permissions: ["fuel_view"], accessLevel: "view", grantedAt: new Date("2023-05-10"), grantedBy: "admin" },
      { moduleId: "tipper", permissions: ["tipper_view"], accessLevel: "view", grantedAt: new Date("2023-09-15"), grantedBy: "vaibhav@fleetedge.com" }
    ],
    lastLogin: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    status: "inactive",
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-10-01"),
    department: "Operations",
    employeeId: "FE004"
  },
  {
    id: "5",
    name: "Priya Gupta",
    email: "priya@fleetedge.com",
    avatar: "PG",
    role: mockRoles[3], // Admin
    modules: [
      { moduleId: "ev", permissions: ["ev_view", "ev_assign", "ev_manage"], accessLevel: "admin", grantedAt: new Date("2023-01-15"), grantedBy: "system" },
      { moduleId: "fuel", permissions: ["fuel_view", "fuel_assign", "fuel_manage"], accessLevel: "admin", grantedAt: new Date("2023-01-15"), grantedBy: "system" },
      { moduleId: "tipper", permissions: ["tipper_view", "tipper_assign", "tipper_manage"], accessLevel: "admin", grantedAt: new Date("2023-01-15"), grantedBy: "system" },
      { moduleId: "analytics", permissions: ["analytics_view", "analytics_export", "analytics_create"], accessLevel: "admin", grantedAt: new Date("2023-01-15"), grantedBy: "system" }
    ],
    lastLogin: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "active",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-12-10"),
    department: "IT",
    employeeId: "FE005"
  }
];

// Sample Audit Log
export const mockAuditLog: AuditLog[] = [
  {
    id: "audit_1",
    userId: "1",
    action: "permission_granted",
    resource: "user",
    resourceId: "3",
    oldValue: null,
    newValue: { permission: "ev_view", module: "ev" },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0...",
    success: true
  },
  {
    id: "audit_2", 
    userId: "5",
    action: "role_assigned",
    resource: "user",
    resourceId: "2",
    oldValue: { role: "driver" },
    newValue: { role: "mechanic" },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0...",
    success: true
  }
];

// Helper functions for component usage
export const getUsersByRole = (roleId: string): User[] => {
  return mockUsers.filter(user => user.role.id === roleId);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getRoleById = (id: string): Role | undefined => {
  return mockRoles.find(role => role.id === id);
}; 