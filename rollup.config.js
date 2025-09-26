// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';

export default {
   input: 'src/index.ts',
   output: [
      {
         dir: 'lib',
         exports: 'named',
         entryFileNames: '[name].js',
         format: 'cjs',
         sourcemap: true
      },
      {
         dir: 'lib',
         exports: 'named',
         entryFileNames: '[name].mjs',
         preserveModules: true,
         format: 'esm',
         sourcemap: true
      },
   ],
   plugins: [
      typescript({
         tsconfig: './tsconfig.build.json'
      }),
      del({
         targets: [
            'lib'
         ]
      })
   ],
};
