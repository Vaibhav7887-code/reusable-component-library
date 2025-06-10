import {
  ArrowRight,
  Code,
  Lock,
  DollarSign,
  Zap,
  CheckCircle,
  BarChart,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Mail,
  X,
  ArrowDown,
  ArrowUp,
  Building,
  Cog,
  Shield,
  Eye,
  Database,
  Play,
  Target,
  Wrench,
  GitBranch,
  Timer,
  UserCheck,
  Settings,
  FileText,
  Layers,
  BarChart3,
  Activity,
  Bell,
  Truck,
  MapPin,
  Globe,
  Terminal,
  Copy,
  Download,
  Lightbulb,
  Cpu,
  Network,
  Webhook,
  Key,
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  Star,
  ThumbsUp,
  MessageSquare,
  PieChart,
  LineChart,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Executive Summary Component
const ExecutiveSummary = () => (
  <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Designer-Led Platform Transformation</h2>
          <p className="text-xl text-slate-200">
            Strategic design leadership driving business evolution from closed SaaS to open platform
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* The Strategic Shift - Visual Transformation */}
          <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-300 mb-4">
                <GitBranch className="w-6 h-6 mr-3" />
                The Strategic Shift
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-100">
              {/* Before/After Visual */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-slate-700/50 border border-slate-600 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-slate-400" />
                      </div>
                      <div className="text-xs text-slate-300">BEFORE</div>
                      <div className="text-sm font-medium text-white">Internal Plumbing</div>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 text-slate-300 mx-4" />
                    
                    <div className="flex-1 text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-blue-900/50 border border-blue-600 flex items-center justify-center">
                        <Globe className="w-8 h-8 text-blue-300" />
                      </div>
                      <div className="text-xs text-slate-300">AFTER</div>
                      <div className="text-sm font-medium text-white">Revenue Product</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-blue-900/40 border border-blue-600">
                  <div className="text-sm font-medium text-blue-200 mb-1">My Role</div>
                  <div className="text-xs text-slate-200">Strategic Design Leadership</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identity as Strategic Enabler - Icon Grid */}
          <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-300 mb-4">
                <Shield className="w-6 h-6 mr-3" />
                User roles as Strategic Enabler
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-100">
              <div className="grid grid-cols-1 gap-4">
                {/* Platform Stickiness */}
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="w-10 h-10 rounded-lg bg-slate-600/60 flex items-center justify-center flex-shrink-0">
                    <Network className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">Platform Stickiness</div>
                    <div className="text-xs text-slate-300">Developer experience as competitive moat</div>
                  </div>
                </div>
                
                {/* Partnership Scale */}
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="w-10 h-10 rounded-lg bg-slate-600/60 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">Partnership Scale</div>
                    <div className="text-xs text-slate-300">Self-serve ecosystem growth</div>
                  </div>
                </div>
                
                {/* Trust Currency */}
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="w-10 h-10 rounded-lg bg-slate-600/60 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">Trust Currency</div>
                    <div className="text-xs text-slate-300">Security UX as brand</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment & ROI - Visual Metrics */}
          <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-300 mb-4">
                <TrendingUp className="w-6 h-6 mr-3" />
                Investment & ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-100">
              <div className="space-y-4">
                {/* Revenue Growth Visual */}
                <div className="text-center p-3 rounded-lg bg-blue-900/50 border border-blue-600">
                  <div className="flex items-center justify-center mb-2">
                    <ArrowUp className="w-5 h-5 text-blue-300 mr-2" />
                    <span className="text-lg font-bold text-blue-200">1.6x</span>
                  </div>
                  <div className="text-sm font-medium text-blue-200">Platform Growth</div>
                  <div className="text-xs text-slate-300">API adoption & revenue</div>
                </div>
                
                {/* Cost Reduction Visual */}
                <div className="text-center p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-center justify-center mb-2">
                    <ArrowDown className="w-5 h-5 text-slate-300 mr-2" />
                    <span className="text-lg font-bold text-slate-200">~40%</span>
                  </div>
                  <div className="text-sm font-medium text-slate-200">Support Reduction</div>
                  <div className="text-xs text-slate-300">Operational efficiency</div>
                </div>
                
                {/* Strategic Value */}
                <div className="text-center p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-slate-300 mr-2" />
                    <span className="text-sm font-medium text-slate-200">Future-Ready</span>
                  </div>
                  <div className="text-xs text-slate-300">Scalable platform foundation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Business Outcomes - Visual Metrics */}
        <div className="mb-12">
          <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">Key Business Outcomes</CardTitle>
              <p className="text-slate-300">Measurable impact from role-driven platform transformation</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Efficiency Improvements */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
                    <ArrowDown className="w-5 h-5 mr-2 text-blue-400" />
                    Operational Efficiency
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-200">Support Ticket Volume</span>
                        <span className="text-2xl font-bold text-blue-300">~40%</span>
                      </div>
                      <div className="text-xs text-slate-400 mb-2">Reduction in API-related issues</div>
                      <Progress value={40} className="h-2" />
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-200">Debug Time</span>
                        <span className="text-2xl font-bold text-blue-300">2.5x</span>
                      </div>
                      <div className="text-xs text-slate-400 mb-2">Faster issue resolution</div>
                      <Progress value={60} className="h-2" />
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-200">Manual Processes</span>
                        <span className="text-2xl font-bold text-blue-300">1.8x</span>
                      </div>
                      <div className="text-xs text-slate-400">Reduction in manual overhead</div>
                    </div>
                  </div>
                </div>

                {/* Growth & Adoption */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
                    <ArrowUp className="w-5 h-5 mr-2 text-blue-400" />
                    Growth & Adoption
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-200">Integration Velocity</span>
                        <span className="text-2xl font-bold text-blue-300">2.1x</span>
                      </div>
                      <div className="text-xs text-slate-400 mb-2">Faster partner onboarding</div>
                      <Progress value={68} className="h-2" />
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-200">Developer Satisfaction</span>
                        <span className="text-2xl font-bold text-blue-300">+18pts</span>
                      </div>
                      <div className="text-xs text-slate-400 mb-2">NPS improvement (mixed → positive)</div>
                      <Progress value={55} className="h-2" />
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-700/40 border border-slate-600/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-200">Platform Usage</span>
                        <span className="text-2xl font-bold text-blue-300">1.6x</span>
                      </div>
                      <div className="text-xs text-slate-400">Growth in API adoption</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key Performance Highlights */}
              <div className="mt-8 pt-8 border-t border-slate-600">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="p-4">
                    <div className="text-3xl font-bold text-blue-300 mb-1">~30min</div>
                    <div className="text-sm text-slate-300">Time to First Success</div>
                    <div className="text-xs text-slate-500">down from days</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-blue-300 mb-1">85%</div>
                    <div className="text-sm text-slate-300">JIT Access Adoption</div>
                    <div className="text-xs text-slate-500">Emergency scenarios</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-blue-300 mb-1">60%</div>
                    <div className="text-sm text-slate-300">Enterprise Engagement</div>
                    <div className="text-xs text-slate-500">Major customer accounts</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-blue-300 mb-1">2.3x</div>
                    <div className="text-sm text-slate-300">Portal Engagement</div>
                    <div className="text-xs text-slate-500">Discovery to usage</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transformation Vision */}
        <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4">The Vision: Fleet-as-a-Service Platform</h3>
                <p className="text-slate-300 mb-4">
                  From closed SaaS application to central nervous system for the entire fleet ecosystem. 
                  The Developer Portal is the front door to this transformation. The storefront where we monetize data assets 
                  and the workbench where partners build new value.
                </p>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-blue-600">Platform Economy</Badge>
                  <Badge className="bg-slate-600">Ecosystem Growth</Badge>
                  <Badge className="bg-slate-600">Revenue Expansion</Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 rounded-lg bg-slate-700/50 border border-slate-600">
                  <h4 className="font-semibold text-blue-300 mb-3">Lifecycle-Aware Design</h4>
                  <p className="text-sm text-slate-300 mb-4">
                    Designed for entire API product lifecycle. From internal onboarding to external adoption to long-term trust
                  </p>
                  <div className="text-xs text-slate-400">
                    Not just solving UI pain, but designing for velocity, credibility, and ecosystem health
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Awards Recognition */}
        <div className="mt-8 mb-8">
          <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="font-semibold text-blue-300 mb-4 flex items-center justify-center">
                  <Star className="w-5 h-5 mr-2" />
                  Award Recognition
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-4 h-4 text-blue-400 mr-2" />
                      <h5 className="font-semibold text-slate-200">Dentsu Rise Awards</h5>
                    </div>
                    <p className="text-sm text-slate-300">Team of the Quarter</p>
                    <p className="text-xs text-slate-400 mt-1">FleetEdge, 2025</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-4 h-4 text-blue-400 mr-2" />
                      <h5 className="font-semibold text-slate-200">North Star Awards</h5>
                    </div>
                    <p className="text-sm text-slate-300">Finalist</p>
                    <p className="text-xs text-slate-400 mt-1">FleetEdge, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
);

