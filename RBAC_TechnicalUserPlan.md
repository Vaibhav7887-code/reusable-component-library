# RBAC - Technical Prototype Plan & Design Rationale

This document provides a detailed feature-by-feature plan for the technical user prototype. Each design decision is justified using the "ask WHY" methodology to ensure it directly addresses the root needs identified in the `RBAC_TechnicalUserStories.md` file.

## Guiding Philosophy: From Obstacle to Empowerment

The core design philosophy is to transform the permissions system from a frustrating obstacle into a tool that empowers developers. We will achieve this by focusing on three pillars: **Debuggability**, **Automation**, and **Predictability**.

---

## Feature 1: The Auth Sandbox (Core Feature)

**User Story:** "As Alex, I want to simulate an API request... so I can debug permission issues."

### 1.1. Overall Layout: A Full-Screen, Three-Panel View

*   **WHAT:** A dedicated, full-screen page with three persistent vertical panels: **[1: Simulation Inputs] [2: Evaluation Trace] [3: Policy Context]**.
*   **WHY a full-screen page?**
    *   *Why not a modal/popup?* → A modal is for quick, atomic tasks. Debugging permissions is a complex, investigative process that often involves multiple steps and cross-referencing information. A modal would feel cramped and trivialize a critical workflow.
    *   *Why a dedicated page?* → It signals that simulation is a first-class feature, a core part of the developer toolchain. It provides the necessary screen real estate for dense information, preventing the user from feeling constrained.
*   **WHY three persistent panels?**
    *   *Why not tabs or accordions?* → Tabs and accordions hide context. A developer needs to see the **Input** (their question), the **Trace** (the answer), and the **Context** (the reason) simultaneously to form a complete mental model. Hiding information creates cognitive load.
    *   *Why these three panels?* → They directly map to a developer's debugging workflow:
        1.  **Inputs:** "Let me set up my test case."
        2.  **Trace:** "Let me see the result and find the failure point."
        3.  **Context:** "Let me see the actual policy code that caused this result."

### 1.2. Panel 1: Simulation Inputs

*   **WHAT:** A form with fields for `Actor` (User/Role/Token), `Action` (e.g., `vehicles:view`), and `Resource` (e.g., `vehicle:vin-123`), including the resource's current attributes (like `location: 'MAINTENANCE_BAY'`).
*   **WHY include resource attributes?**
    *   *Why not just the resource ID?* → Modern, attribute-based policies depend on the resource's state. A simulation is useless if it can't account for `vehicle.location`.
    *   *How to implement?* → The UI should auto-fetch the live attributes of a real resource, but also allow the developer to override them. This lets them ask, "What if this vehicle were in the main depot instead? Would the policy still work?"

### 1.3. Panel 2: The Interactive Evaluation Trace (The "Magic")

*   **WHAT:** A top-to-bottom list of steps showing the decision-making process. Each step is a line item with a clear `[✓]` or `[✗]` icon.
*   **WHY make it interactive?**
    *   *Why not a static text log?* → A static log is passive. An interactive trace is a tool.
    *   *What makes it interactive?* → Clicking a line item in the trace (e.g., `[✗] Policy 'geofence-v1' denied access`) should instantly highlight the corresponding policy in the **Policy Context** panel. This direct, visual link is the fastest way to facilitate understanding.

### 1.4. Panel 3: Policy Context

*   **WHAT:** A read-only code editor view showing the raw policy document (e.g., JSON/YAML) that applies to the simulated resource.
*   **WHY a read-only view?**
    *   *Why not make it editable here?* → The Sandbox is for *debugging*, not *editing*. Allowing edits here would conflate two different workflows and could lead to accidental changes. The "source of truth" is the policy editor or the Git repo. This view is for diagnostics.
*   **WHY show the raw code?**
    *   *Why not just a summary?* → Developers trust code. A summary is an interpretation; the raw code is the ground truth. It removes all ambiguity and shows you respect the user's technical expertise.

---

## Feature 2: The Visual Policy Builder & Editor

**User Story:** "As Alex, I want to create complex rules... and toggle between a visual builder and raw code."

### 2.1. The Dual-Mode Interface

*   **WHAT:** A primary policy editing screen with a prominent toggle: `[ Visual Builder ]` | `[ Code Editor ]`. Changes in one mode are instantly reflected in the other.
*   **WHY a dual-mode interface?**
    *   *Why not just a code editor?* → For complex attribute-based policies, discovering the available attributes (`user.department`, `vehicle.mileage`) is difficult. The Visual Builder, with its dropdowns populated with the available schema, acts as a form of IntelliSense, making the policy language discoverable.
    *   *Why not just a visual builder?* → Visual builders can become cumbersome for very complex logic or for power users who want to work faster. Exposing the raw code provides an "escape hatch" for precision, power, and copy-pasting. It also builds trust by showing nothing is hidden.

### 2.2. The Visual Builder: "Mad Libs" Style

*   **WHAT:** A UI that lets users build rules by filling in the blanks: `Allow actor if [attribute] [operator] [value]`.
*   **WHY this style?**
    *   *Why not a drag-and-drop interface?* → Drag-and-drop can be fiddly and less accessible. A sentence-based, "fill-in-the-blanks" approach is more structured, easier to parse, and maps more directly to how a policy is structured logically. It's predictable and less prone to layout ambiguity.

---

## Feature 3: The "Git-Backed" Policy Management

**User Story:** "As Alex, I want to store policies as code in a Git repository..."

### 3.1. Workflow: From UI to Git

*   **WHAT:** When a technical admin saves a change in the policy editor, the system doesn't just save it to a database. It presents a choice:
    1.  **`[ Commit Directly ]`**: For quick fixes.
    2.  **`[ Open Pull Request ]`**: The primary, recommended workflow. This action auto-commits the policy change to a new branch in a connected Git repo and provides a link to open a PR.
*   **WHY offer a choice?**
    *   *Why not always force a PR?* → While PRs are best practice, there are legitimate "break-glass" scenarios where a production fix needs to be deployed immediately. Forcing a full PR workflow in an emergency creates dangerous friction.
    *   *Why is the PR the main workflow?* → It integrates seamlessly with a developer's existing tools. It enables peer review for security-critical changes, creates a natural audit trail, and allows for automated validation (linting, testing) in the CI/CD pipeline before the policy is ever applied. It treats authorization with the seriousness it deserves.

This exhaustive plan provides a clear path forward, with every decision rooted in the deep understanding of the technical user's needs we developed in the stories file. 