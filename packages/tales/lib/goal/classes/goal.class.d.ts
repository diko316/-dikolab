import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { GOAL_TYPE } from '../../utils/constants/symbol-tag.constant';
import type { GoalModel } from '../types/goal-model.interface';
import type { AnyBoundary } from '../../boundary/types/utility.type';
import { BOUNDARY_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import type { GoalName } from '../types/goal-name.type';
import type { GoalEventMap } from '../types/goal-event-map.type';
/**
 * Represents an outcome that a use case aims
 * to achieve within a boundary
 */
export declare class Goal<Title extends string, Boundary extends AnyBoundary> extends UsecaseSymbol<typeof GOAL_TYPE, GoalName<Title, Boundary>, GoalEventMap> implements GoalModel<Title, Boundary> {
    get [TITLE_KEY](): Title;
    get [BOUNDARY_KEY](): Boundary;
    constructor(title: Title, boundary: Boundary);
}
