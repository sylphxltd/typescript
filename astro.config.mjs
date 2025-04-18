import starlight from '@astrojs/starlight';
import react from "@astrojs/react";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Sylph TypeScript Ecosystem',
      // Optional: Add social links, logo, etc. later
      // logo: {
      //   src: './src/assets/logo.svg',
      // },
      social: {
        github: 'https://github.com/sylphlab/typescript',
      },
      // Sidebar configuration will be added in the next step
      sidebar: [
        { label: 'Overview', link: '/' }, // Link to the new index.mdx homepage
        {
          label: 'Best Practices',
          items: [
            { label: 'Core Principles', link: '/best-practices/core-principles/' },
            { label: 'Structure & Patterns', link: '/best-practices/structure-patterns/' },
          ]
        },
        {
          label: 'Style Guide',
          items: [
            { label: 'Code Style & Quality', link: '/style-guide/style-quality/' },
          ]
        },
        {
          label: 'Tooling',
          items: [
            { label: 'CI/CD & Containerization', link: '/tooling/ci-cd/' },
            { label: 'Setup & Configuration', link: '/tooling/setup-config/' },
          ]
        },
        {
          label: 'TypeScript Specifics',
          items: [
            // Assuming index.md is the overview
            { label: 'Overview', link: '/typescript/' },
            { label: 'Documentation', link: '/typescript/documentation/' },
            { label: 'Testing', link: '/typescript/testing/' },
          ]
        }
      ],
      customCss: [
        // Optional: Path to custom CSS file
        // './src/styles/custom.css',
      ],
    }),
    react() // Enable React components
  ],
  // Ensure site path is correct if deploying to subpath
  site: 'https://sylphlab.github.io/typescript/', // Set for GH Pages deployment
  base: '/typescript/', // Set for GH Pages deployment
});