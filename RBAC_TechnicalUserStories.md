# RBAC - Technical User Stories & Design Process

This document outlines the user needs and design process for creating an advanced, developer-focused user management experience. It is designed to complement the existing persona analysis by focusing specifically on technical users who interact with the platform on a system level.

## 1. Deep Persona Analysis: The Technical User

### Persona: Alex - Platform & DevOps Engineer

*   **Core Identity**: Responsible for the reliability, security, and scalability of the FleetEdge platform. Alex's "customers" are the other developers at the company who build applications on top of the platform Alex maintains.
*   **Context**: Manages CI/CD pipelines, provisions infrastructure, and creates the "golden path" for other developers to integrate new services securely. Alex lives in the terminal, IDE, and infrastructure-as-code files.

**"Why" Chain Analysis**:

*   **Surface Want**: "I need to generate an API token for our new routing microservice."
*   **→ Why?** "So the service can securely authenticate with the FleetEdge API."
*   **→ Why?** "It needs to pull vehicle location data in real-time, and if it can't, my on-call pager goes off at 3 AM."
*   **→ Why?** "When it fails, I have no idea if it's a code bug, a network issue, or a silent permissions error. The permission errors are the worst because they leave no trace."
*   **→ Root Need**: **"I need a frictionless, predictable, and instantly debuggable way to manage system-level access, so I can empower other developers and sleep through the night."**

**Key Insights**:
*   Values predictability and automation over manual UI clicks.
*   Thinks in terms of APIs, policy-as-code, and audit trails.
*   Debugging is the most time-consuming and frustrating part of the job.
*   Fears opaque systems that fail silently.
*   Wants to provide self-service tools for other developers but within secure guardrails.

## 2. Complete Technical User Workflows

### Alex's Workflow: Deploying a New Microservice
1.  **Trigger**: A development team needs to deploy a new "ETA-prediction" service.
2.  **Current Pain**: Manually creating a role in a UI, guessing what permissions are needed, generating a token, and pasting it into a secrets manager is slow and not repeatable.
3.  **Ideal Process**: Defines a `policy.json` file in the service's Git repo. The CI/CD pipeline automatically applies this policy on deployment, creating the role and token.
4.  **Anxiety Moment**: "Did the policy I wrote grant too little access (service fails) or too much (security risk)?"
5.  **Completion**: The pipeline finishes, and Alex can instantly simulate a request from the new service in a sandbox to verify it works as expected before it even serves live traffic.

### Alex's Workflow: Debugging a Production Access Issue
1.  **Trigger**: Alarms fire. The `ETA-prediction` service is throwing `403 Forbidden` errors.
2.  **Current Pain**: Grepping through unstructured application logs, trying to correlate timestamps with potential changes made in the admin UI.
3.  **Ideal Process**: Opens the "Permissions Timeline" for the service's token. Sees an event: "15 minutes ago, Policy 'predictive-service-v1' was updated by another admin, removing 'vehicle:read:realtime_location'".
4.  **Root Cause Analysis**: Clicks on the event, sees the exact diff of the policy change.
5.  **Remediation**: Reverts the change with a single click and an attached justification comment.
6.  **Prevention**: Adds a comment to the policy-as-code file explaining why that permission is critical.

## 3. Exhaustive User Stories (Technical Focus)

### Epic: Auth Sandbox & Live Simulator
1.  **As Alex**, I want to simulate an API request as any user, role, or service token so I can debug permission issues without needing their credentials.
2.  **As Alex**, I want the simulation result to be a detailed, step-by-step evaluation trace so I can see exactly which policy rule granted or denied access.
3.  **As Alex**, I want the trace to highlight the specific condition within a policy that failed (e.g., `vehicle.location != 'MAINTENANCE_BAY'`) so I don't have to guess.
4.  **As Alex**, I want to share a permalink to a specific simulation result so I can collaborate with another developer to solve an issue.
5.  **As Alex**, I want to see the "effective permissions" for a user on a resource—a final list of what they can do after all policies are calculated.

### Epic: Visual Policy Builder & Policy-as-Code
6.  **As Alex**, I want to create complex, attribute-based access rules using a visual builder so I can easily model policies like "Mechanics can only access vehicles in their assigned maintenance bay."
7.  **As Alex**, I want to toggle between the visual builder and the raw policy code (JSON/Rego) so I can use the UI for discovery and code for precision.
8.  **As Alex**, I want to store policies as code in a Git repository so they can be versioned, reviewed, and deployed via my existing CI/CD pipeline.
9.  **As Alex**, I want the policy editor to have syntax highlighting and linting so I can catch errors before I even save.
10. **As Alex**, I want to create policy templates so other developers can create safe, pre-configured roles for their services without my direct intervention.

### Epic: Permissions Timeline & Advanced Auditing
11. **As Alex**, I want to view a high-fidelity audit timeline for any user or resource so I can answer "who did what, and when?" for any permission-related event.
12. **As Alex**, I want to filter the audit timeline by event type (e.g., `permission_denied`, `role_updated`) so I can quickly find the needle in the haystack.
13. **As Alex**, I want to see a visual "diff" of what changed when a policy was updated so I can understand the exact impact.
14. **As Alex**, I want to see not just the action, but the context of the action in the timeline (e.g., "Access Denied from IP Address 1.2.3.4") for better security forensics.
15. **As Alex**, I want to "revert" a change directly from the timeline so I can quickly remediate production issues.

### Epic: Developer Experience & Tooling
16. **As Alex**, I want a dedicated "Service Accounts" area to manage API tokens, distinct from human user accounts.
17. **As Alex**, I want to be able to set expiration dates and usage scopes on API tokens so I can enforce good security hygiene.
18. **As Alex**, I want a clear and simple permissions-checking SDK for our primary languages (e.g., `auth.can(user, 'view', vehicle)`) that is ultra-fast.
19. **As Alex**, I want the platform to provide a Terraform Provider so I can manage my entire RBAC configuration as code.
20. **As Alex**, I want a dark mode for the admin UI because I'm often working in low-light environments and my IDE is in dark mode.

## 4. Key Insights for UX Design

*   **Dual Interface is Key**: The UI must serve two masters. The simple, role-assignment view for **Sarah (Fleet Admin)** and the powerful, policy-based, debug-oriented view for **Alex (DevOps)**. The design must allow for seamless switching or linking between these two worlds.
*   **Treat the UI as a "GUI for an API"**: Every action in the technical admin UI should correspond to something that could be done via an API or infrastructure-as-code. The UI helps developers learn and explore the API.
*   **Debugging is a Core Feature, Not an Afterthought**: The simulator and timeline aren't "nice to have"; they are the primary reason a technical user would choose to use the UI instead of just staying in their terminal. They are the value proposition.
*   **Embrace Text and Code**: Technical users are comfortable with code. Don't hide it from them. Exposing the underlying policy definition builds trust and provides the ultimate level of precision and control.
*   **Speed & Predictability**: The interface must be fast, responsive, and predictable. Developers have low tolerance for slow, buggy, or inconsistent UIs. Every action should have clear, immediate feedback. 