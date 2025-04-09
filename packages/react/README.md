# ESLint Config Sylph - React (@sylphlab/eslint-config-sylph-react)

This package provides the ESLint Flat Config rules for SylphLab React/Next.js projects. It extends the [`@sylphlab/eslint-config-sylph`](https://github.com/sylphlab/eslint-config-sylph/tree/main/packages/base) base configuration with specific rules for React, JSX A11y, and React Hooks.

## Installation

Install this package and its peer dependencies:

```bash
# Using pnpm
pnpm add -D @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unicorn prettier react typescript

# Using npm
npm install --save-dev @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unicorn prettier react typescript

# Using yarn
yarn add --dev @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unicorn prettier react typescript
```
*Note: Ensure you install the peer dependencies required by both this package and the base package.*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`:

```javascript
// eslint.config.js (or .ts)
import sylphReactConfig from '@sylphlab/eslint-config-sylph-react';

export default [
  ...sylphReactConfig,
  // Your project-specific rules or overrides
  {
    // Example: If using Next.js core web vitals rule
    // files: ['pages/**/*', 'app/**/*'], // Adjust file paths as needed
    // rules: {
    //   '@next/next/no-html-link-for-pages': 'off', // Example override
    // }
  },
  {
    // Example: Ignoring specific files/folders
    ignores: ['**/dist/**', '**/node_modules/**']
  }
];
```

See the [main project README](https://github.com/sylphlab/eslint-config-sylph#readme) for more details on the overall philosophy and available configurations.