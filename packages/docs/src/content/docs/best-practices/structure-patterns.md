---
title: Project Structure & Patterns
sidebar: {}
---

# TypeScript Project Structure & Patterns

This section details the recommended project structure for TypeScript NPM packages and outlines key best practices for writing robust, maintainable, and performant code, emphasizing the **mandatory co-location** of tests and benchmarks.

## 1. Standard NPM Package Structure (Co-location MANDATORY)

- **Recommended Directory Structure**:
  ```
  /
  ├── src/                      # TypeScript source code
  │   ├── index.ts              # Main entry point (exports public API)
  │   ├── moduleA.ts            # Example source file
  │   ├── moduleA.test.ts       # Test for moduleA (co-located)
  │   ├── moduleA.bench.ts      # Benchmark for moduleA (co-located)
  │   ├── components/           # Example subdirectory
  │   │   ├── Button.tsx        # Example component
  │   │   └── Button.test.tsx   # Test for Button (co-located)
  │   ├── types/                # Shared type definitions (e.g., types.ts)
  │   └── utils/                # Utility functions
  │       ├── helpers.ts        # Example utility
  │       └── helpers.spec.ts   # Test for helpers (co-located, .spec also valid)
  ├── dist/                     # Compiled JavaScript output (git-ignored)
  ├── .github/                  # GitHub Actions workflows, issue templates, etc.
  │   └── workflows/
  ├── .vscode/                  # VSCode settings (optional)
  ├── biome.json                # Biome configuration (replaces ESLint/Prettier)
  ├── tsconfig.json             # TypeScript configuration
  ├── vitest.config.ts          # Vitest configuration (for tests/benchmarks)
  ├── lefthook.yml              # Lefthook Git hooks config (replaces Husky)
  ├── commitlint.config.cjs     # Commitlint configuration
  ├── package.json              # NPM package manifest
  ├── LICENSE                   # License file (e.g., MIT)
  └── README.md                 # Project description
  ```
- **Co-location Rule (Mandatory):** Test files (`*.test.ts(x)`, `*.spec.ts(x)`) and benchmark files (`*.bench.ts(x)`) **MUST** be located in the **SAME DIRECTORY** as the source file they target. Do **NOT** use separate top-level `test/`, `spec/`, or `bench/` directories. This is enforced by project convention (V.I).
- **Package Name (`name` in `package.json`)**: Use `kebab-case` (e.g., 'my-awesome-library'). For scoped packages, use `@scope/kebab-case-name`.

## 2. Advanced TypeScript Patterns (Encouraged)

- **Immutability**:
  - Use `readonly` modifiers for properties and `Readonly<T>` / `ReadonlyArray<T>`.
  - Leverage TypeScript's `const` assertions (`as const`) for literal types when creating immutable constants.
- **Type Safety**:
  - Use branded types or nominal typing techniques for primitive type safety where applicable.
  - Prefer discriminated unions for modeling state or variants.
- **Object Creation**:
  - Implement the Builder pattern for complex object creation.
  - Use factory functions or static methods instead of complex constructors.
- **Operations on Types**:
  - Apply the Visitor pattern for type-safe operations on discriminated unions.
  - Leverage Mapped Types (`Pick`, `Omit`, `Partial`, `Required`, custom).
  - Use the `satisfies` operator for ensuring type compatibility without changing the inferred type.

## 3. Best Practices

- **Error Handling**:
  - Primarily use discriminated union result types (e.g., `{ success: true, data: T } | { success: false, error: E }`) for predictable errors.
  - Reserve throwing exceptions for truly exceptional, unrecoverable situations. Use custom error classes extending `Error`.
  - Always include context and potentially the original error (`cause`).
  - Validate API boundaries and external data rigorously using runtime validation libraries (like Zod) that integrate with TypeScript types.

- **Asynchronous Code**:
  - Always prefer `async/await` for readability.
  - Ensure all Promises are handled (use Biome lint rules).
  - Use `Promise.all` / `Promise.allSettled` for concurrency.
  - Avoid the `new Promise()` constructor anti-pattern; use `async` functions.
  - Implement cancellation patterns (e.g., using `AbortController`) where appropriate.

- **Performance Optimizations**:
  - Be mindful of object and array allocations within loops or frequently called functions.
  - Use `Set` and `Map` for efficient lookups.
  - Employ lazy initialization for expensive resources.
  - Profile code using Node.js inspector or other tools before optimizing prematurely.
