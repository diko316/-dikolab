import { get, set } from '@dikolab/private-parts';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { GOAL_TYPE } from '../../utils/constants/symbol-tag.constant';
import { GoalModel } from '../types/goal-model.interface';
import { AnyBoundary } from '../../boundary/types/utility.type';
import {
   BOUNDARY_KEY,
   TITLE_KEY,
} from '../../utils/constants/symbol-keys.constant';
import { GoalName } from '../types/goal-name.type';
import { createGoalName } from '../functions/create-goal-name.function';

export class Goal<Title extends string, Boundary extends AnyBoundary>
   extends UsecaseSymbol<typeof GOAL_TYPE, GoalName<Title, Boundary>>
   implements GoalModel<Title, Boundary>
{
   get [TITLE_KEY](): Title {
      return get(this, TITLE_KEY);
   }

   get [BOUNDARY_KEY](): Boundary {
      return get(this, BOUNDARY_KEY);
   }

   constructor(title: Title, boundary: Boundary) {
      super(GOAL_TYPE, createGoalName(title, boundary));
      set(this, TITLE_KEY, title);
      set(this, BOUNDARY_KEY, boundary);
   }
}
