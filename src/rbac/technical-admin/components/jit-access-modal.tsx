'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, User, KeyRound, Clock } from 'lucide-react';
import { FleetEvent } from '../data/mock-tech-data';

interface JitAccessModalProps {
  event: FleetEvent | null;
  onOpenChange: (open: boolean) => void;
  onDecision: (status: 'Approved' | 'Denied') => void;
}

export function JitAccessModal({ event, onOpenChange, onDecision }: JitAccessModalProps) {
  if (!event) return null;

  const handleDecision = (status: 'Approved' | 'Denied') => {
    onDecision(status);
    onOpenChange(false);
  };

  return (
    <Dialog open={!!event} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-400" />
            Just-in-Time Access Request
          </DialogTitle>
          <DialogDescription>
            Review and approve temporary access based on a live fleet event.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="p-4 rounded-lg border bg-background/50">
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-muted-foreground">{event.vehicleId}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">User:</span>
              <span>{event.proposedPermissions.user}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Duration:</span>
              <span>{event.proposedPermissions.durationHours} hours</span>
            </div>
            <div className="flex items-start gap-3">
              <KeyRound className="h-4 w-4 text-muted-foreground mt-1" />
              <span className="font-medium">Permissions:</span>
              <div className="flex flex-wrap gap-2">
                {event.proposedPermissions.permissions.map((perm) => (
                  <Badge key={perm} variant="secondary">{perm}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button variant="destructive" onClick={() => handleDecision('Denied')}>
            Deny
          </Button>
          <Button variant="secondary" onClick={() => handleDecision('Approved')}>
            Approve Temporary Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 