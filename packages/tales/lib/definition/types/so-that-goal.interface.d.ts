import { AnyBoundary } from '../../boundary/types/utility.type';
import { AnyGoalBoundTo } from '../../goal/types/utility.type';
import { GoalDefined } from './goal-defined.interface';
export interface SoThatGoal<Boundary extends AnyBoundary> {
    soThat<Goal extends AnyGoalBoundTo<Boundary>>(goal: Goal): GoalDefined<Goal>;
}
