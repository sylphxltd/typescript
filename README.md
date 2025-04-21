# SylphLab TypeScript Ecosystem

[![CI Status](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml/badge.svg)](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Strict, AI-optimized, and modern TypeScript tooling monorepo using Biome.**
> Centralizes all SylphLab TypeScript standards (formatting, linting via Biome; tsconfig presets), with a focus on extreme code quality, maintainability, performance, and developer/AI efficiency.

---

## Description

- **Monorepo for all SylphLab TypeScript configurations and guidelines**
- **Includes:**
  - [@sylphlab/biome-config](./packages/biome-config): Base Biome configuration (formatting & linting).
  - [@sylphlab/biome-config-react](./packages/biome-config-react): Extends base Biome config for React projects.
  - [@sylphlab/biome-config-vue](./packages/biome-config-vue): Extends base Biome config for Vue projects.
  - [@sylphlab/typescript-config](./packages/typescript-config): Strict, reusable tsconfig bases.
  - *Deprecated:* `@sylphlab/eslint-config-*` and `@sylphlab/prettier-config` packages are being replaced by Biome.
- **Managed with:** Turborepo, pnpm workspaces
- **Documentation:** [@sylphlab/typescript-docs](./packages/docs/) (Built with Astro Starlight)

---

## Core Philosophy

- **Extreme strictness:** All critical lint rules are errors. No compromise on quality.
- **Modern tooling:** Biome (Linting/Formatting), TypeScript 5+, pnpm, Turborepo, ESM-first.
- **AI & developer ergonomics:** Explicit typing, clear naming, strict structure, consistent formatting via Biome.
- **Automation:** Biome via Lefthook (pre-commit hook), CI/CD (GitHub Actions), Dependabot.
- **Performance & bug prevention:** Fast tooling (Biome), static analysis, security rules, complexity limits.

---

## Usage

### Install

```bash
pnpm install
```

### Explore Packages

- Each package has its own README with install and usage.
- See [packages/](./packages/).

### Run

```bash
pnpm run build  # Build packages if needed (e.g., docs site)
pnpm run check  # Run Biome checks (lint + format check) across all packages
pnpm run format # Apply Biome formatting fixes across all packages
```

---

## Quick Start: Biome Config

```bash
# Install Biome and the base config
pnpm add -D @biomejs/biome @sylphlab/biome-config
# Or for React projects:
# pnpm add -D @biomejs/biome @sylphlab/biome-config-react
```

Create `biome.json` in your package root:

```json
{
  // Use relative path to the installed shared config
  "extends": ["./node_modules/@sylphlab/biome-config/biome.json"]
  // Or for React:
  // "extends": ["./node_modules/@sylphlab/biome-config-react/biome.json"]
}
```
*(Note: The relative path `../biome-config/biome.json` works within the monorepo itself, but consuming projects outside the monorepo need the `./node_modules/...` path).*

Add scripts to your `package.json`:
```json
{
  "scripts": {
    "format": "biome format --write .",
    "check": "biome check --write --unsafe ."
  }
}
```

---

## Quick Start: TypeScript Config

```bash
pnpm add -d typescript @sylphlab/typescript-config
```

`tsconfig.json`:

```json
{
  "extends": "@sylphlab/typescript-config/base",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"]
}
```

---

## Documentation

- The documentation site is built using Astro Starlight and located in the `packages/docs` directory.
- Run `pnpm run docs:dev` to start the local development server.

---

## Contributing

---

## Contributing

- PRs welcome. Follow code style and quality standards.

## License

MIT
