import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import {
   NAME_KEY,
   ROLES_KEY,
} from '../../utils/constants/symbol-keys.constant';

import { ACTOR_TYPE } from '../../utils/constants/symbol-tag.constant';
import { ActorModel } from '../types/actor-model.interface';
import { AnyRole, RoleNames } from '../types/utility.type';
import { ActorEventMap } from '../types/actor-events.type';

export class Actor<
      Name extends string,
      Roles extends readonly AnyRole[],
   >
   extends UsecaseSymbol<typeof ACTOR_TYPE, Name, ActorEventMap>
   implements ActorModel<Name, Roles>
{
   get [ROLES_KEY](): Roles {
      return get(this, ROLES_KEY);
   }

   constructor(name: Name, roles: Roles) {
      super(ACTOR_TYPE, name);

      set(this, ROLES_KEY, roles);
   }

   toJSON() {
      const roles = this[ROLES_KEY].map((role) => role[NAME_KEY]);

      return {
         ...super.toJSON(),
         roles: roles as RoleNames<Roles>,
      };
   }
}
