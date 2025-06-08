"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { 
  Play, 
  X,
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
  Clock,
  CheckCircle,
  ArrowRight,
  Zap
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
  highlights: string[];
}

interface DemoStep {
  id: string;
  title: string;
  description: string;
  action: string;
  tips?: string[];
  expectedResult: string;
}

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScenarioComplete?: (scenarioId: string) => void;
}

const demoScenarios: DemoScenario[] = [
  {
    id: 'new-driver-onboarding',
    title: 'New Driver Onboarding',
    description: 'Complete end-to-end workflow for adding a new driver to your fleet with proper role assignment and permission setup.',
    category: 'onboarding',
    duration: '3-5 minutes',
    difficulty: 'beginner',
    highlights: ['Step-by-step wizard', 'Role templates', 'Permission validation', 'Welcome email'],
    steps: [
      {
        id: 'open-wizard',
        title: 'Launch Onboarding Wizard',
        description: 'Start the user creation process with the guided wizard',
        action: 'Click the "Add User" button in the main interface',
        tips: ['The wizard guides you through 5 clear steps', 'All fields have validation helpers'],
        expectedResult: 'User onboarding wizard opens with step 1: Basic Information'
      },
      {
        id: 'basic-info',
        title: 'Enter Basic Information',
        description: 'Fill in essential user details like name, email, and employee information',
        action: 'Complete the basic information form with driver details',
        tips: ['Employee ID follows FE-YYYY-XXX format', 'Department affects default role suggestions'],
        expectedResult: 'Form validates and enables "Next Step" button'
      },
      {
        id: 'assign-role',
        title: 'Select Driver Role',
        description: 'Choose the appropriate role template for a fleet driver',
        action: 'Select "Driver" role from the available options',
        tips: ['Driver role includes vehicle access and route permissions', 'Role permissions preview shows what access they will have'],
        expectedResult: 'Driver role selected with standard permissions preview'
      },
      {
        id: 'finalize-setup',
        title: 'Complete Setup',
        description: 'Review all settings and create the user account',
        action: 'Review summary and click "Create User" to finalize',
        expectedResult: 'New driver account created and added to user list'
      }
    ],
    outcomes: [
      'New driver has appropriate vehicle access permissions',
      'Safety and compliance restrictions are properly applied',
      'Complete audit trail of account creation process',
      'Driver receives welcome email with login instructions'
    ]
  },
  {
    id: 'bulk-operations',
    title: 'Bulk Role Assignment',
    description: 'Efficiently manage multiple users at once during fleet expansion or organizational changes.',
    category: 'bulk-ops',
    duration: '2-3 minutes',
    difficulty: 'intermediate',
    highlights: ['Multi-selection', 'Progress tracking', 'Error handling', 'Impact preview'],
    steps: [
      {
        id: 'select-users',
        title: 'Select Multiple Users',
        description: 'Choose several users for bulk role assignment',
        action: 'Use checkboxes to select 5-10 users from the user table',
        tips: ['Use Shift+click for range selection', 'Selected count shows in the action bar'],
        expectedResult: 'Multiple users selected with bulk action options available'
      },
      {
        id: 'open-bulk-modal',
        title: 'Open Bulk Operations',
        description: 'Launch the bulk operations interface',
        action: 'Click "Bulk Operations" button that appears with selection',
        expectedResult: 'Bulk operations modal opens with selected users list'
      },
      {
        id: 'execute-operation',
        title: 'Execute Bulk Changes',
        description: 'Apply changes with progress tracking',
        action: 'Click "Execute" and monitor the progress indicator',
        expectedResult: 'All users updated with new roles, progress tracked, errors handled'
      }
    ],
    outcomes: [
      'Multiple users updated efficiently in a single operation',
      'All permission conflicts detected and resolved',
      'Complete audit trail of bulk changes for compliance',
      'Significant time savings compared to individual updates'
    ]
  },
  {
    id: 'emergency-access',
    title: 'Emergency Access Management',
    description: 'Handle critical situations requiring immediate elevated access with proper security controls.',
    category: 'emergency',
    duration: '1-2 minutes',
    difficulty: 'advanced',
    highlights: ['Break-glass access', 'Time limits', 'Auto-revocation', 'Audit trail'],
    steps: [
      {
        id: 'emergency-scenario',
        title: 'Emergency Situation',
        description: 'A vehicle breakdown requires immediate admin access to dispatch emergency services',
        action: 'Simulated emergency: Vehicle breakdown needs immediate response',
        expectedResult: 'Emergency access need identified'
      },
      {
        id: 'grant-access',
        title: 'Grant Emergency Access',
        description: 'Provide temporary elevated permissions for crisis resolution',
        action: 'Use emergency access panel to grant admin permissions with time limit',
        tips: ['Always set time limits', 'Require incident justification', 'All actions are logged'],
        expectedResult: 'User has temporary admin access for 2 hours maximum'
      }
    ],
    outcomes: [
      'Critical incident resolved quickly without security compromise',
      'Temporary access properly time-limited and monitored',
      'Complete audit trail maintained for compliance review',
      'No residual elevated permissions left in system'
    ]
  }
];

