# SylphLab ESLint Configurations

Monorepo for shared ESLint Flat Configurations for SylphLab projects (TypeScript, React, Vue, React Native).

This repository contains strict, opinionated ESLint configurations based on Airbnb, TypeScript ESLint, Unicorn, and Prettier best practices, formatted for ESLint's modern Flat Config system (`eslint.config.ts`).

## Philosophy

*   **Flat Config (`.ts`):** Modern, type-safe configuration format.
*   **Extreme Strictness:** Most rules enforced as errors to catch potential issues early.
*   **High Quality:** Leverages established best practices from Airbnb, TypeScript Strict, and Unicorn.
*   **AI Readability:** Enforces explicit typing and high consistency, making code easier for both humans and AI assistants to understand and modify.
*   **Bug Prevention:** Maximizes static analysis capabilities to prevent common errors and enforce type safety rigorously.
*   **FP Leaning:** Encourages immutability and cleaner code patterns via rules from Airbnb and Unicorn.
*   **File Naming:** Enforced consistency (PascalCase Components, kebab-case others).
*   **Formatting:** Delegated entirely to Prettier for objective style consistency.

## Packages

This monorepo contains the following packages:

*   `@sylphlab/eslint-config-sylph-base`: Core configuration for all TypeScript projects.
*   `@sylphlab/eslint-config-sylph-react`: Extends `base` with React-specific rules (JSX, Hooks, a11y).
*   `@sylphlab/eslint-config-sylph-vue`: Extends `base` with Vue 3-specific rules.
*   `@sylphlab/eslint-config-sylph-rn`: Extends `react` with React Native-specific rules.

## Installation

Choose the package(s) relevant to your project.

**1. Install ESLint & TypeScript (Required for all):**
```bash
# Using pnpm (recommended)
pnpm add -D eslint typescript

# Using npm
npm install --save-dev eslint typescript

# Using yarn
yarn add --dev eslint typescript
```

**2. Install Desired Config Package(s):**

*   **For Base TypeScript Projects:**
    ```bash
    pnpm add -D @sylphlab/eslint-config-sylph-base
    ```
*   **For React Projects:**
    ```bash
    pnpm add -D @sylphlab/eslint-config-sylph-react
    ```
*   **For Vue 3 Projects:**
    ```bash
    pnpm add -D @sylphlab/eslint-config-sylph-vue
    ```
*   **For React Native Projects:**
    ```bash
    pnpm add -D @sylphlab/eslint-config-sylph-rn
    ```

**3. Install Peer Dependencies:**

Each config package requires peer dependencies (ESLint plugins, parsers, etc.). Modern package managers (like pnpm v7+) will attempt to automatically install peer *packages* (like `@sylphlab/eslint-config-sylph-base` when you install `@sylphlab/eslint-config-sylph-react`), but they **will not** install other tool peers like `eslint-plugin-react`.

*   **Recommended Method (Easiest):** Use `install-peerdeps` for the *most specific* package you need. It will install the package itself, its direct peers, and the peers of its dependencies (like `-base`).
    ```bash
    # Example for React (Installs -react, -base, and all required plugins/tools)
    npx install-peerdeps --dev @sylphlab/eslint-config-sylph-react -p pnpm

    # Example for Base only
    npx install-peerdeps --dev @sylphlab/eslint-config-sylph-base -p pnpm
    ```

*   **Manual Method:** Check the `peerDependencies` listed in the `package.json` file of *each* relevant package (`-base` and your chosen framework package) and install them manually using `pnpm add -D ...`.

## Usage (`eslint.config.ts`)

Create an `eslint.config.ts` file in your project root and import the configuration array from the package you installed.

**1. Base Configuration:**
```typescript
// eslint.config.ts
import baseConfig from '@sylphlab/eslint-config-sylph-base';

export default [
  ...baseConfig,
  // Add project-specific overrides
  {
      languageOptions: { parserOptions: { /* project: './tsconfig.json' */ } },
      // rules: { 'no-console': 'warn' }
  }
];
```

**2. React Configuration:**
```typescript
// eslint.config.ts
import reactConfig from '@sylphlab/eslint-config-sylph-react'; // Exports combined base + react

export default [
  ...reactConfig,
  // Add project-specific overrides
];
```

**3. Vue 3 Configuration:**
```typescript
// eslint.config.ts
import vueConfig from '@sylphlab/eslint-config-sylph-vue'; // Exports combined base + vue

export default [
  ...vueConfig,
  // Add project-specific overrides
];
```

**4. React Native Configuration:**
```typescript
// eslint.config.ts
import rnConfig from '@sylphlab/eslint-config-sylph-rn'; // Exports combined base + react + rn

export default [
  ...rnConfig,
  // Add project-specific overrides
];
```
*(Note: The exact export structure assumes each framework package exports a combined array including its base dependencies. This needs to be implemented in the source files.)*

## Important Notes

*   Ensure you have a correctly configured `tsconfig.json` in your project root (or specify the path in your `eslint.config.ts`).
*   Ensure you have a `.prettierrc.js` (or similar) for formatting consistency.
*   You might need `ts-node` installed if running ESLint directly with the `.ts` config file.

## Contributing

This monorepo is currently managed as a submodule within the [SylphLab Playbook](https://github.com/sylphlab/Playbook). Please refer to the main repository or the specific config package repository (once separated/renamed) for contribution guidelines.
