import { EVENT_EMITTER_KEY } from '../../event/constants/event-keys.mjs';

function clearSymbolEventListeners(symbol, type) {
    symbol[EVENT_EMITTER_KEY].removeAllListeners(type);
}

export { clearSymbolEventListeners };
//# sourceMappingURL=clear-symbol-event-listeners.function.mjs.map
