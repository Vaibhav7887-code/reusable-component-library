"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { User } from "@/rbac/types";

export interface StatusDotProps {
  status: User['status'];
  showLabel?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function StatusDot({
  status,
  showLabel = false,
  size = 'default',
  className
}: StatusDotProps) {
  const getStatusConfig = (status: User['status']) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-green-500',
          label: 'Active',
          textColor: 'text-green-700'
        };
      case 'inactive':
        return {
          color: 'bg-gray-500',
          label: 'Inactive', 
          textColor: 'text-gray-700'
        };
      case 'suspended':
        return {
          color: 'bg-red-500',
          label: 'Suspended',
          textColor: 'text-red-700'
        };
      default:
        return {
          color: 'bg-gray-400',
          label: 'Unknown',
          textColor: 'text-gray-600'
        };
    }
  };

  const sizeClasses = {
    sm: "w-2 h-2",
    default: "w-3 h-3",
    lg: "w-4 h-4"
  };

  const config = getStatusConfig(status);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "rounded-full flex-shrink-0",
          config.color,
          sizeClasses[size]
        )}
        aria-label={`Status: ${config.label}`}
      />
      {showLabel && (
        <span className={cn("text-sm font-medium", config.textColor)}>
          {config.label}
        </span>
      )}
    </div>
  );
} 