import { get, set } from '@dikolab/private-parts';
import { TRANSACTION_SIGNATURE, ACTOR_KEY, TRANSACTION_SESSION, ROLES_KEY, MOCK_HANDLER_KEY, HANDLER_KEY, GOAL_KEY } from '../../utils/constants/symbol-keys.constant.mjs';
import { isActorAllowToPerform } from '../functions/is-actor-allow-to-perform.function.mjs';
import { createSessionData } from '../functions/create-session-data.function.mjs';
import { emitSymbolEvent } from '../../symbol/functions/emit-symbol-event.function.mjs';

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
    /**
     * Retrieves Session data based from "name" key parameter.
     *
     * @param name Key of session data
     * @returns value of store session data. Or, undefined if not found
     */
    get(name) {
        const session = this[TRANSACTION_SESSION];
        return Object.prototype.hasOwnProperty.call(session, name)
            ? session[name]
            : undefined;
    }
    /**
     * Creates new transaction with overridden Session data
     *
     * @param overrides session data overrides
     * @returns Transaction
     */
    override(overrides) {
        const session = this[TRANSACTION_SESSION];
        const newData = Object.assign({}, session, overrides);
        return new Transaction(newData, this[ACTOR_KEY]);
    }
    /**
     * Performs a Use-case and returns result of the Use-case handler.
     *
     * @param usecase The Use-case to perform allowed by Roles
     * @param params Use case handler parameters
     * @returns Result of perform Use-case
     */
    async perform(usecase, ...params) {
        const roles = usecase[ROLES_KEY];
        const actor = this[ACTOR_KEY];
        if (!isActorAllowToPerform(actor, roles)) {
            throw new Error(`${this[ACTOR_KEY]} is not allowed to perform "${usecase}"`);
        }
        // if no mock handler, use the original handler
        const handler = (usecase[MOCK_HANDLER_KEY] ||
            usecase[HANDLER_KEY]);
        const transaction = new Transaction(createSessionData(this[TRANSACTION_SESSION]), actor);
        const result = await handler(...params, transaction);
        emitSymbolEvent(usecase, 'perform', result, usecase, actor);
        const goal = usecase[GOAL_KEY];
        emitSymbolEvent(goal, 'achieved', goal, usecase, result);
        return result;
    }
}

export { Transaction };
//# sourceMappingURL=transaction.class.mjs.map
