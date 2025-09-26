import { get, set } from '@dikolab/private-parts';
import { BOUNDARY_KEY, ROLE_NAMES_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { AsICanSoThatChain } from './as-i-can-so-that-chain.class.mjs';

class AsICanChain {
    get [BOUNDARY_KEY]() {
        return get(this, BOUNDARY_KEY);
    }
    get [ROLE_NAMES_KEY]() {
        return get(this, ROLE_NAMES_KEY);
    }
    get [TITLE_KEY]() {
        return get(this, TITLE_KEY);
    }
    constructor(boundary, roleNames, title) {
        set(this, BOUNDARY_KEY, boundary);
        set(this, ROLE_NAMES_KEY, roleNames);
        set(this, TITLE_KEY, title);
    }
    /**
     * Assigns Goal of the Use-case
     *
     * @param goal The goal of the Use-case.
     * @returns declaration chain
     */
    soThat(goal) {
        return new AsICanSoThatChain(this[BOUNDARY_KEY], this[ROLE_NAMES_KEY], this[TITLE_KEY], goal);
    }
}

export { AsICanChain };
//# sourceMappingURL=as-i-can-chain.class.mjs.map
