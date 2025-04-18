import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import { sylph as sylphBaseConfig } from '@sylphlab/eslint-config-sylph'; // Import the base config array
import type { Linter } from 'eslint';

// Define type alias for FlatConfig for better readability
type Config = Linter.Config; // Use Linter.Config instead of deprecated Linter.FlatConfig

/**
 * Sylph ESLint Configuration for React Projects (Flat Config)
 *
 * Extends the base @sylphlab/eslint-config-sylph configuration with
 * rules specific to React, React Hooks, and JSX A11y.
 */
export const react: Config[] = [
  // Explicitly type the constant
  // 1. Inherit Base Configuration
  // Includes core JS, TS, Unicorn, Import, Functional, Security, Sonar, Promise, RegExp, Prettier rules
  ...sylphBaseConfig,

  // 2. React Specific Configuration
  {
    files: ['**/*.{jsx,tsx}'], // Apply React rules only to JSX/TSX files
    plugins: {
      react: reactPlugin as any,
      'react-hooks': reactHooksPlugin as any,
      'jsx-a11y': jsxA11yPlugin as any,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
      },
      globals: {
        ...globals.browser, // Add browser globals common in React apps
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      // --- React Plugin Recommended Rules ---
      // We manually include rules from recommended sets as flat config doesn't spread them automatically
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules, // For the new JSX transform
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // --- Rule Overrides & Additions for React ---
      'react/prop-types': 'off', // Disable prop-types rule, rely on TypeScript
      'react/react-in-jsx-scope': 'off', // Disable rule requiring React import (new JSX transform)
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }], // Allow JSX only in .jsx/.tsx
      'react/jsx-props-no-spreading': 'off', // Allow prop spreading (common pattern)
      'react/require-default-props': 'off', // Default props are less common with TS
      'react/jsx-uses-react': 'off', // Covered by jsx-runtime config
      'react/jsx-uses-vars': 'error', // Ensure vars used in JSX are marked as used

      // --- JSX A11y Overrides ---
      'jsx-a11y/anchor-is-valid': 'off', // Often handled by routers like React Router
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          // Stricter label association
          assert: 'either', // Allow either nesting or htmlFor
        },
      ],

      // --- Unicorn Overrides for React ---
      // Allow PascalCase for component filenames
      'unicorn/filename-case': [
        'error',
        {
          cases: { pascalCase: true, kebabCase: true },
          ignore: [
            /^\.?.*rc\.[cm]?js$/,
            /^[a-zA-Z]+(?:[-.][a-zA-Z]+)*\.config\.[cm]?[jt]s$/,
            /^[a-zA-Z]+(?:[-.][a-zA-Z]+)*\.setup\.[cm]?[jt]s$/,
            /\.d\.ts$/,
            'vite-env.d.ts',
            /^\.env(?:\.\w+)?$/,
            // Keep common non-component names kebab-case
            'index\.[jt]sx?$',
            'main\.[jt]sx?$',
            'app\.[jt]sx?$', // Allow app.jsx/tsx
            'router\.[jt]sx?$', // Allow router.jsx/tsx
            'store\.[jt]sx?$', // Allow store.jsx/tsx
            'service-worker\.[jt]sx?$',
            'registerServiceWorker\.[jt]sx?$',
          ],
        },
      ],
      // Allow 'Props' and 'Ref' abbreviations common in React
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: { Props: true, Ref: true },
        },
      ],
    },
  },
]; // Remove satisfies

// Export the config directly
export default react;
