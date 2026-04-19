import {
  STRING
} from "./chunk-DZZ66UJO.mjs";

// src/type-checking/functions/is-string.function.ts
var toString = Object.prototype.toString;
function isString(subject, allowEmpty = false) {
  return (typeof subject === "string" || toString.call(subject) === STRING) && (allowEmpty || subject.length !== 0);
}

export {
  isString
};
//# sourceMappingURL=chunk-IMQK2X3Q.mjs.map
