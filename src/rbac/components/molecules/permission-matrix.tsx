"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionToggle } from "@/rbac/components/atoms/permission-toggle";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, CheckCircle, XCircle, MoreHorizontal } from "lucide-react";
import type { Module, ModuleAccess, Permission, PermissionAction } from "@/rbac/types";

export interface PermissionMatrixProps {
  userModules: ModuleAccess[];
  availableModules: Module[];
  onModuleAccessChange: (moduleAccess: ModuleAccess[]) => void;
  className?: string;
}

export function PermissionMatrix({
  userModules,
  availableModules,
  onModuleAccessChange,
  className
}: PermissionMatrixProps) {
  // Calculate permission risk level
  const getPermissionRisk = (action: PermissionAction): 'low' | 'medium' | 'high' | 'critical' => {
    switch (action) {
      case 'create':
      case 'update':
        return 'medium';
      case 'delete':
      case 'manage':
        return 'critical';
      case 'execute':
        return 'high';
      default:
        return 'low';
    }
  };

  // Get user's access to a specific module
  const getUserModuleAccess = (moduleId: string): ModuleAccess | null => {
    return userModules.find(m => m.moduleId === moduleId) || null;
  };

  // Check if user has specific permission
  const hasPermission = (moduleId: string, permissionId: string): boolean => {
    const moduleAccess = getUserModuleAccess(moduleId);
    return moduleAccess?.permissions.includes(permissionId) || false;
  };

  // Toggle permission for a module
  const togglePermission = (moduleId: string, permissionId: string, enabled: boolean) => {
    const updatedModules = [...userModules];
    
    // Find existing module access
    let moduleAccessIndex = updatedModules.findIndex(m => m.moduleId === moduleId);
    
    if (moduleAccessIndex === -1) {
      // Create new module access if it doesn't exist
      const module = availableModules.find(m => m.id === moduleId);
      if (module && enabled) {
        updatedModules.push({
          moduleId,
          accessLevel: 'view',
          permissions: [permissionId],
          grantedAt: new Date(),
          grantedBy: 'current_user' // In real app, this would be the current admin user
        });
      }
    } else {
      // Update existing module access
      const moduleAccess = updatedModules[moduleAccessIndex];
      
      if (enabled) {
        // Add permission if not already present
        if (!moduleAccess.permissions.includes(permissionId)) {
          moduleAccess.permissions.push(permissionId);
        }
      } else {
        // Remove permission
        moduleAccess.permissions = moduleAccess.permissions.filter(p => p !== permissionId);
        
        // Remove module access entirely if no permissions left
        if (moduleAccess.permissions.length === 0) {
          updatedModules.splice(moduleAccessIndex, 1);
        }
      }
    }
    
    onModuleAccessChange(updatedModules);
  };

  // Toggle all permissions for a module
  const toggleAllModulePermissions = (moduleId: string, enabled: boolean) => {
    const module = availableModules.find(m => m.id === moduleId);
    if (!module) return;

    const updatedModules = [...userModules];
    const moduleAccessIndex = updatedModules.findIndex(m => m.moduleId === moduleId);

    if (enabled) {
      const allPermissionIds = module.permissions.map(p => p.id);
      
      if (moduleAccessIndex === -1) {
        // Create new module access with all permissions
        updatedModules.push({
          moduleId,
          accessLevel: 'admin',
          permissions: allPermissionIds,
          grantedAt: new Date(),
          grantedBy: 'current_user'
        });
      } else {
        // Update existing module access with all permissions
        updatedModules[moduleAccessIndex].permissions = allPermissionIds;
        updatedModules[moduleAccessIndex].accessLevel = 'admin';
      }
    } else {
      // Remove all permissions (remove module access entirely)
      if (moduleAccessIndex !== -1) {
        updatedModules.splice(moduleAccessIndex, 1);
      }
    }

    onModuleAccessChange(updatedModules);
  };

  // Calculate module statistics
  const getModuleStats = (moduleId: string) => {
    const module = availableModules.find(m => m.id === moduleId);
    if (!module) return { granted: 0, total: 0, percentage: 0 };

    const userAccess = getUserModuleAccess(moduleId);
    const granted = userAccess?.permissions.length || 0;
    const total = module.permissions.length;
    const percentage = total > 0 ? Math.round((granted / total) * 100) : 0;

    return { granted, total, percentage };
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Permission Matrix</h3>
          <p className="text-sm text-muted-foreground">
            Manage individual permissions across fleet modules
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Shield className="h-3 w-3" />
          {userModules.length} module{userModules.length !== 1 ? 's' : ''} assigned
        </Badge>
      </div>

      {/* Module Permission Cards */}
      <div className="space-y-4 w-full">
        {availableModules.map((module) => {
          const stats = getModuleStats(module.id);
          const hasAnyAccess = stats.granted > 0;
          
          return (
            <Card 
              key={module.id} 
              variant="frostedGlass"
              className={cn(
                "transition-all duration-200 w-full",
                hasAnyAccess && "ring-1 ring-blue-200 bg-blue-50/30"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl flex-shrink-0">{module.icon}</div>
                    <div className="min-w-0">
                      <CardTitle className="text-base">{module.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {stats.granted}/{stats.total} permissions
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stats.percentage}% access
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAllModulePermissions(module.id, !hasAnyAccess)}
                      className={cn(
                        "gap-2",
                        hasAnyAccess ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"
                      )}
                    >
                      {hasAnyAccess ? (
                        <>
                          <XCircle className="h-4 w-4" />
                          Revoke All
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Grant All
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      stats.percentage > 80 ? "bg-green-500" :
                      stats.percentage > 50 ? "bg-yellow-500" :
                      stats.percentage > 0 ? "bg-blue-500" : "bg-gray-300"
                    )}
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid gap-3">
                  {module.permissions.map((permission) => (
                    <PermissionToggle
                      key={permission.id}
                      checked={hasPermission(module.id, permission.id)}
                      onCheckedChange={(checked) => togglePermission(module.id, permission.id, checked)}
                      label={permission.name}
                      description={permission.description}
                      risk={getPermissionRisk(permission.action)}
                      className="bg-white/5"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Section */}
      <Card variant="frostedGlass" className="bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Permission Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {userModules.length}
              </div>
              <div className="text-xs text-muted-foreground">Modules Assigned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userModules.reduce((total, m) => total + m.permissions.length, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Permissions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {userModules.filter(m => 
                  availableModules.find(mod => mod.id === m.moduleId)?.permissions
                    .some(p => getPermissionRisk(p.action) === 'critical' && m.permissions.includes(p.id))
                ).length}
              </div>
              <div className="text-xs text-muted-foreground">Critical Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  (userModules.reduce((total, m) => total + m.permissions.length, 0) / 
                   availableModules.reduce((total, m) => total + m.permissions.length, 0)) * 100
                )}%
              </div>
              <div className="text-xs text-muted-foreground">Overall Access</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 