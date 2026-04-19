import type { AnyRole } from '../../actor/types/utility.type';
import type { AnyGoal } from '../../goal/types/utility.type';
import type { AnyFunction } from '../../utils/types/utility.type';
import type { UsecaseModel } from './usecase-model.interface';
export type AnyUsecase = UsecaseModel<string, readonly AnyRole[], AnyFunction, AnyGoal>;
