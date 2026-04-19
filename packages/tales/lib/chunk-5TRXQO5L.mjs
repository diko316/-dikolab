import {
  SYMBOL_LOOKUP
} from "./chunk-EHWJHZXL.mjs";
import {
  createSymbolId
} from "./chunk-IU7WS2GT.mjs";

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
//# sourceMappingURL=chunk-5TRXQO5L.mjs.map
