"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-filter backdrop-blur-sm border border-white/20 text-gray-800 dark:text-white shadow-sm hover:bg-white/30 hover:border-white/30 active:bg-white/50 active:scale-[0.96] active:shadow-inner-md active:border-white/40",
        
        destructive: "bg-red-500/20 backdrop-filter backdrop-blur-sm border border-red-500/30 text-red-700 dark:text-red-300 shadow-sm hover:bg-red-500/30 hover:border-red-500/40 active:bg-red-500/50 active:scale-[0.96] active:shadow-inner-md active:border-red-500/50",
        
        outline: "bg-transparent backdrop-filter backdrop-blur-sm border-2 border-white/30 text-gray-800 dark:text-white hover:bg-white/10 hover:border-white/50 active:bg-white/30 active:scale-[0.96] active:shadow-inner-md active:border-white/60",
        
        secondary: "bg-indigo-500/30 backdrop-filter backdrop-blur-sm border border-indigo-500/40 text-indigo-900 dark:text-indigo-100 shadow-sm hover:bg-indigo-500/40 hover:border-indigo-500/50 active:bg-indigo-500/60 active:scale-[0.96] active:shadow-inner-md active:border-indigo-500/60",
        
        ghost: "bg-transparent text-gray-800 dark:text-white hover:bg-white/10 active:bg-white/30 active:scale-[0.96] active:shadow-inner-md",
        
        link: "text-gray-800 dark:text-white underline-offset-4 hover:underline active:text-gray-600 dark:active:text-gray-300 active:scale-[0.98]",
        
        gradient: "bg-gradient-to-r from-blue-500/70 to-purple-600/70 backdrop-filter backdrop-blur-sm text-white shadow-md hover:from-blue-600/70 hover:to-purple-700/70 active:from-blue-700/70 active:to-purple-800/70 active:scale-[0.96] active:shadow-inner-md",
        
        frostedGlass: "bg-white/20 backdrop-filter backdrop-blur-sm border border-white/20 text-gray-800 dark:text-white shadow-sm hover:bg-white/30 hover:border-white/30 active:bg-white/50 active:scale-[0.96] active:shadow-inner-md active:border-white/40",
        
        segmented: "bg-transparent text-gray-800 dark:text-white hover:bg-white/10 active:bg-white/30 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
      state: {
        default: "",
        loading: "relative text-transparent transition-none hover:text-transparent cursor-wait",
        disabled: "opacity-50 cursor-not-allowed pointer-events-none",
        active: "bg-primary text-primary-foreground shadow-sm",
      }
    },
    defaultVariants: {
      variant: "frostedGlass",
      size: "default",
      state: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, state, asChild = false, isLoading = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Determine the state based on loading and disabled props
    const buttonState = isLoading ? "loading" : disabled ? "disabled" : state;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, state: buttonState, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {props.children}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="animate-spin h-5 w-5 text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 