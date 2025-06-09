"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiProductCard } from "@/components/molecules/api-portal/api-product-card";
import { Icon } from "@/components/atoms/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockApiProducts, ApiPortalService } from '@/lib/api-portal-data';

// Transform mock data for the marketplace
const apiProducts = mockApiProducts.map(product => ({
  iconName: product.icon,
  title: product.name,
  description: product.description,
  tags: product.tags,
  href: `/api-portal/playground?api=${product.id}`,
  product: product.category,
  access: product.accessLevel,
  status: product.status,
  version: product.version,
  pricing: product.pricing,
  endpoints: product.endpoints.length
}));

export function ApiMarketplace() {
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [accessFilter, setAccessFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = React.useState("name");

  const filteredApis = React.useMemo(() => {
    let filtered = apiProducts.filter((api) => {
      return (
        (search === "" ||
          api.title.toLowerCase().includes(search.toLowerCase()) ||
          api.description.toLowerCase().includes(search.toLowerCase()) ||
          api.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))) &&
        (categoryFilter === "all" || api.product === categoryFilter) &&
        (accessFilter === "all" || api.access === accessFilter) &&
        (statusFilter === "all" || api.status === statusFilter)
      );
    });

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "endpoints":
          return b.endpoints - a.endpoints;
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [search, categoryFilter, accessFilter, statusFilter, sortBy]);

  const categories = Array.from(new Set(apiProducts.map(api => api.product)));
  const accessLevels = Array.from(new Set(apiProducts.map(api => api.access)));
  const statuses = Array.from(new Set(apiProducts.map(api => api.status)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          FleetEdge API Marketplace
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover, test, and integrate our comprehensive suite of APIs to power your fleet management applications.
        </p>
        <div className="flex justify-center gap-4">
          <Button>
            <Icon name="book-open" className="w-4 h-4 mr-2" />
            Getting Started Guide
          </Button>
          <Button variant="outline">
            <Icon name="code" className="w-4 h-4 mr-2" />
            View SDKs
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Icon name="layers" className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{apiProducts.length}</div>
                <p className="text-sm text-muted-foreground">Total APIs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Icon name="globe" className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {apiProducts.filter(api => api.access === 'public').length}
                </div>
                <p className="text-sm text-muted-foreground">Public APIs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Icon name="activity" className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {apiProducts.filter(api => api.status === 'active').length}
                </div>
                <p className="text-sm text-muted-foreground">Active APIs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Icon name="zap" className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-sm text-muted-foreground">Uptime SLA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-md">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="sm"/>
                <Input
                  placeholder="Search APIs, descriptions, or tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Icon name="grid-3x3" className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <Icon name="list" className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={accessFilter} onValueChange={setAccessFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Access Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Access Levels</SelectItem>
                  {accessLevels.map(access => (
                    <SelectItem key={access} value={access}>
                      {access.charAt(0).toUpperCase() + access.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="endpoints">Endpoints</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredApis.length} API{filteredApis.length !== 1 ? 's' : ''} found
          </p>
          {search && (
            <Button variant="ghost" size="sm" onClick={() => setSearch("")}>
              <Icon name="x" className="w-4 h-4 mr-1" />
              Clear search
            </Button>
          )}
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredApis.map((api) => (
              <ApiProductCard key={api.title} {...api} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApis.map((api) => (
              <Card key={api.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={api.iconName} className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{api.title}</h3>
                        <Badge variant={api.status === 'active' ? 'default' : 'secondary'}>
                          {api.status}
                        </Badge>
                        <Badge variant="outline">v{api.version}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{api.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{api.endpoints} endpoints</span>
                        <span>•</span>
                        <span>{api.access}</span>
                        <span>•</span>
                        <span>{api.product}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {api.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild>
                          <a href={api.href}>Try API</a>
                        </Button>
                        <Button variant="outline" size="sm">
                          View Docs
                        </Button>
                        {api.pricing && api.pricing.length > 0 && (
                          <span className="text-sm text-muted-foreground ml-auto">
                            Starting at ${api.pricing[0].price}/month
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredApis.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Icon name="search-x" className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No APIs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
              <Button variant="outline" onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setAccessFilter("all");
                setStatusFilter("all");
              }}>
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Featured APIs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Featured APIs</CardTitle>
          <CardDescription>
            Popular APIs that developers love to build with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiProducts.filter(api => api.status === 'active').slice(0, 2).map((api) => (
              <div key={api.title} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={api.iconName} className="w-8 h-8" />
                  <div>
                    <h4 className="font-semibold">{api.title}</h4>
                    <p className="text-sm text-muted-foreground">{api.endpoints} endpoints</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{api.description}</p>
                <Button size="sm" asChild>
                  <a href={api.href}>Get Started</a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 