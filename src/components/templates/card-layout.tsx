"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const gapSizes = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function CardLayout({
  children,
  className,
  columns = 3,
  gap = "md",
  fullWidth = false,
}: CardLayoutProps) {
  const gapClass = gapSizes[gap];
  const colClass = columnClasses[columns];
  
  return (
    <div 
      className={cn(
        "grid", 
        colClass, 
        gapClass,
        fullWidth ? "w-full" : "max-w-6xl mx-auto",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        // If the child is already a Card, return it as is
        if (child.type === Card) {
          return child;
        }
        
        // Otherwise, wrap it in a Card
        return (
          <Card className="overflow-hidden">
            {child}
          </Card>
        );
      })}
    </div>
  );
} 