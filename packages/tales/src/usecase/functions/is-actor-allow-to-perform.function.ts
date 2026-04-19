import { intersectRoles } from '../../actor/functions/intersect-roles.function';
import type { AnyActor, AnyRole } from '../../actor/types/utility.type';
import { ROLES_KEY } from '../../utils/constants/symbol-keys.constant';

export function isActorAllowToPerform(
   actor: AnyActor,
   roles: readonly AnyRole[],
): boolean {
   return intersectRoles(roles, actor[ROLES_KEY]).length > 0;
}
