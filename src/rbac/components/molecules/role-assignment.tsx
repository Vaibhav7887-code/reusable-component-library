"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Users, 
  ArrowRight, 
  Lock,
  Unlock
} from "lucide-react";
import type { Role, ModuleAccess } from "@/rbac/types";

export interface RoleAssignmentProps {
  currentRole: Role;
  availableRoles: Role[];
  onRoleChange: (role: Role) => void;
  userModules?: ModuleAccess[];
  className?: string;
}

export function RoleAssignment({
  currentRole,
  availableRoles,
  onRoleChange,
  userModules = [],
  className
}: RoleAssignmentProps) {
  const [selectedRole, setSelectedRole] = React.useState<Role>(currentRole);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  // Handle role selection
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    
    // Show confirmation for role changes with impact
    if (role.id !== currentRole.id && hasSignificantChange(role)) {
      setShowConfirmation(true);
    } else {
      confirmRoleChange(role);
    }
  };

  // Confirm role change
  const confirmRoleChange = (role: Role) => {
    onRoleChange(role);
    setShowConfirmation(false);
  };

  // Check if role change has significant impact
  const hasSignificantChange = (newRole: Role): boolean => {
    // Check if moving from/to admin role
    if (currentRole.name === 'Admin' || newRole.name === 'Admin') {
      return true;
    }
    
    // Check if permissions are significantly different
    const currentPermissionCount = userModules.reduce((total, m) => total + m.permissions.length, 0);
    const newRolePermissionCount = newRole.permissions.length;
    
    return Math.abs(currentPermissionCount - newRolePermissionCount) > 3;
  };

  // Get role comparison data
  const getRoleComparison = (role: Role) => {
    const currentPermissionCount = userModules.reduce((total, m) => total + m.permissions.length, 0);
    const estimatedNewPermissions = role.permissions.length;
    
    return {
      currentPermissions: currentPermissionCount,
      newPermissions: estimatedNewPermissions,
      moduleChange: 0, // Simplified for now
      accessIncrease: estimatedNewPermissions > currentPermissionCount,
      significantChange: Math.abs(estimatedNewPermissions - currentPermissionCount) > 5
    };
  };

  // Get role security level
  const getRoleSecurityLevel = (role: Role): 'low' | 'medium' | 'high' | 'critical' => {
    switch (role.name.toLowerCase()) {
      case 'admin':
        return 'critical';
      case 'fleet manager':
        return 'high';
      case 'mechanic':
        return 'medium';
      default:
        return 'low';
    }
  };

  return (
    <div className={cn("space-y-6 w-full", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold">Role Assignment</h3>
          <p className="text-sm text-muted-foreground">
            Select a role to define the user's base permissions and access level
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-muted-foreground">Current:</span>
          <RoleIndicator role={currentRole} showUserCount={false} />
        </div>
      </div>

      {/* Current Role Info */}
      <Card variant="frostedGlass" className="bg-blue-50/30 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Current Role</CardTitle>
                <CardDescription>Active role and permissions</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-white/50">
              {userModules.length} modules assigned
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <RoleIndicator role={currentRole} size="lg" />
              <div className="min-w-0">
                <div className="font-medium">{currentRole.name}</div>
                <div className="text-sm text-muted-foreground">{currentRole.description}</div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-medium">
                {userModules.reduce((total, m) => total + m.permissions.length, 0)} permissions
              </div>
              <div className="text-xs text-muted-foreground">
                Across {userModules.length} modules
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Roles */}
      <div className="space-y-3 w-full">
        <h4 className="font-medium">Available Roles</h4>
        <div className="grid gap-3 w-full">
          {availableRoles.map((role) => {
            const comparison = getRoleComparison(role);
            const securityLevel = getRoleSecurityLevel(role);
            const isCurrentRole = role.id === currentRole.id;
            const isSelected = role.id === selectedRole.id;

            return (
              <Card
                key={role.id}
                variant="frostedGlass"
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isCurrentRole && "opacity-60 cursor-not-allowed",
                  isSelected && !isCurrentRole && "ring-2 ring-blue-500 bg-blue-50/20",
                  !isCurrentRole && "hover:bg-white/10 hover:scale-[1.01]"
                )}
                onClick={() => !isCurrentRole && handleRoleSelect(role)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <RoleIndicator role={role} showUserCount />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{role.name}</span>
                          {isCurrentRole && (
                            <Badge variant="secondary" className="text-xs px-2 py-1">Current</Badge>
                          )}
                          {securityLevel === 'critical' && (
                            <Badge variant="destructive" className="gap-1 text-xs px-2 py-1">
                              <Lock className="h-3 w-3" />
                              High Security
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {role.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Permission Change Indicator */}
                      {!isCurrentRole && (
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className={cn(
                              "font-medium",
                              comparison.accessIncrease ? "text-orange-600" : "text-green-600"
                            )}>
                              {comparison.accessIncrease ? '+' : ''}{comparison.newPermissions - comparison.currentPermissions} permissions
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {comparison.moduleChange > 0 ? '+' : ''}{comparison.moduleChange} modules
                          </div>
                        </div>
                      )}

                      {/* Selection Button */}
                      {!isCurrentRole && (
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className="gap-2"
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Selected
                            </>
                          ) : (
                            <>
                              <Unlock className="h-4 w-4" />
                              Select
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Change Confirmation Dialog */}
      {showConfirmation && selectedRole.id !== currentRole.id && (
        <Alert className="border-amber-200 bg-amber-50/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="space-y-3">
            <div>
              <strong>Confirm Role Change</strong>
              <p className="mt-1">
                You're about to change the user's role from <strong>{currentRole.name}</strong> to <strong>{selectedRole.name}</strong>.
              </p>
            </div>
            
            <div className="bg-white/60 p-3 rounded border">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Current permissions:</span>
                  <span className="font-medium">{getRoleComparison(selectedRole).currentPermissions}</span>
                </div>
                <div className="flex justify-between">
                  <span>New permissions:</span>
                  <span className="font-medium">{getRoleComparison(selectedRole).newPermissions}</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span>Change:</span>
                  <span className={cn(
                    "font-medium",
                    getRoleComparison(selectedRole).accessIncrease ? "text-orange-600" : "text-green-600"
                  )}>
                    {getRoleComparison(selectedRole).accessIncrease ? '+' : ''}
                    {getRoleComparison(selectedRole).newPermissions - getRoleComparison(selectedRole).currentPermissions}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirmation(false)}
                className="gap-2"
              >
                <XCircle className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => confirmRoleChange(selectedRole)}
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Confirm Change
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Role Details */}
      {selectedRole.id !== currentRole.id && !showConfirmation && (
        <Card variant="frostedGlass" className="bg-green-50/30 border-green-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Role Change Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/50 rounded">
                <span className="text-sm">Selected Role:</span>
                <RoleIndicator role={selectedRole} />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 rounded">
                <span className="text-sm">Estimated Permissions:</span>
                <span className="font-medium">{getRoleComparison(selectedRole).newPermissions}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 rounded">
                <span className="text-sm">Access Level:</span>
                <Badge variant={getRoleSecurityLevel(selectedRole) === 'critical' ? 'destructive' : 'secondary'}>
                  {getRoleSecurityLevel(selectedRole)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 