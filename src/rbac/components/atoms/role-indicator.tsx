"use client";

import * as React from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Role, BadgeVariant } from "@/rbac/types";

export interface RoleIndicatorProps {
  role: Role;
  showUserCount?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function RoleIndicator({
  role,
  showUserCount = false,
  size = 'default',
  className
}: RoleIndicatorProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    default: "text-sm px-2.5 py-0.5", 
    lg: "text-base px-3 py-1"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge 
        variant={role.color as BadgeVariant}
        className={cn(sizeClasses[size], "font-medium")}
      >
        {role.name}
      </Badge>
      {showUserCount && (
        <span className="text-xs text-muted-foreground">
          {role.userCount} user{role.userCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
} 