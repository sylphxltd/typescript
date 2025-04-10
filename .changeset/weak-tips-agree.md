---
"@sylphlab/eslint-config-sylph": patch
---

fix: Include entire `dist` directory in published files

Previously, the `files` field in `package.json` only included `dist/src`, which omitted the compiled JavaScript files (`dist/index.js`, `dist/index.cjs`) needed for runtime and caused issues with type resolution in consuming projects (ts7016). This change ensures all necessary build artifacts are included in the published package.
