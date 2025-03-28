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
import { useEffect, useRef, useState } from "react";
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
  Calendar as CalendarIcon,
  Plus,
  Minus
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
    { x: 33, y: 20 }, // Mumbai
    { x: 45, y: 60 }, // Delhi
    { x: 60, y: 40 }, // Bangalore
    { x: 50, y: 30 }, // Hyderabad
    { x: 55, y: 45 }, // Chennai
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const [mapZoom, setMapZoom] = useState(1.5);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapBounds, setMapBounds] = useState({ width: 0, height: 0 });
  const [selectedVehicle, setSelectedVehicle] = React.useState<string | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [activeTab, setActiveTab] = React.useState<"live" | "history">("live");
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = React.useState(0);
  const [isTimelineExpanded, setIsTimelineExpanded] = React.useState(true);

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

      const containerWidth = mapRef.current.clientWidth;
      const containerHeight = mapRef.current.clientHeight;
      const scaledImageWidth = mapBounds.width * mapZoom;
      const scaledImageHeight = mapBounds.height * mapZoom;
      
      const maxX = Math.max(0, (scaledImageWidth - containerWidth) / 2);
      const maxY = Math.max(0, (scaledImageHeight - containerHeight) / 2);
      
      const newX = Math.min(maxX, Math.max(-maxX, mapPosition.x + dx));
      const newY = Math.min(maxY, Math.max(-maxY, mapPosition.y + dy));
      
      setMapPosition({ x: newX, y: newY });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
    <div className="h-[calc(100vh-16rem)] w-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vehicle Trace</h2>
        <div className="flex gap-2">
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden w-full">
        {/* Left Panel - 25% width */}
        <ScrollArea className="w-[360px] shrink-0">
          <div className="flex flex-col gap-4">
          {/* Vehicle Selection */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-base">Vehicle</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Select onValueChange={setSelectedVehicle}>
                  <SelectTrigger className="w-full bg-background/40 backdrop-blur-md border-white/10">
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
                        "w-full justify-start text-left font-normal bg-background/40 backdrop-blur-md border-white/10",
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
                        <span>Pick a date range (max 15 days)</span>
                    )}
                  </Button>
                </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background/40 backdrop-blur-md border-white/10" align="start">
                    <div className="p-3 border-b border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Select Date Range</div>
                        <div className="text-xs text-muted-foreground">Max 15 days</div>
                      </div>
                    </div>
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        const daysDiff = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
                        if (daysDiff > 15) {
                          const newEndDate = new Date(range.from);
                          newEndDate.setDate(newEndDate.getDate() + 15);
                          setDateRange({ from: range.from, to: newEndDate });
                        } else {
                          setDateRange(range);
                        }
                      } else {
                        setDateRange(range);
                      }
                    }}
                    numberOfMonths={2}
                    disabled={(date) => {
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                      
                      if (dateRange?.from) {
                        const daysDiff = Math.ceil((date.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
                        return isWeekend || daysDiff > 15;
                      }
                      
                      if (dateRange?.to) {
                        const daysDiff = Math.ceil((dateRange.to.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                        return isWeekend || daysDiff > 15;
                      }
                      
                      return isWeekend;
                    }}
                    className="rounded-md border-white/10"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-3",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                  />
                  <div className="p-3 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-muted-foreground">Selected Range:</div>
                      <div className="font-medium">
                        {dateRange?.from && dateRange?.to ? (
                          `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                        ) : (
                          "No dates selected"
                        )}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Timeline Controls */}
            <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
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
        </ScrollArea>

        {/* Center Panel - 50% width */}
        <div className="flex-1 flex flex-col min-w-[300px]">
          {/* Map with Timeline Drawer */}
          <div className="flex-1 bg-muted/30 backdrop-blur-md rounded-lg relative overflow-hidden border border-white/10 shadow-xl">
            {/* Inner shadow overlay */}
            <div className="absolute inset-0 pointer-events-none z-[5] rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"></div>
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button variant="secondary" size="icon" className="bg-background/70 backdrop-blur-sm border-white/20">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="bg-background/70 backdrop-blur-sm border-white/20">
                <Minus className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="bg-background/70 backdrop-blur-sm border-white/20">
                <MapPin className="w-4 h-4" />
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
                className="absolute top-0 left-0 w-full h-full transform origin-center"
                style={{ 
                  transform: `scale(${mapZoom}) translate(${mapPosition.x / mapZoom}px, ${mapPosition.y / mapZoom}px)`
                }}
              >
                <img 
                  ref={mapImageRef}
                  src="/Tokyo Map.png" 
                  alt="Tokyo Map" 
                  className="w-full h-full object-cover dark:invert dark:brightness-90 dark:hue-rotate-180"
                />
                
                {/* Route Path */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                  <path 
                    d={`M ${mockRouteData.coordinates.map((coord, i) => 
                      `${i === 0 ? 'M' : 'L'} ${coord.x}% ${coord.y}%`
                    ).join(' ')}`}
                    fill="none" 
                    stroke="rgba(255,255,255,0.4)" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                  />
                </svg>

                {/* Vehicle Marker */}
                <div 
                  className="absolute z-10"
                  style={{
                    left: `${mockRouteData.coordinates[currentTimeIndex].x}%`,
                    top: `${mockRouteData.coordinates[currentTimeIndex].y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="bg-primary/80 backdrop-blur-sm rounded-full p-1 shadow-lg ring-2 ring-white/20 animate-pulse">
                    <Car className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

              {/* Timeline Drawer */}
              <div className={cn(
                "absolute z-20 bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t transition-all duration-300",
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
          </div>
        </div>

        {/* Right Panel - 25% width */}
        <ScrollArea className="w-[370px] shrink-0">
          <div className="flex flex-col gap-4">
            {/* Trip Summary */}
            <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
              <CardHeader className="py-2">
                <CardTitle className="text-base">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mandla District, Madhya Pradesh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">28/03/2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">04:04 - 06:13</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Distance Covered</span>
                      <span className="text-sm">32.9 km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Running Duration</span>
                      <span className="text-sm">47 mins</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Fuel Consumption</span>
                      <span className="text-sm">18.3 liters</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Average Speed</span>
                      <span className="text-sm">29.54 km/hr</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Stoppage Instances</span>
                      <span className="text-sm">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Idling Instances</span>
                      <span className="text-sm">0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          {/* Vehicle Events */}
            <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
            <CardHeader className="py-2">
              <CardTitle className="text-base">Vehicle Events</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[200px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs font-medium">Event</TableHead>
                        <TableHead className="text-xs font-medium">Time</TableHead>
                        <TableHead className="text-right text-xs font-medium">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...vehicleEvents, ...vehicleEvents, ...vehicleEvents].map((event, index) => (
                      <TableRow key={`${event.id}-${index}`}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{event.type}</span>
                          </div>
                        </TableCell>
                          <TableCell className="text-sm">{format(event.dateTime, "HH:mm")}</TableCell>
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
          <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
              <CardHeader className="py-2">
                <CardTitle className="text-base">Vehicle Stats</CardTitle>
            </CardHeader>
              <CardContent className="pt-0">
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Model</p>
                        <p className="text-sm">{vehicleStats.model}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Odometer</p>
                        <p className="text-sm">{vehicleStats.odometer} km</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Fuel Efficiency</p>
                        <p className="text-sm">{vehicleStats.fuelEfficiency} km/l</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Delta</p>
                        <p className="text-sm">{vehicleStats.delta} km/l</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Fuel Consumed</p>
                        <p className="text-sm">{vehicleStats.fuelConsumed} L</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Drive Mode</p>
                        <p className="text-sm">{vehicleStats.driveMode}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Overall Fuel Economy</p>
                        <p className="text-sm">{vehicleStats.overallFuelEconomy} km/l</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Ignition Status</p>
                        <p className="text-sm">{vehicleStats.ignitionStatus}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Time Elapsed</p>
                        <p className="text-sm">{vehicleStats.timeElapsed}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Distance Elapsed</p>
                        <p className="text-sm">{vehicleStats.distanceElapsed}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Speed</p>
                        <p className="text-sm">{vehicleStats.speed} km/h</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Current Gear</p>
                        <p className="text-sm">{vehicleStats.currentGear}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Engine RPM</p>
                        <p className="text-sm">{vehicleStats.engineRPM}</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        </ScrollArea>
      </div>
    </div>
  );
} 