export function DemoModal({ isOpen, onClose, onScenarioComplete }: DemoModalProps) {
  const [selectedScenario, setSelectedScenario] = React.useState<DemoScenario | null>(null);
  const [currentStep, setCurrentStep] = React.useState(0);

  const progress = selectedScenario 
    ? ((currentStep + 1) / selectedScenario.steps.length) * 100 
    : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'default';
      case 'intermediate': return 'warning';
      case 'advanced': return 'destructive';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'onboarding': return Users;
      case 'bulk-ops': return Activity;
      case 'emergency': return AlertTriangle;
      case 'troubleshooting': return Search;
      case 'audit': return FileDown;
      case 'drift': return Shield;
      default: return Target;
    }
  };

  const handleScenarioSelect = (scenario: DemoScenario) => {
    setSelectedScenario(scenario);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (selectedScenario && currentStep < selectedScenario.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleComplete = () => {
    if (selectedScenario) {
      onScenarioComplete?.(selectedScenario.id);
      setSelectedScenario(null);
    }
  };

  const handleClose = () => {
    setSelectedScenario(null);
    setCurrentStep(0);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent 
        className="w-full sm:max-w-4xl overflow-y-auto" 
        side="right"
      >
        <SheetHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl">
              {selectedScenario ? selectedScenario.title : 'Interactive RBAC Demos'}
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {selectedScenario && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Step {currentStep + 1} of {selectedScenario.steps.length}</span>
                <span>{selectedScenario.duration}</span>
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="py-6">
          {!selectedScenario ? (
            // Scenario Selection
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Choose Your Demo Experience</h3>
                <p className="text-muted-foreground">
                  Interactive guided tours showcasing real RBAC workflows and capabilities
                </p>
              </div>

              <div className="grid gap-6">
                {demoScenarios.map((scenario) => {
                  const CategoryIcon = getCategoryIcon(scenario.category);
                  return (
                    <Card 
                      key={scenario.id} 
                      className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-2 hover:border-primary/50"
                      onClick={() => handleScenarioSelect(scenario)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <CategoryIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{scenario.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={getDifficultyColor(scenario.difficulty)}>
                                  {scenario.difficulty}
                                </Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {scenario.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardDescription className="text-sm leading-relaxed mt-2">
                          {scenario.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium mb-2">What you'll learn:</h4>
                            <div className="flex flex-wrap gap-1">
                              {scenario.highlights.map((highlight, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button size="sm" className="w-full gap-2">
                            <Play className="h-4 w-4" />
                            Start Demo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            // Active Demo
            <div className="space-y-6">
              {/* Demo Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {React.createElement(getCategoryIcon(selectedScenario.category), { 
                          className: "h-5 w-5 text-primary" 
                        })}
                        <CardTitle>{selectedScenario.title}</CardTitle>
                      </div>
                      <CardDescription>{selectedScenario.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedScenario(null)}>
                      ← Back to Demos
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Current Step */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      {currentStep + 1}
                    </span>
                    {selectedScenario.steps[currentStep]?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedScenario.steps[currentStep]?.description}
                  </p>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Action Required:</span>
                    </div>
                    <p className="text-blue-700 font-medium">
                      {selectedScenario.steps[currentStep]?.action}
                    </p>
                  </div>

                  {selectedScenario.steps[currentStep]?.tips && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Pro Tips:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                        {selectedScenario.steps[currentStep].tips!.map((tip, index) => (
                          <li key={index} className="relative">
                            <span className="absolute -left-4 text-primary">•</span>
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

              {/* Navigation */}
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
                
                {currentStep === selectedScenario.steps.length - 1 ? (
                  <Button onClick={handleComplete} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Complete Demo
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="gap-2">
                    Next Step
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Completion */}
              {currentStep === selectedScenario.steps.length - 1 && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Demo Complete! 🎉
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-green-700">
                        Excellent! You've completed the {selectedScenario.title} demo. 
                        Here's what you accomplished:
                      </p>
                      <ul className="space-y-2">
                        {selectedScenario.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-2 text-green-700">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                            <span className="text-sm">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-3 flex gap-2">
                        <Button onClick={() => setSelectedScenario(null)} variant="outline">
                          Try Another Demo
                        </Button>
                        <Button onClick={handleClose}>
                          Start Using RBAC
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 