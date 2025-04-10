# ESLint Config Sylph - Base (@sylphlab/eslint-config-sylph)

This package provides the foundational ESLint Flat Config rules for SylphLab TypeScript projects. It embodies a strict, opinionated approach focused on modern best practices, extreme consistency, and developer/AI efficiency. It serves as the core building block for all other framework-specific configurations within the [`sylphlab/typescript` monorepo](https://github.com/sylphlab/typescript).

You typically won't install or use this package directly unless you are building a custom configuration upon it. For standard projects, use one of the framework-specific packages like `@sylphlab/eslint-config-sylph-react`.

## Core Philosophy & Design Principles

This configuration is built upon the following core tenets:

*   **Latest & Actively Maintained:** Uses ESLint v9+ and the latest versions of TypeScript, Prettier, and all included plugins. We prioritize tools that are actively developed and support modern JavaScript/TypeScript features.
*   **AI & Developer Friendliness:** Enforces explicit typing (`@typescript-eslint/explicit-function-return-type`, etc.), consistent import order (`eslint-plugin-import`), and strict naming conventions (`eslint-plugin-unicorn`) to make code easier for both human developers and AI assistants to understand, analyze, and modify reliably.
*   **Extreme Consistency:** Leverages Prettier for all formatting concerns and enforces strict rules for code structure, naming, and patterns via ESLint plugins to minimize cognitive load and ensure uniformity.
*   **Explicit & Strongly Typed:** Maximizes TypeScript's type safety features (`strictTypeChecked`, `stylisticTypeChecked`) and avoids ambiguity (`noImplicitAny`, `eqeqeq`).
*   **Efficiency & Performance:** Includes rules that help identify potential performance bottlenecks or inefficient patterns (e.g., via `eslint-plugin-sonarjs`, `eslint-plugin-regexp`).
*   **Security Focused:** Integrates `eslint-plugin-security` to catch common security vulnerabilities early in the development process.
*   **Functional Programming Style:** Encourages immutability, pure functions, and declarative patterns where appropriate, guided by rules from `eslint-plugin-functional` and `eslint-plugin-unicorn`.
*   **Comprehensive Coverage:** Aims to cover various aspects of code quality, including potential bugs, code smells, promise handling, and regular expressions, through dedicated plugins.
*   **Modern Flat Config (`.ts`):** Utilizes ESLint's latest type-safe configuration format (`eslint.config.ts`) for better maintainability and clarity.

## Included Plugins & Configurations

This base configuration integrates and configures the following core components:

*   **ESLint Core:** `eslint`, `@eslint/js` (recommended rules)
*   **TypeScript:** `typescript`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin` (strict & stylistic type-checked rules)
*   **Formatting:** `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`
*   **Imports:** `eslint-plugin-import`, `eslint-import-resolver-typescript`, `eslint-import-resolver-node`
*   **Modernization & Consistency:** `eslint-plugin-unicorn`
*   **Security:** `eslint-plugin-security`
*   **Bug Detection & Code Smells:** `eslint-plugin-sonarjs`
*   **Functional Style:** `eslint-plugin-functional`
*   **Promises:** `eslint-plugin-promise`
*   **Regular Expressions:** `eslint-plugin-regexp`
*   **Globals:** `globals`

## Installation

This package is intended to be a `peerDependency` of framework-specific configurations. If installing directly for a custom setup, ensure all peer dependencies are met:

```bash
# Using pnpm (recommended)
pnpm add -D @sylphlab/eslint-config-sylph \
  eslint@^9 \
  typescript@^5 \
  prettier@^3 \
  @eslint/js \
  @typescript-eslint/eslint-plugin@^8 \
  @typescript-eslint/parser@^8 \
  eslint-config-prettier@^9 \
  eslint-import-resolver-node@^0.3 \
  eslint-import-resolver-typescript@^3 \
  eslint-plugin-functional@^6 \
  eslint-plugin-import@^2 \
  eslint-plugin-prettier@^5 \
  eslint-plugin-promise@^6 \
  eslint-plugin-regexp@^2 \
  eslint-plugin-security@^3 \
  eslint-plugin-sonarjs@^1 \
  eslint-plugin-unicorn@^53 \
  globals@^15

# Using npm
npm install --save-dev @sylphlab/eslint-config-sylph \
  eslint@^9 \
  typescript@^5 \
  prettier@^3 \
  @eslint/js \
  @typescript-eslint/eslint-plugin@^8 \
  @typescript-eslint/parser@^8 \
  eslint-config-prettier@^9 \
  eslint-import-resolver-node@^0.3 \
  eslint-import-resolver-typescript@^3 \
  eslint-plugin-functional@^6 \
  eslint-plugin-import@^2 \
  eslint-plugin-prettier@^5 \
  eslint-plugin-promise@^6 \
  eslint-plugin-regexp@^2 \
  eslint-plugin-security@^3 \
  eslint-plugin-sonarjs@^1 \
  eslint-plugin-unicorn@^53 \
  globals@^15

# Using yarn
yarn add --dev @sylphlab/eslint-config-sylph \
  eslint@^9 \
  typescript@^5 \
  prettier@^3 \
  @eslint/js \
  @typescript-eslint/eslint-plugin@^8 \
  @typescript-eslint/parser@^8 \
  eslint-config-prettier@^9 \
  eslint-import-resolver-node@^0.3 \
  eslint-import-resolver-typescript@^3 \
  eslint-plugin-functional@^6 \
  eslint-plugin-import@^2 \
  eslint-plugin-prettier@^5 \
  eslint-plugin-promise@^6 \
  eslint-plugin-regexp@^2 \
  eslint-plugin-security@^3 \
  eslint-plugin-sonarjs@^1 \
  eslint-plugin-unicorn@^53 \
  globals@^15
```

*(Note: Using `npx install-peerdeps` on a framework-specific package like `@sylphlab/eslint-config-sylph-react` is the easiest way to install all necessary peers, including this base package.)*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`:

```typescript
// eslint.config.ts
import sylphBaseConfig from '@sylphlab/eslint-config-sylph';
import globals from 'globals'; // If needed for global definitions

export default [
  // IMPORTANT: Define language options globally, especially parserOptions.project
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Example: Add browser globals
        ...globals.node,   // Example: Add Node.js globals
      },
      parserOptions: {
        // project: true, // DO NOT rely on 'true'. Explicitly set the path(s) to your tsconfig.json.
        project: ['./tsconfig.json'], // Adjust path(s) for your project structure (e.g., './tsconfig.eslint.json', ['./apps/*/tsconfig.json'])
        // tsconfigRootDir: import.meta.dirname, // Usually not needed if paths are relative to eslint.config.ts
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    // Optional: Configure import resolver project path if needed, especially in monorepos
    // settings: {
    //   'import/resolver': {
    //     typescript: {
    //       project: ['./tsconfig.json'], // Match parserOptions.project
    //     },
    //   },
    // },
  },

  // Include the Sylph base configuration
  ...sylphBaseConfig,

  // Your project-specific rules or overrides
  {
    files: ['src/**/*.ts'], // Target specific files for overrides if needed
    // languageOptions: { // Can also override parserOptions per file group if necessary
    //   parserOptions: {
    //     project: './src/tsconfig.json',
    //   }
    // },
    rules: {
      // Example override: Allow console.log in specific files/folders
      'no-console': 'off',
      // Example: Adjust unicorn rule
      'unicorn/prevent-abbreviations': ['error', {
        replacements: { props: false, ref: false } // Allow 'props' and 'ref'
      }],
    },
  },

  // Ignore patterns (can also be defined globally)
  {
    ignores: [
        'dist/',
        'build/',
        'coverage/',
        'my-custom-ignored-folder/',
    ],
  }
];
```

See the [main monorepo README](../../README.md) for more details on the overall philosophy and available configurations.