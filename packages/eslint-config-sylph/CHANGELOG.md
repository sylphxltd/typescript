# @sylphlab/eslint-config-sylph

## 3.1.4

### Patch Changes

- fed1bdd: ts parser default project type

## 3.1.3

### Patch Changes

- 228c606: explicitly type ESLint configuration constants and remove deprecated constructs

## 3.1.2

### Patch Changes

- 46c469f: update all devdep
- ba1cbe1: update all perrdev

## 3.1.1

### Patch Changes

- f7ee5b2: update all dependencies

## 3.1.0

### Minor Changes

- 74532d1: redesign entire rules.

## 3.0.3

### Patch Changes

- f4d7485: fix: Include entire `dist` directory in published files

  Previously, the `files` field in `package.json` only included `dist/src`, which omitted the compiled JavaScript files (`dist/index.js`, `dist/index.cjs`) needed for runtime and caused issues with type resolution in consuming projects (ts7016). This change ensures all necessary build artifacts are included in the published package.

## 3.0.2

### Patch Changes

- b79aa6b: Fix module exports for ESM and CommonJS environments with proper type definitions. Added correct `exports` field configuration to all packages, ensuring TypeScript types are properly resolved when using ESM imports.

## 3.0.1

### Patch Changes

- 083301f: update readme

## 3.0.0

### Major Changes

- 972e0c9: feat: Refactor package structure, migrate docs, and adopt Turborepo

  Major restructuring of the monorepo:

  - Renamed packages to full names (e.g., `base` -> `eslint-config-sylph`).
  - Migrated TypeScript guidelines from the main Playbook repo into the `docs/` directory here.
  - Introduced Turborepo for monorepo management.
  - Updated all package READMEs with detailed philosophy and usage.
  - Updated root README to reflect new structure and purpose.

## 2.0.0

### Major Changes

- 742404e: separate packages
