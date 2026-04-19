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

import type { UsecaseModel } from '../types/usecase-model.interface';
import type { AnyGoal } from '../../goal/types/utility.type';
import type { GoalBoundary } from '../../goal/types/goal-boundary.type';
import type { AnyRole } from '../../actor/types/utility.type';
import type { UsecaseTitleFrom } from '../types/usecase-title-from.type';
import { createUsecaseTitle } from '../functions/create-usecase-title.function';
import { getSymbolName } from '../../symbol/functions/get-symbol-name.function';
import type { AnyFunction } from '../../utils/types/utility.type';
import { MOCK_HANDLER_KEY } from '../../utils/constants/symbol-keys.constant';
import type { UsecaseEventMap } from '../types/usecase-event-map.type';

/**
 * Represents a use case that maps roles, a goal,
 * and a handler into an executable action
 */
export class Usecase<
      Title extends string,
      Roles extends readonly AnyRole[],
      Handler extends AnyFunction,
      Goal extends AnyGoal,
   >
   extends UsecaseSymbol<
      typeof USECASE_TYPE,
      UsecaseTitleFrom<Title, Roles, Goal>,
      UsecaseEventMap
   >
   implements UsecaseModel<Title, Roles, Handler, Goal>
{
   get [TITLE_KEY](): Title {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, TITLE_KEY);
   }

   get [ROLES_KEY](): Roles {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, ROLES_KEY);
   }

   get [GOAL_KEY](): Goal {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, GOAL_KEY);
   }

   get [HANDLER_KEY](): Handler {
      return get(this, HANDLER_KEY);
   }

   get [MOCK_HANDLER_KEY](): Handler | null {
      return get(this, MOCK_HANDLER_KEY);
   }

   set [MOCK_HANDLER_KEY](handler: Handler | null) {
      set(this, MOCK_HANDLER_KEY, handler);
   }

   get [BOUNDARY_KEY](): GoalBoundary<Goal> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
      set(this, MOCK_HANDLER_KEY, null);
      set(this, GOAL_KEY, goal);
   }

   /** Returns the use case's display name */
   toString(): string {
      return getSymbolName(this);
   }
}
