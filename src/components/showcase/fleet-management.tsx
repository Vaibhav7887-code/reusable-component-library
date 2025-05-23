"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartCard } from "@/components/molecules/chart-card";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Bookmark } from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Client-side only import for Lucide icons to prevent hydration issues
const LucideIcons = {
  Activity: dynamic(() => import("lucide-react").then(mod => mod.Activity), { ssr: false }),
  AlertCircle: dynamic(() => import("lucide-react").then(mod => mod.AlertCircle), { ssr: false }),
  Car: dynamic(() => import("lucide-react").then(mod => mod.Car), { ssr: false }),
  Clock: dynamic(() => import("lucide-react").then(mod => mod.Clock), { ssr: false }),
  Fuel: dynamic(() => import("lucide-react").then(mod => mod.Fuel), { ssr: false }),
  MapPin: dynamic(() => import("lucide-react").then(mod => mod.MapPin), { ssr: false }),
  Settings: dynamic(() => import("lucide-react").then(mod => mod.Settings), { ssr: false }),
  Users: dynamic(() => import("lucide-react").then(mod => mod.Users), { ssr: false }),
  Calendar: dynamic(() => import("lucide-react").then(mod => mod.Calendar), { ssr: false }),
  Filter: dynamic(() => import("lucide-react").then(mod => mod.Filter), { ssr: false }),
  Search: dynamic(() => import("lucide-react").then(mod => mod.Search), { ssr: false }),
  ChevronDown: dynamic(() => import("lucide-react").then(mod => mod.ChevronDown), { ssr: false }),
  ChevronUp: dynamic(() => import("lucide-react").then(mod => mod.ChevronUp), { ssr: false }),
  ChevronLeft: dynamic(() => import("lucide-react").then(mod => mod.ChevronLeft), { ssr: false }),
  ChevronRight: dynamic(() => import("lucide-react").then(mod => mod.ChevronRight), { ssr: false }),
  AlertTriangle: dynamic(() => import("lucide-react").then(mod => mod.AlertTriangle), { ssr: false }),
  CheckCircle2: dynamic(() => import("lucide-react").then(mod => mod.CheckCircle2), { ssr: false }),
  Info: dynamic(() => import("lucide-react").then(mod => mod.Info), { ssr: false }),
  BarChart3: dynamic(() => import("lucide-react").then(mod => mod.BarChart3), { ssr: false }),
  Route: dynamic(() => import("lucide-react").then(mod => mod.Route), { ssr: false }),
  Package: dynamic(() => import("lucide-react").then(mod => mod.Package), { ssr: false }),
  DollarSign: dynamic(() => import("lucide-react").then(mod => mod.DollarSign), { ssr: false }),
  Gauge: dynamic(() => import("lucide-react").then(mod => mod.Gauge), { ssr: false }),
  Battery: dynamic(() => import("lucide-react").then(mod => mod.Battery), { ssr: false }),
  Thermometer: dynamic(() => import("lucide-react").then(mod => mod.Thermometer), { ssr: false }),
  Wrench: dynamic(() => import("lucide-react").then(mod => mod.Wrench), { ssr: false }),
  Bell: dynamic(() => import("lucide-react").then(mod => mod.Bell), { ssr: false }),
  RefreshCw: dynamic(() => import("lucide-react").then(mod => mod.RefreshCw), { ssr: false }),
  Download: dynamic(() => import("lucide-react").then(mod => mod.Download), { ssr: false }),
  Upload: dynamic(() => import("lucide-react").then(mod => mod.Upload), { ssr: false }),
  MoreVertical: dynamic(() => import("lucide-react").then(mod => mod.MoreVertical), { ssr: false }),
  Star: dynamic(() => import("lucide-react").then(mod => mod.Star), { ssr: false }),
  StarOff: dynamic(() => import("lucide-react").then(mod => mod.StarOff), { ssr: false }),
  FileText: dynamic(() => import("lucide-react").then(mod => mod.FileText), { ssr: false }),
  XCircle: dynamic(() => import("lucide-react").then(mod => mod.XCircle), { ssr: false }),
  Share2: dynamic(() => import("lucide-react").then(mod => mod.Share2), { ssr: false }),
  Plus: dynamic(() => import("lucide-react").then(mod => mod.Plus), { ssr: false }),
  Minus: dynamic(() => import("lucide-react").then(mod => mod.Minus), { ssr: false }),
  Circle: dynamic(() => import("lucide-react").then(mod => mod.Circle), { ssr: false }),
  Droplet: dynamic(() => import("lucide-react").then(mod => mod.Droplet), { ssr: false }),
  Wind: dynamic(() => import("lucide-react").then(mod => mod.Wind), { ssr: false }),
  Layers: dynamic(() => import("lucide-react").then(mod => mod.Layers), { ssr: false }),
  Locate: dynamic(() => import("lucide-react").then(mod => mod.Locate), { ssr: false }),
  Target: dynamic(() => import("lucide-react").then(mod => mod.Target), { ssr: false }),
  Maximize2: dynamic(() => import("lucide-react").then(mod => mod.Maximize2), { ssr: false }),
  AlertOctagon: dynamic(() => import("lucide-react").then(mod => mod.AlertOctagon), { ssr: false }),
  Octagon: dynamic(() => import("lucide-react").then(mod => mod.Octagon), { ssr: false }),
  ParkingCircle: dynamic(() => import("lucide-react").then(mod => mod.ParkingCircle), { ssr: false }),
  ThermometerSun: dynamic(() => import("lucide-react").then(mod => mod.ThermometerSun), { ssr: false }),
  Wifi: dynamic(() => import("lucide-react").then(mod => mod.Wifi), { ssr: false }),
  Camera: dynamic(() => import("lucide-react").then(mod => mod.Camera), { ssr: false }),
  Satellite: dynamic(() => import("lucide-react").then(mod => mod.Satellite), { ssr: false })
};

