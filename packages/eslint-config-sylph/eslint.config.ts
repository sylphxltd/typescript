import importPlugin from 'eslint-plugin-import-x';

import config from './src';

export default [
  ...config,
  {
    files: ['src/index.ts'],
    plugins: {
      'import-x': importPlugin, // 引入 import-x 插件
    },
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
];
