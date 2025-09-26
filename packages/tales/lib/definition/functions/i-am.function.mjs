import { IAmChain } from '../classes/iam-chain.class.mjs';

/**
 * A chain call to create Actor and attached roles
 *
 * @param name Actor name
 * @returns Chain declaration instance of Actor.
 */
function iAm(name) {
    if (!name || typeof name !== 'string') {
        throw new TypeError(`"${name}" name parameter is invald.`);
    }
    return new IAmChain(name);
}

export { iAm };
//# sourceMappingURL=i-am.function.mjs.map
