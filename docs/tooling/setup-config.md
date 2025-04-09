# TypeScript Project Setup & Configuration

This section details the standard technology stack and configuration for TypeScript projects at SylphLab.

## 1. Technology Stack

- **Runtime**: Node.js (**MUST use latest LTS version**)
- **Language**: TypeScript (**MUST use latest stable version**)
- **Package Manager**: pnpm (**latest version**). Use pnpm for its performance, disk space efficiency, and strictness. npm or Yarn can be used if specific project constraints require them.
    - **Note on Build Scripts**: pnpm enhances security by default by preventing packages from running build scripts (like `postinstall`) automatically. If you see warnings like `Ignored build scripts: [package-name]`, and you trust the package (especially common build tools like `esbuild`), run `pnpm approve-builds` to allow necessary scripts to execute.
- **Module System**: ES Modules (set `"type": "module"` in `package.json` and use ES module syntax).

## 2. Standard TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    /* Base Options */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "ES2022",
    "allowJs": false,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,

    /* Strictness */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,

    /* Linter Checks (Handled by ESLint) */
    // "noUnusedLocals": true, // Covered by ESLint '@typescript-eslint/no-unused-vars'
    // "noUnusedParameters": true, // Covered by ESLint '@typescript-eslint/no-unused-vars'
    // "exactOptionalPropertyTypes": true, // Consider enabling if needed, but ESLint might offer alternatives
    // "noImplicitReturns": true, // Covered by ESLint '@typescript-eslint/explicit-function-return-type' (implicitly)
    // "noFallthroughCasesInSwitch": true, // Covered by ESLint 'no-fallthrough'
    "noUncheckedIndexedAccess": true, // Keep this for added safety at compile time
    "noImplicitOverride": true, // Keep this for explicit override keyword requirement
    "noPropertyAccessFromIndexSignature": true, // Keep this for safety
    // Note: Code style and additional static analysis are primarily handled by ESLint.
    // See guidelines/typescript/style_quality.md

    /* Module Resolution */
    "module": "NodeNext", // Use NodeNext for modern Node.js ESM support
    "moduleResolution": "NodeNext",
    // "baseUrl": ".", // Optional: for path aliases
    // "paths": {}, // Optional: configure path aliases

    /* Emit */
    "outDir": "dist", // Standard output directory
    "srcDir": "src", // Specify source directory to prevent nesting in output
    "declaration": true,
    "sourceMap": true,
    "removeComments": false, // Keep comments in declaration files

    /* Other */
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts", "**/*.bench.ts"]
}
```

## 3. Dependency Management & Updates (Dependabot)

- All dependencies MUST use their latest stable versions.
- Use GitHub's built-in Dependabot for automated dependency updates.
- **Standard Dependabot Configuration** (`.github/dependabot.yml`):
  ```yaml
  # .github/dependabot.yml
  version: 2
  updates:
    # Dependency updates for npm (used by pnpm)
    - package-ecosystem: 'npm'
      directory: '/' # Location of package manifests
      schedule:
        interval: 'weekly'
      open-pull-requests-limit: 10
      commit-message:
        prefix: 'chore'
        prefix-development: 'chore(dev)'
        include: 'scope'
      rebase-strategy: 'auto'
      # Recommended: Auto-merge patch-level security updates if CI passes
      auto-merge:
        dependency-type: "all"
        update-types: ["patch"] # Only apply to patch updates
        allow:
          - dependency-type: "all"
            update-types: ["patch"]
            security-updates-only: true # Only security patches

    # GitHub Actions updates
    - package-ecosystem: 'github-actions'
      directory: '/'
      schedule:
        interval: 'weekly'
      open-pull-requests-limit: 5 # Limit for actions
      commit-message:
        prefix: 'chore(actions)'
        include: 'scope'
      rebase-strategy: 'auto'
      # No auto-merge recommended for actions by default
  ```
- **Handling Dependabot PRs**:
    - **Prioritize Security Updates**: Address security patches promptly.
    - **Check CI Status**: **Always** ensure all status checks pass before merging any Dependabot PR.
    - **Review Changes**: Briefly review release notes, especially for minor/major updates.
    - **Major Version Updates**: **Require careful manual review and testing.** Read the changelog thoroughly, update code for breaking changes, test locally, and ensure CI passes before merging. **Never auto-merge major updates.**