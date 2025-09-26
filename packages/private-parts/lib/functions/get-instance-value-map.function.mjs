import { ACCESSOR_KEY_MAP } from '../constants/accessor-key-map.constant.mjs';

function getInstanceValueMap(propertyName) {
    return ACCESSOR_KEY_MAP.get(propertyName) || null;
}

export { getInstanceValueMap };
//# sourceMappingURL=get-instance-value-map.function.mjs.map
