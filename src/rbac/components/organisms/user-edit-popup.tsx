"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { StatusDot } from "@/rbac/components/atoms/status-dot";
import { PermissionMatrix } from "@/rbac/components/molecules/permission-matrix";
import { RoleAssignment } from "@/rbac/components/molecules/role-assignment";
import { cn } from "@/lib/utils";
import { Save, X, AlertTriangle, User as UserIcon, Shield, Settings, History } from "lucide-react";
import type { User, Role, Module, ModuleAccess } from "@/rbac/types";

export interface UserEditPopupProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => Promise<void>;
  availableRoles: Role[];
  availableModules: Module[];
  className?: string;
}

type TabId = 'basic' | 'role' | 'permissions' | 'audit';

export function UserEditPopup({
  user,
  isOpen,
  onClose,
  onSave,
  availableRoles,
  availableModules,
  className
}: UserEditPopupProps) {
  const [editedUser, setEditedUser] = React.useState<User | null>(null);
  const [activeTab, setActiveTab] = React.useState<TabId>('basic');
  const [saving, setSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = React.useState(false);
  
  // Refs for accessibility and focus management
  const modalRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Helper function to create a safe deep clone without circular references
  const createSafeUserClone = React.useCallback((sourceUser: User): User => {
    return {
      ...sourceUser,
      role: {
        ...sourceUser.role,
        permissions: sourceUser.role.permissions.map(p => ({
          ...p,
          module: { 
            id: p.module.id, 
            name: p.module.name, 
            description: p.module.description, 
            icon: p.module.icon, 
            color: p.module.color, 
            isActive: p.module.isActive, 
            permissions: [] 
          }
        }))
      },
      modules: sourceUser.modules.map(m => ({ ...m }))
    };
  }, []);

  // Optimized user comparison function
  const hasUserChanged = React.useCallback((original: User | null, edited: User | null): boolean => {
    if (!original || !edited) return false;
    
    // Compare basic fields
    const basicFields = ['name', 'email', 'employeeId', 'department', 'status'] as const;
    const basicFieldsChanged = basicFields.some(field => original[field] !== edited[field]);

    // Compare role
    const roleChanged = original.role.id !== edited.role.id;

    // Compare modules structure only
    const modulesChanged = original.modules.length !== edited.modules.length ||
      original.modules.some((originalModule, index) => {
        const editedModule = edited.modules[index];
        return !editedModule || 
               originalModule.moduleId !== editedModule.moduleId ||
               originalModule.permissions.length !== editedModule.permissions.length ||
               originalModule.permissions.some((perm, permIndex) => perm !== editedModule.permissions[permIndex]);
      });

    return basicFieldsChanged || roleChanged || modulesChanged;
  }, []);

  // Initialize edited user when user prop changes
  React.useEffect(() => {
    if (user) {
      setEditedUser(createSafeUserClone(user));
      setHasChanges(false);
      setErrors({});
      setActiveTab('basic'); // Reset to first tab
    }
  }, [user, createSafeUserClone]);

  // Track changes with optimized dependency
  React.useEffect(() => {
    if (user && editedUser) {
      const hasChanged = hasUserChanged(user, editedUser);
      setHasChanges(hasChanged);
    }
  }, [user, editedUser, hasUserChanged]);

  // Focus management and keyboard navigation
  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
        handleClose();
          break;
        case 'Tab':
          // Trap focus within modal
          if (modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
          break;

      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      // Focus close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Tab navigation
  const tabs = [
    { id: 'basic' as const, label: 'Basic Info', icon: UserIcon },
    { id: 'role' as const, label: 'Role & Access', icon: Shield },
    { id: 'permissions' as const, label: 'Permissions', icon: Settings },
    { id: 'audit' as const, label: 'Activity Log', icon: History }
  ];

  // Form validation
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
    setEditedUser(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Update role
  const updateRole = (role: Role) => {
    if (!editedUser) return;
    setEditedUser(prev => prev ? { ...prev, role } : null);
  };

  // Update module access
  const updateModuleAccess = (moduleAccess: ModuleAccess[]) => {
    if (!editedUser) return;
    setEditedUser(prev => prev ? { ...prev, modules: moduleAccess } : null);
  };

  if (!isOpen || !editedUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className={cn(
        "relative bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border/50",
          "w-full h-full max-w-3xl max-h-[calc(100vh-4rem)]",
        "flex flex-col overflow-hidden",
          "animate-in fade-in-0 zoom-in-95 duration-300",
        className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-user-title"
        aria-describedby="edit-user-description"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={editedUser.avatar} alt={editedUser.name} />
              <AvatarFallback>{editedUser.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 id="edit-user-title" className="text-2xl font-semibold text-foreground">
                Edit User
              </h2>
              <p id="edit-user-description" className="text-sm text-muted-foreground">
                Update user information, role, and permissions for {editedUser.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StatusDot status={editedUser.status} showLabel />
            <Button 
              ref={closeButtonRef}
              variant="ghost" 
              size="sm" 
              onClick={handleClose} 
              className="h-8 w-8 p-0"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-8 py-4 border-b border-border/20 bg-background/60">
          <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 flex-1 justify-center",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                  aria-pressed={activeTab === tab.id}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area with proper scrolling */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background/80" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--border)) transparent'
        }}>
          <div className="p-6">
          {activeTab === 'basic' && (
                            <div className="max-w-2xl mx-auto space-y-6">
                <Card className="bg-background/95 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                  </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) => updateField('name', e.target.value)}
                          className={cn(errors.name ? "border-red-500" : "")}
                        placeholder="Enter full name"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-sm text-red-500" role="alert">
                            {errors.name}
                          </p>
                        )}
                    </div>
                      
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => updateField('email', e.target.value)}
                          className={cn(errors.email ? "border-red-500" : "")}
                        placeholder="Enter email address"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-sm text-red-500" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId" className="text-sm font-medium">Employee ID *</Label>
                      <Input
                        id="employeeId"
                        value={editedUser.employeeId || ''}
                        onChange={(e) => updateField('employeeId', e.target.value)}
                          className={cn(errors.employeeId ? "border-red-500" : "")}
                        placeholder="Enter employee ID"
                          aria-invalid={!!errors.employeeId}
                          aria-describedby={errors.employeeId ? "employeeId-error" : undefined}
                        />
                        {errors.employeeId && (
                          <p id="employeeId-error" className="text-sm text-red-500" role="alert">
                            {errors.employeeId}
                          </p>
                        )}
                    </div>
                      
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm font-medium">Department</Label>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">Account Status</Label>
                      <Select
                        value={editedUser.status}
                        onValueChange={(value: 'active' | 'inactive' | 'suspended') => updateField('status', value)}
                      >
                          <SelectTrigger>
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
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'role' && (
              <div className="w-full">
              <RoleAssignment
                currentRole={editedUser.role}
                availableRoles={availableRoles}
                onRoleChange={updateRole}
                userModules={editedUser.modules}
              />
            </div>
          )}

          {activeTab === 'permissions' && (
              <div className="w-full">
              <PermissionMatrix
                userModules={editedUser.modules}
                availableModules={availableModules}
                onModuleAccessChange={updateModuleAccess}
              />
            </div>
          )}

          {activeTab === 'audit' && (
                            <div className="max-w-2xl mx-auto space-y-6">
                <Card className="bg-background/95 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl">Activity Log</CardTitle>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">User created</p>
                        <p className="text-sm text-muted-foreground">
                          {editedUser.createdAt?.toLocaleDateString()} at {editedUser.createdAt?.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">Last login</p>
                        <p className="text-sm text-muted-foreground">
                          {editedUser.lastLogin ? 
                            `${editedUser.lastLogin.toLocaleDateString()} at ${editedUser.lastLogin.toLocaleTimeString()}` :
                            'Never'
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">Last updated</p>
                        <p className="text-sm text-muted-foreground">
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

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {hasChanges && (
              <Alert className="max-w-xs">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  You have unsaved changes.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="outline" onClick={handleClose} className="px-4">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!hasChanges || saving}
              className="px-4"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 