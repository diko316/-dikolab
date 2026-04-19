import {
  contains
} from "./chunk-UXJOVXAW.mjs";
import {
  each,
  isValidObject
} from "./chunk-Z6T5S4RH.mjs";

// src/object/functions/fillin.function.ts
function applyFillin(value, name) {
  if (!contains(this, name)) {
    this[name] = value;
  }
}
function fillin(target, source, hasown = true) {
  if (!isValidObject(target)) {
    throw new Error("Invalid [target] parameter");
  }
  each(source, applyFillin, target, hasown);
  return target;
}

export {
  fillin
};
//# sourceMappingURL=chunk-LZ6N5EGN.mjs.map
