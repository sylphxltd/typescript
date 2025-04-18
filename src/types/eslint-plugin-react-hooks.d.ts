// configs/eslint-config-sylph/src/types/eslint-plugin-react-hooks.d.ts
declare module 'eslint-plugin-react-hooks' {
  import type { Linter } from 'eslint';
  const plugin: {
    configs: {
      recommended: {
        plugins?: string[];
        rules?: Linter.RulesRecord;
      };
    };
    rules: Linter.RulesRecord;
  };
  export default plugin;
}
