import {
  isString
} from "./chunk-IMQK2X3Q.mjs";

// src/string/functions/trim.function.ts
var TRIM_RE = /^\s+|\s+$/g;
function trim(subject) {
  if (!isString(subject, true)) {
    throw new Error("Invalid [subject] parameter.");
  }
  return subject ? subject.replace(TRIM_RE, "") : subject;
}

export {
  trim
};
//# sourceMappingURL=chunk-MJXWWNQW.mjs.map
