---
title: Code Style & Quality (Biome & Lefthook)
sidebar: {}
---

# TypeScript Code Style & Quality

This document details how to set up and use the standard tools for code style, linting, formatting (Biome), and Git hooks (Lefthook) in TypeScript projects, ensuring quality and consistency through shared configurations. **Two tiers are available: Standard and Strict.**

## 1. Biome Configuration Packages (Standard & Strict Tiers)

To ensure consistency, quality, and adherence to best practices across all SylphLab projects, **use the shared Biome configuration packages**. These packages provide configurations for formatting and linting.

**Philosophy:**

- **Shared & Centralized:** Manage rules centrally via `@sylphlab/biome-config`.
- **Fast & Integrated:** Biome provides fast, integrated formatting and linting.
- **Tiered Strictness:**
  - **Standard (`@sylphlab/biome-config`):** Recommended for general development. Balances quality with developer velocity.
  - **Strict (`@sylphlab/biome-config/strict`):** Extends Standard. Enforces maximum strictness (more rules enabled, stricter settings). Ideal for mature projects or pre-release validation.
- **High Quality:** Rules derived from established best practices and SylphLab standards.
- **AI & Developer Ergonomics:** Enforces explicit typing and high consistency.
- **Bug Prevention:** Maximizes static analysis capabilities.
- **FP Leaning:** Encourages immutability and functional patterns (especially in Strict).

**1.1. Installation:**

1.  **Install Biome & Config Package:**

    ```bash
    # Using pnpm (recommended)
    # Choose ONE config package:
    # Standard Tier (Recommended)
    pnpm add -D @biomejs/biome @sylphlab/biome-config

    # Strict Tier (For maximum strictness)
    pnpm add -D @biomejs/biome @sylphlab/biome-config
    # Note: The strict config is accessed via extends below, no separate package needed.
    ```

**1.2. Usage (`biome.json`):**

Create a `biome.json` file in your project root and extend the desired shared configuration.

- **Standard Tier Usage:**

  ```json
  // biome.json
  {
    "extends": ["@sylphlab/biome-config"]
    // Add project-specific overrides below if absolutely necessary
    // "linter": { ... },
    // "formatter": { ... }
  }
  ```

- **Strict Tier Usage:**

  ```json
  // biome.json
  {
    "extends": ["@sylphlab/biome-config/strict"]
    // Add project-specific overrides below if absolutely necessary
  }
  ```

**1.3. Important Notes:**

- Ensure you have a correctly configured `tsconfig.json` if using TypeScript-specific lint rules.
- **Ignoring Files**: Use the `"ignore"` property within your project's `biome.json` to specify files or directories that Biome should ignore. Example: `{ "extends": ["@sylphlab/biome-config"], "files": { "ignore": ["dist/**", "coverage/**"] } }`.

## 2. Standard NPM Scripts (`package.json`)

Define common tasks for consistency, aligning with Core Instruction V.I.

```json
{
  "scripts": {
    "format": "biome format --write .",
    "check": "biome check --write --unsafe .",
    "lint": "pnpm run check",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "validate": "pnpm run check && pnpm run typecheck && pnpm run test"
    // Add build, dev, etc. as needed
  }
}
```
*(Note: Ensure `typescript` is installed as a dev dependency for the `typecheck` script).*

## 3. Git Hooks Configuration (Lefthook + commitlint)

Enforce standards automatically before commits, aligning with Core Instruction V.I.

- **Setup Steps** (Run in project root):
  ```bash
  # Install dependencies
  pnpm add -D lefthook @commitlint/cli @commitlint/config-conventional

  # Initialize Lefthook (creates lefthook.yml if not present)
  pnpm lefthook install

  # Create commitlint config
  echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.cjs
  ```

- **Lefthook Configuration** (`lefthook.yml`):
  Create or modify `lefthook.yml` in your project root.

  ```yaml
  # lefthook.yml
  pre-commit:
    parallel: true
    commands:
      biome-check:
        # Check staged files for relevant extensions
        glob: '*.{ts,tsx,js,jsx,mjs,cjs,json,md,css,graphql}'
        run: pnpm exec biome check --write --unsafe --no-errors-on-unmatched --files-ignore-unknown=true {staged_files}
      # Add other pre-commit checks if needed (e.g., typecheck)
      # typecheck:
      #   run: pnpm run typecheck

  commit-msg:
    commands:
      commitlint:
        run: npx --no -- commitlint --edit {1}
  ```
  *(Ensure `pnpm exec biome` works or adjust path if needed. The `typecheck` command is commented out as it can be slow for pre-commit; consider running it in CI).*

## 4. Project Structure & Testing/Benchmark Conventions

### 4.1. Co-located Tests & Benchmarks (MANDATORY)

To keep related code and its tests/benchmarks together, improving discoverability and maintainability, **test (`*.test.ts(x)`, `*.spec.ts(x)`) and benchmark (`*.bench.ts(x)`) files MUST be co-located with their corresponding source files**.

- **Example:** A test for `src/components/Button.tsx` should be named `src/components/Button.test.tsx` and reside in the same `src/components/` directory. A benchmark for `src/utils/calculation.ts` should be `src/utils/calculation.bench.ts`.
- **Rationale:** This structure makes it easy to find relevant files and simplifies refactoring.
- **Enforcement:** This is a **mandatory project convention**. Do **NOT** place tests or benchmarks in separate top-level `test/`, `spec/`, or `bench/` directories. Biome rules might help enforce naming, but location relies on adherence.

Adhering to the shared Biome configurations (Standard or Strict) and Lefthook setup is crucial for maintaining a high-quality, consistent, and AI-friendly codebase.
