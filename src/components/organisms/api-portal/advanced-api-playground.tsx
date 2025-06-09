"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@/components/atoms/icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from "sonner";
import { 
  ApiProduct, 
  ApiEndpoint, 
  PlaygroundRequest, 
  PlaygroundResponse,
  ApiError,
  CodeExample,
} from "@/types/api-portal";
import { ApiPortalService, mockApiProducts } from "@/lib/api-portal-data";

interface PlaygroundProps {
  apiProduct?: ApiProduct;
  initialEndpoint?: string;
}

export function AdvancedApiPlayground({ apiProduct, initialEndpoint }: PlaygroundProps) {
  const product = apiProduct || mockApiProducts[0];
  const [selectedEndpoint, setSelectedEndpoint] = React.useState<ApiEndpoint>(
    product.endpoints.find(ep => ep.id === initialEndpoint) || product.endpoints[0]
  );
  const [parameters, setParameters] = React.useState<Record<string, any>>({});
  const [headers, setHeaders] = React.useState<Record<string, string>>({
    'Authorization': 'Bearer fe_sk_your_api_key_here',
    'Content-Type': 'application/json'
  });
  const [requestBody, setRequestBody] = React.useState('');
  const [response, setResponse] = React.useState<PlaygroundResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [requestHistory, setRequestHistory] = React.useState<PlaygroundRequest[]>([]);
  const [activeTab, setActiveTab] = React.useState('playground');

  // Update parameters when endpoint changes
  React.useEffect(() => {
    const newParams: Record<string, any> = {};
    selectedEndpoint.parameters.forEach(param => {
      if (param.example) {
        newParams[param.name] = param.example;
      }
    });
    setParameters(newParams);
    
    // Clear previous response when endpoint changes
    setResponse(null);
  }, [selectedEndpoint]);

  const updateParameter = (name: string, value: any) => {
    setParameters(prev => ({ ...prev, [name]: value }));
  };

  const updateHeader = (key: string, value: string) => {
    setHeaders(prev => ({ ...prev, [key]: value }));
  };

  const addHeader = () => {
    const key = `X-Custom-Header-${Object.keys(headers).length}`;
    setHeaders(prev => ({ ...prev, [key]: '' }));
  };

  const removeHeader = (key: string) => {
    setHeaders(prev => {
      const newHeaders = { ...prev };
      delete newHeaders[key];
      return newHeaders;
    });
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    setResponse(null);

    const request: PlaygroundRequest = {
      id: `req_${Date.now()}`,
      endpoint: selectedEndpoint,
      parameters,
      headers,
      body: requestBody ? JSON.parse(requestBody) : undefined,
      timestamp: new Date()
    };

    try {
      const result = await ApiPortalService.executePlaygroundRequest(request);
      setResponse(result);
      setRequestHistory(prev => [request, ...prev.slice(0, 9)]); // Keep last 10 requests
      
      if (result.error) {
        toast.error('Request failed', { 
          description: result.error,
          duration: 5000 
        });
      } else {
        toast.success('Request successful', {
          description: `${result.status} response in ${result.duration}ms`
        });
      }
    } catch (error) {
      toast.error('Request failed', { 
        description: 'An unexpected error occurred',
        duration: 5000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 400 && status < 500) return 'text-orange-500';
    if (status >= 500) return 'text-red-500';
    return 'text-gray-500';
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const generateCodeSample = (language: string) => {
    const baseUrl = 'https://api.fleetedge.com/v2/telemetry';
    let url = selectedEndpoint.path;
    
    // Replace path parameters
    selectedEndpoint.parameters
      .filter(p => p.in === 'path')
      .forEach(param => {
        url = url.replace(`{${param.name}}`, parameters[param.name] || param.example || '');
      });

    // Add query parameters
    const queryParams = selectedEndpoint.parameters
      .filter(p => p.in === 'query' && parameters[p.name])
      .map(param => `${param.name}=${encodeURIComponent(parameters[param.name])}`)
      .join('&');
    
    if (queryParams) url += `?${queryParams}`;

    const fullUrl = `${baseUrl}${url}`;

    switch (language) {
      case 'curl':
        let curlCmd = `curl -X ${selectedEndpoint.method} "${fullUrl}"`;
        Object.entries(headers).forEach(([key, value]) => {
          curlCmd += ` \\\n  -H "${key}: ${value}"`;
        });
        if (selectedEndpoint.method !== 'GET' && requestBody) {
          curlCmd += ` \\\n  -d '${requestBody}'`;
        }
        return curlCmd;

      case 'javascript':
        let jsCode = `const response = await fetch('${fullUrl}', {\n  method: '${selectedEndpoint.method}',\n  headers: {`;
        Object.entries(headers).forEach(([key, value]) => {
          jsCode += `\n    '${key}': '${value}',`;
        });
        jsCode = jsCode.slice(0, -1) + '\n  }';
        if (selectedEndpoint.method !== 'GET' && requestBody) {
          jsCode += `,\n  body: JSON.stringify(${requestBody})`;
        }
        jsCode += '\n});\nconst data = await response.json();\nconsole.log(data);';
        return jsCode;

      case 'python':
        let pyCode = `import requests\n\nurl = "${fullUrl}"\nheaders = {`;
        Object.entries(headers).forEach(([key, value]) => {
          pyCode += `\n    "${key}": "${value}",`;
        });
        pyCode = pyCode.slice(0, -1) + '\n}';
        if (selectedEndpoint.method !== 'GET' && requestBody) {
          pyCode += `\ndata = ${requestBody}`;
          pyCode += `\nresponse = requests.${selectedEndpoint.method.toLowerCase()}(url, headers=headers, json=data)`;
        } else {
          pyCode += `\nresponse = requests.${selectedEndpoint.method.toLowerCase()}(url, headers=headers)`;
        }
        pyCode += '\nprint(response.json())';
        return pyCode;

      default:
        return '';
    }
  };

  const renderErrorDetails = (error: any) => {
    if (typeof error === 'object' && error.error) {
      const apiError = error.error as ApiError;
      return (
        <div className="space-y-4">
          <Alert className="border-destructive/50 bg-destructive/10">
            <Icon name="alert-triangle" className="h-4 w-4" />
            <AlertTitle className="text-destructive">
              {apiError.code}: {apiError.message}
            </AlertTitle>
            <AlertDescription className="space-y-2">
              {apiError.details && (
                <div className="mt-2">
                  <strong>Details:</strong>
                  <pre className="mt-1 text-xs overflow-x-auto">
                    {JSON.stringify(apiError.details, null, 2)}
                  </pre>
                </div>
              )}
              {apiError.suggestions && (
                <div className="mt-3">
                  <strong>Suggestions:</strong>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    {apiError.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {apiError.docsUrl && (
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(apiError.docsUrl, '_blank')}
                  >
                    <Icon name="external-link" className="w-3 h-3 mr-1" />
                    View Documentation
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Icon name={product.icon} className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant={product.status === 'beta' ? 'secondary' : 'default'}>
              {product.status.toUpperCase()}
            </Badge>
            <Badge variant="outline">v{product.version}</Badge>
          </div>
        </div>
        <Button>Subscribe to API</Button>
      </div>

      {/* Usage Alert */}
      <Alert>
        <Icon name="info" className="h-4 w-4" />
        <AlertTitle>API Usage</AlertTitle>
        <AlertDescription>
          You have used 8,450 / 10,000 requests this month (84%).{" "}
          <Button variant="link" className="p-0 h-auto">View detailed usage</Button>
        </AlertDescription>
      </Alert>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="playground">Interactive Playground</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="playground" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] gap-6 h-[800px]">
            {/* Left Panel: Endpoints */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Endpoints</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[700px]">
                  <div className="space-y-1 p-4">
                    {product.endpoints.map((endpoint) => (
                      <div
                        key={endpoint.id}
                        className={cn(
                          "p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                          selectedEndpoint.id === endpoint.id && "bg-muted"
                        )}
                        onClick={() => setSelectedEndpoint(endpoint)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                            className="text-xs"
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-xs text-muted-foreground">
                            {endpoint.path}
                          </code>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {endpoint.summary}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {endpoint.requiredScopes.map(scope => (
                            <Badge key={scope} variant="outline" className="text-xs">
                              {scope}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Center Panel: Request Builder */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Badge variant={selectedEndpoint.method === 'GET' ? 'secondary' : 'default'}>
                    {selectedEndpoint.method}
                  </Badge>
                  <code className="text-sm">{selectedEndpoint.path}</code>
                </CardTitle>
                <CardDescription className="text-xs">
                  {selectedEndpoint.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[650px] pr-4">
                  <div className="space-y-6">
                    {/* Path & Query Parameters */}
                    {selectedEndpoint.parameters.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Parameters</h4>
                        {selectedEndpoint.parameters.map((param) => (
                          <div key={param.name} className="space-y-2">
                            <Label className="text-xs flex items-center gap-2">
                              {param.name}
                              {param.required && <span className="text-red-500">*</span>}
                              <Badge variant="outline" className="text-xs">
                                {param.type}
                              </Badge>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Icon name="help-circle" className="w-3 h-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs max-w-xs">{param.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              value={parameters[param.name] || ''}
                              onChange={(e) => updateParameter(param.name, e.target.value)}
                              placeholder={param.example?.toString() || param.description}
                              className="text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Headers */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Headers</h4>
                        <Button variant="outline" size="sm" onClick={addHeader}>
                          <Icon name="plus" className="w-3 h-3 mr-1" />
                          Add Header
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(headers).map(([key, value]) => (
                          <div key={key} className="flex gap-2">
                            <Input
                              value={key}
                              onChange={(e) => {
                                const newKey = e.target.value;
                                setHeaders(prev => {
                                  const newHeaders = { ...prev };
                                  delete newHeaders[key];
                                  newHeaders[newKey] = value;
                                  return newHeaders;
                                });
                              }}
                              className="text-xs flex-1"
                              placeholder="Header name"
                            />
                            <Input
                              value={value}
                              onChange={(e) => updateHeader(key, e.target.value)}
                              className="text-xs flex-1"
                              placeholder="Header value"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeHeader(key)}
                            >
                              <Icon name="x" className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Request Body */}
                    {selectedEndpoint.method !== 'GET' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Request Body</h4>
                        <Textarea
                          value={requestBody}
                          onChange={(e) => setRequestBody(e.target.value)}
                          placeholder="Enter JSON request body..."
                          className="text-xs font-mono min-h-[120px]"
                        />
                      </div>
                    )}

                    {/* Send Button */}
                    <Button 
                      onClick={handleSendRequest} 
                      disabled={isLoading}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="loader-2" className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Icon name="send" className="w-4 h-4 mr-2" />
                          Send Request
                        </>
                      )}
                    </Button>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Right Panel: Response */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Response</CardTitle>
                  {response && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className={cn("font-mono", getStatusColor(response.status))}>
                        {response.status}
                      </span>
                      <span className="text-muted-foreground">
                        {formatDuration(response.duration)}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[650px]">
                  {!response && !isLoading && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center space-y-2">
                        <Icon name="send" className="w-8 h-8 mx-auto opacity-50" />
                        <p className="text-sm">Send a request to see the response</p>
                      </div>
                    </div>
                  )}

                  {isLoading && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-2">
                        <Icon name="loader-2" className="w-8 h-8 mx-auto animate-spin" />
                        <p className="text-sm text-muted-foreground">Sending request...</p>
                      </div>
                    </div>
                  )}

                  {response && (
                    <div className="space-y-4">
                      {/* Error Details */}
                      {response.error && renderErrorDetails(response.body)}
                      
                      {/* Response Tabs */}
                      <Tabs defaultValue="body">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="body">Body</TabsTrigger>
                          <TabsTrigger value="headers">Headers</TabsTrigger>
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                          <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="body" className="mt-4">
                          <SyntaxHighlighter
                            language="json"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              padding: '1rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.75rem',
                              minHeight: '300px'
                            }}
                          >
                            {JSON.stringify(response.body, null, 2)}
                          </SyntaxHighlighter>
                        </TabsContent>
                        
                        <TabsContent value="headers" className="mt-4">
                          <SyntaxHighlighter
                            language="json"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              padding: '1rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.75rem',
                              minHeight: '300px'
                            }}
                          >
                            {JSON.stringify(response.headers, null, 2)}
                          </SyntaxHighlighter>
                        </TabsContent>
                        
                        <TabsContent value="curl" className="mt-4">
                          <SyntaxHighlighter
                            language="bash"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              padding: '1rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.75rem',
                              minHeight: '300px'
                            }}
                          >
                            {generateCodeSample('curl')}
                          </SyntaxHighlighter>
                        </TabsContent>
                        
                        <TabsContent value="code" className="mt-4">
                          <Tabs defaultValue="javascript">
                            <TabsList>
                              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                              <TabsTrigger value="python">Python</TabsTrigger>
                            </TabsList>
                            <TabsContent value="javascript" className="mt-2">
                              <SyntaxHighlighter
                                language="javascript"
                                style={vscDarkPlus}
                                customStyle={{
                                  margin: 0,
                                  padding: '1rem',
                                  borderRadius: '0.5rem',
                                  fontSize: '0.75rem'
                                }}
                              >
                                {generateCodeSample('javascript')}
                              </SyntaxHighlighter>
                            </TabsContent>
                            <TabsContent value="python" className="mt-2">
                              <SyntaxHighlighter
                                language="python"
                                style={vscDarkPlus}
                                customStyle={{
                                  margin: 0,
                                  padding: '1rem',
                                  borderRadius: '0.5rem',
                                  fontSize: '0.75rem'
                                }}
                              >
                                {generateCodeSample('python')}
                              </SyntaxHighlighter>
                            </TabsContent>
                          </Tabs>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Comprehensive documentation for the {product.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.documentation }} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <p className="text-muted-foreground">Select the plan that fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.pricing.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={cn(
                    "relative",
                    plan.name === 'Pro' && "border-primary shadow-lg"
                  )}
                >
                  {plan.name === 'Pro' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /{plan.interval}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="check" className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Request History */}
      {requestHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {requestHistory.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer text-xs"
                    onClick={() => {
                      setSelectedEndpoint(req.endpoint);
                      setParameters(req.parameters);
                      setHeaders(req.headers);
                    }}
                  >
                    <Badge variant="outline" className="text-xs">
                      {req.endpoint.method}
                    </Badge>
                    <code className="text-muted-foreground">{req.endpoint.path}</code>
                    <span className="text-muted-foreground ml-auto">
                      {req.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 