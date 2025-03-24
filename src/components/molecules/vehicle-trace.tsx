"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { DateRange } from "react-day-picker";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Activity, 
  AlertCircle, 
  Car, 
  Clock, 
  Fuel, 
  MapPin, 
  Settings, 
  Users,
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
  Share2,
  Play,
  Pause,
  FastForward,
  Rewind,
  Calendar as CalendarIcon
} from "lucide-react";

// Mock data for vehicles
const vehicles = [
  { id: 1, name: "Truck Alpha", registrationNumber: "MH01AB1234" },
  { id: 2, name: "Van Beta", registrationNumber: "DL02CD5678" },
  { id: 3, name: "Truck Gamma", registrationNumber: "UP-03-EF-9012" },
];

// Mock data for vehicle stats
const vehicleStats = {
  model: "Tata 407",
  odometer: 12500,
  fuelEfficiency: 8.2,
  delta: 2.5,
  fuelConsumed: 45.2,
  driveMode: "Normal",
  overallFuelEconomy: 7.8,
  ignitionStatus: "Running",
  timeElapsed: "2h 30m",
  distanceElapsed: "125km",
  speed: 65,
  eventCount: {
    harshAcceleration: 3,
    harshBrake: 2,
    rashTurn: 1
  },
  currentDateTime: new Date(),
  currentGear: "5",
  engineRPM: 2500
};

// Mock data for vehicle events
const vehicleEvents = [
  {
    id: 1,
    type: "Stoppage",
    dateTime: new Date(),
    duration: "15m",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    type: "Harsh Acceleration",
    dateTime: new Date(),
    duration: "N/A",
    location: "Delhi, Delhi"
  },
  {
    id: 3,
    type: "Idling",
    dateTime: new Date(),
    duration: "30m",
    location: "Bangalore, Karnataka"
  }
];

// Mock route data
const mockRouteData = {
  coordinates: [
    [72.8777, 19.0760], // Mumbai
    [77.1025, 28.7041], // Delhi
    [77.5946, 12.9716], // Bangalore
    [78.4867, 17.3850], // Hyderabad
    [80.2707, 13.0827], // Chennai
  ],
  timestamps: [
    "2024-03-20T10:00:00Z",
    "2024-03-20T12:00:00Z",
    "2024-03-20T14:00:00Z",
    "2024-03-20T16:00:00Z",
    "2024-03-20T18:00:00Z",
  ],
};

// Add mock timeline data
const mockTimelineData = [
  {
    time: "10:00",
    location: "Mumbai, Maharashtra",
    event: "Start",
    speed: 0,
    fuel: 100,
  },
  {
    time: "11:00",
    location: "En route to Delhi",
    event: "Moving",
    speed: 65,
    fuel: 85,
  },
  {
    time: "12:00",
    location: "Delhi, Delhi",
    event: "Stop",
    speed: 0,
    fuel: 70,
  },
  {
    time: "13:00",
    location: "En route to Bangalore",
    event: "Moving",
    speed: 60,
    fuel: 55,
  },
  {
    time: "14:00",
    location: "Bangalore, Karnataka",
    event: "Stop",
    speed: 0,
    fuel: 40,
  },
];

