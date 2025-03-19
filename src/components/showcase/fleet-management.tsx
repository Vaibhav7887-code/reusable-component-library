"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartCard } from "@/components/molecules/chart-card";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  AlertCircle, 
  Car, 
  Clock, 
  Fuel, 
  MapPin, 
  Settings, 
  Users,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  BarChart3,
  Route,
  Package,
  DollarSign,
  Gauge,
  Battery,
  Thermometer,
  Wrench,
  Bell,
  RefreshCw,
  Download,
  Upload,
  MoreVertical,
  Star,
  StarOff,
  FileText,
  ChevronRight,
  XCircle,
  Share2
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for fleet stats
const fleetStats = {
  totalVehicles: 24,
  activeVehicles: 18,
  maintenanceRequired: 3,
  fuelEfficiency: 8.2,
  totalDrivers: 32,
  activeDrivers: 28,
  averageSpeed: 65,
  totalDistance: 1250,
  totalDeliveries: 156,
  onTimeDeliveries: 142,
  fuelCost: 2450,
  totalRevenue: 12500,
};

// Mock data for alerts
const alerts = [
  { id: 1, type: "warning", message: "Vehicle #1234 needs maintenance", time: "2h ago", priority: "high" },
  { id: 2, type: "info", message: "New driver assigned to route #567", time: "3h ago", priority: "medium" },
  { id: 3, type: "success", message: "Route optimization completed", time: "4h ago", priority: "low" },
  { id: 4, type: "warning", message: "Low fuel alert for Vehicle #789", time: "5h ago", priority: "high" },
  { id: 5, type: "info", message: "Weather alert: Heavy rain expected", time: "6h ago", priority: "medium" },
];

// Mock data for recent activity
const recentActivity = [
  { id: 1, type: "route", message: "Route #123 completed", time: "10m ago", status: "success" },
  { id: 2, type: "maintenance", message: "Vehicle #567 maintenance completed", time: "1h ago", status: "success" },
  { id: 3, type: "driver", message: "Driver John Doe started shift", time: "2h ago", status: "info" },
  { id: 4, type: "delivery", message: "Package delivered to Customer #456", time: "3h ago", status: "success" },
  { id: 5, type: "alert", message: "Traffic delay on Route #789", time: "4h ago", status: "warning" },
];

// Mock data for vehicles
const vehicles = [
  {
    id: 1001,
    name: "Truck Alpha",
    registrationNumber: "MH01AB1234",
    vin: "1HGCM82633A123456",
    driver: "John Doe",
    status: "active",
    speed: 65,
    location: "Mumbai, Maharashtra",
    eta: "2h 30m",
    fuel: 85,
    temperature: 72,
    battery: 92,
    rating: 4.8,
    lastMaintenance: "5 days ago",
    nextMaintenance: "25 days",
    type: "electric",
    vehicleClass: "BS6",
    currentState: "moving",
    fuelType: "electric",
    healthIndicators: [
      { type: "engine", status: "warning", message: "Engine light on" },
      { type: "tire", status: "error", message: "Low tire pressure" },
    ],
  },
  {
    id: 1002,
    name: "Van Beta",
    registrationNumber: "DL02CD5678",
    vin: "2HGCM82633B234567",
    driver: "Jane Smith",
    status: "active",
    speed: 55,
    location: "Delhi, Delhi",
    eta: "1h 45m",
    fuel: 65,
    temperature: 68,
    battery: 88,
    rating: 4.5,
    lastMaintenance: "3 days ago",
    nextMaintenance: "27 days",
    type: "fuel",
    vehicleClass: "BS6",
    currentState: "idling",
    fuelType: "diesel",
    healthIndicators: [
      { type: "battery", status: "warning", message: "Battery voltage low" },
    ],
  },
  {
    id: 1003,
    name: "Truck Gamma",
    registrationNumber: "UP-03-EF-9012",
    vin: "3HGCM82633C345678",
    driver: "Mike Johnson",
    status: "maintenance",
    speed: 0,
    location: "Bengaluru, Karnataka",
    eta: "N/A",
    fuel: 45,
    temperature: 75,
    battery: 95,
    rating: 4.2,
    lastMaintenance: "1 day ago",
    nextMaintenance: "29 days",
    type: "fuel",
    vehicleClass: "BS4",
    currentState: "stopped",
    fuelType: "diesel",
    healthIndicators: [],
  },
  {
    id: 1004,
    name: "Van Delta",
    registrationNumber: "GJ-04-GH-3456",
    vin: "4HGCM82633D456789",
    driver: "Sarah Wilson",
    status: "active",
    speed: 60,
    location: "Hyderabad, Telangana",
    eta: "3h 15m",
    fuel: 75,
    temperature: 70,
    battery: 90,
    rating: 4.7,
    lastMaintenance: "2 days ago",
    nextMaintenance: "28 days",
    type: "electric",
    vehicleClass: "BS6",
    currentState: "moving",
    fuelType: "electric",
    healthIndicators: [],
  },
  {
    id: 1005,
    name: "Truck Epsilon",
    registrationNumber: "RJ-05-IJ-7890",
    vin: "5HGCM82633E567890",
    driver: "Tom Brown",
    status: "inactive",
    speed: 0,
    location: "Chennai, Tamil Nadu",
    eta: "N/A",
    fuel: 90,
    temperature: 68,
    battery: 85,
    rating: 4.6,
    lastMaintenance: "4 days ago",
    nextMaintenance: "26 days",
    type: "fuel",
    vehicleClass: "BS4",
    currentState: "offline",
    fuelType: "diesel",
    healthIndicators: [],
  },
];

