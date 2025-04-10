# TypeScript Code Style & Quality

This document details how to set up and use the standard tools for code style, linting, formatting, and Git hooks in TypeScript projects, ensuring maximum quality and consistency through the shared ESLint configuration packages (e.g., `@sylphlab/eslint-config-sylph-base`, `@sylphlab/eslint-config-sylph-react`).

## 1. ESLint Configuration Packages

To ensure extreme consistency, quality, and adherence to best practices across all SylphLab projects, **use the shared ESLint configuration packages**. These packages provide configurations based on ESLint's modern flat config format (`eslint.config.ts`) and are split based on framework needs.

**Philosophy:**

*   **Shared & Centralized:** One package to manage rules for all projects.
*   **Flat Config (`.ts` based):** Modern, type-safe configuration format, compiled to JS for distribution.
*   **Modular Packages:** Separate packages (`-base`, `-react`, `-vue`, `-rn`) for targeted installation.
*   **Extreme Strictness:** All rules enforced as errors (except specific relaxations).
*   **High Quality:** Based on Airbnb, TypeScript Strict, and Unicorn best practices.
*   **AI Readability:** Enforces explicit typing and high consistency.
*   **Bug Prevention:** Maximizes static analysis capabilities.
*   **FP Leaning:** Encourages immutability via Airbnb/Unicorn.
*   **File Naming:** Enforced (PascalCase Components, kebab-case others).
*   **Formatting:** Delegated entirely to Prettier.

**1.1. Installation:**

Choose the package(s) relevant to your project.

1.  **Install ESLint & TypeScript (Required for all):**
    ```bash
    # Using pnpm (recommended)
    pnpm add -D eslint typescript

    # Using npm
    npm install --save-dev eslint typescript

    # Using yarn
    yarn add --dev eslint typescript
    ```

2.  **Install Desired Config Package(s):**
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

3.  **Install Peer Dependencies:**
    Each config package requires peer dependencies (ESLint plugins, parsers, etc.).

    *   **Recommended Method (Easiest):** Use `install-peerdeps` for the *most specific* package you need. It will install the package itself, its direct peers, and the peers of its dependencies (like `-base`).
        ```bash
        # Example for React (Installs -react, -base, and all required plugins/tools)
        npx install-peerdeps --dev @sylphlab/eslint-config-sylph-react -p pnpm

        # Example for Base only
        npx install-peerdeps --dev @sylphlab/eslint-config-sylph-base -p pnpm
        ```

    *   **Manual Method:** Check the `peerDependencies` listed in the `package.json` file of *each* relevant package (`-base` and your chosen framework package) and install them manually using `pnpm add -D ...`.

**1.2. Usage (`eslint.config.ts`):**

Create an `eslint.config.ts` file in your project root and import the configuration array from the package you installed. Ensure you have a `tsconfig.json` configured.

*   **Base Configuration (TypeScript Core):**
    ```javascript
    // eslint.config.js
    import baseConfig from '@sylphlab/eslint-config-sylph-base';

    export default [
      ...baseConfig,
      // Add any project-specific overrides here
      {
          languageOptions: {
              parserOptions: {
                  // Ensure project path is correct if tsconfig isn't in root
                  // project: './path/to/your/tsconfig.json',
                  // tsconfigRootDir: process.cwd(), // Usually correct by default
              },
          },
          // Example override: Allow console logs in specific files
          // files: ['src/debugUtils.ts'],
          // rules: { 'no-console': 'warn' }
      }
    ];
    ```
*   **React Configuration:**
    ```javascript
    // eslint.config.js
    import reactConfig from '@sylphlab/eslint-config-sylph-react'; // Exports combined base + react

    export default [
      ...reactConfig,
      // Add any project-specific React overrides here
      {
          // settings: { react: { version: '18.2' } } // Override detected version if needed
      }
    ];
    ```
