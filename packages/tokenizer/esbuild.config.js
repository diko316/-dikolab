import { build } from '../../esbuild.config.js';

build({
   external: ['@dikolab/common'],
   globalName: 'DikolabTokenizer',
});
