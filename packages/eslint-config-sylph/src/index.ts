/* eslint import-x/no-named-as-default-member: "off" */

import eslintJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import functionalPlugin from 'eslint-plugin-functional';
import importPlugin from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier';
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Sylph ESLint Configuration (Flat Config) - AI-Focused Strict Revision
 *
 * A very strict configuration optimized for AI-assisted development, consistency, and rigor.
 * Targets: Bun/Vitest/TSUP/Turborepo, Node 22, TypeScript 5+, ESLint 9+, Prettier 3+
 * Emphasizes: Strict LOC/Complexity (error), Explicitness (error on any), Immutability (error),
 *            Filename Consistency (error), Security, Bug Detection.
 *
 * NOTE: This strictness (especially LOC limits as errors) aims to force code splitting
 * beneficial for AI context limits, but may require significant refactoring effort
 * from human developers. Evaluate if this trade-off is acceptable.
 *
 * NOTE: eslint-plugin-functional is included for immutability/no-throw but remains
 * highly opinionated; consider removal if FP adherence is not a strong team priority.
 */
export const sylph = [
  // 1. Core ESLint Recommended Rules
  eslintJs.configs.recommended,

  // 2. TypeScript Strict & Stylistic Rules
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // 3. Unicorn Rules (Modernization, Consistency, Bug Prevention)
  unicornPlugin.configs['flat/recommended'],

  // 4. Import Rules (Order, Structure, Resolution) - Using import-x
  {
    plugins: { 'import-x': importPlugin },
    settings: {
      /* ... (same as previous version) ... */
      'import-x/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'] },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ alwaysTryTypes: true, bun: true }),
      ],
      'import-x/resolver': { typescript: true, node: true },
    },
    rules: {
      /* ... (same import-x rules as previous version) ... */ 'import-x/no-unresolved': 'error',
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            /* ... extensive list ... */ '**/__tests__/**',
            '**/tests/**',
            '**/specs/**',
            '**/*{.,_}{test,spec}.[jt]s?(x)',
            '**/*.config.{js,cjs,mjs,ts,cts,mts}',
            '**/*.setup.{js,cjs,mjs,ts,cts,mts}',
            '**/test-utils/**',
            'vite.config.*',
            'vitest.config.*',
            'eslint.config.*',
            'prettier.config.*',
            '**/.*rc.{js,cjs}',
            '**/scripts/**',
          ],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          warnOnUnassignedImports: true,
        },
      ],
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-mutable-exports': 'error',
      'import-x/first': 'error',
    },
  },

  // 5. Functional Programming Style Rules (Strict Immutability/No-Throw Focus)
  {
    plugins: { functional: functionalPlugin },
    rules: {
      ...functionalPlugin.configs.recommended.rules,
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
    files: ['prettier.config.cjs', '**/*.config.{js,cjs}', 'eslint.config.js'],
    rules: { 'functional/immutable-data': 'off' },
  },

  // 6. Security Rules
  securityPlugin.configs.recommended,

  // 7. SonarJS Rules (Bug Detection, Code Smells)
  sonarjsPlugin.configs.recommended, // Keep recommended, provides good value
  // Consider making complexity an error directly if forcing AI compliance
  // { rules: { 'sonarjs/cognitive-complexity': ['error', 15] } } // Can be added separately

  // 8. Promise Rules (Best Practices)
  promisePlugin.configs['flat/recommended'],

  // 9. RegExp Rules (Optimization, Security)
  regexpPlugin.configs['flat/recommended'],

  // 10. Prettier Integration (Last style config)
  prettierConfig,
  { plugins: { prettier: prettierPlugin }, rules: { 'prettier/prettier': 'error' } },

  // 11. Global Configuration & Overrides (AI-Focused Strictness)
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    languageOptions: {
      /* ... (same as previous, ensure project:true) ... */ ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        // Allow .cjs files to be properly recognized
        extraFileExtensions: ['.cjs'],
        /* tsconfigRootDir: import.meta.dirname */ ecmaFeatures: { jsx: false },
      },
      globals: { ...globals.node, ...globals.es2022 /* Bun: 'readonly' */ },
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    rules: {
      // --- Core ESLint/TypeScript (Strict) ---
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }], // CRITICAL: No 'any' allowed easily
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],

      // --- Unicorn Rules (Strict Consistency) ---
      'unicorn/filename-case': [
        'error',
        {
          cases: { kebabCase: true, pascalCase: true },
          ignore: [
            // Using valid regex patterns that avoid security issues
            /^.+rc\.[cm]?js$/,
            /^.+\.config\.[a-z]+$/,
            /^.+\.setup\.[a-z]+$/,
            /\.d\.ts$/,
            'bun.lockb',
            'turbo.json',
            'vite-env.d.ts',
            /^\.env$/,
            /^\.env\..+$/,
            'README.md',
            'CHANGELOG.md',
            'LICENSE',
          ],
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        { replacements: { env: false, config: false, src: false, dist: false, pkg: false } },
      ], // CRITICAL: Force explicit names
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
      'no-nested-ternary': 'off',
      'unicorn/no-nested-ternary': 'error',

      // --- General Quality (Strict Limits for AI) ---
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }], // Keep warn for dev flexibility
      'no-debugger': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],
      complexity: ['error', { max: 10 }], // CRITICAL: Low complexity limit as error
      'max-lines': ['error', { max: 350, skipBlankLines: true, skipComments: true }], // CRITICAL: Strict file length as error
      'max-lines-per-function': ['error', { max: 60, skipBlankLines: true, skipComments: true }], // CRITICAL: Strict function length as error
      'max-depth': ['error', 4], // CRITICAL: Nesting depth as error
      'max-params': ['error', 4], // More balanced param limit
      'no-lonely-if': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
      'padding-line-between-statements': [
        'error' /* ... (same padding rules) ... */,
        { blankLine: 'always', prev: '*', next: 'return' },
        {
          blankLine: 'always',
          prev: '*',
          next: ['if', 'for', 'while', 'switch', 'try', 'class', 'function'],
        },
        {
          blankLine: 'always',
          prev: ['if', 'for', 'while', 'switch', 'try', 'class', 'function'],
          next: '*',
        },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      ],
      'prefer-const': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignorePrimitives: { string: true, number: true, boolean: true } },
      ],
      // Add SonarJS complexity rule explicitly if needed, otherwise rely on core 'complexity'
      // 'sonarjs/cognitive-complexity': ['error', 15],
    },
  },

  // 12. Test, Config & Script File Relaxations (Remains crucial)
  {
    files: [
      /* ... (same extensive list of test/config/script files) ... */
      '**/*{.,_}{test,spec}.[jt]s?(x)',
      '**/__tests__/**',
      '**/tests/**',
      '**/specs/**',
      '**/test-utils/**',
      '**/*.config.{js,cjs,mjs,ts,cts,mts}',
      '**/*.setup.{js,cjs,mjs,ts,cts,mts}',
      '**/.*rc.{js,cjs}',
      '**/scripts/**',
    ],
    languageOptions: { globals: { ...globals.node, ...globals.jest, ...globals.vitest } },
    rules: {
      /* ... (same extensive list of relaxed rules) ... */
      'import-x/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'functional/immutable-data': 'off',
      'functional/no-expression-statements': 'off',
      'functional/no-conditional-statements': 'off',
      'functional/no-try-statements': 'off',
      'functional/no-throw-statements': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      complexity: 'off',
      'max-depth': 'off',
      'no-console': 'off',
    },
  },

  // 13. Ignore Patterns (Globally)
  {
    ignores: [
      /* ... (same comprehensive ignore list) ... */ '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      'out/',
      '**/.turbo/**',
      '**/.cache/**',
      '**/.eslintcache/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/bun.lockb',
      'CHANGELOG.md',
      'LICENSE*',
      '*.log',
      'logs/',
      'temp/',
      '.wrangler/',
      '.vercel/',
      '.netlify/',
    ],
  },
];

export default sylph;
