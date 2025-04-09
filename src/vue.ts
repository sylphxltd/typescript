// configs/eslint-config-sylph/src/vue.ts
import * as eslintGlobals from 'globals';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

// Framework plugins (adjust imports/types as needed)
const vuePlugin = tseslint.plugin('eslint-plugin-vue') as any;
const vueParser = tseslint.parser('vue-eslint-parser') as any;

export const vueConfig: Linter.FlatConfig[] = [
    // Use plugin's recommended flat config
    ...(vuePlugin.configs['flat/recommended'] as Linter.FlatConfig[]), // Assert type

    // Vue specific overrides and plugin configurations
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser, // Use vue-eslint-parser
            parserOptions: {
                parser: tseslint.parser, // Specify TS parser for <script lang="ts">
                project: './tsconfig.json', // Consumers might need to override
                tsconfigRootDir: process.cwd(),
                extraFileExtensions: ['.vue'], // Important for TS in Vue
                sourceType: 'module',
            },
            globals: {
                ...eslintGlobals.browser, // Vue usually runs in browser
            },
        },
        plugins: {
            // vue plugin is already included via configs['flat/recommended']
            // '@typescript-eslint': tseslint.plugin, // Ensure TS plugin is available if needed for overrides
        },
        rules: {
            // --- Vue Specific Rule Overrides ---
            // Example: Relax rule for module boundaries in .vue files if needed
            // '@typescript-eslint/explicit-module-boundary-types': 'warn',

            // Ensure TS rules apply correctly within <script setup lang="ts">
            // Add any other Vue specific overrides here
        },
    },
];