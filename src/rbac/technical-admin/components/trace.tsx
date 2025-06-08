'use client';

import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, ShieldQuestion } from "lucide-react";
import { TraceStep, Policy } from "../data/mock-tech-data";

const traceIcons = {
  granted: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  denied: <XCircle className="h-5 w-5 text-red-500" />,
  not_applicable: <ShieldQuestion className="h-5 w-5 text-gray-400" />,
};

interface TraceProps {
  trace: TraceStep[] | null;
  selectedPolicyId: string | null;
  onSelectTraceStep: (policyId: string) => void;
}

export function Trace({ trace, selectedPolicyId, onSelectTraceStep }: TraceProps) {
  return (
    <Card className="h-full flex flex-col glass-card">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Evaluation Trace</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3 font-mono text-sm">
            {!trace && (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Run a simulation to see the trace.</p>
              </div>
            )}
            {trace && trace.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer",
                  "bg-black/5 dark:bg-white/5 border-white/10",
                  "hover:bg-black/10 dark:hover:bg-white/10 hover:border-white/20",
                  selectedPolicyId === step.policyId && "bg-blue-500/10 border-blue-500/20"
                )}
                onClick={() => onSelectTraceStep(step.policyId)}
              >
                <div className="mt-0.5">{traceIcons[step.status]}</div>
                <div className="flex-1">
                  <div className="font-medium">
                    Policy{' '}
                    <span className="font-semibold text-primary/90 dark:text-white/90">
                      "{step.policyName}"
                    </span>
                    {' '}resulted in:{' '}
                    <span className={cn(
                      "font-semibold",
                      step.status === 'denied' && 'text-red-500',
                      step.status === 'granted' && 'text-green-500'
                    )}>
                      {step.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {step.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 