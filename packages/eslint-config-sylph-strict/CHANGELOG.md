# @sylphlab/eslint-config-sylph-strict

## 0.2.0

### Minor Changes

- feat: Split ESLint config into Standard and Strict tiers

  - Modified `@sylphlab/eslint-config-sylph` to be the 'Standard' tier, relaxing some strict rules (e.g., `no-explicit-any`, complexity/length limits set to `warn`, removed `functional` plugin).
  - Added new `@sylphlab/eslint-config-sylph-strict` package which extends the Standard tier and re-enforces stricter rules (limits as `error`, `functional` plugin included).
  - Updated documentation to reflect the two tiers.

### Patch Changes

- Updated dependencies
  - @sylphlab/eslint-config-sylph@3.4.0
