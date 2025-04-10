// configs/eslint-config-sylph/packages/vue/src/vue.ts
// Import base config to combine
import { sylph } from '@sylphlab/eslint-config-sylph';
import * as eslintGlobals from 'globals';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

// Framework plugins (Direct imports)
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

// Define Vue-specific parts
const vueSpecificConfig: Linter.Config[] = [
    // Use plugin's recommended flat config
    ...(vuePlugin.configs['flat/recommended'] as any), // Force cast

    // Vue specific overrides and plugin configurations
    { // Vue specific overrides
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
    } as any, // Force cast
];

// Export the combined configuration array
export const vue: Linter.FlatConfig[] = [
    ...sylph,
    ...vueSpecificConfig,
];