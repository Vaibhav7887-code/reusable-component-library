"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@/components/atoms/icon";
import { ChartCard } from "@/components/molecules/chart-card";
import { ApiKeysCard } from "@/components/molecules/api-portal/api-keys-card";
import { SubscriptionCard } from "@/components/molecules/api-portal/subscription-card";
import { mockUser, mockUsageMetrics, mockAuditEvents, ApiPortalService } from '@/lib/api-portal-data';

export function DeveloperDashboard() {
  const [usageData, setUsageData] = React.useState(mockUsageMetrics);
  const [auditEvents, setAuditEvents] = React.useState(mockAuditEvents);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [usage, events] = await Promise.all([
          ApiPortalService.getUsageMetrics(mockUser.organizationId),
          ApiPortalService.getAuditEvents(mockUser.organizationId, 10)
        ]);
        setUsageData(usage);
        setAuditEvents(events);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const usagePercentage = (usageData.current / usageData.limit) * 100;
  const isNearLimit = usagePercentage > 80;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {mockUser.name}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your APIs today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="book-open" className="w-4 h-4 mr-2" />
            Documentation
          </Button>
          <Button>
            <Icon name="plus" className="w-4 h-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>

      {/* Usage Alert */}
      {isNearLimit && (
        <Alert className={isNearLimit ? "border-orange-500 bg-orange-50" : ""}>
          <Icon name="alert-triangle" className="h-4 w-4" />
          <AlertTitle>Usage Warning</AlertTitle>
          <AlertDescription>
            You've used {usagePercentage.toFixed(1)}% of your monthly quota. 
            {usagePercentage > 90 && " Consider upgrading your plan to avoid service interruption."}
            <Button variant="link" className="p-0 h-auto ml-2">
              Upgrade Plan
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Requests</CardTitle>
            <Icon name="activity" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageData.current.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of {usageData.limit.toLocaleString()} this month
            </p>
            <Progress value={usagePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
            <Icon name="key" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 expiring soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Icon name="check-circle" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Icon name="clock" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartCard 
                title="API Usage Trends" 
                description="Request volume over the last 30 days"
              />
            </div>
            <SubscriptionCard />
          </div>

          {/* Top Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Top Endpoints</CardTitle>
              <CardDescription>Most frequently used endpoints this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageData.breakdown.map((endpoint, index) => (
                  <div key={endpoint.endpoint} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <code className="text-sm font-mono">{endpoint.endpoint}</code>
                        <p className="text-xs text-muted-foreground">
                          {endpoint.count.toLocaleString()} requests
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {((endpoint.count / usageData.current) * 100).toFixed(1)}%
                      </div>
                      <Progress 
                        value={(endpoint.count / usageData.current) * 100} 
                        className="w-20 h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Request Volume" 
              description="Hourly request volume for the last 24 hours"
            />
            <ChartCard 
              title="Response Times" 
              description="Average response times by endpoint"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage Breakdown</CardTitle>
              <CardDescription>Detailed usage statistics by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageData.breakdown.map((endpoint) => (
                  <div key={endpoint.endpoint} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono">{endpoint.endpoint}</code>
                      <Badge variant="outline">{endpoint.count.toLocaleString()} requests</Badge>
                    </div>
                    <Progress 
                      value={(endpoint.count / usageData.current) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{((endpoint.count / usageData.current) * 100).toFixed(1)}% of total</span>
                      <span>Avg: 245ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-6">
          <ApiKeysCard />
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Recent activity in your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon 
                        name={
                          event.action.includes('created') ? 'plus' :
                          event.action.includes('deleted') ? 'trash' :
                          event.action.includes('rotated') ? 'refresh-cw' :
                          'edit'
                        } 
                        className="w-4 h-4" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {event.action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {event.resource}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.metadata.keyName && `Key: ${event.metadata.keyName}`}
                        {event.metadata.gracePeriod && ` (Grace period: ${event.metadata.gracePeriod})`}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{event.timestamp.toLocaleString()}</span>
                        {event.ipAddress && <span>IP: {event.ipAddress}</span>}
                        {event.userAgent && (
                          <span className="truncate max-w-xs">
                            {event.userAgent.includes('CLI') ? 'FleetEdge CLI' : 'Web Browser'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 