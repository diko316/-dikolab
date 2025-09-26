import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import {
   NAME_KEY,
   ROLES_KEY,
} from '../../utils/constants/symbol-keys.constant';
import { ACTOR_TYPE } from '../../utils/constants/symbol-tag.constant';
import { ActorEventMap } from './actor-events.type';
import { AnyRole, RoleNames } from './utility.type';

export interface ActorModel<
   Name extends string,
   Roles extends readonly AnyRole[],
> extends UsecaseSymbol<typeof ACTOR_TYPE, Name, ActorEventMap> {
   readonly [NAME_KEY]: Name;
   readonly [ROLES_KEY]: Roles;
   toJSON(): {
      type: typeof ACTOR_TYPE;
      name: Name;
      roles: RoleNames<Roles>;
   };
}
