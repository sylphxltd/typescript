import config from './src';
import type { Linter } from 'eslint';

export default [
    ...config,
] satisfies Linter.Config[];
