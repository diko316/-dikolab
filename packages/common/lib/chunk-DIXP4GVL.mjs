import {
  isAccessible
} from "./chunk-XNRBVLPR.mjs";
import {
  jsonEach
} from "./chunk-LMSKAPRD.mjs";

// src/json-path/functions/json-exists.function.ts
function existsCallback(item, last, context) {
  const subject = context[0];
  const exists = isAccessible(subject, item);
  if (exists) {
    context[0] = subject[item];
  }
  if (last) {
    context[1] = !!exists;
  }
  return !!exists;
}
function jsonExists(path, subject) {
  const operation = [subject, false];
  jsonEach(path, existsCallback, operation);
  operation[0] = null;
  return operation[1];
}

export {
  jsonExists
};
//# sourceMappingURL=chunk-DIXP4GVL.mjs.map
