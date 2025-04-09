# ESLint Config Sylph - Vue (@sylphlab/eslint-config-sylph-vue)

This package provides the ESLint Flat Config rules for SylphLab Vue 3 projects (using TypeScript). It extends the [`@sylphlab/eslint-config-sylph`](https://github.com/sylphlab/eslint-config-sylph/tree/main/packages/base) base configuration with specific rules for Vue 3.

## Installation

Install this package and its peer dependencies:

```bash
# Using pnpm
pnpm add -D @sylphlab/eslint-config-sylph-vue @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn eslint-plugin-vue prettier typescript vue-eslint-parser

# Using npm
npm install --save-dev @sylphlab/eslint-config-sylph-vue @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn eslint-plugin-vue prettier typescript vue-eslint-parser

# Using yarn
yarn add --dev @sylphlab/eslint-config-sylph-vue @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn eslint-plugin-vue prettier typescript vue-eslint-parser
```
*Note: Ensure you install the peer dependencies required by both this package and the base package.*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`:

```javascript
// eslint.config.js (or .ts)
import sylphVueConfig from '@sylphlab/eslint-config-sylph-vue';

export default [
  ...sylphVueConfig,
  // Your project-specific rules or overrides
  {
    files: ['**/*.vue'], // Target Vue files specifically if needed
    rules: {
      // example override
      'vue/no-unused-vars': 'warn',
    }
  },
  {
    // Example: Ignoring specific files/folders
    ignores: ['**/dist/**', '**/node_modules/**']
  }
];
```

See the [main project README](https://github.com/sylphlab/eslint-config-sylph#readme) for more details on the overall philosophy and available configurations.