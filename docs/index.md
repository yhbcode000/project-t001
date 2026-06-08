# Hello Platform Documentation

Welcome to the Hello Platform documentation site. This repository is a full-stack Hello World monorepo that demonstrates web, mobile, desktop, backend, realtime, queue, Rust edge, observability, AI Agent, and desktop automation layers together.

The documentation site intentionally avoids checked-in binary assets; all pages are Markdown-first and lightweight for repository review.

## Project map

```text
GitHub Repo
├── docs/              # Markdown documentation
├── mkdocs.yml         # Site configuration
├── README.md          # Repository landing page
└── .github/workflows/ # CI/CD deployment
```

## Quick links

- [Technology Selection](technology-selection.md) explains the documentation stack decision.
- [Architecture](architecture.md) explains the application runtime split.
- [API Reference](api-reference.md) provides mkdocstrings entry points for Python APIs.

## Local documentation preview

```bash
python -m pip install -r docs/requirements.txt
mkdocs serve
```

Then open <http://127.0.0.1:8000>.
