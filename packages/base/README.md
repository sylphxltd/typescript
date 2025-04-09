# ESLint Config Sylph - Base (@sylphlab/eslint-config-sylph)

This package provides the foundational ESLint Flat Config rules for SylphLab TypeScript projects. It includes configurations based on Airbnb, TypeScript ESLint, Unicorn, and Prettier.

This package is intended to be used as a base for other framework-specific configurations within the [`eslint-config-sylph` monorepo](https://github.com/sylphlab/eslint-config-sylph). You typically won't install or use this package directly unless you are building a custom configuration.

## Installation

If you are extending this configuration, you can install it along with its peer dependencies:

```bash
# Using pnpm
pnpm add -D @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn prettier typescript

# Using npm
npm install --save-dev @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn prettier typescript

# Using yarn
yarn add --dev @sylphlab/eslint-config-sylph eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-unicorn prettier typescript
```

## Usage

Import and include the configuration array in your `eslint.config.js` or `eslint.config.ts`:

```javascript
// eslint.config.js (or .ts)
import sylphBaseConfig from '@sylphlab/eslint-config-sylph';

export default [
  ...sylphBaseConfig,
  // Your project-specific rules or overrides
  {
    rules: {
      // example override
      'no-console': 'warn',
    }
  }
];
```

See the [main project README](https://github.com/sylphlab/eslint-config-sylph#readme) for more details on the overall philosophy and available configurations.