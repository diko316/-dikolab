import type { AnyBoundary } from '../../boundary/types/utility.type';
import type { AnyGoalBoundTo } from '../../goal/types/utility.type';
import type { GoalDefined } from './goal-defined.interface';
export interface SoThatGoal<Boundary extends AnyBoundary> {
    soThat<Goal extends AnyGoalBoundTo<Boundary>>(goal: Goal): GoalDefined<Goal>;
}
