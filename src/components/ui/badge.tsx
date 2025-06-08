"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        warning:
          "border-transparent bg-yellow-500 text-destructive-foreground hover:bg-yellow-500/80",
        info:
          "border-transparent bg-blue-500 text-destructive-foreground hover:bg-blue-500/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        frostedGlass:
          "border-white/10 bg-white/10 backdrop-blur-md text-white hover:bg-white/20",
        gradient:
          "border-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600",
        // Vehicle Status Variants
        moving: "border-transparent bg-green-500 text-white hover:bg-green-600",
        stopped: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        offline: "border-transparent bg-red-500 text-white hover:bg-red-600",
        maintenance: "border-transparent bg-orange-500 text-white hover:bg-orange-600",
        idling: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        // Vehicle Type Variants
        bs4: "border-transparent bg-gray-500 text-white hover:bg-gray-600",
        bs6: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        electric: "border-transparent bg-green-500 text-white hover:bg-green-600",
        construction: "border-transparent bg-orange-500 text-white hover:bg-orange-600",
        unsubscribed: "border-transparent bg-red-500 text-white hover:bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }; 