import { intersectRoles } from '../../actor/functions/intersect-roles.function';
import { AnyActor, AnyRole } from '../../actor/types/utility.type';
import { ROLES_KEY } from '../../utils/constants/symbol-keys.constant';

export function isActorAllowToPerform<
   Actor extends AnyActor,
   Roles extends readonly AnyRole[],
>(actor: Actor, roles: Roles): boolean {
   return intersectRoles(roles, actor[ROLES_KEY]).length > 0;
}
