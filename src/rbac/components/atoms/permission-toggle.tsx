"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PermissionToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  description?: string;
  risk?: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

export function PermissionToggle({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  description,
  risk = 'low',
  className
}: PermissionToggleProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
      "bg-white/10 backdrop-blur-sm border border-white/20",
      "hover:bg-white/20 hover:border-white/30",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}>
      <div className="flex items-center gap-3 flex-1">
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          aria-describedby={description ? `${label}-desc` : undefined}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{label}</span>
            {risk !== 'low' && (
              <Badge variant={getRiskColor(risk)} className="text-xs">
                {risk.toUpperCase()}
              </Badge>
            )}
          </div>
          {description && (
            <p id={`${label}-desc`} className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 