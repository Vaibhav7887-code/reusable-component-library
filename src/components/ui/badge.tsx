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
        outline: "text-foreground",
        // Vehicle Status Variants
        moving: "border-transparent bg-green-500/20 text-green-500 hover:bg-green-500/30",
        stopped: "border-transparent bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
        offline: "border-transparent bg-red-500/20 text-red-500 hover:bg-red-500/30",
        maintenance: "border-transparent bg-orange-500/20 text-orange-500 hover:bg-orange-500/30",
        idling: "border-transparent bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
        warning: "border-transparent bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
        // Vehicle Type Variants
        bs4: "border-transparent bg-gray-500/20 text-gray-500 hover:bg-gray-500/30",
        bs6: "border-transparent bg-purple-500/20 text-purple-500 hover:bg-purple-500/30",
        electric: "border-transparent bg-green-500/20 text-green-500 hover:bg-green-500/30",
        construction: "border-transparent bg-orange-500/20 text-orange-500 hover:bg-orange-500/30",
        unsubscribed: "border-transparent bg-red-500/20 text-red-500 hover:bg-red-500/30",
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