// configs/eslint-config-sylph/eslint.config.ts
// Main export file for the shared ESLint configuration package.
// Import configurations from the src directory.
// Note: Consumers will import from the compiled JS files in dist/.

import { baseConfig } from './src/base.js'; // Assuming compiled output
import { reactConfig } from './src/react.js'; // Assuming compiled output
import { vueConfig } from './src/vue.js'; // Assuming compiled output
import { rnConfig } from './src/rn.js'; // Assuming compiled output

// Define the main export object
const sylphConfig = {
  base: baseConfig,
  react: [
    ...baseConfig, // Include base config
    // Override airbnb-base with airbnb-full (needs FlatCompat adjustment in react.ts or here)
    // This part needs careful handling: either react.ts uses airbnb-full directly,
    // or we filter/replace the airbnb-base part from baseConfig here.
    // For simplicity now, let's assume react.ts handles the airbnb-full extension.
    ...reactConfig,
  ],
  vue: [
    ...baseConfig, // Include base config
    ...vueConfig,
  ],
  rn: [
    // RN config already includes React config, which should include base
    ...rnConfig,
  ],
};

// Default export for basic usage (e.g., import config from '@sylphlab/eslint-config-sylph')
// Typically exports the base config or the entire object
export default sylphConfig;

// Also export individual configs for direct access if needed
export { baseConfig, reactConfig, vueConfig, rnConfig };

// We might need a build step to compile these TS files to JS in a dist/ folder
// and adjust the import paths (e.g., './dist/base.js') and package.json exports.