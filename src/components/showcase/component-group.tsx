"use client";

import React from "react";
import { ComponentCard } from "./component-card";
import { cn } from "@/lib/utils";

interface ComponentGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentGroup({
  title,
  description,
  children,
  className,
}: ComponentGroupProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            {description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
} 