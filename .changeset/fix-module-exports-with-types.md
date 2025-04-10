---
"@sylphlab/eslint-config-sylph": patch
"@sylphlab/eslint-config-sylph-react": patch
"@sylphlab/eslint-config-sylph-vue": patch
"@sylphlab/eslint-config-sylph-rn": patch
"@sylphlab/typescript-config": patch
"@sylphlab/prettier-config": patch
---

Fix module exports for ESM and CommonJS environments with proper type definitions. Added correct `exports` field configuration to all packages, ensuring TypeScript types are properly resolved when using ESM imports.