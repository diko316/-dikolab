import { AnyGoal } from '../../goal/types/utility.type';
import { GOAL_KEY } from '../../utils/constants/symbol-keys.constant';

export interface GoalDefined<Goal extends AnyGoal> {
   readonly [GOAL_KEY]: Goal;
}
