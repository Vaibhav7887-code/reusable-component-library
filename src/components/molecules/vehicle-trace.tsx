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
  Minus,
  Layers,
  Globe,
  Flame,
  Minimize2,
  Maximize2,
  Eye,
  Map,
  Bookmark,
  RotateCcw,
  Square,
  Target,
  Locate,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

// Custom CSS for hiding scrollbars but keeping functionality
import "./vehicle-trace.css";

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
    { x: 30, y: 30 }, // Garage, Mumbai
    { x: 32, y: 28 }, // Mumbai Suburbs
    { x: 35, y: 24 }, // Highway Entry
    { x: 38, y: 20 }, // Mumbai
    { x: 40, y: 25 }, // Highway Toll
    { x: 42, y: 35 }, // En route to Delhi
    { x: 44, y: 48 }, // Rest Area
    { x: 45, y: 60 }, // Delhi
    { x: 48, y: 57 }, // Delhi Outskirts
    { x: 52, y: 50 }, // En route to Bangalore
    { x: 55, y: 45 }, // Fuel Station
    { x: 60, y: 40 }, // Bangalore
    { x: 58, y: 38 }, // Bangalore City
    { x: 55, y: 36 }, // Bangalore Bypass
    { x: 50, y: 33 }, // Highway Junction
  ],
  timestamps: [
    "2024-03-20T08:00:00Z",
    "2024-03-20T08:30:00Z",
    "2024-03-20T09:15:00Z",
    "2024-03-20T10:00:00Z",
    "2024-03-20T10:30:00Z",
    "2024-03-20T11:00:00Z",
    "2024-03-20T11:45:00Z",
    "2024-03-20T12:00:00Z",
    "2024-03-20T12:30:00Z",
    "2024-03-20T13:00:00Z",
    "2024-03-20T13:45:00Z",
    "2024-03-20T14:00:00Z",
    "2024-03-20T14:30:00Z",
    "2024-03-20T15:15:00Z",
    "2024-03-20T16:00:00Z",
  ],
};

// Add mock timeline data
const mockTimelineData = [
  {
    time: "08:00",
    location: "Garage, Mumbai",
    event: "Start journey",
    speed: 0,
    fuel: 100,
  },
  {
    time: "08:30",
    location: "Mumbai Suburbs",
    event: "Moving",
    speed: 45,
    fuel: 97,
  },
  {
    time: "09:15",
    location: "Highway Entry",
    event: "Accelerating",
    speed: 65,
    fuel: 92,
  },
  {
    time: "10:00",
    location: "Mumbai, Maharashtra",
    event: "Cruising",
    speed: 75,
    fuel: 86,
  },
  {
    time: "10:30",
    location: "Highway Toll",
    event: "Brief stop",
    speed: 0,
    fuel: 82,
  },
  {
    time: "11:00",
    location: "En route to Delhi",
    event: "Moving",
    speed: 80,
    fuel: 79,
  },
  {
    time: "11:45",
    location: "Rest Area",
    event: "Short break",
    speed: 0,
    fuel: 75,
  },
  {
    time: "12:00",
    location: "Delhi, Delhi",
    event: "Stop",
    speed: 0,
    fuel: 70,
  },
  {
    time: "12:30",
    location: "Delhi Outskirts",
    event: "Leaving city",
    speed: 55,
    fuel: 67,
  },
  {
    time: "13:00",
    location: "En route to Bangalore",
    event: "Moving",
    speed: 60,
    fuel: 62,
  },
  {
    time: "13:45",
    location: "Fuel Station",
    event: "Refueling",
    speed: 0,
    fuel: 95,
  },
  {
    time: "14:00",
    location: "Bangalore, Karnataka",
    event: "Stop",
    speed: 0,
    fuel: 92,
  },
  {
    time: "14:30",
    location: "Bangalore City",
    event: "Urban driving",
    speed: 35,
    fuel: 88,
  },
  {
    time: "15:15",
    location: "Bangalore Bypass",
    event: "Moving",
    speed: 65,
    fuel: 83,
  },
  {
    time: "16:00",
    location: "Highway Junction",
    event: "Direction change",
    speed: 50,
    fuel: 78,
  },
];

