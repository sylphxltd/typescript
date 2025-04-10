# SylphLab TypeScript Ecosystem: Configurations & Guidelines

[![CI Status](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml/badge.svg)](https://github.com/sylphlab/typescript/actions/workflows/ci-release.yml)
[![npm version](https://img.shields.io/npm/v/@sylphlab/eslint-config-sylph?label=%40sylphlab%2Feslint-config-sylph)](https://www.npmjs.com/package/@sylphlab/eslint-config-sylph)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to the central hub for SylphLab's TypeScript development standards! This monorepo, managed with **Turborepo** and **pnpm workspaces**, houses our meticulously crafted ESLint configurations, shared `tsconfig` bases, Prettier setup, and comprehensive development guidelines.

**Why This Project Exists:**

We believe in building high-quality, maintainable, and efficient software. This repository serves multiple purposes:

1.  **Internal Standard:** Provides a single source of truth for SylphLab's TypeScript practices, ensuring consistency across all our projects.
2.  **Open Source Contribution:** Offers the wider community a set of strict, modern, and opinionated configurations based on industry best practices.
3.  **Technical Showcase:** Demonstrates SylphLab's commitment to quality engineering, modern tooling, and clear documentation.

## Core Philosophy

Our approach is built upon these pillars:

*   **Extreme Strictness:** We enforce most linting rules as errors to catch issues at the earliest possible stage. Quality is non-negotiable.
*   **Modern Tooling:** Leveraging ESLint Flat Config (`eslint.config.ts`), TypeScript 5+, pnpm, Turborepo, and modern JS features (`"type": "module"`).
*   **Best Practices:** Incorporating standards from Airbnb, TypeScript Strict, Unicorn, Prettier, and framework-specific recommendations (React, Vue, React Native).
*   **Developer & AI Ergonomics:** Prioritizing explicit typing, clear naming, and consistent formatting makes code easier for both humans and AI assistants to understand, refactor, and maintain.
*   **Automation:** Utilizing automated formatting (Prettier), Git hooks (Husky), CI/CD (GitHub Actions), and dependency management (Dependabot) to streamline development.
*   **Performance & Bug Prevention:** Maximizing static analysis and encouraging efficient patterns to build robust and performant applications.

## Packages within this Monorepo

*   **ESLint Configurations (`packages/eslint-config-*`)**
    *   `@sylphlab/eslint-config-sylph`: Foundational config for all TS projects.
    *   `@sylphlab/eslint-config-sylph-react`: Extends base with React/JSX/Hooks/A11y rules.
    *   `@sylphlab/eslint-config-sylph-vue`: Extends base with Vue 3 rules.
    *   `@sylphlab/eslint-config-sylph-rn`: Extends React config with React Native rules.
*   **TypeScript Configuration (`packages/typescript-config`)**
    *   `@sylphlab/typescript-config`: Reusable TypeScript configurations for different environments:
        *   `base`: Foundational strict TypeScript settings
        *   `node`: Node.js environment settings
        *   `dom`: Browser environment settings 
        *   `react`: React project settings
        *   `vue`: Vue project settings
        *   `react-native`: React Native settings
*   **Prettier Configuration (`packages/prettier-config`)**
    *   `@sylphlab/prettier-config`: A shared Prettier configuration package with organized imports and package.json formatting.
*   **Examples (`examples/*`)** *(Planned)*
    *   Simple projects demonstrating the usage of the configurations.

## Documentation (`docs/`)

This repository also contains comprehensive documentation covering:

*   **Best Practices:** Core principles, project structure.
*   **Style Guide:** ESLint, Prettier, Git hooks, quality metrics.
*   **Tooling:** Project setup, `tsconfig`, Dependabot, CI/CD, Docker.
*   **TypeScript Specifics:** Testing (Vitest), documentation (VitePress, TypeDoc).

Explore the [`docs/typescript/index.md`](./docs/typescript/index.md) for a detailed breakdown.

## Getting Started

1.  **Clone the repository (if contributing):**
    ```bash
    git clone https://github.com/sylphlab/typescript.git
    cd typescript
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Explore Packages:** Navigate to individual packages in the `packages/` directory. Each package has its own README detailing specific installation and usage instructions (e.g., [`packages/eslint-config-sylph/README.md`](./packages/eslint-config-sylph/README.md)).
4.  **Run Commands:** Use `turbo run <script>` from the root (e.g., `turbo run build`, `turbo run lint`).

## Using the ESLint Configurations in Your Project

Refer to the README file of the specific configuration package you need (e.g., `@sylphlab/eslint-config-sylph-react`) for detailed installation and setup instructions. The general process involves:

1.  Installing `eslint` and `typescript`.
2.  Installing the desired `@sylphlab/eslint-config-sylph-*` package.
3.  Using `npx install-peerdeps --dev @sylphlab/eslint-config-sylph-<your-choice> -p pnpm` to install all required peer dependencies.
4.  Creating an `eslint.config.js` (or `.ts`) in your project root and importing the configuration.

Example (`eslint.config.js` for a React project):
```javascript
import sylphReactConfig from '@sylphlab/eslint-config-sylph-react';

export default [
  ...sylphReactConfig,
  // Your project-specific overrides
  {
    languageOptions: { parserOptions: { project: './tsconfig.json' } },
    rules: { 'no-console': 'warn' }
  }
];
```

## Using the TypeScript Configuration in Your Project

The `@sylphlab/typescript-config` package provides optimized TypeScript configurations for various environments and frameworks:

1. **Install the package**:
   ```bash
   pnpm add -D typescript @sylphlab/typescript-config
   ```

2. **Create a tsconfig.json file** that extends the appropriate configuration:

   **For Node.js projects**:
   ```json
   {
     "extends": "@sylphlab/typescript-config/node",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
   }
   ```

   **For React projects**:
   ```json
   {
     "extends": "@sylphlab/typescript-config/react",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
   }
   ```

For more detailed information and additional configurations (DOM, Vue, React Native), refer to the [`packages/typescript-config/README.md`](./packages/typescript-config/README.md).

## Using the Prettier Configuration in Your Project

The `@sylphlab/prettier-config` package provides a standardized Prettier configuration:

1. **Install the package**:
   ```bash
   pnpm add -D prettier @sylphlab/prettier-config
   ```

2. **Reference in package.json** (recommended):
   ```json
   {
     "prettier": "@sylphlab/prettier-config"
   }
   ```

For more options and details, refer to the [`packages/prettier-config/README.md`](./packages/prettier-config/README.md).

## Contributing

Contributions are welcome! Please refer to the contribution guidelines (TODO: Create CONTRIBUTING.md) for details on reporting issues, proposing changes, and submitting pull requests. Ensure adherence to the established code style and quality standards.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
