# RBAC - Technical Prototype Implementation Plan (v2)

This document outlines the technical steps required to build the front-end prototype for the developer-focused RBAC features. It has been updated based on a detailed UX critique to incorporate advanced developer-experience enhancements.

*   **Objective**: Create a high-fidelity prototype that demonstrates a deep understanding of developer trust, debuggability, and enterprise-ready IAM workflows.
*   **Technology**: React/Next.js, TypeScript, Tailwind CSS. We will reuse components from `@/components/ui` and leverage a lightweight animation library like `framer-motion` for microinteractions.

## File Structure Plan

We will create a new sub-directory within `@/rbac` to house the technical admin features, keeping it separate from the existing non-technical UI.

```
/src/rbac
├── /components
├── /hooks
├── /pages
│   ├── users.tsx              // Existing non-technical page
│   └── tech-admin.tsx         // New technical admin page
├── /technical-admin           // <-- NEW FOLDER
│   ├── /components
│   │   ├── auth-sandbox.tsx
│   │   ├── policy-editor.tsx
│   │   ├── evaluation-trace.tsx
│   │   └── audit-timeline.tsx
│   └── /data
│       └── mock-tech-data.ts  // Mock policies, traces, audit logs
└── ...
```

---

## Phase 1: Foundation & The Auth Sandbox Shell

*Goal: Set up the core layout and navigation for the technical admin view.*

*   [ ] **1.1. Create New Page Route**: `src/rbac/pages/tech-admin.tsx` containing the `AuthSandbox` component.
*   [ ] **1.2. Implement Three-Panel Layout**: Create `src/rbac/technical-admin/components/auth-sandbox.tsx` with a three-panel Flexbox/Grid layout.
*   [ ] **1.3. Add Navigation Toggle**: In `users.tsx`, add a "Switch to Technical View" button/link that navigates to the new page, demonstrating the role-tailored experience.
*   [ ] **1.4. Establish Component Structure**: Create placeholder files for new components: `EvaluationTrace.tsx`, `PolicyEditor.tsx`, `PolicyTemplateGallery.tsx`.

---

## Phase 2: Building the Interactive Auth Sandbox

*Goal: Breathe life into the sandbox, focusing on a world-class debugging workflow.*

*   [ ] **2.1. Create Mock Data**: Create `src/rbac/technical-admin/data/mock-tech-data.ts` with mock policies (including human-readable names), evaluation traces, and user/resource attributes.
*   [ ] **2.2. Build Simulation Inputs Panel**: Flesh out the `SimulationInputs` component.
    *   **Enhancement**: Allow user to override fetched resource attributes to ask "what-if" questions.
*   [ ] **2.3. Build the Evaluation Trace**:
    *   **Task**: Render the list of mock trace steps with clear `CheckCircle2`/`XCircle` icons.
    *   **UX Risk Mitigation**: Implement collapsible trace groups (e.g., group by policy). Steps inside a group are hidden by default, showing only a summary.
    *   **UX Polish**: Add tags for `[Critical]` vs. `[Info]` steps.
*   [ ] **2.4. Build Policy Context Panel**: Display the selected policy using `react-syntax-highlighter`.
    *   **UX Risk Mitigation**: On hover/click of a trace step, a breadcrumb should appear in this panel: *"This rule was triggered by the 'Driver' role policy."*
*   [ ] **2.5. Implement Core Interactivity**: Use `useState` to link a click on a trace step to highlighting the relevant policy in the context panel.
*   [ ] **2.6. Implement "Effective Access" Summary**:
    *   **Task**: Below the trace, add a summary box.
    *   **Details**: Based on the simulation, render a human-readable summary: *"✅ This actor can **view vehicles** and **update logs**. ❌ They **cannot delete vehicles**."*

---

## Phase 3: The Policy Editor & Git-Backed Workflow

*Goal: Showcase advanced, enterprise-ready policy creation and version control.*

*   [ ] **3.1. Create Policy Editor Page**: Embed the `PolicyEditor` component within a new tab or dedicated page.
*   [ ] **3.2. Implement Dual-Mode Toggle**: Use `@/components/ui/tabs` for `[ Visual Builder ]` | `[ Code Editor ]`.
*   [ ] **3.3. Build the Visual Builder**:
    *   **Enhancement**: Implement the "sentence-style" template UI: `👤 Actor with role [Driver] is [granted] if [vehicle.status] = [Active]`. This makes policy creation more intuitive.
*   [ ] **3.4. Implement "Policy Diff View"**:
    *   **Task**: Add a `View Changes` toggle within the editor.
    *   **Details**: When active, it highlights new or modified lines/fields since the last saved version.
*   [ ] **3.5. Implement Pre-Commit Impact Preview**:
    *   **Task**: Before the save/commit dialog, show a summary of the change's impact.
    *   **Details**: Use a simple modal: *"This change will affect 3 roles and allow 17 users to access Fuel Logs. Are you sure?"* This is a critical safety gate.
*   [ ] **3.6. Prototype the "Git-Backed" Save Flow**:
    *   **Enhancement**: Instead of a simple dialog, use a `Sheet` that slides in. It will contain a commit message `Input` field, a mock "diff preview," and the `[ Commit Directly ]` / `[ Create Pull Request ]` buttons.

---

## Phase 4: UX Polish & Storytelling Features

*Goal: Add the final layer of polish and supporting features that tell a compelling story.*

*   [ ] **4.1. Build Policy Template Gallery**:
    *   **Task**: Create the `PolicyTemplateGallery` component.
    *   **Details**: Display cards for starter policies like "Read-only Maintenance" or "Temporary Elevated Access." Clicking a card populates the Policy Editor.
*   [ ] **4.2. Implement Guided Simulation Mode**:
    *   **Task**: Add an optional "Guided Mode" toggle to the sandbox.
    *   **Details**: When active, each trace step has an additional info icon (`<Info>`) that, on hover, explains *why* that type of check is important in an IAM system. This shows you're thinking about onboarding junior developers.
*   [ ] **4.3. Implement UX-Polish Microinteractions**:
    *   **Task**: Sprinkle in small, delightful animations using `framer-motion`.
    *   **Checklist**:
        *   [ ] Animate trace group expand/collapse.
        *   [ ] Add slight bounce to `CheckCircle`/`XCircle` icons on simulation run.
        *   [ ] Use a fade/spinner transition when running a simulation.
        *   [ ] Animate the "Commit" sheet sliding in from the side.
*   [ ] **4.4. Final Review & Responsive Pass**: Ensure the entire prototype works flawlessly in both light/dark modes and stacks gracefully on mobile viewports.

---

This revised plan is now our definitive blueprint. It's more robust, addresses the nuanced needs of a developer audience, and directly prepares us for the story we need to tell.

Regarding your final question, thank you. To ensure we tell this story perfectly, taking you up on your offer to help build a **5-slide narrative** is the ideal next step. It will crystallize the "why" behind our work and serve as the north star for the entire prototype presentation.

Let's do it. Please lay out the 5-slide narrative. 