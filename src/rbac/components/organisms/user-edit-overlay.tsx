"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { StatusDot } from "@/rbac/components/atoms/status-dot";
import { PermissionMatrix } from "@/rbac/components/molecules/permission-matrix";
import { RoleAssignment } from "@/rbac/components/molecules/role-assignment";
import { cn } from "@/lib/utils";
import { Save, X, AlertTriangle, User as UserIcon, Shield, Settings, History } from "lucide-react";
import type { User, Role, Module, ModuleAccess } from "@/rbac/types";

export interface UserEditOverlayProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => Promise<void>;
  availableRoles: Role[];
  availableModules: Module[];
  className?: string;
}

export function UserEditOverlay({
  user,
  isOpen,
  onClose,
  onSave,
  availableRoles,
  availableModules,
  className
}: UserEditOverlayProps) {
  const [editedUser, setEditedUser] = React.useState<User | null>(null);
  const [activeTab, setActiveTab] = React.useState<'basic' | 'role' | 'permissions' | 'audit'>('basic');
  const [saving, setSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = React.useState(false);

  // Helper function to create a safe deep clone without circular references
  const createSafeUserClone = (sourceUser: User): User => {
    return {
      ...sourceUser,
      role: {
        ...sourceUser.role,
        permissions: sourceUser.role.permissions.map(p => ({
          ...p,
          module: { id: p.module.id, name: p.module.name, description: p.module.description, icon: p.module.icon, color: p.module.color, isActive: p.module.isActive, permissions: [] }
        }))
      },
      modules: sourceUser.modules.map(m => ({ ...m }))
    };
  };

  // Helper function to compare users without circular references
  const hasUserChanged = (original: User | null, edited: User | null): boolean => {
    if (!original || !edited) return false;
    
    // Compare basic fields
    const basicFieldsChanged = (
      original.name !== edited.name ||
      original.email !== edited.email ||
      original.employeeId !== edited.employeeId ||
      original.department !== edited.department ||
      original.status !== edited.status
    );

    // Compare role
    const roleChanged = original.role.id !== edited.role.id;

    // Compare modules (just the structure, not deep references)
    const modulesChanged = JSON.stringify(original.modules.map(m => ({
      moduleId: m.moduleId,
      permissions: m.permissions,
      accessLevel: m.accessLevel
    }))) !== JSON.stringify(edited.modules.map(m => ({
      moduleId: m.moduleId,
      permissions: m.permissions,
      accessLevel: m.accessLevel
    })));

    return basicFieldsChanged || roleChanged || modulesChanged;
  };

  // Initialize edited user when user prop changes
  React.useEffect(() => {
    if (user) {
      setEditedUser(createSafeUserClone(user));
      setHasChanges(false);
      setErrors({});
    }
  }, [user]);

  // Track changes
  React.useEffect(() => {
    if (user && editedUser) {
      const hasChanged = hasUserChanged(user, editedUser);
      setHasChanges(hasChanged);
    }
  }, [user, editedUser]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!editedUser?.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!editedUser?.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedUser.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!editedUser?.employeeId?.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!editedUser || !validateForm()) return;

    try {
      setSaving(true);
      await onSave(editedUser);
      setHasChanges(false);
      onClose();
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setSaving(false);
    }
  };

  // Handle close with unsaved changes warning
  const handleClose = () => {
    if (hasChanges) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirm) return;
    }
    onClose();
  };

  // Update user field
  const updateField = (field: keyof User, value: any) => {
    if (!editedUser) return;
    setEditedUser({
      ...editedUser,
      [field]: value
    });
  };

  // Update role
  const updateRole = (role: Role) => {
    if (!editedUser) return;
    setEditedUser({
      ...editedUser,
      role
    });
  };

  // Update module access
  const updateModuleAccess = (moduleAccess: ModuleAccess[]) => {
    if (!editedUser) return;
    setEditedUser({
      ...editedUser,
      modules: moduleAccess
    });
  };

  if (!editedUser) return null;

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: UserIcon },
    { id: 'role', label: 'Role & Access', icon: Shield },
    { id: 'permissions', label: 'Permissions', icon: Settings },
    { id: 'audit', label: 'Activity Log', icon: History }
  ] as const;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className={cn("w-[90vw] sm:w-[85vw] lg:w-[1000px] xl:w-[1200px] max-w-[1400px] overflow-hidden", className)}>
        {/* Header - Fixed spacing */}
        <SheetHeader className="pb-4 border-b border-border/40">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 mt-1">
              <AvatarImage src={editedUser.avatar} alt={editedUser.name} />
              <AvatarFallback>{editedUser.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-semibold text-foreground leading-tight">Edit User</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Update user information, role, and permissions for {editedUser.name}
              </SheetDescription>
            </div>
            <div className="flex items-center mt-1">
              <StatusDot status={editedUser.status} showLabel />
            </div>
          </div>
        </SheetHeader>

        {/* Tab Navigation - Fixed spacing */}
        <div className="py-4">
          <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg max-w-2xl mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 flex-1 justify-center min-w-0",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap text-sm truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area - Completely restructured */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          <div className="px-1 pb-4">
            {activeTab === 'basic' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <Card variant="frostedGlass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          value={editedUser.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className={cn("h-9", errors.name ? "border-red-500 focus:border-red-500" : "")}
                          placeholder="Enter full name"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={cn("h-9", errors.email ? "border-red-500 focus:border-red-500" : "")}
                          placeholder="Enter email address"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="employeeId" className="text-sm font-medium">Employee ID *</Label>
                        <Input
                          id="employeeId"
                          value={editedUser.employeeId || ''}
                          onChange={(e) => updateField('employeeId', e.target.value)}
                          className={cn("h-9", errors.employeeId ? "border-red-500 focus:border-red-500" : "")}
                          placeholder="Enter employee ID"
                        />
                        {errors.employeeId && <p className="text-xs text-red-500 mt-0.5">{errors.employeeId}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                        <Select
                          value={editedUser.department || ''}
                          onValueChange={(value) => updateField('department', value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="it">IT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="status" className="text-sm font-medium">Account Status</Label>
                        <Select
                          value={editedUser.status}
                          onValueChange={(value: 'active' | 'inactive' | 'suspended') => updateField('status', value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Active
                              </div>
                            </SelectItem>
                            <SelectItem value="inactive">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                Inactive
                              </div>
                            </SelectItem>
                            <SelectItem value="suspended">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                Suspended
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div></div> {/* Empty space for better layout */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'role' && (
              <div className="space-y-6 w-full">
                <div className="max-w-none">
                  <RoleAssignment
                    currentRole={editedUser.role}
                    availableRoles={availableRoles}
                    onRoleChange={updateRole}
                    userModules={editedUser.modules}
                  />
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div className="space-y-6 w-full">
                <div className="max-w-none overflow-x-auto">
                  <PermissionMatrix
                    userModules={editedUser.modules}
                    availableModules={availableModules}
                    onModuleAccessChange={updateModuleAccess}
                  />
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <Card variant="frostedGlass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">Activity Log</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">User created</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {editedUser.createdAt?.toLocaleDateString()} at {editedUser.createdAt?.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">Last login</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {editedUser.lastLogin ? 
                              `${editedUser.lastLogin.toLocaleDateString()} at ${editedUser.lastLogin.toLocaleTimeString()}` :
                              'Never'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">Last updated</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {editedUser.updatedAt?.toLocaleDateString()} at {editedUser.updatedAt?.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions - Fixed spacing */}
        <div className="border-t border-border/40 pt-3 mt-auto bg-background/95 backdrop-blur-sm">
          {hasChanges && (
            <Alert className="mb-3">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                You have unsaved changes. Make sure to save before closing.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={handleClose} className="h-9 px-4">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!hasChanges || saving}
              className="h-9 px-6 gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 