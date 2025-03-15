"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-filter backdrop-blur-sm border-white/20 text-gray-800 dark:text-white shadow-sm px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        outline: "bg-white/15 backdrop-filter backdrop-blur-sm border-2 border-white/30 text-gray-800 dark:text-white shadow-sm px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-white/50",
        ghost: "bg-transparent backdrop-filter backdrop-blur-sm border-none shadow-none text-gray-800 dark:text-white px-3 py-2 hover:bg-white/10 focus-visible:bg-white/15 focus-visible:ring-1 focus-visible:ring-white/30",
        underlined: "bg-transparent backdrop-filter backdrop-blur-sm border-x-0 border-t-0 border-b-2 border-white/30 text-gray-800 dark:text-white px-3 py-2 rounded-t-md rounded-b-none focus-visible:ring-0 focus-visible:border-white/50",
        frostedGlass: "bg-white/20 backdrop-filter backdrop-blur-sm border border-white/20 text-gray-800 dark:text-white shadow-sm px-3 py-2 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2",
      },
      animation: {
        none: "",
        glow: "transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,255,255,0.5)]",
        expand: "transition-all duration-300 focus:px-5",
        colorShift: "transition-all duration-300 focus:border-white/50",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "frostedGlass",
      animation: "none",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, animation, inputSize, icon, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", variant === "underlined" && "group")}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          className={cn(
            inputVariants({ variant, animation, inputSize, className }),
            icon && "pl-10"
          )}
          ref={ref}
          {...props}
        />
        {variant === "underlined" && (
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white/50 transition-all duration-300 group-focus-within:w-full" />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants }; 