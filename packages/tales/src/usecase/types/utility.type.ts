import { AnyRole } from '../../actor/types/utility.type';
import { AnyGoal } from '../../goal/types/utility.type';
import { AnyFunction } from '../../utils/types/utility.type';
import { UsecaseModel } from './usecase-model.interface';

export type AnyUsecase = UsecaseModel<
   string,
   readonly AnyRole[],
   AnyFunction,
   AnyGoal
>;
