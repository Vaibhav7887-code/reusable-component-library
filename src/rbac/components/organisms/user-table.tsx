"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { RoleIndicator } from "@/rbac/components/atoms/role-indicator";
import { StatusDot } from "@/rbac/components/atoms/status-dot";
import { cn } from "@/lib/utils";
import { Search, MoreHorizontal, Plus, Download, Users, Filter, Edit, Eye, Trash2, UserX, UserCheck } from "lucide-react";
import type { User, UserFilters } from "@/rbac/types";

export interface UserTableProps {
  users: User[];
  loading?: boolean;
  onUserSelect?: (user: User) => void;
  onUserEdit?: (user: User) => void;
  onBulkAction?: (action: string, users: User[]) => void;
  onAddUser?: () => void;
  filters?: UserFilters;
  onFiltersChange?: (filters: UserFilters) => void;
  className?: string;
}

type SortField = 'name' | 'role' | 'lastLogin' | 'status' | 'department';
type SortDirection = 'asc' | 'desc';

export function UserTable({
  users,
  loading = false,
  onUserSelect,
  onUserEdit,
  onBulkAction,
  onAddUser,
  filters = {},
  onFiltersChange,
  className
}: UserTableProps) {
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = React.useState(filters.search || '');
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 20;

  // Format last login display
  const formatLastLogin = (date: Date | null) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Filter and sort users
  const filteredAndSortedUsers = React.useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.status?.length) {
      filtered = filtered.filter(user => filters.status!.includes(user.status));
    }

    if (filters.roles?.length) {
      filtered = filtered.filter(user => filters.roles!.includes(user.role.id));
    }

    if (filters.departments?.length) {
      filtered = filtered.filter(user => user.department && filters.departments!.includes(user.department));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'role':
          aValue = a.role.name.toLowerCase();
          bValue = b.role.name.toLowerCase();
          break;
        case 'lastLogin':
          aValue = a.lastLogin?.getTime() || 0;
          bValue = b.lastLogin?.getTime() || 0;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'department':
          aValue = a.department || '';
          bValue = b.department || '';
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchQuery, filters, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / pageSize);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle selection
  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Get selected user objects
  const selectedUserObjects = users.filter(user => selectedUsers.includes(user.id));

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="border rounded-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b last:border-b-0">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with Search and Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="fleet_manager">Fleet Manager</SelectItem>
            <SelectItem value="mechanic">Mechanic</SelectItem>
            <SelectItem value="driver">Driver</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="logistics">Logistics</SelectItem>
          </SelectContent>
        </Select>
        
        {onAddUser && (
          <Button onClick={onAddUser} className="gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        )}
      </div>

      {/* Bulk Actions Bar (Conditional) */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-blue-50/50 backdrop-blur-sm border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Assign Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="fleet_manager">Fleet Manager</SelectItem>
                <SelectItem value="mechanic">Mechanic</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="destructive" size="sm">
              Deactivate
            </Button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="border rounded-lg bg-white/10 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded"
                />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('name')}
              >
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('role')}
              >
                Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('lastLogin')}
              >
                Last Login {sortField === 'lastLogin' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('status')}
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow 
                key={user.id}
                className="hover:bg-white/5 cursor-pointer"
                onClick={() => onUserSelect?.(user)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                    className="rounded"
                  />
                </TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <RoleIndicator role={user.role} size="sm" />
                  {user.modules.length > 3 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      +{user.modules.length - 3}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatLastLogin(user.lastLogin)}</span>
                </TableCell>
                <TableCell>
                  <StatusDot status={user.status} showLabel />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onUserEdit?.(user)} className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUserSelect?.(user)} className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => console.log('Toggle status', user)} 
                        className="gap-2"
                      >
                        {user.status === 'active' ? (
                          <>
                            <UserX className="h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => console.log('Delete user', user)} 
                        className="gap-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * pageSize + 1, filteredAndSortedUsers.length)}-{Math.min(currentPage * pageSize, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} users
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ←
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          })}
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
} 