import {
  jsonUnset
} from "./chunk-FUU4LVTC.mjs";
import {
  jsonExists
} from "./chunk-DIXP4GVL.mjs";
import {
  jsonFind
} from "./chunk-XNRBVLPR.mjs";
import {
  jsonFill
} from "./chunk-WUG6YB4K.mjs";
import {
  clear
} from "./chunk-ULMA5BZD.mjs";
import {
  clone
} from "./chunk-PLJO2KIH.mjs";
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
  signature
} from "./chunk-HJNVEGFY.mjs";
import {
  ARRAY,
  NUMBER,
  OBJECT,
  STRING
} from "./chunk-DZZ66UJO.mjs";

// src/registry/classes/registry.class.ts
var ERROR_NAME = "Invalid [name] parameter.";
var ERROR_PATH = "Invalid [path] parameter.";
function isIndex(name) {
  switch (signature(name)) {
    case STRING:
    case NUMBER:
      return true;
  }
  return false;
}
var Registry = class {
  data = {};
  /**
   * Retrieves a value by key
   *
   * @param name - Property key
   * @returns Stored value, or undefined
   */
  get(name) {
    if (!isIndex(name)) {
      throw new Error(ERROR_NAME);
    }
    if (contains(this.data, name)) {
      return this.data[name];
    }
    return void 0;
  }
  /**
   * Sets a value by key or merges an object
   *
   * @param name - Property key or object
   * @param value - Value to store
   * @returns This registry instance
   */
  set(name, value) {
    switch (signature(name)) {
      case OBJECT:
      case ARRAY:
        assign(this.data, name, true);
        break;
      case STRING:
      case NUMBER:
        this.data[name] = value;
        break;
      default:
        throw new Error(ERROR_NAME);
    }
    return this;
  }
  /**
   * Removes a value by key
   *
   * @param name - Property key
   * @returns This registry instance
   */
  unset(name) {
    if (!isIndex(name)) {
      throw new Error(ERROR_NAME);
    }
    if (contains(this.data, name)) {
      delete this.data[name];
    }
    return this;
  }
  /**
   * Finds a value using a JSON path
   *
   * @param path - JSON path string
   * @returns Value at path, or undefined
   */
  find(path) {
    if (!isString(path)) {
      throw new Error(ERROR_PATH);
    }
    return jsonFind(path, this.data);
  }
  /**
   * Inserts a value at a JSON path
   *
   * @param path - JSON path string
   * @param value - Value to insert
   * @returns This registry instance
   */
  insert(path, value) {
    if (!isString(path)) {
      throw new Error(ERROR_PATH);
    }
    jsonFill(path, this.data, value);
    return this;
  }
  /**
   * Removes a value at a JSON path
   *
   * @param path - JSON path string
   * @returns This registry instance
   */
  remove(path) {
    if (!isString(path)) {
      throw new Error(ERROR_PATH);
    }
    jsonUnset(path, this.data);
    return this;
  }
  /**
   * Checks if a key exists in the store
   *
   * @param name - Property key
   * @returns True if key exists
   */
  exists(name) {
    if (!isIndex(name)) {
      throw new Error(ERROR_NAME);
    }
    return contains(this.data, name);
  }
  /**
   * Checks if a JSON path exists
   *
   * @param path - JSON path string
   * @returns True if path exists
   */
  pathExists(path) {
    if (!isString(path)) {
      throw new Error(ERROR_PATH);
    }
    return jsonExists(path, this.data);
  }
  /**
   * Merges an object into the store
   *
   * @param value - Object to merge
   * @returns This registry instance
   */
  assign(value) {
    switch (signature(value)) {
      case OBJECT:
      case ARRAY:
        assign(this.data, value, true);
        return this;
      default:
        throw new Error("Invalid [value] parameter");
    }
  }
  /**
   * Removes all entries from the store
   *
   * @returns This registry instance
   */
  clear() {
    clear(this.data);
    return this;
  }
  /**
   * Deep-clones all stored data
   *
   * @returns Cloned data object
   */
  clone() {
    return clone(this.data, true);
  }
};
function createRegistry() {
  return new Registry();
}

export {
  Registry,
  createRegistry
};
//# sourceMappingURL=chunk-QNEJZGVB.mjs.map
