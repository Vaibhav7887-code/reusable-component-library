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
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ApiPortalService, mockApiProducts } from '@/lib/api-portal-data';

// Expanded mock data for endpoints
const endpoints = [
  {
    method: "GET",
    path: "/v1/vehicles/{vin}",
    description: "Get vehicle details",
    parameters: [{ name: "vin", type: "string", description: "The Vehicle Identification Number." }],
    response: {
      success: {
        "vin": "ABC123XYZ",
        "make": "FleetEdge",
        "model": "Model-T",
        "year": 2023,
        "telemetry": {
          "lat": 34.0522,
          "lon": -118.2437,
          "speed_mph": 65,
          "fuel_level_percent": 82
        }
      },
      error: {
        "error": "Not Found",
        "message": "Vehicle with VIN 'XYZ-123' not found.",
        "suggestion": "Check the VIN or run 'fleetedge vehicles list' to see available vehicles."
      }
    },
    codeSamples: {
      curl: `curl -X GET 'https://api.fleetedge.com/v1/vehicles/ABC123XYZ' \\
-H 'Authorization: Bearer YOUR_API_KEY'`,
      javascript: `const response = await fetch('https://api.fleetedge.com/v1/vehicles/ABC123XYZ', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();
console.log(data);`,
      python: `import requests

url = "https://api.fleetedge.com/v1/vehicles/ABC123XYZ"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get(url, headers=headers)
print(response.json())`
    }
  },
  {
    method: "POST",
    path: "/v1/vehicles/{vin}/geofence",
    description: "Set a geofence for a vehicle",
    parameters: [
      { name: "vin", type: "string", description: "The Vehicle Identification Number." },
      { name: "latitude", type: "number", description: "Center latitude of the geofence." },
      { name: "longitude", type: "number", description: "Center longitude of the geofence." },
      { name: "radius_meters", type: "number", description: "Radius of the geofence in meters." },
    ],
    response: {
      success: {
        "status": "success",
        "vin": "ABC123XYZ",
        "geofence_id": "gf_12345",
        "message": "Geofence created successfully."
      }
    },
    codeSamples: {
      curl: `curl -X POST 'https://api.fleetedge.com/v1/vehicles/ABC123XYZ/geofence' \\
-H 'Authorization: Bearer YOUR_API_KEY' \\
-H 'Content-Type: application/json' \\
-d '{
  "latitude": 34.0522,
  "longitude": -118.2437,
  "radius_meters": 500
}'`,
      javascript: `const response = await fetch('https://api.fleetedge.com/v1/vehicles/ABC123XYZ/geofence', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    latitude: 34.0522,
    longitude: -118.2437,
    radius_meters: 500
  })
});
const data = await response.json();
console.log(data);`,
      python: `import requests

url = "https://api.fleetedge.com/v1/vehicles/ABC123XYZ/geofence"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "latitude": 34.0522,
    "longitude": -118.2437,
    "radius_meters": 500
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())`
    }
  },
];

// Mock data for pricing plans
const pricingPlans = [
    {
        name: "Free",
        price: "$0",
        features: ["1,000 requests/day", "Community support"],
        current: false,
    },
    {
        name: "Pro",
        price: "$250/year",
        features: ["10,000 requests/day", "Email support", "Advanced analytics"],
        current: true,
    },
    {
        name: "Enterprise",
        price: "Contact us",
        features: ["Unlimited requests", "Dedicated support", "Custom integrations"],
        current: false,
    },
];

