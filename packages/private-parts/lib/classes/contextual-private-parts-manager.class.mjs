import { CONTEXTUAL_ACCESSOR_MAP, CONTEXTUAL_INSTANCE_KEYS_MAP } from '../constants/contextual-map.constant.mjs';

class ContextualPrivatePartManager {
    get accessorKeyMap() {
        return CONTEXTUAL_ACCESSOR_MAP.get(this);
    }
    get keysetMap() {
        return CONTEXTUAL_INSTANCE_KEYS_MAP.get(this);
    }
    constructor() {
        CONTEXTUAL_ACCESSOR_MAP.set(this, new Map());
        CONTEXTUAL_INSTANCE_KEYS_MAP.set(this, new WeakMap());
    }
    getInstanceKeyset(instance) {
        return this.keysetMap.get(instance) || null;
    }
    createInstanceKeyset(instance) {
        const keysetMap = this.keysetMap;
        if (keysetMap.has(instance)) {
            return keysetMap.get(instance);
        }
        const set = new Set();
        keysetMap.set(instance, set);
        return set;
    }
    getInstanceValueMap(propertyName) {
        return this.accessorKeyMap.get(propertyName) || null;
    }
    createInstanceValueMap(propertyName) {
        const map = this.accessorKeyMap;
        if (!map.has(propertyName)) {
            map.set(propertyName, new WeakMap());
        }
        return map.get(propertyName);
    }
    get(instance, propertyName) {
        const repo = this.getInstanceValueMap(propertyName);
        if (!repo) {
            return undefined;
        }
        return repo.get(instance);
    }
    set(instance, propertyName, value) {
        const repo = this.getInstanceValueMap(propertyName) ||
            this.createInstanceValueMap(propertyName);
        const keys = this.getInstanceKeyset(instance) ||
            this.createInstanceKeyset(instance);
        // add keys if do not exist
        if (!keys.has(propertyName)) {
            keys.add(propertyName);
        }
        // set or replace value
        repo.set(instance, value);
        return this;
    }
    clear(instance) {
        const keyset = this.getInstanceKeyset(instance);
        // return early, no keys registered!
        if (!keyset) {
            return this;
        }
        // delete all associated properties by each key
        keyset.forEach((key) => {
            const propertyMap = this.getInstanceValueMap(key);
            // return early, already garbage collected :-D
            if (!propertyMap) {
                return;
            }
            propertyMap.delete(instance);
        });
        // delete keyset
        this.keysetMap.delete(instance);
        return this;
    }
    clearAll() {
        // clear instance key map
        CONTEXTUAL_INSTANCE_KEYS_MAP.set(this, new WeakMap());
        // only clear accessor keymap
        this.accessorKeyMap.clear();
        return this;
    }
}

export { ContextualPrivatePartManager };
//# sourceMappingURL=contextual-private-parts-manager.class.mjs.map
