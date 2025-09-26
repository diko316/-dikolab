import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';
import { SYMBOL_LOOKUP } from '../constants/symbol-lookup.constant.mjs';

/**
 * Clears all event listeners of all Symbols.
 * Target symbols. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 */
function clearAllSymbolListeners() {
    let eventEmitter;
    SYMBOL_LOOKUP.forEach((symbol) => {
        eventEmitter = symbol[EVENT_EMITTER_KEY];
        eventEmitter
            .eventNames()
            .forEach((key) => eventEmitter?.removeAllListeners(key));
    });
    eventEmitter = null;
}

export { clearAllSymbolListeners };
//# sourceMappingURL=clear-all-symbol-event-listeners.function.mjs.map
