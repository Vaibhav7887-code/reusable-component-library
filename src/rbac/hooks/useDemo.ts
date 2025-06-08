"use client";

import * as React from "react";

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  category: 'onboarding' | 'bulk-ops' | 'emergency' | 'troubleshooting' | 'audit' | 'drift';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: DemoStep[];
  outcomes: string[];
}

interface DemoStep {
  id: string;
  title: string;
  description: string;
  action: string;
  tips?: string[];
  expectedResult: string;
  completed?: boolean;
}

interface DemoState {
  isDemoMode: boolean;
  currentScenario: DemoScenario | null;
  currentStep: number;
  isPlaying: boolean;
  completedScenarios: string[];
  userProgress: Record<string, number>;
  showHints: boolean;
  autoAdvance: boolean;
}

interface UseDemoReturn {
  state: DemoState;
  scenarios: DemoScenario[];
  startScenario: (scenarioId: string) => void;
  stopDemo: () => void;
  nextStep: () => void;
  previousStep: () => void;
  jumpToStep: (stepIndex: number) => void;
  markStepCompleted: (stepIndex: number) => void;
  toggleDemoMode: () => void;
  resetScenario: () => void;
  completeScenario: () => void;
  toggleHints: () => void;
  toggleAutoAdvance: () => void;
  getScenarioProgress: (scenarioId: string) => number;
  isScenarioCompleted: (scenarioId: string) => boolean;
  getRecommendedScenarios: () => DemoScenario[];
}

