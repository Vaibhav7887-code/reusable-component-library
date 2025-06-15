"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@/components/atoms/icon";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TerminalCommand {
  command: string;
  description: string;
  output: string;
  category: 'auth' | 'api' | 'keys' | 'config' | 'data';
}

const commands: TerminalCommand[] = [
  {
    command: "fleetedge auth login",
    description: "Authenticate with your FleetEdge account",
    category: "auth",
    output: `✓ Opening browser for authentication...
✓ Successfully authenticated as alex@partner-inc.com
✓ Organization: Partner Inc. (Pro Plan)
✓ Default project set to: fleet-prod-2024`
  },
  {
    command: "fleetedge keys list",
    description: "List all your API keys",
    category: "keys",
    output: `┌─────────────────┬──────────────────┬─────────────┬─────────────┬─────────────┐
│ Name            │ Key ID           │ Environment │ Status      │ Last Used   │
├─────────────────┼──────────────────┼─────────────┼─────────────┼─────────────┤
│ Production App  │ fe_sk_prod_xxxx  │ production  │ active      │ 2 hours ago │
│ Staging Tester  │ fe_sk_stag_yyyy  │ staging     │ active      │ 1 day ago   │
│ Dev Environment │ fe_sk_dev_zzzz   │ development │ expiring    │ 3 days ago  │
└─────────────────┴──────────────────┴─────────────┴─────────────┴─────────────┘

⚠️  Warning: 'Dev Environment' key expires in 5 days
💡 Tip: Use 'fleetedge keys rotate dev_environment' to rotate the key`
  },
  {
    command: "fleetedge api call vehicles/1HGBH41JXMN109186",
    description: "Make an API call to get vehicle information",
    category: "api",
    output: `✓ Using key: Production App (fe_sk_prod_xxxx)
✓ GET https://api.fleetedge.com/v2/telemetry/vehicles/1HGBH41JXMN109186

{
  "vin": "1HGBH41JXMN109186",
  "make": "Honda",
  "model": "Accord",
  "year": 2023,
  "status": "active",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060,
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "fuel": {
    "level": 82,
    "efficiency": 28.5
  }
}

✓ Response: 200 OK (245ms)
✓ Rate limit: 99/100 requests remaining`
  },
  {
    command: "fleetedge api call vehicles/INVALID-VIN --key staging_key",
    description: "Example of CLI error with web bridge",
    category: "api",
    output: `❌ ERROR: Insufficient scope. This action requires 'read:telemetry[fleet.region=west]'

🔗 View details: https://portal.fleetedge.com/keys/abc123/scopes
🔗 Generate new key: https://portal.fleetedge.com/keys/new
🔗 Check documentation: https://docs.fleetedge.com/scopes

💡 Tip: Use 'fleetedge keys create --scope="read:telemetry[fleet.region=west]"' to create a key with the required permissions.`
  },
  {
    command: "fleetedge keys rotate prod_key --create-pr",
    description: "Advanced: CLI-to-PR workflow for automated key rotation",
    category: "keys",
    output: `🔄 Rotating key: prod_key (fe_sk_prod_abc123...)
✓ New key generated: fe_sk_prod_def456...
✓ Grace period: 48 hours (both keys active)

🚀 GitHub Integration:
✓ Branch created: feature/rotate-api-key-prod_key
✓ Updated environment files:
  - .env.production
  - k8s/secrets/api-keys.yaml
  - terraform/variables.tf

📝 Pull Request Created:
  Title: "feat(security): Rotate production API key"
  URL: https://github.com/your-org/fleet-app/pull/431
  
✅ All checks passing:
  ✓ Security scan passed
  ✓ Tests passed  
  ✓ Deployment preview ready

💡 Next steps:
  1. Review PR: https://github.com/your-org/fleet-app/pull/431
  2. Merge when ready
  3. Old key will be revoked after grace period (48h)`
  },
  {
    command: "fleetedge keys create --name 'Mobile App' --scopes vehicles:read,location:read",
    description: "Create a new API key with specific scopes",
    category: "keys",
    output: `✓ Creating new API key...
✓ Key created successfully!

┌─────────────────────────────────────────────────────────────┐
│                        🔑 NEW API KEY                       │
├─────────────────────────────────────────────────────────────┤
│ Name: Mobile App                                            │
│ Key:  fe_sk_prod_abc123def456ghi789jkl012mno345pqr678stu901 │
│ Scopes: vehicles:read, location:read                        │
│ Environment: production                                     │
│ Created: 2024-01-15T10:30:00Z                              │
└─────────────────────────────────────────────────────────────┘

⚠️  IMPORTANT: Save this key securely. It won't be shown again.
💡 Tip: Use 'fleetedge config set-key mobile_app <key>' to save locally`
  },
  {
    command: "fleetedge usage --last 7d",
    description: "View API usage statistics for the last 7 days",
    category: "data",
    output: `📊 API Usage Report (Last 7 Days)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Requests: 8,450 / 10,000 (84.5% of monthly quota)
Success Rate: 99.2%
Avg Response Time: 245ms
Error Rate: 0.8%

Top Endpoints:
┌─────────────────────────────┬───────────┬──────────┬────────────┐
│ Endpoint                    │ Requests  │ Avg Time │ Error Rate │
├─────────────────────────────┼───────────┼──────────┼────────────┤
│ /vehicles/{vin}             │ 5,200     │ 180ms    │ 0.2%       │
│ /vehicles/{vin}/location    │ 2,100     │ 95ms     │ 0.1%       │
│ /vehicles/{vin}/fuel        │ 850       │ 220ms    │ 0.9%       │
│ /vehicles/search            │ 300       │ 340ms    │ 0.7%       │
└─────────────────────────────┴───────────┴──────────┴────────────┘

💡 Tip: Use 'fleetedge usage --endpoint /vehicles/{vin}' for detailed stats`
  },
  {
    command: "fleetedge config show",
    description: "Show current CLI configuration",
    category: "config",
    output: `📋 FleetEdge CLI Configuration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User: alex@partner-inc.com
Organization: Partner Inc. (org_1)
Plan: Pro
Default Environment: production
Default Key: Production App (fe_sk_prod_xxxx)
API Base URL: https://api.fleetedge.com/v2
CLI Version: 1.2.0

Saved Keys:
  • production_app: fe_sk_prod_xxxx (active)
  • staging_tester: fe_sk_stag_yyyy (active)
  • mobile_app: fe_sk_prod_abc123 (active)

💡 Tip: Use 'fleetedge config set-default-key <name>' to change default`
  }
];

