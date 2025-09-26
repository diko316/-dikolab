import { IAmChain } from '../classes/iam-chain.class';
/**
 * A chain call to create Actor and attached roles
 *
 * @param name Actor name
 * @returns Chain declaration instance of Actor.
 */
export declare function iAm<Name extends string>(name: Name): IAmChain<Name>;
