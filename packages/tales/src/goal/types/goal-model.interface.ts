import type { AnyBoundary } from '../../boundary/types/utility.type';
import type { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import type {
   BOUNDARY_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';

import type { GOAL_TYPE } from '../../utils/constants/symbol-tag.constant';
import type { GoalEventMap } from './goal-event-map.type';
import type { GoalName } from './goal-name.type';

export interface GoalModel<
   Title extends string,
   Boundary extends AnyBoundary,
> extends UsecaseSymbol<
      typeof GOAL_TYPE,
      GoalName<Title, Boundary>,
      GoalEventMap
   > {
   readonly [TITLE_KEY]: Title;
   readonly [BOUNDARY_KEY]: Boundary;
}
