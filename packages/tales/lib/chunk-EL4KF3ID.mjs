import {
  createSymbolId
} from "./chunk-IU7WS2GT.mjs";
import {
  SYMBOL_LOOKUP
} from "./chunk-EHWJHZXL.mjs";

// src/symbol/functions/get-symbol-by-id.function.ts
function getSymbolById(typeOrId, name) {
  const fullId = typeof name === "string" ? createSymbolId(typeOrId, name) : createSymbolId(typeOrId);
  if (SYMBOL_LOOKUP.has(fullId)) {
    return SYMBOL_LOOKUP.get(fullId);
  }
  return null;
}

export {
  getSymbolById
};
//# sourceMappingURL=chunk-EL4KF3ID.mjs.map
