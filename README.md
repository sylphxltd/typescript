# @sylphlab/eslint-config-sylph

Shared ESLint Flat Configuration for SylphLab projects (TypeScript, React, Vue, React Native).

This package provides a strict, opinionated ESLint configuration based on Airbnb, TypeScript ESLint, Unicorn, and Prettier best practices, formatted for ESLint's modern Flat Config system (`eslint.config.ts`).

## Philosophy

*   **Flat Config (`.ts`):** Modern, type-safe configuration format.
*   **Extreme Strictness:** Most rules enforced as errors to catch potential issues early.
*   **High Quality:** Leverages established best practices from Airbnb, TypeScript Strict, and Unicorn.
*   **AI Readability:** Enforces explicit typing and high consistency, making code easier for both humans and AI assistants to understand and modify.
*   **Bug Prevention:** Maximizes static analysis capabilities to prevent common errors and enforce type safety rigorously.
*   **FP Leaning:** Encourages immutability and cleaner code patterns via rules from Airbnb and Unicorn.
*   **File Naming:** Enforced consistency (PascalCase Components, kebab-case others).
*   **Formatting:** Delegated entirely to Prettier for objective style consistency.

## Core Rules & Rationale

This configuration builds upon several well-regarded rule sets and adds specific overrides to align with SylphLab's principles:

*   **`eslint:recommended`**: Foundational rules catching common JavaScript errors.
*   **`airbnb-typescript/base` (or `airbnb-typescript` for React/RN)**: Enforces a widely adopted, high-quality style guide, promoting consistency and readability.
*   **`typescript-eslint/strict-type-checked` & `stylistic-type-checked`**: Maximizes TypeScript's type safety benefits, requiring explicit types and catching potential type errors at compile time. This is crucial for robust applications and effective AI collaboration.
*   **`unicorn/recommended`**: Adds rules focused on modern JavaScript features, code cleanup, and preventing obscure bugs. Key rules include:
    *   `unicorn/filename-case`: Ensures consistent file naming.
    *   `unicorn/prefer-module`: Encourages ES Modules (with exceptions for config files).
    *   `unicorn/no-null`: Promotes using `undefined` consistently.
*   **Prettier Integration (`eslint-plugin-prettier`, `eslint-config-prettier`)**: Ensures all formatting is handled by Prettier, avoiding conflicts with ESLint style rules. The `prettier/prettier` rule runs Prettier as an ESLint rule.
*   **Specific SylphLab Overrides (Examples from `baseConfig`):**
    *   `@typescript-eslint/explicit-function-return-type` & `explicit-module-boundary-types`: Require explicit return types for functions and module exports, improving code clarity and preventing unexpected `any` types.
    *   `import/prefer-default-export`: Disabled, allowing named exports for better tree-shaking and refactoring.
    *   `import/no-extraneous-dependencies`: Strictly controlled to prevent importing dev dependencies into production code.
    *   `no-console` & `no-debugger`: Disallowed in committed code to maintain clean production builds.
    *   `complexity`, `max-lines`, `max-lines-per-function`, `max-depth`, `max-params`: Enforce cognitive limits to keep code understandable and maintainable. Functions and files should be small and focused.

This combination aims for code that is not only correct and consistent but also highly maintainable, readable (by humans and AI), and less prone to common errors.

## Installation

1.  **Install ESLint and the config package:**
    ```bash
    # Using pnpm (recommended)
    pnpm add -D eslint typescript @sylphlab/eslint-config-sylph

    # Using npm
    npm install --save-dev eslint typescript @sylphlab/eslint-config-sylph

    # Using yarn
    yarn add --dev eslint typescript @sylphlab/eslint-config-sylph
    ```

2.  **Install Peer Dependencies:** This package requires several peer dependencies depending on your project type. Check the `peerDependencies` section in `package.json`. You can often install them using:
    ```bash
    # Using npx (for npm/yarn) - Installs ALL optional peer deps
    npx install-peerdeps --dev @sylphlab/eslint-config-sylph

    # Or install manually based on your needs (example for React):
    pnpm add -D @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unicorn prettier
    ```
    *Refer to `package.json` for the full list and optional status.*

## Usage (`eslint.config.ts`)

Create an `eslint.config.ts` file in your project root.

**1. Base Configuration (TypeScript Core):**
```typescript
// eslint.config.ts
import sylphConfig from '@sylphlab/eslint-config-sylph';

export default [
  ...sylphConfig.base,
  // Add project-specific overrides
  {
      languageOptions: {
          parserOptions: {
              // Point to your project's tsconfig.json if not in root
              // project: './path/to/tsconfig.json',
              // tsconfigRootDir: import.meta.dirname, // Or process.cwd()
          },
      },
      // Example override:
      // rules: {
      //   'no-console': 'warn',
      // }
  }
];
```

**2. React Configuration:**
```typescript
// eslint.config.ts
import sylphConfig from '@sylphlab/eslint-config-sylph';

export default [
  ...sylphConfig.react, // Includes base config + React rules
  // Add project-specific overrides
];
```

**3. Vue 3 Configuration:**
```typescript
// eslint.config.ts
import sylphConfig from '@sylphlab/eslint-config-sylph';

export default [
  ...sylphConfig.vue, // Includes base config + Vue rules
  // Add project-specific overrides
];
```

**4. React Native Configuration:**
```typescript
// eslint.config.ts
import sylphConfig from '@sylphlab/eslint-config-sylph';

export default [
  ...sylphConfig.rn, // Includes base and React configs + RN rules
  // Add project-specific overrides
];
```

## Important Notes

*   Ensure you have a correctly configured `tsconfig.json` that includes all files intended for linting.
*   Ensure you have a `.prettierrc.js` (or similar) for formatting consistency. Prettier rules are enforced via `eslint-plugin-prettier`.
*   You might need `ts-node` or a similar package if running ESLint directly with the `.ts` config file outside of build tools that handle it automatically.

## Contributing

This package is managed within the [SylphLab Playbook](https://github.com/sylphlab/Playbook) monorepo. Please refer to the main repository for contribution guidelines.