*   **Vue 3 Configuration:**
    ```javascript
    // eslint.config.js
    import vueConfig from '@sylphlab/eslint-config-sylph-vue'; // Exports combined base + vue

    export default [
      ...vueConfig,
      // Add any project-specific Vue overrides here
    ];
    ```
*   **React Native Configuration:**
    ```javascript
    // eslint.config.js
    import rnConfig from '@sylphlab/eslint-config-sylph-rn'; // Exports combined base + react + rn

    export default [
      ...rnConfig,
      // Add any project-specific React Native overrides here
    ];
    ```

**1.3. Important Notes:**

*   The package is distributed as compiled JavaScript. You typically use it in your project's `eslint.config.js`.
*   Refer to the specific package's `package.json` (e.g., `@sylphlab/eslint-config-sylph-react/package.json`) for detailed peer dependency lists.
*   Ensure you have a correctly configured `tsconfig.json` that includes all files intended for linting. The shared config assumes `tsconfig.json` is in the root or its path is correctly specified in your project's ESLint config override.
*   Ensure you have a `prettier.config.cjs` (or similar using `.js` with `module.exports`) for formatting, as ESLint delegates formatting to Prettier.
*   **Ignoring Files**: Use the `ignores` property within your project's `eslint.config.js` (or `.ts`) to specify files or directories that ESLint should ignore. The traditional `.eslintignore` file is not used with flat config. Example: `export default [ ...sylphConfig.base, { ignores: ["dist/**", "coverage/**"] } ];`

## 2. Prettier Configuration

SylphLab provides a standardized Prettier configuration package that can be shared across projects.

### 2.1 Using the Shared Prettier Configuration

1. **Install the package**:
   ```bash
   pnpm add -D prettier @sylphlab/prettier-config
   ```

2. **Reference in package.json** (recommended):
   ```json
   {
     "prettier": "@sylphlab/prettier-config"
   }
   ```

3. **Or with an ESM configuration file**:
   ```javascript
   // .prettierrc.js
   import sylphPrettierConfig from '@sylphlab/prettier-config';

   export default {
     ...sylphPrettierConfig,
     // Project-specific overrides if necessary
   };
   ```

4. **Or with CommonJS**:
   ```javascript
   // .prettierrc.cjs
   const sylphPrettierConfig = require('@sylphlab/prettier-config');

   module.exports = {
     ...sylphPrettierConfig,
     // Project-specific overrides if necessary
   };
   ```

## 3. Standard NPM Scripts (`package.json`)

- Define common tasks. The `eslint` command works automatically with `eslint.config.ts`.
  ```json
  {
    "scripts": {
      // ... other scripts ...
      "lint": "eslint . --cache --max-warnings=0",
      "lint:fix": "eslint . --fix --cache",
      "format": "prettier --write . --cache --ignore-unknown",
      "check-format": "prettier --check . --cache --ignore-unknown",
      "validate": "pnpm run check-format && pnpm run lint && pnpm run typecheck && pnpm run test",
      // ... other scripts ...
    }
  }
  ```

## 4. Git Hooks Configuration (Husky + lint-staged)

- Enforce standards automatically before commits.
- **Setup Steps** (Run in project root):
  ```bash
  pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
  npx husky init
  echo "npx lint-staged" > .husky/pre-commit
  echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
  echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.cjs
  ```
- **lint-staged Configuration** (in `package.json`):
  ```json
  {
    "lint-staged": {
      "*.{ts,tsx,vue,js,cjs,mjs}": [
        "eslint --fix --cache --max-warnings=0",
        "prettier --write --cache --ignore-unknown"
      ],
      "*.{json,md,yaml,yml,html,css}": [
        "prettier --write --cache --ignore-unknown"
      ]
    }
  }
  ```

Adhering to the shared ESLint configuration is crucial for maintaining a high-quality, consistent, and AI-friendly codebase. Specific lint rules, code quality metrics, and limits are defined and enforced by the `@sylphlab/eslint-config-sylph-*` packages themselves.