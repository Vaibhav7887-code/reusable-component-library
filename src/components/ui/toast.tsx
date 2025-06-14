"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border p-4 shadow-lg transition-all backdrop-filter backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white/20 border-white/20 text-gray-800 dark:text-white",
        destructive: "bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-300",
        success: "bg-green-500/20 border-green-500/30 text-green-700 dark:text-green-300",
        warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-700 dark:text-yellow-300",
        info: "bg-blue-500/20 border-blue-500/30 text-blue-700 dark:text-blue-300",
        frostedGlass: "bg-white/20 border-white/20 text-gray-800 dark:text-white",
      },
      animation: {
        slideRight: "",
        slideUp: "",
        fade: "",
        scale: "",
      },
    },
    defaultVariants: {
      variant: "frostedGlass",
      animation: "slideRight",
    },
  }
);

export interface ToastProps
  extends Omit<HTMLMotionProps<"div">, "animate" | "initial" | "transition" | "variants" | "title">,
    VariantProps<typeof toastVariants> {
  title?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, action, animation, onClose, duration = 5000, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
      let timer: NodeJS.Timeout;
      
      if (duration !== Infinity && duration > 0) {
        timer = setTimeout(() => {
          setVisible(false);
          setTimeout(() => {
            onClose?.();
          }, 300); // Allow animation to complete before removal
        }, duration);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [duration, onClose]);

    // Animation variants based on the animation prop
    const getAnimationVariants = () => {
      switch (animation) {
        case "slideRight":
          return {
            hidden: { x: "-100%", opacity: 0 },
            visible: { x: 0, opacity: 1 },
            exit: { x: "100%", opacity: 0 }
          };
        case "slideUp":
          return {
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1 },
            exit: { y: "-100%", opacity: 0 }
          };
        case "fade":
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 }
          };
        case "scale":
          return {
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 }
          };
        default:
          return {
            hidden: { x: "-100%", opacity: 0 },
            visible: { x: 0, opacity: 1 },
            exit: { x: "100%", opacity: 0 }
          };
      }
    };

    const animationVariants = getAnimationVariants();

    return (
      <motion.div
        ref={ref}
        className={cn(toastVariants({ variant, animation, className }))}
        initial="hidden"
        animate={visible ? "visible" : "exit"}
        variants={animationVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        {...props}
      >
        <div className="flex-grow mr-2">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {action && <div>{action}</div>}
          {onClose && (
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(() => onClose(), 300);
              }}
              className="flex-shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </motion.div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast, toastVariants }; 