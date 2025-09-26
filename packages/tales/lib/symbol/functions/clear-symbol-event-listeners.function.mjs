import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

/**
 * Removes all event listeners of the Target symbol registered for event type.
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event Name
 */
function clearSymbolEventListeners(symbol, type) {
    symbol[EVENT_EMITTER_KEY].removeAllListeners(type);
}

export { clearSymbolEventListeners };
//# sourceMappingURL=clear-symbol-event-listeners.function.mjs.map
