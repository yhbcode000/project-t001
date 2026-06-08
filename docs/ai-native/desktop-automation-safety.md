# Desktop Automation Safety

Desktop automation is powerful and risky. The template models automation as **auditable intent first** rather than direct native execution.

## Current boundary

- The web UI sends an automation request to the Agent service.
- The Agent service records/returns a command intent.
- Electron exposes placeholder IPC handlers.
- No dangerous native action is executed by default.

## Why this boundary matters

Screen capture, mouse movement, clicking, and keyboard input can expose private data or perform irreversible actions. AI-native products must make these operations visible, permissioned, and auditable.

## Recommended controls

| Control | Purpose |
| --- | --- |
| Explicit user confirmation | Prevent hidden or surprising actions |
| Command allowlist | Limit which actions can run |
| Target allowlist | Limit apps/windows/domains automation can touch |
| Rate limits | Prevent runaway loops |
| Audit log | Record who requested what, when, and why |
| Dry-run preview | Show the planned action before execution |
| Replay protection | Prevent duplicated sensitive commands |
| Kill switch | Let users immediately stop automation |
| Sensitive data masking | Avoid leaking secrets in screenshots/logs |

## Production workflow

1. Agent proposes an action.
2. UI shows the action and required permissions.
3. User approves or denies.
4. Backend records the approval.
5. Electron adapter executes only approved commands.
6. Result is recorded and streamed back to the user.

## Never do this by default

- Do not execute arbitrary shell commands from an LLM response.
- Do not type into arbitrary windows without confirmation.
- Do not capture screens without visible user consent.
- Do not hide automation from the user.
