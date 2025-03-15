"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "faded" | "gradient";
  label?: string;
}

export function Divider({
  className,
  orientation = "horizontal",
  variant = "default",
  label,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";
  
  const baseClasses = cn(
    isHorizontal ? "w-full h-px my-4" : "h-full w-px mx-4",
    variant === "default" && "bg-white/20",
    variant === "faded" && "bg-gradient-to-r from-transparent via-white/20 to-transparent",
    variant === "gradient" && "bg-gradient-to-r from-blue-500/30 to-purple-500/30",
    className
  );
  
  if (label && isHorizontal) {
    return (
      <div className="relative flex items-center w-full my-4">
        <div className={cn("flex-grow", variant === "default" && "bg-white/20", variant === "faded" && "bg-gradient-to-r from-transparent via-white/20 to-transparent", variant === "gradient" && "bg-gradient-to-r from-blue-500/30 to-purple-500/30", "h-px")} />
        <span className="px-2 text-xs text-muted-foreground">{label}</span>
        <div className={cn("flex-grow", variant === "default" && "bg-white/20", variant === "faded" && "bg-gradient-to-r from-transparent via-white/20 to-transparent", variant === "gradient" && "bg-gradient-to-r from-blue-500/30 to-purple-500/30", "h-px")} />
      </div>
    );
  }
  
  return <div className={baseClasses} />;
} 