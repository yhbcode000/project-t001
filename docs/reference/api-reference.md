# API Reference

This page uses `mkdocstrings` to generate Python API documentation from source code where useful. The template keeps generated API docs intentionally small, because most endpoint behavior is explained in the service guides.

## FastAPI application

::: app.main
    options:
      show_source: false

## Recommended API documentation strategy

As the project grows:

- Keep human-readable endpoint behavior in `docs/services/api.md`.
- Generate OpenAPI from FastAPI for client integration.
- Add generated client types for the web app when contracts stabilize.
- Use mkdocstrings for internal Python modules that have meaningful docstrings.
