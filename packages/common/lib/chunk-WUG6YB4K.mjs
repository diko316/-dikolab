import {
  jsonParsePath
} from "./chunk-CSNIPCAS.mjs";
import {
  maxObjectIndex
} from "./chunk-UQ4IUHBX.mjs";
import {
  assign
} from "./chunk-7D27R3YN.mjs";
import {
  contains
} from "./chunk-UXJOVXAW.mjs";
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
  isObject
} from "./chunk-4K76VZWE.mjs";
import {
  ARRAY
} from "./chunk-DZZ66UJO.mjs";

// src/json-path/functions/json-fill.function.ts
var ARRAY_INDEX_RE = /^([1-9][0-9]*|0|)$/;
var ERROR_NATIVE_OBJECT = "Root [subject] requires native Object to accept non-numeric property name.";
function isJSONWritable(subject) {
  const sig = signature(subject);
  switch (sig) {
    case ARRAY:
    case "[object Object]":
      return sig;
  }
  return false;
}
function jsonFill(path, subject, value) {
  if (!isString(path)) {
    throw new Error("Invalid [path] parameter.");
  }
  const isSubjectArray = isArray(subject);
  if (!isObject(subject) && !isSubjectArray) {
    return false;
  }
  const parsedPath = jsonParsePath(path);
  if (!parsedPath || !parsedPath.length) {
    return false;
  }
  let parent = subject;
  let parentIndex = parsedPath[0];
  if (!parentIndex) {
    parentIndex = maxObjectIndex(parent) + 1;
  }
  const last = parsedPath.length - 1;
  for (let c = 0; c < last; c++) {
    const item = parsedPath[c + 1];
    const arrayIndex = ARRAY_INDEX_RE.test(item);
    if (contains(parent, parentIndex)) {
      let property = parent[parentIndex];
      const writable = isJSONWritable(property);
      if (writable === ARRAY && !arrayIndex) {
        property = assign({}, property);
        delete property.length;
      } else if (!writable) {
        property = arrayIndex ? [property] : { "": property };
      }
      parent[parentIndex] = property;
      parent = property;
    } else if (isSubjectArray && parent === subject && !arrayIndex) {
      throw new Error(ERROR_NATIVE_OBJECT);
    } else {
      const property = arrayIndex ? [] : {};
      parent[parentIndex] = property;
      parent = property;
    }
    parentIndex = item;
    if (!item) {
      parentIndex = maxObjectIndex(parent) + 1;
    }
  }
  parent[parentIndex] = value;
  return true;
}

export {
  jsonFill
};
//# sourceMappingURL=chunk-WUG6YB4K.mjs.map
