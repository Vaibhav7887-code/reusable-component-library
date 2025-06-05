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
  ChevronDown,
  ChevronUp,
  Radio,
  TrendingUp,
  MapPin,
  Database,
  Cloud,
  X,
  Download,
  BarChart3,
  Activity,
  Zap,
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

// Detailed drill-down data for each factor
const getDetailedFactorData = (alertType: string, factor: string) => {
  const baseData = {
    sensorData: {
      charts: [
        { label: "Signal Strength", value: 95, trend: "stable", data: [92, 94, 95, 96, 95] },
        { label: "Reading Frequency", value: 120, trend: "up", unit: "per hour", data: [100, 110, 115, 118, 120] },
        { label: "Data Quality Score", value: 8.7, trend: "stable", unit: "/10", data: [8.5, 8.6, 8.7, 8.8, 8.7] }
      ],
      rawData: [
        { timestamp: "2024-01-15 14:30", sensor: "Front Brake Pad Sensor", value: "2.3mm", status: "Normal" },
        { timestamp: "2024-01-15 14:25", sensor: "Front Brake Pad Sensor", value: "2.3mm", status: "Normal" },
        { timestamp: "2024-01-15 14:20", sensor: "Brake Temperature", value: "78°C", status: "Normal" }
      ],
      timeline: [
        { date: "2024-01-10", event: "Sensor Calibration", details: "Annual calibration completed" },
        { date: "2023-12-15", event: "Sensor Installation", details: "New brake pad wear sensor installed" },
        { date: "2023-11-20", event: "Sensor Firmware Update", details: "Updated to v2.1.3" }
      ]
    },
    historicalData: {
      charts: [
        { label: "Fleet Average Replacement", value: 85, trend: "stable", unit: "% wear", data: [80, 82, 85, 87, 85] },
        { label: "Similar Vehicle Failures", value: 23, trend: "down", unit: "in last year", data: [30, 28, 25, 24, 23] },
        { label: "Seasonal Variation", value: 15, trend: "up", unit: "% increase", data: [10, 12, 13, 14, 15] }
      ],
      rawData: [
        { vehicle: "MH-01-AB-2245", replacementKm: "4,850km", wearLevel: "88%", dateReplaced: "2024-01-08" },
        { vehicle: "MH-01-AB-3367", replacementKm: "4,720km", wearLevel: "91%", dateReplaced: "2024-01-05" },
        { vehicle: "MH-01-AB-4489", replacementKm: "5,100km", wearLevel: "86%", dateReplaced: "2023-12-28" }
      ],
      timeline: [
        { date: "Q4 2023", event: "Peak Replacement Season", details: "35% higher brake replacements due to monsoon" },
        { date: "Q3 2023", event: "Fleet Analysis", details: "Identified city routes causing 40% faster wear" },
        { date: "Q2 2023", event: "Pattern Recognition", details: "AI model trained on 500+ brake replacements" }
      ]
    },
    usageAnalysis: {
      charts: [
        { label: "City Driving", value: 68, trend: "up", unit: "% of total", data: [60, 63, 65, 67, 68] },
        { label: "Braking Frequency", value: 45, trend: "stable", unit: "per km", data: [42, 44, 45, 46, 45] },
        { label: "Load Factor", value: 78, trend: "down", unit: "% capacity", data: [82, 80, 79, 78, 78] }
      ],
      rawData: [
        { route: "Mumbai Central - Andheri", distance: "28km", brakingEvents: 156, avgSpeed: "24km/h" },
        { route: "Andheri - Bandra", distance: "12km", brakingEvents: 89, avgSpeed: "18km/h" },
        { route: "Bandra - Worli", distance: "8km", brakingEvents: 45, avgSpeed: "32km/h" }
      ],
      timeline: [
        { date: "Last 7 days", event: "Heavy Traffic Routes", details: "60% of driving in high-congestion areas" },
        { date: "Last 30 days", event: "Usage Pattern Change", details: "Shift to more city routes vs highway" },
        { date: "Last 90 days", event: "Load Analysis", details: "Average load increased by 15%" }
      ]
    },
    maintenanceHistory: {
      charts: [
        { label: "Service Compliance", value: 95, trend: "stable", unit: "% on-time", data: [92, 94, 95, 96, 95] },
        { label: "Parts Replacement", value: 12, trend: "down", unit: "components", data: [15, 14, 13, 12, 12] },
        { label: "Maintenance Cost", value: 25600, trend: "up", unit: "₹", data: [23000, 24200, 25100, 25400, 25600] }
      ],
      rawData: [
        { date: "2024-01-10", service: "Brake Inspection", technician: "Raj Kumar", cost: "₹800", notes: "Pads at 15% remaining" },
        { date: "2023-12-15", service: "Full Service", technician: "Amit Singh", cost: "₹5,200", notes: "All systems normal" },
        { date: "2023-11-20", service: "Brake Pad Check", technician: "Raj Kumar", cost: "₹400", notes: "30% remaining" }
      ],
      timeline: [
        { date: "2024-01-10", event: "Scheduled Maintenance", details: "15,000km service completed" },
        { date: "2023-12-15", event: "Comprehensive Service", details: "Annual maintenance with all checks" },
        { date: "2023-11-20", event: "Preventive Check", details: "Early brake inspection due to AI alert" }
      ]
    },
    environmentalFactors: {
      charts: [
        { label: "Temperature Impact", value: 32, trend: "up", unit: "°C avg", data: [28, 29, 30, 31, 32] },
        { label: "Humidity Effect", value: 78, trend: "stable", unit: "% avg", data: [75, 76, 78, 79, 78] },
        { label: "Road Condition", value: 6.8, trend: "down", unit: "/10 quality", data: [7.2, 7.0, 6.9, 6.8, 6.8] }
      ],
      rawData: [
        { factor: "Average Temperature", value: "32°C", impact: "+15% wear rate", season: "Summer" },
        { factor: "Humidity Levels", value: "78%", impact: "+8% corrosion", season: "Monsoon" },
        { factor: "Road Surface Quality", value: "6.8/10", impact: "+12% friction", season: "Post-monsoon" }
      ],
      timeline: [
        { date: "Summer 2023", event: "High Temperature Period", details: "Extended 35°+ days increased brake wear" },
        { date: "Monsoon 2023", event: "Heavy Rainfall", details: "Increased braking on wet surfaces" },
        { date: "Winter 2023", event: "Optimal Conditions", details: "Lowest wear rates of the year" }
      ]
    }
  };

  return baseData[factor as keyof typeof baseData] || baseData.sensorData;
};

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
    confidenceBreakdown: {
      sensorData: { value: 28, description: "High-frequency brake sensor readings with consistent patterns" },
      historicalData: { value: 32, description: "Similar vehicles show brake replacement at 85-90% wear" },
      usageAnalysis: { value: 18, description: "City driving with 40% more braking than highway" },
      maintenanceHistory: { value: 12, description: "Regular service records available for past 2 years" },
      environmentalFactors: { value: 4, description: "Monsoon season increases brake wear by 15%" }
    },
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
    confidenceBreakdown: {
      sensorData: { value: 22, description: "Oil quality sensors show viscosity decline trend" },
      historicalData: { value: 25, description: "Fleet average oil change interval is 5,000km" },
      usageAnalysis: { value: 25, description: "Stop-start traffic increases oil degradation by 30%" },
      maintenanceHistory: { value: 10, description: "Last oil change was 4,200km ago" },
      environmentalFactors: { value: 5, description: "High temperature operation degrades oil faster" }
    },
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
    confidenceBreakdown: {
      sensorData: { value: 20, description: "TPMS sensor readings every 5 minutes" },
      historicalData: { value: 15, description: "Limited historical tire pressure data available" },
      usageAnalysis: { value: 20, description: "Normal driving patterns, no aggressive cornering" },
      maintenanceHistory: { value: 8, description: "Tire rotation done 1,000km ago" },
      environmentalFactors: { value: 13, description: "Temperature drop of 15°C affects pressure by 8%" }
    },
    logs: [
      { date: "1,00 km ago", event: "Tire rotation", type: "maintenance" },
      { date: "Today", event: "Pressure check", type: "inspection" }
    ]
  }
];

