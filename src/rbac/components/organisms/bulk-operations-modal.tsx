"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Toast } from "@/components/ui/toast";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Upload
} from "lucide-react";
import type { User, Role, BulkOperation, BulkOperationResult } from "@/rbac/types";

type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

interface BulkOperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUsers: User[];
  availableRoles: Role[];
  onBulkOperation: (operation: BulkOperation) => Promise<BulkOperationResult>;
}

type BulkOperationType = 'assign_role' | 'remove_role' | 'grant_permission' | 'revoke_permission' | 'activate' | 'deactivate';

interface OperationProgress {
  total: number;
  completed: number;
  failed: number;
  status: 'idle' | 'running' | 'completed' | 'failed';
  errors: string[];
}

export function BulkOperationsModal({
  isOpen,
  onClose,
  selectedUsers,
  availableRoles,
  onBulkOperation
}: BulkOperationsModalProps) {
  const [selectedOperation, setSelectedOperation] = React.useState<BulkOperationType>('assign_role');
  const [selectedRoleId, setSelectedRoleId] = React.useState<string>('');
  const [progress, setProgress] = React.useState<OperationProgress>({
    total: 0,
    completed: 0,
    failed: 0,
    status: 'idle',
    errors: []
  });
  const [showPreview, setShowPreview] = React.useState(false);

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setProgress({
        total: 0,
        completed: 0,
        failed: 0,
        status: 'idle',
        errors: []
      });
      setSelectedOperation('assign_role');
      setSelectedRoleId('');
      setShowPreview(false);
    }
  }, [isOpen]);

  const getOperationConfig = (operation: BulkOperationType) => {
    switch (operation) {
      case 'assign_role':
        return {
          title: 'Assign Role',
          description: 'Change the role for selected users',
          icon: Shield,
          color: 'blue',
          requiresRole: true,
          riskLevel: 'medium' as RiskLevel
        };
      case 'remove_role':
        return {
          title: 'Remove Role',
          description: 'Remove role from selected users',
          icon: Shield,
          color: 'orange',
          requiresRole: true,
          riskLevel: 'high' as RiskLevel
        };
      case 'grant_permission':
        return {
          title: 'Grant Permission',
          description: 'Grant specific permissions to users',
          icon: CheckCircle,
          color: 'green',
          requiresRole: false,
          riskLevel: 'medium' as RiskLevel
        };
      case 'revoke_permission':
        return {
          title: 'Revoke Permission',
          description: 'Remove specific permissions from users',
          icon: XCircle,
          color: 'orange',
          requiresRole: false,
          riskLevel: 'high' as RiskLevel
        };
      case 'activate':
        return {
          title: 'Activate Users',
          description: 'Activate selected user accounts',
          icon: CheckCircle,
          color: 'green',
          requiresRole: false,
          riskLevel: 'low' as RiskLevel
        };
      case 'deactivate':
        return {
          title: 'Deactivate Users',
          description: 'Deactivate selected user accounts',
          icon: XCircle,
          color: 'orange',
          requiresRole: false,
          riskLevel: 'high' as RiskLevel
        };
    }
  };

  const config = getOperationConfig(selectedOperation);
  const Icon = config.icon;

  const canExecute = React.useMemo(() => {
    if (selectedUsers.length === 0) return false;
    if (config.requiresRole && !selectedRoleId) return false;
    return true;
  }, [selectedUsers.length, config.requiresRole, selectedRoleId]);

  const handleExecute = async () => {
    if (!canExecute) return;

    setProgress({
      total: selectedUsers.length,
      completed: 0,
      failed: 0,
      status: 'running',
      errors: []
    });

    try {
      const operation: BulkOperation = {
        type: selectedOperation,
        userIds: selectedUsers.map(u => u.id),
        roleId: selectedRoleId || undefined,
        reason: `Bulk ${selectedOperation} operation via admin panel`
      };

      // Simulate progress with delays
      for (let i = 0; i < selectedUsers.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
        
        setProgress(prev => ({
          ...prev,
          completed: i + 1
        }));
      }

      const result = await onBulkOperation(operation);
      
      setProgress(prev => ({
        ...prev,
        status: result.success ? 'completed' : 'failed',
        failed: result.errors?.length || 0,
        errors: result.errors?.map(e => e.error) || []
      }));

    } catch (error) {
      setProgress(prev => ({
        ...prev,
        status: 'failed',
        failed: selectedUsers.length,
        errors: ['Operation failed: ' + (error as Error).message]
      }));
    }
  };

  const getImpactPreview = () => {
    if (selectedOperation === 'assign_role' && selectedRoleId) {
      const role = availableRoles.find(r => r.id === selectedRoleId);
      const currentRoles = [...new Set(selectedUsers.map(u => u.role.name))];
      
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Impact Preview:</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• {selectedUsers.length} users will be assigned "{role?.name}" role</div>
            <div>• Current roles: {currentRoles.join(', ')}</div>
            <div>• Permissions will be updated according to new role</div>
            <div>• All changes will be logged for audit trail</div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Impact Preview:</h4>
        <div className="text-sm text-muted-foreground">
          This operation will affect {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}.
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Operations
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Selected Users Summary */}
          <Card variant="frostedGlass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Selected Users ({selectedUsers.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {selectedUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar src={user.avatar} fallback={user.avatar || user.name.slice(0, 2)} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <RoleIndicator role={user.role} size="sm" />
                </div>
              ))}
              {selectedUsers.length > 3 && (
                <div className="text-sm text-muted-foreground text-center pt-2">
                  +{selectedUsers.length - 3} more users
                </div>
              )}
            </CardContent>
          </Card>

          {/* Operation Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Operation</label>
              <Select value={selectedOperation} onValueChange={(value) => setSelectedOperation(value as BulkOperationType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assign_role">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Assign Role
                    </div>
                  </SelectItem>
                  <SelectItem value="remove_role">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Remove Role
                    </div>
                  </SelectItem>
                  <SelectItem value="grant_permission">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Grant Permission
                    </div>
                  </SelectItem>
                  <SelectItem value="revoke_permission">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Revoke Permission
                    </div>
                  </SelectItem>
                  <SelectItem value="activate">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Activate Users
                    </div>
                  </SelectItem>
                  <SelectItem value="deactivate">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Deactivate Users
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Role Selection (if needed) */}
            {config.requiresRole && (
              <div>
                <label className="text-sm font-medium mb-2 block">Select Role</label>
                <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        <div className="flex items-center gap-2">
                          <Badge variant={role.color}>
                            {role.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            ({role.userCount} users)
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Risk Level Warning */}
            {(config.riskLevel === 'high' || config.riskLevel === 'critical') && (
              <div className={cn(
                "p-3 rounded-lg border",
                config.riskLevel === 'critical' ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"
              )}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={cn(
                    "h-4 w-4",
                    config.riskLevel === 'critical' ? "text-red-600" : "text-orange-600"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    config.riskLevel === 'critical' ? "text-red-800" : "text-orange-800"
                  )}>
                    {config.riskLevel === 'critical' ? 'Critical Risk Operation' : 'High Risk Operation'}
                  </span>
                </div>
                <p className={cn(
                  "text-sm mt-1",
                  config.riskLevel === 'critical' ? "text-red-700" : "text-orange-700"
                )}>
                  This operation cannot be undone. Please verify your selection carefully.
                </p>
              </div>
            )}
          </div>

          {/* Impact Preview */}
          {canExecute && (
            <Card variant="frostedGlass">
              <CardContent className="p-4">
                {getImpactPreview()}
              </CardContent>
            </Card>
          )}

          {/* Progress Display */}
          {progress.status !== 'idle' && (
            <Card variant="frostedGlass">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {progress.status === 'running' && <Clock className="h-4 w-4 animate-spin" />}
                  {progress.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {progress.status === 'failed' && <XCircle className="h-4 w-4 text-red-600" />}
                  Operation Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress.completed}/{progress.total}</span>
                  </div>
                  <Progress value={(progress.completed / progress.total) * 100} />
                </div>

                {progress.status === 'completed' && (
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Operation completed successfully</span>
                    </div>
                    {progress.failed > 0 && (
                      <div className="text-orange-600">
                        {progress.failed} user(s) failed to process
                      </div>
                    )}
                  </div>
                )}

                {progress.errors.length > 0 && (
                  <div className="space-y-2">
                    <Separator />
                    <div className="text-sm text-red-600">
                      <div className="font-medium mb-1">Errors:</div>
                      {progress.errors.map((error, index) => (
                        <div key={index} className="text-xs">• {error}</div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={progress.status === 'running'}
            >
              {progress.status === 'completed' ? 'Close' : 'Cancel'}
            </Button>
            <Button
              onClick={handleExecute}
              disabled={!canExecute || progress.status === 'running'}
              className="flex-1 gap-2"
            >
              {progress.status === 'running' ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Icon className="h-4 w-4" />
                  Execute
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 