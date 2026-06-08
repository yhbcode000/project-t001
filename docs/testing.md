# Testing

The template includes tests for web, Python services, Rust, desktop, mobile, and documentation.

## Full suite

```bash
npm run test
```

This executes:

1. `npm run test:web`
2. `npm run test:python`
3. `npm run test:rust`
4. `npm run test:desktop`
5. `npm run test:mobile`
6. `npm run test:docs`

## Web tests

```bash
npm run test:web
```

This runs Vitest, TypeScript typechecking, and a production Next.js build.

Coverage focus:

- API client behavior.
- Zustand store behavior.
- Hello Dashboard rendering and GSAP mock integration.
- Compile/build correctness.

## Python tests

```bash
npm run test:python
```

This runs pytest across:

- `services/api`
- `services/agent`
- `services/realtime`
- `services/worker`

Coverage focus:

- FastAPI router behavior.
- Redis cache behavior through fakes.
- LiveKit token payloads.
- Celery enqueue behavior.
- Agent and automation intent responses.
- Realtime health and message helpers.

## Python compile check

```bash
npm run test:python-compile
```

Useful for fast syntax validation when dependencies are not fully available.

## Rust tests

```bash
npm run test:rust
```

Runs Cargo tests in `services/rust-edge`.

## Desktop tests

```bash
npm run test:desktop
```

Validates Electron automation placeholder capabilities and accepted request payloads.

## Mobile tests

```bash
npm run test:mobile
```

Validates Capacitor app identity, web output, and dev-server behavior.

## Documentation tests

```bash
npm run test:docs
```

Runs `mkdocs build --strict`. This catches missing pages, broken nav entries, and many documentation syntax issues.

## Adding tests

When adding a module:

- Add unit tests beside the module.
- Add an npm script or extend the existing root test script.
- Add docs explaining the new test command.
- Ensure CI can run tests without requiring production credentials.
