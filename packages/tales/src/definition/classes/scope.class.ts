import { get, set } from '@dikolab/private-parts';
import { AnyBoundary } from '../../boundary/types/utility.type';
import {
   BOUNDARY_KEY,
   NAME_KEY,
} from '../../utils/constants/symbol-keys.constant';
import { Goal } from '../../goal/classes/goal.class';
import { defineGoal } from '../../goal/functions/define-goal.function';
import {
   AnyRole,
   ResolveRoleNames,
} from '../../actor/types/utility.type';
import { Role } from '../../actor/classes/role.class';
import { AsChain } from './as-chain.class';

export class Scope<Boundary extends AnyBoundary> {
   get [BOUNDARY_KEY](): Boundary {
      return get(this, BOUNDARY_KEY);
   }

   constructor(boundary: Boundary) {
      set(this, BOUNDARY_KEY, boundary);
   }

   defineGoal<Title extends string>(
      title: Title,
   ): Goal<Title, Boundary> {
      return defineGoal(title, this[BOUNDARY_KEY]);
   }

   /**
    * Creates definition of Roles that can execute the Use-case
    *
    * @param roles Role names or Roles included in the context
    * @returns definition chain object
    */
   as<Targets extends readonly (string | AnyRole)[]>(
      ...roles: Targets
   ) {
      const roleNames = roles.map((roleOrName) => {
         if (typeof roleOrName === 'string') {
            return roleOrName;
         }

         if (roleOrName instanceof Role) {
            return roleOrName[NAME_KEY];
         }

         throw new TypeError(
            `Role parameter ${roleOrName} is invalid.`,
         );
      }) as ResolveRoleNames<Targets>;

      return new AsChain(this[BOUNDARY_KEY], roleNames);
   }
}
