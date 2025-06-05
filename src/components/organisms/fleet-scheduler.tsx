"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  Truck,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Wrench,
  Package,
  DollarSign,
  Users,
  Route,
  MessageSquare,
  Sparkles,
  Target,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Plus,
  FileText,
  Phone,
  Mail,
  Settings,
} from "lucide-react";

// Progress Ring for service intervals
interface ServiceProgressProps {
  daysRemaining: number;
  totalInterval: number;
  size?: number;
}

function ServiceProgress({ daysRemaining, totalInterval, size = 48 }: ServiceProgressProps) {
  const percentage = Math.max(0, (daysRemaining / totalInterval) * 100);
  const radius = (size - 4) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getProgressColor = () => {
    if (daysRemaining <= 0) return "text-red-500"; // Overdue
    if (daysRemaining <= 3) return "text-orange-500"; // Due soon
    if (daysRemaining <= 7) return "text-yellow-500"; // Upcoming
    return "text-green-500"; // OK
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={3}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={3}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`${getProgressColor()} transition-all duration-500`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium">{Math.abs(daysRemaining)}d</span>
      </div>
    </div>
  );
}

// Mock data for fleet scheduling
const fleetData = [
  {
    id: "MH-27-A",
    name: "Truck 27-A",
    serviceType: "Brake Service",
    dueDate: "2024-06-13",
    daysRemaining: -3, // Overdue
    priority: "critical",
    status: "overdue",
    location: "Andheri Hub",
    route: "Mumbai-Pune",
    estimatedCost: 8500,
    partsAvailable: true,
    customerImpact: "High - 2 deliveries delayed",
    lastService: "2024-03-15",
    serviceInterval: 90,
    mileage: 45200,
    driver: "Ramesh Kumar",
    driverPhone: "+91 98765 43210",
    conditions: ["brake_warning", "high_mileage"],
    serviceHistory: [
      { date: "2024-03-15", type: "Brake Service", cost: 7800, notes: "Pads replaced" },
      { date: "2023-12-20", type: "Engine Service", cost: 12500, notes: "Oil change + filter" }
    ],
    recentLogs: [
      { time: "2 hrs ago", event: "Brake wear alert triggered", type: "warning" },
      { time: "1 day ago", event: "Scheduled for inspection", type: "info" }
    ]
  },
  {
    id: "MH-31-K",
    name: "Truck 31-K",
    serviceType: "Engine Service",
    dueDate: "2024-06-14",
    daysRemaining: -2, // Overdue
    priority: "critical",
    status: "overdue",
    location: "Bandra Depot",
    route: "Mumbai-Nashik",
    estimatedCost: 15600,
    partsAvailable: true,
    customerImpact: "Medium - 1 delivery rescheduled",
    lastService: "2024-02-20",
    serviceInterval: 120,
    mileage: 52800,
    driver: "Suresh Patil",
    driverPhone: "+91 98765 43211",
    conditions: ["engine_warning", "overdue"],
    serviceHistory: [
      { date: "2024-02-20", type: "Engine Service", cost: 14200, notes: "Full service" },
      { date: "2023-11-15", type: "Tire Service", cost: 18000, notes: "4 new tires" }
    ],
    recentLogs: [
      { time: "4 hrs ago", event: "Engine temperature spike", type: "warning" },
      { time: "2 days ago", event: "Service reminder sent", type: "info" }
    ]
  },
  {
    id: "MH-44-C",
    name: "Truck 44-C",
    serviceType: "Transmission Check",
    dueDate: "2024-06-15",
    daysRemaining: -1, // Due today
    priority: "high",
    status: "due_today",
    location: "Worli Service",
    route: "Mumbai-Surat",
    estimatedCost: 6800,
    partsAvailable: false,
    customerImpact: "Low - No immediate impact",
    lastService: "2024-04-10",
    serviceInterval: 60,
    mileage: 38900,
    driver: "Vikram Singh",
    driverPhone: "+91 98765 43212",
    conditions: ["transmission_issue", "parts_needed"],
    serviceHistory: [
      { date: "2024-04-10", type: "Transmission Check", cost: 6200, notes: "Fluid change" },
      { date: "2024-01-25", type: "Brake Service", cost: 9200, notes: "Front brake service" }
    ],
    recentLogs: [
      { time: "1 hr ago", event: "Parts ordered from supplier", type: "info" },
      { time: "3 hrs ago", event: "Transmission fluid low", type: "warning" }
    ]
  },
  {
    id: "MH-25-M",
    name: "Truck 25-M",
    serviceType: "Tire Rotation",
    dueDate: "2024-06-15",
    daysRemaining: -1,
    priority: "medium",
    status: "due_today",
    location: "Thane Hub",
    route: "Mumbai-Aurangabad",
    estimatedCost: 2400,
    partsAvailable: true,
    customerImpact: "None",
    lastService: "2024-05-01",
    serviceInterval: 45,
    mileage: 41200,
    driver: "Rajesh Sharma",
    driverPhone: "+91 98765 43213",
    conditions: ["routine_maintenance"],
    serviceHistory: [
      { date: "2024-05-01", type: "Tire Rotation", cost: 2200, notes: "Standard rotation" },
      { date: "2024-03-20", type: "Oil Change", cost: 3500, notes: "Synthetic oil" }
    ],
    recentLogs: [
      { time: "30 min ago", event: "Driver confirmed availability", type: "info" },
      { time: "2 hrs ago", event: "Route optimization complete", type: "info" }
    ]
  },
  {
    id: "MH-18-B",
    name: "Truck 18-B",
    serviceType: "Brake Service",
    dueDate: "2024-06-16",
    daysRemaining: 0,
    priority: "high",
    status: "due_soon",
    location: "Andheri Hub",
    route: "Mumbai-Kolhapur",
    estimatedCost: 9200,
    partsAvailable: true,
    customerImpact: "Medium - Peak route",
    lastService: "2024-03-08",
    serviceInterval: 100,
    mileage: 47600,
    driver: "Mahesh Joshi",
    driverPhone: "+91 98765 43214",
    conditions: ["brake_warning", "due_soon"],
    serviceHistory: [
      { date: "2024-03-08", type: "Brake Service", cost: 8800, notes: "Rear brake service" }
    ],
    recentLogs: [
      { time: "45 min ago", event: "Service slot confirmed", type: "info" },
      { time: "1 day ago", event: "Brake inspection scheduled", type: "info" }
    ]
  },
  {
    id: "MH-33-P",
    name: "Truck 33-P",
    serviceType: "Engine Service",
    dueDate: "2024-06-17",
    daysRemaining: 1,
    priority: "medium",
    status: "due_soon",
    location: "Kurla Depot",
    route: "Mumbai-Pune Express",
    estimatedCost: 13800,
    partsAvailable: true,
    customerImpact: "Low",
    lastService: "2024-01-15",
    serviceInterval: 150,
    mileage: 55200,
    driver: "Anil Yadav",
    driverPhone: "+91 98765 43215",
    conditions: ["engine_warning", "due_in_7_days"],
    serviceHistory: [
      { date: "2024-01-15", type: "Engine Service", cost: 13200, notes: "Major service" }
    ],
    recentLogs: [
      { time: "3 hrs ago", event: "Engine diagnostics complete", type: "info" },
      { time: "1 day ago", event: "Pre-service inspection", type: "info" }
    ]
  },
  {
    id: "MH-42-D",
    name: "Truck 42-D",
    serviceType: "AC Service",
    dueDate: "2024-06-18",
    daysRemaining: 2,
    priority: "low",
    status: "upcoming",
    location: "Bandra Depot",
    route: "Mumbai-Goa",
    estimatedCost: 4500,
    partsAvailable: true,
    customerImpact: "None",
    lastService: "2024-04-20",
    serviceInterval: 60,
    mileage: 35800,
    driver: "Deepak Pawar",
    driverPhone: "+91 98765 43216",
    conditions: ["routine_maintenance"],
    serviceHistory: [
      { date: "2024-04-20", type: "AC Service", cost: 4200, notes: "Gas refill + cleaning" }
    ],
    recentLogs: [
      { time: "1 hr ago", event: "AC performance check scheduled", type: "info" },
      { time: "4 hrs ago", event: "Driver notified of service", type: "info" }
    ]
  }
];

