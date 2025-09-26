import { createInstanceKeyset } from './create-instance-key-set.function.mjs';
import { createInstanceValueMap } from './create-instance-value-map.function.mjs';
import { getInstanceKeyset } from './get-instance-key-set.function.mjs';
import { getInstanceValueMap } from './get-instance-value-map.function.mjs';

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

export { set };
//# sourceMappingURL=set.function.mjs.map
