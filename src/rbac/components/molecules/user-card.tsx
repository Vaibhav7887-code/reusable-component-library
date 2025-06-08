"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { StatusDot } from "@/rbac/components/atoms/status-dot";
import { cn } from "@/lib/utils";
import type { User } from "@/rbac/types";

export interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onViewPermissions?: (user: User) => void;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export function UserCard({
  user,
  onEdit,
  onDelete, 
  onViewPermissions,
  variant = 'default',
  className
}: UserCardProps) {
  const formatLastLogin = (date: Date | null) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getAccessCount = () => {
    return user.modules.reduce((total, module) => total + module.permissions.length, 0);
  };

  if (variant === 'compact') {
    return (
      <Card variant="frostedGlass" className={cn("p-4", className)}>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10" fallback={user.avatar || user.name.split(' ').map((n: string) => n[0]).join('')} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">{user.name}</p>
              <StatusDot status={user.status} />
            </div>
            <RoleIndicator role={user.role} size="sm" />
          </div>
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(user)}>
              Edit
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="frostedGlass" className={cn("transition-all duration-200 hover:shadow-lg", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar 
            className="h-12 w-12" 
                          fallback={user.avatar || user.name.split(' ').map((n: string) => n[0]).join('')}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg truncate">{user.name}</CardTitle>
              <StatusDot status={user.status} />
            </div>
            <CardDescription className="truncate">{user.email}</CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <RoleIndicator role={user.role} />
              {user.department && (
                <Badge variant="outline" className="text-xs">
                  {user.department}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Last Login</p>
            <p className="font-medium">{formatLastLogin(user.lastLogin)}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Permissions</p>
            <p className="font-medium">{getAccessCount()} access grants</p>
          </div>
          {variant === 'detailed' && (
            <>
              <div>
                <p className="text-muted-foreground mb-1">Employee ID</p>
                <p className="font-medium">{user.employeeId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Modules</p>
                <p className="font-medium">{user.modules.length} active</p>
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-3">
        {onViewPermissions && (
          <Button variant="outline" size="sm" onClick={() => onViewPermissions(user)} className="flex-1">
            View Access
          </Button>
        )}
        {onEdit && (
          <Button variant="default" size="sm" onClick={() => onEdit(user)} className="flex-1">
            Edit
          </Button>
        )}
        {onDelete && user.status !== 'active' && (
          <Button variant="destructive" size="sm" onClick={() => onDelete(user)}>
            Remove
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 