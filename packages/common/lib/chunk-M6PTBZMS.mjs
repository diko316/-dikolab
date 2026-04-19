import {
  jsonFind
} from "./chunk-XNRBVLPR.mjs";
import {
  clone
} from "./chunk-PLJO2KIH.mjs";

// src/json-path/functions/json-clone.function.ts
function jsonClone(path, object, deep = false) {
  return clone(jsonFind(path, object), deep);
}

export {
  jsonClone
};
//# sourceMappingURL=chunk-M6PTBZMS.mjs.map
