import { sylph as sylphStandard } from '@sylphlab/eslint-config-sylph';
import functionalPlugin from 'eslint-plugin-functional';
import tseslint from 'typescript-eslint';

/**
 * Sylph ESLint Strict Configuration (Flat Config)
 *
 * Extends the standard Sylph configuration with stricter rules, including:
 * - Functional programming enforcement (immutability, no-throw).
 * - Lower complexity and line limits enforced as errors.
 * - Stricter type checking enforcement (no-explicit-any as error).
 * - Stricter abbreviation rules.
 */
export const sylphStrict = [
  // 1. Start with the standard configuration
  ...sylphStandard,

  // 2. Add Functional Programming Rules (Strict Immutability/No-Throw Focus)
  {
    plugins: { functional: functionalPlugin },
    rules: {
      // Re-enable functional plugin rules removed from standard
      ...(functionalPlugin.configs?.['recommended']?.rules ?? {}), // Add check for configs itself
      'functional/no-mixed-types': 'off',
      'functional/functional-parameters': 'off',
      'functional/no-conditional-statements': 'off',
      'functional/no-expression-statements': 'off',
      'functional/no-try-statements': 'warn', // Keep warn, `try` is sometimes necessary boundary
      'functional/no-throw-statements': 'error', // CRITICAL: Force explicit error handling
      'functional/prefer-property-signatures': 'off',
      'functional/immutable-data': [
        'error',
        { ignoreClasses: true, ignoreIdentifierPattern: '^mutable|draft' },
      ], // CRITICAL: Force immutability
    },
  },
  {
    // Relax functional rules for config files (same as standard, but needed here too)
    files: ['prettier.config.cjs', '**/*.config.{js,cjs}', 'eslint.config.js'],
    rules: { 'functional/immutable-data': 'off' },
  },

  // 3. Re-apply Stricter Overrides (Error Severity, Lower Limits)
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    // Ensure parser options are set correctly if not inherited perfectly
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        extraFileExtensions: ['.cjs'],
      },
    },
    rules: {
      // --- Re-apply strict TypeScript rules as errors ---
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }], // CRITICAL: Back to error

      // --- Re-apply strict Unicorn rules as errors ---
      'unicorn/prevent-abbreviations': [
        'error', // CRITICAL: Back to error
        { replacements: { env: false, config: false, src: false, dist: false, pkg: false } },
      ],

      // --- Re-apply strict limits as errors ---
      complexity: ['error', { max: 10 }], // CRITICAL: Back to error, low limit
      'max-lines': ['error', { max: 350, skipBlankLines: true, skipComments: true }], // CRITICAL: Back to error, low limit
      'max-lines-per-function': ['error', { max: 60, skipBlankLines: true, skipComments: true }], // CRITICAL: Back to error, low limit
      'max-depth': ['error', 4], // CRITICAL: Back to error, low limit
      'max-params': ['error', 4], // CRITICAL: Back to error, low limit

      // --- Consider adding SonarJS cognitive complexity as error ---
      // 'sonarjs/cognitive-complexity': ['error', 15],
    },
  },

  // 4. Ensure Test/Config Relaxations Still Apply (Inherited, but good to be aware)
  // The relaxations defined in the standard config for test/config files
  // should still apply here as this config includes the standard one.
];

export default sylphStrict;
