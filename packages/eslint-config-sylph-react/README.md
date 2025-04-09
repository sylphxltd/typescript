# ESLint Config Sylph - React (@sylphlab/eslint-config-sylph-react)

This package provides the ESLint Flat Config rules specifically tailored for SylphLab React and Next.js projects. It extends the foundational [`@sylphlab/eslint-config-sylph`](https://github.com/sylphlab/typescript/tree/main/packages/eslint-config-sylph) base configuration with specific rules for React best practices, JSX accessibility (A11y), and React Hooks conventions.

## Core Philosophy & Design Principles

This configuration builds upon the [base philosophy](https://github.com/sylphlab/typescript/tree/main/packages/eslint-config-sylph#core-philosophy--design-principles) with a focus on robust React development:

*   **React Best Practices:** Enforces rules from `eslint-plugin-react` to promote common patterns, prevent anti-patterns, and ensure consistency in component definition and JSX usage.
*   **Hooks Rules:** Integrates `eslint-plugin-react-hooks` to enforce the Rules of Hooks (`react-hooks/rules-of-hooks`) and check for exhaustive dependencies (`react-hooks/exhaustive-deps`), preventing common bugs related to hook usage.
*   **JSX Accessibility (A11y):** Includes `eslint-plugin-jsx-a11y` to catch potential accessibility issues directly within your JSX markup, promoting the development of inclusive web applications.
*   **Strictness & Consistency:** Maintains the extreme strictness and focus on AI/human readability inherited from the base configuration.

## Installation

Install this package and its peer dependencies. The easiest way is using `install-peerdeps`:

```bash
# Using pnpm (recommended) - Installs this package, the base package, and all necessary plugins
npx install-peerdeps --dev @sylphlab/eslint-config-sylph-react -p pnpm

# --- OR ---

# Manual Installation (if needed):
# 1. Install this package and the base package
pnpm add -D @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph
# 2. Install all peer dependencies listed in BOTH package.json files (react's and base's)
pnpm add -D eslint typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unicorn prettier react
```

*(Ensure you have `eslint` and `typescript` installed in your project as well.)*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`. This package exports a combined array that includes the base configuration automatically.

```typescript
// eslint.config.ts
import sylphReactConfig from '@sylphlab/eslint-config-sylph-react';
// Optionally import base config if you need to layer rules specifically
// import sylphBaseConfig from '@sylphlab/eslint-config-sylph';

export default [
  // Include the combined React config
  ...sylphReactConfig,

  // Your project-specific rules or overrides
  {
    files: ['**/*.ts', '**/*.tsx'], // Target specific files
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Point to your project's tsconfig
      },
    },
    rules: {
      // Example: Allow console logs in specific files or globally
      'no-console': 'warn',
      // Example: Relax abbreviation rule for 'props'
      'unicorn/prevent-abbreviations': ['error', { replacements: { props: false } }],
      // Example: Next.js specific override (if not using Next.js plugin)
      // 'react/react-in-jsx-scope': 'off',
    }
  },
  {
    // Example: Ignoring specific files/folders from linting
    ignores: ['**/dist/**', '**/node_modules/**', '**/.next/**']
  }
];
```

See the [main monorepo README](https://github.com/sylphlab/typescript#readme) for more details on the overall philosophy and available configurations.