const queryInterpretations = [
  {
    query: "show all trucks due for service next week",
    interpretation: "Trucks due between June 10-16 (next 7 days)",
    count: 17,
    suggestion: "7 vehicles require immediate attention in the next week"
  },
  {
    query: "brake services overdue in mumbai",
    interpretation: "Brake maintenance overdue in Mumbai zone",
    count: 3,
    suggestion: "3 critical brake services are overdue and need emergency scheduling"
  },
  {
    query: "high priority trucks needing parts",
    interpretation: "Critical vehicles awaiting parts delivery",
    count: 2,
    suggestion: "2 high-priority vehicles are waiting for parts to arrive"
  }
];

// Smart filtering conditions
const filterConditions = [
  { id: "brake_warning", label: "Brake Warning", type: "warning" },
  { id: "engine_warning", label: "Engine Warning", type: "warning" },
  { id: "transmission_issue", label: "Transmission Issue", type: "warning" },
  { id: "high_mileage", label: "High Mileage", type: "info" },
  { id: "overdue", label: "Overdue", type: "critical" },
  { id: "due_in_7_days", label: "Due in 7 Days", type: "warning" },
  { id: "due_soon", label: "Due Soon", type: "warning" },
  { id: "parts_needed", label: "Parts Needed", type: "warning" },
  { id: "routine_maintenance", label: "Routine Maintenance", type: "info" }
];

