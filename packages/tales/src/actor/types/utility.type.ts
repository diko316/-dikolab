import {
   PrependTuple,
   StringifyTuple,
} from '../../utils/types/utility.type';
import { ActorModel } from './actor-model.interface';
import { RoleModel } from './role-model.interface';

export type RoleName<Source> =
   Source extends RoleModel<infer Name> ? Name : 'Role:Unknown';

export type AnyRole = RoleModel<string>;

export type ResolveRole<Source extends AnyRole | string> =
   Source extends string
      ? RoleModel<Source>
      : Source extends RoleModel<infer Name>
        ? RoleModel<Name>
        : never;

export type ResolveRoles<Sources> = Sources extends [
   infer First,
   ...infer Others,
]
   ? First extends AnyRole | string
      ? PrependTuple<ResolveRoles<Others>, ResolveRole<First>>
      : [...ResolveRoles<Others>]
   : Sources extends [infer First]
     ? First extends AnyRole | string
        ? [ResolveRole<First>]
        : []
     : [];

export type RoleNames<Sources> = Sources extends readonly [infer First]
   ? [RoleName<First>]
   : Sources extends readonly [infer First, ...infer Others]
     ? [RoleName<First>, ...RoleNames<Others>]
     : Sources extends readonly RoleModel<infer U>[]
       ? U[]
       : [];

export type StringifyRoles<Sources> = Sources extends readonly [
   infer First,
]
   ? `${StringifyTuple<RoleNames<[First]>>}`
   : Sources extends readonly [infer First, ...infer Others]
     ? `${StringifyTuple<RoleNames<[First, ...Others]>>}`
     : Sources extends readonly RoleModel<infer U>[]
       ? `${U}`
       : '';

export type ResolveRoleName<Source extends AnyRole | string> =
   Source extends string
      ? Source
      : Source extends RoleModel<infer Name>
        ? Name
        : never;

export type ResolveRoleNames<Sources> = Sources extends [
   infer First,
   ...infer Others,
]
   ? First extends AnyRole | string
      ? PrependTuple<ResolveRoleNames<Others>, ResolveRoleName<First>>
      : [...ResolveRoleNames<Others>]
   : Sources extends [infer First]
     ? First extends AnyRole | string
        ? [ResolveRoleName<First>]
        : []
     : [];
export type AnyActor = ActorModel<string, readonly AnyRole[]>;

export type ActorRoles<Actor extends AnyActor> =
   Actor extends ActorModel<string, infer Roles> ? Roles : [];

export type ActorName<Actor extends AnyActor> =
   Actor extends ActorModel<infer Name, readonly AnyRole[]>
      ? Name
      : 'Actor:Unknown';

export type ActorRoleOptions<Actor extends AnyActor> =
   readonly RoleModel<RoleNames<ActorRoles<Actor>>[number]>[];
