"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/components/atoms/icon";
import { mockUser, mockOrganization } from '@/lib/api-portal-data';

const quickStats = [
  {
    title: "API Requests",
    value: "8,450",
    limit: "10,000",
    percentage: 84.5,
    trend: "+12%",
    icon: "activity"
  },
  {
    title: "Active APIs",
    value: "12",
    subtitle: "3 new this month",
    trend: "+25%",
    icon: "zap"
  },
  {
    title: "Response Time",
    value: "245ms",
    subtitle: "avg response",
    trend: "-8%",
    icon: "timer"
  },
  {
    title: "Success Rate",
    value: "99.8%",
    subtitle: "uptime",
    trend: "+0.1%",
    icon: "check-circle"
  }
];

const featureCards = [
  {
    title: "API Marketplace",
    description: "Discover and explore our comprehensive API catalog with advanced filtering and detailed documentation.",
    icon: "store",
    href: "/api-portal/marketplace",
    features: ["Browse APIs", "Advanced Filtering", "Pricing Plans", "Live Status"],
    color: "bg-blue-500"
  },
  {
    title: "Interactive Playground",
    description: "Test APIs in real-time with our advanced playground featuring multi-language code generation.",
    icon: "play",
    href: "/api-portal/playground",
    features: ["Real-time Testing", "Code Generation", "Request History", "Error Analysis"],
    color: "bg-green-500"
  },
  {
    title: "Developer Dashboard",
    description: "Monitor your API usage, manage keys, and track performance with comprehensive analytics.",
    icon: "layout-dashboard",
    href: "/api-portal/dashboard",
    features: ["Usage Analytics", "API Key Management", "Audit Logs", "Performance Metrics"],
    color: "bg-purple-500"
  },
  {
    title: "API Documentation",
    description: "Access comprehensive, interactive documentation with examples and SDKs for all languages.",
    icon: "book-open",
    href: "/api-portal/docs",
    features: ["Interactive Docs", "Code Examples", "SDK Downloads", "API Reference"],
    color: "bg-orange-500"
  },
  {
    title: "Analytics Dashboard",
    description: "Deep insights into API performance, usage patterns, and geographic distribution of requests.",
    icon: "bar-chart-3",
    href: "/api-portal/analytics",
    features: ["Real-time Metrics", "Geographic Analysis", "Performance Insights", "Custom Reports"],
    color: "bg-red-500"
  },
  {
    title: "CLI Experience",
    description: "Command-line tools and interactive terminal experience for power users and automation.",
    icon: "terminal",
    href: "/api-portal/cli",
    features: ["Interactive Terminal", "Command Reference", "Automation Scripts", "Multi-platform Support"],
    color: "bg-gray-500"
  }
];

const recentActivity = [
  {
    type: "api_call",
    title: "Vehicle Telemetry API called",
    description: "GET /vehicles/ABC123/location",
    timestamp: "2 minutes ago",
    status: "success",
    icon: "activity"
  },
  {
    type: "key_created",
    title: "New API key created",
    description: "Production key for Fleet Manager",
    timestamp: "1 hour ago",
    status: "info",
    icon: "key"
  },
  {
    type: "subscription",
    title: "Upgraded to Pro plan",
    description: "Access to premium APIs unlocked",
    timestamp: "2 hours ago",
    status: "success",
    icon: "arrow-up"
  },
  {
    type: "documentation",
    title: "Documentation updated",
    description: "Fleet Analytics API v2.1 released",
    timestamp: "4 hours ago",
    status: "info",
    icon: "book-open"
  }
];

const popularApis = [
  {
    name: "Vehicle Telemetry API",
    description: "Real-time vehicle location and sensor data",
    calls: "3,245",
    status: "active",
    version: "v2.1",
    category: "telemetry"
  },
  {
    name: "Route Optimization API",
    description: "Intelligent routing and fleet optimization",
    calls: "1,876",
    status: "active", 
    version: "v1.8",
    category: "logistics"
  },
  {
    name: "Fleet Analytics API",
    description: "Comprehensive fleet performance insights",
    calls: "987",
    status: "beta",
    version: "v2.0",
    category: "analytics"
  }
];

export default function ApiPortalHomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {mockUser.name}
            </h1>
            <p className="text-muted-foreground">
              Manage your APIs, monitor usage, and explore new integrations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {mockOrganization.plan} Plan
            </Badge>
            <Button asChild>
              <Link href="/api-portal/keys/new">
                <Icon name="plus" className="w-4 h-4 mr-2" />
                New API Key
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon name={stat.icon} className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.limit && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      {stat.value} / {stat.limit}
                    </div>
                    <Progress value={stat.percentage} className="h-1" />
                  </div>
                )}
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                )}
                <div className="flex items-center pt-1">
                  <Icon 
                    name="trending-up" 
                    className="w-3 h-3 mr-1 text-green-500" 
                  />
                  <span className="text-xs text-green-500">
                    {stat.trend}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Explore Features</h2>
          <Button variant="outline" asChild>
            <Link href="/api-portal/marketplace">
              Browse All APIs
              <Icon name="arrow-right" className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <Card key={card.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                    <Icon name={card.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Icon name="check" className="w-3 h-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={card.href}>
                    Explore {card.title}
                    <Icon name="arrow-right" className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular APIs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Popular APIs</h2>
          <Button variant="outline" asChild>
            <Link href="/api-portal/marketplace">
              View All APIs
              <Icon name="external-link" className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-4">
          {popularApis.map((api) => (
            <Card key={api.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{api.name}</h3>
                      <Badge variant="outline">{api.version}</Badge>
                      <Badge variant={api.status === 'active' ? 'default' : 'secondary'}>
                        {api.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{api.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{api.calls} calls today</span>
                      <span>Category: {api.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/api-portal/docs/${api.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Icon name="book-open" className="w-4 h-4 mr-2" />
                        Docs
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/api-portal/playground?api=${api.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Icon name="play" className="w-4 h-4 mr-2" />
                        Try
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest events and updates in your API portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600' :
                    activity.status === 'info' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon name={activity.icon} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{activity.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/api-portal/dashboard">
                View All Activity
                <Icon name="arrow-right" className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="trending-up" className="w-5 h-5" />
              Usage Insights
            </CardTitle>
            <CardDescription>
              Key metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Top Endpoint</span>
                <span className="text-sm font-medium">GET /vehicles/{'{vin}'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Peak Usage Time</span>
                <span className="text-sm font-medium">2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Geographic Distribution</span>
                <span className="text-sm font-medium">US East: 65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Error Rate</span>
                <span className="text-sm font-medium text-green-600">0.2%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/api-portal/analytics">
                View Full Analytics
                <Icon name="bar-chart-3" className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Getting Started Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="rocket" className="w-5 h-5" />
            Get Started in Minutes
          </CardTitle>
          <CardDescription>
            Follow these steps to start integrating with our APIs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium">Create API Key</h4>
                <p className="text-sm text-muted-foreground">Generate credentials for authentication</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium">Choose an API</h4>
                <p className="text-sm text-muted-foreground">Browse our marketplace and select APIs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium">Start Testing</h4>
                <p className="text-sm text-muted-foreground">Use our playground to test and integrate</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/api-portal/keys/new">
                <Icon name="key" className="w-4 h-4 mr-2" />
                Create API Key
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api-portal/docs">
                <Icon name="book-open" className="w-4 h-4 mr-2" />
                View Documentation
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 