const installationSteps = [
  {
    platform: "macOS",
    icon: "apple",
    commands: [
      "brew install fleetedge/tap/fleetedge",
      "fleetedge --version"
    ]
  },
  {
    platform: "Linux",
    icon: "terminal",
    commands: [
      "curl -fsSL https://cli.fleetedge.com/install.sh | sh",
      "fleetedge --version"
    ]
  },
  {
    platform: "Windows",
    icon: "windows",
    commands: [
      "winget install FleetEdge.CLI",
      "fleetedge --version"
    ]
  },
  {
    platform: "npm",
    icon: "package",
    commands: [
      "npm install -g @fleetedge/cli",
      "fleetedge --version"
    ]
  }
];

export function CliExperience() {
  const [activeCommand, setActiveCommand] = React.useState(commands[0]);
  const [terminalInput, setTerminalInput] = React.useState("");
  const [terminalHistory, setTerminalHistory] = React.useState<string[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);

  const handleRunCommand = () => {
    if (!terminalInput.trim()) return;
    
    setIsTyping(true);
    setTerminalHistory(prev => [...prev, `$ ${terminalInput}`]);
    
    // Find matching command
    const matchedCommand = commands.find(cmd => 
      cmd.command.toLowerCase().includes(terminalInput.toLowerCase()) ||
      terminalInput.toLowerCase().includes(cmd.command.toLowerCase())
    );
    
    setTimeout(() => {
      if (matchedCommand) {
        setTerminalHistory(prev => [...prev, matchedCommand.output]);
        toast.success("Command executed successfully");
      } else {
        setTerminalHistory(prev => [...prev, `Command not found: ${terminalInput}`]);
        toast.error("Command not found");
      }
      setIsTyping(false);
      setTerminalInput("");
    }, 1500);
  };

  const clearTerminal = () => {
    setTerminalHistory([]);
  };

  const categories = Array.from(new Set(commands.map(cmd => cmd.category)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Icon name="terminal" className="w-8 h-8" />
          <h1 className="text-4xl font-bold">FleetEdge CLI</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Powerful command-line interface for managing your FleetEdge APIs, keys, and data with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="download" className="w-4 h-4 mr-2" />
            Install CLI
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="book-open" className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </div>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Installation</CardTitle>
          <CardDescription>
            Get started with the FleetEdge CLI in seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {installationSteps.map((step) => (
              <div key={step.platform} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name={step.icon} className="w-5 h-5" />
                  <span className="font-medium">{step.platform}</span>
                </div>
                <div className="space-y-2">
                  {step.commands.map((command, index) => (
                    <div key={index}>
                      <SyntaxHighlighter
                        language="bash"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '0.5rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        {command}
                      </SyntaxHighlighter>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Command Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Command Reference</CardTitle>
            <CardDescription>
              Explore available CLI commands and their usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="auth">Auth</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {commands.map((command, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-colors",
                          activeCommand.command === command.command
                            ? "bg-primary/10 border-primary/20"
                            : "hover:bg-muted/50"
                        )}
                        onClick={() => setActiveCommand(command)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {command.category}
                          </Badge>
                          <code className="text-sm font-mono">
                            {command.command}
                          </code>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {command.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {commands.slice(0, 3).map((command, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50"
                        onClick={() => setActiveCommand(command)}
                      >
                        <code className="text-sm font-mono block mb-1">
                          {command.command}
                        </code>
                        <p className="text-xs text-muted-foreground">
                          {command.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="auth" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {commands.filter(cmd => cmd.category === 'auth').map((command, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50"
                        onClick={() => setActiveCommand(command)}
                      >
                        <code className="text-sm font-mono block mb-1">
                          {command.command}
                        </code>
                        <p className="text-xs text-muted-foreground">
                          {command.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Interactive Terminal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5" />
              Interactive Terminal
            </CardTitle>
            <CardDescription>
              Try CLI commands in this simulated environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 text-green-400">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-gray-400">FleetEdge CLI v1.2.0</span>
              </div>
              
              <ScrollArea className="h-[300px] mb-4">
                <div className="space-y-2 text-gray-300">
                  <div className="text-green-400">
                    Welcome to FleetEdge CLI! Type a command or click one from the reference.
                  </div>
                  {terminalHistory.map((line, index) => (
                    <div key={index} className={line.startsWith('$') ? 'text-blue-400' : 'text-gray-300'}>
                      {line.includes('https://') ? (
                        <span>
                          {line.split('https://').map((part, partIndex) => (
                            partIndex === 0 ? part : (
                              <span key={partIndex}>
                                <button 
                                  className="text-blue-400 underline hover:text-blue-300 cursor-pointer"
                                  onClick={() => {
                                    const url = `https://${part.split(' ')[0]}`;
                                    if (url.includes('portal.fleetedge.com')) {
                                      // Simulate navigation to portal
                                      toast.success('Navigating to portal...', {
                                        description: `Opening ${url}`
                                      });
                                    } else {
                                      window.open(url, '_blank');
                                    }
                                  }}
                                >
                                  https://{part.split(' ')[0]}
                                </button>
                                {part.includes(' ') ? ' ' + part.split(' ').slice(1).join(' ') : ''}
                              </span>
                            )
                          ))}
                        </span>
                      ) : line}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-yellow-400">
                      <Icon name="loader-2" className="w-4 h-4 inline animate-spin mr-2" />
                      Executing command...
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <Input
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRunCommand();
                    }
                  }}
                  placeholder="Type a command..."
                  className="bg-transparent border-none text-white placeholder-gray-500 focus:ring-0"
                />
                <Button
                  size="sm"
                  onClick={handleRunCommand}
                  disabled={!terminalInput.trim() || isTyping}
                >
                  Run
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearTerminal}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Command Output Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Command Output</CardTitle>
          <CardDescription>
            Preview of: <code className="text-sm">{activeCommand.command}</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter
            language="bash"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            {`$ ${activeCommand.command}\n${activeCommand.output}`}
          </SyntaxHighlighter>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="zap" className="w-5 h-5" />
              Fast & Efficient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Optimized for speed with intelligent caching and minimal network requests.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="shield" className="w-5 h-5" />
              Secure by Default
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built-in security features including key rotation and secure credential storage.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="puzzle" className="w-5 h-5" />
              Extensible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Plugin system and scripting support for custom workflows and automation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 