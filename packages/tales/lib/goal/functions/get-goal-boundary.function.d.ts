import { GoalBoundary } from '../types/goal-boundary.type';
import { AnyGoal } from '../types/utility.type';
export declare function getGoalBoundary<Goal extends AnyGoal>(goal: Goal): GoalBoundary<Goal>;
