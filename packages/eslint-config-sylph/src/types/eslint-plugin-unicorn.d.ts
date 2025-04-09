// configs/eslint-config-sylph/src/types/eslint-plugin-unicorn.d.ts
declare module 'eslint-plugin-unicorn' {
  import type { Linter, ESLint } from 'eslint';

  interface UnicornPlugin extends ESLint.Plugin {
    configs: {
      'flat/recommended': Linter.FlatConfig[];
      // Add other configs if needed, e.g., 'flat/all'
    };
  }

  const plugin: UnicornPlugin;
  export default plugin;
}