const Playground = () => {
    const [selectedEndpoint, setSelectedEndpoint] = React.useState(endpoints[0]);
    const [parameters, setParameters] = React.useState<Record<string, any>>({});
    const [headers, setHeaders] = React.useState<Record<string, string>>({
        'Authorization': 'Bearer fe_sk_your_api_key_here',
        'Content-Type': 'application/json'
    });
    const [requestBody, setRequestBody] = React.useState('');
    const [response, setResponse] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [requestHistory, setRequestHistory] = React.useState<any[]>([]);
    const [simulateError, setSimulateError] = React.useState(false);

    // Update parameters when endpoint changes
    React.useEffect(() => {
        const newParams: Record<string, any> = {};
        selectedEndpoint.parameters.forEach(param => {
            if (param.name === 'vin') {
                newParams[param.name] = '1HGBH41JXMN109186';
            }
        });
        setParameters(newParams);
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

        const request = {
            id: `req_${Date.now()}`,
            endpoint: selectedEndpoint,
            parameters,
            headers,
            body: requestBody ? JSON.parse(requestBody) : undefined,
            timestamp: new Date()
        };

        try {
            // Simulate API request with realistic behavior
        setTimeout(() => {
                const isError = simulateError; // Use controlled error simulation
                
                const mockResponses = {
                    success: {
                        vin: parameters.vin || '1HGBH41JXMN109186',
                        make: 'Honda',
                        model: 'Accord',
                        year: 2023,
                        status: 'active',
                        location: {
                            lat: 40.7128 + (Math.random() - 0.5) * 0.01,
                            lng: -74.0060 + (Math.random() - 0.5) * 0.01,
                            timestamp: new Date().toISOString()
                        },
                        fuel: {
                            level: Math.floor(Math.random() * 100),
                            efficiency: 28.5
                        }
                    },
                    error: {
                        error: {
                            code: 'INVALID_API_KEY',
                            message: 'The provided API key is invalid or has expired.',
                            suggestions: [
                                'Check that your API key is correct',
                                'Ensure the key has not expired',
                                'Verify the key has the required scopes'
                            ],
                            docsUrl: 'https://docs.fleetedge.com/authentication'
                        }
                    }
                };

                const result = {
                    id: `resp_${Date.now()}`,
                    requestId: request.id,
                    status: isError ? 401 : 200,
                    headers: {
                        'content-type': 'application/json',
                        'x-ratelimit-remaining': '99',
                        'x-ratelimit-reset': (Date.now() + 3600000).toString()
                    },
                    body: isError ? mockResponses.error : mockResponses.success,
                    duration: Math.random() * 1000 + 200,
                    timestamp: new Date(),
                    error: isError ? mockResponses.error.error.message : undefined
                };

                setResponse(result);
                setRequestHistory(prev => [request, ...prev.slice(0, 9)]); // Keep last 10 requests
                setIsLoading(false);

                if (isError) {
                    toast.error('Request failed', { 
                        description: result.error,
                        duration: 5000 
                    });
                } else {
                    toast.success('Request successful', {
                        description: `${result.status} response in ${Math.round(result.duration)}ms`
                    });
                }
            }, Math.random() * 2000 + 500);
        } catch (error) {
            toast.error('Request failed', { 
                description: 'An unexpected error occurred',
                duration: 5000 
            });
            setIsLoading(false);
    }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_2fr_3fr] gap-4 h-[700px] border rounded-lg p-4">
            {/* Left Panel (Endpoints) */}
            <div className="flex flex-col gap-1 overflow-y-auto">
                <h3 className="font-semibold px-2">Endpoints</h3>
                {endpoints.map((endpoint) => (
                <div 
                    key={endpoint.path} 
                    className={cn(
                        "text-sm p-2 rounded-md hover:bg-muted cursor-pointer",
                        selectedEndpoint.path === endpoint.path && "bg-muted"
                    )}
                    onClick={() => {
                        setSelectedEndpoint(endpoint)
                        setResponse(null);
                    }}
                >
                    <span className={`font-semibold w-12 inline-block ${endpoint.method === "GET" ? "text-green-500" : "text-blue-500"}`}>{endpoint.method}</span>
                    <span className="ml-2 text-muted-foreground">{endpoint.path}</span>
                </div>
                ))}
            </div>

            {/* Center Panel (Request) */}
            <div className="flex flex-col gap-4 overflow-y-auto">
                <h3 className="font-semibold">Request</h3>
                {selectedEndpoint.parameters.map(param => (
                    <div key={param.name} className="space-y-2">
                        <Label htmlFor={param.name}>{param.name} <span className="text-muted-foreground text-xs">{param.type}</span></Label>
                        <Input id={param.name} placeholder={param.description} />
                    </div>
                ))}
                <div className="flex items-center space-x-2 pt-4">
                    <Switch id="simulate-error" checked={simulateError} onCheckedChange={setSimulateError} />
                    <Label htmlFor="simulate-error">Simulate API Error</Label>
                </div>
                <div className="mt-auto">
                    <Button onClick={handleSendRequest} className="w-full" isLoading={isLoading}>
                        Send Request
                    </Button>
                </div>
            </div>

            {/* Right Panel (Response) */}
            <div className="flex flex-col gap-4 overflow-y-auto">
                <h3 className="font-semibold">Response</h3>
                <Tabs defaultValue="body" className="w-full">
                    <TabsList>
                        <TabsTrigger value="body">Body</TabsTrigger>
                        <TabsTrigger value="headers">Headers</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                        <TabsTrigger value="javascript">JS</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                    <TabsContent value="body" className="mt-4">
                        <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: '#1E1E1E', borderRadius: '0.5rem', minHeight: '300px' }}>
                            {isLoading ? "Loading..." : response ? JSON.stringify(response, null, 2) : "Response will appear here"}
                        </SyntaxHighlighter>
                    </TabsContent>
                    <TabsContent value="headers" className="mt-4">
                        <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: '#1E1E1E', borderRadius: '0.5rem', minHeight: '300px' }}>
                            {`{\n  "Content-Type": "application/json",\n  "X-Request-ID": "req_12345xyz"\n}`}
                        </SyntaxHighlighter>
                    </TabsContent>
                    <TabsContent value="curl" className="mt-4">
                        <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: '#1E1E1E', borderRadius: '0.5rem', minHeight: '300px' }}>
                            {selectedEndpoint.codeSamples.curl}
                        </SyntaxHighlighter>
                    </TabsContent>
                    <TabsContent value="javascript" className="mt-4">
                        <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: '#1E1E1E', borderRadius: '0.5rem', minHeight: '300px' }}>
                            {selectedEndpoint.codeSamples.javascript}
                        </SyntaxHighlighter>
                    </TabsContent>
                    <TabsContent value="python" className="mt-4">
                        <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', background: '#1E1E1E', borderRadius: '0.5rem', minHeight: '300px' }}>
                            {selectedEndpoint.codeSamples.python}
                        </SyntaxHighlighter>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

