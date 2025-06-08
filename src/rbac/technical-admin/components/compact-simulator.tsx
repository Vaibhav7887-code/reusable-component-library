'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockActors, mockResources, TraceStep } from "../data/mock-tech-data";
import { PlayCircle } from 'lucide-react';

interface CompactSimulatorProps {
  onRunSimulation: (trace: TraceStep[]) => void;
  onReset: () => void;
}

export function CompactSimulator({ onRunSimulation, onReset }: CompactSimulatorProps) {
  const [actorId, setActorId] = useState<string>("");
  const [resourceId, setResourceId] = useState<string>("");
  const [action, setAction] = useState<string>("");

  const handleRun = () => {
    onReset();
    if (action === 'vehicle:update:load_balance') {
      onRunSimulation(require('../data/mock-tech-data').mockTraceDenied);
    } else {
      onRunSimulation(require('../data/mock-tech-data').mockTraceGranted);
    }
  };

  return (
    <div className="flex-shrink-0 flex items-center gap-4 p-3 mb-4 border rounded-lg bg-background/50">
      <span className="font-semibold text-sm text-muted-foreground">Simulate:</span>
      <div className="flex items-center gap-2 flex-grow">
        <Select onValueChange={setActorId} value={actorId}>
          <SelectTrigger className="w-[250px]"><SelectValue placeholder="Select Actor..." /></SelectTrigger>
          <SelectContent>
            {mockActors.map((actor) => (
              <SelectItem key={actor.id} value={actor.id}>{actor.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setAction} value={action}>
          <SelectTrigger className="w-[250px]"><SelectValue placeholder="Select Action..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="vehicle:read:telemetry">Read Telemetry</SelectItem>
            <SelectItem value="vehicle:update:load_balance">Update Load Balance</SelectItem>
            <SelectItem value="vehicle:update:maintenance_log">Update Maintenance Log</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setResourceId} value={resourceId}>
          <SelectTrigger className="w-[250px]"><SelectValue placeholder="Select Resource..." /></SelectTrigger>
          <SelectContent>
            {mockResources.map((resource) => (
              <SelectItem key={resource.id} value={resource.id}>{resource.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleRun} className="gap-2">
        <PlayCircle className="h-4 w-4" />
        Run Simulation
      </Button>
    </div>
  );
} 