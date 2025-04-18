import globals from 'globals';
import tseslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import { sylph as sylphBaseConfig } from '@sylphlab/eslint-config-sylph'; // Import the base config array
import type { Linter } from 'eslint';

// Define type alias for FlatConfig for better readability
type Config = Linter.Config; // Use Linter.Config instead of deprecated Linter.FlatConfig

/**
 * Sylph ESLint Configuration for Vue 3 Projects (Flat Config)
 *
 * Extends the base @sylphlab/eslint-config-sylph configuration with
 * rules specific to Vue 3 and TypeScript integration.
 */
export const vue: Config[] = [
  // Explicitly type the constant
  // 1. Inherit Base Configuration
  // Includes core JS, TS, Unicorn, Import, Functional, Security, Sonar, Promise, RegExp, Prettier rules
  ...sylphBaseConfig,

  // 2. Vue 3 Specific Configuration (using eslint-plugin-vue's flat configs)
  // Includes parser, plugin, and recommended rules for Vue 3
  ...(vuePlugin.configs['flat/recommended'] as Config[]),

  // 3. Overrides and Additional Configurations for Vue + TS
  {
    files: ['**/*.vue'], // Target only .vue files for specific overrides
    languageOptions: {
      // Parser is set by vuePlugin.configs['flat/recommended'] to vue-eslint-parser
      parserOptions: {
        // Specify the parser for <script lang="ts"> blocks
        parser: tseslint.parser,
        // Consumers MUST configure 'project' path for type-aware linting in .vue files
        // project: ['./tsconfig.vue.json', './tsconfig.json'], // Example paths
        // tsconfigRootDir: import.meta.dirname, // Usually relative to eslint.config.ts
        extraFileExtensions: ['.vue'], // Ensure .vue files are included
        sourceType: 'module',
      },
      globals: {
        ...globals.browser, // Vue apps typically run in the browser
        // Add Vue 3 specific globals if needed (e.g., defineProps, defineEmits are usually auto-recognized)
      },
    },
    rules: {
      // --- Vue Rule Overrides ---
      // Prioritize script setup and composition API
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/prefer-import-from-vue': 'error',
      'vue/no-v-html': 'warn', // Warn against potential XSS
      'vue/require-default-prop': 'off', // Less critical with TS
      'vue/multi-word-component-names': [
        'warn',
        {
          // Warn, allow exceptions for root/layout components
          ignores: ['App', 'Index', 'Layout', 'Default', 'Error'],
        },
      ],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/define-macros-order': [
        'error',
        {
          // Enforce consistent macro order
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        },
      ],
      'vue/block-lang': [
        'error',
        {
          // Enforce lang="ts" for script blocks
          script: { lang: 'ts' },
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false, // Check all components
          ignores: [],
        },
      ],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/no-required-prop-with-default': ['error', { autofix: true }],
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/v-on-event-hyphenation': ['error', 'never'], // Use @click instead of @click-event

      // --- TypeScript Rule Adjustments for Vue ---
      // Allow defineProps, defineEmits etc. to be unused (they are compiled away)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          args: 'after-used',
          // Allow specific identifiers used by Vue's compiler macros
          caughtErrors: 'all',
        },
      ],
      // Relax module boundary types in .vue files if needed, but prefer explicit types
      // '@typescript-eslint/explicit-module-boundary-types': 'warn',

      // --- Unicorn Rule Adjustments for Vue ---
      // Allow PascalCase for .vue component filenames
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
            'app\.[jt]sx?$',
            'router\.[jt]sx?$',
            'store\.[jt]sx?$',
          ],
        },
      ],
      // Allow 'Props' and 'Ref' abbreviations common in Vue
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: { Props: true, Ref: true },
        },
      ],
    },
  },
];

// Export the config directly
export default vue;
