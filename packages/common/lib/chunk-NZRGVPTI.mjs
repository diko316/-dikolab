import {
  assign
} from "./chunk-7D27R3YN.mjs";
import {
  isObject
} from "./chunk-4K76VZWE.mjs";

// src/object/functions/instantiate.function.ts
function instantiate(Class, overrides) {
  const instance = Object.create(Class.prototype);
  if (isObject(overrides)) {
    return assign(instance, overrides);
  }
  return instance;
}

export {
  instantiate
};
//# sourceMappingURL=chunk-NZRGVPTI.mjs.map