// Use these imports instead of direct imports
const { 
  Activity, AlertCircle, Car, Clock, Fuel, MapPin, Settings, Users,
  Calendar, Filter, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle2, Info, BarChart3, Route, Package, DollarSign, Gauge,
  Battery, Thermometer, Wrench, Bell, RefreshCw, Download, Upload,
  MoreVertical, Star, StarOff, FileText, XCircle, Share2, Plus, Minus, Circle, Droplet, Wind, Layers, Locate, Target, Maximize2,
  AlertOctagon, Octagon, ParkingCircle, ThermometerSun, Wifi, Camera, Satellite
} = LucideIcons;

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
import { VehicleTrace } from "@/components/molecules/vehicle-trace";

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
    registrationNumber: "MH-01-AB-1234",
    vin: "1HGCM82633A123456",
    driver: "John Doe",
    status: "active",
    speed: 65,
    location: "Mumbai, Maharashtra",
    fullLocation: "Unnamed Road, Andheri East, Mumbai, Maharashtra. 120 m from St. Mary's Church, Pin-400069 (India)",
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
    // Add map position for consistent tracking
    mapPosition: {
      top: 20,
      left: 33
    },
    healthIndicators: [
      { type: "engine", status: "warning", message: "Engine light on" },
      { type: "tire", status: "error", message: "Low tire pressure" },
      { type: "brake", status: "warning", message: "Brake pads wearing thin" },
      { type: "battery", status: "error", message: "Battery voltage critical" },
      { type: "coolant", status: "warning", message: "Coolant level low" },
      { type: "oil", status: "info", message: "Oil change due soon" },
      { type: "transmission", status: "warning", message: "Transmission fluid low" },
      { type: "air filter", status: "info", message: "Air filter needs cleaning" },
    ],
    vehicleParams: {
      primaryFuel: {
        value: 143.2,
        maxValue: 365,
        percentage: 27,
      },
      defLevel: {
        value: 77,
        quality: "33.5% (Good)",
      },
      engineLoad: "Light",
      engineTemp: 83,
      odometer: 54221,
      engineRunHour: "1869 Hrs 18 Mins",
      speed: 30,
      tripAFuelEfficiency: 3.2,
      tripBFuelEfficiency: 3.0,
      distanceToService: 65779,
      timeToService: 130,
      serviceDueStatus: "Not Due",
    }
  },
  {
    id: 1002,
    registrationNumber: "DL-02-CD-5678",
    vin: "2HGCM82633B234567",
    driver: "Jane Smith",
    status: "active",
    speed: 55,
    location: "Delhi, Delhi",
    fullLocation: "Block D, Connaught Place, New Delhi, Delhi. 45 m from Central Park, Pin-110001 (India)",
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
    // Add map position for consistent tracking
    mapPosition: {
      top: 60,
      left: 45
    },
    healthIndicators: [
      { type: "battery", status: "warning", message: "Battery voltage low" },
    ],
    vehicleParams: {
      primaryFuel: {
        value: 225.5,
        maxValue: 365,
        percentage: 62,
      },
      defLevel: {
        value: 85,
        quality: "41.2% (Good)",
      },
      engineLoad: "Medium",
      engineTemp: 78,
      odometer: 48765,
      engineRunHour: "1543 Hrs 45 Mins",
      speed: 55,
      tripAFuelEfficiency: 3.5,
      tripBFuelEfficiency: 3.3,
      distanceToService: 71235,
      timeToService: 145,
      serviceDueStatus: "Not Due",
    }
  },
  {
    id: 1003,
    registrationNumber: "UP-03-EF-9012",
    vin: "3HGCM82633C345678",
    driver: "Mike Johnson",
    status: "maintenance",
    speed: 0,
    location: "Bengaluru, Karnataka",
    fullLocation: "Unnamed Road, Koramangala, Bengaluru, Karnataka. 80 m from Forum Mall, Pin-560034 (India)",
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
    // Add map position for consistent tracking
    mapPosition: {
      top: 40,
      left: 60
    },
    healthIndicators: [],
    vehicleParams: {
      primaryFuel: {
        value: 98.6,
        maxValue: 365,
        percentage: 27,
      },
      defLevel: {
        value: 45,
        quality: "28.5% (Warning)",
      },
      engineLoad: "Heavy",
      engineTemp: 92,
      odometer: 62341,
      engineRunHour: "2134 Hrs 22 Mins",
      speed: 0,
      tripAFuelEfficiency: 2.8,
      tripBFuelEfficiency: 2.9,
      distanceToService: 57659,
      timeToService: 95,
      serviceDueStatus: "Due Soon",
    }
  },
  {
    id: 1004,
    registrationNumber: "GJ-04-GH-3456",
    vin: "4HGCM82633D456789",
    driver: "Sarah Wilson",
    status: "active",
    speed: 60,
    location: "Hyderabad, Telangana",
    fullLocation: "Road No. 36, Jubilee Hills, Hyderabad, Telangana. 150 m from Film City, Pin-500033 (India)",
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
    // Add map position for consistent tracking
    mapPosition: {
      top: 30,
      left: 50
    },
    healthIndicators: [],
    vehicleParams: {
      primaryFuel: {
        value: 285.7,
        maxValue: 365,
        percentage: 78,
      },
      defLevel: {
        value: 92,
        quality: "45.8% (Good)",
      },
      engineLoad: "Light",
      engineTemp: 75,
      odometer: 35678,
      engineRunHour: "987 Hrs 30 Mins",
      speed: 60,
      tripAFuelEfficiency: 3.8,
      tripBFuelEfficiency: 3.7,
      distanceToService: 84322,
      timeToService: 180,
      serviceDueStatus: "Not Due",
    }
  }
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

// Add new interface for vehicle info card
interface VehicleInfoCardProps {
  vehicle: typeof vehicles[0];
  onClose: () => void;
  expanded?: boolean;
  position?: { top: number; left: number };
  mapRef: React.RefObject<HTMLDivElement>;
}

// Define health indicators with proper typing
const healthIndicators: Array<{
  name: string;
  icon: keyof typeof LucideIcons;
  status: "active" | "warning" | "error" | "disabled";
}> = [
  // Green (Normal/Good)
  { name: "GPS Signal Quality", icon: "Satellite", status: "active" },
  
  // Yellow/Orange (Warning/Caution)
  { name: "Air Filter Clogging", icon: "Wind", status: "warning" },
  { name: "Check Engine Lamp", icon: "AlertTriangle", status: "warning" },
  { name: "SCR System Fault", icon: "Settings", status: "warning" },
  { name: "Malfunction Indication Lamp", icon: "AlertOctagon", status: "warning" },
  
  // Red (Critical/Action Required)
  { name: "DPF Regeneration Request", icon: "Thermometer", status: "error" },
  { name: "Engine Red Stop Lamp", icon: "AlertOctagon", status: "error" },
  { name: "Low Fuel Indication", icon: "Fuel", status: "error" },
  
  // Gray (Inactive/No Issue Detected)
  { name: "Water In Fuel Indicator", icon: "Droplet", status: "disabled" },
  { name: "Engine Temperature", icon: "Thermometer", status: "disabled" },
  { name: "High Engine Coolant Temperature", icon: "ThermometerSun", status: "disabled" },
  { name: "Parking Brake", icon: "ParkingCircle", status: "disabled" },
  { name: "Low Air Pressure", icon: "Wind", status: "disabled" },
  { name: "DMS Buzzer Error", icon: "Bell", status: "disabled" },
  { name: "DMS Camera Error", icon: "Camera", status: "disabled" }
];

