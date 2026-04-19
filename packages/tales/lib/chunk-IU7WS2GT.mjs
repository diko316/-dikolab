// src/symbol/functions/create-symbol-id.function.ts
function createSymbolId(typeOrId, name) {
  if (typeof name === "string") {
    return `${typeOrId}<${name}>`;
  }
  return typeOrId;
}

export {
  createSymbolId
};
//# sourceMappingURL=chunk-IU7WS2GT.mjs.map
