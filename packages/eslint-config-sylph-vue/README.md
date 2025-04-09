# ESLint Config Sylph - Vue (@sylphlab/eslint-config-sylph-vue)

This package provides the ESLint Flat Config rules specifically tailored for SylphLab Vue 3 projects (using TypeScript). It extends the foundational [`@sylphlab/eslint-config-sylph`](../base/README.md) base configuration with specific rules recommended for Vue 3 development.

## Core Philosophy & Design Principles

This configuration builds upon the [base philosophy](../base/README.md#core-philosophy--design-principles) with a focus on robust Vue 3 development:

*   **Vue 3 Best Practices:** Enforces rules from `eslint-plugin-vue`'s recommended set (`plugin:vue/vue3-recommended`) to promote common patterns, prevent anti-patterns, and ensure consistency in Vue component definition, template syntax, and script setup usage.
*   **TypeScript Integration:** Assumes usage of TypeScript within Vue components (`<script setup lang="ts">`) and leverages the base configuration's TypeScript rules.
*   **Parser Configuration:** Utilizes `vue-eslint-parser` for parsing `.vue` files and `@typescript-eslint/parser` for the script blocks within them.
*   **Strictness & Consistency:** Maintains the extreme strictness and focus on AI/human readability inherited from the base configuration, applying it to Vue-specific contexts.

## Installation

Install this package and its peer dependencies. The easiest way is using `install-peerdeps`:

```bash
# Using pnpm (recommended) - Installs this package, the base package, and all necessary plugins
npx install-peerdeps --dev @sylphlab/eslint-config-sylph-vue -p pnpm

# --- OR ---

# Manual Installation (if needed):
# 1. Install this package and the base package
pnpm add -D @sylphlab/eslint-config-sylph-vue @sylphlab/eslint-config-sylph
# 2. Install all peer dependencies listed in BOTH package.json files (vue's and base's)
pnpm add -D eslint typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn eslint-plugin-vue vue-eslint-parser
```

*(Ensure you have `eslint` and `typescript` installed in your project as well.)*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`. This package exports a combined array that includes the base configuration automatically.

```typescript
// eslint.config.ts
import sylphVueConfig from '@sylphlab/eslint-config-sylph-vue';
// Optionally import base config if you need to layer rules specifically
// import sylphBaseConfig from '@sylphlab/eslint-config-sylph';

export default [
  // Include the combined Vue config
  ...sylphVueConfig,

  // Your project-specific rules or overrides
  {
    files: ['**/*.vue'], // Target Vue files specifically if needed
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Point to your project's tsconfig for script blocks
      },
    },
    rules: {
      // Example: Allow console logs
      'no-console': 'warn',
      // Example: Relax abbreviation rule for 'props'
      'unicorn/prevent-abbreviations': ['error', { replacements: { props: false } }],
      // Example: Override a Vue rule
      'vue/no-v-html': 'off',
    }
  },
  {
    // Example: Ignoring specific files/folders from linting
    ignores: ['**/dist/**', '**/node_modules/**']
  }
];
```

See the [main monorepo README](../../README.md) for more details on the overall philosophy and available configurations.