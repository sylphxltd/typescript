// configs/eslint-config-sylph/src/base.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as eslintJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import * as eslintGlobals from 'globals';
import tseslint from 'typescript-eslint';
import unicornPlugin from 'eslint-plugin-unicorn';
import prettierPlugin from 'eslint-plugin-prettier';
import type { Linter } from 'eslint';

// Prettier plugin needs to be referenced in the plugins section below

// Mimic __dirname for ES modules (needed for FlatCompat)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat
const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname, // Explicitly set this too
});

export const baseConfig: Linter.FlatConfig[] = [
    // 1. ESLint Recommended Base
    eslintJs.configs.recommended,

    // 2. Airbnb Base (using FlatCompat for eslintrc format)
    // Note: For React projects, you'll need 'airbnb-typescript' instead of 'airbnb-typescript/base'
    ...(compat.extends('airbnb-typescript/base') as any), // Force cast

    // 3. TypeScript Maximum Strictness
    ...(tseslint.configs.strictTypeChecked as any), // Force cast
    ...(tseslint.configs.stylisticTypeChecked as any), // Force cast

    // 4. Unicorn
    ...(unicornPlugin.configs['flat/recommended'] as any), // Force cast (it's an array)

    // 5. Core Language Options & Rules Override
    { // Main config object
        files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json', // Consumers might need to override this
                tsconfigRootDir: process.cwd(), // Use process.cwd() for consumer context
                ecmaFeatures: { jsx: false },
            },
            globals: {
                ...eslintGlobals.browser,
                ...eslintGlobals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            unicorn: unicornPlugin,
            prettier: prettierPlugin, // Ensure plugin is referenced
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
            'complexity': ['error', { 'max': 10 }],
            'max-lines': ['error', { 'max': 300, 'skipBlankLines': true, 'skipComments': true }],
            'max-lines-per-function': ['error', { 'max': 50, 'skipBlankLines': true, 'skipComments': true }],
            'max-depth': ['error', 3],
            'max-params': ['error', 3],
            'prettier/prettier': 'error',
        },
    } as any, // Force cast main config object
    // Test & Config Files Relaxations
    { // Test & Config Files Relaxations
        files: [
            '**/*{.,_}{test,spec}.[jt]s?(x)',
            '**/__tests__/**', '**/tests/**', '**/specs/**',
            '**/*.config.[jt]s', 'eslint.config.ts', // Keep eslint.config.ts relaxed if needed locally
            'jest.setup.[jt]s', 'vitest.setup.[jt]s',
        ],
        languageOptions: {
            globals: { ...eslintGlobals.jest, ...eslintGlobals.node },
        },
        rules: {
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-console': 'off',
            'unicorn/prefer-module': 'off', // Allow CJS in config files
        },
    } as any, // Force cast relaxation object
];