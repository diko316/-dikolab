import { get, set } from '@dikolab/private-parts';
import {
   BOUNDARY_KEY,
   GOAL_KEY,
   ROLE_NAMES_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import { ActionTitleDefined } from '../types/action-title-defined.interface';
import { RoleNamesDefined } from '../types/role-names-defined.interface';

import { Usecase } from '../../usecase/classes/usecase.class';
import { getOrDefineRoles } from '../../actor/functions/get-or-define-roles.function';
import { defineUsecase } from '../../usecase/functions/define-usecase.function';
import { AnyGoal } from '../../goal/types/utility.type';
import { GoalDefined } from '../types/goal-defined.interface';
import { ResolveRoles } from '../../actor/types/utility.type';

import { AnyFunction } from '../../utils/types/utility.type';
import { ImplementedAs } from '../types/implemented-as.interface';
import { AnyBoundary } from '../../boundary/types/utility.type';
import { BoundaryDefined } from '../types/boundary-defined.interface';

export class AsICanSoThatChain<
      Boundary extends AnyBoundary,
      RoleNames extends readonly string[],
      ActionTitle extends string,
      Goal extends AnyGoal,
   >
   implements
      BoundaryDefined<Boundary>,
      RoleNamesDefined<RoleNames>,
      ActionTitleDefined<ActionTitle>,
      GoalDefined<Goal>,
      ImplementedAs<RoleNames, ActionTitle, Goal>
{
   // InBoundary
   get [BOUNDARY_KEY](): Boundary {
      return get(this, BOUNDARY_KEY);
   }

   get [ROLE_NAMES_KEY](): RoleNames {
      return get(this, ROLE_NAMES_KEY);
   }

   get [TITLE_KEY](): ActionTitle {
      return get(this, TITLE_KEY);
   }

   get [GOAL_KEY](): Goal {
      return get(this, GOAL_KEY);
   }

   constructor(
      boundary: Boundary,
      roleNames: RoleNames,
      title: ActionTitle,
      goal: Goal,
   ) {
      set(this, BOUNDARY_KEY, boundary);
      set(this, ROLE_NAMES_KEY, roleNames);
      set(this, TITLE_KEY, title);
      set(this, GOAL_KEY, goal);
   }

   implementedAs<Handler extends AnyFunction>(
      handler: Handler,
   ): Usecase<ActionTitle, ResolveRoles<RoleNames>, Handler, Goal> {
      const roles = getOrDefineRoles(
         ...this[ROLE_NAMES_KEY],
      ) as ResolveRoles<RoleNames>;

      const title = this[TITLE_KEY];
      const goal = this[GOAL_KEY];

      return defineUsecase(title, roles, goal, handler);
   }
}
