"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/atoms/icon";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from "@/lib/utils";
import { mockApiProducts } from '@/lib/api-portal-data';
import { ApiProduct, ApiEndpoint, ApiResponse, CodeExample } from '@/types/api-portal';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApiDocumentationProps {
  apiId?: string;
}

export function ApiDocumentation({ apiId }: ApiDocumentationProps) {
  const [selectedApi, setSelectedApi] = React.useState<ApiProduct>(
    apiId ? mockApiProducts.find(api => api.id === apiId) || mockApiProducts[0] : mockApiProducts[0]
  );
  const [selectedEndpoint, setSelectedEndpoint] = React.useState<ApiEndpoint | null>(null);
  const [activeSection, setActiveSection] = React.useState('overview');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedVersion, setSelectedVersion] = React.useState('2.1.0');

  React.useEffect(() => {
    if (selectedApi.endpoints.length > 0) {
      setSelectedEndpoint(selectedApi.endpoints[0]);
    }
  }, [selectedApi]);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-600 bg-green-50 border-green-200';
      case 'POST': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'PUT': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'DELETE': return 'text-red-600 bg-red-50 border-red-200';
      case 'PATCH': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const generateCodeExample = (endpoint: ApiEndpoint, language: string) => {
    const baseUrl = 'https://api.fleetedge.com/v2';
    let path = endpoint.path;
    
    // Replace path parameters with examples
    endpoint.parameters
      .filter(p => p.in === 'path')
      .forEach(param => {
        path = path.replace(`{${param.name}}`, param.example || 'example');
      });

    const fullUrl = `${baseUrl}${path}`;

    switch (language) {
      case 'curl':
        let curlCmd = `curl -X ${endpoint.method} "${fullUrl}"`;
        curlCmd += ` \\\n  -H "Authorization: Bearer YOUR_API_KEY"`;
        curlCmd += ` \\\n  -H "Content-Type: application/json"`;
        
        if (endpoint.method !== 'GET') {
          curlCmd += ` \\\n  -d '{
    "example": "data"
  }'`;
        }
        return curlCmd;

      case 'javascript':
        let jsCode = `const response = await fetch('${fullUrl}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }`;
        
        if (endpoint.method !== 'GET') {
          jsCode += `,
  body: JSON.stringify({
    example: 'data'
  })`;
        }
        
        jsCode += `
});

const data = await response.json();
console.log(data);`;
        return jsCode;

      case 'python':
        let pyCode = `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}`;

        if (endpoint.method !== 'GET') {
          pyCode += `
data = {
    "example": "data"
}

response = requests.${endpoint.method.toLowerCase()}(url, headers=headers, json=data)`;
        } else {
          pyCode += `

response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`;
        }
        
        pyCode += `
print(response.json())`;
        return pyCode;

      default:
        return '';
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">API Documentation</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive guides and references
          </p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-4 space-y-4">
            {/* API Selector */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">APIs</h3>
              {mockApiProducts.map((api) => (
                <button
                  key={api.id}
                  onClick={() => setSelectedApi(api)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-colors",
                    selectedApi.id === api.id 
                      ? "bg-primary/10 border-primary/20" 
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={api.icon} className="w-4 h-4" />
                    <span className="font-medium text-sm">{api.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {api.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      v{api.version}
                    </Badge>
                    <Badge 
                      variant={api.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {api.status}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>

            <Separator />

            {/* Navigation */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sections</h3>
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: 'book-open' },
                  { id: 'authentication', label: 'Authentication', icon: 'key' },
                  { id: 'endpoints', label: 'Endpoints', icon: 'globe' },
                  { id: 'examples', label: 'Code Examples', icon: 'code' },
                  { id: 'errors', label: 'Error Handling', icon: 'alert-triangle' },
                  { id: 'sdks', label: 'SDKs & Libraries', icon: 'package' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/50"
                    )}
                  >
                    <Icon name={section.icon} className="w-4 h-4" />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Endpoints List */}
            {activeSection === 'endpoints' && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Endpoints</h3>
                  <div className="space-y-1">
                    {selectedApi.endpoints.map((endpoint: ApiEndpoint) => (
                      <button
                        key={endpoint.id}
                        onClick={() => setSelectedEndpoint(endpoint)}
                        className={cn(
                          "w-full text-left p-2 rounded-md border transition-colors",
                          selectedEndpoint?.id === endpoint.id
                            ? "bg-primary/10 border-primary/20"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            className={cn("text-xs", getMethodColor(endpoint.method))}
                            variant="outline"
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-xs font-mono">{endpoint.path}</code>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {endpoint.summary}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{selectedApi.name}</h1>
              <p className="text-muted-foreground">{selectedApi.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Icon name="download" className="w-4 h-4 mr-2" />
                Download OpenAPI
              </Button>
              <Button>
                <Icon name="play" className="w-4 h-4 mr-2" />
                Try in Playground
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-6">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedApi.documentation }} />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedApi.endpoints.length}</div>
                        <p className="text-sm text-muted-foreground">Endpoints</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">v{selectedApi.version}</div>
                        <p className="text-sm text-muted-foreground">Version</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedApi.rateLimit.requests}</div>
                        <p className="text-sm text-muted-foreground">Rate Limit</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-sm text-muted-foreground">Uptime</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'authentication' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Authentication</h2>
                  <p className="text-muted-foreground mb-6">
                    All API requests require authentication using an API key.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>API Key Authentication</CardTitle>
                    <CardDescription>
                      Include your API key in the Authorization header
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SyntaxHighlighter
                      language="bash"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                    >
                      {`Authorization: Bearer fe_sk_your_api_key_here`}
                    </SyntaxHighlighter>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scopes</CardTitle>
                    <CardDescription>
                      API keys can be configured with specific scopes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedApi.scopes.map((scope: string) => (
                        <div key={scope} className="flex items-center gap-3">
                          <Badge variant="outline">{scope}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {scope.includes('read') ? 'Read access' : 
                             scope.includes('write') ? 'Write access' : 
                             'Special access'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'endpoints' && selectedEndpoint && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge 
                    className={cn("text-sm", getMethodColor(selectedEndpoint.method))}
                    variant="outline"
                  >
                    {selectedEndpoint.method}
                  </Badge>
                  <code className="text-lg font-mono">{selectedEndpoint.path}</code>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-2">{selectedEndpoint.summary}</h2>
                  <p className="text-muted-foreground">{selectedEndpoint.description}</p>
                </div>

                {/* Parameters */}
                {selectedEndpoint.parameters.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Parameters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedEndpoint.parameters.map((param: { name: string; required: boolean; in: string; type: string; description: string; example?: any; }) => (
                          <div key={param.name} className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <code className="font-mono text-sm">{param.name}</code>
                              {param.required && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                              <Badge variant="outline" className="text-xs">{param.type}</Badge>
                              <Badge variant="outline" className="text-xs">{param.in}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {param.description}
                            </p>
                            {param.example && (
                              <div>
                                <span className="text-xs font-medium">Example: </span>
                                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                  {param.example}
                                </code>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Responses */}
                <Card>
                  <CardHeader>
                    <CardTitle>Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEndpoint.responses.map((response: ApiResponse) => (
                        <div key={response.status} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant={response.status < 300 ? 'default' : 'destructive'}
                              className="text-sm"
                            >
                              {response.status}
                            </Badge>
                            <span className="font-medium">{response.description}</span>
                          </div>
                          {response.content && (
                            <div className="mt-3">
                              <Tabs defaultValue="example">
                                <TabsList>
                                  <TabsTrigger value="example">Example</TabsTrigger>
                                  <TabsTrigger value="schema">Schema</TabsTrigger>
                                </TabsList>
                                <TabsContent value="example" className="mt-3">
                                  <SyntaxHighlighter
                                    language="json"
                                    style={vscDarkPlus}
                                    customStyle={{ 
                                      margin: 0, 
                                      borderRadius: '0.5rem',
                                      fontSize: '0.75rem'
                                    }}
                                  >
                                    {JSON.stringify(
                                      response.content['application/json']?.example || {}, 
                                      null, 
                                      2
                                    )}
                                  </SyntaxHighlighter>
                                </TabsContent>
                                <TabsContent value="schema" className="mt-3">
                                  <div className="text-sm text-muted-foreground">
                                    Schema documentation would go here
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Code Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle>Code Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="curl">
                      <TabsList>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                      </TabsList>
                      <TabsContent value="curl" className="mt-4">
                        <SyntaxHighlighter
                          language="bash"
                          style={vscDarkPlus}
                          customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                        >
                          {generateCodeExample(selectedEndpoint, 'curl')}
                        </SyntaxHighlighter>
                      </TabsContent>
                      <TabsContent value="javascript" className="mt-4">
                        <SyntaxHighlighter
                          language="javascript"
                          style={vscDarkPlus}
                          customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                        >
                          {generateCodeExample(selectedEndpoint, 'javascript')}
                        </SyntaxHighlighter>
                      </TabsContent>
                      <TabsContent value="python" className="mt-4">
                        <SyntaxHighlighter
                          language="python"
                          style={vscDarkPlus}
                          customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                        >
                          {generateCodeExample(selectedEndpoint, 'python')}
                        </SyntaxHighlighter>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'examples' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Code Examples</h2>
                  <p className="text-muted-foreground">
                    Ready-to-use code examples in multiple programming languages
                  </p>
                </div>

                {selectedApi.examples.map((example: CodeExample) => (
                  <Card key={example.language}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="code" className="w-5 h-5" />
                        {example.title}
                      </CardTitle>
                      {example.description && (
                        <CardDescription>{example.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <SyntaxHighlighter
                        language={example.language}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                      >
                        {example.code}
                      </SyntaxHighlighter>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeSection === 'errors' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Error Handling</h2>
                  <p className="text-muted-foreground">
                    Understanding and handling API errors effectively
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Common Error Codes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { code: 400, title: 'Bad Request', description: 'Invalid request parameters' },
                        { code: 401, title: 'Unauthorized', description: 'Invalid or missing API key' },
                        { code: 403, title: 'Forbidden', description: 'Insufficient permissions' },
                        { code: 404, title: 'Not Found', description: 'Resource not found' },
                        { code: 429, title: 'Rate Limited', description: 'Too many requests' },
                        { code: 500, title: 'Server Error', description: 'Internal server error' }
                      ].map((error) => (
                        <div key={error.code} className="flex items-start gap-3 p-3 border rounded-lg">
                          <Badge variant="destructive">{error.code}</Badge>
                          <div>
                            <div className="font-medium">{error.title}</div>
                            <div className="text-sm text-muted-foreground">{error.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Error Response Format</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SyntaxHighlighter
                      language="json"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                    >
                      {`{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or has expired.",
    "details": {
      "key_id": "fe_sk_...",
      "expires_at": "2024-01-15T10:30:00Z"
    },
    "suggestions": [
      "Check that your API key is correct",
      "Ensure the key has not expired",
      "Verify the key has the required scopes"
    ],
    "docs_url": "https://docs.fleetedge.com/authentication"
  }
}`}
                    </SyntaxHighlighter>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'sdks' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">SDKs & Libraries</h2>
                  <p className="text-muted-foreground">
                    Official and community-maintained libraries for popular programming languages
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'JavaScript/TypeScript', icon: 'code', status: 'Official', install: 'npm install @fleetedge/sdk' },
                    { name: 'Python', icon: 'code', status: 'Official', install: 'pip install fleetedge-sdk' },
                    { name: 'Go', icon: 'code', status: 'Official', install: 'go get github.com/fleetedge/go-sdk' },
                    { name: 'Java', icon: 'code', status: 'Community', install: 'Maven/Gradle available' },
                    { name: 'PHP', icon: 'code', status: 'Community', install: 'composer install fleetedge/sdk' },
                    { name: 'Ruby', icon: 'code', status: 'Community', install: 'gem install fleetedge' }
                  ].map((sdk) => (
                    <Card key={sdk.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name={sdk.icon} className="w-5 h-5" />
                          {sdk.name}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant={sdk.status === 'Official' ? 'default' : 'secondary'}>
                            {sdk.status}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium">Installation:</span>
                            <code className="block mt-1 p-2 bg-muted rounded text-sm">
                              {sdk.install}
                            </code>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Icon name="github" className="w-4 h-4 mr-1" />
                              GitHub
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="book-open" className="w-4 h-4 mr-1" />
                              Docs
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
} 