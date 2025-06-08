"use client";

import React, { useState } from 'react';
import { CompactSimulator } from './compact-simulator';
import { Trace } from './trace';
import { PolicyEditorV2 } from './policy-editor-v2';
import { FleetEvents } from './fleet-events';
import { FleetEvent, TraceStep, Policy, mockPolicies } from '../data/mock-tech-data';
import { JitAccessModal } from './jit-access-modal';
import { ShieldQuestion } from 'lucide-react';
import { useToast } from '@/components/providers/toast-provider';
import { CheckCircle, XCircle } from 'lucide-react';

export function AuthSandbox() {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<FleetEvent | null>(null);
  const [jitLogCallback, setJitLogCallback] = useState<((status: 'Approved' | 'Denied') => void) | null>(null);
  const [trace, setTrace] = useState<TraceStep[] | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const handleRunSimulation = (newTrace: TraceStep[]) => {
    setTrace(newTrace);
    setSelectedPolicy(null);
  };

  const handleResetSimulation = () => {
    setTrace(null);
    setSelectedPolicy(null);
  };

  const handleSelectTraceStep = (policyId: string) => {
    const policy = mockPolicies.find(p => p.id === policyId) || null;
    setSelectedPolicy(policy);
  };
  
  const handleEventClick = (event: FleetEvent, logCallback: (status: 'Approved' | 'Denied') => void) => {
    setSelectedEvent(event);
    setJitLogCallback(() => logCallback);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedEvent(null);
      setJitLogCallback(null);
    }
  };

  const handleJitDecision = (status: 'Approved' | 'Denied') => {
    if (jitLogCallback && selectedEvent) {
      jitLogCallback(status);
      console.log(`JIT Access ${status} for event: ${selectedEvent.id}`);
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            {status === 'Approved' ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
            <span>JIT Access {status}</span>
          </div>
        ),
        description: `Access for "${selectedEvent.proposedPermissions.user}" regarding "${selectedEvent.title}" has been ${status.toLowerCase()}.`,
        variant: status === 'Approved' ? 'default' : 'destructive',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <CompactSimulator onRunSimulation={handleRunSimulation} onReset={handleResetSimulation} />
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
          {/* Column 1: Trace */}
          <div className="md:col-span-1 min-h-0">
            <Trace 
              trace={trace} 
              selectedPolicyId={selectedPolicy?.id || null}
              onSelectTraceStep={handleSelectTraceStep} 
            />
          </div>

          {/* Column 2: Policy Context */}
          <div className="md:col-span-1 min-h-0 h-full">
            {selectedPolicy ? (
              <PolicyEditorV2 policy={selectedPolicy} />
            ) : (
              <div className="h-full flex items-center justify-center rounded-lg glass-card">
                <div className="text-center p-4">
                  <ShieldQuestion className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">Policy Context</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select a step from the Evaluation Trace to view its policy details.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Fleet Events */}
          <div className="md:col-span-1 min-h-0">
            <FleetEvents onEventClick={handleEventClick} />
          </div>
        </div>
      </div>

      <JitAccessModal 
        event={selectedEvent} 
        onOpenChange={handleModalOpenChange} 
        onDecision={handleJitDecision}
      />
    </>
  );
} 