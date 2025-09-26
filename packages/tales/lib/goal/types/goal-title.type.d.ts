import { AnyBoundary } from '../../boundary/types/utility.type';
import { GoalModel } from './goal-model.interface';
import { AnyGoal } from './utility.type';
export type GoalTitle<Goal extends AnyGoal> = Goal extends GoalModel<infer Title, AnyBoundary> ? Title : 'Undecided.';
