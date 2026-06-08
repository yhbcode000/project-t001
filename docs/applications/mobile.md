# Mobile App

`apps/mobile` is a Capacitor shell for delivering the web app to iOS and Android.

## What is included

- Capacitor package configuration.
- Mobile app identity placeholder.
- Local dev-server forwarding to Next.js when `CAPACITOR_DEV=true`.
- Test coverage for app identity and dev server configuration.

## Key file

`apps/mobile/capacitor.config.ts` defines:

- `appId`: native bundle identifier.
- `appName`: display name.
- `webDir`: web build output directory.
- `server`: optional local dev URL for development.

## Development mode

```bash
CAPACITOR_DEV=true npm run dev:mobile
```

This points Capacitor at `http://localhost:3000`.

## Production mode

For production, build the web app, sync Capacitor assets, and use native iOS/Android tooling. The template keeps the native projects out until you generate them for your product.

## Template customization

Before shipping:

- Change `appId` to your organization identifier.
- Change `appName` to your product name.
- Add native icons and splash screens.
- Configure push notifications if needed.
- Audit which browser APIs require native plugins.
