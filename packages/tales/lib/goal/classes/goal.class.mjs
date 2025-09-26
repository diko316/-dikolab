import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class.mjs';
import { GOAL_TYPE } from '../../utils/constants/symbol-tag.constant.mjs';
import { TITLE_KEY, BOUNDARY_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { createGoalName } from '../functions/create-goal-name.function.mjs';

class Goal extends UsecaseSymbol {
    get [TITLE_KEY]() {
        return get(this, TITLE_KEY);
    }
    get [BOUNDARY_KEY]() {
        return get(this, BOUNDARY_KEY);
    }
    constructor(title, boundary) {
        super(GOAL_TYPE, createGoalName(title, boundary));
        set(this, TITLE_KEY, title);
        set(this, BOUNDARY_KEY, boundary);
    }
}

export { Goal };
//# sourceMappingURL=goal.class.mjs.map
