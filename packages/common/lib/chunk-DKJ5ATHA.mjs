import {
  isMethod
} from "./chunk-JAESEHZ5.mjs";
import {
  signature
} from "./chunk-HJNVEGFY.mjs";
import {
  BOOLEAN,
  NULL,
  NUMBER,
  STRING,
  UNDEFINED
} from "./chunk-DZZ66UJO.mjs";

// src/type-checking/functions/is-thenable.function.ts
function isThenable(subject) {
  switch (subject) {
    case void 0:
    case null:
    case true:
    case false:
      return false;
  }
  switch (signature(subject)) {
    case NUMBER:
    case STRING:
    case BOOLEAN:
    case NULL:
    case UNDEFINED:
      return false;
  }
  return "then" in subject && isMethod(subject.then);
}

export {
  isThenable
};
//# sourceMappingURL=chunk-DKJ5ATHA.mjs.map
