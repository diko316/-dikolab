import {
  NULL,
  UNDEFINED
} from "./chunk-DZZ66UJO.mjs";

// src/type-checking/functions/signature.function.ts
var toString = Object.prototype.toString;
function signature(subject) {
  if (subject === void 0) {
    return UNDEFINED;
  }
  if (subject === null || typeof subject === "number" && !isFinite(subject)) {
    return NULL;
  }
  return toString.call(subject);
}

export {
  signature
};
//# sourceMappingURL=chunk-HJNVEGFY.mjs.map
