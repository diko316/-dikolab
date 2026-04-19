import type { AnyBoundary } from '../../boundary/types/utility.type';
import type { GoalModel } from './goal-model.interface';
import type { AnyGoal } from './utility.type';

export type GoalTitle<Goal extends AnyGoal> =
   Goal extends GoalModel<infer Title, AnyBoundary>
      ? Title
      : 'Undecided.';
