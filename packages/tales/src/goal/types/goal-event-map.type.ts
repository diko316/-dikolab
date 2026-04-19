import type { AnyUsecase } from '../../usecase/types/utility.type';
import type { AnyType } from '../../utils/types/utility.type';
import type { AnyGoal } from './utility.type';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type GoalEventMap = {
   achieved: [goal: AnyGoal, usecase: AnyUsecase, result: AnyType];
};
