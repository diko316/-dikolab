import type { AnyBoundary } from '../../boundary/types/utility.type';
import type { GoalModel } from './goal-model.interface';
export type AnyGoal = GoalModel<string, AnyBoundary>;
export type AnyGoalBoundTo<Boundary extends AnyBoundary> = GoalModel<string, Boundary>;
