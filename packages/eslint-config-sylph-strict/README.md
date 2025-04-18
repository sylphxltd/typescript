# @sylphlab/eslint-config-sylph-strict

This package provides the **Strict** ESLint Flat Configuration for SylphLab TypeScript projects.

**It extends the standard `@sylphlab/eslint-config-sylph` configuration** and adds stricter rules suitable for mature projects or pre-release validation.

## Philosophy

- **Extends Standard:** Builds upon the base `@sylphlab/eslint-config-sylph` configuration.
- **Maximum Strictness:** Re-enforces rules relaxed in the standard config (e.g., `no-explicit-any`, abbreviations) as errors.
- **Low Limits:** Enforces low limits for complexity, file/function length, nesting depth, and parameters as errors.

* **Functional Programming:** Re-introduces strict functional programming rules (immutability, no-throw) via `eslint-plugin-functional`.

Use this configuration when the highest level of code quality, consistency, and adherence to strict patterns is required. For general development, the standard `@sylphlab/eslint-config-sylph` configuration is recommended.

## Installation

1.  **Ensure Standard Config is Installed:** Follow the installation steps for `@sylphlab/eslint-config-sylph` first, including installing ESLint, TypeScript, and all its peer dependencies (using `install-peerdeps` is recommended).
2.  **Install This Package:**
    ```bash
    # Using pnpm (recommended)
    pnpm add -D @sylphlab/eslint-config-sylph-strict
    ```
3.  **Install Additional Peer Dependencies:** This package requires `eslint-plugin-functional`.
    ```bash
    pnpm add -D eslint-plugin-functional
    ```
    _(Note: Other peers like `eslint`, `typescript`, `typescript-eslint` should already be installed via the standard config setup)._

## Usage (`eslint.config.js` or `eslint.config.ts`)

Import the configuration array from this package instead of the standard one.

```javascript
// eslint.config.js
import { sylphStrict } from '@sylphlab/eslint-config-sylph-strict';

export default [
  ...sylphStrict,
  // Add any project-specific overrides here, if absolutely necessary
  {
    // Example: Further restrict a rule if needed
    // rules: { 'max-params': ['error', 3] }
  },
];
```

**Important:** Ensure you have a correctly configured `tsconfig.json` that includes all files intended for linting. This strict configuration relies heavily on type information.