export function VehicleTrace() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
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
  const [mapLayers, setMapLayers] = React.useState({
    satellite: false,
    traffic: true,
    heatmap: false,
  });
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showMiniMap, setShowMiniMap] = React.useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = React.useState(true);
  const [playbackComplete, setPlaybackComplete] = React.useState(false);
  // States for card expansion
  const [tripSelectionOpen, setTripSelectionOpen] = React.useState(true);
  const [timelineControlsOpen, setTimelineControlsOpen] = React.useState(true);
  const [tripSummaryOpen, setTripSummaryOpen] = React.useState(true);
  const [vehicleEventsOpen, setVehicleEventsOpen] = React.useState(true);
  const [vehicleStatsOpen, setVehicleStatsOpen] = React.useState(true);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard shortcuts for playback
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case ' ': // Space bar for play/pause/replay
          e.preventDefault();
          if (playbackComplete) {
            restartPlayback();
          } else if (isPlaying) {
            stopPlayback();
          } else {
            startPlayback();
          }
          break;
        case 'ArrowRight': // Right arrow to move forward
          e.preventDefault();
          setCurrentTimeIndex(prev => Math.min(prev + 1, mockTimelineData.length - 1));
          break;
        case 'ArrowLeft': // Left arrow to move backward
          e.preventDefault();
          setCurrentTimeIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'f': // 'f' key to toggle fullscreen
          e.preventDefault();
          setIsFullscreen(!isFullscreen);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isFullscreen, playbackComplete]);

  // Reset playbackComplete state when current time index changes
  React.useEffect(() => {
    if (currentTimeIndex < mockTimelineData.length - 1 && playbackComplete) {
      setPlaybackComplete(false);
    }
  }, [currentTimeIndex, playbackComplete]);

  // Scroll selected timeline item into view when changed
  React.useEffect(() => {
    if (timelineItemsRef.current[currentTimeIndex]) {
      // Add a slight delay to ensure the container is ready
      setTimeout(() => {
        const itemEl = timelineItemsRef.current[currentTimeIndex];
        if (itemEl) {
          // Find the scrollable parent container
          const scrollContainer = itemEl.closest('.hide-scrollbar');
          if (scrollContainer) {
            const itemRect = itemEl.getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            
            // Calculate scroll offset to center the item
            const scrollOffset = (itemRect.left + itemRect.width/2) - (containerRect.left + containerRect.width/2);
            
            // Apply smooth scroll
            scrollContainer.scrollBy({
              left: scrollOffset,
              behavior: 'smooth'
            });
          } else {
            // Fallback to standard scrollIntoView if container not found
            itemEl.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }, 100);
    }
  }, [currentTimeIndex]);

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
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
    }
    
    setIsPlaying(true);
    setPlaybackComplete(false);
    
    const interval = setInterval(() => {
      setCurrentTimeIndex((prev) => {
        if (prev >= mockTimelineData.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          setPlaybackComplete(true);
          playbackIntervalRef.current = null;
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);
    
    playbackIntervalRef.current = interval;
  };

  const stopPlayback = () => {
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const restartPlayback = () => {
    setCurrentTimeIndex(0);
    setPlaybackComplete(false);
    startPlayback();
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, []);

  // Global mouse event handler
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
    <div className={cn(
      "h-[calc(100vh-8.5rem)] w-full flex flex-col overflow-hidden",
      isFullscreen && "fixed inset-0 z-50 h-screen bg-background"
    )}>
      {isFullscreen && (
        <div className="p-2 flex justify-between items-center bg-background/90 backdrop-blur-md border-b">
          <h2 className="text-lg font-bold">Vehicle Trace — Fullscreen Mode</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setIsFullscreen(false)}
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex-1 flex gap-4 overflow-hidden w-full">
        {/* Left Panel removed - moved content to top */}
        
        {/* Center Panel - Map - Set to 70% width to match tracking view */}
        <div className="w-[70%] flex flex-col min-w-[250px]">
          {/* Map with Timeline Drawer */}
          <div className="flex-1 bg-muted/30 backdrop-blur-md rounded-lg relative overflow-hidden border border-white/10 shadow-xl">
            {/* Map controls - right side */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                onClick={() => setMapZoom(prev => Math.min(prev + 0.5, 4))}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                onClick={() => setMapZoom(prev => Math.max(prev - 0.5, 0.5))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20">
                    <Layers className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-2" align="end">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Map Layers</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="satellite" className="text-sm flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Satellite View
                        </label>
                        <Switch 
                          id="satellite" 
                          checked={mapLayers.satellite}
                          onCheckedChange={(checked: boolean) => setMapLayers({...mapLayers, satellite: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="traffic" className="text-sm flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Traffic Data
                        </label>
                        <Switch 
                          id="traffic" 
                          checked={mapLayers.traffic}
                          onCheckedChange={(checked: boolean) => setMapLayers({...mapLayers, traffic: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="heatmap" className="text-sm flex items-center gap-2">
                          <Flame className="h-4 w-4" />
                          Speed Heatmap
                        </label>
                        <Switch 
                          id="heatmap" 
                          checked={mapLayers.heatmap}
                          onCheckedChange={(checked: boolean) => setMapLayers({...mapLayers, heatmap: checked})}
                        />
                      </div>
                      <Separator className="my-1" />
                      <div className="flex items-center justify-between">
                        <label htmlFor="poi" className="text-sm flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Points of Interest
                        </label>
                        <Switch 
                          id="poi" 
                          checked={true}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="fuelstation" className="text-sm flex items-center gap-2">
                          <Fuel className="h-4 w-4" />
                          Fuel Stations
                        </label>
                        <Switch 
                          id="fuelstation" 
                          checked={false}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="servicecenters" className="text-sm flex items-center gap-2">
                          <Wrench className="h-4 w-4" />
                          Service Centers
                        </label>
                        <Switch 
                          id="servicecenters" 
                          checked={false}
                        />
                      </div>
                      <Separator className="my-1" />
                      <div className="flex items-center justify-between">
                        <label htmlFor="minimap" className="text-sm flex items-center gap-2">
                          <Map className="h-4 w-4" />
                          Mini Map
                        </label>
                        <Switch 
                          id="minimap" 
                          checked={showMiniMap}
                          onCheckedChange={(checked: boolean) => setShowMiniMap(checked)}
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
              >
                <Route className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
              >
                <Locate className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-background/70 backdrop-blur-sm border border-black/10 shadow-sm dark:border-white/20"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Map content */}
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
                  className={cn(
                    "w-full h-full object-cover",
                    mapLayers.satellite ? "opacity-100" : "dark:invert dark:brightness-90 dark:hue-rotate-180"
                  )}
                />
                
                {mapLayers.heatmap && (
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-yellow-500/20 to-red-500/20 mix-blend-multiply pointer-events-none" />
                )}
                
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

            {/* Mini Map Overlay */}
            {showMiniMap && (
              <div className="absolute bottom-[170px] right-4 w-48 h-48 bg-background/80 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 overflow-hidden">
                <div className="relative w-full h-full">
                  <img 
                    src="/Tokyo Map.png" 
                    alt="Mini Map" 
                    className="w-full h-full object-cover opacity-80 dark:invert dark:brightness-90 dark:hue-rotate-180"
                  />
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Full route */}
                      <path 
                        d={`M ${mockRouteData.coordinates.map((coord) => 
                          `${coord.x} ${coord.y}`
                        ).join(' L ')}`}
                        fill="none" 
                        stroke="rgba(100,100,255,0.6)" 
                        strokeWidth="1"
                      />
                      {/* Current position */}
                      <circle 
                        cx={mockRouteData.coordinates[currentTimeIndex].x} 
                        cy={mockRouteData.coordinates[currentTimeIndex].y} 
                        r="2" 
                        fill="rgba(255,50,50,0.8)" 
                      />
                      {/* Viewport rectangle - shows current view area */}
                      <rect 
                        x="25" 
                        y="25" 
                        width="50" 
                        height="50" 
                        fill="none" 
                        stroke="rgba(255,255,255,0.5)" 
                        strokeWidth="0.5" 
                        strokeDasharray="2,1"
                      />
                    </svg>
                  </div>
                  <div className="absolute top-1 right-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 bg-background/50" 
                      onClick={() => setShowMiniMap(false)}
                    >
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

              {/* Timeline Drawer */}
              <div className={cn(
              "absolute z-20 bottom-0 left-0 right-0 glass-effect glass-effect-hover glass-effect-active border-t border-white/10 transition-all duration-300",
                isTimelineExpanded ? "h-auto" : "h-[53px]"
              )}>
              <div className="flex items-center justify-between p-2 border-b border-white/10">
                <div className="flex items-center gap-4 flex-1 mr-8">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-background/40 backdrop-blur-sm border-white/10"
                      onClick={() => setCurrentTimeIndex(Math.max(0, currentTimeIndex - 1))}
                    >
                      <Rewind className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-background/40 backdrop-blur-sm border-white/10"
                      onClick={() => {
                        if (playbackComplete) {
                          restartPlayback();
                        } else if (isPlaying) {
                          stopPlayback();
                        } else {
                          startPlayback();
                        }
                      }}
                    >
                      {playbackComplete ? (
                        <RefreshCw className="h-4 w-4" />
                      ) : isPlaying ? (
                        <Square className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-background/40 backdrop-blur-sm border-white/10"
                      onClick={() => setCurrentTimeIndex(Math.min(mockTimelineData.length - 1, currentTimeIndex + 1))}
                    >
                      <FastForward className="h-4 w-4" />
                    </Button>

                    <Select
                      value={playbackSpeed.toString()}
                      onValueChange={(value) => setPlaybackSpeed(Number(value))}
                    >
                      <SelectTrigger className="w-[80px] h-8 text-sm bg-background/40 backdrop-blur-sm border-white/10">
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

                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm text-muted-foreground min-w-[40px]">{mockTimelineData[currentTimeIndex].time}</span>
                    <Slider
                      value={[currentTimeIndex]}
                      onValueChange={([value]) => setCurrentTimeIndex(value)}
                      max={mockTimelineData.length - 1}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-muted-foreground">Space (play/stop/replay), ← → (step)</div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
                  >
                    {isTimelineExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

                <div className={cn(
                  "p-2 transition-opacity duration-300 overflow-hidden",
                isTimelineExpanded ? "opacity-100" : "opacity-0 h-0"
                )}>
                  <div className="w-full overflow-x-auto hide-scrollbar">
                    <div 
                      className="flex gap-2 min-w-max pb-2"
                      onWheel={(e) => {
                        e.preventDefault();
                        const container = e.currentTarget.parentElement;
                        if (container) {
                          container.scrollLeft += e.deltaY;
                        }
                      }}
                    >
                      {mockTimelineData.map((point, index) => {
                        const setTimelineItemRef = (el: HTMLDivElement | null) => {
                          if (timelineItemsRef.current) {
                            timelineItemsRef.current[index] = el;
                          }
                        };
                        
                        return (
                      <div
                        key={index}
                            ref={setTimelineItemRef}
                        className={cn(
                              "flex flex-col gap-1 p-2 rounded-lg transition-colors cursor-pointer min-w-[120px] shrink-0 relative group",
                            "bg-background/40 backdrop-blur-sm border border-white/10",
                            currentTimeIndex === index && "bg-accent/40 border-accent-foreground/20"
                        )}
                        onClick={() => setCurrentTimeIndex(index)}
                      >
                            {/* Status indicator */}
                            <div className={cn(
                              "absolute right-2 top-2 rounded-full w-2 h-2",
                              point.speed === 0 ? "bg-yellow-500" : point.speed > 70 ? "bg-green-500" : "bg-blue-500"
                            )} title={point.speed === 0 ? "Stopped" : point.speed > 70 ? "High speed" : "Moving"} />
                            
                        <div className="text-sm font-medium">{point.time}</div>
                            <div className="text-sm text-muted-foreground truncate">{point.event}</div>
                            <div className="flex items-center gap-1 text-sm">
                              <Gauge className="h-4 w-4" />
                          {point.speed} km/h
                        </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Fuel className="h-4 w-4" />
                              {point.fuel}%
                      </div>
                            {/* Add tooltip on hover */}
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-sm z-10 w-48 text-xs mb-2">
                              <div className="font-medium">{point.time} - {point.event}</div>
                              <div className="mt-1">Speed: {point.speed} km/h</div>
                              <div>Fuel: {point.fuel}%</div>
                              <div>Location: {point.location}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Right Panel - Updated to 30% width to match tracking view */}
        <ScrollArea className="w-[30%] min-w-[280px] shrink-0">
          <div className="flex flex-col gap-2 p-1">
            {/* Trip Summary */}
            <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
              <CardHeader className="py-1 px-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Trip Summary</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => setTripSummaryOpen(!tripSummaryOpen)}
                  >
                    {tripSummaryOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {tripSummaryOpen && (
              <CardContent className="pt-0 p-3">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mandla District, Madhya Pradesh</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">28/03/2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">04:04 - 06:13</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">Distance Covered</span>
                      <span className="text-sm">32.9 km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">Running Duration</span>
                      <span className="text-sm">47 mins</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">Fuel Consumption</span>
                      <span className="text-sm">18.3 liters</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">Average Speed</span>
                      <span className="text-sm">29.54 km/hr</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">Stoppage Instances</span>
                      <span className="text-sm">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">Idling Instances</span>
                      <span className="text-sm">0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              )}
            </Card>

          {/* Vehicle Events */}
            <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
            <CardHeader className="py-1 px-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Vehicle Events</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => setVehicleEventsOpen(!vehicleEventsOpen)}
                >
                  {vehicleEventsOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {vehicleEventsOpen && (
            <CardContent className="pt-0 p-3">
              <ScrollArea className="h-[160px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                        <TableHead className="text-sm font-medium p-2">Event</TableHead>
                        <TableHead className="text-sm font-medium p-2">Time</TableHead>
                        <TableHead className="text-right text-sm font-medium p-2">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...vehicleEvents, ...vehicleEvents, ...vehicleEvents].map((event, index) => (
                      <TableRow key={`${event.id}-${index}`}>
                        <TableCell className="py-1 px-2">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{event.type}</span>
                          </div>
                        </TableCell>
                          <TableCell className="text-sm py-1 px-2">{format(event.dateTime, "HH:mm")}</TableCell>
                        <TableCell className="text-right py-1 px-2">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Show on map">
                            <MapPin className="h-4 w-4" />
                          </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="View details">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            )}
          </Card>

          {/* Vehicle Statistics */}
          <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-xl">
              <CardHeader className="py-1 px-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Vehicle Stats</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => setVehicleStatsOpen(!vehicleStatsOpen)}
                  >
                    {vehicleStatsOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {vehicleStatsOpen && (
              <CardContent className="pt-0 p-3">
              <ScrollArea className="h-[160px]">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Model</p>
                        <p className="text-sm">{vehicleStats.model}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Odometer</p>
                        <p className="text-sm">{vehicleStats.odometer} km</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Fuel Efficiency</p>
                        <p className="text-sm">{vehicleStats.fuelEfficiency} km/l</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Delta</p>
                        <p className="text-sm">{vehicleStats.delta} km/l</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Fuel Consumed</p>
                        <p className="text-sm">{vehicleStats.fuelConsumed} L</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Drive Mode</p>
                        <p className="text-sm">{vehicleStats.driveMode}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Overall Fuel Economy</p>
                        <p className="text-sm">{vehicleStats.overallFuelEconomy} km/l</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Ignition Status</p>
                        <p className="text-sm">{vehicleStats.ignitionStatus}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Time Elapsed</p>
                        <p className="text-sm">{vehicleStats.timeElapsed}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Distance Elapsed</p>
                        <p className="text-sm">{vehicleStats.distanceElapsed}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Speed</p>
                        <p className="text-sm">{vehicleStats.speed} km/h</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Current Gear</p>
                        <p className="text-sm">{vehicleStats.currentGear}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground font-medium">Engine RPM</p>
                        <p className="text-sm">{vehicleStats.engineRPM}</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          )}
          </Card>
        </div>
        </ScrollArea>
      </div>
    </div>
  );
} 