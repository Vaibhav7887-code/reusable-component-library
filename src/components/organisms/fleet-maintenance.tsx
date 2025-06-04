"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Wrench,
  AlertTriangle,
  Circle,
  Octagon,
  Droplet,
  Settings,
  Info,
  Target,
  AlertCircle,
  Clock,
  Calendar,
  FileText,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

// Progress Ring Component for maintenance indicators
interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

function ProgressRing({ progress, size = 60, strokeWidth = 4, className = "", children }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Get color based on remaining percentage
  const getProgressColor = (percentage: number) => {
    if (percentage <= 20) return "text-red-500"; // Critical - red
    if (percentage <= 50) return "text-orange-500"; // Warning - orange  
    return "text-green-500"; // Good - green
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`${getProgressColor(progress)} transition-all duration-500 ease-in-out`}
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

// Mock data for maintenance alerts
const maintenanceAlerts = [
  {
    id: 1,
    type: "Brake Pad Wear",
    severity: "critical",
    percentage: 10, // 10% remaining (90% worn)
    description: "Brake pads have 1,200 km left—enough to reach Mumbai, not Delhi",
    issue: "Front brake pad wear is nearing the 15% threshold",
    prediction: "Approximately 1,200km remaining (based on usage and sensor history)",
    reason: "Frequent braking in city traffic causing accelerated wear",
    vehicle: "MH-01-AB-1234",
    estimatedKm: 1200,
    maxKm: 5000,
    confidence: 94,
    icon: "brake",
    logs: [
      { date: "3,00 km ago", event: "Last Service", type: "maintenance" },
      { date: "2 days ago", event: "Brake inspection", type: "inspection" }
    ]
  },
  {
    id: 2,
    type: "Engine Oil",
    severity: "warning",
    percentage: 35, // 35% remaining (65% degraded)
    description: "Engine oil degradation detected, service recommended",
    issue: "Oil viscosity has decreased by 25% from optimal levels",
    prediction: "Approximately 800km remaining before critical level",
    reason: "Extended urban driving and stop-start traffic patterns",
    vehicle: "MH-01-AB-5678",
    estimatedKm: 800,
    maxKm: 1000,
    confidence: 87,
    icon: "oil",
    logs: [
      { date: "5,00 km ago", event: "Oil change", type: "maintenance" },
      { date: "1 day ago", event: "Oil analysis", type: "inspection" }
    ]
  },
  {
    id: 3,
    type: "Tire Pressure",
    severity: "info",
    percentage: 55, // 55% remaining (45% below optimal)
    description: "Front left tire pressure below optimal range",
    issue: "Tire pressure 12% below recommended PSI",
    prediction: "No immediate action required, monitor for 200km",
    reason: "Temperature fluctuations and normal air permeation",
    vehicle: "MH-01-AB-9012",
    estimatedKm: 200,
    maxKm: 400,
    confidence: 76,
    icon: "tire",
    logs: [
      { date: "1,00 km ago", event: "Tire rotation", type: "maintenance" },
      { date: "Today", event: "Pressure check", type: "inspection" }
    ]
  }
];

export function FleetMaintenance() {
  const [selectedAlert, setSelectedAlert] = React.useState(maintenanceAlerts[0]);
  const [isScheduling, setIsScheduling] = React.useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-orange-500';
      case 'info': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 border-red-500/20';
      case 'warning': return 'bg-orange-500/10 border-orange-500/20';
      case 'info': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'brake': return <Octagon className="h-5 w-5" />;
      case 'oil': return <Droplet className="h-5 w-5" />;
      case 'tire': return <Circle className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  const handleScheduleService = () => {
    setIsScheduling(true);
    // Simulate API call
    setTimeout(() => {
      setIsScheduling(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="h-6 w-6" />
            FleetEdge AI
          </h2>
          <p className="text-muted-foreground">Predictive maintenance powered by AI</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <Circle className="h-2 w-2 fill-current mr-1" />
            AI Active
          </Badge>
        </div>
      </div>

      {/* Alert Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {maintenanceAlerts.map((alert) => (
          <Card 
            key={alert.id}
            className={cn(
              "cursor-pointer transition-all duration-200 border",
              selectedAlert.id === alert.id 
                ? "ring-2 ring-primary bg-primary/15 border-primary shadow-lg scale-[1.02] hover:scale-[1.02]" 
                : cn(
                    "hover:scale-[1.02] hover:shadow-lg hover:bg-background/60",
                    getSeverityBg(alert.severity)
                  )
            )}
            onClick={() => setSelectedAlert(alert)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("flex items-center gap-2", getSeverityColor(alert.severity))}>
                  {getIcon(alert.icon)}
                  <span className="font-medium text-sm">{alert.type}</span>
                </div>
                <Badge 
                  variant={alert.severity === 'critical' ? 'destructive' : alert.severity === 'warning' ? 'warning' : alert.severity === 'info' ? 'outline' : 'secondary'}
                  className={cn(
                    "text-xs",
                    alert.severity === 'warning' && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                    alert.severity === 'info' && "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  )}
                >
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <ProgressRing progress={alert.percentage} size={40} strokeWidth={3}>
                  <span className="text-xs font-medium">{alert.percentage}%</span>
                </ProgressRing>
                <div className="flex-1">
                  <div className="text-sm font-medium">{alert.vehicle}</div>
                  <div className="text-xs text-muted-foreground">{alert.estimatedKm}km remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Alert Card */}
        <div className="lg:col-span-2">
          <Card className={cn("border-2", getSeverityBg(selectedAlert.severity))}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={selectedAlert.severity === 'critical' ? 'destructive' : selectedAlert.severity === 'warning' ? 'warning' : selectedAlert.severity === 'info' ? 'outline' : 'secondary'}
                    className={cn(
                      "flex items-center gap-1",
                      selectedAlert.severity === 'warning' && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                      selectedAlert.severity === 'info' && "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    )}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {selectedAlert.severity.toUpperCase()}
                  </Badge>
                  <CardTitle className="text-xl">{selectedAlert.type}</CardTitle>
                  <div className="flex items-center gap-2">
                    <ProgressRing progress={selectedAlert.percentage} size={50} strokeWidth={4}>
                      <span className="text-sm font-bold">{selectedAlert.percentage}%</span>
                    </ProgressRing>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">{selectedAlert.description}</h3>
              </div>

              {/* Issue Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Issue:</span>
                  </div>
                  <p className="text-muted-foreground ml-6">{selectedAlert.issue}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Prediction:</span>
                  </div>
                  <p className="text-muted-foreground ml-6">{selectedAlert.prediction}</p>
                  <div className="ml-6 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-500"
                          style={{ 
                            width: `${(selectedAlert.estimatedKm / selectedAlert.maxKm) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{selectedAlert.estimatedKm}km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Why:</span>
                  </div>
                  <p className="text-muted-foreground ml-6">{selectedAlert.reason}</p>
                </div>

                {/* AI Confidence */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                      AI Confidence
                    </Badge>
                    <span className="font-medium">{selectedAlert.confidence}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Updated 2 min ago
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Logs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedAlert.logs.map((log, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium">{log.event}</div>
                    <div className="text-xs text-muted-foreground">{log.date}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      log.type === 'maintenance' && "bg-green-500/10 text-green-500 border-green-500/20",
                      log.type === 'inspection' && "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    )}
                  >
                    {log.type}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-3">
                <ChevronRight className="h-3 w-3 mr-1" />
                VIEW LOGS
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Button 
                onClick={handleScheduleService}
                disabled={isScheduling}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isScheduling ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Service
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Defer and Monitor
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Vehicle Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Service</span>
                <span className="text-sm font-medium">3,00 km ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Time Since</span>
                <span className="text-sm font-medium">2 days ago</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Issues</span>
                <span className="text-sm font-medium text-red-500">3 Critical</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 