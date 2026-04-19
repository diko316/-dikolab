import { get } from '@dikolab/private-parts';
import { TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import type { GoalTitle } from '../types/goal-title.type';
import type { AnyGoal } from '../types/utility.type';

export function getGoalTitle<Goal extends AnyGoal>(
   goal: Goal,
): GoalTitle<Goal> {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return get(goal, TITLE_KEY);
}
