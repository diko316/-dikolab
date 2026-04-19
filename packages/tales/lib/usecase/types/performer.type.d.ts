import type { AnyRole } from '../../actor/types/utility.type';
import type { AnyGoal } from '../../goal/types/utility.type';
import type { AnyType } from '../../utils/types/utility.type';
import type { NotTransaction, TransactionLike } from './transaction-like.type';
import type { TransactionModel } from './transaction-model.type';
import type { UsecaseHandlerParameters, UsecaseHandlerResult } from './usecase-handler.type';
import type { UsecaseModel } from './usecase-model.interface';
import type { AnyUsecase } from './utility.type';
export type PerformParameters<Usecase extends AnyUsecase> = UsecaseHandlerParameters<Usecase> extends [
    ...infer Others,
    TransactionLike
] ? Others : UsecaseHandlerParameters<Usecase>;
export type PerformAwaitedResult<Usecase extends AnyUsecase> = Awaited<UsecaseHandlerResult<Usecase>>;
export type PerformUsecase<Data extends object> = UsecaseModel<string, readonly AnyRole[], (...args: [...NotTransaction[], TransactionModel<Data>] | [...NotTransaction[]] | [NotTransaction] | [TransactionModel<Data>] | []) => AnyType, AnyGoal>;
