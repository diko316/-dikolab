import { get } from '@dikolab/private-parts';
import { BOUNDARY_KEY } from '../../utils/constants/symbol-keys.constant';
import type { GoalBoundary } from '../types/goal-boundary.type';
import type { AnyGoal } from '../types/utility.type';

export function getGoalBoundary<Goal extends AnyGoal>(
   goal: Goal,
): GoalBoundary<Goal> {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return get(goal, BOUNDARY_KEY);
}
