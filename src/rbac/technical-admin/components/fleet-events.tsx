import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFleetEvents, FleetEvent } from '../data/mock-tech-data';
import { AlertTriangle, Info, BellDot, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';

const severityIcons = {
  Critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
  Warning: <BellDot className="h-5 w-5 text-yellow-500" />,
  Info: <Info className="h-5 w-5 text-blue-500" />,
};

const severityColors = {
  Critical: 'border-red-500/50 hover:border-red-500',
  Warning: 'border-yellow-500/50 hover:border-yellow-500',
  Info: 'border-blue-500/50 hover:border-blue-500',
};

const severityBadgeVariants = {
  Critical: "destructive",
  Warning: "warning",
  Info: "info",
} as const;

interface JitLogEntry {
  id: number;
  timestamp: Date;
  eventTitle: string;
  vehicleId: string;
  status: 'Approved' | 'Denied';
}

interface FleetEventsProps {
  onEventClick: (event: FleetEvent, logCallback: (status: 'Approved' | 'Denied') => void) => void;
}

export function FleetEvents({ onEventClick }: FleetEventsProps) {
  const [jitLogs, setJitLogs] = useState<JitLogEntry[]>([]);
  const [activeTab, setActiveTab] = useState('events');

  const handleLog = (event: FleetEvent, status: 'Approved' | 'Denied') => {
    const newLogEntry: JitLogEntry = {
      id: Date.now(),
      timestamp: new Date(),
      eventTitle: event.title,
      vehicleId: event.vehicleId,
      status,
    };
    setJitLogs(prevLogs => [newLogEntry, ...prevLogs]);
  };

  const handleEventInteraction = (event: FleetEvent) => {
    onEventClick(event, (status) => handleLog(event, status));
  };
  
  return (
    <Card className="h-full flex flex-col glass-card">
      <CardHeader className="flex-shrink-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">Live Fleet Events</TabsTrigger>
            <TabsTrigger value="logs">JIT Access Logs</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
         <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsContent value="events" className="h-full">
                <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                    {mockFleetEvents.map((event) => (
                    <button
                        key={event.id}
                        onClick={() => handleEventInteraction(event)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${severityColors[event.severity]}`}
                    >
                        <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {severityIcons[event.severity]}
                            <div className="flex flex-col">
                            <span className="font-semibold text-sm">{event.title}</span>
                            <span className="text-xs text-muted-foreground">{event.vehicleId}</span>
                            </div>
                        </div>
                        <Badge variant={severityBadgeVariants[event.severity]} className="text-xs">{event.severity}</Badge>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground space-y-1">
                        {Object.entries(event.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                            <span className="font-medium">{key}:</span>
                            <span>{value}</span>
                            </div>
                        ))}
                        </div>
                    </button>
                    ))}
                </div>
                </ScrollArea>
            </TabsContent>
            <TabsContent value="logs" className="h-full">
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-3">
                        {jitLogs.length === 0 ? (
                            <div className="text-center text-sm text-muted-foreground py-10">
                                No JIT access events have been logged yet.
                            </div>
                        ) : (
                            jitLogs.map((log) => (
                                <div key={log.id} className="flex items-center gap-4 text-xs p-2 rounded-md bg-black/5">
                                    {log.status === 'Approved' ? <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /> : <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                                    <div className="flex-grow">
                                        <p className="font-semibold">
                                            JIT Access <span className={log.status === 'Approved' ? 'text-green-500' : 'text-red-500'}>{log.status}</span>
                                        </p>
                                        <p className="text-muted-foreground">{log.eventTitle} for {log.vehicleId}</p>
                                    </div>
                                    <div className="text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{format(log.timestamp, 'HH:mm:ss')}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 