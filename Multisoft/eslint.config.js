// ESLint v9 flat config for Node + Mocha
  // See: https://eslint.org/docs/latest/use/configure/configuration-files-new

const js = require("@eslint/js");
const globals = require("globals");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "coverage/**", "dist/**", "**/*.min.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    plugins: {
      // Import plugin is CommonJS/ESM aware and helpful even for simple repos
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Example sensible tweaks for small Node libs
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];
