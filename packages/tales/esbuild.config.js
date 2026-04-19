import { build } from '../../esbuild.config.js';

build({
   external: ['@dikolab/private-parts'],
   globalName: 'DikolabTales',
});
