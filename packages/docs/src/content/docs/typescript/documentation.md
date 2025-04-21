---
title: Project Documentation
sidebar: {}
---

# TypeScript Project Documentation

This section covers the standards for documenting TypeScript projects, including the documentation site and API reference generation. Refer also to the documentation requirements in the General Project Development Guidelines.

## 1. Documentation Tool (Astro Starlight)

- **Tool**: Astro Starlight (used for its content collections, speed, and integration capabilities).
- **Setup**: Follow the official Astro Starlight documentation for setup.
- **Standard Configuration** (`astro.config.mjs` (in `packages/docs` root)):

  Refer to the actual `astro.config.mjs` file in the `packages/docs` directory for the current configuration. It utilizes Starlight's features for navigation, sidebar generation, social links, edit links, etc.

## 2. API Documentation Generator (TypeDoc)

- **Tool**: TypeDoc with `typedoc-plugin-markdown`.
- **Purpose**: Generates Markdown files from TSDoc comments in the source code, suitable for integration into Astro Starlight using content collections.
- **Integration Script** (`scripts/generate-api-docs.mts`):

  ```javascript
  import { Application, TSConfigReader, TypeDocReader } from 'typedoc';
  import { writeFile, mkdir } from 'fs/promises';
  import path from 'path';

  async function main() {
    const outputDir = 'src/content/docs/api'; // Output directory within Astro Starlight content collection
    const app = new Application();

    // Configure TypeDoc readers
    app.options.addReader(new TypeDocReader());
    app.options.addReader(new TSConfigReader());

    // Bootstrap TypeDoc
    app.bootstrap({
      entryPoints: ['src/index.ts'], // Adjust entry point if needed
      tsconfig: 'tsconfig.json',
      plugin: ['typedoc-plugin-markdown'], // Use the markdown plugin
      out: outputDir, // Output directory for markdown files
      readme: 'none', // Don't generate a top-level README in the API dir
      githubPages: false, // We are using Astro Starlight, not GitHub Pages directly
      entryDocument: 'index.md', // Name of the main API entry file
      hideBreadcrumbs: true,
      hideInPageTOC: true,
    });

    const project = app.convert();

    if (project) {
      console.log(`Generating API documentation in ${outputDir}...`);
      await app.generateDocs(project, outputDir);
      console.log('API documentation generated successfully.');

      // Optional: Create a simple index.md if the plugin doesn't
      // This provides a landing page for the /api/ route
      try {
        await mkdir(outputDir, { recursive: true });
        await writeFile(
          path.join(outputDir, 'index.md'),
          '# API Reference\n\nBrowse the API documentation using the sidebar.',
          'utf-8',
        );
      } catch (e) {
        /* Ignore if exists */
      }
    } else {
      console.error('Failed to convert project.');
      process.exit(1);
    }
  }

  main().catch((error) => {
    console.error('Error generating API docs:', error);
    process.exit(1);
  });
  ```

- **NPM Script**: Ensure the `docs:api` script in `package.json` correctly executes this script (e.g., `node scripts/generate-api-docs.mts` or `pnpm exec node scripts/generate-api-docs.mts`). This script should be run as part of the `docs:build` process.
