import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { USECASE_TYPE } from '../../utils/constants/symbol-tag.constant';
import {
   BOUNDARY_KEY,
   GOAL_KEY,
   HANDLER_KEY,
   ROLES_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';

import { UsecaseModel } from '../types/usecase-model.interface';
import { AnyGoal } from '../../goal/types/utility.type';
import { GoalBoundary } from '../../goal/types/goal-boundary.type';
import { AnyRole } from '../../actor/types/utility.type';
import { UsecaseTitleFrom } from '../types/usecase-title-from.type';
import { createUsecaseTitle } from '../functions/create-usecase-title.function';
import { getSymbolName } from '../../symbol/functions/get-symbol-name.function';
import { AnyFunction } from '../../utils/types/utility.type';

export class Usecase<
      Title extends string,
      Roles extends readonly AnyRole[],
      Handler extends AnyFunction,
      Goal extends AnyGoal,
   >
   extends UsecaseSymbol<
      typeof USECASE_TYPE,
      UsecaseTitleFrom<Title, Roles, Goal>
   >
   implements UsecaseModel<Title, Roles, Handler, Goal>
{
   get [TITLE_KEY](): Title {
      return get(this, TITLE_KEY);
   }

   get [ROLES_KEY](): Roles {
      return get(this, ROLES_KEY);
   }

   get [GOAL_KEY](): Goal {
      return get(this, GOAL_KEY);
   }

   get [HANDLER_KEY](): Handler {
      return get(this, HANDLER_KEY);
   }

   get [BOUNDARY_KEY](): GoalBoundary<Goal> {
      return get(this[GOAL_KEY], BOUNDARY_KEY);
   }

   constructor(
      title: Title,
      roles: Roles,
      goal: Goal,
      handler: Handler,
   ) {
      super(USECASE_TYPE, createUsecaseTitle(title, goal, ...roles));

      set(this, TITLE_KEY, title);
      set(this, ROLES_KEY, roles);
      set(this, HANDLER_KEY, handler);
      set(this, GOAL_KEY, goal);
   }

   toString(): string {
      return getSymbolName(this);
   }
}
