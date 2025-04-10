---
"@sylphlab/eslint-config-sylph": patch
"@sylphlab/eslint-config-sylph-react": patch
"@sylphlab/eslint-config-sylph-rn": patch
"@sylphlab/eslint-config-sylph-vue": patch
"@sylphlab/typescript-config": patch
---

refactor: Rename exported ESLint configs for clarity

Renamed the main exported config variables across ESLint packages for better consistency and clarity:
- `@sylphlab/eslint-config-sylph`: `baseConfig` -> `sylph`
- `@sylphlab/eslint-config-sylph-react`: `reactConfig` -> `react`
- `@sylphlab/eslint-config-sylph-rn`: `rnConfig` -> `reactNative`
- `@sylphlab/eslint-config-sylph-vue`: `vueConfig` -> `vue`

The export renaming (`baseConfig` -> `sylph`, etc.) is technically a breaking change but included in this patch release alongside dependency fixes for simplicity.

fix: Move ESLint plugins/configs to direct dependencies

Moved relevant ESLint plugins (e.g., `eslint-plugin-react`, `eslint-plugin-vue`, `eslint-plugin-unicorn`, `eslint-plugin-import`, `eslint-plugin-prettier`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react-native`, `vue-eslint-parser`) and base configs (`@eslint/js`, `eslint-config-airbnb-typescript`, `eslint-config-prettier`) from `peerDependencies` to `dependencies` across all `@sylphlab/eslint-config-*` packages.

This simplifies setup for consuming projects and resolves potential runtime errors (like `Cannot read properties of undefined (reading 'recommended')`) caused by missing or mismatched peer dependencies, especially in pnpm workspaces. Core tools (`eslint`, `typescript`, `prettier`) and framework packages (`react`, `react-native`) remain peer dependencies.

fix(typescript-config): Remove incompatible `mkdir -p` from build script

Removed the `mkdir -p dist &&` prefix from the `build` script in `@sylphlab/typescript-config` as `mkdir -p` is not compatible with Windows `cmd.exe`. The `build.js` script already handles directory creation. This fixes build failures on Windows.
