import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { ROLES_KEY } from '../../utils/constants/symbol-keys.constant';
import { ACTOR_TYPE } from '../../utils/constants/symbol-tag.constant';
import type { ActorModel } from '../types/actor-model.interface';
import type { AnyRole, RoleNames } from '../types/utility.type';
import type { ActorEventMap } from '../types/actor-events.type';
/**
 * Represents a named actor with assigned roles
 * that determine which use cases it can perform
 */
export declare class Actor<Name extends string, Roles extends readonly AnyRole[]> extends UsecaseSymbol<typeof ACTOR_TYPE, Name, ActorEventMap> implements ActorModel<Name, Roles> {
    get [ROLES_KEY](): Roles;
    constructor(name: Name, roles: Roles);
    /** Returns a plain object with type, name, and role names */
    toJSON(): {
        roles: RoleNames<Roles>;
        type: "Actor";
        name: Name;
    };
}
