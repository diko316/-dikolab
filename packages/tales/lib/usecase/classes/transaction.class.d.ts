import { ACTOR_KEY, TRANSACTION_SESSION, TRANSACTION_SIGNATURE } from '../../utils/constants/symbol-keys.constant';
import { TransactionModel } from '../types/transaction-model.type';
import { PerformParameters, PerformAwaitedResult, PerformUsecase } from '../types/performer.type';
import { AnyActor } from '../../actor/types/utility.type';
export declare class Transaction<Data extends object, Actor extends AnyActor = AnyActor> implements TransactionModel<Data> {
    readonly [TRANSACTION_SIGNATURE] = 1;
    get [ACTOR_KEY](): Actor;
    get [TRANSACTION_SESSION](): Readonly<Data>;
    constructor(data: Data, actor: Actor);
    get<Key extends keyof Data>(name: Key): Data[Key] | undefined;
    override<Overrides extends object>(overrides: Overrides): Transaction<Data & Overrides>;
    perform<Usecase extends PerformUsecase<Data>>(usecase: Usecase, ...params: PerformParameters<Usecase>): Promise<PerformAwaitedResult<Usecase>>;
}
