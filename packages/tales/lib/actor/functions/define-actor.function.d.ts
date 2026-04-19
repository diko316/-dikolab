import { Actor } from '../classes/actor.class';
import type { Role } from '../classes/role.class';
import type { ResolveRoles } from '../types/utility.type';
export declare function defineActor<Name extends string, RoleNames extends readonly string[]>(name: Name, ...roleOrNames: RoleNames): Actor<Name, readonly [Role<Name>, ...ResolveRoles<RoleNames>]>;
