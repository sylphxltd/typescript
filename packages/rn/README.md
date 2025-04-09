# ESLint Config Sylph - React Native (@sylphlab/eslint-config-sylph-rn)

This package provides the ESLint Flat Config rules for SylphLab React Native projects. It extends the [`@sylphlab/eslint-config-sylph-react`](https://github.com/sylphlab/eslint-config-sylph/tree/main/packages/react) configuration (which itself extends the base config) with specific rules for React Native.

## Installation

Install this package and its peer dependencies:

```bash
# Using pnpm
pnpm add -D @sylphlab/eslint-config-sylph-rn @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native eslint-plugin-unicorn prettier react react-native typescript

# Using npm
npm install --save-dev @sylphlab/eslint-config-sylph-rn @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native eslint-plugin-unicorn prettier react react-native typescript

# Using yarn
yarn add --dev @sylphlab/eslint-config-sylph-rn @sylphlab/eslint-config-sylph-react @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native eslint-plugin-unicorn prettier react react-native typescript
```
*Note: Ensure you install the peer dependencies required by this package, the React package, and the base package.*

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`:

```javascript
// eslint.config.js (or .ts)
import sylphRNConfig from '@sylphlab/eslint-config-sylph-rn';

export default [
  ...sylphRNConfig,
  // Your project-specific rules or overrides
  {
    rules: {
      // example override
      'react-native/no-inline-styles': 'warn',
    }
  },
  {
    // Example: Ignoring specific files/folders
    ignores: ['**/dist/**', '**/node_modules/**']
  }
];
```

See the [main project README](https://github.com/sylphlab/eslint-config-sylph#readme) for more details on the overall philosophy and available configurations.