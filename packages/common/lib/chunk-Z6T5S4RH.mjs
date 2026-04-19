import {
  signature
} from "./chunk-HJNVEGFY.mjs";
import {
  ARRAY,
  DATE,
  METHOD,
  OBJECT,
  REGEX
} from "./chunk-DZZ66UJO.mjs";

// src/object/functions/each.function.ts
var hasOwn = Object.prototype.hasOwnProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
function isValidObject(target) {
  switch (signature(target)) {
    case REGEX:
    case DATE:
    case ARRAY:
    case OBJECT:
    case METHOD:
      return true;
  }
  return false;
}
function each(subject, handler, scope, hasown) {
  if (!isValidObject(subject)) {
    throw new Error("Invalid [subject] parameter.");
  }
  const noChecking = hasown === false;
  const resolvedScope = scope === void 0 ? null : scope;
  const names = getOwnPropertyNames(subject);
  for (let c = 0; c < names.length; c++) {
    const name = names[c];
    if ((noChecking || hasOwn.call(subject, name)) && handler.call(resolvedScope, subject[name], name, subject) === false) {
      break;
    }
  }
  return subject;
}

export {
  isValidObject,
  each
};
//# sourceMappingURL=chunk-Z6T5S4RH.mjs.map
