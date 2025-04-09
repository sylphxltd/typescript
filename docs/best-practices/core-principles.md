# TypeScript Core Principles

This section outlines the fundamental principles for writing high-quality TypeScript code within SylphLab projects.

## 1. Type Safety First

- Leverage TypeScript's powerful type system to ensure code correctness at compile time.
- Strictly avoid using the `any` type. Use `unknown` instead when the type is truly unknown, followed by type guards.
- Prefer explicit type declarations for function signatures, variables, and class members over relying solely on type inference, especially for public APIs.
- Utilize advanced type features effectively (Generics, Conditional Types, Mapped Types, Template Literal Types) to create robust and reusable types.

## 2. Functional Programming Style

- Prioritize pure functions (predictable output for the same input, no side effects).
- Avoid mutating data directly; prefer creating new data structures (immutability).
- Use higher-order functions (`map`, `filter`, `reduce`) and function composition for data manipulation.
- Utilize libraries like `fp-ts` or `Ramda` for robust functional patterns, composition, and managing side effects, especially in complex domains. Leverage `Immer` for easier immutable state updates where applicable.