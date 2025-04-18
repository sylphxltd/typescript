# TypeScript Code Style & Quality

This document details how to set up and use the standard tools for code style, linting, formatting, and Git hooks in TypeScript projects, ensuring quality and consistency through the shared ESLint configuration packages. **Two tiers are available: Standard (recommended for general development) and Strict (for mature projects/pre-release).**

## 1. ESLint Configuration Packages (Standard & Strict Tiers)

To ensure consistency, quality, and adherence to best practices across all SylphLab projects, **use the shared ESLint configuration packages**. These packages provide configurations based on ESLint's modern flat config format (`eslint.config.ts`) and are split into **Standard** and **Strict** tiers, further divided by framework needs.

**Philosophy:**

- **Shared & Centralized:** Manage rules centrally.
- **Flat Config (`.ts` based):** Modern, type-safe configuration.
- **Tiered Strictness:**
  - **Standard (`@sylphlab/eslint-config-sylph`):** Recommended for general development. Balances quality with developer velocity (uses `warn` for some stricter rules, higher limits).
  - **Strict (`@sylphlab/eslint-config-sylph-strict`):** Extends Standard. Enforces maximum strictness (uses `error` for most rules, low limits, adds functional rules). Ideal for mature projects or pre-release validation.
- **Modular Packages:** Separate packages (`-base`, `-react`, `-vue`, `-rn` for Standard tier; `-strict` for Strict tier) for targeted installation.
- **High Quality:** Based on Airbnb, TypeScript Strict, and Unicorn best practices.
- **AI Readability:** Enforces explicit typing and high consistency (especially in Strict).
- **Bug Prevention:** Maximizes static analysis capabilities.
- **FP Leaning:** Encourages immutability via Airbnb/Unicorn.
- **File Naming:** Enforced (PascalCase Components, kebab-case others).
- **Formatting:** Delegated entirely to Prettier.

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

2.  **Install Desired Config Package(s) based on Tier:**

    - **Standard Tier (Recommended for most projects):**

      - Base TS: `pnpm add -D @sylphlab/eslint-config-sylph`
      - React: `pnpm add -D @sylphlab/eslint-config-sylph-react`
      - Vue 3: `pnpm add -D @sylphlab/eslint-config-sylph-vue`
      - React Native: `pnpm add -D @sylphlab/eslint-config-sylph-rn`
        _(Note: Framework packages like `-react` already include the base standard config)._

    - **Strict Tier (For maximum strictness):**
      - Install the corresponding **Standard** tier package first (e.g., `@sylphlab/eslint-config-sylph` for base, `@sylphlab/eslint-config-sylph-react` for React).
      - Then, install the **Strict** package:
        `bash
    pnpm add -D @sylphlab/eslint-config-sylph-strict
    `
        _(Note: The `-strict` package extends the standard base config. Currently, there are no framework-specific strict packages; use `-strict` alongside the standard framework package like `-react` if needed)._

3.  **Install Peer Dependencies:**
    Each config package requires peer dependencies (ESLint plugins, parsers, etc.). The **Strict** package adds `eslint-plugin-functional` as a peer dependency.

    - **Recommended Method (Easiest):** Use `install-peerdeps` for the _most specific_ package you need. It will install the package itself, its direct peers, and the peers of its dependencies (like `-base`).

      ```bash
      # Example for Standard React (Installs -react, -base, and all required plugins/tools)
      npx install-peerdeps --dev @sylphlab/eslint-config-sylph-react -p pnpm

      # Example for Standard Base only
      npx install-peerdeps --dev @sylphlab/eslint-config-sylph -p pnpm

      # Example for Strict Base (Installs -strict, -base, and all required plugins/tools including functional)
      # Run install-peerdeps for BOTH -base and -strict if installing manually isn't preferred
      npx install-peerdeps --dev @sylphlab/eslint-config-sylph -p pnpm
      npx install-peerdeps --dev @sylphlab/eslint-config-sylph-strict -p pnpm # Installs functional plugin
      ```

    - **Manual Method:** Check the `peerDependencies` listed in the `package.json` file of _each_ relevant package (`@sylphlab/eslint-config-sylph`, potentially a framework package like `-react`, and `@sylphlab/eslint-config-sylph-strict` if using Strict) and install them manually using `pnpm add -D ...`. Remember to install `eslint-plugin-functional` for the Strict tier.

