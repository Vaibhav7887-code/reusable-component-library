"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  codeString?: string;
  showCode?: boolean;
}

export function ComponentCard({
  title,
  description,
  children,
  className,
  codeString,
  showCode = false,
}: ComponentCardProps) {
  const [isCodeVisible, setIsCodeVisible] = React.useState(showCode);

  return (
    <Card className={cn("overflow-hidden", className)} variant="frostedGlass">
      <CardHeader className="p-4 bg-white/20 dark:bg-black/20 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <div className="line-clamp-1 mt-1 text-sm text-gray-700 dark:text-gray-300">
                {description}
              </div>
            )}
          </div>
          {codeString && (
            <button
              onClick={() => setIsCodeVisible(!isCodeVisible)}
              className="rounded-md p-2 text-sm font-medium transition-colors hover:bg-white/20 dark:hover:bg-white/10"
            >
              {isCodeVisible ? "Hide Code" : "View Code"}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex min-h-[120px] items-center justify-center rounded-md border border-white/20 p-6 bg-white/10 dark:bg-black/20">
            {children}
          </div>
          {isCodeVisible && codeString && (
            <div className="relative rounded-md p-4 bg-white/20 dark:bg-black/30 text-gray-800 dark:text-gray-200">
              <pre className="overflow-x-auto text-sm">
                <code className="language-tsx">{codeString}</code>
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 