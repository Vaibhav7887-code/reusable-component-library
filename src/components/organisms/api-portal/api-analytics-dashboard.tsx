"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@/components/atoms/icon";
import { ChartCard } from "@/components/molecules/chart-card";
import { cn } from "@/lib/utils";
import { mockUsageMetrics, mockApiProducts, ApiPortalService } from '@/lib/api-portal-data';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  description: string;
}

export function ApiAnalyticsDashboard() {
  const [timeRange, setTimeRange] = React.useState('7d');
  const [selectedApi, setSelectedApi] = React.useState('all');
  const [usageData, setUsageData] = React.useState(mockUsageMetrics);
  const [isLoading, setIsLoading] = React.useState(false);

  const metrics: MetricCard[] = [
    {
      title: 'Total Requests',
      value: usageData.current.toLocaleString(),
      change: 12.5,
      changeType: 'increase',
      icon: 'activity',
      description: 'API requests in selected period'
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: 0.3,
      changeType: 'increase',
      icon: 'check-circle',
      description: 'Successful API responses'
    },
    {
      title: 'Avg Response Time',
      value: '245ms',
      change: -8.2,
      changeType: 'decrease',
      icon: 'clock',
      description: 'Average API response time'
    },
    {
      title: 'Error Rate',
      value: '0.8%',
      change: -15.3,
      changeType: 'decrease',
      icon: 'alert-triangle',
      description: 'Failed API requests'
    },
    {
      title: 'Unique Users',
      value: '1,247',
      change: 23.1,
      changeType: 'increase',
      icon: 'users',
      description: 'Active API consumers'
    },
    {
      title: 'Data Transfer',
      value: '2.4 GB',
      change: 18.7,
      changeType: 'increase',
      icon: 'hard-drive',
      description: 'Total data transferred'
    }
  ];

  const topEndpoints = [
    { endpoint: '/vehicles/{vin}', requests: 5200, latency: 180, errors: 12 },
    { endpoint: '/vehicles/{vin}/location', requests: 2100, latency: 95, errors: 3 },
    { endpoint: '/vehicles/{vin}/fuel', requests: 850, latency: 220, errors: 8 },
    { endpoint: '/vehicles/search', requests: 300, latency: 340, errors: 2 },
    { endpoint: '/routes/optimize', requests: 180, latency: 1200, errors: 5 }
  ];

  const errorBreakdown = [
    { code: 401, count: 45, percentage: 35.7, description: 'Unauthorized' },
    { code: 429, count: 32, percentage: 25.4, description: 'Rate Limited' },
    { code: 404, count: 28, percentage: 22.2, description: 'Not Found' },
    { code: 500, count: 15, percentage: 11.9, description: 'Server Error' },
    { code: 400, count: 6, percentage: 4.8, description: 'Bad Request' }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Error Rate',
      message: 'Error rate for /vehicles/{vin}/fuel endpoint is above 2%',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      action: 'Investigate'
    },
    {
      id: 2,
      type: 'info',
      title: 'Usage Spike',
      message: 'Traffic increased by 45% in the last hour',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      action: 'Monitor'
    },
    {
      id: 3,
      type: 'success',
      title: 'Performance Improvement',
      message: 'Average response time decreased by 12% this week',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      action: 'Review'
    }
  ];

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'trending-up';
      case 'decrease': return 'trending-down';
      default: return 'minus';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Analytics</h1>
          <p className="text-muted-foreground">
            Monitor performance, usage, and health of your APIs
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedApi} onValueChange={setSelectedApi}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select API" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All APIs</SelectItem>
              {mockApiProducts.map((api) => (
                <SelectItem key={api.id} value={api.id}>
                  {api.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="download" className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.slice(0, 2).map((alert) => (
            <Alert 
              key={alert.id}
              className={cn(
                alert.type === 'warning' && "border-orange-500 bg-orange-50",
                alert.type === 'success' && "border-green-500 bg-green-50",
                alert.type === 'info' && "border-blue-500 bg-blue-50"
              )}
            >
              <Icon 
                name={
                  alert.type === 'warning' ? 'alert-triangle' :
                  alert.type === 'success' ? 'check-circle' :
                  'info'
                } 
                className="h-4 w-4" 
              />
              <AlertTitle className="flex items-center justify-between">
                {alert.title}
                <span className="text-xs text-muted-foreground font-normal">
                  {formatTimeAgo(alert.timestamp)}
                </span>
              </AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                {alert.message}
                <Button variant="outline" size="sm">
                  {alert.action}
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon name={metric.icon} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon 
                  name={getChangeIcon(metric.changeType)} 
                  className={cn("h-3 w-3", getChangeColor(metric.changeType))}
                />
                <span className={getChangeColor(metric.changeType)}>
                  {Math.abs(metric.change)}%
                </span>
                <span>from last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Request Volume" 
              description="API requests over time"
            />
            <ChartCard 
              title="Response Times" 
              description="Average response time trends"
            />
          </div>

          {/* Top Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Top Endpoints</CardTitle>
              <CardDescription>Most active endpoints by request volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEndpoints.map((endpoint, index) => (
                  <div key={endpoint.endpoint} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <code className="text-sm font-mono">{endpoint.endpoint}</code>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{endpoint.requests.toLocaleString()} requests</span>
                          <span>•</span>
                          <span>{endpoint.latency}ms avg</span>
                          <span>•</span>
                          <span className={endpoint.errors > 10 ? "text-red-600" : "text-green-600"}>
                            {endpoint.errors} errors
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {((endpoint.requests / usageData.current) * 100).toFixed(1)}%
                      </div>
                      <Progress 
                        value={(endpoint.requests / usageData.current) * 100} 
                        className="w-20 h-2 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Response Time Distribution" 
              description="Response time percentiles"
            />
            <ChartCard 
              title="Throughput" 
              description="Requests per second"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Endpoint</CardTitle>
              <CardDescription>Detailed performance metrics for each endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topEndpoints.map((endpoint) => (
                  <div key={endpoint.endpoint} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-sm font-mono">{endpoint.endpoint}</code>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={endpoint.latency < 200 ? 'default' : endpoint.latency < 500 ? 'secondary' : 'destructive'}
                        >
                          {endpoint.latency}ms
                        </Badge>
                        <Badge variant="outline">
                          {endpoint.requests.toLocaleString()} req
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">P50:</span>
                        <span className="ml-2 font-medium">{Math.round(endpoint.latency * 0.8)}ms</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">P95:</span>
                        <span className="ml-2 font-medium">{Math.round(endpoint.latency * 1.5)}ms</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">P99:</span>
                        <span className="ml-2 font-medium">{Math.round(endpoint.latency * 2.2)}ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Error Rate Trends" 
              description="Error rate over time"
            />
            <Card>
              <CardHeader>
                <CardTitle>Error Breakdown</CardTitle>
                <CardDescription>Errors by HTTP status code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {errorBreakdown.map((error) => (
                    <div key={error.code} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="destructive">{error.code}</Badge>
                        <div>
                          <div className="font-medium text-sm">{error.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {error.count} occurrences
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{error.percentage}%</div>
                        <Progress value={error.percentage} className="w-16 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Errors</CardTitle>
              <CardDescription>Latest error occurrences with details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { timestamp: new Date(Date.now() - 5 * 60 * 1000), endpoint: '/vehicles/ABC123', status: 404, message: 'Vehicle not found' },
                  { timestamp: new Date(Date.now() - 12 * 60 * 1000), endpoint: '/vehicles/XYZ789/fuel', status: 500, message: 'Internal server error' },
                  { timestamp: new Date(Date.now() - 18 * 60 * 1000), endpoint: '/routes/optimize', status: 429, message: 'Rate limit exceeded' }
                ].map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="destructive">{error.status}</Badge>
                      <div>
                        <code className="text-sm font-mono">{error.endpoint}</code>
                        <div className="text-xs text-muted-foreground">{error.message}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTimeAgo(error.timestamp)}
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
              title="Usage by Time of Day" 
              description="Request patterns throughout the day"
            />
            <ChartCard 
              title="Usage by Day of Week" 
              description="Weekly usage patterns"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Key Usage</CardTitle>
              <CardDescription>Usage breakdown by API key</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Production App', requests: 5200, percentage: 61.5 },
                  { name: 'Mobile App', requests: 2100, percentage: 24.8 },
                  { name: 'Analytics Service', requests: 850, percentage: 10.1 },
                  { name: 'Testing Environment', requests: 300, percentage: 3.6 }
                ].map((key) => (
                  <div key={key.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{key.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {key.requests.toLocaleString()} requests
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{key.percentage}%</div>
                      <Progress value={key.percentage} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Requests by Region" 
              description="Geographic distribution of API requests"
            />
            <Card>
              <CardHeader>
                <CardTitle>Top Regions</CardTitle>
                <CardDescription>Highest traffic regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { region: 'North America', requests: 4200, percentage: 49.7 },
                    { region: 'Europe', requests: 2800, percentage: 33.1 },
                    { region: 'Asia Pacific', requests: 1100, percentage: 13.0 },
                    { region: 'South America', requests: 350, percentage: 4.1 }
                  ].map((region) => (
                    <div key={region.region} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{region.region}</div>
                        <div className="text-xs text-muted-foreground">
                          {region.requests.toLocaleString()} requests
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{region.percentage}%</div>
                        <Progress value={region.percentage} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Region</CardTitle>
              <CardDescription>Response times across different regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { region: 'US East', latency: 180, requests: 2100 },
                  { region: 'US West', latency: 195, requests: 1800 },
                  { region: 'Europe', latency: 220, requests: 2800 },
                  { region: 'Asia Pacific', latency: 340, requests: 1100 }
                ].map((region) => (
                  <div key={region.region} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{region.region}</div>
                      <div className="text-xs text-muted-foreground">
                        {region.requests.toLocaleString()} requests
                      </div>
                    </div>
                    <Badge 
                      variant={region.latency < 200 ? 'default' : region.latency < 300 ? 'secondary' : 'destructive'}
                    >
                      {region.latency}ms avg
                    </Badge>
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