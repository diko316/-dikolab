import { Actor } from '../classes/actor.class';
import { Role } from '../classes/role.class';
import { ResolveRoles } from '../types/utility.type';
export declare function defineActor<Name extends string, RoleNames extends readonly string[]>(name: Name, ...roleOrNames: RoleNames): Actor<Name, readonly [Role<Name>, ...ResolveRoles<RoleNames>]>;
