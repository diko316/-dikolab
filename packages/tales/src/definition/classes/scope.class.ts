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

   /**
    * Creates Goal to be used for declaring a Use-case
    *
    * @param title Unique goal title of what you want to achieve.
    * @returns Goal
    */
   defineGoal<Title extends string>(
      title: Title,
   ): Goal<Title, Boundary> {
      return defineGoal(title, this[BOUNDARY_KEY]);
   }

   /**
    * Creates declaration of Roles that guards the Use-case execution
    *
    * @param roles Role names or Roles included in the context
    * @returns declaration chain object
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
