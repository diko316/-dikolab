import {
  isWritable
} from "./chunk-E57MCZ7V.mjs";
import {
  jsonEach
} from "./chunk-LMSKAPRD.mjs";
import {
  isString
} from "./chunk-IMQK2X3Q.mjs";
import {
  isArray
} from "./chunk-6BGNHZOB.mjs";

// src/json-path/functions/json-unset.function.ts
var NUMERIC_RE = /^([1-9][0-9]*|0)$/;
function onRemovePath(item, last, context) {
  const subject = context[1];
  const writable = isWritable(subject);
  let success = false;
  if (!last) {
    if (writable && item in subject) {
      if (isWritable(subject[item])) {
        success = true;
      } else {
        context[3] = true;
      }
    }
    context[1] = success ? subject[item] : void 0;
  } else {
    success = !!writable;
    context[2] = success && item;
    context[3] = true;
  }
  return success;
}
function jsonUnset(path, subject) {
  if (!isString(path)) {
    throw new Error("Invalid [path] parameter.");
  }
  const context = [void 0, subject, false, false];
  jsonEach(path, onRemovePath, context);
  const name = context[2];
  let returnValue = context[3];
  if (returnValue && name !== false) {
    subject = context[1];
    if (!(name in subject)) {
      returnValue = false;
    } else {
      if (isArray(subject) && NUMERIC_RE.test(name)) {
        subject.splice(Number(name), 1);
      } else {
        delete subject[name];
        returnValue = !(name in subject);
      }
    }
  }
  return returnValue;
}

export {
  jsonUnset
};
//# sourceMappingURL=chunk-FUU4LVTC.mjs.map
