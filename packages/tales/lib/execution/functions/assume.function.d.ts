import { AnyActor } from '../../actor/types/utility.type';
import { Transaction } from '../../usecase/classes/transaction.class';
export declare function assume<Source extends AnyActor>(actor: Source): Transaction<{}, Source>;
