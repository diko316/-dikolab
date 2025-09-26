import { get, set } from '@dikolab/private-parts';
import {
   BOUNDARY_KEY,
   ROLE_NAMES_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import { ActionTitleDefined } from '../types/action-title-defined.interface';
import { RoleNamesDefined } from '../types/role-names-defined.interface';
import { SoThatGoal } from '../types/so-that-goal.interface';
import { AnyGoal, AnyGoalBoundTo } from '../../goal/types/utility.type';
import { AsICanSoThatChain } from './as-i-can-so-that-chain.class';
import { AnyBoundary } from '../../boundary/types/utility.type';
import { BoundaryDefined } from '../types/boundary-defined.interface';

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
      return get(this, BOUNDARY_KEY);
   }

   get [ROLE_NAMES_KEY](): RoleNames {
      return get(this, ROLE_NAMES_KEY);
   }

   get [TITLE_KEY](): ActionTitle {
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
