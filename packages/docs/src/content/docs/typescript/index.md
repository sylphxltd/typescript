---
title: TypeScript Guidelines Overview
sidebar: {}
---

# TypeScript Project Development Guidelines

This document serves as the entry point for TypeScript-specific standards and best practices within the `sylphlab/typescript` repository.

Due to the comprehensive nature of these guidelines, they have been split into the following focused sections:

1.  **Best Practices**

    - [Core Principles](../best-practices/core-principles.md)
      - Type Safety First
      - Functional Programming Style
    - [Project Structure & Best Practices](../best-practices/structure-patterns.md)
      - Standard NPM Package Structure
      - Advanced TypeScript Patterns (Immutability, Type Safety, Object Creation)
      - Best Practices (Error Handling, Async Code, Performance)

2.  **Style Guide**

    - [Code Style & Quality](../style-guide/style-quality.md)
      - Biome Configuration (Standard & Strict)
      - Standard NPM Scripts
      - Git Hooks (Lefthook + commitlint)

3.  **Tooling**

    - [Project Setup & Configuration](../tooling/setup-config.md)
      - Technology Stack (Node.js, TypeScript, pnpm)
      - Standard `tsconfig.json`
      - Dependency Management & Dependabot Configuration
    - [CI/CD & Containerization](../tooling/ci-cd.md)
      - Standard GitHub Actions Workflow (Validation, Build, Publish, Release)
      - Dockerfile Example (Multi-stage, non-root, using `dist`)

4.  **TypeScript Specifics**
    - [Testing & Benchmarking](testing.md)
      - Testing Framework (Vitest)
      - Standard `vitest.config.ts`
      - Unit Test Example
      - Code Coverage Reporting (Codecov)
      - Test Analytics Integration (Codecov)
      - Performance Benchmarking (Vitest `bench`)
    - [Documentation](documentation.md)
      - Documentation Tool (Astro Starlight)
      - API Documentation Generator (TypeDoc + typedoc-plugin-markdown)
      - Standard Configurations & Integration Script

Please refer to the individual files linked above for detailed guidelines on each topic.