// Mock demo scenarios data
const demoScenarios: DemoScenario[] = [
  {
    id: 'new-driver-onboarding',
    title: 'New Driver Onboarding',
    description: 'Complete workflow for onboarding a new driver with proper role assignment and permissions',
    category: 'onboarding',
    duration: '3-5 minutes',
    difficulty: 'beginner',
    steps: [
      {
        id: 'create-user',
        title: 'Create User Account',
        description: 'Add new driver to the system with basic information',
        action: 'Click "Add User" and fill driver details',
        tips: ['Use realistic Indian names', 'Include proper employee ID format'],
        expectedResult: 'User appears in table with inactive status'
      },
      {
        id: 'assign-role',
        title: 'Assign Driver Role',
        description: 'Select appropriate driver role with standard permissions',
        action: 'Open user edit panel and select "Driver" role',
        tips: ['Watch how permissions auto-populate', 'Note the safety warnings'],
        expectedResult: 'User gets view access to EV and Fuel modules'
      },
      {
        id: 'activate-account',
        title: 'Activate Account',
        description: 'Enable the user account for system access',
        action: 'Change status from inactive to active',
        expectedResult: 'User can now log in and access assigned modules'
      },
      {
        id: 'verify-permissions',
        title: 'Verify Access',
        description: 'Use "Preview as User" to confirm proper access levels',
        action: 'Click "Preview Interface" to see user view',
        expectedResult: 'Interface shows only driver-appropriate features'
      }
    ],
    outcomes: [
      'New driver has appropriate vehicle access',
      'Safety permissions are properly restricted',
      'Audit trail shows complete onboarding process',
      'User can perform daily driving tasks'
    ]
  },
  {
    id: 'bulk-role-assignment',
    title: 'Bulk Role Assignment',
    description: 'Efficiently assign roles to multiple users during fleet expansion',
    category: 'bulk-ops',
    duration: '2-3 minutes',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'select-users',
        title: 'Multi-User Selection',
        description: 'Select multiple users for bulk operation',
        action: 'Use checkboxes to select 5-10 users',
        tips: ['Use Shift+click for range selection', 'Check role compatibility'],
        expectedResult: 'Bulk action bar appears with operation options'
      },
      {
        id: 'choose-operation',
        title: 'Select Bulk Operation',
        description: 'Choose role assignment from bulk operations menu',
        action: 'Click "Bulk Operations" and select "Assign Role"',
        expectedResult: 'Bulk operations modal opens'
      },
      {
        id: 'impact-preview',
        title: 'Review Impact',
        description: 'Analyze the impact of role changes before execution',
        action: 'Review which permissions will change for each user',
        tips: ['Check for permission conflicts', 'Note security warnings'],
        expectedResult: 'Clear preview of all permission changes'
      },
      {
        id: 'execute-operation',
        title: 'Execute Changes',
        description: 'Apply role changes with progress tracking',
        action: 'Click "Execute" and watch progress indicator',
        expectedResult: 'All users updated with new roles and permissions'
      }
    ],
    outcomes: [
      'Multiple users updated efficiently',
      'No permission conflicts or security issues',
      'Complete audit trail of bulk changes',
      'Time saved compared to individual updates'
    ]
  },
  {
    id: 'emergency-access',
    title: 'Emergency Access Management',
    description: 'Grant temporary elevated access during critical incidents',
    category: 'emergency',
    duration: '1-2 minutes',
    difficulty: 'advanced',
    steps: [
      {
        id: 'identify-incident',
        title: 'Incident Detection',
        description: 'Recognize need for emergency access escalation',
        action: 'Simulated: Vehicle breakdown requires immediate admin access',
        expectedResult: 'Emergency access request identified'
      },
      {
        id: 'grant-emergency-access',
        title: 'Grant Break-Glass Access',
        description: 'Provide temporary elevated permissions',
        action: 'Use emergency access panel to grant admin permissions',
        tips: ['Set time limits', 'Require justification', 'Auto-audit trail'],
        expectedResult: 'User has temporary admin access for 2 hours'
      },
      {
        id: 'monitor-usage',
        title: 'Monitor Access Usage',
        description: 'Track how emergency access is being used',
        action: 'Watch real-time activity in audit log',
        expectedResult: 'All emergency actions are logged and monitored'
      },
      {
        id: 'auto-revocation',
        title: 'Automatic Revocation',
        description: 'System automatically removes elevated access',
        action: 'Wait for time limit expiration or manual revocation',
        expectedResult: 'User access returns to normal level automatically'
      }
    ],
    outcomes: [
      'Critical incident resolved quickly',
      'Security maintained through time limits',
      'Complete audit trail for compliance',
      'No lingering elevated permissions'
    ]
  },
  {
    id: 'permission-troubleshooting',
    title: 'Permission Troubleshooting',
    description: 'Diagnose and resolve user access issues quickly',
    category: 'troubleshooting',
    duration: '2-4 minutes',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'identify-issue',
        title: 'Issue Identification',
        description: 'User reports inability to access vehicle assignments',
        action: 'Search for user and examine current permissions',
        expectedResult: 'User found with incomplete permission set'
      },
      {
        id: 'analyze-permissions',
        title: 'Permission Analysis',
        description: 'Compare current vs expected permissions for role',
        action: 'Use permission matrix to identify gaps',
        tips: ['Check role defaults', 'Look for custom changes', 'Review recent modifications'],
        expectedResult: 'Missing "vehicle_assign" permission identified'
      },
      {
        id: 'preview-solution',
        title: 'Solution Preview',
        description: 'Test proposed fix before applying',
        action: 'Use "Preview as User" to simulate interface with fix',
        expectedResult: 'Preview shows user would have proper access'
      },
      {
        id: 'apply-fix',
        title: 'Apply Resolution',
        description: 'Grant missing permission and verify fix',
        action: 'Add missing permission and test user interface',
        expectedResult: 'User can now access vehicle assignment feature'
      }
    ],
    outcomes: [
      'User access issue resolved quickly',
      'Root cause identified and documented',
      'Similar issues prevented in future',
      'User productivity restored'
    ]
  },
  {
    id: 'compliance-audit',
    title: 'Compliance Audit Simulation',
    description: 'Generate audit reports and evidence for compliance review',
    category: 'audit',
    duration: '3-5 minutes',
    difficulty: 'advanced',
    steps: [
      {
        id: 'audit-preparation',
        title: 'Audit Preparation',
        description: 'Prepare for quarterly compliance review',
        action: 'Navigate to audit dashboard and select date range',
        expectedResult: 'Audit interface shows 3-month data scope'
      },
      {
        id: 'generate-reports',
        title: 'Generate Reports',
        description: 'Create compliance reports for external auditors',
        action: 'Generate user access matrix and change log reports',
        tips: ['Include all modules', 'Export with timestamps', 'Add digital signatures'],
        expectedResult: 'Comprehensive audit package ready for download'
      },
      {
        id: 'violation-analysis',
        title: 'Violation Analysis',
        description: 'Identify and document any compliance violations',
        action: 'Review flagged users and permission anomalies',
        expectedResult: 'List of violations with remediation plans'
      },
      {
        id: 'remediation-tracking',
        title: 'Remediation Tracking',
        description: 'Document fixes and improvements made',
        action: 'Apply fixes and generate updated compliance status',
        expectedResult: 'Clean compliance report with documented remediation'
      }
    ],
    outcomes: [
      'Audit-ready documentation generated',
      'All compliance violations addressed',
      'Evidence package for certifications',
      'Continuous compliance monitoring established'
    ]
  },
  {
    id: 'access-drift-cleanup',
    title: 'Access Drift Detection & Cleanup',
    description: 'Identify and resolve permission drift across user accounts',
    category: 'drift',
    duration: '4-6 minutes',
    difficulty: 'advanced',
    steps: [
      {
        id: 'drift-detection',
        title: 'Detect Permission Drift',
        description: 'Scan for users whose permissions deviate from role defaults',
        action: 'Run access drift analyzer on all users',
        expectedResult: 'List of 12 users with permission anomalies'
      },
      {
        id: 'analyze-drift',
        title: 'Analyze Drift Patterns',
        description: 'Understand why permissions drifted from standards',
        action: 'Review drift reasons and risk assessment',
        tips: ['Check for legitimate business needs', 'Identify security risks', 'Look for patterns'],
        expectedResult: 'Categorized drift: 8 legitimate, 4 cleanup needed'
      },
      {
        id: 'bulk-cleanup',
        title: 'Bulk Drift Cleanup',
        description: 'Reset inappropriate permissions to role defaults',
        action: 'Select problem users and bulk reset to role defaults',
        expectedResult: '4 users reset to proper permission levels'
      },
      {
        id: 'monitoring-setup',
        title: 'Setup Ongoing Monitoring',
        description: 'Configure automated drift detection alerts',
        action: 'Set drift thresholds and notification preferences',
        expectedResult: 'Automated monitoring prevents future drift accumulation'
      }
    ],
    outcomes: [
      'Permission drift reduced by 85%',
      'Security posture improved significantly',
      'Automated monitoring prevents future drift',
      'Users have appropriate access levels'
    ]
  }
];

