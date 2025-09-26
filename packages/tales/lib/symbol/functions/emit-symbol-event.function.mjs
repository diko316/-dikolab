import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

/**
 * Disptaches Target Symbol event.
 *
 * @param symbol Target symbol. may be one of the following: Actor,
 * Role, Usecase, Goal, Boundary
 * @param type Event type
 * @param args Parameters of the dispatched event.
 */
function emitSymbolEvent(symbol, type, ...args) {
    symbol[EVENT_EMITTER_KEY].emit(type, ...args);
}

export { emitSymbolEvent };
//# sourceMappingURL=emit-symbol-event.function.mjs.map
