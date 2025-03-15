"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "rounded-md backdrop-filter backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white/30 animate-pulse shadow-sm",
        pulse: "bg-white/30 animate-pulse shadow-sm",
        shimmer: "animate-shimmer bg-gradient-to-r from-white/20 via-white/40 to-white/20 bg-[length:400%_100%] shadow-sm",
        wave: "animate-wave bg-gradient-to-r from-white/20 via-white/40 to-white/20 bg-[length:200%_100%] shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

function SkeletonCircle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("h-12 w-12 rounded-full bg-white/30 animate-pulse backdrop-filter backdrop-blur-sm shadow-sm", className)}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-white/30 bg-white/20 p-4 shadow-md backdrop-filter backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

function SkeletonAvatar() {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg border border-white/30 bg-white/20 backdrop-filter backdrop-blur-lg shadow-md">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="rounded-lg border border-white/30 bg-white/20 p-4 shadow-md backdrop-filter backdrop-blur-lg">
      <div className="space-y-4">
        <div className="flex gap-4 pb-2 border-b border-white/10">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="rounded-lg border border-white/30 bg-white/20 p-4 shadow-md backdrop-filter backdrop-blur-lg">
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-1/3" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-10 rounded-md" />
            <Skeleton className="h-5 w-10 rounded-md" />
            <Skeleton className="h-5 w-10 rounded-md" />
          </div>
        </div>
        <div className="h-40 w-full">
          <Skeleton className="h-full w-full rounded-md" variant="shimmer" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCircle, SkeletonCard, SkeletonAvatar, SkeletonTable, SkeletonChart, skeletonVariants }; 