import { INSTANCE_KEY_MAP } from '../constants/instance-keys-map.constant.mjs';

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

export { createInstanceKeyset };
//# sourceMappingURL=create-instance-key-set.function.mjs.map
