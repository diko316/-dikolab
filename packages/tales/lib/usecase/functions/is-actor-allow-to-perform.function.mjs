import { intersectRoles } from '../../actor/functions/intersect-roles.function.mjs';
import { ROLES_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function isActorAllowToPerform(actor, roles) {
    return intersectRoles(roles, actor[ROLES_KEY]).length > 0;
}

export { isActorAllowToPerform };
//# sourceMappingURL=is-actor-allow-to-perform.function.mjs.map
