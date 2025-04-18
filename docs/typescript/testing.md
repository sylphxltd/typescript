# TypeScript Testing & Benchmarking

This section outlines the standards for testing and performance benchmarking in TypeScript projects using Vitest.

## 1. Testing Framework (Vitest)

- **Framework**: Vitest (modern, fast, Jest API compatible, good TypeScript support).
- **Standard Configuration** (`vitest.config.ts`):

  ```typescript
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true, // Use global APIs (describe, it, expect)
      environment: 'node', // Or 'jsdom' for frontend testing
      setupFiles: ['./tests/setup.ts'], // Optional setup file
      coverage: {
        provider: 'v8', // Or 'istanbul'
        reporter: ['text', 'json', 'html', 'lcov'],
        reportsDirectory: './coverage',
        // Enforce high coverage. Adjust thresholds based on project needs, but aim high.
        thresholds: {
          lines: 90, // MUST be >= 90%
          functions: 90, // MUST be >= 90%
          branches: 90, // MUST be >= 90%
          statements: 90, // MUST be >= 90%
          // Consider using per-file thresholds for critical core logic if needed via configuration
        },
        include: ['src/**/*.ts'],
        exclude: [
          'src/index.ts', // Often just exports
          'src/types/**',
          '**/*.d.ts',
          '**/*.config.ts',
          '**/constants.ts',
        ],
        clean: true,
      },
    },
  });
  ```

- **Unit Test Example** (`src/utils/math.test.ts`):

  ```typescript
  import { describe, it, expect } from 'vitest';
  import { add } from './math'; // Assuming math.ts exports add

  describe('Math Utilities', () => {
    it('should add two positive numbers correctly', () => {
      // Arrange
      const num1 = 1;
      const num2 = 2;
      const expected = 3;

      // Act
      const result = add(num1, num2);

      // Assert
      expect(result).toBe(expected);
    });

    it('should add a positive and a negative number', () => {
      expect(add(-1, 1)).toBe(0);
    });

    it('should add two zeros', () => {
      expect(add(0, 0)).toBe(0);
    });

    // Edge cases
    it('should handle large numbers', () => {
      expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
    });

    // Type checking tests (TypeScript specific)
    // This test primarily serves as documentation; the check happens at compile time.
    it('should enforce number types at compile time', () => {
      // The following line would cause a TypeScript error if uncommented:
      // @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'number'.
      // add('1', '2');
      expect(true).toBe(true); // Dummy assertion
    });
  });
  ```

## 2. Code Coverage Reporting (Codecov)

- **Tool**: Codecov (preferred).
- **Setup**:
  - Configure coverage report upload in the GitHub Actions CI workflow (see `../tooling/ci-cd.md`).
  - Ensure the target repository is enabled on Codecov.io.
  - Obtain the `CODECOV_TOKEN` and add it as a secret to the GitHub repository.
- **Badge**: Add the Codecov badge (provided after setup) to the `README.md`.

## 3. Test Analytics Integration (Codecov - Optional but Recommended)

- Provides insights into test run times, failure rates, and flaky tests.
- **Setup**:
  1.  **Generate JUnit XML Report**: Modify the `test:cov` script in `package.json` to output a JUnit XML report:
      ```json
      "test:cov": "vitest run --coverage --reporter=junit --outputFile=test-report.junit.xml"
      ```
  2.  **Upload Test Results in CI**: Add the `codecov/test-results-action@v1` step to the GitHub Actions workflow _after_ the test run step (see `../tooling/ci-cd.md`).
  3.  **View Results**: Analyze results in the Codecov UI and potentially in PR comments.

## 4. Performance Benchmarking (Vitest `bench`)

- **Tool**: Vitest's built-in `bench` functionality.
- **Benchmark Example** (`benchmark/core.bench.ts`):

  ```typescript
  import { bench, describe } from 'vitest';
  import { processData } from '../src/core'; // Example function
  // import { competitorFunction } from 'competitor-library'; // Example competitor

  describe('Core Function Performance', () => {
    // Prepare realistic test data
    const createData = (size: number) =>
      Array.from({ length: size }, (_, i) => ({ id: i, value: `value-${i}` }));
    const smallData = createData(100);
    const mediumData = createData(10_000);
    const largeData = createData(1_000_000);

    bench('processData - Small Dataset (100 items)', () => {
      processData(smallData);
    });

    bench('processData - Medium Dataset (10,000 items)', () => {
      processData(mediumData);
    });

    bench('processData - Large Dataset (1,000,000 items)', () => {
      processData(largeData);
    });

    // Example: Compare with a competitor
    // bench('Competitor X - Medium Dataset (10,000 items)', () => {
    //   competitorFunction(mediumData);
    // });
  });
  ```

- **Benchmark Workflow**: See `../tooling/ci-cd.md` for an example GitHub Actions workflow to run benchmarks periodically and handle results.
