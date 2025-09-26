import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

function unlistenSymbolEvent(symbol, type, listener) {
    symbol[EVENT_EMITTER_KEY].removeListener(type, listener);
}

export { unlistenSymbolEvent };
//# sourceMappingURL=unlisten-symbol-event.function.mjs.map