export function useDemo(): UseDemoReturn {
  const [state, setState] = React.useState<DemoState>({
    isDemoMode: false,
    currentScenario: null,
    currentStep: 0,
    isPlaying: false,
    completedScenarios: [],
    userProgress: {},
    showHints: true,
    autoAdvance: false
  });

  const startScenario = React.useCallback((scenarioId: string) => {
    const scenario = demoScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    setState(prev => ({
      ...prev,
      isDemoMode: true,
      currentScenario: scenario,
      currentStep: 0,
      isPlaying: true
    }));
  }, []);

  const stopDemo = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      isDemoMode: false,
      currentScenario: null,
      currentStep: 0,
      isPlaying: false
    }));
  }, []);

  const nextStep = React.useCallback(() => {
    setState(prev => {
      if (!prev.currentScenario) return prev;
      
      const nextStepIndex = Math.min(
        prev.currentStep + 1, 
        prev.currentScenario.steps.length - 1
      );

      return {
        ...prev,
        currentStep: nextStepIndex
      };
    });
  }, []);

  const previousStep = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  const jumpToStep = React.useCallback((stepIndex: number) => {
    setState(prev => {
      if (!prev.currentScenario) return prev;
      
      const validStepIndex = Math.max(
        0, 
        Math.min(stepIndex, prev.currentScenario.steps.length - 1)
      );

      return {
        ...prev,
        currentStep: validStepIndex
      };
    });
  }, []);

  const markStepCompleted = React.useCallback((stepIndex: number) => {
    setState(prev => {
      if (!prev.currentScenario) return prev;

      const scenarioProgress = {
        ...prev.userProgress,
        [prev.currentScenario.id]: Math.max(
          prev.userProgress[prev.currentScenario.id] || 0,
          stepIndex + 1
        )
      };

      return {
        ...prev,
        userProgress: scenarioProgress
      };
    });
  }, []);

  const toggleDemoMode = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      isDemoMode: !prev.isDemoMode
    }));
  }, []);

  const resetScenario = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 0,
      isPlaying: false
    }));
  }, []);

  const completeScenario = React.useCallback(() => {
    setState(prev => {
      if (!prev.currentScenario) return prev;

      const newCompletedScenarios = prev.completedScenarios.includes(prev.currentScenario.id)
        ? prev.completedScenarios
        : [...prev.completedScenarios, prev.currentScenario.id];

      return {
        ...prev,
        completedScenarios: newCompletedScenarios,
        userProgress: {
          ...prev.userProgress,
          [prev.currentScenario.id]: prev.currentScenario.steps.length
        }
      };
    });
  }, []);

  const toggleHints = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      showHints: !prev.showHints
    }));
  }, []);

  const toggleAutoAdvance = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      autoAdvance: !prev.autoAdvance
    }));
  }, []);

  const getScenarioProgress = React.useCallback((scenarioId: string) => {
    const scenario = demoScenarios.find(s => s.id === scenarioId);
    if (!scenario) return 0;
    
    const progress = state.userProgress[scenarioId] || 0;
    return (progress / scenario.steps.length) * 100;
  }, [state.userProgress]);

  const isScenarioCompleted = React.useCallback((scenarioId: string) => {
    return state.completedScenarios.includes(scenarioId);
  }, [state.completedScenarios]);

  const getRecommendedScenarios = React.useCallback(() => {
    // Recommend scenarios based on completed ones and difficulty
    const completedCount = state.completedScenarios.length;
    
    if (completedCount === 0) {
      // Start with beginner scenarios
      return demoScenarios.filter(s => s.difficulty === 'beginner');
    } else if (completedCount < 3) {
      // Move to intermediate scenarios
      return demoScenarios.filter(s => 
        s.difficulty === 'intermediate' && 
        !state.completedScenarios.includes(s.id)
      );
    } else {
      // Advanced scenarios
      return demoScenarios.filter(s => 
        s.difficulty === 'advanced' && 
        !state.completedScenarios.includes(s.id)
      );
    }
  }, [state.completedScenarios]);

  return {
    state,
    scenarios: demoScenarios,
    startScenario,
    stopDemo,
    nextStep,
    previousStep,
    jumpToStep,
    markStepCompleted,
    toggleDemoMode,
    resetScenario,
    completeScenario,
    toggleHints,
    toggleAutoAdvance,
    getScenarioProgress,
    isScenarioCompleted,
    getRecommendedScenarios
  };
} 