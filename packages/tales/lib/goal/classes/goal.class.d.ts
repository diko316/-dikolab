import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { GOAL_TYPE } from '../../utils/constants/symbol-tag.constant';
import { GoalModel } from '../types/goal-model.interface';
import { AnyBoundary } from '../../boundary/types/utility.type';
import { BOUNDARY_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { GoalName } from '../types/goal-name.type';
export declare class Goal<Title extends string, Boundary extends AnyBoundary> extends UsecaseSymbol<typeof GOAL_TYPE, GoalName<Title, Boundary>> implements GoalModel<Title, Boundary> {
    get [TITLE_KEY](): Title;
    get [BOUNDARY_KEY](): Boundary;
    constructor(title: Title, boundary: Boundary);
}
