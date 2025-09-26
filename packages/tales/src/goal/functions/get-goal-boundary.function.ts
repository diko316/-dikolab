import { get } from '@dikolab/private-parts';
import { BOUNDARY_KEY } from '../../utils/constants/symbol-keys.constant';
import { GoalBoundary } from '../types/goal-boundary.type';
import { AnyGoal } from '../types/utility.type';

export function getGoalBoundary<Goal extends AnyGoal>(
   goal: Goal,
): GoalBoundary<Goal> {
   return get(goal, BOUNDARY_KEY);
}
