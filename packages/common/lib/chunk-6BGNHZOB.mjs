import {
  ARRAY
} from "./chunk-DZZ66UJO.mjs";

// src/type-checking/functions/is-array.function.ts
var toString = Object.prototype.toString;
function isArray(subject, notEmpty = false) {
  return toString.call(subject) === ARRAY && (!notEmpty || subject.length !== 0);
}

export {
  isArray
};
//# sourceMappingURL=chunk-6BGNHZOB.mjs.map
