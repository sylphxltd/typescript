# @sylphlab/prettier-config

[![npm version](https://img.shields.io/npm/v/@sylphlab/prettier-config?label=%40sylphlab%2Fprettier-config)](https://www.npmjs.com/package/@sylphlab/prettier-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Shared Prettier configuration for SylphLab projects. This package provides a consistent code formatting style across all SylphLab projects.

## Features

- **Consistent Code Formatting**: Enforces a uniform code style across projects
- **Modern Defaults**: Uses modern Prettier settings and conventions
- **Import Organization**: Includes plugins for organizing imports and package.json files
- **Ready-to-use**: Simple to install and integrate into any project

## Installation

```bash
npm install --save-dev prettier @sylphlab/prettier-config
# OR
yarn add --dev prettier @sylphlab/prettier-config
# OR
pnpm add --save-dev prettier @sylphlab/prettier-config
```

## Usage

### Option 1: Reference in package.json (Recommended)

Add the following to your `package.json`:

```json
{
  "prettier": "@sylphlab/prettier-config"
}
```

### Option 2: Prettier Configuration File

Create a `.prettierrc.js` file:

```js
import sylphPrettierConfig from '@sylphlab/prettier-config';

export default {
  ...sylphPrettierConfig,
  // Your project-specific overrides
};
```

### Option 3: Extending the Configuration (CommonJS)

If you need to use a CommonJS-compatible configuration:

```js
// .prettierrc.cjs
const sylphPrettierConfig = require('@sylphlab/prettier-config');

module.exports = {
  ...sylphPrettierConfig,
  // Your project-specific overrides
};
```

## Configuration Options

This configuration includes:

- 100 character print width
- 2 space indentation
- Single quotes
- Trailing commas
- LF line endings
- Organized imports
- Formatted package.json files

## License

MIT © [SylphLab](https://github.com/sylphlab)