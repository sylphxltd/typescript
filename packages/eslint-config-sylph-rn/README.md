# ESLint Config Sylph - React Native (@sylphlab/eslint-config-sylph-rn)

This package provides the ESLint Flat Config rules specifically tailored for SylphLab React Native projects. It extends the [`@sylphlab/eslint-config-sylph-react`](../react/README.md) configuration (which itself extends the base config) with specific rules recommended for React Native development via `eslint-plugin-react-native`.

## Core Philosophy & Design Principles

This configuration builds upon the [React config philosophy](../react/README.md#core-philosophy--design-principles) with a focus on robust React Native development:

*   **React Native Best Practices:** Enforces rules from `eslint-plugin-react-native` to promote common patterns specific to the React Native environment, such as avoiding inline styles (`react-native/no-inline-styles`), using platform-specific file extensions correctly (`react-native/split-platform-components`), and managing StyleSheet usage (`react-native/no-unused-styles`).
*   **Platform Awareness:** Helps catch potential issues related to platform differences and encourages platform-agnostic or correctly separated code.
*   **Inherited Strictness:** Maintains the extreme strictness, focus on Hooks, JSX A11y, and AI/human readability inherited from the base and React configurations.

## Installation

Install this package and its peer dependencies. The easiest way is using `install-peerdeps`:

```bash
# Using pnpm (recommended) - Installs this package, react, base, and all necessary plugins
npx install-peerdeps --dev @sylphlab/eslint-config-sylph-rn -p pnpm

# --- OR ---

# Manual Installation (if needed):
# 1. Install this package, react, and base packages
pnpm add -D @sylphlab/eslint-config-sylph-rn @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph
# 2. Install all peer dependencies listed in ALL THREE package.json files (rn's, react's, and base's)
pnpm add -D eslint typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native eslint-plugin-unicorn prettier react react-native
```

*(Ensure you have `eslint` and `typescript` installed in your project as well.)*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`. This package exports a combined array that includes the base and React configurations automatically.

```typescript
// eslint.config.ts
import sylphRNConfig from '@sylphlab/eslint-config-sylph-rn';
// Optionally import base/react configs if you need to layer rules specifically

export default [
  // Include the combined React Native config
  ...sylphRNConfig,

  // Your project-specific rules or overrides
  {
    files: ['**/*.ts', '**/*.tsx'], // Target specific files
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Point to your project's tsconfig
      },
    },
    rules: {
      // Example: Allow console logs
      'no-console': 'warn',
      // Example: Relax abbreviation rule for 'props'
      'unicorn/prevent-abbreviations': ['error', { replacements: { props: false } }],
      // Example: Override a React Native rule
      'react-native/no-inline-styles': 'off', // Not recommended, but possible
    }
  },
  {
    // Example: Ignoring specific files/folders from linting
    ignores: ['**/dist/**', '**/node_modules/**', '**/ios/**', '**/android/**']
  }
];
```

See the [main monorepo README](../../README.md) for more details on the overall philosophy and available configurations.