**1.2. Usage (`eslint.config.js` or `eslint.config.ts`):**

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project root and import the configuration array from the relevant package. Ensure you have a `tsconfig.json` configured.

- **Standard Tier Usage:**

  - **Base:**

    ```javascript
    // eslint.config.js
    import { sylph } from '@sylphlab/eslint-config-sylph'; // Use named import

    export default [
      ...sylph,
      // Add any project-specific overrides here
      // ...
    ];
    ```

  - **React:**

    ```javascript
    // eslint.config.js
    import { sylphReact } from '@sylphlab/eslint-config-sylph-react'; // Use named import

    export default [
      ...sylphReact,
      // Add any project-specific React overrides here
      // ...
    ];
    ```

  - _(Similar patterns for `-vue` and `-rn`)_

- **Strict Tier Usage:**

  - Import from `@sylphlab/eslint-config-sylph-strict`. This already includes the standard base configuration.

    ```javascript
    // eslint.config.js
    import { sylphStrict } from '@sylphlab/eslint-config-sylph-strict'; // Use named import

    export default [
      ...sylphStrict,
      // Add any project-specific overrides here, if absolutely necessary
      // ...
    ];
    ```

  - _(Note: If you need Strict React, you might combine imports, e.g. `[...sylphStrict, ...sylphReact]` but be mindful of potential overlaps or conflicts. A dedicated `-strict-react` package might be needed in the future if this pattern is common)._

**1.3. Important Notes:**

- The package is distributed as compiled JavaScript. You typically use it in your project's `eslint.config.js`.
- Refer to the specific package's `package.json` (e.g., `@sylphlab/eslint-config-sylph-react/package.json`) for detailed peer dependency lists.
- Ensure you have a correctly configured `tsconfig.json` that includes all files intended for linting. The shared config assumes `tsconfig.json` is in the root or its path is correctly specified in your project's ESLint config override.
- Ensure you have a `prettier.config.cjs` (or similar using `.js` with `module.exports`) for formatting, as ESLint delegates formatting to Prettier.
- **Ignoring Files**: Use the `ignores` property within your project's `eslint.config.js` (or `.ts`) to specify files or directories that ESLint should ignore. The traditional `.eslintignore` file is not used with flat config. Example: `export default [ ...sylphConfig.base, { ignores: ["dist/**", "coverage/**"] } ];`

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
      "validate": "pnpm run check-format && pnpm run lint && pnpm run typecheck && pnpm run test"
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
      "*.{json,md,yaml,yml,html,css}": ["prettier --write --cache --ignore-unknown"]
    }
  }
  ```

## 5. Project Structure & Testing Conventions

### 5.1. Co-located Tests

To keep related code and its tests together, improving discoverability and maintainability, **test files MUST be co-located with their corresponding source files**.

- **Example:** A test for `src/components/Button.tsx` should be named `src/components/Button.test.tsx` (or `.spec.tsx`) and reside in the same `src/components/` directory.
- **Rationale:** This structure makes it easy to find tests associated with a specific module or component and simplifies refactoring when moving or renaming source files.
- **Enforcement:** This is a **project convention**. While ESLint rules like `unicorn/filename-case` can enforce naming patterns (e.g., requiring `.test.ts` or `.spec.ts` suffixes), ESLint does **not** enforce file location. Adherence relies on developer discipline and code reviews. Do not place tests in separate top-level `test/` or `spec/` directories.

### 5.2. Co-located Benchmarks

Similarly to tests, **benchmark files MUST be co-located with their corresponding source files** to keep performance-related code close to the code being measured.

- **Example:** A benchmark for `src/utils/heavyCalculation.ts` should be named `src/utils/heavyCalculation.bench.ts` and reside in the same `src/utils/` directory.
- **Rationale:** This improves discoverability and makes it easier to maintain benchmarks alongside the code they target.
- **Enforcement:** This is also a **project convention**. Naming patterns (e.g., `*.bench.ts`) can be enforced via ESLint (`unicorn/filename-case`), but location relies on developer discipline and code reviews. Do not place benchmarks in separate top-level `bench/` directories.

Adhering to the shared ESLint configurations (Standard or Strict) is crucial for maintaining a high-quality, consistent, and AI-friendly codebase. Specific lint rules, code quality metrics, and limits are defined and enforced by the respective `@sylphlab/eslint-config-sylph*` packages.
