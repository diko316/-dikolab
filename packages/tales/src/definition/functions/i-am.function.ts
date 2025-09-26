import { IAmChain } from '../classes/iam-chain.class';

export function iAm<Name extends string>(name: Name) {
   if (!name || typeof name !== 'string') {
      throw new TypeError(`"${name}" name parameter is invald.`);
   }

   return new IAmChain(name);
}
