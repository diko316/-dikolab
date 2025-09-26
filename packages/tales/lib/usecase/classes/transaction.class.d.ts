import { ACTOR_KEY, TRANSACTION_SESSION, TRANSACTION_SIGNATURE } from '../../utils/constants/symbol-keys.constant';
import { TransactionModel } from '../types/transaction-model.type';
import { PerformParameters, PerformAwaitedResult, PerformUsecase } from '../types/performer.type';
import { AnyActor } from '../../actor/types/utility.type';
export declare class Transaction<Data extends object, Actor extends AnyActor = AnyActor> implements TransactionModel<Data> {
    readonly [TRANSACTION_SIGNATURE] = 1;
    get [ACTOR_KEY](): Actor;
    get [TRANSACTION_SESSION](): Readonly<Data>;
    constructor(data: Data, actor: Actor);
    /**
     * Retrieves Session data based from "name" key parameter.
     *
     * @param name Key of session data
     * @returns value of store session data. Or, undefined if not found
     */
    get<Key extends keyof Data>(name: Key): Data[Key] | undefined;
    /**
     * Creates new transaction with overridden Session data
     *
     * @param overrides session data overrides
     * @returns Transaction
     */
    override<Overrides extends object>(overrides: Overrides): Transaction<Data & Overrides>;
    /**
     * Performs a Use-case and returns result of the Use-case handler.
     *
     * @param usecase The Use-case to perform allowed by Roles
     * @param params Use case handler parameters
     * @returns Result of perform Use-case
     */
    perform<Usecase extends PerformUsecase<Data>>(usecase: Usecase, ...params: PerformParameters<Usecase>): Promise<PerformAwaitedResult<Usecase>>;
}
