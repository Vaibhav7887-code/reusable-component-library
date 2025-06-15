"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/atoms/icon";
import { toast } from "sonner";
import { ApiPortalService } from "@/lib/api-portal-data";

const availableScopes = [
  { id: 'vehicles:read', name: 'Read Vehicles', description: 'Access vehicle information and telemetry data', category: 'basic' },
  { id: 'vehicles:write', name: 'Write Vehicles', description: 'Update vehicle information and settings', category: 'basic' },
  { id: 'read:telemetry[fleet.region=west]', name: 'Read Telemetry (West)', description: 'Access telemetry data for west region vehicles only', category: 'fleet' },
  { id: 'read:telemetry[fleet.region=east]', name: 'Read Telemetry (East)', description: 'Access telemetry data for east region vehicles only', category: 'fleet' },
  { id: 'read:vehicles[fleet.type=truck]', name: 'Read Vehicles (Trucks)', description: 'Access truck vehicle data only', category: 'fleet' },
  { id: 'read:vehicles[fleet.depot=chicago]', name: 'Read Vehicles (Chicago)', description: 'Access vehicles from Chicago depot only', category: 'fleet' },
  { id: 'write:maintenance[fleet.type=truck]', name: 'Maintenance (Trucks)', description: 'Update maintenance records for trucks only', category: 'fleet' },
  { id: 'routes:read', name: 'Read Routes', description: 'Access route optimization and planning', category: 'basic' },
  { id: 'routes:write', name: 'Write Routes', description: 'Create and modify routes', category: 'basic' },
  { id: 'analytics:read', name: 'Read Analytics', description: 'Access fleet analytics and reports', category: 'basic' },
  { id: 'maintenance:read', name: 'Read Maintenance', description: 'Access maintenance schedules and records', category: 'basic' },
  { id: 'maintenance:write', name: 'Write Maintenance', description: 'Update maintenance records', category: 'basic' }
];

const environments = [
  { value: 'development', label: 'Development', description: 'For testing and development' },
  { value: 'staging', label: 'Staging', description: 'For pre-production testing' },
  { value: 'production', label: 'Production', description: 'For live applications' }
];

