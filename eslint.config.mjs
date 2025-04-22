import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import reactNativePlugin from "eslint-plugin-react-native";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";
export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      "@env",
      "dist/",
      "build/",
      "coverage/",
      "android/",
      "ios/",
      "**/*.d.ts",
      ".eslintrc.js",
      "metro.config.js",
      "babel.config.js",
      "jest.config.js",
      "jest/jest-svg-transformer.js",
    ],
  },


  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      }
    },
  },


  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
        '@typescript-eslint': tseslint.plugin,
        'unused-imports': unusedImports,
    },
    rules: {
        ...tseslint.configs.recommendedTypeChecked.rules,
        'unused-imports/no-unused-imports': 'warn',
    }
  },

  // React Plugin Recommended Rules
  {
    files: ["**/*.{ts,tsx}"], // Apply React rules only to TSX/TS files
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },

  // Import Plugin Configuration (with Settings, Resolver, and Rules)
  {
    files: ["**/*.{ts,tsx,js,jsx}"], // Apply import logic broadly
    plugins: {
      import: importPlugin, // Define plugin here
      
    },
    settings: { // Define settings here
      "import/resolver": {
        "babel-module": {
          "root": ["."],
        },
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
      "import/ignore": [
        "node_modules",
        "@env"
      ]
    },
    rules: { // Define import rules here

      "import/no-unresolved": "error",
      'import/order': 2,
      'import/first': 2,
      'import/newline-after-import': 2,
      'import/no-duplicates': 2,
      'import/no-default-export': 0,
      'import/no-anonymous-default-export': 2,
      'import/no-self-import': 2,
      'import/no-useless-path-segments': 2,
      'import/namespace': 'off',
    },
  },

  // React Native Plugin Configuration
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-native": reactNativePlugin,
    },
    rules: {
      ...reactNativePlugin.configs.all.rules,
      "react-native/no-color-literals": 1,
      "react-native/no-inline-styles": 1,
    },
  },

  {
    files: ["**/*.{js,jsx}"], // Apply JS-specific overrides here if needed
    rules: {
    }
  },
  {
    // Apply TS/React specific overrides here
    files: ["**/*.{ts,tsx}"],
    // Add the TS plugin declaration to this block
    plugins: {
        '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unstable-nested-components": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": "off", 
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" , "varsIgnorePattern": "^_"}], 
      "react-native/no-raw-text": "off",
    },
  },

);