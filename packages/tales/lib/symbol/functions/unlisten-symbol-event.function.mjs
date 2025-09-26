import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

/**
 * Removes event listener registered in the Target symbol
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event Name
 * @param listener The registered event listener callback function.
 */
function unlistenSymbolEvent(symbol, type, listener) {
    symbol[EVENT_EMITTER_KEY].removeListener(type, listener);
}

export { unlistenSymbolEvent };
//# sourceMappingURL=unlisten-symbol-event.function.mjs.map
