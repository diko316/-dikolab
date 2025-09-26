import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

function emitSymbolEvent(symbol, type, ...args) {
    symbol[EVENT_EMITTER_KEY].emit(type, ...args);
}

export { emitSymbolEvent };
//# sourceMappingURL=emit-symbol-event.function.mjs.map
