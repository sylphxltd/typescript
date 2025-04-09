# ESLint Config Sylph - Base (@sylphlab/eslint-config-sylph)

This package provides the foundational ESLint Flat Config rules for SylphLab TypeScript projects. It serves as the core building block for all other framework-specific configurations within the [`sylphlab/typescript` monorepo](https://github.com/sylphlab/typescript).

You typically won't install or use this package directly unless you are building a custom configuration upon it. For standard projects, use one of the framework-specific packages like `@sylphlab/eslint-config-sylph-react`.

## Core Philosophy & Design Principles

This configuration embodies SylphLab's approach to code quality and consistency:

*   **Modern Flat Config (`.ts`):** Utilizes ESLint's latest type-safe configuration format for better maintainability and clarity.
*   **Extreme Strictness:** Most rules are enforced as errors (`error` severity) to catch potential issues and enforce best practices proactively during development. We believe in fixing problems early.
*   **High Quality Standards:** Leverages well-established, community-vetted best practices from industry standards like Airbnb's style guide, TypeScript ESLint's strictest recommendations, and the comprehensive ruleset from `eslint-plugin-unicorn`.
*   **AI & Human Readability:** Enforces explicit typing (`@typescript-eslint/explicit-function-return-type`, etc.) and high consistency (via Prettier and naming conventions) to make code easier for both human developers and AI assistants to understand, analyze, and modify reliably.
*   **Bug Prevention Focus:** Maximizes static analysis capabilities to prevent common JavaScript pitfalls and enforce TypeScript's type safety rigorously (e.g., `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`).
*   **Functional Programming Leanings:** Encourages immutability, pure functions, and cleaner code patterns through rules inherited from Airbnb and Unicorn (`unicorn/prevent-abbreviations`, `unicorn/no-null`, preferring functional iteration methods).
*   **Consistent File Naming:** Enforces consistent file naming conventions via `unicorn/filename-case` (defaulting to `kebab-case`, configurable).
*   **Automated Formatting:** Delegates all code formatting concerns entirely to Prettier, ensuring objective and consistent style across the codebase without manual intervention. ESLint focuses solely on code quality and potential errors.

## Installation

This package is typically installed as a peer dependency of other `@sylphlab/eslint-config-sylph-*` packages. If you need to install it directly for a custom setup:

```bash
# Using pnpm (recommended)
pnpm add -D @sylphlab/eslint-config-sylph eslint typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn prettier

# Using npm
npm install --save-dev @sylphlab/eslint-config-sylph eslint typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn prettier

# Using yarn
yarn add --dev @sylphlab/eslint-config-sylph eslint typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn prettier
```
*(Note: Using `npx install-peerdeps` on a framework-specific package like `@sylphlab/eslint-config-sylph-react` is the easiest way to install all necessary peers, including this base package.)*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`:

```typescript
// eslint.config.ts
import sylphBaseConfig from '@sylphlab/eslint-config-sylph';

export default [
  // It's recommended to include languageOptions globally if possible
  // { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  ...sylphBaseConfig,
  // Your project-specific rules or overrides
  {
    files: ['**/*.ts', '**/*.tsx'], // Target specific files if needed
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Point to your project's tsconfig
      },
    },
    rules: {
      // example override
      'no-console': 'warn',
      'unicorn/prevent-abbreviations': ['error', { replacements: { props: false } }],
    }
  }
];
```

See the [main monorepo README](../../README.md) for more details on the overall philosophy and available configurations.