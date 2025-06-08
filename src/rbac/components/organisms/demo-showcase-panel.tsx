"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Users,
  Shield,
  AlertTriangle,
  Search,
  FileDown,
  Activity,
  Target,
  Lightbulb,
  Clock
} from "lucide-react";

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
}

interface DemoShowcasePanelProps {
  className?: string;
  onScenarioStart?: (scenario: DemoScenario) => void;
}

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

export function DemoShowcasePanel({ className, onScenarioStart }: DemoShowcasePanelProps) {
  const [selectedScenario, setSelectedScenario] = React.useState<DemoScenario | null>(null);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Scenarios', icon: Target },
    { id: 'onboarding', label: 'Onboarding', icon: Users },
    { id: 'bulk-ops', label: 'Bulk Operations', icon: Shield },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: Search },
    { id: 'audit', label: 'Audit', icon: FileDown },
    { id: 'drift', label: 'Access Drift', icon: Activity }
  ];

  const filteredScenarios = activeCategory === 'all' 
    ? demoScenarios 
    : demoScenarios.filter(s => s.category === activeCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning'; 
      case 'advanced': return 'destructive';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || Target;
  };

  const handleScenarioSelect = (scenario: DemoScenario) => {
    setSelectedScenario(scenario);
    setCurrentStep(0);
    setIsPlaying(false);
    onScenarioStart?.(scenario);
  };

  const handleNext = () => {
    if (selectedScenario && currentStep < selectedScenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const progress = selectedScenario 
    ? ((currentStep + 1) / selectedScenario.steps.length) * 100 
    : 0;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Play className="h-6 w-6" />
          Demo Showcase
        </h2>
        <p className="text-muted-foreground">
          Interactive guided tours showcasing RBAC system capabilities and workflows.
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                <Icon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-4">
          {!selectedScenario ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredScenarios.map((scenario) => {
                const CategoryIcon = getCategoryIcon(scenario.category);
                return (
                  <Card 
                    key={scenario.id} 
                    variant="frostedGlass" 
                    className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                    onClick={() => handleScenarioSelect(scenario)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                        <Badge variant={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{scenario.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {scenario.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {scenario.duration}
                        </div>
                        <div className="text-muted-foreground">
                          {scenario.steps.length} steps
                        </div>
                      </div>
                      <Button size="sm" className="w-full gap-2">
                        <Play className="h-4 w-4" />
                        Start Demo
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Demo Header */}
              <Card variant="frostedGlass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {React.createElement(getCategoryIcon(selectedScenario.category), { className: "h-5 w-5" })}
                        {selectedScenario.title}
                      </CardTitle>
                      <CardDescription>{selectedScenario.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedScenario(null)}>
                      Back to Scenarios
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress: Step {currentStep + 1} of {selectedScenario.steps.length}</span>
                      <span>{selectedScenario.duration}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardHeader>
              </Card>

              {/* Current Step */}
              <Card variant="frostedGlass">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedScenario.steps[currentStep]?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {selectedScenario.steps[currentStep]?.description}
                  </p>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Action Required:</span>
                    </div>
                    <p className="text-blue-700">
                      {selectedScenario.steps[currentStep]?.action}
                    </p>
                  </div>

                  {selectedScenario.steps[currentStep]?.tips && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Pro Tips:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {selectedScenario.steps[currentStep].tips!.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800 text-sm">Expected Result:</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      {selectedScenario.steps[currentStep]?.expectedResult}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReset}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <Button 
                  onClick={handleNext}
                  disabled={currentStep === selectedScenario.steps.length - 1}
                  size="sm"
                >
                  Next Step
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Expected Outcomes */}
              {currentStep === selectedScenario.steps.length - 1 && (
                <Card variant="frostedGlass">
                  <CardHeader>
                    <CardTitle className="text-lg">🎯 Demo Completed!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-muted-foreground">
                        Congratulations! You've completed the {selectedScenario.title} demo. 
                        Here's what was accomplished:
                      </p>
                      <ul className="space-y-2">
                        {selectedScenario.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-sm">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-3">
                        <Button onClick={() => setSelectedScenario(null)} className="gap-2">
                          <Target className="h-4 w-4" />
                          Try Another Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 