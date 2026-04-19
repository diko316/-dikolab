import {
  EVENT_EMITTER_KEY
} from "./chunk-BPBUJ4OC.mjs";

// src/event/functions/unlisten-symbol-event.function.ts
function unlistenSymbolEvent(symbol, type, listener) {
  symbol[EVENT_EMITTER_KEY].removeListener(type, listener);
}

export {
  unlistenSymbolEvent
};
//# sourceMappingURL=chunk-YN2TL7K2.mjs.map
