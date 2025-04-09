// configs/eslint-config-sylph/src/react.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import * as eslintGlobals from 'globals';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

// Import base config to extend/modify if needed, or just use FlatCompat for airbnb full
// import { baseConfig } from './base.js'; // Assuming base.ts is compiled to base.js

// Framework plugins (adjust imports/types as needed)
const reactPlugin = tseslint.plugin('eslint-plugin-react') as any;
const reactHooksPlugin = tseslint.plugin('eslint-plugin-react-hooks') as any;
const jsxA11yPlugin = tseslint.plugin('eslint-plugin-jsx-a11y') as any;

// Mimic __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export const reactConfig: Linter.FlatConfig[] = [
    // IMPORTANT: This assumes the consumer project uses 'airbnb-typescript' (full)
    // instead of 'airbnb-typescript/base' in their core setup,
    // or we include the base config here and override the airbnb part.
    // Let's use FlatCompat to extend the full airbnb config here.
    ...compat.extends('airbnb-typescript'), // Use the full config including React rules

    // React specific overrides and plugin configurations
    {
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...eslintGlobals.browser, // React usually runs in browser
                // ...eslintGlobals.serviceworker // Add if needed
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
        },
        settings: {
            react: { version: 'detect' }, // Automatically detect React version
        },
        rules: {
            // Apply React recommended rules (many are covered by Airbnb full)
            // ...reactPlugin.configs.recommended.rules, // Adjust for flat config if needed
            // ...reactHooksPlugin.configs.recommended.rules,
            // ...jsxA11yPlugin.configs.recommended.rules,

            // Specific overrides for React/TS
            'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
            'react/prop-types': 'off', // Not needed with TypeScript
            'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
            'jsx-a11y/anchor-is-valid': 'off', // Often handled by routers

            // Ensure TS parser is used for TSX files (usually inherited)
            // '@typescript-eslint/parser': // Ensure this is set correctly if needed
        },
    },
];