import {
  each,
  isValidObject
} from "./chunk-Z6T5S4RH.mjs";

// src/object/functions/assign.function.ts
function apply(value, name) {
  this[name] = value;
}
function assignAll(target, source, defaults) {
  if (defaults) {
    each(defaults, apply, target, false);
  }
  each(source, apply, target);
  return target;
}
function assign(target, source, defaults, ownedOnly) {
  if (!isValidObject(target)) {
    throw new Error("Invalid [target] parameter.");
  }
  if (!isValidObject(source)) {
    throw new Error("Invalid [source] parameter.");
  }
  let resolvedOwned;
  if (typeof defaults === "boolean") {
    resolvedOwned = defaults;
    defaults = void 0;
  } else {
    resolvedOwned = ownedOnly !== false;
  }
  if (isValidObject(defaults)) {
    each(defaults, apply, target, resolvedOwned);
  } else if (defaults !== void 0) {
    throw new Error("Invalid [defaults] parameter.");
  }
  each(source, apply, target, resolvedOwned);
  return target;
}

export {
  assignAll,
  assign
};
//# sourceMappingURL=chunk-7D27R3YN.mjs.map
