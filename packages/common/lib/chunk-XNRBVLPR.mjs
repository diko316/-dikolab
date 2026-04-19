import {
  jsonEach
} from "./chunk-LMSKAPRD.mjs";
import {
  signature
} from "./chunk-HJNVEGFY.mjs";
import {
  ARRAY,
  BOOLEAN,
  DATE,
  METHOD,
  NUMBER,
  OBJECT,
  REGEX,
  STRING
} from "./chunk-DZZ66UJO.mjs";

// src/json-path/functions/json-find.function.ts
function isAccessible(subject, item) {
  const sig = signature(subject);
  switch (sig) {
    case NUMBER:
      return isFinite(subject) && item in Number.prototype ? sig : false;
    case STRING:
      return item in String.prototype ? sig : false;
    case BOOLEAN:
      return item in Boolean.prototype ? sig : false;
    case REGEX:
    case DATE:
    case ARRAY:
    case OBJECT:
    case METHOD:
      if (item in subject) {
        return sig;
      }
  }
  return false;
}
function findCallback(item, last, operation) {
  const subject = operation[1];
  if (!isAccessible(subject, item)) {
    operation[0] = void 0;
    return false;
  }
  operation[last ? 0 : 1] = subject[item];
  return true;
}
function jsonFind(path, object) {
  const operation = [void 0, object];
  jsonEach(path, findCallback, operation);
  operation[1] = null;
  return operation[0];
}

export {
  isAccessible,
  jsonFind
};
//# sourceMappingURL=chunk-XNRBVLPR.mjs.map
