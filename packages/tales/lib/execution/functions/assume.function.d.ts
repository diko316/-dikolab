import { AnyActor } from '../../actor/types/utility.type';
import { Transaction } from '../../usecase/classes/transaction.class';
/**
 * Assumes actor to perform allowed Use-case based on Roles.
 *
 * @param actor Actor to assume for later perform Use-case
 * @returns Transaction
 */
export declare function assume<Source extends AnyActor>(actor: Source): Transaction<{}, Source>;
