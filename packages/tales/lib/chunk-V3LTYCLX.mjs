import {
  SYMBOL_LOOKUP
} from "./chunk-EHWJHZXL.mjs";
import {
  EVENT_EMITTER_KEY
} from "./chunk-BPBUJ4OC.mjs";

// src/symbol/functions/clear-all-symbol-event-listeners.function.ts
function clearAllSymbolListeners() {
  let eventEmitter;
  SYMBOL_LOOKUP.forEach((symbol) => {
    eventEmitter = symbol[EVENT_EMITTER_KEY];
    eventEmitter.eventNames().forEach((key) => eventEmitter?.removeAllListeners(key));
  });
  eventEmitter = null;
}

export {
  clearAllSymbolListeners
};
//# sourceMappingURL=chunk-V3LTYCLX.mjs.map
