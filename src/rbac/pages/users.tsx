"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toast } from "@/components/ui/toast";
import { UserTable } from "@/rbac/components/organisms/user-table";
import { UserCard } from "@/rbac/components/molecules/user-card";
import { UserEditPopup } from "@/rbac/components/organisms/user-edit-popup";
import { BulkOperationsModal } from "@/rbac/components/organisms/bulk-operations-modal";

import { UserOnboardingWizard } from "@/rbac/components/templates/user-onboarding-wizard";
import { useUsers } from "@/rbac/hooks/useUsers";
import { useBulkActions } from "@/rbac/hooks/useBulkActions";
import { useDemo } from "@/rbac/hooks/useDemo";
import { mockRoles, mockModules } from "@/rbac/utils/mock-data";
import { cn } from "@/lib/utils";
import { Users, Shield, AlertTriangle, Activity, Download, RefreshCw, UserPlus, Code } from "lucide-react";
import type { User, BulkOperation, BulkOperationResult } from "@/rbac/types";

export function UserManagementPage() {
  const {
    users,
    loading,
    error,
    filters,
    setFilters,
    updateUser,
    deleteUser,
    bulkUpdateUsers,
    addUser,
    refreshUsers
  } = useUsers();

  const bulkActions = useBulkActions();
  const demo = useDemo();

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);
  const [showToast, setShowToast] = React.useState<string | null>(null);
  const [showBulkModal, setShowBulkModal] = React.useState(false);
  const [showOnboardingWizard, setShowOnboardingWizard] = React.useState(false);


  // Calculate stats
  const stats = React.useMemo(() => {
    const activeUsers = users.filter(u => u.status === 'active').length;
    const inactiveUsers = users.filter(u => u.status === 'inactive').length;
    const suspendedUsers = users.filter(u => u.status === 'suspended').length;
    const recentLogins = users.filter(u => {
      if (!u.lastLogin) return false;
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return u.lastLogin > dayAgo;
    }).length;

    return {
      total: users.length,
      active: activeUsers,
      inactive: inactiveUsers,
      suspended: suspendedUsers,
      recentLogins
    };
  }, [users]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleUserEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUserSave = async (user: User) => {
    try {
      await updateUser(user);
      setShowToast(`${user.name} updated successfully`);
    } catch (error) {
      setShowToast('Failed to update user');
      throw error;
    }
  };

  const handleBulkAction = async (action: string, selectedUsers: User[]) => {
    try {
      // Select users for bulk operations
      bulkActions.selectAll(selectedUsers);
      setShowBulkModal(true);
    } catch (error) {
      setShowToast('Bulk operation failed');
    }
  };

  const handleExecuteBulkOperation = async (operation: BulkOperation): Promise<BulkOperationResult> => {
    try {
      const result = await bulkActions.executeBulkOperation(operation);
      setShowToast(`Bulk operation completed: ${result.affectedUsers} users updated`);
      await refreshUsers(); // Refresh the user list
      return result;
    } catch (error) {
      setShowToast('Bulk operation failed');
      throw error;
    }
  };

  const handleAddUser = () => {
    setShowOnboardingWizard(true);
  };

  const handleUserCreated = async (newUser: User) => {
    setShowToast(`${newUser.name} has been successfully onboarded!`);
    await refreshUsers();
  };

  const handleRefresh = async () => {
    await refreshUsers();
    setShowToast('User data refreshed');
  };

  return (
    <div className="container py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage user access, roles, and permissions across FleetEdge modules
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Link href="/tech-admin" legacyBehavior>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                Developer Sandbox
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4">
        <Card variant="frostedGlass" className="flex-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="frostedGlass" className="flex-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="frostedGlass" className="flex-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-500/20 rounded-lg">
                <Users className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.inactive}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="frostedGlass" className="flex-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.suspended}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="frostedGlass" className="flex-1">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.recentLogins}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">Recent Logins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Table */}
        <div className="lg:col-span-3">
          <Card variant="frostedGlass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Users</CardTitle>
              </div>
              <CardDescription>
                Search, filter, and manage user access across all modules
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0" data-tutorial="user-table">
              <UserTable
                users={users}
                loading={loading}
                onUserSelect={handleUserSelect}
                onUserEdit={handleUserEdit}
                onBulkAction={handleBulkAction}
                onAddUser={handleAddUser}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </CardContent>
          </Card>
        </div>

        {/* User Details Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {selectedUser && <UserCard user={selectedUser} onEdit={handleUserEdit} />}

          {/* Quick Actions */}
          {selectedUser && (
            <Card variant="frostedGlass">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">Edit Permissions</Button>
                <Button variant="outline" size="sm" className="w-full justify-start">View Access History</Button>
                <Button variant="outline" size="sm" className="w-full justify-start">Duplicate User</Button>
                <Button variant="destructive" size="sm" className="w-full justify-start">Deactivate User</Button>
              </CardContent>
            </Card>
          )}
          {!selectedUser && (
            <Card className="flex items-center justify-center h-full" variant="frostedGlass">
              <CardContent className="text-center">
                <p className="text-muted-foreground">Select a user to see details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            variant="destructive"
            title="Error"
            description={error}
            onClose={() => {}}
          />
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            variant="default"
            title="Info"
            description={showToast}
            onClose={() => setShowToast(null)}
            duration={3000}
          />
        </div>
      )}



      {/* User Edit Popup */}
      <UserEditPopup
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleUserSave}
        availableRoles={mockRoles}
        availableModules={mockModules}
      />

      {/* Bulk Operations Modal */}
      <BulkOperationsModal
        isOpen={showBulkModal}
        onClose={() => {
          setShowBulkModal(false);
          bulkActions.clearSelection();
        }}
        selectedUsers={bulkActions.state.selectedUsers}
        availableRoles={mockRoles}
        onBulkOperation={handleExecuteBulkOperation}
      />



      {/* User Onboarding Wizard */}
      <UserOnboardingWizard
        isOpen={showOnboardingWizard}
        onClose={() => setShowOnboardingWizard(false)}
        onUserCreated={handleUserCreated}
        availableRoles={mockRoles}
        availableModules={mockModules}
        existingUsers={users}
      />
    </div>
  );
} 