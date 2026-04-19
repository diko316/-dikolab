import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { GOAL_TYPE } from '../../utils/constants/symbol-tag.constant';
import type { GoalModel } from '../types/goal-model.interface';
import type { AnyBoundary } from '../../boundary/types/utility.type';
import {
   BOUNDARY_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import type { GoalName } from '../types/goal-name.type';
import { createGoalName } from '../functions/create-goal-name.function';
import type { GoalEventMap } from '../types/goal-event-map.type';

export class Goal<Title extends string, Boundary extends AnyBoundary>
   extends UsecaseSymbol<
      typeof GOAL_TYPE,
      GoalName<Title, Boundary>,
      GoalEventMap
   >
   implements GoalModel<Title, Boundary>
{
   get [TITLE_KEY](): Title {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, TITLE_KEY);
   }

   get [BOUNDARY_KEY](): Boundary {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return get(this, BOUNDARY_KEY);
   }

   constructor(title: Title, boundary: Boundary) {
      super(GOAL_TYPE, createGoalName(title, boundary));
      set(this, TITLE_KEY, title);
      set(this, BOUNDARY_KEY, boundary);
   }
}
