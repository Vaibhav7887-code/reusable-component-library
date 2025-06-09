# Developer API Portal: UX Plan & Wireframes

This document synthesizes our research into a concrete design plan. It outlines the core principles and screen wireframes that will guide the front-end implementation.

---

## 1. Core Design Principles

Our design will be guided by four key principles to ensure a best-in-class Developer Experience (DX):

1.  **Self-Service by Default:** A developer must be able to accomplish any task—from subscribing to rotating keys—without ever needing to contact support. The UI should be the primary interface to our platform's capabilities.
2.  **Clarity and Predictability:** No ambiguity. Pricing must be transparent, documentation must be precise, and the UI's behavior must be predictable. A developer should always know what will happen when they click a button.
3.  **Speed to "Aha!":** We must obsessively optimize the workflow from landing on the portal to making the first successful API call. This "Time-to-Wow" is the single most critical metric for adoption.
4.  **Build Trust:** Trust is earned through reliable infrastructure, secure practices, and transparent communication. The UI should project this solidity with features like secure key handling, clear error messages, and visible usage data.

---

## 2. Reusable Components & Design System Thinking

To ensure consistency and scalability, the portal's UI is built on a foundation of system-level components.

*   **`AuditCard`:** A reusable component that displays a single audit event. It includes an actor, an action, a target, and a timestamp. This component is designed to be used not just in the API portal, but across the entire FleetEdge platform (e.g., in the RBAC audit log, session tracking, etc.).
*   **`TokenizedStateBadge`:** API keys and other resources have visual states driven by design tokens. A key isn't just a string; it's an object with states like `active`, `expiring-soon`, `rotated`, or `revoked`. These states are represented by a consistent, reusable badge component.
*   **`Messaging Schema`:** All feedback to the user (in modals, toasts, or banners) follows a standard schema: `INFO`, `SUCCESS`, `WARN`, `ERROR`. This ensures predictable and clear communication.

---

## 3. Platform Architecture & System Model

To design a scalable and consistent developer experience, it's crucial to visualize how the different components interact. The following diagram illustrates that the Portal UI and the CLI are two different "heads" for the same underlying set of platform APIs. They share the same logic for authentication, scopes, and logging.

```mermaid
graph TD
    subgraph "Developer"
        A[User<br/>(Alex, the Developer)]
    end

    subgraph "Presentation Layer (The 'Heads')"
        B[Portal UI<br/>(React App)]
        C[FleetEdge CLI<br/>(Command Line Tool)]
    end

    subgraph "Core Platform Services (The 'Body')"
        D[Auth Service<br/>(Handles login, issues tokens)]
        E[API Key Service<br/>(Manages CRUD for keys, scopes)]
        F[Usage & Billing Service<br/>(Tracks consumption data)]
        G[Fleet Telemetry API<br/>(The actual product API)]
    end

    subgraph "Shared Infrastructure"
        H[Logging & Audit Service]
    end

    A --> B;
    A --> C;

    B --> D;
    B --> E;
    B --> F;
    B --> G;

    C --> D;
    C --> E;
    C --> F;
    C --> G;

    D --> H;
    E --> H;
    F --> H;
    G --> H;
```

---

## 4. Navigation & Motion Design

A fluid and intuitive navigation experience is critical. The design will incorporate the following:

*   **Persistent Navigation:** A primary sidebar will provide constant access to the main sections: `Dashboard`, `APIs & Playground`, `Keys`, `Billing`, and `Docs`. This allows a developer to easily jump between monitoring usage and managing their keys.
*   **Contextual Transitions:** Animations and transitions should be purposeful. For example, opening the "Generate Key" modal will use a smooth slide-in-from-top animation. When a request is running in the playground, the "Send" button will show a loading spinner, and the response panel will have a subtle shimmer effect.
*   **GitHub-Inspired Modals:** Modals for critical actions like rotating a key will feel familiar to developers, using similar layouts and confirmation patterns as popular developer tools like GitHub.

---

## 5. Wireframes & Screen Flow

This section describes the key screens of the Developer API Portal.

### Screen 1: The API Marketplace

*   **Route:** `/apis`
*   **Purpose:** To showcase our API products and allow developers to compare them. This replaces the confusing "Subscription Tenure" page.
*   **Layout:** A grid of `Card` components.
*   **Component Breakdown:**
    *   **Page Title:** "Explore the FleetEdge APIs"
    *   **Filtering & Search:**
        *   `Search Input`: "Search APIs..."
        *   `Filter Dropdowns`: `Filter by Product` (e.g., Fleet Telemetry, Logistics), `Filter by Access` (e.g., Public, Partner-only).
    *   **API Product Card (per API):**
        *   `Icon`: A unique icon for the API (e.g., a satellite for Telemetry).
        *   `Title`: "Vehicle Telemetry API"
        *   `Description`: "Real-time location, speed, fuel level, and sensor data."
        *   `Tags`: `Real-Time`, `Vehicles`, `Data`
        *   `Button`: "Learn More & Subscribe" -> Navigates to the API Detail Page.
    *   **Rationale:** A card-based grid is used for quick scanning and comparison, a common and easily understood pattern for marketplaces.

### Screen 2: API Detail & Playground Page

