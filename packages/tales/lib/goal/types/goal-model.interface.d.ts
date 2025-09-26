import { AnyBoundary } from '../../boundary/types/utility.type';
import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { BOUNDARY_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { GOAL_TYPE } from '../../utils/constants/symbol-tag.constant';
import { GoalName } from './goal-name.type';
export interface GoalModel<Title extends string, Boundary extends AnyBoundary> extends UsecaseSymbol<typeof GOAL_TYPE, GoalName<Title, Boundary>> {
    readonly [TITLE_KEY]: Title;
    readonly [BOUNDARY_KEY]: Boundary;
}
