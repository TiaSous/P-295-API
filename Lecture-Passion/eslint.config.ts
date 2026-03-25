import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['dist/**', 'node_modules/**', '*.min.js', 'public/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        // TS in <script lang="ts">
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      eqeqeq: ['warn', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': ['error', 'always'],
      'no-duplicate-imports': 'error',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // Vue
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'warn',
      'vue/multi-word-component-names': 'error',
      'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits'] }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/no-v-html': 'warn',
      'vue/prefer-import-from-vue': 'error',
      'vue/no-template-shadow': 'error',
      'vue/v-on-event-hyphenation': ['error', 'always'],
      'vue/attribute-hyphenation': ['error', 'always'],
    },
  },
  prettierConfig
);
