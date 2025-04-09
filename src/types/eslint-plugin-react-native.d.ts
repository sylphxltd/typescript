// configs/eslint-config-sylph/src/types/eslint-plugin-react-native.d.ts
declare module 'eslint-plugin-react-native' {
    import type { Linter } from 'eslint';
    const plugin: {
        // Define structure based on actual plugin usage if possible
        // This is a basic placeholder
        configs: {
            all: {
                plugins?: string[];
                env?: Record<string, boolean>;
                parserOptions?: Linter.ParserOptions;
                rules?: Linter.RulesRecord;
            };
        };
        rules: Linter.RulesRecord;
    };
    export default plugin;
}