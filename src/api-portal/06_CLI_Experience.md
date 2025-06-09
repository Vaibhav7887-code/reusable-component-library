# Developer API Portal: CLI Experience Design

A powerful Command Line Interface (CLI) is a key part of a modern developer platform. This document outlines the design and user experience for the `fleetedge` CLI.

---

## 1. Guiding Principle: The CLI as a First-Class, Composable Interface

In developer-facing products, the CLI is not an accessory — it's a primary interface. It represents a different mode of work: automation, scripting, and composition. Our design philosophy is therefore not "parity with the UI," but **first-class composability**. We empower developers to compose, introspect, and script complex RBAC and API tasks directly from their terminal, integrating our platform into their native workflows.

The core goal is to bridge the gap between interactive (UI) and scripted (CLI) workflows, allowing a developer to discover an API in the portal, test it in the playground, and then immediately use the CLI to integrate it into their CI/CD pipeline.

## 2. CLI Design Philosophy & Language

A CLI is a user interface, and it deserves a thoughtful design philosophy. The `fleetedge` CLI is built on three core principles:

1.  **Be Fast, but Forgiving:** The primary job of the CLI is to be fast. However, speed should not come at the cost of clarity. Commands are concise, but error messages are verbose and helpful. We prioritize getting the user unstuck over absolute brevity.
2.  **Be Explicit and Predictable:** The CLI should do what it says and say what it does. There are no "magic" commands. Destructive actions (`keys delete`) require explicit confirmation. The output of commands is structured and predictable, enabling reliable scripting.
3.  **Provide Progressive Disclosure:** The default output for most commands is a human-readable summary. For scripting or deeper analysis, the user can always add a `--json` flag to get a complete, machine-readable output. This serves both interactive use and automation without cluttering the common case.

This philosophy informs our design language, from command naming (`verb-noun` convention like `keys create`) to the structure of our error messages. We explicitly follow the UX paradigms established by successful developer CLIs like `git`, `gh` (GitHub CLI), and the `vercel` CLI to ensure a familiar and intuitive experience.

### **CLI UX Writing Principles**
*   **Use Imperative Voice:** Commands should be direct and action-oriented. E.g., `fleetedge apis list`, not `fleetedge please list apis`.
*   **Active, Not Passive, Failures:** Error messages must be active and helpful. Bad: `"Error: Key not found."` Good: `"❌ ERROR: Could not find key 'fe_sk_...xyz'. Run 'fleetedge keys list' to see your available keys."`
*   **Help is Always Available:** Every command, and subcommand, must respond to the `--help` flag with useful, context-aware documentation. There should be no dead ends.

---

## 2. CLI Onboarding (`fleetedge init`)

To provide a smooth first-run experience, a new user will be prompted to run `fleetedge init`. This interactive command will walk them through the initial setup.

```bash
$ fleetedge init
Welcome to the FleetEdge CLI! Let's get you set up.

First, you'll need to log in.
> Press Enter to open FleetEdge in your browser for authentication...

Authentication successful!

What should be your default output format? (You can change this later)
> [1] Table (human-readable)
> [2] JSON (machine-readable)
Enter a number: 1

Great! Your CLI is configured.
You can start by listing available APIs with 'fleetedge apis list'.
For more commands, run 'fleetedge --help'.
```

---

## 3. Goal & Philosophy

**Goal:** To allow developers to manage their FleetEdge resources and test APIs without leaving the comfort of their terminal. The CLI is a "headless" version of the developer dashboard, designed for speed, automation, and integration into scripts.

**Philosophy:**
*   **Follow Conventions:** The CLI should feel familiar to developers who have used other modern CLIs (like `git`, `gh`, or `vercel`).
*   **Be Scriptable:** Commands should support flags (e.g., `--json`) to output machine-readable data.
*   **Provide Great Help:** Every command must have a useful `--help` output.
*   **Fail Gracefully:** Error messages should be clear and actionable.

---

## 4. Core User Stories

This is a recap of the CLI user stories from our main stories document:

*   **As Alex**, I want to be able to run `fleetedge login` to authenticate the CLI.
*   **As Alex**, I want to run `fleetedge apis list` to see my subscribed APIs.
*   **As Alex**, I want to run `fleetedge keys create` and `fleetedge keys list` to manage my API keys.
*   **As Alex**, I want to run `fleetedge api call <endpoint>` to make a test API call.
*   **As Alex**, I want the CLI to have a comprehensive `--help` command.

---

## 5. Command Mockups & UX

This section provides a text-based mockup of the key CLI commands and their expected output.

### `fleetedge login`
*   **Action:** Initiates an OAuth2 device authorization flow. The user is given a URL and a code, preventing the CLI from ever handling passwords.
```bash
$ fleetedge login
> Press Enter to open FleetEdge in your browser for authentication...
> Or, open this URL in your browser: https://fleetedge.com/cli-auth
> And enter this code: ABCD-1234
```

