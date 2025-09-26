import { IAmChain } from '../classes/iam-chain.class.mjs';

function iAm(name) {
    if (!name || typeof name !== 'string') {
        throw new TypeError(`"${name}" name parameter is invald.`);
    }
    return new IAmChain(name);
}

export { iAm };
//# sourceMappingURL=i-am.function.mjs.map
