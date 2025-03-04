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
    <Card className={cn("overflow-hidden", className)} variant="elevated">
      <CardHeader className="p-4" style={{ backgroundColor: "hsla(var(--muted), 0.5)" }}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <div className="line-clamp-1 mt-1 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                {description}
              </div>
            )}
          </div>
          {codeString && (
            <button
              onClick={() => setIsCodeVisible(!isCodeVisible)}
              className="rounded-md p-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {isCodeVisible ? "Hide Code" : "View Code"}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex min-h-[120px] items-center justify-center rounded-md border p-6">
            {children}
          </div>
          {isCodeVisible && codeString && (
            <div className="relative rounded-md p-4" style={{ backgroundColor: "hsl(var(--muted))" }}>
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