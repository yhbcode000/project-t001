# Technology Selection

| Area | Choice |
| --- | --- |
| Documentation framework | MkDocs |
| Theme | Material for MkDocs |
| Source format | Markdown |
| Hosting | GitHub Pages |
| Deployment | GitHub Actions |
| Search | Material built-in search |
| API docs | mkdocstrings, if Python APIs are needed |
| Diagrams | Mermaid |
| Versioning | mike, optional for releases |

## Recommended Stack

For a documentation site inside an existing GitHub repository, we recommend using **MkDocs + Material for MkDocs**.

This stack is lightweight, Git-friendly, and easy to maintain. Documentation can live directly under the repository's `docs/` directory, while the site configuration is managed through a single `mkdocs.yml` file. Material for MkDocs provides a modern UI, responsive layout, dark mode, navigation tabs, code copy buttons, and built-in search.

## Why This Choice

MkDocs is well suited for repository-based technical documentation because it uses Markdown and can deploy directly to GitHub Pages through `mkdocs gh-deploy` or GitHub Actions.

For Python projects, `mkdocstrings` can generate API documentation directly from source code docstrings, reducing the risk of manually written API docs becoming outdated.

## Final Decision

Use:

```text
GitHub Repo
├── docs/              # Markdown documentation
├── mkdocs.yml         # Site configuration
├── README.md          # Repository landing page
└── .github/workflows/ # CI/CD deployment
```

This gives the project a modern documentation website while keeping everything version-controlled inside the same GitHub repository.

## Implementation in this repository

- `mkdocs.yml` stores the site navigation, theme, plugins, Markdown extensions, Mermaid support, and mkdocstrings settings.
- `docs/` stores Markdown pages and static documentation assets.
- `.github/workflows/docs.yml` builds and deploys the documentation site to GitHub Pages.
- `docs/requirements.txt` pins the documentation toolchain used locally and in CI.
