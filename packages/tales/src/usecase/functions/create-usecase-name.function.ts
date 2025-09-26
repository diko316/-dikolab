import { getActionName } from '../../action/functions/get-action-name.function';
import { AnyAction } from '../../action/types/utility.type';
import { getBoundaryName } from '../../boundary/functions/get-boundary-name.function';
import { getGoalBoundary } from '../../goal/functions/get-goal-boundary.function';
import { getGoalTitle } from '../../goal/functions/get-goal-title.funciton';
import { AnyGoal } from '../../goal/types/utility.type';
import { UsecaseNameFromActionAndGoal } from '../types/usecase-name-from.type';

export function createUsecaseName<
   Action extends AnyAction,
   Goal extends AnyGoal,
>(action: Action, goal: Goal) {
   const actionName = getActionName(action);
   const boundary = getGoalBoundary(goal);
   const boundaryName = getBoundaryName(boundary);
   const goalTitle = getGoalTitle(goal);

   return `${actionName} in ${boundaryName}. So that, ${goalTitle}` as UsecaseNameFromActionAndGoal<
      Action,
      Goal
   >;
}
