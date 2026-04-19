import {
  CONTEXTUAL_ACCESSOR_MAP,
  CONTEXTUAL_INSTANCE_KEYS_MAP
} from "./chunk-QUQOVPUU.mjs";

// src/classes/contextual-private-parts-manager.class.ts
var ContextualPrivatePartManager = class {
  get accessorKeyMap() {
    return CONTEXTUAL_ACCESSOR_MAP.get(this);
  }
  get keysetMap() {
    return CONTEXTUAL_INSTANCE_KEYS_MAP.get(this);
  }
  constructor() {
    CONTEXTUAL_ACCESSOR_MAP.set(this, /* @__PURE__ */ new Map());
    CONTEXTUAL_INSTANCE_KEYS_MAP.set(this, /* @__PURE__ */ new WeakMap());
  }
  getInstanceKeyset(instance) {
    return this.keysetMap.get(instance) || null;
  }
  createInstanceKeyset(instance) {
    const keysetMap = this.keysetMap;
    if (keysetMap.has(instance)) {
      return keysetMap.get(instance);
    }
    const set = /* @__PURE__ */ new Set();
    keysetMap.set(instance, set);
    return set;
  }
  getInstanceValueMap(propertyName) {
    return this.accessorKeyMap.get(propertyName) || null;
  }
  createInstanceValueMap(propertyName) {
    const map = this.accessorKeyMap;
    if (!map.has(propertyName)) {
      map.set(propertyName, /* @__PURE__ */ new WeakMap());
    }
    return map.get(propertyName);
  }
  /**
   * Retrieves a stored private property value
   *
   * @param instance - Object to read from
   * @param propertyName - Private property key
   * @returns The stored value, or `undefined`
   */
  get(instance, propertyName) {
    const repo = this.getInstanceValueMap(propertyName);
    if (!repo) {
      return void 0;
    }
    return repo.get(instance);
  }
  /**
   * Stores a private property value on an instance
   *
   * @param instance - Object to store data on
   * @param propertyName - Private property key
   * @param value - Value to store
   */
  set(instance, propertyName, value) {
    const repo = this.getInstanceValueMap(propertyName) || this.createInstanceValueMap(propertyName);
    const keys = this.getInstanceKeyset(instance) || this.createInstanceKeyset(instance);
    if (!keys.has(propertyName)) {
      keys.add(propertyName);
    }
    repo.set(instance, value);
    return this;
  }
  /**
   * Removes all private data for an instance
   *
   * @param instance - Object whose data to clear
   */
  clear(instance) {
    const keyset = this.getInstanceKeyset(instance);
    if (!keyset) {
      return this;
    }
    keyset.forEach((key) => {
      const propertyMap = this.getInstanceValueMap(key);
      if (!propertyMap) {
        return;
      }
      propertyMap.delete(instance);
    });
    this.keysetMap.delete(instance);
    return this;
  }
  /** Removes all private data from this store */
  clearAll() {
    CONTEXTUAL_INSTANCE_KEYS_MAP.set(this, /* @__PURE__ */ new WeakMap());
    this.accessorKeyMap.clear();
    return this;
  }
};

export {
  ContextualPrivatePartManager
};
//# sourceMappingURL=chunk-XZ2KFJHE.mjs.map
