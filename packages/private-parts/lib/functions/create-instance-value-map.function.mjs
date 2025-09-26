import { ACCESSOR_KEY_MAP } from '../constants/accessor-key-map.constant.mjs';

function createInstanceValueMap(propertyName) {
    if (!ACCESSOR_KEY_MAP.has(propertyName)) {
        ACCESSOR_KEY_MAP.set(propertyName, new WeakMap());
    }
    return ACCESSOR_KEY_MAP.get(propertyName);
}

export { createInstanceValueMap };
//# sourceMappingURL=create-instance-value-map.function.mjs.map
