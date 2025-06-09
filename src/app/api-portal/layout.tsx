"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";
import { mockUser, mockOrganization } from '@/lib/api-portal-data';

const navigation = [
  {
    name: "Dashboard",
    href: "/api-portal/dashboard",
    icon: "layout-dashboard",
    description: "Overview and analytics"
  },
  {
    name: "Marketplace",
    href: "/api-portal/marketplace", 
    icon: "store",
    description: "Discover APIs"
  },
  {
    name: "Playground",
    href: "/api-portal/playground",
    icon: "play",
    description: "Test APIs interactively"
  },
  {
    name: "Documentation",
    href: "/api-portal/docs",
    icon: "book-open",
    description: "API references"
  },
  {
    name: "Analytics",
    href: "/api-portal/analytics",
    icon: "bar-chart-3",
    description: "Usage insights"
  },
  {
    name: "API Keys",
    href: "/api-portal/keys",
    icon: "key",
    description: "Manage credentials"
  }
];

const quickActions = [
  {
    name: "Create API Key",
    href: "/api-portal/keys/new",
    icon: "plus",
    variant: "default" as const
  },
  {
    name: "View Usage",
    href: "/api-portal/analytics",
    icon: "activity",
    variant: "outline" as const
  }
];

export default function ApiPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Icon name="menu" className="h-4 w-4" />
            </Button>
            
            <Link href="/api-portal" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="zap" className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold">FleetEdge</div>
                <div className="text-xs text-muted-foreground">API Portal</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant={action.variant}
                  size="sm"
                  asChild
                >
                  <Link href={action.href}>
                    <Icon name={action.icon} className="w-4 h-4 mr-2" />
                    {action.name}
                  </Link>
                </Button>
              ))}
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {mockUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="user" className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="settings" className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="building" className="mr-2 h-4 w-4" />
                  <span>Organization</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="help-circle" className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="book-open" className="mr-2 h-4 w-4" />
                  <span>Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="log-out" className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-full flex-col">
            {/* Organization Info */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="building" className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{mockOrganization.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {mockOrganization.plan}
                    </Badge>
                    <span className="text-xs text-muted-foreground">plan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon name={item.icon} className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>API Requests</span>
                    <span>8,450 / 10,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-primary h-1.5 rounded-full" 
                      style={{ width: '84.5%' }}
                    />
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Icon name="credit-card" className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 