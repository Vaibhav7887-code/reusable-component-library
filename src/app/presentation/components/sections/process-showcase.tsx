"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Lightbulb, 
  BarChart3,
  Search,
  TestTube,
  Layers,
  Quote,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { researchFindings, researchQuotes } from "../../data/research-quotes";
import { personas } from "../../data/personas";

const processSteps = [
  {
    id: 'research',
    title: 'Research & Discovery',
    icon: Search,
    description: 'Deep user research to understand developer and admin pain points',
    color: 'blue',
    insights: ['5 user interviews', '4 personas developed', '3 journey maps', '12 pain points identified'],
    outcomes: 'Discovered that trust is earned in the first 5 minutes or lost forever'
  },
  {
    id: 'define',
    title: 'Problem Definition',
    icon: Target,
    description: 'Stakeholder alignment on business goals and success metrics',
    color: 'green',
    insights: ['Business goals clarified', 'Success metrics defined', 'Technical constraints mapped'],
    outcomes: 'Clear vision: Transform closed SaaS into developer-first platform'
  },
  {
    id: 'design',
    title: 'Solution Design',
    icon: Lightbulb,
    description: 'Wireframe evolution and design principle establishment',
    color: 'purple',
    insights: ['15 wireframes created', '8 prototypes built', '6 design iterations'],
    outcomes: 'Dual-persona approach: API Portal + RBAC with distinct user flows'
  },
  {
    id: 'validate',
    title: 'Validation & Impact',
    icon: TestTube,
    description: 'User testing insights and measurable business outcomes',
    color: 'orange',
    insights: ['8 usability tests', '95% accessibility score', '92% performance score'],
    outcomes: '99% faster onboarding, 73% fewer support tickets, 4x API adoption'
  }
];

const StepCard = ({ step, index, isActive, onClick }: { 
  step: typeof processSteps[0], 
  index: number, 
  isActive: boolean,
  onClick: () => void 
}) => {
  const Icon = step.icon;
  const colorMap = {
    blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
    orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 h-full ${
          isActive 
            ? `${colorMap[step.color as keyof typeof colorMap]} border-2 scale-105` 
            : 'hover:scale-102 hover:shadow-lg'
        }`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <Badge variant="outline" className="text-xs mb-1">
                Step {index + 1}
              </Badge>
              <CardTitle className="text-lg">{step.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <div>
                <h4 className="font-medium text-sm mb-2">Key Activities:</h4>
                <ul className="space-y-1">
                  {step.insights.map((insight, i) => (
                    <li key={i} className="flex items-center text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-2 text-green-500" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs font-medium">Outcome:</p>
                <p className="text-xs text-muted-foreground">{step.outcomes}</p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ResearchInsight = ({ finding }: { finding: typeof researchFindings[0] }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-r-lg"
  >
    <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">{finding.title}</h4>
    <p className="text-xs text-muted-foreground mt-1">{finding.description}</p>
    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2 font-medium">
      → {finding.designImplication}
    </p>
  </motion.div>
);

const UserQuote = ({ quote }: { quote: typeof researchQuotes[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <div className="flex items-start space-x-3">
      <Quote className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
      <div>
        <p className="text-sm italic text-gray-700 dark:text-gray-300">"{quote.quote}"</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs font-medium">{quote.speaker} • {quote.role}</p>
          <Badge variant="outline" className="text-xs">
            {quote.category}
          </Badge>
        </div>
      </div>
    </div>
  </motion.div>
);

export const ProcessShowcase = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Design Process & Methodology
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Strategic UX Design Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A systematic approach to transforming complex enterprise software into 
            intuitive, developer-first platforms through user-centered design.
          </p>
        </motion.div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {processSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>

        {/* Detailed Content Based on Active Step */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left Column - Research Insights */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Research Insights</h3>
            <div className="space-y-4">
              {researchFindings.slice(0, 2).map((finding) => (
                <ResearchInsight key={finding.id} finding={finding} />
              ))}
            </div>

            {/* Personas Preview */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Key Personas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personas.slice(0, 2).map((persona) => (
                  <Card key={persona.id} className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {persona.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{persona.name}</p>
                        <p className="text-xs text-muted-foreground">{persona.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{persona.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - User Quotes */}
          <div>
            <h3 className="text-2xl font-bold mb-6">User Research Quotes</h3>
            <div className="space-y-4">
              {researchQuotes.slice(0, 3).map((quote) => (
                <UserQuote key={quote.id} quote={quote} />
              ))}
            </div>

            {/* Design Principles */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Design Principles</h4>
              <div className="space-y-3">
                {[
                  'Trust-first experience design',
                  'Progressive disclosure of complexity',
                  'Self-service with safety rails',
                  'Developer empathy over feature completeness'
                ].map((principle, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Button 
            onClick={() => setActiveStep((prev) => (prev + 1) % processSteps.length)}
            className="group"
          >
            Next: {processSteps[(activeStep + 1) % processSteps.length].title}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}; 