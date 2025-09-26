import { emitSymbolEvent } from '../../symbol/functions/emit-symbol-event.function.mjs';
import { Transaction } from '../../usecase/classes/transaction.class.mjs';
import { Actor } from '../../actor/classes/actor.class.mjs';

function assume(actor) {
    const transaction = new Transaction({}, actor);
    if (actor instanceof Actor) {
        emitSymbolEvent(actor, 'assume', actor);
    }
    return transaction;
}

export { assume };
//# sourceMappingURL=assume.function.mjs.map
