import type { AnyUsecase } from '../../usecase/types/utility.type';
import type { AnyType } from '../../utils/types/utility.type';
import type { AnyGoal } from './utility.type';
export type GoalEventMap = {
    achieved: [goal: AnyGoal, usecase: AnyUsecase, result: AnyType];
};
