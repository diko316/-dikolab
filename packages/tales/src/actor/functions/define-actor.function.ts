import { Actor } from '../classes/actor.class';
import { Role } from '../classes/role.class';
import { ResolveRoles } from '../types/utility.type';
import { getOrDefineRoles } from './get-or-define-roles.function';

export function defineActor<
   Name extends string,
   RoleNames extends readonly string[],
>(name: Name, ...roleOrNames: RoleNames) {
   if (!name || typeof name !== 'string') {
      throw new TypeError(`"${name}" name parameter is invald.`);
   }

   // get role or create if do not exist!
   const [role] = getOrDefineRoles(name) as [Role<Name>];
   const others = getOrDefineRoles(
      ...roleOrNames,
   ) as ResolveRoles<RoleNames>;
   const roles = [role, ...others] as const;

   return new Actor(name, roles);
}

// const r1 = defineRole('admin');
// const r2 = defineRole('guest');

// export const a1 = defineActor('diko', 'admin', 'guest');
// export const a2 = defineActor('cha');

// export const test = new Actor('diko', [r1, r2]);

// export const actorRoles = getActorRoles(a1);