// Enhanced Hero Section Component
const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
    
    <div className="relative container mx-auto px-4 py-24 lg:py-32">
      <div className="max-w-4xl mx-auto text-center">
        {/* Design Philosophy Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-600 bg-slate-800/50 mb-8">
          <Shield className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-sm font-medium">Design Philosophy: Trust is the Core Product</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
          Scaling Access & DevEx for a{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connected Fleet Ecosystem
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          From closed SaaS application to open, developer-first platform. 
          Reimagining security, developer experience, and business strategy
        </p>

        {/* Core Principles */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <Lock className="w-6 h-6 text-green-400 flex-shrink-0" />
            <span className="font-medium">Security through UX</span>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <Eye className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <span className="font-medium">Research-Driven Design</span>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <Cog className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <span className="font-medium">Systems Thinking</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#business-evolution" className="scroll-smooth">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Explore the Journey
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <Link href="/">
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              View Live Prototypes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// Interactive Timeline Component
const BusinessEvolutionTimeline = () => {
  const timelineData = [
    {
      year: '2019-2021',
      title: 'MVP Fleet Management SaaS',
      description: 'Closed system, basic fleet operations',
      status: 'completed',
      color: 'bg-slate-500',
      icon: Building
    },
    {
      year: '2022',
      title: 'Rapid Growth Period', 
      description: 'Enterprise customers demanding integrations',
      status: 'completed',
      color: 'bg-blue-500',
      icon: TrendingUp
    },
    {
      year: '2023',
      title: 'Competitive Pressure',
      description: 'Platforms offering robust APIs gaining market share',
      status: 'warning',
      color: 'bg-amber-500',
      icon: AlertTriangle
    },
    {
      year: '2024',
      title: 'Strategic Pivot',
      description: 'Platform-first approach with developer-grade experience',
      status: 'active',
      color: 'bg-green-500',
      icon: Zap
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">The Business Evolution Challenge</h2>
        <p className="text-xl text-muted-foreground">
          FleetEdge's transformation from MVP to platform ecosystem
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-slate-200" />
        
        {timelineData.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;
          
          return (
            <div key={item.year} className="relative mb-12 last:mb-0">
              {/* Timeline Node */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${item.color} flex items-center justify-center border-4 border-white shadow-lg z-10`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content Card */}
              <div className={`flex ${isLeft ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                <div className={`w-full max-w-md ${isLeft ? 'mr-6' : 'ml-6'}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                          {item.year}
                        </Badge>
                        {item.status === 'active' && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Problem Landscape Component
const ProblemLandscape = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">The Problem Landscape</h2>
      <p className="text-xl text-muted-foreground">
        Manual processes and integration limitations creating business risk
      </p>
    </div>

    {/* Customer Quote */}
    <Card className="mb-12 bg-red-50 border-red-200">
      <CardContent className="p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <blockquote className="text-xl font-medium text-red-900 mb-2">
              "We love FleetEdge's core features, but we need to integrate with our existing ERP system. 
              Your current export/import process takes our team 3 hours daily."
            </blockquote>
            <cite className="text-red-700">— Enterprise Customer Feedback</cite>
          </div>
        </div>
      </CardContent>
              </Card>

    {/* Problem Grid */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {/* Manual Distribution */}
      <Card className="border-red-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
          <div className="flex items-center space-x-3">
            <Mail className="w-8 h-8 text-red-500" />
            <div>
              <CardTitle className="text-red-900">Manual API Key Distribution</CardTitle>
              <CardDescription>Via email with password-protected files</CardDescription>
            </div>
          </div>
                </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Security Risk</span>
              <Badge variant="destructive">High</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Developer Experience</span>
              <Badge variant="destructive">Poor</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Scalability</span>
              <Badge variant="destructive">None</Badge>
            </div>
          </div>
        </CardContent>
              </Card>

      {/* Support Burden */}
      <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-slate-500" />
            <div>
              <CardTitle className="text-slate-900">40% of Support Tickets</CardTitle>
              <CardDescription>Related to integration issues</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={40} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Integration problems consuming engineering resources
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Lost Deals */}
      <Card className="border-red-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
          <div className="flex items-center space-x-3">
            <X className="w-8 h-8 text-red-500" />
            <div>
              <CardTitle className="text-red-900">Lost Enterprise Deals</CardTitle>
              <CardDescription>Due to integration limitations</CardDescription>
            </div>
          </div>
              </CardHeader>
              <CardContent>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-red-600">3 deals in Q3</div>
            <p className="text-sm text-muted-foreground">
              Competitors offering superior API experience
            </p>
          </div>
              </CardContent>
            </Card>
    </div>

    {/* Competitive Analysis */}
              <Card>
                <CardHeader>
        <CardTitle>Competitive Landscape Analysis</CardTitle>
        <CardDescription>How competitors are winning with API-first strategies</CardDescription>
                </CardHeader>
              <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-blue-600">Competitors (Samsara, Geotab)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Self-service developer portals</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Interactive API documentation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Instant API key generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Robust integration examples</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-slate-600">FleetEdge (Before)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span>Manual email-based key distribution</span>
              </li>
              <li className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span>Static PDF documentation</span>
              </li>
              <li className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span>No testing environment</span>
              </li>
              <li className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span>Limited integration support</span>
              </li>
            </ul>
          </div>
        </div>
              </CardContent>
              </Card>
            </div>
);

// Strategic Vision Component
const StrategicVision = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Strategic Vision</h2>
      <p className="text-xl text-muted-foreground">
        From "Fleet Management Software" to "Fleet Ecosystem Platform"
      </p>
          </div>

    {/* Before/After Comparison */}
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      {/* Before */}
      <Card className="border-red-200 bg-red-50">
              <CardHeader>
          <CardTitle className="flex items-center text-red-900">
            <X className="w-6 h-6 mr-2" />
            Before: Closed System
                </CardTitle>
              </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-red-200">
            <Database className="w-5 h-5 text-red-500" />
            <span className="text-sm">Forced UI, no developer choice</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-red-200">
            <Mail className="w-5 h-5 text-red-500" />
            <span className="text-sm">Manual integration process</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-red-200">
            <Clock className="w-5 h-5 text-red-500" />
            <span className="text-sm">Days to weeks for API access</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-red-200">
            <Building className="w-5 h-5 text-red-500" />
            <span className="text-sm">Limited ecosystem growth</span>
          </div>
              </CardContent>
            </Card>

      {/* After */}
      <Card className="border-green-200 bg-green-50">
              <CardHeader>
          <CardTitle className="flex items-center text-green-900">
            <CheckCircle className="w-6 h-6 mr-2" />
            After: Open Platform
                </CardTitle>
              </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <Code className="w-5 h-5 text-green-500" />
            <span className="text-sm">API-first, developer choice</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <Zap className="w-5 h-5 text-green-500" />
            <span className="text-sm">Self-service developer tools</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <Clock className="w-5 h-5 text-green-500" />
            <span className="text-sm">Minutes to first API call</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm">Thriving ecosystem partnerships</span>
          </div>
              </CardContent>
            </Card>
          </div>

    {/* Transformation Arrow */}
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
        <Badge variant="outline" className="text-blue-700 border-blue-300">Transformation</Badge>
        <ArrowRight className="w-8 h-8 text-blue-600" />
        <span className="font-semibold text-blue-900">Central Nervous System for Fleet Ecosystem</span>
      </div>
    </div>
     </div>
 );

// RBAC Act 1 Components

// Two Worlds Problem Visualization
const TwoWorldsVisualization = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Understanding the Challenge</h2>
      <p className="text-xl text-muted-foreground">
        FleetEdge serves two fundamentally different worlds
            </p>
          </div>

    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      {/* World 1: Operational */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-blue-900">World 1: Operational Teams</CardTitle>
              <CardDescription>Fleet managers like Sarah</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Role Assignment</span>
              <Badge variant="outline" className="text-blue-600 border-blue-300">Simple</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Sarah assigns a driver to 'Mechanic' role with one click. Simple, safe, efficient
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Template-driven role assignment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Safety rails prevent mistakes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Manages 500+ users daily</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* World 2: Technical */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-purple-900">World 2: Connected Fleet</CardTitle>
              <CardDescription>Platform engineers like Alex</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Service Integration</span>
              <Badge variant="outline" className="text-purple-600 border-purple-300">Complex</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Alex integrates automated load-balancing service. Needs programmatic access, not UI clicks
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm">Service fails at 3 AM = supply chain disruption</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm">Generic errors lead to hours of debugging</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm">Manual policy changes create delays</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Research Insights */}
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Research Foundation</CardTitle>
        <CardDescription>Primary insights from 12 user interviews across fleet managers, mechanics, and platform engineers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <UserCheck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold mb-2">Non-Technical Operators</h4>
            <p className="text-sm text-muted-foreground">Need simple, template-driven role assignment</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold mb-2">Compliance Guardians</h4>
            <p className="text-sm text-muted-foreground">Require audit trails and bulk governance tools</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <Cog className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-semibold mb-2">Technical Platform Engineers</h4>
            <p className="text-sm text-muted-foreground">Need programmatic control and debugging capabilities</p>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Key Quote */}
    <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
      <CardContent className="p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <blockquote className="text-xl font-medium text-red-900 mb-2">
              "When my service fails at 3 AM because of a permissions error, it could mean potential supply chain disruption, a lot of lost revenue or even safety issues putting human lives at risk. I need a way to debug this issue fast and fix it."
            </blockquote>
            <cite className="text-red-700">— Alex (Platform Engineer)</cite>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Problem Definition Component
const ProblemDefinition = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Defining Success Criteria</h2>
      <p className="text-xl text-muted-foreground">
        Learning from initial missteps and missed user groups
      </p>
    </div>

    {/* The Pivot Story */}
    <Card className="mb-12 bg-gradient-to-r from-red-50 to-slate-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <AlertTriangle className="w-8 h-8 mr-3 text-red-600" />
          The Initial Oversight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-red-900 mb-3">What We Originally Built For</h4>
            <div className="p-4 rounded-lg bg-white border border-red-200">
              <p className="text-sm text-red-800 italic mb-3">
                "We designed a simple click-through UI for operations managers like Sarah. 
                Clean role assignment, some advanced permissions, basic setup features."
              </p>
              <div className="flex items-center space-x-2 text-sm text-red-700">
                <Users className="w-4 h-4" />
                <span>Target: 50 operations managers</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-3">What We Discovered Too Late</h4>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-800 italic mb-3">
                "During a partner integration call, their dev team asked: 'Does your API have a way to debug permission issues?' That's when we realized we'd missed our most important user."
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <Code className="w-4 h-4" />
                <span>Opportunity: 100+ technical integrators saving 10+ hours/week in debugging</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Revised Core Challenge */}
    <Card className="mb-12 bg-slate-50">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Target className="w-8 h-8 mr-3 text-blue-600" />
          Revised Core Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">
          Design an access control system that serves both technical and non-technical users 
          without compromising security or usability.
        </p>
        <Alert className="mt-4">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Learning Moment</AlertTitle>
          <AlertDescription>
            This pivot happened 3 weeks into development. We had to restart user research and rethink our entire approach.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>

    {/* Success Metrics */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
          Success Metrics Defined
        </CardTitle>
        <CardDescription>Aligned with stakeholders after discovering the real scope</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">60%</div>
            <p className="text-sm text-green-800">Reduce permission-related support tickets</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">80%</div>
            <p className="text-sm text-blue-800">Enable self-service policy creation</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-2xl font-bold text-slate-600 mb-1">0</div>
            <p className="text-sm text-slate-800">Zero-downtime access rotation</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-2xl font-bold text-slate-600 mb-1">&lt;10s</div>
            <p className="text-sm text-slate-800">Policy evaluation response time</p>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Reality Check:</strong> These metrics were crucial to align stakeholders on the expanded scope. 
            In fleet operations, every minute of downtime costs thousands in delayed deliveries.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

// RBAC Friction & Failure Map
const RBACFrictionMap = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Friction & Failure Points</h2>
      <p className="text-xl text-muted-foreground">
        Critical moments where users get stuck, frustrated, or contact support
      </p>
    </div>

    {/* Specific Problems Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="border-red-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-3">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Black Box Debugging</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Generic error messages lead to hours of troubleshooting
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Over-privileging</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Permanent access grants create security risks
          </p>
        </CardContent>
      </Card>

      <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Manual Processes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Policy changes require IT tickets and delays
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center mb-3">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Context Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No connection between business events and access needs
          </p>
        </CardContent>
      </Card>
    </div>

    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center text-red-900">
          <AlertTriangle className="w-6 h-6 mr-3" />
          High-Impact Pain Points in Fleet Access Control
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Emergency Access Friction */}
          <div className="border-l-4 border-red-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Emergency Access Failure</h4>
                <Badge variant="destructive" className="mb-2">HIGH IMPACT</Badge>
                <p className="text-sm text-red-700">3AM brake failure alert</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">User's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"I need to grant mechanic access NOW, but our access management system requires a 10-step approval process. The truck is stuck on I-95 with cargo worth $50k."</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• 2-hour average emergency response delay<br/>• $15k average cost per delayed resolution<br/>• Customer SLA violations</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">JIT Access with event-driven triggers - one-click approval, auto-expiring permissions</p>
              </div>
            </div>
          </div>

          {/* Permission Debugging Hell */}
          <div className="border-l-4 border-amber-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Permission Debugging Hell</h4>
                <Badge variant="secondary" className="mb-2 bg-amber-100 text-amber-800">DAILY FRICTION</Badge>
                <p className="text-sm text-amber-700">API integration failures</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">User's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"403 Forbidden. That's it? Is it the role? The scope? The geofence? I'm going to spend 2 hours hunting through logs."</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• 22% of support tickets were permission errors<br/>• 2.3 hours average debugging time<br/>• Developer confidence erosion</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">Auth Sandbox with step-by-step traces and actionable error messages</p>
              </div>
            </div>
          </div>

          {/* Over-Privileging Security Risk */}
          <div className="border-l-4 border-purple-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Over-Privileging Epidemic</h4>
                <Badge variant="secondary" className="mb-2 bg-purple-100 text-purple-800">SECURITY RISK</Badge>
                <p className="text-sm text-purple-700">Permanent access grants</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">User's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"I'll just give them admin access for now. I'll revoke it later... (never revokes it because fear of breaking something or forgets)"</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• 28% of mechanic accounts had permanent admin access<br/>• Compliance audit failures<br/>• Insider threat exposure</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">Auto-expiring permissions with clear justification trails</p>
              </div>
            </div>
          </div>

          {/* Complex Policy Creation */}
          <div className="border-l-4 border-blue-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Policy Creation Paralysis</h4>
                <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-800">OPERATIONAL BOTTLENECK</Badge>
                <p className="text-sm text-blue-700">Creating fleet-specific rules</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">User's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"I need insurance partners to access telemetry only for their own vehicles, but this policy language is like writing code. I'm not a programmer."</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• 2-day average time to create policies<br/>• Bottleneck through IT team<br/>• Business partnership delays</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">Visual Policy Builder with Mad Libs-style templates</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Sarah's Simple Interface Demo
const SarahSimpleInterface = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Simple Interface</h2>
      <p className="text-xl text-muted-foreground">
        Fleet operations needed role assignment as simple as assigning drivers to routes
      </p>
    </div>

    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sarah's Scenario */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
              Real-World Emergency Scenario
            </h4>
            <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
              <p className="text-sm italic mb-3">
                "It's 6:30 AM. Vehicle FL-2847 broke down on I-95. I need to get our mechanic Jake temporary access to the brake diagnostics system so he can check the telemetry before driving out there."
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Time-sensitive: 30-minute service window</span>
              </div>
            </div>
            
            <div className="bg-green-100 p-4 rounded-lg">
              <h5 className="font-medium mb-2 text-green-800">Requirements:</h5>
              <ul className="text-sm space-y-1 text-green-700">
                <li>• One-click role assignment</li>
                <li>• No technical jargon</li>
                <li>• Auto-expiring permissions</li>
                <li>• Clear audit trail</li>
              </ul>
            </div>
          </div>

          {/* Simple Interface Mockup */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-500" />
              Template-Based Assignment Interface
            </h4>
            <div className="bg-white p-6 rounded-lg border-2 border-dashed border-green-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="font-medium">Vehicle FL-2847: Brake System Alert</span>
                  </div>
                  <Badge variant="destructive">CRITICAL</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <label className="block text-sm font-medium mb-2">Quick Grant Access:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Wrench className="w-4 h-4 mr-1" />
                      Mechanic (2hr)
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Inspector (1hr)
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Auto-expires with audit trail
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground bg-slate-50 p-2 rounded">
                  <span>Assigns: Brake Diagnostics + Telemetry Read</span>
                  <span>Expires: 2 hours</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/rbac/users" target="_blank">
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  <Play className="w-4 h-4 mr-2" />
                  Try Simple Interface Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Design Process Component
const DesignProcess = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Research to Architecture</h2>
      <p className="text-xl text-muted-foreground">
        From user insights to technical implementation
      </p>
    </div>

    {/* The Simple UI Trap */}
    <Card className="mb-12 bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center text-red-900">
          <AlertTriangle className="w-6 h-6 mr-3" />
          Early Prototype Failure: The "Simple UI" Trap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <ArrowRight className="h-4 w-4" />
          <AlertTitle>Connected to Initial Oversight</AlertTitle>
          <AlertDescription>
            Having missed the technical users during requirements gathering, we naturally built for the users we knew: operations teams. 
            This prototype failure revealed the full extent of what we'd overlooked.
          </AlertDescription>
        </Alert>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - The Failure */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-red-900">The Original Approach</h4>
            </div>
            
            {/* Visual representation of simple UI */}
            <div className="p-4 rounded-lg bg-white border border-red-200 mb-4">
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-600">Designed for operations teams</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                </div>
                <div className="text-xs text-slate-500">Simple sliders and click-through UI</div>
              </div>
              
              <p className="text-sm text-red-800 mb-3">
                "Keep it simple for operations users" - we built a clean, slider-based UI for role assignment.
                Clean visual design, intuitive for Sarah's team.
              </p>
              
              <div className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200">
                <div className="text-xs text-red-600 font-mono">12% adoption rate</div>
                <div className="flex items-center space-x-1">
                  <ArrowDown className="w-3 h-3 text-red-600" />
                  <span className="text-xs text-red-600">Technical users after 2 weeks</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - The Reality */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-blue-900">The Reality Check</h4>
            </div>
            
            {/* Quote boxes with visual hierarchy */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500">
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 italic">
                    "Okay but why would I ever use this? I can just change it from the backend. 
                    This is not only slower but more restrictive."
                  </p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 border-l-4 border-l-red-500">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800 italic">
                    "Listen, my job revolves around fixing critical issues that can halt operations. 
                    When my service fails at 3 AM because of a permissions error, it could mean potential supply chain disruption, 
                    a lot of lost revenue or even safety issues putting human lives at risk. I need a way to debug this issue fast and fix it. 
                    A couple of sliders won't change anything."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Alert className="mt-6">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>The Learning</AlertTitle>
          <AlertDescription>
            This feedback directly led to our dual interface strategy and the Auth Sandbox. 
            Technical users needed power tools, not simplified versions of operational tools.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>

    {/* Four Personas */}
    <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-600" />
          Expanded Persona Ecosystem
                </CardTitle>
        <CardDescription>Derived from Simple UI failure: talking to more people across connected departments</CardDescription>
              </CardHeader>
              <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-blue-900 mb-1">Sarah</h4>
            <p className="text-xs text-blue-700 mb-2">Fleet Operations Leader</p>
            <p className="text-xs text-muted-foreground">Manages 500+ users, needs confidence that access decisions won't create problems</p>
          </div>
          <div className="p-4 rounded-lg border border-purple-200 bg-purple-50">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-3">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-purple-900 mb-1">Alex</h4>
            <p className="text-xs text-purple-700 mb-2">Platform Engineer</p>
            <p className="text-xs text-muted-foreground">Technical oversight, needs programmatic control and debugging tools</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 bg-green-50">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-green-900 mb-1">Raj</h4>
            <p className="text-xs text-green-700 mb-2">IT/Compliance Manager</p>
            <p className="text-xs text-muted-foreground">Audit trails and bulk governance, reports to CISO</p>
          </div>
          <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mb-3">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-amber-900 mb-1">Maya</h4>
            <p className="text-xs text-amber-700 mb-2">Product Operations</p>
            <p className="text-xs text-muted-foreground">Ensures users can do jobs effectively, bridges business and tech</p>
          </div>
        </div>
              </CardContent>
            </Card>

    {/* Design Principles */}
    <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center">
          <Layers className="w-6 h-6 mr-2 text-green-600" />
          Design Principles Established
                </CardTitle>
        <CardDescription>Learned from early prototype feedback</CardDescription>
              </CardHeader>
              <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Dual Interface Strategy</h4>
            </div>
            <p className="text-sm text-blue-800">Simple for operators, powerful for developers</p>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <div className="flex items-center space-x-3 mb-3">
              <Eye className="w-8 h-8 text-green-600" />
              <h4 className="font-semibold text-green-900">Debuggable by Design</h4>
            </div>
            <p className="text-sm text-green-800">Every denial includes actionable trace</p>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <Truck className="w-8 h-8 text-purple-600" />
              <h4 className="font-semibold text-purple-900">Fleet-Context Aware</h4>
            </div>
            <p className="text-sm text-purple-800">Policies understand vehicles, routes, maintenance</p>
          </div>
        </div>
              </CardContent>
            </Card>
  </div>
);

// Component Architecture
const ComponentArchitecture = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Solution Architecture</h2>
      <p className="text-xl text-muted-foreground">
        Three breakthrough features addressing user pain points
      </p>
    </div>

    {/* Feature 1: Auth Sandbox */}
    <Card className="mb-8 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Feature 1: The Auth Sandbox (Vehicle & Service Simulator)</CardTitle>
            <CardDescription>Solving the "Black Box Debugging" problem</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-semibold mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              Left Panel: Actor Selection
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Dispatcher: Priya Gupta</li>
              <li>• Service: RouteOptimization-v3</li>
              <li>• Token: InsurancePartnerAPI-Allianz</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-semibold mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2 text-green-500" />
              Center Panel: Action & Resource
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Vehicle (VIN: FE-459-TKR)</li>
              <li>• MaintenanceLog (ID: 99812)</li>
              <li>• Real fleet attributes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-semibold mb-2 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-purple-500" />
              Right Panel: Interactive Trace
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Step-by-step evaluation</li>
              <li>• Clickable policy links</li>
              <li>• Actionable error messages</li>
            </ul>
          </div>
        </div>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Example Trace Output</AlertTitle>
              <AlertDescription>
            Policy 'MechanicGeofence' denied because vehicle.location ('Depot B') ≠ required ('Maintenance Bay A')
              </AlertDescription>
            </Alert>
        
                  <div className="mt-6 text-center">
            <Link href="/tech-admin" target="_blank">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Play className="w-4 h-4 mr-2" />
                Try the Auth Sandbox
              </Button>
            </Link>
          </div>
      </CardContent>
    </Card>

    {/* Feature 2: Visual Policy Builder */}
    <Card className="mb-8 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Feature 2: Visual Policy Builder (Fleet Policy Architect)</CardTitle>
            <CardDescription>Mad Libs-style interface for complex rules</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-6 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 mb-4">
          <h4 className="font-semibold mb-3">Template Example:</h4>
          <div className="font-mono text-sm p-4 bg-white rounded border">
            Allow <Badge variant="outline">Service: InsurancePartnerAPI</Badge> to{" "}
            <Badge variant="outline">read:telemetry</Badge> on{" "}
            <Badge variant="outline">Vehicle</Badge> IF{" "}
            <Badge variant="outline">Vehicle.InsurancePolicyID</Badge> EQUALS{" "}
            <Badge variant="outline">InsurancePartnerAPI.PolicyID</Badge>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-3 rounded bg-slate-50 border">
            <h5 className="font-medium text-sm mb-1">Emergency Override</h5>
            <p className="text-xs text-muted-foreground">Dispatcher elevated permissions during incidents</p>
          </div>
          <div className="p-3 rounded bg-slate-50 border">
            <h5 className="font-medium text-sm mb-1">Partner Logistics Access</h5>
            <p className="text-xs text-muted-foreground">Third-party read-only location for contracts</p>
          </div>
          <div className="p-3 rounded bg-slate-50 border">
            <h5 className="font-medium text-sm mb-1">Maintenance Bay Restrictions</h5>
            <p className="text-xs text-muted-foreground">Geofenced access for mechanics</p>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Feature 3: JIT Access - The "Wow" Feature */}
    <Card className="mb-8 hover:shadow-lg transition-all duration-300 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-amber-900">Feature 3: JIT Access with Event-Driven Triggers</CardTitle>
            <CardDescription className="text-amber-700">Proactive, autonomous fleet operation</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-amber-900">The Innovation</h4>
            <p className="text-sm text-amber-800 mb-4">
              Access as temporary response to real-world fleet events - moving from reactive security to proactive, autonomous fleet operation
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Critical brake failure alert</p>
                  <p className="text-xs text-muted-foreground">For active route vehicle</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Pre-configured access request</p>
                  <p className="text-xs text-muted-foreground">System presents mechanic access modal</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium">One-click approval</p>
                  <p className="text-xs text-muted-foreground">Manager approves, reduced cognitive load</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">4</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Auto-expiration</p>
                  <p className="text-xs text-muted-foreground">Access expires after 2 hours automatically</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white border border-amber-200">
            <h4 className="font-semibold mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-amber-600" />
              Audit Trail Story
            </h4>
            <div className="p-3 rounded bg-amber-50 border border-amber-200">
              <p className="text-sm font-mono text-amber-900">
                "2-hour temporary brake system access granted TO RESPOND TO brake failure event"
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Component Architecture Highlight */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
          <Layers className="w-6 h-6 mr-2 text-blue-600" />
          Component Architecture Highlight
                </CardTitle>
        <CardDescription>Design system integration strategy</CardDescription>
              </CardHeader>
              <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Reusable Atoms</h4>
            <ul className="text-xs space-y-1 text-blue-800">
              <li>• PermissionToggle</li>
              <li>• RoleIndicator</li>
              <li>• RiskBadge</li>
              <li>• StatusDot</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Smart Molecules</h4>
            <ul className="text-xs space-y-1 text-green-800">
              <li>• UserCard</li>
              <li>• PermissionGroup</li>
              <li>• RoleSelector</li>
              <li>• BulkActionBar</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Complex Organisms</h4>
            <ul className="text-xs space-y-1 text-purple-800">
              <li>• UserTable</li>
              <li>• UserEditDrawer</li>
              <li>• AccessDriftAnalyzer</li>
              <li>• BreakGlassPanel</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">Integration Strategy</h4>
            <div className="text-center">
              <div className="text-lg font-bold text-amber-600">80%</div>
              <p className="text-xs text-amber-800">Reuse existing components</p>
              <div className="text-lg font-bold text-amber-600 mt-1">20%</div>
              <p className="text-xs text-amber-800">RBAC-specific extensions</p>
            </div>
          </div>
        </div>
              </CardContent>
            </Card>
          </div>
);

// Results Component
const RBACResults = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Measured Impact</h2>
      <p className="text-xl text-muted-foreground">
        Quantified results and qualitative feedback
      </p>
    </div>

    {/* Prototype Demo Section */}
    <Card className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Play className="w-8 h-8 mr-3 text-blue-600" />
          Prototype Demonstration
        </CardTitle>
        <CardDescription>Live demo workflow - RBAC & JIT Access Control</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-white border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-sm">Simulate Failure</h4>
            </div>
            <p className="text-xs text-muted-foreground">Load-Balancing Service → Tipper Truck #5</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-sm">Interactive Trace</h4>
            </div>
            <p className="text-xs text-muted-foreground">Policy failure reason clearly displayed</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-sm">Create Policy</h4>
            </div>
            <p className="text-xs text-muted-foreground">Insurance partner access with visual builder</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">4</span>
              </div>
              <h4 className="font-semibold text-sm">JIT Demo</h4>
            </div>
            <p className="text-xs text-muted-foreground">Brake failure → temporary mechanic access</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rbac/users" target="_blank">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Play className="w-5 h-5 mr-2" />
                Launch RBAC Prototype Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/tech-admin" target="_blank">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Eye className="w-5 h-5 mr-2" />
                View Alex's Technical Interface
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Quantitative Results */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-green-900">Developer Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">2 hours → 10 seconds</div>
            <p className="text-sm text-green-800">Time to debug permission issues</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-900">Security Posture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
            <p className="text-sm text-blue-800">Access grants now have automatic expiration</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-purple-900">Operational Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">2 days → 5 minutes</div>
            <p className="text-sm text-purple-800">Policy creation time</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-amber-900">Support Reduction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">67%</div>
            <p className="text-sm text-amber-800">Decrease in permission-related tickets</p>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Qualitative Feedback */}
            <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <blockquote className="text-lg font-medium text-green-900 mb-2">
                "This is the first Access Management system that actually helps me debug."
              </blockquote>
              <cite className="text-green-700">— Platform Engineer</cite>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <blockquote className="text-lg font-medium text-blue-900 mb-2">
                "I can now confidently grant temporary access during emergencies."
              </blockquote>
              <cite className="text-blue-700">— Fleet Operations Manager</cite>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// API Portal Act 2 Components

// Stakeholder Vision Component
const StakeholderVision = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Design North Star & Business Goals</h2>
      <p className="text-xl text-muted-foreground">
        Strategic vision driving platform transformation
      </p>
    </div>

    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-blue-900">
          <Star className="w-8 h-8 mr-3 text-blue-600" />
          Design North Star
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-white rounded-lg border-2 border-dashed border-blue-300">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            "Design the fastest-to-trust API experience in the logistics industry"
          </h3>
          <p className="text-lg text-blue-700">
            Every design decision measured against this goal
          </p>
        </div>
      </CardContent>
    </Card>

    <div className="grid lg:grid-cols-2 gap-8 mb-8">
      {/* Business Goals */}
              <Card>
                <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-600" />
            Revenue & Growth Goals
          </CardTitle>
                </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Create New Revenue Streams</h4>
              <p className="text-sm text-green-800">Monetize fleet data through tiered API subscription plans</p>
              <div className="text-xs text-green-700 mt-2">
                Metric: API subscription revenue, active paid subscriptions
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Accelerate Partner Integration</h4>
              <p className="text-sm text-blue-800">Enable third-party integrations without engineering intervention</p>
              <div className="text-xs text-blue-700 mt-2">
                Metric: Time-to-first-API-call, active partner integrations
              </div>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Foster an Ecosystem</h4>
              <p className="text-sm text-purple-800">Position FleetEdge as central hub for connected fleet applications</p>
              <div className="text-xs text-purple-700 mt-2">
                Metric: Active developers, applications built on our APIs
              </div>
            </div>
          </div>
        </CardContent>
              </Card>

      {/* Operational Impact */}
              <Card>
                <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="w-6 h-6 mr-2 text-amber-600" />
            Operational Impact Targets
          </CardTitle>
                </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">Support Ticket Reduction</h4>
              <p className="text-sm text-amber-800 mb-2">API access issues = 25% of developer support tickets</p>
              <div className="flex items-center">
                <Badge variant="outline" className="bg-red-100 text-red-800 mr-2">Current</Badge>
                <ArrowRight className="w-4 h-4 mx-2" />
                <Badge className="bg-green-600 text-white">60% Reduction</Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Onboarding Speed</h4>
              <p className="text-sm text-green-800 mb-2">Time to first successful API call</p>
              <div className="flex items-center">
                <Badge variant="outline" className="bg-red-100 text-red-800 mr-2">3 days</Badge>
                <ArrowRight className="w-4 h-4 mx-2" />
                <Badge className="bg-green-600 text-white">&lt;20 minutes</Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Developer Autonomy</h4>
              <p className="text-sm text-blue-800">Eliminate dependency on internal teams for API access</p>
              <div className="text-xs text-blue-700 mt-2">
                Goal: 100% self-service from discovery to production
              </div>
            </div>
          </div>
        </CardContent>
              </Card>
            </div>

    {/* End State Vision */}
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center text-green-900">
          <Lightbulb className="w-6 h-6 mr-3" />
          End State Vision
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2 flex items-center">
              <X className="w-4 h-4 mr-2" />
              FROM: Manual Process
            </h4>
            <p className="text-sm text-red-800 italic">
              "A developer emails us for access and waits for a password-protected zip file..."
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              TO: Self-Service Platform
            </h4>
            <p className="text-sm text-green-800 italic">
              "A developer discovers our portal, signs up, browses APIs, generates keys, tests in playground, and integrates."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Platform Vision Component
const PlatformVision = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">The Platform Vision</h2>
      <p className="text-xl text-muted-foreground">
        From fleet management application to central nervous system for the entire fleet ecosystem
            </p>
          </div>

    {/* Strategic Narrative */}
    <Card className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardContent className="p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <blockquote className="text-xl font-medium text-blue-900 mb-4">
              "We needed to evolve from being a fleet management application to becoming the 
              <strong> central nervous system for the entire fleet ecosystem</strong>. This meant enabling 
              logistics partners, insurance companies, and large customers to build custom solutions using our telemetry data."
            </blockquote>
            <cite className="text-blue-700">— Strategic Vision</cite>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Business Transformation Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="border-green-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Revenue Diversification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Direct API monetization</p>
            <div className="text-2xl font-bold text-green-600">$50-$500</div>
            <p className="text-xs text-muted-foreground">per integration/month</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Ecosystem Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Partner platform stickiness</p>
            <div className="text-2xl font-bold text-blue-600">40%</div>
            <p className="text-xs text-muted-foreground">increase in retention</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Market Positioning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">First fleet platform with</p>
            <div className="text-lg font-bold text-purple-600">Developer-Grade</div>
            <p className="text-xs text-muted-foreground">API experience</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-3">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">Innovation Edge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Word-of-mouth marketing</p>
            <div className="text-2xl font-bold text-amber-600">60%</div>
            <p className="text-xs text-muted-foreground">warmer lead generation</p>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Competitive Landscape */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-red-600" />
          Competitive Pressure Reality Check
                </CardTitle>
              </CardHeader>
              <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Traditional Fleet Software</h4>
            <p className="text-sm text-red-800 mb-3">Limited, UI-forced integrations</p>
            <ul className="text-xs space-y-1 text-red-700">
              <li>• Manual data exports</li>
              <li>• Rigid workflow constraints</li>
              <li>• Vendor lock-in</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">General Purpose APIs</h4>
            <p className="text-sm text-amber-800 mb-3">Complex, not fleet-specific</p>
            <ul className="text-xs space-y-1 text-amber-700">
              <li>• Steep learning curves</li>
              <li>• Generic documentation</li>
              <li>• Missing fleet context</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">FleetEdge Opportunity</h4>
            <p className="text-sm text-green-800 mb-3">Fleet-native + developer-friendly</p>
            <ul className="text-xs space-y-1 text-green-700">
              <li>• Domain-specific APIs</li>
              <li>• Fleet-aware documentation</li>
              <li>• Industry standard setting</li>
            </ul>
          </div>
        </div>
              </CardContent>
            </Card>
  </div>
);

// Developer Research Component
const DeveloperResearch = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Understanding Developer Personas</h2>
      <p className="text-xl text-muted-foreground">
        Three distinct behavioral patterns discovered through research
      </p>
    </div>

    {/* Research Method */}
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-6 h-6 mr-2 text-blue-600" />
          Research Foundation
        </CardTitle>
        <CardDescription>5 developer interviews + 30-person survey across integration partners</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Quantitative Insights</h4>
            <ul className="text-sm space-y-1 text-blue-800">
              <li>• 30-person developer survey</li>
              <li>• Integration partner feedback</li>
              <li>• Support ticket analysis</li>
              <li>• Onboarding flow analytics</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Qualitative Research</h4>
            <ul className="text-sm space-y-1 text-green-800">
              <li>• 5 in-depth developer interviews</li>
              <li>• Journey mapping sessions</li>
              <li>• Pain point identification</li>
              <li>• Competitive analysis</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Three Developer Personas */}
    <div className="grid lg:grid-cols-3 gap-8 mb-12">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-blue-900">CLI-First Power Users</CardTitle>
              <CardDescription>Alex (Senior Developer)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Platform Quality Metric</span>
              <Badge variant="outline" className="text-blue-600 border-blue-300">CLI Sophistication</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              "I skip the UI entirely. Show me your CLI and I'll know if your platform is serious."
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Values speed and autonomy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Builds custom toolchains</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Automates everything</span>
            </div>
          </div>
        </CardContent>
          </Card>

      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-green-900">Docs-First Explorers</CardTitle>
              <CardDescription>Priya (Junior Developer)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Trust Building Process</span>
              <Badge variant="outline" className="text-green-600 border-green-300">Documentation Clarity</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              "I start with Google, then your docs. Clear examples = instant trust."
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-green-500" />
              <span className="text-sm">Googles first, docs second</span>
            </div>
            <div className="flex items-center space-x-2">
              <Copy className="w-4 h-4 text-green-500" />
              <span className="text-sm">Needs copy-paste examples</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span className="text-sm">Builds confidence through clarity</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
            <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-purple-900">UI-First Visual Learners</CardTitle>
              <CardDescription>Sam (Full-Stack Developer)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Learning Strategy</span>
              <Badge variant="outline" className="text-purple-600 border-purple-300">Visual Mental Models</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              "I navigate the web interface first to understand the data model, then I code."
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Builds mental model through UI</span>
            </div>
            <div className="flex items-center space-x-2">
              <Network className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Understands relationships visually</span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Prefers guided configuration</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Journey Friction Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          High-Impact Friction Points (From Research)
                </CardTitle>
              </CardHeader>
              <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-red-900">Discovery Phase</h4>
                <Badge variant="destructive">40% Abandonment</Badge>
              </div>
              <p className="text-sm text-red-800 mb-2">"API keys take too long to get"</p>
              <p className="text-xs text-muted-foreground">Solution: Instant self-service generation with scoped UI</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-amber-900">Integration Phase</h4>
                <Badge variant="secondary">70% First Call Failures</Badge>
              </div>
              <p className="text-sm text-amber-800 mb-2">"I'm afraid to rotate my production keys"</p>
              <p className="text-xs text-muted-foreground">Solution: Zero-downtime key rotation with grace periods</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-900">Onboarding Phase</h4>
                <Badge variant="outline">25% Drop-off</Badge>
              </div>
              <p className="text-sm text-blue-800 mb-2">"Error messages don't tell me what to do"</p>
              <p className="text-xs text-muted-foreground">Solution: Actionable error responses with fix suggestions</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-green-900">Success Metric</h4>
                <Badge variant="outline" className="text-green-600">Target: &lt;5 min</Badge>
              </div>
              <p className="text-sm text-green-800 mb-2">Time to first successful API call</p>
              <p className="text-xs text-muted-foreground">Currently: 45 minutes average</p>
            </div>
          </div>
        </div>
              </CardContent>
            </Card>
  </div>
);

// API Portal Friction & Failure Map
const APIFrictionMap = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Developer Journey Friction Points</h2>
      <p className="text-xl text-muted-foreground">
        Critical moments where developers abandon the platform or contact support
      </p>
    </div>

    <Card className="border-red-200 bg-gradient-to-br from-red-50 to-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center text-red-900">
          <AlertTriangle className="w-6 h-6 mr-3" />
          High-Drop-Off Points in Developer Onboarding
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Distribution Hell */}
          <div className="border-l-4 border-red-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Key Distribution Hell</h4>
                <Badge variant="destructive" className="mb-2">HIGH DROP-OFF</Badge>
                <p className="text-sm text-red-700">Onboarding bottleneck</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Developer's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"You're emailing me my secret key in a password-protected zip file? This feels so unprofessional and insecure. How long will this take?"</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• 36% developer drop-off before first API call<br/>• High support cost for manual key distribution<br/>• Unprofessional first impression</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">Self-serve, instant key generation with secure copy-to-clipboard</p>
              </div>
            </div>
          </div>

          {/* First API Call Failure */}
          <div className="border-l-4 border-amber-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">First API Call Failure</h4>
                <Badge variant="secondary" className="mb-2 bg-amber-100 text-amber-800">CRITICAL MOMENT</Badge>
                <p className="text-sm text-amber-700">Initial integration attempt</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Developer's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"403 Forbidden. That's it? Is my key wrong? Is the scope wrong? Do I not have access to this environment? I have no idea where to even start debugging."</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• 2.3 hours average debugging time<br/>• High support ticket volume<br/>• Developer confidence erosion</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">Interactive API Playground with actionable error messages</p>
              </div>
            </div>
          </div>

          {/* Production Key Rotation Terror */}
          <div className="border-l-4 border-purple-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Key Rotation Terror</h4>
                <Badge variant="secondary" className="mb-2 bg-purple-100 text-purple-800">SECURITY BLOCKER</Badge>
                <p className="text-sm text-purple-700">Maintenance operations</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Developer's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"I need to rotate this production key. I'm terrified. If I do this wrong, I'll take down production. I need to coordinate this perfectly with my deployment."</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• Developers avoid key rotation (security risk)<br/>• Production outages during rotation<br/>• Fear-based user behavior</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">Zero-downtime key rotation with grace periods</p>
              </div>
            </div>
          </div>

          {/* Team Onboarding Chaos */}
          <div className="border-l-4 border-blue-500 pl-6 py-4 bg-white rounded-r-lg">
            <div className="grid lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Team Onboarding Chaos</h4>
                <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-800">SCALING BLOCKER</Badge>
                <p className="text-sm text-blue-700">Adding new developers</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Developer's Internal Monologue:</h5>
                <p className="text-sm italic text-gray-600">"I need to give our new engineer, Priya, access to our staging keys. How do I do that securely? Do I just... paste the key into Slack? That feels wrong."</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Business Impact:</h5>
                <p className="text-sm text-gray-600">• Insecure credential sharing practices<br/>• No audit trail of access<br/>• Onboarding delays</p>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-1">Our Solution:</h5>
                <p className="text-sm text-green-600">Team & organization management with inherited access controls</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Research Synthesis Component
const ResearchSynthesis = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">UX Research Validation</h2>
      <p className="text-xl text-muted-foreground">
        Lean user research study confirming design strategy
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8 mb-8">
      {/* Research Methodology */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
            <Search className="w-6 h-6 mr-2 text-blue-600" />
            Research Methodology
                </CardTitle>
              </CardHeader>
              <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">5 In-Depth Interviews</h4>
              <p className="text-sm text-blue-800">60-minute remote sessions with developers who recently integrated third-party APIs</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">30-Developer Survey</h4>
              <p className="text-sm text-green-800">Quantitative validation of pain points and behavioral patterns</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Screen-Share Workflow Analysis</h4>
              <p className="text-sm text-purple-800">Observed actual integration workflows from docs to production</p>
            </div>
          </div>
              </CardContent>
            </Card>

      {/* Key Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-red-600" />
            Critical Research Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="text-3xl font-bold text-red-600 mb-2">70%</div>
              <h4 className="font-semibold text-red-900 mb-1">First API Call Failure Rate</h4>
              <p className="text-sm text-red-800">Most common: unclear authentication & missing parameters</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-3xl font-bold text-amber-600 mb-2">5 min</div>
              <h4 className="font-semibold text-amber-900 mb-1">Trust Decision Window</h4>
              <p className="text-sm text-amber-800">Trust is earned or lost in first 5 minutes</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">2 clicks</div>
              <h4 className="font-semibold text-blue-900 mb-1">Documentation Discovery</h4>
              <p className="text-sm text-blue-800">If docs aren't findable in 2 clicks, developers abandon</p>
            </div>
          </div>
              </CardContent>
            </Card>
          </div>

    {/* Research Quotes */}
    <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-slate-600" />
          Key User Insights
        </CardTitle>
        <CardDescription>Direct quotes that shaped our design strategy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Trust Quote with visual elements */}
            <div className="p-4 rounded-lg bg-white border-l-4 border-red-500 relative">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-red-900">Trust & First Impressions</h4>
                    <Badge variant="outline" className="text-xs border-red-300 text-red-700">2 clicks</Badge>
                  </div>
                  <blockquote className="text-sm italic text-gray-700 mb-2">
                    "If I can't find your API docs from the homepage in two clicks, I'm gone. It tells me you don't actually care about developers."
                  </blockquote>
                  <cite className="text-xs text-gray-500 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-700">A</span>
                    </div>
                    <span>Alex, Senior Developer</span>
                  </cite>
                </div>
              </div>
            </div>
            
            {/* Black Box Quote with visual elements */}
            <div className="p-4 rounded-lg bg-white border-l-4 border-amber-500 relative">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-amber-900">The Black Box Problem</h4>
                    <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">400 Error</Badge>
                  </div>
                  <blockquote className="text-sm italic text-gray-700 mb-2">
                    "The absolute worst is '400 Bad Request'. It's useless. Is my JSON malformed? Is a parameter wrong? Did I use a string instead of an int? I have to guess."
                  </blockquote>
                  <cite className="text-xs text-gray-500 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-700">A</span>
                    </div>
                    <span>Alex, Senior Developer</span>
                  </cite>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Security Quote with visual elements */}
            <div className="p-4 rounded-lg bg-white border-l-4 border-purple-500 relative">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-purple-900">Security Fear</h4>
                    <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">Key Rotation</Badge>
                  </div>
                  <blockquote className="text-sm italic text-gray-700 mb-2">
                    "Do I want to rotate my keys? Yes. Do I do it as often as I should? No. I'm always terrified it's going to break something in production."
                  </blockquote>
                  <cite className="text-xs text-gray-500 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-700">A</span>
                    </div>
                    <span>Alex, Senior Developer</span>
                  </cite>
                </div>
              </div>
            </div>
            
            {/* Golden Path Quote with visual elements */}
            <div className="p-4 rounded-lg bg-white border-l-4 border-blue-500 relative">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-blue-900">Golden Path Dependency</h4>
                    <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">Quick Start</Badge>
                  </div>
                  <blockquote className="text-sm italic text-gray-700 mb-2">
                    "When I start with a new API, I just look for the 'Quick Start' guide. I want to find a cURL command I can copy, see it work, and then adapt it for my code."
                  </blockquote>
                  <cite className="text-xs text-gray-500 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-green-700">P</span>
                    </div>
                    <span>Priya, Junior Developer</span>
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2">Research Impact on Design</h4>
          <p className="text-sm text-green-800">
            These insights directly validated our "Speed to Aha!" principle and informed the design of actionable error messages, interactive playground, and zero-downtime key rotation features.
            </p>
          </div>
      </CardContent>
    </Card>
  </div>
);

// API Portal Features Component
const APIPortalFeatures = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">API Portal Design & Features</h2>
      <p className="text-xl text-muted-foreground">
        Four core features addressing specific developer pain points
      </p>
    </div>

    {/* Feature 1: Self-Service API Key Management */}
    <Card className="mb-8 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Feature 1: Self-Service API Key Management</CardTitle>
            <CardDescription>Instant key generation with smart scoping and zero-downtime rotation</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-semibold mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
              Instant Generation
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• One-click API key creation</li>
              <li>• Smart scope suggestions</li>
              <li>• Environment-specific keys</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-semibold mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Smart Scoping
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Fleet-aware permissions</li>
              <li>• Resource-level control</li>
              <li>• Visual scope preview</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-semibold mb-2 flex items-center">
              <Timer className="w-4 h-4 mr-2 text-purple-500" />
              Zero-Downtime Rotation
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Grace period overlaps</li>
              <li>• Proactive expiry alerts</li>
              <li>• One-click renewal</li>
            </ul>
          </div>
        </div>
        <Alert>
          <Key className="h-4 w-4" />
          <AlertTitle>Innovation Highlight</AlertTitle>
          <AlertDescription>
            Fleet-scoped API keys: <code>read:telemetry[fleet.region=west]</code> - granular control at the data level
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>

    {/* The Documentation First Mistake */}
    <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center text-red-900">
          <AlertTriangle className="w-6 h-6 mr-3" />
          Early Strategy Failure: The "Documentation First" Mistake
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - The Strategy */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-red-900">The Original Strategy</h4>
            </div>
            
            {/* Visual representation of docs-first approach */}
            <div className="p-4 rounded-lg bg-white border border-red-200 mb-4">
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-600">"Great documentation solves everything"</span>
                </div>
                
                {/* Progress bar showing completion rate */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-600">Developer completion rate</span>
                  <span className="text-xs text-red-600 font-mono">25% (vs 60% target)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div className="bg-red-500 h-2 rounded-full w-1/4"></div>
                </div>
                
                {/* Static docs characteristics */}
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                  <div className="text-center p-1 bg-slate-50 rounded">Detailed</div>
                  <div className="text-center p-1 bg-slate-50 rounded">Static</div>
                  <div className="text-center p-1 bg-slate-50 rounded">Generic</div>
                </div>
              </div>
              
              <p className="text-sm text-red-800">
                We built comprehensive static docs first—detailed API reference, clear examples, proper formatting.
              </p>
            </div>
          </div>
          
          {/* Right Side - The Discovery */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-orange-900">The Embarrassing Discovery</h4>
            </div>
            
            {/* Visual representation of email sharing */}
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 mb-4">
              <div className="mb-3">
                {/* Email thread visual */}
                <div className="bg-white p-3 rounded border mb-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-orange-800 font-medium">CC: dev-team@partner.com</span>
                  </div>
                  <div className="text-xs text-orange-700 italic">
                    "Internal FleetEdge API Guide v2.1 - Environment Specific"
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-orange-700">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Developers bypassing official docs</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-orange-800">
                  We discovered developers were sharing internal docs about how to work with our API 
                  for their environment on a common CC email thread.
                </p>
                
                <div className="p-3 rounded-lg bg-white border border-orange-200 border-l-4 border-l-orange-500">
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-orange-800 italic">
                      "The documentation doesn't cater to our environment. 
                      Senior devs figured it out through testing and made an internal guide that's more reliable."
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-orange-700">
                  This was quite embarrassing and made us wonder how many had abandoned right after generating API keys.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Alert className="mt-6">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>The Insight</AlertTitle>
          <AlertDescription>
            After more research interviews understanding the friction point, I realized we needed an interactive testing playground 
            like solutions I had benchmarked. Developers needed to TEST, not just read. One solution would solve two problems: 
            environment-specific testing AND confidence building.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>

    {/* Feature 2: Interactive API Documentation */}
    <Card className="mb-8 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Feature 2: Interactive API Documentation</CardTitle>
            <CardDescription>Fleet-aware examples with live data playground (Born from failure above)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold mb-3 text-green-900">Fleet-Contextualized Examples</h4>
            <div className="font-mono text-sm p-3 bg-white rounded border mb-3">
              <div className="text-green-600">GET /vehicles/FE-459-TKR/telemetry</div>
              <div className="text-gray-500 text-xs mt-1">// Real fleet VIN from your test data</div>
            </div>
            <p className="text-sm text-green-800">Examples use actual fleet data, not generic placeholders</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-semibold mb-3 text-blue-900">Live API Playground</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Execute calls with your API keys</span>
              </div>
              <div className="flex items-center space-x-2">
                <Copy className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Copy curl commands</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Export as Postman collection</span>
              </div>
            </div>
          </div>
        </div>
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Design Innovation</AlertTitle>
          <AlertDescription>
            Smart examples that adapt based on user's fleet composition and integration goals
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>

    {/* Feature 3: CLI Experience */}
    <Card className="mb-8 hover:shadow-lg transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-blue-900">Feature 3: CLI Experience (The Power User Layer)</CardTitle>
            <CardDescription className="text-blue-700">First-class composable interface, not UI parity</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3 text-blue-900">Core CLI Commands</h4>
            <div className="space-y-3">
              <div className="p-3 rounded bg-gray-900 text-green-400 font-mono text-sm">
                <div>$ fleetedge login</div>
                <div className="text-gray-500"># OAuth flow with device code</div>
              </div>
              <div className="p-3 rounded bg-gray-900 text-green-400 font-mono text-sm">
                <div>$ fleetedge keys create --scope="read:telemetry"</div>
                <div className="text-gray-500"># Smart scope suggestions</div>
              </div>
              <div className="p-3 rounded bg-gray-900 text-green-400 font-mono text-sm">
                <div>$ fleetedge api call vehicles/FE-459-TKR</div>
                <div className="text-gray-500"># Direct API calls with auth handling</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-blue-900">Innovation: CLI-to-Web Bridge</h4>
            <div className="p-4 rounded-lg bg-white border border-blue-200 mb-4">
              <div className="font-mono text-sm text-red-600 mb-2">
                Error: Insufficient scope. 
              </div>
              <div className="font-mono text-sm text-blue-600">
                View details: https://portal.fleetedge.com/keys/abc123/scopes
              </div>
            </div>
            <p className="text-sm text-blue-800">CLI errors provide clickable URLs that deep-link to relevant portal pages</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-blue-100 border border-blue-300">
          <h4 className="font-semibold mb-2 text-blue-900">Advanced: CLI-to-PR Workflow</h4>
          <div className="font-mono text-sm text-blue-800">
            $ fleetedge keys rotate --create-pr
          </div>
          <p className="text-sm text-blue-700 mt-2">Automatically opens GitHub PR with updated API keys in your config files</p>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/api-portal/cli" target="_blank">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Terminal className="w-4 h-4 mr-2" />
              Try CLI Experience
                </Button>
          </Link>
        </div>
      </CardContent>
          </Card>

    {/* Feature 4: Developer Dashboard */}
    <Card className="mb-8 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <BarChart className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Feature 4: Developer Dashboard & Analytics</CardTitle>
            <CardDescription>Real-time insights into API usage and fleet integration health</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
            <PieChart className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-green-900 mb-1">API Health</h4>
            <div className="text-2xl font-bold text-green-600">99.2%</div>
            <p className="text-xs text-green-700">Success rate</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
            <LineChart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-900 mb-1">Usage Trends</h4>
            <div className="text-2xl font-bold text-blue-600">↑23%</div>
            <p className="text-xs text-blue-700">This month</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-center">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h4 className="font-semibold text-amber-900 mb-1">Response Time</h4>
            <div className="text-2xl font-bold text-amber-600">145ms</div>
            <p className="text-xs text-amber-700">P95 latency</p>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
            <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-900 mb-1">Fleet Coverage</h4>
            <div className="text-2xl font-bold text-purple-600">847</div>
            <p className="text-xs text-purple-700">Vehicles connected</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// API Portal Results Component
const APIPortalResults = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Developer Platform Impact</h2>
      <p className="text-xl text-muted-foreground">
        Transforming FleetEdge from closed system to thriving ecosystem
            </p>
          </div>

    {/* Prototype Demo Section */}
    <Card className="mb-12 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
            <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Globe className="w-8 h-8 mr-3 text-green-600" />
          API Portal Demonstration
        </CardTitle>
        <CardDescription>Complete developer onboarding to first API call</CardDescription>
            </CardHeader>
            <CardContent>
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-white border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-sm">Self-Service Signup</h4>
            </div>
            <p className="text-xs text-muted-foreground">Instant API key generation</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-sm">Live Playground</h4>
            </div>
            <p className="text-xs text-muted-foreground">Interactive API exploration</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-sm">CLI Setup</h4>
            </div>
            <p className="text-xs text-muted-foreground">One-command authentication</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">4</span>
              </div>
              <h4 className="font-semibold text-sm">Integration</h4>
            </div>
            <p className="text-xs text-muted-foreground">Copy-paste code examples</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">5</span>
              </div>
              <h4 className="font-semibold text-sm">Success</h4>
            </div>
            <p className="text-xs text-muted-foreground">First API call in 4 minutes</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/api-portal/marketplace" target="_blank">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Globe className="w-5 h-5 mr-2" />
                Launch API Portal Demo
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/api-portal/docs" target="_blank">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <BookOpen className="w-5 h-5 mr-2" />
                Interactive Docs Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
            </CardContent>
          </Card>

    {/* Quantitative Results */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-green-900">Time to First Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">45 min → 4 min</div>
            <p className="text-sm text-green-800">Developer onboarding time</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-900">Integration Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">300%</div>
            <p className="text-sm text-blue-800">Increase in API integrations</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-purple-900">Support Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">60%</div>
            <p className="text-sm text-purple-800">Reduction in API support tickets</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-amber-900">Revenue Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">3.2X</div>
            <p className="text-sm text-amber-800">Monthly recurring API revenue</p>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Qualitative Feedback */}
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <blockquote className="text-lg font-medium text-blue-900 mb-2">
                "Finally, a fleet API that doesn't make me feel like I'm fighting the platform. The CLI is actually better than most cloud providers."
              </blockquote>
              <cite className="text-blue-700">— Senior Developer, Logistics Partner</cite>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <ThumbsUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <blockquote className="text-lg font-medium text-green-900 mb-2">
                "We went from a 3-week integration timeline to 2 days. The documentation actually uses our fleet data!"
              </blockquote>
              <cite className="text-green-700">— CTO, Insurance Integration Partner</cite>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const PresentationPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />
      
      {/* Executive Summary - Strategic Positioning */}
      <ExecutiveSummary />
      
      {/* Phase 1: Strategic Context */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          {/* Business Evolution Timeline */}
          <div className="mb-32" id="business-evolution">
            <BusinessEvolutionTimeline />
          </div>
          
          {/* Problem Landscape */}
          <div className="mb-32">
            <ProblemLandscape />
          </div>
          
          {/* Strategic Vision */}
          <div className="mb-20">
            <StrategicVision />
          </div>
        </div>
        </section>

      {/* Phase 2: Case Studies */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Case Studies</h1>
            <p className="text-xl text-muted-foreground">
              Deep dive into two comprehensive design initiatives
            </p>
          </div>
        </div>
      </section>

      {/* ACT 1: RBAC & JIT ACCESS CONTROL */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">ACT 1</span>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold">RBAC & JIT Access Control</h1>
                <p className="text-xl text-muted-foreground">Designing access control for two different worlds</p>
              </div>
            </div>
          </div>

          {/* SITUATION */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                SITUATION
                    </Badge>
              <h2 className="text-3xl font-bold mb-4">The Two Worlds Problem</h2>
            </div>
            <TwoWorldsVisualization />
          </div>

          {/* TASK */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                TASK
                    </Badge>
              <h2 className="text-3xl font-bold mb-4">Problem Definition & Research</h2>
            </div>
            <ProblemDefinition />
            <div className="mt-16">
              <RBACFrictionMap />
            </div>
          </div>

          {/* ACTION */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                ACTION
                    </Badge>
              <h2 className="text-3xl font-bold mb-4">Design Process & Solutions</h2>
            </div>
            <DesignProcess />
            <div className="mt-16">
              <ComponentArchitecture />
            </div>
            <div className="mt-16">
              <SarahSimpleInterface />
            </div>
          </div>

          {/* RESULT */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                RESULT
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Prototype & Impact</h2>
            </div>
            <RBACResults />
          </div>
        </div>
        </section>

      {/* ACT 2: API PORTAL - THE NEW FRONT DOOR */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">ACT 2</span>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold">API Portal: The New Front Door</h1>
                <p className="text-xl text-muted-foreground">Transforming FleetEdge into a developer-first platform</p>
              </div>
            </div>
          </div>

          {/* SITUATION */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                SITUATION
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Platform Expansion Strategy</h2>
            </div>
            <PlatformVision />
            <div className="mt-16">
              <StakeholderVision />
            </div>
          </div>

          {/* TASK */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                TASK
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Developer Experience Research</h2>
            </div>
            <DeveloperResearch />
            <div className="mt-16">
              <APIFrictionMap />
            </div>
            <div className="mt-16">
              <ResearchSynthesis />
            </div>
          </div>

          {/* ACTION */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                ACTION
              </Badge>
              <h2 className="text-3xl font-bold mb-4">API Portal Design & Features</h2>
            </div>
            <APIPortalFeatures />
          </div>

          {/* RESULT */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-lg px-6 py-2 mb-4">
                RESULT
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Platform Transformation Impact</h2>
            </div>
            <APIPortalResults />
          </div>
        </div>
      </section>

      {/* Final Summary */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pototypes</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Two comprehensive case studies demonstrating strategic design leadership
          </p>
                     <div className="flex justify-center space-x-4">
             <Link href="/rbac/users" target="_blank">
               <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                 <Play className="w-5 h-5 mr-2" />
                 View RBAC Prototype
            </Button>
              </Link>
             <Link href="/api-portal/marketplace" target="_blank">
               <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                 <Globe className="w-5 h-5 mr-2" />
                 Explore API Portal
            </Button>
              </Link>
           </div>
          </div>
        </section>
    </div>
  );
};

export default PresentationPage; 