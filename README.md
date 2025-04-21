# SylphLab TypeScript Ecosystem

[![CI Status](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml/badge.svg)](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Strict, AI-optimized, and modern TypeScript tooling monorepo using Biome.**
> Centralizes all SylphLab TypeScript standards (formatting, linting via Biome; tsconfig presets), with a focus on extreme code quality, maintainability, performance, and developer/AI efficiency.

---

## Description

- **Monorepo for all SylphLab TypeScript configurations and guidelines**
- **Includes:**
  - [@sylphlab/biome-config](./packages/biome-config): Base Biome configuration (formatting & linting). Includes Standard and Strict tiers.
  - [@sylphlab/typescript-config](./packages/typescript-config): Strict, reusable tsconfig bases (Node, DOM, React, Vue, React Native).
  - *Deprecated:* `@sylphlab/eslint-config-*` and `@sylphlab/prettier-config` packages are replaced by Biome.
- **Managed with:** Turborepo, pnpm workspaces
- **Build Tool:** tsup (for building packages)
- **Documentation:** [@sylphlab/typescript-docs](./packages/docs/) (Built with Astro Starlight)

---

## Core Philosophy

- **Extreme strictness:** All critical lint rules are errors. No compromise on quality (especially with `@sylphlab/biome-config/strict`).
- **Modern tooling:** Biome (Linting/Formatting), tsup (Building), TypeScript 5+, pnpm, Turborepo, Lefthook (Git Hooks), ESM-first.
- **AI & developer ergonomics:** Explicit typing, clear naming, strict structure (co-location), consistent formatting via Biome.
- **Automation:** Biome & commitlint via Lefthook (pre-commit/commit-msg hooks), CI/CD (GitHub Actions), Dependabot.
- **Performance & bug prevention:** Fast tooling (Biome, tsup), static analysis, security rules, complexity limits.
- **Mandatory Co-location:** Test (`*.test.ts`) and benchmark (`*.bench.ts`) files **MUST** reside in the same directory as the source file they target.

---

## Usage

### Install

```bash
pnpm install
```

### Explore Packages

- Each package has its own README with install and usage.
- See [packages/](./packages/).

### Run Standard Scripts

These scripts should be defined in the root `package.json` and individual package `package.json` files as needed, aligning with Core Instruction V.I.

```bash
pnpm run format     # Apply Biome formatting fixes
pnpm run check      # Run Biome checks (lint + format check) & apply safe fixes
pnpm run lint       # Alias for 'check'
pnpm run typecheck  # Run TypeScript compiler checks (tsc --noEmit)
pnpm run test       # Run tests (e.g., Vitest)
pnpm run validate   # Run check, typecheck, and test sequentially
pnpm run build      # Build packages using tsup (via Turborepo if applicable)
```

---

## Quick Start: Biome Config

```bash
# Install Biome and the base config
pnpm add -D @biomejs/biome @sylphlab/biome-config
```

Create `biome.json` in your package root:

```json
{
  // Extend the shared config (Standard tier)
  "extends": ["@sylphlab/biome-config"]
  // Or for Strict tier:
  // "extends": ["@sylphlab/biome-config/strict"]

  // Add project-specific overrides below if absolutely necessary
  // "files": { "ignore": ["dist/**"] },
  // "linter": { ... },
  // "formatter": { ... }
}
```

Add standard scripts to your `package.json` (see "Run Standard Scripts" above).

---

## Quick Start: TypeScript Config

```bash
pnpm add -D typescript @sylphlab/typescript-config
```

`tsconfig.json` (example for a Node package):

```json
{
  // Choose the appropriate base: node, dom, react, vue, react-native
  "extends": "@sylphlab/typescript-config/node",
  "compilerOptions": {
    // Output directory for tsup/tsc
    "outDir": "dist",
    // Source directory
    "rootDir": "src"
    // DO NOT use "composite": true or "references" in workspace packages
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts", "**/*.bench.ts"]
}
```

---

## Build Tool (tsup)

- Package building (compilation, declarations) **MUST** use `tsup`.
- Configure `tsup.config.ts` with `dts: true` and list workspace dependencies in `external`.
- Do **NOT** use `tsc` command-line for building workspace packages.

---

## Git Hooks (Lefthook + commitlint)

- Enforces standards (Biome checks, commit message format) automatically before commits.
- Requires `lefthook`, `@commitlint/cli`, `@commitlint/config-conventional`.
- Configure via `lefthook.yml` and `commitlint.config.cjs`.
- See [Code Style & Quality Docs](./packages/docs/src/content/docs/style-guide/style-quality.md) for setup.

---

## Documentation

- The documentation site is built using Astro Starlight and located in the `packages/docs` directory.
- Run `pnpm run docs:dev` to start the local development server.

---

## Contributing

- PRs welcome. Follow code style (Biome), quality standards, and commit conventions (Conventional Commits via commitlint).

## License

MIT
