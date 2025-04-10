import eslintJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import functionalPlugin from 'eslint-plugin-functional';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import type { Linter } from 'eslint';

// Define type alias for Config for better readability
type Config = Linter.Config; // Use Linter.Config instead of deprecated Linter.FlatConfig

/**
 * Sylph ESLint Configuration (Flat Config)
 *
 * A strict, opinionated base configuration for modern TypeScript projects.
 * Designed for: ESLint v9+, TypeScript v5+, Prettier v3+
 * Focuses on: Type Safety, Readability, Consistency, Security, Performance, Functional Style.
 *
 * Includes plugins:
 * - @typescript-eslint/eslint-plugin
 * - eslint-plugin-unicorn
 * - eslint-plugin-import
 * - eslint-plugin-functional
 * - eslint-plugin-security
 * - eslint-plugin-sonarjs
 * - eslint-plugin-promise
 * - eslint-plugin-regexp
 * - eslint-plugin-prettier
 */
export const sylph: Config[] = [ // Explicitly type the constant
    // 1. Core ESLint Recommended Rules
    eslintJs.configs.recommended,

    // 2. TypeScript Strict & Stylistic Rules
    // Uses the parser to enable linting based on type information.
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    // 3. Unicorn Rules (Modernization, Consistency, Bug Prevention)
    unicornPlugin.configs['recommended'],

    // 4. Import Rules (Order, Structure, Resolution)
    {
        plugins: { import: importPlugin },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true, // Always try to resolve types under `<root>@types` directory
                    // project: './tsconfig.json', // Consumers MUST configure this in their own eslint.config.js if using rules requiring type info for imports
                },
                node: true,
            },
        },
        rules: {
            // --- Import Plugin Rules ---
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules, // Use rules specific to TypeScript
            'import/no-unresolved': 'error', // Ensure imports resolve correctly
            'import/prefer-default-export': 'off', // Allow named exports
            'import/no-extraneous-dependencies': ['error', {
                devDependencies: [
                    '**/__tests__/**', '**/tests/**', '**/specs/**', '**/*{.,_}{test,spec}.[jt]s?(x)',
                    '**/*.config.[jt]s?(x)', '**/test-utils.[jt]s?(x)',
                    'vite.config.[jt]s', 'vitest.config.[jt]s', 'eslint.config.[jt]s',
                    'jest.setup.[jt]s', 'vitest.setup.[jt]s',
                    '**/.*rc.[jt]s', // Config files like .eslintrc.js
                    '**/scripts/**', // Build/utility scripts
                ],
                optionalDependencies: false,
                peerDependencies: false, // Check peerDeps in consuming projects, not here
            }],
            'import/order': [ // Enforce consistent import order
                'error',
                {
                    groups: [
                        'builtin', // Node.js built-in modules
                        'external', // npm packages
                        'internal', // Aliased internal modules (if configured)
                        'parent', // Relative imports from parent directories
                        'sibling', // Relative imports from sibling directories
                        'index', // Index file of the current directory
                        'object', // Imports of object types (e.g., `import type { ... } from ...`)
                        'type', // Type imports (`import type ... from ...`)
                    ],
                    'newlines-between': 'always', // Enforce newlines between groups
                    alphabetize: {
                        order: 'asc', // Sort imports alphabetically within groups
                        caseInsensitive: true,
                    },
                },
            ],
            'import/newline-after-import': 'error', // Ensure newline after imports
            'import/no-duplicates': 'error', // Prevent duplicate imports
            'import/no-mutable-exports': 'error', // Prevent exporting mutable bindings
            'import/first': 'error', // Ensure all imports are at the top
        },
    },

    // 5. Functional Programming Style Rules
    {
        plugins: { functional: functionalPlugin },
        rules: {
            ...functionalPlugin.configs.recommended.rules,
            // Removed stylistic rules from functional plugin - too opinionated / potential Prettier conflicts
            // Example overrides (adjust as needed):
            'functional/no-mixed-types': 'off', // Can be overly strict sometimes
            'functional/functional-parameters': 'off', // Disable forcing readonly parameters for now
            'functional/no-conditional-statements': 'off', // Allow if/switch
            'functional/no-expression-statements': 'off', // Allow expression statements
            'functional/no-throw-statements': 'error', // Prefer Result types or error handling functions
            // 'functional/prefer-immutable-types': 'warn', // Removed - can be overly verbose/strict
        },
    },

    // 6. Security Rules
    securityPlugin.configs.recommended,

    // 7. SonarJS Rules (Bug Detection, Code Smells)
    sonarjsPlugin.configs.recommended,

    // 8. Promise Rules (Best Practices)
    promisePlugin.configs['flat/recommended'],

    // 9. RegExp Rules (Optimization, Security)
    regexpPlugin.configs['flat/recommended'],

    // 10. Prettier Integration (MUST be last to override other style rules)
    prettierConfig, // Disables ESLint rules that conflict with Prettier
    { // Runs Prettier as an ESLint rule
        plugins: { prettier: prettierPlugin },
        rules: {
            'prettier/prettier': 'error',
        },
    },

    // 11. Global Configuration & Overrides
    {
        files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                // tsconfigRootDir: import.meta.dirname, // Example if needed, but usually relative to eslint.config.js is fine
                ecmaFeatures: { jsx: false }, // Default to false, enable in framework configs
            },
            globals: {
                // ...globals.browser, // Removed: Base config should be env-agnostic. Add in framework configs.
                ...globals.node, // Keep Node.js globals as they are common in tooling/scripts
                ...globals.es2021, // Or latest appropriate ES version globals
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
        },
        rules: {
            // --- Core ESLint/TypeScript Rule Overrides & Additions ---
            'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
            '@typescript-eslint/explicit-module-boundary-types': ['error'],
            '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }], // Warn, don't error on 'any' yet
            '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }], // Require handling promises
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
            '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
            // '@typescript-eslint/no-unused-vars': ['error', ...], // Note: This rule was previously duplicated and removed here. The definition at line 169 is kept.

            // --- Unicorn Rule Overrides ---
            'unicorn/filename-case': [ // Enforce kebab-case or PascalCase
                'error',
                {
                    cases: { pascalCase: true, kebabCase: true },
                    ignore: [
                        // Common config/setup files
                        /^\.?.*rc\.[cm]?js$/, // .eslintrc.js, .prettierrc.cjs, etc.
                        /^[a-zA-Z]+(?:[-.][a-zA-Z]+)*\.config\.[cm]?[jt]s$/, // vite.config.ts, postcss.config.js
                        /^[a-zA-Z]+(?:[-.][a-zA-Z]+)*\.setup\.[cm]?[jt]s$/, // vitest.setup.ts
                        // Type definition files
                        /\.d\.ts$/,
                        // Specific framework/entry files (adjust as needed)
                        // 'App\.vue$', // Removed: Framework-specific
                        // 'main\.[jt]sx?$', // Removed: Often framework entry points
                        // 'index\.[jt]sx?$', // Removed: Often framework entry points
                        'vite-env.d.ts', // Keep common build tool types
                        // Environment files
                        /^\.env(?:\.\w+)?$/,
                    ],
                },
            ],
            'unicorn/prevent-abbreviations': ['error', {
                replacements: {
                    props: false, // Allow 'props'
                    ref: false, // Allow 'ref'
                    args: false, // Allow 'args'
                    params: false, // Allow 'params'
                    env: false, // Allow 'env'
                    dev: false, // Allow 'dev'
                    prod: false, // Allow 'prod'
                    config: false, // Allow 'config'
                    src: false, // Allow 'src'
                    dist: false, // Allow 'dist'
                    pkg: false, // Allow 'pkg'
                },
                // allowList: { Props: true, Ref: true } // Removed: Framework-specific, moved to react/vue configs
            }],
            'unicorn/prefer-top-level-await': 'off', // Often not feasible/desirable
            'unicorn/no-null': 'off', // null is idiomatic in JS/TS
            'unicorn/no-useless-undefined': ['error', { checkArguments: false }], // Allow undefined in function args

            // --- General Code Quality & Consistency ---
            'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // Allow warn/error/info
            'no-debugger': 'error',
            'eqeqeq': ['error', 'always', { null: 'ignore' }], // Allow == null check
            'curly': ['error', 'all'],
            'complexity': ['error', { 'max': 12 }], // Slightly increased complexity limit
            'max-lines': ['warn', { 'max': 500, 'skipBlankLines': true, 'skipComments': true }], // Warn at 500 lines
            'max-lines-per-function': ['warn', { 'max': 80, 'skipBlankLines': true, 'skipComments': true }], // Warn at 80 lines/func
            'max-depth': ['error', 4],
            'max-params': ['error', 4], // Allow up to 4 params
            'no-lonely-if': 'error',
            'no-nested-ternary': 'error', // Use unicorn/no-nested-ternary instead
            'unicorn/no-nested-ternary': 'error',
            'no-param-reassign': ['error', { props: false }], // Allow reassigning properties of params
            'no-restricted-syntax': [ // Disallow problematic syntax
                'error',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement',
                // 'error', { selector: 'TSEnumDeclaration', message: "Don't declare enums" } // Optional: Disallow enums
            ],
            'padding-line-between-statements': [ // Enforce padding lines
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
                { blankLine: 'always', prev: 'directive', next: '*' },
                { blankLine: 'any', prev: 'directive', next: 'directive' },
                { blankLine: 'always', prev: ['case', 'default'], next: '*' },
            ], // End padding-line-between-statements
            // --- Modern JS Features ---
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true, number: true, boolean: true } }], // Allow `||` for primitives
        },
    },

    // 12. Test & Config File Relaxations
    {
        files: [
            '**/*{.,_}{test,spec}.[jt]s?(x)',
            '**/__tests__/**', '**/tests/**', '**/specs/**', '**/test-utils/**',
            '**/*.config.[jt]s?(x)', '**/*.setup.[jt]s?(x)', '**/.*rc.[jt]s',
            '**/scripts/**',
        ],
        languageOptions: {
            globals: { ...globals.jest, ...globals.node }, // Add Jest/Node globals for tests/configs
        },
        rules: {
            // Relax rules for test/config files
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/no-var-requires': 'off', // Allow require in CJS config files
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'functional/no-expression-statements': 'off',
            'functional/no-conditional-statements': 'off',
            'functional/no-try-statements': 'off',
            'functional/no-throw-statements': 'off',
            'sonarjs/no-duplicate-string': 'off',
            'sonarjs/cognitive-complexity': 'off',
            'max-lines-per-function': 'off',
            'max-lines': 'off',
            'no-console': 'off',
            'unicorn/prefer-module': 'off', // Allow CJS in config files if necessary
        },
    },

    // 13. Ignore Patterns (Globally)
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
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
            '**/bun.lock', // Ignore Bun lockfile (plain text format)
            // Add any other specific directories or files to ignore
            'CHANGELOG.md',
            'LICENSE',
            '*.log',
        ],
    },
]; // Remove satisfies

// Export the config directly for use in eslint.config.js
export default sylph;