// Add new component for vehicle info card
function VehicleInfoCard({ vehicle, onClose, expanded = false, position, mapRef }: VehicleInfoCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(expanded);
  const [view, setView] = React.useState<"parameters" | "health">("parameters");
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Function to calculate card position
  const calculatePosition = React.useCallback(() => {
    if (!position || !mapRef.current || !cardRef.current) return {};

    const mapRect = mapRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    
    // Convert percentage to pixels
    let left = (position.left / 100) * mapRect.width;
    let top = (position.top / 100) * mapRect.height;

    // Initial position (above the marker)
    let transformOrigin = 'center bottom';
    let finalTop = top - 20; // 20px above the marker
    let finalLeft = left;

    // Check if card would overflow right edge
    if (left + cardRect.width > mapRect.width) {
      finalLeft = left - cardRect.width;
      transformOrigin = 'right bottom';
    }
    // Check if card would overflow left edge
    else if (left - cardRect.width/2 < 0) {
      finalLeft = 0;
      transformOrigin = 'left bottom';
    }
    else {
      finalLeft = left - cardRect.width/2;
    }

    // Check if card would overflow top edge
    if (top - cardRect.height - 20 < 0) {
      // Position below the marker instead
      finalTop = top + 40;
      transformOrigin = transformOrigin.replace('bottom', 'top');
    }

    return {
      position: 'absolute' as const,
      left: `${finalLeft}px`,
      top: `${finalTop}px`,
      transformOrigin,
    };
  }, [position, isExpanded]);

  // Update position when expanded state changes
  React.useEffect(() => {
    if (cardRef.current) {
      const newStyle = calculatePosition();
      Object.assign(cardRef.current.style, newStyle);
    }
  }, [isExpanded, calculatePosition]);

  return (
    <Card 
      ref={cardRef}
      className="w-[400px] bg-background/80 backdrop-blur-2xl border-white/20 shadow-xl z-50 absolute"
    >
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Car className="h-4 w-4" />
          {vehicle.registrationNumber}
        </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={onClose}
          >
            <XCircle className="h-4 w-4" />
          </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          {view === "parameters" ? (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs gap-1.5"
              onClick={() => setView("health")}
            >
              <Activity className="h-4 w-4" />
              Vehicle Health
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs gap-1.5"
              onClick={() => setView("parameters")}
            >
              <ChevronLeft className="h-4 w-4" />
              Vehicle Parameters
            </Button>
          )}
        </div>

        {view === "parameters" ? (
          <>
            {/* Primary Fuel Level */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span>Primary Fuel Level</span>
                <span>{vehicle.vehicleParams.primaryFuel.value}/{vehicle.vehicleParams.primaryFuel.maxValue}L</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${vehicle.vehicleParams.primaryFuel.percentage}%` }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{vehicle.vehicleParams.primaryFuel.percentage}%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* DEF Level */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span>DEF Level</span>
                <span>{vehicle.vehicleParams.defLevel.value}%</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${vehicle.vehicleParams.defLevel.value}%` }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{vehicle.vehicleParams.defLevel.value}%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Basic Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-muted/40 backdrop-blur-xl">
                <div className="text-xs text-muted-foreground">Engine Load</div>
                <div className="text-sm font-medium">{vehicle.vehicleParams.engineLoad}</div>
              </div>
              <div className="p-2 rounded-lg bg-muted/40 backdrop-blur-xl">
                <div className="text-xs text-muted-foreground">Engine Temp</div>
                <div className="text-sm font-medium">{vehicle.vehicleParams.engineTemp}°C</div>
              </div>
              <div className="p-2 rounded-lg bg-muted/40 backdrop-blur-xl">
                <div className="text-xs text-muted-foreground">DEF Quality</div>
                <div className="text-sm font-medium">{vehicle.vehicleParams.defLevel.quality}</div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Odometer</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.odometer.toLocaleString()} Km</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Engine Run Hour</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.engineRunHour}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Speed</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.speed} Km/Hr</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Trip A - FE</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.tripAFuelEfficiency} Km/L</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Trip B - FE</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.tripBFuelEfficiency} Km/L</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Distance to Service</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.distanceToService.toLocaleString()} Km</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Time to Service</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.timeToService} Days</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Service Due Status</div>
                    <div className="text-sm font-medium">{vehicle.vehicleParams.serviceDueStatus}</div>
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-center pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs gap-1.5"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Show More"}
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {healthIndicators.map((indicator, index) => {
              const IconComponent = LucideIcons[indicator.icon];
              return (
                <div 
                  key={index}
                  className={cn(
                    "p-2 rounded-lg backdrop-blur-xl flex items-center gap-2",
                    indicator.status === "active" && "bg-green-500/20 text-green-600 dark:text-green-500",
                    indicator.status === "warning" && "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500",
                    indicator.status === "error" && "bg-red-500/20 text-red-600 dark:text-red-500",
                    indicator.status === "disabled" && "bg-muted/20 text-muted-foreground"
                  )}
                >
                  <IconComponent className="h-4 w-4" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate">{indicator.name}</div>
                    <div className="text-[10px] opacity-80 capitalize">{indicator.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function FleetDashboard() {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'day' | 'week' | 'month'>('day');
  const [expandedStats, setExpandedStats] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="gap-2 bg-background/60 backdrop-blur-sm border-white/10">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Button variant="outline" className="gap-2 bg-background/60 backdrop-blur-sm border-white/10">
          <Upload className="h-4 w-4" />
          Import Data
        </Button>
        <Button variant="outline" className="gap-2 bg-background/60 backdrop-blur-sm border-white/10">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
        <Button variant="outline" className="gap-2 bg-background/60 backdrop-blur-sm border-white/10">
          <MoreVertical className="h-4 w-4" />
          More Actions
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="p-2 rounded-full bg-green-500/10">
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${fleetStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ChevronUp className="h-3 w-3 text-green-500" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
            <div className="p-2 rounded-full bg-blue-500/10">
              <Car className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.activeVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Out of {fleetStats.totalVehicles} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">On-Time Deliveries</CardTitle>
            <div className="p-2 rounded-full bg-purple-500/10">
              <CheckCircle2 className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.onTimeDeliveries}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Badge variant="success" className="h-4 text-[10px] font-normal">
                {Math.round((fleetStats.onTimeDeliveries / fleetStats.totalDeliveries) * 100)}%
              </Badge>
              success rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fuel Cost</CardTitle>
            <div className="p-2 rounded-full bg-orange-500/10">
              <Fuel className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${fleetStats.fuelCost}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Badge variant="frostedGlass" className="h-4 text-[10px] font-normal">
                {fleetStats.fuelEfficiency} mpg avg
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[400px]">
          <ChartCard
            title="Fleet Activity"
            description="Vehicle utilization over time"
            type="line"
            color="hsl(var(--primary))"
            chartHeight={400}
          />
        </div>
        
        <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              Recent Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ChevronRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "p-1.5 rounded-full",
                      alert.type === "warning" && "bg-yellow-500/20",
                      alert.type === "info" && "bg-blue-500/20",
                      alert.type === "success" && "bg-green-500/20"
                    )}>
                      {alert.type === "warning" && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                      {alert.type === "info" && <Info className="h-3 w-3 text-blue-500" />}
                      {alert.type === "success" && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                    </div>
                    <div>
                      <span className="text-sm">{alert.message}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full",
                          alert.priority === "high" && "bg-red-500/20 text-red-500",
                          alert.priority === "medium" && "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500",
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
      <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Recent Activity
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-background/60 backdrop-blur-sm border-white/10">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-background/60 backdrop-blur-sm border-white/10">
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
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    activity.status === "success" && "bg-green-500/20",
                    activity.status === "warning" && "bg-yellow-500/20",
                    activity.status === "info" && "bg-blue-500/20"
                  )}>
                    {activity.status === "success" && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                    {activity.status === "warning" && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                    {activity.status === "info" && <Info className="h-3 w-3 text-blue-500" />}
                  </div>
                  <div>
                    <span className="text-sm">{activity.message}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <Badge 
                        variant={
                          activity.status === "success" ? "success" : 
                          activity.status === "warning" ? "warning" : 
                          "info"
                        }
                        className="text-[10px] h-4 font-normal"
                      >
                        {activity.status}
                      </Badge>
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

export function FleetTracking() {
  const [selectedVehicle, setSelectedVehicle] = React.useState<typeof vehicles[0] | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "moving" | "idling" | "stopped" | "offline" | "maintenance">("all");
  const [unitPreferences, setUnitPreferences] = React.useState({
    speed: "mph",
    temperature: "°F",
    distance: "miles",
    currency: "USD"
  });
  // Add these new states for indicators
  const [activeIndicators, setActiveIndicators] = React.useState<Array<{
    id: string;
    name: string;
    icon: keyof typeof LucideIcons;
    value: string;
    color: string;
  }>>([]);
  const [availableIndicators] = React.useState<Array<{
    id: string;
    name: string;
    icon: keyof typeof LucideIcons;
    color: string;
  }>>([
    { id: "fuel-efficiency", name: "Fuel Efficiency", icon: "BarChart3", color: "blue" },
    { id: "route-progress", name: "Route Progress", icon: "Route", color: "green" },
    { id: "running-time", name: "Running Time", icon: "Clock", color: "yellow" },
    { id: "next-service", name: "Next Service", icon: "Wrench", color: "purple" },
    { id: "load-capacity", name: "Load Capacity", icon: "Package", color: "red" },
    { id: "air-pressure", name: "Air Pressure", icon: "Wind", color: "cyan" },
    { id: "engine-temp", name: "Engine Temp", icon: "Thermometer", color: "orange" },
    { id: "oil-life", name: "Oil Life", icon: "Droplet", color: "green" },
    { id: "battery-health", name: "Battery Health", icon: "Battery", color: "blue" },
    { id: "tire-wear", name: "Tire Wear", icon: "Circle", color: "purple" }
  ]);
  // Add state for map zoom and position
  const [mapZoom, setMapZoom] = React.useState(1.5); // Start zoomed in at 1.5x
  const [mapPosition, setMapPosition] = React.useState({ x: 0, y: 0 });
  // Add state for default indicators along with custom ones
  const [defaultIndicatorsVisible, setDefaultIndicatorsVisible] = React.useState({
    battery: true,
    speed: true,
    temperature: true
  });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [mapBounds, setMapBounds] = React.useState({ width: 0, height: 0 });
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapImageRef = React.useRef<HTMLImageElement>(null);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const tagContainersRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const tagIndicatorsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const [activeTab, setActiveTab] = React.useState("live");
  // Add state for vehicle info card
  const [selectedVehicleForInfo, setSelectedVehicleForInfo] = React.useState<typeof vehicles[0] | null>(null);

  // Add document-level wheel event handler
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const tagContainer = target.closest('.tag-container');
      const statusContainer = target.closest('.status-container');
      
      if (tagContainer || statusContainer) {
        e.preventDefault();
        e.stopPropagation();
        
        const container = tagContainer || statusContainer;
        if (container) {
          // Handle both horizontal and vertical scrolling independently
          if (e.deltaX !== 0) {
            container.scrollLeft += e.deltaX;
          }
          if (e.deltaY !== 0) {
            container.scrollLeft += e.deltaY;
          }
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Create ref callbacks to avoid type issues
  const setTagContainerRef = React.useCallback((id: number) => (el: HTMLDivElement | null) => {
    if (el) {
      tagContainersRef.current.set(id, el);
      // Check overflow after ref is set
      setTimeout(() => checkTagsOverflow(id), 0);
    }
  }, []);
  
  const setTagIndicatorRef = React.useCallback((id: number) => (el: HTMLDivElement | null) => {
    if (el) {
      tagIndicatorsRef.current.set(id, el);
    }
  }, []);

  // Remove the duplicate vehicleCounts declaration and keep only this one
  const vehicleCounts = React.useMemo(() => ({
    all: vehicles.length,
    moving: vehicles.filter(v => v.currentState === "moving").length,
    idling: vehicles.filter(v => v.currentState === "idling").length,
    stopped: vehicles.filter(v => v.currentState === "stopped").length,
    offline: vehicles.filter(v => v.currentState === "offline").length,
    maintenance: vehicles.filter(v => v.currentState === "maintenance").length
  }), [vehicles]);

  // Update the filteredVehicles calculation to handle both map and cards
  const filteredVehicles = React.useMemo(() => {
    return vehicles.filter(vehicle => {
    const matchesSearch = 
      (vehicle.registrationNumber?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (vehicle.vin?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.currentState === statusFilter;
    return matchesSearch && matchesStatus;
  });
  }, [vehicles, searchQuery, statusFilter]);

  // Update map bounds when image loads
  React.useEffect(() => {
    const updateMapBounds = () => {
      if (mapImageRef.current && mapRef.current) {
        const containerWidth = mapRef.current.clientWidth;
        const containerHeight = mapRef.current.clientHeight;
        const imageWidth = mapImageRef.current.naturalWidth;
        const imageHeight = mapImageRef.current.naturalHeight;
        
        setMapBounds({
          width: Math.max(imageWidth, containerWidth),
          height: Math.max(imageHeight, containerHeight)
        });
      }
    };
    
    const imageElement = mapImageRef.current;
    if (imageElement) {
      imageElement.addEventListener('load', updateMapBounds);
      // If image is already loaded
      if (imageElement.complete) {
        updateMapBounds();
      }
    }
    
    return () => {
      imageElement?.removeEventListener('load', updateMapBounds);
    };
  }, []);

  // Handle map drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mapRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && mapRef.current) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      // Calculate boundaries
      const containerWidth = mapRef.current.clientWidth;
      const containerHeight = mapRef.current.clientHeight;
      const scaledImageWidth = mapBounds.width * mapZoom;
      const scaledImageHeight = mapBounds.height * mapZoom;
      
      // Maximum allowed movement in each direction
      const maxX = Math.max(0, (scaledImageWidth - containerWidth) / 2);
      const maxY = Math.max(0, (scaledImageHeight - containerHeight) / 2);
      
      // New position with boundaries applied
      const newX = Math.min(maxX, Math.max(-maxX, mapPosition.x + dx));
      const newY = Math.min(maxY, Math.max(-maxY, mapPosition.y + dy));
      
      setMapPosition({ x: newX, y: newY });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setMapZoom(prev => {
      const newZoom = Math.min(prev + 0.2, 3);
      // Reset position when zooming to avoid being out of bounds
      updatePositionAfterZoom(newZoom);
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setMapZoom(prev => {
      const newZoom = Math.max(prev - 0.2, 0.5);
      // Reset position when zooming to avoid being out of bounds
      updatePositionAfterZoom(newZoom);
      return newZoom;
    });
  };

  const updatePositionAfterZoom = (newZoom: number) => {
    if (mapRef.current) {
      const containerWidth = mapRef.current.clientWidth;
      const containerHeight = mapRef.current.clientHeight;
      const scaledImageWidth = mapBounds.width * newZoom;
      const scaledImageHeight = mapBounds.height * newZoom;
      
      // Maximum allowed movement in each direction
      const maxX = Math.max(0, (scaledImageWidth - containerWidth) / 2);
      const maxY = Math.max(0, (scaledImageHeight - containerHeight) / 2);
      
      // Apply boundaries to current position
      setMapPosition({
        x: Math.min(maxX, Math.max(-maxX, mapPosition.x)),
        y: Math.min(maxY, Math.max(-maxY, mapPosition.y))
      });
    }
  };

  // Function to check if tags are overflowing and update indicator
  const checkTagsOverflow = (vehicleId: number) => {
    const container = tagContainersRef.current.get(vehicleId);
    const indicator = tagIndicatorsRef.current.get(vehicleId);
    
    if (container && indicator) {
      const hasMoreContent = container.scrollWidth > container.clientWidth;
      const isAtStart = container.scrollLeft === 0;
      
      if (hasMoreContent) {
        indicator.style.display = "flex";
        if (isAtStart) {
          indicator.style.opacity = "1";
        } else {
          indicator.style.opacity = "0";
        }
      } else {
        indicator.style.display = "none";
      }
    }
  };

  // Check for overflow when component mounts or window resizes
  React.useEffect(() => {
    // Check all vehicles for tag overflow
    for (const vehicleId of tagContainersRef.current.keys()) {
      checkTagsOverflow(vehicleId);
    }

    // Also check on window resize
    const handleResize = () => {
      for (const vehicleId of tagContainersRef.current.keys()) {
        checkTagsOverflow(vehicleId);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [filteredVehicles]); // Re-run when filtered vehicles change

  // Clean up event listeners
  React.useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <Tabs 
          defaultValue="live" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="inline-flex">
            <TabsTrigger value="live">Live Tracking</TabsTrigger>
            <TabsTrigger value="trace">Vehicle Trace</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 items-center justify-end">
          {/* Trip Selection and Quick Actions - Only visible when trace tab is active */}
          {activeTab === "trace" && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Vehicle:</span>
                <Select>
                  <SelectTrigger className="w-[150px] bg-background/40 backdrop-blur-md border-white/10 text-sm h-9">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                        {vehicle.registrationNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Date:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left text-sm h-9 font-normal w-[150px] bg-background/40 backdrop-blur-md border-white/10 text-muted-foreground"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Pick a date range</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background/40 backdrop-blur-md border-white/10" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      numberOfMonths={1}
                      className="rounded-md border-white/10"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-white/10 gap-2">
                <FileText className="h-4 w-4" />
                Trip Log
              </Button>
              <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-white/10 gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-white/10 gap-2">
                <AlertTriangle className="h-4 w-4" />
                Screenshot
              </Button>
              <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-white/10 gap-2">
                <Bookmark className="h-4 w-4" />
                Report
              </Button>
            </div>
          )}
          
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="live" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden w-full"
      >
        <div className="hidden">
          <TabsList className="inline-flex">
            <TabsTrigger value="live">Live Tracking</TabsTrigger>
            <TabsTrigger value="trace">Vehicle Trace</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="live" className="flex-1 flex flex-col mt-4 overflow-hidden w-full">
          <div className="flex-1 flex gap-4 overflow-hidden w-full">
            {/* Map Section - 70% width */}
            <div className="w-[70%] bg-muted/30 backdrop-blur-md rounded-lg relative overflow-hidden border border-white/10 shadow-xl">
              {/* Map controls - right side */}
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                  onClick={handleZoomIn}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                  onClick={handleZoomOut}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                >
                  <Layers className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                >
                  <Route className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                >
                  <Locate className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              <div 
                ref={mapRef}
                className="w-full h-full relative overflow-hidden cursor-move z-[1]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-full transform"
                  style={{ 
                    transform: `scale(${mapZoom}) translate(${mapPosition.x / mapZoom}px, ${mapPosition.y / mapZoom}px)`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  <img 
                    ref={mapImageRef}
                    src="/Delhi Map.png" 
                    alt="Delhi Map" 
                    className="w-full h-full object-cover dark:invert dark:brightness-90 dark:hue-rotate-180"
                  />
                  
                  {/* Vehicle markers */}
                  {filteredVehicles.map((vehicle) => (
                    <div 
                      key={vehicle.id}
                      className="absolute z-10 transition-all duration-300"
                      style={{
                        top: `${vehicle.mapPosition.top}%`,
                        left: `${vehicle.mapPosition.left}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setSelectedVehicleForInfo(vehicle)}
                    >
                      <div className={cn(
                        "backdrop-blur-xl rounded-full p-2 shadow-lg ring-2 ring-white/20 transition-all duration-300 flex items-center justify-center",
                        vehicle.currentState === "moving" && "bg-green-500/70",
                        vehicle.currentState === "stopped" && "bg-red-500/70",
                        vehicle.currentState === "offline" && "bg-gray-500/70",
                        vehicle.currentState === "maintenance" && "bg-blue-500/70",
                        vehicle.currentState === "idling" && "bg-yellow-500/70",
                        vehicle.id === selectedVehicleForInfo?.id && "animate-pulse"
                      )}>
                      <Car className="h-4 w-4 text-white" />
                    </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/70 backdrop-blur-xl rounded-full px-2 py-0.5 text-[10px] text-white shadow-lg whitespace-nowrap">
                        {vehicle.registrationNumber}
                    </div>
                          </TooltipTrigger>
                          <TooltipPrimitive.Portal>
                            <TooltipContent side="right" align="center" className="max-w-[240px]">
                              <p className="text-xs">{vehicle.fullLocation}</p>
                            </TooltipContent>
                          </TooltipPrimitive.Portal>
                        </Tooltip>
                      </TooltipProvider>
                  </div>
                  ))}
                  
                  {/* Add some route paths between vehicles */}
                  <svg className="absolute inset-0 w-full h-full z-[5]" style={{ pointerEvents: 'none' }}>
                    {/* Path from Truck Alpha to Van Beta */}
                    <path 
                      d="M 33% 20% Q 38% 40%, 45% 60%" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.4)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    
                    {/* Path from Van Beta to Truck Gamma */}
                    <path 
                      d="M 45% 60% Q 55% 55%, 60% 40%" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.4)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    
                    {/* Path from Truck Gamma to Van Delta */}
                    <path 
                      d="M 60% 40% Q 55% 32%, 50% 30%" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.4)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
                
                {/* Status filter tabs - moved to bottom center */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Tabs 
                    value={statusFilter} 
                    onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}
                    className="w-full"
                  >
                    <TabsList className="glass-effect glass-effect-hover glass-effect-active p-1 rounded-full">
                      <TabsTrigger 
                        value="all" 
                        className={cn(
                          "flex items-center gap-1.5 rounded-full transition-all duration-200",
                          "hover:bg-primary/20",
                          statusFilter === "all" && "bg-primary/30 text-primary-foreground"
                        )}
                      >
                        <Activity className="h-4 w-4" />
                    All
                    <span className="inline-flex h-5 items-center justify-center rounded-full bg-primary/20 px-2 text-xs font-medium leading-none text-primary">
                      {vehicleCounts.all}
                    </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="moving" 
                        className={cn(
                          "flex items-center gap-1.5 rounded-full transition-all duration-200",
                          "hover:bg-green-500/20",
                          statusFilter === "moving" && "bg-green-500/30 text-green-600 dark:text-green-500"
                        )}
                      >
                        <Car className="h-4 w-4" />
                    Moving
                    <span className="inline-flex h-5 items-center justify-center rounded-full bg-green-500/20 px-2 text-xs font-medium leading-none text-green-600">
                      {vehicleCounts.moving}
                    </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="idling" 
                        className={cn(
                          "flex items-center gap-1.5 rounded-full transition-all duration-200",
                          "hover:bg-yellow-500/20",
                          statusFilter === "idling" && "bg-yellow-500/30 text-yellow-600 dark:text-yellow-500"
                        )}
                      >
                        <Clock className="h-4 w-4" />
                    Idling
                        <span className="inline-flex h-5 items-center justify-center rounded-full bg-yellow-500/20 px-2 text-xs font-medium leading-none text-yellow-600">
                      {vehicleCounts.idling}
                    </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="stopped" 
                        className={cn(
                          "flex items-center gap-1.5 rounded-full transition-all duration-200",
                          "hover:bg-red-500/20",
                          statusFilter === "stopped" && "bg-red-500/30 text-red-600 dark:text-red-500"
                        )}
                      >
                        <ParkingCircle className="h-4 w-4" />
                    Stopped
                    <span className="inline-flex h-5 items-center justify-center rounded-full bg-red-500/20 px-2 text-xs font-medium leading-none text-red-600">
                      {vehicleCounts.stopped}
                    </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="offline" 
                        className={cn(
                          "flex items-center gap-1.5 rounded-full transition-all duration-200",
                          "hover:bg-gray-500/20",
                          statusFilter === "offline" && "bg-gray-500/30 text-gray-600 dark:text-gray-500"
                        )}
                      >
                        <Wifi className="h-4 w-4" />
                    Offline
                    <span className="inline-flex h-5 items-center justify-center rounded-full bg-gray-500/20 px-2 text-xs font-medium leading-none text-gray-600">
                      {vehicleCounts.offline}
                    </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="maintenance" 
                        className={cn(
                          "flex items-center gap-1.5 rounded-full transition-all duration-200",
                          "hover:bg-blue-500/20",
                          statusFilter === "maintenance" && "bg-blue-500/30 text-blue-600 dark:text-blue-500"
                        )}
                      >
                        <Wrench className="h-4 w-4" />
                    Maintenance
                    <span className="inline-flex h-5 items-center justify-center rounded-full bg-blue-500/20 px-2 text-xs font-medium leading-none text-blue-600">
                      {vehicleCounts.maintenance}
                    </span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Vehicle List - 30% width */}
            <div className="w-[30%] flex flex-col gap-4">
              <div className="flex flex-col gap-4 px-1 py-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    placeholder="Search vehicles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
                    <DropdownMenu open={showFilterMenu} onOpenChange={setShowFilterMenu}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                          <Filter className="h-4 w-4 mr-1" />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem>
                          <span className="flex-1">Driver Rating</span>
                          <ChevronRight className="h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="flex-1">Vehicle Type</span>
                          <ChevronRight className="h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="flex-1">Fuel Type</span>
                          <ChevronRight className="h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="flex-1">Vehicle Class</span>
                          <ChevronRight className="h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="flex-1">Maintenance Status</span>
                          <ChevronRight className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="space-y-2">
                  {filteredVehicles.map((vehicle) => (
                    <Card
                      key={vehicle.id}
                      className={`cursor-pointer transition-colors ${
                        selectedVehicle?.id === vehicle.id ? "border-primary" : ""
                      }`}
                      onClick={() => setSelectedVehicle(vehicle)}
                    >
                      <CardContent className="p-4">
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "p-2 rounded-full",
                                vehicle.currentState === "moving" && "bg-green-500/20 text-green-500",
                                vehicle.currentState === "stopped" && "bg-red-500/20 text-red-500",
                                vehicle.currentState === "offline" && "bg-gray-500/20 text-gray-500",
                                vehicle.currentState === "maintenance" && "bg-blue-500/20 text-blue-500",
                                vehicle.currentState === "idling" && "bg-yellow-500/20 text-yellow-500"
                              )}>
                                <Car className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-medium truncate">{vehicle.registrationNumber}</h3>
                                <p className="text-sm text-muted-foreground">VIN: {vehicle.vin ? `...${vehicle.vin.slice(-6)}` : ""}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
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

                        {/* Location and ETA Section */}
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 text-muted-foreground max-w-[150px]">
                                  <MapPin className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">{vehicle.location}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipPrimitive.Portal>
                                <TooltipContent className="max-w-[240px]">
                                  <p>{vehicle.fullLocation}</p>
                                </TooltipContent>
                              </TooltipPrimitive.Portal>
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

                        {/* Metrics Section */}
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 backdrop-blur-sm">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Gauge className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">{vehicle.speed}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">km/h</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Current Speed</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 backdrop-blur-sm">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Route className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">32.9</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">km</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Distance Since Morning</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/30 backdrop-blur-sm">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">47</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">mins</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Running Time Since Last Activity</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* Tags Section */}
                        <div className="relative mb-3">
                          <div 
                            ref={setTagContainerRef(vehicle.id)}
                            className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] tag-container"
                            onScroll={(e) => {
                              const target = e.target as HTMLDivElement;
                              const hasScrolled = target.scrollLeft > 0;
                              const hasMoreContent = target.scrollWidth > target.clientWidth;
                              const isAtStart = target.scrollLeft === 0;
                              
                              const indicator = tagIndicatorsRef.current.get(vehicle.id);
                              if (indicator) {
                                if (hasMoreContent) {
                                  indicator.style.display = "flex";
                                  indicator.style.opacity = isAtStart ? "1" : "0";
                                } else {
                                  indicator.style.display = "none";
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
                                        className={cn(
                                          "text-xs px-2.5 py-1.5 backdrop-blur-sm border-0 shadow-sm",
                                          vehicle.currentState === "moving" && "bg-green-500/20 text-green-600 dark:text-green-500",
                                          vehicle.currentState === "stopped" && "bg-red-500/20 text-red-600 dark:text-red-500",
                                          vehicle.currentState === "offline" && "bg-gray-500/20 text-gray-600 dark:text-gray-500",
                                          vehicle.currentState === "maintenance" && "bg-blue-500/20 text-blue-600 dark:text-blue-500",
                                          vehicle.currentState === "idling" && "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500"
                                        )}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <Car className={cn(
                                            "h-3 w-3",
                                            vehicle.currentState === "moving" && "text-green-600 dark:text-green-500",
                                            vehicle.currentState === "stopped" && "text-red-600 dark:text-red-500",
                                            vehicle.currentState === "offline" && "text-gray-600 dark:text-gray-500",
                                            vehicle.currentState === "maintenance" && "text-blue-600 dark:text-blue-500",
                                            vehicle.currentState === "idling" && "text-yellow-600 dark:text-yellow-500"
                                          )} />
                                          {vehicle.currentState}
                                        </div>
                                      </Badge>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Current Vehicle State</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Badge 
                                variant="outline" 
                                className="text-xs px-2.5 py-1.5 bg-muted/30 backdrop-blur-sm border-0 shadow-sm"
                              >
                                <div className="flex items-center gap-1.5">
                                  <Car className="h-3 w-3 text-primary" />
                                  {vehicle.vehicleClass}
                                </div>
                              </Badge>
                              {vehicle.healthIndicators?.map((indicator, index) => (
                                <TooltipProvider key={index}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div>
                                        <Badge 
                                          variant="outline" 
                                          className={cn(
                                            "text-xs px-2.5 py-1.5 bg-muted/30 backdrop-blur-sm border-0 shadow-sm",
                                            indicator.status === "error" && "text-red-500",
                                            indicator.status === "warning" && "text-yellow-600 dark:text-yellow-500",
                                            indicator.status === "info" && "text-blue-500"
                                          )}
                                        >
                                          <div className="flex items-center gap-1.5">
                                            {indicator.type === "engine" && <Wrench className="h-3 w-3" />}
                                            {indicator.type === "tire" && <Circle className="h-3 w-3" />}
                                            {indicator.type === "brake" && <Settings className="h-3 w-3" />}
                                            {indicator.type === "battery" && <Battery className="h-3 w-3" />}
                                            {indicator.type === "coolant" && <Droplet className="h-3 w-3" />}
                                            {indicator.type === "oil" && <Droplet className="h-3 w-3" />}
                                            {indicator.type === "transmission" && <Settings className="h-3 w-3" />}
                                            {indicator.type === "air filter" && <Wind className="h-3 w-3" />}
                                            {indicator.type}
                                          </div>
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
                          <div 
                            ref={setTagIndicatorRef(vehicle.id)}
                            className="absolute right-0 top-0 bottom-0 pointer-events-none flex items-center"
                            style={{ display: "none" }}
                          >
                            <div className="bg-gradient-to-l from-background/80 to-transparent h-full flex items-center px-2 transition-opacity duration-200">
                              <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-8 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (mapRef.current) {
                                // First set the zoom level for better visibility
                                const newZoom = 2;
                                setMapZoom(newZoom);
                                
                                // Get container dimensions
                                const containerWidth = mapRef.current.clientWidth;
                                const containerHeight = mapRef.current.clientHeight;
                                
                                // Calculate the position to center the vehicle
                                // We need to invert the position because we're moving the map under a fixed viewport
                                const newX = -(vehicle.mapPosition.left / 100 * containerWidth) + containerWidth / 2;
                                const newY = -(vehicle.mapPosition.top / 100 * containerHeight) + containerHeight / 2;
                                
                                // Apply the new position
                                setMapPosition({ x: newX, y: newY });
                                setSelectedVehicleForInfo(vehicle);
                              }
                            }}
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-8 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab("trace");
                            }}
                          >
                            <Route className="h-3 w-3 mr-1" />
                            Trace
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trace">
          <VehicleTrace />
        </TabsContent>
      </Tabs>

      {/* Vehicle Details Sheet */}
      <Sheet open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 overflow-hidden flex flex-col dark:bg-white/90 bg-black/70 dark:backdrop-blur-2xl backdrop-blur-2xl dark:border-white/10 border-white/10 shadow-2xl">
          {/* Hero section with vehicle info */}
          <div className="relative">
            {/* Background image/gradient */}
            <div className="absolute inset-0 bg-gradient-to-b dark:from-black/40 from-black/80 to-transparent z-10"></div>
            <div className="h-48 w-full overflow-hidden">
              <img 
                src="/Delhi Map.png" 
                alt="Vehicle location" 
                className="w-full h-full object-cover blur-sm dark:opacity-90 opacity-60 dark:brightness-100 brightness-50"
              />
            </div>
            
            {/* Vehicle status indicator */}
            <div className="absolute top-4 right-4 z-20">
              <Badge 
                variant={selectedVehicle?.currentState === "moving" ? "moving" : 
                        selectedVehicle?.currentState === "stopped" ? "stopped" : 
                        selectedVehicle?.currentState === "offline" ? "offline" : 
                        selectedVehicle?.currentState === "maintenance" ? "maintenance" : 
                        selectedVehicle?.currentState === "idling" ? "idling" : "outline"}
                className="text-xs font-medium px-3 py-1"
              >
                {selectedVehicle?.currentState}
              </Badge>
            </div>
            
            {/* Close button */}
            <div className="absolute top-4 left-4 z-20">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedVehicle(null)}
                className="h-8 w-8 dark:bg-black/20 bg-white/20 backdrop-blur-md rounded-full dark:border-black/10 border-white/10 dark:hover:bg-black/30 hover:bg-white/30"
              >
                <XCircle className="h-4 w-4 dark:text-black/80 text-white/80" />
              </Button>
            </div>
            
            {/* Main vehicle info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-3 rounded-full",
                  selectedVehicle?.currentState === "moving" && "dark:bg-green-500/20 dark:text-green-600 bg-green-500/30 text-green-400",
                  selectedVehicle?.currentState === "stopped" && "dark:bg-red-500/20 dark:text-red-600 bg-red-500/30 text-red-400",
                  selectedVehicle?.currentState === "offline" && "dark:bg-gray-500/20 dark:text-gray-600 bg-gray-500/30 text-gray-400",
                  selectedVehicle?.currentState === "maintenance" && "dark:bg-blue-500/20 dark:text-blue-600 bg-blue-500/30 text-blue-400",
                  selectedVehicle?.currentState === "idling" && "dark:bg-yellow-500/20 dark:text-yellow-600 bg-yellow-500/30 text-yellow-400"
                )}>
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold dark:text-black text-white">
                    {selectedVehicle?.registrationNumber}
                  </h3>
                  <p className="text-sm dark:text-black/60 text-white/60">
                    VIN: {selectedVehicle?.vin}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location information */}
          <div className="p-4 dark:bg-white/40 bg-black/40 backdrop-blur-md border-b border-white/10 dark:border-black/10">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium dark:text-black text-white">Location</h4>
                <p className="text-xs dark:text-black/70 text-white/70 mt-1">{selectedVehicle?.fullLocation}</p>
              </div>
            </div>
          </div>
          
          {/* Vehicle metrics in a grid - with scrolling */}
          <div className="flex flex-col overflow-hidden bg-transparent">
            {/* Scrollable container for indicators */}
            <div className="max-h-60 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 dark:[&::-webkit-scrollbar-thumb]:bg-black/20">
              <div className="grid grid-cols-4 gap-0 bg-transparent">
                {/* Default metrics - now with remove buttons */}
                {selectedVehicle?.fuelType === "electric" && defaultIndicatorsVisible.battery ? (
                  <div className="relative p-4 dark:bg-white/40 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center group m-[0.5px]">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-red-500/20 hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDefaultIndicatorsVisible(prev => ({ ...prev, battery: false }))}
                    >
                      <XCircle className="h-3 w-3 text-red-500" />
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center">
                <Battery className="h-5 w-5 text-blue-500 mb-1" />
                <span className="text-lg font-medium dark:text-black text-white">{selectedVehicle?.battery}%</span>
                            <span className="text-xs dark:text-black/60 text-white/60 max-w-[60px] truncate">Battery</span>
              </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center" className="z-50">
                          <p>Battery</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : selectedVehicle?.fuelType !== "electric" && defaultIndicatorsVisible.battery ? (
                  <div className="relative p-4 dark:bg-white/40 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center group m-[0.5px]">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-red-500/20 hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDefaultIndicatorsVisible(prev => ({ ...prev, battery: false }))}
                    >
                      <XCircle className="h-3 w-3 text-red-500" />
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center">
                <Fuel className="h-5 w-5 text-green-500 mb-1" />
                <span className="text-lg font-medium dark:text-black text-white">{selectedVehicle?.fuel}%</span>
                            <span className="text-xs dark:text-black/60 text-white/60 max-w-[60px] truncate">Fuel</span>
              </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center" className="z-50">
                          <p>Fuel</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : null}
                
                {defaultIndicatorsVisible.speed && (
                  <div className="relative p-4 dark:bg-white/40 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center group m-[0.5px]">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-red-500/20 hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDefaultIndicatorsVisible(prev => ({ ...prev, speed: false }))}
                    >
                      <XCircle className="h-3 w-3 text-red-500" />
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center">
              <Gauge className="h-5 w-5 text-purple-500 mb-1" />
              <span className="text-lg font-medium dark:text-black text-white">{selectedVehicle?.speed}</span>
                            <span className="text-xs dark:text-black/60 text-white/60 max-w-[60px] truncate">Speed</span>
            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center" className="z-50">
                          <p>Speed</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                
                {defaultIndicatorsVisible.temperature && (
                  <div className="relative p-4 dark:bg-white/40 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center group m-[0.5px]">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-red-500/20 hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDefaultIndicatorsVisible(prev => ({ ...prev, temperature: false }))}
                    >
                      <XCircle className="h-3 w-3 text-red-500" />
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center">
              <Thermometer className="h-5 w-5 text-red-500 mb-1" />
              <span className="text-lg font-medium dark:text-black text-white">{selectedVehicle?.temperature}°</span>
                            <span className="text-xs dark:text-black/60 text-white/60 max-w-[60px] truncate">Temp</span>
            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center" className="z-50">
                          <p>Temperature</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
    
                {/* Dynamic indicators - render active ones */}
                {activeIndicators.map((indicator) => {
                  const IconComponent = LucideIcons[indicator.icon];
                  return (
                    <div key={indicator.id} className="relative p-4 dark:bg-white/40 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center group m-[0.5px]">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-red-500/20 hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setActiveIndicators(prev => prev.filter(i => i.id !== indicator.id))}
                      >
                        <XCircle className="h-3 w-3 text-red-500" />
                      </Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex flex-col items-center">
                              {IconComponent && <IconComponent className={`h-5 w-5 text-${indicator.color}-500 mb-1`} />}
                              <span className="text-lg font-medium dark:text-black text-white">{indicator.value}</span>
                              <span className="text-xs dark:text-black/60 text-white/60 max-w-[60px] truncate">{indicator.name}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center" className="z-50">
                            <p>{indicator.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  );
                })}
    
                {/* Add indicator cell - no limit on number of indicators now */}
                <div className="p-4 dark:bg-white/40 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center m-[0.5px]">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-col items-center cursor-pointer">
                    <Plus className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-medium dark:text-black text-white">Add</span>
                    <span className="text-xs dark:text-black/60 text-white/60">Indicator</span>
                  </div>
                </PopoverTrigger>
                    <PopoverContent side="bottom" align="end" className="w-48 p-2 max-h-64 overflow-y-auto">
                  <p className="text-xs font-medium px-2 py-1 text-muted-foreground">Add Indicator</p>
                      {/* Add default indicators to dropdown if they're not visible */}
                      {!defaultIndicatorsVisible.battery && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-xs h-8 px-2"
                          onClick={() => setDefaultIndicatorsVisible(prev => ({ ...prev, battery: true }))}
                        >
                          {selectedVehicle?.fuelType === "electric" ? (
                            <Battery className="h-3.5 w-3.5 mr-2 text-blue-500" />
                          ) : (
                            <Fuel className="h-3.5 w-3.5 mr-2 text-green-500" />
                          )}
                          {selectedVehicle?.fuelType === "electric" ? "Battery" : "Fuel"}
                  </Button>
                      )}
                      {!defaultIndicatorsVisible.speed && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-xs h-8 px-2"
                          onClick={() => setDefaultIndicatorsVisible(prev => ({ ...prev, speed: true }))}
                        >
                          <Gauge className="h-3.5 w-3.5 mr-2 text-purple-500" />
                          Speed
                  </Button>
                      )}
                      {!defaultIndicatorsVisible.temperature && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-xs h-8 px-2"
                          onClick={() => setDefaultIndicatorsVisible(prev => ({ ...prev, temperature: true }))}
                        >
                          <Thermometer className="h-3.5 w-3.5 mr-2 text-red-500" />
                          Temperature
                  </Button>
                      )}
                      
                      {/* List custom indicators that aren't already added */}
                      {availableIndicators
                        .filter(indicator => !activeIndicators.some(active => active.id === indicator.id))
                        .map(indicator => {
                          const IconComponent = LucideIcons[indicator.icon];
                          return (
                            <Button 
                              key={indicator.id}
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-start text-xs h-8 px-2"
                              onClick={() => {
                                // Add indicator with a random value
                                const newValue = `${Math.floor(Math.random() * 100)}${
                                  indicator.name.includes('Time') ? 'm' : 
                                  indicator.name.includes('Temp') ? '°' : 
                                  indicator.name.includes('Capacity') ? 'kg' : 
                                  '%'
                                }`;
  
                                setActiveIndicators(prev => [
                                  ...prev, 
                                  { 
                                    ...indicator, 
                                    value: newValue
                                  }
                                ]);
                              }}
                            >
                              {IconComponent && <IconComponent className={`h-3.5 w-3.5 mr-2 text-${indicator.color}-500`} />}
                              {indicator.name}
                  </Button>
                          );
                      })}
                      {availableIndicators.length === activeIndicators.length && 
                        defaultIndicatorsVisible.battery && 
                        defaultIndicatorsVisible.speed && 
                        defaultIndicatorsVisible.temperature && (
                        <p className="text-xs text-center py-2 text-muted-foreground">All indicators added</p>
                      )}
                </PopoverContent>
              </Popover>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-white/20">
            <Tabs defaultValue="info" className="w-full flex-1 flex flex-col">
              <div className="px-4 pt-4 sticky top-0 z-10 dark:bg-white/90 bg-black/70 dark:backdrop-blur-xl backdrop-blur-xl border-b dark:border-black/10 border-white/10">
                <TabsList className="w-full grid grid-cols-3 dark:bg-white/40 bg-black/40 backdrop-blur-md rounded-lg">
                  <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Info</TabsTrigger>
                  <TabsTrigger value="maintenance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Service</TabsTrigger>
                  <TabsTrigger value="issues" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Issues
                    {selectedVehicle?.healthIndicators?.length ? (
                      <span className="ml-1 rounded-full text-[10px] flex items-center justify-center h-4 min-w-4 px-1 bg-red-500/20 text-red-400">
                        {selectedVehicle.healthIndicators.length}
                      </span>
                    ) : null}
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1 overflow-auto">
                <TabsContent value="info" className="p-4 space-y-4 mt-2 pb-6">
                  <div className="dark:bg-white/40 bg-black/40 backdrop-blur-md rounded-lg p-4">
                    <div className="text-xs uppercase dark:text-black/50 text-white/50 mb-2">Status Metrics</div>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Next Service</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-blue-500" /> 
                          {selectedVehicle?.nextMaintenance}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Last Service</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-green-500" /> 
                          {selectedVehicle?.lastMaintenance}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Current Speed</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          <Gauge className="h-3 w-3 text-purple-500" /> 
                          <span>{selectedVehicle?.speed}</span>
                          <span className="text-xs text-muted-foreground">km/h</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Fuel Type</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          {selectedVehicle?.fuelType === "electric" ? (
                            <Battery className="h-3 w-3 text-blue-500" />
                          ) : (
                            <Fuel className="h-3 w-3 text-green-500" />
                          )} 
                          {selectedVehicle?.fuelType === "electric" ? "Electric" : "Diesel"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Time to Service</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          <Clock className="h-3 w-3 text-orange-500" /> 
                          15 days
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Service Due Status</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 text-yellow-500" /> 
                          <Badge className="bg-yellow-500/20 text-yellow-600 border-0 px-1.5 py-0 h-5">Due Soon</Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Distance to Service</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          <Route className="h-3 w-3 text-purple-500" /> 
                          <span>500</span>
                          <span className="text-xs text-muted-foreground">km</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs dark:text-black/60 text-white/60">Engine Hours to Service</div>
                        <div className="text-sm font-medium dark:text-black text-white flex items-center gap-1">
                          <Settings className="h-3 w-3 text-blue-500" /> 
                          <span>45</span>
                          <span className="text-xs text-muted-foreground">hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="maintenance" className="p-4 space-y-4 mt-2 pb-6">
                  <div className="dark:bg-white/40 bg-black/40 backdrop-blur-md rounded-lg p-4">
                    <div className="text-xs uppercase dark:text-black/50 text-white/50 mb-2">Service Schedule</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium dark:text-black text-white">Next Service</div>
                          <div className="text-xs dark:text-black/60 text-white/60">{selectedVehicle?.nextMaintenance}</div>
                        </div>
                        <Button size="sm" variant="default" className="h-8 !bg-primary !text-primary-foreground">Book Service</Button>
                      </div>
                      
                      <Separator className="dark:bg-black/10 bg-white/10" />
                      
                      <div>
                        <div className="text-sm font-medium dark:text-black text-white">Last Service</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs dark:text-black/60 text-white/60">{selectedVehicle?.lastMaintenance}</div>
                          <Badge variant="outline" className="text-xs bg-green-500/20 text-green-500 border-green-500/30">Completed</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dark:bg-white/40 bg-black/40 backdrop-blur-md rounded-lg p-4">
                    <div className="text-xs uppercase dark:text-black/50 text-white/50 mb-2">Maintenance History</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium dark:text-black text-white">Regular Service</div>
                          <div className="text-xs dark:text-black/60 text-white/60">Oil change, filters, inspection</div>
                        </div>
                        <div className="text-xs dark:text-black/60 text-white/60">15 days ago</div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium dark:text-black text-white">Tire Replacement</div>
                          <div className="text-xs dark:text-black/60 text-white/60">Front tires replaced</div>
                        </div>
                        <div className="text-xs dark:text-black/60 text-white/60">45 days ago</div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium dark:text-black text-white">Battery Check</div>
                          <div className="text-xs dark:text-black/60 text-white/60">Battery tested and replaced</div>
                        </div>
                        <div className="text-xs dark:text-black/60 text-white/60">60 days ago</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="issues" className="p-4 mt-2 pb-6">
                  {selectedVehicle?.healthIndicators?.length ? (
                    <div className="space-y-3">
                      {selectedVehicle.healthIndicators.map((indicator, idx) => (
                        <div
                          key={idx}
                          className="dark:bg-white/40 bg-black/40 backdrop-blur-md rounded-lg p-4 border-l-2 border-l-transparent"
                          style={{
                            borderLeftColor: indicator.status === "error" ? 
                              "rgb(239, 68, 68)" : // red-500
                              indicator.status === "warning" ? 
                              "rgb(234, 179, 8)" : // yellow-500
                              "rgb(59, 130, 246)" // blue-500
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {indicator.status === "error" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                              {indicator.status === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                              {indicator.status === "info" && <Info className="h-4 w-4 text-blue-500" />}
                              <div className="font-medium dark:text-black text-white capitalize">{indicator.type}</div>
                            </div>
                            <Badge 
                              variant={
                                indicator.status === "error" ? "destructive" :
                                indicator.status === "warning" ? "warning" :
                                "info"
                              }
                              className="text-[10px] h-5"
                            >
                              {indicator.status}
                            </Badge>
                          </div>
                          <p className="text-sm dark:text-black/70 text-white/70 mt-2">{indicator.message}</p>
                          <div className="mt-3 flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-7 px-2 dark:bg-white/40 bg-black/40 backdrop-blur-md dark:border-black/10 border-white/10 dark:text-black text-white dark:hover:bg-white/60 hover:bg-black/60">
                              Dismiss
                            </Button>
                            <Button size="sm" variant="default" className="h-7 px-2 !bg-primary !text-primary-foreground">
                              Service Issue
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-lg font-medium dark:text-black text-white">All Systems Operational</h3>
                      <p className="text-sm dark:text-black/60 text-white/60 max-w-[260px] mt-1">
                        No issues detected with this vehicle. All systems are functioning properly.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Fixed action buttons - always visible at bottom */}
          <div className="p-4 dark:border-t dark:border-black/10 border-t border-white/10 sticky bottom-0 z-10 dark:bg-white/90 bg-black/70 dark:backdrop-blur-xl backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="dark:bg-white/40 bg-black/40 backdrop-blur-md dark:border-black/10 border-white/10 dark:text-black text-white dark:hover:bg-white/60 hover:bg-black/60">
                <FileText className="h-4 w-4 mr-2" />
                DIC
              </Button>
              <Button variant="outline" className="dark:bg-white/40 bg-black/40 backdrop-blur-md dark:border-black/10 border-white/10 dark:text-black text-white dark:hover:bg-white/60 hover:bg-black/60">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="dark:bg-white/40 bg-black/40 backdrop-blur-md dark:border-black/10 border-white/10 dark:text-black text-white dark:hover:bg-white/60 hover:bg-black/60">
                <FileText className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* Vehicle Info Card */}
      {selectedVehicleForInfo && (
        <VehicleInfoCard 
          vehicle={selectedVehicleForInfo} 
          onClose={() => setSelectedVehicleForInfo(null)}
          position={selectedVehicleForInfo.mapPosition}
          mapRef={mapRef}
        />
      )}
    </div>
  );
}

export function FleetManagementShowcase() {
  const [hydrated, setHydrated] = React.useState(false);
  
  // This useEffect runs only on the client, setting hydrated to true after initial render
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  
  // If not yet hydrated, return null or a simple loading state to prevent hydration mismatch
  if (!hydrated) {
    return null; // Complete client-side rendering to avoid hydration mismatch
  }
  
  return (
    <div className="w-full h-full px-4 py-8 space-y-6" suppressHydrationWarning>
      <div className="flex flex-col mb-6 w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold tracking-tight">Fleet Management</h2>
          <a 
            href="/fleet-management" 
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View Full Fleet Management →
          </a>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          A comprehensive fleet management system with real-time vehicle tracking, analytics dashboard, and maintenance scheduling. Monitor vehicle status, track deliveries, and optimize routes with this powerful interface.
        </p>
      </div>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full justify-center bg-background/60 backdrop-blur-md border border-white/10">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="w-full">
          <FleetDashboard />
        </TabsContent>
        <TabsContent value="tracking" className="w-full">
          <FleetTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
} 