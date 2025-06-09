"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Shield, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  Users,
  Lock,
  Key
} from "lucide-react";
import { personas } from "../../data/personas";

interface PersonaView {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  workflow: WorkflowStep[];
  capabilities: string[];
  constraints: string[];
  keyFeatures: string[];
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  time: string;
  complexity: 'low' | 'medium' | 'high';
}

const personaViews: PersonaView[] = [
  {
    id: 'sarah-admin',
    name: 'Sarah',
    role: 'Fleet Operations Manager',
    avatar: 'SM',
    description: 'Non-technical admin managing 500+ users across 3 vehicle types',
    workflow: [
      {
        id: 'select-role',
        title: 'Select Role Template',
        description: 'Choose from pre-configured role templates like "Driver", "Dispatcher", "Manager"',
        icon: Users,
        time: '30 sec',
        complexity: 'low'
      },
      {
        id: 'assign-users',
        title: 'Assign to Users',
        description: 'Bulk assign roles to multiple users or groups',
        icon: User,
        time: '2 min',
        complexity: 'low'
      },
      {
        id: 'preview-impact',
        title: 'Preview Access',
        description: 'See exactly what permissions users will have before confirming',
        icon: Eye,
        time: '1 min',
        complexity: 'low'
      },
      {
        id: 'confirm-apply',
        title: 'Apply Changes',
        description: 'Confirm and apply with automatic audit trail',
        icon: CheckCircle2,
        time: '15 sec',
        complexity: 'low'
      }
    ],
    capabilities: [
      'Role-based templates for common use cases',
      'Bulk user management',
      'Visual permission previews',
      'Safety rails to prevent over-privileging',
      'Automated compliance reporting'
    ],
    constraints: [
      'Cannot create custom permissions',
      'No direct access to technical configurations',
      'Limited to predefined role templates'
    ],
    keyFeatures: [
      'Template-driven approach',
      'Visual permission matrix',
      'Bulk operations',
      'Safety confirmations'
    ]
  },
  {
    id: 'alex-technical',
    name: 'Alex',
    role: 'Technical Lead',
    avatar: 'AS',
    description: 'Developer who needs fine-grained control and API access',
    workflow: [
      {
        id: 'define-permissions',
        title: 'Define Custom Permissions',
        description: 'Create granular permissions for specific API endpoints and resources',
        icon: Settings,
        time: '5 min',
        complexity: 'medium'
      },
      {
        id: 'configure-jit',
        title: 'Configure JIT Access',
        description: 'Set up just-in-time access for sensitive operations',
        icon: Clock,
        time: '3 min',
        complexity: 'high'
      },
      {
        id: 'api-integration',
        title: 'API Integration',
        description: 'Use RBAC APIs to integrate with existing systems',
        icon: Key,
        time: '15 min',
        complexity: 'high'
      },
      {
        id: 'testing-validation',
        title: 'Test & Validate',
        description: 'Test permission scenarios in staging environment',
        icon: Shield,
        time: '10 min',
        complexity: 'medium'
      }
    ],
    capabilities: [
      'Custom permission creation',
      'API-driven configuration',
      'JIT access controls',
      'Integration with external systems',
      'Advanced audit and monitoring'
    ],
    constraints: [
      'Requires technical knowledge',
      'More complex configuration',
      'Need to understand security implications'
    ],
    keyFeatures: [
      'API-first approach',
      'Custom permission builder',
      'JIT access workflows',
      'Integration capabilities'
    ]
  }
];

const WorkflowStepCard = ({ step, index }: { step: WorkflowStep, index: number }) => {
  const Icon = step.icon;
  const complexityColors = {
    low: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    high: 'text-red-600 bg-red-100 dark:bg-red-900/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{step.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {step.time}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
              <Badge 
                variant="outline" 
                className={`text-xs ${complexityColors[step.complexity]}`}
              >
                {step.complexity} complexity
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PersonaCard = ({ 
  persona, 
  isActive, 
  onClick 
}: { 
  persona: PersonaView, 
  isActive: boolean, 
  onClick: () => void 
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`cursor-pointer transition-all duration-300 ${
      isActive ? 'ring-2 ring-blue-500' : ''
    }`}
  >
    <Card className={`h-full ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {persona.avatar}
          </div>
          <div>
            <CardTitle className="text-lg">{persona.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{persona.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{persona.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export const PersonaSwitcher = () => {
  const [activePersona, setActivePersona] = useState(personaViews[0]);

  return (
    <div className="space-y-8">
      {/* Persona Selection */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">
          Two Distinct User Experiences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {personaViews.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              isActive={activePersona.id === persona.id}
              onClick={() => setActivePersona(persona)}
            />
          ))}
        </div>
      </div>

      {/* Active Persona Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Workflow */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {activePersona.name}'s Workflow
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activePersona.workflow.map((step, index) => (
                <WorkflowStepCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Capabilities & Constraints */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                Capabilities
              </h4>
              <ul className="space-y-2">
                {activePersona.capabilities.map((capability, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {capability}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                Constraints
              </h4>
              <ul className="space-y-2">
                {activePersona.constraints.map((constraint, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start text-sm"
                  >
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    {constraint}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Key Features</h4>
            <div className="flex flex-wrap gap-2">
              {activePersona.keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary">{feature}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 