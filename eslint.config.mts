import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
   {
      ignores: [
         'dist/**',
         'packages/*/dist/**',
         'lib/**',
         'packages/*/lib/**',
         'node_modules/**',
         '**/node_modules/**',
         '**/*.js',
         '**/*.cjs',
         '**/*.mjs',
         '**/eslint.config.mts',
      ],
   },

   ...tseslint.configs.strictTypeChecked,
   ...tseslint.configs.stylistic,

   {
      files: ['**/*.ts'],
      languageOptions: {
         sourceType: 'module',
         parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
         },
      },
      plugins: {
         prettier: prettierPlugin,
      },
      rules: {
         ...prettierConfig.rules,
         'prettier/prettier': 'error',

         '@typescript-eslint/no-unused-vars': 'warn',
         'no-console': 'warn',

         '@typescript-eslint/consistent-type-imports': [
            'error',
            {
               prefer: 'type-imports',
               fixStyle: 'separate-type-imports',
            },
         ],

         '@typescript-eslint/consistent-type-exports': [
            'error',
            {
               fixMixedExportsWithInlineTypeSpecifier:
                  false,
            },
         ],

         '@typescript-eslint/no-require-imports': 'error',
      },
   },
);
