"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        ghost: "border-none shadow-none hover:bg-accent/50",
        underlined: "rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0 focus-visible:border-primary",
      },
      animation: {
        none: "",
        glow: "transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(66,153,225,0.6)]",
        expand: "transition-all duration-300 focus:px-5",
        colorShift: "transition-all duration-300 focus:border-blue-500",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
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
      <div className="relative w-full">
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
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-focus-within:w-full" />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants }; 