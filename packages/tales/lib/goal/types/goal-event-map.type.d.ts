import { AnyUsecase } from '../../usecase/types/utility.type';
import { AnyType } from '../../utils/types/utility.type';
import { AnyGoal } from './utility.type';
export type GoalEventMap = {
    achieved: [goal: AnyGoal, usecase: AnyUsecase, result: AnyType];
};