### `fleetedge apis list`
*   **Action:** Lists the APIs the user is currently subscribed to.
```bash
$ fleetedge apis list
✔ Showing your subscribed APIs

NAME                     PLAN      REQUESTS THIS MONTH
Vehicle Telemetry API    Pro       8,450 / 10,000
Route Optimization API   Basic     150 / 1,000
```

### `fleetedge keys list`
*   **Action:** Lists the user's API keys for a given project or for their account.
```bash
$ fleetedge keys list
✔ Showing your API keys

NAME              KEY PREFIX              LAST USED
My Production App   fe_sk_...prod_xxxx      5 minutes ago
Staging Tester      fe_sk_...stag_yyyy      2 days ago
```

### `fleetedge keys create`
*   **Action:** Creates a new API key with specific scopes and an optional Time-to-Live (TTL).
```bash
$ fleetedge keys create --name "Reporting Service" --scopes "vehicles:read,analytics:read" --ttl 90d
✔ API Key 'Reporting Service' created successfully! It will expire in 90 days.

API_KEY: fe_pk_9876543210zyxw
SECRET:  fe_sk_zyxw_and_so_on_and_so_forth

This is the only time your secret will be shown.
Store it securely.
```

### `fleetedge api call` & Error Recovery
*   **Action:** Makes a direct API call. The error handling is designed to be specific and actionable, guiding the user to a solution.

| Error Type | Example Output | Suggested Next Step |
| :--- | :--- | :--- |
| **Authentication (401)** | `🔒 ERROR: Invalid token. It may have expired 12h ago.` | `Run 'fleetedge login' to refresh your credentials.` |
| **Permission (403)** | `🚫 ERROR: Scope missing. This action requires 'vehicle:write'.` | `Generate a new key with the required scope.` |
| **Not Found (404)** | `❌ ERROR: Vehicle not found for VIN 'XYZ-123'.` | `Check the VIN or run 'fleetedge vehicles list' to see available vehicles.` |
| **Rate Limit (429)** | `⏳ ERROR: Rate limit exceeded. Please try again in 45 seconds.`| `Upgrade your plan in the portal for higher limits or optimize your code to reduce calls.` |
| **Server Error (5xx)** | `🔥 ERROR: An unexpected server error occurred (503).`| `Please try again later. If the problem persists, check status.fleetedge.com or contact support.` |

### `fleetedge usage`
*   **Action:** A new command to provide analytics directly in the CLI.
```bash
$ fleetedge usage --by-key fe_sk_...prod_xxxx --since 30d
✔ Showing usage for key 'My Production App' in the last 30 days

ENDPOINT                  CALLS
/v1/vehicles/{vin}        15,230
/v1/vehicles/geofence     8,900
/v1/analytics/report      1,200
TOTAL                     25,330
```

### `fleetedge --help`
*   **Action:** Shows the top-level help menu.
```bash
$ fleetedge --help
The official command line interface for FleetEdge.

USAGE
  fleetedge <command> [subcommand] [flags]

COMMANDS
  init      Configure the FleetEdge CLI for first time use
  login     Authenticate with your FleetEdge account
  apis      Manage your API subscriptions
  keys      Manage your API keys
  api       Make calls directly to the FleetEdge API
  usage     Check your API usage and analytics
  help      Show help for a command

FLAGS
  --help      Show help for a command
  --version   Show the current version
```

## 6. Core Commands & Workflows

`fleetedge api keys list --status active --sort last-used`
`fleetedge api keys view <key-id>`
`fleetedge api keys rotate --key <key-id> --grace-period 24h`
`fleetedge api keys rotate --key <key-id> --grace-period 24h --pr`
`fleetedge api keys delete <key-id>`

### Example: The "CLI-to-PR" Workflow

A common, high-stakes workflow is key rotation. A developer can use the CLI to not only perform the rotation but also integrate it with their version control, creating an auditable paper trail.

```bash
# Rotate an expiring key and create a GitHub PR to update the new key
# in the production environment variables.
fleetedge api keys rotate \
  --key "fk-prod-billing-9a8b..." \
  --grace-period 48h \
  --description "Quarterly rotation for billing service" \
  --create-pr \
  --repo "fleetedge/billing-service" \
  --title "feat(secrets): Rotate billing service API key"

# Output:
# ✓ Key fk-prod-billing-9a8b... successfully marked for rotation.
# ✓ New key fk-prod-billing-7c6d... has been generated.
# ✓ GitHub pull request #431 created: https://github.com/fleetedge/billing-service/pull/431
```

### `fleetedge logs`

```bash
$ fleetedge logs --since 24h
✔ Showing logs for the last 24 hours

TIMESTAMP                 EVENT
2024-04-01 10:00:00       New API key 'fk-prod-billing-9a8b...' created
2024-04-01 10:00:00       API key 'fk-prod-billing-9a8b...' rotated
2024-04-01 10:00:00       New API key 'fk-prod-billing-7c6d...' generated
2024-04-01 10:00:00       API key 'fk-prod-billing-7c6d...' rotated
``` 