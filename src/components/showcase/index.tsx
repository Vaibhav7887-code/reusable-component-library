"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ComponentCard } from "./component-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonTable, SkeletonChart } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import Link from "next/link";
import { StatsCard } from "@/components/molecules/stats-card";
import { ChartCard } from "@/components/molecules/chart-card";
import { Calendar } from "@/components/molecules/calendar";
import { TaskCard } from "@/components/molecules/task-card";
import { Icon } from "@/components/atoms/icon";
import { Label } from "@/components/atoms/label";
import { Divider } from "@/components/atoms/divider";
import { DashboardLayout } from "@/components/templates/dashboard-layout";
import { CardLayout } from "@/components/templates/card-layout";
import { FleetManagementShowcase } from "./fleet-management";

// Tab system for categorization
interface TabProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ title, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? ""
          : "hover:text-foreground"
      }`}
      style={{ 
        color: isActive 
          ? "hsl(var(--primary))" 
          : "hsl(var(--muted-foreground))"
      }}
    >
      {title}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: "hsl(var(--primary))" }}
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

// Main Component Showcase
export function ComponentShowcase() {
  const [activeTab, setActiveTab] = React.useState("atomic");
  const [activeToast, setActiveToast] = React.useState<string | null>(null);
  
  const tabs = [
    { id: "atomic", title: "Atomic Design" },
    { id: "buttons", title: "Buttons" },
    { id: "cards", title: "Cards" },
    { id: "badges", title: "Badges" },
    { id: "avatars", title: "Avatars" },
    { id: "inputs", title: "Inputs" },
    { id: "loaders", title: "Loaders" },
    { id: "notifications", title: "Notifications" },
    { id: "complex", title: "Complex Components" },
    { id: "templates", title: "Templates" },
    { id: "fleet-management", title: "Fleet Management" },
  ];

  // Toast container to display toasts outside of the main content area
  const renderToastContainer = () => {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        {activeToast === "default" && (
          <Toast 
            variant="default"
            title="Default Toast"
            description="This is a default toast notification."
            onClose={() => setActiveToast(null)}
            duration={5000}
          />
        )}
        
        {activeToast === "destructive" && (
          <Toast 
            variant="destructive"
            title="Error"
            description="Something went wrong!"
            onClose={() => setActiveToast(null)}
            duration={5000}
          />
        )}
        
        {activeToast === "success" && (
          <Toast 
            variant="success"
            title="Success"
            description="Operation completed successfully!"
            onClose={() => setActiveToast(null)}
            duration={5000}
          />
        )}

        {activeToast === "slideRight" && (
          <Toast 
            animation="slideRight"
            title="Slide Right"
            description="This toast slides in from the left."
            onClose={() => setActiveToast(null)}
            duration={5000}
          />
        )}
        
        {activeToast === "slideUp" && (
          <Toast 
            animation="slideUp"
            title="Slide Up"
            description="This toast slides up from the bottom."
            onClose={() => setActiveToast(null)}
            duration={5000}
          />
        )}
        
        {activeToast === "fade" && (
          <Toast 
            animation="fade"
            title="Fade Animation"
            description="This toast fades in and out."
            onClose={() => setActiveToast(null)}
            duration={5000}
          />
        )}

        {activeToast === "withAction" && (
          <Toast 
            title="Update Available"
            description="A new version is available."
            onClose={() => setActiveToast(null)}
            duration={10000}
            action={
              <Button size="sm" variant="outline" onClick={() => setActiveToast(null)}>
                Update Now
              </Button>
            }
          />
        )}
        
        {activeToast === "permanent" && (
          <Toast 
            variant="info"
            title="Information"
            description="This toast will not dismiss automatically."
            onClose={() => setActiveToast(null)}
            duration={Infinity}
          />
        )}
      </div>
    );
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "buttons":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Default Button" description="Standard frosted glass button">
              <div className="flex flex-wrap gap-4">
                <Button>Frosted Glass</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Button Sizes" description="Different size variants">
              <div className="flex flex-col items-start gap-4">
                <Button size="sm">Small Button</Button>
                <Button>Default Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Button States" description="Interactive, disabled and loading states">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button isLoading>Loading</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Hover, focus, and click to see different states</p>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Animated Buttons" description="Buttons with animation effects">
              <div className="flex flex-wrap gap-4">
                <Button className="animate-slow-pulse">Slow Pulse Animation</Button>
                <Button className="hover:animate-bounce">Bounce on Hover</Button>
                <div className="group">
                  <Button className="group-hover:translate-x-1 transition-transform">Slide on Group Hover</Button>
                </div>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Gradient Button" description="Button with gradient background">
              <Button variant="gradient" size="lg">
                Gradient Button
              </Button>
            </ComponentCard>

            <ComponentCard title="Button with Icons" description="Buttons with icons">
              <div className="flex flex-wrap gap-4">
                <Button>
                  <span className="mr-2">←</span> Previous
                </Button>
                <Button>
                  Next <span className="ml-2">→</span>
                </Button>
                <Button variant="outline" size="icon">+</Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Scale Animation" description="Button with scale effect">
              <Button className="transition-transform hover:scale-105" size="lg">
                Scale on Hover
              </Button>
            </ComponentCard>
            
            <ComponentCard title="Segmented Control" description="Button group for toggling options">
              <div className="flex flex-col gap-4">
                <div className="p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 inline-flex">
                  <Button 
                    variant="segmented" 
                    size="sm" 
                    data-state="active"
                    className="h-8 px-3 text-xs rounded-md"
                  >
                    Daily
                  </Button>
                  <Button 
                    variant="segmented" 
                    size="sm" 
                    data-state="inactive"
                    className="h-8 px-3 text-xs rounded-md"
                  >
                    Weekly
                  </Button>
                  <Button 
                    variant="segmented" 
                    size="sm" 
                    data-state="inactive"
                    className="h-8 px-3 text-xs rounded-md"
                  >
                    Monthly
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use the <code className="text-xs bg-white/10 px-1 py-0.5 rounded">segmented</code> variant with <code className="text-xs bg-white/10 px-1 py-0.5 rounded">data-state="active"</code> for selected items
                </p>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Active & Focus States" description="Demonstrates active and focus states">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button className="focus:ring-2 focus:ring-white/30">Click Me</Button>
                  <Button variant="secondary" className="focus:ring-2 focus:ring-indigo-300/50">Click Me</Button>
                  <Button variant="outline">Click Me</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>Click and hold</strong> to see the enhanced active state with scale effect, <strong>pronounced inner shadow</strong>, and border enhancement
                </p>
              </div>
            </ComponentCard>
            
            <div className="lg:col-span-3">
              <ComponentCard title="Button Variants" description="All button style variants with states">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Button>Frosted Glass</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="gradient">Gradient</Button>
                    <Button variant="segmented" data-state="active">Segmented</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button disabled>Disabled</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled</Button>
                    <Button variant="ghost" disabled>Disabled</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button isLoading>Loading</Button>
                    <Button variant="secondary" isLoading>Loading</Button>
                    <Button variant="outline" isLoading>Loading</Button>
                    <Button variant="ghost" isLoading>Loading</Button>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <Link href="/docs/buttons" className="text-xs text-primary hover:underline">
                      View detailed button documentation →
                    </Link>
                  </div>
                </div>
              </ComponentCard>
            </div>
          </div>
        );
      
      case "cards":
        return (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Default Card</h3>
                <p className="text-sm text-muted-foreground">Standard card component</p>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>A simple card description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is a standard card component with header, content, and optional footer sections.</p>
                  </CardContent>
                </Card>
              </div>
            
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Interactive Card</h3>
                <p className="text-sm text-muted-foreground">Card with hover effects</p>
                <Card variant="interactive" className="w-full">
                  <CardHeader>
                    <CardTitle>Interactive Card</CardTitle>
                    <CardDescription>Hover to see the effect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card elevates and adds a shadow on hover.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Gradient Card</h3>
                <p className="text-sm text-muted-foreground">Card with gradient background</p>
                <Card variant="gradient" className="w-full">
                  <CardHeader>
                    <CardTitle>Gradient Card</CardTitle>
                    <CardDescription>With gradient background</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card has a subtle gradient background effect.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Outline Card</h3>
                <p className="text-sm text-muted-foreground">Card with border emphasis</p>
                <Card variant="outline" className="w-full">
                  <CardHeader>
                    <CardTitle>Outline Card</CardTitle>
                    <CardDescription>Border emphasis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card has a prominent border that changes color on hover.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Elevated Card</h3>
                <p className="text-sm text-muted-foreground">Card with shadow</p>
                <Card variant="elevated" className="w-full">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>With drop shadow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card has a pronounced shadow that increases on hover.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Card with Footer</h3>
                <p className="text-sm text-muted-foreground">Card with footer actions</p>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Card with Footer</CardTitle>
                    <CardDescription>Includes action buttons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card demonstrates the use of a footer for action buttons.</p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button size="sm" variant="outline" className="bg-white/10">Cancel</Button>
                    <Button size="sm" className="bg-white/20 hover:bg-white/30">Save</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Frosted Glass Cards</h3>
              <p className="text-sm text-muted-foreground">Modern frosted glass effect</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card variant="frostedGlass" className="w-full">
                  <CardHeader>
                    <CardTitle>Frosted Glass</CardTitle>
                    <CardDescription>Modern blur effect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card uses backdrop-filter for a translucent glass effect.</p>
                  </CardContent>
                </Card>
                
                <Card variant="frostedGlass" className="w-full">
                  <CardHeader>
                    <CardTitle>Interactive Glass</CardTitle>
                    <CardDescription>Hover to see animation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>The card elevates slightly on hover for an interactive feel.</p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button size="sm" variant="outline" className="bg-white/10">Cancel</Button>
                    <Button size="sm" className="bg-white/20 hover:bg-white/30">Save</Button>
                  </CardFooter>
                </Card>
                
                <Card variant="frostedGlass" className="w-full">
                  <CardHeader>
                    <CardTitle>Glass with Image</CardTitle>
                    <CardDescription>Combining glass with media</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative h-40 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20"></div>
                    </div>
                    <div className="p-6">
                      <p>Frosted glass cards work beautifully with images and gradients.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      
      case "badges":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Default Badges" description="Standard badge styles">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Status Badges" description="Badges for status indicators">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="moving">Moving</Badge>
                <Badge variant="stopped">Stopped</Badge>
                <Badge variant="offline">Offline</Badge>
                <Badge variant="maintenance">Maintenance</Badge>
                <Badge variant="idling">Idling</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="bs4">BS4</Badge>
                <Badge variant="bs6">BS6</Badge>
                <Badge variant="electric">Electric</Badge>
                <Badge variant="construction">Construction</Badge>
                <Badge variant="unsubscribed">Unsubscribed</Badge>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Animated Badges" description="Badges with animation effects">
              <div className="flex flex-wrap gap-2">
                <Badge variant="frostedGlass" className="animate-slow-pulse">Slow Pulse</Badge>
                <Badge variant="frostedGlass" className="hover:animate-bounce">Bounce</Badge>
                <Badge variant="frostedGlass" className="animate-ping">Ping</Badge>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Gradient Badge" description="Badge with gradient background">
              <Badge variant="gradient" className="text-sm">
                New Feature
              </Badge>
            </ComponentCard>
          </div>
        );
      
      case "avatars":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Default Avatar" description="Standard avatar components">
              <div className="flex flex-wrap gap-4">
                <Avatar 
                  src="https://github.com/shadcn.png" 
                  alt="User" 
                  isAnimated={true} 
                />
                <Avatar 
                  fallback="JD" 
                  isAnimated={true} 
                />
                <Avatar 
                  alt="User" 
                  isAnimated={true} 
                />
              </div>
            </ComponentCard>
            
            <ComponentCard title="Avatar Sizes" description="Different size variants">
              <div className="flex items-center gap-4">
                <Avatar src="https://github.com/shadcn.png" alt="User" size="sm" />
                <Avatar src="https://github.com/shadcn.png" alt="User" />
                <Avatar src="https://github.com/shadcn.png" alt="User" size="lg" />
                <Avatar src="https://github.com/shadcn.png" alt="User" size="xl" />
              </div>
            </ComponentCard>
            
            <ComponentCard title="Avatar with Rings" description="Avatars with colored rings">
              <div className="flex flex-wrap gap-4">
                <Avatar src="https://github.com/shadcn.png" alt="User" ringColor="primary" />
                <Avatar src="https://github.com/shadcn.png" alt="User" ringColor="secondary" />
                <Avatar src="https://github.com/shadcn.png" alt="User" ringColor="accent" />
                <Avatar fallback="VIP" ringColor="gradient" />
              </div>
            </ComponentCard>
          </div>
        );
      
      case "inputs":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Default Input" description="Standard input field">
              <div className="space-y-4 w-full max-w-xs">
                <Input placeholder="Default input" />
                <Input placeholder="Disabled input" disabled />
              </div>
            </ComponentCard>
            
            <ComponentCard title="Input Variants" description="Different input styles">
              <div className="space-y-4 w-full max-w-xs">
                <Input variant="frostedGlass" placeholder="Frosted Glass (default)" />
                <Input variant="default" placeholder="Default variant" />
                <Input variant="outline" placeholder="Outline variant" />
                <Input variant="ghost" placeholder="Ghost variant" />
                <div className="group">
                  <Input variant="underlined" placeholder="Underlined variant" />
                </div>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Input Sizes" description="Different size variants">
              <div className="space-y-4 w-full max-w-xs">
                <Input inputSize="sm" placeholder="Small input" />
                <Input placeholder="Default input" />
                <Input inputSize="lg" placeholder="Large input" />
              </div>
            </ComponentCard>
            
            <ComponentCard title="Animated Inputs" description="Inputs with animation effects">
              <div className="space-y-4 w-full max-w-xs">
                <div className="group">
                  <Input animation="glow" placeholder="Focus for glow effect" />
                  <p className="text-xs text-muted-foreground mt-1">Click to focus</p>
                </div>
                <div className="group">
                  <Input animation="expand" placeholder="Focus to expand" />
                  <p className="text-xs text-muted-foreground mt-1">Click to focus</p>
                </div>
                <div className="group">
                  <Input animation="colorShift" placeholder="Focus for color shift" />
                  <p className="text-xs text-muted-foreground mt-1">Click to focus</p>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Input with Icon" description="Input field with icon">
              <div className="space-y-4 w-full max-w-xs">
                <Input 
                  icon={<span>🔍</span>} 
                  placeholder="Search..." 
                />
                <Input 
                  icon={<span>📧</span>} 
                  placeholder="Email address" 
                  type="email"
                />
              </div>
            </ComponentCard>

            <ComponentCard title="Input States" description="Different input states">
              <div className="space-y-4 w-full max-w-xs">
                <Input placeholder="Default state" />
                <Input placeholder="Disabled state" disabled />
                <Input placeholder="With value" value="Hello world" onChange={() => {}} />
                <Input placeholder="With error" className="border-red-500 focus-visible:ring-red-500" />
              </div>
            </ComponentCard>
          </div>
        );
      
      case "loaders":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Basic Skeletons</h3>
              <p className="text-sm text-muted-foreground">Loading state placeholders</p>
              <div className="w-full max-w-md space-y-4 p-4 border border-white/30 rounded-lg bg-white/20 overflow-hidden backdrop-filter backdrop-blur-lg shadow-md">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Skeleton Variants</h3>
              <p className="text-sm text-muted-foreground">Different animation styles</p>
              <div className="w-full max-w-md space-y-4 p-4 border border-white/30 rounded-lg bg-white/20 overflow-hidden backdrop-filter backdrop-blur-lg shadow-md">
                <Skeleton variant="pulse" className="h-4 w-full" />
                <Skeleton variant="shimmer" className="h-4 w-2/3" />
                <Skeleton variant="wave" className="h-4 w-1/2" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Complex Skeletons</h3>
              <p className="text-sm text-muted-foreground">Pre-built loading states for UI patterns</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 backdrop-filter backdrop-blur-lg shadow-md">
                  <SkeletonCard />
                </div>
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 backdrop-filter backdrop-blur-lg shadow-md">
                  <SkeletonAvatar />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Loading UI Patterns</h3>
              <p className="text-sm text-muted-foreground">Common UI components in loading state</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 p-4 backdrop-filter backdrop-blur-lg shadow-md">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                    <Skeleton className="h-32 w-full rounded-md" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 p-4 backdrop-filter backdrop-blur-lg shadow-md">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-1/3 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Dashboard Loading States</h3>
              <p className="text-sm text-muted-foreground">Loading states for dashboard components</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 p-4 backdrop-filter backdrop-blur-lg shadow-md">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-8 w-full" variant="shimmer" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 p-4 backdrop-filter backdrop-blur-lg shadow-md">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-8 w-full" variant="shimmer" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 p-4 backdrop-filter backdrop-blur-lg shadow-md">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-8 w-full" variant="shimmer" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Chart Loading States</h3>
              <p className="text-sm text-muted-foreground">Loading states for data visualization</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 p-4 backdrop-filter backdrop-blur-lg shadow-md">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-1/3" />
                      <div className="flex gap-1">
                        <Skeleton className="h-6 w-12 rounded-md" />
                        <Skeleton className="h-6 w-12 rounded-md" />
                        <Skeleton className="h-6 w-12 rounded-md" />
                      </div>
                    </div>
                    <div className="h-40 flex items-end gap-2 pt-4">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton 
                          key={i} 
                          className={`w-full rounded-t-md`} 
                          style={{ height: `${Math.random() * 70 + 30}%` }}
                          variant="pulse"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between pt-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-3 w-8" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="overflow-hidden border border-white/30 rounded-lg bg-white/20 p-4 backdrop-filter backdrop-blur-lg shadow-md">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-1/3" />
                      <div className="flex gap-1">
                        <Skeleton className="h-6 w-12 rounded-md" />
                        <Skeleton className="h-6 w-12 rounded-md" />
                      </div>
                    </div>
                    <div className="h-40 w-full">
                      <Skeleton className="h-full w-full rounded-md" variant="wave" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Advanced Skeleton Components</h3>
              <p className="text-sm text-muted-foreground">Ready-to-use skeleton components for common UI patterns</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                <div className="overflow-hidden">
                  <SkeletonTable />
                </div>
                <div className="overflow-hidden">
                  <SkeletonChart />
                </div>
              </div>
            </div>
          </div>
        );
      
      case "notifications":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Toast Variants" description="Different toast styles">
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <Button onClick={() => setActiveToast("default")}>Show Default Toast</Button>
                <Button variant="destructive" onClick={() => setActiveToast("destructive")}>Show Destructive Toast</Button>
                <Button variant="outline" onClick={() => setActiveToast("success")}>Show Success Toast</Button>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Toast Animations" description="Different animation styles">
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <Button onClick={() => setActiveToast("slideRight")}>Slide Right</Button>
                <Button onClick={() => setActiveToast("slideUp")}>Slide Up</Button>
                <Button onClick={() => setActiveToast("fade")}>Fade</Button>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Toast with Actions" description="Interactive toast with actions">
              <Button onClick={() => setActiveToast("withAction")}>Show Toast with Action</Button>
            </ComponentCard>
            
            <ComponentCard title="Permanent Toast" description="Toast that doesn't auto-dismiss">
              <Button onClick={() => setActiveToast("permanent")}>Show Permanent Toast</Button>
            </ComponentCard>
          </div>
        );
            
      case "complex":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Stats Cards</h3>
              <p className="text-sm text-muted-foreground">Metrics display with trend indicators</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Revenue"
                  value="$24,532"
                  trend={{ value: 12.5, isPositive: true }}
                  color="blue"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  }
                />
                <StatsCard
                  title="New Users"
                  value="1,482"
                  trend={{ value: 8.2, isPositive: true }}
                  color="green"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  }
                />
                <StatsCard
                  title="Conversion Rate"
                  value="3.42%"
                  trend={{ value: 2.1, isPositive: true }}
                  color="purple"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-purple-500"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" x2="19" y1="8" y2="14" />
                      <line x1="22" x2="16" y1="11" y2="11" />
                    </svg>
                  }
                />
                <StatsCard
                  title="Bounce Rate"
                  value="42.3%"
                  trend={{ value: 5.7, isPositive: false }}
                  color="red"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  }
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Chart Cards</h3>
              <p className="text-sm text-muted-foreground">Data visualization with different chart types</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard
                  title="Weekly Revenue"
                  description="Revenue trends over time"
                  type="line"
                  color="hsl(var(--primary))"
                  chartHeight={200}
                />
                <ChartCard
                  title="Monthly Visitors"
                  type="bar"
                  color="rgba(124, 58, 237, 0.8)"
                  chartHeight={200}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">User Profile Card</h3>
              <p className="text-sm text-muted-foreground">Comprehensive user information display</p>
              <div className="max-w-md border border-white/30 rounded-lg bg-white/10 backdrop-filter backdrop-blur-lg shadow-md overflow-hidden">
                <div className="relative h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30">
                  <div className="absolute -bottom-12 left-4">
                    <div className="h-24 w-24 rounded-full border-4 border-white/20 bg-white/10 backdrop-filter backdrop-blur-lg flex items-center justify-center text-2xl font-bold text-white">
                      JD
                    </div>
                  </div>
                </div>
                <div className="pt-14 px-4 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Product Designer</p>
                    </div>
                    <Button size="sm" variant="outline" className="bg-white/10">
                      Edit Profile
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="text-sm">john.doe@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-sm">San Francisco, CA</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                    <div className="text-center">
                      <div className="text-lg font-bold">248</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">12.4k</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">542</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Calendar Component</h3>
              <p className="text-sm text-muted-foreground">Interactive month calendar with today highlighting</p>
              <div className="flex justify-center">
                <Calendar className="max-w-sm" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Task Management</h3>
              <p className="text-sm text-muted-foreground">Task list with progress tracking and priority indicators</p>
              <TaskCard
                title="Today's Tasks"
                tasks={[
                  {
                    id: "1",
                    title: "Review design proposals",
                    completed: true,
                    priority: "high",
                    dueDate: new Date().toISOString()
                  },
                  {
                    id: "2",
                    title: "Team meeting",
                    completed: false,
                    priority: "medium",
                    dueDate: new Date().toISOString()
                  },
                  {
                    id: "3",
                    title: "Update documentation",
                    completed: false,
                    priority: "low",
                    dueDate: new Date(Date.now() + 86400000).toISOString()
                  },
                  {
                    id: "4",
                    title: "Prepare quarterly report",
                    completed: false,
                    priority: "high",
                    dueDate: new Date(Date.now() + 172800000).toISOString()
                  },
                  {
                    id: "5",
                    title: "Client presentation",
                    completed: false,
                    priority: "medium",
                    dueDate: new Date(Date.now() + 259200000).toISOString()
                  }
                ]}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Authentication Forms</h3>
              <p className="text-sm text-muted-foreground">Sign in and registration forms</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input placeholder="name@example.com" type="email" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Password</label>
                          <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                        </div>
                        <Input placeholder="••••••••" type="password" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 border border-white/30 rounded flex items-center justify-center">
                          <div className="h-2 w-2 bg-primary rounded-sm"></div>
                        </div>
                        <label className="text-sm">Remember me</label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Sign In</Button>
                  </CardFooter>
                </Card>
                
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First name</label>
                          <Input placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Last name</label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input placeholder="name@example.com" type="email" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input placeholder="••••••••" type="password" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 border border-white/30 rounded"></div>
                        <label className="text-sm">I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a></label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create Account</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/dashboard" className="text-sm text-primary hover:underline">
                View full dashboard example →
              </Link>
            </div>
          </div>
        );
            
      case "atomic":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Atomic Design System</h2>
              <p className="text-muted-foreground">
                This component library follows atomic design principles, organizing components into atoms, molecules, organisms, templates, and pages.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Atoms</h3>
              <p className="text-sm text-muted-foreground">
                The basic building blocks of matter. In UI, atoms are small, self-contained components like buttons, inputs, and labels.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ComponentCard title="Button" description="Basic interactive element">
                  <div className="flex flex-wrap gap-2">
                    <Button>Button</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Input" description="Text entry field">
                  <Input placeholder="Enter text..." />
                </ComponentCard>
                
                <ComponentCard title="Badge" description="Status indicator">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="success">Success</Badge>
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Avatar" description="User representation">
                  <Avatar fallback="JD" />
                </ComponentCard>
                
                <ComponentCard title="Skeleton" description="Loading state">
                  <Skeleton className="h-4 w-full" />
                </ComponentCard>
                
                <ComponentCard title="Icon" description="Vector graphics">
                  <div className="flex flex-wrap gap-4">
                    <Icon name="arrow-left" size="md" />
                    <Icon name="arrow-right" size="md" />
                    <Icon name="plus" size="md" />
                    <Icon name="search" size="md" />
                    <Icon name="calendar" size="md" />
                    <Icon name="check" size="md" />
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Label" description="Form field labels">
                  <div className="flex flex-col space-y-2">
                    <Label>Default Label</Label>
                    <Label variant="required">Required Field</Label>
                    <Label variant="optional">Optional Field</Label>
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Divider" description="Section separator">
                  <div className="space-y-4">
                    <Divider />
                    <Divider variant="faded" />
                    <Divider variant="gradient" />
                    <Divider label="OR" />
                  </div>
                </ComponentCard>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Molecules</h3>
              <p className="text-sm text-muted-foreground">
                Groups of atoms bonded together. Molecules are relatively simple combinations of components that function as a unit.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComponentCard title="Form Field" description="Input with label">
                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="name@example.com" />
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Search Bar" description="Input with search icon">
                  <div className="relative w-full">
                    <Input 
                      icon={<span>🔍</span>} 
                      placeholder="Search..." 
                    />
                  </div>
                </ComponentCard>
                
                <ComponentCard title="User Badge" description="Avatar with name">
                  <div className="flex items-center gap-2">
                    <Avatar fallback="JD" size="sm" />
                    <span className="text-sm font-medium">John Doe</span>
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Stats Card" description="Metric with trend">
                  <StatsCard
                    title="Total Revenue"
                    value="$24,532"
                    trend={{ value: 12.5, isPositive: true }}
                    color="blue"
                  />
                </ComponentCard>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Organisms</h3>
              <p className="text-sm text-muted-foreground">
                Groups of molecules joined together to form a relatively complex, distinct section of an interface.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComponentCard title="Task Card" description="Task management component">
                  <div className="w-full">
                    <TaskCard
                      title="Tasks"
                      tasks={[
                        {
                          id: "1",
                          title: "Review design proposals",
                          completed: true,
                          priority: "high",
                          dueDate: new Date().toISOString()
                        },
                        {
                          id: "2",
                          title: "Team meeting",
                          completed: false,
                          priority: "medium",
                          dueDate: new Date().toISOString()
                        }
                      ]}
                    />
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Chart Card" description="Data visualization">
                  <div className="w-full" style={{ height: "200px" }}>
                    <ChartCard
                      title="Weekly Revenue"
                      description="Revenue trends over time"
                      type="line"
                      color="hsl(var(--primary))"
                      chartHeight={200}
                    />
                  </div>
                </ComponentCard>
                
                <div className="md:col-span-2">
                  <ComponentCard title="Authentication Form" description="Sign-in component">
                    <Card className="w-full max-w-md mx-auto">
                      <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input placeholder="name@example.com" type="email" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input placeholder="••••••••" type="password" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Sign In</Button>
                      </CardFooter>
                    </Card>
                  </ComponentCard>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Templates</h3>
              <p className="text-sm text-muted-foreground">
                Page-level objects that place components into a layout and articulate the design's underlying content structure.
              </p>
              <div className="border border-gray-400/50 rounded-lg bg-gray-200/20 backdrop-filter backdrop-blur-lg p-4">
                <div className="space-y-4">
                  <div className="h-12 border border-gray-400/40 rounded-lg bg-gray-300/20 flex items-center px-4">
                    <div className="w-24 h-6 bg-gray-300/40 rounded"></div>
                    <div className="ml-auto flex gap-2">
                      <div className="w-20 h-8 bg-gray-300/40 rounded"></div>
                      <div className="w-20 h-8 bg-gray-300/40 rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/4 h-[calc(100vh-12rem)] border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                    <div className="w-3/4 space-y-4">
                      <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-32 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                        <div className="h-32 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                        <div className="h-32 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                      </div>
                      <div className="h-64 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm font-medium text-gray-700">Dashboard Layout Template</div>
              </div>
              <div className="text-center mt-4">
                <Link href="/dashboard" className="text-sm text-primary hover:underline">
                  View live dashboard example →
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Pages</h3>
              <p className="text-sm text-muted-foreground">
                Specific instances of templates that show what a UI looks like with real representative content.
              </p>
              <div className="text-center">
                <Link href="/dashboard" className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-filter backdrop-blur-lg transition-colors">
                  View Dashboard Example
                </Link>
              </div>
            </div>
            
            <div className="mt-8 p-4 border border-white/30 rounded-lg bg-white/10 backdrop-filter backdrop-blur-lg">
              <h3 className="text-lg font-semibold">Component Organization</h3>
              <p className="text-sm text-muted-foreground mt-2">
                The components are organized in the following directory structure:
              </p>
              <div className="mt-4 font-mono text-sm">
                <div className="pl-4">
                  <div>src/components/</div>
                  <div className="pl-4">
                    <div>ui/ <span className="text-muted-foreground">- Atoms (buttons, inputs, etc.)</span></div>
                    <div>molecules/ <span className="text-muted-foreground">- Molecules (stats cards, form fields, etc.)</span></div>
                    <div>organisms/ <span className="text-muted-foreground">- Organisms (task cards, auth forms, etc.)</span></div>
                    <div>templates/ <span className="text-muted-foreground">- Page templates and layouts</span></div>
                    <div>pages/ <span className="text-muted-foreground">- Full page implementations</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
            
      case "templates":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Template Components</h2>
              <p className="text-muted-foreground">
                Templates are page-level components that provide consistent layouts for your application.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Dashboard Layout</h3>
              <p className="text-sm text-muted-foreground">
                A layout template for dashboard pages with optional sidebar, header, and actions.
              </p>
              <div className="border border-gray-400/50 rounded-lg bg-gray-200/20 backdrop-filter backdrop-blur-lg p-4">
                <div className="space-y-4">
                  <div className="h-12 border border-gray-400/40 rounded-lg bg-gray-300/20 flex items-center px-4">
                    <div className="w-24 h-6 bg-gray-300/40 rounded"></div>
                    <div className="ml-auto flex gap-2">
                      <div className="w-20 h-8 bg-gray-300/40 rounded"></div>
                      <div className="w-20 h-8 bg-gray-300/40 rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/4 h-[calc(100vh-12rem)] border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                    <div className="w-3/4 space-y-4">
                      <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-32 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                        <div className="h-32 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                        <div className="h-32 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                      </div>
                      <div className="h-64 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm font-medium text-gray-700">Dashboard Layout Template</div>
              </div>
              <div className="text-center mt-4">
                <Link href="/dashboard" className="text-sm text-primary hover:underline">
                  View live dashboard example →
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Card Layout</h3>
              <p className="text-sm text-muted-foreground">
                A responsive grid layout for card-based content with configurable columns.
              </p>
              <div className="border border-gray-400/50 rounded-lg bg-gray-200/20 backdrop-filter backdrop-blur-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                  <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                  <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                  <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                  <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                  <div className="h-40 border border-gray-400/40 rounded-lg bg-gray-300/20"></div>
                </div>
                <div className="mt-4 text-center text-sm font-medium text-gray-700">Card Layout Template</div>
              </div>
            </div>
            
            <div className="mt-8 p-4 border border-white/30 rounded-lg bg-white/10 backdrop-filter backdrop-blur-lg">
              <h3 className="text-lg font-semibold">Using Templates</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Templates provide consistent layouts for your application. They can be imported and used as follows:
              </p>
              <div className="mt-4 font-mono text-sm bg-black/20 p-4 rounded-lg overflow-x-auto">
                <pre>{`import { DashboardLayout } from "@/components/templates/dashboard-layout";

export default function MyPage() {
  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Overview of your account"
      sidebar={<Sidebar />}
      actions={<Button>New Item</Button>}
    >
      <YourContent />
    </DashboardLayout>
  );
}`}</pre>
              </div>
            </div>
          </div>
        );
            
      case "fleet-management":
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Fleet Management</h2>
              <p className="text-muted-foreground">
                A comprehensive fleet management dashboard with live tracking.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Fleet Management Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                This component showcases a fleet management dashboard with live tracking features.
              </p>
              <div className="flex justify-center">
                <FleetManagementShowcase />
              </div>
            </div>
          </div>
        );
            
      default:
        return null;
    }
  };

  return (
    <div className="container py-10 relative z-10">
      <div className="mb-4 flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design system with reusable components</h1>
        <p className="" style={{ color: "hsl(var(--muted-foreground))" }}>
          A showcase of reusable UI components with animations and interactions.
        </p>
      </div>

      <div className="mb-8 border-b">
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              title={tab.title}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {getTabContent()}
      </motion.div>

      {/* Add the toast container */}
      {renderToastContainer()}
    </div>
  );
} 