export function FleetMaintenance() {
  const [selectedAlert, setSelectedAlert] = React.useState(maintenanceAlerts[0]);
  const [isScheduling, setIsScheduling] = React.useState(false);
  const [showConfidenceBreakdown, setShowConfidenceBreakdown] = React.useState(false);
  const [showDrillDownModal, setShowDrillDownModal] = React.useState(false);
  const [selectedFactor, setSelectedFactor] = React.useState<string>('sensorData');
  const [activeTab, setActiveTab] = React.useState<'charts' | 'rawData' | 'timeline'>('charts');

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

  const getConfidenceIcon = (factor: string) => {
    switch (factor) {
      case 'sensorData': return <Radio className="h-4 w-4" />;
      case 'historicalData': return <Database className="h-4 w-4" />;
      case 'usageAnalysis': return <TrendingUp className="h-4 w-4" />;
      case 'maintenanceHistory': return <FileText className="h-4 w-4" />;
      case 'environmentalFactors': return <Cloud className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getFactorName = (factor: string) => {
    switch (factor) {
      case 'sensorData': return 'Sensor Data Quality';
      case 'historicalData': return 'Historical Patterns';
      case 'usageAnalysis': return 'Usage Analysis';
      case 'maintenanceHistory': return 'Maintenance History';
      case 'environmentalFactors': return 'Environmental Factors';
      default: return factor;
    }
  };

  const getConfidenceColor = (value: number) => {
    if (value >= 25) return 'bg-green-500';
    if (value >= 15) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleFactorClick = (factor: string) => {
    setSelectedFactor(factor);
    setShowDrillDownModal(true);
    setActiveTab('charts');
  };

  const factorOptions = [
    { value: 'sensorData', label: 'Sensor Data Quality', icon: Radio },
    { value: 'historicalData', label: 'Historical Patterns', icon: Database },
    { value: 'usageAnalysis', label: 'Usage Analysis', icon: TrendingUp },
    { value: 'maintenanceHistory', label: 'Maintenance History', icon: FileText },
    { value: 'environmentalFactors', label: 'Environmental Factors', icon: Cloud }
  ];

  const currentFactorData = getDetailedFactorData(selectedAlert.type, selectedFactor);
  const currentFactorInfo = factorOptions.find(f => f.value === selectedFactor);
  const currentFactorPercentage = selectedAlert.confidenceBreakdown[selectedFactor as keyof typeof selectedAlert.confidenceBreakdown]?.value || 0;

  const exportData = () => {
    const data = currentFactorData[activeTab];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAlert.type}-${selectedFactor}-${activeTab}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
                <div className="p-3 rounded-lg bg-muted/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                        AI Confidence
                      </Badge>
                      <span className="font-medium">{selectedAlert.confidence}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Updated 2 min ago
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfidenceBreakdown(!showConfidenceBreakdown)}
                        className="h-6 w-6 p-0"
                      >
                        {showConfidenceBreakdown ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {showConfidenceBreakdown && (
                    <div className="space-y-3 pt-2 border-t border-muted/40">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Confidence Breakdown
                      </div>
                      {Object.entries(selectedAlert.confidenceBreakdown).map(([factor, data]) => (
                        <div key={factor} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => handleFactorClick(factor)}
                              className="flex items-center gap-2 hover:text-primary transition-colors"
                            >
                              <div className="text-muted-foreground">
                                {getConfidenceIcon(factor)}
                              </div>
                              <span className="text-sm font-medium hover:underline">{getFactorName(factor)}</span>
                            </button>
                            <span className="text-sm font-medium">{data.value}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                              <div
                                className={cn("h-full transition-all duration-500 rounded-full", getConfidenceColor(data.value))}
                                style={{ width: `${data.value}%` }}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground ml-6">{data.description}</p>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-muted/40">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Total Confidence:</span>
                          <span className="font-bold">{selectedAlert.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  )}
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

      {/* Drill Down Modal */}
      {showDrillDownModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <select
                  value={selectedFactor}
                  onChange={(e) => setSelectedFactor(e.target.value)}
                  className="text-lg font-semibold bg-transparent border-none outline-none cursor-pointer hover:text-primary"
                >
                  {factorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  {currentFactorPercentage}%
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDrillDownModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              {[
                { id: 'charts', label: 'Charts', icon: BarChart3 },
                { id: 'rawData', label: 'Raw Data', icon: Database },
                { id: 'timeline', label: 'Timeline', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Charts Tab */}
              {activeTab === 'charts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentFactorData.charts.map((chart, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-sm">{chart.label}</h3>
                          <Badge variant={chart.trend === 'up' ? 'default' : chart.trend === 'down' ? 'destructive' : 'secondary'}>
                            {chart.trend}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-2">
                          {chart.value}{chart.unit || ''}
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {chart.data.map((point, i) => (
                            <div
                              key={i}
                              className="h-8 bg-primary/20 rounded flex-1 flex items-end"
                            >
                              <div
                                className="bg-primary rounded w-full transition-all duration-500"
                                style={{ height: `${(point / Math.max(...chart.data)) * 100}%` }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">Last 5 readings</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Raw Data Tab */}
              {activeTab === 'rawData' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted/50">
                          {Object.keys(currentFactorData.rawData[0] || {}).map((header) => (
                            <th key={header} className="border border-border p-3 text-left font-medium">
                              {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentFactorData.rawData.map((row, index) => (
                          <tr key={index} className="hover:bg-muted/30">
                            {Object.values(row).map((value, i) => (
                              <td key={i} className="border border-border p-3 text-sm">
                                {value as string}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {currentFactorData.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        {index < currentFactorData.timeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="font-medium">{event.event}</div>
                        <div className="text-sm text-muted-foreground mb-1">{event.date}</div>
                        <div className="text-sm">{event.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t bg-muted/20">
              <div className="text-sm text-muted-foreground">
                {selectedAlert.type} • {currentFactorInfo?.label}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export {activeTab}
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 