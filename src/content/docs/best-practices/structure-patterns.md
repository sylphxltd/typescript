# TypeScript Project Structure & Best Practices

This section details the recommended project structure for TypeScript NPM packages and outlines key best practices for writing robust, maintainable, and performant code.

## 1. Standard NPM Package Structure

- **Recommended Directory Structure**:
  ```
  /
  ├── src/                   # TypeScript source code
  │   ├── index.ts           # Main entry point (exports public API)
  │   ├── types/             # Shared type definitions (e.g., types.ts or interfaces.ts)
  │   ├── utils/             # Utility functions
  │   └── core/              # Core logic modules
  │   └── constants.ts       # Constants
  ├── tests/                 # Test files (using Vitest)
  │   ├── setup.ts           # Global test setup
  │   └── *.test.ts          # Unit/Integration tests
  ├── docs/                  # Documentation source (for VitePress)
  │   ├── api/               # Generated API docs (markdown)
  │   ├── guide/             # Manual guides
  │   └── .vitepress/        # VitePress config
  ├── examples/              # Usage examples (e.g., simple scripts)
  ├── benchmark/             # Performance benchmarks (*.bench.ts)
  ├── scripts/               # Build/utility scripts (e.g., generate-api-docs.mjs)
  ├── dist/                  # Compiled JavaScript output (git-ignored)
  ├── .github/               # GitHub Actions workflows, issue templates, etc.
  │   └── workflows/
  ├── .husky/                # Husky Git hooks config
  ├── .vscode/               # VSCode settings (optional)
  ├── tsconfig.json          # TypeScript configuration
  ├── eslint.config.ts       # ESLint flat configuration (using TS)
  # Note: .eslintignore is not used with flat config; use 'ignores' in eslint.config.ts
  ├── prettier.config.cjs    # Prettier configuration (using CJS)
  ├── .prettierignore        # Files to ignore for Prettier
  ├── vitest.config.ts       # Vitest configuration
  ├── commitlint.config.cjs  # Commitlint configuration
  ├── package.json           # NPM package manifest
  ├── LICENSE                # License file (e.g., MIT)
  └── README.md              # Project description
  ```
- **Package Name (`name` in `package.json`)**: Use `kebab-case` (e.g., 'my-awesome-library'). For scoped packages, use `@scope/kebab-case-name`.

## 2. Advanced TypeScript Patterns (Encouraged)

- **Immutability**:
  - Use `readonly` modifiers for properties and `Readonly<T>` / `ReadonlyArray<T>` (`@typescript-eslint/prefer-readonly`).
  - Leverage TypeScript's `const` assertions (`as const`) for literal types when creating immutable constants.
- **Type Safety**:
  - Use branded types or nominal typing techniques for primitive type safety where applicable (e.g., distinguishing between different kinds of string IDs).
  - Prefer discriminated unions for modeling state or variants over loose objects or class hierarchies.
- **Object Creation**:
  - Implement the Builder pattern for complex object creation to ensure valid states.
  - Use factory functions or static methods instead of complex constructors.
- **Operations on Types**:
  - Apply the Visitor pattern for type-safe operations on discriminated unions.
  - Leverage Mapped Types (`Pick`, `Omit`, `Partial`, `Required`, custom) for consistent type transformations.
  - Use the `satisfies` operator for ensuring type compatibility without changing the inferred type.

## 3. Best Practices

- **Error Handling**:

  - Primarily use discriminated union result types (e.g., `{ success: true, data: T } | { success: false, error: E }`, potentially using helper libraries) for handling predictable errors, making failure an explicit part of the function's contract.
  - Reserve throwing exceptions for truly exceptional, unrecoverable situations (e.g., programming errors, critical infrastructure failures). When throwing, use custom error classes extending `Error`.
  - Always include context and potentially the original error (`cause`) when creating errors or error results.
  - Validate API boundaries and external data rigorously using runtime validation libraries (like Zod, io-ts) that integrate with TypeScript types to ensure data integrity.

- **Asynchronous Code**:

  - Always prefer `async/await` for readability over raw `Promise.then/catch` chains.
  - Ensure all Promises are handled (use `@typescript-eslint/no-floating-promises` lint rule).
  - Use `Promise.all` / `Promise.allSettled` for concurrency.
  - Avoid the `new Promise()` constructor anti-pattern; use `async` functions instead.
  - Implement cancellation patterns (e.g., using `AbortController`) for long-running async operations where appropriate.

- **Performance Optimizations**:
  - Be mindful of object and array allocations within loops or frequently called functions.
  - Use `Set` and `Map` for efficient lookups (O(1) average) compared to array methods like `find` or `includes` (O(n)).
  - Employ lazy initialization for expensive resources or computations.
  - Profile code using Node.js inspector or other tools to identify bottlenecks before optimizing prematurely.
