"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  HelpCircle,
  User,
  Calendar,
  Map,
  BarChart3,
  LineChart,
  Car,
  Building2,
  Users,
  Shield,
  MapPin,
  Settings,
  FileText,
  Truck,
  Building,
  UserPlus,
  CheckCircle,
  CircleDollarSign,
  Tag,
  Route,
  Building2 as Office,
  UserCog,
  UserCheck,
  Package,
  Map as Geofence,
  FileCheck,
  CreditCard,
  Wrench,
  Car as Vehicle,
  HelpCircle as Support,
  ChevronRight,
  ChevronLeft,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

interface FleetManagementLayoutProps {
  children: React.ReactNode;
}

export function FleetManagementLayout({ children }: FleetManagementLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navigationItems = [
    { icon: Calendar, label: "Plan", href: "/fleet-management/plan" },
    { icon: Map, label: "Track", href: "/fleet-management/track" },
    { icon: FileText, label: "Reports", href: "/fleet-management/reports" },
    { icon: BarChart3, label: "Insights", href: "/fleet-management/insights" },
    { 
      icon: LineChart, 
      label: "Milage Saarthi", 
      href: "/fleet-management/milage-saarthi",
      badge: "New"
    },
    { icon: CircleDollarSign, label: "Offerings", href: "/fleet-management/offerings" },
    { icon: Car, label: "Fleet Master", href: "/fleet-management/fleet-master" },
    { icon: Package, label: "Verified Load", href: "/fleet-management/verified-load" },
    { icon: Geofence, label: "Geofence", href: "/fleet-management/geofence" },
    { icon: FileCheck, label: "Consent Management", href: "/fleet-management/consent" },
    { icon: CreditCard, label: "Subscription", href: "/fleet-management/subscription" },
    { icon: Wrench, label: "Book Services", href: "/fleet-management/services" },
    { icon: Vehicle, label: "Vehicle", href: "/fleet-management/vehicle" },
    { icon: Support, label: "Help & Support", href: "/fleet-management/support" },
  ];

  const fleetMasterItems = [
    { icon: Truck, label: "Non Connected Vehicle", href: "/fleet-management/fleet-master/non-connected" },
    { icon: Tag, label: "Branch/Application Tagging", href: "/fleet-management/fleet-master/tagging" },
    { icon: MapPin, label: "Location", href: "/fleet-management/fleet-master/location" },
    { icon: Route, label: "Corridor", href: "/fleet-management/fleet-master/corridor" },
    { icon: Building, label: "Branch", href: "/fleet-management/fleet-master/branch" },
    { icon: Office, label: "Office", href: "/fleet-management/fleet-master/office" },
    { icon: UserCog, label: "Users", href: "/fleet-management/fleet-master/users" },
    { icon: UserCheck, label: "Driver", href: "/fleet-management/fleet-master/driver" },
  ];

  return (
    <div className="flex h-screen overflow-hidden" suppressHydrationWarning>
      {/* Left Navigation */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-screen bg-background border-r transition-all duration-300 z-30 flex flex-col justify-between",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b">
            {!isCollapsed && <span className="font-bold text-lg">LOGO</span>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="ml-auto"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="py-4">
            <TooltipProvider delayDuration={0}>
              {navigationItems.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm hover:bg-accent transition-colors relative",
                        isCollapsed && "justify-center",
                        pathname === item.href && "bg-accent"
                      )}
                    >
                      {pathname === item.href && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                      )}
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <>
                          <span className="ml-3">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-2">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2">
                          {item.badge}
                        </Badge>
                      )}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
        
        {/* Bottom navigation icons - moved from top header */}
        <div className="mt-auto border-t py-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    "w-full flex items-center py-2",
                    isCollapsed ? "justify-center" : "justify-start px-4"
                  )}
                >
                  <Bell className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-3">Notifications</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <span>Notifications</span>
                </TooltipContent>
              )}
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    "w-full flex items-center py-2",
                    isCollapsed ? "justify-center" : "justify-start px-4"
                  )}
                >
                  <HelpCircle className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-3">Help</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <span>Help</span>
                </TooltipContent>
              )}
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "w-full flex items-center py-2",
                    isCollapsed ? "justify-center" : "justify-start px-4"
                  )}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4" />
                      {!isCollapsed && <span className="ml-3">Light Theme</span>}
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      {!isCollapsed && <span className="ml-3">Dark Theme</span>}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <span>{theme === "dark" ? "Light Theme" : "Dark Theme"}</span>
                </TooltipContent>
              )}
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={cn(
                          "w-full flex items-center py-2",
                          isCollapsed ? "justify-center" : "justify-start px-4"
                        )}
                      >
                        <User className="h-4 w-4" />
                        {!isCollapsed && <span className="ml-3">Profile</span>}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isCollapsed ? "center" : "start"} side={isCollapsed ? "right" : "top"}>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <span>Profile</span>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("flex-1 flex flex-col transition-all duration-300 overflow-hidden", isCollapsed ? "ml-16" : "ml-64")}>
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 