const Documentation = () => {
    return (
        <div className="prose max-w-none">
            <h2>Vehicle Telemetry API Documentation</h2>
            <p>Welcome to the documentation for the Vehicle Telemetry API. This API allows you to access real-time data from vehicles in your fleet.</p>
            <h3>Authentication</h3>
            <p>To use this API, you need an API key. You can generate one from your developer dashboard. Include your API key in the `Authorization` header of your requests.</p>
            <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
        </div>
    )
}

const Pricing = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
                <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
                    <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {plan.features.map(feature => <li key={feature} className="flex items-center gap-2"><Icon name="check" size="sm" /> {feature}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export function ApiPlayground() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Vehicle Telemetry API</h1>
          <Badge variant="secondary">BETA</Badge>
          <Badge>Pro Plan</Badge>
        </div>
        <Button>Subscribe</Button>
      </div>

      <Alert>
        <AlertTitle>Usage Warning</AlertTitle>
        <AlertDescription>
          You have used 85% of your daily quota for the Pro plan.{" "}
          <Button variant="link" className="p-0 h-auto">Upgrade Plan</Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="playground" className="w-full">
        <TabsList>
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Plans</TabsTrigger>
        </TabsList>
        <TabsContent value="playground" className="mt-4">
          <Playground />
        </TabsContent>
        <TabsContent value="documentation" className="mt-4">
            <Documentation />
        </TabsContent>
        <TabsContent value="pricing" className="mt-4">
            <Pricing />
        </TabsContent>
      </Tabs>
    </div>
  );
} 