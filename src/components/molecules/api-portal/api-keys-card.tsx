"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { Icon } from "@/components/atoms/icon";
  import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Checkbox } from "@/components/ui/checkbox";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

  const availableScopes = [
    { id: "vehicles:read", label: "Read vehicle data" },
    { id: "vehicles:write", label: "Write vehicle data" },
    { id: "read:telemetry[fleet.region=west]", label: "Read telemetry - West region only" },
    { id: "read:telemetry[fleet.region=east]", label: "Read telemetry - East region only" },
    { id: "read:vehicles[fleet.type=truck]", label: "Read vehicles - Trucks only" },
    { id: "read:vehicles[fleet.depot=chicago]", label: "Read vehicles - Chicago depot only" },
    { id: "write:maintenance[fleet.type=truck]", label: "Write maintenance - Trucks only" },
    { id: "maintenance:read", label: "Read maintenance records" },
    { id: "maintenance:write", label: "Write maintenance records" },
    { id: "analytics:read", label: "Access analytics endpoints" },
]

const mockApiKeys = [
    {
        name: "My Production App",
        status: "active",
        key: "fe_sk_...prod_xxxx",
        scopes: ["read:telemetry[fleet.region=west]", "maintenance:read"],
        lastUsed: "5 minutes ago"
    },
    {
        name: "Staging Tester Key",
        status: "expiring-soon",
        key: "fe_sk_...stag_yyyy",
        scopes: ["read:vehicles[fleet.type=truck]"],
        lastUsed: "2 days ago"
    },
    {
        name: "Old Analytics Service",
        status: "revoked",
        key: "fe_sk_...old_zzzz",
        scopes: ["analytics:read"],
        lastUsed: "3 months ago"
    },
    {
        name: "Legacy Integration",
        status: "active",
        key: "fe_sk_...legi_aaaa",
        scopes: ["read:vehicles[fleet.depot=chicago]", "write:maintenance[fleet.type=truck]"],
        lastUsed: "2 hours ago"
    },
]

const statusVariantMap: { [key: string]: "default" | "warning" | "destructive" } = {
    "active": "default",
    "expiring-soon": "warning",
    "revoked": "destructive",
}

export const ApiKeysCard = () => {
    const [search, setSearch] = React.useState("");
    const [statusFilters, setStatusFilters] = React.useState<string[]>(["active", "expiring-soon"]);

    const filteredKeys = mockApiKeys.filter(key => {
        const searchMatch = search === "" || key.name.toLowerCase().includes(search.toLowerCase());
        const statusMatch = statusFilters.length === 0 || statusFilters.includes(key.status);
        return searchMatch && statusMatch;
    });

    const toggleStatusFilter = (status: string) => {
        setStatusFilters(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status)
                : [...prev, status]
        )
    }

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>Manage and rotate your API keys.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
              <Input 
                  placeholder="Search by name..." 
                  className="w-[200px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Filter
                          </span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked={statusFilters.includes("active")} onCheckedChange={() => toggleStatusFilter("active")}>
                          Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={statusFilters.includes("expiring-soon")} onCheckedChange={() => toggleStatusFilter("expiring-soon")}>
                          Expiring Soon
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={statusFilters.includes("revoked")} onCheckedChange={() => toggleStatusFilter("revoked")}>
                          Revoked
                      </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Scopes</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map(key => (
                <TableRow key={key.key}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[key.status] || "default"} className="capitalize">{key.status.replace('-', ' ')}</Badge>
                  </TableCell>
                  <TableCell>{key.key}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {key.scopes.map(scope => (
                        <Badge 
                          key={scope} 
                          variant={scope.includes('[fleet.') ? "default" : "outline"} 
                          className={cn(
                            "text-xs",
                            scope.includes('[fleet.') && "bg-blue-100 text-blue-800 border-blue-200"
                          )}
                        >
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{key.lastUsed}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="Copy Key"><Icon name="copy" size="sm" /></Button>
                      <RotateKeyDialog apiKeyName={key.name}>
                          <Button variant="ghost" size="icon" title="Rotate Key" disabled={key.status === 'revoked'}><Icon name="rotate-cw" size="sm" /></Button>
                      </RotateKeyDialog>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="CLI Rotate with PR" 
                        disabled={key.status === 'revoked'}
                        onClick={() => {
                          toast.success('CLI command copied!', {
                            description: `fleetedge keys rotate ${key.name.toLowerCase().replace(/\s+/g, '_')} --create-pr`
                          });
                        }}
                      >
                        <Icon name="git-pull-request" size="sm" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" title="Delete Key"><Icon name="trash-2" size="sm"/></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredKeys.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                  No keys found for your filter criteria.
              </div>
          )}
        </CardContent>
        <CardFooter>
          <Dialog>
              <DialogTrigger asChild>
                  <Button><span>+ Generate New Key</span></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                      <DialogTitle>Generate New API Key</DialogTitle>
                      <DialogDescription>
                          Create a new API key with specific scopes and an optional expiration.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" defaultValue="My New Key" className="col-span-3"/>
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Scopes</Label>
                        <div className="col-span-3 grid grid-cols-2 gap-4">
                            {availableScopes.map(scope => (
                                <div key={scope.id} className="flex items-center space-x-2">
                                    <Checkbox id={scope.id} />
                                    <Label htmlFor={scope.id} className="font-normal">{scope.label}</Label>
                                </div>
                            ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="ttl" className="text-right">Expires in (days)</Label>
                          <Input id="ttl" type="number" placeholder="Optional (e.g., 90)" className="col-span-3"/>
                      </div>
                  </div>
                  <DialogFooter>
                      <Button type="submit">Generate Key</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    );
  };
  
const RotateKeyDialog = ({ apiKeyName, children }: { apiKeyName: string, children: React.ReactNode }) => {
    const [confirmationText, setConfirmationText] = React.useState("");
    const expectedConfirmationText = `rotate ${apiKeyName}`;
    const isConfirmationMatching = confirmationText === expectedConfirmationText;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Rotate API Key: '{apiKeyName}'?</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Alert variant="destructive">
                        <Icon name="satellite" className="h-4 w-4" />
                        <AlertTitle>This is a destructive action</AlertTitle>
                        <AlertDescription>
                        Rotating this key will immediately revoke the old key and generate a new one. This action cannot be undone and may cause service interruptions.
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                        <Label>Grace Period</Label>
                        <Select defaultValue="1h">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a grace period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None (immediate rotation)</SelectItem>
                                <SelectItem value="1h">1 Hour Grace Period</SelectItem>
                                <SelectItem value="24h">24 Hour Grace Period</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">For zero downtime, you can set a grace period where both the old and new keys will work temporarily.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>To confirm, type "<span className="font-semibold text-foreground">{expectedConfirmationText}</span>" below</Label>
                        <Input 
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="destructive" disabled={!isConfirmationMatching}>
                        Confirm and Rotate Key
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 