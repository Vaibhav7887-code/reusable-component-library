"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

export function Icon({
  name,
  size = "md",
  color,
  className,
  ...props
}: IconProps) {
  const sizeClass = iconSizes[size];
  
  const renderIcon = () => {
    switch (name) {
      case "arrow-left":
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(sizeClass, className)}
            style={color ? { color } : undefined}
            {...props}
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        );
      case "arrow-right":
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(sizeClass, className)}
            style={color ? { color } : undefined}
            {...props}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        );
      case "plus":
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(sizeClass, className)}
            style={color ? { color } : undefined}
            {...props}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        );
      case "search":
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(sizeClass, className)}
            style={color ? { color } : undefined}
            {...props}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        );
      case "calendar":
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(sizeClass, className)}
            style={color ? { color } : undefined}
            {...props}
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        );
      case "check":
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(sizeClass, className)}
            style={color ? { color } : undefined}
            {...props}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return renderIcon();
} 