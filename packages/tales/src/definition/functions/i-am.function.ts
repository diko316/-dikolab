import { IAmChain } from '../classes/iam-chain.class';

/**
 * A chain call to create Actor and attached roles
 *
 * @param name Actor name
 * @returns Chain declaration instance of Actor.
 */
export function iAm<Name extends string>(name: Name) {
   if (!name || typeof name !== 'string') {
      throw new TypeError(`"${name}" name parameter is invald.`);
   }

   return new IAmChain(name);
}
