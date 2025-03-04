"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-14 w-14",
        xl: "h-20 w-20",
      },
      ringColor: {
        none: "",
        primary: "ring-2",
        secondary: "ring-2",
        accent: "ring-2",
        gradient: "ring-2 ring-gradient-to-r from-pink-500 to-purple-500",
      },
      animation: {
        none: "",
        animated: "cursor-pointer transition-all duration-300",
      },
    },
    defaultVariants: {
      size: "default",
      ringColor: "none",
      animation: "none",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  isAnimated?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, ringColor, src, alt, fallback, isAnimated, animation, style, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    const showFallback = !src || hasError || !isLoaded;
    
    // Use the animation variant or determine from isAnimated
    const animationValue = animation || (isAnimated ? "animated" : "none");
    
    // Define ring color styles
    const ringStyles: React.CSSProperties = {};
    
    if (ringColor === "primary") {
      ringStyles.borderColor = "hsl(var(--primary))";
    } else if (ringColor === "secondary") {
      ringStyles.borderColor = "hsl(var(--secondary))";
    } else if (ringColor === "accent") {
      ringStyles.borderColor = "hsl(var(--accent))";
    }
    
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, ringColor, animation: animationValue, className }))}
        style={{
          ...ringStyles,
          ...style,
        }}
        {...props}
      >
        {!showFallback ? (
          <img 
            src={src} 
            alt={alt || "Avatar"} 
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "aspect-square h-full w-full object-cover",
              isAnimated && "hover:scale-110 transition-transform duration-300"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: "hsl(var(--muted))" }}>
            {fallback ? (
              <span className="text-sm font-medium uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>
                {fallback}
              </span>
            ) : (
              <span className="text-sm font-medium uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>
                {alt ? alt.charAt(0) : "A"}
              </span>
            )}
          </div>
        )}
        
        {isAnimated && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ opacity: 0.1 }}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants }; 