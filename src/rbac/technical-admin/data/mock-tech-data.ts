// src/rbac/technical-admin/data/mock-tech-data.ts

export type Actor = {
  id: string;
  type: 'user' | 'service';
  name: string;
  description: string;
};

export type Resource = {
  id: string;
  type: 'vehicle' | 'maintenance_log' | 'cargo_manifest';
  name: string;
  attributes: Record<string, any>;
};

export type Policy = {
  id: string;
  name: string;
  description: string;
  effect: 'allow' | 'deny';
  actions: string[];
  // A simple rule engine: all conditions must be met
  conditions: {
    attribute: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'in';
    value: any;
  }[];
};

export type TraceStep = {
  policyId: string;
  policyName: string;
  status: 'granted' | 'denied' | 'not_applicable';
  reason: string;
  isCritical?: boolean;
};

// --- MOCK DATA ---

export const mockActors: Actor[] = [
  { id: 'user-priya', type: 'user', name: 'Priya Gupta', description: 'Dispatcher' },
  { id: 'user-arjun', type: 'user', name: 'Arjun Singh', description: 'Mechanic, Bay A' },
  { id: 'service-routing', type: 'service', name: 'RouteOptimizationService-v3', description: 'Internal service for route planning' },
  { id: 'service-insurance', type: 'service', name: 'InsurancePartnerAPI-Allianz', description: 'External partner API for telemetry' },
];

export const mockResources: Resource[] = [
  { 
    id: 'vin-fe-459-tkr', 
    type: 'vehicle', 
    name: 'Tipper Truck #5',
    attributes: {
      location: 'Depot B',
      status: 'In_Maintenance',
      cargo_type: 'Gravel',
      insurancePolicyId: 'ALLIANZ-9982-A',
      onActiveRoute: false,
      mileage: 87500,
    }
  },
  { 
    id: 'vin-fe-112-evc', 
    type: 'vehicle', 
    name: 'EV Cargo Van #12',
    attributes: {
      location: 'Route A-45',
      status: 'On_Route',
      cargo_type: 'Parcel',
      insurancePolicyId: 'ALLIANZ-9983-B',
      onActiveRoute: true,
      mileage: 12300,
    }
  },
];

export const mockPolicies: Policy[] = [
  {
    id: 'policy-mechanic-geofence',
    name: 'Mechanic Geofence Policy',
    description: 'Mechanics can only access vehicles physically located in their assigned bay.',
    effect: 'allow',
    actions: ['vehicle:read:full', 'vehicle:update:maintenance_log'],
    conditions: [
      { attribute: 'location', operator: 'equals', value: 'Maintenance Bay A' }
    ],
  },
  {
    id: 'policy-tipper-access',
    name: 'Tipper Access Policy',
    description: 'Services can only perform load-balancing on tipper trucks that are available.',
    effect: 'allow',
    actions: ['vehicle:update:load_balance'],
    conditions: [
      { attribute: 'status', operator: 'equals', value: 'Available' }
    ],
  },
  {
    id: 'policy-insurance-telemetry',
    name: 'Insurance Partner Telemetry Access',
    description: 'Allows Allianz API to read telemetry only for covered vehicles on an active route.',
    effect: 'allow',
    actions: ['vehicle:read:telemetry'],
    conditions: [
      { attribute: 'insurancePolicyId', operator: 'equals', value: 'ALLIANZ-9983-B' },
      { attribute: 'onActiveRoute', operator: 'equals', value: true },
    ],
  },
];

// --- MOCK TRACES ---

export const mockTraceDenied: TraceStep[] = [
  {
    policyId: 'policy-tipper-access',
    policyName: 'Tipper Access Policy',
    status: 'denied',
    reason: "Condition failed: vehicle.status ('In_Maintenance') did not equal 'Available'.",
    isCritical: true,
  },
  {
    policyId: 'policy-mechanic-geofence',
    policyName: 'Mechanic Geofence Policy',
    status: 'not_applicable',
    reason: "Action 'vehicle:update:load_balance' not covered by this policy.",
  },
  {
    policyId: 'policy-insurance-telemetry',
    policyName: 'Insurance Partner Telemetry Access',
    status: 'not_applicable',
    reason: "Action 'vehicle:update:load_balance' not covered by this policy.",
  },
];

export const mockTraceGranted: TraceStep[] = [
    {
      policyId: 'policy-insurance-telemetry',
      policyName: 'Insurance Partner Telemetry Access',
      status: 'granted',
      reason: 'All conditions passed.',
      isCritical: true,
    },
    {
      policyId: 'policy-tipper-access',
      policyName: 'Tipper Access Policy',
      status: 'not_applicable',
      reason: "Action 'vehicle:read:telemetry' not covered by this policy.",
    },
  ];

export interface FleetEvent {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  vehicleId: string;
  timestamp: string;
  details: Record<string, string>;
  proposedPermissions: {
    user: string;
    permissions: string[];
    durationHours: number;
  };
}

export const mockFleetEvents: FleetEvent[] = [
  {
    id: 'evt_brake_failure',
    severity: 'Critical',
    title: 'Brake Failure Detected',
    vehicleId: 'VIN: FE-459-TKR',
    timestamp: '2024-07-31T10:00:00Z',
    details: {
      'Error Code': 'P0571',
      'Brake Fluid Pressure': 'LOW',
      'Reported By': 'Onboard Diagnostics',
    },
    proposedPermissions: {
      user: 'Arjun Singh (Mechanic)',
      permissions: ['vehicle:brakes:read', 'vehicle:brakes:write', 'vehicle:diagnostics:run'],
      durationHours: 2,
    },
  },
  {
    id: 'evt_engine_overheat',
    severity: 'Warning',
    title: 'Engine Overheating',
    vehicleId: 'VIN: TR-112-PLM',
    timestamp: '2024-07-31T09:45:12Z',
    details: {
      'Coolant Temperature': '115°C',
      'Recommended Action': 'Idle vehicle immediately',
    },
    proposedPermissions: {
      user: 'Arjun Singh (Mechanic)',
      permissions: ['vehicle:engine:read', 'vehicle:diagnostics:run'],
      durationHours: 1,
    },
  },
  {
    id: 'evt_maintenance_due',
    severity: 'Info',
    title: 'Scheduled Maintenance Due',
    vehicleId: 'VIN: CX-987-BBB',
    timestamp: '2024-07-31T08:30:00Z',
    details: {
      'Task': '100,000 Mile Service',
      'Next Appointment': '2024-08-05',
    },
    proposedPermissions: {
      user: 'Priya Gupta (Dispatcher)',
      permissions: ['vehicle:maintenance:schedule', 'vehicle:assign:mechanic'],
      durationHours: 8,
    },
  },
];
