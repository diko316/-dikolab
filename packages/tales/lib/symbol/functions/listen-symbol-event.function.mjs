import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

/**
 * Listens to Symbol events
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event type
 * @param listener the function callback to execute when event is dispatched.
 */
function listenSymbolEvent(symbol, type, listener) {
    symbol[EVENT_EMITTER_KEY].on(type, listener);
}

export { listenSymbolEvent };
//# sourceMappingURL=listen-symbol-event.function.mjs.map
