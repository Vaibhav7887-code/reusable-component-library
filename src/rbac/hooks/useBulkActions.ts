"use client";

import * as React from "react";
import type { 
  User, 
  Role, 
  BulkOperation, 
  BulkOperationResult, 
  BulkOperationError 
} from "@/rbac/types";

interface BulkActionsState {
  selectedUsers: User[];
  isProcessing: boolean;
  progress: {
    total: number;
    completed: number;
    failed: number;
  };
  errors: BulkOperationError[];
  lastOperation: BulkOperation | null;
}

interface UseBulkActionsReturn {
  state: BulkActionsState;
  selectUser: (user: User) => void;
  deselectUser: (userId: string) => void;
  selectAll: (users: User[]) => void;
  clearSelection: () => void;
  toggleUser: (user: User) => void;
  executeBulkOperation: (operation: Omit<BulkOperation, 'userIds'>) => Promise<BulkOperationResult>;
  isUserSelected: (userId: string) => boolean;
  canExecuteOperation: (operationType: BulkOperation['type']) => boolean;
}

// Simulate realistic delays for different operations
const getOperationDelay = (operationType: BulkOperation['type']): number => {
  switch (operationType) {
    case 'assign_role': return 800;
    case 'activate': return 400;
    case 'deactivate': return 400;
    case 'grant_permission': return 600;
    case 'revoke_permission': return 600;
    default: return 500;
  }
};

// Simulate operation success rates (for demo purposes)
const getSuccessRate = (operationType: BulkOperation['type']): number => {
  switch (operationType) {
    case 'assign_role': return 0.95; // 5% chance of conflict
    case 'activate': return 0.98;
    case 'deactivate': return 0.98;
    case 'grant_permission': return 0.92; // Higher chance of conflicts
    case 'revoke_permission': return 0.96;
    default: return 0.95;
  }
};

// Mock error messages for failed operations
const generateErrorMessage = (
  operationType: BulkOperation['type'], 
  user: User
): string => {
  const errors = {
    assign_role: [
      'User has conflicting permissions that prevent role assignment',
      'Role assignment would violate security policy',
      'User account is in a locked state'
    ],
    remove_role: [
      'Cannot remove role: user has active sessions',
      'Role removal would violate minimum permission requirements'
    ],
    activate: [
      'User account has pending security review',
      'Missing required onboarding steps'
    ],
    deactivate: [
      'User has active sessions that must be terminated first',
      'User owns critical resources that need reassignment'
    ],
    grant_permission: [
      'Permission conflicts with existing role restrictions',
      'User lacks prerequisite permissions'
    ],
    revoke_permission: [
      'Permission is required by user\'s current role',
      'Permission removal would break existing workflows'
    ]
  };

  const possibleErrors = errors[operationType] || ['Operation failed due to unknown error'];
  return possibleErrors[Math.floor(Math.random() * possibleErrors.length)];
};

export function useBulkActions(): UseBulkActionsReturn {
  const [state, setState] = React.useState<BulkActionsState>({
    selectedUsers: [],
    isProcessing: false,
    progress: { total: 0, completed: 0, failed: 0 },
    errors: [],
    lastOperation: null
  });

  const selectUser = React.useCallback((user: User) => {
    setState(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.find(u => u.id === user.id) 
        ? prev.selectedUsers 
        : [...prev.selectedUsers, user]
    }));
  }, []);

  const deselectUser = React.useCallback((userId: string) => {
    setState(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.filter(u => u.id !== userId)
    }));
  }, []);

  const selectAll = React.useCallback((users: User[]) => {
    setState(prev => ({
      ...prev,
      selectedUsers: users
    }));
  }, []);

  const clearSelection = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedUsers: []
    }));
  }, []);

  const toggleUser = React.useCallback((user: User) => {
    setState(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.find(u => u.id === user.id)
        ? prev.selectedUsers.filter(u => u.id !== user.id)
        : [...prev.selectedUsers, user]
    }));
  }, []);

  const isUserSelected = React.useCallback((userId: string) => {
    return state.selectedUsers.some(u => u.id === userId);
  }, [state.selectedUsers]);

  const canExecuteOperation = React.useCallback((operationType: BulkOperation['type']) => {
    if (state.selectedUsers.length === 0) return false;
    if (state.isProcessing) return false;

    // Add specific business rules for different operations
    switch (operationType) {
      case 'activate':
        return state.selectedUsers.some(u => u.status === 'inactive');
      case 'deactivate':
        return state.selectedUsers.some(u => u.status === 'active');
      default:
        return true;
    }
  }, [state.selectedUsers, state.isProcessing]);

  const executeBulkOperation = React.useCallback(async (
    operation: Omit<BulkOperation, 'userIds'>
  ): Promise<BulkOperationResult> => {
    if (!canExecuteOperation(operation.type)) {
      throw new Error('Cannot execute operation: invalid state or selection');
    }

    const fullOperation: BulkOperation = {
      ...operation,
      userIds: state.selectedUsers.map(u => u.id)
    };

    setState(prev => ({
      ...prev,
      isProcessing: true,
      progress: { total: prev.selectedUsers.length, completed: 0, failed: 0 },
      errors: [],
      lastOperation: fullOperation
    }));

    const delay = getOperationDelay(operation.type);
    const successRate = getSuccessRate(operation.type);
    const errors: BulkOperationError[] = [];
    let completed = 0;

    try {
      // Process each user with simulated delay and potential failures
      for (let i = 0; i < state.selectedUsers.length; i++) {
        const user = state.selectedUsers[i];
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 300));
        
        // Simulate success/failure based on success rate
        const success = Math.random() < successRate;
        
        if (success) {
          completed++;
        } else {
          errors.push({
            userId: user.id,
            userName: user.name,
            error: generateErrorMessage(operation.type, user)
          });
        }

        // Update progress
        setState(prev => ({
          ...prev,
          progress: {
            total: prev.selectedUsers.length,
            completed: completed,
            failed: errors.length
          },
          errors: errors
        }));
      }

      const result: BulkOperationResult = {
        success: errors.length === 0,
        affectedUsers: completed,
        errors: errors
      };

      // Complete the operation
      setState(prev => ({
        ...prev,
        isProcessing: false
      }));

      return result;

    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        errors: [{
          userId: 'system',
          userName: 'System',
          error: 'Bulk operation failed: ' + (error as Error).message
        }]
      }));

      throw error;
    }
  }, [state.selectedUsers, canExecuteOperation]);

  return {
    state,
    selectUser,
    deselectUser,
    selectAll,
    clearSelection,
    toggleUser,
    executeBulkOperation,
    isUserSelected,
    canExecuteOperation
  };
} 