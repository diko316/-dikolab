import { get } from '@dikolab/private-parts';
import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { GoalTitle } from '../types/goal-title.type';
import { AnyGoal } from '../types/utility.type';

export function getGoalTitle<Goal extends AnyGoal>(
   goal: Goal,
): GoalTitle<Goal> {
   return get(goal, TITLE_KEY);
}
