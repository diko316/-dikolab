import { get, set } from '@dikolab/private-parts';
import { TRANSACTION_SIGNATURE, ACTOR_KEY, TRANSACTION_SESSION, ROLES_KEY, HANDLER_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { isActorAllowToPerform } from '../functions/is-actor-allow-to-perform.function.mjs';
import { createSessionData } from '../functions/create-session-data.function.mjs';

class Transaction {
    [TRANSACTION_SIGNATURE] = 1;
    get [ACTOR_KEY]() {
        return get(this, ACTOR_KEY);
    }
    get [TRANSACTION_SESSION]() {
        return get(this, TRANSACTION_SESSION);
    }
    constructor(data, actor) {
        set(this, TRANSACTION_SESSION, data);
        set(this, ACTOR_KEY, actor);
    }
    get(name) {
        const session = this[TRANSACTION_SESSION];
        return Object.prototype.hasOwnProperty.call(session, name)
            ? session[name]
            : undefined;
    }
    override(overrides) {
        const session = this[TRANSACTION_SESSION];
        const newData = Object.assign({}, session, overrides);
        return new Transaction(newData, this[ACTOR_KEY]);
    }
    async perform(usecase, ...params) {
        const roles = usecase[ROLES_KEY];
        const actor = this[ACTOR_KEY];
        if (!isActorAllowToPerform(actor, roles)) {
            throw new Error(`${this[ACTOR_KEY]} is not allowed to perform "${usecase}"`);
        }
        const handler = usecase[HANDLER_KEY];
        const transaction = new Transaction(createSessionData(this[TRANSACTION_SESSION]), actor);
        const result = await handler(...params, transaction);
        return result;
    }
}

export { Transaction };
//# sourceMappingURL=transaction.class.mjs.map
