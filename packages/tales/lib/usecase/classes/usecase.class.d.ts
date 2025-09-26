import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { USECASE_TYPE } from '../../utils/constants/symbol-tag.constant';
import { BOUNDARY_KEY, GOAL_KEY, HANDLER_KEY, ROLES_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { UsecaseModel } from '../types/usecase-model.interface';
import { AnyGoal } from '../../goal/types/utility.type';
import { GoalBoundary } from '../../goal/types/goal-boundary.type';
import { AnyRole } from '../../actor/types/utility.type';
import { UsecaseTitleFrom } from '../types/usecase-title-from.type';
import { AnyFunction } from '../../utils/types/utility.type';
export declare class Usecase<Title extends string, Roles extends readonly AnyRole[], Handler extends AnyFunction, Goal extends AnyGoal> extends UsecaseSymbol<typeof USECASE_TYPE, UsecaseTitleFrom<Title, Roles, Goal>> implements UsecaseModel<Title, Roles, Handler, Goal> {
    get [TITLE_KEY](): Title;
    get [ROLES_KEY](): Roles;
    get [GOAL_KEY](): Goal;
    get [HANDLER_KEY](): Handler;
    get [BOUNDARY_KEY](): GoalBoundary<Goal>;
    constructor(title: Title, roles: Roles, goal: Goal, handler: Handler);
    toString(): string;
}
