"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { PermissionToggle } from "@/rbac/components/atoms/permission-toggle";
import { cn } from "@/lib/utils";
import { 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  AlertTriangle, 
  Shield, 
  Mail, 
  Phone, 
  Building,
  Eye,
  Save,
  UserPlus
} from "lucide-react";
import type { User as UserType, Role, Module, Permission } from "@/rbac/types";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<StepProps>;
  validation?: (data: Partial<NewUserData>) => string | null;
  canSkip?: boolean;
}

interface NewUserData {
  // Basic Info
  name: string;
  email: string;
  employeeId: string;
  department: string;
  phoneNumber?: string;
  
  // Role & Permissions
  roleId: string;
  customPermissions: string[];
  
  // Account Settings
  status: 'active' | 'inactive';
  sendWelcomeEmail: boolean;
  requirePasswordChange: boolean;
  
  // Metadata
  manager?: string;
  startDate: string;
  notes?: string;
}

interface StepProps {
  data: Partial<NewUserData>;
  onChange: (updates: Partial<NewUserData>) => void;
  availableRoles: Role[];
  availableModules: Module[];
  errors: Record<string, string>;
}

interface UserOnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: (user: UserType) => void;
  availableRoles: Role[];
  availableModules: Module[];
  existingUsers: UserType[];
}

