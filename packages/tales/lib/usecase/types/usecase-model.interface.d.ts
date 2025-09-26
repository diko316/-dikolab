import { AnyRole } from '../../actor/types/utility.type';
import { GoalBoundary } from '../../goal/types/goal-boundary.type';
import { AnyGoal } from '../../goal/types/utility.type';
import { UsecaseSymbolModel } from '../../symbol/types/usecase-symbol-model.interface';
import { BOUNDARY_KEY, GOAL_KEY, HANDLER_KEY, MOCK_HANDLER_KEY, ROLES_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { USECASE_TYPE } from '../../utils/constants/symbol-tag.constant';
import { AnyFunction } from '../../utils/types/utility.type';
import { UsecaseEventMap } from './usecase-event-map.type';
import { UsecaseTitleFrom } from './usecase-title-from.type';
export interface UsecaseModel<Title extends string, Roles extends readonly AnyRole[], Handler extends AnyFunction, Goal extends AnyGoal> extends UsecaseSymbolModel<typeof USECASE_TYPE, UsecaseTitleFrom<Title, Roles, Goal>, UsecaseEventMap> {
    readonly [TITLE_KEY]: Title;
    readonly [ROLES_KEY]: Roles;
    readonly [GOAL_KEY]: Goal;
    readonly [HANDLER_KEY]: Handler;
    readonly [BOUNDARY_KEY]: GoalBoundary<Goal>;
    [MOCK_HANDLER_KEY]: Handler | null;
    toString(): string;
}
