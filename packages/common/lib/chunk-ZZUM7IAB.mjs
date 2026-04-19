import {
  signature
} from "./chunk-HJNVEGFY.mjs";
import {
  OBJECT
} from "./chunk-DZZ66UJO.mjs";

// src/type-checking/functions/is-native-object.function.ts
var O = Object;
var hasOwn = O.prototype.hasOwnProperty;
function isNativeObject(subject) {
  if (signature(subject) !== OBJECT) {
    return false;
  }
  const constructor = subject.constructor;
  if (hasOwn.call(subject, "constructor")) {
    delete subject.constructor;
    const result = subject.constructor === O;
    subject.constructor = constructor;
    return result;
  }
  return constructor === O;
}

export {
  isNativeObject
};
//# sourceMappingURL=chunk-ZZUM7IAB.mjs.map
