import { build } from '../../esbuild.config.js';

build({
   external: [
      '@dikolab/common',
      '@dikolab/tokenizer',
   ],
   globalName: 'DikolabLalrParser',
});
