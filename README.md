# @sylphlab/eslint-config-sylph

Shared ESLint Flat Configuration for SylphLab projects (TypeScript, React, Vue, React Native).

This package provides a strict, opinionated ESLint configuration based on Airbnb, TypeScript ESLint, Unicorn, and Prettier best practices, formatted for ESLint's modern Flat Config system (`eslint.config.ts`).

## Philosophy

*   **Flat Config (`.ts`):** Modern, type-safe configuration format.
*   **Extreme Strictness:** Most rules enforced as errors.
*   **High Quality:** Based on Airbnb, TypeScript Strict, and Unicorn.
*   **AI Readability:** Enforces explicit typing and high consistency.
*   **Bug Prevention:** Maximizes static analysis.
*   **FP Leaning:** Encourages immutability.
*   **File Naming:** Enforced (PascalCase Components, kebab-case others).
*   **Formatting:** Delegated entirely to Prettier.

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
