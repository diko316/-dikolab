import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { ROLES_KEY } from '../../utils/constants/symbol-keys.constant';
import { ACTOR_TYPE } from '../../utils/constants/symbol-tag.constant';
import { ActorModel } from '../types/actor-model.interface';
import { AnyRole, RoleNames } from '../types/utility.type';
import { ActorEventMap } from '../types/actor-events.type';
export declare class Actor<Name extends string, Roles extends readonly AnyRole[]> extends UsecaseSymbol<typeof ACTOR_TYPE, Name, ActorEventMap> implements ActorModel<Name, Roles> {
    get [ROLES_KEY](): Roles;
    constructor(name: Name, roles: Roles);
    toJSON(): {
        roles: RoleNames<Roles>;
        type: "Actor";
        name: Name;
    };
}
