import {
  jsonEach
} from "./chunk-LMSKAPRD.mjs";
import {
  assign
} from "./chunk-7D27R3YN.mjs";
import {
  isString
} from "./chunk-IMQK2X3Q.mjs";
import {
  isArray
} from "./chunk-6BGNHZOB.mjs";
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

// src/json-path/functions/json-set.function.ts
var NUMERIC_RE = /^([1-9][0-9]*|0)$/;
function isWritable(subject) {
  const sig = signature(subject);
  switch (sig) {
    case REGEX:
    case DATE:
    case ARRAY:
    case OBJECT:
    case METHOD:
      return sig;
  }
  return false;
}
function onPopulatePath(item, last, context) {
  const subject = context[1];
  const writable = isWritable(subject);
  let success = false;
  if (!last) {
    if (writable) {
      if (!(item in subject)) {
        subject[item] = {};
        success = true;
      } else if (isWritable(subject[item])) {
        success = true;
      }
    }
    context[1] = success ? subject[item] : void 0;
  } else {
    success = !!writable;
    context[2] = success && item;
  }
  return success;
}
function jsonSet(path, subject, value, overwrite) {
  if (!isString(path)) {
    throw new Error("Invalid [path] parameter.");
  }
  const context = [void 0, subject, false];
  jsonEach(path, onPopulatePath, context);
  const name = context[2];
  if (name !== false) {
    subject = context[1];
    const valueSignature = isWritable(value);
    const arrayOperation = isArray(subject) && NUMERIC_RE.test(name);
    let current;
    let currentSignature;
    if (name in subject) {
      current = subject[name];
      currentSignature = isWritable(current);
    } else {
      current = void 0;
      currentSignature = null;
    }
    const canApply = valueSignature && !!currentSignature;
    const arrayPush = canApply && valueSignature === ARRAY && currentSignature === ARRAY;
    switch (overwrite) {
      case "insert":
        overwrite = !arrayOperation;
        if (arrayOperation) {
          subject.splice(Number(name), 0, value);
        }
        break;
      case "apply":
        overwrite = !canApply;
        if (canApply) {
          assign(current, value);
        }
        break;
      case "push":
        overwrite = !arrayPush;
        if (arrayPush) {
          current.push(...value);
        }
        break;
      case "unshift":
        overwrite = !arrayPush;
        if (arrayPush) {
          current.splice(0, 0, ...value);
        }
        break;
      case false:
      // falls through
      default:
        overwrite = !canApply;
        if (canApply) {
          if (arrayPush) {
            current.push(...value);
          } else {
            assign(current, value);
          }
        }
    }
    if (overwrite) {
      subject[name] = value;
    }
    return true;
  }
  return false;
}

export {
  isWritable,
  jsonSet
};
//# sourceMappingURL=chunk-E57MCZ7V.mjs.map
