import { AnyActor } from '../../actor/types/utility.type';
import { emitSymbolEvent } from '../../symbol/functions/emit-symbol-event.function';
import { Transaction } from '../../usecase/classes/transaction.class';

import { Actor } from '../../actor/classes/actor.class';

/**
 * Assumes actor to perform allowed Use-case based on Roles.
 *
 * @param actor Actor to assume for later perform Use-case
 * @returns Transaction
 */
export function assume<Source extends AnyActor>(actor: Source) {
   const transaction = new Transaction({}, actor);

   if (actor instanceof Actor) {
      emitSymbolEvent(actor, 'assume', actor);
   }

   return transaction;
}
