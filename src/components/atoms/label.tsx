"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "default" | "required" | "optional";
  size?: "sm" | "md" | "lg";
}

const labelSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Label({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: LabelProps) {
  const sizeClass = labelSizes[size];
  
  return (
    <label
      className={cn(
        "font-medium",
        sizeClass,
        variant === "required" && "after:content-['*'] after:ml-0.5 after:text-red-500",
        variant === "optional" && "after:content-['(optional)'] after:ml-1 after:text-muted-foreground after:text-xs",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
} 