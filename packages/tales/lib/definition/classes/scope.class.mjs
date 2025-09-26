import { get, set } from '@dikolab/private-parts';
import { BOUNDARY_KEY, NAME_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { defineGoal } from '../../goal/functions/define-goal.function.mjs';
import { Role } from '../../actor/classes/role.class.mjs';
import { AsChain } from './as-chain.class.mjs';

class Scope {
    get [BOUNDARY_KEY]() {
        return get(this, BOUNDARY_KEY);
    }
    constructor(boundary) {
        set(this, BOUNDARY_KEY, boundary);
    }
    defineGoal(title) {
        return defineGoal(title, this[BOUNDARY_KEY]);
    }
    /**
     * Creates definition of Roles that can execute the Use-case
     *
     * @param roles Role names or Roles included in the context
     * @returns definition chain object
     */
    as(...roles) {
        const roleNames = roles.map((roleOrName) => {
            if (typeof roleOrName === 'string') {
                return roleOrName;
            }
            if (roleOrName instanceof Role) {
                return roleOrName[NAME_KEY];
            }
            throw new TypeError(`Role parameter ${roleOrName} is invalid.`);
        });
        return new AsChain(this[BOUNDARY_KEY], roleNames);
    }
}

export { Scope };
//# sourceMappingURL=scope.class.mjs.map
