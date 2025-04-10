// configs/eslint-config-sylph/src/rn.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import * as eslintGlobals from 'globals';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

// Import React config (which includes base) to combine
import { react } from '@sylphlab/eslint-config-sylph-react';

// Framework plugins (Direct import)
import reactNativePlugin from 'eslint-plugin-react-native';

// Mimic __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// Define RN-specific parts
const rnSpecificConfig: Linter.Config[] = [
    // Include the React config first
    ...react,

    // Add React Native specific config using FlatCompat
    ...(compat.extends('plugin:react-native/all') as any), // Force cast

    // RN specific overrides
    { // RN specific overrides
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
    } as any, // Force cast
];

// Export the combined configuration array
export const reactNative: Linter.Config[] = [
    ...react, // react config already includes base config (sylph)
    ...rnSpecificConfig,
];