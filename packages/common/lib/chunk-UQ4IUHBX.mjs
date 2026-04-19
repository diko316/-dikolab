import {
  each,
  isValidObject
} from "./chunk-Z6T5S4RH.mjs";
import {
  isArray
} from "./chunk-6BGNHZOB.mjs";

// src/object/functions/max-object-index.function.ts
var ARRAY_INDEX_RE = /^[1-9][0-9]*|0$/;
function onMaxNumericIndex(_value, name, _subject) {
  if (ARRAY_INDEX_RE.test(name)) {
    const context = this;
    context[0] = Math.max(Number(name), context[0]);
  }
}
function maxObjectIndex(subject) {
  if (isArray(subject)) {
    return subject.length - 1;
  }
  if (isValidObject(subject)) {
    const context = [-1];
    each(subject, onMaxNumericIndex, context);
    return context[0];
  }
  return false;
}

export {
  maxObjectIndex
};
//# sourceMappingURL=chunk-UQ4IUHBX.mjs.map
