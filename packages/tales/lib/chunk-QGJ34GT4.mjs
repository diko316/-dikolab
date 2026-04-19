import {
  EVENT_EMITTER_KEY
} from "./chunk-BPBUJ4OC.mjs";

// src/symbol/functions/listen-symbol-event.function.ts
function listenSymbolEvent(symbol, type, listener) {
  symbol[EVENT_EMITTER_KEY].on(type, listener);
}

export {
  listenSymbolEvent
};
//# sourceMappingURL=chunk-QGJ34GT4.mjs.map
