import { AnyRole } from '../../actor/types/utility.type';
import { AnyGoal } from '../../goal/types/utility.type';
import { AnyType } from '../../utils/types/utility.type';
import { UsecaseModel } from './usecase-model.interface';
import { AnyUsecase } from './utility.type';
export type UsecaseHandler<Usecase extends AnyUsecase> = Usecase extends UsecaseModel<string, readonly AnyRole[], infer Handler, AnyGoal> ? Handler : never;
export type UsecaseHandlerParameters<Usecase extends AnyUsecase> = UsecaseHandler<Usecase> extends (...args: infer Parameters) => AnyType ? Parameters : [];
export type UsecaseHandlerResult<Usecase extends AnyUsecase> = ReturnType<UsecaseHandler<Usecase>>;
