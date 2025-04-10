// configs/eslint-config-sylph/src/react.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import * as eslintGlobals from 'globals';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

// Import base config to combine
import { baseConfig } from '@sylphlab/eslint-config-sylph';

// Framework plugins (Direct imports)
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

// Mimic __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// Define React-specific parts
const reactSpecificConfig: Linter.Config[] = [
    // IMPORTANT: This assumes the consumer project uses 'airbnb-typescript' (full)
    // instead of 'airbnb-typescript/base' in their core setup,
    // or we include the base config here and override the airbnb part.
    // Let's use FlatCompat to extend the full airbnb config here.
    ...(compat.extends('airbnb-typescript') as any), // Force cast

    // React specific overrides and plugin configurations
    { // React specific overrides
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...eslintGlobals.browser, // React usually runs in browser
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
            // Note: Plugin recommended configs might need manual merging or specific rule inclusion in flat config
            // Example: ...(reactPlugin.configs.recommended.rules as any),

            // Specific overrides for React/TS
            'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
            'react/prop-types': 'off', // Not needed with TypeScript
            'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
            'jsx-a11y/anchor-is-valid': 'off', // Often handled by routers
        },
    } as any, // Force cast
];

// Export the combined configuration array
export const reactConfig: Linter.FlatConfig[] = [
    ...baseConfig,
    ...reactSpecificConfig,
];