# SylphLab TypeScript Ecosystem

[![CI Status](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml/badge.svg)](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Strict, AI-optimized, and modern TypeScript configuration monorepo.**
> Centralizes all SylphLab TypeScript standards, with a focus on extreme code quality, maintainability, and developer/AI efficiency.

---

## Description

- **Monorepo for all SylphLab TypeScript configurations and guidelines**
- **Includes:**
  - [@sylphlab/eslint-config-sylph](./packages/eslint-config-sylph): Flat Config, strict, modern, AI/developer-optimized
  - [@sylphlab/eslint-config-sylph-react](./packages/eslint-config-sylph-react): React/JSX/Hooks/A11y
  - [@sylphlab/eslint-config-sylph-vue](./packages/eslint-config-sylph-vue): Vue 3
  - [@sylphlab/eslint-config-sylph-rn](./packages/eslint-config-sylph-rn): React Native
  - [@sylphlab/typescript-config](./packages/typescript-config): Strict, reusable tsconfig bases
  - [@sylphlab/prettier-config](./packages/prettier-config): Prettier, import/order, package.json formatting
- **Managed with:** Turborepo, bun workspaces
- **Documentation:** [docs/](./docs/) (Best Practices, Style Guide, Tooling, TypeScript specifics)

---

## Core Philosophy

- **Extreme strictness:** All critical rules are errors. No compromise on quality.
- **Modern tooling:** ESLint v9 Flat Config, TypeScript 5+, bun, Turborepo, ESM-first.
- **AI & developer ergonomics:** Explicit typing, clear naming, strict structure, Prettier formatting.
- **Automation:** Prettier, Husky, CI/CD, Dependabot.
- **Performance & bug prevention:** Static analysis, functional/immutable patterns, security, complexity limits.

---

## Usage

### Install

```bash
bun install
```

### Explore Packages

- Each package has its own README with install and usage.
- See [packages/](./packages/).

### Run

```bash
bun run turbo build
bun run turbo lint
```

---

## Quick Start: ESLint Config

```bash
bun add -d eslint typescript @sylphlab/eslint-config-sylph
# Install peer dependencies manually if needed
```

Create `eslint.config.ts`:

```typescript
import sylphConfig from '@sylphlab/eslint-config-sylph';

export default [
  ...sylphConfig,
  // project-specific overrides
];
```

---

## Quick Start: TypeScript Config

```bash
bun add -d typescript @sylphlab/typescript-config
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

## Quick Start: Prettier Config

```bash
bun add -d prettier @sylphlab/prettier-config
```

In `package.json`:

```json
{
  "prettier": "@sylphlab/prettier-config"
}
```

---

## Documentation

- [Best Practices](./docs/best-practices/)
- [Style Guide](./docs/style-guide/)
- [Tooling](./docs/tooling/)
- [TypeScript](./docs/typescript/)

---

## Contributing

- PRs welcome. Follow code style and quality standards.

## License

MIT
