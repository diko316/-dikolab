import { BOUNDARY_KEY, GOAL_KEY, ROLE_NAMES_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import type { ActionTitleDefined } from '../types/action-title-defined.interface';
import type { RoleNamesDefined } from '../types/role-names-defined.interface';
import type { Usecase } from '../../usecase/classes/usecase.class';
import type { AnyGoal } from '../../goal/types/utility.type';
import type { GoalDefined } from '../types/goal-defined.interface';
import type { ResolveRoles } from '../../actor/types/utility.type';
import type { AnyFunction } from '../../utils/types/utility.type';
import type { ImplementedAs } from '../types/implemented-as.interface';
import type { AnyBoundary } from '../../boundary/types/utility.type';
import type { BoundaryDefined } from '../types/boundary-defined.interface';
export declare class AsICanSoThatChain<Boundary extends AnyBoundary, RoleNames extends readonly string[], ActionTitle extends string, Goal extends AnyGoal> implements BoundaryDefined<Boundary>, RoleNamesDefined<RoleNames>, ActionTitleDefined<ActionTitle>, GoalDefined<Goal>, ImplementedAs<RoleNames, ActionTitle, Goal> {
    get [BOUNDARY_KEY](): Boundary;
    get [ROLE_NAMES_KEY](): RoleNames;
    get [TITLE_KEY](): ActionTitle;
    get [GOAL_KEY](): Goal;
    constructor(boundary: Boundary, roleNames: RoleNames, title: ActionTitle, goal: Goal);
    /**
     * Attaches handler function to be executed when Use-case is performed.
     *
     * @param handler Use-case execution handler function.
     * @returns Usecase
     */
    implementedAs<Handler extends AnyFunction>(handler: Handler): Usecase<ActionTitle, ResolveRoles<RoleNames>, Handler, Goal>;
}