// Step 1: Basic Information
function BasicInfoStep({ data, onChange, errors }: StepProps) {
  return (
    <div className="space-y-6" data-tutorial="user-form">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Rajesh Kumar"
              value={data.name || ''}
              onChange={(e) => onChange({ name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="rajesh@fleetedge.com"
              value={data.email || ''}
              onChange={(e) => onChange({ email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID *</Label>
            <Input
              id="employeeId"
              placeholder="FE-2024-001"
              value={data.employeeId || ''}
              onChange={(e) => onChange({ employeeId: e.target.value })}
              className={errors.employeeId ? 'border-red-500' : ''}
            />
            {errors.employeeId && <p className="text-sm text-red-600">{errors.employeeId}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Select value={data.department || ''} onValueChange={(value) => onChange({ department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent style={{ zIndex: 999999 }}>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
              </SelectContent>
            </Select>
            {errors.department && <p className="text-sm text-red-600">{errors.department}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="+91 98765 43210"
              value={data.phoneNumber || ''}
              onChange={(e) => onChange({ phoneNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={data.startDate || ''}
              onChange={(e) => onChange({ startDate: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-800">Quick Tips:</span>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use the employee's preferred name for better recognition</li>
          <li>• Employee ID should follow company format (FE-YYYY-XXX)</li>
          <li>• Department affects default role recommendations</li>
        </ul>
      </div>
    </div>
  );
}

// Step 2: Role Assignment
function RoleAssignmentStep({ data, onChange, availableRoles, errors }: StepProps) {
  const selectedRole = availableRoles.find(r => r.id === data.roleId);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Role *</Label>
          <div className="grid grid-cols-2 gap-3" data-tutorial="role-selection">
            {availableRoles.map((role) => (
              <Card 
                key={role.id}
                variant="frostedGlass"
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  data.roleId === role.id ? "ring-2 ring-primary" : ""
                )}
                onClick={() => onChange({ roleId: role.id })}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RoleIndicator role={role} showUserCount />
                      <div>
                        <h4 className="font-medium">{role.name}</h4>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      {role.permissions.length} permissions
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {errors.roleId && <p className="text-sm text-red-600">{errors.roleId}</p>}
        </div>

        {selectedRole && (
          <Card variant="frostedGlass">
            <CardHeader>
              <CardTitle className="text-lg">Role Preview: {selectedRole.name}</CardTitle>
              <CardDescription>
                This role includes {selectedRole.permissions.length} permissions across multiple modules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {selectedRole.permissions.slice(0, 6).map((permission) => (
                  <div key={permission.id} className="flex flex-col items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{permission.name}</span>
                    </div>
                    <Badge variant="outline">
                      {permission.module.name}
                    </Badge>
                  </div>
                ))}
              </div>
              {selectedRole.permissions.length > 6 && (
                <p className="text-sm text-muted-foreground text-center">
                  +{selectedRole.permissions.length - 6} more permissions
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <span className="font-medium text-orange-800">Security Notice:</span>
        </div>
        <p className="text-sm text-orange-700">
          Role permissions can be customized in the next step if needed. Start with the closest matching role.
        </p>
      </div>
    </div>
  );
}

// Step 3: Permission Customization
function PermissionCustomizationStep({ data, onChange, availableRoles, availableModules }: StepProps) {
  const selectedRole = availableRoles.find(r => r.id === data.roleId);
  const customPermissions = data.customPermissions || [];

  const togglePermission = (permissionId: string) => {
    const updated = customPermissions.includes(permissionId)
      ? customPermissions.filter(id => id !== permissionId)
      : [...customPermissions, permissionId];
    onChange({ customPermissions: updated });
  };

  const hasPermission = (permissionId: string) => {
    return selectedRole?.permissions.some(p => p.id === permissionId) || 
           customPermissions.includes(permissionId);
  };

  if (!selectedRole) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please select a role first</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Customize Permissions for {selectedRole.name}</h3>
        <p className="text-muted-foreground">
          Add or remove specific permissions as needed. Changes from role defaults will be tracked.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {availableModules.map((module) => (
          <Card key={module.id} variant="frostedGlass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-lg">{module.icon}</span>
                {module.name}
              </CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {module.permissions.map((permission) => {
                const isRoleDefault = selectedRole.permissions.some(p => p.id === permission.id);
                const isCustomEnabled = customPermissions.includes(permission.id);
                const isEnabled = hasPermission(permission.id);

                return (
                  <div key={permission.id} className="flex flex-col gap-2 p-3 bg-gray-50/50 rounded-lg">
                    <div className="flex-1">
                      <PermissionToggle
                        checked={isEnabled}
                        onCheckedChange={() => togglePermission(permission.id)}
                        label={permission.name}
                        description={permission.description}
                        risk={permission.id.includes('manage') || permission.id.includes('delete') ? 'high' : 'low'}
                      />
                    </div>
                    <div className="flex gap-2">
                      {isRoleDefault && <Badge variant="outline" className="text-xs">Role Default</Badge>}
                      {isCustomEnabled && <Badge variant="warning" className="text-xs">Custom</Badge>}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {customPermissions.length > 0 && (
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="font-medium text-yellow-800">Custom Permissions Applied:</span>
          </div>
          <p className="text-sm text-yellow-700">
            {customPermissions.length} custom permission(s) added. These will be tracked for compliance.
          </p>
        </div>
      )}
    </div>
  );
}

// Step 4: Account Settings
function AccountSettingsStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Account Status</Label>
          <Select 
            value={data.status || 'inactive'} 
            onValueChange={(value: 'active' | 'inactive') => onChange({ status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ zIndex: 999999 }}>
              <SelectItem value="active">Active - User can log in immediately</SelectItem>
              <SelectItem value="inactive">Inactive - User account created but disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label>Send Welcome Email</Label>
              <p className="text-sm text-muted-foreground">Send login credentials and welcome message</p>
            </div>
            <input
              type="checkbox"
              checked={data.sendWelcomeEmail ?? true}
              onChange={(e) => onChange({ sendWelcomeEmail: e.target.checked })}
              className="h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Require Password Change</Label>
              <p className="text-sm text-muted-foreground">Force password change on first login</p>
            </div>
            <input
              type="checkbox"
              checked={data.requirePasswordChange ?? true}
              onChange={(e) => onChange({ requirePasswordChange: e.target.checked })}
              className="h-4 w-4"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <textarea
          id="notes"
          placeholder="Any special instructions or notes about this user..."
          value={data.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="w-full p-3 border rounded-md min-h-[100px] resize-none"
        />
      </div>

      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <Check className="h-4 w-4 text-green-600" />
          <span className="font-medium text-green-800">Ready to Create User</span>
        </div>
        <p className="text-sm text-green-700">
          Review all settings and click "Create User" to complete the onboarding process.
        </p>
      </div>
    </div>
  );
}

// Step 5: Review & Confirm
function ReviewConfirmStep({ data, availableRoles }: StepProps) {
  const selectedRole = availableRoles.find(r => r.id === data.roleId);
  const customPermissionCount = data.customPermissions?.length || 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Review New User</h3>
        <p className="text-muted-foreground">
          Please review all information before creating the user account.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card variant="frostedGlass">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarFallback className="text-2xl">{(data.name || 'U').slice(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{data.name}</h3>
              <p className="text-muted-foreground">{data.email}</p>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">{data.department} • {data.employeeId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role & Permissions */}
        <Card variant="frostedGlass">
          <CardHeader>
            <CardTitle className="text-lg">Role & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedRole && (
              <div className="flex items-center justify-between">
                <RoleIndicator role={selectedRole} showUserCount />
                <div className="text-right text-sm">
                  <div>{selectedRole.permissions.length} base permissions</div>
                  {customPermissionCount > 0 && (
                    <div className="text-orange-600">+{customPermissionCount} custom</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card variant="frostedGlass">
          <CardHeader>
            <CardTitle className="text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant={data.status === 'active' ? 'success' : 'secondary'}>
                {data.status || 'inactive'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Welcome Email:</span>
              <span>{data.sendWelcomeEmail ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span>Force Password Change:</span>
              <span>{data.requirePasswordChange ? 'Yes' : 'No'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Enter user details and contact information',
    component: BasicInfoStep,
    validation: (data) => {
      if (!data.name) return 'Name is required';
      if (!data.email) return 'Email is required';
      if (!data.employeeId) return 'Employee ID is required';
      if (!data.department) return 'Department is required';
      return null;
    }
  },
  {
    id: 'role-assignment',
    title: 'Role Assignment',
    description: 'Select the appropriate role for this user',
    component: RoleAssignmentStep,
    validation: (data) => {
      if (!data.roleId) return 'Role selection is required';
      return null;
    }
  },
  {
    id: 'permission-customization',
    title: 'Permission Customization',
    description: 'Customize permissions as needed',
    component: PermissionCustomizationStep,
    canSkip: true
  },
  {
    id: 'account-settings',
    title: 'Account Settings',
    description: 'Configure account status and settings',
    component: AccountSettingsStep
  },
  {
    id: 'review-confirm',
    title: 'Review & Confirm',
    description: 'Review all information before creating the user',
    component: ReviewConfirmStep
  }
];

export function UserOnboardingWizard({
  isOpen,
  onClose,
  onUserCreated,
  availableRoles,
  availableModules,
  existingUsers
}: UserOnboardingWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [userData, setUserData] = React.useState<Partial<NewUserData>>({
    status: 'inactive',
    sendWelcomeEmail: true,
    requirePasswordChange: true,
    startDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = React.useState(false);

  const currentStepData = onboardingSteps[currentStep];
  const StepComponent = currentStepData.component;
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const validateCurrentStep = () => {
    const step = onboardingSteps[currentStep];
    if (step.validation) {
      const error = step.validation(userData);
      if (error) {
        setErrors({ general: error });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, onboardingSteps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleUserDataChange = (updates: Partial<NewUserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
    setErrors({});
  };

  const handleCreateUser = async () => {
    if (!validateCurrentStep()) return;

    setIsCreating(true);
    try {
      // Simulate user creation with delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create mock user object
      const newUser: UserType = {
        id: `user_${Date.now()}`,
        name: userData.name!,
        email: userData.email!,
        employeeId: userData.employeeId,
        department: userData.department,
        avatar: userData.name!.slice(0, 2),
        role: availableRoles.find(r => r.id === userData.roleId)!,
        modules: [], // Would be populated based on role and custom permissions
        lastLogin: null,
        status: userData.status || 'inactive',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      onUserCreated(newUser);
      onClose();
      
      // Reset wizard state
      setCurrentStep(0);
      setUserData({
        status: 'inactive',
        sendWelcomeEmail: true,
        requirePasswordChange: true,
        startDate: new Date().toISOString().split('T')[0]
      });
      setErrors({});

    } catch (error) {
      setErrors({ general: 'Failed to create user. Please try again.' });
    } finally {
      setIsCreating(false);
    }
  };

  const canProceed = currentStep === onboardingSteps.length - 1;

  if (!isOpen) return null;

  return (
    <>
      {/* Manual backdrop like UserEditPopup */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          className="sm:max-w-2xl bg-white/95 backdrop-blur-xl z-[10003] fixed top-0 right-0 h-full border-l shadow-2xl border border-border/50 flex flex-col"
          style={{ zIndex: 10003, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              User Onboarding Wizard
            </SheetTitle>
          </SheetHeader>

          <div className="flex-grow overflow-y-auto p-6">
            {/* Progress Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
                <span>{currentStepData.title}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-muted-foreground text-sm">
                {currentStepData.description}
              </p>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px] pt-6" data-tutorial={`wizard-step-${currentStep + 1}`}>
              <StepComponent
                data={userData}
                onChange={handleUserDataChange}
                availableRoles={availableRoles}
                availableModules={availableModules}
                errors={errors}
              />
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="shrink-0 bg-gray-100/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-border/50 p-4 z-10">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-2">
                {currentStepData.canSkip && !canProceed && (
                  <Button variant="ghost" onClick={handleNext}>
                    Skip Step
                  </Button>
                )}

                {canProceed ? (
                  <Button
                    onClick={handleCreateUser}
                    disabled={isCreating}
                    className="gap-2"
                  >
                    {isCreating ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Creating User...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Create User
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === onboardingSteps.length - 1}
                  >
                    Next Step
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
} 