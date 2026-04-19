import {
  signature
} from "./chunk-HJNVEGFY.mjs";
import {
  isNumber
} from "./chunk-3IYQFDCZ.mjs";
import {
  ARRAY,
  BOOLEAN,
  METHOD,
  NUMBER,
  STRING
} from "./chunk-DZZ66UJO.mjs";

// src/type-checking/functions/is-iterable.function.ts
function isIterable(subject) {
  switch (subject) {
    case void 0:
    case null:
    case true:
    case false:
      return false;
  }
  if (typeof subject === "number" && !isFinite(subject)) {
    return false;
  }
  switch (signature(subject)) {
    case NUMBER:
    case BOOLEAN:
    case METHOD:
      return false;
    case STRING:
    case ARRAY:
      return true;
  }
  return "length" in subject && isNumber(subject.length) && subject.length > -1;
}

export {
  isIterable
};
//# sourceMappingURL=chunk-5SF2O7CR.mjs.map
