// eslint.config.ts - Flat Config (TypeScript) - Modular & Extremely Strict
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as eslintJs from '@eslint/js'; // Use namespace import
import { FlatCompat } from '@eslint/eslintrc';
import * as eslintGlobals from 'globals'; // Use namespace import
import tseslint from 'typescript-eslint'; // Use the typed config helper
import unicornPlugin from 'eslint-plugin-unicorn';
// Types for plugins might be available, otherwise use `any` or find community types
import type { Linter } from 'eslint';
// import type { Plugin as PrettierPluginType } from 'eslint-plugin-prettier';
// import type { ESLintConfig as PrettierConfigType } from 'eslint-config-prettier';

// --- Framework Specific Imports (Uncomment as needed) ---
// import type { Plugin as ReactPluginType } from 'eslint-plugin-react';
// import type { Plugin as ReactHooksPluginType } from 'eslint-plugin-react-hooks';
// import type { Plugin as JsxA11yPluginType } from 'eslint-plugin-jsx-a11y';
// import type { Plugin as ReactNativePluginType } from 'eslint-plugin-react-native';
// import type { Plugin as VuePluginType } from 'eslint-plugin-vue';
// import type { Parser as VueParserType } from 'vue-eslint-parser';

// Workaround for missing types or CommonJS modules
const prettierPlugin = tseslint.plugin('eslint-plugin-prettier') as any;
const prettierConfig = tseslint.config('eslint-config-prettier') as Linter.FlatConfig[]; // Needs assertion

// Framework plugins (adjust imports/types as needed)
// const reactPlugin = tseslint.plugin('eslint-plugin-react') as any;
// const reactHooksPlugin = tseslint.plugin('eslint-plugin-react-hooks') as any;
// const jsxA11yPlugin = tseslint.plugin('eslint-plugin-jsx-a11y') as any;
// const reactNativePlugin = tseslint.plugin('eslint-plugin-react-native') as any;
// const vuePlugin = tseslint.plugin('eslint-plugin-vue') as any;
// const vueParser = tseslint.parser('vue-eslint-parser') as any;

// Mimic __dirname for ES modules (needed for FlatCompat)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat
const compat = new FlatCompat({
    baseDirectory: __dirname, // Recommended setting
    // resolvePluginsRelativeTo: __dirname, // Optional: Might be needed
});

