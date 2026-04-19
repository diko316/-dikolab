import type { AnyGoal } from '../../goal/types/utility.type';
import type { GOAL_KEY } from '../../utils/constants/symbol-keys.constant';
export interface GoalDefined<Goal extends AnyGoal> {
    readonly [GOAL_KEY]: Goal;
}
