import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class.mjs';
import { USECASE_TYPE } from '../../utils/constants/symbol-tag.constant.mjs';
import { TITLE_KEY, ROLES_KEY, GOAL_KEY, HANDLER_KEY, BOUNDARY_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { createUsecaseTitle } from '../functions/create-usecase-title.function.mjs';
import { getSymbolName } from '../../symbol/functions/get-symbol-name.function.mjs';

class Usecase extends UsecaseSymbol {
    get [TITLE_KEY]() {
        return get(this, TITLE_KEY);
    }
    get [ROLES_KEY]() {
        return get(this, ROLES_KEY);
    }
    get [GOAL_KEY]() {
        return get(this, GOAL_KEY);
    }
    get [HANDLER_KEY]() {
        return get(this, HANDLER_KEY);
    }
    get [BOUNDARY_KEY]() {
        return get(this[GOAL_KEY], BOUNDARY_KEY);
    }
    constructor(title, roles, goal, handler) {
        super(USECASE_TYPE, createUsecaseTitle(title, goal, ...roles));
        set(this, TITLE_KEY, title);
        set(this, ROLES_KEY, roles);
        set(this, HANDLER_KEY, handler);
        set(this, GOAL_KEY, goal);
    }
    toString() {
        return getSymbolName(this);
    }
}

export { Usecase };
//# sourceMappingURL=usecase.class.mjs.map