*   **Route:** `/apis/vehicle-telemetry`
*   **Purpose:** A single, consolidated page to learn, test, and subscribe. This is the central hub for each API.
*   **Layout:** A full-screen view with a prominent `Tabs` component.
*   **Component Breakdown:**
    *   **Header:** `Title`: "Vehicle Telemetry API", `Badge`: "Pro Plan" (if subscribed), `Button`: "Subscribe" (if not).
    *   **Risk & Severity Indicators:**
        *   If an API is `DEPRECATED` or `BETA`, it will have a prominent `Tag` next to its title. This signals risk to the developer.
    *   **Abuse Prevention & Rate Limiting UX:**
        *   An `Alert` component will be shown if usage is high: `"You have used 85% of your daily quota for the Pro plan."` [Upgrade Plan]
    *   **Main Tabs:**
        *   **Rationale:** Tabs are used to organize complex information into distinct sections without overwhelming the user on a single screen. This keeps the primary view (the Playground) clean and focused, while making secondary information easily accessible.
        *   **Tab 1: Playground (Default View)**
            *   **Layout:** A three-panel layout, similar to Postman or Swagger UI.
            *   **Left Panel (Endpoints):** A navigable list of available endpoints (e.g., `GET /v1/vehicles/{vin}`, `POST /v1/vehicles/{vin}/geofence`).
            *   **Center Panel (Request):**
                *   Shows the selected endpoint.
                *   Input fields for parameters (e.g., `vin`).
                *   A "Send Request" `Button`.
            *   **Right Panel (Response):**
                *   A read-only code block with syntax highlighting for the JSON response.
                *   Tabs to switch between the response body, headers, and code examples in cURL/JS/Python.
    *   **Accessibility Notes:**
        *   The interactive playground will be fully keyboard-navigable, ensuring a user can move between endpoints, fill parameters, and trigger a request without a mouse.
        *   The response panel will be an ARIA live region, announcing to screen readers when a new response has been loaded.
        *   All form fields will have associated labels for screen reader accessibility.
        *   **Tab 2: Documentation**
            *   **Content:** Detailed, human-readable documentation for the API, explaining concepts, authentication, and error codes. Can be rendered from a Markdown file.
        *   **Tab 3: Pricing & Plans**
            *   **Layout:** A set of `Card` components, one for each plan (e.g., "Free", "Pro", "Enterprise").
            *   **Content (per card):** Plan name, price, key features (e.g., "1,000 requests/day"), and a "Subscribe" or "Current Plan" button.

### Screen 3: The Developer Dashboard

*   **Route:** `/dashboard`
*   **Purpose:** The developer's home base for managing their account, keys, and usage.
*   **Layout:** A dashboard layout, potentially using a `Grid` of `Card` components.
*   **Component Breakdown:**
    *   **Welcome Header:** "Welcome, Alex."
    *   **Card 1: API Keys**
        *   `Title`: "Your API Keys"
        *   `Filtering & Search`:
            *   `Search Input`: "Search by key name..."
            *   `Filter Dropdown`: `Filter by Status` (active, expiring, revoked), `Filter by Scope` (read:vehicles).
            *   A toggle for "Saved Views" like "Production Keys" or "Staging Keys".
        *   `Table`: Lists the user's API keys.
            *   **Columns:** `Name`, `Status` (`TokenizedStateBadge`), `Key` (masked), `Scopes`, `Created`, `Last Used`.
            *   **Actions (per row):** `Copy` icon, `Rotate` icon, `Delete` icon.
        *   `Button`: "+ Generate New Key" -> Opens **Scoped Key Creator Modal**.
    *   **Modal: Scoped Key Creator**
        *   **Rationale:** A modal is used for key generation because it is a focused, single-purpose task that can be completed quickly without losing the context of the dashboard. It is less disruptive than navigating to a separate page.
        *   `Title`: "Generate New API Key"
        *   `Input`: "Key Name" (e.g., "My Production App").
        *   `Checkboxes (Scopes)`: A list of available scopes to assign to the key (e.g., `vehicles:read`, `vehicles:write`, `maintenance:read`).
        *   `Input (TTL)`: "Time to Live (in days)". Optional field to set an expiration date.
        *   `Button`: "Generate Key".
    *   **Modal: Key Rotation UX**
        *   `Title`: "Rotate API Key: 'My Prod App'?"
        *   `Warning Banner (High Severity)`: A red-tinted banner at the top of the modal will clearly state the risk: "This is a destructive action that may disrupt your services."
        *   `Warning Text`: "Rotating this key will immediately revoke the old key and generate a new one. This action cannot be undone and may cause service interruptions."
        *   `Grace Period Option`: "For zero downtime, you can set a grace period where both the old and new keys will work."
        *   `Dropdown`: "Grace Period" (Disabled, 1 Hour, 24 Hours).
        *   `Input`: Type "rotate" to confirm.
        *   `Button` (disabled by default): "Confirm and Rotate Key".
    *   **Accessibility Notes:**
        *   The focus will be properly trapped within the modals when they are open.
        *   The "Generate Key" and "Rotate Key" buttons will have `aria-describedby` attributes linking them to their respective warning texts, ensuring screen reader users understand the consequences of the action.
    *   **Card 2: API Usage**
        *   `Title`: "Usage - Vehicle Telemetry API"
        *   `Dropdown`: To select the time period (Last 24h, 7d, 30d).
        *   `Line Chart`: Showing request volume over the selected period.
        *   `Stats`: "8,450 / 10,000 requests this month."
    *   **Card 3: Subscription & Billing**
        *   `Title`: "Current Plan"
        *   `Content`: "You are on the **Pro Plan** ($250/year)."
        *   `Link`: "Manage Billing" -> (Could link to Stripe's customer portal).
        *   `Link`: "View Invoices". 