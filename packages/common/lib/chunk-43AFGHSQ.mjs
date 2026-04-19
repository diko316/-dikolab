import {
  each,
  isValidObject
} from "./chunk-Z6T5S4RH.mjs";
import {
  isObject
} from "./chunk-4K76VZWE.mjs";

// src/object/functions/rehash.function.ts
function rehash(target, source, access) {
  if (!isValidObject(target)) {
    throw new Error("Invalid [target] parameter.");
  }
  if (!isValidObject(source)) {
    throw new Error("Invalid [source] parameter.");
  }
  if (!isObject(access)) {
    throw new Error("Invalid [access] parameter.");
  }
  const context = [target, source];
  each(
    access,
    function(value, name) {
      this[0][name] = this[1][value];
    },
    context
  );
  return target;
}

export {
  rehash
};
//# sourceMappingURL=chunk-43AFGHSQ.mjs.map
