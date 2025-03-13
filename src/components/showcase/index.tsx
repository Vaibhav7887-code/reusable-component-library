"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ComponentCard } from "./component-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton, SkeletonCard, SkeletonAvatar } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";

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
  const [activeTab, setActiveTab] = React.useState("buttons");
  const [activeToast, setActiveToast] = React.useState<string | null>(null);
  
  const tabs = [
    { id: "buttons", title: "Buttons" },
    { id: "cards", title: "Cards" },
    { id: "badges", title: "Badges" },
    { id: "avatars", title: "Avatars" },
    { id: "inputs", title: "Inputs" },
    { id: "loaders", title: "Loaders" },
    { id: "notifications", title: "Notifications" },
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
            <ComponentCard title="Default Button" description="Standard button with hover effects">
              <div className="flex flex-wrap gap-4">
                <Button>Default Button</Button>
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
            
            <ComponentCard title="Animated Buttons" description="Buttons with animation effects">
              <div className="flex flex-wrap gap-4">
                <Button animation="pulse">Pulse Animation</Button>
                <Button animation="bounce">Bounce on Hover</Button>
                <div className="group">
                  <Button animation="slideRight">Slide on Group Hover</Button>
                </div>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Gradient Button" description="Button with gradient background">
              <Button variant="gradient" size="lg">
                Gradient Button
              </Button>
            </ComponentCard>

            <ComponentCard title="Button States" description="Different button states">
              <div className="flex flex-col gap-4">
                <Button>Normal Button</Button>
                <Button disabled>Disabled Button</Button>
                <Button className="ring-2 ring-ring ring-offset-2">Focused Button</Button>
                <Button className="opacity-80">Hovered Button</Button>
              </div>
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
              <Button animation="scale" variant="secondary" size="lg">
                Scale on Hover
              </Button>
            </ComponentCard>
          </div>
        );
      
      case "cards":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ComponentCard title="Default Card" description="Standard card component">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>A simple card description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is a standard card component with header, content, and optional footer sections.</p>
                  </CardContent>
                </Card>
              </ComponentCard>
            </div>
            
            <ComponentCard title="Interactive Card" description="Card with hover effects">
              <Card variant="interactive" className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover to see the effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card elevates and adds a shadow on hover.</p>
                </CardContent>
              </Card>
            </ComponentCard>
            
            <ComponentCard title="Gradient Card" description="Card with gradient background">
              <Card variant="gradient" className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Gradient Card</CardTitle>
                  <CardDescription>With gradient background</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card has a subtle gradient background effect.</p>
                </CardContent>
              </Card>
            </ComponentCard>

            <ComponentCard title="Outline Card" description="Card with outline style">
              <Card variant="outline" className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Outline Card</CardTitle>
                  <CardDescription>Border emphasis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card has a prominent border that changes color on hover.</p>
                </CardContent>
              </Card>
            </ComponentCard>

            <ComponentCard title="Elevated Card" description="Card with shadow">
              <Card variant="elevated" className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>With drop shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card has a pronounced shadow that increases on hover.</p>
                </CardContent>
              </Card>
            </ComponentCard>

            <ComponentCard title="Card with Footer" description="Card with footer actions">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>Includes action buttons</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card demonstrates the use of a footer for action buttons.</p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="outline">Cancel</Button>
                  <Button size="sm">Save</Button>
                </CardFooter>
              </Card>
            </ComponentCard>
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
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </ComponentCard>
            
            <ComponentCard title="Animated Badges" description="Badges with animation effects">
              <div className="flex flex-wrap gap-2">
                <Badge variant="pulse">Pulsing Badge</Badge>
                <Badge animation="pulse">Pulse Animation</Badge>
                <Badge animation="bounce">Bounce</Badge>
                <Badge animation="ping">Ping</Badge>
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
                <Input variant="outline" placeholder="Outline variant" />
                <Input variant="ghost" placeholder="Ghost variant" />
                <Input variant="underlined" placeholder="Underlined variant" />
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Basic Skeletons" description="Loading state placeholders">
              <div className="w-full max-w-md space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </ComponentCard>
            
            <ComponentCard title="Skeleton Variants" description="Different animation styles">
              <div className="w-full max-w-md space-y-4">
                <Skeleton variant="pulse" className="h-4 w-full" />
                <Skeleton variant="shimmer" className="h-4 w-2/3" />
                <Skeleton variant="wave" className="h-4 w-1/2" />
              </div>
            </ComponentCard>
            
            <ComponentCard title="Complex Skeletons" description="Pre-built loading states for UI patterns">
              <div className="w-full max-w-md">
                <SkeletonCard />
              </div>
            </ComponentCard>
            
            <ComponentCard title="Avatar Skeleton" description="Loading state for user profiles">
              <div className="w-full max-w-md">
                <SkeletonAvatar />
              </div>
            </ComponentCard>
          </div>
        );
      
      case "notifications":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Toast Variants" description="Different toast styles">
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <Button onClick={() => setActiveToast("default")}>Show Default Toast</Button>
                <Button onClick={() => setActiveToast("destructive")} variant="destructive">Show Destructive Toast</Button>
                <Button onClick={() => setActiveToast("success")} variant="outline">Show Success Toast</Button>
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
            
      default:
        return null;
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-4 flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">UI Component Library</h1>
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