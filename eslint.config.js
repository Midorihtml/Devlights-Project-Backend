import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["dist/**"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },

    plugins: {
      "@typescript-eslint": tseslint,
      prettier: eslintPluginPrettier
    },

    rules: {
      // Reglas de TypeScript recomendadas
      ...tseslint.configs.recommended.rules,

      // ❗ Deshabilitar cualquier regla que choque con Prettier
      ...prettier.rules,

      // 👉 Ejecutar Prettier como regla ESLint
      "prettier/prettier": "error",
      "linebreak-style": ["error", "windows"]
    }
  }
];
