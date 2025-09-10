import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/.cache/**",
      "**/node_modules/**",
      "**/build/**",
      "**/public/**",
      "**/*.json",
      "**/server-build/**",
      "**/dist/**",
      "**/coverage/**",
      "**/*.tsbuildinfo",
      "**/.react-router/**",
      "**/*.d.ts",
      "tailwind.config.ts",
      ".react-router/**/*",
      "**/.react-router/**/*",
      "react-router.config.ts",
    ],
  },
  // Base JavaScript/TypeScript configuration
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // TypeScript configuration
  ...tseslint.configs.recommended,

  // React configuration (only for React files)
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
