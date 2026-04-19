import {
  isString
} from "./chunk-IMQK2X3Q.mjs";
import {
  isNativeObject
} from "./chunk-ZZUM7IAB.mjs";
import {
  signature
} from "./chunk-HJNVEGFY.mjs";
import {
  BOOLEAN,
  NUMBER,
  STRING
} from "./chunk-DZZ66UJO.mjs";

// src/type-checking/functions/type.function.ts
function type(subject, isType) {
  switch (isType) {
    case "scalar":
      switch (signature(subject)) {
        case STRING:
        case NUMBER:
        case BOOLEAN:
          return true;
      }
      return false;
    case "regexp":
    case "regex":
      isType = "RegExp";
      break;
    case "method":
      isType = "Function";
      break;
    case "native":
    case "nativeObject":
      return isNativeObject(subject);
  }
  if (isString(isType)) {
    const len = isType.length;
    if (len) {
      return signature(subject) === "[object " + isType.charAt(0).toUpperCase() + isType.substring(1, len) + "]";
    }
  }
  return false;
}

export {
  type
};
//# sourceMappingURL=chunk-HUVWZ54J.mjs.map
