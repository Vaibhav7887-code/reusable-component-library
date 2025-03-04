"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white",
        warning: "border-transparent bg-yellow-500 text-black",
        info: "border-transparent bg-blue-500 text-white",
        gradient: "border-transparent bg-gradient-to-r from-pink-500 to-orange-500 text-white",
        pulse: "border-transparent bg-primary text-primary-foreground animate-pulse-slow",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        ping: "animate-ping",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "none",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  animation,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, animation, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants }; 