const config: Linter.FlatConfig[] = [
    // ==========================================================================
    // == CORE CONFIGURATION (Apply to ALL projects) ==========================
    // ==========================================================================
    {
        // Global ignores
        ignores: [
            'node_modules/', '.turbo/', '.next/', '.nuxt/', 'dist/', 'build/', 'coverage/',
            '*.log', '.*/*', // Ignore hidden folders
            '!.eslintrc.js', '!/.prettierrc.js', // Re-include common dotfiles if needed
            'public/', 'static/', 'assets/',
            'CHANGELOG.md', // Often auto-generated
        ],
    },
    // 1. ESLint Recommended Base
    eslintJs.configs.recommended,

    // 2. Airbnb Base (using FlatCompat for eslintrc format)
    ...compat.extends('airbnb-typescript/base'),

    // 3. TypeScript Maximum Strictness (using typescript-eslint helper)
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    // 4. Unicorn (Modern practices, filename, FP-leaning)
    unicornPlugin.configs['flat/recommended'],

    // 5. Core Language Options & Rules Override
    {
        files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'], // Apply broadly
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json', // Ensure this path is correct
                tsconfigRootDir: __dirname, // Or process.cwd()
                ecmaFeatures: { jsx: false }, // Default to false, enable in React override
            },
            globals: {
                ...eslintGlobals.browser,
                ...eslintGlobals.node,
            },
        },
        plugins: {
            // Define plugins used in this config block (or globally)
            '@typescript-eslint': tseslint.plugin,
            unicorn: unicornPlugin,
            prettier: prettierPlugin,
            // 'react': reactPlugin, // Add framework plugins here if used globally
        },
        rules: {
            // --- Core Rule Overrides & Additions ---
            'unicorn/filename-case': [
                'error',
                {
                    cases: { pascalCase: true, kebabCase: true },
                    ignore: [
                        '\.config\.[jt]s$', '\.setup\.[jt]s$', '\.d\.ts$',
                        'App\.vue$', 'main\.[jt]s$', 'index\.[jt]s$',
                    ],
                },
            ],
            '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
            '@typescript-eslint/explicit-module-boundary-types': ['error'],

            'import/prefer-default-export': 'off',
            'import/no-extraneous-dependencies': ['error', {
                devDependencies: [
                    '**/__tests__/**', '**/tests/**', '**/specs/**', '**/*{.,_}{test,spec}.[jt]s?(x)',
                    '**/*.config.[jt]s', '**/test-utils.[jt]s?(x)',
                    'jest.setup.[jt]s', 'vitest.setup.[jt]s'
                ],
                optionalDependencies: false, peerDependencies: false,
             }],
            'no-console': 'error',
            'no-debugger': 'error',
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],

            // --- Code Quality Metrics & Limits ---
            'complexity': ['error', { 'max': 10 }],
            'max-lines': ['error', { 'max': 300, 'skipBlankLines': true, 'skipComments': true }],
            'max-lines-per-function': ['error', { 'max': 50, 'skipBlankLines': true, 'skipComments': true }],
            'max-depth': ['error', 3],
            'max-params': ['error', 3],

            // Prettier plugin rule
            'prettier/prettier': 'error',
        },
    },

    // ==========================================================================
    // == TEMPLATE: REACT MODULE ================================================
    // ==========================================================================
    /*
    // --- Prerequisites: Install react dependencies ---
    // --- IMPORTANT: Replace 'airbnb-typescript/base' in core extends with 'airbnb-typescript' using FlatCompat ---
    // --- Add this config object to the main exported array ---
    {
        files: ['**\/*.{jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true }, // Enable JSX parsing
            },
            globals: { ...globals.serviceworker }, // Example globals
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            // Apply React recommended rules (if not already covered by Airbnb full)
            // ...reactPlugin.configs.recommended.rules, // Might need adjustments for flat config
            // ...reactHooksPlugin.configs.recommended.rules,
            // ...jsxA11yPlugin.configs.recommended.rules,

            // Specific overrides for React/TS
            'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
        },
    },
    */

    // ==========================================================================
    // == TEMPLATE: REACT NATIVE MODULE =========================================
    // ==========================================================================
    /*
    // --- Prerequisites: Install RN dependencies, ensure REACT MODULE is added ---
    // --- Add RN config using FlatCompat to the main exported array ---
    // ...compat.extends('plugin:react-native/all'),
    {
        files: ['**\/*.{js,jsx,ts,tsx}'],
        plugins: {
            'react-native': reactNativePlugin,
        },
        languageOptions: {
            globals: { ...globals['react-native'] },
        },
        rules: { // Override RN rules if needed },
    },
    */

    // ==========================================================================
    // == TEMPLATE: VUE 3 MODULE ================================================
    // ==========================================================================
    /*
    // --- Prerequisites: Install Vue dependencies ---
    // --- Add Vue recommended flat config to the main exported array ---
    // ...vuePlugin.configs['flat/recommended'],
    {
        files: ['**\/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                project: './tsconfig.json',
                extraFileExtensions: ['.vue'],
                sourceType: 'module',
            },
            globals: { ...globals.browser },
        },
        rules: {
            // --- Vue Specific Rule Overrides ---
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
        },
    },
    */

    // 6. Prettier Final Override (Optional: if not using prettier/prettier rule)
    // prettierConfig, // Add this as the VERY LAST element

    // ==========================================================================
    // == Test & Config Files Relaxations (Keep near the end) ==================
    // ==========================================================================
    {
        files: [
            '**/*{.,_}{test,spec}.[jt]s?(x)',
            '**/__tests__/**', '**/tests/**', '**/specs/**',
            '**/*.config.[jt]s', 'eslint.config.ts',
            'jest.setup.[jt]s', 'vitest.setup.[jt]s',
        ],
        languageOptions: {
            globals: { ...eslintGlobals.jest, ...eslintGlobals.node },
        },
        rules: {
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/no-var-requires': 'off', // Allow require in config files
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-console': 'off',
            'unicorn/prefer-module': 'off',
        },
    },
];

export default config;