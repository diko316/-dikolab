import {
  each
} from "./chunk-Z6T5S4RH.mjs";
import {
  isArray
} from "./chunk-6BGNHZOB.mjs";
import {
  isDate
} from "./chunk-UIPWX2F5.mjs";
import {
  isObject
} from "./chunk-4K76VZWE.mjs";
import {
  isRegex
} from "./chunk-TVSXR7AM.mjs";

// src/object/functions/compare.function.ts
function compareLookback(object1, object2, references) {
  const depth = references.length;
  if (object1 === object2) {
    return true;
  }
  if (isObject(object1)) {
    if (!isObject(object2)) {
      return false;
    }
    if (references.lastIndexOf(object1) !== -1 && references.lastIndexOf(object2) !== -1) {
      return true;
    }
    references[depth] = object1;
    references[depth + 1] = object2;
    const context = [
      object2,
      references,
      true
    ];
    each(object1, onEachCompare, context);
    if (!context[2]) {
      return false;
    }
    context[0] = object1;
    each(object2, onEachCompare, context);
    if (!context[2]) {
      return false;
    }
    references.length = depth;
    return true;
  }
  if (isArray(object1)) {
    if (!isArray(object2)) {
      return false;
    }
    if (references.lastIndexOf(object1) !== -1 && references.lastIndexOf(object2) !== -1) {
      return true;
    }
    const len = object1.length;
    if (len !== object2.length) {
      return false;
    }
    references[depth] = object1;
    references[depth + 1] = object2;
    for (let i = len; i--; ) {
      if (!compareLookback(object1[i], object2[i], references)) {
        return false;
      }
    }
    references.length = depth;
    return true;
  }
  if (isRegex(object1)) {
    return isRegex(object2) && object1.source === object2.source;
  }
  if (isDate(object1)) {
    return isDate(object2) && object1.toString() === object2.toString();
  }
  return false;
}
function onEachCompare(value, name) {
  const target = this[0];
  const result = name in target ? compareLookback(value, target[name], this[1]) : false;
  this[2] = result;
  return result;
}
function compare(object1, object2) {
  return compareLookback(object1, object2, []);
}

export {
  compare
};
//# sourceMappingURL=chunk-Q6RURFFP.mjs.map
