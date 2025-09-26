import { getRoleName } from '../../actor/functions/get-role-name.function';
import {
   AnyRole,
   StringifyRoles,
} from '../../actor/types/utility.type';
import { getBoundaryName } from '../../boundary/functions/get-boundary-name.function';
import { getGoalBoundary } from '../../goal/functions/get-goal-boundary.function';

import { getGoalTitle } from '../../goal/functions/get-goal-title.funciton';
import { AnyGoal } from '../../goal/types/utility.type';
import { UsecaseTitleFrom } from '../types/usecase-title-from.type';

export function createUsecaseTitle<
   Title extends string,
   Roles extends readonly AnyRole[],
   Goal extends AnyGoal,
>(
   title: Title,
   goal: Goal,
   ...roles: Roles
): UsecaseTitleFrom<Title, Roles, Goal> {
   const rolesNames = roles
      .map((role) => getRoleName(role))
      .join(',') as StringifyRoles<Roles>;

   const goalTitle = getGoalTitle(goal);

   const boundaryName = getBoundaryName(getGoalBoundary(goal));

   return `As Role<${rolesNames}>, I can ${title} in ${boundaryName}. So that, ${goalTitle}`;
}
