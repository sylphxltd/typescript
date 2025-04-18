# @sylphlab/typescript-config

[![npm version](https://img.shields.io/npm/v/@sylphlab/typescript-config?label=%40sylphlab%2Ftypescript-config)](https://www.npmjs.com/package/@sylphlab/typescript-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Reusable TypeScript configurations for SylphLab projects. This package provides a set of shareable, extendable TypeScript configurations for different environments and frameworks.

## Features

- **Strongly-Typed**: Strict TypeScript configurations designed to catch potential issues early
- **Environment-Specific**: Dedicated configurations for Node.js, DOM, React, Vue, and React Native
- **Modern Defaults**: Latest TypeScript features and ECMAScript targets
- **Extensible**: Easy to extend and customize for your specific project needs

## Installation

```bash
npm install --save-dev @sylphlab/typescript-config
# OR
yarn add --dev @sylphlab/typescript-config
# OR
pnpm add --save-dev @sylphlab/typescript-config
```

## Usage

Extend the configuration in your project's `tsconfig.json`:

### Node.js Project

```json
{
  "extends": "@sylphlab/typescript-config/node",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

### React Project

```json
{
  "extends": "@sylphlab/typescript-config/react",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

### Vue Project

```json
{
  "extends": "@sylphlab/typescript-config/vue",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

### React Native Project

```json
{
  "extends": "@sylphlab/typescript-config/react-native",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

## Available Configurations

- `@sylphlab/typescript-config/base` - Base configuration with strict settings
- `@sylphlab/typescript-config/node` - Node.js environment
- `@sylphlab/typescript-config/dom` - Browser environment
- `@sylphlab/typescript-config/react` - React projects
- `@sylphlab/typescript-config/vue` - Vue projects
- `@sylphlab/typescript-config/react-native` - React Native projects

## License

MIT © [SylphLab](https://github.com/sylphlab)
