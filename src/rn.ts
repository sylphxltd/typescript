// configs/eslint-config-sylph/src/rn.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import * as eslintGlobals from 'globals';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

// Import React config as RN builds upon it
import { reactConfig } from './react.js'; // Assuming react.ts is compiled to react.js

// Framework plugins
const reactNativePlugin = tseslint.plugin('eslint-plugin-react-native') as any;

// Mimic __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export const rnConfig: Linter.FlatConfig[] = [
    // Include the React config first
    ...reactConfig,

    // Add React Native specific config using FlatCompat
    ...compat.extends('plugin:react-native/all'),

    // RN specific overrides
    {
        files: ['**/*.{js,jsx,ts,tsx}'], // Apply broadly for RN
        languageOptions: {
            globals: {
                // RN globals are likely handled by 'plugin:react-native/all'
            },
        },
        plugins: {
            'react-native': reactNativePlugin,
        },
        rules: {
            // Override RN rules if needed
            // e.g., 'react-native/no-inline-styles': 'warn',
        },
    },
];