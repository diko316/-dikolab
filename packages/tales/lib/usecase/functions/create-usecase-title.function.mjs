import { getRoleName } from '../../actor/functions/get-role-name.function.mjs';
import { getBoundaryName } from '../../boundary/functions/get-boundary-name.function.mjs';
import { getGoalBoundary } from '../../goal/functions/get-goal-boundary.function.mjs';
import { getGoalTitle } from '../../goal/functions/get-goal-title.funciton.mjs';

function createUsecaseTitle(title, goal, ...roles) {
    const rolesNames = roles
        .map((role) => getRoleName(role))
        .join(',');
    const goalTitle = getGoalTitle(goal);
    const boundaryName = getBoundaryName(getGoalBoundary(goal));
    return `As Role<${rolesNames}>, I can ${title} in ${boundaryName}. So that, ${goalTitle}`;
}

export { createUsecaseTitle };
//# sourceMappingURL=create-usecase-title.function.mjs.map
