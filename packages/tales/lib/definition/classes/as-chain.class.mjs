import { get, set } from '@dikolab/private-parts';
import { BOUNDARY_KEY, ROLE_NAMES_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { AsICanChain } from './as-i-can-chain.class.mjs';

class AsChain {
    get [BOUNDARY_KEY]() {
        return get(this, BOUNDARY_KEY);
    }
    get [ROLE_NAMES_KEY]() {
        return get(this, ROLE_NAMES_KEY);
    }
    constructor(boundary, roleNames) {
        set(this, BOUNDARY_KEY, boundary);
        set(this, ROLE_NAMES_KEY, roleNames);
    }
    /**
     * Declares text title of the Use-case.
     *
     * @param title Text title of the Use-case
     * @returns declaration chain
     */
    iCan(title) {
        return new AsICanChain(this[BOUNDARY_KEY], this[ROLE_NAMES_KEY], title);
    }
}

export { AsChain };
//# sourceMappingURL=as-chain.class.mjs.map
