import { get, set } from '@dikolab/private-parts';
import { BOUNDARY_KEY, ROLE_NAMES_KEY, TITLE_KEY, GOAL_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { getOrDefineRoles } from '../../actor/functions/get-or-define-roles.function.mjs';
import { defineUsecase } from '../../usecase/functions/define-usecase.function.mjs';

class AsICanSoThatChain {
    // InBoundary
    get [BOUNDARY_KEY]() {
        return get(this, BOUNDARY_KEY);
    }
    get [ROLE_NAMES_KEY]() {
        return get(this, ROLE_NAMES_KEY);
    }
    get [TITLE_KEY]() {
        return get(this, TITLE_KEY);
    }
    get [GOAL_KEY]() {
        return get(this, GOAL_KEY);
    }
    constructor(boundary, roleNames, title, goal) {
        set(this, BOUNDARY_KEY, boundary);
        set(this, ROLE_NAMES_KEY, roleNames);
        set(this, TITLE_KEY, title);
        set(this, GOAL_KEY, goal);
    }
    /**
     * Attaches handler function to be executed when Use-case is performed.
     *
     * @param handler Use-case execution handler function.
     * @returns Usecase
     */
    implementedAs(handler) {
        const roles = getOrDefineRoles(...this[ROLE_NAMES_KEY]);
        const title = this[TITLE_KEY];
        const goal = this[GOAL_KEY];
        return defineUsecase(title, roles, goal, handler);
    }
}

export { AsICanSoThatChain };
//# sourceMappingURL=as-i-can-so-that-chain.class.mjs.map
