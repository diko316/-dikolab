import { GoalTitle } from '../types/goal-title.type';
import { AnyGoal } from '../types/utility.type';
export declare function getGoalTitle<Goal extends AnyGoal>(goal: Goal): GoalTitle<Goal>;
