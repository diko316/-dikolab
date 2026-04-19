import {
  isString
} from "./chunk-IMQK2X3Q.mjs";
import {
  isNumber
} from "./chunk-3IYQFDCZ.mjs";

// src/object/functions/contains.function.ts
var hasOwn = Object.prototype.hasOwnProperty;
function contains(subject, property) {
  if (!isString(property) && !isNumber(property)) {
    throw new Error("Invalid [property] parameter.");
  }
  return hasOwn.call(subject, property);
}

export {
  contains
};
//# sourceMappingURL=chunk-UXJOVXAW.mjs.map
