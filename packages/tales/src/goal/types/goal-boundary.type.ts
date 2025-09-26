import { GoalModel } from './goal-model.interface';
import { AnyGoal } from './utility.type';

export type GoalBoundary<Goal extends AnyGoal> =
   Goal extends GoalModel<string, infer Boundary> ? Boundary : never;
