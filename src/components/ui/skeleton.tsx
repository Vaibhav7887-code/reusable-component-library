"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "",
        shimmer: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        wave: "relative overflow-hidden bg-gradient-to-r from-muted to-muted/80 bg-[length:200%_100%] animate-[wave_2s_ease-in-out_infinite]",
        pulse: "animate-pulse",
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
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  className,
  variant,
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, className }))}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
        ...style
      }}
      {...props}
    />
  );
}

// Pre-defined skeleton components
function SkeletonText({ className, ...props }: Omit<SkeletonProps, "width" | "height">) {
  return <Skeleton className={cn("h-4 w-full", className)} {...props} />;
}

function SkeletonCircle({ size = 40, className, ...props }: Omit<SkeletonProps, "width" | "height"> & { size?: number }) {
  return (
    <Skeleton
      className={cn("rounded-full", className)}
      width={size}
      height={size}
      {...props}
    />
  );
}

function SkeletonCard({ className, ...props }: Omit<SkeletonProps, "width" | "height">) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

function SkeletonAvatar({ className, ...props }: Omit<SkeletonProps, "width" | "height">) {
  return (
    <div className="flex items-center space-x-4" {...props}>
      <SkeletonCircle />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard, SkeletonAvatar }; 