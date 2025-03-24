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
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      {/* Left Navigation */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-screen bg-background border-r transition-all duration-300 z-30",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
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

      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300", isCollapsed ? "ml-16" : "ml-64")}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-20 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">Fleet Management</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 