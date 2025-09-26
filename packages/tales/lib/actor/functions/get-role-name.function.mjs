import { get } from '@dikolab/private-parts';
import { NAME_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function getRoleName(role) {
    return get(role, NAME_KEY);
}

export { getRoleName };
//# sourceMappingURL=get-role-name.function.mjs.map
