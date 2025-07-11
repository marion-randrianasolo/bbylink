import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Configuration globale
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
    rules: {
      // Règles générales moins strictes pour le développement
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
    }
  },
  {
    // Configuration spécifique pour les fichiers générés par Prisma
    files: ["**/generated/**/*.js", "**/generated/**/*.ts", "**/*.generated.*"],
    rules: {
      // Désactiver toutes les règles pour les fichiers générés
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "prefer-const": "off",
      "no-var": "off",
      // Permettre require() dans les fichiers générés
      "@typescript-eslint/no-var-requires": "off",
    }
  },
  {
    // Ignorer complètement certains dossiers
    ignores: [
      "**/node_modules/**",
      "**/dist/**", 
      "**/build/**",
      "**/.next/**",
      "**/generated/**",
      "**/*.generated.*",
      "**/scripts/**"
    ]
  }
];

export default eslintConfig;
