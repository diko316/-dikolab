import {
  BaseIterator
} from "./chunk-XCEHQV32.mjs";

// src/iterator/functions/iterator-registry.function.ts
import { isString, isMethod } from "@dikolab/common";
var defaultIteratorName = "base";
var ITERATORS = {};
function registerIterator(name, Class) {
  const Base = BaseIterator;
  if (!isString(name)) {
    throw new Error("Invalid iterator name parameter.");
  }
  if (!isMethod(Class) || Class !== Base && !(Class.prototype instanceof Base)) {
    throw new Error("Invalid iterator Class parameter.");
  }
  ITERATORS[":" + name] = Class;
  return true;
}
function getIterator(name) {
  const list = ITERATORS;
  if (isString(name)) {
    const key = ":" + name;
    if (key in list) {
      return list[key];
    }
  }
  return null;
}
var defaultIterator = defaultIteratorName;
registerIterator(
  defaultIteratorName,
  BaseIterator
);

export {
  registerIterator,
  getIterator,
  defaultIterator
};
//# sourceMappingURL=chunk-XW6B7ASB.mjs.map
