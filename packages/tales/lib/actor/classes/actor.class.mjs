import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class.mjs';
import { ROLES_KEY, NAME_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { ACTOR_TYPE } from '../../utils/constants/symbol-tag.constant.mjs';

class Actor extends UsecaseSymbol {
    get [ROLES_KEY]() {
        return get(this, ROLES_KEY);
    }
    constructor(name, roles) {
        super(ACTOR_TYPE, name);
        set(this, ROLES_KEY, roles);
    }
    toJSON() {
        const roles = this[ROLES_KEY].map((role) => role[NAME_KEY]);
        return {
            ...super.toJSON(),
            roles: roles,
        };
    }
}

export { Actor };
//# sourceMappingURL=actor.class.mjs.map
