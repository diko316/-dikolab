import { get } from '@dikolab/private-parts';
import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function getGoalTitle(goal) {
    return get(goal, TITLE_KEY);
}

export { getGoalTitle };
//# sourceMappingURL=get-goal-title.funciton.mjs.map