export function VehicleTrace() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<string | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [activeTab, setActiveTab] = React.useState<"live" | "history">("live");
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = React.useState(0);
  const [isTimelineExpanded, setIsTimelineExpanded] = React.useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"; // Replace with actual token

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [72.8777, 19.0760],
      zoom: 5,
      attributionControl: false
    });

    map.current.on("load", () => {
      // Add route line
      map.current?.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: mockRouteData.coordinates,
          },
        },
      });

      map.current?.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "hsl(var(--primary))",
          "line-width": 3,
        },
      });

      // Add vehicle marker
      map.current?.addSource("vehicle", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: mockRouteData.coordinates[0],
          },
          properties: {},
        },
      });

      map.current?.addLayer({
        id: "vehicle",
        type: "circle",
        source: "vehicle",
        paint: {
          "circle-radius": 8,
          "circle-color": "hsl(var(--primary))",
          "circle-stroke-width": 2,
          "circle-stroke-color": "white",
        },
      });

      setIsMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const startPlayback = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentTimeIndex((prev) => {
        if (prev >= mockRouteData.coordinates.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  const updateVehiclePosition = (index: number) => {
    if (!map.current || !isMapLoaded) return;
    
    const coordinates = mockRouteData.coordinates[index];
    map.current.setFeatureState(
      { source: "vehicle", id: 0 },
      { coordinates }
    );
  };

  useEffect(() => {
    if (isMapLoaded) {
      updateVehiclePosition(currentTimeIndex);
    }
  }, [currentTimeIndex, isMapLoaded]);

  return (
    <div className="h-[calc(100vh-16rem)] overflow-hidden">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Left Panel - 3 columns */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Vehicle Selection */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-base">Vehicle</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Select onValueChange={setSelectedVehicle}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                      {vehicle.name} - {vehicle.registrationNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Date Range Selection */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-base">Date Range</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from && dateRange?.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={(date) => {
                      return date.getDay() === 0 || date.getDay() === 6;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Timeline Controls */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-base">Timeline Controls</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Playback Speed</span>
                    <Select
                      value={playbackSpeed.toString()}
                      onValueChange={(value) => setPlaybackSpeed(Number(value))}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5x</SelectItem>
                        <SelectItem value="1">1x</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                        <SelectItem value="4">4x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Play/Pause</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={isPlaying ? stopPlayback : startPlayback}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Timeline Position</span>
                  <Slider
                    value={[currentTimeIndex]}
                    onValueChange={([value]) => setCurrentTimeIndex(value)}
                    max={mockTimelineData.length - 1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Panel - 6 columns */}
        <div className="col-span-6 flex flex-col gap-4">
          {/* Map with Timeline Drawer */}
          <Card className="h-[calc(300px+330px+2rem)] relative overflow-hidden">
            <CardContent className="p-0 h-full">
              <div ref={mapContainer} className="w-full h-full" />
              {/* Timeline Drawer */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t transition-all duration-300",
                isTimelineExpanded ? "h-[200px]" : "h-[48px]"
              )}>
                <div className="flex items-center justify-between p-2 border-b">
                  <CardTitle className="text-base">Timeline</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
                  >
                    {isTimelineExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className={cn(
                  "p-4 transition-opacity duration-300",
                  isTimelineExpanded ? "opacity-100" : "opacity-0"
                )}>
                  <div className="grid grid-cols-5 gap-2">
                    {mockTimelineData.map((point, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex flex-col gap-1 p-2 rounded-lg transition-colors cursor-pointer",
                          currentTimeIndex === index && "bg-accent"
                        )}
                        onClick={() => setCurrentTimeIndex(index)}
                      >
                        <div className="text-sm font-medium">{point.time}</div>
                        <div className="text-xs text-muted-foreground truncate">{point.event}</div>
                        <div className="flex items-center gap-2 text-xs">
                          <Gauge className="h-3 w-3" />
                          {point.speed} km/h
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - 3 columns */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Vehicle Events */}
          <Card className="h-[300px]">
            <CardHeader className="py-2">
              <CardTitle className="text-base">Vehicle Events</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[200px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...vehicleEvents, ...vehicleEvents, ...vehicleEvents].map((event, index) => (
                      <TableRow key={`${event.id}-${index}`}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span>{event.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{format(event.dateTime, "HH:mm")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Vehicle Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Model</p>
                      <p className="font-medium">{vehicleStats.model}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Odometer</p>
                      <p className="font-medium">{vehicleStats.odometer} km</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                      <p className="font-medium">{vehicleStats.fuelEfficiency} km/l</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Delta</p>
                      <p className="font-medium">{vehicleStats.delta} km/l</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Fuel Consumed</p>
                      <p className="font-medium">{vehicleStats.fuelConsumed} L</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Drive Mode</p>
                      <p className="font-medium">{vehicleStats.driveMode}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Overall Fuel Economy</p>
                      <p className="font-medium">{vehicleStats.overallFuelEconomy} km/l</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Ignition Status</p>
                      <p className="font-medium">{vehicleStats.ignitionStatus}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Time Elapsed</p>
                      <p className="font-medium">{vehicleStats.timeElapsed}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Distance Elapsed</p>
                      <p className="font-medium">{vehicleStats.distanceElapsed}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Speed</p>
                      <p className="font-medium">{vehicleStats.speed} km/h</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Current Gear</p>
                      <p className="font-medium">{vehicleStats.currentGear}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Engine RPM</p>
                      <p className="font-medium">{vehicleStats.engineRPM}</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 