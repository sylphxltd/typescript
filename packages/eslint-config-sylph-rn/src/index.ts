import reactNativePlugin from 'eslint-plugin-react-native';
import { react as reactBaseConfig } from '@sylphlab/eslint-config-sylph-react'; // Import the React config array
import type { Linter } from 'eslint';

// Define type alias for FlatConfig for better readability
type Config = Linter.Config; // Use Linter.Config instead of deprecated Linter.FlatConfig

/**
 * Sylph ESLint Configuration for React Native Projects (Flat Config)
 *
 * Extends the @sylphlab/eslint-config-sylph-react configuration with
 * rules specific to React Native.
 */
export const rn: Config[] = [
  // Explicitly type the constant
  // 1. Inherit React Configuration (which includes the base config)
  ...reactBaseConfig,

  // 2. React Native Specific Configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Apply RN rules broadly
    plugins: {
      'react-native': reactNativePlugin as any,
    },
    languageOptions: {
      globals: {
        // React Native specific globals (if any not covered by plugin)
        // e.g., __DEV__: 'readonly',
      },
    },
    rules: {
      // --- React Native Plugin Recommended Rules ---
      // Manually include rules from the plugin's recommended set
      ...reactNativePlugin.configs.all.rules, // Start with 'all' and override below

      // --- Rule Overrides & Additions for React Native ---
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'warn', // Warn, don't error yet
      'react-native/no-inline-styles': 'warn', // Warn, allow for quick prototyping
      'react-native/no-color-literals': 'warn', // Warn, encourage theme usage
      'react-native/no-raw-text': ['error', { skip: ['CustomTextComponent'] }], // Enforce text components, allow exceptions
      'react-native/sort-styles': 'off', // Let Prettier handle style sorting if desired via plugins

      // --- Adjust base/react rules for RN context ---
      // Example: Relax console usage slightly more in RN dev?
      // 'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }],
    },
  },
]; // Remove satisfies

// Export the config directly
export default rn;
