# Desktop App

`apps/desktop` is an Electron shell for macOS and Windows. It loads the web application and provides a safe placeholder for future desktop automation adapters.

## What is included

- Electron main process.
- Context-isolated BrowserWindow.
- Preload bridge placeholder.
- Automation capability and request placeholders.
- Node test coverage for automation helpers.

## Key files

| File | Purpose |
| --- | --- |
| `src/main.js` | Creates the Electron BrowserWindow and IPC handlers |
| `src/preload.js` | Exposes safe APIs to the renderer process |
| `src/automation.js` | Placeholder automation capabilities and request handling |
| `test/automation.test.js` | Validates automation behavior |

## Development

```bash
npm run dev:web
npm run dev:desktop
```

By default, Electron loads `http://localhost:3000`. Override with `WEB_URL` if needed.

## Automation boundary

Desktop automation is intentionally modeled as command intents first. Native adapters should be added only after permission prompts, allowlists, rate limits, and audit logs are in place.

See [Desktop Automation Safety](../ai-native/desktop-automation-safety.md).
