import { get } from '@dikolab/private-parts';
import { BOUNDARY_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function getGoalBoundary(goal) {
    return get(goal, BOUNDARY_KEY);
}

export { getGoalBoundary };
//# sourceMappingURL=get-goal-boundary.function.mjs.map