// Add new mock data for vehicle details
const vehicleDetails = {
  1001: {
    lastService: {
      date: "2024-03-15",
      type: "Regular Maintenance",
      technician: "Mike Johnson",
      notes: "Oil change, brake inspection, tire rotation",
      nextService: "2024-04-15",
    },
    currentLocation: {
      address: "123 Main St, New York, NY",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      lastUpdated: "2 minutes ago",
    },
    performance: {
      averageSpeed: 65,
      totalDistance: 1250,
      fuelEfficiency: 8.2,
      idleTime: "45 minutes",
      stops: 12,
    },
    maintenanceHistory: [
      { date: "2024-03-15", type: "Regular", status: "completed" },
      { date: "2024-02-15", type: "Regular", status: "completed" },
      { date: "2024-01-15", type: "Regular", status: "completed" },
    ],
    documents: [
      { name: "Insurance", expiry: "2024-12-31" },
      { name: "Registration", expiry: "2024-12-31" },
      { name: "Service Records", expiry: "N/A" },
    ],
  },
  // ... add more vehicle details as needed
};

function FleetDashboard() {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'day' | 'week' | 'month'>('day');
  const [expandedStats, setExpandedStats] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import Data
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
        <Button variant="outline" className="gap-2">
          <MoreVertical className="h-4 w-4" />
          More Actions
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${fleetStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.activeVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Out of {fleetStats.totalVehicles} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">On-Time Deliveries</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.onTimeDeliveries}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((fleetStats.onTimeDeliveries / fleetStats.totalDeliveries) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fuel Cost</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${fleetStats.fuelCost}</div>
            <p className="text-xs text-muted-foreground">
              {fleetStats.fuelEfficiency} mpg average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Fleet Activity"
          description="Vehicle utilization over time"
          type="line"
          color="hsl(var(--primary))"
        />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Alerts</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      alert.type === "warning" && "bg-yellow-500",
                      alert.type === "info" && "bg-blue-500",
                      alert.type === "success" && "bg-green-500"
                    )} />
                    <div>
                      <span className="text-sm">{alert.message}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full",
                          alert.priority === "high" && "bg-red-500/20 text-red-500",
                          alert.priority === "medium" && "bg-yellow-500/20 text-yellow-500",
                          alert.priority === "low" && "bg-green-500/20 text-green-500"
                        )}>
                          {alert.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    activity.status === "success" && "bg-green-500/20",
                    activity.status === "warning" && "bg-yellow-500/20",
                    activity.status === "info" && "bg-blue-500/20"
                  )}>
                    <Activity className={cn(
                      "h-4 w-4",
                      activity.status === "success" && "text-green-500",
                      activity.status === "warning" && "text-yellow-500",
                      activity.status === "info" && "text-blue-500"
                    )} />
                  </div>
                  <div>
                    <span className="text-sm">{activity.message}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        activity.status === "success" && "bg-green-500/20 text-green-500",
                        activity.status === "warning" && "bg-yellow-500/20 text-yellow-500",
                        activity.status === "info" && "bg-blue-500/20 text-blue-500"
                      )}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FleetTracking() {
  const [selectedVehicle, setSelectedVehicle] = React.useState<typeof vehicles[0] | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "moving" | "idling" | "stopped" | "offline" | "maintenance">("all");
  const [unitPreferences, setUnitPreferences] = React.useState({
    speed: "mph",
    temperature: "°F",
    distance: "miles",
    currency: "USD"
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.registrationNumber?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (vehicle.vin?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.currentState === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-[calc(100vh-20rem)] flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Live Tracking</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden">
        {/* Map Section - 3/4 width */}
        <div className="lg:col-span-3 bg-muted rounded-lg relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <Button variant="secondary" size="icon">
              <MapPin className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Clock className="w-4 h-4" />
            </Button>
          </div>
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Map will be rendered here
          </div>
        </div>

        {/* Vehicle List - 1/4 width */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col gap-4 px-1 py-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground z-10" />
              <Input
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-2 w-max">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "moving" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("moving")}
                >
                  Moving
                </Button>
                <Button
                  variant={statusFilter === "idling" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("idling")}
                >
                  Idling
                </Button>
                <Button
                  variant={statusFilter === "stopped" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("stopped")}
                >
                  Stopped
                </Button>
                <Button
                  variant={statusFilter === "offline" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("offline")}
                >
                  Offline
                </Button>
                <Button
                  variant={statusFilter === "maintenance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("maintenance")}
                >
                  Maintenance
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-2 pr-4 max-w-[300px]">
              {filteredVehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className={`cursor-pointer transition-colors ${
                    selectedVehicle?.id === vehicle.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{vehicle.registrationNumber}</h3>
                          <div className="flex items-center gap-1 ml-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    {vehicle.fuelType === "electric" ? (
                                      <Battery 
                                        className={cn(
                                          "h-4 w-4",
                                          vehicle.battery < 25 && "text-red-500",
                                          vehicle.battery < 50 && "text-orange-500",
                                          vehicle.battery < 75 && "text-yellow-500",
                                          "text-green-500"
                                        )} 
                                      />
                                    ) : (
                                      <Fuel 
                                        className={cn(
                                          "h-4 w-4",
                                          vehicle.fuel < 25 && "text-red-500",
                                          vehicle.fuel < 50 && "text-orange-500",
                                          vehicle.fuel < 75 && "text-yellow-500",
                                          "text-green-500"
                                        )} 
                                      />
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{vehicle.fuelType === "electric" ? `Battery: ${vehicle.battery}%` : `Fuel: ${vehicle.fuel}L`}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Generate Trip
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  DIC
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share Location
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-sm text-muted-foreground w-fit mt-1">{vehicle.vin}</p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Vehicle Identification Number (VIN)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-muted-foreground max-w-[100px]">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{vehicle.location}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{vehicle.location}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{vehicle.eta}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Estimated Time of Arrival</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <div 
                          className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                          onScroll={(e) => {
                            const target = e.target as HTMLDivElement;
                            const hasScrolled = target.scrollLeft > 0;
                            const hasMoreContent = target.scrollWidth > target.clientWidth;
                            const isAtStart = target.scrollLeft === 0;
                            
                            // Show/hide the +X indicator based on scroll position
                            const indicator = target.nextElementSibling as HTMLElement;
                            if (indicator) {
                              if (isAtStart && hasMoreContent) {
                                indicator.style.opacity = "1";
                              } else {
                                indicator.style.opacity = "0";
                              }
                            }
                          }}
                        >
                          <div className="flex gap-2 w-max">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Badge 
                                      variant={vehicle.currentState === "moving" ? "moving" : 
                                              vehicle.currentState === "stopped" ? "stopped" : 
                                              vehicle.currentState === "offline" ? "offline" : 
                                              vehicle.currentState === "maintenance" ? "maintenance" : 
                                              vehicle.currentState === "idling" ? "idling" : "outline"}
                                      className="text-xs"
                                    >
                                      {vehicle.currentState}
                                    </Badge>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Current Vehicle State</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Badge variant="outline" className="text-xs">
                              {vehicle.vehicleClass}
                            </Badge>
                            {vehicle.healthIndicators?.map((indicator, index) => (
                              <TooltipProvider key={index}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div>
                                      <Badge 
                                        variant="outline" 
                                        className={cn(
                                          "text-xs",
                                          indicator.status === "error" && "border-red-500 text-red-500",
                                          indicator.status === "warning" && "border-yellow-500 text-yellow-500",
                                          indicator.status === "info" && "border-blue-500 text-blue-500"
                                        )}
                                      >
                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                        {indicator.type}
                                      </Badge>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{indicator.message}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none">
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white bg-black/80 rounded-full px-2 py-0.5 transition-opacity duration-200">
                            +{vehicle.healthIndicators?.length || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Vehicle Details Sheet */}
      <Sheet open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-background/80 backdrop-blur-md border-white/10">
          <SheetHeader>
            <SheetTitle>{selectedVehicle?.registrationNumber}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-6 py-4">
              {/* Vehicle Information */}
              <div>
                <h3 className="font-medium mb-2">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">VIN</p>
                    <p className="font-medium">{selectedVehicle?.vin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Vehicle Class</p>
                    <p className="font-medium">{selectedVehicle?.vehicleClass}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">{selectedVehicle?.fuelType === "electric" ? "Electric" : "Diesel"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current State</p>
                    <p className="font-medium">{selectedVehicle?.currentState}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Last Service Section */}
              <div>
                <h3 className="font-medium mb-2">Last Service</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Service Date</p>
                    <p className="font-medium">{selectedVehicle?.lastMaintenance}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Next Service Due</p>
                    <p className="font-medium">{selectedVehicle?.nextMaintenance}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Current Location */}
              <div>
                <h3 className="font-medium mb-2">Current Location</h3>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedVehicle?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>ETA: {selectedVehicle?.eta}</span>
                </div>
              </div>

              <Separator />

              {/* Performance Metrics */}
              <div>
                <h3 className="font-medium mb-2">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Speed</p>
                    <p className="font-medium">{selectedVehicle?.speed} {unitPreferences.speed}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fuel Level</p>
                    <p className="font-medium">{selectedVehicle?.fuel}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="font-medium">{selectedVehicle?.temperature} {unitPreferences.temperature}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Battery</p>
                    <p className="font-medium">{selectedVehicle?.battery}%</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function FleetManagementShowcase() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <FleetDashboard />
        </TabsContent>
        <TabsContent value="tracking">
          <FleetTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
} 