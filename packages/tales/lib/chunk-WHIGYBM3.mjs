import {
  EVENT_EMITTER_KEY
} from "./chunk-BPBUJ4OC.mjs";

// src/event/functions/listen-symbol-event.function.ts
function listenSymbolEvent(symbol, type, listener) {
  symbol[EVENT_EMITTER_KEY].on(type, listener);
}

export {
  listenSymbolEvent
};
//# sourceMappingURL=chunk-WHIGYBM3.mjs.map
