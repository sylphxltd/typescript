import type { Config } from 'prettier';

export const config: Config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
  ],
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
