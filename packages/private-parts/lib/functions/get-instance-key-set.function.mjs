import { INSTANCE_KEY_MAP } from '../constants/instance-keys-map.constant.mjs';

function getInstanceKeyset(instance) {
    return INSTANCE_KEY_MAP.map?.get(instance) || null;
}

export { getInstanceKeyset };
//# sourceMappingURL=get-instance-key-set.function.mjs.map
