"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-filter backdrop-blur-sm shadow-sm",
  {
    variants: {
      variant: {
        default: "border-white/20 bg-white/20 text-gray-800 dark:text-white",
        secondary: "border-white/10 bg-white/10 text-gray-800 dark:text-white",
        destructive: "border-red-500/20 bg-red-500/20 text-red-700 dark:text-red-300",
        outline: "border-white/30 bg-transparent text-gray-800 dark:text-white",
        success: "border-green-500/20 bg-green-500/20 text-green-700 dark:text-green-300",
        warning: "border-yellow-500/20 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
        info: "border-blue-500/20 bg-blue-500/20 text-blue-700 dark:text-blue-300",
        gradient: "border-transparent bg-gradient-to-r from-pink-500/30 to-orange-500/30 text-gray-800 dark:text-white",
        frostedGlass: "border-white/20 bg-white/20 text-gray-800 dark:text-white",
      },
    },
    defaultVariants: {
      variant: "frostedGlass",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants }; 