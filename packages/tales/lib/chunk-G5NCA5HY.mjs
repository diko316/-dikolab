import {
  EVENT_EMITTER_KEY
} from "./chunk-BPBUJ4OC.mjs";

// src/symbol/functions/emit-symbol-event.function.ts
function emitSymbolEvent(symbol, type, ...args) {
  symbol[EVENT_EMITTER_KEY].emit(type, ...args);
}

export {
  emitSymbolEvent
};
//# sourceMappingURL=chunk-G5NCA5HY.mjs.map
