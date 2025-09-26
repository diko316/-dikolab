import { TRANSACTION_SESSION } from '../../utils/constants/symbol-keys.constant';
import { AnyUsecase } from './utility.type';
import { TransactionLike } from './transaction-like.type';
import { PerformAwaitedResult, PerformParameters } from './performer.type';
export interface TransactionModel<Data extends object> extends TransactionLike {
    readonly [TRANSACTION_SESSION]: Readonly<Data>;
    get<Key extends keyof Data>(name: Key): Data[Key] | undefined;
    override<Overrides extends object>(overrides: Overrides): TransactionModel<Data & Overrides>;
    perform<Usecase extends AnyUsecase>(usecase: Usecase, ...params: PerformParameters<Usecase>): Promise<PerformAwaitedResult<Usecase>>;
}
