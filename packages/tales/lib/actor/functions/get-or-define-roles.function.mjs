import { defineRole } from './define-role.function.mjs';
import { getSymbolById } from '../../symbol/functions/get-symbol-by-id.function.mjs';
import { ROLE_TYPE } from '../../utils/constants/symbol-tag.constant.mjs';

function getOrDefineRoles(...roleNames) {
    return roleNames.map((name) => {
        if (typeof name !== 'string') {
            throw new TypeError(`"${name}" in roleNames parameter is invalid.`);
        }
        return getSymbolById(ROLE_TYPE, name) || defineRole(name);
    });
}

export { getOrDefineRoles };
//# sourceMappingURL=get-or-define-roles.function.mjs.map
