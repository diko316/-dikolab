import { get, set } from '@dikolab/private-parts';
import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { defineActor } from '../../actor/functions/define-actor.function.mjs';

class IAmChain {
    get [TITLE_KEY]() {
        return get(this, TITLE_KEY);
    }
    constructor(actorName) {
        set(this, TITLE_KEY, actorName);
    }
    as(...roles) {
        return defineActor(this[TITLE_KEY], ...roles);
    }
}

export { IAmChain };
//# sourceMappingURL=iam-chain.class.mjs.map
