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
      case "satellite":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
            <path d="M7 4a2 2 0 0 1 2-2h1.94a2 2 0 0 1 1.94 1.51L13 6.14a2 2 0 0 0 1.51 1.94l.55.14a2 2 0 0 1 1.94 1.94L17 13a2 2 0 0 0 1.94 1.51l.55.14a2 2 0 0 1 1.94 1.94L20 17a2 2 0 0 1-2 2h-1.94a2 2 0 0 1-1.94-1.51L15 17.86a2 2 0 0 0-1.51-1.94l-.55-.14a2 2 0 0 1-1.94-1.94L11 11a2 2 0 0 0-1.94-1.51l-.55-.14a2 2 0 0 1-1.94-1.94L7 4z" />
            <path d="m14.5 4.5 3-3" />
            <path d="M11.5 12.5 8 16" />
          </svg>
        );
      case "copy":
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
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        );
      case "rotate-cw":
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
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 1 1 9 9 9.75 9.75 0 0 1-6.74-2.74L3 19" />
          </svg>
        );
      case "trash-2":
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
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        );
      default:
        return null;
    }
  };

  return renderIcon();
} 