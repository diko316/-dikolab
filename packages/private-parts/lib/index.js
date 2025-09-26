'use strict';

const ACCESSOR_KEY_MAP = new Map();

const INSTANCE_KEY_MAP = {
    map: null,
};

function clearAll() {
    INSTANCE_KEY_MAP.map = null;
    ACCESSOR_KEY_MAP.clear();
}

function getInstanceKeyset(instance) {
    return INSTANCE_KEY_MAP.map?.get(instance) || null;
}

function getInstanceValueMap(propertyName) {
    return ACCESSOR_KEY_MAP.get(propertyName) || null;
}

function clear(instance) {
    const keyset = getInstanceKeyset(instance);
    // return early, no keys registered!
    if (!keyset) {
        return;
    }
    // delete all associated properties by each key
    keyset.forEach((key) => {
        const propertyMap = getInstanceValueMap(key);
        // return early, already garbage collected :-D
        if (!propertyMap) {
            return;
        }
        propertyMap.delete(instance);
    });
    // delete keyset
    INSTANCE_KEY_MAP.map?.delete(instance);
}

function get(instance, propertyName) {
    const repo = getInstanceValueMap(propertyName);
    if (!repo) {
        return undefined;
    }
    return repo.get(instance);
}

function createInstanceKeyset(instance) {
    let map = INSTANCE_KEY_MAP.map;
    if (!map) {
        map = INSTANCE_KEY_MAP.map = new WeakMap();
    }
    if (map.has(instance)) {
        return map.get(instance);
    }
    const set = new Set();
    map.set(instance, set);
    return set;
}

function createInstanceValueMap(propertyName) {
    if (!ACCESSOR_KEY_MAP.has(propertyName)) {
        ACCESSOR_KEY_MAP.set(propertyName, new WeakMap());
    }
    return ACCESSOR_KEY_MAP.get(propertyName);
}

function set(instance, propertyName, value) {
    const repo = getInstanceValueMap(propertyName) ||
        createInstanceValueMap(propertyName);
    const keys = getInstanceKeyset(instance) || createInstanceKeyset(instance);
    // add keys if do not exist
    if (!keys.has(propertyName)) {
        keys.add(propertyName);
    }
    // set or replace value
    repo.set(instance, value);
}

exports.clear = clear;
exports.clearAll = clearAll;
exports.get = get;
exports.set = set;
//# sourceMappingURL=index.js.map
