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
  { id: 'vehicles:read', name: 'Read Vehicles', description: 'Access vehicle information and telemetry data' },
  { id: 'vehicles:write', name: 'Write Vehicles', description: 'Update vehicle information and settings' },
  { id: 'routes:read', name: 'Read Routes', description: 'Access route optimization and planning' },
  { id: 'routes:write', name: 'Write Routes', description: 'Create and modify routes' },
  { id: 'analytics:read', name: 'Read Analytics', description: 'Access fleet analytics and reports' },
  { id: 'maintenance:read', name: 'Read Maintenance', description: 'Access maintenance schedules and records' },
  { id: 'maintenance:write', name: 'Write Maintenance', description: 'Update maintenance records' }
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

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
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
            <CardTitle>Permissions</CardTitle>
            <CardDescription>
              Select the scopes and permissions for this API key
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableScopes.map((scope) => (
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

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
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
      </form>
    </div>
  );
} 