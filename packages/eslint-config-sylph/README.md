# @sylphlab/eslint-config-sylph

> **Strict, AI-optimized ESLint Flat Config for modern TypeScript.**
> Extreme code quality, maintainability, and developer/AI efficiency.
> Core of all SylphLab TypeScript projects.

---

## Philosophy

- **Strictest possible:** All critical rules are errors. No compromise.
- **Modern Flat Config:** ESLint v9+, TypeScript 5+, ESM, Prettier 3+.
- **AI & developer optimized:** Explicit typing, clear naming, strict structure, Prettier formatting.
- **Functional & secure:** Immutability, no-throw, security, bug detection, complexity limits.
- **Performance:** Static analysis, code splitting, low complexity, short functions/files.

---

## Included Plugins

- `@eslint/js` (recommended)
- `@typescript-eslint/eslint-plugin` (strict, stylistic)
- `eslint-plugin-unicorn`
- `eslint-plugin-functional`
- `eslint-plugin-security`
- `eslint-plugin-sonarjs`
- `eslint-plugin-promise`
- `eslint-plugin-regexp`
- `eslint-plugin-import-x`
- `eslint-config-prettier`, `eslint-plugin-prettier`
- `globals`

---

## Install

```bash
pnpm add -D @sylphlab/eslint-config-sylph eslint@^9 typescript@^5 prettier@^3
npx install-peerdeps --dev @sylphlab/eslint-config-sylph -p pnpm
```

---

## Usage

Create `eslint.config.ts`:

```typescript
import sylphConfig from '@sylphlab/eslint-config-sylph';

export default [
  ...sylphConfig,
  // project-specific overrides
];
```

---

## Key Features

- **Flat Config, ESM, type-safe**
- **Strictest rules:**
  - No `any`, no unused, explicit return types, strict type imports/exports
  - Immutability, no-throw, no-mutable-exports, strict import order
  - Complexity, max-lines, max-lines-per-function, max-depth, max-params
  - Security, bug detection, promise handling, regex safety
- **Functional programming:**
  - Immutability, pure functions, no-throw, no-mixed-types
- **Prettier enforced:**
  - All formatting handled by Prettier, no conflicts
- **AI/Developer ergonomics:**
  - Explicit, predictable, easy for AI to refactor/extend

---

## Example: Override

```typescript
export default [
  ...sylphConfig,
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-console': 'off',
      'unicorn/prevent-abbreviations': ['error', { replacements: { props: false, ref: false } }],
    },
  },
  {
    ignores: [
      'dist/',
      'build/',
      'coverage/',
      'my-custom-ignored-folder/',
    ],
  },
];
```

---

## See Also

- [Monorepo README](../../README.md) for full philosophy, structure, and all configs.