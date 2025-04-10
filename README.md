# SylphLab TypeScript Ecosystem: Configurations & Guidelines

[![CI Status](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml/badge.svg)](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Packages

### ESLint Configurations
[![npm version](https://img.shields.io/npm/v/@sylphlab/eslint-config-sylph?label=%40sylphlab%2Feslint-config-sylph)](https://www.npmjs.com/package/@sylphlab/eslint-config-sylph)
[![npm version](https://img.shields.io/npm/v/@sylphlab/eslint-config-sylph-react?label=%40sylphlab%2Feslint-config-sylph-react)](https://www.npmjs.com/package/@sylphlab/eslint-config-sylph-react)
[![npm version](https://img.shields.io/npm/v/@sylphlab/eslint-config-sylph-vue?label=%40sylphlab%2Feslint-config-sylph-vue)](https://www.npmjs.com/package/@sylphlab/eslint-config-sylph-vue)
[![npm version](https://img.shields.io/npm/v/@sylphlab/eslint-config-sylph-rn?label=%40sylphlab%2Feslint-config-sylph-rn)](https://www.npmjs.com/package/@sylphlab/eslint-config-sylph-rn)

### TypeScript & Prettier Configurations
[![npm version](https://img.shields.io/npm/v/@sylphlab/typescript-config?label=%40sylphlab%2Ftypescript-config)](https://www.npmjs.com/package/@sylphlab/typescript-config)
[![npm version](https://img.shields.io/npm/v/@sylphlab/prettier-config?label=%40sylphlab%2Fprettier-config)](https://www.npmjs.com/package/@sylphlab/prettier-config)

---

Welcome to the central hub for SylphLab's TypeScript development standards! This monorepo, managed with **Turborepo** and **pnpm workspaces**, houses our meticulously crafted ESLint configurations, shared `tsconfig` bases, Prettier setup, and comprehensive development guidelines.

## Overview

We believe in building high-quality, maintainable, and efficient software. This repository serves multiple purposes:

1. **Internal Standard:** A single source of truth for SylphLab's TypeScript practices, ensuring consistency across all projects.
2. **Open Source Contribution:** Offering the wider community a set of strict, modern, and opinionated configurations based on industry best practices.
3. **Technical Showcase:** Demonstrating SylphLab's commitment to quality engineering, modern tooling, and clear documentation.

## Core Philosophy

Our approach is built upon these pillars:

* **Extreme Strictness:** We enforce most linting rules as errors to catch issues at the earliest possible stage. Quality is non-negotiable.
* **Modern Tooling:** Leveraging ESLint Flat Config (`eslint.config.ts`), TypeScript 5+, pnpm, Turborepo, and modern JS features (`"type": "module"`).
* **Best Practices:** Incorporating standards from Airbnb, TypeScript Strict, Unicorn, Prettier, and framework-specific recommendations.
* **Developer & AI Ergonomics:** Prioritizing explicit typing, clear naming, and consistent formatting for both humans and AI assistants.
* **Automation:** Utilizing automated formatting (Prettier), Git hooks (Husky), CI/CD (GitHub Actions), and dependency management (Dependabot).
* **Performance & Bug Prevention:** Maximizing static analysis and encouraging efficient patterns for robust and performant applications.

## Packages within this Monorepo

### ESLint Configurations

* **[@sylphlab/eslint-config-sylph](./packages/eslint-config-sylph)**: Foundational config for all TypeScript projects.
* **[@sylphlab/eslint-config-sylph-react](./packages/eslint-config-sylph-react)**: Extends base with React/JSX/Hooks/A11y rules.
* **[@sylphlab/eslint-config-sylph-vue](./packages/eslint-config-sylph-vue)**: Extends base with Vue 3 rules.
* **[@sylphlab/eslint-config-sylph-rn](./packages/eslint-config-sylph-rn)**: Extends React config with React Native rules.

### TypeScript Configuration

* **[@sylphlab/typescript-config](./packages/typescript-config)**: Reusable TypeScript configurations:
  * `base`: Foundational strict TypeScript settings
  * `node`: Node.js environment settings
  * `dom`: Browser environment settings 
  * `react`: React project settings
  * `vue`: Vue project settings
  * `react-native`: React Native settings

### Prettier Configuration

* **[@sylphlab/prettier-config](./packages/prettier-config)**: Standardized Prettier configuration with organized imports and package.json formatting.

### Examples

* **Examples** *(Planned)*: Sample projects demonstrating the usage of these configurations.

## Documentation

This repository contains comprehensive documentation covering:

* **[Best Practices](./docs/best-practices/)**: Core principles, project structure.
* **[Style Guide](./docs/style-guide/)**: ESLint, Prettier, Git hooks, quality metrics.
* **[Tooling](./docs/tooling/)**: Project setup, `tsconfig`, Dependabot, CI/CD, Docker.
* **[TypeScript Specifics](./docs/typescript/)**: Testing (Vitest), documentation (VitePress, TypeDoc).

Explore the [`docs/typescript/index.md`](./docs/typescript/index.md) for a detailed breakdown.

## Getting Started

1. **Clone the repository (if contributing):**
   ```bash
   git clone https://github.com/sylphlab/typescript.git
   cd typescript
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Explore Packages:** Each package has its own README with specific installation and usage instructions.

4. **Run Commands:** Use `turbo run <script>` from the root (e.g., `turbo run build`, `turbo run lint`).

## Usage Guides

### Using ESLint Configurations

```bash
# Install base configuration
pnpm add -D eslint typescript @sylphlab/eslint-config-sylph

# Or for React projects
pnpm add -D eslint typescript @sylphlab/eslint-config-sylph-react

# Install peer dependencies
npx install-peerdeps --dev @sylphlab/eslint-config-sylph-<variant> -p pnpm
```

Create an `eslint.config.js` file in your project root:

```javascript
import sylphConfig from '@sylphlab/eslint-config-sylph';
// Or for React: import sylphReactConfig from '@sylphlab/eslint-config-sylph-react';

export default [
  ...sylphConfig,
  // Your project-specific overrides here
];
```

### Using TypeScript Configuration

```bash
pnpm add -D typescript @sylphlab/typescript-config
```

Create a `tsconfig.json` that extends the appropriate configuration:

```json
{
  "extends": "@sylphlab/typescript-config/react", // Or node, dom, vue, etc.
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"]
}
```

### Using Prettier Configuration

```bash
pnpm add -D prettier @sylphlab/prettier-config
```

Reference in your `package.json`:

```json
{
  "prettier": "@sylphlab/prettier-config"
}
```

## Contributing

Contributions are welcome! Please ensure adherence to the established code style and quality standards.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
