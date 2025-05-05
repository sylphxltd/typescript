import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry point
  format: ['esm'], // Output format: ES Module
  dts: true, // Generate declaration files (.d.ts)
  splitting: false, // Keep code in a single file
  sourcemap: true, // Generate source maps
  clean: true, // Clean output directory before build
  // No external needed as this package has no workspace dependencies yet
  // If it did, add: external: ['@sylphx/some-other-package'],
  // Ensure the output works with the bin entry: tsup handles shebangs correctly.
});
