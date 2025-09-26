import { Actor } from '../classes/actor.class.mjs';
import { getOrDefineRoles } from './get-or-define-roles.function.mjs';

function defineActor(name, ...roleOrNames) {
    if (!name || typeof name !== 'string') {
        throw new TypeError(`"${name}" name parameter is invald.`);
    }
    // get role or create if do not exist!
    const [role] = getOrDefineRoles(name);
    const others = getOrDefineRoles(...roleOrNames);
    const roles = [role, ...others];
    return new Actor(name, roles);
}

export { defineActor };
//# sourceMappingURL=define-actor.function.mjs.map
