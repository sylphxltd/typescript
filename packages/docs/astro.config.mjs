import starlight from '@astrojs/starlight';
import react from "@astrojs/react";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Sylph TypeScript Ecosystem',
      accent: {
        light: '#646cff', // VitePress-like blue for light mode
        dark: '#646cff'   // VitePress-like blue for dark mode
      },
      social: [ // Use array format as required by Starlight v0.33+
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sylphlab/typescript' }, // Use href instead of link
      ],
      // Sidebar configuration based on content
      sidebar: [
        { label: 'Overview', link: '/' }, // Assumes index.mdx exists at src/content/docs/
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
            { label: 'Overview', link: 'typescript/' }, // Assumes typescript/index.md exists
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
  base: '/typescript/', // Re-enable base for GH Pages deployment
});