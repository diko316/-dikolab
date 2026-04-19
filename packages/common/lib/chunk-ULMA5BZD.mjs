import {
  each
} from "./chunk-Z6T5S4RH.mjs";

// src/object/functions/clear.function.ts
function applyClear(_value, name, subject) {
  delete subject[name];
}
function clear(subject) {
  each(subject, applyClear, null, true);
  return subject;
}

export {
  clear
};
//# sourceMappingURL=chunk-ULMA5BZD.mjs.map
