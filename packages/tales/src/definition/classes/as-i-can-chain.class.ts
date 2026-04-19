import { get, set } from '@dikolab/private-parts';
import {
   BOUNDARY_KEY,
   ROLE_NAMES_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import type { ActionTitleDefined } from '../types/action-title-defined.interface';
import type { RoleNamesDefined } from '../types/role-names-defined.interface';
import type { SoThatGoal } from '../types/so-that-goal.interface';
import type {
   AnyGoal,
   AnyGoalBoundTo,
} from '../../goal/types/utility.type';
import { AsICanSoThatChain } from './as-i-can-so-that-chain.class';
import type { AnyBoundary } from '../../boundary/types/utility.type';
import type { BoundaryDefined } from '../types/boundary-defined.interface';

export class AsICanChain<
      Boundary extends AnyBoundary,
      RoleNames extends readonly string[],
      ActionTitle extends string,
   >
   implements
      BoundaryDefined<Boundary>,
      RoleNamesDefined<RoleNames>,
      ActionTitleDefined<ActionTitle>,
      SoThatGoal<Boundary>
{
   get [BOUNDARY_KEY](): Boundary {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, BOUNDARY_KEY);
   }

   get [ROLE_NAMES_KEY](): RoleNames {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, ROLE_NAMES_KEY);
   }

   get [TITLE_KEY](): ActionTitle {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, TITLE_KEY);
   }

   constructor(
      boundary: Boundary,
      roleNames: RoleNames,
      title: ActionTitle,
   ) {
      set(this, BOUNDARY_KEY, boundary);
      set(this, ROLE_NAMES_KEY, roleNames);
      set(this, TITLE_KEY, title);
   }

   /**
    * Assigns Goal of the Use-case
    *
    * @param goal The goal of the Use-case.
    * @returns declaration chain
    */
   soThat<Goal extends AnyGoalBoundTo<Boundary>>(goal: AnyGoal) {
      return new AsICanSoThatChain(
         this[BOUNDARY_KEY],
         this[ROLE_NAMES_KEY],
         this[TITLE_KEY],
         goal,
      ) as AsICanSoThatChain<Boundary, RoleNames, ActionTitle, Goal>;
   }
}
