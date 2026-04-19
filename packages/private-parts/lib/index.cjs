var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  clear: () => clear,
  clearAll: () => clearAll,
  createStore: () => createStore,
  get: () => get,
  set: () => set
});
module.exports = __toCommonJS(index_exports);

// src/constants/contextual-map.constant.ts
var CONTEXTUAL_ACCESSOR_MAP = /* @__PURE__ */ new WeakMap();
var CONTEXTUAL_INSTANCE_KEYS_MAP = /* @__PURE__ */ new WeakMap();

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
    const set2 = /* @__PURE__ */ new Set();
    keysetMap.set(instance, set2);
    return set2;
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

// src/constants/global-contextual-private-parts-manager.contsant.ts
var GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER = new ContextualPrivatePartManager();

// src/functions/clear-all.function.ts
function clearAll() {
  GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.clearAll();
}

// src/functions/clear.function.ts
function clear(instance) {
  GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.clear(instance);
}

// src/functions/get.function.ts
function get(instance, propertyName) {
  return GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.get(
    instance,
    propertyName
  );
}

// src/functions/set.function.ts
function set(instance, propertyName, value) {
  GLOBAL_CONTEXTUAL_PRIVATE_PARTS_MANAGER.set(
    instance,
    propertyName,
    value
  );
}

// src/functions/create-store.function.ts
function createStore() {
  return new ContextualPrivatePartManager();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clear,
  clearAll,
  createStore,
  get,
  set
});
//# sourceMappingURL=index.cjs.map
