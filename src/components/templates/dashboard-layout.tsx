"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBackButton?: boolean;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function DashboardLayout({
  children,
  className,
  showBackButton = true,
  title,
  description,
  actions,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <div className="frosted-glass-background min-h-screen">
      <div className="container py-4">
        <div className="flex flex-col space-y-4">
          {showBackButton && (
            <div>
              <Link href="/">
                <Button variant="outline" size="sm" className="mb-4">
                  <span className="mr-2">←</span> Back to Showcase
                </Button>
              </Link>
            </div>
          )}
          
          {(title || description || actions) && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                {title && <h1 className="text-2xl font-bold">{title}</h1>}
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
          )}
          
          <div className={cn("flex flex-col md:flex-row gap-6", className)}>
            {sidebar && (
              <div className="md:w-1/4 lg:w-1/5">
                {sidebar}
              </div>
            )}
            <div className={cn(sidebar ? "md:w-3/4 lg:w-4/5" : "w-full")}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 