import { getInstanceKeyset } from './get-instance-key-set.function.mjs';
import { getInstanceValueMap } from './get-instance-value-map.function.mjs';
import { INSTANCE_KEY_MAP } from '../constants/instance-keys-map.constant.mjs';

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

export { clear };
//# sourceMappingURL=clear.function.mjs.map
