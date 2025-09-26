import { AnyRole } from '../../actor/types/utility.type';
import { AnyGoal } from '../../goal/types/utility.type';
import { AnyType } from '../../utils/types/utility.type';
import { NotTransaction, TransactionLike } from './transaction-like.type';
import { TransactionModel } from './transaction-model.type';
import { UsecaseHandlerParameters, UsecaseHandlerResult } from './usecase-handler.type';
import { UsecaseModel } from './usecase-model.interface';
import { AnyUsecase } from './utility.type';
export type PerformParameters<Usecase extends AnyUsecase> = UsecaseHandlerParameters<Usecase> extends [
    ...infer Others,
    TransactionLike
] ? Others : UsecaseHandlerParameters<Usecase>;
export type PerformAwaitedResult<Usecase extends AnyUsecase> = Awaited<UsecaseHandlerResult<Usecase>>;
export type PerformUsecase<Data extends object> = UsecaseModel<string, readonly AnyRole[], (...args: [...NotTransaction[], TransactionModel<Data>] | [...NotTransaction[]] | [NotTransaction] | [TransactionModel<Data>] | []) => AnyType, AnyGoal>;
