"use client";

import * as React from "react";
import { mockUsers, mockRoles } from "@/rbac/utils/mock-data";
import type { User, UserFilters, BulkOperation, BulkOperationResult } from "@/rbac/types";

export interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  filters: UserFilters;
  setFilters: (filters: UserFilters) => void;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  bulkUpdateUsers: (operation: BulkOperation) => Promise<BulkOperationResult>;
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<User>;
  refreshUsers: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<UserFilters>({});

  // Simulate API delay for realistic loading states
  const simulateApiDelay = (minMs: number = 800, maxMs: number = 1500) => {
    const delay = Math.random() * (maxMs - minMs) + minMs;
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  // Initial data load
  const loadUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await simulateApiDelay();
      
      // In a real app, this would be an API call
      setUsers([...mockUsers]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update single user
  const updateUser = React.useCallback(async (updatedUser: User) => {
    try {
      setError(null);
      
      // Simulate API call
      await simulateApiDelay(300, 800);
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === updatedUser.id 
            ? { ...updatedUser, updatedAt: new Date() }
            : user
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  }, []);

  // Delete user
  const deleteUser = React.useCallback(async (userId: string) => {
    try {
      setError(null);
      
      // Simulate API call
      await simulateApiDelay(400, 600);
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      throw err;
    }
  }, []);

  // Bulk operations
  const bulkUpdateUsers = React.useCallback(async (operation: BulkOperation): Promise<BulkOperationResult> => {
    try {
      setError(null);
      
      // Simulate API call with longer delay for bulk operations
      await simulateApiDelay(1000, 2000);
      
      const errors: any[] = [];
      let affectedCount = 0;

      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (!operation.userIds.includes(user.id)) {
            return user;
          }

          try {
            let updatedUser = { ...user, updatedAt: new Date() };

            switch (operation.type) {
              case 'assign_role':
                if (operation.roleId) {
                  const role = mockRoles.find(r => r.id === operation.roleId);
                  if (role) {
                    updatedUser.role = role;
                    affectedCount++;
                  }
                }
                break;
              
              case 'deactivate':
                updatedUser.status = 'inactive';
                affectedCount++;
                break;
                
              case 'activate':
                updatedUser.status = 'active';
                affectedCount++;
                break;
                
              default:
                break;
            }

            return updatedUser;
          } catch (err) {
            errors.push({
              userId: user.id,
              userName: user.name,
              error: err instanceof Error ? err.message : 'Unknown error'
            });
            return user;
          }
        });
      });

      return {
        success: errors.length === 0,
        affectedUsers: affectedCount,
        errors
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform bulk operation');
      throw err;
    }
  }, []);

  // Add new user
  const addUser = React.useCallback(async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    try {
      setError(null);
      
      // Simulate API call
      await simulateApiDelay(600, 1000);
      
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setUsers(prevUsers => [...prevUsers, newUser]);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add user');
      throw err;
    }
  }, []);

  // Refresh users (for manual refresh)
  const refreshUsers = React.useCallback(async () => {
    await loadUsers();
  }, [loadUsers]);

  // Load users on mount
  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
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
  };
} 