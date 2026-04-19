import rootConfig from '../../eslint.config.mts';
import tseslint from 'typescript-eslint';

export default tseslint.config(
   ...rootConfig,
   {
      files: ['src/**/*.ts'],
      rules: {
         '@typescript-eslint/no-unsafe-assignment':
            'off',
         '@typescript-eslint/no-unsafe-member-access':
            'off',
         '@typescript-eslint/no-unsafe-return':
            'off',
         '@typescript-eslint/no-unsafe-argument':
            'off',
         '@typescript-eslint/no-unsafe-call':
            'off',
         '@typescript-eslint/no-dynamic-delete':
            'off',
         '@typescript-eslint/unbound-method':
            'off',
         '@typescript-eslint/no-unnecessary-condition':
            'off',
         '@typescript-eslint/prefer-for-of':
            'off',
         '@typescript-eslint/no-unnecessary-type-parameters':
            'off',
         '@typescript-eslint/no-non-null-assertion':
            'off',
         '@typescript-eslint/no-this-alias':
            'off',
         '@typescript-eslint/restrict-plus-operands':
            'off',
         '@typescript-eslint/no-unused-vars': [
            'warn',
            {
               argsIgnorePattern: '^_',
               caughtErrorsIgnorePattern: '^_',
            },
         ],
      },
   },
   {
      files: ['src/**/*.test.ts'],
      rules: {
         '@typescript-eslint/no-empty-function': 'off',
         '@typescript-eslint/no-extraneous-class': 'off',
         '@typescript-eslint/restrict-template-expressions':
            'off',
         '@typescript-eslint/no-this-alias': 'off',
         '@typescript-eslint/require-await': 'off',
         '@typescript-eslint/no-unused-vars': 'off',
      },
   },
);