export function FleetScheduler() {
  const [searchQuery, setSearchQuery] = React.useState("show all trucks due for service next week");
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");
  const [selectedTrucks, setSelectedTrucks] = React.useState<string[]>([]);
  const [isScheduling, setIsScheduling] = React.useState(false);
  const [showSuggestion, setShowSuggestion] = React.useState(true);
  const [showSmartFilter, setShowSmartFilter] = React.useState(false);
  const [selectedConditions, setSelectedConditions] = React.useState<string[]>([]);
  const [filterLogic, setFilterLogic] = React.useState<"AND" | "OR">("AND");

  const currentInterpretation = queryInterpretations[0]; // Default to first interpretation

  const getStatusColor = (status: string, priority: string) => {
    switch (status) {
      case 'overdue': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'due_today': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'due_soon': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      case 'upcoming': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-green-500 bg-green-500/10 border-green-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue': return <XCircle className="h-4 w-4" />;
      case 'due_today': return <AlertCircle className="h-4 w-4" />;
      case 'due_soon': return <Clock className="h-4 w-4" />;
      case 'upcoming': return <Calendar className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string, daysRemaining: number) => {
    if (daysRemaining < 0) return `${Math.abs(daysRemaining)} days overdue`;
    if (daysRemaining === 0) return "Due today";
    if (daysRemaining <= 3) return `Due in ${daysRemaining} days`;
    return `${daysRemaining} days remaining`;
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-3 w-3 text-orange-500" />;
      case 'info': return <Clock className="h-3 w-3 text-blue-500" />;
      case 'success': return <CheckCircle className="h-3 w-3 text-green-500" />;
      default: return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const filteredTrucks = fleetData.filter(truck => {
    // Basic filter
    let matchesBasicFilter = true;
    switch (selectedFilter) {
      case 'overdue': matchesBasicFilter = truck.status === 'overdue'; break;
      case 'due_soon': matchesBasicFilter = truck.status === 'due_today' || truck.status === 'due_soon'; break;
      case 'critical': matchesBasicFilter = truck.priority === 'critical'; break;
      case 'parts_needed': matchesBasicFilter = !truck.partsAvailable; break;
      default: matchesBasicFilter = true;
    }

    // Smart filter conditions
    let matchesConditions = true;
    if (selectedConditions.length > 0) {
      if (filterLogic === "AND") {
        matchesConditions = selectedConditions.every(condition => 
          truck.conditions.includes(condition)
        );
      } else {
        matchesConditions = selectedConditions.some(condition => 
          truck.conditions.includes(condition)
        );
      }
    }

    return matchesBasicFilter && matchesConditions;
  });

  const handleBulkSchedule = () => {
    setIsScheduling(true);
    setTimeout(() => {
      setIsScheduling(false);
      setSelectedTrucks([]);
    }, 2000);
  };

  const toggleTruckSelection = (truckId: string) => {
    setSelectedTrucks(prev => 
      prev.includes(truckId) 
        ? prev.filter(id => id !== truckId)
        : [...prev, truckId]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const getFilterCounts = () => {
    return {
      overdue: fleetData.filter(t => t.status === 'overdue').length,
      due_soon: fleetData.filter(t => t.status === 'due_today' || t.status === 'due_soon').length,
      critical: fleetData.filter(t => t.priority === 'critical').length,
      parts_needed: fleetData.filter(t => !t.partsAvailable).length
    };
  };

  const filterCounts = getFilterCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Truck className="h-6 w-6" />
            FleetScheduler AI
          </h2>
          <p className="text-muted-foreground">Intelligent fleet maintenance scheduling</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* AI Search Interface */}
      <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Ask AI: 'show brake services overdue in Mumbai zone'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base border-primary/20 focus:border-primary"
              />
            </div>

            {/* AI Interpretation */}
            {showSuggestion && (
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <div>
                    <span className="font-medium text-sm">Interpreted: </span>
                    <span className="text-sm">{currentInterpretation.interpretation}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSuggestion(false)}
                  className="h-6 w-6 p-0"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* AI Suggestion (no CTA) */}
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">AI Analysis:</span>
              <span className="text-sm">{currentInterpretation.suggestion}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">{filteredTrucks.length} trucks found</span>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {filterCounts.overdue} overdue, {filterCounts.due_soon} due soon
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedTrucks.length > 0 && (
            <Badge variant="outline" className="bg-primary/10">
              {selectedTrucks.length} selected
            </Badge>
          )}
          <Button 
            onClick={handleBulkSchedule}
            disabled={isScheduling || selectedTrucks.length === 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isScheduling ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Smart Schedule
              </>
            )}
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-accent">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All Trucks', count: fleetData.length, icon: Truck },
            { id: 'overdue', label: 'Overdue', count: filterCounts.overdue, icon: XCircle, color: 'text-red-500' },
            { id: 'due_soon', label: 'Due Soon', count: filterCounts.due_soon, icon: AlertTriangle, color: 'text-orange-500' },
            { id: 'critical', label: 'Critical', count: filterCounts.critical, icon: AlertCircle, color: 'text-red-500' },
            { id: 'parts_needed', label: 'Parts Needed', count: filterCounts.parts_needed, icon: Package, color: 'text-yellow-600' }
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap",
                selectedFilter === filter.id 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : cn("border-border text-foreground hover:bg-accent", filter.color)
              )}
            >
              <filter.icon className="h-4 w-4" />
              {filter.label}
              <Badge variant="secondary" className="ml-1">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
        
        <Separator orientation="vertical" className="h-8" />
        
        {/* Smart Filter Toggle */}
        <Button
          variant={showSmartFilter ? "default" : "outline"}
          onClick={() => setShowSmartFilter(!showSmartFilter)}
          className={cn(
            "flex items-center gap-2",
            showSmartFilter 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "border-border text-foreground hover:bg-accent"
          )}
        >
          <Settings className="h-4 w-4" />
          Smart Filter
          {selectedConditions.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedConditions.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Smart Filter Panel */}
      {showSmartFilter && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Condition-Based Filtering</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Logic:</span>
                  <div className="flex border rounded-md">
                    <Button
                      variant={filterLogic === "AND" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilterLogic("AND")}
                      className={cn(
                        "rounded-r-none px-3 h-8",
                        filterLogic === "AND" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-accent"
                      )}
                    >
                      AND
                    </Button>
                    <Button
                      variant={filterLogic === "OR" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilterLogic("OR")}
                      className={cn(
                        "rounded-l-none px-3 h-8",
                        filterLogic === "OR" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-accent"
                      )}
                    >
                      OR
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filterConditions.map((condition) => (
                  <Button
                    key={condition.id}
                    variant={selectedConditions.includes(condition.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCondition(condition.id)}
                    className={cn(
                      "text-xs",
                      selectedConditions.includes(condition.id)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-border text-foreground hover:bg-accent"
                    )}
                  >
                    {condition.label}
                  </Button>
                ))}
              </div>
              
              {selectedConditions.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Filter: Show trucks with</span>
                  <Badge variant="outline" className="text-xs">
                    {selectedConditions.join(` ${filterLogic} `)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConditions([])}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Truck Cards with Inline Logs & Actions */}
      <div className="space-y-3">
        {filteredTrucks.map((truck) => (
          <Card 
            key={truck.id}
            className={cn(
              "transition-all duration-200 hover:shadow-lg",
              selectedTrucks.includes(truck.id) && "ring-2 ring-primary bg-primary/5",
              truck.status === 'overdue' && "border-l-4 border-l-red-500",
              truck.status === 'due_today' && "border-l-4 border-l-orange-500"
            )}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Main Info Row */}
                <div className="flex items-center gap-4">
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedTrucks.includes(truck.id)}
                    onChange={() => toggleTruckSelection(truck.id)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />

                  {/* Progress Ring */}
                  <ServiceProgress 
                    daysRemaining={truck.daysRemaining}
                    totalInterval={truck.serviceInterval}
                  />

                  {/* Truck Info */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        {truck.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{truck.serviceType}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{truck.location}</div>
                        <div className="text-xs text-muted-foreground">{truck.route}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge 
                        className={cn("flex items-center gap-1", getStatusColor(truck.status, truck.priority))}
                      >
                        {getStatusIcon(truck.status)}
                        {getStatusLabel(truck.status, truck.daysRemaining)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">₹</span>
                        <span className="text-sm font-medium">{truck.estimatedCost.toLocaleString()}</span>
                      </div>
                      <Badge variant={truck.partsAvailable ? "default" : "destructive"}>
                        <Package className="h-3 w-3 mr-1" />
                        {truck.partsAvailable ? "Available" : "Needed"}
                      </Badge>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-border text-foreground hover:bg-accent"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>

                {/* Inline Details Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  {/* Driver & Contact */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Driver & Contact
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{truck.driver}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{truck.driverPhone}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Mileage: {truck.mileage.toLocaleString()} km
                      </div>
                    </div>
                  </div>

                  {/* Recent Logs */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Recent Activity
                    </h4>
                    <div className="space-y-1">
                      {truck.recentLogs.slice(0, 2).map((log, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {getLogIcon(log.type)}
                          <span className="text-xs text-muted-foreground">{log.time}:</span>
                          <span className="text-xs">{log.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions & Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Quick Actions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-xs border-border text-foreground hover:bg-accent"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Notify
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-xs border-border text-foreground hover:bg-accent"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        History
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-xs border-border text-foreground hover:bg-accent"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Defer
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <strong>Impact:</strong> {truck.customerImpact}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-500">{filterCounts.overdue}</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{filterCounts.due_soon}</div>
              <div className="text-sm text-muted-foreground">Due Soon</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">₹{fleetData.reduce((sum, truck) => sum + truck.estimatedCost, 0).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Est. Cost</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{fleetData.filter(t => t.partsAvailable).length}</div>
              <div className="text-sm text-muted-foreground">Parts Ready</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 