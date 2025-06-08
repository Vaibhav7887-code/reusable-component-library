"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { StatusDot } from "@/rbac/components/atoms/status-dot";
import { PermissionMatrix } from "@/rbac/components/molecules/permission-matrix";
import { RoleAssignment } from "@/rbac/components/molecules/role-assignment";
import { cn } from "@/lib/utils";
import { Save, X, AlertTriangle, User as UserIcon, Shield, Settings, History } from "lucide-react";
import type { User, Role, Module, ModuleAccess } from "@/rbac/types";

export interface UserEditDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => Promise<void>;
  availableRoles: Role[];
  availableModules: Module[];
  className?: string;
}

export function UserEditDrawer({
  user,
  isOpen,
  onClose,
  onSave,
  availableRoles,
  availableModules,
  className
}: UserEditDrawerProps) {
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
    { id: 'audit', label: 'Audit Trail', icon: History }
  ] as const;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className={cn("w-[600px] sm:w-[700px] max-w-[90vw] overflow-hidden", className)}>
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10" fallback={editedUser.avatar || editedUser.name.split(' ').map((n: string) => n[0]).join('')} />
            <div>
              <SheetTitle className="text-xl">Edit User</SheetTitle>
              <SheetDescription>
                Update user information, role, and permissions for {editedUser.name}
              </SheetDescription>
            </div>
            <div className="ml-auto">
              <StatusDot status={editedUser.status} showLabel />
            </div>
          </div>
        </SheetHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all",
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-6">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <Card variant="frostedGlass">
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID *</Label>
                      <Input
                        id="employeeId"
                        value={editedUser.employeeId || ''}
                        onChange={(e) => updateField('employeeId', e.target.value)}
                        className={errors.employeeId ? "border-red-500" : ""}
                      />
                      {errors.employeeId && <p className="text-sm text-red-500">{errors.employeeId}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={editedUser.department || ''}
                        onValueChange={(value) => updateField('department', value)}
                      >
                        <SelectTrigger>
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

                  <div className="space-y-2">
                    <Label htmlFor="status">Account Status</Label>
                    <Select
                      value={editedUser.status}
                      onValueChange={(value: 'active' | 'inactive' | 'suspended') => updateField('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'role' && (
            <div className="space-y-6">
              <RoleAssignment
                currentRole={editedUser.role}
                availableRoles={availableRoles}
                onRoleChange={updateRole}
                userModules={editedUser.modules}
              />
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <PermissionMatrix
                userModules={editedUser.modules}
                availableModules={availableModules}
                onModuleAccessChange={updateModuleAccess}
              />
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <Card variant="frostedGlass">
                <CardHeader>
                  <CardTitle className="text-lg">Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">User created</p>
                        <p className="text-xs text-muted-foreground">
                          {editedUser.createdAt?.toLocaleDateString()} at {editedUser.createdAt?.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Last login</p>
                        <p className="text-xs text-muted-foreground">
                          {editedUser.lastLogin ? 
                            `${editedUser.lastLogin.toLocaleDateString()} at ${editedUser.lastLogin.toLocaleTimeString()}` :
                            'Never'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Last updated</p>
                        <p className="text-xs text-muted-foreground">
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

        {/* Footer Actions */}
        <div className="border-t pt-4 space-y-4">
          {hasChanges && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You have unsaved changes. Make sure to save before closing.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!hasChanges || saving}
              className="gap-2"
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