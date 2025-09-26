import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

function listenSymbolEvent(symbol, type, listener) {
    symbol[EVENT_EMITTER_KEY].on(type, listener);
}

export { listenSymbolEvent };
//# sourceMappingURL=listen-symbol-event.function.mjs.map
