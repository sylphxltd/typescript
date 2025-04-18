# TypeScript Project Setup & Configuration

This section details the standard technology stack and configuration for TypeScript projects at SylphLab.

## 1. Technology Stack

- **Runtime**: Node.js (**MUST use latest LTS version**)
- **Language**: TypeScript (**MUST use latest stable version**)
- **Package Manager**: pnpm (**latest version**). Use pnpm for its performance, disk space efficiency, and strictness. npm or Yarn can be used if specific project constraints require them.
  - **Note on Build Scripts**: pnpm enhances security by default by preventing packages from running build scripts (like `postinstall`) automatically. If you see warnings like `Ignored build scripts: [package-name]`, and you trust the package (especially common build tools like `esbuild`), run `pnpm approve-builds` to allow necessary scripts to execute.
- **Module System**: ES Modules (set `"type": "module"` in `package.json` and use ES module syntax).

## 2. TypeScript Configuration

### Using @sylphlab/typescript-config

SylphLab provides a reusable TypeScript configuration package with optimized settings for different environments.

1. **Installation**:

   ```bash
   pnpm add -D typescript @sylphlab/typescript-config
   ```

2. **Usage**:

   Choose the appropriate configuration based on your project type:

   **Node.js Projects**:

   ```json
   {
     "extends": "@sylphlab/typescript-config/node",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
   }
   ```

   **Browser/DOM Projects**:

   ```json
   {
     "extends": "@sylphlab/typescript-config/dom",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
   }
   ```

   **React Projects**:

   ```json
   {
     "extends": "@sylphlab/typescript-config/react",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
   }
   ```

   **Vue Projects**:

   ```json
   {
     "extends": "@sylphlab/typescript-config/vue",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
   }
   ```

   **React Native Projects**:

   ```json
   {
     "extends": "@sylphlab/typescript-config/react-native",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
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
        dependency-type: 'all'
        update-types: ['patch'] # Only apply to patch updates
        allow:
          - dependency-type: 'all'
            update-types: ['patch']
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
