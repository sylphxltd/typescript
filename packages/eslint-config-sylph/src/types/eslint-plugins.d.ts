// Declare modules for ESLint plugins/configs that lack explicit types

declare module 'eslint-config-prettier';
declare module 'eslint-plugin-functional';
declare module 'eslint-plugin-import';
declare module 'eslint-plugin-promise';
declare module 'eslint-plugin-regexp';
declare module 'eslint-plugin-security';
declare module 'eslint-plugin-sonarjs';

// You might need to add more specific types if you interact
// deeply with the plugin's internals, but this satisfies basic imports.