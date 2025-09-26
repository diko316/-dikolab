import { ACCESSOR_KEY_MAP } from '../constants/accessor-key-map.constant.mjs';
import { INSTANCE_KEY_MAP } from '../constants/instance-keys-map.constant.mjs';

function clearAll() {
    INSTANCE_KEY_MAP.map = null;
    ACCESSOR_KEY_MAP.clear();
}

export { clearAll };
//# sourceMappingURL=clear-all.function.mjs.map