export default function NewApiKeyPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    environment: 'development',
    scopes: [] as string[],
    expiresAt: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleScopeChange = (scopeId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      scopes: checked 
        ? [...prev.scopes, scopeId]
        : prev.scopes.filter(s => s !== scopeId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('API key name is required');
      return;
    }

    if (formData.scopes.length === 0) {
      toast.error('At least one scope must be selected');
      return;
    }

    setIsLoading(true);

    try {
      const result = await ApiPortalService.createApiKey({
        name: formData.name,
        description: formData.description,
        environment: formData.environment as any,
        scopes: formData.scopes,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined
      });

      toast.success('API key created successfully!', {
        description: 'Make sure to copy your secret key now. You won\'t be able to see it again.'
      });

      router.push(`/api-portal/keys?new=${result.key.id}`);
    } catch (error) {
      toast.error('Failed to create API key', {
        description: 'Please try again or contact support if the problem persists.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <Icon name="arrow-left" className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create API Key</h1>
          <p className="text-muted-foreground">
            Generate a new API key for your applications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 min-h-[calc(100vh-12rem)]">
        {/* Main Form */}
        <div className="flex flex-col">
          <form onSubmit={handleSubmit} className="space-y-6 flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="key" className="w-5 h-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Provide basic details about your API key
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Key Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Production App Key"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What will this key be used for?"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment">Environment *</Label>
              <Select
                value={formData.environment}
                onValueChange={(value) => setFormData(prev => ({ ...prev, environment: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {environments.map((env) => (
                    <SelectItem key={env.value} value={env.value}>
                      <div>
                        <div className="font-medium">{env.label}</div>
                        <div className="text-sm text-muted-foreground">{env.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={formData.expiresAt}
                onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                min={new Date().toISOString().slice(0, 16)}
              />
              <p className="text-sm text-muted-foreground">
                Leave empty for a key that never expires
              </p>
            </div>
          </CardContent>
        </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="shield" className="w-5 h-5" />
                Permissions & Scopes
              </CardTitle>
              <CardDescription>
                Select the scopes and permissions for this API key. Fleet-scoped permissions provide granular control.
              </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-6">
              {/* Basic Scopes */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Basic Scopes</h4>
                <div className="space-y-3">
                  {availableScopes.filter(scope => scope.category === 'basic').map((scope) => (
                    <div key={scope.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Checkbox
                        id={scope.id}
                        checked={formData.scopes.includes(scope.id)}
                        onCheckedChange={(checked) => handleScopeChange(scope.id, checked as boolean)}
                      />
                      <div className="flex-1 min-w-0">
                        <Label htmlFor={scope.id} className="text-sm font-medium cursor-pointer">
                          {scope.name}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {scope.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {scope.id}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fleet-Scoped Permissions */}
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="target" className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-semibold text-blue-900">Fleet-Scoped Permissions</h4>
                    <Badge variant="default" className="text-xs bg-blue-600 text-white">
                      🚀 Innovation
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs text-blue-700 border-blue-300">
                    {formData.scopes.filter(s => s.includes('[fleet.')).length} selected
                  </Badge>
                </div>
                <div className="mb-3 p-3 bg-blue-100 rounded-lg">
                  <p className="text-xs text-blue-800">
                    🎯 <strong>Smart Fleet Control:</strong> Restrict access to specific regions, vehicle types, or depots for enhanced security.
                  </p>
                </div>
                <div className="space-y-3">
                  {availableScopes.filter(scope => scope.category === 'fleet').map((scope) => (
                    <div key={scope.id} className="flex items-start gap-3 p-3 border-2 border-blue-200 rounded-lg bg-blue-50">
                      <Checkbox
                        id={scope.id}
                        checked={formData.scopes.includes(scope.id)}
                        onCheckedChange={(checked) => handleScopeChange(scope.id, checked as boolean)}
                      />
                      <div className="flex-1 min-w-0">
                        <Label htmlFor={scope.id} className="text-sm font-medium cursor-pointer text-blue-900">
                          {scope.name}
                        </Label>
                        <p className="text-sm text-blue-700 mt-1">
                          {scope.description}
                        </p>
                      </div>
                      <Badge variant="default" className="text-xs bg-blue-600 text-white">
                        {scope.id}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {formData.scopes.length > 0 && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-2">Selected Permissions:</div>
                <div className="flex flex-wrap gap-2">
                  {formData.scopes.map((scopeId) => {
                    const scope = availableScopes.find(s => s.id === scopeId);
                    return (
                      <Badge key={scopeId} variant="default" className="text-xs">
                        {scope?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <Icon name="alert-triangle" className="w-5 h-5" />
              Security Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-800 dark:text-amber-200 space-y-2">
            <p className="text-sm">
              • Keep your API key secure and never share it publicly
            </p>
            <p className="text-sm">
              • Store the key securely - you won't be able to view it again
            </p>
            <p className="text-sm">
              • Rotate keys regularly for enhanced security
            </p>
            <p className="text-sm">
              • Use environment-specific keys for different deployment stages
            </p>
          </CardContent>
        </Card>

          </form>
          
          {/* Sticky Action Buttons */}
          <div className="sticky bottom-0 bg-background border-t p-4 mt-6">
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Icon name="key" className="w-4 h-4 mr-2" />
                    Create API Key
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Preview & Tips */}
        <div className="space-y-6">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Icon name="lightbulb" className="w-5 h-5" />
                Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-blue-800">
                <strong>Recommended for {formData.environment}:</strong>
              </div>
              {formData.environment === 'production' && (
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">read:telemetry[fleet.region=west]</Badge>
                  <Badge variant="outline" className="text-xs">read:vehicles[fleet.type=truck]</Badge>
                  <p className="text-xs text-blue-700">
                    Use fleet-scoped permissions for better security in production
                  </p>
                </div>
              )}
              {formData.environment === 'development' && (
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">vehicles:read</Badge>
                  <Badge variant="outline" className="text-xs">analytics:read</Badge>
                  <p className="text-xs text-blue-700">
                    Broader permissions for development and testing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="shield-check" className="w-5 h-5" />
                Security Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Security Level:</span>
                  <Badge variant={formData.scopes.some(s => s.includes('[fleet.')) ? "default" : "secondary"}>
                    {formData.scopes.some(s => s.includes('[fleet.')) ? "High" : "Standard"}
                  </Badge>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Scope Count:</span>
                  <span>{formData.scopes.length}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Fleet-Scoped:</span>
                  <span>{formData.scopes.filter(s => s.includes('[fleet.')).length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Icon name="alert-triangle" className="w-5 h-5" />
                Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-800 space-y-2">
              <div className="text-sm space-y-1">
                <p>• Use environment-specific keys</p>
                <p>• Set expiration dates for temporary access</p>
                <p>• Prefer fleet-scoped permissions</p>
                <p>• Rotate keys regularly (90 days)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 