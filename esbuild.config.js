import { build as esbuild } from 'esbuild';
import { execSync } from 'node:child_process';
import { rimrafSync } from 'rimraf';
import { globSync } from 'node:fs';

function collectEntryPoints(srcDir) {
   return globSync(
      `${srcDir}/**/*.ts`,
      { exclude: [`${srcDir}/**/*.test.ts`] }
   );
}

function umdBanner(globalName) {
   return [
      '(function(root, factory) {',
      '   if (typeof define === \'function\' && define.amd)',
      '      define([], factory);',
      '   else if (typeof module === \'object\' &&',
      '            module.exports)',
      '      module.exports = factory();',
      '   else',
      `      root.${globalName} = factory();`,
      '})(typeof self !== \'undefined\' ?',
      '   self : this, function() {',
   ].join('\n');
}

const UMD_FOOTER = 'return ' +
   '__esbuild_iife_result;});';

export async function build({
   entryPoint = 'src/index.ts',
   outdir = 'lib',
   external = [],
   globalName,
   tsconfigPath = './tsconfig.build.json',
} = {}) {
   rimrafSync(outdir);

   const entryPoints = collectEntryPoints('src');
   const shared = {
      target: 'es2022',
      sourcemap: true,
      logLevel: 'info',
   };

   await Promise.all([
      esbuild({
         ...shared,
         entryPoints: [entryPoint],
         outfile: `${outdir}/index.cjs`,
         format: 'cjs',
         bundle: true,
         platform: 'node',
         external,
      }),

      esbuild({
         ...shared,
         entryPoints,
         outdir,
         outbase: 'src',
         outExtension: { '.js': '.mjs' },
         format: 'esm',
         bundle: true,
         splitting: true,
         platform: 'neutral',
         packages: 'external',
      }),

      esbuild({
         ...shared,
         entryPoints: [entryPoint],
         outfile: `${outdir}/index.umd.js`,
         format: 'iife',
         globalName: '__esbuild_iife_result',
         bundle: true,
         platform: 'node',
         banner: { js: umdBanner(globalName) },
         footer: { js: UMD_FOOTER },
      }),
   ]);

   execSync(
      `tsc --emitDeclarationOnly --project ${tsconfigPath}`,
      { stdio: 'inherit' }
   );
}
