import starlight from '@astrojs/starlight';
import react from "@astrojs/react";
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Determine base path based on command environment variable
// Note: Astro passes command via process.env when using object syntax
const isBuild = process.env.ASTRO_COMMAND === 'build';
const base = isBuild ? '/typescript/' : '/';

// Find workspace root relative to this config file
const workspaceRoot = path.resolve(fileURLToPath(import.meta.url), '../../../');

// https://astro.build/config
export default defineConfig({ // Use standard object syntax
  srcDir: './src',
  // Add Vite config
  vite: {
    server: {
      fs: {
        // Allow serving files from the workspace root (needed for pnpm/monorepo)
        allow: [workspaceRoot],
      },
    },
  },
  integrations: [
    starlight({
      title: 'Sylph TypeScript Ecosystem',
      // accent: { // Remove invalid 'accent' key again
      //   light: '#646cff',
      //   dark: '#646cff'
      // },
      social: [ // Use array format as required by Starlight v0.33+
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sylphlab/typescript' },
      ],
      // Sidebar configuration based on content
      sidebar: [
        { label: 'Overview', link: '/' },
        {
          label: 'Best Practices',
          items: [
            { label: 'Core Principles', link: 'best-practices/core-principles' },
            { label: 'Structure & Patterns', link: 'best-practices/structure-patterns' },
          ]
        },
        {
          label: 'Style Guide',
          items: [
            { label: 'Code Style & Quality', link: 'style-guide/style-quality' },
          ]
        },
        {
          label: 'Tooling',
          items: [
            { label: 'CI/CD & Containerization', link: 'tooling/ci-cd' },
            { label: 'Setup & Configuration', link: 'tooling/setup-config' },
          ]
        },
        {
          label: 'TypeScript Specifics',
          items: [
            { label: 'Overview', link: 'typescript/' },
            { label: 'Documentation', link: 'typescript/documentation' },
            { label: 'Testing', link: 'typescript/testing' },
          ]
        }
      ],
    }),
    react(), // Enable React components
  ],
  // Deploying to https://sylphlab.github.io/typescript/
  site: 'https://sylphlab.github.io/typescript/',
  base: base, // Use determined base path
}); // Close object syntax