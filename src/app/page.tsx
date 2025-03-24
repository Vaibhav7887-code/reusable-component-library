"use client";

import { ComponentShowcase } from "@/components/showcase";
import { FrostedGlassDemo } from "@/components/showcase/frosted-glass-demo";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="relative z-10">
      <header className="sticky top-0 z-40 w-full border-b frosted-glass supports-[backdrop-filter]:bg-background/5">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a 
              href="https://www.vaibhav.design" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "hsl(var(--primary))" }}></div>
              <span className="font-bold">Design system</span>
            </a>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <a 
              href="/dashboard" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </a>
            <a 
              href="/fleet-management" 
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fleet Management
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://github.com/Vaibhav7887-code/reusable-component-library" 
              className="text-sm font-medium transition-colors hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.vaibhav.design"
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: "hsl(var(--muted-foreground))" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
            <a
              href="https://www.linkedin.com/in/vaibhav-sharma-752611145/"
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: "hsl(var(--muted-foreground))" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>
      </header>
      
      <FrostedGlassDemo />
      
      <ComponentShowcase />
      
      <footer className="border-t py-6 md:py-0 frosted-glass">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose md:text-left"
             style={{ color: "hsl(var(--muted-foreground))" }}>
            Built with ❤️ and modern web technologies.
          </p>
        </div>
      </footer>
    </main>
  );
}
