"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  className?: string;
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "default" | "blue" | "green" | "red" | "purple" | "orange";
}

export function StatsCard({
  className,
  title,
  value,
  icon,
  trend,
  color = "default"
}: StatsCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "from-blue-500/20 to-blue-600/20 border-blue-500/30";
      case "green":
        return "from-green-500/20 to-green-600/20 border-green-500/30";
      case "red":
        return "from-red-500/20 to-red-600/20 border-red-500/30";
      case "purple":
        return "from-purple-500/20 to-purple-600/20 border-purple-500/30";
      case "orange":
        return "from-orange-500/20 to-orange-600/20 border-orange-500/30";
      default:
        return "from-white/20 to-white/10 border-white/20";
    }
  };
  
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.isPositive) {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-green-500"
        >
          <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
        </svg>
      );
    }
    
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-red-500"
      >
        <path d="M7 7l5 5 5-5M7 17l5-5 5 5" />
      </svg>
    );
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden border bg-gradient-to-br backdrop-filter backdrop-blur-sm", 
        getColorClasses(),
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {getTrendIcon()}
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 